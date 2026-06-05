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
Source from `Subject Badge/[Name]` COMPONENT_SET on **`⚙️ Badges` page** (not Iconography). Each set has `Size=M` (32px) and `Size=S` (24px) variants. **Never approximate with Tailwind color tokens.**

**Lookup:** `findAll(n => n.type === 'COMPONENT_SET' && n.name.startsWith('Subject Badge/'))` on Badges page.

**M vs S:** bg and border colors identical between sizes. Size=M = 32px (previously called "L"), Size=S = 24px (previously called "M"). Since quiz cards use S size (24px), always check S variants for quiz card badges.

**Text color rule:** Almost all subjects use `#f2f2f2` (light text on dark bg). Exceptions — dark text on light bg:
- `Science`: `--badge-text: #998027` (yellow bg)
- `KAFA`: `--badge-text: #538865` (mint green bg)
- `Geography`: `--badge-text: #478220` (light green bg)

**Confirmed badge colors — S variants (confirmed 2026-05-17, live DS audit), all from `⚙️ Badges` page:**

| Subject | `--badge-bg` | `--badge-border` | Text |
|---|---|---|---|
| Add Math | `#283589` | `#182052` | `#f2f2f2` |
| Account | `#0072ca` | `#004479` | `#f2f2f2` |
| Bahasa Melayu | `#4d77ff` | `#2e4799` | `#f2f2f2` |
| Biology | `#8431d8` | `#6a27ad` | `#f2f2f2` |
| Business | `#efb42b` | `#bf9022` | `#f2f2f2` |
| Chemistry | `#e20082` | `#b50068` | `#f2f2f2` |
| Chinese Language | `#f94848` | `#c73a3a` | `#f2f2f2` |
| Computer Science | `#d10070` | `#a7005a` | `#f2f2f2` |
| Economy | `#ff5733` | `#cc4629` | `#f2f2f2` |
| English | `#ff4d56` | `#cc3e45` | `#f2f2f2` |
| Geography | `#77d836` | `#5fad2b` | `#478220` |
| History | `#a97c50` | `#876340` | `#f2f2f2` |
| Islamic Studies | `#de4d7f` | `#b23e66` | `#f2f2f2` |
| KAFA | `#8ae3a9` | `#6eb687` | `#538865` |
| Mathematics | `#42ac7b` | `#358a62` | `#f2f2f2` |
| Moral Studies | `#0072ca` | `#005ba2` | `#f2f2f2` |
| Physics | `#27a0d7` | `#1f80ac` | `#f2f2f2` |
| Primary/Default | `#00cc85` | `#00a36a` | `#f2f2f2` |
| RBT | `#353535` | `#2a2a2a` | `#f2f2f2` |
| Science | `#ffd641` | `#ccab34` | `#998027` |

**Structure confirmed (DS node inspection, May 2026):**
- Overall: `height: 32px` (M) / `24px` (S), `border-radius: 60px`, `overflow: hidden`
- Icon slot: `padding: 4px 8px 4px 12px`, white bg, `width: 34px`
- Label panel: `padding: 0 16px 0 12px`, `gap: 8px`, subject bg color
- Pointer: 4×8px white SVG, `position: absolute; left: 0; top: 50%`
- Text: Poppins Medium 12px, line-height 12px

**Mistakes made (May 2026):**
- Used Tailwind/guessed colors for 8 subjects — RBT, KAFA, Account, Add Math, Economy, Business, CS, BM all had wrong bg and/or border colors.
- Business text was set to `#78350F` (dark) — DS actually uses `#f2f2f2` (light).
- KAFA text was initially documented as `#358a62` — live DS audit 2026-05-17 confirmed correct value is `#538865`.
- Geography text exception was undocumented — DS uses `#478220` (dark green) on light green bg. Missing override renders white text on `#77d836` (unreadable).
- Component location was wrong — badges are on `⚙️ Badges` page (COMPONENT_SETs), not Iconography page.
- Size names changed: old L/M are now DS M/S. Same px values (32px/24px), just renamed.

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
| Default | `#00cc85` | `#00a36a` | `#ffffff` | `#99ebce` | `#00a36a` | `1437:8154` |
| Hover | `#b5f291` | `#70bc6f` | `#70bc6f` | `#e8fbe8` | `#70bc6f` | `1437:8146` |
| Pressed | `#00a36a` | `#00cc85` | `#00cc85` | `#00cc85` | `#00a36a` | `1437:8138` |
| Active | `#00cc85` | `#00a36a` | `#ffffff` | `#99ebce` | `#00a36a` | `3029:19941` |
| Disabled | `#f2f2f2` | `#bfbfbf` | `#bfbfbf` | `#f2f2f2` | `#bfbfbf` | `1437:8130` |

**Pressed state tokens — Primary/S (confirmed design.color.md §6.1, live-verified 2026-05-28):**
- Btn bg: `Surface/primary/focus` (#00a36a) — Primary variant uses PRIMARY focus palette, NOT dark teal
- Border: `Border/primary/default` (#00cc85)
- Label: `Text/primary/default` (#00cc85) — NOT `Text/primary/on-color` (#f6fdfb)
- Arrow bg: `Surface/primary/default` (#00cc85)
- Chevron: `Surface/primary/focus` (#00a36a)

**Correction (2026-05-31):** Prior version of this rule stated Pressed = `Surface/tertiary/default` (#00564c). That dark teal palette applies to **Secondary and Tertiary variants only**. Primary uses the lighter `Surface/primary/focus` (#00a36a). See Rule 40 for the full variant split table.

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

### 45. CSS comment integrity — a missing `/*` silently discards the next CSS rule

When a `/* ════...════` opening line is deleted (e.g. by a script removing box-drawing characters) but the closing `════...════ */` line remains, the CSS parser sees the orphaned comment text + the next rule's selector as one long invalid selector. The following rule block is treated as the body of that garbage selector and **silently discarded** — no error, no warning, styles just don't apply.

**How it happened (May 2026):** A PowerShell script removed all lines containing box-drawing characters (╔═, ╚═). This deleted the `/* ════...════` opener but left `MAIN CONTENT` + `════...════ */` behind. The CSS parser read `MAIN CONTENT ════...════ */ .main-content` as one selector, so `.main-content { gap: 16px }` never applied — the inter-section gap was completely broken.

**Rule:** After any bulk line-deletion operation on the HTML/CSS file, scan for orphaned `*/` closers that have no matching `/*` opener. Fix by prepending `/*` to the line before the orphaned text.

**Detection pattern:**
```powershell
# Find lines ending with */ that are NOT part of a /* ... */ pair on the same line
Select-String -Path file.html -Pattern "^\s*[^/].*\*/$"
```

**Fix:** If line N is `   MAIN CONTENT` and line N+1 is `   ════...════ */`, change line N to `   /* MAIN CONTENT`.

**Mistake made (May 2026):** `gap: var(--section-gap)` on `.main-content` was completely ignored. User reported "still no gap" across multiple sessions. Root cause was the broken comment, not the CSS value itself.

---

### 46. Minimum page width — set `min-width: 390px` on BOTH `html` AND `body`

The DS mobile frame is **390px** (DS Responsives collection, Mobile mode). Setting `min-width` on `body` alone is not sufficient — the `html` root can still shrink below it and the scrollbar clamp may not trigger in all browsers.

```css
html { min-width: 390px; }
body { min-width: 390px; ... }
```

When the browser is resized below 390px, a horizontal scrollbar appears — the layout never collapses below the DS mobile minimum.

**Mistake made (May 2026):** `body { min-width: 400px }` — two errors: (1) `html` had no `min-width` so the clamp was unreliable; (2) 400px is not the DS value — correct is **390px**.

---

### 47. Flex row cards — use `flex: 1; min-width: Xpx` not `width: Xpx; flex-shrink: 0`

A hardcoded `width` + `flex-shrink: 0` locks a card to a fixed size at all viewports. Use `flex: 1; min-width: Xpx` so the card fills available space while having a collapse floor.

```css
/* Wrong — fixed, never adapts */
.check-in-card { width: 350px; flex-shrink: 0; }

/* Correct — fills space, floors at 150px */
.check-in-card { flex: 1; min-width: 150px; }
```

The tablet/mobile `width: 100%` override still works — when the section switches to `flex-direction: column`, `width: 100%` takes over and `flex: 1` has no effect in the cross-axis.

**Mistake made (May 2026):** `.check-in-card` had `width: 350px; flex-shrink: 0`. Corrected to `flex: 1; min-width: 150px`.

---

### 48. Color reference lives in `design.color.md` — keep it in sync with every color update

The canonical color reference for this repo is [`design.color.md`](design.color.md) at the repo root. It holds the complete list of CSS variables, hex values, subject palette matrix, status badge colors, button-state recipes, and the "common mistakes" table.

**Hard rules for every contributor (human or agent):**

1. **Before writing any color CSS** — read `design.color.md` §0 (TL;DR) and §3 (CSS variable reference). Never hardcode hex values in rule declarations.
2. **After confirming any new color value from the DS or fixing any color mistake in a `.md` file** (CLAUDE.md, design-md/*.md, or any per-designer notes) — propagate the update to `design.color.md` in the same commit. The `.md` files are append-only logbooks; `design.color.md` is the consolidated reference. They must not drift.
3. **When inventing or renaming a token is unavoidable** — first verify it does not exist by searching `design.color.md` §3. If genuinely new, add the row to §3 with hex, Figma path, and a usage description, and cross-reference the CLAUDE.md rule that introduced it.
4. **When deprecating a token** — strike it through in `design.color.md` with the replacement noted; do not silently remove it (other branches and downstream code may still reference it).

**What to mirror into `design.color.md` whenever it appears in a `.md` file:**
- A new CSS variable name (e.g. a new `--surface-*`, `--text-*`, `--icon-*`, `--border-*`)
- A new component color recipe (button variant, badge, pill, card)
- A correction to an existing hex value (always re-pull from DS first)
- A new subject palette entry (or a corrected `--badge-bg`/`--badge-border`/`--badge-text`)
- A new "common mistake" with its correction

**Workflow for adding a color update:**
```
1. Confirm the value from DS (search_design_system → use_figma → get_variable_defs)
2. Document the finding in the relevant .md file (CLAUDE.md rule, or design-md/*.md log)
3. Add or update the row in design.color.md (§3 / §4 / §5 / §6 / §9 as applicable)
4. Commit all three changes together — never split into separate commits
5. Push to origin (current branch); coordinate cross-branch updates per Rule 49 (TBD) when adding it
```

**Cross-reference anchor:** `design.color.md` links back to specific CLAUDE.md rules. When you add a new color rule here, drop a `[design.color.md §X](design.color.md)` reference in this rule's body so the two files stay symmetrically discoverable.

---

### 49. Always audit component anatomy before implementing any component

Before writing a single CSS rule or HTML element for a DS component, always inspect its full anatomy:

1. **Nested Instances** — every child instance (e.g. `Dropdown - Parts` inside `Profile Menu - 1.5`, `Button - 1.5` inside a card) is its own component set with its own states. Look each one up separately via `get_design_context` on the nested component's own node.
2. **Variants** — list ALL variants in the component set before writing any code. Never assume what variants exist from the component name alone.
3. **States** — pull every interactive state (Default, Hover, Pressed/Active, Selected, Disabled, Focus) via `get_design_context` BEFORE writing any `:hover`, `:active`, or JS class CSS.
4. **Properties** — check boolean props (`visible`, `showIcon`, `showLabel`) and enum props (`type`, `size`, `role`). `visible: false` children must not be rendered; different `type` values can change the entire layout.

**Workflow (mandatory):**
```
1. get_design_context on the COMPONENT SET node → read all variant names
2. get_design_context on each relevant state variant → extract tokens per state
3. For each nested instance → repeat steps 1–2 on that sub-component's own set
4. Only then write HTML and CSS
```

**Mistake made (May 2026 — Dropdown - Parts / Profile Menu):**
Implemented profile menu items from the Profile Menu `get_design_context` output only, which showed the Default state. Did not separately audit `Dropdown - Parts` (node `1342:4370`). The DS Hover state uses `#e8fbe8` bg + `1px solid #00cc85` border + **pill border-radius (108px)** + `#00cc85` label — none of which is visible from the Default state alone. Hover styles had to be corrected after the fact.

---

### Mandatory workflow — BEFORE every session and every change

**Step 0 (mandatory):** Read `design-md/zul.design.md` AND refer to live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any change, or making any decision — including seemingly trivial fixes. No exceptions.

```
0a. Read design-md/zul.design.md  → ALL rules 1–115, confirmed specs, known mistakes — NO EXCEPTIONS
0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f         → single source of truth, re-verify every value live
0c. Audit component anatomy (Rule 49 / zul Rule 93):
      → get_design_context on COMPONENT_SET node → list ALL variants
      → get_design_context on EACH state variant → extract every token per state
      → For EACH nested sub-component → repeat the above on its own COMPONENT_SET
      → Check componentPropertyDefinitions → confirm visible/hidden/swap properties
0d. For spacing/positioning: read DS screen frame children y-coordinates (zul Rules 94–95)
      → gap = B.y − (A.y + A.h)  |  dropdown top = target element's y in screen frame
0e. get_variable_defs on exact sub-nodes    → confirm Semantic token per fill/stroke/spacing
0f. Cross-check CSS var against :root hex   → never guess token from name (Rule 83)
0g. For icons: confirm viewBox + path scale + CSS dimensions all consistent (Rule 87)
1.  search_design_system → confirm component in DS, get component key
2.  use_figma            → find node IDs across pages
3.  get_design_context   → pull token bindings, dimensions, structure per variant
4.  get_variable_defs    → confirm Semantic token names on exact sub-nodes
5.  Implement            → use only DS-confirmed values, zero assumptions
6.  Validate             → compare against get_screenshot, fix before moving on
```

> **Every mistake in this project came from skipping Step 0.** Wrong colors, wrong states, wrong hover styles, wrong icon sizes — all traceable to not reading zul.design.md and not auditing DS first. A 2-minute inspection always saves more time than the bug it prevents. See Rules 73, 83, 86, 93.

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
| Pressed | `#00a36a` | `#00cc85` | `#00cc85` | `#00cc85` | `#00a36a` |
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

---

### 50. Complex illustrated DS icons — always export as 2× PNG, never SVG

`Feature/*` icons (Learn Menu, feature tiles) are multi-colour isometric illustrations with 15–56KB of SVG data per icon. They exceed the tool output limit and cannot be exported as SVG in a single call.

**Rule:** Before any icon batch export, check SVG sizes. If any icon > 12KB → use PNG for the entire batch. Do not attempt SVG chunking.

```js
// Step 1 — size check
const svg = await node.exportAsync({ format: 'SVG_STRING' });
// if svg.length > 12000 → switch to PNG

// Step 2 — PNG export
const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });
const b64 = btoa(String.fromCharCode(...bytes));
```

**Learn Menu exception (confirmed May 2026):** All 12 `Feature/*` icons use 2× PNG. This is the authorised exception. The icons are authentic Figma exports.

**Mistake made:** Alternated between SVG → chunked SVG → PNG across multiple sessions. Commit to one format before the first export call.

---

### 51. Bulk HTML removal — always grep-verify section tag balance before and after

When removing a block of HTML by line range, wrapper closing tags (`</section>`, `</div>`) may sit just outside the removed range and get orphaned or accidentally included.

**Mandatory checks:**
```bash
# Before removal — establish baseline
grep -n "<section\|</section>" file.html

# After removal — confirm every open has a close
grep -n "<section\|</section>" file.html
```

Both counts must match. If any `<section id="...">` has no corresponding `</section>`, fix it before committing.

**Mistake made (May 2026):** Removed Learn Menu HTML (lines 2150–2182). The `</section><!-- end NavbarPrimary-Desktop -->` at line 2073 was preserved in the slice range but ended up missing — breaking the HTML nesting. Result: all subsequent sections (NavTopMenu, main content) were rendered inside NavbarPrimary-Desktop, breaking page padding and responsive breakpoints. Root cause: trusted line-number math without verifying structural tag integrity.

---

---

### 52. Navbar action button → dropdown: full anatomy checklist

Every action button in `#NavbarPrimary-Desktop` that opens a dropdown (bell, EN/locale, smartphone/download, waffle/learn) requires ALL FOUR of these. Missing any one breaks the behaviour.

1. **Button HTML** — `id`, `aria-haspopup="true"`. No `nav-btn-union-bg` — the speech-bubble tail is NOT part of the DS COMPONENT_SET Active state (Rule 116). Active state is a plain rounded square.
2. **Dropdown HTML** — `<div class="my-dropdown" id="DROPDOWN-ID">` placed inside `#NavbarPrimary-Desktop` (after the `.navbar-primary` closing div).
3. **CSS** — same pattern as all other nav dropdowns: white bg, `1px solid #00cc85` border, `24px` radius, `16px` padding, `top: var(--nav-dropdown-top)` (CSS variable, currently 72px), `opacity + translateY(-8px)` animation.
4. **JS IIFE** — `positionDropdown()` (right-align to button), click toggle, `mouseleave` close, outside-click close, close-all-others block (Rule 53).

See `design-md/zul.design.md` Rule 106 for the full code templates.

---

### 53. All navbar dropdowns are mutually exclusive — every click handler must close all others

Only one dropdown can be open at a time. Every button click handler must close ALL other nav dropdowns (and deactivate their buttons) before opening its own.

**When adding a new dropdown:** Update EVERY existing click handler to include the new dropdown ID in its closing block. The current roster (May 2026): `profile-dropdown`, `learn-dropdown` / `waffle-btn`, `locale-dropdown` / `locale-btn`, `notif-dropdown` / `notif-btn`, `download-dropdown` / `download-btn`.

See `design-md/zul.design.md` Rule 107 for the full closing-block code pattern.

---

### 54. Notification item (Navbar Notification Button - Parts) — structural state, not color-only

The DS component changes LAYOUT between Default and Hover/Pressed, not just color:
- **Default**: inner row has `border-bottom: 1px solid #d9d9d9` + `padding-bottom: 12px`. Content frame: `pt-12 px-12 pb-0`, no border.
- **Hover**: content frame gets `box-shadow: inset 0 0 0 1px #00cc85` + `border-radius: 16px` + `padding: 12px`. Inner row border disappears (`border-bottom-color: transparent`, `padding-bottom: 0`). Text: `#00564c`.
- **Pressed**: same as hover but bg: `Surface/primary/focus #00a36a`. Text: `#00cc85`.

Avatar: 60×60 clip, `ic-user-circle` at 50px (DS `inset: 8.33%` = 5px each side). See `design-md/zul.design.md` Rule 108 for the full CSS pattern.

---

### 55. ~~Coloured brand/store icons → 2× PNG~~ — SUPERSEDED by Rule 57

This rule was wrong. Multi-color brand icons CAN be SVG symbols using hardcoded fills.
**Use Rule 57 instead.** See `design-md/zul.design.md` Rule 111 for the corrected approach.

---

### Mandatory workflow — BEFORE every session and every change

**Step 0 (mandatory):** Read `design-md/zul.design.md` AND refer to live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any change, or making any decision — including seemingly trivial fixes. No exceptions.

```
0a. Read design-md/zul.design.md  → ALL rules 1–115, confirmed specs, known mistakes — NO EXCEPTIONS
0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f         → single source of truth, re-verify every value live
0c. Audit component anatomy (Rule 49 / zul Rule 93):
      → get_design_context on COMPONENT_SET node → list ALL variants
      → get_design_context on EACH state variant → extract every token per state
      → For EACH nested sub-component → repeat the above on its own COMPONENT_SET
      → Check componentPropertyDefinitions → confirm visible/hidden/swap properties
0d. For spacing/positioning: read DS screen frame children y-coordinates (zul Rules 94–95)
0e. get_variable_defs on exact sub-nodes    → confirm Semantic token per fill/stroke/spacing
0f. Cross-check CSS var against :root hex   → never guess token from name (Rule 83)
0g. For icons: confirm viewBox + path scale + CSS dimensions all consistent (Rule 87)
1.  search_design_system → confirm component in DS, get component key
2.  use_figma            → find node IDs across pages
3.  get_design_context   → pull token bindings, dimensions, structure per variant
4.  get_variable_defs    → confirm Semantic token names on exact sub-nodes
5.  Implement            → use only DS-confirmed values, zero assumptions
6.  Validate             → compare against get_screenshot, fix before moving on
```

---

---

### 56. Never approximate button states — get_design_context on the exact DS node first

Before writing any CSS for a button/item state (hover, selected, disabled), call `get_design_context` on the DS component set node and read every variant. No guessing from memory or adapting from a similar component.

**Confirmed Dropdown - Parts states (DS node 1342:4370):**

| State | bg | border | radius | label |
|---|---|---|---|---|
| Default | transparent | `1px solid transparent` | 108px | `#666` |
| Hover | `#e8fbe8` | `1px solid #00cc85` | 108px | `#00cc85` |
| Selected | `#b5f291` | `1px solid #00a36a` | 108px | `#00a36a` |

**Key patterns:**
- Use `border: 1px solid transparent` in default — prevents 2px layout shift when hover border appears
- `border-radius: 108px` (Radius/pill) — not 999px
- No Pressed/Active state exists — never add `:active` CSS for Dropdown - Parts
- Transition: `background, border-color` — not `box-shadow`

See `design-md/zul.design.md` Rule 110 for the full breakdown and mistake table.

---

### 57. Colored SVG icons → SVG symbols with hardcoded fills, NOT `<img src="*.png">`

Rule 36 (all icons must be symbols) applies to ALL icons including colored brand icons. Store icons (Google Play, Apple, Huawei) are < 2KB SVGs — always embed as `<symbol>` with hardcoded fills.

For icons with `<linearGradient>` or `<clipPath>`: place those defs in the main `<svg><defs>` block (not inside the symbol) — `url(#id)` resolves from document root, not from `<use>` shadow instances.

**Updated decision rule:**
- Single-color outline → `<symbol>` with `stroke="currentColor"`
- Multi-color / filled, < 12KB → `<symbol>` with hardcoded fills
- Illustrated icon > 12KB → 2× PNG (Feature/* icons only)

See `design-md/zul.design.md` Rule 111.

---

### 58. Shared values → CSS custom property in `:root`, never hardcoded in each rule

Any value used across multiple components (e.g. all dropdown `top` positions) must be a CSS variable. Change once → applies everywhere. Current shared variables:

| Variable | Value | Controls |
|---|---|---|
| `--nav-dropdown-top` | `72px` | All 5 nav dropdown top positions |
| `--page-max-width` | `100%` | Body + container max-width |
| `--page-padding-x` | `60px` | Horizontal page padding |
| `--section-gap` | `var(--spacing-space-m)` | Gap between main content sections |

See `design-md/zul.design.md` Rule 112.

---

### Mandatory workflow — BEFORE every session and every change

**Step 0 (mandatory):** Read `design-md/zul.design.md` AND refer to live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any change, or making any decision. No exceptions.

```
0a. Read design-md/zul.design.md       → ALL rules 1–116, confirmed specs, known mistakes
0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth — NOT memory, NOT docs
0c. get_design_context on COMPONENT SET → list ALL variant names
0d. get_design_context on EACH state   → extract every token BEFORE writing CSS
0e. get_variable_defs on sub-nodes     → confirm Semantic tokens
0f. Cross-check CSS var against :root  → never guess from token name
0g. exportAsync SVG_STRING for icons   → check size before PNG vs symbol decision
0h. get_screenshot after implement     → compare against DS, fix before moving on
```

---

### 59. Nav Button - 1.5 — full confirmed spec (COMPONENT_SET 3908:6148)

**44×44px square icon button. Radius/xl = 8px. 4 states — all from COMPONENT_SET `3908:6148`, never from standalone named components.**

| State | bg | bg hex | border | border hex | icon | icon hex |
|---|---|---|---|---|---|---|
| Default | `Surface/general/default` | `#ffffff` | none | — | `Icon/default/default` | `#808080` |
| Hover | `Surface/secondary/default-subtle` | `#e8fbe8` | `Border/primary/default` | `#00cc85` | `Icon/primary/default` | `#00cc85` |
| Pressed | `Surface/primary/focus` | `#00a36a` | `Border/primary/default` | `#00cc85` | `Icon/primary/default` | `#00cc85` |
| Active | `Surface/primary/default` | `#00cc85` | `Border/primary/focus` | `#00a36a` | `Icon/primary/on-color` | `#ffffff` |

**Active state = plain rounded square. No speech-bubble tail. No `nav-btn-union-bg`.**

**`--icon-primary-on-color` = `#ffffff`** — DS updated 2026-05-24 from previous value `#e1f9ea`. See CLAUDE.md Rule 61.

**Supersedes Rule 52 item 1 and Rule 99.** Both were based on standalone node `3908:6163` (a VECTOR artifact), not the COMPONENT_SET.

**Root lesson:** A standalone component named `ComponentName/Active` is NOT equivalent to `State=Active` inside the COMPONENT_SET. Always use the COMPONENT_SET as the canonical source.

---

---

### 60. `strokeAlign: INSIDE` = `box-shadow: inset` — never `border: 1px solid`

**Non-negotiable. Every component with an INSIDE stroke. No exceptions.**

Figma `strokeAlign: INSIDE` renders the stroke inside the frame's bounding box — **zero layout effect**. CSS `border: 1px solid` adds pixels OUTSIDE, making the element larger than DS intended.

```css
/* ✓ Correct — matches strokeAlign: INSIDE */
box-shadow: inset 0 0 0 1px var(--token);

/* ✗ Wrong — adds 2px to element's visual size */
border: 1px solid var(--token);
```

**How to check:** `use_figma` → read `node.strokeAlign`. If `"INSIDE"` → `box-shadow: inset`.

**Confirmed instance — Secondary/M button arrow circle (2026-05-19):**
All 5 states: `w:20 h:20`, `padding:2px`, `strokeAlign: INSIDE`. State changes = only `box-shadow` color + `background`. Never change `width`, `height`, or `padding` between states unless raw DS node confirms it.

**`get_design_context` generated code can misreport padding.** It showed `p-[1px]` for Default but raw `use_figma` confirmed `padding: 2` for all states. Always verify exact dimensions via raw `use_figma` node inspection (`paddingTop/Right/Bottom/Left`, `strokeAlign`, `width`, `height`).

---

### 61. Always sync shared components FROM `zul.page.template.html` BEFORE starting any Syakila page work

`zul.page.template.html` is the **canonical source** for all shared navigation components (Navbar Primary, NavTopMenu, NavBar-Mobile, NavMenu-Tablet, NavMenu-Mobile, Footer, all dropdowns, all JS handlers). Zul's template receives updates first — Syakila pages must pull those updates before any session-specific work begins.

**Mandatory pre-session sync checklist:**
1. `git log --oneline -- "zul.test.git/zul.page.template.html"` → check if any commits are newer than the last Syakila page sync
2. `git diff <last-sync-sha>..HEAD -- "zul.test.git/zul.page.template.html"` → read the full diff
3. For each changed shared section (CSS `:root`, shared classes, HTML components, JS handlers) — apply the equivalent change to EVERY Syakila `.html` file
4. After syncing, verify with `grep` that key anchors match between template and Syakila pages

**Shared sections that must always stay in sync (both files):**
- `:root` CSS variables (tokens, layout vars)
- `html`, `body`, `main`, `.page-container`, `.main-content` layout chain
- `.num-badge` CSS (including `transition` + `#notif-btn.is-active` opacity rule)
- Notification dropdown CSS (`.notif-item`, `.notif-item__content`, `.notif-item__body`, `.notif-dropdown__footer`, `.notif-see-all`, indicator dot)
- Nav menu accordion CSS (`.nav-menu-submenu`, `.nav-menu-item.has-submenu.is-open`, `margin-top` trick)
- NavMenu-Tablet HTML (all `has-submenu` items + submenu divs: Class, Learn, Achievement, Potential, Rewards)
- NavMenu-Mobile HTML (same items with `submenu-m-*` IDs)
- Notification dropdown JS IIFE (full read/dismiss interaction — see Rule 62)
- Tablet accordion JS IIFE + Mobile accordion JS IIFE (see Rule 63)
- Image paths (`../src/image-repo/page.template/assets/main/...`)

**Mistake made (2026-05-29):** Applied 5 previous sessions of template updates to `learningHub.html` in one batch because the sync was never done incrementally. Cost: full audit + manual edit of every shared section. Prevention: sync after every template commit, not after many.

---

### 62. Notification dropdown — full read/dismiss JS interaction pattern

The notification dropdown requires a **two-click dismiss pattern** per item, not a simple close-on-click. This is the canonical JS block — always use this exact pattern, never simplify it.

**Click 1 → mark read (hide unread dot):**
```js
item.classList.add('is-read');  // CSS: .notif-item.is-read .notif-item__indicator { opacity: 0; pointer-events: none; }
```

**Click 2 → collapse and remove item:**
```js
item.style.transition    = 'max-height 0.3s ease, opacity 0.2s ease';
item.style.maxHeight     = item.scrollHeight + 'px';
item.getBoundingClientRect();   // MANDATORY — flushes layout so transition fires
item.style.maxHeight     = '0';
item.style.opacity       = '0';
item.style.pointerEvents = 'none';
dismissedCount++;
if (dismissedCount >= notifItems.length) dropdown.classList.add('is-empty');
```

**`getBoundingClientRect()` flush is mandatory** — without it the browser batches both `maxHeight` assignments and no transition fires (the item disappears instantly).

**Reset on ALL close paths (both `mouseleave` AND outside-click):**
```js
dismissedCount = 0;
dropdown.classList.remove('is-empty');
notifItems.forEach(function (item) {
  item.dataset.clicks      = '0';
  item.classList.remove('is-read');
  item.style.transition    = 'none';
  item.style.maxHeight     = '';
  item.style.opacity       = '';
  item.style.pointerEvents = '';
  requestAnimationFrame(function () { item.style.transition = ''; });
});
```

`requestAnimationFrame` after resetting `transition: none` ensures the `none` takes effect before the next paint, so the instant reset doesn't interfere with future transitions.

**Required CSS for the two-click pattern to work:**
- `.notif-item { overflow: hidden; }` — needed for `max-height` collapse to clip content
- `.notif-dropdown__footer { transition: padding-top 0.3s ease; }` — smooth footer adjustment
- `.notif-dropdown.is-empty .notif-dropdown__footer { padding-top: 0; }` — removes gap when all items gone
- `#notif-btn.is-active .num-badge { opacity: 0; }` — hides counter badge while dropdown is open

**Mistake made (2026-05-29):** `learningHub.html` had only the simple `mouseleave → close` and `outside-click → close` handlers. The full read/dismiss interaction block was never applied. The CSS rules for `is-read`, `is-empty`, and `overflow: hidden` were present but the JS to drive them was missing — so the CSS was dead code.

---

### 63. Nav menu accordion — expandable submenu pattern (tablet + mobile)

Both `#NavMenu-Tablet` and `#NavMenu-Mobile` have expandable sub-menus for Class, Learn, Achievement, Potential, and Rewards. Each requires matching HTML, CSS, and a dedicated JS IIFE.

**HTML pattern — flat siblings (no wrapper divs):**
```html
<!-- Trigger -->
<div class="nav-menu-item has-submenu" role="button" tabindex="0"
     aria-label="Learn" aria-expanded="false" data-submenu="submenu-learn">
  <span class="nav-menu-item__icon">...</span>
  <span class="nav-menu-check" aria-hidden="true">...</span>
  <span class="nav-menu-item__label">Learn</span>
  <span class="nav-menu-item__arrow">...</span>
</div>
<!-- Submenu — direct sibling, NOT wrapped -->
<div class="nav-menu-submenu" id="submenu-learn" aria-hidden="true">
  <div class="nav-menu-item" role="button" tabindex="-1" ...>...</div>
  ...
</div>
```

**ID convention:**
- Tablet: `submenu-class`, `submenu-learn`, `submenu-achievement`, `submenu-potential`, `submenu-rewards`
- Mobile: `submenu-m-class`, `submenu-m-learn`, `submenu-m-achievement`, `submenu-m-potential`, `submenu-m-rewards`

**CSS — `margin-top: -8px` trick (phantom gap cancellation):**
```css
.nav-menu-submenu {
  max-height: 0; overflow: hidden;
  margin-top: calc(-1 * var(--spacing-space-xs));   /* -8px cancels phantom flex gap when closed */
  transition: max-height 0.2s ease, margin-top 0.2s ease;
}
.nav-menu-submenu.is-open { max-height: 500px; margin-top: 0; }   /* restore gap when open */
#NavMenu-Mobile .nav-menu-submenu.is-open { max-height: 800px; margin-top: 0; padding-bottom: var(--spacing-space-m); }
```

**JS — each menu (tablet / mobile) gets its own IIFE with:**
- `closeAllSubmenus()` — runs `cancelAutoCollapse()` first, then closes all open submenus
- `startAutoCollapse()` — 5s timer; cancelled on each new open
- `MutationObserver` watching `aria-hidden` on the panel → calls `closeAllSubmenus()` when panel hides
- Mobile only: `adjustVisibleItems()` called 220ms after open — hides top items (Home/Quiz/Battle/Practice) one-by-one until `content.scrollHeight ≤ 800px`

**Tablet IIFE inserted BEFORE the hamburger toggle IIFE.**
**Mobile IIFE inserted AFTER the mobile menu close IIFE, before the maximize IIFE.**

**Mistake made (2026-05-29):** `learningHub.html` had the accordion CSS (`.nav-menu-submenu`, `.has-submenu.is-open`) and `#NavMenu-Mobile .nav-menu-submenu` overrides already applied, but the HTML items still lacked `has-submenu` class, `data-submenu` attributes, and the submenu divs — and both JS IIFEs were entirely missing. CSS without JS = no accordion behaviour.

---

### Mandatory workflow — BEFORE every session, every change, every decision (updated 2026-05-29)

> **"Always before starting any design, making any changes, or making any decisions — refer to DS 1.5 and syakila.design.md first."**

**Step 0 (mandatory, no exceptions):**

```
□ 0a. Read design-md/syakila.design.md   → ALL rules 1–63, confirmed specs, known mistakes
□ 0b. Read design-md/zul.design.md       → Rules 1–192+, confirmed specs — syakila inherits ALL zul rules
□ 0c. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth — NOT memory, NOT prior notes, NOT docs
□ 0d. Sync check (Rule 61): git log --oneline -- zul.test.git/zul.page.template.html
       → if any commit is newer than last Syakila sync → apply diff to ALL Syakila pages FIRST
□ 0e. get_design_context on COMPONENT SET → list ALL variant names before writing any CSS
□ 0f. get_design_context on EACH state   → extract every token BEFORE writing any CSS
□ 0g. use_figma raw node inspection      → confirm exact padding, strokeAlign, width, height
□ 0h. get_variable_defs on sub-nodes     → confirm Semantic token per fill/stroke/spacing
□ 0i. Cross-check CSS var against :root  → never guess hex from token name
□ 0j. get_screenshot after implement     → compare against DS, fix before moving on
□ 0k. After any fix — grep for same class in ALL Syakila .html files and sync (Rule 184 / zul)
```

**Never carry forward a radius, color, spacing, or JS pattern from a prior session without re-verifying live in DS and both .md files.** Values change. Use memory as context, not ground truth.

---

*Generated: May 2026 | Last updated: 2026-05-29 (Rules 61–63 — template sync protocol, notification read/dismiss JS pattern, nav menu accordion HTML+JS) | Cleanup target: Original DS (TLVKe3bgJTdVvuPAzgDq2f)*


---

# Syakila — Design Session Notes
> Syakila-specific specs, confirmed DS values, and implementation decisions for the Achievement prototype pages.
> General design rules live in `CLAUDE.md` — this file does NOT duplicate them.

**DS source:** `TLVKe3bgJTdVvuPAzgDq2f` (Pandai Design System 1.5 — the ONLY valid source)
**Prototype files:** `syakila.test.git/syakila.html` · `syakila.test.git/scoreCard.html` · `syakila.test.git/AnalysisCard.html`
**Branch:** `staging` → push `.html` files to both `staging` AND `main`; push `.md` files to `staging` only

---

## Canonical template rule

`zul.page.template.html` is the **master template** for all shared navigation shell components (Navbar, NavMenu, dropdowns, Footer, JS handlers). All Syakila pages sync FROM it — never the other way around. See Rule 61 for the sync protocol.

`scoreCard.html` is the canonical navbar/menubar template for all Achievement pages within the Syakila scope.
`syakila.html` is the home/welcome screen — it uses a different, simpler navbar.
`AnalysisCard.html` must copy navbar/menubar CSS, HTML, and JS exactly from `scoreCard.html`.
`learningHub.html` is the Learning Hub page — syncs shared components from `zul.page.template.html`, adds page-specific Learning Hub content (accordion filter panels, content grid).

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

`body { background: var(--surface-general-default); }` = `#ffffff`

DS Screen page confirmed: `Surface/general/default` is the correct page background token (2026-05-30). `--surface-subtle` (`#f8fafc`) was a fabricated token — not in DS. Use `--surface-general-default` everywhere.

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
| reportCard | `.pd-card` outer border invisible | `box-shadow: inset` → `border: 1px solid var(--border-primary-default)` — children cover inset shadow | Rule 80 |
| reportCard | `.pd-table15` border invisible | `box-shadow: inset` / `outline` → `border: 1px solid var(--border-general-default)` | Rule 80 |
| reportCard | Double gap between breadcrumbs and card | Merged duplicate `.pd-breadcrumbs15` rules — second had `margin-bottom:16px` overriding first's `margin-bottom:0` | Rule 81 |
| reportCard | Card header missing icon | Added `Outline/file-text` (24×24, `#ic-file-text`) beside title in `.pd-card__title-group` | DS node I4055:57157;2881:36277 |

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

---

## Session 7 — Asset migration + Geography badge fix (2026-05-26)

### Asset folder convention

All DS icons and images for the Syakila prototype must live in:

```
src/image-repo/Achievement/assets/<subfolder>/
```

Organized by feature/component — never dumped flat into the root of `assets/`. Current subfolders:

| Subfolder | Contents |
|---|---|
| `subject-icons/` | All 18 subject icons (PNG + SVG) |
| *(root)* | Logos, nav icons, battle icons, feature images |

HTML files in `syakila.test.git/` reference them via relative path:
```html
../src/image-repo/Achievement/assets/subject-icons/icon-math.png
```

**Why:** Assets were previously in `syakila.test.git/assets/` (local to prototype folder). Moved to `src/image-repo/Achievement/assets/` so all shared assets live in one organized, version-controlled location under the main `src/` tree.

---

### Geography badge — icon updated in DS 1.5

The Geography subject icon (DS node `3880:63782`) was updated to a complex multi-color illustrated globe. It must be exported as **2× PNG**, not SVG — the SVG export is 27,000+ chars and exceeds tool limits.

- **File:** `src/image-repo/Achievement/assets/subject-icons/icon-geography.png`
- **Export:** `exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } })`
- **Do not use:** `icon-geography.svg` — old simplified version, no longer matches DS

---

### Geography badge — text color must be explicitly set

Geography uses **dark text `#478220`** on its light green `#77d836` background. The badge CSS defaults to `var(--badge-text, #f2f2f2)` (white). For any badge with a light background, `--badge-text` must be set explicitly in the inline style — otherwise text is invisible.

**Confirmed Geography badge values (DS node `3309:67546`, Size=M + Size=S):**

| Property | Value |
|---|---|
| `--badge-bg` | `#77d836` |
| `--badge-border` | `#5fad2b` |
| `--badge-text` | `#478220` (dark — exception to default white) |
| Icon | `icon-geography.png` (2× PNG from DS node `3880:63782`) |

**Implementation in `syakila.html`:**
```html
<div class="pd-subject-badge" style="--badge-bg:#77d836;--badge-border:#5fad2b;--badge-text:#478220">
```

**Bugs fixed this session:**
- `syakila.html` — missing `--badge-text:#478220`, fell back to white `#f2f2f2`
- `scoreCard.html` — had `#f2f2f2` hardcoded as text color in JS data object
- All 3 files — icon reference updated from `.svg` → `.png`

**Rule:** Geography, KAFA, and Science all use dark text on light backgrounds. Any badge with a light `--badge-bg` MUST include an explicit `--badge-text` override — never rely on the `#f2f2f2` default.

---

### Subjects using dark badge text (exceptions to #f2f2f2 default)

| Subject | `--badge-bg` | `--badge-text` |
|---|---|---|
| Geography | `#77d836` | `#478220` |
| KAFA | `#8ae3a9` | `#538865` |
| Science | `#ffd641` | `#998027` |

*Last updated: May 2026 (Session 6)*

---

## Session 8 — Practice Card hover state + Learning Hub grid (2026-05-29)

### Mandatory pre-session rule (reinforced this session)

**Always refer to `design-md/syakila.design.md` AND the live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any changes, or making any decisions — including seemingly small fixes.**

Also always check the canonical reference implementation file (e.g. `Nadia.test.git/Practise/nadia_Practise-subject.html`) before touching any component that was originally ported from it.

---

### 64. Practice Card hover — the visual effect is the circles expanding, not a color change alone

The Practice Card - 1.5 hover state (DS node `2339:4823`) has TWO parts:
1. **Color change** — `background` shifts to `--subj-bg-hover`, `box-shadow: inset 0 0 0 8px var(--subj-bg)` creates a thick colored inner ring
2. **Circle animation** — `.practice-card__circles` scales up via `transform: scale(1.4)` from `transform-origin: left center`

Without the circle animation, the hover appears static and dull even if the color is technically correct. The circles ARE the primary visual feedback.

**CSS that must exist:**
```css
.practice-card__circles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform-origin: left center;
  transition: transform 0.3s ease;
}
.practice-card:hover .practice-card__circles { transform: scale(1.4); }
```

**Mistake made:** Hover color changes were applied but `transform: scale(1.4)` was completely missing. User reported "no update" — nothing visible changed.

---

### 65. Practice Card circles — direct child of `<article>`, never inside `__image`

`.practice-card__circles` must be a **direct child of `<article class="practice-card">`**, positioned with `position: absolute; inset: 0` relative to the card.

If placed inside `.practice-card__image` (which is `160px` wide), the circles are clipped to that 160px column — the `scale(1.4)` expansion only covers the image area and the effect is invisible on the content side.

```html
<!-- CORRECT -->
<article class="practice-card">
  <div class="practice-card__circles" aria-hidden="true">...</div>
  <div class="practice-card__image">...</div>
  <div class="practice-card__content">...</div>
</article>

<!-- WRONG — circles scoped to 160px image column -->
<article class="practice-card">
  <div class="practice-card__image">
    <div class="practice-card__circles" aria-hidden="true">...</div>  ← WRONG
    ...
  </div>
  ...
</article>
```

**Also required:** `position: relative` on `.practice-card` and **NO** `overflow: hidden` on `.practice-card__image` — circles must escape the image column bounds.

**Mistake made:** Circles were inside `__image`. Moving them to be a direct `<article>` child (with `position: relative` on the card and `position: absolute; inset: 0` on circles) fixed the full-card coverage.

---

### 66. `box-shadow: inset` on a card works when children have no explicit background

When a card uses `box-shadow: inset 0 0 0 Npx var(--color)` for its border/ring, it ONLY shows through if the child elements (`.practice-card__image`, `.practice-card__content`) have no explicit `background` set. The card's own background color shows through transparent children, making the ring visible.

**Rule:** Never set a background on child sections of a practice card — they must remain `background: transparent` (or unset) so the inset box-shadow at the card edges is never obscured.

This is why `box-shadow: inset` works correctly in Nadia's implementation even without `border`.

---

### 67. Always read the canonical reference file before touching a ported component

For any component ported from a Nadia or Zul source file, always re-read the source before making changes:

| Component | Canonical source |
|---|---|
| Practice Card - 1.5 | `Nadia.test.git/Practise/nadia_Practise-subject.html` |
| Quiz Card, Primary Card | `zul.test.git/zul.page.template.html` |
| Shared nav (Navbar, Footer) | `zul.test.git/zul.page.template.html` |

**Why:** DS `get_design_context` output shows the component schema but not the exact implementation choices (inline-style variables, color values, hover mechanisms). The reference file reflects confirmed, working implementation decisions. Copying from it avoids re-discovering the same specs.

**Mistake made:** Attempted to implement hover from DS `get_design_context` alone — missed `transform: scale(1.4)` and circles placement. Fetching Nadia's file gave the complete working structure in one read.

---

### 68. Practice Card — flex: 1 required so cards fill row width equally

`.practice-card` must have `flex: 1` so two cards in a `.practice-cards-row` share the available width equally.

Without `flex: 1`, cards shrink to content width and leave empty space in the row.

```css
.practice-card {
  flex:   1;          /* ← required */
  height: 160px;
  ...
}
```

---

### 69. Primary Card inner content wrapper — remove white bg + border when cards fill the space

The DS Primary Card - 1.5 (Secondary variant, node `2881:36281`) specifies a white inner content placeholder with `border: 1px solid #00a36a`. This is appropriate when the content area contains mixed elements.

**For the Learning Hub practice card grid:** remove the white background and inner border from `.practice-cards-content` so the practice cards sit directly on the green outer card surface. The white layer adds visual noise and makes the layout feel heavier than necessary.

```css
/* Remove these two lines from .practice-cards-content: */
background:  var(--surface-general-default);             /* ← remove */
box-shadow:  inset 0 0 0 1px var(--border-primary-focus); /* ← remove */
```

**Confirmed preference:** User requested removal after seeing the rendered output.

---

### Practice Card — confirmed final CSS (2026-05-29)

```css
.practice-card {
  display: flex;
  align-items: stretch;
  position: relative;
  border: none;
  box-shadow: inset 0 0 0 1px var(--subj-border);
  border-radius: 24px;
  overflow: hidden;
  background: var(--subj-bg);
  flex: 1;
  height: 160px;
  cursor: default;
  transition: background 0.18s ease, box-shadow 0.18s ease;
}
.practice-card:hover {
  background: var(--subj-bg-hover);
  box-shadow: inset 0 0 0 8px var(--subj-bg);
  cursor: pointer;
}
.practice-card:hover .practice-card__content { border-left: none; }

.practice-card__circles {
  position: absolute; inset: 0;
  pointer-events: none;
  transform-origin: left center;
  transition: transform 0.3s ease;
}
.practice-card:hover .practice-card__circles { transform: scale(1.4); }

.practice-card__image {
  width: 160px; min-width: 160px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  position: relative;
  /* NO overflow: hidden — circles are direct card children */
}
```

**All 8 card inline style values (confirmed from Nadia source):**

| Subject | `--subj-bg` | `--subj-border` | `--subj-bg-hover` | `--subj-title` |
|---|---|---|---|---|
| English | `#ff4d56` | `#992e34` | `#cc3e45` | — |
| Bahasa Melayu | `#4d77ff` | `#2e4799` | `#3e5fcc` | — |
| Accounting | `#0072ca` | `#004479` | `#005ba2` | `#e6f1fa` |
| Mathematics | `#42ac7b` | `#28674a` | `#358a62` | — |
| Biology | `#8431d8` | `#4f1d82` | `#6a27ad` | — |
| Chemistry | `#e20082` | `#88004e` | `#b50068` | — |
| Physics | `#27a0d7` | `#176081` | `#1f80ac` | — |
| Computer Science | `#d10070` | `#7d0043` | `#a7005a` | — |

`--subj-title` is only set for Accounting (light text on medium-blue bg). All other subjects default to `white`.

---

### 198. Button - 1.5 — no CSS transitions on any state (instant cuts only)

All `Button - 1.5` instances use **instant state changes** — no `transition` on any property, on any element (container, label, arrow, arrow-clip).

**Rule:** Never add `transition` to any Button - 1.5 CSS class — `.btn-*`, `.btn-*__text`, `.btn-*__label`, `.btn-*__arrow`, or any child element.

**Why:** The DS does not define easing or duration for button state changes. Adding transitions causes the button body and arrow to animate at different speeds, producing a "laggy arrow" or "staggered" feel. State changes must be instant cuts to match the DS.

Note: Transitions on **cards** (e.g. `.practice-card { transition: background }`) are separate DS-defined hover animations and are NOT affected by this rule. This rule applies to Button - 1.5 elements only.

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

*Last updated: 2026-05-31 | Rules 198–199 added — Button-1.5 no transitions + is-pressing JS; Rules 19/40 corrected for Primary Pressed palette (Primary=#00a36a, Secondary/Tertiary=#00564c)*

---

## Session 9 — Learning Hub layout fixes + search (2026-06-01)

### Mandatory pre-session rule (reinforced every session)

**Always refer to `design-md/syakila.design.md` AND the live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any changes, or making any decisions — no exceptions.**

---

### 70. Flex container hug-content — `align-self: flex-start` + remove `flex: 1` from inner content

To make a flex child stop stretching to fill its parent's cross-axis height ("hug content"), two things are required:

1. `align-self: flex-start` on the container itself — stops it stretching to match siblings
2. Remove `flex: 1` from any inner content div — `flex: 1` on a child prevents the parent from computing its natural height, keeping it tall

`overflow: hidden` must stay on the container to clip children to the rounded `border-radius`. Removing it causes content to visually flow outside the rounded border.

**Confirmed — `.learn-sidebar` (2026-06-01):**
```css
.learn-sidebar {
  align-self:     flex-start;   /* stops height matching the right panel */
  overflow:       hidden;       /* keeps children clipped to border-radius */
}
.learn-sidebar__content {
  /* flex: 1 REMOVED — was preventing sidebar from computing natural height */
}
```

**Mistake made:** Removing `overflow: hidden` from the sidebar (thinking it caused clipping) just moved the clipping problem — content then visually overflowed the rounded border. Root cause was accordion `max-height` too small, not the overflow property.

---

### 71. Filter item height — lock all states to `height: 38px; overflow: hidden`

Filter items change padding/border between states (Default = transparent border, Selected = coloured border). Without a fixed height, selected items become taller than unselected, causing layout shift.

**Calculation (DS confirmed):**
```
1px border-top + 8px padding-top + 20px line-height + 8px padding-bottom + 1px border-bottom = 38px
```

`height: 36px` is wrong — it leaves only 18px for content, clipping 1px from top and bottom of 20px text (descenders cut off).

```css
.filter-item {
  height:   38px;
  overflow: hidden;   /* prevents any child from pushing height above 38px */
}
```

---

### 72. Accordion `max-height` animation — `overflow: hidden` must be always-active, not just on collapsed state

**Wrong pattern:**
```css
.accordion__body { max-height: 900px; }
.accordion.is-collapsed .accordion__body { max-height: 0; overflow: hidden; }
```
Moving `overflow: hidden` to the collapsed rule only means the open state has no overflow control — long content overflows the parent border.

**Correct pattern:**
```css
.accordion__body {
  overflow:   hidden;     /* ALWAYS — never conditional */
  max-height: 2000px;     /* open state — must exceed actual content height */
  transition: max-height 0.25s ease, opacity 0.2s ease;
}
.accordion.is-collapsed .accordion__body {
  max-height: 0;
  opacity:    0;
  /* overflow NOT here — already always active above */
}
```

**Max-height calculation:** Always measure the actual expanded content. For a subjects list of 21 items:
`21 × 38px items + 20 × 8px gaps + 32px padding = 798 + 160 + 32 = 990px` → use 2000px for safety.

**Mistake made:** `max-height: 900px` was below the actual 990px subjects list — sidebar's `overflow: hidden` clipped the bottom items silently (no error, no overflow visible, just content cut off).

---

### 73. Practice card grid — always `align-self: flex-start` so border hugs cards, not the page

`.practice-card-grid` must have `align-self: flex-start` unconditionally. Without it, the green border stretches to match the sidebar height even when only a few cards are shown — the border fills the full column height rather than wrapping the cards.

```css
.practice-card-grid {
  flex:       1;            /* fills row width */
  align-self: flex-start;   /* hugs card content height — never stretches to match sidebar */
}
```

**Do NOT use `flex: 1` on inner content divs if the grid height should hug its content** — same principle as Rule 70.

---

### 74. Empty state — DS node `3420:205916` confirmed spec

| Property | Value |
|---|---|
| Height | **437px fixed** — never follows sidebar/sibling height |
| Background | `#f6fef6` (`--secondary-50`, Secondary/50) |
| Border | `1px solid #00cc85` — `strokeAlign: INSIDE` → `box-shadow: inset 0 0 0 1px var(--border-primary-default)` |
| Border radius | 24px (`corner-4xl`) |
| Overflow | hidden |
| Icon | 108×108px clip container, inset 12.5% (13.5px), `Outline/image` icon, `color: var(--icon-success-default)` = `#18c964` |
| Text | "There is no subjects to show", 24px Poppins Medium (`Header/H3`), `#666666` (`--text-default-body`) |
| Gap | 16px (`Spacing/space-m`) |

**CSS:**
```css
.practice-empty-state {
  height:      437px;
  flex-shrink: 0;
  background:  var(--secondary-50);
  box-shadow:  inset 0 0 0 1px var(--border-primary-default);
  border-radius: var(--corner-radius-corner-4xl);
  /* ... flex col, center, gap 16px */
}
```

Show/hide via `.is-visible` class toggled by JS. Show empty state when: no filters selected AND no search query.

---

### 75. Search on filtered cards — combined filter + search pattern

The search input (`.learn-search__input`) filters practice cards by their visible text content. It works on top of the existing grade/subject filters.

**Rules:**
- Show empty state when: `grades.length === 0 && subjects.length === 0 && query === ''`
- If query exists with no filters: show cards that match the search across all subjects/grades
- If query + filters yield zero visible cards: show empty state
- Wire to `input` event (not `change`) for live-as-you-type filtering

**JS pattern:**
```js
function applyFilters() {
  var query = searchEl.value.trim().toLowerCase();
  var noFilters = grades.length === 0 && subjects.length === 0;

  if (noFilters && !query) { /* show empty state */ return; }

  var anyVisible = false;
  cards.forEach(function(card) {
    var filterMatch  = /* grade + subject checks */;
    var searchMatch  = !query ||
      title.toLowerCase().indexOf(query) !== -1 ||
      stat.toLowerCase().indexOf(query)  !== -1;
    var show = filterMatch && searchMatch;
    card.classList.toggle('is-hidden', !show);
    if (show) anyVisible = true;
  });

  if (!anyVisible) { /* show empty state */ }
}

searchInput.addEventListener('input', applyFilters);
```

---

### 76. SVG polyline overflow — last point must not exceed container bounds

If a `<polyline>` has its last point at a y-coordinate that exceeds the container rect's bottom edge (even by 0.5px), the stroke renders visibly outside the rect — creating a small bump or "tail" that looks like a speech bubble.

**Confirmed — `#ic-image` (Outline/image):**
```
rect: y=1 to y=19 (18px height)
polyline: points="19 13.5 14 8.5 3 19.5"  ← y=19.5 is 0.5px below rect bottom
```
At 81px rendered size: 0.5px exceeds the rect by ~1.9px visually → bump visible at bottom-left.

**Fix:** Clip the last point to the rect boundary:
```
points="19 13.5 14 8.5 3 19"   ← y=19 exactly matches rect bottom
```

**Rule:** Always check that all polyline/path endpoints stay within the surrounding rect when implementing outline-style icons. Any point outside the rect will produce a visible stroke artifact.

---

### 77. Learning Hub corner radius confirmed (DS nodes 2881:36272, 2881:36281, 3420:205916)

| Element | Border radius | DS token | DS node |
|---|---|---|---|
| Outer card (`.practice-card-grid`) | **24px** | `corner-4xl` | `2881:36272` |
| Inner white cards area (`.practice-cards-content`) | **18px** | `Corner-2XL` / `Radius/3xl` | `2881:36281` |
| Empty state (`.practice-empty-state`) | **24px** | `corner-4xl` | `3420:205916` |
| Left sidebar (`.learn-sidebar`) | **24px** | `corner-4xl` | — |

The inner `.practice-cards-content` white container requires `border-radius: var(--corner-radius-corner-2xl)` (18px) — this was missing and must be added.

---

---

### 78. NEVER create Syakila files in `zul.test.git/` — all Syakila work goes in `syakila.test.git/`

Every file created for Syakila's prototype must live in `syakila.test.git/`. Never place Syakila work in `zul.test.git/`, even accidentally.

| Correct location | Wrong location |
|---|---|
| `syakila.test.git/quickNotes.view.html` | `zul.test.git/quickNotes.view.html` |
| `syakila.test.git/reportCard.html` | `zul.test.git/reportCard.html` |

**Mistake made (2026-06-03):** `quickNotes.view.html` was initially created in `zul.test.git/`. Had to be moved to `syakila.test.git/`. Check the file path before creating any new prototype file.

---

### 80. `box-shadow: inset` is invisible on full-bleed containers — use `border: 1px solid` instead (confirmed 2026-06-04)

**Rule:** When a container element has `overflow: hidden` AND its children fill 100% of the content area (e.g. table cells filling a table frame, card rows filling a card), `box-shadow: inset` is completely hidden behind those children. It renders in the content layer, **below** child elements. Use `border: 1px solid` instead — the border renders in the element's own **border area**, which is outside the content box and is never covered by children, even with `overflow: hidden`.

```css
/* WRONG — inset shadow hidden behind full-bleed children */
.pd-card  { box-shadow: inset 0 0 0 1px var(--border-primary-default); overflow: hidden; }
.pd-table { box-shadow: inset 0 0 0 1px var(--border-general-default); overflow: hidden; }

/* CORRECT — border always visible, unaffected by overflow:hidden */
.pd-card  { border: 1px solid var(--border-primary-default); overflow: hidden; }
.pd-table { border: 1px solid var(--border-general-default); overflow: hidden; }
```

**DS-confirmed values (node 4055:57157 + 4055:57185, fetched 2026-06-04):**
- Primary Card outer frame: `border: 1px solid var(--border/default, #00cc85)` — **green**
- Content Placeholder (table wrapper): `border: 1px solid var(--border/general/default, #d9d9d9)` — **grey**
- All body cells: `border-b border-r border-solid #d9d9d9` — bottom + right only (outer frame covers the rest)

**When `box-shadow: inset` IS correct:** Only use it for sub-components where children do NOT fill the full element — e.g. a button (has padding, label doesn't fill edge-to-edge), an avatar circle, an input field. Rule 60 (`strokeAlign: INSIDE` → `box-shadow: inset`) still applies in those cases.

**Mistakes made (2026-06-04):** `.pd-card` and `.pd-table15` both used `box-shadow: inset 0 0 0 1px` — borders were completely invisible because table cells / card content filled 100% of the container. Three attempts failed (box-shadow → box-shadow with green → outline) before identifying the root cause. The DS node data clearly shows `border: 1px solid` on both elements — always fetch node data before approximating.

---

### 81. Duplicate CSS rules — later rule always wins, comment-only rules are dead code (confirmed 2026-06-04)

If two rules with identical selectors and the same specificity set the same property, the **later one always wins** — regardless of any comment between them.

```css
/* This comment does nothing — the rule below it is still overridden */
.pd-breadcrumbs15 { margin-bottom: 0; }          /* ← loses */
.pd-breadcrumbs15 { ...; margin-bottom: 16px; }  /* ← wins */
```

**Fix:** Merge into one rule. Never rely on a comment to "explain" why a reset rule exists if a second rule further down overrides it. Delete the first rule and keep only the merged final intent.

**Confirmed mistake (2026-06-04):** `.pd-breadcrumbs15` had `margin-bottom: 0` on line 2248 and `margin-bottom: var(--spacing-space-m)` on line 2250. The 16px margin-bottom doubled the gap (16px gap from `.main-content` + 16px margin = 32px). Fixed by merging into one rule with `margin-bottom: 0`.

---

### 82. Always fetch DS node data before assuming a CSS border technique (confirmed 2026-06-04)

Before writing ANY border/stroke CSS on a container, call `get_design_context` or `use_figma` on the DS node and read the **exact CSS class** the tool outputs. The DS design context outputs real Tailwind/CSS classes like `border border-[#00cc85] border-solid` — this directly tells you to use `border: 1px solid`, not `box-shadow: inset`.

**Workflow:**
```
1. get_design_context on the DS component node
2. Read the output className for the container — look for `border`, `box-shadow`, `outline`
3. Map to CSS exactly as the DS shows — no approximation
```

**Do NOT apply Rule 60 (`strokeAlign: INSIDE` → `box-shadow: inset`) blindly** — Rule 60 is for non-full-bleed sub-elements. For containers where children fill edge-to-edge, the DS itself uses `border: 1px solid` even for INSIDE strokes. Always verify by reading the actual DS output.

---

### 79. Quick Notes — button arrow clips use DS clip symbols, never standalone 24×24 icons (confirmed 2026-06-03)

Both the "Back to List" (Secondary/M, left arrow) and "View all notes" (Primary/M, right arrow) buttons use `ic-chevron-btn-m` — the DS-exported 16×16 clip symbol — not the standalone 24×24 `Outline/chevron-right` icon.

**Symbol:** `ic-chevron-btn-m` — `viewBox="0 0 16 16"`, path `M6 12L10 8L6 4`, DS node `479:352`

```html
<!-- Right arrow (View all notes) -->
<span class="qn-btn-view__arrow-clip">
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor"
       stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <use href="#ic-chevron-btn-m"/>
  </svg>
</span>

<!-- Left arrow (Back to List) — mirror with scaleX(-1) -->
<span class="qn-btn-back__arrow-clip">
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor"
       stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
       style="transform:scaleX(-1)">
    <use href="#ic-chevron-btn-m"/>
  </svg>
</span>
```

CSS on the clip SVGs:
```css
.qn-btn-back__arrow-clip svg { width: 16px; height: 16px; color: var(--icon-primary-default); }
.qn-btn-view__arrow-clip svg { width: 16px; height: 16px; color: var(--border-primary-focus); }
```

**Mistake made:** Used the standalone 24×24 `Outline/chevron-right` icon inside a 16×16 clip — only a corner of the path was visible. Fixed by switching to the DS clip symbol (`ic-chevron-btn-m`) with explicit `width:16 height:16` on the SVG. See CLAUDE.md Rule 16.

---

### 80. P.Fano-Wireframe decorative element — confirmed specs (2026-06-03)

The card header includes a `P.Fano-Wireframe` decorative SVG overlay. Exported from DS node `5165:82853` area, saved as `src/image-repo/Learn/quick.notes/view/fano-wireframe.svg`.

**Specs:**
- Width: 488px, Height: 110px, `viewBox="0 0 488 110"`
- Position: `absolute; right: 0; top: 0; height: 110px; width: auto`
- Visual: `mix-blend-mode: overlay; opacity: 0.5` — white stroke circles on the BM header bg
- Pointer events: none (decorative only)

```css
.qn-card__header-fano {
  position:       absolute;
  right:          0;
  top:            0;
  height:         110px;
  width:          auto;
  pointer-events: none;
  display:        block;
  mix-blend-mode: overlay;
  opacity:        0.5;
}
```

```html
<img class="qn-card__header-fano"
     src="../src/image-repo/Learn/quick.notes/view/fano-wireframe.svg"
     alt="" aria-hidden="true">
```

**Note:** The SVG source already contains `mix-blend-mode:overlay` and `opacity:0.5` on its internal groups, but these only apply when the SVG is rendered inline. Through an `<img>` tag, CSS `mix-blend-mode` on the `<img>` element itself applies against the page/parent background — use CSS, not inline SVG attributes.

---

### 81. Quick Notes body — DS bullet list structure: one `<ul>` per bullet + `<p>` spacers (confirmed 2026-06-03)

The DS Quick Notes card body does NOT use a single `<ul>` with multiple `<li>` items. Each bullet is in its own `<ul>` element, separated by `<p>` spacer elements containing a zero-width space (`&#8203;`).

**Correct DS structure:**
```html
<div class="qn-body-textblock">
  <ul class="qn-body-text"><li>Bullet one text...</li></ul>
  <p class="qn-body-spacer">&#8203;</p>
  <ul class="qn-body-text"><li>Bullet two text...</li></ul>
  <p class="qn-body-spacer">&#8203;</p>
  <ul class="qn-body-text"><li>Bullet three text...</li></ul>
</div>
```

**CSS:**
```css
.qn-body-textblock {
  width:          100%;
  display:        flex;
  flex-direction: column;
}

.qn-body-text {
  font-family:  var(--font-family);
  font-weight:  400;
  font-size:    14px;
  line-height:  20px;
  color:        var(--text-default-body);
  width:        100%;
  margin:       0;
  padding-left: 20px;
}

.qn-body-spacer {
  margin:      0;
  padding:     0;
  font-size:   14px;
  line-height: 20px;
  white-space: pre-wrap;
}
```

**Why `.qn-body-textblock` wrapper is required:** The parent `.qn-topic-body` has `gap: 16px` between its flex children. Without a wrapper, every `<ul>` and `<p>` spacer would be a direct child and receive the full 16px gap — creating 52px between bullets (16 + 20px spacer + 16). The wrapper groups all bullets as a single flex child so `gap: 16px` only fires once between the text block and the table.

**Mistake made:** Initial implementation used a single `<ul>` with all bullets as `<li>` items — no visual spacing between bullets, and `li + li { margin-top: 0 }` rule was doing nothing.

---

### 82. Quick Notes info table — tags row bottom padding is 16px (confirmed 2026-06-03)

The pills/tags row (Form 4, Bahasa Melayu) at the bottom of the info table must have `padding-bottom: 16px`, not 8px.

**DS source:** Outer info table frame `5165:82860` has `paddingBottom: 16`.

```css
.qn-info-row--pills .qn-info-cell--value {
  padding: 8px 16px 16px 8px;   /* top right bottom left — bottom MUST be 16px */
}
```

With `overflow: hidden` + `border-radius: 18px` on `.qn-info-table`, 8px bottom padding looks visually clipped against the rounded bottom edge. 16px gives proper clearance.

**Mistake made:** Pills row cell had `padding: 8px 16px 8px 8px` — user reported "no padding bottom". DS outer frame confirms `paddingBottom: 16`.

---

### 83. Quick Notes view — responsive breakpoints (confirmed 2026-06-03)

Simple two-breakpoint rule. Desktop unchanged. Tablet + mobile both stack.

```css
/* Tablet + mobile (≤1279px): stacked — sidebar fills at bottom */
@media (max-width: 1279px) {
  .qn-view-layout { flex-direction: column; }
  .qn-card        { width: 100%; }
  .qn-sidebar     { width: 100%; min-width: 0; }
}

/* Mobile typography */
@media (max-width: 767px) {
  .qn-card__header-title { font-size: 20px; line-height: 32px; }
}
```

**Behaviour:**
- Desktop (>1279px): side-by-side, card `875px`, sidebar fills remaining space
- Tablet + Mobile (≤1279px): stacked column, card full width, sidebar full width below
- The sidebar (Chapter/Topic info card, navigation buttons, Related Notes) appears below the main notes card — this is intentional, not a bug

**What NOT to do:** Do not attempt complex proportional flex splits (`flex: 3 1 0 / 1 1 0`) for the tablet range — at 1024px the sidebar becomes too narrow for the navigation buttons to fit on one line. Stacked layout is cleaner and matches mobile intent.

---

### Mandatory pre-flight — ALWAYS before starting any design, making any changes, or any decisions (updated 2026-06-03)

> **"Always before starting any design, making any changes, or making any decisions — refer to DS and syakila.design.md first. No exceptions."**

```
□ 0a. Read design-md/syakila.design.md   → ALL rules 1–83+, confirmed specs, known mistakes
□ 0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth — NOT memory, NOT prior notes
□ 0c. Verify file location               → Syakila files ONLY in syakila.test.git/ (Rule 78)
□ 0d. get_design_context on COMPONENT SET → list ALL variant names
□ 0e. get_design_context on EACH state   → extract every token BEFORE writing CSS
□ 0f. use_figma raw node inspection      → confirm exact padding, strokeAlign, width, height
□ 0g. get_variable_defs on sub-nodes     → confirm Semantic tokens
□ 0h. For icons: confirm clip symbol viewBox + DS node ID before writing HTML (Rule 79)
□ 0i. After any fix — check both HTML files for same class and sync
```

---

---

## Session 11 — Asset path fixes: AnalysisCard.html + scoreCard.html (2026-06-03)

### Mandatory pre-session rule (reinforced — user explicit instruction 2026-06-03)

**Always refer to `design-md/syakila.design.md` AND the live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any changes, or making any decisions — no exceptions. This applies to seemingly small fixes too.**

---

### 84. Asset paths for AnalysisCard.html + scoreCard.html — `Achievement/score.card/assets/`, not `Achievement/assets/`

Both files are in `syakila.test.git/`. All their image assets live one level deeper than the broken paths originally used.

| Asset type | Correct relative path |
|---|---|
| Avatar, feature icons (Learn Menu), store icons | `../src/image-repo/Achievement/score.card/assets/` |
| Subject badge icons (18 subjects) | `../src/image-repo/Achievement/score.card/assets/subject-icons/` |
| Logo mark + logo text | `../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/` |

**Broken → fixed (2026-06-03):**
- `../src/image-repo/Achievement/assets/` → `../src/image-repo/Achievement/score.card/assets/` — 36 refs in AnalysisCard, 34 in scoreCard
- `../zul.test.git/icons/logo-mark.svg` → `../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/logo-mark.svg`
- `../zul.test.git/icons/logo-text.svg` → `../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/logo-text.svg`

**Root cause:** The `Achievement/` folder contains a `score.card/` subfolder — the full path is `Achievement/score.card/assets/`. Both HTML files were missing the `score.card/` level. `zul.test.git/icons/` was never the correct home for logos; they live in the page template asset folder.

**Why it's silent:** Broken asset paths do not produce CSS errors or console warnings in simple browsers. The only signal is a broken image icon in the browser. Always grep-verify every `src=` path against the actual file tree before committing.

**Full asset inventory — `src/image-repo/Achievement/score.card/assets/`:**
```
avatar-user.png
feature-live-tuition.svg   feature-live-help.svg     feature-quiz.svg
feature-practice.svg       feature-chapters.svg       feature-textbook.svg
feature-quick-notes.svg    feature-videos.png         feature-experiments.svg
feature-personality.svg    feature-university.svg     feature-rewards.svg
icon-playstore.png         icon-appstore.png           icon-appgallery.png
subject-icons/icon-{account,add-math,biology,bmelayu,business,chemistry,
  chinese-lang,comp-science,economy,english,geography,history,islamic,
  kafa,math,moral,physics,rbt,science}.svg  (+icon-geography.png)
```

**Rule:** Before referencing any asset in a Syakila HTML file, verify the path with PowerShell `Get-ChildItem` or `ls`. Never trust memory or prior-session notes for folder structure.

---

### 85. Logo assets for Syakila pages — always from `page.template`, never from `zul.test.git/icons/`

`zul.test.git/icons/` does NOT contain `logo-mark.svg` or `logo-text.svg`. Both Syakila pages must use:

```html
<img src="../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/logo-mark.svg" ...>
<img src="../src/image-repo/page.template/assets/main/NavbarPrimary-Desktop/logo-text.svg" ...>
```

This is the same canonical source used by `zul.page.template.html` (CLAUDE.md Rule 67). Syakila pages share the same logo assets — never invent a different path.

---

### Updated mandatory pre-flight (post Session 11)

```
□ 0a. Read design-md/syakila.design.md   → ALL rules 1–85+, confirmed specs, known mistakes
□ 0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth
□ 0c. Verify file location               → Syakila files ONLY in syakila.test.git/ (Rule 78)
□ 0d. Verify ALL <img src=> paths        → ls/Get-ChildItem each referenced folder (Rules 84–85)
□ 0e. get_design_context on COMPONENT SET → list ALL variant names
□ 0f. get_design_context on EACH state   → extract every token BEFORE writing CSS
□ 0g. use_figma raw node inspection      → padding, strokeAlign, width, height
□ 0h. get_variable_defs on sub-nodes     → confirm Semantic tokens
□ 0i. After any fix — grep both HTML files for same class and sync (Rule 63)
```

---

### 86. Quick Notes navigation — URL params carry subject + icon only (no hex)

When a user clicks a row or chevron button in `quickNotes.html`, navigate to `quickNotes.selections.html` passing only `subject` (display name) and `icon` (filename). Never pass raw hex colors in URL params — subject colors are resolved entirely from DS tokens on the receiving page.

```js
// quickNotes.html — click handler (correct)
var params = new URLSearchParams({ subject: subject, icon: icon });
window.location.href = 'quickNotes.selections.html?' + params.toString();
```

**Chain:**
- `quickNotes.html` → `quickNotes.selections.html?subject=X&icon=Y`
- `quickNotes.selections.html` → `quickNotes.view.html?subject=X&icon=Y` (btn-learn forwards same params)
- `quickNotes.view.html` → back → `quickNotes.selections.html?subject=X&icon=Y` (btn-back preserves params)

**Mistake made (2026-06-04):** Original implementation passed `bg` and `border` raw hex values in URL params and used `mixWhite`/`scaleDark` math to compute tints on the receiving page. This was NOT using DS tokens. Corrected to token-only approach (Rule 87).

---

### 87. Subject color tokens — always use DS 5-tier `--subjects-*` tokens, never compute hex tints

The DS has TWO Subjects variable collections: `Subjects (A–E)` and `Subjects (G–S)`. Each provides **5 color tiers** per subject (confirmed 2026-06-04 via `use_figma`):

| DS Token | CSS Var Suffix | Usage in Quick Notes |
|---|---|---|
| `Subject/default` | `--subjects-*-default` | Card header bg, topic pill border + text color |
| `Subject/default-hover` | `--subjects-*-default-hover` | Info table outer border |
| `Subject/default-subtle` | `--subjects-*-default-subtle` | Light bg — topic header, table heading, chapter cell |
| `Subject/default-subtle-hover` | `--subjects-*-default-subtle-hover` | Medium tint — cell dividers, table cell borders |
| `Subject/focus` | `--subjects-*-focus` | Dark — card border, topic body borders, related card border |

**All 19 subject keys** (DS token suffix → display name):
`account` · `add-math` · `b-melayu` · `biology` · `business` · `chemistry` · `chinese` · `cs` · `economy` · `english` · `geo` · `history` · `islamic` · `kafa` · `math` · `moral` · `physics` · `rbt` · `science`

**JS pattern — set token references, never compute hex:**
```js
var SUBJ_KEY = {
  'Bahasa Melayu': 'b-melayu',   'Additional Mathematics': 'add-math',
  'Accounting': 'account',        'Biology': 'biology',
  'Business Studies': 'business', 'Chemistry': 'chemistry',
  'Chinese Language': 'chinese',  'Computer Science': 'cs',
  'Economy': 'economy',           'English': 'english',
  'Geography': 'geo',             'History': 'history',
  'Islamic Studies': 'islamic',   'KAFA': 'kafa',
  'Mathematics': 'math',          'Moral Studies': 'moral',
  'Physics': 'physics',           'Reka Bentuk & Teknologi': 'rbt',
  'Science': 'science'
};
var key = SUBJ_KEY[subject];
if (key && section) {
  section.style.setProperty('--qn-subj-default',              'var(--subjects-' + key + '-default)');
  section.style.setProperty('--qn-subj-default-hover',        'var(--subjects-' + key + '-default-hover)');
  section.style.setProperty('--qn-subj-default-subtle',       'var(--subjects-' + key + '-default-subtle)');
  section.style.setProperty('--qn-subj-default-subtle-hover', 'var(--subjects-' + key + '-default-subtle-hover)');
  section.style.setProperty('--qn-subj-focus',                'var(--subjects-' + key + '-focus)');
}
```

**CSS cascade pattern:** Set all 5 `--qn-subj-*` vars on the **section** (`#QuickNotes-View-Desktop`) so they cascade to both the left card and the right sidebar without setting them twice.

**Card inline style pattern (quickNotes.html list view):**
```html
<div class="qn-card" style="--qn-subj-default:var(--subjects-b-melayu-default); --qn-subj-focus:var(--subjects-b-melayu-focus);" data-subject="Bahasa Melayu" data-icon="border-bmelayu.svg">
```
Only `default` and `focus` needed in quickNotes.html (card header bg + border). The other 3 tiers are only set by JS on the view page.

**`:root` in all 3 Quick Notes files** must contain all 5 tiers × 19 subjects = 95 token definitions. Values confirmed from DS 2026-06-04:

| Subject | default | default-hover | default-subtle | default-subtle-hover | focus |
|---|---|---|---|---|---|
| Account | `#0072ca` | `#005ba2` | `#e6f1fa` | `#99c7ea` | `#004479` |
| Add Math | `#283589` | `#202a6e` | `#eaebf3` | `#a9aed0` | `#182052` |
| B. Melayu | `#4d77ff` | `#3e5fcc` | `#f6f9ff` | `#b8c9ff` | `#2e4799` |
| Biology | `#8431d8` | `#6a27ad` | `#f3ebfb` | `#ceadef` | `#4f1d82` |
| Business | `#efb42b` | `#bf9022` | `#fef8ea` | `#f9e1aa` | `#8f6c1a` |
| Chemistry | `#e20082` | `#b50068` | `#fce6f3` | `#ed99c6` | `#88004e` |
| Chinese | `#f94848` | `#c73a3a` | `#ffeded` | `#fdb6b6` | `#952b2b` |
| Comp. Sci | `#d10070` | `#a7005a` | `#fbe6f1` | `#ed99c6` | `#7d0043` |
| Economy | `#ff5733` | `#cc4629` | `#ffeeeb` | `#ffbcad` | `#99341f` |
| English | `#ff4d56` | `#cc3e45` | `#ffedee` | `#ffb8bb` | `#992e34` |
| Geography | `#77d836` | `#5fad2b` | `#f2fbeb` | `#c9efaf` | `#478220` |
| History | `#a97c50` | `#876340` | `#f7f2ee` | `#ddcbb9` | `#654a30` |
| Islamic Studies | `#de4d7f` | `#b23e66` | `#fcedf2` | `#f2b8cc` | `#852e4c` |
| KAFA | `#8ae3a9` | `#6eb687` | `#f4fcf7` | `#d0f4dd` | `#538865` |
| Math | `#42ac7b` | `#358a62` | `#ecf7f2` | `#b3deca` | `#28674a` |
| Moral | `#0072ca` | `#005ba2` | `#e6f1fa` | `#99c7ea` | `#004479` |
| Physics | `#27a0d7` | `#1f80ac` | `#eaf6fb` | `#a9d9ef` | `#176081` |
| RBT | `#353535` | `#2a2a2a` | `#d7d7d7` | `#aeaeae` | `#202020` |
| Science | `#ffd641` | `#ccab34` | `#fffbec` | `#ffefb3` | `#998027` |

**Never use `mixWhite()` or `scaleDark()` to compute tints.** Those functions existed to approximate DS token values — the actual tokens are now in `:root`. Any future subject-colored element must reference `var(--qn-subj-*)` → `var(--subjects-*-*)` → DS confirmed hex.

---

### Updated mandatory pre-flight (post Session 12)

```
□ 0a. Read design-md/syakila.design.md   → ALL rules 1–87+, confirmed specs, known mistakes
□ 0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth
□ 0c. Verify file location               → Syakila files ONLY in syakila.test.git/ (Rule 78)
□ 0d. Verify ALL <img src=> paths        → ls/Get-ChildItem each referenced folder (Rules 84–85)
□ 0e. get_design_context on COMPONENT SET → list ALL variant names
□ 0f. get_design_context on EACH state   → extract every token BEFORE writing CSS
□ 0g. use_figma raw node inspection      → padding, strokeAlign, width, height
□ 0h. get_variable_defs on sub-nodes     → confirm Semantic tokens
□ 0i. After any fix — grep both HTML files for same class and sync (Rule 63)
□ 0j. For subject colors: use --subjects-*-{tier} tokens (Rule 87), never hex math
```

---

*Last updated: 2026-06-04 (Session 12 — Quick Notes navigation wiring + full DS subject token refactor; Rules 86–87)*

---

### 88. SVG `preserveAspectRatio="none"` → ellipse distortion — remove when viewBox is dynamic

When a graph SVG uses JS to dynamically set its `viewBox` to match the rendered container dimensions (via `getBoundingClientRect()`), adding `preserveAspectRatio="none"` causes independent X/Y scaling. If the container's aspect ratio ever differs from the initial `viewBox`, all circles become ellipses and the entire graph distorts.

**Rule:** Never use `preserveAspectRatio="none"` on a dynamic graph SVG. Remove the attribute entirely and let the browser use the default `xMidYMid meet`. When `initGraph()` sets `viewBox="0 0 W H"` to exactly match the rendered container, the SVG content fills the container 1:1 with no distortion.

```html
<!-- Wrong — causes circle → ellipse when aspect ratio drifts -->
<svg id="score-graph" viewBox="0 0 380 120" preserveAspectRatio="none" fill="none">

<!-- Correct — initGraph() sets viewBox to match container; no preserveAspectRatio needed -->
<svg id="score-graph" viewBox="0 0 380 120" fill="none">
```

**Confirmed instance (scoreCard.html, 2026-06-04):** `initGraph()` sets `viewBox` to `getBoundingClientRect()` dimensions. `preserveAspectRatio="none"` made data-point circles render as ellipses on first paint. Removing the attribute fixed all circles to perfect round shapes.

---

### 89. DS Curve chart (node `5376:191596`) — confirmed visual spec

**Source:** `use_figma` on node `5376:191596`, confirmed 2026-06-04.

The DS "Curve chart" GROUP has 1 line vector + 6 dot vectors:

| Element | DS property | CSS |
|---|---|---|
| Curve line | stroke `rgb(0, 86, 76)` = `#00564c`, `strokeWeight ≈ 0.85` | `stroke="var(--surface-tertiary-default)"` `stroke-width="1"` |
| Data dots | solid fill `rgb(0, 204, 133)` = `#00cc85`, **no stroke** | `fill="var(--surface-primary-default)"` no `stroke` attr |
| Dot radius | 24.56px diameter at 669px DS width ≈ 3.7% of width | `r="5"` at typical card-widget scale |

**Critical differences from intuitive implementation:**
- Line is **dark teal** (`#00564c` — `surface-tertiary-default`), NOT primary green
- Dots are **solid filled** (no white center, no stroke ring) — opposite of a typical outlined data point
- Line `stroke-width="1"`, NOT `1.5`

**Mistake made (before DS fetch):** Line was `stroke="var(--surface-primary-default)"` (#00cc85) with `stroke-width="1.5"`. Dots were `fill="var(--surface-general-default)"` (white) + `stroke="var(--surface-primary-default)"` (green ring) + `r="3"`. All three wrong. Always fetch DS node before implementing any chart element — never assume data-point styling from memory.

---

### 90. Subject filter chips = Button - 1.5 — fetch DS before writing any button states

Subject filter chips (and any pill-shaped toggle group) are `Button - 1.5` instances:
- **Default (unselected)**: `Secondary/M` variant — outlined, white bg, green border+text
- **Active (selected)**: `Primary/M` variant — solid green bg, white text

**Confirmed DS specs for chip states (scoreCard.html, 2026-06-04):**

| State | bg | border (box-shadow inset) | text/label |
|---|---|---|---|
| Default | `--surface-general-default` (#ffffff) | `--border-primary-default` (#00cc85) | `--text-primary-default` (#00cc85) |
| Hover | `--surface-secondary-default` (#b5f291) | `--border-secondary-focus` (#70bc6f) | `--text-secondary-focus` (#70bc6f) |
| Pressed | `--surface-primary-focus` (#00a36a) | `--border-primary-default` (#00cc85) | `--text-primary-default` (#00cc85) |
| Active | `--surface-primary-default` (#00cc85) | `--border-primary-focus` (#00a36a) | `--text-primary-on-color` (#ffffff) |
| Active+Pressed | `--surface-primary-focus` (#00a36a) | `--border-primary-default` (#00cc85) | `--text-primary-default` (#00cc85) |

**Padding:** `2px 8px` (Button - 1.5 M outer padding = `py:2 px:8`). Never `2px 12px` — that was wrong before DS fetch.

**Hover bg is `#b5f291` (full secondary), NOT `#e8fbe8` (subtle).** See CLAUDE.md Rule 88.

**Outer border mechanism:** `strokeAlign: INSIDE` → always `box-shadow: inset 0 0 0 1px` (CLAUDE.md Rule 60). Never `border: 1px solid` on these chips.

**Mistake made (2026-06-04):** Padding was `2px 12px` and hover bg was `#e8fbe8`. Both wrong — DS confirmed only after `get_design_context`. Never guess button padding or hover color from memory.

---

### 91. Always add JS `is-pressing` for every interactive chip or button (scoreCard pattern)

CSS `:active` alone is unreliable in Electron webview (VS Code Simple Browser). Every `Button - 1.5` rendered as a `<button>` or interactive `<div>` needs BOTH:
1. CSS `.is-pressing` class rules matching the pressed state tokens
2. JS `mousedown` → add, `mouseup` → remove, `mouseleave` → remove

**Pattern — always inside the same `forEach` loop as the `click` handler:**
```js
chipsRow.querySelectorAll('.sc-subject-chip').forEach(function(chip) {
  chip.addEventListener('click', function() { selectSubject(chip.dataset.key); });
  chip.addEventListener('mousedown', function() { chip.classList.add('is-pressing'); });
  chip.addEventListener('mouseup',    function() { chip.classList.remove('is-pressing'); });
  chip.addEventListener('mouseleave', function() { chip.classList.remove('is-pressing'); });
});
```

**`mouseleave` cleanup is mandatory** — without it, the chip stays stuck in pressed state if the cursor moves away while the button is held.

**Confirmed mistake (2026-06-04):** CSS pressed state was added to `.sc-subject-chip:active, .sc-subject-chip.is-pressing` but the JS handlers were never written. The pressed visual never appeared. Fix: add all three listeners before considering the component complete. See also CLAUDE.md Rule 83.

---

### Updated mandatory pre-flight (post Session 13 — scoreCard)

**ALWAYS before starting any design work, making any change, or making any decision — refer to DS and syakila.design.md first. No exceptions.**

```
□ 0a. Read design-md/syakila.design.md   → ALL rules 1–91, confirmed specs, known mistakes
□ 0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth — NOT memory, NOT prior notes
□ 0c. Verify file location               → Syakila files ONLY in syakila.test.git/ (Rule 78)
□ 0d. Verify ALL <img src=> paths        → ls/Get-ChildItem each referenced folder (Rules 84–85)
□ 0e. get_design_context on COMPONENT SET → list ALL variant names
□ 0f. get_design_context on EACH state   → extract every token BEFORE writing CSS
□ 0g. use_figma raw node inspection      → padding, strokeAlign, width, height, r
□ 0h. get_variable_defs on sub-nodes     → confirm Semantic tokens
□ 0i. For SVG graphs: remove preserveAspectRatio="none" if viewBox is dynamic (Rule 88)
□ 0j. For chart/graph elements: fetch DS node, confirm line color + dot fill before any CSS (Rule 89)
□ 0k. For button/chip states: fetch DS node, confirm padding + all state colors before any CSS (Rule 90)
□ 0l. For every interactive element: add JS is-pressing handlers in same loop as click (Rule 91)
□ 0m. After any fix — grep both HTML files for same class and sync (Rule 63)
□ 0n. For subject colors: use --subjects-*-{tier} tokens (Rule 87), never hex math
```

---

### 92. Videos View page — confirmed structure (Session 14 — 2026-06-04)

**File:** `syakila.test.git/videos.view.html` (4830 lines)
**DS node:** `3695:58993` ("Videos - Selections" frame in `TLVKe3bgJTdVvuPAzgDq2f`)
**Assembly base:** `quickNotes.view.html` (nav shell, shared CSS, footer, scripts) — same as all Syakila pages

#### Section structure (Rule 10 compliance)

| Section ID | DS node | Content |
|---|---|---|
| `VideosView-Viewport` | `3695:58993` | Outer flex wrapper — `display:flex; flex-direction:column; gap:var(--spacing-space-m); background:transparent; box-shadow:none; border-radius:0; flex:1; min-height:0` |
| `Breadcrumb-Desktop` | `3695:58997` | Breadcrumb - 1.5 — "Videos" title + sep + links (Learn → Videos → All videos for Form 4) |
| `Videos-View-Desktop` | `3695:58998` | Videos Card - 1.5 — qn-card with header + qn-table |

#### Videos Card structure

- Outer: `.qn-card` — same class as Quick Notes card (green border, `#e8fbe8` subtle bg, 24px radius)
- Subject theming via inline CSS vars: `--qn-subj-default`, `--qn-subj-focus`, etc. on the `.qn-card` element
- Header: `.qn-card__header` (110px, subject bg, 18px radius, `overflow:hidden`) — fano SVG + subject icon (60×60) + label col
- Table: `.qn-table` inside `.qn-card__content` — heading row + body rows

#### Table body row structure (per video item)

```
.qn-table__body-row (align-items: stretch)
├── .vd-table__thumbnail-cell  (148px wide, 100px height, thumbnail placeholder)
├── .qn-table__topic-cell      (flex:1, min-height:100px, topic text)
└── .qn-table__btn-cell        (117px wide, min-height:100px)
    └── .qn-table__btn-inner   (centered)
        └── <button class="btn-learn"> (Primary/M, 32px, green)
```

#### `btn-learn` — Button - 1.5 Primary/M

- Class: `btn-learn` (32px height, green bg `#00cc85`, border `#00a36a`, pill `60px` radius)
- Arrow circle: 20px, `#99ebce` fill, 2px padding → 16×16 clip → `ic-chevron-btn-m` symbol
- JS: `mousedown`/`mouseup`/`mouseleave` is-pressing handlers (Rule 91)
- NO CSS transitions (Rule 82)

#### Asset folders

- **Shared assets (from parent folder):** `../src/image-repo/Learn/videos/` — fano-wireframe.svg, icons/border-bmelayu.svg
- **View-specific assets:** `src/image-repo/Learn/videos/view/` (created, empty — for future view-specific images)

#### Breadcrumb CSS (DS node 3695:58997)

Same pattern as Quick Notes breadcrumb — `.pd-breadcrumbs15`, `.pd-link15`, `.pd-breadcrumbs__sep`, `.pd-breadcrumbs__chevron`.
- Title: 24px/500/lh:36, `var(--text-tertiary-default)` (#00564c)
- Sep: 1px vertical bar, `var(--border-general-default)` (#d9d9d9)
- Links: 14px/400/lh:20, `var(--text-primary-default)` (#00cc85); current = `var(--text-default-body)` (#666)

---

---

### Rule 93. Wrapper card with multiple sub-cards — no border/radius on the wrapper

When a container wraps two or more visually distinct sub-cards (e.g. a video player card + a content-info card), the **wrapper** must be a plain flex column with `gap` only. Never add `border`, `border-radius`, or `overflow: hidden` to the wrapper — each child card carries its own border and radius.

```css
/* Wrong — outer border conflicts with child borders */
.vd-card-body { border: 1px solid; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; }

/* Correct — wrapper is just a gap container */
.vd-card-body { display: flex; flex-direction: column; gap: var(--spacing-space-m); width: 100%; }
```

**Confirmed instance (2026-06-04):** `.vd-card-body` in `videos.view.html` wraps `.vd-player` + `.vd-content-wrap`. Each has its own `border + border-radius`. The wrapper had a redundant outer border that was removed.

---

### Rule 94. Transparent flex items inside a colored card — always explicitly set background on each child

When a card has a non-white background (e.g. `--surface-secondary-default-subtle` = `#e8fbe8`), any flex child without an explicit `background:` will show that card color, not white. Never assume a child will appear white — always explicitly declare `background: var(--surface-general-default)` on each child that should be white.

**Confirmed instance (2026-06-04):** `.vd-meta-pills` (pills row in the meta table) was transparent — the green from `.vd-meta-card` bled through. Fix: `background: var(--surface-general-default)` added directly to `.vd-meta-pills`.

**Rule:** In any DS table or card with colored rows, check every row/cell div. If the DS shows `bg: white` on that element, declare it explicitly in CSS. Do not rely on inheritance from the browser default.

---

### Rule 95. L-Arrow vs R-Arrow — different outer sizes (confirmed DS 2026-06-04)

Button - 1.5 Secondary has two arrow variants. They have different outer sizes:

| Arrow | Outer size | Padding | Clip |
|---|---|---|---|
| R-Arrow (`showRArrow: true`) | 20×20px | 2px | 16×16 |
| L-Arrow (`showLArrow: true`) | 18×18px | 1px | 16×16 |

**Always verify which arrow the button uses before setting CSS.** Do not default both to 20×20/2px.

```css
/* R-Arrow (e.g. "View all videos") */
.btn__arrow--r { width: 20px; height: 20px; padding: 2px; }

/* L-Arrow (e.g. "Back to List") */
.btn__arrow--l { width: 18px; height: 18px; padding: 1px; }
```

Both arrows: `background: white`, `box-shadow: inset 0 0 0 1px var(--border-primary-default)`, `border-radius: 60px` (Rule 60 — strokeAlign: INSIDE).

**Confirmed from DS node `4506:116387` (Back to List, Secondary/M L-Arrow), 2026-06-04.**

---

### Rule 96. Truncating text vs wrapping text — never assume; follow product intent

Do not apply `white-space: nowrap` + `text-overflow: ellipsis` + fixed `height` by default for card titles. Always ask: does the DS truncate or wrap?

- **Truncate** (DS shows fixed height, `overflow: hidden`, single line): keep `white-space: nowrap; text-overflow: ellipsis; height: Npx; overflow: hidden`
- **Wrap** (DS shows `[word-break:break-word]` or multi-line text): remove all truncation properties; use `line-height` for readable wrapped lines

**Confirmed instance (2026-06-04):** Related video titles in `videos.view.html` were incorrectly truncated. DS shows `[word-break:break-word]` — titles should wrap. Fixed: removed `white-space: nowrap`, `text-overflow: ellipsis`, fixed `height: 24px`; set `line-height: 18px`.

---

### Rule 97. Thumbnail in variable-height rows — use `min-height`, never fixed `height`

When a row uses `align-items: stretch` and the row height can grow (e.g. due to wrapping text in the adjacent column), a thumbnail with `height: Npx` will NOT stretch — it stays at Npx and leaves a white gap below it inside the row.

**Fix:** Use `min-height: Npx` on the thumbnail instead of `height: Npx`. With `align-items: stretch` on the row, the thumbnail stretches to fill the full row height. A `position: absolute; inset: 0` background element (checkerboard or image) inside the thumbnail fills it completely.

```css
/* Wrong — leaves white gap when adjacent text wraps */
.vd-related-thumb { height: 104px; }

/* Correct — thumbnail fills the row regardless of text height */
.vd-related-row   { display: flex; align-items: stretch; }
.vd-related-thumb { min-height: 104px; flex-shrink: 0; position: relative; overflow: hidden; }
```

**Confirmed instance (2026-06-04):** `videos.view.html` related video thumbnails left white gaps below when titles wrapped to two lines.

---

### Rule 98. YouTube iframe embed — always use `aspect-ratio: 16/9` on the player container, never a fixed height

A fixed `height` (e.g. 460px) on the player container causes letterboxing because the container's aspect ratio doesn't match YouTube's 16:9 output. The iframe fills the container's dimensions but YouTube's player renders with black bars to maintain its internal ratio.

**Correct pattern:**
```css
.vd-player {
  position: relative; overflow: hidden;
  width: 100%; aspect-ratio: 16 / 9;
  border-radius: 18px;
}
.vd-player__iframe {
  position: absolute; inset: 0; width: 100%; height: 100%; border: 0;
}
```

This makes the container always exactly 16:9 regardless of its width, and the iframe fills it edge-to-edge with no black bars or letterboxing.

**Applies to:** Any video embed (YouTube, Vimeo, etc.) inside a card. Responsive: `height: auto` + `aspect-ratio: 16/9` at mobile breakpoint overrides any fixed height set for desktop.

**Confirmed (2026-06-04):** `videos.view.html` player changed from `height: 460px` → `aspect-ratio: 16/9`. Mobile override also changed from `height: 220px` → `aspect-ratio: 16/9; height: auto`.

---

### Rule 99. Always re-fetch DS node when user points to a different Figma URL

If the user shares a Figma URL that differs from the node used in the current implementation, treat it as a correction. Stop all implementation work, re-fetch `get_design_context` on the new node, and re-audit the full component anatomy before touching any code.

**Never carry forward the old implementation's structure** — the DS design may be completely different (different layout, different component variants, different token bindings).

**Confirmed instance (2026-06-04):** `videos.view.html` was originally built from node `3695:58993` (Videos - Selections, a list view). User pointed to `4506:116366` (Videos - View, a two-column player layout) — a completely different page with different structure. Required full CSS and HTML replacement.

---

### Rule 100. Experiments selections page — DS node `5171:140878`, confirmed 2026-06-05

**File:** `syakila.test.git/experiments.selections.html`
**DS node:** `5171:140878` — "All experiments for Form 4" view (Learn > Experiments > Form 4)
**Asset path:** `../src/image-repo/Learn/experiments/` (shared icons + fano-wireframe)

> **Corrected 2026-06-05:** Original implementation used node `5171:140808` (3 subject cards, icon-only pill button). Correct node is `5171:140878` — 1 card (RBT), heading row + data rows, "Simulate" button (Primary/M with label).

#### Breadcrumb — DS node `5171:140899` — 3 levels

- Page title: `"Experiments"` — `Header/H3` (24px Medium), `var(--text-tertiary-default)` (#00564c)
- Separator: 1px vertical line
- Links (left to right):
  1. **"Learn"** — green (`var(--text-primary-default)`), book icon, chevron-right after — clickable
  2. **"Experiments"** — green, no icon, chevron-right after — clickable
  3. **"All experiments for Form 4"** — grey (`var(--text-default-body)`), no trailing chevron — current page (not a button)

#### Component anatomy — 1 Quick Notes Card - 1.5 (RBT)

**Card outer** — `qn-card` class, inline CSS variables:
```html
<div class="qn-card" style="--qn-subj-default:#353535; --qn-subj-focus:#202020; --qn-subj-default-subtle:#e6f1fa; --qn-subj-50:#ebebeb;">
```

| Variable | Value | Usage |
|---|---|---|
| `--qn-subj-default` | `#353535` | Card header bg |
| `--qn-subj-focus` | `#202020` | Card header border |
| `--qn-subj-default-subtle` | `#e6f1fa` | `qn-card__label` border-left color |
| `--qn-subj-50` | `#ebebeb` | Heading row tinted bg (`subject/rbt/50`) |

**Card header** — same structure as quickNotes cards (icon-col + header-content + label). Card title text is **"Topics"** (not the subject name) — from DS node.

**qn-card__content** — the inner white box:
```css
.qn-card__content {
  background: var(--surface-general-default);
  border: 1px solid var(--border-general-default); /* #d9d9d9 */
  border-radius: var(--corner-radius-corner-xl);   /* 16px */
  overflow: hidden;
}
```

#### `exp-table` — confirmed DS spec (node `5171:140918`)

Two row types: **heading row** (chapter group name) + **data rows** (thumb | topic | button).

**Heading row** — spans full width, tinted bg:
```css
.exp-table__heading-cell {
  flex: 1 0 0; height: 56px; min-height: 56px;
  background: var(--qn-subj-50, #ebebeb);   /* subject/rbt/50 */
  border-bottom: 1px solid var(--border-general-default);
}
.exp-table__heading-text { font-size: 16px; font-weight: 500; line-height: 24px; color: var(--text-default-body); }
```

**Data rows** — confirmed DS column widths:

| Cell | Width | Notes |
|---|---|---|
| Thumbnail | 148px | Height 100px fixed; checkerboard placeholder div |
| Topic name | flex-1 | 14px Regular `#666`; `border-right: 1px` separator |
| Button cell | 131px | Centers `.btn-simulate` |

Last data row removes `border-bottom` via `:last-child` selector.

#### `btn-simulate` — Button - 1.5 Primary/M (DS node `I5171:140918;...;2251:40188`)

Label text: **"Simulate"** — 12px SemiBold, `var(--text-primary-on-color)` (#ffffff).  
Arrow: `#99ebce` bg circle (`var(--surface-primary-default-subtle-hover, #99ebce)`), 16×16 clip, `M6 12L10 8L6 4` chevron.

```css
.btn-simulate { height: 32px; padding: 2px 8px; background: var(--surface-primary-default); border: 1px solid var(--border-primary-focus); border-radius: 60px; }
```

No CSS `transition` (Rule 82). JS `is-pressing` required (Rule 83).

**Hover:** bg `#b5f291`, border `#70bc6f`, text `#70bc6f`, arrow bg `#e8fbe8`  
**Pressed:** bg `#00564c`, border `#00453d`, text `#00cc85`, arrow bg `#00cc85`

---

### Rule 101. `qn-card__label` separator uses `border-left`, not `border-right`

The visual separator between the subject icon column and the text label area is a `border-left` on `.qn-card__label` — **not** a `border-right` on `.qn-card__icon-col`. This matches the DS Figma stroke placement exactly.

```css
.qn-card__label {
  border-left: 1px solid var(--qn-subj-default-subtle, #ffeded);
  padding-left: var(--spacing-space-xl);   /* 24px */
}
```

Never add `border-right` to `.qn-card__icon-col` — the DS places the stroke on the receiving element.

---

### Rule 102. New page creation from quickNotes.selections.html — PowerShell assembly pattern

When creating a new selections page based on `quickNotes.selections.html` as template:

1. Identify line ranges in `quickNotes.selections.html`:
   - Lines 1–2132: shared CSS (title on line 6 only needs updating)
   - Lines 2133–2276: page-specific CSS block (REPLACE entirely)
   - Lines 2277–3375: `</style>` + `</head>` + `<body>` + SVG defs + full navbar HTML (COPY unchanged)
   - Lines 3376–3545: previous page's viewport section (REPLACE with new viewport HTML)
   - Lines 3545+: footer + JS (COPY unchanged)

2. Build with PowerShell array slicing:
```powershell
$src = Get-Content "quickNotes.selections.html"
$out  = @()
$out += ($src[0..2131] | ForEach-Object { $_ -replace '<title>.*</title>', '<title>New Page Title</title>' })
$out += @('/* NEW PAGE CSS HERE */')
$out += $src[2276..3374]
$out += @('<section id="NewViewport" ...>', '<!-- viewport HTML -->', '</section>')
$out += $src[3544..($src.Length - 1)]
$out | Set-Content "new-page.html" -Encoding UTF8
```

3. File size reference: `quickNotes.selections.html` = 5126 lines / 451KB. Output for experiments = 455KB.

---

### Updated mandatory pre-flight (post Session 16 — experiments.selections)

**ALWAYS before starting any design work, making any change, or making any decision — refer to DS and syakila.design.md first. No exceptions.**

```
□ 0a. Read design-md/syakila.design.md   → ALL rules 1–102, confirmed specs, known mistakes
□ 0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth — NOT memory, NOT prior notes
□ 0c. Verify file location               → Syakila files ONLY in syakila.test.git/ (Rule 78)
□ 0d. Verify ALL <img src=> paths        → ls/Get-ChildItem each referenced folder (Rules 84–85)
□ 0e. get_design_context on COMPONENT SET → list ALL variant names
□ 0f. get_design_context on EACH state   → extract every token BEFORE writing CSS
□ 0g. use_figma raw node inspection      → padding, strokeAlign, width, height, radius
□ 0h. get_variable_defs on sub-nodes     → confirm Semantic tokens
□ 0i. For SVG graphs: remove preserveAspectRatio="none" if viewBox is dynamic (Rule 88)
□ 0j. For chart/graph elements: fetch DS node, confirm line color + dot fill before any CSS (Rule 89)
□ 0k. For button/chip states: fetch DS node, confirm padding + all state colors before any CSS (Rule 90)
□ 0l. For every interactive element: add JS is-pressing handlers in same loop as click (Rule 91)
□ 0m. After any fix — grep both HTML files for same class and sync (Rule 63)
□ 0n. For subject colors: use --subjects-*-{tier} tokens (Rule 87), never hex math
□ 0o. For new page creation: use quickNotes.selections.html as base template (Rule 102)
□ 0p. For table rows with thumbnails: use min-height (not fixed height) + align-items:stretch (Rule 97)
□ 0q. For video embeds: use aspect-ratio:16/9 on container, not fixed height (Rule 98)
□ 0r. For wrapper containers with multiple sub-cards: no border/radius on wrapper, gap only (Rule 93)
□ 0s. For colored cards: explicitly set background on every child that should be white (Rule 94)
□ 0t. If user points to a different Figma URL: re-fetch DS node before any code changes (Rule 99)
□ 0u. For exp-table / qn-card__label separator: border-left on label, never border-right on icon-col (Rule 101)
□ 0v. For btn-nav-pill: chevron-only, no text label, no transition, add JS is-pressing (Rules 82, 100)
```

---

---

## Session 16 — Practice Card - 1.5 DS update (2026-06-05)

### 103. Practice Card - 1.5 — DS update 2026-06-04: inner content structure

**Source:** `get_design_context` on DS node `2339:4823`, COMPONENT_SET updated 2026-06-04.

> ⚠️ **CORRECTED 2026-06-05** — Original Rule 103 incorrectly documented a Pill Badge and 3 stats. User confirmed: **no pill badge**, **1 stat only** (`Outline/user` + grade label). See Rule 104 for the final confirmed implementation.

#### What actually changed (confirmed correct)

1. **No pill badge** — the pill badge element does NOT appear in the prototype. Remove any `.practice-card__badge` / `.practice-card__pill` HTML and CSS.

2. **Content outer frame** — `padding: 16px 16px 16px 0` (DS: `pl:0, pr:16, py:16`). Left padding removed; inner div handles the gap.

3. **Inner content div** — `border-left: 1px solid rgba(255,255,255,0.25)` + `padding-left: 24px`. Visible divider between image and text.

4. **On hover** — inner border dims to `rgba(255,255,255,0.15)`.

5. **1 stat only** — `Outline/user` (`ic-user`) icon + grade label. See Rule 104 for single-grade-per-card pattern.

#### Confirmed CSS

```css
.practice-card__content {
  flex: 1; min-width: 0;
  padding: 16px 16px 16px 0;
  display: flex; flex-direction: column; justify-content: center; gap: 0;
}
.practice-card__inner {
  display: flex; flex-direction: column; gap: 4px; width: 100%;
  border-left: 1px solid rgba(255,255,255,0.25);
  padding-left: 24px;
}
.practice-card:hover .practice-card__inner { border-left-color: rgba(255,255,255,0.15); }
```

**Mistake made (initial implementation):** Read DS React component props (`showBadge`, `showInfo1/2/3`) and assumed all were active → added pill badge + 3 stats. User corrected: badge is absent, only 1 stat. Always confirm visible/hidden state from `get_design_context` on the actual DS variant, not from prop names.

---

### 104. Practice Card — 1 card per grade, single stat pattern (confirmed 2026-06-05)

**Context:** Each Practice Card represents one subject at one grade level. A subject available in multiple grades (e.g., Bahasa Melayu in Year 1–6 + Form 1–5) produces one card per grade, not one card with a range label.

#### Card rendering rule

```
practiceSubjects → for each subject → for each grade → one card
```

- `data-grade` = single grade value (e.g., `"form-4"`, `"year-1"`)
- Stat label = formatted single grade: `"Year 1"`, `"Form 4"` — never a range like `"Year 1-6 Form 1-5"`
- Filter matching = simple `indexOf(card.dataset.grade)` — no `split(' ')`, no `.some()`
- Search checks `.practice-card__stat-label` (the grade label text)

#### `gradeLabel(grade)` — single grade formatter

```js
function gradeLabel(grade) {
  if (grade.indexOf('year-') === 0) return 'Year ' + grade.slice(5);
  if (grade.indexOf('form-') === 0) return 'Form ' + grade.slice(5);
  return grade;
}
```

#### `renderPracticeCards()` — one card per grade

```js
function renderPracticeCards() {
  var container = document.querySelector('.practice-cards-content');
  if (!container) return;
  container.innerHTML = '';
  practiceSubjects.forEach(function(s) {
    s.grades.forEach(function(g) {
      container.appendChild(buildCard({ subject:s.subject, title:s.title, img:s.img, style:s.style, grade:g }));
    });
  });
}
```

#### `buildCard(d)` — `d.grade` is a single string

```js
function buildCard(d) {
  var art = document.createElement('article');
  art.className = 'practice-card';
  art.setAttribute('role', 'listitem');
  art.setAttribute('data-grade', d.grade);        // single value, e.g. "form-4"
  art.setAttribute('data-subject', d.subject);
  art.setAttribute('style', d.style);
  art.innerHTML =
    '<div class="practice-card__circles" aria-hidden="true">…</div>' +
    '<div class="practice-card__image"><div class="practice-card__icon-wrap">' +
      '<img src="' + IMG_BASE + d.img + '" alt="" width="100" height="100" class="practice-card__icon-img">' +
    '</div></div>' +
    '<div class="practice-card__content"><div class="practice-card__inner">' +
      '<h3 class="practice-card__title">' + d.title + '</h3>' +
      '<div class="practice-card__stats"><div class="practice-card__stat">' +
        '<span class="practice-card__stat-icon"><svg aria-hidden="true"><use href="#ic-user"/></svg></span>' +
        '<span class="practice-card__stat-label">' + gradeLabel(d.grade) + '</span>' +
      '</div></div>' +
    '</div></div>';
  return art;
}
```

#### `applyFilters()` — grade matching (simple single-value)

```js
var gradeMatch = noGradeFilter || grades.indexOf(card.dataset.grade) !== -1;
```

#### Mistake history

| Wrong | Correct |
|---|---|
| 1 card per subject with range label "Year 1-6 Form 1-5" | 1 card per grade — "Year 1", "Form 4" |
| `data-grade` space-separated for multi-grade matching | `data-grade` = single grade, simple `indexOf` |
| Search on `.practice-card__pill-text` | Search on `.practice-card__stat-label` |
| `gradeRangeLabel(grades[])` range formatter | `gradeLabel(grade)` single grade formatter |

---

### Mandatory pre-flight — BEFORE every session, change, or decision (Syakila pages)

> **Always before starting any design, making any changes, or making any decisions — refer to DS (`TLVKe3bgJTdVvuPAzgDq2f`) AND `design-md/syakila.design.md` first. No exceptions.**

```
□ Read syakila.design.md        → ALL rules top-to-bottom
□ Open DS: TLVKe3bgJTdVvuPAzgDq2f → re-verify every token value live (never trust memory)
□ get_design_context on COMPONENT_SET → list ALL variants before writing any CSS or HTML
□ get_design_context on EACH state → extract tokens BEFORE writing any state CSS
□ use_figma raw inspection → confirm padding, strokeAlign, visible, width, height
□ Check `visible` on every child node → visible:false = no HTML, no CSS (Rule 41)
□ For icons: confirm viewBox + path translation (Rule 27) before writing any symbol
□ Post-implementation: grep BOTH html files and sync any shared-component fixes
□ All files in syakila.test.git/ only — NEVER create Syakila files in zul.test.git/ (Rule 78)
□ Sync from zul.page.template.html FIRST if shared components (navbar, footer, tokens) changed (Rule 61)
```

---

*Last updated: 2026-06-05 (Session 17 — Rule 103 corrected: no pill badge; Rule 104 added: 1-card-per-grade pattern + single stat; mandatory pre-flight added)*
