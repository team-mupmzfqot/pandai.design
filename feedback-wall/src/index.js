import { DurableObject } from "cloudflare:workers";

/* ──────────────────────────────────────────────────────────────
   Pandai — Live Feedback Wall
   One shared board. Real-time via WebSocket Hibernation API.
   Notes persisted in the Durable Object's SQLite storage.
   ────────────────────────────────────────────────────────────── */

const ALLOWED_COLORS = ["#fff3a0", "#b9f6c4", "#ffd0e0", "#bfe3ff", "#ffd9a8", "#e0d4ff"];
const MAX_TEXT = 280;
const MAX_NAME = 40;
const MAX_DEPT = 40;
const MAX_REPLY = 280;

export class Board extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, author TEXT, dept TEXT, color TEXT NOT NULL, ts INTEGER NOT NULL)"
      );
      // add `dept` to any board that pre-dates this field
      try { this.ctx.storage.sql.exec("ALTER TABLE notes ADD COLUMN dept TEXT"); } catch (e) { /* column already exists */ }
      this.ctx.storage.sql.exec(
        "CREATE TABLE IF NOT EXISTS ratings (cid TEXT PRIMARY KEY, stars INTEGER NOT NULL, ts INTEGER NOT NULL)"
      );
      this.ctx.storage.sql.exec(
        "CREATE TABLE IF NOT EXISTS replies (id INTEGER PRIMARY KEY AUTOINCREMENT, note_id INTEGER NOT NULL, text TEXT NOT NULL, author TEXT, dept TEXT, ts INTEGER NOT NULL)"
      );
    });
  }

  list() {
    return this.ctx.storage.sql.exec("SELECT id, text, author, dept, color, ts FROM notes ORDER BY id ASC").toArray();
  }

  listReplies() {
    return this.ctx.storage.sql.exec("SELECT id, note_id, text, author, dept, ts FROM replies ORDER BY id ASC").toArray();
  }

  addReply(noteId, text, author, dept) {
    noteId = Math.round(Number(noteId));
    text = (text == null ? "" : String(text)).slice(0, MAX_REPLY).trim();
    author = (author == null ? "" : String(author)).slice(0, MAX_NAME).trim();
    dept = (dept == null ? "" : String(dept)).slice(0, MAX_DEPT).trim();
    if (!noteId || !text) return null;
    // only reply to a note that still exists
    const parent = this.ctx.storage.sql.exec("SELECT id FROM notes WHERE id = ?", noteId).toArray();
    if (!parent.length) return null;
    const ts = Date.now();
    const row = this.ctx.storage.sql
      .exec(
        "INSERT INTO replies (note_id, text, author, dept, ts) VALUES (?, ?, ?, ?, ?) RETURNING id, note_id, text, author, dept, ts",
        noteId, text, author, dept, ts
      )
      .one();
    this.broadcast({ type: "reply", reply: row });
    return row;
  }

  add(text, author, dept, color) {
    text = (text == null ? "" : String(text)).slice(0, MAX_TEXT).trim();
    author = (author == null ? "" : String(author)).slice(0, MAX_NAME).trim();
    dept = (dept == null ? "" : String(dept)).slice(0, MAX_DEPT).trim();
    if (!text) return null;
    if (ALLOWED_COLORS.indexOf(color) === -1) color = ALLOWED_COLORS[0];
    const ts = Date.now();
    const row = this.ctx.storage.sql
      .exec(
        "INSERT INTO notes (text, author, dept, color, ts) VALUES (?, ?, ?, ?, ?) RETURNING id, text, author, dept, color, ts",
        text, author, dept, color, ts
      )
      .one();
    this.broadcast({ type: "add", note: row });
    return row;
  }

  ratingStats() {
    const r = this.ctx.storage.sql.exec("SELECT COUNT(*) AS c, AVG(stars) AS a FROM ratings").one();
    return { count: r.c || 0, avg: r.c ? Math.round(r.a * 10) / 10 : 0 };
  }

  rate(cid, stars) {
    cid = (cid == null ? "" : String(cid)).slice(0, 64);
    stars = Math.round(Number(stars));
    if (!cid || !(stars >= 1 && stars <= 5)) return;
    this.ctx.storage.sql.exec(
      "INSERT INTO ratings (cid, stars, ts) VALUES (?, ?, ?) ON CONFLICT(cid) DO UPDATE SET stars = excluded.stars, ts = excluded.ts",
      cid, stars, Date.now()
    );
    this.broadcast({ type: "rating", stats: this.ratingStats() });
  }

  remove(id) {
    this.ctx.storage.sql.exec("DELETE FROM replies WHERE note_id = ?", id);
    this.ctx.storage.sql.exec("DELETE FROM notes WHERE id = ?", id);
    this.broadcast({ type: "del", id: id });
  }

  clearAll() {
    this.ctx.storage.sql.exec("DELETE FROM replies");
    this.ctx.storage.sql.exec("DELETE FROM notes");
    this.broadcast({ type: "clear" });
  }

  broadcast(obj) {
    const msg = JSON.stringify(obj);
    for (const ws of this.ctx.getWebSockets()) {
      try { ws.send(msg); } catch (e) { /* socket closing */ }
    }
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/ws") {
      if (request.headers.get("Upgrade") !== "websocket") {
        return new Response("Expected websocket", { status: 426 });
      }
      const pair = new WebSocketPair();
      const client = pair[0];
      const server = pair[1];
      this.ctx.acceptWebSocket(server);
      // send the current wall to the freshly-connected client
      server.send(JSON.stringify({ type: "init", notes: this.list(), replies: this.listReplies(), rating: this.ratingStats() }));
      return new Response(null, { status: 101, webSocket: client });
    }

    if (url.pathname === "/export") {
      const fmt = url.searchParams.get("format");
      const notes = this.list();
      if (fmt === "csv") {
        const esc = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
        const lines = ["id,date,author,department,note"];
        for (const n of notes) {
          lines.push([n.id, new Date(n.ts).toISOString(), esc(n.author || ""), esc(n.dept || ""), esc(n.text)].join(","));
        }
        return new Response(lines.join("\n"), {
          headers: {
            "content-type": "text/csv;charset=utf-8",
            "content-disposition": 'attachment; filename="pandai-feedback.csv"',
          },
        });
      }
      return Response.json({ count: notes.length, notes: notes, replies: this.listReplies(), rating: this.ratingStats() });
    }

    return new Response("Not found", { status: 404 });
  }

  async webSocketMessage(ws, message) {
    let m;
    try { m = JSON.parse(message); } catch (e) { return; }
    const adminOk = this.env.ADMIN_TOKEN && m.admin === this.env.ADMIN_TOKEN;

    if (m.type === "add") {
      this.add(m.text, m.author, m.dept, m.color);
    } else if (m.type === "del") {
      this.remove(m.id);
    } else if (m.type === "reply") {
      this.addReply(m.noteId, m.text, m.author, m.dept);
    } else if (m.type === "rate") {
      this.rate(m.cid, m.stars);
    } else if (m.type === "clear" && adminOk) {
      this.clearAll();
    }
  }

  async webSocketClose(ws, code, reason) {
    try { ws.close(code, reason); } catch (e) { /* already closed */ }
  }

  async webSocketError(ws) {
    try { ws.close(1011, "error"); } catch (e) {}
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Route live + data endpoints to the single shared board DO.
    if (url.pathname === "/ws" || url.pathname === "/export") {
      return env.BOARD.getByName("main").fetch(request);
    }

    if (url.pathname === "/" || url.pathname === "/admin") {
      return new Response(BOARD_HTML, {
        headers: { "content-type": "text/html;charset=utf-8" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};

/* ── The board page (audience + live wall + optional admin) ──
   Inlined so the whole app is one deployable file.
   User content is rendered via textContent (never innerHTML) — XSS-safe. */
const BOARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>Pandai — Leave a note</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{ --green:#00cc85; --green-d:#00a36a; --teal:#00564c; --subtle:#e8fbe8; --ink:#404040; --body:#666; --line:#d9d9d9; }
  *,*::before,*::after{ box-sizing:border-box; margin:0; padding:0; }
  body{ font-family:'Poppins',system-ui,sans-serif; color:var(--ink); background:#f4faf7; -webkit-font-smoothing:antialiased; min-height:100vh; }
  .top{ position:sticky; top:0; z-index:20; background:var(--teal); color:#fff; padding:14px 18px; display:flex; align-items:center; gap:12px; }
  .top .mark{ width:30px; height:32px; flex-shrink:0; }
  .top h1{ font-size:18px; font-weight:600; }
  .top .sub{ font-size:12px; opacity:.8; font-weight:400; }
  .status{ margin-left:auto; display:flex; align-items:center; gap:7px; font-size:11px; opacity:.9; }
  .dot{ width:9px; height:9px; border-radius:50%; background:#ffce00; box-shadow:0 0 0 0 rgba(0,204,133,.6); }
  .dot.on{ background:#7CFFA8; }
  .count{ background:rgba(255,255,255,.16); padding:3px 10px; border-radius:999px; font-weight:600; font-size:12px; }

  .composer{ max-width:760px; margin:16px auto 4px; padding:0 14px; }
  .card{ background:#fff; border:1px solid var(--line); border-radius:18px; padding:14px; }
  .ratecard{ margin-bottom:12px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
  .ratecard .q{ font-size:14px; font-weight:600; color:var(--teal); }
  .stars{ display:flex; gap:3px; }
  .star{ font-size:30px; line-height:1; cursor:pointer; color:#e3e3e3; transition:transform .1s, color .1s; user-select:none; }
  .star.on{ color:#ffc400; }
  .star:hover{ transform:scale(1.18); }
  .rate-stat{ margin-left:auto; font-size:13px; color:var(--body); font-weight:600; }
  textarea{ width:100%; border:none; resize:none; font-family:inherit; font-size:16px; color:var(--ink); min-height:64px; outline:none; line-height:1.45; }
  textarea::placeholder{ color:#b8b8b8; }
  .row{ display:flex; align-items:center; gap:10px; margin-top:10px; flex-wrap:wrap; }
  .name{ flex:1; min-width:120px; border:1px solid var(--line); border-radius:999px; padding:9px 14px; font-family:inherit; font-size:13px; outline:none; }
  .name:focus{ border-color:var(--green); }
  .swatches{ display:flex; gap:6px; }
  .sw{ width:24px; height:24px; border-radius:7px; cursor:pointer; border:2px solid rgba(0,0,0,.06); transition:transform .12s; }
  .sw:hover{ transform:scale(1.12); }
  .sw.sel{ box-shadow:0 0 0 3px rgba(0,204,133,.4); border-color:#fff; }
  .post{ border:none; background:var(--green); color:#fff; font-family:inherit; font-weight:600; font-size:14px; padding:10px 22px; border-radius:999px; cursor:pointer; transition:background .15s; }
  .post:hover{ background:var(--green-d); }
  .post:disabled{ background:#cfe9df; cursor:default; }
  .hint{ font-size:11px; color:#aaa; margin-top:6px; padding-left:4px; }

  #wall{ columns:210px; column-gap:14px; padding:18px 14px 80px; max-width:1500px; margin:0 auto; }
  .note{ break-inside:avoid; margin:0 0 14px; padding:14px 15px 16px; border-radius:4px 4px 14px 4px; box-shadow:0 6px 16px rgba(0,40,30,.12); position:relative; animation:pop .32s cubic-bezier(.2,.9,.3,1.3); }
  .note .txt{ font-size:14.5px; line-height:1.45; white-space:pre-wrap; word-break:break-word; }
  .note .by{ margin-top:10px; font-size:11px; font-weight:600; opacity:.6; }
  .note .x{ position:absolute; top:6px; right:8px; border:none; background:rgba(0,0,0,.10); color:#000; width:24px; height:24px; border-radius:50%; cursor:pointer; font-size:14px; line-height:1; display:flex; align-items:center; justify-content:center; opacity:.5; transition:opacity .12s,background .12s; }
  .note .x:hover{ opacity:1; background:rgba(0,0,0,.18); }
  .replies{ margin-top:10px; display:flex; flex-direction:column; gap:6px; }
  .reply{ background:rgba(255,255,255,.6); border-radius:9px; padding:7px 9px; font-size:12.5px; line-height:1.4; word-break:break-word; }
  .reply .ra{ display:block; font-size:10px; font-weight:700; opacity:.6; margin-top:3px; }
  .reply-btn{ margin-top:9px; border:none; background:rgba(0,0,0,.08); color:inherit; font-family:inherit; font-size:11px; font-weight:600; padding:4px 11px; border-radius:999px; cursor:pointer; opacity:.7; transition:opacity .12s; }
  .reply-btn:hover{ opacity:1; }
  .reply-form{ margin-top:9px; display:none; flex-direction:column; gap:6px; }
  .reply-form.show{ display:flex; }
  .reply-form .rnames{ display:flex; gap:6px; }
  .reply-form input{ width:100%; min-width:0; border:1px solid rgba(0,0,0,.16); border-radius:999px; padding:6px 11px; font-family:inherit; font-size:12px; outline:none; background:rgba(255,255,255,.75); color:#3a3a2a; }
  .reply-form input:focus{ border-color:var(--green); }
  .reply-form .rsend{ align-self:flex-end; border:none; background:var(--green); color:#fff; font-family:inherit; font-weight:600; font-size:12px; padding:6px 14px; border-radius:999px; cursor:pointer; }
  .reply-form .rsend:hover{ background:var(--green-d); }
  @keyframes pop{ from{ opacity:0; transform:scale(.8) translateY(8px); } to{ opacity:1; transform:none; } }
  .empty{ text-align:center; color:#b0c4bb; font-size:14px; padding:60px 20px; }

  .adminbar{ position:fixed; bottom:0; left:0; right:0; background:var(--teal); color:#fff; padding:10px 16px; display:none; align-items:center; gap:10px; z-index:30; }
  body.admin .adminbar{ display:flex; }
  .adminbar b{ font-size:12px; }
  .adminbar .sp{ margin-left:auto; }
  .adminbar button{ font-family:inherit; font-size:12px; font-weight:600; border:1px solid rgba(255,255,255,.4); background:transparent; color:#fff; padding:7px 14px; border-radius:999px; cursor:pointer; }
  .adminbar button:hover{ background:rgba(255,255,255,.12); }
</style>
</head>
<body>
  <div class="top">
    <svg class="mark" viewBox="0 0 26.8511 28" aria-hidden="true">
      <path d="M22.3786 13.9871H26.8511L26.6861 14.2427C24.4175 17.7055 21.4078 20.7217 17.9353 23.0291C20.6343 20.9579 22.3786 17.6796 22.3786 13.9935V13.9871Z" fill="#95E3E6"/>
      <path d="M26.6861 13.7346L26.8479 13.9871H22.3786C22.3786 10.0388 20.3689 6.55663 17.3366 4.53074C21.0841 6.93527 24.3042 10.1036 26.6731 13.7184L26.6861 13.7346Z" fill="#B4F3BF"/>
      <path d="M15.6375 3.59547C14.2751 2.99353 12.7702 2.66019 11.1909 2.66019C9.23948 2.66019 7.40453 3.16828 5.80583 4.06149L3.49515 0L3.79612 0.00970874C8.38511 0.346278 12.4466 2.00647 15.6375 3.59547Z" fill="#CAFBDC"/>
      <path d="M3.49515 0L5.80583 4.06149C2.58576 5.85761 0.330097 9.21359 0.0323625 13.1165C0.271845 8.39159 1.38511 4.07443 3.34304 0.271845L3.48544 0H3.49515Z" fill="#86D9AC"/>
      <path d="M16.9644 23.6505C16.4401 23.9644 16.1294 24.1424 15.8188 24.3107C14.3851 24.9676 12.8285 25.3269 11.1909 25.3269C9.20712 25.3269 7.34304 24.8026 5.72492 23.8803L11.411 13.9871L16.9644 23.6505Z" fill="#76D59F"/>
      <path d="M22.3786 13.9871V13.9935C22.3786 17.6796 20.6343 20.9579 17.9353 23.0291C17.6149 23.246 17.2913 23.4498 16.9644 23.6505L11.411 13.9871H22.3786Z" fill="#7CD988"/>
      <path d="M22.3786 13.9871H11.411L16.9029 4.25566C17.0485 4.34304 17.1909 4.43366 17.3333 4.53074C20.3657 6.55663 22.3722 10.0388 22.3754 13.9871H22.3786Z" fill="#A5E695"/>
      <path d="M16.8123 4.19741L11.411 13.9871L5.80583 4.06149C7.40453 3.16828 9.23948 2.66019 11.1909 2.66019C12.7702 2.66019 14.2751 2.99353 15.6375 3.59547C16.0194 3.78641 16.3884 3.97411 16.7443 4.15858Z" fill="#99EBB2"/>
      <path d="M11.411 13.9871H0V13.8835C0.00970874 13.6278 0.0194175 13.3754 0.0323625 13.123V13.1165C0.330097 9.21359 2.58576 5.85761 5.80583 4.06149L11.411 13.9871Z" fill="#66D59D"/>
      <path d="M11.411 13.9871L5.72492 23.8803C2.50162 22.0453 0.262136 18.6408 0.0226537 14.699C0.012945 14.466 0.00647249 14.2298 0 13.9935V13.9871H11.411Z" fill="#4FBE88"/>
      <path d="M5.72508 23.8803L3.3788 27.9935L3.23964 27.7249C1.28171 23.8414 0.200807 19.466 0.0228133 14.699C0.262295 18.6408 2.50178 22.0453 5.72508 23.8803Z" fill="#82D9DE"/>
      <path d="M3.37864 27.9935L5.72492 23.8803C7.34304 24.8026 9.20712 25.3269 11.1909 25.3269C12.8285 25.3269 14.3851 24.9676 15.7896 24.3236C12.0453 26.3916 7.97735 27.6181 3.68932 27.9741L3.38188 28V27.9935H3.37864Z" fill="#9DE6F1"/>
    </svg>
    <div>
      <h1>Leave a note</h1>
      <div class="sub">It appears on the wall live &middot; Pandai</div>
    </div>
    <div class="status"><span class="count" id="count">0</span><span class="dot" id="dot"></span><span id="statustxt">connecting</span></div>
  </div>

  <div class="composer">
    <div class="card ratecard">
      <span class="q">Rate the DS 1.5 setup</span>
      <div class="stars" id="stars"></div>
      <span class="rate-stat" id="ratestat">…</span>
    </div>
    <div class="card">
      <textarea id="text" maxlength="280" placeholder="Type anything — feedback, an idea, a hello…"></textarea>
      <div class="row">
        <input class="name" id="name" maxlength="40" placeholder="Your name (optional)">
        <input class="name" id="dept" maxlength="40" placeholder="Department (optional)">
      </div>
      <div class="row">
        <div class="swatches" id="swatches"></div>
        <button class="post" id="post" style="margin-left:auto">Post</button>
      </div>
      <div class="hint">Press &#8984;/Ctrl + Enter to post</div>
    </div>
  </div>

  <main id="wall"></main>

  <div class="adminbar">
    <b>Admin</b><span>moderating &mdash; tap &times; on a note to remove</span>
    <span class="sp"></span>
    <button id="csv">Export CSV</button>
    <button id="json">Export JSON</button>
    <button id="clear">Clear all</button>
  </div>

<script>
(function(){
  var COLORS = ["#fff3a0","#b9f6c4","#ffd0e0","#bfe3ff","#ffd9a8","#e0d4ff"];
  var wall = document.getElementById('wall');
  var textEl = document.getElementById('text');
  var nameEl = document.getElementById('name');
  var deptEl = document.getElementById('dept');
  var postBtn = document.getElementById('post');
  var countEl = document.getElementById('count');
  var dot = document.getElementById('dot');
  var statustxt = document.getElementById('statustxt');
  var selected = COLORS[Math.floor(Math.random()*COLORS.length)];
  var ws = null, count = 0;

  // admin mode: /admin?key=TOKEN  or  /?admin=TOKEN
  var params = new URLSearchParams(location.search);
  var ADMIN = params.get('admin') || params.get('key') || '';
  var isAdmin = (location.pathname === '/admin' && ADMIN) || params.has('admin');
  if (isAdmin) document.body.classList.add('admin');

  // remember name between posts
  try { nameEl.value = localStorage.getItem('pandai_name') || ''; deptEl.value = localStorage.getItem('pandai_dept') || ''; } catch(e){}

  // build color swatches
  var sw = document.getElementById('swatches');
  COLORS.forEach(function(c){
    var b = document.createElement('div');
    b.className = 'sw' + (c === selected ? ' sel' : '');
    b.style.background = c;
    b.title = 'note colour';
    b.addEventListener('click', function(){
      selected = c;
      Array.prototype.forEach.call(sw.children, function(x){ x.classList.remove('sel'); });
      b.classList.add('sel');
    });
    sw.appendChild(b);
  });

  // ── rating (5 stars, one per device, changeable) ──
  var starsBox = document.getElementById('stars');
  var rateStat = document.getElementById('ratestat');
  var myStars = 0, cid = '';
  try { myStars = parseInt(localStorage.getItem('pandai_stars') || '0', 10) || 0; } catch(e){}
  try {
    cid = localStorage.getItem('pandai_cid') || '';
    if (!cid){ cid = 'c' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('pandai_cid', cid); }
  } catch(e){ cid = 'c' + Date.now(); }
  var starEls = [];
  for (var si = 1; si <= 5; si++){ (function(n){
    var st = document.createElement('span');
    st.className = 'star'; st.textContent = '★'; st.title = n + ' / 5';
    st.addEventListener('mouseenter', function(){ paintStars(n); });
    st.addEventListener('mouseleave', function(){ paintStars(myStars); });
    st.addEventListener('click', function(){
      myStars = n;
      try { localStorage.setItem('pandai_stars', String(n)); } catch(e){}
      paintStars(n);
      if (ws && ws.readyState === 1) ws.send(JSON.stringify({ type:'rate', cid:cid, stars:n }));
    });
    starsBox.appendChild(st); starEls.push(st);
  })(si); }
  function paintStars(n){ for (var k = 0; k < 5; k++){ starEls[k].classList.toggle('on', k < n); } }
  function showRating(s){
    if (!s || !s.count){ rateStat.textContent = 'Be the first to rate'; return; }
    rateStat.textContent = s.avg + ' ★ · ' + s.count + ' rating' + (s.count === 1 ? '' : 's');
  }
  paintStars(myStars);

  function inkFor(hex){
    var c = hex.replace('#','');
    var r = parseInt(c.substr(0,2),16), g = parseInt(c.substr(2,2),16), b = parseInt(c.substr(4,2),16);
    return (0.299*r + 0.587*g + 0.114*b)/255 > 0.6 ? '#3a3a2a' : '#fff';
  }

  function noteEl(n){
    var el = document.createElement('div');
    el.className = 'note';
    el.dataset.id = n.id;
    el.style.background = n.color;
    el.style.color = inkFor(n.color);
    var rot = ((Number(n.id) * 37) % 7) - 3;
    el.style.transform = 'rotate(' + rot + 'deg)';
    var t = document.createElement('div');
    t.className = 'txt';
    t.textContent = n.text;            // textContent → no HTML injection
    el.appendChild(t);
    var meta = [];
    if (n.author) meta.push(n.author);
    if (n.dept) meta.push(n.dept);
    if (meta.length) {
      var by = document.createElement('div');
      by.className = 'by';
      by.textContent = '— ' + meta.join(' · ');
      el.appendChild(by);
    }
    // replies thread
    var rc = document.createElement('div');
    rc.className = 'replies';
    el.appendChild(rc);

    // reply toggle + form (name + department + reply text)
    var rb = document.createElement('button');
    rb.className = 'reply-btn';
    rb.textContent = 'Reply';
    el.appendChild(rb);

    var rf = document.createElement('form');
    rf.className = 'reply-form';
    var rnames = document.createElement('div');
    rnames.className = 'rnames';
    var rName = document.createElement('input');
    rName.maxLength = 40; rName.placeholder = 'Name (optional)';
    var rDept = document.createElement('input');
    rDept.maxLength = 40; rDept.placeholder = 'Department (optional)';
    rnames.appendChild(rName); rnames.appendChild(rDept);
    var rText = document.createElement('input');
    rText.maxLength = 280; rText.placeholder = 'Write a reply…';
    var rSend = document.createElement('button');
    rSend.type = 'submit'; rSend.className = 'rsend'; rSend.textContent = 'Send reply';
    rf.appendChild(rnames); rf.appendChild(rText); rf.appendChild(rSend);
    el.appendChild(rf);

    rb.addEventListener('click', function(){
      var open = rf.classList.toggle('show');
      if (open){
        try { rName.value = localStorage.getItem('pandai_name') || ''; rDept.value = localStorage.getItem('pandai_dept') || ''; } catch(e){}
        rText.focus();
      }
    });
    rf.addEventListener('submit', function(e){
      e.preventDefault();
      var v = rText.value.trim();
      if (!v || !ws || ws.readyState !== 1) return;
      var rn = rName.value.trim(), rd = rDept.value.trim();
      try { if (rn) localStorage.setItem('pandai_name', rn); if (rd) localStorage.setItem('pandai_dept', rd); } catch(err){}
      ws.send(JSON.stringify({ type:'reply', noteId:n.id, text:v, author:rn, dept:rd }));
      rText.value = '';
      rf.classList.remove('show');
    });

    var x = document.createElement('button');
    x.className = 'x';
    x.textContent = '\\u00d7';
    x.title = 'remove this note';
    x.addEventListener('click', function(){
      if (ws && ws.readyState === 1) ws.send(JSON.stringify({ type:'del', id:n.id }));
    });
    el.appendChild(x);
    return el;
  }

  function replyEl(r){
    var d = document.createElement('div');
    d.className = 'reply';
    d.dataset.id = r.id;
    var t = document.createElement('span');
    t.textContent = r.text;          // textContent → no HTML injection
    d.appendChild(t);
    var meta = [];
    if (r.author) meta.push(r.author);
    if (r.dept) meta.push(r.dept);
    if (meta.length){
      var a = document.createElement('span');
      a.className = 'ra';
      a.textContent = '— ' + meta.join(' · ');
      d.appendChild(a);
    }
    return d;
  }

  function addReplyEl(r){
    var note = wall.querySelector('.note[data-id="' + r.note_id + '"]');
    if (!note) return;
    var rc = note.querySelector('.replies');
    if (rc) rc.appendChild(replyEl(r));
  }

  function setCount(c){ count = c; countEl.textContent = c; }

  function renderAll(notes, replies){
    wall.innerHTML = '';
    if (!notes.length){
      var e = document.createElement('div'); e.className='empty'; e.textContent='No notes yet — be the first ✦';
      wall.appendChild(e);
    } else {
      notes.forEach(function(n){ wall.appendChild(noteEl(n)); });
      if (replies && replies.length) replies.forEach(addReplyEl);
    }
    setCount(notes.length);
  }

  function addOne(n){
    var empty = wall.querySelector('.empty'); if (empty) empty.remove();
    wall.insertBefore(noteEl(n), wall.firstChild);   // newest on top
    setCount(count + 1);
  }

  function removeOne(id){
    var el = wall.querySelector('.note[data-id="' + id + '"]');
    if (el){ el.remove(); setCount(Math.max(0, count - 1)); }
  }

  function status(on){
    dot.classList.toggle('on', on);
    statustxt.textContent = on ? 'live' : 'reconnecting…';
    postBtn.disabled = !on;
  }

  function connect(){
    var proto = location.protocol === 'https:' ? 'wss' : 'ws';
    ws = new WebSocket(proto + '://' + location.host + '/ws');
    ws.onopen = function(){ status(true); };
    ws.onclose = function(){ status(false); setTimeout(connect, 1500); };
    ws.onerror = function(){ try{ ws.close(); }catch(e){} };
    ws.onmessage = function(ev){
      var m; try{ m = JSON.parse(ev.data); }catch(e){ return; }
      if (m.type === 'init'){ renderAll(m.notes, m.replies); if (m.rating) showRating(m.rating); }
      else if (m.type === 'add') addOne(m.note);
      else if (m.type === 'reply') addReplyEl(m.reply);
      else if (m.type === 'del') removeOne(m.id);
      else if (m.type === 'rating') showRating(m.stats);
      else if (m.type === 'clear') renderAll([], []);
    };
  }

  function post(){
    var t = textEl.value.trim();
    if (!t || !ws || ws.readyState !== 1) return;
    try { localStorage.setItem('pandai_name', nameEl.value.trim()); localStorage.setItem('pandai_dept', deptEl.value.trim()); } catch(e){}
    ws.send(JSON.stringify({ type:'add', text:t, author:nameEl.value.trim(), dept:deptEl.value.trim(), color:selected }));
    textEl.value = '';
    textEl.focus();
  }

  postBtn.addEventListener('click', post);
  textEl.addEventListener('keydown', function(e){
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); post(); }
  });

  // admin controls
  var csv = document.getElementById('csv'), json = document.getElementById('json'), clr = document.getElementById('clear');
  if (csv) csv.addEventListener('click', function(){ window.open('/export?format=csv', '_blank'); });
  if (json) json.addEventListener('click', function(){ window.open('/export', '_blank'); });
  if (clr) clr.addEventListener('click', function(){
    if (confirm('Clear ALL notes? This cannot be undone.') && ws && ws.readyState === 1)
      ws.send(JSON.stringify({ type:'clear', admin:ADMIN }));
  });

  connect();
})();
</script>
</body>
</html>`;
