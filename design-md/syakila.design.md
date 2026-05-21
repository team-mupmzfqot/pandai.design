# Syakila — Design Session Notes
> Syakila-specific specs, confirmed DS values, and implementation decisions for the Achievement prototype pages.
> General design rules live in `CLAUDE.md` — this file does NOT duplicate them.

**DS source:** `TLVKe3bgJTdVvuPAzgDq2f` (Pandai Design System 1.5 — the ONLY valid source)
**Prototype files:** `syakila.test.git/syakila.html` · `syakila.test.git/scoreCard.html` · `syakila.test.git/AnalysisCard.html`
**Branch:** `staging` → push `.html` files to both `staging` AND `main`; push `.md` files to `staging` only

---

## Canonical template rule

`scoreCard.html` is the canonical navbar/menubar template for all Achievement pages.
`syakila.html` is the home/welcome screen — it uses a different, simpler navbar.
`AnalysisCard.html` must copy navbar/menubar CSS, HTML, and JS exactly from `scoreCard.html`.

---

## CSS tokens — Syakila-specific additions to `:root`

These variables are used in the prototypes but not in Zul's base CSS. Every file must declare them.

```css
--surface-primary-focus:            #00a36a;   /* Surface/primary/focus — pressed state bg */
--border-primary-focus:             #00a36a;   /* Border/primary/focus */
--text-primary-focus:               #00a36a;   /* large stat values context */
--text-default-heading:             #404040;   /* Text/default/heading */
--icon-default-default:             #808080;   /* Icon/default/default — action icons rest */
--icon-secondary-hover:             #70bc6f;   /* Icon/secondary/hover — nav-btn hover icon */
--border-disabled-disabled:         #bfbfbf;   /* Border/disabled/disabled */
--surface-secondary-default-subtle: #e8fbe8;   /* action icon hover bg */
```

---

## Navbar — confirmed implementation

### Section IDs and visibility

| Section | Shown at | Hidden at |
|---|---|---|
| `#NavBar-Desktop` | ≥ 1320px | `display: none` below 1320px |
| `#NavBar-Tablet` | 768px – 1319px | — |
| `#NavBar-Mobile` (syakila.html only) | < 1320px | — |
| `#NavBar-Mobile-Bottom` (scoreCard/AnalysisCard) | < 768px | — |

**Critical bug:** Never set `#NavBar-Desktop { display: block }` — this overrides `display: flex` from `.pd-navbar15`, breaking the 12px gap between navbar rows (gap only works on flex containers).

### Desktop navbar — action icon states

DS source: `Nav Button - 1.5` node `3908:6148`

| State | CSS class | Bg | Border | Icon color |
|---|---|---|---|---|
| Default | — | transparent | `var(--border-default)` | `var(--icon-default-default)` `#808080` |
| Hover | `:hover` | `var(--surface-secondary-default-subtle)` `#e8fbe8` | `var(--border-primary-default)` | `var(--icon-primary-default)` `#00cc85` |
| Pressed | `.is-pressed` (JS mousedown) | `var(--surface-primary-focus)` `#00a36a` | `var(--border-primary-default)` | `var(--icon-primary-default)` `#00cc85` |
| Active | `.is-active` | `var(--surface-primary-default)` `#00cc85` | `var(--border-primary-focus)` | `var(--icon-primary-on-color)` `#f6fdfb` |

**Icon is green (not white) in Pressed state.** DS node `3908:6156` (State=Pressed) confirms `Icon/primary/default` = `#00cc85`.

### Desktop navbar — nav-btn (menubar pill row) states

DS source: `Button - 1.5 Tertiary/L/Student`

| State | CSS class | Inner bg | Border (box-shadow inset) | Label | Icon-wrap |
|---|---|---|---|---|---|
| Default | — | transparent | none | `#666` `--text-default-body` | `#00cc85` `--icon-primary-default` |
| Hover | `:hover` | `#b5f291` `--surface-secondary-default` | `1px #70bc6f` `--border-secondary-focus` | `#70bc6f` `--text-secondary-focus` | `#70bc6f` `--icon-secondary-hover` |
| Pressed | `.is-pressed` (JS mousedown) | `#00a36a` `--surface-primary-focus` | `1px #00cc85` `--border-primary-default` | `#00cc85` `--text-primary-default` | `#00cc85` `--icon-primary-default` |
| Active/Selected | `.is-active` | `#00cc85` `--surface-primary-default` | `1px #00a36a` `--border-primary-focus` | `#f6fdfb` `--text-primary-on-color` | `#f6fdfb` `--icon-primary-on-color` |

**Pressed ≠ Active.** Pressed uses intensified green (`#00a36a`), Active uses primary green (`#00cc85`) with on-color (white) text.

### Canonical nav-btn CSS (from AnalysisCard.html — confirmed correct)

```css
.nav-btn:hover .nav-btn__inner      { background: var(--surface-secondary-default); box-shadow: inset 0 0 0 1px var(--border-secondary-focus); }
.nav-btn:hover .nav-btn__label      { color: var(--text-secondary-focus); }
.nav-btn:hover .nav-btn__icon-wrap  { color: var(--icon-secondary-hover); }

.nav-btn.is-pressed .nav-btn__inner     { background: var(--surface-primary-focus); box-shadow: inset 0 0 0 1px var(--border-primary-default); }
.nav-btn.is-pressed .nav-btn__label     { color: var(--text-primary-default); }
.nav-btn.is-pressed .nav-btn__icon-wrap { color: var(--icon-primary-default); }

/* Active/Selected — Surface/primary/default #00cc85, on-color text/icon */
.nav-btn.is-active .nav-btn__inner      { background: var(--surface-primary-default); box-shadow: inset 0 0 0 1px var(--border-primary-focus); }
.nav-btn.is-active .nav-btn__label      { color: var(--text-primary-on-color); }
.nav-btn.is-active .nav-btn__icon-wrap  { color: var(--icon-primary-on-color); }
.nav-btn.is-active:hover .nav-btn__inner     { background: var(--surface-primary-default); box-shadow: inset 0 0 0 1px var(--border-primary-focus); }
.nav-btn.is-active:hover .nav-btn__label     { color: var(--text-primary-on-color); }
.nav-btn.is-active:hover .nav-btn__icon-wrap { color: var(--icon-primary-on-color); }
```

### JS — navbar action icon mousedown handlers

Must be registered **before** non-critical JS (CLAUDE.md Rule 14):

```js
document.querySelectorAll('.navbar-action-icon').forEach(icon => {
  icon.addEventListener('mousedown',  () => icon.classList.add('is-pressed'));
  icon.addEventListener('mouseup',    () => icon.classList.remove('is-pressed'));
  icon.addEventListener('mouseleave', () => icon.classList.remove('is-pressed'));
});
```

### Nav-btn HTML structure

```html
<div class="nav-btn [is-active]">
  <div class="nav-btn__inner">
    <div class="nav-btn__icon-wrap">
      <div class="nav-btn__icon-clip" data-icon="*">
        <svg><use href="#ic-*"/></svg>
      </div>
    </div>
    <span class="nav-btn__label">Label</span>
  </div>
</div>
```

`nav-btn__label` font-weight: **500** (Medium) — not 600.

### Per-icon clip padding (DS inset % × 20px container)

| data-icon | padding |
|---|---|
| `home` | `1.67px 2.5px` |
| `battle` | `2.5px` |
| `practice` | `2.5px 1.67px` |
| `class` | `2.5px 0.83px` |
| `learn` | `1.67px 3.33px` |
| `achievement` | `2.5px 1.67px` |
| `potential` | `1.67px 1.67px 2.48px 1.67px` |

### Mobile navbar (syakila.html — `#NavBar-Mobile`)

DS node `1943:22641`

| Property | Value |
|---|---|
| Height | 64px |
| Padding | `var(--spacing-space-m) 24px` (16px top/bottom, 24px sides) |
| Fill | white |
| Border | bottom + left + right, 1px `#00cc85` |
| Border-radius | `0 0 24px 24px` |
| Logo | `116×28` left |
| Hamburger | `ic-menu`, 24×24, `<button>` with `background:none; border:none; padding:0` reset |

### Icon symbols required in SVG defs

All Syakila pages: `ic-home`, `ic-check-circle`, `ic-battle`, `ic-book-open`, `ic-users`, `ic-book`, `ic-bar-chart-2`, `ic-star`, `ic-gift`, `ic-chevron-down-nav`, `ic-menu`, `ic-heart`

scoreCard.html / AnalysisCard.html additionally: `ic-search`, `ic-maximize`, `ic-smartphone`, `ic-bell`, `ic-en`, `ic-waffle`

**`ic-waffle` (Filled/waffle-menu, DS node `3075:61110`):** `viewBox="0 0 24 24" fill="none"` — 18 paths total (9 `fill="currentColor"` circles + 9 `stroke="currentColor"` paths). Symbol must have `fill="none"` so stroke-only paths don't inherit a fill.

**`ic-bar-chart-2` (DS node `1445:7814`):** Rectangular bars. Used for Achievement nav pill (`data-icon="achievement"`) and breadcrumb home icon.

---

## Breadcrumbs — confirmed implementation

DS source: Breadcrumbs 1.5, node `837:1033`

**Structure: `[icon + parent + chevron] > [current page]`**

```html
<div class="pd-breadcrumbs15">
  <h1 class="pd-breadcrumbs__title">Page Title</h1>
  <div class="pd-breadcrumbs__sep"></div>
  <div class="pd-breadcrumbs__links">
    <button class="pd-link15" type="button">
      <svg class="pd-link15__icon-home" aria-hidden="true"><use href="#ic-bar-chart-2"/></svg>
      <span class="pd-link15__text pd-link15__text--parent">Achievement</span>
      <svg class="pd-breadcrumbs__chevron" aria-hidden="true"><use href="#ic-chevron-right-sm"/></svg>
    </button>
    <span class="pd-link15">
      <span class="pd-link15__text">Current Page Name</span>
    </span>
  </div>
</div>
```

**Color rules (DS node `837:1033` confirmed):**

| Element | Color | Token |
|---|---|---|
| Icon (`ic-bar-chart-2`) | `#00cc85` green | `.pd-link15__icon-home { color: var(--text-primary-default) }` |
| Chevron | inherits grey from `.pd-link15` | no override needed |
| Parent link text | `#4d4d4d` dark grey | `.pd-link15__text--parent { color: var(--text-default-subdued) }` |
| Current page text | `#666` grey | base `.pd-link15__text { color: var(--text-default-body) }` — no inline style |

**`<button>` color reset required:** `<button>` doesn't inherit `color` from parent in all browsers. Always set `color: var(--text-default-body)` explicitly on `.pd-link15` so the chevron renders grey.

**Never use inline `style="color:..."` on current-page text.** The base class handles it.

---

## Footer — confirmed implementation

DS node `2073:6579`

| Property | Value |
|---|---|
| Height | 60px |
| Padding | `0 28px` (vertical centering via `align-items:center`) |
| Border | top only, 1px `#00cc85` |
| Background | white |
| Layout | `SPACE_BETWEEN`, items centered vertically |
| Text | 14px / weight 500 / `#666666` (`--text-default-body`) |
| "Pandai.org" link | grey `--text-default-body` (NOT green) — `visible: false` on icon, text only |
| Heart icon | `ic-heart`, 20×20, `color: var(--icon-primary-default)` `#00cc85` |
| Position | `fixed; bottom:0; left:0; right:0; z-index:100` |

```css
.footer       { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
                background: white; border-top: 1px solid var(--border-default); }
.footer__inner { height: 60px; display: flex; justify-content: space-between;
                 align-items: center; padding: 0 28px; }
.footer__heart { width: 20px; height: 20px; color: var(--icon-primary-default); }
```

`body { padding-bottom: 90px }` — 60px footer + 30px DS gap.
Mobile: `body { padding-bottom: 102px }` when footer stacks vertically.

---

## Page background

`body { background: var(--surface-subtle); }` = `#f8fafc`

This makes the 12px gap between the two navbar rows visible (light grey showing between white elements).

---

## Canonical page shell CSS (scoreCard.html)

```css
html { overflow-x: hidden; }
body {
  display: flex; flex-direction: column;
  overflow-x: hidden;
  padding-bottom: 90px;
  /* NO min-width, NO max-width, NO width:100%, NO overflow-x:clip */
}

.pd-page { flex: 1; padding: var(--space-m) var(--page-padding-x) var(--space-m); }

/* NO overflow-x on .pd-page, NO section/main global rule */
.menubar-nav {
  height: 56px; border: 1px solid var(--border-default); border-radius: var(--corner-pill);
  display: flex; align-items: flex-start;
  gap: var(--space-xs); padding: var(--space-xs);
  /* NO overflow: hidden */
}
```

### Responsive breakpoints

```css
@media (max-width: 1319px) {
  :root { --page-padding-x: 32px; }
  #NavBar-Desktop  { display: none; }
  #NavBar-Tablet   { display: block; padding: 0 var(--page-padding-x); }
  #MenuBar-Desktop { display: none; }
  .pd-breadcrumbs15 { display: none; }
  .pd-page { padding-top: var(--space-m); }
  .menubar-panel {
    width: min(1288px, calc(100% - 48px)); top: 0;
    border-top: 0; border-radius: 0 0 var(--corner-4xl) var(--corner-4xl);
  }
}
@media (max-width: 767px) {
  :root { --page-padding-x: var(--space-m); }
  #NavBar-Tablet        { display: none; }
  #NavBar-Mobile-Bottom { display: flex; z-index: 200; }
  .footer               { display: none; }
  body                  { padding-bottom: 86px; }
  .menubar-overlay      { display: flex; align-items: center; justify-content: flex-start; padding: 0 0 60px 0; }
  .menubar-panel {
    position: relative; left: auto; top: auto; bottom: auto;
    width: min(329px, 100%); height: auto; max-height: unset;
    transform: none; border-left: 0;
    border-radius: 0 var(--corner-4xl) var(--corner-4xl) 0;
  }
  .menubar-panel__menu  { flex-direction: column; }
  .menubar-panel__divider { display: none; }
  .menubar-panel__col   { flex: none; width: 100%; }
  .menubar-panel__cta   { flex-direction: column; border-radius: 20px; }
  .panel-cta-notif      { width: 100%; }
  .panel-cta-download   { flex: none; width: 100%; }
  .menubar-panel__localization { padding: var(--space-m) var(--space-xl); }
}
```

**Padding shorthand warning:** `padding: 0 32px var(--space-m)` sets `padding-top: 0` — this overrides a previously set `padding-top: 16px`. Always use 4 values or set `padding-top` separately.

---

## Menubar panel — confirmed specs

**Tablet (≤1319px) — DS Nav Menu Tablet - 1.5 node `3427:2184`:**
- `width: min(1288px, calc(100% - 48px))`, `top: 0`, no top border, `border-radius: 0 0 24px 24px`

**Mobile (≤767px) — DS Nav Menu Mobile - 1.5 node `3427:2442`:**
- `position: relative; width: min(329px, 100%)`, no left border, `border-radius: 0 24px 24px 0`
- Overlay: `display: flex; justify-content: flex-start; padding: 0 0 60px 0`

**Mobile overlay must use `position: relative` on panel** — `position: fixed; left: 0` fails when inside an `opacity`-stacking-context overlay.

### Panel item states (DS Dropdown-Parts)

```css
.panel-item:hover:not(.is-active) {
  background: var(--surface-secondary-default-subtle); /* #e8fbe8 */
  border-color: var(--border-primary-default);
  color: var(--text-primary-default);
}
.panel-item:active:not(.is-active),
.panel-item.is-touch:not(.is-active) {
  background: var(--surface-secondary-default);        /* #b5f291 */
  border-color: var(--border-primary-focus);
  color: var(--text-primary-focus);
}
.panel-item.is-active {
  background: var(--surface-secondary-default);
  border-color: var(--border-primary-focus);           /* #00a36a */
  color: var(--text-primary-focus);
}
```

Home, Quiz, Battle, Practice panel items have **no chevron** — they navigate directly.

### Logo symbol

```html
<symbol id="logo-pandai-h" viewBox="0 0 116.479 28">
  <!-- 12 colored mark paths + 7 dark wordmark paths — NO clipPath wrapper -->
</symbol>
```

DS node: `1943:22622` (Logo/Pandai/Logo Horizontal, 116×28).
`<clipPath>` inside a `<symbol>` does NOT resolve via `<use>` shadow DOM — never add it.

---

## Subject Badge — confirmed DS reference

**Source:** DS node `2339:1355` (Subject Badge - 1.5, `🔰 Iconography` page)

**Structure (Size=M, h:32px, border-radius: 60px):**
- Icon slot: `width: 40px; padding: 4px 8px 4px 12px; background: white`
- Label slot: `padding: 0 16px 0 12px; gap: 8px; font: Poppins Medium 14px/20px`
- Text default: `#f2f2f2` — exceptions: Science `#998027`, KAFA `#538865`

**Confirmed badge colors (DS node 2339:1355, May 2026):**

| Subject | `--badge-bg` | `--badge-border` | Text |
|---|---|---|---|
| Account | `#0072ca` | `#004479` | `#f2f2f2` |
| Add Math | `#283589` | `#182052` | `#f2f2f2` |
| Bahasa Melayu | `#4d77ff` | `#2e4799` | `#f2f2f2` |
| Biology | `#8431d8` | `#6a27ad` | `#f2f2f2` |
| Business | `#efb42b` | `#bf9022` | `#f2f2f2` |
| Chemistry | `#e20082` | `#b50068` | `#f2f2f2` |
| Chinese Language | `#f94848` | `#c73a3a` | `#f2f2f2` |
| Computer Science | `#d10070` | `#a7005a` | `#f2f2f2` |
| Economy | `#ff5733` | `#cc4629` | `#f2f2f2` |
| English | `#ff4d56` | `#cc3e45` | `#f2f2f2` |
| Geography | `#77d836` | `#5fad2b` | `#f2f2f2` |
| History | `#a97c50` | `#876340` | `#f2f2f2` |
| Islamic Studies | `#de4d7f` | `#b23e66` | `#f2f2f2` |
| KAFA | `#8ae3a9` | `#6eb687` | `#538865` |
| Mathematics | `#42ac7b` | `#358a62` | `#f2f2f2` |
| Moral Studies | `#0072ca` | `#005ba2` | `#f2f2f2` |
| Physics | `#27a0d7` | `#1f80ac` | `#f2f2f2` |
| RBT | `#353535` | `#2a2a2a` | `#f2f2f2` |
| Science | `#ffd641` | `#ccab34` | `#998027` |

**Corrections vs CLAUDE.md Rule 17b:** Account border `#004479` (not `#005ba2`), Add Math border `#182052` (not `#202a6e`), Bahasa Melayu border `#2e4799` (not `#3e5fcc`), KAFA text `#538865` (not `#358a62`), Chinese Language added.

---

## scoreCard.html — DS confirmed specs

**Figma source node:** `3107:65095` (Score Card, 1441×849)

### Score Card outer (DS 3107:65119)

| Property | Value |
|---|---|
| Layout | `display:flex; gap:16px; padding:16px; align-items:stretch` |
| Background | `#e8fbe8` (`--surface-secondary-default-subtle`) |
| Border | `1px solid #00cc85` |
| Border-radius | `24px` |
| 3 columns | `flex:1` each |

### Left container (DS 3107:65120)

- Layout: `flex-direction:column; gap:50px; padding:20px; background:#ffffff; border-radius:18px`
- "All Subjects" button: full-width, `justify-content:center; width:100%`
- Donut: SVG 138×138, `cx:69 cy:69 r:50 stroke-width:18`, grey track `#e8e8e8`, green `#00cc85`
- Center label: "61.5%" `fs:28 fw:700 color:#00cc85`

### Mid container (DS 3107:65145)

- Layout: `flex-direction:column; gap:45px; padding:20px; background:#ffffff; border-radius:18px`
- Icon circle: `48×48; bg:#d1f7d1; r:60px` containing `ic-activity` (22×22)
- "Score for the past one week" `fs:20 fw:500 color:#404040`
- Line chart: ViewBox `-4 -4 387 88`, 7 points, stroke `#00cc85 stroke-width:1.5`, dots `r:3 fill:white stroke:#00cc85`

### Right container (DS 3107:65162) — stat cards

Icon circles: `48×48; bg:#d1f7d1; r:60px`

| Icon | DS node | Symbol |
|---|---|---|
| Mid header | `I3107:65148;260:372` | `ic-activity` |
| Current Streak | `I3107:65166;611:2634` | `ic-rotate-cw` |
| Longest Streak | `I3107:65172;611:2638` | `ic-refresh-cw` |
| Today's Quiz | `I3107:65179;611:3011` | `ic-edit-3` |
| Total Quiz | `I3107:65185;611:2936` | `ic-copy` |
| Last Submission | `I3107:65192;611:2945` | `ic-clock` |

Stat card icon viewBoxes: `ic-activity` `-1 -1 22 20` · `ic-rotate-cw` `-1 -1 22 20` · `ic-refresh-cw` `-1 -1 24 20` · `ic-edit-3` `-1 -1 20 22` · `ic-copy` `-1 -1 22 22` · `ic-clock` `-1 -1 22 22`

**Text styles:**
- Labels: `fs:14 fw:400 color:#404040` (`--text-default-heading`)
- Values (streak/quiz cards): `fs:18 fw:700 color:#00a36a` (`--text-primary-focus`)
- Bottom stats (donut card): `fs:28 fw:700 color:#00a36a`

**Stat 2 (DS 3107:65196) is `visible:false`** — not rendered, ignore entirely.

### Subject filter pills

Container: `display:flex; flex-wrap:wrap; justify-content:center; gap:12px`

| State | bg | border | color |
|---|---|---|---|
| Active ("All") | `#00cc85` | `#00a36a` | `#e9fbf5` |
| Default | `#ffffff` | `#00cc85` | `#00cc85` |
| Hover | `#b5f291` | `#70bc6f` | `#70bc6f` |

All pills: `h:32px; padding:2px 8px; border-radius:60px; font:12px/600`

---

## AnalysisCard.html — DS confirmed specs

### Breadcrumb

- Icon: `#ic-bar-chart-2` (DS Outline/bar-chart-2 node `260:473`)
- Parent link text: `#4d4d4d` via `.pd-link15__text--parent { color: var(--text-default-subdued) }`
- Current page text: `#666` via base `.pd-link15__text` — no inline override

### Donut chart responsive layout

**Tablet (≤1279px):**
```css
.an-donut-pairs { width: 100%; flex-direction: column; gap: 24px; }
.an-donut-col   { width: 100%; flex-direction: row; align-items: center; gap: 24px; }
.an-donut-wrap svg { width: 140px; height: 140px; flex-shrink: 0; }
```

**Mobile (≤767px):**
```css
.an-donut-pairs { flex-direction: column; gap: var(--space-m); }
.an-donut-col   { width: 100%; flex-direction: row; align-items: center; justify-content: flex-start; gap: var(--space-m); }
.an-donut-wrap svg { width: 100px; height: 100px; flex-shrink: 0; }
.an-legend      { align-items: flex-start; flex-shrink: 1; min-width: 0; }
.an-legend__row { width: 130px; margin: 0; }
```

Side-by-side was wrong — two 400px+ columns cannot fit in a ~700–800px card content area.

---

## syakila.html — home/welcome screen

**Navbar:** Uses full desktop navbar (`#NavBar-Desktop` / `#NavBar-Mobile`), same as Zul's.
**Active nav:** Achievement button (`data-icon="achievement"`, `ic-bar-chart-2`).
**Section breakpoint:** `#NavBar-Desktop` hides at `max-width: 1319px`; `#NavBar-Mobile` shows.

### Responsive breakpoints (syakila.html)

| Breakpoint | Changes |
|---|---|
| `@media (max-width: 1319px)` | Mobile navbar, hide breadcrumbs, `--page-padding-x: 32px` |
| `@media (max-width: 1279px)` | `welcome-text__name: 24px/36lh`, welcome stacks vertically |
| `@media (max-width: 767px)` | `--page-padding-x: var(--space-m)`, `welcome-text__name: 20px/32lh`, table card layout |

### scoreCard table — tablet/mobile card layout (≤1279px)

```
┌────────────────────────────────┐  24px outer card radius
│ [Subject badge — full width]   │  row 1, tinted bg
│ [Progress bar]                 │  row 2
│ SCORE   │   GRADE  │ QUESTIONS │  row 3, 3 equal cols
│                    [View →]    │  row 4, right-aligned
└────────────────────────────────┘
```

Key CSS decisions:
- `.pd-body-row`: `flex-wrap:wrap; border:1px solid var(--border-general-default); border-radius:var(--corner-2xl); overflow:hidden`
- `.pd-col-score/grade/questions`: `flex-direction:column` so `::before` labels stack ABOVE values
- View button: `.pd-body-cell.pd-col-analysis .pd-body-cell__inner { justify-content: flex-end }` — specificity (0,3,0)
- Divider borders: `.pd-body-row .pd-body-cell.pd-col-score/grade` at (0,3,0) to beat border resets

---

## Bug fixes log

| File | Bug | Fix | Source |
|---|---|---|---|
| All 3 | `--surface-primary-focus` not declared in `:root` | Added `--surface-primary-focus: #00a36a` | Live DS |
| All 3 | `--text-primary-on-color: #e9fbf5` wrong | `#f6fdfb` | design.color.md §3.2 |
| All 3 | `--surface-primary-default-subtle: #ccf5e7` wrong | `#d9f7ed` | design.color.md §3.1 |
| All 3 | `--icon-secondary-hover` → `--icon-secondary-on-color` | Reverted back to `--icon-secondary-hover` | DS token name `Icon/secondary/hover` |
| All 3 | `--border-disabled` renamed | `--border-disabled-disabled: #bfbfbf` | Canonical DS name |
| All 3 | Nav-btn `.is-pressed` bg was `--surface-tertiary-default` (#00564c) | `--surface-primary-focus` (#00a36a) | design.color.md §6.3 |
| All pages | Nav-btn `.is-active` bg was `--surface-tertiary-default` (#00564c dark teal) | `--surface-primary-default` (#00cc85) + on-color text/icon | DS live confirmed: Surface/primary/default |
| scoreCard + syakila | Breadcrumbs used inline SVG paths | Replaced with `<use href="#ic-bar-chart-2"/>` and `<use href="#ic-chevron-right-sm"/>` | CLAUDE.md Rule 36 |
| scoreCard + syakila | Breadcrumb current-page had inline `color:#00cc85` | Removed inline style, base class `.pd-link15__text` handles grey | DS color rules |
| syakila | Achievement nav pill used `ic-book-open` | Changed to `ic-bar-chart-2` | DS nav inspection |
| syakila | `ic-waffle` was wrong 9-dot version | Replaced with 18-path DS export from node `3075:61110` | DS export |
| syakila | Navbar action icon JS was missing entirely | Added mousedown/mouseup/mouseleave handlers | CLAUDE.md Rule 39 |
| syakila | Navbar action icon Pressed icon was `--icon-primary-on-color` (white) | `--icon-primary-default` (green) | DS node `3908:6156` |
| scoreCard | Account/AddMath/BM badge borders wrong | Updated to DS node 2339:1355 values | DS confirmed reference |
| AnalysisCard | `body` had `overflow-x:clip; min-width:390px; width:100%` | `overflow-x:hidden` only | scoreCard canonical |
| AnalysisCard | `.menubar-nav` had extra `overflow:hidden` | Removed | scoreCard canonical |
| AnalysisCard | Nav-btn hover icon token name wrong | `--icon-secondary-hover` (not `--icon-secondary-on-color`) | DS token name |

---

## Navbar action button → popup dropdowns (scoreCard + AnalysisCard)

### Anatomy — every popup requires all 4 parts

1. **Button HTML** — `id`, `aria-haspopup="true"`, `aria-expanded="false"` on the `.navbar-action-icon` div.
2. **Dropdown HTML** — `<div class="[name]-dropdown" id="[name]-dropdown" role="menu" aria-hidden="true">` placed inside `#NavBar-Desktop` (after the last sibling dropdown).
3. **CSS** — shared pattern: `position:absolute; top:68px; right:0; z-index:200; background:white; border:1px solid var(--border-primary-default); border-radius:var(--corner-4xl); padding:var(--space-m); opacity:0; transform:translateY(-8px); pointer-events:none; transition:opacity 0.18s, transform 0.18s;` — `.is-open` sets `opacity:1; transform:translateY(0); pointer-events:auto`.
4. **JS IIFE** — right-aligns via `getBoundingClientRect()`, closes all other dropdowns on open, click toggle, outside-click close, Escape close.

### Right-alignment pattern

```js
const navSec  = document.getElementById('NavBar-Desktop');
const btnRect = btn.getBoundingClientRect();
const secRect = navSec.getBoundingClientRect();
dropdown.style.right = Math.round(secRect.right - btnRect.right) + 'px';
```

### Confirmed dropdowns (May 2026)

| Button ID | Dropdown ID | Trigger |
|---|---|---|
| `waffle-btn` | `learn-menu` | Waffle/grid icon |
| `avatar-btn` | `profile-menu` | User avatar |
| `locale-btn` | `locale-dropdown` | EN language icon |
| `notif-btn` | `notif-dropdown` | Bell icon |
| `download-btn` | `download-dropdown` | Smartphone icon |

### Mutual exclusivity (Rule 53)

Every `openX()` function must close all **other** dropdowns before opening its own. Add a 2-line block per sibling:
```js
const dd = document.getElementById('other-dropdown'); const db = document.getElementById('other-btn');
if (dd) { dd.classList.remove('is-open'); dd.setAttribute('aria-hidden', 'true'); }
if (db) { db.classList.remove('is-active'); db.setAttribute('aria-expanded', 'false'); }
```
When adding a new dropdown → update every existing `openX()` to include it.

### Notification dropdown — structural state change

The notif item changes **layout**, not just color, on hover/pressed:
- **Default**: `padding: 12px 12px 0` outer; inner row has `border-bottom: 1px solid var(--border-general-default); padding-bottom: 12px`
- **Hover**: outer gets `padding: 12px` + `border-color: var(--border-primary-default)` + `background: #f6fef6`; inner `border-bottom: none; padding-bottom: 0`
- **Pressed** (JS mousedown — Rule 39): `background: var(--surface-primary-focus)` — same layout as hover

### Download dropdown — app store icons

App store icons are multi-color fills → **2× PNG only**, never SVG symbols (CLAUDE.md Rule 55).

| File | DS node | Size |
|---|---|---|
| `assets/icon-playstore.png` | `3909:3024` | ~1552 bytes |
| `assets/icon-appstore.png` | `3909:3023` | ~3209 bytes |
| `assets/icon-appgallery.png` | `3909:3022` | ~3156 bytes |

Use `<img width="24" height="24" object-fit="contain">` — `object-fit: contain` on the CSS rule handles non-square icons correctly.

No title text in the dropdown — 3 `<a>` items directly inside the container.

### Fullscreen button — maximize icon

```js
btn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});
document.addEventListener('fullscreenchange', () => {
  btn.classList.toggle('is-active', !!document.fullscreenElement);
});
```

`Escape` exits fullscreen natively — the `fullscreenchange` listener automatically removes `.is-active`.

---

## Git workflow

```powershell
# Push HTML files to both branches
git push origin staging && git push origin staging:main

# Push .md files to staging only
git push origin staging
```

---

## Nav button state — final confirmed values (DS live, Session 6)

| State | bg | border (box-shadow) | label | icon |
|---|---|---|---|---|
| Default | `--surface-general-default` white | none | `--text-default-body` #666 | `--icon-primary-default` #00cc85 |
| Hover | `--surface-secondary-default` #b5f291 | `--border-secondary-focus` #70bc6f | `--text-secondary-focus` #70bc6f | `--icon-secondary-hover` #70bc6f |
| Pressed | `--surface-tertiary-default` #00564c | `--border-tertiary-focus` #00453d | `--text-primary-default` #00cc85 | `--icon-primary-default` #00cc85 |
| **Active** | **`--surface-primary-default` #00cc85** | **`--border-primary-focus` #00a36a** | **`--text-primary-on-color`** | **`--icon-primary-on-color`** |

Active = solid green pill with white/light text. Pressed = dark teal (momentary click feedback).

*Last updated: May 2026 (Session 6)*
