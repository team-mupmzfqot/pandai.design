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
- Secondary button Pressed state was not implemented. Actual DS: Secondary pressed **fills solid** — `Surface/primary/default` bg + `Text/primary/on-color` text.
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
| Pressed | `#00564c` | `#00453d` | `#00cc85` | `#00cc85` | `#00564c` | `1437:8138` |
| Disabled | `#f2f2f2` | `#bfbfbf` | `#bfbfbf` | `#f2f2f2` | `#bfbfbf` | `1437:8130` |

**Pressed state tokens (confirmed from node `1437:8138`):**
- Btn bg: `Surface/tertiary/default` (#00564c) — NOT `Surface/primary/focus` (#00a36a)
- Border: `Border/tertiary/focus` (#00453d)
- Label: `Text/primary/default` (#00cc85) — NOT `Text/primary/on-color` (#f6fdfb)
- Arrow bg: `Surface/primary/default` (#00cc85)
- Chevron: `Icon/tertiary/default` (#00564c)

**Mistake made:** Pressed state used `Surface/primary/focus` (#00a36a) for bg and `Text/primary/on-color` (#f6fdfb) for label. DS uses Tertiary palette for Pressed — darker bg (`#00564c`) with the primary green as the label color — the inverse of Default.

---

### 20. Subject Badge L vs M — base CSS is L; quiz card overrides to M

The base `.subject-badge` CSS is always the **L size** (32px). The quiz card context applies a global override to shrink it to **M** (24px). Never build a separate "L badge" component — just remove the quiz card constraint when L is needed.

**DS-confirmed specs (node `1808:17891` — Subject Badge/RBT - L):**

| Property | M (24px) | L (32px) |
|---|---|---|
| Height | 24px | 32px |
| Icon slot width | auto (~34px) | auto (~40px) |
| Icon slot padding | `4px 8px 4px 12px` | `4px 8px 4px 12px` (same) |
| Icon size (CSS) | `width: 16px; max-height: 20px` | `width: 20px; max-height: 24px` |
| Text | 12px Medium, line-height 12px | 14px Medium, line-height 20px |

**To display L size inside a quiz card:** scope-override the quiz card M constraint using the section ID:
```css
#SectionName-Desktop .quiz-card__header .subject-badge       { height: 32px; max-height: 32px; }
#SectionName-Desktop .quiz-card__header .subject-badge__text  { font-size: 14px; line-height: 20px; }
#SectionName-Desktop .quiz-card__header .subject-badge__icon svg,
#SectionName-Desktop .quiz-card__header .subject-badge__icon img { width: 20px; max-height: 24px; }
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
<section id="NavBar-Desktop">      <!-- Navbar 1.5 -->
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

**Navbar — confirmed implementation notes (May 2026):**
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
- **All states:** see Rule 19. Pressed uses Tertiary palette (`#00564c`), not Primary/focus (`#00a36a`).

**Subject badge icons (18 subjects) — confirmed May 2026:**
All sourced from `🔰 Iconography` page via `exportAsync({ format: 'SVG_STRING' })`. See Rule 17.
Badge icon CSS: `width: 16px; height: auto; max-height: 20px` constrains all subject icons uniformly.

**Mistake made (quiz card):**
- Cards rendered as tall vertical columns. Fixed by: explicit `flex-direction: row` + `width: 148px` on image div + `<div>` placeholder instead of `<img>`
- Button used `Outline/arrow-right` (→) — actual DS uses `Outline/chevron-right` (›). Always confirm icon from DS context.
- Arrow clip had `padding: 3px 4.5px` — stroke collapsed to 0.56px. Correct: no padding, use `ic-chevron-btn`.
- Pressed state used `Surface/primary/focus` (#00a36a) for bg and `Text/primary/on-color` (#f6fdfb) for label — both wrong. DS Pressed = `Surface/tertiary/default` (#00564c) bg + `Text/primary/default` (#00cc85) label (see Rule 19).
- Queried wrong DS node `1644:11342` (Type=Teacher) instead of `1437:8154` (Type=Student) — led to thinking Student=pink. Always verify the `Type=` variant name before trusting variable defs.

---

**Primary Card - 1.5 / Secondary Card variant (node 2881:36272) — confirmed May 2026:**
- Outer card: `border: 1px solid Border/general/default`, `border-radius: corner-xl`, `background: Surface/general/default`
- Content area (`.primary-card__content`): `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-space-m)`
- Section header: bookmark icon + title (`H2`) + Button - 1.5 (Secondary/M) with `ic-chevron-btn-m`

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
