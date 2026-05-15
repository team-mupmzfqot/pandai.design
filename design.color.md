# Pandai DS 1.5 — Color Utilization Guide

> **Purpose** — a single, agent-friendly reference for every color used in this repo. Use this file when implementing any UI surface that needs a color, border, icon stroke, badge fill, or interactive state.
>
> **Audience** — Claude Code, Codex, GitHub Copilot, Cursor, JetBrains AI, and any human/IDE pairing with them.
>
> **Source of truth** — Figma file `TLVKe3bgJTdVvuPAzgDq2f` ("Pandai Design System 1.5"). Never use the WIP Backup (`Y0DLhf2MGdGwG0jyjN7EbQ`). When `search_design_system` returns results from "WIP (BACKUP)", "Zul's Dungeon", "Nadia Exploration", or "Syakila Components", **ignore them entirely** — only the main DS is authoritative.
>
> **Companion files** — [CLAUDE.md](CLAUDE.md) (full implementation rules, 1–76+), [design-md/zul.design.md](design-md/zul.design.md), [design-md/nadia.design.md](design-md/nadia.design.md), [design-md/syakila.design.md](design-md/syakila.design.md).

---

## 0. TL;DR for agents (read this first)

1. **Never hardcode a hex value in a rule declaration.** Always reference a CSS custom property — e.g. `color: var(--text-default-heading)`, never `color: #404040`.
2. **Pick the token by semantic context, not by hex.** `--icon-primary-default` and `--surface-primary-default` are both `#00cc85` — only one is correct for any given line of CSS.
3. **Never invent tokens.** No `--surface-success-subtle`, no `--pd-*` prefix, no `--brand-green`. Only the names in §3 of this file exist.
4. **Never derive a hover/pressed/disabled color by darkening or lightening the default.** Every interactive state is a discrete DS variant — pull each from Figma separately (see §6).
5. **Never use gradients.** All fills are flat tokens. (Exception: Subject icon SVGs may contain internal gradients — those are baked into the icon file and not redrawn in CSS.)
6. **Never use `box-shadow` for elevation on cards/modals/containers.** Use a `1px solid var(--border-primary-default)` border instead. Elevation effect styles exist in the DS for reference only and are not applied to UI containers in implementation. (See [CLAUDE.md Rule 6](CLAUDE.md).)
7. **Token name = Figma path, kebab-cased.** `Surface/primary/default` → `--surface-primary-default`. No abbreviations, no renaming.
8. **When in doubt, inspect the sub-node, not the parent.** A button's chevron color is on the chevron node, not the button node ([CLAUDE.md Rule 12](CLAUDE.md)).

---

## 1. Token architecture

The DS has three variable collections, layered:

```
Primitives  ──┐
              ├──►  Product (per role: Student / Teacher / Parent)  ──┐
              │                                                       ├──►  Semantic (Light / Dark)  ──►  CSS custom properties
              └──────────────────────────────────────────────────────►┘
```

| Collection | Modes | Contains | When to read |
|---|---|---|---|
| **Primitives** | 1 (Value) | Raw hex values: `Grey/50–950`, `OG-Green/*`, `Pink/*`, `Foundation/*`, etc. | Never reference directly in CSS — only via aliases. |
| **Product** | 3 (Student / Teacher / Parent) | Role-specific aliases: `Primary/Base`, `Secondary/Base`, `Tertiary/*`. Resolves to a different Primitive per role. | Only when a component needs to differ per user role (e.g. Button - 1.5). |
| **Semantic** | 2 (Light / Dark) | Use-case aliases: `Surface/*`, `Text/*`, `Icon/*`, `Border/*`, `Overlay/*`. | **Default for all CSS.** This is what 95% of code should reference. |

**Critical implication — Student is OG-Green, not pink** ([CLAUDE.md Rule 18](CLAUDE.md)):

| Role | Primary palette | `Surface/primary/default` |
|---|---|---|
| **Student** | OG-Green | `#00cc85` |
| **Teacher** | Pink | `#ff5c98` |
| **Parent** | Yellow | (yellow) |

- Components using **Semantic** tokens (navbar, cards, borders, dividers) always render `#00cc85` regardless of role — they're role-neutral.
- Components using **Product** tokens (Button - 1.5, role-specific UI) resolve to the active role's palette.
- The prototypes in this repo (`zul.test.git`, `nadia.test.git`, `syakila.test.git`) are all **Student** context → `#00cc85` is everywhere.

---

## 2. CSS variable naming convention

Token names mirror the Figma path exactly, kebab-cased:

```
Figma:  Surface/primary/default            → CSS: --surface-primary-default
Figma:  Text/default/heading               → CSS: --text-default-heading
Figma:  Border/secondary/focus             → CSS: --border-secondary-focus
Figma:  Spacing/space-m                    → CSS: --spacing-space-m
Figma:  Corner Radius/corner-rounded       → CSS: --corner-radius-corner-rounded
```

**Rules:**
- Do **not** add a `--pd-` prefix.
- Do **not** abbreviate (`--surf-pri-def` ❌).
- Do **not** invent intermediate names (`--brand-green`, `--success-subtle` ❌).
- Subject palette uses the dotted name as-is: `--subjects-b-melayu-default`, `--subjects-add-math-default`.

---

## 3. Complete CSS variable reference (Student context, Light mode)

### 3.1 Surface — backgrounds and fills

| CSS variable | Hex | Figma path | Where it's used |
|---|---|---|---|
| `--surface-general-default` | `#FFFFFF` | `Surface/general/default` | Page background, card backgrounds, modal containers, nav-menu button bg, footer bg. **The canonical white.** |
| `--surface-subtle` | `#F8FAFC` | `Surface/subtle` | Sectional alt background (rarely used; prefer white). |
| `--surface-primary-default` | `#00cc85` | `Surface/primary/default` | Primary button fill (Default state), badge fills that say "active", carousel button container fill, Score status pill fill. The "Pandai green." |
| `--surface-primary-focus` | `#00a36a` | `Surface/primary/focus` | Primary button border (Default), focus rings on primary inputs. **Do not use for button labels** — that's `--text-primary-on-color`. |
| `--surface-primary-default-subtle` | `#e9fbf5` | `Surface/primary/default-subtle` | Tint backgrounds for primary-themed cards or alerts (light mint). |
| `--surface-primary-default-subtle-hover` | `#99ebce` | `Surface/primary/default-subtle-hover` | Primary button arrow circle bg (Default state). |
| `--surface-secondary-default` | `#b5f291` | `Surface/secondary/default` | Primary button bg (**Hover** state — Primary→Secondary palette transition, see §6.1). |
| `--surface-secondary-default-subtle` | `#e8fbe8` | `Surface/secondary/default-subtle` | Primary button arrow circle bg (Hover state). |
| `--surface-tertiary-default` | `#00564c` | `Surface/tertiary/default` | Primary/Secondary/Tertiary button bg (**Pressed/Active** state — all variants share this dark teal). Active nav-btn bg. |
| `--surface-disabled-primary` | `#f2f2f2` | `Surface/disabled/primary` | Disabled button bg, disabled input bg, disabled badge bg. |

### 3.2 Text — character fills

| CSS variable | Hex | Figma path | Where it's used |
|---|---|---|---|
| `--text-default-heading` | `#404040` | `Text/default/heading` | Headings H1–H4, card titles, section titles. **Not** dark navy — this is a soft graphite. |
| `--text-default-body` | `#666666` | `Text/default/body` | Body copy, nav-menu button labels, footer text, descriptions. |
| `--text-default-secondary` | `#6B7280` | `Text/default/secondary` | Secondary captions, helper text. |
| `--text-default-placeholder` | `#f2f2f2` | `Text/default/placeholder` | Input placeholder text. |
| `--text-primary-default` | `#00cc85` | `Text/primary/default` | Primary-colored text (e.g. "Pandai.org" link in footer, button label on **Pressed** state, nav-btn active label). |
| `--text-primary-on-color` | `#f6fdfb` | `Text/primary/on-color` | Button label on primary fill (Default state). **Not pure white** — a green-tinted off-white. |
| `--text-secondary-focus` | `#70bc6f` | `Text/secondary/focus` | Button label on **Hover** state (primary→secondary palette). |
| `--text-tertiary-default` | `#00564c` | `Text/tertiary/default` | Dark teal text on light backgrounds. |
| `--text-on-color-heading` | `#FFFFFF` | `Text/on-color/heading` | Heading text rendered on dark/colored backgrounds. |
| `--text-disabled-default` | `#bfbfbf` | `Text/disabled/default` | Disabled button labels, disabled input text. |

### 3.3 Icon — SVG stroke/fill

Icons are colored via `stroke="currentColor"` in the `<symbol>` and the parent CSS `color:` property. The icon variable is the value assigned to `color:` on the icon container — not directly applied to the SVG.

| CSS variable | Hex | Figma path | Where it's used |
|---|---|---|---|
| `--icon-default-default` | `#808080` | `Icon/default/default` | Default-state outline icons (e.g. nav-btn icons in resting state). |
| `--icon-primary-default` | `#00cc85` | `Icon/primary/default` | Primary-colored outline icons (footer heart, primary-bg button chevrons, mobile hamburger). |
| `--icon-primary-on-color` | `#f6fdfb` | `Icon/primary/on-color` | Icons rendered on primary fills. |
| `--icon-secondary-hover` | `#70bc6f` | `Icon/secondary/hover` | Icon color on button **Hover** state. |
| `--icon-tertiary-default` | `#00564c` | `Icon/tertiary/default` | Icon color on button **Pressed** state (dark teal). |
| `--icon-disabled-default` | `#bfbfbf` | `Icon/disabled/default` | Disabled icon strokes (matches text-disabled-default). |

**Semantic rule** ([CLAUDE.md Rule 36](CLAUDE.md)) — pick the token whose *name* matches the usage, not just the hex. `--icon-primary-default` and `--surface-primary-default` are both `#00cc85` but only one is correct for any single rule.

### 3.4 Border — outlines and strokes

| CSS variable | Hex | Figma path | Where it's used |
|---|---|---|---|
| `--border-default` | `#00cc85` | `Border/default` | The DS "frame" border — carousel outer frame, static card frame, footer top border, primary-themed card outlines. |
| `--border-primary-default` | `#00cc85` | `Border/primary/default` | Border on primary-themed containers — same hex as `--border-default`, choose by context. |
| `--border-primary-focus` | `#00a36a` | `Border/primary/focus` | Primary button border (Default state), focus rings. |
| `--border-secondary-focus` | `#70bc6f` | `Border/secondary/focus` | Primary button border (Hover state). |
| `--border-tertiary-focus` | `#00453d` | `Border/tertiary/focus` | Button border (Pressed/Active state — all variants share this). |
| `--border-general-default` | `#d9d9d9` | `Border/general/default` | Neutral dividers and outlines on non-primary surfaces (e.g. placeholder image frames). |
| `--border-disabled-disabled` | `#bfbfbf` | `Border/disabled/disabled` | Disabled button border, disabled input border. |

**`--border-default` vs `--border-primary-default`** — both `#00cc85`. Use `--border-default` for the generic DS green frame (carousels, footers, cards). Use `--border-primary-default` for borders that semantically belong to a primary-themed component.

### 3.5 Overlay / scrim

| CSS variable | Hex | Figma path | Where it's used |
|---|---|---|---|
| `--overlay-default` | (per DS — verify before use) | `Overlay/default` | Modal scrim, drawer backdrop. Pull live from DS before applying — opacity matters. |

---

## 4. Subject palette — 18 subjects

Subjects live in the **Primitives** collection under `Subjects/*` and are wrapped in role-neutral semantic CSS variables `--subjects-{name}-default`. Always use the variable, never the hex.

### 4.1 Subject CSS variables (background hex)

```css
--subjects-b-melayu-default:   #4d77ff;
--subjects-english-default:    #ff4d56;
--subjects-math-default:       #42ac7b;
--subjects-science-default:    #ffd641;
--subjects-chemistry-default:  #e20082;
--subjects-physics-default:    #27a0d7;
--subjects-history-default:    #a97c50;
--subjects-geo-default:        #77d836;
--subjects-islamic-default:    #de4d7f;
--subjects-moral-default:      #0072ca;
--subjects-biology-default:    #8431d8;
--subjects-add-math-default:   #283589;
--subjects-economy-default:    #ff5733;
--subjects-account-default:    #0072ca;
--subjects-business-default:   #efb42b;
--subjects-cs-default:         #d10070;
--subjects-kafa-default:       #8ae3a9;
--subjects-rbt-default:        #353535;
```

### 4.2 Subject Badge color matrix — full bg/border/text triplets ([CLAUDE.md Rule 17](CLAUDE.md))

Source: Figma `🔰 Iconography` page, components `Subject Badge/[Name] - M` (24px) and `Subject Badge/[Name] - L` (32px). **Background hex is identical between L and M.** Border hex differs slightly for a few subjects.

Apply via per-subject class on the `.subject-badge` element:

```html
<div class="subject-badge subject-badge--math">...</div>
```

```css
.subject-badge--math { --badge-border: #358a62; --badge-bg: #42ac7b; }
.subject-badge       { background: var(--badge-bg); border: 1px solid var(--badge-border); color: var(--badge-text, #f2f2f2); }
```

| Subject | `--badge-bg` | `--badge-border` | `--badge-text` |
|---|---|---|---|
| Add Math | `#283589` | `#182052` | `#f2f2f2` (default) |
| Account | `#0072ca` | `#004479` | `#f2f2f2` |
| Bahasa Melayu | `#4d77ff` | `#2e4799` | `#f2f2f2` |
| Biology | `#8431d8` | `#6a27ad` | `#f2f2f2` |
| Business | `#efb42b` | `#bf9022` | `#f2f2f2` |
| Chemistry | `#e20082` | `#b50068` | `#f2f2f2` |
| Computer Science | `#d10070` | `#a7005a` | `#f2f2f2` |
| Economy | `#ff5733` | `#cc4629` | `#f2f2f2` |
| English | `#ff4d56` | `#cc3e45` | `#f2f2f2` |
| Geography | `#77d836` | `#5fad2b` | `#f2f2f2` |
| History | `#a97c50` | `#876340` | `#f2f2f2` |
| Islamic Studies | `#de4d7f` | `#b23e66` | `#f2f2f2` |
| **KAFA** | `#8ae3a9` | `#6eb687` | **`#358a62`** (dark text on mint bg) |
| Mathematics | `#42ac7b` | `#358a62` | `#f2f2f2` |
| Moral Studies | `#0072ca` | `#005ba2` | `#f2f2f2` |
| Physics | `#27a0d7` | `#1f80ac` | `#f2f2f2` |
| RBT | `#353535` | `#2a2a2a` | `#f2f2f2` |
| **Science** | `#ffd641` | `#ccab34` | **`#998027`** (dark text on yellow bg) |

**Two exceptions to `#f2f2f2` text:**
- **Science** — yellow bg requires dark text `#998027`.
- **KAFA** — mint-green bg requires dark text `#358a62`.

For these two, set `--badge-text` explicitly on the modifier class:
```css
.subject-badge--science { --badge-border: #ccab34; --badge-bg: #ffd641; --badge-text: #998027; }
.subject-badge--kafa    { --badge-border: #6eb687; --badge-bg: #8ae3a9; --badge-text: #358a62; }
```

### 4.3 Subject state variants — `[PENDING — Figma extraction from node 3372-5766]`

> **Status (2026-05-15):** This section is reserved for the **subject state palette** (default / focus / hover / pressed / subtle / on-color) per subject, as defined on Figma node [`3372-5766`](https://www.figma.com/design/TLVKe3bgJTdVvuPAzgDq2f/Pandai-Design-System-1.5?node-id=3372-5766&m=dev) in file `TLVKe3bgJTdVvuPAzgDq2f`. It will be filled in the next session once Figma MCP tools are live.
>
> **What goes here when populated:**
> - Full `Subjects/{name}/{state}` token paths for all 18 subjects
> - Hex values for each (state, subject) cell
> - CSS variable names following the convention `--subjects-{name}-{state}` (e.g. `--subjects-math-focus`, `--subjects-chemistry-subtle`)
> - Usage guidance: which state to use on quiz card stripes, subject-themed buttons, subject filter chips, subject icon backgrounds, etc.
>
> **Why this section exists today:** The current prototypes (`zul.test.git`, `nadia.test.git`, `syakila.test.git`) only declare `--subjects-{name}-default`. Interactive subject UI (hover on a math card, pressed on a chemistry filter) currently has no DS-backed token and falls back to ad-hoc CSS — flagged here as a known gap.
>
> **Known mismatch to verify and fix in the same commit as this section:** seven `--subjects-*-default` declarations in `zul.test.git/zul.home.screen.html` (lines 97–103) use Tailwind-like approximations rather than the DS-confirmed badge bg values in §4.2:
>
> | Subject | Prototype hex (wrong) | DS §4.2 badge bg (likely correct — verify against node 3372-5766) |
> |---|---|---|
> | Add Math | `#1D3A8A` | `#283589` |
> | Economy | `#F97316` | `#ff5733` |
> | Account | `#3B82F6` | `#0072ca` |
> | Business | `#F59E0B` | `#efb42b` |
> | Computer Science | `#DB2777` | `#d10070` |
> | KAFA | `#0D9488` | `#8ae3a9` |
> | RBT | `#475569` | `#353535` |
>
> Re-verify each against the live DS before committing — Figma may have changed since §4.2 was authored.

---

## 5. Status Badge colors ([CLAUDE.md Rule 74](CLAUDE.md), updated 2026-05-14)

The 5 status badge variants use **flat hex values** (not semantic tokens — these are Primitives directly). Border is always a hand-darkened shade of the bg.

| Variant | `background` | `border-color` | Notes |
|---|---|---|---|
| Score | `#00cc85` | `#00a36a` | Same as primary button — uses primary palette. |
| Coins | `#fece00` | `#cba500` | **Text stroke required** on both label and value — see below. |
| Streak | `#7367f0` | `#5c52c0` | Purple. |
| Lives | `#ff5c98` | `#cc4a7a` | Teacher-role pink, but used here as Lives indicator. |
| Ruby | `#ff4c51` | `#b23539` | Red. |

**Coins text stroke** ([CLAUDE.md Rules 22, 26, 74](CLAUDE.md)):
```css
.status-pill--coins .status-pill__label,
.status-pill--coins .status-pill__value {
  -webkit-text-stroke: 2px #cba500;     /* 2px because Figma stroke is OUTSIDE 1px → CSS needs 2px to render 1px visible */
  paint-order:         stroke fill;     /* mandatory — without this, stroke paints over fill */
}
```

---

## 6. Component color recipes (read these before re-implementing)

### 6.1 Button - 1.5 — all 4 states across all sizes (Student, Type=Student) ([CLAUDE.md Rules 19, 31, 40](CLAUDE.md))

**The same 4 states apply to Primary/S, Primary/M, Primary/L, Secondary/M, Tertiary/M, Tertiary/L.** Sizes change height and arrow geometry, not color palette. Variants change only the Default and Hover appearance — **Pressed/Disabled palettes are shared across all variants.**

| State | btn bg | border | label | arrow circle bg | arrow chevron |
|---|---|---|---|---|---|
| **Default** | `--surface-primary-default` `#00cc85` | `--border-primary-focus` `#00a36a` | `--text-primary-on-color` `#f6fdfb` | `--surface-primary-default-subtle-hover` `#99ebce` | `--surface-primary-focus` `#00a36a` |
| **Hover** | `--surface-secondary-default` `#b5f291` | `--border-secondary-focus` `#70bc6f` | `--text-secondary-focus` `#70bc6f` | `--surface-secondary-default-subtle` `#e8fbe8` | `--icon-secondary-hover` `#70bc6f` |
| **Pressed** | `--surface-tertiary-default` `#00564c` | `--border-tertiary-focus` `#00453d` | `--text-primary-default` `#00cc85` | `--surface-primary-default` `#00cc85` | `--icon-tertiary-default` `#00564c` |
| **Disabled** | `--surface-disabled-primary` `#f2f2f2` | `--border-disabled-disabled` `#bfbfbf` | `--text-disabled-default` `#bfbfbf` | `--surface-disabled-primary` `#f2f2f2` | `--icon-disabled-default` `#bfbfbf` |

**Critical pitfalls:**
- Pressed bg is **`Surface/tertiary/default`** (`#00564c`), **NOT** `Surface/primary/focus` (`#00a36a`). [CLAUDE.md Rule 19]
- Pressed label is **`Text/primary/default`** (`#00cc85`), **NOT** `Text/primary/on-color` (`#f6fdfb`). [CLAUDE.md Rule 19]
- Hover transitions from primary palette to **secondary palette** — never a darker green. [CLAUDE.md Rule 2]
- Arrow chevron color must be read from the **arrow sub-node**, not the parent button node. The parent reports `Icon/primary/on-color` which is wrong. [CLAUDE.md Rule 12]

### 6.2 Secondary/M button (white-fill outlined) — Default state

| Property | Hex | Token |
|---|---|---|
| Button bg | `#FFFFFF` | `--surface-general-default` |
| Button border | `#00cc85` | `--border-primary-default` |
| Label | `#00cc85` | `--text-primary-default` |
| Arrow circle bg | `#FFFFFF` | `--surface-general-default` |
| Arrow circle stroke | `#00cc85` | `--border-primary-default` (apply as `box-shadow: inset 0 0 0 1px` — see [CLAUDE.md Rule 30](CLAUDE.md)) |
| Arrow chevron | `#00cc85` | `--icon-primary-default` |

**Hover/Pressed/Disabled** for Secondary/M share the same palettes as Primary/M — see §6.1.

### 6.3 Nav-btn / Nav menu pill ([CLAUDE.md Rules 13, 38, 39](CLAUDE.md))

| Element | Default | Hover | Active/Pressed |
|---|---|---|---|
| Background | `--surface-general-default` (`#FFFFFF`) | `--surface-secondary-default` (`#b5f291`) | `--surface-tertiary-default` (`#00564c`) |
| Border (shadow inset) | none | `--border-secondary-focus` (`#70bc6f`) | `--border-tertiary-focus` (`#00453d`) |
| Label | `--text-default-body` (`#666666`) | `--text-secondary-focus` (`#70bc6f`) | `--text-primary-default` (`#00cc85`) |
| Icon | `--icon-default-default` (`#808080`) | `--icon-secondary-hover` (`#70bc6f`) | `--icon-primary-default` (`#00cc85`) |

**Implementation notes:**
- Hover border via `box-shadow: inset 0 0 0 1px` (avoids layout shift inside the pill).
- "Active" state is the **`State=Active`** DS variant (dark teal), **NOT `State=Pressed`** — Pressed is visually identical to Selected and gives no feedback. [CLAUDE.md Rule 38]
- On `<div>` buttons, use JS `mousedown`/`mouseup` to toggle `.is-pressed` — CSS `:active` is unreliable on non-native elements. [CLAUDE.md Rule 39]

### 6.4 Carousel - 1.5 frame ([CLAUDE.md Rule 42](CLAUDE.md))

The visible green frame is **composed from child elements**, not a single border on the container:
- Left button wrap: `border-top: 1px solid var(--border-default); border-left: 1px solid var(--border-default); border-bottom: 1px solid var(--border-default); border-radius: 24px 0 0 24px`
- Right button wrap: mirror of the above on the right.
- Cards in the middle contribute their own top/bottom 1px `var(--border-default)` strokes which visually complete the frame.
- Content frame itself has **no `border`** — only `overflow: hidden; border-radius: 24px`.

### 6.5 Footer - 1.5

| Element | Hex | Token |
|---|---|---|
| Background | `#FFFFFF` | `--surface-general-default` |
| Top border (only) | `#00cc85` | `--border-default` |
| All grey text | `#666666` | `--text-default-body` |
| "Pandai.org" link | `#00cc85` | `--text-primary-default` |
| Heart icon | `#00cc85` | `--icon-primary-default` (not `--surface-primary-default` — the heart is an icon stroke) |

### 6.6 Card containers (Quiz Card, Static Card, Primary Card)

| Element | Hex | Token |
|---|---|---|
| Card bg | `#FFFFFF` | `--surface-general-default` |
| Card border | `#00cc85` | `--border-default` |
| Card title (H1–H4) | `#404040` | `--text-default-heading` |
| Card body / description | `#404040` (titles) or `#666666` (body) | `--text-default-heading` / `--text-default-body` |
| Image placeholder (when no image) | bg `#FFFFFF`, frame `#d9d9d9` | `--surface-general-default` / `--border-general-default` |

**No `box-shadow` on cards** ([CLAUDE.md Rule 6](CLAUDE.md)). The 1px green border supplies all needed depth.

---

## 7. Light vs Dark mode

The Semantic collection has **2 modes: Light / Dark**. The current prototypes are Light-mode only. To support Dark mode:

1. Wrap CSS variables in a `[data-theme="dark"]` block, overriding only the Semantic tokens (`--surface-*`, `--text-*`, `--icon-*`, `--border-*`, `--overlay-*`).
2. **Do not** override Primitives or subject colors — those are mode-neutral.
3. Always pull Dark-mode hex values live from Figma — never approximate.

---

## 8. How to add a new color/component to this guide

When implementing a new DS-derived component:

```
1. search_design_system  → locate the component in the DS (file TLVKe3bgJTdVvuPAzgDq2f only)
2. use_figma             → resolve to a node ID; identify the variant (Type=Student, State=Default, etc.)
3. get_variable_defs     → read the exact Semantic token names on the node AND on every interactive sub-node
4. get_screenshot        → capture each state for visual validation
5. Map tokens → CSS variables using §3 of this file
6. Add a row to §6 if the component introduces a new color recipe
```

**Per-state inspection is mandatory** — never derive Hover/Pressed/Disabled from Default by darkening/lightening. Each state lives in a separate Figma variant with distinct token bindings.

**Sub-node inspection is mandatory** ([CLAUDE.md Rule 12](CLAUDE.md)) — a button's chevron color, a card's badge text, a pill's icon stroke each live on their own node. The parent's `get_variable_defs` will silently return the wrong value.

---

## 9. Common mistakes (collected from sessions May 2026)

| Mistake | Correct behavior |
|---|---|
| `color: #2FAC51` ("Pandai green" guess) | `color: var(--text-primary-default)` → `#00cc85` |
| `color: #0F172A` (dark navy heading) | `color: var(--text-default-heading)` → `#404040` |
| `color: #FFFFFF` for on-primary text | `color: var(--text-primary-on-color)` → `#f6fdfb` |
| Pressed button = `Surface/primary/focus` `#00a36a` | Pressed button = `Surface/tertiary/default` `#00564c` (see §6.1) |
| Pressed label = `Text/primary/on-color` `#f6fdfb` | Pressed label = `Text/primary/default` `#00cc85` |
| Hover button = darker green | Hover button = `Surface/secondary/default` `#b5f291` (palette swap) |
| Disabled bg invented as `#e5e7eb` | `--surface-disabled-primary` `#f2f2f2` |
| `box-shadow: <elevation>` on card | `border: 1px solid var(--border-primary-default)` |
| Subject Business text `#78350F` | Subject Business text `#f2f2f2` (light text on amber bg) |
| Subject KAFA missing text override → white text on mint | Set `--badge-text: #358a62` |
| Footer heart used `--surface-primary-default` | Use `--icon-primary-default` (semantic match — icon stroke, not container fill) |
| `--surface-success-subtle`, `--pd-color-*` (invented tokens) | Only use names listed in §3 of this file |
| Queried Teacher variant for student button states | Always verify `Type=Student` before trusting `get_variable_defs` ([CLAUDE.md Rule 18](CLAUDE.md)) |
| Mistook WIP Backup file results as authoritative | Only `TLVKe3bgJTdVvuPAzgDq2f` is the source — ignore everything else |

---

## 10. Quick agent prompts

Drop these directly into Claude Code / Codex / Cursor when working in this repo:

> "Use only the CSS variables defined in [design.color.md](design.color.md) §3. Never write a hardcoded hex value. If a token doesn't exist for what I need, pause and ask before inventing one."

> "Before implementing any DS component state, run `get_variable_defs` on the specific state node and on every interactive sub-node (chevron, icon, label). Pull each state separately — never derive Hover/Pressed/Disabled from Default."

> "When choosing between two tokens that share the same hex (e.g. `--icon-primary-default` and `--surface-primary-default`, both `#00cc85`), pick by semantic context: icon strokes use `--icon-*`, container fills use `--surface-*`, borders use `--border-*`, text uses `--text-*`. See [design.color.md](design.color.md) §3."

> "For Subject Badges, copy the row from [design.color.md](design.color.md) §4.2 — never approximate from Tailwind or guess from the subject's brand color. Use the matrix exactly. Science and KAFA need explicit `--badge-text` overrides."

---

## 11. File locations and cross-references

| File | Purpose |
|---|---|
| `design.color.md` (this file) | Color tokens, recipes, and rules |
| [CLAUDE.md](CLAUDE.md) | Full implementation rules (1–76+) — typography, spacing, components, SVGs, layout, interactions |
| [design-md/zul.design.md](design-md/zul.design.md) | Zul's per-designer color notes (May 2026) |
| [design-md/nadia.design.md](design-md/nadia.design.md) | Nadia's per-designer color notes |
| [design-md/syakila.design.md](design-md/syakila.design.md) | Syakila's per-designer color notes |
| [zul.test.git/zul.home.screen.html](zul.test.git/zul.home.screen.html) | Canonical prototype — all CSS variables in §3 are declared here |

---

*Last updated: 2026-05-15 | DS source: `TLVKe3bgJTdVvuPAzgDq2f` (Pandai Design System 1.5) | Confirmed Student context (OG-Green palette)*
