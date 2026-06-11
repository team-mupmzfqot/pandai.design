// One-off assembler: wrap each source page's Page Container in the zul.page.template.html chrome.
// Run: node build-pages.cjs
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TPL_PATH = path.join(ROOT, 'zul.test.git', 'zul.page.template.html');
const OUT_DIR  = path.join(ROOT, 'test.page.compiled');
const TPL = fs.readFileSync(TPL_PATH, 'utf8');

// --- source manifest: [sourceRelPath, outputName] (verbatim original filenames) ---
const SOURCES = [
  // Syakila (18)
  ['syakila.test.git/AnalysisCard.html', 'AnalysisCard.html'],
  ['syakila.test.git/bookmarks.html', 'bookmarks.html'],
  ['syakila.test.git/certificates.html', 'certificates.html'],
  ['syakila.test.git/experiments.html', 'experiments.html'],
  ['syakila.test.git/experiments.selections.html', 'experiments.selections.html'],
  ['syakila.test.git/experiments.view.html', 'experiments.view.html'],
  ['syakila.test.git/history.list.html', 'history.list.html'],
  ['syakila.test.git/history.month.html', 'history.month.html'],
  ['syakila.test.git/learningHub.html', 'learningHub.html'],
  ['syakila.test.git/quickNotes.html', 'quickNotes.html'],
  ['syakila.test.git/quickNotes.selections.html', 'quickNotes.selections.html'],
  ['syakila.test.git/quickNotes.view.html', 'quickNotes.view.html'],
  ['syakila.test.git/report.card.html', 'report.card.html'],
  ['syakila.test.git/score.card.html', 'score.card.html'],
  ['syakila.test.git/textbook.html', 'textbook.html'],
  ['syakila.test.git/videos.html', 'videos.html'],
  ['syakila.test.git/videos.selections.html', 'videos.selections.html'],
  ['syakila.test.git/videos.view.html', 'videos.view.html'],
  // Nadia (13)
  ['Nadia.test.git/class.battle.new.html', 'nadia_Battle.html'],   // reworked battle design (replaces battle.html)
  ['Nadia.test.git/class.browse.classes.html', 'nadia_Class-BrowseClasses.html'],
  ['Nadia.test.git/class.my.classes.html', 'nadia_Class-MyClasses.html'],
  ['Nadia.test.git/class.latest.assignments.html', 'nadia_Class-LatestAssignments.html'],
  ['Nadia.test.git/practise.flashcard.html', 'nadia_Flashcard.html'],
  ['Nadia.test.git/practise.practice.exam.html', 'nadia_PracticeExam.html'],
  ['Nadia.test.git/practise.subject.html', 'nadia_Practise-subject.html'],
  ['Nadia.test.git/practise.topical.test.html', 'nadia_TopicalTest.html'],
  ['Nadia.test.git/quiz.html', 'nadia_Quiz.html'],
  ['Nadia.test.git/rewards.avatar.html', 'nadia_Rewards-avatar.html'],
  ['Nadia.test.git/rewards.coin.quest.html', 'nadia_Rewards-CoinQuest.html'],
  ['Nadia.test.git/rewards.evoucher.html', 'nadia_Rewards-evoucher.html'],
  ['Nadia.test.git/rewards.merchandise.html', 'nadia_Rewards-Merchandise.html'],
  ['Nadia.test.git/rewards.my.rewards.html', 'nadia_Rewards-Myrewards.html'],
];

const MARKER = '.page-viewport__placeholder svg';
// CRLF-tolerant: the ONLY </defs> immediately followed (whitespace only) by </svg> is the main defs close
const DEFS_ANCHOR_RE = /([ \t]*<\/defs>\s*<\/svg>)/;

// nav/loader script signatures — these stay as the template's own; we drop source copies
const NAV_SIG = [/aria-label="Search"\]/, /var accountBtn/, /maximize-btn/, /zul\.page\.template/, /getElementById\('Navigation-Shell'\)/, /id="zul-nav/];

function symbolMap(html) {
  const map = {};
  const re = /<symbol id="([^"]+)"[\s\S]*?<\/symbol>/g;
  let m;
  while ((m = re.exec(html)) !== null) map[m[1]] = m[0];
  return map;
}
// top-level (non-symbol) defs: clipPath / gradients / filter / mask / pattern.
// strip <symbol> blocks first so nested gradients (e.g. kafa) aren't double-counted.
function nonSymbolDefMap(html) {
  const stripped = html.replace(/<symbol id="[^"]+"[\s\S]*?<\/symbol>/g, '');
  const map = {};
  const re = /<(clipPath|linearGradient|radialGradient|filter|mask|pattern) id="([^"]+)"[\s\S]*?<\/\1>/g;
  let m;
  while ((m = re.exec(stripped)) !== null) map[m[2]] = m[0];
  return map;
}
function definedVars(html) {
  const set = new Set();
  const re = /--([A-Za-z0-9-]+)\s*:/g;
  let m;
  while ((m = re.exec(html)) !== null) set.add(m[1]);
  return set;
}
function preMarker(html) { return html.slice(0, html.indexOf(MARKER)); }

function pageCSS(html) {
  // merge ALL <style> blocks in <head> into one CSS string
  const headEnd = html.indexOf('</head>');
  const head = headEnd >= 0 ? html.slice(0, headEnd) : html;
  const all = [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
  const mi = all.indexOf(MARKER);
  if (mi >= 0) {
    // marker present → page CSS is everything after the placeholder rule (clean split)
    const brace = all.indexOf('}', mi);
    return all.slice(brace + 1).replace(/^\s*\n/, '').replace(/\s*$/, '');
  }
  // no marker (restructured Nadia sources) → keep the full CSS; duplicate base rules
  // re-declare identically over the template's, so the page still renders correctly.
  return all.replace(/^\s*\n/, '').replace(/\s*$/, '');
}
// depth-aware: returns [start,end] of the outermost <main>...</main> at/after `from`
function mainRange(html, from) {
  const s = html.indexOf('<main', from);
  const re = /<main\b|<\/main>/g;
  re.lastIndex = s;
  let depth = 0, m;
  while ((m = re.exec(html)) !== null) {
    if (m[0] === '</main>') { if (--depth === 0) return [s, m.index + '</main>'.length]; }
    else depth++;
  }
  return [s, html.length];
}
function mainBlock(html) { const [s, e] = mainRange(html, 0); return html.slice(s, e); }
function pageScripts(html) {
  const re = /<script\b[^>]*>[\s\S]*?<\/script>/g;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    if (NAV_SIG.some(s => s.test(m[0]))) continue;
    out.push(m[0]);
  }
  return out;
}

const tplSymbols = symbolMap(TPL);
const tplDefs = nonSymbolDefMap(TPL);
const tplAllIds = new Set([...Object.keys(tplSymbols), ...Object.keys(tplDefs)]);
const tplVars = definedVars(TPL);

// ─── build-time active nav state: bake `is-active` into the right button(s) per page ───
const NAV_MAP = {
  "Home":"home.html","Quiz":"nadia_Quiz.html","Battle":"nadia_Battle.html","Practice":"nadia_Practise-subject.html",
  "My Classes":"nadia_Class-MyClasses.html","Browse Classes":"nadia_Class-BrowseClasses.html","Assignments":"nadia_Class-LatestAssignments.html",
  "Learning Hub":"learningHub.html","Quick Notes":"quickNotes.html","Videos":"videos.html",
  "Experiments":"experiments.html","Textbooks":"textbook.html","Bookmarks":"bookmarks.html",
  "Score Card":"score.card.html","Report Card":"report.card.html","History":"history.list.html","Certificates":"certificates.html",
  "Coin Quests":"nadia_Rewards-CoinQuest.html","My Rewards":"nadia_Rewards-Myrewards.html",
  "Merchandise":"nadia_Rewards-Merchandise.html","eVoucher":"nadia_Rewards-evoucher.html","Avatar":"nadia_Rewards-avatar.html"
};
const GROUP_MAP = {
  "My Classes":"Class","Browse Classes":"Class","Assignments":"Class",
  "Learning Hub":"Learn","Quick Notes":"Learn","Videos":"Learn","Experiments":"Learn","Textbooks":"Learn","Bookmarks":"Learn",
  "Score Card":"Achievement","Report Card":"Achievement","History":"Achievement","Certificates":"Achievement",
  "Coin Quests":"Rewards","My Rewards":"Rewards","Merchandise":"Rewards","eVoucher":"Rewards","Avatar":"Rewards"
};
const SUBPAGE_MAP = {
  "analysiscard.html":"Achievement","history.month.html":"Achievement",
  "quicknotes.selections.html":"Learn","quicknotes.view.html":"Learn",
  "videos.selections.html":"Learn","videos.view.html":"Learn",
  "experiments.selections.html":"Learn","experiments.view.html":"Learn",
  "nadia_flashcard.html":"Practice","nadia_practiceexam.html":"Practice","nadia_topicaltest.html":"Practice"
};
const BOTTOM_MAP = {
  "Quiz":["nadia_quiz.html"],
  "Practice":["nadia_practise-subject.html","nadia_flashcard.html","nadia_practiceexam.html","nadia_topicaltest.html"],
  "Score":["score.card.html"]
};
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
// add `is-active` + aria-current to every nav-menu-btn / nav-menu-item / navbar-bottom__btn carrying this aria-label
function activateLabel(html, label) {
  if (!label) return html;
  const lab = escRe(label);
  // match a full div/button opening tag that has one of our nav classes AND aria-label="label"
  const re = new RegExp('<(div|button)([^>]*\\bclass="(?:nav-menu-btn|nav-menu-item|navbar-bottom__btn)[^"]*"[^>]*\\baria-label="' + lab + '"[^>]*)>', 'g');
  return html.replace(re, function (full, tag, attrs) {
    if (/\bis-active\b/.test(attrs)) return full;           // already active — don't double-add
    const newAttrs = attrs.replace(/class="((?:nav-menu-btn|nav-menu-item|navbar-bottom__btn)[^"]*)"/, 'class="$1 is-active"');
    return '<' + tag + newAttrs + ' aria-current="page">';
  });
}
// rewrite in-content links that use the flat source filenames → compiled output names
const LINK_MAP = {
  'quiz.html':'nadia_Quiz.html', 'battle.html':'nadia_Battle.html', 'class.battle.new.html':'nadia_Battle.html',
  'class.browse.classes.html':'nadia_Class-BrowseClasses.html', 'class.my.classes.html':'nadia_Class-MyClasses.html',
  'class.latest.assignments.html':'nadia_Class-LatestAssignments.html',
  'practise.subject.html':'nadia_Practise-subject.html', 'practise.flashcard.html':'nadia_Flashcard.html',
  'practise.practice.exam.html':'nadia_PracticeExam.html', 'practise.topical.test.html':'nadia_TopicalTest.html',
  'rewards.avatar.html':'nadia_Rewards-avatar.html', 'rewards.coin.quest.html':'nadia_Rewards-CoinQuest.html',
  'rewards.evoucher.html':'nadia_Rewards-evoucher.html', 'rewards.merchandise.html':'nadia_Rewards-Merchandise.html',
  'rewards.my.rewards.html':'nadia_Rewards-Myrewards.html',
  // Syakila in-content fixes (no such targets in compiled set)
  'syakila.html':'report.card.html', 'history.week.html':'history.list.html'
};
function fixLinks(html) {
  for (const [flat, comp] of Object.entries(LINK_MAP)) {
    // match the flat filename when it's a standalone href/location target (preceded by " ' or /)
    const re = new RegExp('([\"\'/])' + escRe(flat) + '([\"\'?#])', 'g');
    html = html.replace(re, '$1' + comp + '$2');
  }
  return html;
}
function injectActiveStates(html, file) {
  const f = file.toLowerCase();
  let curLabel = null;
  for (const k in NAV_MAP) { if (NAV_MAP[k].toLowerCase() === f) { curLabel = k; break; } }
  const topLabel = curLabel ? (GROUP_MAP[curLabel] || curLabel) : (SUBPAGE_MAP[f] || null);
  let bottomLabel = null;
  for (const k in BOTTOM_MAP) { if (BOTTOM_MAP[k].indexOf(f) !== -1) { bottomLabel = k; break; } }
  [...new Set([topLabel, curLabel, bottomLabel].filter(Boolean))].forEach(lbl => { html = activateLabel(html, lbl); });
  return html;
}

let report = [];
for (const [rel, outName] of SOURCES) {
  const srcPath = path.join(ROOT, rel);
  if (!fs.existsSync(srcPath)) { console.warn('SKIP (source moved/renamed):', rel); continue; }
  const src = fs.readFileSync(srcPath, 'utf8');

  // 1. missing custom-prop aliases (from source base :root)
  const base = preMarker(src);
  const aliasRe = /--([A-Za-z0-9-]+)\s*:\s*([^;]+);/g;
  const aliases = {};
  let a;
  while ((a = aliasRe.exec(base)) !== null) {
    if (!tplVars.has(a[1]) && !(a[1] in aliases)) aliases[a[1]] = a[2].trim();
  }
  const aliasBlock = Object.keys(aliases).length
    ? '\n    /* ===== carried-over source aliases ===== */\n    :root {\n' +
      Object.entries(aliases).map(([k, v]) => `      --${k}: ${v};`).join('\n') +
      '\n    }\n'
    : '';

  // 2. page CSS
  const css = pageCSS(src);

  // 3. extra symbols + page-specific non-symbol defs (clipPath/gradients) not in template
  const sm = symbolMap(src);
  const nd = nonSymbolDefMap(src);
  const extraDefs = Object.keys(nd).filter(id => !tplAllIds.has(id)).map(id => nd[id]);
  const extraSyms = Object.keys(sm).filter(id => !tplAllIds.has(id)).map(id => sm[id]);
  const extra = [...extraDefs, ...extraSyms];

  // 4. content main + 5. page scripts
  const main = mainBlock(src);
  const scripts = pageScripts(src);

  // --- assemble ---
  let out = TPL;
  out = out.replace('</style>',
    aliasBlock +
    '\n    /* ═══════════════ PAGE-SPECIFIC CSS — ' + outName + ' ═══════════════ */\n' +
    css + '\n\n  </style>');
  if (extra.length) {
    out = out.replace(DEFS_ANCHOR_RE,
      '      <!-- page-specific symbols -->\n      ' + extra.join('\n      ') + '\n$1');
  }
  // strip leftover PageViewport scaffolding comment (negative-lookahead keeps match inside ONE comment)
  out = out.replace(/\n*\s*<!--(?:(?!-->)[\s\S])*?Drop DS component instances inside PageViewport(?:(?!-->)[\s\S])*?-->\n*/, '\n\n');
  // replace template <main> region with source main (depth-aware)
  const [ms, me] = mainRange(out, 0);
  out = out.slice(0, ms) + main + out.slice(me);
  // inject page scripts before </body>
  if (scripts.length) {
    out = out.replace('</body>',
      '\n  <!-- ═══════════════ PAGE-SPECIFIC JS — ' + outName + ' ═══════════════ -->\n  ' +
      scripts.join('\n\n  ') + '\n</body>');
  }
  // fix path depth (Nadia two-level → one-level)
  out = out.replace(/\.\.\/\.\.\/src\//g, '../src/');

  // bake the active nav state into the static HTML (no runtime JS needed for the visual)
  out = injectActiveStates(out, outName);
  // rewrite in-content links that use flat source filenames → compiled names
  out = fixLinks(out);

  fs.writeFileSync(path.join(OUT_DIR, outName), out, 'utf8');

  // --- verify ---
  const outVars = definedVars(out);
  const usedRe = /var\(--([A-Za-z0-9-]+)/g;
  const undef = new Set();
  let u;
  while ((u = usedRe.exec(out)) !== null) if (!outVars.has(u[1])) undef.add(u[1]);
  const secOpen = (out.match(/<section\b/g) || []).length;
  const secClose = (out.match(/<\/section>/g) || []).length;
  const mainOpen = (out.match(/<main\b/g) || []).length;
  const mainClose = (out.match(/<\/main>/g) || []).length;
  const leftDepth = (out.match(/\.\.\/\.\.\/src\//g) || []).length;
  report.push({ outName, aliases: Object.keys(aliases).length, extraSym: extra.length,
    scripts: scripts.length, undef: [...undef], sec: `${secOpen}/${secClose}`,
    main: `${mainOpen}/${mainClose}`, badPaths: leftDepth });
}

console.log('built', report.length, 'pages\n');
for (const r of report) {
  const flag = (r.undef.length || r.sec.split('/')[0] !== r.sec.split('/')[1] ||
    r.main !== '1/1' || r.badPaths) ? ' <-- CHECK' : '';
  console.log(`${r.outName.padEnd(34)} sym+${String(r.extraSym).padStart(2)} js+${r.scripts} sec ${r.sec} main ${r.main} alias ${r.aliases} undef[${r.undef.join(',')}]${flag}`);
}
