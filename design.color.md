# Pandai DS 1.5 — Color Utilization Guide

> **Purpose** — a single, agent-friendly reference for every color used in this repo. Use this file when implementing any UI surface that needs a color, border, icon stroke, badge fill, or interactive state.
>
> **Audience** — Claude Code, Codex, GitHub Copilot, Cursor, JetBrains AI, and any human/IDE pairing with them.
>
> **Source of truth** — Figma file `TLVKe3bgJTdVvuPAzgDq2f` ("Pandai Design System 1.5"). Never use the WIP Backup (`Y0DLhf2MGdGwG0jyjN7EbQ`). When `search_design_system` returns results from "WIP (BACKUP)", "Zul's Dungeon", "Nadia Exploration", or "Syakila Components", **ignore them entirely** — only the main DS is authoritative.
>
> **Companion files** — [CLAUDE.md](CLAUDE.md) (full implementation rules, 1–76+), [design-md/zul.design.md](design-md/zul.design.md), [design-md/nadia.design.md](design-md/nadia.design.md), [design-md/syakila.design.md](design-md/syakila.design.md).

> ### Sync status (2026-05-31)
>
> **Updated 2026-05-31 (documentation consistency pass):**
> - §6.1 — Added critical pitfalls: no-transition rule + is-pressing JS requirement for all Button - 1.5
> - §6.2 — Corrected "Hover/Pressed/Disabled share palettes" — Pressed does NOT share (Secondary≠Primary for Pressed)
>
> **Live-verified against DS (2026-05-28):**
> - §3.1 — `Surface/disabled/on color` (#e5e5e5), `Surface/informative/default` (#00a2e8), `Surface/secondary/default-hover` (#f6fef6) — all new tokens added
> - §3.2 — `Text/primary/on-color` confirmed `#ffffff` (changed from `#f6fdfb`, DS updated 2026-05-24)
> - §3.3 — `Icon/primary/on-color` confirmed `#ffffff` (changed from `#f6fdfb`, DS updated 2026-05-24)
> - §3.4 — `Border/on-color` (#ffffff) added; `Border/tertiary/focus` (#00453d) re-confirmed
> - §6.1 — Button Pressed now split by variant: Primary≠Secondary/Tertiary; disabled arrow bg corrected to `#e5e5e5`
> - §6.7 — Nav Button - 1.5 action button (44×44) states added
> - §6.8 — Notification item states added
>
> **Previous session (2026-05-15):**
> - §3.1/§3.3/§3.4 — all tokens referenced by §6.1 Button states + §6.3 Nav-btn pill
> - §4.1 / §4.2 / §4.3 — full 19-subject palette (default + 5 states × 2 modes), extracted from DS node `3372:5766`
> - §6.1 — Button - 1.5 Default, Hover, Pressed, Disabled (Primary/S + Tertiary/L)
> - §6.3 — Nav-btn / Tertiary button Pressed
>
> **Confirmed invalid (2026-05-30):**
> - §3.1 `--surface-subtle` (`#F8FAFC`) — **not a DS token**. DS Screen page uses `Surface/general/default` (#ffffff). See CLAUDE.md Rule 81.
>
> **Known stale / not yet re-verified:**
> - §3.2 `--text-default-secondary`, `--text-default-placeholder` · §3.5 `--overlay-default` · §5 Status Badge hexes · §6.2 / §6.4 / §6.5 / §6.6 component recipes
>
> **Coverage gaps (DS has these, this doc doesn't yet):**
> - `Surface/gold/*`, `Surface/silver/*`, `Surface/bronze/*` (medal/tier surfaces)
> - `Surface/success/*`, `Surface/warning/*`, `Surface/alert/*` (state surfaces — alerts, toasts, banners)
> - `Surface/primary/default-hover` (distinct from `default-focus`)
> - `Icon/primary/default-hover`, `Text/primary/default-hover`
>
> **CLAUDE.md drift:** Rules 19, 38, 40 document a pre-2026-05 DS where Button/Nav Pressed = dark teal `#00564c`. The live DS now uses `#00a36a` for **Primary** Pressed (no `State=Active`); Secondary/Tertiary Pressed DOES use dark teal `#00564c`. When CLAUDE.md and this file conflict on state colors, **this file is authoritative.**

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
| `--surface-general-default` | `#FFFFFF` | `Surface/general/default` | Page background (`body`), card backgrounds, modal containers, nav-menu button bg, footer bg. **The canonical white. Confirmed as DS Screen page background (2026-05-30).** |
| ~~`--surface-subtle`~~ | ~~`#F8FAFC`~~ | ~~`Surface/subtle`~~ | ~~Sectional alt background.~~ **INVALID — not a DS token. Was fabricated. Use `--surface-general-default` instead.** |
| `--surface-primary-default` | `#00cc85` | `Surface/primary/default` | Primary button fill (Default state), badge fills that say "active", carousel button container fill, Score status pill fill. The "Pandai green." |
| `--surface-primary-focus` | `#00a36a` | `Surface/primary/focus` | Primary button border (Default), focus rings on primary inputs. **Do not use for button labels** — that's `--text-primary-on-color`. |
| `--surface-primary-default-subtle` | `#d9f7ed` | `Surface/primary/default-subtle` | Tint backgrounds for primary-themed cards or alerts (light mint). |
| `--surface-primary-default-subtle-hover` | `#99ebce` | `Surface/primary/default-subtle-hover` | Primary button arrow circle bg (Default state). |
| `--surface-secondary-default` | `#b5f291` | `Surface/secondary/default` | Primary button bg (**Hover** state — Primary→Secondary palette transition, see §6.1). |
| `--surface-secondary-default-subtle` | `#e8fbe8` | `Surface/secondary/default-subtle` | Primary button arrow circle bg (Hover state). |
| `--surface-tertiary-default` | `#00564c` | `Surface/tertiary/default` | Dark teal — still defined in the DS but no longer used for Button/Nav Pressed states post-2026-05 refactor. Available for any future dark-teal surface (e.g. dark mode component fills); confirm against the DS before applying. |
| `--surface-disabled-primary` | `#f2f2f2` | `Surface/disabled/primary` | Disabled button bg, disabled input bg, disabled badge bg. |
| `--surface-disabled-on-color` | `#e5e5e5` | `Surface/disabled/on color` | Disabled button **arrow circle** bg. Distinct from `--surface-disabled-primary` — slightly darker. Confirmed DS 2026-05-24. |
| `--surface-informative-default` | `#00a2e8` | `Surface/informative/default` | Icon Badge fill (blue verified-check dot in profile dropdown). Confirmed DS 2026-05-28. |
| `--surface-secondary-default-hover` | `#f6fef6` | `Surface/secondary/default-hover` | Notification item Hover bg; Static Card Secondary right-col fill. Confirmed DS 2026-05-28. |

### 3.2 Text — character fills

| CSS variable | Hex | Figma path | Where it's used |
|---|---|---|---|
| `--text-default-heading` | `#404040` | `Text/default/heading` | Headings H1–H4, card titles, section titles. **Not** dark navy — this is a soft graphite. |
| `--text-default-body` | `#666666` | `Text/default/body` | Body copy, nav-menu button labels, footer text, descriptions. |
| `--text-default-secondary` | `#6B7280` | `Text/default/secondary` | Secondary captions, helper text. |
| `--text-default-placeholder` | `#f2f2f2` | `Text/default/placeholder` | Input placeholder text. |
| `--text-primary-default` | `#00cc85` | `Text/primary/default` | Primary-colored text (e.g. "Pandai.org" link in footer, button label on **Pressed** state, nav-btn pressed label). |
| `--text-primary-on-color` | `#ffffff` | `Text/primary/on-color` | Button label on primary fill (Default/Active state). **Pure white** — DS updated 2026-05-24 from previous value `#f6fdfb` (green-tinted off-white). |
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
| `--icon-primary-on-color` | `#ffffff` | `Icon/primary/on-color` | Icons rendered on primary fills — nav action button Active state icon, button label icon on primary bg. **Pure white** — DS updated 2026-05-24 from previous value `#f6fdfb`. |
| `--icon-secondary-on-color` | `#70bc6f` | `Icon/secondary/on-color` | Icon color on button **Hover** state (DS uses the `on-color` suffix, not `hover`). |
| `--icon-primary-focus` | `#00a36a` | `Icon/primary/focus` | Chevron stroke on button **Pressed** state and similar intensified-green accents. |
| `--icon-tertiary-default` | `#00564c` | `Icon/tertiary/default` | Dark teal icon stroke — still defined but no longer used for Button Pressed chevrons after 2026-05 refactor (those now use `--icon-primary-focus` `#00a36a`). |
| `--icon-disabled-default` | `#bfbfbf` | `Icon/disabled/default` | Disabled icon strokes (matches text-disabled-default). |

**Semantic rule** ([CLAUDE.md Rule 36](CLAUDE.md)) — pick the token whose *name* matches the usage, not just the hex. `--icon-primary-default` and `--surface-primary-default` are both `#00cc85` but only one is correct for any single rule.

### 3.4 Border — outlines and strokes

| CSS variable | Hex | Figma path | Where it's used |
|---|---|---|---|
| `--border-default` | `#00cc85` | `Border/default` | The DS "frame" border — carousel outer frame, static card frame, footer top border, primary-themed card outlines. |
| `--border-primary-default` | `#00cc85` | `Border/primary/default` | Border on primary-themed containers — same hex as `--border-default`, choose by context. |
| `--border-primary-focus` | `#00a36a` | `Border/primary/focus` | Primary button border (Default state), focus rings. |
| `--border-primary-default-subtle` | `#d9f7ed` | `Border/primary/default-subtle` | Light-mint border for inner accents on Pressed Tertiary buttons (the arrow ring on a green-filled Tertiary button) and similar subtle-on-color outlines. |
| `--border-secondary-focus` | `#70bc6f` | `Border/secondary/focus` | Primary button border (Hover state). |
| `--border-tertiary-focus` | `#00453d` | `Border/tertiary/focus` | Dark teal border — still defined but no longer used for Button Pressed borders after 2026-05 refactor (those now use `--border-primary-default` `#00cc85`). |
| `--border-general-default` | `#d9d9d9` | `Border/general/default` | Neutral dividers and outlines on non-primary surfaces (e.g. placeholder image frames). |
| `--border-disabled-disabled` | `#bfbfbf` | `Border/disabled/disabled` | Disabled button border, disabled input border. |
| `--border-on-color` | `#ffffff` | `Border/on-color` | OUTSIDE stroke (white ring) on overlapping badges — Number Badge, Icon Badge, Indicator Badge. Apply as `box-shadow: 0 0 0 1px var(--border-on-color)` (**no `inset`** — OUTSIDE `strokeAlign`). Never use `border:` or `outline:` here. Confirmed DS 2026-05-26. |

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

Source: Figma `⚙️ Badges` page, COMPONENT_SETs `Subject Badge/[Name]`. Each set has `Size=M` (32px) and `Size=S` (24px) variants — renamed from the previous L/M naming (same px values). **Background and border hex are identical between M and S.** Confirmed live DS audit 2026-05-17.

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
| Chinese Language | `#f94848` | `#c73a3a` | `#f2f2f2` |
| Computer Science | `#d10070` | `#a7005a` | `#f2f2f2` |
| Economy | `#ff5733` | `#cc4629` | `#f2f2f2` |
| English | `#ff4d56` | `#cc3e45` | `#f2f2f2` |
| **Geography** | `#77d836` | `#5fad2b` | **`#478220`** (dark text on light green bg) |
| History | `#a97c50` | `#876340` | `#f2f2f2` |
| Islamic Studies | `#de4d7f` | `#b23e66` | `#f2f2f2` |
| **KAFA** | `#8ae3a9` | `#6eb687` | **`#538865`** (dark text on mint bg) |
| Mathematics | `#42ac7b` | `#358a62` | `#f2f2f2` |
| Moral Studies | `#0072ca` | `#005ba2` | `#f2f2f2` |
| Physics | `#27a0d7` | `#1f80ac` | `#f2f2f2` |
| Primary/Default | `#00cc85` | `#00a36a` | `#f2f2f2` |
| RBT | `#353535` | `#2a2a2a` | `#f2f2f2` |
| **Science** | `#ffd641` | `#ccab34` | **`#998027`** (dark text on yellow bg) |

**Three exceptions to `#f2f2f2` text:**
- **Science** — yellow bg requires dark text `#998027`.
- **KAFA** — mint-green bg requires dark text `#538865`.
- **Geography** — light green bg requires dark text `#478220`.

For these three, set `--badge-text` explicitly on the modifier class:
```css
.subject-badge--science { --badge-border: #ccab34; --badge-bg: #ffd641; --badge-text: #998027; }
.subject-badge--kafa    { --badge-border: #6eb687; --badge-bg: #8ae3a9; --badge-text: #538865; }
.subject-badge--geo     { --badge-border: #5fad2b; --badge-bg: #77d836; --badge-text: #478220; }
```

### 4.3 Subject state variants — full state palette per subject

> **Source** — Figma node [`3372-5766`](https://www.figma.com/design/TLVKe3bgJTdVvuPAzgDq2f/Pandai-Design-System-1.5?node-id=3372-5766&m=dev) ("Pandai - Foundations: Semantic Colors — Subjects") in file `TLVKe3bgJTdVvuPAzgDq2f`. Extracted live via Figma MCP on **2026-05-15**.
>
> **What this is** — every subject in the DS has 5 states. These are the **role-neutral semantic tokens** (`Subjects/{name}/{state}` in the Semantic collection) that subject-themed UI should resolve through. Interactive subject UI — a math card on hover, a chemistry filter pressed, a quiz card focused — must use the correct state token, never derive it by darkening/lightening the default.

**The 5 states (all subjects):**

| State | Purpose | Where to use |
|---|---|---|
| `default` | Resting fill on solid subject-colored surfaces | Subject badge bg, subject-colored buttons, card stripes |
| `default-hover` | Hover on solid subject-colored surfaces | Mouse-over on default fills |
| `default-subtle` | Tint background — very light wash of the subject color | Card backgrounds with subject theming, alert tints, hover bg for subtle buttons |
| `default-subtle-hover` | Hover on the subtle tint | Mouse-over on `default-subtle` backgrounds |
| `focus` | Focus ring / pressed-state border / dark accent | Focus outlines, pressed-state borders, dark text on subtle bg |

**Naming notes (DS canonical vs prototype shorthand):**
- DS uses `comp-science` — the prototypes use `--subjects-cs-*` (shorthand). The canonical name is `comp-science`; rename in prototypes when convenient.
- DS uses `geo`, `b-melayu`, `add-math`, `kafa`, `rbt`, `chi-lang` — all kebab-cased as shown.
- **New subject added vs §4.2:** `chi-lang` (Chinese Language) — 19 subjects total, not 18.

#### 4.3.1 Light mode hex (default rendering context)

| Subject | `default` | `default-hover` | `default-subtle` | `default-subtle-hover` | `focus` |
|---|---|---|---|---|---|
| Account | `#0072CA` | `#005BA2` | `#E6F1FA` | `#99C7EA` | `#004479` |
| Add Math | `#283589` | `#202A6E` | `#EAEBF3` | `#A9AED0` | `#182052` |
| Bahasa Melayu | `#4D77FF` | `#3E5FCC` | `#F6F9FF` | `#B8C9FF` | `#2E4799` |
| Biology | `#8431D8` | `#6A27AD` | `#F3EBFB` | `#CEADEF` | `#4F1D82` |
| Business | `#EFB42B` | `#BF9022` | `#FEF8EA` | `#F9E1AA` | `#8F6C1A` |
| Chemistry | `#E20082` | `#B50068` | `#FCE6F3` | `#ED99C6` | `#88004E` |
| **Chinese Lang** | `#F94848` | `#C73A3A` | `#FFEDED` | `#FDB6B6` | `#952B2B` |
| Computer Science | `#D10070` | `#A7005A` | `#FBE6F1` | `#ED99C6` | `#7D0043` |
| Economy | `#FF5733` | `#CC4629` | `#FFEEEB` | `#FFBCAD` | `#99341F` |
| English | `#FF4D56` | `#CC3E45` | `#FFEDEE` | `#FFB8BB` | `#992E34` |
| Geography | `#77D836` | `#5FAD2B` | `#F2FBEB` | `#C9EFAF` | `#478220` |
| History | `#A97C50` | `#876340` | `#F7F2EE` | `#DDCBB9` | `#654A30` |
| Islamic Studies | `#DE4D7F` | `#B23E66` | `#FCEDF2` | `#F2B8CC` | `#852E4C` |
| KAFA | `#8AE3A9` | `#6EB687` | `#F4FCF7` | `#D0F4DD` | `#538865` |
| Mathematics | `#42AC7B` | `#358A62` | `#ECF7F2` | `#B3DECA` | `#28674A` |
| Moral Studies | `#0072CA` | `#005BA2` | `#E6F1FA` | `#99C7EA` | `#004479` |
| Physics | `#27A0D7` | `#1F80AC` | `#EAF6FB` | `#A9D9EF` | `#176081` |
| RBT | `#353535` | `#2A2A2A` | `#D7D7D7` | `#AEAEAE` | `#202020` |
| Science | `#FFD641` | `#CCAB34` | `#FFFBEC` | `#FFEFB3` | `#998027` |

#### 4.3.2 Dark mode hex (Semantic Dark mode)

| Subject | `default` | `default-hover` | `default-subtle` | `default-subtle-hover` | `focus` |
|---|---|---|---|---|---|
| Account | `#338ED5` | `#0072CA` | `#002E51` | `#004479` | `#66AADF` |
| Add Math | `#283589` | `#202A6E` | `#D4D7E7` | `#A9AED0` | `#182052` |
| Bahasa Melayu | `#4D77FF` | `#3E5FCC` | `#DBE4FF` | `#B8C9FF` | `#2E4799` |
| Biology | `#6A27AD` | `#6A27AD` | `#E6D6F7` | `#CEADEF` | `#4F1D82` |
| Business | `#EFB42B` | `#BF9022` | `#FCF0D5` | `#F9E1AA` | `#8F6C1A` |
| Chemistry | `#E20082` | `#B50068` | `#F9CCE6` | `#ED99C6` | `#88004E` |
| **Chinese Lang** | `#F94848` | `#C73A3A` | `#FEDADA` | `#FDB6B6` | `#952B2B` |
| Computer Science | `#D10070` | `#A7005A` | `#F6CCE2` | `#ED99C6` | `#7D0043` |
| Economy | `#FF5733` | `#CC4629` | `#FFDDD6` | `#FFBCAD` | `#99341F` |
| English | `#FF4D56` | `#CC3E45` | `#FFDBDD` | `#FFB8BB` | `#992E34` |
| Geography | `#77D836` | `#5FAD2B` | `#E4F7D7` | `#C9EFAF` | `#478220` |
| History | `#A97C50` | `#876340` | `#EEE5DC` | `#DDCBB9` | `#654A30` |
| Islamic Studies | `#DE4D7F` | `#B23E66` | `#F8DBE5` | `#F2B8CC` | `#852E4C` |
| KAFA | `#8AE3A9` | `#6EB687` | `#E8F9EE` | `#D0F4DD` | `#538865` |
| Mathematics | `#42AC7B` | `#358A62` | `#D9EEE5` | `#B3DECA` | `#28674A` |
| Moral Studies | `#0072CA` | `#005BA2` | `#CCE3F4` | `#99C7EA` | `#004479` |
| Physics | `#27A0D7` | `#1F80AC` | `#D4ECF7` | `#A9D9EF` | `#176081` |
| RBT | `#353535` | `#2A2A2A` | `#D7D7D7` | `#AEAEAE` | `#202020` |
| Science | `#FFD641` | `#CCAB34` | `#FFF7D9` | `#FFEFB3` | `#998027` |

**Light vs Dark differences worth noting:**
- **Account** — `default` and `focus` are *swapped between modes* (light `default` `#0072CA` ↔ dark `focus` `#66AADF`). The subtle pair is also inverted (light `#E6F1FA` becomes dark `#002E51`).
- **Biology** — dark `default-hover` matches dark `default` (`#6A27AD`) — no hover darkening in dark mode.
- All other subjects keep `default`, `default-hover`, and `focus` identical across modes; only the `default-subtle` / `default-subtle-hover` pair flips for legibility on dark backgrounds.

#### 4.3.3 CSS variable convention

Token names mirror the Figma path exactly:

```css
/* Naming pattern */
--subjects-{kebab-name}-{state}

/* Examples */
--subjects-math-default
--subjects-math-default-hover
--subjects-math-default-subtle
--subjects-math-default-subtle-hover
--subjects-math-focus

--subjects-chi-lang-default        /* not --subjects-chinese-* */
--subjects-comp-science-default    /* not --subjects-cs-* — see naming notes above */
```

**Declare all 95 light-mode tokens once in `:root`.** For dark-mode support, override in `[data-theme="dark"]` with the values from §4.3.2.

#### 4.3.4 Relationship to §4.2 Subject Badge matrix

§4.2 documents the **bg / border / text** triplet for the `Subject Badge - 1.5` component. §4.3 documents the **5-state semantic palette** for each subject.

- §4.2 `bg` always equals §4.3 `default`. ✓ (cross-verified — all 18 overlapping subjects match exactly.)
- §4.2 `border` for **most subjects** equals §4.3 `default-hover` — but **3 subjects** (Account, Add Math, Bahasa Melayu) use a darker shade equal to §4.3 `focus`. This is how Figma authored the component; do not silently reconcile.
- When building a `Subject Badge`, use §4.2. When building any other subject-themed UI (cards, chips, buttons, filters, focus rings), use §4.3.

#### 4.3.5 Usage guidance — which state for which UI

| UI element | Light state | Dark state | Notes |
|---|---|---|---|
| Subject chip / filter (resting) | `default-subtle` bg, `default` text/border | `default-subtle` bg, `focus` text | Subtle bg keeps the chip readable next to other UI |
| Subject chip (hover) | `default-subtle-hover` bg | `default-subtle-hover` bg | |
| Subject chip (selected / active) | `default` bg, `--text-primary-on-color` text | `default` bg, `--text-primary-on-color` text | Solid subject color when the chip is the active selection |
| Subject card stripe / accent bar | `default` | `default` | The 4–8px colored stripe on a quiz/lesson card |
| Subject card hover state | `default-hover` (on stripe), or `default-subtle` (on full card tint) | same | |
| Subject icon container bg | `default-subtle` | `default-subtle` | |
| Subject focus ring (any element) | `focus` (2px outline) | `focus` (2px outline) | Use for keyboard focus on subject-themed interactive UI |
| Subject text on subtle bg | `focus` (dark, readable) | `focus` | E.g. "Mathematics" label on a math-themed alert |
| Subject text on solid `default` bg | `--text-primary-on-color` (`#f6fdfb`) | `--text-primary-on-color` | Two readability exceptions (Science, KAFA, Chinese Lang on light bg) — see §4.2 |

**Pitfall:** Never pair `default` bg with `focus` text — there is not enough contrast. `default` bg always pairs with `--text-primary-on-color` or `#f2f2f2`. `focus` is used as a *foreground* color on subtle bgs, not as a *background*.

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

### 6.1 Button - 1.5 — all states across all sizes (Student, Type=Student)

> **Live-verified 2026-05-28** (updated from 2026-05-15). DS nodes: `1437:8154` (Default), `1437:8146` (Hover), `1437:8130` (Disabled), `473:650` (Primary/L Pressed), `538:1907` (Secondary/M Pressed), `3029:20022` (Tertiary/L Pressed). The DS component variants are **`State=Default | Hover | Pressed | Disabled`** — there is no `State=Active` variant.

**Default / Hover / Disabled are the same across all Variants.** Pressed differs — see separate table below.

#### Default / Hover / Disabled (all variants)

| State | btn bg | border | label | arrow circle bg | arrow chevron |
|---|---|---|---|---|---|
| **Default** | `--surface-primary-default` `#00cc85` | `--border-primary-focus` `#00a36a` | `--text-primary-on-color` `#ffffff` | `--surface-primary-default-subtle-hover` `#99ebce` | `--surface-primary-focus` `#00a36a` |
| **Hover** | `--surface-secondary-default` `#b5f291` | `--border-secondary-focus` `#70bc6f` | `--text-secondary-focus` `#70bc6f` | `--surface-secondary-default-subtle` `#e8fbe8` | `--icon-secondary-on-color` `#70bc6f` |
| **Disabled** | `--surface-disabled-primary` `#f2f2f2` | `--border-disabled-disabled` `#bfbfbf` | `--text-disabled-default` `#bfbfbf` | `--surface-disabled-on-color` `#e5e5e5` | `--icon-disabled-default` `#bfbfbf` |

> **Disabled arrow bg** is `--surface-disabled-on-color` (`#e5e5e5`), **not** `--surface-disabled-primary` (`#f2f2f2`). Two different tokens. Confirmed DS 2026-05-24 via `VariableID:1260:1895`.

#### Pressed state — differs by Variant (confirmed 2026-05-27)

| Variant | btn bg | border | label | arrow circle | arrow chevron |
|---|---|---|---|---|---|
| **Primary** (S/M/L) | `--surface-primary-focus` `#00a36a` | `--border-primary-default` `#00cc85` | `--text-primary-default` `#00cc85` | `--surface-primary-default` `#00cc85` | `--icon-primary-focus` `#00a36a` |
| **Secondary** (S/M/L) | `--surface-tertiary-default` `#00564c` | `--border-tertiary-focus` `#00453d` | `--text-primary-default` `#00cc85` | `--surface-primary-default` `#00cc85` | `--icon-primary-focus` `#00a36a` |
| **Tertiary** (S/M/L) | `--surface-tertiary-default` `#00564c` | `--border-tertiary-focus` `#00453d` | `--text-primary-default` `#00cc85` | transparent, border `--border-primary-default-subtle` `#d9f7ed` | `--icon-primary-focus` `#00a36a` |

> **DS nodes confirmed:** Primary/L Pressed = `473:650`; Secondary/M Pressed = `538:1907`; Tertiary/L Pressed = `3029:20022`.

**Critical pitfalls:**
- **Default label is now `#ffffff`** — DS updated `Text/primary/on-color` from `#f6fdfb` to `#ffffff` on 2026-05-24. Any prototype using `#f6fdfb` or `#e1f9ea` for button labels is stale.
- **Primary Pressed ≠ Secondary/Tertiary Pressed.** Primary uses intensified-green (`#00a36a`). Secondary/Tertiary use dark teal (`#00564c`). Never share these across variants.
- **Disabled arrow circle bg is `#e5e5e5`**, not `#f2f2f2`. Only the outer button bg uses `--surface-disabled-primary`.
- Pressed label is **`Text/primary/default`** (`#00cc85`) for ALL variants, NOT `Text/primary/on-color`.
- Hover transitions from primary palette to **secondary palette** — never a darker green.
- Arrow chevron color must be read from the **arrow sub-node**, not the parent button node.
- **No CSS transitions on any Button - 1.5 element.** All state changes are instant cuts — no `transition` on container, label, arrow, or clip. (CLAUDE.md Rule 82, zul.design.md Rule 198)
- **Always pair CSS `:active` with JS `is-pressing`.** CSS `:active` alone is unreliable in Electron webviews. Every Button - 1.5 `<button>` must have matching `mousedown`/`mouseup`/`mouseleave` handlers. (CLAUDE.md Rule 83, zul.design.md Rule 199)

### 6.2 Secondary/M button (white-fill outlined) — Default state

| Property | Hex | Token |
|---|---|---|
| Button bg | `#FFFFFF` | `--surface-general-default` |
| Button border | `#00cc85` | `--border-primary-default` |
| Label | `#00cc85` | `--text-primary-default` |
| Arrow circle bg | `#FFFFFF` | `--surface-general-default` |
| Arrow circle stroke | `#00cc85` | `--border-primary-default` (apply as `box-shadow: inset 0 0 0 1px` — see [CLAUDE.md Rule 30](CLAUDE.md)) |
| Arrow chevron | `#00cc85` | `--icon-primary-default` |

**Hover/Disabled** for Secondary/M share the same palettes as Primary/M — see §6.1 Default/Hover/Disabled table.

> ⚠️ **Pressed does NOT share** — Secondary/M Pressed uses dark teal (`#00564c`) while Primary/M uses intensified-green (`#00a36a`). See §6.1 Pressed table for per-variant values.

### 6.3 Nav-btn / Nav menu pill

> **Live-verified 2026-05-15** — DS node `3029:20022` (formerly described in CLAUDE.md as "Navbar Active" is actually `Button - 1.5, Variants=Tertiary, State=Pressed, Size=L`). The Nav-btn Pressed state uses the same intensified-green palette as §6.1 Button Pressed, not the dark teal the old notes documented.

| Element | Default | Hover | Pressed |
|---|---|---|---|
| Background | `--surface-general-default` (`#FFFFFF`) | `--surface-secondary-default` (`#b5f291`) | `--surface-primary-focus` (`#00a36a`) |
| Border (shadow inset) | none | `--border-secondary-focus` (`#70bc6f`) | `--border-primary-default` (`#00cc85`) |
| Label | `--text-default-body` (`#666666`) | `--text-secondary-focus` (`#70bc6f`) | `--text-primary-default` (`#00cc85`) |
| Icon | `--icon-default-default` (`#808080`) | `--icon-secondary-on-color` (`#70bc6f`) | `--icon-primary-default` (`#00cc85`) |

**Implementation notes:**
- Hover border via `box-shadow: inset 0 0 0 1px` (avoids layout shift inside the pill).
- The DS no longer has a separate `State=Active` for nav buttons. Use `State=Pressed` (intensified green) for both momentary press feedback and the "this nav item is the active page" selected look — they share the same palette in the current DS.
- On `<div>` buttons, use JS `mousedown`/`mouseup` to toggle `.is-pressed` — CSS `:active` is unreliable on non-native elements.

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

### 6.7 Nav Button - 1.5 — action icon buttons (44×44 square, COMPONENT_SET 3908:6148)

> **Live-verified 2026-05-28** — DS COMPONENT_SET `3908:6148`. These are the action buttons in the top-right navbar row (bell, EN/locale, smartphone/download, waffle/learn-menu, maximize). Size: **44×44px**, `border-radius: 8px` (Radius/xl).

| State | bg | bg hex | border | border hex | icon | icon hex |
|---|---|---|---|---|---|---|
| **Default** | `Surface/general/default` | `#ffffff` | none | — | `Icon/default/default` | `#808080` |
| **Hover** | `Surface/secondary/default-subtle` | `#e8fbe8` | `Border/primary/default` | `#00cc85` | `Icon/primary/default` | `#00cc85` |
| **Pressed** | `Surface/primary/focus` | `#00a36a` | `Border/primary/default` | `#00cc85` | `Icon/primary/default` | `#00cc85` |
| **Active** | `Surface/primary/default` | `#00cc85` | `Border/primary/focus` | `#00a36a` | `Icon/primary/on-color` | `#ffffff` |

**Active state = plain rounded square. No speech-bubble tail.** `is-active` class applied via JS on dropdown open.

**CSS variables:**
```css
.navbar-action-btn               { background: var(--surface-general-default); }
.navbar-action-btn:hover         { background: var(--surface-secondary-default-subtle); box-shadow: inset 0 0 0 1px var(--border-primary-default); }
.navbar-action-btn:active        { background: var(--surface-primary-focus); box-shadow: inset 0 0 0 1px var(--border-primary-default); }
.navbar-action-btn.is-active     { background: var(--surface-primary-default); box-shadow: inset 0 0 0 1px var(--border-primary-focus); }
/* Icon color */
.navbar-action-btn svg           { color: var(--icon-default-default); }       /* #808080 */
.navbar-action-btn:hover svg     { color: var(--icon-primary-default); }       /* #00cc85 */
.navbar-action-btn:active svg    { color: var(--icon-primary-default); }       /* #00cc85 */
.navbar-action-btn.is-active svg { color: var(--icon-primary-on-color); }      /* #ffffff */
```

### 6.8 Notification item states (COMPONENT_SET 3908:13442)

> **Live-verified 2026-05-27** — DS `Navbar Notification Button - Parts`, 3 states only.

| State | Content bg | Border | Text |
|---|---|---|---|
| **Default** | `#ffffff` (white) | none | `#666666` (`--text-default-body`) |
| **Hover** | `--surface-secondary-default-hover` `#f6fef6` | `1px INSIDE #00cc85` | `#00564c` (`--text-tertiary-default`) |
| **Focus** (click/touch) | `--surface-secondary-default-subtle` `#e8fbe8` | `1px INSIDE #00cc85` | `#00cc85` (`--text-primary-default`) |

> DS names the click/touch state **"Focus"**, not "Pressed". Map to CSS `:active` + `:focus-visible`.

**Structural change on Hover/Focus:** the inner row's `border-bottom: 1px solid #d9d9d9` disappears and the content frame gains `border-radius: 16px` + INSIDE border. Apply border as `box-shadow: inset 0 0 0 1px var(--border-primary-default)`.

### 6.9 Badge OUTSIDE stroke — Number Badge, Icon Badge, Indicator Badge

All three DS badge variants use `strokeAlign: OUTSIDE` with `Border/on-color` (#ffffff) as the stroke color. Always apply as `box-shadow` with no `inset` — never `border:` or `outline:`.

```css
/* OUTSIDE strokeAlign — ring outside element bounds, follows border-radius */
.num-badge     { box-shadow: 0 0 0 1px var(--border-on-color); }   /* #ffffff */
.icon-badge    { box-shadow: 0 0 0 1px var(--border-on-color); }   /* #ffffff */
.indicator-dot { box-shadow: 0 0 0 1px var(--border-on-color); }   /* #ffffff */
```

| Badge | Node | Size | Fill | Stroke align | CSS |
|---|---|---|---|---|---|
| Number Badge - 1.5 Primary/M | `618:418` | 20×20 | `--surface-primary-default` `#00cc85` | OUTSIDE | `box-shadow: 0 0 0 1px var(--border-on-color)` |
| Icon Badge - 1.5 | `3908:1491` | 12×12, padding 2px | `--surface-informative-default` `#00a2e8` | OUTSIDE | `box-shadow: 0 0 0 1px var(--border-on-color)` |
| Indicator Badge dot | notification dropdown | 8×8 | `--surface-primary-default` `#00cc85` | OUTSIDE | `box-shadow: 0 0 0 1px var(--border-on-color)` |

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
| Pressed button = `Surface/tertiary/default` `#00564c` (dark teal — from older notes / CLAUDE.md Rule 19) | Pressed button = `Surface/primary/focus` `#00a36a` (intensified green — see §6.1, live-verified 2026-05-15) |
| Pressed label = `Text/primary/on-color` `#f6fdfb` | Pressed label = `Text/primary/default` `#00cc85` |
| Pressed chevron = `Icon/tertiary/default` `#00564c` | Pressed chevron = `Icon/primary/focus` `#00a36a` |
| Hover button = darker green | Hover button = `Surface/secondary/default` `#b5f291` (palette swap) |
| Disabled bg invented as `#e5e7eb` | `--surface-disabled-primary` `#f2f2f2` |
| `box-shadow: <elevation>` on card | `border: 1px solid var(--border-primary-default)` |
| Subject Business text `#78350F` | Subject Business text `#f2f2f2` (light text on amber bg) |
| Subject KAFA missing text override → white text on mint | Set `--badge-text: #538865` |
| Footer heart used `--surface-primary-default` | Use `--icon-primary-default` (semantic match — icon stroke, not container fill) |
| `--surface-success-subtle`, `--pd-color-*` (invented tokens) | Only use names listed in §3 of this file |
| Queried Teacher variant for student button states | Always verify `Type=Student` before trusting `get_variable_defs` ([CLAUDE.md Rule 18](CLAUDE.md)) |
| Mistook WIP Backup file results as authoritative | Only `TLVKe3bgJTdVvuPAzgDq2f` is the source — ignore everything else |
| Button Default label = `#f6fdfb` or `#e1f9ea` | `--text-primary-on-color` is now `#ffffff` — DS changed 2026-05-24. Check `:root` and update any prototype using old values. |
| Nav action button Active icon = `#e1f9ea` or `#f6fdfb` | `--icon-primary-on-color` is now `#ffffff` — DS changed 2026-05-24. |
| All Button variants share the same Pressed palette | **Wrong** — Primary Pressed = `#00a36a` (intensified green). Secondary/Tertiary Pressed = `#00564c` (dark teal). Never cross-apply. |
| Disabled button arrow circle bg = `#f2f2f2` (same as outer) | Correct is `--surface-disabled-on-color` = `#e5e5e5`. Two different tokens. |
| Badge white ring = `border: 1px solid white` | Badges use `strokeAlign: OUTSIDE` → must use `box-shadow: 0 0 0 1px var(--border-on-color)`. `border:` shrinks content area; `outline:` ignores border-radius. |

---

## 10. Quick agent prompts

Drop these directly into Claude Code / Codex / Cursor when working in this repo:

> "Use only the CSS variables defined in [design.color.md](design.color.md) §3. Never write a hardcoded hex value. If a token doesn't exist for what I need, pause and ask before inventing one."

> "Before implementing any DS component state, run `get_variable_defs` on the specific state node and on every interactive sub-node (chevron, icon, label). Pull each state separately — never derive Hover/Pressed/Disabled from Default."

> "When choosing between two tokens that share the same hex (e.g. `--icon-primary-default` and `--surface-primary-default`, both `#00cc85`), pick by semantic context: icon strokes use `--icon-*`, container fills use `--surface-*`, borders use `--border-*`, text uses `--text-*`. See [design.color.md](design.color.md) §3."

> "For Subject Badges, copy the row from [design.color.md](design.color.md) §4.2 — never approximate from Tailwind or guess from the subject's brand color. Use the matrix exactly. Science, KAFA, and Geography need explicit `--badge-text` overrides."

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

*Last updated: 2026-05-28 by Zulfadhli — DS re-audit: `Text/primary/on-color` + `Icon/primary/on-color` updated to `#ffffff` (DS changed 2026-05-24); `--surface-disabled-on-color` (#e5e5e5), `--surface-informative-default` (#00a2e8), `--surface-secondary-default-hover` (#f6fef6), `--border-on-color` (#ffffff) added to §3; §6.1 Pressed split by variant (Primary≠Secondary/Tertiary) + disabled arrow bg corrected; §6.7/6.8/6.9 new component recipes added; §9 five new mistake rows added | DS source: `TLVKe3bgJTdVvuPAzgDq2f` (Pandai Design System 1.5) | Confirmed Student context (OG-Green palette)*
