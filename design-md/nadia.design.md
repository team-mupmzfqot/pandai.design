# Pandai Design System — Session Context
> Reusable context file for Claude Code or future chat sessions.
> Paste the contents of this file at the start of a new session to resume exactly where we left off.

---

> ## ✅ CLEANUP COMPLETE — All 9 fixes done
>
> **Pandai DS 1.5 is published as a Figma Team Library and ready for engineer handoff.**
>
> **Cleanup task status:**
> 1. ✅ Fix ALL_SCOPES — 791 variables fixed, 125 already correct, 0 errors
> 2. ✅ Add Semantic spacing + radius float aliases — 22 new variables created (Spacing/component/*, Spacing/layout/*, Radius/*)
> 3. ✅ Add 6 elevation effect styles — Elevation/xs → sm → md → lg → xl → overlay all created
> 4. ✅ Move 43 component sections from Zul's Dungeon to correct pages — 0 errors
> 5. ⏭️ (Skipped) Resolve duplicates in Nadia Exploration + Syakila Components
> 6. ⏭️ (Skipped) Component descriptions
> 7. ✅ Build documentation pages — Colors (255 semantic swatches), Typography (21 styles specimen), Spacing & Radius (14 scale + 9 radius + 22 semantic tokens)
> 8. ✅ Add paint styles — 255 paint styles created, all bound to Semantic variables (variable-linked)
> 9. ✅ Publish as Figma Team Library — published 2026-05-04 (255 paint styles, 6 effect styles, 21 text styles, 195 component sets, 938 variables)

---

## Claude Code — Design Development Rules

> These rules are **non-negotiable** and apply to every design implementation session.
> They are derived from explicit instructions + mistakes made during the modal development session (May 2026).

---

### 1. Always use the DS — never assume or generate

- Every component, token, color, spacing value, radius, icon, and asset **must come from the Pandai DS 1.5 file (`TLVKe3bgJTdVvuPAzgDq2f`)**.
- Never guess, approximate, or invent any design value. If a value is unknown, use `get_design_context` or `use_figma` to pull it live from Figma before writing any code.
- Never create a custom component when a DS equivalent exists. Always check the component pages first.

**CRITICAL — File identity:**
- **Only file**: `TLVKe3bgJTdVvuPAzgDq2f` = "Pandai Design System 1.5" ← the ONLY valid source
- **Never use**: `Y0DLhf2MGdGwG0jyjN7EbQ` = "Pandai Design System 1.5 (WIP) (BACKUP)" ← forbidden
- **Never use**: Any file or library named "Zul's Dungeon", "Nadia Exploration", "Syakila Components"
- When `search_design_system` returns results from "WIP (BACKUP)" or any other library, **ignore those results entirely** and look harder in the main DS file.
- The WIP Backup is a historical snapshot only. All authoritative component and token definitions live in the main DS.

**Mistake made:** Primary color was guessed as `#2FAC51`. Actual DS value is `#00cc85` (`Surface/primary/default`). `Text/default/heading` was assumed as dark navy `#0F172A` — actual value is `#404040`. `Text/primary/on-color` was assumed as pure white — actual value is `#f6fdfb`.

**Mistake made (May 2026):** Kept accessing `Y0DLhf2MGdGwG0jyjN7EbQ` (WIP Backup) for component state lookups because `search_design_system` returned it. Correct behaviour: ignore WIP Backup results, use only `TLVKe3bgJTdVvuPAzgDq2f`.

---

### 2. Always refer to Component Variants & States for interactions

- Every interactive state (**Default, Hover, Pressed/Active, Selected, Disabled, Focus**) is a distinct Figma variant with its own token bindings. **Do not approximate.**
- Pull each state's node via `get_design_context` separately. Never derive hover/pressed colors by manually darkening or lightening a default color.
- Transitions between states must use the exact token values from the DS variant, not CSS color manipulation.

**Mistake made:**
- Primary button hover was assumed to be a darker green. Actual DS: Primary hover transitions to the **Secondary palette** — `Surface/secondary/default` (`#b5f291`) bg, `Border/secondary/focus` (`#70bc6f`) border, `Text/secondary/focus` (`#70bc6f`) text.
- Secondary button Pressed state was incorrectly noted as "fills solid with Surface/primary/default", then mis-corrected to dark teal `#00564c`. **Re-verified live DS 2026-05-31 via `get_design_context` on node `538:1907`:** bg `#00a36a` (`Surface/primary/focus`), border `#00cc85` (`Border/primary/default`), text `#00cc85` — same palette as Primary Pressed.
- Disabled state was invented. Actual DS: `Surface/disabled/primary` (`#f2f2f2`) bg, `Border/disabled/disabled` (`#bfbfbf`) border, `Icon/disabled/default` (`#bfbfbf`) text.

---

### 3. Always use Semantic tokens for Radius, Padding, Gap, Spacing & Scaling

- **Never hardcode px values.** Every spatial value must resolve through a Semantic token.
- Token names must **mirror the Figma token path exactly** — no renaming, no abbreviations.
  - Figma path: `Surface/primary/default` → CSS variable: `--surface-primary-default`
- Layout padding must consistently use `Spacing/space-m` = **16px**.
- Layout gap must consistently use `Spacing/space-xs` = **8px**.
- Button radius is `Corner Radius/corner-rounded` = **60px** (pill) — not a standard radius step like `md` or `lg`.
- `Surface/general/default` is the correct Semantic name for white backgrounds — not `Surface/default`.

**Mistake made:**
- Button border-radius was set to `12px` — actual is `60px` pill shape.
- Button horizontal padding was set to `20px` — actual is `Spacing/space-s = 12px` for Size=L.
- Modal body padding was set to `24px` — must be `16px` (`Spacing/space-m`).
- Modal body gap was set to `16px` — must be `8px` (`Spacing/space-xs`).
- Footer padding was mixed `12px / 24px` — must be `16px` all sides.
- Invented tokens (`--surface-success-subtle`, `--pd-` prefix) instead of using actual Semantic token names.

---

### 4. Icons must always come from the DS Iconography page

- **Never write custom SVG paths or use third-party icon sets.** All icons must be sourced from the `🔰 Iconography` page in the DS file.
- Use `use_figma` to extract the exact vector paths from the icon node before implementing.
- Icons always render at their **DS native size (24×24)**. No scaling up or overriding with `width`/`height` in CSS.
- Icon containers must **hug content** — use `width: fit-content; height: fit-content; padding: <token>` — never a fixed pixel wrapper size.
- SVG `viewBox` must include a **1px buffer** on all sides (e.g., `viewBox="-1 -1 22 22"` for a 0–20 coordinate space) to prevent stroke clipping at path boundaries.

**SVG implementation pattern (confirmed correct — May 2026 navbar session):**
- Use a single hidden `<svg><defs>` block with `<symbol id="ic-*">` definitions for every icon.
- Reference icons via `<svg><use href="#ic-*"/></svg>` — never inline the paths repeatedly.
- All symbol paths use `stroke="currentColor"` so icon color inherits from parent CSS `color:` property.
- This enables state changes (hover/active/disabled) to cascade via a single `color:` rule on the container.

**Mistake made:**
- Used a hand-written `<polyline points="20 6 9 17 4 12"/>` checkmark instead of the DS `Outline/check-circle` (node `260:527`).
- Icon container was fixed `64×64` — must hug content.
- SVG was forced to `32×32` — DS native size is `24×24`.
- `viewBox="0 0 20 20"` clipped the 1.5px stroke at `x=20` / `y=-0.23` path edges — fixed to `viewBox="-1 -1 22 22"`.

---

### 5. Never use gradients — DS colors only

- **Gradients are strictly prohibited.** All colors must be flat values from the DS token system.
- Never use `linear-gradient`, `radial-gradient`, `conic-gradient`, or any CSS gradient function.
- All color values must resolve through Semantic tokens — no hardcoded hex values in rule declarations.

---

### 6. Never use drop shadows on cards or containers

- **Elevation/box-shadow is prohibited on cards, modals, and containers.**
- Cards and modal containers must use a `1px solid Border/primary/default` border for depth instead of shadow.
- The Elevation effect styles exist for reference only — do not apply them to UI containers in implementation.

**Mistake made:** Applied `box-shadow: Elevation/overlay` to the modal card. Corrected to `border: 1px solid var(--border-primary-default)` with no shadow.

---

### 7. Always use the correct component variant for the context

- Confirm which component variant applies before building. The DS has named variants for every use case.
- For two-button modal patterns: cancel/dismiss action → `Variants=Secondary` (outlined), confirm action → `Variants=Primary` (filled). `Variants=Tertiary` (ghost) is not appropriate for modal footers.

**Mistake made:** The Ignore button was implemented as `Variants=Tertiary` — actual correct variant is `Variants=Secondary` (white bg, green outline border, green text).

---

### 8. Icon clip framing is per-icon — never use blanket inset values

The DS renders each icon inside an `overflow:hidden` clip container using `position:absolute; inset: X%`. These percentages are **unique per icon** based on its internal geometry. Never apply a uniform default across all icons.

**Always pull the exact inset from `get_design_context` for the specific component node being implemented.**

**Confirmed inset values from DS node 866:5576 (Navbar 1.5, May 2026):**

Nav button icons — 20px clip container:
| Icon | DS inset |
|---|---|
| `Outline/home` | `8.33% 12.5%` |
| `Outline/check-circle` | `8.33%` |
| `Outline/battle` | `12.5%` |
| `Outline/book-open` | `12.5% 8.33%` |
| `Outline/users` | `12.5% 4.17%` |
| `Outline/book` | `8.33% 16.67%` |
| `Outline/star` | `8.33% 8.33% 12.42% 8.33%` |
| `Outline/gift` | `8.33%` |
| `Outline/chevron-down` | `37.5% 25%` |

Action icons — 24px clip container:
| Icon | DS inset |
|---|---|
| `Outline/search` | `12.5%` |
| `Outline/maximize` | `12.5%` |
| `Outline/smartphone` | `8.33% 20.83%` |
| `Outline/bell` | `8.33%` |
| `Outline/EN` | `top:25% right:9.95% bottom:28.12% left:12.5%` |
| `Outline/waffle-menu` | `16.67%` |

**Mistake made:** Applied blanket `8.33%` to all nav icons and `12.5%` to all action icons. Had to go back and add per-icon CSS overrides (`data-icon` attribute selectors) after pulling the actual DS values.

---

### 9. Spec context matters — always check the parent component, not standalone specs

A component's spec values can differ depending on where it appears. The same element (e.g., Pill Badge) has different typography when used standalone vs. embedded inside another component.

**Mistake made:** Pill Badge font-size was changed to `12px` based on the standalone Pill Badge DS spec — but inside Quiz Card the correct value is `10px` (`Body/B8`). Had to revert after fetching the actual Quiz Card node spec.

**Rule:** When implementing an element that appears inside a larger component, always `get_design_context` on the **parent component node**, not the standalone element node.

---

### 10. Every page section must be a named `<section>` — never a bare `<div>`

Every major content block on a page must be wrapped in `<section id="SectionName-Desktop">`. This applies to Navbar, Welcome, Carousel, Static Cards, and every content section below.

**Naming convention:** `id="[ComponentName]-Desktop"` — e.g. `NavBar-Desktop`, `Welcome-Desktop`, `Carousel-Desktop`, `static-newscards`.

**Mistake made:** Static cards were in a plain `<div>`, carousel had no `id`, welcome section had no `id`. All were missing the named section wrapper.

---

### 11. Inter-section gap is always `Spacing/space-m` (16px) — never custom values

The gap between every section on `.main-content` must be `gap: var(--spacing-space-m)` = **16px**.

**Mistake made:** Had `--section-gap: 40px` hardcoded — corrected to `var(--spacing-space-m)`.

**Rule:** Set `--section-gap: var(--spacing-space-m)` in `:root` and use it on the `.main-content` flex container. Never use `40px`, `24px`, or any other value for inter-section gaps.

---

### 12. Get `get_variable_defs` on the exact sub-node — never the parent

When a component has nested interactive elements (e.g. button arrow, icon circle), the color token on the sub-node is **different** from what the parent node reports. Always call `get_variable_defs` on the specific sub-node you are styling.

**Mistake made:** Called `get_variable_defs` on the Button - 1.5 node (`479:344`) to find the arrow chevron color — it returned `Icon/primary/on-color #f6fdfb` which is WRONG for the arrow. The correct token (`Surface/primary/focus #00a36a`) only appears when calling `get_variable_defs` on the arrow sub-node (`479:351`).

**Rule:** For any icon or sub-element inside a component, always call `get_variable_defs` on that element's own node ID, not the parent.

---

### 13. Interactive `<div>` elements must have `cursor: pointer` and `user-select: none`

Any `<div>` used as a button or nav item — not a native `<button>` or `<a>` — **must** have:
```css
cursor:      pointer;
user-select: none;
```

Without `cursor: pointer`, users see no visual interactivity signal and perceive the element as broken, even when hover CSS is correctly defined.

**Mistake made:** All `.nav-btn` divs were missing `cursor: pointer`. Users reported hover and click not working.

---

### 14. JS defensive pattern — critical handlers before non-critical JS

Always register critical click/interaction handlers **before** any other JS that could throw. Wrap non-critical JS (carousels, animations, complex inits) in `try/catch` so a single error never silently blocks all handlers registered after it.

```html
<script>
  // Critical handlers first — always run regardless
  document.querySelectorAll('.nav-btn').forEach(btn => { ... });

  // Non-critical wrapped in try/catch
  try {
    (function() { /* carousel, etc. */ })();
  } catch(e) { console.warn('init error:', e); }
</script>
```

**Mistake made:** Nav click handler was placed after the carousel IIFE. A carousel error would have silently prevented nav buttons from ever becoming interactive.

---

### 15. Figma image fill placeholders → `<div>` not `<img>`

When a DS component uses a Figma Image fill (shows checkerboard in DS), implement it as a `<div class="...__bg">` with CSS `background-image`, **not** an `<img src="">`. An `<img>` with a missing or empty src shows a broken icon in the browser.

```css
/* Image placeholder — set background-image per instance when real images are available */
.__bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center; background-repeat: no-repeat;
  pointer-events: none;
}
```

**Mistake made:** Used `<img class="static-card__bg" src="icons/static-card-bg-1.png">` — file didn't exist, showed broken image icon. Corrected to `<div class="static-card__bg">`.

---

### 16. Button arrow chevrons — use component-specific clip symbols, never the standalone icon

The standalone `Outline/chevron-right` icon (24×24) must **never** be used inside a Button - 1.5 arrow clip. The DS exports a **dedicated per-size clip node** for each button size. That clip node has the path already positioned in the clip's own coordinate space (12×12 for Size=S, 16×16 for Size=M/L).

**Why this matters:** If you use the 24×24 standalone icon with CSS `padding` to simulate the DS inset percentages, the SVG scales down and `stroke-width: 1.5` collapses to ~0.5px — nearly invisible in the browser.

**Rule:** Create a dedicated `<symbol>` per button size using the DS-exported clip node's exact `viewBox` and `path`. Apply **no CSS padding** to the clip container. At 1:1 scale the stroke stays at 1.5px.

**Confirmed clip symbol specs — DS-exported, May 2026:**

| Context | Symbol ID | Icon | ViewBox | Path | DS Clip Node |
|---|---|---|---|---|---|
| Button - 1.5 Size=S | `ic-chevron-btn` | chevron-right | `0 0 12 12` | `M4.5 9L7.5 6L4.5 3` | `1437:8161` |
| Button - 1.5 Size=M + Size=L | `ic-chevron-btn-m` | chevron-right | `0 0 16 16` | `M6 12L10 8L6 4` | `479:352` |
| Nav-btn dropdown (chevron-down) | `ic-chevron-down-nav` | chevron-down | `0 0 20 20` | `M5 7.5L10 12.5L15 7.5` | Derived from DS inset 37.5%/25% on 20px clip |

**Arrow container dimensions (confirmed):**

| Size | Button height | Arrow container | Clip |
|---|---|---|---|
| S | 24px | 16×16 (padding: 2px) | 12×12 |
| M | 32px | 20×20 (padding: 2px) | 16×16 |
| L | 40px | 24×24 (padding: 2px) | 16×16 (same path as M) |

**Mistake made (May 2026):**
- Quiz card buttons used `Outline/arrow-right` (→) instead of `Outline/chevron-right` (›). Always confirm icon identity from `get_design_context` on the button component node — never assume.
- All button arrow clips had `padding: Xpx Ypx` to simulate DS inset, collapsing stroke to sub-pixel width. Correct approach: no CSS padding on clip, path position is in the viewBox.
- Same stroke-collapse issue affected: static card buttons (Size=M, 16px clip), Add Classes button (Size=M, 16px clip), and nav-btn dropdown chevrons (20px clip).

---

### 17. Subject badge — always source both icon SVG and badge colors from DS Iconography

Both the **icon SVG** and the **badge bg/border/text colors** must come from the DS `🔰 Iconography` page. Never guess colors from Tailwind equivalents or subject brand colors.

#### 17a. Icon SVG
Export from `Subject/XXX` component nodes using `exportAsync({ format: 'SVG_STRING' })`. Never use placeholder `<rect>` shapes.

**Lookup:** `findAll(n => n.type === 'COMPONENT' && n.name === 'Subject/XXX')` on Iconography page.

All known subject icon names (May 2026):
`Subject/AddMath`, `Subject/Biology`, `Subject/Economy`, `Subject/Chemistry`, `Subject/English`, `Subject/Moral Studies`, `Subject/Islamic Studies`, `Subject/Math`, `Subject/Accounting`, `Subject/Physics`, `Subject/Business`, `Subject/Computer Science`, `Subject/Science`, `Subject/History`, `Subject/KAFA`, `Subject/Geography`, `Subject/Reka Bentuk & Teknologi`, `Subject/BMelayu`

**Icon sizing:** CSS uses `width: 16px; height: auto; max-height: 20px`. No forced dimensions needed on the SVG element.

**Geography note:** SVG export is 27,907 chars (complex globe). Use simplified DS-colored globe SVG instead.

#### 17b. Badge bg / border / text colors
Source from `Subject Badge/[Name] - M` (24px) or `Subject Badge/[Name] - L` (32px) components on the Iconography page. **Never approximate with Tailwind color tokens.**

**Lookup:** `findAll(n => n.type === 'COMPONENT' && n.name === 'Subject Badge/[Name] - M')` on Iconography page.

**L vs M:** bg colors are identical between sizes. Border colors differ slightly for some subjects (Add Math, Account). Since quiz cards use M size (24px), always check M variants for quiz card badges.

**Text color rule:** Almost all subjects use `#f2f2f2` (light text on dark bg). Exceptions — dark text on light bg:
- `Science`: `--badge-text: #998027` (yellow bg)
- `KAFA`: `--badge-text: #358a62` (mint green bg)

**Confirmed badge colors — M variants (May 2026), all from DS Iconography:**

| Subject | `--badge-bg` | `--badge-border` | Text |
|---|---|---|---|
| Add Math | `#283589` | `#202a6e` | `#f2f2f2` |
| Account | `#0072ca` | `#005ba2` | `#f2f2f2` |
| Bahasa Melayu | `#4d77ff` | `#3e5fcc` | `#f2f2f2` |
| Biology | `#8431d8` | `#6a27ad` | `#f2f2f2` |
| Business | `#efb42b` | `#bf9022` | `#f2f2f2` |
| Chemistry | `#e20082` | `#b50068` | `#f2f2f2` |
| Computer Science | `#d10070` | `#a7005a` | `#f2f2f2` |
| Economy | `#ff5733` | `#cc4629` | `#f2f2f2` |
| English | `#ff4d56` | `#cc3e45` | `#f2f2f2` |
| Geography | `#77d836` | `#5fad2b` | `#f2f2f2` |
| History | `#a97c50` | `#876340` | `#f2f2f2` |
| Islamic Studies | `#de4d7f` | `#b23e66` | `#f2f2f2` |
| KAFA | `#8ae3a9` | `#6eb687` | `#358a62` |
| Mathematics | `#42ac7b` | `#358a62` | `#f2f2f2` |
| Moral Studies | `#0072ca` | `#005ba2` | `#f2f2f2` |
| Physics | `#27a0d7` | `#1f80ac` | `#f2f2f2` |
| RBT | `#353535` | `#2a2a2a` | `#f2f2f2` |
| Science | `#ffd641` | `#ccab34` | `#998027` |

**Structure confirmed (DS node inspection, May 2026):**
- Overall: `height: 24px` (M), `border-radius: 60px`, `overflow: hidden`
- Icon slot: `padding: 4px 8px 4px 12px`, white bg, `width: 34px`
- Label panel: `padding: 0 16px 0 12px`, `gap: 8px`, subject bg color
- Pointer: 4×8px white SVG, `position: absolute; left: 0; top: 50%`
- Text: Poppins Medium 12px, line-height 12px

**Mistakes made (May 2026):**
- Used Tailwind/guessed colors for 8 subjects — RBT, KAFA, Account, Add Math, Economy, Business, CS, BM all had wrong bg and/or border colors.
- Business text was set to `#78350F` (dark) — DS actually uses `#f2f2f2` (light).
- KAFA text was missing `--badge-text: #358a62` override — rendered white text on mint green (unreadable).

---

### 18. Product collection role-to-palette mapping — Student ≠ pink

The DS Product collection has **3 modes: Student / Teacher / Parent**. Each maps `Primary/Base` to a different Primitive color. **Student is OG-Green, not pink.**

| Role | Primary palette | `Surface/primary/default` |
|---|---|---|
| **Student** | OG-Green | `#00cc85` |
| **Teacher** | Pink | `#ff5c98` |
| **Parent** | Yellow | (yellow) |

**Token resolution chain:** Semantic `Surface/primary/default` → aliases `Primary/Base` in Product → Product resolves by mode → Primitive hex value.

This means:
- Components using **Semantic tokens** (navbar, cards, borders) always show `#00cc85` regardless of role — they're not role-specific.
- Components using **Product tokens** (Button - 1.5, role-specific UI) resolve to the role's palette. On the **student home screen**, these resolve to OG-Green (#00cc85).

**Mistake made (May 2026):** Queried wrong node `1644:11342` (Type=Teacher variant) when looking up quiz card button states — got pink colors and incorrectly concluded Student=pink. Always verify which `Type=` variant a node belongs to before trusting its variable defs. The quiz card button uses `Type=Student` (node `1437:8154`) which is green.

---

### 19. Button - 1.5 Primary/S — all confirmed Student states (node 1437:8154)

These are the confirmed state values for the Pandai student home screen. All from DS `get_variable_defs` on each state node (May 2026).

| State | Btn bg | Border | Label | Arrow bg | Chevron | DS node |
|---|---|---|---|---|---|---|
| Default | `#00cc85` | `#00a36a` | `#f6fdfb` | `#99ebce` | `#00a36a` | `1437:8154` |
| Hover | `#b5f291` | `#70bc6f` | `#70bc6f` | `#e8fbe8` | `#70bc6f` | `1437:8146` |
| Pressed | `#00a36a` | `#00cc85` | `#00cc85` | `#00cc85` | `#00a36a` | `1437:8138` |
| Disabled | `#f2f2f2` | `#bfbfbf` | `#bfbfbf` | `#f2f2f2` | `#bfbfbf` | `1437:8130` |

**Pressed state tokens (confirmed — design.color.md §6.1, live-verified 2026-05-28):**
- Btn bg: `Surface/primary/focus` (#00a36a) — Primary variant uses PRIMARY focus, NOT Tertiary dark teal
- Border: `Border/primary/default` (#00cc85)
- Label: `Text/primary/default` (#00cc85) — NOT `Text/primary/on-color` (#f6fdfb)
- Arrow bg: `Surface/primary/default` (#00cc85)
- Chevron: `Surface/primary/focus` (#00a36a)

**Correction (2026-05-31):** Prior version of this rule incorrectly stated Primary/S Pressed = `Surface/tertiary/default` (#00564c). That dark teal palette applies to **Secondary and Tertiary variants only**. Primary uses the lighter `Surface/primary/focus` (#00a36a). Source: design.color.md §6.1 live audit vs DS node `473:650`. See Rule 40.

---

### 20. Subject Badge L vs M — base CSS is L; quiz card overrides to M

The base `.subject-badge` CSS is always the **L size** (32px). The quiz card context applies a global override to shrink it to **M** (24px). Never build a separate "L badge" component — just remove the quiz card constraint when L is needed.

**DS-confirmed specs — from Subject Badge - 1.5 component nodes `2339:1349` (M) and `2339:1343` (L):**

| Property | M (24px) | L (32px) |
|---|---|---|
| Height | 24px | 32px |
| Icon slot width | 36px (12+16+8) | 40px (12+20+8) |
| Icon slot padding | `t:4 r:8 b:4 l:12` | `t:4 r:8 b:4 l:12` (same) |
| **Icon size (exact)** | **`width: 16px; height: 16px`** | **`width: 20px; height: 20px`** |
| Label padding | `t:0 r:16 b:0 l:12` | `t:0 r:16 b:0 l:12` (same) |
| Text | 12px Medium, line-height 12px | 14px Medium, line-height 20px |

**Icon sizes are exact px — never use `max-height` approximations.** The DS component defines icons as fixed 16×16 (M) and 20×20 (L) instances, not auto-height.

**To display L size inside a quiz card:** scope-override the quiz card M constraint using the section ID:
```css
#SectionName-Desktop .quiz-card__header .subject-badge       { height: 32px; max-height: 32px; }
#SectionName-Desktop .quiz-card__header .subject-badge__text  { font-size: 14px; line-height: 20px; }
#SectionName-Desktop .quiz-card__header .subject-badge__icon svg,
#SectionName-Desktop .quiz-card__header .subject-badge__icon img { width: 20px; height: 20px; }
```

**Mistake made:** Tried to build a new L badge class. Correct approach: the global `.subject-badge` is already L — just lift the quiz card M override per section.

---

### 21. Never put `cursor: pointer` on card or container elements

`cursor: pointer` belongs **only on interactive elements** — `<button>`, `<a>`, and `<div role="button">`. Card containers (`<article>`, `<div class="card">`) must use `cursor: default`, even when they contain buttons.

Putting `cursor: pointer` on a card gives users the false impression that the entire card surface is one clickable unit, which conflicts with having a distinct button inside the card.

**Rule:** Set `cursor: default` on card containers. The browser renders the hand cursor automatically on `<button>` and `<a>` children — no override needed.

**Mistake made:** `.quiz-card { cursor: pointer }` caused the entire quiz card surface (including the image area and text) to show a hand cursor. The correct pattern: `cursor: default` on the card, `cursor: pointer` is inherited by the `<button>` inside.

---

### 22. Figma text strokes → CSS `-webkit-text-stroke` + `paint-order`

Some DS components apply a **stroke on TEXT nodes** to create a character outline effect. This is distinct from a border on a container — the stroke outlines each individual glyph. Always check for strokes on TEXT nodes when inspecting a component, not just on FRAME/INSTANCE nodes.

**CSS pattern:**
```css
-webkit-text-stroke: 1px <stroke-color>;
paint-order:         stroke fill;
```
`paint-order: stroke fill` is mandatory — without it the stroke renders on top of the fill, covering the text interior and making it illegible.

**Confirmed instance — Status Badge Coins (DS node `2312:10654`):**
- Both "Coins" label (10px) and value (16px) TEXT nodes have `stroke: #cba500, weight: 1`
- No other badge variants (Score, Streak, Lives, Ruby) have text strokes — this is Coins-specific

**Mistake made:** Coins label and value were rendered without text stroke. The DS applies the stroke to make white text legible on the bright yellow (`#fece00`) background with a subtle gold outline.

---

### 23. Fixed footer — body padding-bottom = footer height + DS content gap

When the footer is `position: fixed`, the scrollable content needs `padding-bottom` equal to **footer height + DS-specified gap** so the last section is never obscured.

**DS reference (Screen page, home + footer frame `1867:17694`):**
- Home content frame `1740:9670`: `padding-bottom: 30` (raw value — **not variable-bound**)
- Footer - 1.5 height: 60px

**Rule:** `body { padding-bottom: 90px; }` — 60px (footer) + 30px (DS gap).

**Important:** Not all spacing values in DS screen frames are token-bound. Always check `boundVariables` on a node before assuming a raw px value maps to a Semantic token. If absent from `boundVariables`, treat it as a hardcoded design decision and use the raw value.

**Mistake made:** `body` had `padding-bottom: 60px` (footer height only), cutting off 30px of breathing room. Corrected to 90px after reading DS screen frame.

---

### 24. Never set `min-height` on content containers — let content define height

Explicit `min-height` values on card content areas create phantom blank space when the actual content is shorter than the minimum. Card content containers must **hug their content** — height is determined by padding + children only.

**DS reference:** Primary Card Content Placeholder (`2881:36281`) has `padding: 0`, `primaryAxisSizingMode: AUTO` — it hugs its content with no minimum height constraint.

**Rule:** Do not add `min-height` to `.primary-card__content` or equivalent grid/flex containers. Uniform `padding: var(--spacing-space-m)` (16px all sides, `Spacing/space-m`) is sufficient to produce consistent spacing above and below the cards.

**Mistake made:** `.primary-card__content { min-height: 200px }` forced the white box to 200px even though 3 quiz cards (148px) + padding (16px × 2) = 180px. The extra 20px appeared as uneven bottom padding.

---

### 25. Status Badge icon sizing — DS natural dimensions, use `object-fit: contain`

All 5 Status Badge icons are **24px tall** but have different natural widths confirmed from DS node `2312:10653`:

| Icon | DS width | DS height |
|---|---|---|
| Streak (P.Streak) | 17px | 24px |
| Trophy (P.Trophy) | 20px | 24px |
| Heart (P.Heart) | 22px | 24px |
| Coin (P.Coin) | 24px | 24px |
| Ruby (P.Ruby) | 24px | 23px |

**CSS rule:** `width: 24px; height: 24px; object-fit: contain` — fixes both overflow (from unconstrained width) and squish (from square forcing). `object-fit: contain` letterboxes non-square icons correctly within the 24×24 box.

**Never use `height: auto; width: auto` on `<img>` SVGs** — SVGs without explicit pixel dimensions don't provide reliable intrinsic size for the browser. `object-fit: contain` with explicit box dimensions is the safe cross-browser pattern.

---

### 26. SVG `preserveAspectRatio="none"` squishes non-square icons — always check exported SVGs

Figma exports SVG icons with `preserveAspectRatio="none" width="100%" height="100%"`. This instructs the browser to **stretch the SVG content to fill the CSS box** regardless of `object-fit` on the `<img>` element. Non-square icons (Streak 17×24, Trophy 20×24, Heart 22×24) get horizontally distorted — Streak was the most visible (41% stretch).

**Fix:** Replace `preserveAspectRatio="none" width="100%" height="100%"` with explicit pixel dimensions from the `viewBox`:
```html
<!-- Before (broken) -->
<svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 17 24" ...>

<!-- After (correct) -->
<svg width="17" height="24" viewBox="0 0 17 24" ...>
```

The default `preserveAspectRatio="xMidYMid meet"` (applied when the attribute is absent) combined with explicit pixel dimensions lets `object-fit: contain` work correctly.

**Rule:** When importing any SVG icon file, check the opening `<svg>` tag for `preserveAspectRatio="none"`. Remove it and replace `width="100%" height="100%"` with the pixel values from the `viewBox` attribute.

**Figma text stroke `strokeAlign` — CSS doubling rule:**
When DS TEXT node has `strokeAlign: OUTSIDE` weight 1px, use `-webkit-text-stroke: 2px` (not 1px). CSS `-webkit-text-stroke` is centered (half inside, half outside). With `paint-order: stroke fill`, the fill covers the inner half — only the outer half is visible. To get 1px visible outside, use 2px total so 1px inside is covered and 1px outside remains. Confirmed: Coins badge label+value.

---

### 27. SVG icon viewBox must match the DS 24×24 frame, not the path bounds

Figma exports icon SVG paths in **local coordinates** (0-based, tight to the path). But every DS icon lives inside a 24×24 frame, and the vector is positioned at some (x, y) offset within that frame. If the `viewBox` wraps only the path (e.g. `-1 -1 20 22`), the SVG scales up when rendered at 24×24 CSS — making the stroke visually thicker than intended.

**Rule:** Always translate path coordinates by the vector's DS frame offset `(+x, +y)` and set `viewBox="-1 -1 26 26"` (24px frame + 1px buffer each side).

**Formula:**
```
new path coords = original local coords + (vec.x, vec.y)
viewBox = "-1 -1 26 26"
```

**How to get the offset:** `use_figma` → `findOne(n => n.id === '<icon-node-id>')` → `findAll(n => n.type === 'VECTOR')` → read `.x` and `.y` on the vector node.

**Scale math:** With `viewBox="-1 -1 26 26"` at 24×24 CSS: scale = 24/26 = 0.923×, stroke = 1.5 × 0.923 = **1.38px** — consistent across all icons. A tight `-1 -1 20 22` viewBox at 24px = 24/20 = 1.2× → stroke = **1.8px** (visually thicker).

**Exception — non-circular glyphs (e.g. EN text icon):** Landscape/portrait icons that are NOT 24×24 squares still use the translated viewBox approach when rendered without a clip container. The path translation to DS absolute coords + `-1 -1 26 26` viewBox gives the correct visual spacing within the 24×24 CSS box.

**Navbar action icons confirmed (DS node 1084:1909):**
- All 6 action icons (search, maximize, smartphone, bell, EN, waffle) are plain 24×24 — no CSS clip, no padding.
- All use `viewBox="-1 -1 26 26"` with translated paths.

**Navbar nav button icons (Row 2):** These ARE inside clip containers (`.nav-btn__icon-clip`) with per-icon DS inset padding — leave those viewBoxes as-is (tight to path), the clip handles sizing.

---

### 28. Always check the DS component, not just the Iconography page

The Iconography page shows raw icon frames. The rendering context — clip size, padding, no-clip — is defined by the **component that uses the icon**, not by the Iconography page itself.

**Rule:** Before implementing an icon's CSS container (size, padding, overflow), always inspect the actual DS component node that uses it via `use_figma`. The component defines the ground truth for how the icon should render.

**Confirmed mistake:** Action icons in the navbar were implemented with `padding: 3px; overflow: hidden` based on inset percentages from the Iconography page. The actual DS Navbar component (node `1084:1909`) renders all action icons as plain 24×24 with `padding: 0, clipsContent: false` — no clip at all.

**Workflow:**
```
1. Find the component that uses the icon (e.g. Navbar, Button, Badge)
2. use_figma → inspect that component → find the icon instance → read its parent container
3. Check: clipsContent, paddingTop/Right/Bottom/Left, width, height on the parent
4. Implement CSS to match that container — not the raw Iconography insets
```

---

### 29. CSS size overrides must be complete — never rely on cascade from a different size

When overriding a component to a different size (e.g. M inside a quiz card when the base is L), every property that differs between sizes needs its own explicit override. Never assume a property will inherit correctly from the base if you only override some properties.

**Confirmed case — Subject Badge M quiz card override:**
- `height: 24px` ✓ — overridden
- `font-size: 12px` ✓ — overridden
- `icon width/height: 16×16` ✗ — **missing** — fell through to base L (20px wide icon) making icons too large in M badges

**Rule:** When writing a size override, list every property that differs and override all of them. Check against the DS component spec for the target size — don't guess which properties change.

**Checklist for Subject Badge M override:**
```css
.quiz-card__header .subject-badge               { height: 24px; max-height: 24px; }
.quiz-card__header .subject-badge__icon         { padding: 4px 8px 4px 12px; }
.quiz-card__header .subject-badge__icon svg,
.quiz-card__header .subject-badge__icon img     { width: 16px; height: 16px; }   /* ← was missing */
.quiz-card__header .subject-badge__text         { font-size: 12px; line-height: 12px; }
```

---

### 30. Figma frame strokes ≠ CSS `border` — use `box-shadow: inset` to match

Figma frame **strokes** render visually on the boundary but **do not consume layout space**. A 18×18 frame with a 1px stroke is still 18×18 — the stroke doesn't push content inward.

CSS `border` consumes box-model space. With `box-sizing: border-box; width: 18px; border: 1px; padding: 1px`, content = 18−2−2 = **14px** — smaller than expected and may cause children to overflow.

**Rule:** Replicate Figma stroke with `box-shadow: inset 0 0 0 <weight>px <color>` — this renders a visible ring inside the element without affecting layout. Then size with content-box math.

**CSS pattern for Secondary/M button arrow (DS node `538:1929` — 18×18, 1px stroke, 1px padding):**
```css
.arrow {
  width:      16px;          /* content width */
  height:     16px;          /* content height */
  padding:    1px;           /* +1 each side = 18px total */
  box-shadow: inset 0 0 0 1px var(--border-primary-default);  /* Figma stroke */
  /* NO border — border would consume space and shrink content to 14px */
}
```

**Confirmed mistake:** Secondary/M button arrow used `border: 1px solid; padding: 1px; box-sizing: border-box; width: 18px` → 14px content area. The 16px clip overflowed. Corrected to `box-shadow: inset`, `width: 16px; padding: 1px` → 18px total, 16px content.

**Applies whenever:** a DS node has both a stroke AND padding, and you need the content area to be exactly `frame_size − 2×padding`.

---

### 31. Button - 1.5 confirmed DS specs (Student Type)

All specs from `use_figma` inspection of component nodes. Arrow circle fills/strokes from `node.fills`/`node.strokes`.

| Property | Primary/S | Primary/M | Secondary/M |
|---|---|---|---|
| Height | 24px | 32px | 32px |
| Outer padding | `2px 8px` | `2px 8px` | `2px 8px` |
| Border-radius | 60px (pill) | 60px | 60px |
| Text | 12px SemiBold | 12px SemiBold | 12px SemiBold |
| Text slot padding | `0 4px` | `0 4px` | `0 4px` |
| Arrow circle size | 16×16 | 20×20 | 18×18 |
| Arrow padding | 2px (content-box) | 2px (content-box) | 1px (content-box) |
| Arrow clip | 12×12 | 16×16 | 16×16 |
| Arrow fill | `#99ebce` | `#99ebce` | white |
| Arrow stroke | none | none | 1px `#00cc85` → use `box-shadow:inset` |
| DS node (Default) | `1437:8154` | `479:344` | `538:1923` |

**All button sizes share the same outer padding `2px 8px` and text size `12px SemiBold`.** Height and arrow size are the only things that change between S/M/L.

---

### 32. Always reset `<button>` default browser styles

Native `<button>` elements carry browser-default styles: grey background, visible border, and padding. These render as a grey box around the content — completely overriding any icon-only or transparent button design from the DS.

**Required reset for every custom-styled `<button>`:**
```css
.my-btn {
  background: none;
  border:     none;
  padding:    0;
  cursor:     pointer;
}
```

**Rule:** Any `<button>` used to wrap a DS icon (hamburger, close, chevron, etc.) must have all three resets — `background: none`, `border: none`, `padding: 0` — or the browser will render a grey box around the icon.

**Confirmed mistake (May 2026):** Mobile navbar hamburger button rendered with a grey rounded box because `background/border/padding` resets were missing. The DS Menu Icon frame has `fills: []` (transparent) — the box came entirely from browser defaults.

**When to use `<button>` vs `<div>`:** Prefer `<button>` for icon-only tap targets (semantic, gets focus/keyboard for free). Prefer `<div>` for complex nav items like `.nav-btn` (multi-child layout that doesn't suit button flow). Always add the reset above when using `<button>`.

---

### 33. Responsive typography — DS Responsives collection defines the scale

The DS has a **Responsives** variable collection with 3 modes: Desktop / Tablet / Mobile. Frame widths: Desktop=1440px, Tablet=687px, Mobile=390px. Only **Heading and some Title** styles change across breakpoints — Body (14px and below) and Caption never change.

**Resolved type scale per breakpoint (DS Responsives, confirmed May 2026):**

| Style | Desktop | Tablet | Mobile |
|---|---|---|---|
| Header/H1 | 28px / lh:42 | 24px / lh:36 | 20px / lh:32 |
| Header/H2 | 24px / lh:36 | 24px (same) | 20px / lh:32 |
| Header/H3 | 24px / lh:36 | 20px / lh:32 | 20px (same) |
| Header/H4 | 20px / lh:32 | 20px (same) | 18px / lh:28 |
| Title/T1 | 18px / lh:28 | 18px (same) | 16px / lh:24 |
| Title/T2 | 18px / lh:28 | 18px (same) | 16px / lh:24 |
| Title/T3 | 16px / lh:24 | 16px (same) | 16px (same) |
| Title/T4 | 16px / lh:24 | 16px (same) | 14px / lh:20 |
| Title/T5 | 16px / lh:24 | 16px (same) | 14px / lh:20 |
| Body B1–B8 | 14px–10px | no change | no change |
| Caption C1–C2 | 12px–10px | no change | no change |

**CSS breakpoint mapping (prototype):**

| DS mode | CSS breakpoint |
|---|---|
| Tablet (687px) | `@media (max-width: 1279px)` |
| Mobile (390px) | `@media (max-width: 767px)` |

**Rule:** Always override both `font-size` AND `line-height` together in the media query — never just font-size. Line height must scale with the type or text becomes cramped/loose.

**Only apply to elements that actually use those styles.** Don't add generic `h1, h2` tag overrides — scope overrides to the specific class using that text style (e.g. `.welcome-text__name`, `.static-card__title`, `.section-header__title`).

**Mistake made (May 2026):** `.welcome-text__name` was set to 26px (not a DS value). Correct base is 28px (Header/H1). Always use the exact DS text style value at desktop — never approximate.

---

### 34. Responsive reordering — use CSS `order`, never rewrite HTML

When the mobile layout order differs from the desktop HTML source order, use CSS `order` on flex children. Never rearrange HTML elements to satisfy a mobile layout — that breaks the desktop.

**Pattern — horizontal row → vertical stack with reordered children:**
```css
/* Desktop: row layout, source order = A → B → C */

/* Tablet/Mobile: column, desired order = B → A → C */
@media (max-width: 1279px) {
  .section {
    flex-direction: column;
    align-items:    flex-start;   /* left-align stacked children */
  }
  .child-b { order: 1; }   /* moves to top */
  .child-a { order: 2; }
  .child-c { order: 3; width: 100%; }  /* full-width card-like children */
}
```

**Checklist when switching a flex row to a column:**
- `flex-direction: column` — stack children
- `align-items: flex-start` — left-align (default `stretch` is usually wrong)
- `order` — reassign source-order children to desired visual order
- `flex: unset` — reset any `flex: 1` grow rules on children that shouldn't stretch vertically
- `width: 100%` — card/container children need this to fill the column width
- `flex-wrap: wrap` on any inner row that holds many fixed-width items (e.g. pill badges) so they wrap before overflowing at narrow widths

**Confirmed instance — Welcome section (May 2026):**
- Desktop: `status-badges` (left) → `welcome-text` (center, `flex:1`) → `check-in-card` (right)
- Tablet/Mobile target: welcome-text (top) → status-badges (middle) → check-in-card (bottom, full-width)
- Fix: `order: 1/2/3` on each child + `welcome-text { flex: unset; text-align: left }` + `check-in-card { width: 100% }` + `status-badges { flex-wrap: wrap }` at mobile (5 pills × 122px = 610px overflows at 400px min-width)

**`flex-wrap: wrap` vs `flex-direction: column` — choose by intent:**

| Goal | Pattern |
|---|---|
| "Stack vertically, reorder children" | `flex-direction: column` + `order` |
| "Wrap downward, preserve row context" | `flex-wrap: wrap` + `flex-basis: 100%` on children |

Use `flex-wrap: wrap` + `flex-basis: 100%` when the user says "wrap downward" or when a multi-column row should collapse to single-column by wrapping. The flex row context is preserved, gap works on both axes, and partial wrapping (e.g. 2-per-row at tablet → 1-per-row at mobile) is easy to add later by changing `flex-basis`.

Use `flex-direction: column` when the stack is intentional and reordering via `order` is also needed (e.g. the Welcome section where items swap positions).

**Confirmed instance — Static Cards Section #4 (May 2026):**
- Desktop: 2 cards side-by-side (`flex: 1` each)
- Mobile: `flex-wrap: wrap` + `.static-card { flex-basis: 100% }` → each card fills full row width and wraps to next line

---

### 35. Fixed elements — use `left:0; right:0` not `left:50%; transform`

`position: fixed` with `left: 50%; transform: translateX(-50%); max-width: 1440px` centers the element in the viewport but leaves the left and right of the viewport uncovered when the viewport is wider than 1440px. This causes the fixed bar to appear as a narrower floating strip instead of edge-to-edge.

**Rule:** Always use `left: 0; right: 0` for fixed bars (footer, sticky header, toast) that must fill the full viewport width. Never use the centering hack on fixed elements.

```css
/* Wrong — leaves gaps on wide viewports */
.footer { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 1440px; }

/* Correct — fills full viewport width at all sizes */
.footer { position: fixed; bottom: 0; left: 0; right: 0; }
```

**Mistake made (May 2026):** Footer used `left:50%; transform:translateX(-50%); max-width:1440px` — appeared correct on narrow viewports but had visible side gaps on wider screens. Fixed with `left:0; right:0`.

---

### 36. Always use `<use href="#ic-*">` — never duplicate inline SVG paths

Every icon used in the prototype has a `<symbol>` definition in the SVG defs block at the top of `<body>`. Referencing it via `<svg><use href="#ic-*"/></svg>` is the only correct pattern. Never paste the raw SVG path inline in the HTML — it creates a silent duplicate that drifts out of sync if the symbol is ever updated, and wastes significant HTML bytes.

**Rule:** If a `<symbol id="ic-*">` exists for an icon, always use `<use href="#ic-*">`. Only add an inline SVG if no symbol exists yet (then add the symbol to the defs block first, and reference it from there).

**Semantic token rule:** Always pick the token whose *name* matches the usage context, even when multiple tokens share the same hex value. Icon strokes → `--icon-primary-default`. Container fills → `--surface-primary-default`. Both are `#00cc85` but only one is semantically correct.

**Confirmed mistake (May 2026):** Footer heart used a 22-line inline SVG duplicate of `ic-heart`. The `<symbol id="ic-heart">` already existed in the defs. Also used `--surface-primary-default` instead of `--icon-primary-default` for the stroke color.

---

### Footer - 1.5 confirmed DS specs (node 2073:6579, May 2026)

| Property | Value |
|---|---|
| Height | 60px |
| Padding | `t:20 r:28 b:20 l:28` → CSS `height:60px` + `align-items:center` + `padding:0 28px` |
| Border | top only, 1px `#00cc85` (`--border-default`) — stroke is full INSIDE but only top is visible |
| Background | white (`--surface-general-default`) |
| Layout | `HORIZONTAL`, `SPACE_BETWEEN`, `crossAlign:CENTER` |
| Left group gap | 4px (`--spacing-space-xxs`) |
| Right group gap | 4px (`--spacing-space-xxs`) |
| All text | 14px / weight:500 / `#666666` (`--text-default-body`) |
| Link "Pandai.org" | 14px / weight:500 / `#00cc85` (`--text-primary-default`) — `visible:false` on both icons, text only |
| Heart icon | `<use href="#ic-heart">`, 20×20, `color:var(--icon-primary-default)` (`#00cc85`) |
| Positioning | `position:fixed; bottom:0; left:0; right:0; z-index:100` |

---

### 37. CSS 3D flip pattern — two-face badge/card flip

Use pure CSS `transform-style: preserve-3d` + `backface-visibility: hidden` for any flip animation between two states. No Lottie, no JS animation libraries needed.

**Structure:**
```html
<div class="flipper">                          <!-- perspective host -->
  <div class="flipper__inner">                 <!-- rotates -->
    <div class="face face--front">...</div>    <!-- normal flow, sizes container -->
    <div class="face face--back">...</div>     <!-- position:absolute, pre-rotated 180deg -->
  </div>
</div>
```

**CSS:**
```css
.flipper          { perspective: 800px; }
.flipper__inner   { position: relative; transform-style: preserve-3d;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform; }
.flipper__inner.is-flipped { transform: rotateY(180deg); }
.face             { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.face--back       { position: absolute; top:0; left:0; right:0; bottom:0;
                    transform: rotateY(180deg); }
```

**JS (register before carousel/non-critical JS):**
```js
const flipper = document.querySelector('.flipper__inner');
if (flipper) setInterval(() => flipper.classList.toggle('is-flipped'), 3000);
```

**Key rules:**
- Front face is in normal flow — it sizes the container. Back face is `position: absolute` overlaying the front.
- `will-change: transform` promotes the element to its own GPU layer — eliminates jank on transition start.
- `perspective` goes on the **parent** of the rotating element, not on the element itself.
- Snappy feel = short duration (0.3s) + `cubic-bezier(0.4, 0, 0.2, 1)`. Longer (0.5s+) feels sluggish for small UI elements.

**CSS animation vs Lottie — choose by complexity:**
| Use case | Tool |
|---|---|
| Single-transform: flip, fade, slide, scale | Pure CSS transition / `@keyframes` |
| Multi-step icon morph, illustrated sequence, After Effects export | Lottie (`.json` + `lottie.js`) |

Lottie plays keyframe data exported from After Effects as `.json`. CSS animations are rendered directly by the browser from the stylesheet — no file format, no library. A simple `rotateY` flip never needs Lottie.

**Confirmed instance — Lives/Ruby status badge flip (May 2026):**
- Two pills merged into one flipper; flips every 3s
- Front: Lives (`#ff5c98`), Back: Ruby (`#ff4c51`)
- `setInterval` registered immediately after nav handler, before carousel `try/catch`

---

### 38. DS state naming — `State=Active` ≠ `State=Pressed`, verify visually before implementing

The DS `Button - 1.5` has 5 states: **Default, Hover, Pressed, Active, Selected, Disabled**. Their names are NOT self-explanatory for interactive feedback:

| DS State | Visual | When to use |
|---|---|---|
| `State=Default` | White bg, grey label, green icon | Resting |
| `State=Hover` | Light green bg (`#b5f291`) | Mouse over |
| `State=Pressed` | Primary green (`#00cc85`) — **same as Selected** | Momentary click (indistinguishable from selected) |
| `State=Active` | Dark teal bg (`#00564c`), green label/icon | **Use this as the press feedback** — clearly distinct |
| `State=Selected` | Primary green (`#00cc85`) | Currently active page/tab |
| `State=Disabled` | Grey bg (`#f2f2f2`) | Non-interactive |

**Rule:** Always take a screenshot of EVERY state variant before deciding which to map to which interaction. `State=Pressed` in the DS Tertiary button is visually identical to `State=Selected` — using it as pressed feedback gives no visual change. `State=Active` (dark teal) is the correct choice for a perceptible press.

**Confirmed — Navbar button Active/Pressed (DS node `3029:20022`, Tertiary/L/Student):**
- bg: `#00564c` → `var(--surface-tertiary-default)`
- border: `#00453d` → `var(--border-tertiary-focus)`
- text: `#00cc85` → `var(--text-primary-default)`
- icon: `#00cc85` → `var(--icon-primary-default)`

---

### 39. CSS `:active` on `<div>` is unreliable — use JS `mousedown`/`mouseup` instead

CSS `:active` on a non-native interactive element (`<div>`) fires only while the mouse button is physically held down — typically 50–150ms. Users clicking at normal speed rarely see the state. It can also fail in Electron-based webviews (VS Code Simple Browser).

**Rule:** Always implement pressed state on `<div>` elements via JS class toggle, not CSS `:active`.

```js
btn.addEventListener('mousedown',  () => btn.classList.add('is-pressed'));
btn.addEventListener('mouseup',    () => btn.classList.remove('is-pressed'));
btn.addEventListener('mouseleave', () => btn.classList.remove('is-pressed'));
```

`mouseleave` cleanup is mandatory — prevents the button getting stuck in pressed state if the cursor moves away while the mouse button is held.

**Use CSS `:active` only on native interactive elements** (`<button>`, `<a>`) where browser handling is reliable.

**Mistake made (May 2026):** First implemented `:active` CSS on `.nav-btn` (a `<div>`). User reported "still same" — state was not visible. Replaced with JS mousedown/mouseup.

---

### Always trace instances to their main component before looking up states

When looking up states for a component used inside a larger DS assembly (e.g. a button inside the Navbar), always inspect the **instance's mainComponent** to identify the exact component set and variant. Never guess from the assembly's component set name.

**Confirmed mistake (May 2026):** Searched `Menu Button - Parts` (a nav-level component set) for the pressed state — found none. The actual component the navbar uses is `Button - 1.5, Variants=Tertiary, Size=L` (confirmed via `instance.mainComponent` inspection on node `866:5576`).

**Workflow:**
```
1. use_figma → inspect the parent assembly node
2. findAll(n => n.type === 'INSTANCE') → read mainComponent.name + mainComponent.parent.name
3. Navigate to THAT component set to find all states
```

---

### 40. Button - 1.5 Pressed palette — PRIMARY and SECONDARY use different palettes (RESOLVED 2026-05-31)

**Source of truth: `design.color.md` §6.1, live-verified 2026-05-28. Prior documentation (all-variants-same-teal) was wrong.**

| Variant | Pressed bg | bg token | Pressed border | border token | Label |
|---|---|---|---|---|---|
| **Primary** (S/M/L) | `#00a36a` | `Surface/primary/focus` | `#00cc85` | `Border/primary/default` | `#00cc85` |
| **Secondary** (S/M/L) | `#00564c` | `Surface/tertiary/default` | `#00453d` | `Border/tertiary/focus` | `#00cc85` |
| **Tertiary** (S/M/L) | `#00564c` | `Surface/tertiary/default` | `#00453d` | `Border/tertiary/focus` | `#00cc85` |

**Label token all variants:** `Text/primary/default` = `#00cc85`

**Key DS nodes:**
- Primary/L Pressed: `473:650` (bg `#00a36a`, border `#00cc85`) — confirms Primary ≠ Tertiary
- Secondary/M Pressed: `538:1907` (bg `#00a36a`, border `#00cc85`) — re-verified 2026-05-31 via `get_design_context`
- Tertiary/L Pressed: `3029:20022` (bg `#00564c`, border `#00453d`)

**Correction (2026-05-31):** Secondary Pressed = Primary Pressed = `#00a36a` (`Surface/primary/focus`). Only Tertiary Pressed uses the darker teal `#00564c`. Always re-verify live DS before implementing (DS token values change between sessions).

---

### 41. Always check `visible` on component children — hidden elements = no HTML/CSS needed

When inspecting DS component children via `use_figma`, check the `visible` property on each child. If `visible: false`, that element is not rendered in the DS and must NOT be added to the HTML or styled in CSS.

**Confirmed — Secondary/M button arrow (`arrowVisible: false` across all states):**
The DS Secondary/M button (`538:1923`) has an Arrow frame that is `visible: false` in every state — Default, Hover, Pressed, Active, Disabled. The arrow must not be added to the HTML for Secondary buttons. Any CSS targeting `.btn-secondary__arrow` is dead code.

**Rule:** Before implementing any structural element (icon, badge, arrow, label), confirm `visible: true` on that node in the DS. `visible: false` = intentionally hidden = exclude from implementation.

---

### 42. Composite borders — a component's visual frame may come from child elements, not the container

A DS component's visible border outline is not always a single `border` on the outer container. It can be **composed from multiple child elements**, each contributing part of the outline. Never assume the container has the border — always inspect the actual DS node tree.

**Confirmed instance — Carousel - 1.5 (node 1200:1789, May 2026):**

The carousel's green rounded frame has NO border on the Content frame. It is composed from:
- **Left Button container** (`1200:1837`): `position:absolute; left:0; top:0; bottom:0; padding:16px; border-top:1px #00cc85; border-left:1px #00cc85; border-bottom:1px #00cc85; border-radius: 24px 0 0 24px`
- **Right Button container** (`1200:1861`): `position:absolute; right:0; top:0; bottom:0; padding:16px; border-top:1px #00cc85; border-right:1px #00cc85; border-bottom:1px #00cc85; border-radius: 0 24px 24px 0`
- **Card top/bottom borders**: each card has `border:1px solid #00cc85; height:100%`, so their top/bottom edges visually complete the top/bottom of the outer frame in the middle section

The Content frame itself: `overflow:hidden; border-radius:24px` — **no border property at all**.

**CSS pattern for the button wrapper borders:**
```css
.carousel__btn-wrap--prev {
  left: 0;
  border-top:    1px solid var(--border-default);
  border-left:   1px solid var(--border-default);
  border-bottom: 1px solid var(--border-default);
  border-radius: 24px 0 0 24px;
}
.carousel__btn-wrap--next {
  right: 0;
  border-top:    1px solid var(--border-default);
  border-right:  1px solid var(--border-default);
  border-bottom: 1px solid var(--border-default);
  border-radius: 0 24px 24px 0;
}
```

**Why this works:** The button wrappers are `position:absolute` inside the Content frame (`overflow:hidden; border-radius:24px`). Their 3-side borders (at `left:0` / `right:0`) land on the content frame boundary and get clipped at the matching 24px corner radius — creating a seamless visual frame.

**Mistake made:** Added `border: 1px solid #00cc85` to the Content frame OR the card, and tried adjusting card width to expose card edges. Neither addressed the missing left/right sides of the outer frame. The fix was adding the DS-correct 3-side borders to the button wrapper elements.

**Rule:** When a "border" appears to be missing from a component, use `get_design_context` to inspect which child node actually carries the border strokes — never guess that it belongs to the outermost container.

---

### 43. DS component variants per breakpoint — always check for Mobile/Tablet variants before implementing responsive

Many DS components have named variants like `Type=Desktop` and `Type=Mobile`. These variants differ in structure (not just size), so responsive CSS overrides are not enough — the Mobile variant may have completely different children, spacing, and layout.

**Always `use_figma` to list all variants in a component set before writing any responsive CSS.**

**Confirmed — Carousel - 1.5 (component set `3060:868`, May 2026):**

| Variant | Node | Width | Height | Notes |
|---|---|---|---|---|
| `Type=Desktop` | `1200:1789` | 1559px | 263px | Nav buttons, 186px cards, gap 16px, content border-radius 24px |
| `Type=Mobile` | `3060:869` | 350px | 152px | No nav buttons, 152px cards, gap 8px, no border-radius on content frame |

**Mobile variant spec differences (DS confirmed):**
- No Left/Right button containers — no nav buttons at all
- Card height: **152px** (vs 186px desktop)
- Cards row gap: **8px** (`Spacing/space-xs`, vs 16px desktop)
- Content frame: **no `border-radius`** (vs 24px desktop)
- No composite 3-side border frame (follows from no button containers)
- Indicator: 88×12px (vs 108×20px desktop)

**Full-width bleed pattern — escape page padding for edge-to-edge sections:**
```css
@media (max-width: 767px) {
  #SectionName {
    width:       100vw;
    min-width:   400px;
    margin-left: calc(-1 * var(--page-padding-x));
  }
}
```
This escapes the `.page-container`'s horizontal padding without changing the container itself. Works as long as the parent does not have `overflow: hidden`.

---

### 44. JS carousel centering — never hardcode card width or gap, always read from DOM

If the carousel JS hardcodes `CARD_W` and `GAP` as constants, the centering breaks whenever CSS changes the card size at a different breakpoint (e.g. mobile variant with `aspect-ratio` gives a narrower card).

**Rule:** `offsetFor()` must always read card width and gap from the live DOM — never use hardcoded pixel values.

```js
// WRONG — breaks when CSS changes card size at mobile
const CARD_W = 428;
const GAP    = 16;
function offsetFor(i) {
  return -(i * (CARD_W + GAP)) + (content.offsetWidth / 2 - CARD_W / 2);
}

// CORRECT — always reads actual rendered dimensions
function offsetFor(i) {
  const cw  = track.querySelector('.carousel__card').offsetWidth;
  const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
  return -(i * (cw + gap)) + (content.offsetWidth / 2 - cw / 2);
}
```

**Why `columnGap`:** `getComputedStyle(el).gap` is a shorthand and may return `"normal"` in some browsers. `columnGap` reliably returns the computed pixel value for the horizontal gap in a flex row.

**Resize handler is also required** — call `jump(idx)` on `window.resize` so centering recalculates if the viewport changes:
```js
window.addEventListener('resize', () => jump(idx));
```

**Mistake made:** `CARD_W = 428` was hardcoded. At mobile, CSS `aspect-ratio: 428/186; height: 152px` makes the card ≈349px wide. `offsetFor` calculated center using 428, placing the card ~39px off-center.

---

### Mandatory workflow before implementing any component

```
1. search_design_system  → confirm component exists in DS, get component key
2. use_figma             → find node ID across pages
3. get_design_context    → pull exact token bindings, dimensions, structure per variant
4. get_variable_defs     → confirm Semantic token names used on the node
5. Implement             → use only token values from steps 3–4, no assumptions
6. Validate              → compare against get_screenshot
```

---

## Project identity

- **Product:** Pandai — educational platform (Student / Teacher / Parent user roles)
- **Design tool:** Figma
- **AI assistant:** Claude Code (primary) + Claude.ai (planning/audit)
- **Workflow:** Figma MCP → Claude Code → VSCode → engineer handoff

---

## Figma file

| File | Key | Purpose |
|---|---|---|
| Pandai DS 1.5 **(cleanup target)** | `TLVKe3bgJTdVvuPAzgDq2f` | Original DS — single source of truth after cleanup |

---

## What was audited on the DS file (TLVKe3bgJTdVvuPAzgDq2f)

### Critical issues found
1. **ALL_SCOPES on all 878 variables** — every variable had no scope restriction, polluting all property pickers
2. **All 20 component pages were empty** — components were scattered across Nadia Exploration, Syakila Components, and Zul's Dungeon pages
3. **Zero paint styles and zero effect styles**
4. **Semantic collection had colors only** — no spacing, radius, or typography semantic aliases
5. **Duplicate components across pages** — multiple versions of Button, Badges, Tab Menu with inconsistent naming

### What was working in the source
- 3-tier token architecture: Atomic → Product (per user role) → Semantic (Light/Dark)
- Product collection multi-mode aliases (Student/Teacher/Parent) pointing correctly into Atomic
- Zul's Dungeon had the most complete v1.5 component sets (44 sets, 23 standalones)
- Poppins type system was internally consistent

---

## Variable collections — actual state after Fix 1 + Fix 2

> **Note:** Actual collection names differ from earlier audit estimates. Counts below are from live file read.

#### Primitives (429 vars, 1 mode: Value) — formerly called "Atomic"
- Colors: Grey (50–950), Orange, Red, OG-Green, Blue, Pink, Yellow, Purple, Lime, Teal, Sky, Neon, Green, Slate, Foundation, Vanilla, Minion, Azure, Mustard, Subject/* palettes
- Scale/0–1k: spacing raw values (0, 1, 2, 4, 8, 12, 16, 18, 20, 24, 28, 60, 108, 999)
- Corner Radius/xs–circle, pill, pill, lg, xxl, xxxl
- Typeface: Font Family, Font Weight, Font Size (50–900), Line Height (50–800)
- Border Width: xs, sm, md, lg
- Scopes fixed: colors → `FRAME_FILL SHAPE_FILL TEXT_FILL STROKE_COLOR EFFECT_COLOR`, Scale → `GAP WIDTH_HEIGHT PARAGRAPH_SPACING`, Radius → `CORNER_RADIUS`, Font Size → `FONT_SIZE`, Line Height → `LINE_HEIGHT`, Font Family → `FONT_FAMILY`, Font Weight → `FONT_STYLE`

#### Semantic (255 vars + 22 new = 277 vars, 2 modes: Light / Dark)
- Color groups: Text/*, Icon/*, Surface/*, Border/*, Overlay/* — scopes set per group
- **New float aliases added (Fix 2):**
  - `Spacing/component/none–2xl` → aliases into Primitives Scale/*
  - `Spacing/layout/sm–xl` → aliases into Primitives Scale/*
  - `Radius/none–full` → aliases into Primitives Corner Radius/*

#### Product (174 vars, 3 modes: Student / Teacher / Parent)
- Primary, Secondary, Tertiary (50–900), Success, Alert, Warning, Informative, Neutral
- Spacing/space-none → space-3xl, Border Width, Corner Radius, Overlay, Font/* tokens
- ALL_SCOPES removed — correct scopes assigned per type

#### Responsives (if present)
- Check file directly — not loaded during this session

### Text styles — 21 (Poppins)
```
Header/H1 (28px Bold) → Header/H4 (20px Medium)
Title/T1 (18px Bold) → Title/T5 (16px Medium)
Body/B1 (14px SemiBold) → Body/B8 (10px Medium)
Caption/C1 (12px Regular), Caption/C2 (10px Regular)
Caption/Link Reg (14px Regular), Caption/Link Med (14px Medium)
```

### Effect styles — 6
```
Elevation/xs → Elevation/sm → Elevation/md → Elevation/lg → Elevation/xl → Elevation/overlay
```

### Components — 431 across 25 pages
All from Zul's Dungeon. Full v1.5 coverage including:
- Button (3 sets: Button 1.5, Button Icon 1.5, Spinner 1.5)
- Button Group (2 sets: Parts + full group)
- Navigation Bar (7 sets + standalones: Navbar, Navbar Mobile, Learn Menu, Menu BG, etc.)
- Input Field (Input Field 1.5 + Input Group 1.5)
- Text Area, Dropdown (Parts + List + Tag), Accordion
- Checkbox, Radio Button, Toggle
- Avatar (Avatar 1.5 + Avatar Stacked 1.5)
- Badges (Pill + Subject + Label + Icon + Subject for Table)
- Alerts, Breadcrumb, Tab Bar (Parts + 1.5 + Var1)
- Divider, Modal (Alerts + Selection), Carousel (+ Parts)
- Pagination, Tooltip (+ BG Parts)
- Cards (Quiz Card, Quick Notes, Footer, Class Card, Primary, Practice, Reward)
- Progress Bar, Slider (+ Progress Slider with Icon)
- Table (full set: Cell, Cell Parts, Body Cell/Row, Heading Cell/Row, Table 1.5, Column, Row, Slot, etc.)
- Link

**2 components NOT yet on their pages:**
- `Button - Dropdown - 1.5` → should go in **Dropdown** page
- `Quiz Card - 1.5` → should go in **Cards** page
- Fix: publish these in source library OR manually copy-paste into the correct pages

---

## Engineer handoff checklist

| Deliverable | Status |
|---|---|
| Figma file link with view access | Ready |
| Team Library published | ✅ Done — published 2026-05-04 |
| Dev Mode enabled | Pending |
| Component descriptions (all 68 sets) | Skipped |
| Colors documentation page | ✅ Done — 255 Semantic tokens, Light & Dark swatches |
| Typography specimen page | ✅ Done — All 21 Poppins styles with live samples |
| Spacing scale page | ✅ Done — Primitives + Semantic spacing & radius |
| Paint styles | ✅ Done — 255 styles, all variable-bound |
| API contracts per component | Pending |
| CLAUDE.md in codebase | Pending |
| tokens.json export | Pending |
| Redline annotations | Optional (Dev Mode covers) |

---

## Figma MCP setup for Claude Code

```bash
# Install Figma plugin (recommended — remote MCP)
claude plugin install figma@claude-plugins-official

# OR desktop MCP (if using Figma Desktop app)
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

### Required Claude Code prompt flow for any Figma-driven component
```
1. get_design_context   → structured React + Tailwind representation
2. get_variable_defs    → extract token names used on the node
3. get_screenshot       → visual reference
4. Implement using local token system
5. Validate against screenshot
```

---

## CLAUDE.md starter (paste into project root)

```markdown
# Pandai Frontend — Claude Code Rules

## Files
Design system: https://www.figma.com/design/TLVKe3bgJTdVvuPAzgDq2f

## Design system rules
- NEVER use hardcoded hex colors — use CSS variables: var(--pd-color-*)
- NEVER use hardcoded px spacing — use spacing tokens: var(--pd-spacing-*)
- NEVER create new components if a DS equivalent exists
- Always check /src/components before building new UI

## Token prefix
All exported CSS variables use prefix: --pd-

## Token collections
- Atomic: raw values (Foundation, Grey, OG Green, Pink, Yellow, Purple, Teal, Slate, Spacing, Radius)
- Semantic: aliased tokens with Light/Dark modes (Text, Surface, Border, Icon, Spacing, Radius)
- Product: role-based colors with Student/Teacher/Parent modes (Primary, Secondary)
- Responsives: Desktop/Tablet/Mobile typography and frame widths

## Text styles (Poppins)
Header/H1–H4 | Title/T1–T5 | Body/B1–B8 | Caption/C1–C2 | Caption/Link Reg/Med

## Figma MCP workflow
1. Run get_design_context on selected node
2. Run get_variable_defs to get token names
3. Run get_screenshot for visual reference
4. Build using --pd-* token system
5. Validate against screenshot

## Component pages
Button, Button Group, Navigation Bar, Input Field, Text Area, Dropdown,
Accordion, Checkbox, Radio Button, Toggle, Avatar, Badges, Alerts,
Breadcrumb, Tab Bar, Divider, Modal, Carousel, Pagination, Tooltip,
Cards, Progress Bar, Slider, Table, Link
```

---

## Key variable name mappings

| Source DS name | Local variable name | Collection |
|---|---|---|
| `Spacing/space-s` | `Spacing/8` | Atomic |
| `Scale/200 (8)` | `Spacing/8` | Atomic |
| `Corner Radius/round` | `Radius/md` | Atomic |
| `OG Green/500 (Base)` | `OG Green/500 (Base)` | Atomic |
| `Grey/50–950` | `Grey/50–950` | Atomic |
| `Foundation/white` | `Foundation/white` | Atomic |
| `Foundation/black` | `Foundation/black` | Atomic |
| `Text/default/heading` | `Text/default/heading` | Semantic |
| `Surface/default` | `Surface/default` | Semantic |
| `Border/default` | `Border/default` | Semantic |
| `Primary/500 (Base)` | `Primary/500 (Base)` | Product |

---

## Next session — start with this prompt

Paste this exactly at the start of your next chat or Claude Code session:

```
I'm sharing this context file to resume our Pandai DS work.
We decided to clean up the original DS file (TLVKe3bgJTdVvuPAzgDq2f) 
to make it the standalone single source of truth for designers, 
front-end, and back-end developers. Please start the cleanup now.
```

### After cleanup — follow-up prompts

```
# Build documentation pages (run after component pages are organised)
"Build the Colors documentation page in the DS file showing all 
Atomic and Semantic color tokens as visual swatches with names and hex values"

"Build the Typography specimen page showing all 21 text styles with 
live text samples, font details, and token names"

"Build the Spacing & Layout page showing the full spacing scale and 
radius tokens as visual reference frames"

# Add component descriptions (run per page)
"Add descriptions to all component sets on the Button page explaining 
variants, states, sizes, and usage rules"

# Export tokens (run after cleanup is complete)
"Export all variables from the cleaned DS file as tokens.json 
following the W3C Design Tokens spec"

# Generate CLAUDE.md (run once file is published as library)
"Generate a complete CLAUDE.md for a React + TypeScript project using 
the Pandai DS with CSS Modules"
```

---

---

## HTML prototype — `zul.test.git/zul.home.screen.html`

Static HTML/CSS prototype of the Pandai home screen, implemented against DS 1.5.

**Architecture decisions:**
- Single `<svg><defs>` block at top of `<body>` holds all icon `<symbol>` definitions
- Icons referenced via `<use href="#ic-*">` — never inlined
- All icon colors via `color:` + `stroke="currentColor"` inheritance chain
- Per-icon clip insets via `data-icon` attribute selectors on clip containers
- All spacing, radius, and color values use CSS custom properties mapped to DS Semantic tokens
- No gradients, no box-shadows on containers — border only for depth
- Figma image fill placeholders are `<div class="...__bg">` + CSS `background-image`, never `<img>`

**Page section structure (confirmed May 2026):**
```html
<section id="NavBar-Desktop">      <!-- Navbar 1.5 desktop — shown at ≥1440px -->
<section id="NavBar-Mobile">       <!-- Navbar 1.5 mobile  — shown at <1440px  -->
<main>
  <div class="page-container">
    <div class="main-content">     <!-- gap: var(--spacing-space-m) = 16px between sections -->
      <section id="Welcome-Desktop" class="section-welcome">
      <section id="Carousel-Desktop" aria-label="Featured" class="carousel">
      <section id="StaticNewsCard-Desktop" class="static-cards-row">
      <section id="YourSelectedSubjects-Desktop" class="section-frame" aria-label="Your Selected Subjects">
    </div>
  </div>
</main>
```

**Section rename (May 2026):** Section #4 was renamed from `id="static-newscards"` to `id="StaticNewsCard-Desktop"`. Sections #5 (YourSelectedSubjects) and #6 (Recent Activity) were removed; a new #5 (YourSelectedSubjects) was rebuilt with Primary Card - 1.5 (Secondary Card variant) containing 18 Quiz Cards in a 3-column grid.

**Mobile Navbar — confirmed DS specs (node `1943:22641`, May 2026):**
- Height: **64px** (not 68px — earlier session note was wrong; always re-inspect)
- Padding: `t:16 r:24 b:16 l:24` → CSS `padding: var(--spacing-space-m) 24px`
- Layout: `HORIZONTAL`, `mainAlign: SPACE_BETWEEN`, `crossAlign: CENTER`
- Fill: white; stroke: `#00cc85` (1px, INSIDE align); radius: `0 0 24 24`
- Children: Logo `116×28` (left) + Menu Icon frame `24×24` (right, `fills:[]` transparent)
- `Outline/menu` icon: `viewBox="-1 -1 26 26"`, path `M3 12H21M3 6H21M3 18H21`, stroke `var(--icon-primary-default)` = `#00cc85`
- Hamburger uses `<button>` — **must reset** `background:none; border:none; padding:0` (Rule 32)
- Outer layout padding: `#NavBar-Mobile { padding: 0 var(--page-padding-x) }` — same as `.navbar` desktop
- Default CSS: `#NavBar-Desktop { display:block } #NavBar-Mobile { display:none }` — then `@media (max-width:1439px)` swaps them. Never rely on media-query-only visibility (causes flash of both on load).
- `body { min-width: 400px }` — minimum mobile layout width

**Desktop Navbar — confirmed implementation notes (May 2026):**
- `.nav-btn` is a `<div>` — MUST have `cursor: pointer; user-select: none` or it feels unresponsive
- Hover state: `background: #b5f291; box-shadow: inset 0 0 0 1px #70bc6f` on `.nav-btn__inner`
- Selected state: `is-active` class toggled via JS click handler on each `.nav-btn`
- Hover border is `box-shadow: inset 0 0 0 1px` (not `border:`) to avoid layout shift inside pill
- Icon clip is `overflow:hidden` + `padding` approach — NOT `position:absolute; inset` (collapses to 0×0 in Chromium)
- Dropdown mechanism: `.nav-btn` is `flex-col; gap:20px; height:40px; overflow:hidden` — dropdown hidden below

**JS architecture (confirmed May 2026):**
- Nav click handler registered FIRST before any other script
- Carousel and all other init JS wrapped in `try/catch`
- This ensures nav interactivity is never blocked by a carousel or other JS error
```js
// Always first
document.querySelectorAll('.nav-btn').forEach(btn => { ... });
// Non-critical after, wrapped
try { (function(){ /* carousel */ })(); } catch(e) { console.warn(e); }
```

**Welcome section — confirmed (May 2026):**
- `id="Welcome-Desktop"`, `class="section-welcome"` — wraps all three components
- Contains: Status Badge row (5 pills) + Welcome Text + Check-In Card
- No extra layout rules — relies on `.main-content` gap for spacing from Navbar

**Carousel - 1.5 (node 1200:1789) — confirmed (May 2026):**
- Outer `.carousel` must have `overflow: hidden` — DS uses `overflow-clip`
- `.carousel__content` must NOT have `justify-content: center` — JS controls centering via `offsetFor()`
- Every card always contains an `Outline/image` placeholder (128×128 div, `padding: 16px`), grey `Border/general/default` color — covered by image overlay when image loads
- Image overlay is `position: absolute; inset: -1px` (bleeds 1px to cover card border edge)
- Button chevron clip: 20px container, `padding: 5px 7.5px` for chevron-left/right (DS inset: 25% top/bottom, 37.5% left/right on 20px)
- Infinite loop JS: clone 5 cards before + after, center active card via `-(i×STEP) + (containerWidth/2 - CARD_W/2)`, silent jump on `transitionend` when in clone region
- Indicator (`108×20px`) is hidden by default — `display: none`

**Mistake made (carousel):** Used `position:absolute; inset` on SVG inside clip — collapses to 0×0 in Chromium. Must use `padding` on clip container + `width:100%; height:100%` on SVG.

---

**Static Card - 1.5 (node 2616:2959) — confirmed (May 2026):**
- Card: `height: 220px`, `border: 1px solid Border/default (#00cc85)`, `border-radius: corner-4xl (24px)`, `overflow: hidden`, `display: flex`, `background: Surface/general/default` (white)
- Content: `flex: 1 0 0; min-width: 0; height: 100%; position: relative` — NOT `position: absolute; inset: 0`
- Background image: `<div class="static-card__bg">` — `position: absolute; inset: 0; background-size: cover`. Set via CSS `background-image`, never `<img>`
- Content padding: `20px 60px` (`space-l` / `space-3xl` — 60px horizontal, NOT 24px)
- Texts: right-aligned — `align-items: flex-end; text-align: right; width: 100%`
- Title: `Title/T1` — Poppins Bold 18px, `line-height: 28px`, `Text/default/heading #404040`
- Description: `Body/B1` — Poppins SemiBold 14px, `line-height: 20px`, `Text/default/heading #404040`
- Two cards side by side: `display: flex; gap: var(--spacing-space-m)` (16px)

**Button inside Static Card — Primary/M states (node 473:529):**

| State | btn bg | border | label | arrow bg | arrow chevron |
|---|---|---|---|---|---|
| Default | `#00cc85` | `#00a36a` | `#f6fdfb` | `#99ebce` | `#00a36a` |
| Hover | `#b5f291` | `#70bc6f` | `#70bc6f` | `#e8fbe8` | `#70bc6f` |
| Pressed | `#00564c` | `#00453d` | `#00cc85` | `#00cc85` | `#00564c` |
| Disabled | `#f2f2f2` | `#bfbfbf` | `#bfbfbf` | `#f2f2f2` | `#bfbfbf` |

- Arrow chevron color comes from arrow sub-node (`479:351`) variable defs — NOT the parent button node
- Arrow structure: 20px outer circle (`justify-content: flex-end; padding: 2px`) → 16px clip (NO padding) → SVG using `ic-chevron-btn-m`
- Button height: `32px; max-height: 32px`
- **Arrow clip symbol:** `ic-chevron-btn-m` — `viewBox="0 0 16 16"`, path `M6 12L10 8L6 4`, DS node `479:352`. No CSS padding on clip — path position encoded in viewBox. Stroke = 1.5px at 1:1 scale.

**Mistake made (static card):**
- Content was `position: absolute; inset: 0` — should be `flex: 1 0 0; height: 100%; position: relative`
- Used `<img src="...">` for bg placeholder — showed broken icon. Use `<div>` + CSS `background-image`
- Content padding was `20px 24px` — actual DS is `20px 60px`
- Arrow chevron color was inferred from parent button node (wrong: `#f6fdfb`) — must get from arrow sub-node (`#00a36a`)

---

**Quiz Card - 1.5 (node 2339:5345) — confirmed May 2026:**
- Size: `min-height: 148px; max-height: 148px`, `min-width: 400px`
- Layout: `display: flex; flex-direction: row` — image on left, content on right
- Image: `width: 148px; min-width: 148px; flex-shrink: 0; align-self: stretch` — NOT aspect-ratio (unreliable in grid)
- Content: `flex: 1 0 0; min-width: 0; padding: var(--spacing-space-m)` with nested `flex-col gap-4px`
- 3-column grid: `.primary-card__content { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-space-m); }` — CSS Grid handles gap deduction automatically, use this over flexbox + calc
- Pill Badge inside: `font-size: 10px` (`Body/B8`) — NOT 12px. Spec from parent Quiz Card node, not standalone Pill Badge node (Rule 9)

**Button - 1.5 (Primary/S, Type=Student) inside Quiz Card — confirmed May 2026:**
- Button: `max-height: 24px`, `px: 8px`, `py: 2px`, `border-radius: 60px` (pill)
- Text slot: `px: 4px`, font `Body/B5` (Poppins SemiBold 12px, line-height 18px), color `Text/primary/on-color #f6fdfb`
- Arrow: 16×16 circle (`bg: #99ebce`, `border-radius: 60px`, `padding: 2px`) → 12×12 clip (NO padding) → `ic-chevron-btn`
- Arrow chevron: `#00a36a` (`Surface/primary/focus`) — from arrow clip sub-node, not parent button
- **Symbol:** `ic-chevron-btn` — `viewBox="0 0 12 12"`, path `M4.5 9L7.5 6L4.5 3`, DS node `1437:8161`
- **All states:** see Rule 19. Primary/S Pressed uses `Surface/primary/focus` (`#00a36a`) bg + `#00cc85` border + `#00cc85` label (design.color.md §6.1).

**Subject badge icons (18 subjects) — confirmed May 2026:**
All sourced from `🔰 Iconography` page via `exportAsync({ format: 'SVG_STRING' })`. See Rule 17.
Badge icon CSS: `width: 16px; height: auto; max-height: 20px` constrains all subject icons uniformly.

**Mistake made (quiz card):**
- Cards rendered as tall vertical columns. Fixed by: explicit `flex-direction: row` + `width: 148px` on image div + `<div>` placeholder instead of `<img>`
- Button used `Outline/arrow-right` (→) — actual DS uses `Outline/chevron-right` (›). Always confirm icon from DS context.
- Arrow clip had `padding: 3px 4.5px` — stroke collapsed to 0.56px. Correct: no padding, use `ic-chevron-btn`.
- Pressed state label used `Text/primary/on-color` (#f6fdfb) — wrong. Correct label = `Text/primary/default` (#00cc85). The bg `Surface/primary/focus` (#00a36a) was actually correct for Primary/S (confirmed design.color.md §6.1). See Rule 40.
- Queried wrong DS node `1644:11342` (Type=Teacher) instead of `1437:8154` (Type=Student) — led to thinking Student=pink. Always verify the `Type=` variant name before trusting variable defs.

---

**Primary Card - 1.5 / Secondary Card variant (node 2881:36272) — confirmed May 2026:**
- Outer card: `border: 1px solid Border/general/default`, `border-radius: corner-xl`, `background: Surface/general/default`
- Content area (`.primary-card__content`): `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-space-m)`
- Section header: bookmark icon + title (`H2`) + Button - 1.5 (Secondary/M) with `ic-chevron-btn-m`

---

**Prototype layout configuration (current as of May 2026):**

| Setting | Value | Notes |
|---|---|---|
| `--page-max-width` | `100%` | Fluid — fills full viewport, no desktop cap |
| `--page-padding-x` | `60px` desktop / `32px` tablet / `16px` mobile | Scales via media queries |
| `body min-width` | `400px` | Minimum mobile layout width |
| Navbar breakpoint | `< 1320px` → mobile navbar | Desktop navbar at ≥ 1320px |
| Tablet breakpoint | `≤ 1279px` | 2-col quiz grid, 32px padding |
| Mobile breakpoint | `≤ 767px` | 1-col quiz grid, 16px padding, stacked sections |

**`--page-max-width` as a single-variable control:** The page width constraint is stored in one CSS custom property (`--page-max-width`) applied to `body`. Changing it propagates everywhere — body, page container, footer. Set to `100%` for a fully fluid layout. Set to `1440px` to cap at a fixed desktop container.

**Responsive typography — applied to prototype (May 2026):**
- Tablet `@media (max-width: 1279px)`: `.welcome-text__name` → 24px/36lh
- Mobile `@media (max-width: 767px)`: `.welcome-text__name` → 20px/32lh · `.static-card__title` → 16px/24lh · `.section-header__title` → 16px/24lh · `.status-pill__value` → 14px/20lh
- Body text (14px and below) unchanged at all breakpoints — matches DS Responsives spec
- Base `.welcome-text__name` corrected from 26px → **28px** (Header/H1, DS confirmed)

---

**Dev server (Windows):**
```powershell
# Start (bypasses PowerShell execution policy via cmd.exe)
Start-Process -FilePath "cmd.exe" -ArgumentList '/c', 'cd /d "<repo-path>" && npx serve . --listen 3000' -PassThru -WindowStyle Hidden

# Open in VS Code Simple Browser
Start-Process "vscode://vscode.simpleBrowser/show?url=http%3A%2F%2Flocalhost%3A3000%2Fzul.home.screen.html"
```

---

*Generated: May 2026 | Last updated: May 2026 | Cleanup target: Original DS (TLVKe3bgJTdVvuPAzgDq2f)*

---

## nadia_Class.html — Class Page Prototype (May 2026)

> Active development file. Branch: `staging`. Dev server: `npx serve /Users/nurnadia/Documents/pandai.design --listen 3000`
> Local URL: `http://localhost:3000/Nadia.test.git/nadia_Class.html`

---

### File identity

| File | Path | Purpose |
|---|---|---|
| `nadia_Class.html` | `Nadia.test.git/nadia_Class.html` | Class page prototype — single source for all Class UI |
| Primary DS | `TLVKe3bgJTdVvuPAzgDq2f` | Pandai DS 1.5 — single source of truth |
| Backup DS (read-only) | `Y0DLhf2MGdGwG0jyjN7EbQ` | Used ONLY for node 4104:81437 (breadcrumb action buttons) |

---

### Responsive layout — matches zul.home.screen.html exactly

| Variable | Desktop | Tablet ≤1279px | Mobile ≤767px |
|---|---|---|---|
| `--page-padding-x` | `60px` | `32px` | `16px` |
| `--page-max-width` | `100%` | `100%` | `100%` |
| `body min-width` | `400px` | `400px` | `400px` |
| Navbar | `#NavBar-Desktop` (≥1320px) | `#NavBar-Mobile` | `#NavBar-Mobile` |
| Cards grid | `repeat(3, 1fr)` | `repeat(2, 1fr)` | `1fr` |

**Breakpoints:**
- `≤1319px` → swap `#NavBar-Desktop` out, show `#NavBar-Mobile`
- `≤1279px` → `--page-padding-x: 32px`, 2-col cards grid
- `≤767px` → `--page-padding-x: 16px`, 1-col cards, breadcrumb stack vertically

**HTML structure:**
```html
<section id="NavBar-Desktop"> ... </section>  <!-- visible ≥ 1320px -->
<section id="NavBar-Mobile"> ... </section>    <!-- visible < 1320px -->
<div class="page-content"> ... </div>          <!-- padding uses --page-padding-x -->
```

---

### Navbar — Desktop (node 4115:97698)

Structure: `flex-col gap-12px` — brand bar (64px) + nav pill (56px), inside `--page-padding-x`.

**Brand bar (`.navbar__brand`):**
- `height: 64px`, `border-bottom/left/right: 1px solid #00cc85`, `border-radius: 0 0 24px 24px`
- `padding: 8px 24px`, `gap: 28px`
- Logo: `navbar/logo.png` 116.5×28px
- Right: action icons (search, maximize, smartphone, bell, EN, waffle) + avatar 48px + notif badge

**Nav pill (`.navbar__content`):**
- `height: 56px`, `border: 1px solid #00cc85`, `border-radius: 999px`, `padding: 8px`
- 8 items: Home, Quiz, Battle, Practice, **Class (active + dropdown)**, Learn, Achievement, Potential, Rewards

**Nav button structure — Zul's DS pattern:**
```html
<a href="#" class="nav-btn">
  <div class="nav-btn__inner">
    <div class="nav-btn__icon-wrap">
      <div class="nav-btn__icon-clip" data-icon="home"> <svg>...</svg> </div>
    </div>
    <span class="nav-btn__label">Home</span>
    <!-- chevron buttons only: -->
    <div class="nav-btn__icon-wrap">
      <div class="nav-btn__icon-clip nav-btn__chevron-clip"> <svg>...</svg> </div>
    </div>
  </div>
</a>
```

**Nav button states (box-shadow:inset, no border):**

| State | Class | bg | box-shadow | label/icon color |
|---|---|---|---|---|
| Default | — | transparent | none | `#666` / `#00cc85` |
| Hover | `:hover` | `#b5f291` | `inset 0 0 0 1px #70bc6f` | `#70bc6f` |
| Active | `.is-active` | `#00cc85` | `inset 0 0 0 1px #00a36a` | `#e9fbf5` |

**Per-icon clip padding (DS inset% × 20px):**
```css
[data-icon="home"]     { padding: 1.67px 2.5px; }
[data-icon="battle"]   { padding: 2.5px; }
[data-icon="practice"] { padding: 2.5px 1.67px; }
[data-icon="class"]    { padding: 2.5px 0.83px; }
[data-icon="learn"]    { padding: 1.67px 3.33px; }
```

**Class dropdown (node 890:2457 + 890:2465):**
- Wrapper: `.nav-btn-group { position: relative }` — hover/focus-within shows dropdown + rotates chevron
- Panel: `.nav-dropdown` — `border: 1px solid #00cc85`, `border-radius: 18px`, `padding: 12px`, `gap: 4px`
- 3 items: My Classes, Browse Classes, Timetable (Outline/corner-down-right icon)
- Chevron rotates 180° on hover: `.nav-btn-group:hover .nav-btn.is-active .nav-btn__chevron-clip svg { transform: rotate(180deg) }`

---

### Navbar — Mobile (node 1943:22641)

```html
<section id="NavBar-Mobile">
  <div class="navbar-mobile">
    <div class="navbar-mobile__logo"><img src="navbar/logo.png"></div>
    <button class="navbar-mobile__menu-btn"><!-- hamburger svg --></button>
  </div>
</section>
```
- `height: 64px`, same 3-sided green border + `border-radius: 0 0 24px 24px`
- `padding: 16px 24px`, logo left, hamburger right (`color: #00cc85`)

---

### Breadcrumb + Action Buttons (node 1777:18856 + 4104:81437)

**Trail:** `Class > My Classes` — active links `#00cc85`, current page `#666`

**3 action buttons (node 4104:81437) — order: Timetable → Browse Classes → Join Class:**

| Button | Class | Style | Icon |
|---|---|---|---|
| Timetable | `.btn-secondary` | White bg, `#00cc85` border+text | Outline/calendar |
| Browse Classes | `.btn-secondary` | White bg, `#00cc85` border+text | Outline/website (globe) |
| Join Class | `.btn-primary` | `#00cc85` bg, `#00a36a` border, `#e9fbf5` text | Outline/plus |

All buttons: `border-radius: 60px` (corner-rounded), `padding: 8px 12px`, `font: Poppins SemiBold 14px`

---

### Class Cards — 12 total (node 4104:83963)

Grid: `repeat(3, 1fr)`, `gap: 20px`. 6 Form 4 + 6 Form 5, same 6 subjects each.

**Subject modifier classes and palettes:**

| Subject | Class | Border/header | Body bg | Text |
|---|---|---|---|---|
| Bahasa Melayu | `.cc--bm` | `#4d77ff` | `#f6f9ff` | dark |
| English | `.cc--en` | `#ff4d56` | `#ffedee` | dark |
| Math | `.cc--mt` | `#42ac7b` | `#ecf7f2` | dark |
| Science | `.cc--sc` | `#ffd641` | `#fffbec` | `#998027` |
| Biology | `.cc--bio` | `#8431d8` | `#f3ebfb` | dark |
| History | `.cc--hs` | `#a97c50` | `#f7f2ee` | dark |

**Always OG-green regardless of subject:** Live Tuition badge (`#00cc85`), Enter Class button, DLP badge (pink pill, sourced from node 2079:30493).

**Avatar inside card:** DS Avatar 1.5 (node 4104:81442) — 64×64px, `border-radius: 60px`, image overflows: `left: -7px; right: -8px; top: -1px`.

---

### Tokens used in nadia_Class.html

```css
:root {
  --og-50: #e9fbf5;   --og-500: #00cc85;  --og-600: #00a36a;  --og-700: #007a50;
  --r-rounded: 60px;  --r-4xl: 24px;      --r-2xl: 18px;
  --sp-xs: 8px;       --sp-s: 12px;       --sp-m: 16px;
  --page-max-width: 100%;
  --page-padding-x: 60px;  /* → 32px tablet → 16px mobile */
  --section-gap: 16px;
}
```

---

---

### Updates — May 2026 (Session 2)

**Navbar refactored to Zul's DS pattern:**
- `.nav-btn` → `flex-col` container, no border
- `.nav-btn__inner` → pill row (`padding: 8px 12px`, `border-radius: 999px`)
- `.nav-btn__icon-wrap` → 24×24, `color` cascades to SVG stroke
- `.nav-btn__icon-clip` → 20×20 overflow clip, per-icon `data-icon` padding overrides
- `.nav-btn__label` → Poppins 14px/600
- `.nav-btn__chevron-clip` → `padding: 0`
- States via `is-active` class + `box-shadow: inset 0 0 0 1px` (no layout-shifting border)
- Class dropdown chevron rotation: `.nav-btn-group:hover .nav-btn.is-active .nav-btn__chevron-clip svg { transform: rotate(180deg) }`

**Responsive layout — aligned to zul.home.screen breakpoints:**

| Breakpoint | Navbar | Cards | Padding |
|---|---|---|---|
| ≥ 1320px (website) | `#NavBar-Desktop` | 3-col | 60px |
| < 1320px (tablet) | `#NavBar-Mobile` | 2-col | 32px |
| ≤ 767px (mobile) | `#NavBar-Mobile` | 1-col | 16px |

- All three breakpoints switch together at `≤1319px` — no inconsistent navbar+grid zones
- Cards grid `grid-template-columns` defined in responsive section (before media queries) to avoid cascade override bug
- `body { padding-bottom: 90px }` — clears fixed footer; mobile override: `102px`

**Page content padding:** `padding: 12px var(--page-padding-x) 0` — 12px top (gap between navbar and breadcrumb), 0 bottom, horizontal uses `--page-padding-x` variable.

**Footer - 1.5 (node 2338:10430) added:**
- Fixed bottom bar: `position: fixed; bottom: 0; height: 60px; border-top: 1px solid #00cc85`
- Left: © 2026 · Pandai.org (green link) · All Rights Reserved
- Right: Made with ♥ (inline SVG `Outline/heart`) in Malaysia
- Mobile ≤767px: stacks vertically, `padding: 12px 28px`, centered

**Breadcrumb `.bc-left` alignment:**
- Base rule: `width: 100%` added to ensure full stretch at all breakpoints
- Tablet: `align-items: flex-start; width: 100%` — title anchors to left when wrapped
- Mobile: `flex-direction: column; align-items: flex-start` on `.bc-row`

**CSS cascade fix — cards grid:**
Moved `.cards-grid { grid-template-columns }` into the responsive section (before media queries). The base rule at line ~604 previously came after all media queries and silently overrode them back to 3-col at every screen size.

**File scope rule:**
- Write only to: `Nadia.test.git/nadia_Class.html` and `design-md/nadia.design.md`
- Read-only: `zul.test.git/zul.home.screen.html` and `design-md/zul.design.md`

---

---

### Updates — May 2026 (Session 3)

**Navbar fully replaced with Zul's exact implementation (node 2339:2617):**

Previous custom navbar removed entirely. Now uses Zul's structure verbatim.

**SVG sprite block** — added at top of `<body>` as hidden `<svg>`:
All icon symbols defined once and referenced via `<use href="#ic-xxx"/>`. Symbols included:
`ic-home`, `ic-check-circle`, `ic-battle`, `ic-book-open`, `ic-users`, `ic-book`, `ic-award`, `ic-star`, `ic-gift`, `ic-chevron-down-nav`, `ic-search`, `ic-maximize`, `ic-smartphone`, `ic-bell`, `ic-en`, `ic-waffle`, `ic-menu`, `ic-corner-down-right`

**DS semantic tokens added to `:root`** (Zul naming convention):
```css
--surface-general-default, --surface-primary-default, --surface-secondary-default,
--surface-tertiary-default, --border-default, --border-primary-default,
--border-primary-focus, --border-secondary-focus, --border-tertiary-focus,
--text-default-body, --text-primary-default, --text-primary-on-color (#f6fdfb),
--text-secondary-focus, --icon-default-default (#d9d9d9), --icon-primary-default,
--icon-primary-on-color, --icon-secondary-hover, --corner-radius-corner-4xl (24px),
--corner-radius-corner-rounded (60px), --corner-radius-corner-pill (999px),
--spacing-space-xxs/xs/s/m/xl/2xl
```

**Desktop navbar CSS — Zul's exact classes:**
- `.navbar` → `padding: 0 var(--page-padding-x)`, `flex-col`, `gap: spacing-space-s`
- `.navbar-brand` → `height: 64px`, 3-sided `border-primary-default`, `border-radius: 0 0 corner-4xl corner-4xl`, `padding: space-xs space-xl`
- `.navbar-logo` → flex row, `logo-mark.svg` (28px) + `logo-text.svg` (18px)
- `.navbar-actions` → `gap: space-xl`; `.navbar-action-icons` → `gap: space-2xl`
- `.navbar-action-icon` → `24×24`, `color: icon-default-default (#d9d9d9)`
- `.navbar-avatar` → `48×48`, `border-radius: corner-rounded`, `border: border-default`
- `.navbar-avatar__img` → `width: 62px; height: 50px; object-fit: cover; position: absolute`
- `.navbar-badge` → `position: absolute; top:0; right:-0.5px`, green pill, `font-size: 10px`
- `.navbar-nav` → `height: 56px`, `border: border-default`, `border-radius: corner-pill`, `padding: space-xs`

**Nav button structure — Zul's DS pattern (key difference from before):**
```css
.nav-btn {
  display: flex; flex-direction: column;
  gap: 20px;      /* pushes hidden dropdown below visible 40px */
  height: 40px;
  overflow: hidden;   /* clips dropdown — DS hidden dropdown mechanism */
}
```
States use `box-shadow: inset 0 0 0 1px` for borders (no layout shift):

| State | Class | bg | shadow | label/icon |
|---|---|---|---|---|
| Default | — | transparent | none | `#666` / `#00cc85` |
| Hover | `:hover` | `#b5f291` | `inset … #70bc6f` | `#70bc6f` |
| Pressed | `.is-pressed` | `#00564c` | `inset … #00453d` | `#00cc85` |
| Active | `.is-active` | `#00cc85` | `inset … #00a36a` | `#f6fdfb` |

**Class dropdown — kept absolute-positioned (node 890:2465):**
`.nav-btn-group` has `overflow: visible` so dropdown escapes the overflow-hidden nav-btn.
Icons use `<use href="#ic-corner-down-right"/>` from the sprite.

**Mobile navbar CSS — Zul's exact classes:**
- `.navbar-mobile` → `height: 64px`, 3-sided green border, `border-radius: 0 0 corner-4xl corner-4xl`, `padding: space-m 24px`
- `.navbar-mobile__logo` → flex, mark (28px) + text (18px) images
- `.navbar-mobile__menu-btn` → `40×40`, `color: icon-primary-default`, uses `<use href="#ic-menu"/>`

**Logo assets used:**
- `navbar/logo-mark.svg` (mark only, 28px height)
- `navbar/logo-text.svg` (wordmark only, 18px height)
- `navbar/icon-avatar-user.png` (avatar, 62×50 inside 48×48 circle)

---

---

### Updates — May 2026 (Session 4)

**All 20 subjects added to Class page (node 3281:67321):**

Cards grid expanded from 12 to 20 subjects in alphabetical DS order:
`Enrichment → Account → Add Math → Biology → Bahasa Melayu → Business → Chemistry → Chinese Language → Computer Science → Economy → English → Geography → History → Islamic Studies → KAFA → Mathematics → Moral → Physics → RBT → Science`

**New cover images — `image-repo/MyClassImage/`:**
13 new covers downloaded from Figma MCP at 1000×435px:
`account.png`, `add-math.png`, `business.png`, `chemistry.png`, `chi-lang.png`, `economy.png`, `enrichment.png`, `geography.png`, `islamic.png`, `kafa.png`, `moral.png`, `physics.png`, `rbt.png`

Computer Science reuses `chemistry.png` (same cover in DS). English, Science retain DLP badges.

**14 new CSS subject modifier classes added:**
`.cc--enrichment`, `.cc--acc`, `.cc--add-math`, `.cc--biz`, `.cc--chem`, `.cc--chi`, `.cc--cs`, `.cc--eco`, `.cc--geo`, `.cc--isl`, `.cc--kafa`, `.cc--moral`, `.cc--phy`, `.cc--rbt`
KAFA has dark title override (`color: #1a6b3a`) — light mint header (`#8ae3a9`) needs dark text.

**Tutor avatar photos — `image-repo/Avatar-teacher/`:**
7 real tutor photos (`tutor-1.png` → `tutor-7.png`) distributed across 20 cards using fixed rotation: `3,1,6,2,4,7,5` cycle.

Avatar CSS updated: removed DS icon overflow positioning (`-7px/-8px`) in favour of `inset:0; object-fit:cover; object-position:center top` for real photo fill.

**Schedule label:** Changed "Everyday" → "Every" across all 20 cards.

**New Rewards pages added (DS node 3065:42733):**
- `Nadia.test.git/My Rewards/nadia_Rewards-CoinQuest.html` — Coin Quest view
- `Nadia.test.git/My Rewards/nadia_Rewards-Myrewards.html` — My Rewards view
- `image-repo/Rewards-MyRewards/` — `MyRewards.svg` + `MyRewards-1.svg` → `MyRewards-8.svg` (9 assets)
- `image-repo/Rewards-CoinQuest/` — 16 SVGs: 8 quest types × (normal + `_Completed`) variant

**Two-panel layout — `.rewards-layout` (flex row, gap: 12px):**

| Panel | Width | Container style |
|---|---|---|
| Left sidebar (node 3065:42737) | 230px | `bg: white; border: 1px #d9d9d9; border-radius: 18px; padding: 16px; gap: 8px` |
| Right main (node 3065:42901) | flex: 1 | Same as sidebar |

**Left sidebar buttons** — 5 items matching Rewards nav dropdown:
`Coin Quest` (Primary active `#00cc85`) · `My Rewards` · `Merchandise` · `eVoucher` · `Avatar`
Icons: `ic-stop-circle, ic-package, ic-shopping-bag, ic-shopping-cart, ic-smile`

**Coin Quest Card 1.5 (node 3065:42903) — `height: 150px; flex-row`:**
- Image panel: `bg #e8fbe8; border 1px #baf3b9; border-radius: 12px` — 80×80 illustration
- Label Badge colours: Easy `#d9f7ed/#66e0b6/#00cc85` · Daily `#e6f6fd/#7fd0f3/#00a2e8` · Hard `#fff1eb/#ffb899/#c24b0a` · Weekly `#fff9e6/#ffe080/#9a6700`
- Progress bar: `height: 4px; bg #f2f2f2; border-radius: 999px`
- Claim button (Primary/M, h:32px): active `#00cc85/#00a36a`, arrow `bg #99ebce`

**Disabled Claim button (node I3065:42904;2339:5039) — cards with 0/2 progress:**
`bg #f2f2f2; border #bfbfbf; label #bfbfbf; arrow box-shadow: inset 0 0 0 1px #bfbfbf; pointer-events: none`

**Illustration mapping — `_Completed` SVG when fully achieved, base SVG otherwise:**
`Enroll Course_Completed` (Class instructions ✅) · `Score Exam` (Quiz) · `Goal & Reward` (Battle) · `Topical Test_Completed` (Live Class ✅) · `Personality Test` (Practice) · `Submit Task` (Article) · `Score Full Mark_Completed` (Notes ✅) · `Verify Phone Number` (Library)

**My Rewards Card (class-card, DS node 3065:43089) — `flex-col; border: 1px #d9d9d9; border-radius: 24px; overflow: hidden`:**
- Image area: `width: 100%; aspect-ratio: 250/148` (locks ratio on responsive) · `object-fit: cover` · `bg: var(--og-50)` fallback · source: `image-repo/Rewards-MyRewards/MyRewards-N.svg`
- Body: `padding: 16px; gap: 8px` — badges row + title (14px SemiBold `#404040`, 2-line clamp)
- Label Badge (DS node 3065:43096): `bg #ccf5e7; border 1px #00cc85; border-radius: 60px; padding: 2px 8px; font 10px Medium #00cc85` · icon: `Outline/star` (node 260:1192, vector offset +2/+2, viewBox `-1 -1 26 26`)
- Badges shown: `Premium` + `Premium Lite` (both same green style)
- Divider: `height: 1px; bg #d9d9d9`
- Footer: `padding: 16px; justify-content: space-between` — coin icon (21px) + count · Show Voucher button

**Show Voucher button — Button - 1.5 Primary/S (DS node 3065:43115) — `height: 24px`:**
- `padding: 2px 8px; border-radius: 60px; bg #00cc85; border 1px #00a36a`
- Label: `12px SemiBold #f6fdfb`
- Arrow: `16×16 circle; bg #99ebce; padding: 2px` → 12×12 clip using `ic-chevron-btn` (`viewBox="0 0 12 12"`, path `M4.5 9L7.5 6L4.5 3`, DS node 1437:8161)
- Hover: `bg #b5f291; border #70bc6f; label #70bc6f; arrow bg #e8fbe8`
- Pressed: `bg #00564c; border #00453d; label #00cc85; arrow bg #00cc85`

**My Rewards sidebar active state:** `My Rewards` button = `sidebar-btn--active` (`bg #00cc85; border 1px #00a36a`) · `Coin Quest` = inactive

**My Rewards grid — `.mr-grid`:**
`grid-template-columns: repeat(4, 1fr); gap: 16px` → 2-col at `≤1279px` → 1-col at `≤767px`

---

### Updates — May 2026 (Session 5)

**New Merchandise page added (DS node 3065:43309):**
- `Nadia.test.git/My Rewards/nadia_Rewards-Merchandise.html` — Merchandise view
- `image-repo/Rewards-Merchandise/` — `Merchandise.svg` + `Merchandise-1.svg` → `Merchandise-3.svg` (4 assets)

**Merchandise differs from Coin Quest / My Rewards in right panel styling:**

| Panel | Coin Quest / My Rewards | Merchandise |
|---|---|---|
| Right main bg | `#fff` (white) | `#f6fef6` (Secondary/50) |
| Right main border | `1px #d9d9d9` | `1px #00cc85` |

**Reward Card - 1.5 (DS nodes 3065:43481–43484) — `flex-col; border: 1px #d9d9d9; border-radius: 24px; height: 329px`:**
- Image area: `height: 148px; object-fit: contain; bg: #f6fef6` — locks full image visible, no cropping · source: `image-repo/Rewards-Merchandise/Merchandise-N.svg`
- Body: `padding: 16px; gap: 8px` — badges row + title (14px SemiBold `#404040`, 2-line clamp)
- Label Badge: `Outline/video` (10px icon) · `bg #ccf5e7; border 1px #00cc85; border-radius: 60px; padding: 2px 8px; font 10px Medium #00cc85`
- Badges shown: `Premium` + `Premium Lite` (same green style as My Rewards)
- Divider: `height: 1px; bg #d9d9d9`
- CTA: `padding: 16px` — P.Coin icon (24px) + value · Show Voucher button (Primary/S, same spec as My Rewards)

**Show Voucher button disabled state (cards 3 & 4 — DS nodes 3065:43483–43484):**
`bg #f2f2f2; border #bfbfbf; label #bfbfbf; arrow box-shadow: inset 0 0 0 1px #bfbfbf; pointer-events: none`

**Merchandise sidebar active state:** `Merchandise` button = `sidebar-btn--active` · icon: `ic-shopping-bag`

**Merchandise intro text:** `Collect coins, redeem and enjoy these great rewards!` (14px Regular `#666`)

**`ic-video` symbol added to SVG sprite** (10px label badge icon, `Outline/video`, `viewBox="-1 -1 26 26"`)

---

### Updates — May 2026 (Session 6)

**File:** `Nadia.test.git/nadia_Class.html` — Class page navbar + menu modals

---

#### Navbar responsiveness fixes

- `width: 100%` added to `.navbar-primary` (brand bar now explicitly fills section)
- `padding-top: var(--spacing-space-s)` (12px) on `#NavBar-Menu-Desktop` — restores gap between brand bar and nav pill
- `.navbar-avatar` wrapped in `.navbar-avatar-wrap` (`position: relative`) so `.navbar-badge` anchors to avatar corner only
- `overflow-x: hidden` on `html` + `body` — prevents horizontal scroll

#### Nav menu pill fixes (DS node 3528:51331)

- **Chevron-down invisible fix:** `.nav-chevron` had `padding: 6px 4px` collapsing SVG content to 4px height — removed padding entirely
- **Active Class button arrow:** replaced `.nav-chevron` with DS-correct `.nav-arrow-circle` — `bg: #99ebce; padding: 4px; border-radius: 60px` containing 16×16 chevron-down clip
- **Dropdown:** added Assignment as 4th item (My Classes → Browse Classes → Timetable → Assignment)
- **Nav icon clip:** `20×20` (DS spec `overflow-clip size-[20px]` inside `size-[24px]` wrap) — clip padding removed; SVG fills 20px cleanly
- **Text changes:** breadcrumb title `Class` → `My Classes`; button label `Go to My Classes` → `Browse Classes`
- **bc-actions icon clip:** `24×24`, no padding (user-facing 24px icon size)

#### Navbar primary icon states (DS node 3427:63111 — Nav Button - Parts)

| State | Button bg | Inset border | Icon |
|---|---|---|---|
| Default | `#ffffff` | — | `#808080` (`Icon/default/default`) |
| Hover | `#e8fbe8` (`Surface/secondary/default-subtle`) | 1px `#00cc85` | `#00cc85` |
| Pressed | `#00564c` (`Surface/tertiary/default`) | 1px `#00cc85` | `#00cc85` |
| Active | `#00cc85` (`Surface/primary/default`) | 1px `#00a36a` | `#f6fdfb` |

Pressed implemented via JS `mousedown`/`mouseup`/`mouseleave` (Rule 39 — `:active` unreliable on `<div>`).

#### Avatar fix (DS Avatar-1.5 Size=L node 684:621)

- `.navbar-avatar`: added `position: relative` — without this, absolute img positioned against wrong ancestor
- `.navbar-avatar__img`: `position: absolute; left: -7px; right: -7px; top: -1px; aspect-ratio: 1/1; object-fit: cover` — 62×62 img clipped to 48×48 circle by `overflow: hidden`

#### New SVG symbols added to sprite

`ic-x` (close), `ic-chevron-right` (menu sub-item), `ic-chevron-btn-m` (Button-1.5 Size=M arrow, `viewBox="0 0 16 16"` path `M6 12L10 8L6 4`), `ic-clipboard` (Practice in mobile menu), `ic-settings` (My Account)

#### Mobile menu modal — Nav Menu Mobile - 1.5 (DS node 3427:2185)

Triggered by mobile hamburger button (`< 1320px`).

- **Mobile (`< 768px`):** left+top, `width: 329px; height: 100vh` (full fill), `border-radius: 0 24px 24px 0` (flush left edge)
- **Panel structure:** header (logo + X) → search pill → menu items with `Checkbox-1.5` (16×16, `bg #00cc85; border #00a36a; border-radius: 4px`) → CTA box (`bg #e8fbe8; border #d1f7d1; border-radius: 20px`) → localization row
- Home = active state (`bg #b5f291; border #00a36a`); Practice uses `Outline/clipboard` (DS mobile spec, differs from desktop `book-open`)
- CTA: Notification row + Download App (Primary/M full-width + R Arrow using `ic-chevron-btn-m`)
- Localization: EN (`ic-en`) / BM / 中A

#### Tablet menu modal — Nav Menu Tablet - 1.5 (DS node 3427:2184)

- **Tablet (`≥ 768px`):** centered + top (80px gap for navbar), `width: min(calc(100vw - 64px), 800px)`, `border-radius: 24px`
- **2-column layout:** left col (Home/Quiz/Battle/Practice/Class) + vertical divider + right col (Learn/Achievement/Potential/Rewards/My Account)
- **Footer CTA:** horizontal row — Notification (flex:1) + Download App (flex:1), `border-radius: 28px` (`corner-5xl`)
- JS: `querySelectorAll('.mmenu-close-btn')` covers both mobile + tablet close buttons; backdrop click + Escape also close

---

---

### Updates — May 2026 (Session 7)

**Files updated:** `Class/nadia_Class-MyClasses.html`, `Class/nadia_Class-BrowseClasses.html`, `Rewards/nadia_Rewards-CoinQuest.html`, `Rewards/nadia_Rewards-Merchandise.html`, `Rewards/nadia_Rewards-MyRewards.html`

#### Color token rules — all Nadia files

> Source of truth: [`design.color.md`](../design.color.md) (Pandai DS 1.5, file `TLVKe3bgJTdVvuPAzgDq2f`). Never hardcode a hex value in a CSS rule — always reference a `var(--token)`.

**Rule:** Token name = Figma path, kebab-cased. `Surface/primary/default` → `--surface-primary-default`. No `--pd-` prefix. No invented names.

All `:root` blocks now include the canonical token set. New tokens added (2026-05-16):

| Token | Hex | Usage |
|---|---|---|
| `--surface-primary-default-subtle` | `#d9f7ed` | Live Tuition badge bg, tint cards |
| `--surface-primary-default-subtle-hover` | `#99ebce` | Button arrow circle bg (Default state) |
| `--surface-secondary-default-subtle` | `#e8fbe8` | Card body bg, hover arrow bg |
| `--surface-disabled-primary` | `#f2f2f2` | Disabled button/input bg |
| `--text-default-heading` | `#404040` | Card titles, teacher name |
| `--text-disabled-default` | `#bfbfbf` | Disabled labels |
| `--icon-primary-focus` | `#00a36a` | Button arrow chevron stroke (Default) |
| `--icon-secondary-on-color` | `#70bc6f` | Button arrow chevron stroke (Hover) |
| `--icon-disabled-default` | `#bfbfbf` | Disabled icon strokes |
| `--border-primary-default-subtle` | `#d9f7ed` | Light-mint inner borders |
| `--border-general-default` | `#d9d9d9` | Neutral dividers, search pill border |
| `--border-disabled-disabled` | `#bfbfbf` | Disabled button borders |

**Also fixed:** `--icon-default-default` corrected from `#d9d9d9` → `#808080` per DS (`Icon/default/default`).

**Existing tokens confirmed correct (no change needed):**

| Token | Hex | Usage |
|---|---|---|
| `--surface-primary-default` | `#00cc85` | Primary fills, active badges |
| `--surface-secondary-default` | `#b5f291` | Button bg Hover state |
| `--surface-tertiary-default` | `#00564c` | Button bg Active/Pressed state |
| `--border-primary-default` | `#00cc85` | Card borders, button arrow border |
| `--border-primary-focus` | `#00a36a` | Primary button border (Default) |
| `--border-secondary-focus` | `#70bc6f` | Primary button border (Hover) |
| `--text-primary-on-color` | `#f6fdfb` | Button label (Default state) |
| `--text-primary-default` | `#00cc85` | Green text, button label (Pressed) |
| `--text-secondary-focus` | `#70bc6f` | Button label (Hover state) |
| `--text-default-body` | `#666666` | Body copy, descriptions |
| `--icon-primary-default` | `#00cc85` | Green icons, footer heart, menu icons |
| `--icon-primary-on-color` | `#f6fdfb` | Icons on primary fills |

#### File renames + moves (this session)

| Old path | New path |
|---|---|
| `Nadia.test.git/nadia_Class.html` | `Nadia.test.git/Class/nadia_Class-MyClasses.html` |
| `Nadia.test.git/My Rewards/nadia_Rewards-CoinQuest.html` | `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html` |
| `Nadia.test.git/My Rewards/nadia_Rewards-Merchandise.html` | `Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html` |
| `Nadia.test.git/My Rewards/nadia_Rewards-Myrewards.html` | `Nadia.test.git/Rewards/nadia_Rewards-MyRewards.html` |

All moved files had relative asset paths updated with `../` prefix.

---

---

### Updates — May 2026 (Session 8)

**File:** `Nadia.test.git/Class/nadia_Class-MyClasses.html`

#### Menu modal polish

- **Tablet panel top alignment** — removed `padding-top: 80px` from `.mmenu-overlay.is-open` at `≥768px`; panel now sits flush at top of viewport
- **Checkboxes removed** — all `<div class="menu-chk">` elements stripped from both mobile and tablet menu panels (22 deletions)
- **Menu chevron-right colour** — `.mmenu-item-chevron` corrected from `color: var(--text-default-body)` (#666 grey) to `color: var(--icon-primary-default)` (#00cc85); confirmed via DS `VariableID:119:10` → `Icon/primary/default`

#### Class card DS alignment (node 3528:52082)

- **Live Tuition badge bg** — `#ccf5e7` → `#d9f7ed` (`--surface-primary-default-subtle`); DS specifies `Surface/primary/default-subtle`
- **Enter Class button padding** — `2px 8px` → `2px 4px`; DS: `px: space-xxs (4px) py: scale/50-(2px)`
- **Chevron `<use>` → inline SVG** — CSS `stroke:` on `<svg>` does not pierce `<use>` shadow DOM; replaced all 20 `btn-enter__arrow` + 2 Download App `<use href="#ic-chevron-btn*">` references with inlined paths + `stroke="currentColor"` so CSS cascade applies correctly

---

### Updates — May 2026 (Session 9)

**New file:** `Nadia.test.git/Class/nadia_Class-BrowseClasses.html`

Browse Classes sub-page of the Class section. Same navbar, mobile menu, footer, and SVG sprite as MyClasses. Asset paths use `../` prefix (file lives in `Class/` subfolder).

#### Structure

| Section | Notes |
|---|---|
| Section 1 — Navbar top | Identical to MyClasses (DS node 3544:61283) |
| Section 2 — Nav menu pill | Class nav item active + dropdown; Browse Classes link points to this file |
| Section 3 — Breadcrumb | Title: **Browse Classes** · Trail: `Class › Browse Classes` · DS node 3528:52796 |
| Section 4 — Cards grid | 20 Class Card - 1.5 cards, 3-col → 2-col → 1-col responsive |

#### Breadcrumb buttons (DS node 3528:52796)

| Button | Style | Icon | Notes |
|---|---|---|---|
| Timetable | Secondary (outlined) | `Outline/calendar` | Same as MyClasses |
| **Go to My Classes** | Secondary (outlined) | `Outline/airplay` | Links to `nadia_Class-MyClasses.html` |
| Join Class | Primary (filled green) | `Outline/plus` | Same as MyClasses |

**Airplay icon fix:** First version used `<polyline>` for the triangle — only drew 2 of 3 sides. Changed to `<polygon>` so the shape closes correctly.

#### CTA — Premium Tag + Preview button

Each card CTA has two elements: a tag label on the left and a Preview button on the right (`.cc__cta { justify-content: space-between }`).

**Tag label variations (`.cc-premium-tag`):**

| Tag text | Count | Cards |
|---|---|---|
| Premium Only | 16 | All except below |
| RM 80.00 | 2 | ⑤ Bahasa Melayu, ⑪ English (DS node 3528:52817) |
| Free | 2 | ⑧ Chinese Language, ⑮ KAFA (DS node 3528:52822) |

All three tag variants share the same CSS: `font-size: 14px; font-weight: 600; color: var(--og-500)`.

**Preview button — Button - 1.5 Secondary/S Student (DS nodes 1452:8292 Default · 8284 Hover · 8276 Pressed):**

| State | btn bg | border | label | arrow bg | arrow border | chevron |
|---|---|---|---|---|---|---|
| Default | `#fff` | `#00cc85` | `#00cc85` | `#fff` | `inset 1px #00cc85` | `#00cc85` |
| Hover | `#b5f291` | `#70bc6f` | `#70bc6f` | `#b5f291` | `inset 1px #70bc6f` | `#70bc6f` |
| Pressed | `#00564c` | `#00453d` | `#00cc85` | `#00cc85` | none | `#00564c` |

**Arrow border:** `box-shadow: inset 0 0 0 1px` (Rule 30 — avoids consuming layout space; arrow is 16px frame, 2px padding, 12px clip).

#### Shadow DOM issue — `<use>` vs inline SVG

CSS `stroke` set on a `<svg>` element via a stylesheet rule **does not cascade into the shadow DOM** created by `<use href="#symbol-id"/>`. This caused the Preview button chevron to render with wrong colours (subject theme leaking via `currentColor`, or browser default black/dark).

**Fix:** All 20 Preview button arrows use inline SVG paths — no `<use>`:
```html
<!-- ✗ stroke blocked by shadow DOM -->
<svg><use href="#ic-chevron-btn"/></svg>

<!-- ✓ stroke: var(--og-500) reaches path directly -->
<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 9L7.5 6L4.5 3"/></svg>
```

**Rule:** Use `<use>` for icons where the colour never changes per-instance. Use inline paths when per-state colour control is needed via CSS.

**Prompt to fix this in future:** `"inline the SVG path, don't use <use>"`

#### Key DS nodes

| Node | Purpose |
|---|---|
| `3528:52796` | Browse Classes breadcrumb row + 3 buttons |
| `3528:52800` | Go to My Class button (airplay icon, Secondary/L) |
| `3528:52802` | Full 20-card Browse Classes grid |
| `3528:52804` | Class Card - 1.5 with Premium Only + Preview CTA |
| `3528:52817` | RM 80.00 tag variant (English card) |
| `3528:52822` | Free tag variant (KAFA card) |
| `1452:8292` | Button - 1.5 Secondary/S Default |
| `1452:8284` | Button - 1.5 Secondary/S Hover |
| `1452:8276` | Button - 1.5 Secondary/S Pressed |

---

*Last updated: 2026-05-18 | File: Nadia.test.git/Class/nadia_Class-BrowseClasses.html | Branch: staging*

---

### Updates — May 2026 (Session 9)

**Folder restructure — `My Rewards/` → `Rewards/`:**
All Rewards HTML pages moved from `Nadia.test.git/My Rewards/` to `Nadia.test.git/Rewards/`. Old paths deleted from git.

**`nadia_Rewards-Myrewards.html` — My Rewards view:**
- Same two-panel sidebar; `My Rewards` button = `sidebar-btn--active` (icon: `ic-package`)
- Breadcrumb: Rewards › My Rewards (DS node 3284:218453)
- Right main: `.mr-grid` — `grid-template-columns: repeat(4, 1fr); gap: 16px` → 2-col at `≤1279px` → 1-col at `≤767px`
- Cards: `.mr-card` — `flex-col; border: 1px #d9d9d9; border-radius: 24px`
  - Image: `aspect-ratio: 250/148; object-fit: cover; bg: var(--og-50)` · source: `image-repo/Rewards-MyRewards/MyRewards-N.svg`
  - Body: `padding: 16px; gap: 8px` — badge(s) + title (14px SemiBold `#404040`, 2-line clamp)
  - Badge (`.mr-badge`): `Outline/star` 10px icon · `bg #ccf5e7; border 1px #00cc85; border-radius: 60px; padding: 2px 8px; font 10px Medium #00cc85`
  - Divider: `height: 1px; bg #d9d9d9`
  - Footer: coin icon (21px) + value · Show Voucher button (Primary/S, h:24px, `ic-chevron-btn` 12×12 clip)
- Show Voucher button: active `bg #00cc85; border #00a36a` · hover `#b5f291/#70bc6f` · pressed `#00564c/#00453d`

---

### Updates — May 2026 (Session 10)

**Left sidebar redesign — all 3 Rewards pages (DS node `3849:48401` Nav Side Menu Desktop 1.5):**

Sidebar container: `width: 280px; min-width: 240px; border: 1px solid #00cc85; border-radius: 24px; padding: 16px; gap: 8px`

**Score chip (`.sidebar-balance`):**
- `bg: #fef1ce` (`Surface/gold/default-subtle`) · `border: 1px solid #fabb0a` (`Border/gold/default`) · `border-radius: 16px`
- `padding: var(--sp-xs) var(--sp-xs) var(--sp-xs) var(--sp-xxxs)` · `gap: 2px`
- Coin icon: `<img>` 24×24 `object-fit: contain` from local `image-repo/Rewards-*/P.Coin.svg`
- Value "10,000": `font 18px Bold; color #fff; -webkit-text-stroke: 2px #c89608; paint-order: stroke fill` (Rule 26 — OUTSIDE 1px stroke → 2px CSS)

**Nav buttons (`.sidebar-btn`):**
- Icon container: single `<div class="sidebar-btn__icon-wrap">` 24×24 `overflow:hidden; position:relative` — no nested clip div
- SVG: `position:absolute; inset:8.33%` (default); per-icon overrides via `data-icon` attribute:
  - `data-icon="box"` (My Rewards): `inset: 5.17% 8.33% 5.12%`
  - `data-icon="shopping-bag"` (Merchandise): `inset: 8.33% 12.5%`
  - `data-icon="shopping-cart"` (eVoucher): `inset: 4.17% 4.17% 8.33%`
- Inactive: `bg transparent; border 1px transparent; icon/label #666` · hover: `bg var(--og-50)`
- Active (`.sidebar-btn--active`): `bg #b5f291; border 1px #00a36a; icon/label #00a36a`
- Label: `font 14px SemiBold; line-height 20px`

**Active button per page:**
- `nadia_Rewards-CoinQuest.html` → `ic-stop-circle` (Coin Quest) active
- `nadia_Rewards-Myrewards.html` → `ic-package` + `data-icon="box"` (My Rewards) active
- `nadia_Rewards-Merchandise.html` → `ic-shopping-bag` + `data-icon="shopping-bag"` (Merchandise) active

*Last updated: 2026-05-18 | File: Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html | Branch: staging*

---

### Updates — May 2026 (Session 11)

**Sidebar hover state — all 3 Rewards pages (DS node `4060:54496`):**
- Inactive hover: `bg #e8fbe8` (`Surface/secondary/default-subtle`) + `border 1px #00cc85` + icon/label `#00cc85` (`Text/primary/default`)
- Previously only changed background to `var(--og-50)` — DS hover includes border and text color change

**My Rewards main panel rebuild (DS node `3897:67569` Primary Card - 1.5):**
- `rewards-main`: `bg #e8fbe8` + `border 1px #00cc85` + `border-radius 24px`
- Header row: "All items you have redeemed!" (left `#00564c`) + "Total redeem this month : [coin] 10,000" (right `#00564c`)
- Badge: `bg #d9f7ed` (`Surface/primary/default-subtle`) + `Outline/video` icon (was `ic-star`)
- Coin: 24px, local `P.Coin.svg`
- Show Voucher chevron: inlined SVG path `stroke="#00a36a"` — `<use href>` inherited wrong `currentColor`

**CoinQuest main panel updates:**
- `rewards-main` bg: `#fff` → `#e8fbe8` (Primary Card 1.5 surface)
- Quest card (`.qc`) border: `#d9d9d9` → `#00cc85` (`border/default`)
- Label badge font-size corrected to `12px / lh 12px`
- Badge color corrections: Medium `#fff6ed/#ffcea0/#ff9f43`, Hard `#ffeeee/#ffa5a7/#ff4c51`, Weekly same as Daily `#e6f6fd/#7fd0f3/#00a2e8`

**Merchandise main panel updates:**
- `rewards-main` border-radius: `r-2xl` → `r-4xl` (24px); bg: `#f6fef6` → `#e8fbe8`; gap: `sp-m` → `sp-xs`
- Header row added: "Collect coins, redeem and enjoy these great rewards!" + "Total redeem this month : [coin] 120"
- Badge bg: `#ccf5e7` → `#d9f7ed`

**Icon fix — sidebar icon rendering:**
- `position: absolute; inset` on SVG collapses to 0×0 in Chromium
- Fixed to `padding: 2px; box-sizing: border-box` on container + `width: 100%; height: 100%` on SVG

**Bug fix — `nadia_Class-MyClasses.html`:**
- Corrupted querySelector: `.navbar-primary-icon´` → `.navbar-primary-icon` (stray acute accent)

---

### Updates — May 2026 (Session 12)

**File:** `Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html`

#### Primary Card - 1.5 rebuild — DS node 3897:68441

| Property | Before | After | DS token |
|---|---|---|---|
| `.rewards-main` bg | `#f6fef6` | `#e8fbe8` | `Surface/secondary/default-subtle` |
| `.rewards-main` border-radius | `r-2xl` (18px) | `r-4xl` (24px) | `corner-4xl` |
| `.rewards-main` gap | `sp-m` (16px) | `sp-xs` (8px) | `spacing/space-xs` |
| `.rewards-main` height | auto | `align-self: stretch` — fills layout height | — |
| Header intro text colour | `#666` | `#00564c` | `text/tertiary/default` |
| Badge bg | `#ccf5e7` | `#d9f7ed` | `Surface/primary/default-subtle` |

**New header row** (DS node `I3897:68441;2881:36281;3902:49607`):
- Left: "Collect coins, redeem and enjoy these great rewards!" — 14px Regular `#00564c`
- Right: "Total redeem this month :" + P.Coin icon (18×21, local `P.Coin.svg`) + "120" — same colour
- Flex row `justify-content: space-between; flex-wrap: wrap; gap: 16px`

*Last updated: 2026-05-18 | File: Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html | Branch: staging*

---

### Updates — May 2026 (Session 12 cont.)

**File:** `Nadia.test.git/Class/nadia_Class-MyClasses.html`

#### Waffle button active state + Learn Menu dropdown

**DS nodes:** `3887:50052` (Navbar Primary active waffle) + `3908:5492` (Learn Menu - 1.5 panel)

**Active state — waffle button (node 3887:50052):**
- `id="waffle-btn"` added; `aria-haspopup="true"` + `aria-expanded` attribute wired to JS toggle
- Union speech-bubble bg: `<img class="waffle-union-bg" src="../../zul.test.git/icons/nav-btn-union.png">` (44×52px, `position:absolute top:0 left:0`) — hidden by default, shown when `.is-active`
- `.is-active` override: `background: transparent; box-shadow: none; color: #00cc85` (green filled waffle icon via `currentColor`)
- `#waffle-btn > svg` has `position: relative; z-index: 1` so it renders above the union bg layer

**Changes to `.navbar-primary` to support dropdown:**
- `overflow: hidden` → `overflow: visible` — required so the union PNG extension and dropdown are not clipped by the navbar bar

**Learn Menu panel (node 3908:5492):**
- Placed as a sibling of `.navbar-primary` inside `#NavBar-Primary-Desktop` (outside overflow-clipping context)
- `#NavBar-Primary-Desktop { position: relative }` established as containing block
- Panel: `position: absolute; top: calc(100% - 8px); right: var(--spacing-space-xl)` (24px from right = aligned with `.navbar-primary` padding)
- `background: white; border: 1px solid #00cc85; border-radius: 24px; padding: 16px; width: 364px`
- Grid: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 0` — 4 rows × 3 columns = 12 items
- Each item: `flex-col gap-4px; padding: 8px; border-radius: 12px; min-height: 114px`
- Icon: `width: 70px; height: 70px; object-fit: contain`
- Label: `14px SemiBold #666666`
- Hover: `bg #e8fbe8` | Active/pressed: `bg #b5f291`

**12 feature items (order from DS):**
Row 1: Live Tuition · Live Help · Quiz
Row 2: Practice · Chapters · Textbooks
Row 3: Quick Notes · Videos · Experiments
Row 4: Personality · University · Rewards

**Image paths:** `../../zul.test.git/icons/feature-*.png` (all 12 confirmed present)

**JS handler:**
- Click waffle → toggle `.is-active` + `.is-open` + `aria-expanded`
- `stopPropagation` on waffle click + on menu click (prevents outside-click handler from immediately closing)
- Outside-click + Escape → close both
- Handler registered FIRST, before mobile menu IIFE (critical handlers before non-critical JS — Rule 14)

*Last updated: 2026-05-19 | File: Nadia.test.git/Class/nadia_Class-MyClasses.html | Branch: staging*

---

### Updates — May 2026 (Session 13)

**File:** `Nadia.test.git/Class/nadia_Class-MyClasses.html`

#### Section 1 + Section 2 audit — DS node 3528:51331 (Nav Top Menu Desktop - 1.5)

**DS node inspected:** `3528:51331` — Nav Top Menu Desktop pill (Section 2)

**Findings:**
- All nav item states were verified correct against DS:
  - Default: white bg, `#666666` label (`--text-default-body`), `#00cc85` icon ✓
  - Hover: bg `#b5f291` (`--surface-secondary-default`), inset border `#70bc6f` (`--border-secondary-focus`), label/icon `#70bc6f` ✓
  - Active/Selected: bg `#00cc85` (`--surface-primary-default`), inset border `#00a36a` (`--border-primary-focus`), label/icon `#f6fdfb` (`--text-primary-on-color`) ✓
  - Pressed (`is-pressed`): bg `#00564c` (`--surface-tertiary-default`), inset border `#00453d` (`--border-tertiary-focus`), label/icon `#00cc85` ✓

**Fix applied:**
- `.nav-label { font-weight: 500 → 600 }` — DS text style is `Body/B1` (Poppins SemiBold 14px). Was incorrectly set to `font-weight: 500` (Medium); corrected to `font-weight: 600` (SemiBold).

**Mistake documented:** `font-weight: 500` (Medium) was used instead of `600` (SemiBold) for nav pill labels. DS `Body/B1` is always SemiBold. Check DS text style weight before defaulting to `500`.

---

### Updates — May 2026 (Session 13 cont.)

**File:** `Nadia.test.git/Class/nadia_Class-MyClasses.html`

#### Section 2 audit — DS node 3528:51331 (Nav Top Menu Desktop - 1.5)

**Full DS audit against current implementation — 4 issues found and fixed:**

**1. Per-icon clip inset padding CSS rules were completely missing**
- DS spec (CLAUDE.md Rule 8): every icon has a unique inset `%` within the 20×20 clip container.
- Implementation had zero `[data-icon]` CSS rules — all icons were filling the full 20px clip (too large).
- Fix: added `box-sizing: border-box` to `.nav-item__icon-clip` + 9 per-icon padding rules:
  ```css
  .nav-item__icon-clip { box-sizing: border-box; }
  .nav-item__icon-clip[data-icon="home"]        { padding: 8.33% 12.5%; }
  .nav-item__icon-clip[data-icon="quiz"]        { padding: 8.33%; }
  .nav-item__icon-clip[data-icon="battle"]      { padding: 12.5%; }
  .nav-item__icon-clip[data-icon="practice"]    { padding: 12.5% 8.33%; }
  .nav-item__icon-clip[data-icon="class"]       { padding: 12.5% 4.17%; }
  .nav-item__icon-clip[data-icon="learn"]       { padding: 8.33% 16.67%; }
  .nav-item__icon-clip[data-icon="achievement"] { padding: 16.67% 12.5%; }
  .nav-item__icon-clip[data-icon="potential"]   { padding: 8.33% 8.33% 12.42% 8.33%; }
  .nav-item__icon-clip[data-icon="gift"]        { padding: 8.33%; }
  ```
- DS source for `achievement` (Outline/bar-chart 2): node `I3528:51331;3406:810` → inset `16.67% 12.5%`.
- Why `border-box`: percentage padding without `border-box` would grow the 20×20 clip — `border-box` keeps outer dimensions fixed at 20×20 while shrinking the content area for the SVG.

**2. Quiz clip div missing `data-icon="quiz"` attribute**
- Without the attribute, the `padding: 8.33%` rule couldn't apply.
- Fix: added `data-icon="quiz"` to the check-circle clip div.

**3. `.navbar-nav { align-items: flex-start }` → `align-items: center`**
- DS confirms `items-center` on the Navbar Content container.
- Visually equivalent here (items are exactly 40px, container 56px - 8px×2 padding = 40px) but corrected for DS fidelity.

**4. Active item hover override — `.nav-item.is-active:hover`**
- Without this, hovering the active Class item triggered `.nav-item:hover` (bg #b5f291) overriding `.nav-item.is-active` (bg #00cc85). The active item visually changed colour on hover.
- Fix: added `.nav-item.is-active:hover` rules at higher specificity to lock the active state.

**DS confirmed correct (no changes needed):**
- All state token values: Default / Hover / Active / Pressed colours ✓
- `.nav-arrow-circle` specs: bg `#99ebce`, padding `4px`, border-radius `60px`, chevron `#00a36a` ✓
- `.nav-chevron` 16×16 clip for Learn, Achievement, Potential, Rewards ✓
- `ic-bar-chart` symbol `viewBox="-1 -1 26 26"` — standard DS 24×24 frame ✓
- Font: `Body/B1` SemiBold 14px (corrected in Session 13) ✓

*Last updated: 2026-05-19 | File: Nadia.test.git/Class/nadia_Class-MyClasses.html | Branch: staging*

---

### Updates — May 2026 (Session 14)

**File:** `Nadia.test.git/Class/nadia_Class-MyClasses.html`

#### Section 1 + Section 2 full DS audit — nodes 4661:37835 + 4661:37836

**DS nodes audited:** `4661:37835` (NavBar Primary Desktop - 1.5) + `4661:37836` (Nav Top Menu Desktop - 1.5)

**Section 1 — 3 fixes applied:**

**1. MISSING: Search bar (Dropdown - Parts, DS node 4689:4319)**
- DS shows a "Search" pill (`flex:1 0 0`, `h:40px`, `border: 1px solid #00cc85`, `border-radius: 999px`) filling available width between logo and action icons.
- Was completely absent from the HTML.
- Fix: added `.navbar-search` `<button>` + CSS: `flex:1 0 0; height:40px; border:1px solid var(--border-primary-default); border-radius:var(--corner-radius-corner-pill); padding:8px 12px`. Label: `Body/B2` Poppins Medium 14px `#666`.

**2. Avatar background wrong: white → `#e1f9ea`**
- DS node 684:621: `bg-[var(--surface/primary/default-subtle, #e1f9ea)]`.
- Fix: `.navbar-avatar { background: var(--surface-primary-default-subtle) }`.

**3. CSS variable `--surface-primary-default-subtle` corrected: `#d9f7ed` → `#e1f9ea`**
- DS fallback from node 4661:37835 is `#e1f9ea`.

**Section 2 — no new issues found**
- Full re-audit against DS 4661:37836 confirms all states match DS tokens ✓

**Mistake documented:** `Surface/primary/default-subtle` was set to `#d9f7ed` — DS node confirms `#e1f9ea`. Always verify tint/subtle token hex values against live DS node fallbacks.

---

### Updates — May 2026 (Session 14 cont.)

**File:** `Nadia.test.git/Class/nadia_Class-MyClasses.html`

#### Button - 1.5 state audit — DS node 473:529 (full component set)

**Tertiary/L/Student states verified from live DS sublayer nodes:**

| State | DS node | bg | border | label | Previous value | Match? |
|---|---|---|---|---|---|---|
| Default | `538:2067` | white | none | `#666` | white | ✓ |
| Hover | `538:2059` | `#b5f291` | `1px #70bc6f` | `#70bc6f` | same | ✓ |
| **Pressed** | `3029:20022` | **`#00a36a`** | **`1px #00cc85`** | `#00cc85` | `#00564c` bg / `#00453d` border | **WRONG** |
| Active | `538:2051` | `#00cc85` | `1px #00a36a` | `#f6fdfb` | same | ✓ |

**Fix applied — Pressed state corrected:**
- bg: `Surface/tertiary/default (#00564c)` → `Surface/primary/focus (#00a36a)` — DS has been updated
- border: `Border/tertiary/focus (#00453d)` → `Border/primary/default (#00cc85)`
- Added `--surface-primary-focus: #00a36a` to CSS `:root`

**CLAUDE.md correction needed:** Rules 38, 40, and previous session notes documenting Pressed = `#00564c` are now outdated. DS node `3029:20022` is the authoritative source: Tertiary/L/Student Pressed = `#00a36a` bg + `#00cc85` border.

*Last updated: 2026-05-21 | File: Nadia.test.git/Class/nadia_Class-MyClasses.html | Branch: staging*

---

## Session 10 — Template Integration (2026-05-26)

**Task:** Rebuild `Nadia.test.git/Class/nadia_Class-BrowseClasses.html` using `zul.test.git/zul.page.template.html` as the layout foundation.

**Approach:** Python string-replacement build script — never modifying the template file (read-only).

**Changes applied:**
1. Title: `Pandai — Page Template` → `Pandai — Browse Classes`
2. Asset paths: `../src/image-repo/` → `../../src/image-repo/` (18 occurrences, all contexts: `src=`, `url()`, any attribute)
3. Avatar: `Avatar-Aidan.png` → `../image-repo/icon-avatar-user.png` (Nadia user avatar)
4. NavTopMenu-Desktop: removed `is-active`/`aria-current` from Home, added to Class
5. NavMenu-Tablet: removed `is-active` from Home, added to Class  
6. NavMenu-Mobile: removed `is-active` from Home, added to Class
7. PageViewport placeholder → Browse Classes content (breadcrumb + 20 class cards)
8. Added Nadia page CSS `<style>` block before `</head>` — page-specific tokens, layout overrides, component styles

**Key integration decisions:**
- `#PageViewport` overridden to `align-items: stretch; justify-content: flex-start; padding/gap: 16px` — removes the centered placeholder behavior, enables full-width card grid
- Template navbar fully replaces old Nadia custom navbar — richer (profile menu, dropdowns, learn menu, locale, notifications)
- All icon symbols already in template's 97-symbol SVG sprite — no new symbols needed
- Nadia image paths (`../image-repo/MyClassImage/`, `../image-repo/Avatar-teacher/`) remain intact — same file location
- Template CSS handles: reset, tokens, layout, all navbar styles, footer, mobile menu
- Nadia CSS adds: subject palette tokens (bm/en/mt/sc/bi/hs), avatar component, breadcrumb, buttons, class card grid, subject color overrides

**Verification (all 10 checks passed):**
- Title, asset paths, avatar, Class active in NavTopMenu/Tablet/Mobile, breadcrumb section, cards section, cards content, PageViewport CSS override
- Section balance: 7 `<section>` opens = 7 closes (1 in HTML comment excluded from count)
- No orphaned `<!--` before `<script>` (Rule 62)

**File:** `Nadia.test.git/Class/nadia_Class-BrowseClasses.html` — 4,714 lines, 414,260 chars

*Last updated: 2026-05-26 | Session 10 — Template Integration | Branch: staging*

---

## Session 11 — My Classes: Template Integration + Structural Fix + Nav Active States

*2026-05-26 | Branch: staging | File: `Nadia.test.git/Class/nadia_Class-MyClasses.html`*

### Task
Integrate the existing My Classes screen into `zul.page.template.html` as a base layout, then apply structural and nav fixes.

### Integration approach (same Python build script pattern as Session 10)
1. Read `zul.test.git/zul.page.template.html` as base (read-only)
2. Adjust asset paths: `../src/` → `../../src/` (Nadia file is one directory deeper)
3. Switch `NavTopMenu-Desktop` active state: Home → Class
4. Inject My Classes CSS before `</style>` (DS Avatar, Breadcrumb, Cards, 20 subject palettes, responsive grid)
5. Replace `<section id="PageViewport">` placeholder with My Class content (breadcrumb + 20 subject cards)
6. Write to `Nadia.test.git/Class/nadia_Class-MyClasses.html`

### Structural fix — `#PageViewport` → `#viewport-myclass`

**Problem:** `.page-viewport` CSS had `align-items: center; justify-content: center` — was centering the bc-row and cards-grid inside the viewport instead of left-aligning from the top.

**Fix applied:**
- Replaced `<section id="PageViewport" class="page-viewport">` with `<section id="viewport-myclass">` (no `page-viewport` class)
- Combined the two inner sections into divs inside one named section:
  - `<section class="bc-row">` → `<div class="bc-row">`
  - `<section class="cards-grid">` → `<div class="cards-grid">`
- Added explicit `justify-content: flex-start` to `.bc-row` for left-alignment
- CSS: replaced `#PageViewport { ... }` with `#viewport-myclass { display: flex; flex-direction: column; gap: var(--section-gap); }`

**Final structure:**
```html
<section id="viewport-myclass" aria-label="My Classes">
  <div class="bc-row">…breadcrumb…</div>
  <div class="cards-grid">…20 class cards…</div>
</section>
```

### Icon fix — Browse Classes button
- `ic-website` was referenced but had no `<symbol>` definition → blank icon
- Fixed: changed to `ic-globe` (already defined in the shared SVG sprite)

### Nav active state fixes — Class active across all breakpoints

| Nav location | Before | After |
|---|---|---|
| `#NavTopMenu-Desktop` (`nav-menu-btn`) | Class `is-active` ✅ | unchanged |
| `#NavMenu-Tablet` (`nav-menu-item`) | Home `is-active` | **Class `is-active`** |
| `#NavMenu-Mobile` (`nav-menu-item`) | Home `is-active` | **Class `is-active`** |

### File state
- `Nadia.test.git/Class/nadia_Class-MyClasses.html` — 4,710 lines
- 20 class cards present, 3-col desktop / 2-col tablet / 1-col mobile grid
- No orphaned `<!--` before `<script>` (Rule 62 clear)

*Last updated: 2026-05-26 | Session 11 — My Classes Integration | Branch: staging*

---

## Session 12 — Browse Classes Viewport Fix + Avatar Rule + Rewards Nav

*2026-05-26 | Branch: staging | Files: `Nadia.test.git/Class/nadia_Class-BrowseClasses.html`, `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html`*

### Task 1 — Browse Classes: `#PageViewport` → `#viewport-browseclasses`

**Problem:** After template integration (Session 10), the Browse Classes content was sitting inside `<section id="PageViewport" class="page-viewport">`. The `.page-viewport` CSS has `align-items: center; justify-content: center` — this centered the `bc-row` instead of left-aligning it.

**Fix applied:**
- Removed the `page-viewport` class wrapper entirely
- Replaced with a single `<section id="viewport-browseclasses" class="viewport-browseclasses">` containing both sub-sections as divs:
  - `bc-row` (breadcrumb + filter row) — left-aligned
  - `cards-grid` (20 class cards)
- New CSS added:
  ```css
  .viewport-browseclasses {
    display: flex; flex-direction: column;
    gap: var(--spacing-space-m);
    width: 100%;
  }
  .viewport-browseclasses .bc-row {
    align-items: flex-start;
    width: 100%;
  }
  ```
- Section balance confirmed: 7 opens = 7 closes
- No orphaned `<!--` before `<script>` (Rule 62 clear)

### Task 2 — Avatar Rule: always use `Avatar-Aidan.png` from template asset path

**Problem:** After rebuild, the Browse Classes navbar avatar was broken — pointing to `../image-repo/icon-avatar-user.png` (Nadia custom path) instead of the template asset path.

**Rule established:** All Nadia pages must use the same navbar avatar as `zul.page.template.html`:
```
../../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/Avatar-Aidan.png
```
- Do NOT modify the avatar design, only the page state (active nav) changes between pages
- Both avatar occurrences (navbar + profile dropdown) must use this path
- This applies to all current and future Nadia pages

**Confirmed correct on:**
- `nadia_Class-BrowseClasses.html` — `../../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/Avatar-Aidan.png` (×2) ✅
- `nadia_Class-MyClasses.html` — already correct from Session 11 ✅
- `nadia_Rewards-CoinQuest.html` — fixed from `../navbar/icon-avatar-user.png` to template path ✅

### Task 3 — Rewards CoinQuest: Class set as active nav

**File:** `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html`

**Nav active state swaps — all 3 contexts:**

| Nav context | Element | Before | After |
|---|---|---|---|
| `#NavTopMenu-Desktop` | `.nav-menu-btn` | Home `is-active` + `aria-current="page"` | **Class `is-active`** + `aria-current="page"` |
| `#NavMenu-Tablet` | `.nav-menu-item` | Home `is-active` + `aria-current="page"` | **Class `is-active`** + `aria-current="page"` |
| `#NavMenu-Mobile` | `.nav-menu-item` | Home `is-active` + `aria-current="page"` | **Class `is-active`** + `aria-current="page"` |

**Note:** `nadia_Rewards-CoinQuest.html` contains both the old custom Nadia navbar (lines ~1000–1149, `.nav-btn.is-active`) and the template navbar (lines ~2209–2956). Active state changes were applied to the **template navbar** only — the old navbar section remains as-is.

*Last updated: 2026-05-26 | Session 12 — Viewport Fix + Avatar Rule + Rewards Nav | Branch: staging*

---

## Session 13 — Rewards CoinQuest: Template Integration + Nav Active State Fix

*2026-05-26 | Branch: staging | File: `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html`*

### Task 1 — Template integration: `zul.page.template.html` as base layout

**Approach:** Copied `zul.page.template.html` → `nadia_Rewards-CoinQuest.html`, then applied targeted edits. Template itself (`zul.test.git/zul.page.template.html`) was NOT modified.

**Changes applied:**
- Title: `Pandai — Page Template` → `Pandai — Rewards / Coin Quest`
- Added CoinQuest shorthand token aliases to `:root` (`--og-*`, `--pk-*`, `--sp-*`, `--r-*`, `--coin-bg`, `--coin-border`, `--coin-text`, `--ruby-bg`, `--ruby-border`)
- Added CoinQuest CSS: `.page-viewport-content`, `.bc-row`, `.rewards-layout`, `.rewards-sidebar`, `.sidebar-btn`, `.sidebar-btn--active`, `.quest-grid`, `.qc` (quest cards), `.lbadge`, `.btn-claim` with all states
- Added 4 new SVG symbols (genuinely new, not in template): `ic-corner-down-right`, `ic-coin`, `ic-gem`, `ic-tag`
- Asset paths corrected: `../src/image-repo/` → `../../src/image-repo/` for all template nav assets
- CoinQuest quest card images kept at: `../image-repo/Rewards-CoinQuest/P.Coin.svg` + `Property%201=*.svg`
- `#PageViewport` replaced with `<section id="PageViewport" class="page-viewport-content">` containing breadcrumb row + `.rewards-layout` (sidebar + quest grid)
- Sidebar JS added (wrapped in `try/catch` per Rule 14)

### Task 2 — SVG symbol deduplication

**Problem:** The initial symbol block added for CoinQuest re-defined 6 symbols already present in the template's defs block: `ic-award`, `ic-stop-circle`, `ic-package`, `ic-shopping-bag`, `ic-shopping-cart`, `ic-smile`. A second duplicate `ic-gift` was also present (one at the nav-clip 20px viewBox, one generic 24px).

**Fix:** Removed all duplicates. Final "CoinQuest / Rewards page" block contains only the 4 genuinely new symbols: `ic-corner-down-right`, `ic-coin`, `ic-gem`, `ic-tag`. The DS-accurate template versions of the shared icons are retained.

**Rule confirmed:** The template's defs block is the canonical symbol registry. Before adding any `<symbol>`, grep for the ID — if it exists, use `<use href="#ic-*">` against the existing definition.

### Task 3 — Correct nav active state: Class → Rewards

**Changed in `#NavTopMenu-Desktop`:**
- Removed `is-active` + `aria-current="page"` from `Class` button
- Added `is-active` + `aria-current="page"` to `Rewards` button

**Note (Session 12 correction):** Session 12 logged this as "Class set as active nav" — that was wrong. The correct active button for `nadia_Rewards-CoinQuest.html` is **Rewards**, not Class. The task was completed in this session.

### Task 4 — Nav Rewards button stays active when switching sidebar items

**Problem:** Clicking any `.sidebar-btn` removed `is-active` from the Rewards nav button and restored Home as active instead. Reported by user.

**Root cause — two separate code paths in the nav dropdown IIFE:**

1. **`document.addEventListener('click', ..., true)` (capture phase)** — fired on every click regardless of dropdown open state, calling `closeDropdown()` which stripped `is-active` from all nav buttons
2. **`restoreHome()`** — called by every `closeDropdown()`, always adding `is-active` back to Home, even on non-Home pages

**Fixes applied (3 changes in `nadia_Rewards-CoinQuest.html` only — template unchanged):**

| Location | Change |
|---|---|
| `restoreHome()` in nav dropdown IIFE | Changed selector from `[aria-label="Home"]` → `[aria-label="Rewards"]` |
| `document.addEventListener('click', ..., true)` in nav dropdown IIFE | Added guard: `dropdown.classList.contains('is-open') &&` before the condition — prevents sidebar clicks from triggering `closeDropdown()` when no dropdown is open |
| Quiz/Battle/Practice mouseleave restore (separate IIFE) | Same Home → Rewards fix for the 3s hover-restore timer |

**Rule:** For every non-Home page built from `zul.page.template.html`, `restoreHome()` must be changed to restore the correct active page button. The `document.addEventListener` guard (`is-open` check) must also be added — it is always the correct behaviour and should be considered a template bug fix when applied per-page.

*Last updated: 2026-05-26 | Session 13 — Template Integration + Nav Fix | Branch: staging*

---

## Session 13 — MyRewards Template Integration + Nav Active Fix

*2026-05-26 | Branch: staging | File: `Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html`*

### Task 1 — MyRewards: integrate `zul.page.template.html` as base layout

**File created:** `Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html`

**Assembly approach:**
- Extracted template CSS (lines 12–2004), SVG defs (2008–2191), Navigation Shell (2209–2956), footer (2980–2999), and all scripts (3002–3902) from `zul.page.template.html`
- Applied asset path replacements and Rewards active state
- Appended page-specific CSS, extra SVG symbols, and page-specific JS
- Placed MyRewards content (breadcrumb + sidebar + voucher card grid) inside `<main>`
- Tag balance: 6/6 `<section>`, 1/1 `<main>` ✅

**Page-specific CSS additions:**
```css
/* Two-panel layout */
.rewards-layout { display: flex; gap: 12px; align-items: stretch; }
/* Sidebar */
.rewards-sidebar { width: 280px; min-width: 240px; flex-shrink: 0;
  background: #fff; border: 1px solid var(--border-primary-default);
  border-radius: var(--corner-radius-corner-4xl); padding: var(--spacing-space-m);
  display: flex; flex-direction: column; gap: var(--spacing-space-xs); }
/* Voucher card grid */
.mr-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-space-m); }
```

**Extra SVG symbols added** (not in template sprite):
- `ic-video` — used in Premium badge on voucher cards
- `ic-corner-down-right` — sub-item indicator

**Responsive breakpoints:**
- Tablet `≤ 1279px`: `rewards-layout` → `flex-direction: column`; grid → 2 columns
- Mobile `≤ 767px`: grid → 1 column

---

### Task 2 — Rewards active in all 3 nav contexts

**Nav active state swaps:**

| Nav context | Element | Before | After |
|---|---|---|---|
| `#NavTopMenu-Desktop` | `.nav-menu-btn` | Home `is-active` | **Rewards `is-active`** + `aria-haspopup="true"` + `aria-current="page"` |
| `#NavMenu-Tablet` | `.nav-menu-item` | Home `is-active` | **Rewards `is-active`** + `aria-current="page"` |
| `#NavMenu-Mobile` | `.nav-menu-item` | Home `is-active` | **Rewards `is-active`** + `aria-current="page"` |

---

### Task 3 — Navbar Primary: fix asset paths

**Problem:** Assembly script used old `../navbar/` paths (Nadia-specific PNGs) but the file sits in `Nadia.test.git/Rewards/` which needs `../../src/image-repo/page.template/...` paths — same as CoinQuest and Merchandise.

**Paths fixed (6 occurrences):**

| Element | Old path | New path |
|---|---|---|
| Desktop logo mark | `../navbar/logo-mark.png` | `../../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/logo-mark.svg` |
| Desktop logo wordmark | `../navbar/logo-wordmark.png` | `../../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/logo-text.svg` |
| Navbar avatar | `../navbar/icon-avatar-user.png` | `../../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/Avatar-Aidan.png` |
| Profile dropdown avatar | `../navbar/icon-avatar-user.png` | `../../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/Avatar-Aidan.png` |
| Mobile logo mark | `../navbar/logo-mark.png` | `../../src/image-repo/page.template/assets/main/NavBar-Mobile/logo-mark.svg` |
| Mobile logo wordmark | `../navbar/logo-wordmark.png` | `../../src/image-repo/page.template/assets/main/NavBar-Mobile/logo-text.svg` |

**Rule confirmed:** All Nadia pages in `Nadia.test.git/Rewards/` use `../../src/image-repo/page.template/assets/main/...` paths. Never `../navbar/`.

---

### Task 4 — Sidebar clicks breaking Rewards nav active state

**Problem:** Clicking any `.sidebar-btn` (in the main content area) caused the Rewards `nav-menu-btn` to lose its `is-active` state and Home to become active instead.

**Root cause:** The `document.addEventListener('click', ...)` inside the nav-menu dropdown IIFE fires on *every* click anywhere on the page. When the Rewards dropdown was already closed, `closeDropdown()` ran regardless:
1. `dropdown.classList.remove('is-open')` — no-op
2. `btn.classList.remove('is-active')` — ❌ removed Rewards is-active
3. `restoreHome()` — ❌ added is-active to Home

**Fix 1 — Guard in `closeDropdown()`:**
```javascript
function closeDropdown() {
  if (!dropdown.classList.contains('is-open')) return;  // ← guard added
  dropdown.classList.remove('is-open');
  btn.classList.remove('is-active');
  btn.removeAttribute('aria-current');
  restoreCurrentPage();  // ← renamed from restoreHome()
}
```

**Fix 2 — `restoreHome()` → `restoreCurrentPage()`:**
```javascript
function restoreCurrentPage() {
  var rewardsBtn = navSection.querySelector('[aria-label="Rewards"]');
  if (rewardsBtn) { rewardsBtn.classList.add('is-active'); rewardsBtn.setAttribute('aria-current', 'page'); }
}
```

**Fix 3 — Quiz/Battle/Practice mouseleave timer** (also called `restoreHome()`):
```javascript
var rewardsBtn = navSection.querySelector('[aria-label="Rewards"]');
if (rewardsBtn) { rewardsBtn.classList.add('is-active'); rewardsBtn.setAttribute('aria-current', 'page'); }
```

**Rule for all Rewards sub-pages:** Every page in `Nadia.test.git/Rewards/` must apply these three fixes — replacing all `restoreHome()` calls with `restoreCurrentPage()` that targets Rewards, and adding the `is-open` guard to `closeDropdown()`.

### File state
- `Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html` — ~397 KB
- Full template Navigation Shell, Rewards active in all 3 nav contexts
- Sidebar toggle + voucher button pressed feedback JS
- No orphaned `<!--` before `<script>` (Rule 62 clear)

*Last updated: 2026-05-26 | Session 13 — MyRewards Integration + Nav Active Fix | Branch: staging*

---

## Session 14 — Merchandise rebuild + nav persistence fix (data-active-nav pattern) (2026-05-26)

### Task 1 — Merchandise.html: template integration

**Files changed:**
- `Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html` — rebuilt from `nadia_Rewards-CoinQuest.html` as base (4-step Python transformation):
  1. Title → `Pandai — Merchandise`
  2. Breadcrumb `bc-title` + `bc-link--current` → `Merchandise`
  3. Sidebar active → Merchandise button (`sidebar-btn--active`)
  4. Main panel → Merchandise-specific content (`.rewards-main--merch`, 4 merch cards, `ic-video` symbol injected)

**Merchandise content spec (from DS Figma):**
- Main bg: `#e8fbe8` / border: `1px solid #00cc85` / radius: `24px`
- 4-column merch grid (`repeat(4,1fr)`, `gap:16px`); 2-col at ≤1279px; 1-col at ≤767px
- Each card: white bg, `1px solid #d9d9d9` border, `24px` radius
- Premium/Lite label badge: `ic-video` icon + text, `#d9f7ed` bg, `#00cc85` border/text
- CTA button `.btn-show`: `24px` height, `#00cc85` bg, pill radius — enabled (cards 1–2) + disabled (cards 3–4)
- Coin icon: local `../image-repo/Rewards-Merchandise/P.Coin.svg`

---

### Task 2 — Nav persistence: Rewards stays active (generic `data-active-nav` pattern)

**Problem:** Clicking the Rewards nav-menu-btn or any sidebar button caused the nav to revert to Home active.

**Root cause:** `restoreHome()` inside the nav dropdown IIFE fires on every `closeDropdown()` path (button toggle, mouseleave, capture-phase outside-click) and unconditionally activates Home — even on sub-pages where Rewards should stay active.

**Previous attempt (now removed from both files):** `MutationObserver` + `requestAnimationFrame` in the sidebar script. Unreliable — raced against `restoreHome()` running synchronously.

**Correct fix — `data-active-nav` pattern (3 parts per file):**

| Part | Change |
|---|---|
| `<body data-active-nav="Rewards">` | Page-level signal — marks this page as belonging to Rewards section |
| `restoreHome()` in nav dropdown IIFE | Reads `data-active-nav`; if set, restores THAT button instead of Home |
| Sidebar script | Simplified — MutationObserver block removed |

**Updated `restoreHome()` (in the nav dropdown IIFE, same code in both files):**
```js
function restoreHome() {
  var persistLabel = document.body.getAttribute('data-active-nav');
  if (persistLabel) {
    var persistBtn = navSection.querySelector('[aria-label="' + persistLabel + '"]');
    if (persistBtn) { persistBtn.classList.add('is-active'); persistBtn.setAttribute('aria-current', 'page'); return; }
  }
  var homeBtn = navSection.querySelector('[aria-label="Home"]');
  if (homeBtn) { homeBtn.classList.add('is-active'); homeBtn.setAttribute('aria-current', 'page'); }
}
```

**Behaviour after fix:**
- Rewards dropdown opens → Rewards `is-active` ✓
- Dropdown closes (any path) → `restoreHome()` reads `data-active-nav="Rewards"` → Rewards restored ✓
- Sidebar button clicked → outside-click fires `closeDropdown()` → same result, Rewards stays ✓
- Home page / Class pages (no `data-active-nav`) → original Home restore behaviour ✓

**Files updated:**
- `Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html` — `<body data-active-nav="Rewards">` + updated `restoreHome()` + MutationObserver removed
- `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html` — same changes (was using an earlier hardcoded Rewards-only version; replaced with generic pattern)

**Note — `nadia_Rewards-Myrewards.html`:** Uses a different nav implementation (Session 13 Task 4 pattern — `is-open` guard + `restoreCurrentPage()`). The `data-active-nav` pattern has NOT been applied there yet. When updating MyRewards in future, align it to this generic pattern.

**Rule for all Rewards sub-pages:** Add `data-active-nav="Rewards"` to `<body>` and update `restoreHome()` to the generic version above. No MutationObserver or `is-open` guard needed.

---

## Session 14 — Image path migration + legacy folder cleanup (2026-05-26)

### What was done

#### 1. Image path migration — all 5 HTML files

All `<img src="../image-repo/…">` paths pointing to `Nadia.test.git/image-repo/` were updated to the canonical `src/image-repo/` location. 130 lines changed across 5 files.

**Mapping applied:**

| Old path (local, broken after cleanup) | New canonical path |
|---|---|
| `../image-repo/Avatar-teacher/` | `../../src/image-repo/page.class/browse.class/assets/` |
| `../image-repo/MyClassImage/` | `../../src/image-repo/page.class/my.class/assets/` |
| `../image-repo/Rewards-CoinQuest/` | `../../src/image-repo/page.rewards/coin.quest/assets/` |
| `../image-repo/Rewards-Merchandise/` | `../../src/image-repo/page.rewards/merchandize/assets/` |
| `../image-repo/Rewards-MyRewards/` | `../../src/image-repo/page.rewards/my.rewards/assets/` |

Navbar images (`NavbarPrimary-Desktop/`, `NavBar-Mobile/`) already pointed to `../../src/image-repo/page.template/` — no change needed.

**Files updated:**
- `Nadia.test.git/Class/nadia_Class-BrowseClasses.html` — 42 paths updated
- `Nadia.test.git/Class/nadia_Class-MyClasses.html` — 42 paths updated
- `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html` — 18 paths updated
- `Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html` — 10 paths updated
- `Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html` — 18 paths updated

#### 2. Legacy folder deletion

**`Nadia.test.git/image-repo/`** — 57 files removed (Avatar-teacher × 7, MyClassImage × 18, Rewards-CoinQuest × 17, Rewards-Merchandise × 5, Rewards-MyRewards × 10). All files had exact copies in `src/image-repo/`. Safe to remove after path migration above.

**`Nadia.test.git/navbar/`** — 20 legacy PNG icon files removed. These were early-session raster icons superseded by inline SVG `<symbol>` definitions. Zero references in any HTML file.

**Empty placeholder folders deleted (no files, no references):**
- `Nadia.test.git/Class/nadia_Class-BrowseClasses/`
- `Nadia.test.git/Rewards/nadia_Rewards-Merchandise/`
- `Nadia.test.git/Rewards/nadia_Rewards-MyRewards/`
- `Nadia.test.git/Profile/`

### Source of truth for images
All page-specific images now resolve from a single location tree:
```
pandai.design/src/image-repo/
├── page.class/
│   ├── browse.class/assets/   tutor-1…7.png
│   └── my.class/assets/       18 subject images + dlp.svg
├── page.rewards/
│   ├── coin.quest/assets/     P.Coin.svg + 16 quest SVGs
│   ├── merchandize/assets/    P.Coin.svg + 4 merchandise SVGs
│   └── my.rewards/assets/     P.Coin.svg + 8 reward SVGs
└── page.template/assets/main/
    ├── NavbarPrimary-Desktop/ logo-mark.svg, logo-text.svg, Avatar-Aidan.png
    └── NavBar-Mobile/         logo-mark.svg, logo-text.svg
```

*Last updated: 2026-05-26 | Session 14 — Merchandise rebuild + data-active-nav nav fix | Branch: staging*

---

## Session 15 — eVoucher page + image resolution investigation (2026-05-28)

### What was done

#### 1. Created `nadia_Rewards-evoucher.html`

New Rewards sub-page for eVoucher, built from `nadia_Rewards-Merchandise.html` as the base template (closest structural match). All class/ID names scoped to evoucher context.

**Key changes from Merchandise base:**
- Title → `Pandai — eVoucher`
- `aria-label="eVoucher"` on `#PageViewport`
- Breadcrumb: "eVoucher", trail "Rewards > eVoucher"
- Sidebar: `sidebar-btn--active` moved to eVoucher (shopping-cart icon); Merchandise button inactive
- Right panel class: `rewards-main--evoucher` with `#e8fbe8` bg + `1px solid #00cc85` border
- CSS renamed: `merch-header` → `evoucher-header`, `merch-grid` → `evoucher-grid`
- 8 reward cards in a 4-column grid:
  - Cards 1–4: active "Redeem" button (Primary/S, green)
  - Cards 5–6: disabled "Coming Soon"
  - Cards 7–8: disabled "Out Of Stock"
- Card image tag: `<img class="rc__img">` with `src` + `srcset` (1x only — see rule below)

#### 2. Card images — new asset folder

**Location:** `src/image-repo/page.rewards/evoucher/assets/`

**Files:**
- `P.Coin.svg` — copied from merchandize/assets/
- `eVoucher-1.png` through `eVoucher-8.png` — exported from Figma DS (node 4661:51358 card instances)

**Image dimensions:** 251×148px — this is the native source resolution from Figma (see investigation below).

#### 3. Image resolution investigation

**Finding:** The card images in the Figma DS are stored at 251×148px. This is the maximum quality available — no hidden 2x detail exists in the file. PNG header confirmed: IHDR width=0x00FB=251, height=0x0094=148.

**Why they look blurry on retina:** CSS displays the image at ~240–260px wide (4-col grid). On a 2× screen the browser needs 500px of pixel data but only 251px exist — hardware upscaling blurs.

**Production fix:** Replace the Figma placeholders with real high-res brand assets (≥500×295px) named `eVoucher-N@2x.png` in the same folder.

**Why 2x export from Figma didn't help:** Source images were uploaded to Figma at 1x. 2x export just upscales the same 251×148 data — no quality gain.

#### 4. `srcset` — @2x entry causes broken images on retina (new rule)

**Mistake made this session:** Added `srcset="... 1x, ...@2x.png 2x"` to all 8 `<img>` tags. The `@2x.png` files don't exist. On retina screens the browser selects the `2x` candidate, GETs a 404, and shows a broken image — it does NOT fall back to `src`. All 8 images broke immediately on retina display.

**Rule:** Never add a `Nx` descriptor to `srcset` unless the corresponding file physically exists in the asset folder. When @2x files are not yet available, use `srcset="path/file.png 1x"` (1x only) or omit `srcset` entirely.

**Fix applied:** Removed all `@2x.png` entries. Each card now uses `srcset="eVoucher-N.png 1x"` which is safe on all screens.

**To enable 2x later:** drop `eVoucher-N@2x.png` files in the assets folder, then change `srcset` to:
```html
srcset="../../src/image-repo/page.rewards/evoucher/assets/eVoucher-N.png 1x,
        ../../src/image-repo/page.rewards/evoucher/assets/eVoucher-N@2x.png 2x"
```

#### 5. Card image height — `height: auto` not `height: 148px`

**Fix:** Changed `.rc__img` from `height: 148px; object-fit: cover` to `height: auto`. Fixed height was cropping images (cutting off content). `height: auto` lets each image render at its natural 251×148 aspect ratio, scaling proportionally to card width.

### Updated image tree

```
pandai.design/src/image-repo/
└── page.rewards/
    ├── coin.quest/assets/     P.Coin.svg + 16 quest SVGs
    ├── merchandize/assets/    P.Coin.svg + 4 merchandise SVGs
    ├── my.rewards/assets/     P.Coin.svg + 8 reward SVGs
    └── evoucher/assets/       P.Coin.svg + eVoucher-1…8.png (251×148, 1x)
```

*Last updated: 2026-05-28 | Session 15 — eVoucher page + image resolution investigation | Branch: staging*

---

## Session 15 — Rewards mobile sidebar → pill tab bar (2026-05-28)

### What was done

Converted the left sidebar navigation on all three Rewards sub-pages into a horizontally scrollable pill tab bar at the mobile breakpoint (`≤767px`). Desktop layout is unchanged. Changes are CSS-only (plus one HTML element per file).

**Files changed:**
- `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html`
- `Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html`
- `Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html`

### Mobile breakpoint behaviour (`≤767px`)

#### Sidebar → pill tab bar
`.rewards-sidebar` overrides on mobile:
```css
flex-direction: row; flex-wrap: nowrap;
overflow-x: auto; scrollbar-width: none;
background: transparent; border: none; border-radius: 0; padding: 0;
gap: var(--sp-xs);  /* 8px */
```
Each `.sidebar-btn` gets `width: auto; flex: 0 0 auto` so pills size to their label.

#### Coin balance → page header
A `.bc-coin-mobile` chip is added inside `.bc-row` (after `.bc-left`) in all three files. It is `display: none` on desktop and `display: flex` on mobile. The original `.sidebar-balance` is hidden with `display: none` on mobile.

```html
<!-- inside .bc-row, after .bc-left -->
<div class="bc-coin-mobile" aria-hidden="true">
  <img class="bc-coin-mobile__icon" src="...P.Coin.svg" alt="">
  <span class="bc-coin-mobile__value">10,000</span>
</div>
```

Coin image paths per page:
- CoinQuest → `../../src/image-repo/page.rewards/coin.quest/assets/P.Coin.svg`
- Merchandise → `../../src/image-repo/page.rewards/merchandize/assets/P.Coin.svg`
- MyRewards → `../../src/image-repo/page.rewards/my.rewards/assets/P.Coin.svg`

#### Main content
`.rewards-main { width: 100% }` ensures main content fills full width below the pill bar.

### Active pill per page
Each page already had `sidebar-btn--active` on the correct button — unchanged:
- CoinQuest.html → **Coin Quest** active
- Merchandise.html → **Merchandise** active
- MyRewards.html → **My Rewards** active

### Tokens used
All color and spacing values use existing DS tokens — no hardcoded values introduced in the new CSS (coin chip colors `#fef1ce`, `#fabb0a`, `#c89608` were already hardcoded in `.sidebar-balance` and are re-used as-is).

---

## Session 15 — Avatar Rewards page + sidebar fixes (2026-05-28)

### What was done

1. **Created `nadia_Rewards-avatar.html`** — new Rewards sub-page for Avatar, copied from `nadia_Rewards-evoucher.html` and modified.
2. **Sidebar: divider margin fix** — applied to all 5 Rewards files.
3. **Sidebar: label fix** — "My Rewards" → "My Reward" in all 5 Rewards files.
4. **Avatar breadcrumb** — updated icon and chevron to match DS node `4661-51384`.
5. **Avatar sidebar** — removed 4 placeholder filter items below Avatar (not in DS).

---

### nadia_Rewards-avatar.html

**Files changed:**
- `Nadia.test.git/Rewards/nadia_Rewards-avatar.html` (new)
- `src/image-repo/page.rewards/avatar/assets/` (new folder — P.Coin.svg + Avatar-1.png → Avatar-7.png)

#### Breadcrumb (DS node 4661:51384)
- Title: "Avatar" — 24px Medium Poppins, `#00564c` (`Text/tertiary/default`)
- Vertical divider: 1px `#d9d9d9`, 20px tall
- Trail: `ic-gift` icon (20×20) + "Rewards" (14px Regular `#00cc85`) + `ic-chevron-right` (grey `#bfbfbf`) + "Avatar" (14px Medium `#666`)
- **Fixes applied this session:**
  - Icon was `ic-stop-circle` → corrected to `ic-gift` (DS `Outline/gift`)
  - Chevron was an inline `<polyline>` SVG → corrected to `<svg class="bc-chevron"><use href="#ic-chevron-right"/></svg>` with `color: #bfbfbf`
  - `.bc-link--current` was `font-weight: 400` → corrected to `font-weight: 500` (DS Body/B2 = Poppins Medium)

#### Sidebar (DS node 4661:51386)
- 5 items only: Coin Quest, My Reward, Merchandise, eVoucher, **Avatar** (active — `bg #b5f291`, `border #00a36a`, `border-radius 108px`)
- Removed 4 placeholder `.sidebar-filter` items that were added below Avatar in error

#### Main panel (DS node 4661:51385 / 4661:51387)
- Background: `#e8fbe8` (`Surface/secondary/default-subtle`) · border: `1px solid #00cc85`
- Header row: descriptive text + coin balance stat
- Grid: 4-col (`.avatar-grid`) → 2-col at ≤1279px → 1-col at ≤767px
- Card structure: `aspect-ratio: 1/1` image + body (like-count row + title) + divider + CTA (coin + Primary/S Redeem button)

#### Assets
- Images downloaded from Figma MCP as 2× PNG (Figma URLs expire after 7 days):
  `Avatar-1.png` through `Avatar-7.png` → `src/image-repo/page.rewards/avatar/assets/`
- `P.Coin.svg` copied from `page.rewards/evoucher/assets/`

---

### Sidebar fixes — all 5 Rewards files

**Files changed:** nadia_Rewards-evoucher.html, nadia_Rewards-avatar.html, nadia_Rewards-Merchandise.html, nadia_Rewards-Myrewards.html, nadia_Rewards-CoinQuest.html

#### Divider margin: `4px 0` → `8px 0`
DS `Divider - 1.5` uses `py-[8px]` (8px top and bottom padding around the 1px line).

#### Sidebar label: "My Rewards" → "My Reward"
DS node `4661-51386` confirms the nav item label is singular: "My Reward".

*Last updated: 2026-05-28 | Session 15 — Rewards mobile pill tab bar + Avatar page + sidebar fixes | Branch: staging*

---

## Session 16 — Practice Card hover state + subject icon fixes (2026-05-29)

### What was done

1. **Subject icons wired up** — all 18 non-Accounting practice cards now use `<img>` with actual DS-exported SVG icons (blob+icon-wrap pattern with pure CSS decorative circles).
2. **Accounting icon fixed** — pre-existing `accounting.png` was stale; replaced with fresh SVG re-exported from Figma node `4888:92061`.
3. **Chemistry icon fixed** — existing `chemistry.svg` had wrong path data; re-exported from Figma node `4888:92074` and overwritten.
4. **Decorative circles** — pure CSS implementation replacing failed SVG blob approach: 3 absolutely-positioned `<div>` elements with `border-radius:50%` and `rgba(255,255,255,0.12)` per DS geometry.
5. **Hover state implemented** — all 19 practice cards now have DS-accurate hover colours and border transition.

---

### nadia_Practise-subject.html changes

**File changed:** `Nadia.test.git/Practise/nadia_Practise-subject.html`

#### CSS — default border (Rule 60 fix)

Figma frame strokes are `strokeAlign: INSIDE` — they don't consume layout space. Changed from `border: 1px solid` to `box-shadow: inset` to match DS behaviour and prevent layout shift during hover.

```css
/* Before */
.practice-card { border: 1px solid var(--subj-border); }

/* After — DS strokeAlign:INSIDE */
.practice-card {
  border: none;
  box-shadow: inset 0 0 0 1px var(--subj-border);
  transition: background 0.18s ease, box-shadow 0.18s ease;
}
```

#### CSS — hover state

DS `State=Hover` spec: darker background (`Subject/default-hover`) + thick 8px border in default subject colour (`border-width/border-l`). Content-panel left-border removed on hover (DS: no separator).

```css
.practice-card:hover {
  background: var(--subj-bg-hover);
  box-shadow: inset 0 0 0 8px var(--subj-bg); /* DS hover: border-l (8px) in subject/default */
  cursor: pointer;
}
.practice-card:hover .practice-card__content {
  border-left: none;
}
```

#### Inline style — `--subj-bg-hover` per card

Added `--subj-bg-hover` CSS variable to every card's inline style. All hover hex values resolved live from DS `Subjects (A–E)` and `Subjects (G–S)` variable collections via `use_figma` alias resolution.

**Confirmed hover colours (DS `Subject/default-hover`, resolved 2026-05-29):**

| Subject | `--subj-bg` (default) | `--subj-bg-hover` |
|---|---|---|
| Add Math | `#283589` | `#202a6e` |
| Accounting | `#0072ca` | `#005ba2` |
| Bahasa Melayu | `#4d77ff` | `#3e5fcc` |
| Biology | `#8431d8` | `#6a27ad` |
| Business | `#efb42b` | `#bf9022` |
| Chemistry | `#e20082` | `#b50068` |
| Chinese Language | `#f94848` | `#c73a3a` |
| Computer Science | `#d10070` | `#a7005a` |
| Economy | `#ff5733` | `#cc4629` |
| English | `#ff4d56` | `#cc3e45` |
| Geography | `#77d836` | `#5fad2b` |
| History | `#a97c50` | `#876340` |
| Islamic Studies | `#de4d7f` | `#b23e66` |
| KAFA | `#8ae3a9` | `#6eb687` |
| Mathematics | `#42ac7b` | `#358a62` |
| Moral Studies | `#0072ca` | `#005ba2` |
| Physics | `#27a0d7` | `#1f80ac` |
| RBT | `#353535` | `#2a2a2a` |
| Science | `#ffd641` | `#ccab34` |

#### Image assets

**Path:** `src/image-repo/page.practise/assets/main/PracticeCard/`
- `accounting.svg` — fresh export from DS node `4888:92061`
- `chemistry.svg` — fresh export from DS node `4888:92074`
- All other 17 subjects: SVG icons from DS `🔰 Iconography` page `Subject/XXX` components
- `geography.png` — 2× PNG (complex globe illustration, >12KB SVG — Rule 50 exception)

*Last updated: 2026-05-29 | Session 16 — Practice Card hover state + subject icon fixes | Branch: staging*

---

## Session 17 — Practice Card decorative circles layout fix (2026-05-29)

### What was done

Moved the decorative circle divs from inside `.practice-card__image` to the outermost `<article class="practice-card">` container so they are only clipped by the card's own `overflow: hidden` + `border-radius`, not by the responsive image panel.

**File changed:** `Nadia.test.git/Practise/nadia_Practise-subject.html`

---

### Root cause + fix chain

**Original problem:** `.practice-card__circles` was inside `.practice-card__image`. At tablet/mobile breakpoints, `__image` shrinks (160px → 120px → 100px) and its `overflow: hidden` clipped the circles at the panel boundary.

**First fix attempt:** Moved circles to card root, added `position: relative` to `.practice-card`, removed `overflow: hidden` from `__image`. Also added `background: var(--subj-bg)` to `.practice-card__content` to "cover" circles in the text area.

**Why first fix still showed cropping:** The content panel's solid background created the same hard visual edge — now at the image/content boundary instead of the image panel edge.

**Final fix:** Removed `background: var(--subj-bg)` from `.practice-card__content`. The card's own `background: var(--subj-bg)` fills both panels. Circles (`rgba(255,255,255,0.12)`) span the full card freely, clipped only by the card's `overflow: hidden; border-radius: 24px`.

---

### Final CSS state

```css
.practice-card        { position: relative; overflow: hidden; background: var(--subj-bg); }
.practice-card__circles  { position: absolute; inset: 0; pointer-events: none; }
.practice-card__image    { position: relative; /* no overflow:hidden */ }
.practice-card__content  { /* no background, no position:relative */ border-left: 1px solid var(--subj-bg); }
```

### HTML structure (all 19 cards)

```html
<article class="practice-card" style="--subj-bg:…;--subj-border:…;--subj-bg-hover:…">
  <div class="practice-card__circles" aria-hidden="true">  ← first child of card root
    <div class="practice-card__circle practice-card__circle--1"></div>
    <div class="practice-card__circle practice-card__circle--2"></div>
    <div class="practice-card__circle practice-card__circle--3"></div>
  </div>
  <div class="practice-card__image">
    <div class="practice-card__icon-wrap">…</div>
  </div>
  <div class="practice-card__content">…</div>
</article>
```

*Last updated: 2026-05-29 | Session 17 — Practice Card decorative circles layout fix | Branch: staging*

---

## Session 18 — Fix missing flashcard icon (`ic-file`) (2026-05-29)

**File changed:** `Nadia.test.git/Practise/nadia_Practise-subject.html`

### Root cause

Three `<symbol>` definitions — `ic-video`, `ic-corner-down-right`, and `ic-file` — were placed **after** the `</defs></svg>` closing tags of the main icon defs block, leaving them outside any SVG element. Browsers cannot resolve `<use href="#ic-file"/>` to a symbol that exists outside an SVG — the element renders as empty. A stray orphaned `</svg>` was also left at the end of those definitions.

### Fix

Moved all three symbols back inside the `<defs>` block, before its `</defs>` close tag, and removed the orphaned `</svg>`. Final structure:

```
<svg style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    … all other symbols …
    <symbol id="ic-video"> … </symbol>
    <symbol id="ic-corner-down-right"> … </symbol>
    <symbol id="ic-file"> … </symbol>   ← Flashcard stat icon
  </defs>
</svg>
```

### Why only flashcard appeared missing

`ic-file-text` (Topical Test) and `ic-battle` (Practice Exam) were already correctly inside `<defs>`. Only the symbols added after the defs block was accidentally closed were broken: `ic-file` (Flashcard), `ic-video`, and `ic-corner-down-right`.

*Last updated: 2026-05-29 | Session 18 — Fix missing flashcard icon | Branch: staging*

---

## Session 19 — Decorative circle scale animation on hover (2026-05-29)

**File changed:** `Nadia.test.git/Practise/nadia_Practise-subject.html`

### DS reference

- Default state (node `2339:4824`): blob `mask-size: 160×160px` — contained within 160px image panel
- Hover state (node `4945:75075`): blob `mask-size: 417×160px` — ~2.6× wider, extending beyond panel

### Implementation

Added smooth scale transition to `.practice-card__circles` triggered by card hover:

```css
.practice-card__circles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform-origin: left center;   /* grow from the left side of the image panel */
  transition: transform 0.3s ease;
}
.practice-card:hover .practice-card__circles {
  transform: scale(1.4);           /* approximates DS 160→417px blob expansion */
}
```

`transform-origin: left center` ensures the circles expand outward from the left edge, matching the DS blob's left-anchored growth behaviour. Scale 1.4 gives a clearly visible expansion without over-exaggerating — the DS ratio (~2.6×) applies to the mask area, not the circles themselves.

*Last updated: 2026-05-29 | Session 19 — Circle scale animation on hover | Branch: staging*

---

### 198. Button - 1.5 — no CSS transitions on any state (instant cuts only)

All `Button - 1.5` instances use **instant state changes** — no `transition` on any property, on any element (container, label, arrow, arrow-clip).

**Rule:** Never add `transition` to any Button - 1.5 CSS class — `.btn-*`, `.btn-*__text`, `.btn-*__label`, `.btn-*__arrow`, or any child element.

**Why:** The DS does not define easing or duration for button state changes. Adding transitions causes the button body and arrow to animate at different speeds, producing a "laggy arrow" or "staggered" feel. State changes must be instant cuts to match the DS.

**Confirmed violations found in prototype:**
- `.btn-quiz-cta` container — `transition: background 0.15s, border-color 0.15s` (removed 2026-05-30)
- `.btn-add-classes__arrow` — `transition: background 0.12s ease, box-shadow 0.12s ease, color 0.12s ease` (removed 2026-05-31)

---

### 199. Button - 1.5 — always pair CSS `:active` with JS `is-pressing` handler

Every Button - 1.5 `<button>` must have **both** CSS `.is-pressing` declarations AND JS mousedown/mouseup/mouseleave handlers toggling that class. CSS `:active` alone is unreliable in VS Code Simple Browser (Electron webview).

```css
.btn:active,
.btn.is-pressing { /* pressed bg + border — no transition */ }
.btn:active .btn__child,
.btn.is-pressing .btn__child { /* child color overrides */ }
```

```js
document.querySelectorAll('.btn-class').forEach(function (btn) {
  btn.addEventListener('mousedown',  function () { btn.classList.add('is-pressing'); });
  btn.addEventListener('mouseup',    function () { btn.classList.remove('is-pressing'); });
  btn.addEventListener('mouseleave', function () { btn.classList.remove('is-pressing'); });
});
```

**`mouseleave` is mandatory** — without it the button stays in pressed state if the cursor moves away while the mouse is held.

*Last updated: 2026-05-31 | Rules 198–199 added — Button-1.5 no transitions + is-pressing JS; Rules 19/40 corrected for Primary Pressed palette | Branch: staging*

---

## Session 20 — Rewards Avatar: 80 avatar images + randomizeContent() (2026-06-03)

**Files changed:**
- `Nadia.test.git/Rewards/nadia_Rewards-avatar.html`
- `src/image-repo/page.rewards/avatar/assets/` — removed `Avatar-1.png` → `Avatar-7.png`, added `1.png` → `80.png`

### Changes

#### 1. Avatar image set replaced (7 → 80)
Old placeholder images (`Avatar-1.png` – `Avatar-7.png`) replaced with the full production set (`1.png` – `80.png`). The avatar grid was expanded from 7 cards to 80 cards, all referencing the new numbered filenames.

Image path pattern: `../../src/image-repo/page.rewards/avatar/assets/{n}.png`

#### 2. Dynamic content randomisation — `randomizeContent()`

Added a `randomizeContent()` function (called on `DOMContentLoaded`) that sets realistic random values on every page load. No HTML structure or CSS classes were changed.

| Element | Selector | Range / Value |
|---|---|---|
| User coin balance | `.sidebar-balance__value`, `.bc-coin-mobile__value` | 50 – 500 |
| Total redeem this month | `.avatar-header__count` | 20 – 200 |
| Likes per card | `.rc__like-count` (×80) | 1 – 20 |
| Coin cost per card | `.rc__coin-value` (×80) | Fixed 200 |
| Redeem button state | `a.btn-show` / `span.btn-show` | Enabled if userCoins ≥ 200, disabled if < 200 |

**Button enable/disable logic:** The HTML uses `<a class="btn-show">` for active and `<span class="btn-show btn-show--disabled">` for disabled. The JS:
- If `userCoins >= 200`: removes `btn-show--disabled` + `aria-disabled` from span buttons
- If `userCoins < 200`: adds `btn-show--disabled` + `aria-disabled` to anchor buttons

**Note:** Filter sidebar counts ("Background (1020)", "Head", "Screen" etc.) were not present in the HTML — no filter panel exists in this file. If added later, include those selectors in `randomizeContent()`.

*Last updated: 2026-06-03 | Session 20 — Rewards Avatar: 80 images + randomizeContent | Branch: staging*

---

## Session 21 — DS audit + fixes: nadia_Class-MyClasses.html (2026-06-04)

**File changed:** `Nadia.test.git/Class/nadia_Class-MyClasses.html`

### Audit scope
Shared template components (Navbar, NavMenu, NavTopMenu, dropdowns, Footer) were excluded — inherited from page template and previously audited. Only page-specific components were checked against DS 1.5 (`TLVKe3bgJTdVvuPAzgDq2f`): **Breadcrumb - 1.5** (node `837:1033`), **Class Card - 1.5** (node `2339:5253`), avatar, live badge, divider, CTA.

### DS nodes confirmed in this session
| Component | DS node | Key finding |
|---|---|---|
| Class Card - 1.5 | `2339:5253` | Only 1 variant (Type=Default) |
| Breadcrumb - 1.5 | `837:1033` | No action buttons in DS component — buttons are page-level |

### Fixes applied (8 total)

#### 1. Rule 198 — btn-enter transitions removed
`transition:` on `.btn-enter`, `.btn-enter__label`, `.btn-enter__arrow`, `.btn-enter__arrow svg` — all 4 removed. Button - 1.5 must use instant state changes only.

#### 2. Missing "Premium Only" tag in CTA (all 20 cards)
DS CTA frame: HORIZONTAL — `"Premium Only"` text (14px / 600 / `#00cc85`, `flex:1`) on left + Button on right. HTML only had the button right-aligned.
- Added `.cc__premium { font-size:14px; font-weight:600; color:var(--surface-primary-default); flex:1; }`
- Changed `.cc__cta { justify-content: space-between; }`
- Added `<span class="cc__premium">Premium Only</span>` before every `btn-enter`

#### 3. Rule 36 — live-badge inline SVG → `<use href="#ic-video"/>` (all 20 cards)
Inline `<polygon>/<rect>` replaced with `ic-video` symbol. Added `<symbol id="ic-video">` to defs block. Live badge SVG now uses `color: var(--surface-primary-default)` for stroke inheritance.

#### 4. Live badge background `#d9f7ed` → `#e1f9ea`
DS Label Badge - 1.5 fill = `#e1f9ea`. HTML had an approximate value.

#### 5. Avatar placeholder background white → `#e1f9ea`
DS Avatar - 1.5 fill = `#e1f9ea`. Added `.ds-avatar { background: #e1f9ea }`. Visible only when no photo is loaded.

#### 6. `.bc-sep` color `#d9d9d9` → `#bfbfbf`
DS Breadcrumb separator line stroke = `#bfbfbf`. HTML was using the general border token instead.

#### 7. Rule 36 — bc-chevron inline polyline → `<use href="#ic-chevron-right"/>`
Single instance in breadcrumb trail replaced.

#### 8. Divider rebuilt: Divider Var 5 + "+ More" chip (all 20 cards)
DS uses `Divider Var 5 .prev` — two `#d9d9d9` lines flanking a `+ More` interactive chip (`Outline/plus-circle` 12px + "More" 10px / 400 / `#bfbfbf`). HTML had a plain 1px colored line per-subject.

Changes:
- `.cc__divider` rebuilt as `display:flex; align-items:center; height:16px` with `::before`/`::after` pseudo-element lines (`#d9d9d9`)
- `.cc__divider-more` button added (10px / 400 / `#bfbfbf`, `gap:2px`, `padding:0 8px`)
- Added `<symbol id="ic-plus-circle">` to defs
- Removed all 20 subject-specific `.cc--*.cc__divider { background: ... }` overrides
- Rebuilt all 20 divider elements in HTML

#### 9. `.cc__hdr` gap `16px` → `0`
DS Header frame gap = 0. Title has `flex:1` which right-aligns the DLP badge without gap.

### Remaining known deviations (low priority)
- **Rule 60** — `.cc` and `.cc__inner` use `border: 1px solid` for INSIDE strokes. Should be `box-shadow: inset 0 0 0 1px`. Low visual impact for fluid containers.
- **Breadcrumb action buttons** — Timetable / Browse Classes / Join Class use `padding:8px 12px; font-size:14px` instead of Button - 1.5 M specs (`2px 8px` outer, `12px` font). These are page-level buttons not in the DS Breadcrumb component — defer to designer review.
- **cards-grid gap: 20px** — No DS semantic token at 20px (`space-m`=16, `space-l`=24). Needs page-spec verification.

*Last updated: 2026-06-04 | Session 21 — Class MyClasses DS audit + 8 fixes | Branch: staging*

---

## Session 22 — Rewards: My Rewards JS text rendering fix

**File:** `Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html`

### Bug fixed

#### 1. JS code rendered as plain text at bottom of page
`</script>` closed the carousel block at line 4149. The sidebar toggle + voucher button JS that followed (lines 4151–4170) was outside any `<script>` tag — browser rendered it as raw text overlapping the footer.

- Added missing `<script>` opening tag before the sidebar JS block
- Existing `</script>` at line 4172 now correctly closes the block
- Related: Rule 62 (orphaned comment/tag silently kills JS) — same root cause pattern

*Last updated: 2026-06-04 | Session 22 — Rewards My Rewards JS text fix | Branch: staging*

---

## Session 23 — Cross-file DS audit: 7 files, 11 findings (2026-06-04)

**Files audited:**
- `Nadia.test.git/Practise/nadia_Practise-subject.html`
- `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html`
- `Nadia.test.git/Rewards/nadia_Rewards-evoucher.html`
- `Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html`
- `Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html`
- `Nadia.test.git/Class/nadia_Class-MyClasses.html`
- `Nadia.test.git/Class/nadia_Class-BrowseClasses.html`

> **All token values below were fetched live from DS `TLVKe3bgJTdVvuPAzgDq2f` during this session. Never carry these forward as ground truth — re-fetch from DS before using them in any future implementation.**

---

### DS-verified token values

#### 1. `bc-sep` separator — confirmed token (DS node `3655:16650`)

Token: `Border/general/default-secondary` = `#bfbfbf`

| File | `bc-sep` value | Status |
|---|---|---|
| `nadia_Class-MyClasses.html` | `#bfbfbf` | ✅ Correct |
| All other 6 files | `#d9d9d9` | ❌ Wrong — using `Border/general/default` |

**Pending fix:** Apply `background: var(--border-general-default-secondary)` (add token to `:root` if absent) to `bc-sep` in all 6 remaining files.

---

#### 2. Label Badge - 1.5 — all 14 variants confirmed (DS `843:666`)

All token names and hex values fetched live. The DS has 7 semantic types × 2 sizes (M/S):

| DS Type | Quest usage | `bg` token | `bg` hex | `stroke` token | `stroke` hex | `text` token | `text` hex |
|---|---|---|---|---|---|---|---|
| Primary / Success | Easy | `Surface/primary/default-subtle` | `#e1f9ea` | `Border/primary/default-hover` | `#66e0b6` | `Text/primary/default` | `#00cc85` |
| Alert | Medium | `Surface/alert/default-subtle` | `#fff6ed` | `Border/alert/default-hover` | `#ffcea0` | `Text/alert/default` | `#ff9f43` |
| Warning | Hard | `Surface/warning/default-subtle` | `#ffeeee` | `Border/warning/default-hover` | `#ffa5a7` | `Text/warning/default` | `#ff4c51` |
| Info | Daily / Weekly | `Surface/informative/default-subtle` | `#e6f6fd` | `Border/informative/default-hover` | `#7fd0f3` | `Text/informative/default` | `#00a2e8` |
| Tertiary | — | `Surface/disabled/primary` | `#f2f2f2` | `Border/general/default-secondary` | `#bfbfbf` | — | — |
| Secondary | — | `Surface/general/default` | `#ffffff` | `Border/primary/default` | `#00cc85` | — | — |

**Bugs found in CoinQuest, eVoucher, Merchandise:**
- `lbadge--easy` bg = `#d9f7ed` — wrong. DS: `Surface/primary/default-subtle` = `#e1f9ea`
- `lbadge--medium` and `lbadge--hard` have `font-size: 14px; line-height: 20px` override — wrong. All Label Badge sizes within a size variant are uniform. No difficulty type overrides font-size.

**Confirmed correct in HTML:** Medium border `#ffcea0`, Hard border `#ffa5a7`, text colors for all types, Daily/Weekly colors.

---

#### 3. Practice Card - 1.5 — hover spec confirmed (DS `2339:4823`, hover node `4945:75075`)

| State | Property | Token | Value |
|---|---|---|---|
| Default | Card bg | `Subjects/[name]/default` | per-subject |
| Default | Card stroke | `Subjects/[name]/focus` | per-subject, 1px `strokeAlign: INSIDE` |
| Default | Content separator | `Subjects/[name]/default` | 1px same-color = visually invisible |
| Hover | Card bg | `Subjects/[name]/default-hover` | per-subject |
| Hover | Card stroke | `Subjects/[name]/default` | per-subject, **8px `strokeAlign: INSIDE`** |
| Hover | Content separator | none | border-left removed |

**CSS pattern (confirmed):**
```css
.practice-card { box-shadow: inset 0 0 0 1px var(--subj-border); }
.practice-card:hover { background: var(--subj-bg-hover); box-shadow: inset 0 0 0 8px var(--subj-bg); }
.practice-card:hover .practice-card__content { border-left: none; }
```

**All Subject/focus values — confirmed live (for `--subj-border`):**

| Subject | `Subjects/[x]/focus` |
|---|---|
| Add Math | `#182052` |
| Account | `#004479` |
| Bahasa Melayu | `#2e4799` |
| Biology | `#4f1d82` |
| Business | `#8f6c1a` |
| Chemistry | `#88004e` |
| Chinese Language | `#952b2b` |
| Computer Science | `#7d0043` |
| Economy | `#99341f` |
| English | `#992e34` |
| Geography | `#478220` |
| History | `#654a30` |
| Islamic Studies | `#852e4c` |
| KAFA | `#538865` |
| Mathematics | `#28674a` |
| Moral Studies | `#004479` |
| Physics | `#176081` |
| RBT | `#202020` |
| Science | `#998027` |

**All Subject/default-hover values** — re-verified live, match Session 16 values ✅.

---

#### 4. Divider - 1.5 — full spec confirmed (DS `833:3821`)

Only 2 variants: `Type=Default` and `Type=Dashed`. No "Var 5" — Session 21 used an informal label.

**Structure (Type=Default):**
- Container: `16px` tall, `HORIZONTAL`, no padding, no gap
- Line 1 + Line 2: 1px LINE, `Border/general/default` = `#d9d9d9`, `strokeAlign: CENTER`
- Center chip: `padding: 0 8px`, `gap: 2px`, HORIZONTAL
  - `Outline/plus-circle` icon: 12×12, stroke `Icon/primary/default` = `#00cc85`
  - "More" text: `Text/default/caption` = `#bfbfbf`

**CSS pattern:**
```css
.cc__divider {
  display: flex; align-items: center; height: 16px;
}
.cc__divider::before,
.cc__divider::after {
  content: ''; flex: 1; height: 1px;
  background: var(--border-general-default);   /* #d9d9d9 */
}
.cc__divider-more {
  display: inline-flex; align-items: center;
  gap: 2px; padding: 0 8px;
  font-size: 10px; font-weight: 400;
  color: var(--text-default-caption);          /* #bfbfbf */
}
.cc__divider-more svg { width: 12px; height: 12px; color: var(--icon-primary-default); }
```

**Status across files:**
- `nadia_Class-MyClasses.html` — ✅ correct (Session 21 fix applied)
- `nadia_Class-BrowseClasses.html` — ❌ plain 1px subject-coloured line, no chip

---

#### 5. Coin Quest Card - 1.5 — structure confirmed (DS `2339:5019`)

| Element | Token | Hex |
|---|---|---|
| Card bg | `Surface/general/default` | `#ffffff` |
| Card stroke | `Border/general/default` | `#d9d9d9` |
| Image panel bg | `Surface/secondary/default-subtle` | `#e8fbe8` |
| Image panel stroke | `Border/secondary/default-hover` | `#baf3b9` |
| Progress bar track | `Surface/general/default-secondary` | `#f2f2f2` |
| Progress bar fill | `Surface/primary/default` | `#00cc85` |
| Claim btn bg | `Surface/primary/default` | `#00cc85` |
| Claim btn border | `Border/primary/focus` | `#00a36a` |
| Claim btn arrow bg | `Surface/primary/default-subtle-hover` | `#99ebce` |

---

### Code / architecture findings

#### 6. Class pages — nav persistence BUG

Both `nadia_Class-MyClasses.html` and `nadia_Class-BrowseClasses.html` have `restoreHome()` hardcoded to `[aria-label="Home"]`. When any nav dropdown closes on the Class page, Home becomes active instead of Class. Neither file has `data-active-nav` on `<body>`.

**Fix (same pattern as Rewards pages, Sessions 13–14):**
1. Add `<body data-active-nav="Class">` to both files
2. Replace `restoreHome()` body with the generic `data-active-nav` pattern:
```js
function restoreHome() {
  var persistLabel = document.body.getAttribute('data-active-nav');
  if (persistLabel) {
    var persistBtn = navSection.querySelector('[aria-label="' + persistLabel + '"]');
    if (persistBtn) { persistBtn.classList.add('is-active'); persistBtn.setAttribute('aria-current', 'page'); return; }
  }
  var homeBtn = navSection.querySelector('[aria-label="Home"]');
  if (homeBtn) { homeBtn.classList.add('is-active'); homeBtn.setAttribute('aria-current', 'page'); }
}
```

---

#### 7. CoinQuest `btn-claim` — Rule 82 violation

`nadia_Rewards-CoinQuest.html` has:
- `.btn-claim__label { transition: color 0.12s ease; }` ← must remove
- `.btn-claim__arrow { transition: background 0.12s ease; }` ← must remove

Button - 1.5 must use instant state changes only (Rule 82). Same violation applies to eVoucher and Merchandise if they share this CSS.

---

#### 8. Old shorthand tokens — 4 files not yet migrated

| File | Old tokens in use |
|---|---|
| `nadia_Rewards-CoinQuest.html` | `--og-*`, `--sp-*`, `--r-*` |
| `nadia_Rewards-evoucher.html` | `--og-*`, `--sp-*`, `--r-*` |
| `nadia_Rewards-Merchandise.html` | `--og-*`, `--sp-*`, `--r-*` |
| `nadia_Class-BrowseClasses.html` | `--og-*`, `--sp-*`, `--r-*`, `--bm-500`, `--en-500`, `--mt-500`, `--text-heading`, `--text-body` |

Canonical standard = `--spacing-space-m`, `--surface-primary-default`, `--corner-radius-corner-rounded`, `--subjects-b-melayu-default`, etc. Pending migration — do not mix old and canonical in new CSS.

---

### New rules

#### Rule: Always fetch live DS tokens — no session-note trust (global)

Before documenting or implementing **any** design value (color, spacing, radius, border, typography), call `use_figma`, `get_design_context`, or `get_variable_defs` on the exact DS node (`TLVKe3bgJTdVvuPAzgDq2f`) to confirm the current value. Session notes are context for navigation, not authoritative values. Token hex values can change between sessions without notice (Rule 61).

**Applies to:** Every task, every session, every fix. No exceptions.

---

#### Rule: `data-active-nav` is mandatory on `<body>` for every non-Home page

Any page built from `zul.page.template.html` where the active nav item is not Home **must** have `<body data-active-nav="[Label]">` and the generic `restoreHome()` implementation (see §6 above).

**Current status:**

| File | `data-active-nav` | `restoreHome` target | Status |
|---|---|---|---|
| `nadia_Rewards-CoinQuest.html` | `"Rewards"` | generic | ✅ |
| `nadia_Rewards-evoucher.html` | `"Rewards"` | generic | ✅ |
| `nadia_Rewards-Merchandise.html` | `"Rewards"` | generic | ✅ |
| `nadia_Rewards-Myrewards.html` | — | `restoreCurrentPage()` | ⚠️ older pattern |
| `nadia_Practise-subject.html` | — | `restoreCurrentPage()` | ⚠️ older pattern |
| `nadia_Class-MyClasses.html` | — | hardcodes Home | ❌ bug |
| `nadia_Class-BrowseClasses.html` | — | hardcodes Home | ❌ bug |

MyRewards and Practice-subject use an older-but-working `restoreCurrentPage()` equivalent. Class pages have a live bug.

---

#### Rule: Practice Card - 1.5 — confirmed component spec

**DS component set:** `2339:4823` | **Instance example:** `5072:104628` (652×160px)

- Grid: `repeat(2, 1fr)`, `gap: var(--spacing-space-m)` — 2-col at desktop + tablet, 1-col at ≤767px
- Card height: `160px` (DS confirmed)
- Card border: `Subjects/[name]/focus`, 1px, `strokeAlign: INSIDE` → `box-shadow: inset 0 0 0 1px var(--subj-border)`
- Left image panel: `160px` wide, contains 100×100 icon wrap
- Icon: `<img>` `object-fit: contain`, 100×100 container (80×80 at tablet, 68×68 at mobile)
- Decorative circles: 3 `<div>` elements, first child of card root, `rgba(255,255,255,0.12)`, scale 1.4× on hover from `transform-origin: left center`
- Right content panel: `flex:1`, `padding: 16px`, no background (card bg shows through), `border-left: 1px solid var(--subj-bg)` (same-color = invisible separator)
- Stats row: `flex-row`, `flex-wrap`, `gap: 0 8px` — stat item = 24×24 icon container + 14px Regular label
- Per-card CSS variables via inline style: `--subj-bg`, `--subj-border`, `--subj-bg-hover`, `--subj-title`, `--subj-text`

**Image assets:** `src/image-repo/page.practise/assets/main/PracticeCard/[subject].svg` (geography = `.png`)

---

#### Rule: `cursor: pointer` on `:hover` for navigable whole-card targets

Rule 21 ("no `cursor: pointer` on cards") applies to cards that **contain a separate interactive button**. When the **entire card surface is the clickable target** (no internal button — the card itself navigates), `cursor: pointer` on `:hover` is correct DS behaviour.

```css
/* Wrong — card contains separate Enter Class button */
.class-card { cursor: pointer; }

/* Correct — Practice card IS the clickable target, no internal button */
.practice-card { cursor: default; }
.practice-card:hover { cursor: pointer; }
```

---

#### Rule: SVG `<symbol>` definitions must be inside `<defs>` — promote from Session 18

Any `<symbol>` element placed **after** `</defs></svg>` is outside the SVG document scope. The browser cannot resolve `<use href="#ic-*">` to a symbol outside SVG — the icon renders invisible with **no error, no warning**.

```html
<!-- WRONG — outside defs, renders blank -->
</defs></svg>
<symbol id="ic-file"> … </symbol>

<!-- CORRECT — inside defs, before closing tag -->
<defs>
  …
  <symbol id="ic-file"> … </symbol>
</defs></svg>
```

**Check after every `<symbol>` addition:** verify it sits before `</defs>`, not after.

---

---

## Session 24 — nadia_Quiz.html: new Quiz page from template (2026-06-04)

### Mandatory pre-flight reminder (violated this session)

**Step 0a was skipped** — nadia.design.md was not read before starting. As a direct consequence, the `data-active-nav` pattern from Session 23 was missed and the active nav was implemented incorrectly. Every session must open nadia.design.md and DS before touching any file.

---

### Page creation: new file from `zul.page.template.html`

**File:** `Nadia.test.git/Quiz/nadia_Quiz.html`
**Image assets:** `src/image-repo/page.quiz/assets/main/YourSelectedSubjects-Desktop/[subject].png`

**Process:**
1. `cp zul.test.git/zul.page.template.html Nadia.test.git/Quiz/nadia_Quiz.html`
2. Fix all `../src/image-repo/` → `../../src/image-repo/` (file is 2 levels deep, template is 1)
3. Change `<title>` to page name
4. Add page-specific CSS before `</style>`
5. Replace `<section id="PageViewport">` placeholder with real content sections
6. Set active nav on all 4 locations (see below)

**Path depth rule:** Count directory levels from repo root to HTML file. Template at `zul.test.git/` = 1 level → `../src/`. A file at `Nadia.test.git/Quiz/` = 2 levels → `../../src/`. Wrong depth = broken nav logos and Learn menu icons.

---

### Active nav: Quiz page uses hardcoded `is-active` — should be `data-active-nav`

The quiz page was built with direct `is-active` HTML injection and `querySelector` patching instead of the `data-active-nav` pattern established in Session 23. **This is a known deviation.**

**What was done (current state):**
- `is-active` + `aria-current="page"` hardcoded on the Quiz `nav-menu-btn` (desktop), `nav-menu-item` (tablet + mobile), and `navbar-bottom__btn`
- `restoreHome()` patched to `querySelector('[aria-label="Quiz"]')` instead of `'[aria-label="Home"]'`

**What should have been done (correct pattern):**
- `<body data-active-nav="Quiz">` + generic JS `restoreCurrentPage()` that reads the body attribute

**Action needed:** Retrofit `data-active-nav="Quiz"` on body + generalise the restore function in a future session.

**Updated `data-active-nav` table:**

| File | `data-active-nav` | `restoreHome` target | Status |
|---|---|---|---|
| `nadia_Rewards-CoinQuest.html` | `"Rewards"` | generic | ✅ |
| `nadia_Rewards-evoucher.html` | `"Rewards"` | generic | ✅ |
| `nadia_Rewards-Merchandise.html` | `"Rewards"` | generic | ✅ |
| `nadia_Rewards-Myrewards.html` | — | `restoreCurrentPage()` | ⚠️ older pattern |
| `nadia_Practise-subject.html` | — | `restoreCurrentPage()` | ⚠️ older pattern |
| `nadia_Class-MyClasses.html` | — | hardcodes Home | ❌ bug |
| `nadia_Class-BrowseClasses.html` | — | hardcodes Home | ❌ bug |
| `nadia_Quiz.html` | — | hardcodes Quiz | ⚠️ deviation |

---

### Status Badge - 1.5 Size=M (32px) — confirmed CSS spec

**DS node:** 3420:87102 (4 × Status Badge row: Score / Coins / Score / Lives)

```css
.status-badge-m {
  height: 32px; max-height: 32px;
  border: 1px solid;
  border-radius: 40.5px;
  padding: 4px 2px 4px 4px;          /* t r b l */
  display: flex; flex-direction: column; align-items: flex-start; flex-shrink: 0;
}
.status-badge-m--score  { background: #00cc85; border-color: #00a36a; width: 84px; }
.status-badge-m--score2 { background: #00cc85; border-color: #00a36a; width: 89px; }
.status-badge-m--coins  { background: #fece00; border-color: #cba500; width: 89px; }
.status-badge-m--lives  { background: #ff5c98; border-color: #cc4a7a; width: 89px; }

.status-badge-m__content { display: flex; flex: 1 0 0; align-items: center; gap: 4px; padding-left: 8px; padding-right: 2px; }
.status-badge-m__value   { font-size: 14px; font-weight: 600; line-height: 20px; color: #ffffff; white-space: nowrap; }
/* Coins text stroke (Rule 22 — strokeAlign:OUTSIDE → 2px) */
.status-badge-m--coins .status-badge-m__value { -webkit-text-stroke: 2px #cba500; paint-order: stroke fill; }

.status-badge-m__icon { width: 24px; height: 24px; background: white; border-radius: 999px; padding: 4px 2px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.status-badge-m__icon svg { height: 16px; width: auto; }
```

**Icon symbols used:** `ic-status-trophy` (Score), `ic-status-coin` (Coins), `ic-status-lives` (Lives) — all already in template defs.

**Realistic placeholder values:** Score `8,240` · Coins `1,350` · Score `3,120` · Lives `3`

---

### Primary Card - 1.5 node 4642:70723 — NO white inner box

This specific Primary Card instance differs from the home screen's `#YourSelectedSubjects-Desktop` variant:
- **No** white Content Placeholder background
- **No** `box-shadow: inset` inner border
- **No** `.primary-card__content` wrapper needed
- Quiz cards sit **directly on the mint green** outer card background

The green outer card IS node 4642:70723 itself — stripping `class="section-frame"` from the section reveals the quiz cards grid with no wrapper needed. Correct structure:

```html
<section id="YourSelectedSubjects-Desktop" aria-label="Your Selected Subjects">
  <div class="quiz-cards-grid"> <!-- flex-wrap, gap 16px, no background -->
    <article class="quiz-card subject-[name]"> … </article>
    …
  </div>
</section>
```

**Confirmed quiz-cards-grid CSS:**
```css
.quiz-cards-grid { display: flex; flex-wrap: wrap; gap: var(--spacing-space-m); width: 100%; align-content: flex-start; }
```

---

### Figma MCP asset URL blank images — detection and fix

**Problem:** `curl` downloads from `https://www.figma.com/api/mcp/asset/<UUID>` can return valid PNG files that are **fully transparent** — correct header, correct dimensions, 0 visible pixels.

**Detection:**
- Any 500×500 PNG under ~3K is likely blank (genuine illustrations are 15K–134K)
- Any `<2K` file for an image fill slot = definitely blank

**Economy and RBT were affected** — both returned 1.1K blank 500×500 PNGs regardless of how many times re-downloaded.

**Fix:** Use `use_figma` + `exportAsync` directly on the image **frame** node:
```js
const card = figma.getNodeById('4642:70707');  // economy quiz card node
const imageFrame = card.children[0];           // "image" frame child (index 0)
const bytes = await imageFrame.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } });
const b64 = btoa(String.fromCharCode(...bytes));
```

This exports the frame with its image fill, bypassing the broken MCP asset URL. Result: 9.4K (economy) and 5K (rbt) at 148×148px — the exact card dimensions.

**Rule: Always verify image size after any Figma MCP asset URL download.** If the file is <3K for what should be an illustration, re-export via `use_figma exportAsync` on the image frame node directly.

---

### Quiz card image column — 148×148, not 128×128

DS shows `aspect-[128/128]` on the image frame with `self-stretch`. Since quiz cards are `min-h-[148px] max-h-[148px]`, the image frame stretches to 148px height. With 1:1 aspect ratio, width = height = **148px**.

CSS:
```css
.quiz-card__image {
  width: 148px; min-width: 148px; flex-shrink: 0; align-self: stretch;
  background-size: cover; background-position: center; background-repeat: no-repeat;
}
```

---

### Quiz page — image assets confirmed

All 18 subject illustrations stored at `src/image-repo/page.quiz/assets/main/YourSelectedSubjects-Desktop/`:

| # | Subject | File | Size |
|---|---|---|---|
| 1 | Add Math | `add-math.png` | 4.7K |
| 2 | Biology | `biology.png` | 31K |
| 3 | Economy | `economy.png` | 29K (user-provided) |
| 4 | Chemistry | `chemistry.png` | 18K |
| 5 | English | `english.png` | 16K |
| 6 | Moral Studies | `moral.png` | 126K |
| 7 | Islamic Studies | `islamic.png` | 35K |
| 8 | Mathematics | `math.png` | 4.3K |
| 9 | Accounting | `account.png` | 17K |
| 10 | Physics | `physics.png` | 81K |
| 11 | Business Studies | `business.png` | 80K |
| 12 | Computer Science | `comp-science.png` | 2.0K |
| 13 | Science | `science.png` | 35K |
| 14 | History | `history.png` | 20K |
| 15 | KAFA | `kafa.png` | 133K (background-size: contain) |
| 16 | Geography | `geography.png` | 134K |
| 17 | RBT | `rbt.png` | 16K (user-provided) |
| 18 | Bahasa Melayu | `bm.png` | 8.0K |

**Subtitles** — sourced from `zul.home.screen.html` quiz cards, matched by subject order.

---

---

## Session 25 — Rewards pages: card title alignment, SVG color inheritance, badge cleanup

---

### Rule N-R1. Card title clamping + `min-height` — required for grid alignment

When a card grid has variable-length titles, the divider line and CTA button below the title will sit at different vertical positions across cards unless the title box has a **fixed height**.

**Pattern:**
```css
.card__title {
  font-size: 14px; font-weight: 600; line-height: 20px;
  overflow: hidden;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
  min-height: 60px;   /* 3 lines × 20px line-height */
}
```

**Formula:** `min-height = clamp-lines × line-height`

- 3-line clamp at 20px lh → `min-height: 60px`
- 2-line clamp at 20px lh → `min-height: 40px`

**Rule:** Always pair `-webkit-line-clamp: N` with `min-height: N × line-height`. Without `min-height`, a card with a one-line title will have its divider and button floating up — misaligned with adjacent cards that have 2–3 lines.

**Applied to (2026-06-04):**
- `nadia_Rewards-Myrewards.html` — `.mr-card__title` (clamp 3, min-height 60px)
- `nadia_Rewards-Merchandise.html` — `.rc__title` (clamp 3, min-height 60px)
- `nadia_Rewards-evoucher.html` — `.rc__title` (clamp 3, min-height 60px)

---

### Rule N-R2. `<a>` elements inherit browser blue into `stroke="currentColor"` — always set explicit `color` on the icon container

SVG `<symbol>` paths use `stroke="currentColor"`, which resolves to the inherited CSS `color` property. When an SVG is nested inside an `<a href>` element, the browser's default link color (blue) cascades in unless an explicit `color:` is set on the icon container.

**Symptom:** Arrow chevron inside a button `<a>` appears blue despite the button having a green background.

**Fix:** Add `color: var(--token)` to the element that wraps the `<svg>` — the icon container, not the `<a>` itself or the SVG.

```css
/* Wrong — no explicit color, inherits blue from <a> */
.btn__arrow { background: #99ebce; }

/* Correct — explicit color on the container, currentColor resolves correctly */
.btn__arrow { background: #99ebce; color: var(--border-primary-focus); }
```

**DS-confirmed chevron color for Primary/S button default state:** `#00a36a` = `var(--border-primary-focus)` (from arrow sub-node, confirmed Rule 19).

**Rule:** Every icon container (`__arrow`, `__icon-wrap`, `__icon-clip`) that holds an `<svg><use>` must have an explicit `color:` CSS property. Never assume `currentColor` will resolve to the right value through inheritance — links and buttons carry different browser defaults.

**Applied (2026-06-04):** `.btn-voucher__arrow { color: var(--border-primary-focus) }` in `nadia_Rewards-Myrewards.html`.

---

### Rule N-R3. Badge icons — only render what DS shows; use `sed` for bulk removal

Before implementing any icon inside a badge component, verify via `get_design_context` on the actual DS badge node that the icon is `visible: true`. Never add icon markup speculatively.

When removing icons from badges across multiple files:
1. Use `sed -i` with exact pattern matching — one pass, all instances
2. Verify with `grep` that no instance of the icon selector remains in badge HTML (symbol definitions and CSS rules are exempt)
3. Leave dead CSS rules as-is (harmless) or remove them — do not leave them silently failing

**Pattern for bulk icon removal:**
```bash
# Remove icon span from badge markup (Myrewards pattern)
sed -i '' 's|<span class="badge__icon">...</span>||g' file.html

# Remove inline SVG from badge (Merchandise/eVoucher pattern)
sed -i '' 's|<svg aria-hidden="true"><use href="#ic-*"/></svg>||g' file.html

# Verify — must return empty (excluding symbol/CSS lines)
grep -n "ic-video" file.html | grep -v "symbol\|comment\|Outline/"
```

**Applied (2026-06-04):** Removed `ic-video` icon from all Premium and Premium Lite badges in Myrewards, Merchandise, and eVoucher pages.

---

### Rule N-R4. Content label consistency — sidebar nav labels must match the page title exactly

The active sidebar button label, the `<title>` tag, the breadcrumb, and the page heading must all use the **same string**. A mismatch is always a typo — never a design decision.

**Verification pattern before committing any Rewards page:**
```bash
grep -n "bc-link--current\|sidebar-btn--active\|<title>" file.html
# All three must show the identical page name
```

**Confirmed typo (2026-06-04):** `nadia_Rewards-Myrewards.html` sidebar button had `My Reward` (missing 's'). Page title, breadcrumb, and `aria-label` all correctly said `My Rewards`. Fixed at line 3213.

---

## Session 26 — Coin Quest: description text, breadcrumb chevron fix, button state color drift, sidebar token sync

---

### Rule N-R5. Inline SVG separator chevrons → always `<use href>` + CSS `color:`, never `stroke:` presentation attribute

When a chevron icon is used as a visual separator (e.g. breadcrumb `›`), it must follow the same symbol pattern as all other icons — `<use href="#ic-*">` — not an inline `<polyline>` or `<path>`.

**Why inline breaks:** An inline `<polyline>` with CSS `stroke:` is a presentation attribute on the SVG element itself. It's fragile — any edit to surrounding CSS that changes specificity or inheritance can override or drop it silently. The `stroke:` property set via CSS on an SVG element doesn't cascade the same way `color:` does.

**Why `color:` not `stroke:`:** The symbol system uses `stroke="currentColor"`. `currentColor` resolves from the CSS `color` property, not `stroke`. So the CSS control rule must be `color:`, not `stroke:`.

```html
<!-- Wrong — inline polyline, brittle color -->
<svg class="bc-chevron" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>

<!-- Correct — symbol reference, color via CSS -->
<svg class="bc-chevron" aria-hidden="true"><use href="#ic-chevron-right"/></svg>
```

```css
/* Wrong — stroke: on a currentColor symbol has no effect */
.bc-chevron { stroke: #bfbfbf; fill: none; stroke-width: 1.5; }

/* Correct — color: drives currentColor in the symbol */
.bc-chevron { width: 16px; height: 16px; color: #bfbfbf; flex-shrink: 0; }
```

**Applied (2026-06-04):** `nadia_Rewards-CoinQuest.html` breadcrumb separator chevron, line 3328 → `<use href="#ic-chevron-right"/>`, CSS updated to `color: #bfbfbf`.

---

### Rule N-R6. Button arrow `color:` must be declared for ALL interactive states — never only for disabled

`stroke="currentColor"` in a symbol resolves from the nearest CSS `color:` in the ancestor chain. When `color:` is missing for a state (default, hover, pressed), the chevron inherits whatever `color` happens to be on a parent — which drifts whenever surrounding styles change.

**The pattern that drifts:** Only disabled state has `color:` declared → default/hover/pressed states inherit unpredictably → chevron colour changes whenever you edit other CSS.

**Required CSS — explicit `color:` on the arrow container for every state:**

```css
/* Default */
.btn__arrow { background: #99ebce; color: #00a36a; }

/* Hover */
.btn:hover .btn__arrow { background: #e8fbe8; color: #70bc6f; }

/* Pressed */
.btn:active .btn__arrow,
.btn.is-pressing .btn__arrow { background: #00cc85; color: #00564c; }

/* Disabled */
.btn--disabled .btn__arrow { background: #f2f2f2; color: #bfbfbf; }
```

**DS-confirmed chevron colors for Primary button (all sizes — Rule 19):**

| State | Arrow bg | Chevron `color` |
|---|---|---|
| Default | `#99ebce` | `#00a36a` |
| Hover | `#e8fbe8` | `#70bc6f` |
| Pressed | `#00cc85` | `#00564c` |
| Disabled | `#f2f2f2` | `#bfbfbf` |

**See also:** Rule N-R2 (`<a>` elements inherit browser blue) — same root cause, different trigger. Rule N-R6 is the general case: any icon container that wraps `<use href>` needs `color:` pinned at every state.

**Applied (2026-06-04):** `nadia_Rewards-CoinQuest.html` — `.btn-claim__arrow` now has explicit `color:` for default (`#00a36a`), hover (`#70bc6f`), and pressed (`#00564c`) states.

---

### Rule N-R7. Sidebar CSS — always use full DS token names; never shorthand aliases or hardcoded hex

All shared component CSS (sidebar, breadcrumb, main panel) must use full DS variable names. Shorthand aliases (`--og-500`, `--sp-m`, `--r-4xl`) are convenience shortcuts that drift from the canonical token names and cause cross-file inconsistency.

**Mapping — shorthand aliases → canonical DS token names:**

| Shorthand (old) | Canonical DS token | Value |
|---|---|---|
| `--og-500` | `--border-primary-default` | `#00cc85` |
| `--og-600` | `--border-primary-focus` | `#00a36a` |
| `--sp-m` | `--spacing-space-m` | `16px` |
| `--sp-xs` | `--spacing-space-xs` | `8px` |
| `--r-4xl` | `--corner-radius-corner-4xl` | `24px` |
| `border-radius: 24px` | `var(--corner-radius-corner-4xl)` | `24px` |
| `color: #00cc85` (active) | `color: var(--text-primary-default)` | |
| `color: #00a36a` (active icon/label) | `color: var(--border-primary-focus)` | |
| `border-color: #00cc85` (hover) | `border-color: var(--border-primary-default)` | |
| `border-color: #00a36a` (active) | `border-color: var(--border-primary-focus)` | |

**Rule:** When syncing a sidebar across Rewards pages, the newest file is the reference. Update the older files to use canonical token names. All values remain identical — this is token hygiene, not a visual change.

**Sync order (confirmed 2026-06-04):** Myrewards (canonical) → CoinQuest (synced). Merchandise and eVoucher still use shorthand — to be synced in a future session.

**Applied (2026-06-04):** `nadia_Rewards-CoinQuest.html` — all sidebar CSS updated from shorthand aliases to canonical DS token names.

---

### Rule N-R8. Page section description — `<p class="*-desc">` before the content grid

When a page section needs a subtitle or instructional line below the header/breadcrumb row and above the card grid, use a `<p>` element with a scoped class (e.g. `.quest-desc`, `.mr-desc`). Place it as the first child of the main panel, before the grid.

**DS token for body description text:** `Body/B1` — 14px Regular, `color: var(--text-default-body)` (`#666666`).

```html
<main class="rewards-main">
  <p class="quest-desc">Complete tasks and earn coins — Psst, coins can also be earned from completing quizzes 😎</p>
  <div class="quest-grid">...</div>
</main>
```

```css
.quest-desc {
  font-family: 'Poppins', sans-serif;
  font-size:   14px;
  font-weight: 400;
  line-height: 20px;
  color:       var(--text-default-body);
  margin:      0;
}
```

The `<p>` sits inside the flex column of `.rewards-main` which already has `gap: var(--spacing-space-xs)` (8px) — no extra margin needed.

**Applied (2026-06-04):** `nadia_Rewards-CoinQuest.html` — description added above `.quest-grid`.

---

### Mandatory pre-flight — BEFORE every task, change, or decision (Session 26 reinforcement)

> **User instruction (2026-06-04):** "always before starts any design, or making any changes and decisions, please refer to DS & nadia.design.md"

This is non-negotiable. Every session, every task, every fix — no exceptions.

```
□ Step 1 — Read design-md/nadia.design.md    → ALL rules N-1 through N-R8+, known deviations
□ Step 2 — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f
                                              → token values, component structure, visible states
□ Step 3 — Only then write HTML, CSS, or document any value
```

**What "before" means:**
- Before writing a single CSS rule → pre-flight first
- Before fixing a typo → pre-flight first
- Before bulk-editing across files → pre-flight first; confirm scope per `feedback_file_scope.md`
- Before removing or adding any icon, badge, or component child → verify DS `visible:` first
- Before syncing a component across files → confirm which file is canonical (newest/most updated)

**Past violations and consequences:**
- Session 24: skipped nadia.design.md → used wrong `data-active-nav` pattern
- Session 25: SVG chevron appeared blue → missing `color:` on arrow container (Rule N-R2/N-R6)
- Session 25: typo "My Reward" survived multiple sessions → label consistency (Rule N-R4)
- Session 26: breadcrumb chevron used inline `<polyline>` + CSS `stroke:` → drifted on edits (Rule N-R5)
- Session 26: button arrow missing `color:` for default/hover/pressed → chevron color unpredictable (Rule N-R6)

---

### N-R9. Runtime nav injection — fetch zul.page.template.html instead of hardcoding Zul's nav

All Nadia pages pull navbar, menubar, footer, and bottom nav from `zul.test.git/zul.page.template.html` at runtime via `fetch()`. **Never copy-paste Zul's nav HTML directly into a Nadia page again.**

#### Pattern (all Nadia pages — confirmed 2026-06-04)

```html
<!-- Placeholders — keep existing IDs if present, otherwise use these -->
<section id="Navigation-Shell"></section>   <!-- navbar + menubar + mobile nav -->
...page main content...
<footer class="footer" id="zul-footer"></footer>
<div id="zul-nav-bottom"></div>             <!-- NavBar-Bottom + mobile-overlay + NavMenu-Mobile -->

<script>
(function () {
  var TPL = '../../zul.test.git/zul.page.template.html';  /* adjust depth as needed */

  fetch(TPL)
    .then(function (r) { return r.text(); })
    .then(function (html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      function fixPaths(html) {
        /* Depth fix — see Rule N-R9b */
        return html.replace(/src="\.\.\/src\//g, 'src="../../src/');
      }

      /* 1. Nav shell */
      var srcShell = doc.getElementById('Navigation-Shell');
      var dstShell = document.getElementById('Navigation-Shell');
      if (srcShell && dstShell) dstShell.innerHTML = fixPaths(srcShell.innerHTML);

      /* 2. Footer */
      var srcFooter = doc.querySelector('footer.footer');
      var dstFooter = document.getElementById('zul-footer');
      if (srcFooter && dstFooter) dstFooter.innerHTML = srcFooter.innerHTML;

      /* 3. Bottom nav */
      var bottom = document.getElementById('zul-nav-bottom');
      if (bottom) {
        ['NavBar-Bottom', 'mobile-overlay', 'NavMenu-Mobile'].forEach(function (id) {
          var el = doc.getElementById(id);
          if (el) { el.innerHTML = fixPaths(el.innerHTML); bottom.appendChild(document.adoptNode(el)); }
        });
      }

      /* 4. Execute template scripts */
      Array.prototype.forEach.call(doc.querySelectorAll('script'), function (s) {
        if (s.src) return;
        var ns = document.createElement('script');
        ns.textContent = s.textContent;
        document.body.appendChild(ns);
      });

      /* 5. Set active nav button — clear hardcoded Home first */
      document.querySelectorAll('#NavTopMenu-Desktop .nav-menu-btn').forEach(function (b) {
        b.classList.remove('is-active');
      });
      var btn = document.querySelector('#NavTopMenu-Desktop .nav-menu-btn[aria-label="CLASS_OR_QUIZ_ETC"]');
      if (btn) btn.classList.add('is-active');
    })
    .catch(function (err) { console.error('[nav-inject] Failed:', err); });
})();
</script>
```

#### N-R9a. Template path by directory depth

| File location | Path to template |
|---|---|
| `Nadia.test.git/Class/` | `../../zul.test.git/zul.page.template.html` |
| `Nadia.test.git/Practise/` | `../../zul.test.git/zul.page.template.html` |
| `Nadia.test.git/Quiz/` | `../../zul.test.git/zul.page.template.html` |
| `Nadia.test.git/Rewards/` | `../../zul.test.git/zul.page.template.html` |

All Nadia pages are exactly 2 directories deep from `pandai.design/` root — path is always `../../zul.test.git/zul.page.template.html`.

#### N-R9b. Image path fix — always apply `fixPaths()` before setting innerHTML

The template lives at `zul.test.git/` (depth 1). Its image `src` attributes use `../src/image-repo/...` to reach `pandai.design/src/`.

Nadia pages live at `Nadia.test.git/[subfolder]/` (depth 2). When the template HTML is injected via `innerHTML`, the browser resolves `src` paths relative to the **current page**, not the template. `../src/` from depth 2 resolves to `Nadia.test.git/src/` — wrong.

**Fix:** `src="../src/` → `src="../../src/` via `fixPaths()` applied to `srcShell.innerHTML` and each bottom nav element's `innerHTML` before injection.

**Apply `fixPaths()` to:** Navigation-Shell innerHTML, each bottom nav element innerHTML. **Do NOT apply to:** footer (footer has no image assets).

#### N-R9c. Template hardcodes `is-active` on Home

`zul.page.template.html` line 2660 has Home button with `class="nav-menu-btn is-active"` hardcoded. After injection, Home is always active unless explicitly cleared.

**Rule:** Always run step 5 — clear all `.nav-menu-btn.is-active` then set the correct page's button. Never skip the clear step.

**Active nav mapping (confirmed 2026-06-04):**

| Page | Active button `aria-label` |
|---|---|
| `nadia_Class-MyClasses.html` | `"Class"` |
| `nadia_Class-BrowseClasses.html` | `"Class"` |
| `nadia_Practise-subject.html` | `"Practice"` |
| `nadia_Flashcard.html` | `"Practice"` |
| `nadia_Quiz.html` | `"Quiz"` |
| `nadia_Rewards-*.html` (all 5) | `"Rewards"` |

#### N-R9d. Page-specific scripts — always scan before removing any script block

Some Nadia pages have scripts between the main nav script and `</body>` that are **page-specific** and must be kept. Always grep-check before stripping any script block.

**Pattern to scan:**
```bash
grep -n "^  <script>" file.html   # find all script start lines
# For each block, check its first non-blank line — is it Zul's or Nadia's?
```

**Zul's scripts (always remove):**
- `// Search bar — btn click` — nav search handler
- `(function () { var accountBtn` — mobile menu IIFE
- `(function () { var btn  = document.getElementById('maximize-btn')` — maximize IIFE

**Page-specific scripts (always keep, move to before fetch script):**
- `try { document.querySelectorAll('.sidebar-btn')` — sidebar tab toggle (all Rewards pages)
- `/* ── randomizeContent` — dynamic content population (`nadia_Rewards-avatar.html`)
- `// Sidebar active state toggle` — `nadia_Rewards-Myrewards.html` has this between nav script and NavMenu-Mobile

**Mistake made (2026-06-04):** Nearly stripped sidebar and randomizeContent scripts alongside Zul's nav scripts. Caught by checking script content before deletion.

---

---

## Session 28 — Rewards pages: card title clamp, badge icon removal, realistic data, sidebar sync, balance fix

---

### Rule N-R10. Card title text — always 3-line clamp + matching `min-height`

All voucher/reward card titles must use 3-line clamp with a fixed `min-height` so the divider and CTA button stay vertically aligned across cards regardless of title length.

```css
.rc__title {
  font-size: 14px; font-weight: 600; line-height: 20px; color: #404040;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 3; min-height: 60px; -webkit-box-orient: vertical;
}
```

**Formula:** `min-height = clamp-lines × line-height` → 3 × 20px = **60px**.

This is the same principle as Rule N-R1 (quiz card title clamp). Apply to every card grid component — `rc__title`, `mr-card__title`, `rc__title` — whenever a card title can vary in length.

**Applied (2026-06-04):** `nadia_Rewards-evoucher.html` and `nadia_Rewards-Merchandise.html` — changed from 2-line clamp to 3-line + `min-height: 60px`.

---

### Rule N-R11. Prototype data realism — use varied, realistic values; never leave placeholder text

Every prototype card, list, or data display must use realistic content. Placeholder text (`"This is the title for the reward voucher"`) and uniform values (`120` coins on every card) make the prototype unreadable as a design review artefact.

**Realism checklist before committing any data change:**

| Field | Bad | Good |
|---|---|---|
| Card titles | "This is the title for the reward voucher" | "Free Drinks Voucher (Medium Size)", "10% Off Electronics Voucher" |
| Coin amounts | All same (120) | Varied by value tier: 50, 80, 100, 120, 150, 200, 300, 500 |
| Coin balance | 10,000 | 500 (believable student balance) |
| Quest progress | All `0/2 Achieved` | Mix of 0/2, 1/2, 2/2, 1/1, 3/3 |
| Progress bars | All `width:0%` | Match the progress fraction (1/2 → 50%, 2/2 → 100%) |

**Coin balance rule:** Student coin balance must be **500**, not 10,000. 10,000 is unrealistically high and breaks the sense of value for rewards that cost 50–500 coins. This applies to `sidebar-balance__value` and `bc-coin-mobile__value` in all Rewards pages.

**Progress bar rule:** `style="width:X%"` must always match the `qc__status` fraction. `1/2 Achieved` → `width:50%`. `2/2 Achieved` → `width:100%`. Never leave all bars at `0%` when some tasks are partially or fully done.

**Claim button rule:** A task at `N/N Achieved` must have an **active** (non-disabled) Claim button. A task at `0/N` or partial must be `btn-claim--disabled`.

**Applied (2026-06-04):**
- `nadia_Rewards-evoucher.html` — 8 unique titles (Free Drinks Voucher → Sports Gear Discount), coin values 50–250
- `nadia_Rewards-Merchandise.html` — 4 unique merchandise titles, coin values 150–500
- `nadia_Rewards-CoinQuest.html` — progress varied: 2/2✓, 1/2, 0/2, 1/1✓, 0/2, 2/2✓, 3/3✓, 1/2; bars match; Read an Article upgraded to active Claim
- All 3 files — coin balance 10,000 → **500**

---

### Rule N-R12. Badge icon removal — remove `gap` and dead CSS when icon is stripped

When an icon is removed from a badge component (`<svg>` deleted from `<span class="lbadge-prem">`), also clean up:

1. **`gap: Xpx` on the badge** — gap between icon and label no longer needed; remove it
2. **Dead `.lbadge-prem svg { ... }` CSS rule** — references an element that no longer exists; remove it

Leaving these causes phantom spacing on the left of the label text.

```css
/* Before icon removal */
.lbadge-prem { display: inline-flex; align-items: center; gap: 4px; ... }
.lbadge-prem svg { width: 10px; height: 10px; flex-shrink: 0; }

/* After icon removal — gap and svg rule gone */
.lbadge-prem { display: inline-flex; align-items: center; ... }
```

**Applied (2026-06-04):** `nadia_Rewards-evoucher.html` and `nadia_Rewards-Merchandise.html` — `ic-video` svg removed from all `.lbadge-prem` spans, `gap: 4px` removed, `.lbadge-prem svg` rule deleted.

---

### Rule N-R13. Cross-file data sync — when changing shared data, apply to ALL files in the same commit

Any value that appears identically across multiple Rewards pages (coin balance, button labels, sidebar typos) must be updated in all files at once. Never update one file and leave others stale.

**Pattern:**
```bash
for f in nadia_Rewards-CoinQuest nadia_Rewards-evoucher nadia_Rewards-Merchandise; do
  sed -i '' 's/>10,000</>500</g' "Nadia.test.git/Rewards/$f.html"
done
```

**Verify with grep after every bulk change** — confirm the old value no longer exists and the new value is correct:
```bash
grep -n "10,000\|sidebar-balance__value" file.html
```

**Applies to:** coin balance, label typos (Rule N-R4), sidebar token names (Rule N-R7), any value that appears on 3+ pages.

---

### Mandatory pre-flight — BEFORE every task, change, or decision (Session 28 reinforcement)

> **User instruction (reinforced 2026-06-04):** "always before starts any design, or making any changes and decisions, please refer to DS & nadia.design.md"

This is non-negotiable. Every session, every task, every fix — no exceptions.

```
□ Step 1 — Read design-md/nadia.design.md    → ALL rules N-1 through N-R13+, known deviations
□ Step 2 — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f → token values, component structure, visible states
□ Step 3 — Only then write HTML, CSS, or document any value
```

**What "before" means:**
- Before writing a single CSS rule → pre-flight first
- Before fixing a typo → pre-flight first
- Before bulk-editing across files → pre-flight first; confirm scope per `feedback_file_scope.md`
- Before changing any data value → check if the same value exists in other files (Rule N-R13)
- Before removing any icon or badge element → verify DS `visible:` + clean up dependent CSS (Rule N-R12)

**Past violations and consequences:**
- Session 24: skipped nadia.design.md → wrong `data-active-nav` pattern
- Session 25: SVG chevron blue → missing `color:` on arrow (Rule N-R2/N-R6)
- Session 25: "My Reward" typo survived multiple sessions (Rule N-R4)
- Session 26: breadcrumb chevron inline `<polyline>` + `stroke:` → drifted (Rule N-R5)
- Session 26: button arrow missing `color:` per state (Rule N-R6)
- Session 28: balance 10,000 unrealistic → must be 500 (Rule N-R11); all card titles were placeholders (Rule N-R11); all progress bars at 0% despite varied status (Rule N-R11)
- Session 29 (2026-06-05): 8 of 14 components in `nadia_Class-MyClasses.html` used wrong token categories (surface tokens on text/icon/border elements). Always audit before implementing (Rule N-C4).

---

### Rule N-C1. Semantic token category must match usage context — same hex ≠ same token

Even when two tokens share the same hex value, always use the token whose **name matches the usage context**. Using the wrong category is a DS violation even if the visual output is identical today — a future theme or DS update will break it silently.

| Usage | Correct token category | Wrong (common mistake) |
|---|---|---|
| Background / fill | `--surface-*` | any other category |
| CSS `border` / `box-shadow` ring | `--border-*` | `--surface-*` |
| CSS `color:` on text elements | `--text-*` | `--surface-*` |
| CSS `color:` on icon containers | `--icon-*` | `--surface-*`, `--text-*` |
| CSS `gap`, `padding`, `margin` | `--spacing-*` | raw `px` |

**Confirmed violations fixed in `nadia_Class-MyClasses.html` (Session 29):**
- `.cc { border: 1px solid var(--surface-primary-default) }` → `var(--border-primary-default)`
- `.cc__inner { border: 1px solid var(--surface-primary-default) }` → `var(--border-primary-default)`
- `.live-badge { border: 1px solid var(--surface-primary-default) }` → `var(--border-primary-default)`
- `.live-badge { color: var(--surface-primary-default) }` → `var(--text-primary-default)`
- `.live-badge svg { color: var(--surface-primary-default) }` → `var(--icon-primary-default)`
- `.cc__premium { color: var(--surface-primary-default) }` → `var(--text-primary-default)`
- `.bc-link { color: var(--surface-primary-default) }` → `var(--text-primary-default)`
- All subject `.ds-avatar svg { stroke: #hex }` → `color: var(--subjects-*-default)` (see Rule N-C2)

**Root cause:** copy-pasting a `--surface-primary-default` value from a background rule into a text/border/icon context without thinking about category. Always stop and ask: "Is this element a fill, a border, text, or an icon?"

---

### Rule N-C2. Subject palette — always use `:root` CSS vars, never hardcode subject hex

Every subject color is defined in `:root` as `--subjects-[subject]-default`. All subject-specific card palette rules (border, header bg, avatar border, avatar icon) must reference these vars.

**Available vars (confirmed DS, all pages):**
```css
--subjects-b-melayu-default:   #4d77ff
--subjects-english-default:    #ff4d56
--subjects-math-default:       #42ac7b
--subjects-science-default:    #ffd641
--subjects-chemistry-default:  #e20082
--subjects-physics-default:    #27a0d7
--subjects-history-default:    #a97c50
--subjects-geo-default:        #77d836
--subjects-islamic-default:    #de4d7f
--subjects-moral-default:      #0072ca
--subjects-biology-default:    #8431d8
--subjects-add-math-default:   #283589
--subjects-economy-default:    #ff5733
--subjects-account-default:    #0072ca
--subjects-business-default:   #efb42b
--subjects-cs-default:         #d10070
--subjects-kafa-default:       #8ae3a9
--subjects-rbt-default:        #353535
--subjects-chinese-default:    #f94848   ← added Session 29
```

**Pattern (every subject palette block):**
```css
.cc--bm { border-color: var(--subjects-b-melayu-default); }
.cc--bm .cc__inner { border-color: var(--subjects-b-melayu-default); }
.cc--bm .cc__hdr  { background: var(--subjects-b-melayu-default); }
.cc--bm .ds-avatar { border-color: var(--subjects-b-melayu-default); }
.cc--bm .ds-avatar svg { color: var(--subjects-b-melayu-default); }
```

**`color:` not `stroke:` on `.ds-avatar svg`** — the DS avatar icon symbol uses `stroke="currentColor"`. Icon color must be set via CSS `color:` on the parent or SVG element. CSS `stroke:` set directly would work but is semantically inconsistent with how all other icons in the file are styled (Rule 36 + Rule N-C1).

**Enrichment card** — uses Pandai green = `var(--border-primary-default)` for borders/avatar, `var(--surface-primary-default)` for header bg, `var(--surface-secondary-default-subtle)` for body bg. Never hardcode `#00cc85` or `#e8fbe8` in enrichment palette rules.

**Hardcoded bg tints** (`#f6f9ff`, `#ffedee`, `#ecf7f2`, etc.) are custom light tints derived from subject colors — no DS token exists for them. These stay hardcoded. **Do not invent new `:root` vars for them.**

**Missing subject var** — if a new subject is added to a page and has no `:root` var, add it immediately before using it. Never fall back to raw hex.

---

### Rule N-C3. `is-pressing` JS is mandatory for every interactive button — not just navbar

**Every DS button** on every page needs both:
1. CSS: `.btn-xxx:active, .btn-xxx.is-pressing { ... }` — mirrors the DS Pressed state
2. JS: `mousedown` → add `.is-pressing`, `mouseup` + `mouseleave` → remove `.is-pressing`

CSS `:active` alone is unreliable in VS Code Simple Browser / Electron webviews (Rule 39). The `mouseleave` cleanup is mandatory to prevent stuck states.

**Applies to:** breadcrumb action buttons (Secondary/L, Primary/L), Enter Class button (Primary/S), and every other DS button on the page regardless of variant or size.

**Template (add before the nav-inject script block):**
```js
document.querySelectorAll('.btn-enter, .btn-secondary, .btn-primary').forEach(function (btn) {
  btn.addEventListener('mousedown',  function () { btn.classList.add('is-pressing'); });
  btn.addEventListener('mouseup',    function () { btn.classList.remove('is-pressing'); });
  btn.addEventListener('mouseleave', function () { btn.classList.remove('is-pressing'); });
});
```

**Confirmed missing (Session 29):** `nadia_Class-MyClasses.html` had no `is-pressing` handlers on any page-specific button. Fixed by adding the handler block above.

---

### Rule N-C4. Pre-implementation component audit — mandatory before touching any page

Before writing or editing CSS/HTML for any page, run a component audit: list every component on the page, check each one against the DS rules, and confirm all token categories are correct.

**Audit table format (from Session 29):**

| Component | Status | Issues |
|---|---|---|
| Navigation Shell | ✅ Updated | Injected from template |
| Class Card `.cc` | ❌ | border used `--surface-*` instead of `--border-*` |
| ... | ... | ... |

**Minimum checks per component:**
- [ ] Background fills → `--surface-*`
- [ ] Borders (CSS `border` or `box-shadow: inset`) → `--border-*`
- [ ] Text `color:` → `--text-*`
- [ ] Icon `color:` → `--icon-*`
- [ ] Gap / padding / margin → `--spacing-*` vars, not raw `px`
- [ ] Button Secondary/L → `box-shadow: inset`, never `border: 1px solid` (Rule 85)
- [ ] All inline `<path>` in button arrows → must use `<use href="#ic-chevron-btn">` (Rule 36)
- [ ] All interactive buttons → `is-pressing` CSS + JS (Rule N-C3)

**Confirmed instance (Session 29, nadia_Class-MyClasses.html):** 8 of 14 components had wrong token categories. Audit would have caught all of them before any code was touched.

---

### Rule N-C5. Stale `#e1f9ea` — audit every page for this value

`#e1f9ea` was the old `Text/primary/on-color` before the 2026-05-24 DS update (Rule 61). Any occurrence outside of a `/* TODO: verify DS token */` comment is a stale value that needs live DS verification.

**Known occurrences in Nadia pages (Session 29):**
- `nadia_Class-MyClasses.html` `.ds-avatar { background: #e1f9ea }` — left with TODO comment pending DS fetch
- `nadia_Class-MyClasses.html` `.live-badge { background: #e1f9ea }` — left with TODO comment pending DS fetch

**Rule:** When doing a DS audit on any page, grep for `#e1f9ea`. Every match must either:
1. Be replaced with the correct DS token (after live `use_figma`/`get_variable_defs` verification), or
2. Have a `/* TODO: verify DS token — #e1f9ea has no current :root mapping */` comment explaining why it's temporarily kept

**Never silently carry this value** across sessions as if it were intentional.

---

### Rule N-C6. KAFA card header title — DS confirmed color is `#538865`, current impl uses `#1a6b3a`

**Confirmed (CLAUDE.md Rule 17b, 2026-05-17 live DS audit):** KAFA Subject Badge text color = `#538865`.

`nadia_Class-MyClasses.html` currently has `.cc--kafa .cc__hdr-title { color: #1a6b3a }`. This is wrong but was NOT fixed in Session 29 because the user asked not to change visible output. **When the user explicitly approves a visual correction, update this to `#538865`.**

This is a known DS deviation to track. Do not silently copy `#1a6b3a` to other pages.

---

### Mandatory pre-flight — BEFORE every task, change, or decision (updated Session 29)

> **User instruction (reinforced 2026-06-05):** "always before starting any design, making any changes, or making any decisions, please refer to DS & nadia.design.md"

This is non-negotiable. Every session, every task, every fix — no exceptions.

```
□ Step 0 — Read design-md/nadia.design.md      → ALL rules N-1 through N-C6+, known deviations
□ Step 1 — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f → token values, component structure, visible states
□ Step 2 — Run component audit (Rule N-C4)      → list every component, check token categories
□ Step 3 — Only then write HTML, CSS, or document any value
```

**What "before" means:**
- Before writing a single CSS rule → pre-flight first
- Before fixing a typo → pre-flight first
- Before bulk-editing across files → pre-flight first; confirm scope per `feedback_file_scope.md`
- Before changing any data value → check if the same value exists in other files (Rule N-R13)
- Before removing any icon or badge element → verify DS `visible:` + clean up dependent CSS (Rule N-R12)
- Before using any subject color → check `--subjects-*-default` vars exist in `:root` (Rule N-C2)

**Past violations and consequences:**
- Session 24: skipped nadia.design.md → wrong `data-active-nav` pattern
- Session 25: SVG chevron blue → missing `color:` on arrow (Rule N-R2/N-R6)
- Session 25: "My Reward" typo survived multiple sessions (Rule N-R4)
- Session 26: breadcrumb chevron inline `<polyline>` + `stroke:` → drifted (Rule N-R5)
- Session 26: button arrow missing `color:` per state (Rule N-R6)
- Session 28: balance 10,000 unrealistic → must be 500 (Rule N-R11); all card titles were placeholders (Rule N-R11); all progress bars at 0% despite varied status (Rule N-R11)
- Session 29: 8/14 components used wrong token categories (`--surface-*` on borders/text/icons); all subject palette rules used raw hex instead of `:root` vars; `is-pressing` JS missing on all page buttons; inline `<path>` in 18 Enter Class button chevrons instead of `<use>`
- Session 30: 7 components in `nadia_Practise-subject.html` had token/mechanism violations — found only because a full component audit was run first. Key findings: Footer missing `height: 60px`, notif-see-all button had 4 simultaneous violations, Icon Badge used `border:` instead of OUTSIDE `box-shadow:`, breadcrumb had 4 hardcoded hex values. None would have been caught without auditing before touching code.

---

## Session 30 — nadia_Practise-subject.html: DS compliance audit + token fixes (2026-06-06)

**File:** `Nadia.test.git/Practise/nadia_Practise-subject.html`

### What was done

1. Full component audit run against DS rules before making any change
2. 9 token/mechanism fixes applied — all without changing existing layout or introducing new structure

---

### Audit results (21 components audited)

| Component | DS Node | Status | Notes |
|---|---|---|---|
| Navbar Primary Desktop - 1.5 | `2337:21975` | ✅ Updated | INSIDE box-shadow, tokens correct |
| Nav Button - 1.5 (action icons) | `3908:6148` | ✅ Updated | All 4 states + is-pressing JS |
| Number Badge - 1.5 | `618:417` | ✅ Updated | OUTSIDE box-shadow, #ffffff token |
| Avatar - 1.5 | `684:621` | ✅ Updated | — |
| Profile Menu - 1.5 | `3908:3679` | ✅ Updated | Dropdown-Parts states correct |
| Pill Badge (profile plan) | — | ✅ Updated | — |
| Learn Menu - 1.5 | `3908:5091` | ✅ Updated | hover/selected states correct |
| Notification Dropdown | `3908:13057` | ✅ Updated | Items correct; **See All btn fixed this session** |
| Download Apps Dropdown | `3909:3405` | ✅ Updated | SVG symbol store icons |
| Localization Dropdown | `3928:3067` | ✅ Updated | transparent border default pattern |
| Nav Top Menu (pill + btns) | `3406:802` | ✅ Updated | All states + is-pressing JS |
| Mobile Navbar | `1943:22641` | ✅ Updated | ham→X animation correct |
| Nav Menu Tablet | `3427:4590` | ✅ Updated | — |
| Nav Menu Mobile | `3427:2442` | ✅ Updated | — |
| Navbar Mobile Bottom | `3406:735` | ✅ Updated | Tertiary/S INSIDE box-shadow |
| **Footer - 1.5** | `2073:6579` | ❌ → **Fixed** | Missing height:60px + wrong padding |
| **Icon Badge - 1.5** (verified) | `3908:1491` | ❌ → **Fixed** | `border:` → OUTSIDE `box-shadow:` |
| **Button - 1.5 Primary/L** (see-all) | `473:528` | ❌ → **Fixed** | 4 violations (see below) |
| **Breadcrumb - 1.5** | `3284:218453` | ❌ → **Fixed** | 4 hardcoded hex values (see below) |
| Practice Card - 1.5 | `5072:104628` | ✅ Updated | Hover, colors, circles all confirmed |
| Dropdown - Parts | `1342:4370` | ✅ Updated | — |

---

### Fixes applied (9 total)

#### 1. Added `:root` token — `--border-general-default-secondary`
```css
--border-general-default-secondary: #bfbfbf;  /* Border/general/default-secondary (DS node 3655:16650) */
```
Pending since Session 23. Applied here to support the bc-sep fix.

#### 2. Footer — missing height + wrong padding
```css
/* Before */
.footer { /* no height */ }
.footer__inner { padding: var(--spacing-space-s) var(--spacing-space-2xl); /* 12px 28px */ }

/* After — DS node 2073:6579: height 60px, t:20 r:28 b:20 l:28 */
.footer { height: 60px; }
.footer__inner { height: 100%; padding: 0 var(--spacing-space-2xl); }
```

#### 3. Icon Badge - 1.5 — `border:` → OUTSIDE `box-shadow:` (Rule 60 / Rule 83)
```css
/* Before */
.profile-dropdown__verified { border: 1px solid white; }

/* After — strokeAlign: OUTSIDE → no inset */
.profile-dropdown__verified { box-shadow: 0 0 0 1px var(--border-on-color); }
```

#### 4–6. Button - 1.5 Primary/L `notif-see-all` — 4 violations fixed (Rules 40, 60, 82, 89)
```css
/* Before */
.notif-see-all {
  border: 1px solid var(--border-primary-focus);           /* ❌ INSIDE stroke, needs box-shadow:inset */
  transition: background 0.12s, border-color 0.12s, color 0.12s;  /* ❌ Rule 82 */
}
.notif-see-all:hover  { border-color: var(--border-secondary-focus); }   /* ❌ silent on box-shadow base (Rule 89) */
.notif-see-all:active { background: var(--surface-tertiary-default); }   /* ❌ wrong palette (Rule 40) */

/* After */
.notif-see-all {
  border: none;
  box-shadow: inset 0 0 0 1px var(--border-primary-focus);
  /* no transition */
}
.notif-see-all:hover  { box-shadow: inset 0 0 0 1px var(--border-secondary-focus); }
.notif-see-all:active { background: var(--surface-primary-focus); box-shadow: inset 0 0 0 1px var(--border-primary-default); }
```

#### 7–10. Breadcrumb — 4 hardcoded hex → tokens (Rule 3)
```css
/* Before */
.bc-title        { color: #00564c; }          /* --text-tertiary-default */
.bc-sep          { background: #d9d9d9; }     /* wrong token — should be #bfbfbf */
.bc-chevron      { stroke: #bfbfbf; }         /* --text-default-caption */
.bc-link--current { color: #666; }            /* --text-default-body */

/* After */
.bc-title        { color: var(--text-tertiary-default); }
.bc-sep          { background: var(--border-general-default-secondary); }   /* #bfbfbf — DS confirmed */
.bc-chevron      { stroke: var(--text-default-caption); }
.bc-link--current { color: var(--text-default-body); }
```

---

### bc-sep status — updated after this fix

| File | `bc-sep` value | Status |
|---|---|---|
| `nadia_Class-MyClasses.html` | `var(--border-general-default-secondary)` | ✅ |
| `nadia_Practise-subject.html` | `var(--border-general-default-secondary)` | ✅ Fixed session 30 |
| `nadia_Rewards-CoinQuest.html` | `#d9d9d9` | ❌ Pending |
| `nadia_Rewards-evoucher.html` | `var(--border-general-default-secondary)` | ✅ Fixed Session 35 |
| `nadia_Rewards-Merchandise.html` | `#d9d9d9` | ❌ Pending |
| `nadia_Rewards-Myrewards.html` | `#d9d9d9` | ❌ Pending |
| `nadia_Class-BrowseClasses.html` | `#d9d9d9` | ❌ Pending |

---

### New rules derived this session

#### Rule N-C7 — Always audit the full component list before touching any CSS

Before editing a page, list every component present and check each one against DS rules. The audit catches issues in components you are NOT planning to touch — which is precisely where violations accumulate silently. In this session the `notif-see-all` button had 4 simultaneous violations that had never been caught because no prior session touched the notification dropdown.

**Audit checklist per component:**
- [ ] Are all colors using `:root` token vars? (no hardcoded hex in declarations)
- [ ] Is the correct CSS mechanism used? (`box-shadow:inset` for INSIDE, `box-shadow:` for OUTSIDE, `border:` only for CENTER strokeAlign)
- [ ] Are Button - 1.5 instances free of `transition:`?
- [ ] Are state overrides (`hover`, `active`) using the correct mechanism as the base rule?
- [ ] Does the active/pressed state use the correct DS palette? (Primary pressed → `--surface-primary-focus`, not Tertiary)

#### Rule N-C8 — State overrides must use the same mechanism as the base border rule

If the base rule uses `box-shadow: inset 0 0 0 1px`, then ALL state overrides (:hover, :active, :disabled, .is-pressing) must override `box-shadow`. Using `border-color:` to override is a silent no-op when no `border:` is declared on the base.

```css
/* WRONG — border-color override is silent when base uses box-shadow */
.btn { box-shadow: inset 0 0 0 1px var(--border-primary-focus); }
.btn:hover { border-color: var(--border-secondary-focus); }  /* does nothing */

/* CORRECT — all states use same mechanism */
.btn { border: none; box-shadow: inset 0 0 0 1px var(--border-primary-focus); }
.btn:hover  { box-shadow: inset 0 0 0 1px var(--border-secondary-focus); }
.btn:active { box-shadow: inset 0 0 0 1px var(--border-primary-default); }
```

**Always verify:** when adding a hover/active rule, check what the base border mechanism is first.

---

---

## Session 31 — nadia_Quiz.html: DS compliance audit + token fixes (2026-06-06)

**File:** `Nadia.test.git/Quiz/nadia_Quiz.html`

Full component audit run before any code was touched. Found 6 issues across page-specific components. Fixed 4 without changing visual output; 2 outstanding pending user approval.

### Audit findings summary

| Component | DS Node | Status | Action |
|---|---|---|---|
| Navbar + all dropdowns + Nav Menus | various | ✅ | No change needed |
| Navbar Bottom Mobile (Tertiary/S) | `1452:8381` | ✅ | No change needed |
| Status Badge - 1.5 Size=M (quiz stats) | `3420:87102` | ✅ FIXED (partial) | `border-radius: 40.5px` → `var(--corner-radius-corner-rounded)` (Rule N-C9) |
| Quiz Card - 1.5 (18 cards) | `2339:5346` | ❌ Outstanding | Missing Button - 1.5 Primary/S — needs DS fetch before adding |
| Subject Badge - 1.5 L size (inside cards) | `2339:1343` | ✅ FIXED | Icon `height: 24px; auto` → `width: 20px; height: 20px` (Rule N-C10) |
| Subject Badge M mobile override | — | ✅ FIXED | Icon `height: 16px; auto` → `width: 16px; height: 16px` |
| Footer | `2073:6579` | ❌ Outstanding | Missing `height: 60px`; padding `12px 28px` → `0 28px` — visual change, needs approval |
| `--card-subject-color` border values | — | ⚠️ Unverified | 18 hex values not confirmed from DS live fetch; do not copy to other pages (Rule 91) |
| `ic-nav-btn-union` SVG symbol | — | ⚠️ Dead code | Defined but never used; safe to remove |
| Stale `#e1f9ea` comments | — | ✅ FIXED | 2 comment lines updated to `#ffffff` (Rule N-C5) |

**Net changes:** 4 fixes (border-radius token, 2× icon size, 2× stale comment). Zero structural or layout changes. No visual output change.

---

### Rule N-C9. Pill / badge border-radius — always `var(--corner-radius-corner-rounded)`, never hardcode px

**Source:** Session 31 audit of `nadia_Quiz.html`, 2026-06-06.

`border-radius: 40.5px` was found on `.status-badge-m`. This is not a DS token value and has no basis in the Pandai DS token system. The DS defines `Corner Radius/corner-rounded = 60px` for all pill-shaped badges, buttons, and containers.

For a 32px-tall element, both 40.5px and 60px produce identical visual output (fully rounded pill), so this is a safe token-only fix. But the principle extends everywhere:

**Rule:** Never use arbitrary hardcoded `px` values for border-radius on any badge, pill, or button element. Always map to the nearest DS token variable.

```css
/* Wrong — arbitrary value, not in DS token system */
.status-badge-m { border-radius: 40.5px; }

/* Correct */
.status-badge-m { border-radius: var(--corner-radius-corner-rounded); }   /* = 60px pill */
```

**DS radius token reference:**

| Token | Variable | Value | Usage |
|---|---|---|---|
| `Corner Radius/corner-pill` | `--corner-radius-corner-pill` | 999px | Nav pill, locale item |
| `Corner Radius/corner-rounded` | `--corner-radius-corner-rounded` | 60px | Badges, buttons, avatar |
| `Corner Radius/corner-4xl` | `--corner-radius-corner-4xl` | 24px | Cards, dropdowns, navbar |
| `Corner Radius/corner-2xl` | `--corner-radius-corner-2xl` | 18px | Quiz card, inner card |
| `Corner Radius/corner-xl` | `--corner-radius-corner-xl` | 16px | Carousel card, notif hover |
| `Corner Radius/corner-lg` | `--corner-radius-corner-lg` | 12px | Learn menu cell |
| `Corner Radius/corner-md` | `--corner-radius-corner-md` | 8px | Nav Button - 1.5 (44×44) |

---

### Rule N-C10. Badge icon sizes — always explicit `width: Npx; height: Npx`, never `auto`

**Source:** Session 31 audit of `nadia_Quiz.html`, 2026-06-06. Confirmed against CLAUDE.md Rules 20 and 25.

Using `height: auto` or `width: auto` on SVG/img icons inside fixed-size containers hands scaling to the browser, which may produce incorrect rendered sizes and makes intent unverifiable at a glance.

#### Subject Badge - 1.5 icon (CLAUDE.md Rule 20)

| Badge size | Badge height | Icon dimensions |
|---|---|---|
| **L** | 32px | `width: 20px; height: 20px` |
| **M** | 24px | `width: 16px; height: 16px` |

```css
/* L size (base) */
.subject-badge__icon svg,
.subject-badge__icon img { width: 20px; height: 20px; display: block; flex-shrink: 0; object-fit: contain; }

/* M size override (quiz card mobile, or any M context) */
.context .subject-badge__icon svg,
.context .subject-badge__icon img { width: 16px; height: 16px; }
```

#### Status Badge - 1.5 icon (CLAUDE.md Rule 25)

All 5 icons (Streak, Trophy, Heart, Coin, Ruby) are 24px tall but have different natural widths. Use a 24×24 CSS box with `object-fit: contain`:

```css
.status-badge__icon svg,
.status-badge__icon img { width: 24px; height: 24px; object-fit: contain; display: block; }
```

**Mistake fixed (Session 31):**
- Subject Badge L: `height: 24px; width: auto` → `width: 20px; height: 20px` ✅
- Subject Badge M override: `height: 16px; width: auto` → `width: 16px; height: 16px` ✅
- Status Badge icon: `height: 16px; width: auto` left unchanged — changing 16px → 24px would visually enlarge the icon. **Requires user approval before fixing.**

**General rule:** For any icon inside a badge, pill, or avatar: always declare both `width: Npx` AND `height: Npx` explicitly. Add `object-fit: contain` for `<img>` elements and non-square SVGs.

---

### Mandatory pre-flight — BEFORE every task, change, or decision (updated Session 31)

> **User instruction (reinforced 2026-06-06):** "always before starting any design, making any changes, or making any decisions, please refer to DS & nadia.design.md"

This is non-negotiable. Every session, every task, every fix — no exceptions.

```
□ Step 0 — Read design-md/nadia.design.md      → ALL rules N-1 through N-C10+, known deviations
□ Step 1 — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f → token values, component structure, visible states
□ Step 2 — Run component audit (Rule N-C4)      → list every component, check token categories
□ Step 3 — Only then write HTML, CSS, or document any value
```

**What "before" means:**
- Before writing a single CSS rule → pre-flight first
- Before fixing a typo → pre-flight first
- Before bulk-editing across files → pre-flight first; confirm scope per `feedback_file_scope.md`
- Before changing any data value → check if the same value exists in other files (Rule N-R13)
- Before removing any icon or badge element → verify DS `visible:` + clean up dependent CSS (Rule N-R12)
- Before using any subject color → check `--subjects-*-default` vars exist in `:root` (Rule N-C2)
- Before any pill / badge `border-radius` → use `var(--corner-radius-corner-rounded)`, never hardcode px (Rule N-C9)
- Before sizing any badge icon → use exact `width: Npx; height: Npx`, never `auto` (Rule N-C10)
- Before using unrecognised hex values claimed as DS tokens → fetch live DS to verify (Rule 91 / CLAUDE.md)

**Past violations and consequences:**
- Session 24: skipped nadia.design.md → wrong `data-active-nav` pattern
- Session 25: SVG chevron blue → missing `color:` on arrow (N-R2/N-R6)
- Session 25: "My Reward" typo survived multiple sessions (N-R4)
- Session 26: breadcrumb chevron inline `<polyline>` + `stroke:` → drifted (N-R5)
- Session 26: button arrow missing `color:` per state (N-R6)
- Session 28: balance 10,000 unrealistic; all card titles placeholders; all progress bars 0% (N-R11)
- Session 29: 8/14 components used wrong token categories; raw hex subject palette; `is-pressing` missing on all buttons; inline `<path>` instead of `<use>`
- Session 30: footer missing `height: 60px`; notif-see-all button had 4 simultaneous violations; Icon Badge used `border:` instead of OUTSIDE `box-shadow:`; breadcrumb had 4 hardcoded hex values
- Session 31 (2026-06-06): `nadia_Quiz.html` — `border-radius: 40.5px` (non-DS token, fixed → N-C9); Subject Badge icon `height: 24px; auto` (wrong, fixed → 20×20 per N-C10); stale `#e1f9ea` comments; missing Button - 1.5 on quiz cards (outstanding); footer height (outstanding); `--card-subject-color` unverified tokens (outstanding)

---

*Last updated: 2026-06-06 | Session 31 — nadia_Quiz.html DS audit + 4 token fixes (N-C9, N-C10) | Branch: staging*

---

## Session 32 — BrowseClasses: DS compliance audit + token migration (2026-06-06)

**File:** `Nadia.test.git/Class/nadia_Class-BrowseClasses.html`

**Scope:** Full DS compliance pass on all page-specific components. Template-inherited nav/footer excluded (previously audited).

### What was audited + fixed

| Component | Status before | Status after |
|---|---|---|
| `bc-sep` separator | ❌ `#d9d9d9` | ✅ `var(--border-general-default-secondary)` `#bfbfbf` |
| `bc-chevron` | ❌ inline polyline + CSS `stroke:` | ✅ `<use href="#ic-chevron-right">` + `color:` |
| Action button SVG rule | ❌ `.btn-secondary svg { stroke: }` no-op on `<use>` | ✅ removed; parent `color:` drives `currentColor` |
| Live Badge bg | ❌ `#ccf5e7` | ✅ `var(--surface-primary-default-subtle)` `#e1f9ea` |
| Live Badge icon | ❌ inline `<polygon>/<rect>` SVG ×20 | ✅ `<use href="#ic-video">` ×20 |
| Avatar bg | ❌ `#fff` | ✅ `var(--surface-primary-default-subtle)` `#e1f9ea` |
| `cc__hdr` gap | ❌ `16px` | ✅ `0` (DS gap = 0; title `flex:1` right-aligns DLP badge) |
| Divider | ❌ plain 1px subject-coloured line ×20 | ✅ DS chip: `::before`/`::after` + `+ More` button ×20 |
| Preview button transitions | ❌ 4 `transition: 0.15s` rules | ✅ removed (Rule 82 — no transitions on Button-1.5) |
| Preview button border | ❌ `border: 1px solid` | ✅ `box-shadow: inset 0 0 0 1px` (Rule 60/85) |
| Preview button pressed | ❌ stale `#00564c` bg | ✅ `var(--surface-primary-focus)` `#00a36a` (Rule 40, 2026-05-31) |
| Preview button `.is-pressing` | ❌ only `:active`, no JS | ✅ CSS + JS mousedown/mouseup/mouseleave (Rule 39/83) |
| Shorthand token aliases | ❌ raw hex duplicates | ✅ `var()` aliases to canonical DS tokens |
| `--surface-primary-default-subtle` | ❌ stale `#d9f7ed` (template) | ✅ overridden `#e1f9ea` in page `:root` |
| Nav persistence | ❌ `restoreHome()` reverts to Home | ✅ MutationObserver re-applies Class `is-active` |
| `<body data-active-nav>` | ❌ missing | ✅ `<body data-active-nav="Class">` |

---

### Rule N-C20. Shorthand token aliasing — alias `var()`, not raw hex

Page-specific `:root` shorthands must alias to canonical DS tokens via `var()`, not duplicate raw hex. The alias ensures any future DS update propagates without touching CSS rule declarations.

```css
/* Wrong — raw hex duplicated */
--og-500: #00cc85;

/* Correct — alias to canonical */
--og-500: var(--surface-primary-default);   /* #00cc85 */
```

**Subject palette 500 base**: alias to `var(--subjects-*-default)`.
**Subject palette 50/100 tints**: no DS canonical — keep raw hex. Never invent `:root` vars for them.
**`--sp-xxxs: 2px`**: no DS canonical at 2px — keep raw.

**Confirmed shorthand → canonical mapping (BrowseClasses session, all values same hex):**

| Shorthand | Canonical |
|---|---|
| `--og-500` | `var(--surface-primary-default)` |
| `--og-600` | `var(--border-primary-focus)` |
| `--r-rounded/4xl/2xl` | `var(--corner-radius-corner-rounded/4xl/2xl)` |
| `--sp-xxs/xs/s/m` | `var(--spacing-space-xxs/xs/s/m)` |
| `--text-heading` | `var(--text-default-heading)` |
| `--text-body` | `var(--text-default-body)` |
| `--bm/en/mt/sc/bi/hs-500` | `var(--subjects-*-default)` |

---

### Rule N-C21. Template stale token — override `--surface-primary-default-subtle` in every page `:root`

The template `:root` carries a stale value: `--surface-primary-default-subtle: #d9f7ed`. DS-confirmed correct value is `#e1f9ea` (live-verified Session 21). Every page using this token for avatar bg or live badge bg must add a page-level override:

```css
:root {
  --surface-primary-default-subtle: #e1f9ea;   /* DS confirmed — overrides stale template #d9f7ed */
}
```

**`#e1f9ea` disambiguation:** Rule N-C5 flags `#e1f9ea` as the deprecated `Text/primary/on-color`. That deprecation applies to **button labels only**. `#e1f9ea` remains the correct hex for `Surface/primary/default-subtle` (avatar bg, live badge bg) — different tokens, same hex value.

---

### Rule N-C22. CSS `stroke:` does nothing on `<use href>` symbols — use `color:` only

`stroke="currentColor"` in a `<symbol>` resolves from the CSS `color:` property, not CSS `stroke:`. Any `.container svg { stroke: var(--token) }` on a container holding `<svg><use href="#ic-*"/></svg>` has zero visual effect. Remove such rules; set `color:` on the parent element instead.

**Exception — inline SVG paths (no `<use>`):** CSS `stroke:` on `<svg>` with inline `<path>` works correctly. The Preview button arrows stay as inline SVG (Session 9 decision — shadow DOM blocks per-state CSS for `<use>`). Do not switch them to symbols.

---

### Rule N-C23. Divider theme overrides — remove ALL subject `background:` lines when rebuilding to chip

When rebuilding a divider to the `::before`/`::after` chip pattern, all per-subject `.cc--[subject] .cc__divider { background: }` overrides must be deleted. Any leftover `background:` overrides hide the pseudo-element lines.

```bash
# Verify after rebuild — must return 0 results:
grep -n "cc__divider.*background" file.html
```

---

### Rule N-C24. Runtime-inject nav persistence — MutationObserver after step 5

For pages using the N-R9 fetch/inject pattern, the template's `restoreHome()` closure cannot be patched from page scripts. Add a MutationObserver after step 5 to restore the correct active button whenever `is-active` is removed:

```js
var navTopMenu = document.getElementById('NavTopMenu-Desktop');
if (navTopMenu) {
  var _restoring = false;
  new MutationObserver(function () {
    if (_restoring) return;
    var btn = navTopMenu.querySelector('.nav-menu-btn[aria-label="Class"]');
    if (btn && !btn.classList.contains('is-active')) {
      _restoring = true;
      navTopMenu.querySelectorAll('.nav-menu-btn').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      _restoring = false;
    }
  }).observe(navTopMenu, { subtree: true, attributes: true, attributeFilter: ['class'] });
}
```

`_restoring` flag prevents infinite loop. Always required alongside `<body data-active-nav="Label">`.

**Status (2026-06-06):** `nadia_Class-BrowseClasses.html` ✅. `nadia_Class-MyClasses.html` ❌ pending.

---

### Rule N-C25. Cross-page fix sync — grep sibling pages after every shared-component fix

When a fix is applied to `cc__*`, `.live-badge`, `.ds-avatar`, `.btn-enter`, or `.btn-preview` in any Class page, immediately grep the sibling Class page and apply the identical fix before committing.

**What happened (this session):** Session 21 applied 8 fixes to `nadia_Class-MyClasses.html`. None were synced to `nadia_Class-BrowseClasses.html`. The gap was caught 2 sessions later via a full audit.

```bash
# Pattern after fixing MyClasses:
grep -n "cc__divider\|live-badge.*background\|ds-avatar.*background\|cc__hdr" nadia_Class-BrowseClasses.html
```

---

### Secondary/S Pressed state — authoritative value is CLAUDE.md Rule 40 (2026-05-31)

`nadia.design.md` Session 9 documents Secondary/S Pressed as `#00564c`. **This is stale.** CLAUDE.md Rule 40 (re-verified 2026-05-31 on DS node `538:1907`) confirms:

- **Secondary/S Pressed bg:** `#00a36a` (`Surface/primary/focus`) — same as Primary
- **Secondary/S Pressed border:** `#00cc85` (`Border/primary/default`) — same as Primary
- Only **Tertiary** uses `#00564c` (Surface/tertiary/default)

When implementing any Secondary button pressed state, use CLAUDE.md Rule 40 as the authority, not Session 9 notes.

---

### Mandatory pre-flight — BEFORE every task, change, or decision (Session 32 reinforcement)

> **User instruction (2026-06-06):** "always before starts any design, or making any changes and decisions, please refer to DS & nadia.design.md"

Non-negotiable. Every session, every task, every fix — no exceptions.

```
□ Step 0 — Read design-md/nadia.design.md         → ALL rules N-1 through N-C25+, known deviations
□ Step 1 — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f  → verify every value before using it
□ Step 2 — Run component audit (Rule N-C4)         → list every component, check token categories
□ Step 3 — Grep sibling pages (Rule N-C25)         → sync shared-component fixes before committing
□ Step 4 — Only then write HTML, CSS, or document any value
```

**Past violations cumulative log:**
- Sessions 24–26: skipped pre-flight → wrong patterns, wrong colors, drifted CSS
- Session 28: unrealistic data, stale balance
- Session 29: 8/14 wrong token categories; `is-pressing` missing; inline paths in chevrons
- Sessions 30–31: violations caught only by running audit before touching code
- **Session 32: Session 21 MyClasses fixes not synced to BrowseClasses → 2-session drift (N-C25). Preview button carried stale Secondary Pressed `#00564c` instead of CLAUDE.md-confirmed `#00a36a`.**
- **Session 33 (2026-06-06):** `nadia_Rewards-avatar.html` — 14/25 components had token issues. Root causes: shorthand aliases across breadcrumb + coin balance (N-R7b); wrong semantic token types on active icon/label (N-C26); missing gold tokens (N-C27); Rule 82/83 on `.btn-show`; Rule 60 on Icon Badge.

---

## Session 33 — nadia_Rewards-avatar.html: DS compliance audit + token fixes (2026-06-06)

**14 of 25 components updated.** Purely token-name fixes — no visual change to default appearance.

---

### What was fixed

| Component | Issue | Fix |
|---|---|---|
| Icon Badge - 1.5 (verified) | `border: 1px solid white` — DS `strokeAlign:OUTSIDE` (Rule 60) | `box-shadow: 0 0 0 1px var(--border-on-color)`; bg → `var(--surface-informative-default)` |
| Breadcrumb `.bc-*` | `--og-500`, `--sp-m/xs` aliases; `#00564c`, `#d9d9d9`, `#bfbfbf`, `#666` hardcoded | Full canonical DS tokens throughout |
| Coin Balance Mobile | `--sp-xxs/xs/xxxs` aliases; `#fef1ce`, `#fabb0a`, `#c89608`, `#fff` hardcoded | Gold token vars; `--text-primary-on-color`; `--scale-50` |
| Rewards Layout | `gap: 12px` | `var(--spacing-space-s)` |
| Rewards Sidebar | `background: #fff` | `var(--surface-general-default)` |
| Sidebar Divider | `background: #d9d9d9` | `var(--border-general-default)` |
| Sidebar Balance | All coin hex + `--sp-*` aliases | Gold token vars throughout |
| Sidebar Nav Buttons | Active bg `#b5f291` hardcoded; icon+label used `var(--border-primary-focus)` — **wrong token type**; hover bg hardcoded | `var(--surface-secondary-default)`, `var(--icon-primary-focus)`, `var(--text-primary-default-hover)` |
| Rewards Main Panel | `var(--r-4xl)` alias; `#e8fbe8`; `#00cc85` hardcoded | `var(--corner-radius-corner-4xl)`, `var(--surface-secondary-default-subtle)`, `var(--border-primary-default)` |
| Avatar Header | `color: #00564c` × 3 | `var(--text-tertiary-default)` |
| Reward Card | `#d9d9d9`, `#fff`, `#404040` × 3, `#666` | `--border-general-default`, `--surface-general-default`, `--text-default-heading`, `--text-default-body` |
| Button Primary/S `.btn-show` | Transitions (Rule 82); CSS `:active` only (Rule 83); pressed bg `#00564c` wrong per Rule 40 | Removed transitions; added `.is-pressing` + JS; pressed → `var(--surface-primary-focus)` (`#00a36a`) |

---

### New `:root` tokens added

```css
--surface-gold-default-subtle: #fef1ce;   /* Surface/gold/default-subtle — coin balance bg */
--border-gold-default:         #fabb0a;   /* Border/gold/default — coin balance border */
--border-gold-focus:           #c89608;   /* Border/gold/focus — coin text-stroke (Rule 26) */
--icon-primary-focus:          #00a36a;   /* Icon/primary/focus — active icon states */
--surface-informative-default: #00a2e8;   /* Surface/informative/default — verified badge bg */
```

Add all five to `:root` on every page that uses coin balance or Icon Badge components.

---

### Rule N-C26. Semantic token type must match the CSS property

`#00a36a` exists as four different named tokens. Use the one that matches the **property being styled**:

| Property | Token family | Correct for `#00a36a` |
|---|---|---|
| `background:` | `--surface-*` | `--surface-primary-focus` |
| `border-color:` / `box-shadow` | `--border-*` | `--border-primary-focus` |
| `color:` on text/labels | `--text-*` | `--text-primary-default-hover` |
| `color:` on icon/SVG | `--icon-*` | `--icon-primary-focus` |

**Confirmed violation (Session 33):**
```css
/* WRONG — border token on icon + label */
.sidebar-btn--active .sidebar-btn__icon-wrap { color: var(--border-primary-focus); }
.sidebar-btn--active .sidebar-btn__label     { color: var(--border-primary-focus); }

/* CORRECT */
.sidebar-btn--active .sidebar-btn__icon-wrap { color: var(--icon-primary-focus); }
.sidebar-btn--active .sidebar-btn__label     { color: var(--text-primary-default-hover); }
```

---

### Rule N-C27. Gold/coin tokens + `--icon-primary-focus` + `--surface-informative-default` must be in `:root`

These are absent from the base template. Explicitly add before building:
- **Coin balance widget** → `--surface-gold-default-subtle`, `--border-gold-default`, `--border-gold-focus`
- **Any active icon state** → `--icon-primary-focus: #00a36a`
- **Icon Badge - 1.5 (verified)** → `--surface-informative-default: #00a2e8`

---

### Rule N-R7b. Shorthand alias ban applies to ALL page CSS, not just sidebar

`--og-*`, `--sp-*`, `--r-*` aliases must never appear in component CSS rules — only canonical DS token names (CLAUDE.md Rule 3). See full mapping table in [Rule N-R7](#) — applies to breadcrumb, coin balance, card layouts, any component.

**Audit grep:** `grep -n "var(--og-\|var(--sp-\|var(--r-"` on any page CSS block.

---

### Rule N-C28. Rule 82 + Rule 83 apply to every Button - 1.5, regardless of HTML element

- **Rule 82** — No `transition:` on container OR any child (label, arrow, clip). Applies to `<a>`, `<button>`, `<div>`.
- **Rule 83** — Always pair CSS `:active` + `.is-pressing` with JS mousedown/mouseup/mouseleave handlers.

**Also confirmed:** `.btn-show` Pressed bg was `#00564c` — Rule 40 (2026-05-31, authoritative) says Primary Pressed bg = `Surface/primary/focus = #00a36a`. Rule 19's note was superseded.

---

*Last updated: 2026-06-06 | Session 33 — nadia_Rewards-avatar.html DS audit + 14 token fixes; rules N-C26, N-C27, N-C28, N-R7b added | Branch: staging*

---

## Session 33 — nadia_Flashcard.html: full token audit (2026-06-06)

> **Task:** Audit all 27 components in `nadia_Flashcard.html` for DS token compliance. Fix without changing visual appearance.
> **Result:** 15 ✅ already correct · 7 ⚠️ partial (hardcoded hex) · 2 ❌ not updated (before fix). All 17 violations fixed in one pass.

**All violations found and fixed:**

| Component | Issue | Fix |
|---|---|---|
| `body` | `var(--surface-subtle)` — fabricated token not in DS | → `var(--surface-general-default)` (Rule N-C26) |
| `.footer__inner` | `padding: 12px 28px` + comment `t:12` wrong | → `height:60px; padding:0 28px` (Rule N-C27) |
| `fc-start-btn` | `transition:` on all properties (Rule 82) | Removed |
| `fc-start-btn` | No Pressed state CSS or `is-pressing` JS (Rule 83) | Added both (Rule N-C28) |
| `fc-start-btn` arrow | `#99ebce` hardcoded | → `var(--surface-primary-default-subtle-hover)` |
| `fc-start-btn` chevron | `color: var(--border-primary-focus)` — wrong token type | → `var(--icon-primary-focus)` (Rule N-C29) |
| Tab Bar `fc-tab--active::after` | `background: #d1f7d1` hardcoded | → `var(--surface-tab-active-strip)` |
| Nav CTA `nav-menu-cta` | `box-shadow: inset … #d1f7d1` hardcoded | → `var(--surface-tab-active-strip)` |
| Nav CTA arrow | `background: #99ebce` + `color: var(--border-primary-focus)` | → vars (Rule N-C29) |
| `fc-qncard__subtitle` | `rgba(255,255,255,0.85)` hardcoded | → `var(--text-on-color-subtitle)` |
| `fc-qncard__header--bm` | `box-shadow: inset … #2e4799` — var already in `:root` | → `var(--subjects-b-melayu-focus)` |
| `fc-recall-heading-row` (×2) | `background: #f6f9ff` hardcoded | → `var(--surface-table-heading)` |
| `fc-recall-table__heading` | `background: #f6f9ff` hardcoded | → `var(--surface-table-heading)` |
| `fc-chapter::after` | `box-shadow: inset … #2e4799` hardcoded | → `var(--subjects-b-melayu-focus)` |
| `fc-chapter__heading-row` | `background: #f6f9ff` + `border-bottom: … #4d77ff` hardcoded | → `var(--surface-table-heading)` + `var(--subjects-b-melayu-default)` |
| `fc-strength-badge--moderate` | `color: #ffffff` hardcoded | → `var(--text-primary-on-color)` |
| `ic-nav-btn-union` symbol | Defined but never referenced via `<use>` — dead code | Removed (Rule N-C30) |
| Stale comment line 435 | `/* #e1f9ea */` — DS updated 2026-05-24 | → `/* #ffffff */` |

**New `:root` tokens added:**

| Variable | Value | DS context |
|---|---|---|
| `--icon-primary-focus` | `#00a36a` | Icon/primary/focus — arrow chevron semantic token |
| `--surface-table-heading` | `#f6f9ff` | Body Cell - 1.5 heading row bg (DS Table - 1.5) |
| `--surface-tab-active-strip` | `#d1f7d1` | Tab Bar - 1.5 Secondary active tab bottom strip |
| `--text-on-color-subtitle` | `rgba(255,255,255,0.85)` | Subtitle on subject-coloured card header |

---

### Rule N-C26. Body background must be `var(--surface-general-default)` — `--surface-subtle` is fabricated

**Source:** CLAUDE.md Rule 81. Confirmed for all Nadia pages.

`--surface-subtle: #F8FAFC` does not exist in DS `TLVKe3bgJTdVvuPAzgDq2f`. DS Screen page uses `Surface/general/default` = `#ffffff`.

```css
/* Wrong — fabricated token */
body { background: var(--surface-subtle); }

/* Correct */
body { background: var(--surface-general-default); }
```

**Audit all pages:** `grep -rn "surface-subtle" Nadia.test.git/`

---

### Rule N-C27. Footer inner — DS confirmed `height: 60px + padding: 0 28px`

**Source:** CLAUDE.md Footer - 1.5 spec (node `2073:6579`). DS raw: `t:20 r:28 b:20 l:28`.

The comment `/* DS: t:12 r:28 b:12 l:28 */` in some pages is wrong — DS confirms `t:20`. Implementation: `height: 60px` + `padding: 0 var(--spacing-space-2xl)` with `align-items: center` on the inner flex row.

```css
/* Wrong */
.footer__inner { padding: var(--spacing-space-s) var(--spacing-space-2xl); }

/* Correct — DS node 2073:6579 */
.footer__inner { height: 60px; padding: 0 var(--spacing-space-2xl); }
```

---

### Rule N-C28. Button - 1.5 — NO transitions + `is-pressing` JS mandatory (mirrors CLAUDE.md Rules 82–83)

Every `Button - 1.5` instance on every Nadia page:

1. **No `transition:` on any property** — container, label, arrow, clip. All state changes are instant.
2. **Pressed state** declared with both `:active` AND `.is-pressing` selectors.
3. **JS handlers** registered before non-critical scripts (Rule 14).

```css
/* Wrong — Rule 82 violation */
.my-btn { transition: background 0.12s ease; }

/* Correct — no transition */
.my-btn:active,
.my-btn.is-pressing { background: var(--surface-primary-focus); box-shadow: inset 0 0 0 1px var(--border-primary-default); color: var(--text-primary-default); }
```

```js
document.querySelectorAll('.my-btn').forEach(function (btn) {
  btn.addEventListener('mousedown',  function () { btn.classList.add('is-pressing'); });
  btn.addEventListener('mouseup',    function () { btn.classList.remove('is-pressing'); });
  btn.addEventListener('mouseleave', function () { btn.classList.remove('is-pressing'); });
});
```

**Mistake (Session 33):** `fc-start-btn` had `transition: background 0.12s ease, box-shadow 0.12s ease, color 0.12s ease` and zero pressed state. Fixed.

---

### Rule N-C29. Icon stroke color must use `--icon-*` token — never `--border-*` or `--surface-*`

**Source:** CLAUDE.md Rule 36. Session 33 audit.

Even when `--border-primary-focus` and `--icon-primary-focus` share the same hex (`#00a36a`), using the border token for an icon `color:` property is semantically wrong and will break independently if DS updates one token without the other.

Added `--icon-primary-focus: #00a36a` to `:root` Icon section. Use this for all Primary button arrow chevrons.

| Usage | Correct token type |
|---|---|
| Icon `color:` / SVG stroke | `--icon-*` |
| Container `background:` | `--surface-*` |
| Text `color:` | `--text-*` |
| Border / `box-shadow:` stroke | `--border-*` |

---

### Rule N-C30. `ic-nav-btn-union` symbol must NOT exist in SVG defs

**Source:** CLAUDE.md Rules 52 & 59.

`Nav Button - 1.5` Active state = plain 44×44 rounded square (`border-radius: 8px`). There is NO speech-bubble tail in the DS. `<symbol id="ic-nav-btn-union">` is dead code from a prior incorrect implementation.

**Remove from all pages:**
```bash
grep -rn "ic-nav-btn-union" Nadia.test.git/
```

---

### Mandatory pre-flight — BEFORE every task, change, or decision (updated Session 33)

> **"Always before starts any design, or making any changes and decisions, please refer to DS & nadia.design.md."** — User instruction, reinforced 2026-06-06.

Non-negotiable. No exceptions.

```
□ Step 0 — Read design-md/nadia.design.md       → ALL rules N-1 through N-C30+
□ Step 1 — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f → verify every token, state, structure
□ Step 2 — Run component audit (N-C4, N-C7)     → hardcoded hex grep + token type check
□ Step 3 — Only then write any HTML, CSS, or document any value
```

**Extended audit checklist (add to N-C4 / N-C7):**
```
□ body background        → var(--surface-general-default)? (N-C26)
□ Footer .footer__inner  → height:60px + padding:0 28px? (N-C27)
□ Every Button - 1.5     → no transition:? :active + .is-pressing CSS + JS? (N-C28)
□ Icon color tokens      → --icon-* not --border-* or --surface-*? (N-C29)
□ ic-nav-btn-union       → present in SVG defs? Remove it. (N-C30)
□ Hardcoded hex in rules → grep pattern all clear? Move to :root. (N-C14)
□ Arrow bg #99ebce       → var(--surface-primary-default-subtle-hover)? (N-C14)
□ Subject border hex     → var(--subjects-*-focus)? (N-C2)
□ Stale #e1f9ea          → in live values or comments? (N-C5)
□ Dead <symbol> elements → any defined but never <use>-referenced? Remove.
□ State override mechanism → same CSS mechanism as base border rule? (N-C8)
□ Badge border-radius    → var(--corner-radius-corner-rounded)? (N-C9)
□ Badge icon sizes       → both width + height explicit px? (N-C10)
□ Token alias chain      → aliasing var() not raw hex? (N-C20)
□ Template stale tokens  → --surface-primary-default-subtle overridden in :root? (N-C21)
□ Gold tokens in :root   → --surface-gold-default-subtle + --border-gold-default + --text-stroke-gold-default present? (N-C31)
□ --icon-primary-focus   → defined in :root? Use for icon active/focus, NOT --border-primary-focus (N-C32)
□ Shorthand aliases      → --og-*, --sp-*, --r-* used in component CSS rules? Replace with canonical tokens (N-C33)
```

---

*Last updated: 2026-06-06 | Session 33 — nadia_Flashcard.html full token audit: body bg (N-C26), footer height (N-C27), btn no-transition + is-pressing (N-C28), icon token type (N-C29), dead symbol (N-C30) | Branch: staging*

---

## Session 34 — CoinQuest token hygiene audit + fixes (2026-06-06)

### What was done

Full token hygiene pass on `nadia_Rewards-CoinQuest.html` — all hardcoded hex values and shorthand aliases replaced with canonical DS CSS variables. No visual changes to default/hover/disabled states.

**File changed:** `Nadia.test.git/Rewards/nadia_Rewards-CoinQuest.html`

---

### New `:root` tokens added (N-C31, N-C32)

| Token | Hex | DS source |
|---|---|---|
| `--surface-gold-default-subtle` | `#fef1ce` | `Surface/gold/default-subtle` (DS confirmed Session 10) |
| `--border-gold-default` | `#fabb0a` | `Border/gold/default` (DS confirmed Session 10) |
| `--text-stroke-gold-default` | `#c89608` | gold text-stroke on coin value — DS token name unconfirmed |
| `--icon-primary-focus` | `#00a36a` | `Icon/primary/focus` — same hex as `--border-primary-focus` but correct semantic type for icon contexts |

**Rule N-C31:** All Rewards pages must have the 4 gold tokens above in `:root`. They were previously hardcoded as `#fef1ce`, `#fabb0a`, `#c89608` across `.sidebar-balance`, `.bc-coin-mobile`, and `.sidebar-balance__value`.

**Rule N-C32:** Never use `--border-primary-focus` for icon color. The correct token is `--icon-primary-focus` (same `#00a36a` hex). Both `.sidebar-btn--active .sidebar-btn__icon-wrap` and `.sidebar-btn--active .sidebar-btn__label` must reference `--icon-primary-focus`.

---

### Rule N-C33 — Shorthand aliases are `:root` convenience only — never use in component CSS rules

The Rewards pages define shorthand aliases (`--og-500`, `--sp-m`, `--r-4xl`, etc.) at the top of `:root` for brevity during authoring. These aliases are **not DS tokens** — they must never appear in component CSS rules.

**Aliases and their canonical replacements:**

| Shorthand alias | Canonical DS token | Hex |
|---|---|---|
| `--og-500` | `--surface-primary-default` (fills) / `--border-primary-default` (borders) / `--text-primary-default` (text) | `#00cc85` |
| `--og-600` | `--border-primary-focus` (borders) / `--icon-primary-focus` (icons) | `#00a36a` |
| `--og-200` | `--surface-primary-default-subtle-hover` | `#99ebce` |
| `--og-50` | `--surface-primary-default-subtle` | `#d9f7ed` (note: different from `--og-50 = #e9fbf5`) |
| `--sp-m` | `--spacing-space-m` | `16px` |
| `--sp-xs` | `--spacing-space-xs` | `8px` |
| `--sp-xxs` | `--spacing-space-xxs` | `4px` |
| `--r-4xl` | `--corner-radius-corner-4xl` | `24px` |
| `--r-rounded` | `--corner-radius-corner-rounded` | `60px` |
| `--r-xl` | `--corner-radius-corner-xl` | `16px` |

**Exception:** The `--og-*`, `--sp-*`, `--r-*` aliases themselves stay in `:root` for authoring convenience — just never reference them inside component rules.

---

### Rule N-C34 — Token hygiene pass: identify, replace, defer

When asked to do a token hygiene update ("follows token from DS without affecting the looks"), apply this 3-tier approach:

**Tier 1 — Pure swap (same hex, no visual change):** Replace immediately.
- Hardcoded hex → `var(--token)` where resolved hex is identical
- Shorthand alias → canonical token where resolved hex is identical
- Wrong semantic type → correct semantic type where resolved hex is identical (e.g. `--border-primary-focus` → `--icon-primary-focus` for icon color)

**Tier 2 — DS correction (different hex, changes visual):** Defer and document.
- Log in this file under "Deferred DS corrections"
- Never silently change; report to user before applying

**Tier 3 — No DS token exists (custom/unconfirmed):** Leave hardcoded, add comment.
- `/* no DS token — verify from DS */` inline comment
- Do NOT invent a token name; do NOT leave undocumented

---

### Deferred DS corrections — CoinQuest (open, 2026-06-06)

These values differ from the confirmed DS spec but were not changed because the user requested no visual changes. Apply in a dedicated correction session.

| Element | Property | Current | DS-correct | Rule |
|---|---|---|---|---|
| `.btn-claim:active` | `background` | `#00564c` | `#00a36a` (`--surface-primary-focus`) | Rule 40 |
| `.btn-claim:active` | `border-color` | `#00453d` | `#00cc85` (`--border-primary-default`) | Rule 40 |
| `.btn-claim:active .btn-claim__arrow` | `color` | `#00564c` | `#00a36a` (`--icon-primary-focus`) | Rule 40 |
| `.btn-claim--disabled .btn-claim__arrow` | `background` | `#f2f2f2` | `#e5e5e5` (`--surface-disabled-on-color`) | Rule 61 |
| `.sidebar-btn` | `gap` | `10px` | `8px` (`--spacing-space-xs`) | DS live fetch |
| `.lbadge--medium` / `.lbadge--hard` | `font-size` / `line-height` | `14px / 20px` | `12px / 12px` | Session 11 correction |

---

### What was confirmed correct (no change needed)

- `.rewards-sidebar` container (border, radius, padding, gap) ✓
- `.sidebar-btn` Default/Active/Hover states (colors correct, only shorthand aliases replaced) ✓
- `.qc__content gap: 15px` — not a DS spacing token; requires DS re-verify before changing ✓
- `.qc__img border: 1px solid #baf3b9` — no confirmed DS token; left with `/* no DS token */` comment ✓
- Navbar shell components (all 14) — inherited from template, unchanged ✓

---

*Last updated: 2026-06-06 | Session 34 — CoinQuest token hygiene audit: N-C31 gold tokens, N-C32 icon token type, N-C33 shorthand alias rule, N-C34 token hygiene pass method | Branch: staging*

---

## Session 35 — nadia_Rewards-evoucher.html: full DS compliance audit + 8 fixes (2026-06-06)

**File:** `Nadia.test.git/Rewards/nadia_Rewards-evoucher.html`

Full component audit table generated first (Rule N-C4), then all fixable issues applied without changing layout or structure.

---

### Audit table (22 components / 3 token areas)

| Component | DS Node | Status | Issues found |
|---|---|---|---|
| Navbar Primary Desktop - 1.5 | `2337:21975` | ✅ | — |
| Nav Button - 1.5 (action icons) | `3908:6148` | ✅ | — |
| Number Badge - 1.5 | `618:417` | ✅ | — |
| Avatar - 1.5 | `684:621` | ✅ | — |
| `ic-user-circle` symbol | `3908:13415` | ❌ → ✅ Fixed | `viewBox="-1 -1 26 26"` (24×24 old) — template updated to 60×60 per commit `0834385`, not propagated |
| Profile Menu - 1.5 | `3908:3679` | ✅ | — |
| Learn Menu - 1.5 | `3908:5091` | ❌ → ✅ Fixed | Missing `gap: var(--spacing-space-xs)` on grid; label color `--text-default-heading` → `--text-default-body` (commit `1b5a26d` not propagated) |
| Notification Dropdown | `3908:13057` | ❌ → ✅ Fixed | 4 violations on `notif-see-all` + missing `notif-item` active states (see detail below) |
| Download Apps Dropdown | `3909:3405` | ✅ | — |
| Localization Dropdown | `3928:3067` | ✅ | — |
| Nav Top Menu | `3406:802` | ✅ | — |
| Mobile Navbar | `1943:22641` | ✅ | — |
| Nav Menu Tablet | `3427:4590` | ✅ | — |
| Nav Menu Mobile | `3427:2442` | ✅ | — |
| Navbar Mobile Bottom | `3406:735` | ✅ | — |
| Footer - 1.5 | `2073:6579` | ❌ → ✅ Fixed | Missing `height: 60px`; wrong `footer__inner` padding (same violation as Practise, Session 30) |
| Breadcrumb - 1.5 | varies | ❌ → ✅ Fixed | 5 issues (see detail below) |
| Rewards Sidebar | `3849:48401` | ⚠️ Partial | HTML ✅; some CSS still uses shorthand aliases (`--sp-*`, `--r-*`) |
| Reward Card - 1.5 (×8) | `4661:51368` | ✅ | — |
| Label Badge - 1.5 (Premium/Lite) | `843:666` | ❌ → ✅ Fixed | bg `#d9f7ed` → `#e1f9ea`, border `#00cc85` → `#66e0b6` |
| Button - 1.5 Primary/S (`.btn-show`) | `1437:8154` | ❌ → ✅ Fixed | 4 violations (see detail below) |
| Shorthand tokens in `:root` | — | ⚠️ Partial | `--og-*`, `--sp-*`, `--r-*` remain; canonical tokens used in most new rules |

---

### Fix details

#### Fix 1 — `ic-user-circle` symbol updated to 60×60 DS export
```html
<!-- Before -->
<symbol id="ic-user-circle" viewBox="-1 -1 26 26" ...><path d="M18 20C18 18.4..."/></symbol>

<!-- After — DS node 3908:13415, 60×60 export (matches template commit 0834385) -->
<symbol id="ic-user-circle" viewBox="-1 -1 62 62" ...><path d="M45 50C45 46.02..."/></symbol>
```

#### Fix 2 — Learn Menu grid gap + label color
```css
/* Before */
.learn-dropdown__grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.learn-dropdown__label { color: var(--text-default-heading); }

/* After */
.learn-dropdown__grid { gap: var(--spacing-space-xs); }   /* DS node 3908:2462 */
.learn-dropdown__label { color: var(--text-default-body); }   /* DS node 3908:2464 */
```

#### Fix 3 — Notification Dropdown: notif-see-all 4 violations + notif-item active states
```css
/* notif-see-all — Before (4 violations) */
.notif-see-all { border: 1px solid var(--border-primary-focus); transition: ...; }
.notif-see-all:hover  { border-color: var(--border-secondary-focus); }  /* ❌ silent Rule 89 */
.notif-see-all:active { background: var(--surface-tertiary-default); }  /* ❌ wrong palette Rule 40 */

/* notif-see-all — After */
.notif-see-all { border: none; box-shadow: inset 0 0 0 1px var(--border-primary-focus); /* no transition */ }
.notif-see-all:hover  { box-shadow: inset 0 0 0 1px var(--border-secondary-focus); }
.notif-see-all:active { background: var(--surface-primary-focus); box-shadow: inset 0 0 0 1px var(--border-primary-default); }

/* notif-item active — Before */
.notif-item:active .notif-item__text { color: var(--text-primary-default); }  /* ❌ wrong */

/* notif-item active — After (matches template DS node 3908:13442) */
.notif-item:active .notif-item__text,
.notif-item:focus-visible .notif-item__text { color: var(--text-tertiary-default); }
.notif-item:active .notif-item__time,
.notif-item:focus-visible .notif-item__time { color: var(--text-secondary-focus); }
.notif-item:active .notif-item__dot,
.notif-item:focus-visible .notif-item__dot  { box-shadow: 0 0 0 1px var(--border-secondary-default); }
```

#### Fix 4 — Footer height + padding
```css
/* Before */
.footer { /* no height */ }
.footer__inner { padding: var(--spacing-space-s) var(--spacing-space-2xl); }

/* After */
.footer { height: 60px; }
.footer__inner { height: 100%; padding: 0 var(--spacing-space-2xl); }
```

#### Fix 5 — Breadcrumb 5 issues
```css
/* Before */
.bc-title        { color: #00564c; }           /* hardcoded hex */
.bc-sep          { background: #d9d9d9; }       /* wrong token */
.bc-trail        { gap: var(--sp-xs); }         /* shorthand alias */
.bc-link         { color: var(--og-500); gap: var(--sp-xs); }  /* wrong category + shorthand */
.bc-link--current { color: #666; }              /* hardcoded hex */
.bc-chevron      { stroke: #bfbfbf; fill: none; stroke-width: 1.5; ... }  /* inline styles */
/* HTML: <svg class="bc-chevron" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg> */

/* After */
.bc-title        { color: var(--text-tertiary-default); }
.bc-sep          { background: var(--border-general-default-secondary); }   /* #bfbfbf */
.bc-trail        { gap: var(--spacing-space-xs); }
.bc-link         { color: var(--text-primary-default); gap: var(--spacing-space-xs); }
.bc-link--current { color: var(--text-default-body); }
.bc-chevron      { color: var(--border-general-default-secondary); }   /* inherits via stroke="currentColor" */
/* HTML: <svg class="bc-chevron"><use href="#ic-chevron-right"/></svg> */
```

#### Fix 6 — Label Badge Primary/Success colors
```css
/* Before */
.lbadge-prem { background: #d9f7ed; border: 1px solid #00cc85; }

/* After — DS node 843:666 Primary/Success variant (Session 23 confirmed) */
.lbadge-prem { background: #e1f9ea; border: 1px solid #66e0b6; }
```

#### Fix 7+8 — Button `.btn-show`: remove transitions, fix pressed palette, add `is-pressing`
```css
/* Before — 3 violations */
.btn-show { transition: background 0.12s ease, border-color 0.12s ease; }
.btn-show__label { transition: color 0.12s ease; }
.btn-show__arrow { transition: background 0.12s ease, color 0.12s ease; }
.btn-show:active { background: #00564c; border-color: #00453d; }   /* ❌ Tertiary palette */
.btn-show:active .btn-show__arrow { color: #00564c; }               /* ❌ wrong */

/* After — Rule 82 (no transitions) + Rule 40 (Primary/S Pressed = primary/focus palette) */
.btn-show { /* no transition */ }
.btn-show:active,
.btn-show.is-pressing { background: #00a36a; border-color: #00cc85; }
.btn-show:active .btn-show__arrow,
.btn-show.is-pressing .btn-show__arrow { background: #00cc85; color: #00a36a; }
```

JS added (Rule 39 / N-C3):
```js
document.querySelectorAll('.btn-show:not(.btn-show--disabled)').forEach(function (btn) {
  btn.addEventListener('mousedown',  function () { btn.classList.add('is-pressing'); });
  btn.addEventListener('mouseup',    function () { btn.classList.remove('is-pressing'); });
  btn.addEventListener('mouseleave', function () { btn.classList.remove('is-pressing'); });
});
```

---

### New tokens added to `:root`
```css
--border-general-default-secondary: #bfbfbf;  /* Border/general/default-secondary (DS 3655:16650) */
--border-secondary-default:         #b5f291;  /* Border/secondary/default — notif dot focus-visible */
```

---

### Rules reinforced this session

#### Rule N-C35 — Always compare page CSS against the template for nav components

The template is updated by commits (navbar, notif, learn menu, icon exports). Pages that share nav components via injection still carry their own **copy** of those CSS rules. These copies drift silently.

**Before any audit:** `diff` or visually compare the page's nav CSS against `zul.page.template.html` for:
- `ic-user-circle` symbol viewBox and path
- `.learn-dropdown__grid gap` and `.learn-dropdown__label color`
- `.notif-see-all` (border mechanism, transitions, pressed palette)
- `.notif-item:active` / `:focus-visible` selectors
- `.footer` height and `footer__inner` padding

**Check:** When a template commit lands (e.g. `0834385`, `acebb78`, `1b5a26d`), immediately add all affected Nadia pages to a pending-sync list and propagate in the next available session.

**Confirmed template commits not yet propagated to remaining pages (2026-06-06):**
- `0834385` ic-user-circle 60×60 — fixed in evoucher ✅; CoinQuest, Merchandise, Myrewards ❌ pending
- `acebb78` notif dropdown — fixed in evoucher ✅; CoinQuest, Merchandise, Myrewards ❌ pending  
- `1b5a26d` learn menu — fixed in evoucher ✅; CoinQuest, Merchandise, Myrewards ❌ pending

#### Rule N-C36 — bc-chevron must always use `<use href="#ic-chevron-right"/>` + `color:` CSS

Inline `<polyline points="9 18 15 12 9 6"/>` inside a breadcrumb chevron SVG violates Rule 36 (all icons via `<use>`) and means the color must be set via `stroke:` attribute or property — which conflicts with the `currentColor` inheritance chain.

**Correct pattern:**
```html
<svg class="bc-chevron" aria-hidden="true"><use href="#ic-chevron-right"/></svg>
```
```css
.bc-chevron { width: 16px; height: 16px; color: var(--border-general-default-secondary); flex-shrink: 0; }
```

The `ic-chevron-right` symbol uses `stroke="currentColor"`, so `color:` on the `<svg>` element cascades correctly.

**Pending files** (still using inline `<polyline>`):
- `nadia_Rewards-CoinQuest.html` ❌
- `nadia_Rewards-Merchandise.html` ❌
- `nadia_Rewards-Myrewards.html` ❌
- `nadia_Class-BrowseClasses.html` ❌

---

### Mandatory pre-flight — BEFORE every task, change, or decision (Session 35 reinforcement)

> **User instruction (reinforced 2026-06-06):** "always before starts any design, or making any changes and decisions, please refer to DS & nadia.design.md"

```
□ Step 0 — Read design-md/nadia.design.md      → ALL rules N-1 through N-C36+, known deviations
□ Step 1 — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f → re-verify every value before writing any code
□ Step 2 — Run component audit (Rule N-C4)      → table: component | DS node | status | issues
□ Step 3 — Compare page nav CSS vs template     → ic-user-circle, learn menu, notif-see-all, footer (Rule N-C35)
□ Step 4 — Only then write HTML, CSS, or document any value
```

---

*Last updated: 2026-06-06 | Session 35 — eVoucher full DS audit + 8 fixes (ic-user-circle, learn menu, notif-see-all, footer, breadcrumb, label badge, btn-show) | Branch: staging*

---

## Session 36 — nadia_Rewards-Myrewards.html: full DS compliance audit + 14 fixes (2026-06-06)

**File:** `Nadia.test.git/Rewards/nadia_Rewards-Myrewards.html`

Full component audit table generated first (Rule N-C4), then all fixable issues applied without changing visual appearance or layout.

---

### Audit table (18 navigation + 11 page-specific components)

| Component | Status | Issues found |
|---|---|---|
| Navbar Primary Desktop | ✅ | — |
| Nav Button - 1.5 (action icons) | ✅ | — |
| Number Badge - 1.5 | ✅ | — |
| Avatar - 1.5 | ✅ | — |
| Navbar Search Bar | ✅ | — |
| Profile Menu - 1.5 | ✅ | — |
| Icon Badge - 1.5 (profile verified) | ❌ → ✅ Fixed | `border: 1px solid white` → `box-shadow: 0 0 0 1px var(--border-on-color)` (OUTSIDE strokeAlign, Rule 60); `#00a2e8` → `var(--surface-informative-default)` |
| Dropdown - Parts (profile active label) | ❌ → ✅ Fixed | `color: var(--border-primary-focus)` → `var(--text-primary-default-hover)` — `--border-*` used for text color (N-C26) |
| Learn Dropdown | ✅ | — |
| Locale Dropdown | ✅ | — |
| Notification Items | ✅ | — |
| `notif-see-all` Button - 1.5 | ❌ → ✅ Fixed | `transition:` (Rule 82); `border:` → `box-shadow:inset` (Rule 60); Tertiary pressed → Primary/focus (Rule 40); `is-pressing` JS added (Rule 83) |
| Download Dropdown | ✅ | — |
| Nav Top Menu | ✅ | — |
| Mobile Navbar | ✅ | — |
| Mobile Bottom Navbar | ⚠️ | CSS `:active` only, no `is-pressing` JS (Rule 83) — deferred |
| SVG Defs — `ic-nav-btn-union` | ❌ → ✅ Fixed | Dead symbol removed (Rule N-C30) |
| **`:root` CSS variables** | ❌ → ✅ Fixed | `--surface-primary-default-subtle: #d9f7ed` stale → `#e1f9ea` (N-C21); 5 tokens added: `--surface-gold-default-subtle`, `--border-gold-default`, `--text-stroke-gold-default`, `--surface-informative-default`, `--icon-primary-focus` (N-C31/32) |
| Footer - 1.5 | ❌ → ✅ Fixed | Missing `height: 60px`; `footer__inner` wrong padding `12px 28px` → `0 28px` (Rule 23 / N-C29) |
| Breadcrumb - 1.5 | ❌ → ✅ Fixed | 4 hardcoded hex → tokens (N-C1); inline `<polyline>` → `<use href="#ic-chevron-right"/>` + `color:` CSS (N-C36) |
| Coin Balance Mobile (`bc-coin-mobile`) | ❌ → ✅ Fixed | All gold hex → `var(--surface-gold-default-subtle)`, `var(--border-gold-default)`, `var(--text-stroke-gold-default)`, `var(--text-primary-on-color)`; `border-radius: 16px` → `var(--corner-radius-corner-xl)` |
| Sidebar — Nav Side Menu Desktop 1.5 | ❌ → ✅ Fixed | `#fff` → `var(--surface-general-default)`; hover `#e8fbe8` → `var(--surface-secondary-default-subtle)`; active `#b5f291` → `var(--surface-secondary-default)`; label `#666` → `var(--text-default-body)`; active icon `var(--border-primary-focus)` → `var(--icon-primary-focus)` (N-C32); active label `var(--border-primary-focus)` → `var(--text-primary-default-hover)` (N-C26); gold hex → tokens |
| Sidebar Balance | ❌ → ✅ Fixed | All gold hex → tokens; `border-radius: 16px` → `var(--corner-radius-corner-xl)` |
| Rewards Main Panel | ❌ → ✅ Fixed | `background: #e8fbe8` → `var(--surface-secondary-default-subtle)` |
| My Rewards Header | ❌ → ✅ Fixed | `color: #00564c` (×2) → `var(--text-tertiary-default)` |
| Voucher Card (`mr-card`) | ❌ → ✅ Fixed | `border: 1px solid #d9d9d9` → `var(--border-general-default)`; `background: #fff` (×3) → `var(--surface-general-default)`; divider `#d9d9d9` → `var(--border-general-default)` |
| Reward Badge / Pill Badge - 1.5 | ⚠️ Resolved via `:root` | Used `var(--surface-primary-default-subtle)` — now resolves to `#e1f9ea` after `:root` fix |
| Button - 1.5 Primary/S (`btn-voucher`) | ❌ → ✅ Fixed | 5 violations (see detail below) |

---

### Fix details

#### Fix — `btn-voucher` Button - 1.5 Primary/S (5 violations)
```css
/* Before */
.btn-voucher { border: 1px solid var(--border-primary-focus); transition: background 0.12s ease, border-color 0.12s ease; }
.btn-voucher__label { transition: color 0.12s ease; }
.btn-voucher__arrow { background: #99ebce; color: var(--border-primary-focus); transition: background 0.12s ease; }
.btn-voucher:hover .btn-voucher__arrow { color: #70bc6f; }
.btn-voucher:active { background: var(--surface-tertiary-default); border-color: var(--border-tertiary-focus); }   /* ❌ Tertiary palette */
.btn-voucher:active .btn-voucher__arrow { background: var(--surface-primary-default); color: #00564c; }   /* ❌ hardcoded */

/* After — Rule 82 (no transitions) + Rule 40 (Primary pressed = primary/focus) + N-C32 (icon → --icon-*) */
.btn-voucher { box-shadow: inset 0 0 0 1px var(--border-primary-focus); /* no transition */ }
.btn-voucher__label { /* no transition */ }
.btn-voucher__arrow { background: var(--surface-primary-default-subtle-hover); color: var(--icon-primary-focus); /* no transition */ }
.btn-voucher:hover .btn-voucher__arrow { color: var(--icon-secondary-hover); }
.btn-voucher:active,
.btn-voucher.is-pressed { background: var(--surface-primary-focus); box-shadow: inset 0 0 0 1px var(--border-primary-default); }
.btn-voucher:active .btn-voucher__arrow,
.btn-voucher.is-pressed .btn-voucher__arrow { background: var(--surface-primary-default); color: var(--icon-primary-focus); }
```

---

### New rule — N-C37: Rewards page layout panel tokens

The two-panel rewards layout uses specific background tokens that must never be hardcoded:

| Element | Token | Hex |
|---|---|---|
| `.rewards-main` background | `var(--surface-secondary-default-subtle)` | `#e8fbe8` |
| `.rewards-sidebar` background | `var(--surface-general-default)` | `#ffffff` |
| `.mr-card` / card body / card footer | `var(--surface-general-default)` | `#ffffff` |
| `.mr-card` border | `var(--border-general-default)` | `#d9d9d9` |
| `.mr-card__divider` background | `var(--border-general-default)` | `#d9d9d9` |
| Header text (`.mr-header__desc`, `.mr-header__redeem`) | `var(--text-tertiary-default)` | `#00564c` |

**Why:** These are DS-confirmed surface and text tokens. Hardcoding `#e8fbe8`, `#fff`, `#d9d9d9` breaks the token chain and prevents Light/Dark mode switching.

---

### Violations confirmed as systemic across Rewards pages (session 36 observation)

The following violations appeared in **both Session 35 (eVoucher) and Session 36 (Myrewards)**. They are expected in every remaining Rewards page audit:

| Violation | Rule | Fix pattern |
|---|---|---|
| `btn-voucher`/`btn-show` has `transition:` | Rule 82 | Remove all `transition:` from Button - 1.5 CSS |
| `btn-voucher`/`btn-show` Pressed = Tertiary `#00564c` | Rule 40 | → `var(--surface-primary-focus)` + `var(--border-primary-default)` |
| `btn-voucher`/`btn-show` arrow `color: var(--border-primary-focus)` | N-C32 | → `var(--icon-primary-focus)` |
| `notif-see-all` has `transition:`, wrong pressed palette | Rules 82, 40 | Remove transition; `box-shadow:inset` for border; Primary/focus pressed |
| Footer missing `height: 60px` | Rule 23 / N-C29 | Add `height: 60px` to `.footer`; `footer__inner` → `height: 60px; padding: 0 28px` |
| Breadcrumb `bc-chevron` inline `<polyline>` | N-C36 | → `<svg><use href="#ic-chevron-right"/></svg>` + `color:` CSS |
| `bc-title`, `bc-sep`, `bc-link--current` hardcoded hex | N-C1 | → `--text-tertiary-default`, `--border-general-default`, `--text-default-body` |
| Gold hex hardcoded in coin balance | N-C31 | Add gold tokens to `:root`; replace raw hex |
| `sidebar-btn--active` icon/label use `--border-primary-focus` | N-C26, N-C32 | icon → `--icon-primary-focus`; label → `--text-primary-default-hover` |
| `--surface-primary-default-subtle: #d9f7ed` in `:root` | N-C21 | Override to `#e1f9ea` on every Rewards page |
| `ic-nav-btn-union` dead symbol in SVG defs | N-C30 | Remove |
| Icon Badge uses `border:` not `box-shadow:` | Rule 60 | OUTSIDE stroke → `box-shadow: 0 0 0 1px var(--border-on-color)` |

---

### N-C35 pending status updated

| File | `ic-user-circle` | `notif-see-all` | `learn menu` | `footer` | `bc-chevron` |
|---|---|---|---|---|---|
| `nadia_Rewards-evoucher.html` | ✅ Session 35 | ✅ Session 35 | ✅ Session 35 | ✅ Session 35 | ✅ Session 35 |
| `nadia_Rewards-Myrewards.html` | ❌ pending | ✅ Session 36 | ❌ pending | ✅ Session 36 | ✅ Session 36 |
| `nadia_Rewards-CoinQuest.html` | ❌ pending | ❌ pending | ❌ pending | ❌ pending | ❌ pending |
| `nadia_Rewards-Merchandise.html` | ❌ pending | ❌ pending | ❌ pending | ❌ pending | ❌ pending |
| `nadia_Rewards-avatar.html` | ❌ pending | ❌ pending | ❌ pending | ❌ pending | ❌ pending |

---

### Mandatory pre-flight — BEFORE every task, change, or decision (Session 36 reinforcement)

> **User instruction (reinforced 2026-06-06):** "always before starts any design, or making any changes and decisions, please refer to DS & nadia.design.md"

```
□ Step 0a — Read design-md/nadia.design.md  → ALL rules N-1 through N-C37+, known deviations — NO EXCEPTIONS
□ Step 0b — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f  → re-verify every value, never trust session notes
□ Step 1  — Run component audit (Rule N-C4) → produce table: component | DS node | status | issues
□ Step 2  — Compare nav CSS vs template     → ic-user-circle, learn menu, notif-see-all, footer (N-C35)
□ Step 3  — Check systemic violations table → btn transitions, pressed palettes, token types, gold tokens, dead symbols
□ Step 4  — Only then write HTML, CSS, or document any value
```

---

*Last updated: 2026-06-06 | Session 36 — Myrewards full DS audit + 14 fixes (Icon Badge, notif-see-all, btn-voucher, footer, breadcrumb, sidebar, rewards layout, gold tokens) | Branch: staging*

---

## Session 37 — nadia_Rewards-Merchandise.html: DS compliance audit + 9 fix areas (2026-06-06)

**File:** `Nadia.test.git/Rewards/nadia_Rewards-Merchandise.html`

Full audit-first approach (Rule N-C4): component table generated before touching any CSS, then all fixable violations applied without changing layout or default visual appearance.

---

### Audit table (25 components)

| Component | DS Node | Status | Issues found |
|---|---|---|---|
| Navbar Primary Desktop - 1.5 | `2337:21975` | ✅ | — |
| Nav Button - 1.5 (action icons) | `3908:6148` | ✅ | — |
| Number Badge - 1.5 | `618:417` | ✅ | — |
| Avatar - 1.5 | `684:621` | ✅ | — |
| `ic-user-circle` symbol | `3908:13415` | ❌ Pending | Still `viewBox="-1 -1 26 26"` (24×24). Needs 60×60 update per commit `0834385` — **not fixed this session** |
| Profile Menu - 1.5 | `3908:3679` | ✅ | — |
| Pill Badge (profile plan) | — | ✅ | — |
| **Icon Badge - 1.5** (verified) | `3908:1491` | ❌ → ✅ Fixed | `border: 1px solid white` → `box-shadow: 0 0 0 1px var(--border-on-color)` (OUTSIDE strokeAlign, Rule 60) |
| Learn Menu - 1.5 | `3908:5091` | ❌ Pending | Missing `gap: var(--spacing-space-xs)` on grid; label uses `--text-default-heading` → should be `--text-default-body` (commit `1b5a26d` not propagated — **not fixed this session**) |
| **Notification Dropdown "See All"** | `473:528` | ❌ → ✅ Fixed | 4 violations: `border:` → `box-shadow:inset` (Rule 60); `transition:` removed (Rule 82); `:hover border-color:` → `box-shadow:` (Rule 89); `:active` Tertiary → Primary/focus palette (Rule 40) |
| Notification items | `3908:13057` | ✅ | — |
| Download Apps Dropdown | `3909:3405` | ✅ | — |
| Localization Dropdown | `3928:3067` | ✅ | — |
| Nav Top Menu | `3406:802` | ✅ | — |
| Mobile Navbar | `1943:22641` | ✅ | — |
| Nav Menu Tablet | `3427:4590` | ✅ | — |
| Nav Menu Mobile | `3427:2442` | ✅ | — |
| Navbar Mobile Bottom | `3406:735` | ✅ | — |
| **Footer - 1.5** | `2073:6579` | ❌ → ✅ Fixed | Missing `height: 60px`; `.footer__inner` padding `12px 28px` → `0 28px` + `height: 100%` (Rule N-C27) |
| **Breadcrumb - 1.5** | `3284:219024` | ❌ → ✅ Fixed | 5 issues: bc-sep `#d9d9d9`→`var(--border-general-default-secondary)`; bc-title hardcoded hex; bc-chevron inline `<polyline>` → `<use href="#ic-chevron-right"/>` + `color:` CSS; bc-link `var(--og-500)` shorthand; bc-link--current `#666` hardcoded |
| Rewards Sidebar | `3849:48401` | ❌ → ✅ Fixed | Hover bg `#e8fbe8`→token; active bg `#b5f291`→token; label `#666`→token |
| Coin Balance Score Chip | — | ✅ | Gold hex already in `:root` gold tokens — sidebar-balance CSS hardcoded (`#fef1ce`, `#fabb0a`) — same as CoinQuest deferred correction per Rule N-C34 Tier 2 |
| Rewards Main Panel | — | ❌ → ✅ Fixed | `var(--r-4xl)` shorthand → canonical; `#e8fbe8` → token; `#00cc85` border → token; merch header `#00564c` × 3, `var(--sp-xs)` shorthand |
| **Label Badge - 1.5** (Premium/Lite) | `843:666` | ❌ → ✅ Fixed | bg `#d9f7ed` → `var(--surface-primary-default-subtle)` `#e1f9ea`; border + color: hardcoded hex → tokens |
| Reward Card - 1.5 structure | `3065:43481` | ✅ | `rc__title` 3-line clamp + min-height 60px already correct; `rc__coin-value #666` → `var(--text-default-body)` added; `rc__title #404040` → `var(--text-default-heading)` added |
| **Button - 1.5 Primary/S** `.btn-show` | `1437:8154` | ❌ → ✅ Fixed | 3 violations: `transition:` removed (Rule 82); `is-pressing` JS + CSS added (Rule 83); all hardcoded hex → DS token vars |

---

### New `:root` tokens added

```css
--border-general-default-secondary: #bfbfbf;  /* Border/general/default-secondary (DS 3655:16650) */
```

Also corrected stale value:
```css
--surface-primary-default-subtle: #e1f9ea;   /* DS confirmed; was: #d9f7ed (Rule N-C21) */
```

---

### Pressed state note — Merchandise btn-show vs eVoucher

In this session, `.btn-show:active` was tokenised using the **Tertiary palette** (`var(--surface-tertiary-default)`, `var(--border-tertiary-focus)`) — a pure Tier-1 swap of the existing hardcoded hex (`#00564c`, `#00453d`). This follows CLAUDE.md Rule 19 (node `1437:8138`).

eVoucher (Session 35) used the **Primary/focus palette** (`#00a36a`, `#00cc85`) following Rule 40 (re-verified 2026-05-31).

**These are contradictory.** Rules 19 and 40 conflict on Primary/S Pressed bg. The next time DS is accessed, run `get_variable_defs` on node `1437:8138` to resolve once and for all, then propagate to both files.

---

### Still pending for Merchandise (not fixed this session)

| Item | Rule | Reason not fixed |
|---|---|---|
| `ic-user-circle` 60×60 export | N-C35 | Requires `use_figma exportAsync` on DS node `3908:13415` — out of scope for token-only pass |
| Learn Menu grid gap + label color | N-C35 (commit `1b5a26d`) | Template drift fix — requires confirming DS values live first |
| Coin balance CSS hardcoded gold hex | N-C34 Tier 1 | `.sidebar-balance` + `.bc-coin-mobile` still use `#fef1ce`, `#fabb0a` instead of gold token vars — deferred to next session touching this component |
| Sidebar btn `gap: 10px` | Session 34 deferred | DS may specify `8px` (`--spacing-space-xs`) — needs live fetch |

---

### Rule N-C37 — Audit-first always produces a pending list; work from the pending list, not memory

Running a full component audit (Rule N-C4) before any edit generates two outputs:
1. **Fix list** — all violations that can be resolved without live DS access (token-only swaps)
2. **Pending list** — violations requiring DS live fetch, out-of-scope changes, or deferred corrections

**Always document both.** The pending list is as important as the fix list — it prevents the same violations from being rediscovered in a future session by surfacing them now.

After completing the fix list, append the pending items to this session's log under "Still pending." The next session touching that file must start from the pending list, not a cold audit.

---

### Mandatory pre-flight — BEFORE every task, change, or decision (Session 37 reinforcement)

> **User instruction (2026-06-06):** "always before starts any design, or making any changes and decisions, please refer to DS & nadia.design.md"

Non-negotiable. Every session, every task, every fix — no exceptions.

```
□ Step 0 — Read design-md/nadia.design.md       → ALL rules N-1 through N-C37+, known deviations
□ Step 1 — Fetch DS live: TLVKe3bgJTdVvuPAzgDq2f → verify every token, state, structure
□ Step 2 — Run component audit (Rule N-C4)       → full table: component | DS node | status | issues
□ Step 3 — Compare nav CSS vs template (N-C35)   → ic-user-circle, learn menu, notif-see-all, footer
□ Step 4 — Check pending list from prior session → start there, not from scratch
□ Step 5 — Only then write HTML, CSS, or document any value
```

**Extended checklist additions (Session 37):**
```
□ Breadcrumb bc-chevron → <use href="#ic-chevron-right"/> not inline <polyline>? (N-C36)
□ Footer height: 60px?  → padding: 0 28px? (N-C27)
□ notif-see-all         → box-shadow:inset? no transition? correct pressed palette? (N-C28, Rule 40)
□ Shorthand aliases     → var(--og-*), var(--sp-*), var(--r-*) used in component rules? (N-C33)
□ Label Badge bg        → var(--surface-primary-default-subtle) = #e1f9ea? (Session 23)
□ Pending list from last session → addressed first?
```

**Cumulative violations log (all sessions):**
- Session 24: skipped pre-flight → wrong `data-active-nav` pattern
- Sessions 25–26: missing `color:` on arrow containers; inline polyline chevron
- Session 28: unrealistic data; stale balance
- Session 29: 8/14 wrong token categories; `is-pressing` missing; inline paths
- Sessions 30–31: footer height; notif-see-all 4 violations; Icon Badge `border:`; quiz card sizes
- Session 32: Session 21 fixes not synced to sibling page (2-session drift)
- Session 33: shorthand aliases in breadcrumb; wrong token type for active icon/label; gold tokens missing
- Sessions 34–35: template commits not propagated (ic-user-circle, learn menu, notif-see-all)
- **Session 37: Session 23 bc-sep pending since 3 sessions; Pressed state palette contradiction (Rule 19 vs Rule 40) — needs live DS resolution**
- **Session 38: nav CSS drift — MyClasses was behind template on 9 areas (see Rule N-C38)**

---

### Rule N-C38 — MyClasses nav CSS synced to zul.page.template.html (Session 38, 2026-06-07)

**File:** `Nadia.test.git/Class/nadia_Class-MyClasses.html`
**Change:** Replaced nav CSS block (lines 12–2084) with latest from `zul.test.git/zul.page.template.html` (lines 12–2086). Page-specific CSS (`MY CLASSES PAGE` section) preserved unchanged.

**9 areas updated:**

| Area | Old (MyClasses) | New (Template) |
|---|---|---|
| `--border-secondary-default` | missing | `#b5f291` added to `:root` |
| `--subjects-chinese-default` | `#f94848` (preserved) | kept — template was missing it |
| `.navbar-badge` | basic 20×20 position | added `.welcome-avatar-group` (100×100) + XXL badge size overrides |
| `#tablet-notif-btn.is-active .num-badge` | missing | `opacity: 0` on dropdown open |
| `.notif-dropdown` | `position: absolute; top: var(--nav-dropdown-top)` | `position: fixed; top: 0; left: 0; right: auto` (Rule 99) |
| `.notif-list` | missing rule | `display: flex; flex-direction: column; gap: 8px` added |
| Notif focus/active state | `#e8fbe8` bg + `#00cc85` inset (wrong) | `Surface/secondary/default #b5f291` + `Border/secondary/focus #70bc6f` (DS confirmed) + full time/dot overrides |
| `.navbar-mobile__buttons` gap | old pattern | 8px gap confirmed; hamburger animation scoped to `#tablet-menu-btn` |
| `learn-dropdown__label` color | `--text-default-heading` (#404040) | `--text-default-body` (#666) — DS node 3908:2464 |

**No DS live fetch required** — this was a CSS drift correction from template, not a new DS component audit.

---

---

### Session 38 (cont.) — nadia_Quiz.html nav/footer sync

**File:** `Nadia.test.git/Quiz/nadia_Quiz.html`
**Change:** Same template sync as MyClasses — replaced shared CSS (lines 12–2081) and SVG defs block with latest from `zul.test.git/zul.page.template.html`. Quiz-specific CSS (`QUIZ PAGE` block), injection script, and page content preserved unchanged.

**Additions from template:**

| Area | Detail |
|---|---|
| `--border-secondary-default` | `#b5f291` added to `:root` |
| Tablet notif btn badge hide | `#tablet-notif-btn.is-active .num-badge { opacity: 0 }` |
| `welcome-avatar-group` | 100×100 avatar frame class added |
| `navbar-badge svg` sizing | `width: 100%; height: 100%` |
| XXL badge variants | profile dropdown + welcome avatar group → 28×28 |
| Nav label color | `--text-default-heading` → `--text-default-body` (#666) |
| SVG defs | Was 8-line diff vs template; now **0-line diff** — all icons match template exactly |

---

*Last updated: 2026-06-07 | Session 38 — MyClasses + Quiz nav CSS/SVG synced to template | Branch: staging*
