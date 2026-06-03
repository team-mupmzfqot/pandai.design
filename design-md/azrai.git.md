# Azrai — Development Context & Resume Log

> **Purpose** — session/handoff context for Azrai's prototype work. On resume, load the shared docs first (`CLAUDE.md`, `design.color.md`, `design-md/zul.design.md`, `design-md/nadia.design.md`, `design-md/syakila.design.md`), **then** read this file to regain where we left off.
>
> **Source of truth** — Figma `TLVKe3bgJTdVvuPAzgDq2f` (Pandai DS 1.5). Ignore the WIP BACKUP and any "Zul's Dungeon / Nadia Exploration / Syakila Components" results.
>
> **Last updated:** 2026-06-03

---

## 0. What we're building

A **Profile page** prototype, in a single self-contained HTML file. The file is named `characterCustomizer.html` because the end goal is a **Character Customizer** panel that opens from a "Customize Avatar" button on this profile page. The profile page itself is built first; the customizer panel is the next milestone.

- **File:** [`azrai.test.git/characterCustomizer.html`](../azrai.test.git/characterCustomizer.html)
- **Base:** copied wholesale from [`zul.test.git/zul.page.template.html`](../zul.test.git/zul.page.template.html) — gives the full Navigation Shell (desktop primary navbar + top menu, tablet, mobile navbar + bottom bar + slide-in menu), all dropdowns + their JS, footer, and the canonical `:root` token set.
- **DS design source:** Profile node **`4477:78420`** ("Profile") in `TLVKe3bgJTdVvuPAzgDq2f`.
- **Preview:** user runs **live-server** (not `npx serve`).

---

## 1. Status — DONE ✅

Everything below is built, structurally verified, and reviewed in live-server.

### Page structure (inside `#PageViewport`)
```
#PageViewport  (drop-zone box overridden → transparent, top-aligned, 16px gap)
  .pf-breadcrumb-row          → Breadcrumb - 1.5
  #ProfileHeader-Desktop .pf-card   → Profile header card (DS 4477:78424)
  #ProfileGrid-Desktop .pf-grid     → 3-column grid (DS 4477:78425)
  #CharacterCustomizer-Desktop      → EMPTY, hidden — the customizer panel (TODO)
```

### 1a. Breadcrumb - 1.5  (reused from `syakila.html` `.pd-breadcrumbs15`, ported to canonical tokens)
- Title "My Profile" (24px/36 Medium, `--text-tertiary-default` #00564c) · vertical separator · trail **My Profile › Showcase** (parent link green + chevron, current muted).
- Classes: `.pf-breadcrumb-row`, `.pf-breadcrumbs`, `.pf-breadcrumbs__title/__sep/__links/__chevron`, `.pf-bc-link`.

### 1b. Profile header card  (DS `4477:78424` — Primary Card - 1.5 **Secondary variant**)
- Outer `.pf-card`: `--surface-secondary-default-subtle` (#e8fbe8) + 1px `--border-default` (#00cc85) + 24px radius + 16px pad, flex col gap 8.
- `.pf-profile`: white panel, **border via `::after` overlay** (`box-shadow: inset 0 0 0 1px --border-primary-focus`, `z-index:2`, `pointer-events:none`) so it renders above the cover banner (Rule 118). 18px radius.
- `.pf-profile__cover`: interchangeable banner = inline **SVG checkerboard pattern** (no file, no CSS gradient → Rule 5 safe). Swap via `background-image`.
- `.pf-profile__avatar`: 140px, white ring + DS Shadow/+10, **perfect circle via `--corner-radius-corner-pill` (999px)** — NOT corner-rounded (60px → squircle on 140px). Uses the navbar avatar image.
- Top bar `.pf-profile__topbar`: "Premium" pill (left, `padding-left:185px` to clear the avatar) + `.pf-profile__actions` group on the right = **Customize Avatar** button + "..." more button (`.pf-icon-btn`).
- 3 columns: identity + info list (`.pf-identity`, `.pf-info`, `.pf-verified`) · About Me + Personality (`.pf-col-bio`, `.pf-block`) · Hobby + Interest chips (`.pf-col-tags`, `.pf-chip`).
- Name: **Azrai Zulkifli** / **@azulkifli**.

### 1c. "Customize Avatar" button  (`#btn-customize-avatar`, `.pf-btn-customize`)
- DS **Button - 1.5 Primary/L** (filled green, leading `ic-edit` icon). No transition (Rule 82) + `.is-pressing` JS (Rule 83).
- Lives in the header card top bar (right). Click currently smooth-scrolls to `#CharacterCustomizer-Desktop` — **placeholder wiring**; re-point to the customizer panel/modal once built.

### 1d. 3-column grid  (DS `4477:78425`) — `.pf-grid` `grid-template-columns: 360px minmax(0,1fr) 360px`, gap 16
- **Left** (`4477:78426`): *Achievements* `.pf-mini-card` (green "+" `.pf-icon-btn` + `#1st Malaysia` + `Feb 2025 • Form 4` meta) + *Avatar Collection (9)* (reward rows).
- **Middle** (`4477:78620`): *Activities* `.pf-card` (bookmark + "Activities" header, white `.pf-activities__panel`) → **Today** (4 rows) → `.pf-divider` → **Yesterday** (4 rows). Each row = Subject Badge + `• time` + Label Badges.
- **Right** (`4477:78621`): *badges (12)* + *Avatar Collection (9)* mini-cards (reward rows).
- Mini-card = white card, 1px `--border-general-default` (#d9d9d9), 24px radius, `#e8fbe8` header strip (`Title/T2` #00564c).
- Reward row = collectible image (63×86) + `.pf-pill` (green, 10px white) + title (`Title/T3`) + caption + `.pf-progress` bar.
- Label Badge - 1.5 = `.pf-label-badge` (#d9f7ed bg / #66e0b6 border / #00cc85 text).

---

## 2. Decisions (carry forward — don't re-litigate)

- **Token convention = canonical full Figma-path kebab** (`--surface-general-default`, `--text-default-heading`, `--spacing-space-m`, `--corner-radius-corner-4xl`, `--font-family`). This matches zul/nadia and `design.color.md` §2. The old `azrai.html` short-form (`--surface-default`, `--space-m`, `--font`, the fabricated `--surface-subtle`) is **deprecated — do not use**.
- **Off-system DS colors → mapped to canonical tokens** (user direction 2026-06-03). The profile node's bio used a legacy/Bootstrap-ish palette; mapped: headings→`--text-default-heading` #404040, body→`--text-default-body` #666, greens→`--surface-primary-default` #00cc85, **interest-chip blue → `--surface-informative-default` #00a2e8** (canonical Pandai info blue, not Bootstrap #0d6efd).
- **All profile CSS is `pf-`-prefixed** and lives in one block before `</style>`. Subject Badge CSS ported verbatim from zul.
- **Chips** (Hobby/Interest): outlined, **full pill radius** (`--corner-radius-corner-rounded`). Hobby=green, Interest=info-blue.

### New token added to `:root`
- `--border-primary-default-hover: #66e0b6` — Border/primary/default-hover (Label Badge border).

### New icon symbols added to `<defs>`
- `ic-more-horizontal` (3 dots, profile "..." button), `ic-map-pin` (location row).

### Assets — `src/image-repo/characterCustomizer/assets/main/ProfileHeader-Desktop/`
- `avatar.png` — copy of navbar `Avatar-Aidan.png`.
- `personality.png` — DS "image 18" illustration (1043×1043, transparent).
- `reward-score.png`, `reward-streak.png` — 63×86 collectibles (the "1000" framed avatar + owl), captured via `get_screenshot contentsOnly` at native size.
- Cover banner = inline SVG checkerboard (no file).

---

## 3. Gotchas / lessons from this build

1. **Subject Badge `<svg>` MUST have explicit `width`/`height`/`viewBox`** matching each icon's symbol viewBox. A bare `<svg><use></svg>` has no intrinsic ratio, so `width:auto` balloons the white icon slot to fill the row. zul does this on every subject svg. (viewBoxes: add-math 21×24, biology 17×24, physics 22×24, chemistry 15×24, english 24×24, math 19×24, history 24×24, moral 20×24, pointer 4×8.)
2. **DS `get_design_context` asset URLs can export BLANK** (the `img10Image759…` reward images came through empty/transparent). When an image fill won't export, re-capture the **image node** via `get_screenshot` with `contentsOnly:true` at native size. (Note Rule 78: plain screenshots composite on dark canvas — `contentsOnly` avoided that here for full-bleed images.)
3. **Perfect circle** needs radius ≥ half the box. `--corner-radius-corner-rounded` (60px) on a 140px avatar = squircle; use `--corner-radius-corner-pill` (999px).
4. **Inset-border + edge-to-edge child** (cover banner over the panel's top border): inset `box-shadow` paints behind children, so the top border disappears. Fix = `::after` overlay border with `z-index` + `pointer-events:none` (Rule 118 pattern).
5. **Section-tag count false-positive**: the template comment `<section id="SectionName-Desktop">` (Rule 10 note) inflates `<section` greps by 1 — not a real unclosed tag.
6. **Two card styles in this page**: left/right "mini-cards" = white card + tinted header strip (#d9d9d9 border). Middle Activities + header card = Primary Card Secondary (#e8fbe8 + #00cc85 border). Don't unify them.

---

## 4. Pending / next steps

- **NEXT: build the Character Customizer panel** that `#btn-customize-avatar` opens (currently a placeholder scroll to the empty hidden `#CharacterCustomizer-Desktop`). Needs its own DS node ref from the user.
- **Responsive not done** — page is desktop-first; `.pf-grid` is fixed `360 / 1fr / 360`. Tablet/mobile breakpoints + column stacking still to add.
- **Sample-content notes** (intentional, easy to revert to DS-literal):
  - Activity feed uses varied subjects/times/labels; DS placeholder was all "Additional Mathematics / 06:00 AM / 1 Exam".
  - Achievement leading icon = green "+" (matches DS placeholder); a trophy/medal would read better.
  - Header info-list icons (bookmark/calendar/user/map-pin/mortar-board/clock) are placeholder choices — DS used the Twitter icon for all six.
  - Label Badge bg uses canonical `--surface-primary-default-subtle` (#d9f7ed); live DS currently shows #e1f9ea for that token (minor drift — see Rule 61).

---

## 5. Resume prompt (paste next session, after loading the shared .md files)

```
Resuming Azrai's profile prototype. I've loaded CLAUDE.md, design.color.md, and the
design-md/*.design.md files. Read design-md/azrai.git.md for my session context.
We're working in azrai.test.git/characterCustomizer.html (Profile page, DS node 4477:78420).
The profile page is done (breadcrumb + header card + 3-column grid). Next: build the
Character Customizer panel that the "Customize Avatar" button opens — I'll give the DS node.
```
