// Post-processor: bake `is-active` nav state into every compiled page (idempotent).
// Decoupled from source rebuild — operates on test.page.compiled/*.html directly.
// Run: node inject-active.cjs
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'test.page.compiled');

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
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// strip any previously-baked is-active so the script is fully idempotent / re-runnable
function clearActive(html){
  return html.replace(/(<(?:div|button)[^>]*\bclass="(?:nav-menu-btn|nav-menu-item|navbar-bottom__btn))(\s+is-active)([^"]*"[^>]*?)(\s+aria-current="page")?(\s*>)/g,
    '$1$3$5');
}
function activateLabel(html, label){
  if (!label) return html;
  const lab = escRe(label);
  const re = new RegExp('<(div|button)([^>]*\\bclass="(?:nav-menu-btn|nav-menu-item|navbar-bottom__btn)[^"]*"[^>]*\\baria-label="' + lab + '"[^>]*)>', 'g');
  return html.replace(re, function(full, tag, attrs){
    if (/\bis-active\b/.test(attrs)) return full;
    const na = attrs.replace(/class="((?:nav-menu-btn|nav-menu-item|navbar-bottom__btn)[^"]*)"/, 'class="$1 is-active"');
    return '<' + tag + na + ' aria-current="page">';
  });
}
function injectActiveStates(html, file){
  const f = file.toLowerCase();
  let curLabel = null;
  for (const k in NAV_MAP){ if (NAV_MAP[k].toLowerCase() === f){ curLabel = k; break; } }
  const topLabel = curLabel ? (GROUP_MAP[curLabel] || curLabel) : (SUBPAGE_MAP[f] || null);
  let bottomLabel = null;
  for (const k in BOTTOM_MAP){ if (BOTTOM_MAP[k].indexOf(f) !== -1){ bottomLabel = k; break; } }
  [...new Set([topLabel, curLabel, bottomLabel].filter(Boolean))].forEach(lbl => { html = activateLabel(html, lbl); });
  return { html, topLabel, curLabel, bottomLabel };
}

let report = [];
for (const file of fs.readdirSync(DIR).filter(f => f.endsWith('.html'))){
  const p = path.join(DIR, file);
  let html = fs.readFileSync(p, 'utf8');
  html = clearActive(html);                       // reset prior bakes (idempotent)
  const r = injectActiveStates(html, file);
  fs.writeFileSync(p, r.html, 'utf8');
  const n = (r.html.match(/class="(?:nav-menu-btn|nav-menu-item|navbar-bottom__btn) is-active"/g) || []).length;
  report.push({ file, top: r.topLabel, cur: r.curLabel, bottom: r.bottomLabel, baked: n });
}
console.log('processed', report.length, 'pages\n');
for (const r of report){
  const flag = r.baked === 0 && r.file !== 'page-template.html' ? '  <-- no active button' : '';
  console.log(`${r.file.padEnd(34)} active=[top:${r.top||'-'} cur:${r.cur||'-'} bottom:${r.bottom||'-'}] baked:${r.baked}${flag}`);
}
