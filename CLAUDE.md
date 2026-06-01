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
- Secondary button Pressed state was incorrectly noted as "fills solid with Surface/primary/default", then mis-corrected to dark teal `#00564c`. **Re-verified live DS 2026-05-31 via `get_design_context` on node `538:1907`:** bg `#00a36a` (`Surface/primary/focus`), border `#00cc85` (`Border/primary/default`), text `#00cc85` (`Text/primary/default`) — same palette as Primary Pressed.
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
| Default | `#00cc85` | `#00a36a` | `#e1f9ea` | `#99ebce` | `#00a36a` | `1437:8154` |
| Hover | `#b5f291` | `#70bc6f` | `#70bc6f` | `#e8fbe8` | `#70bc6f` | `1437:8146` |
| Pressed | `#00a36a` | `#00cc85` | `#00cc85` | `#00cc85` | `#00a36a` | `1437:8138` |
| Active | `#00cc85` | `#00a36a` | `#e1f9ea` | `#99ebce` | `#00a36a` | `3029:19941` |
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

**CSS pattern for Secondary/M R Arrow (DS node `538:1929` — 20×20, 1px stroke, 2px padding):**

> ⚠️ Updated 2026-05-31: the **R Arrow** (default, `showRArrow: true`) is 20×20 with 2px padding. The L Arrow (`showLArrow: false`, hidden by default) is 18×18 with 1px padding. Prior docs used the L Arrow spec — incorrect for the visible arrow.

```css
/* R Arrow (default visible arrow) — Secondary/M */
.arrow {
  width:      16px;          /* content width */
  height:     16px;          /* content height */
  padding:    2px;           /* +2 each side = 20px total */
  box-shadow: inset 0 0 0 1px var(--border-primary-default);  /* Figma stroke, INSIDE */
  /* NO border — border consumes box-model space and shrinks content */
}
```

**Confirmed mistake:** Secondary/M button arrow used `border: 1px solid; padding: 1px; box-sizing: border-box; width: 18px` → 14px content area. The 16px clip overflowed. Corrected to `box-shadow: inset`, `width: 16px; padding: 2px` → 20px total, 16px content.

**Applies whenever:** a DS node has both a stroke AND padding, and you need the content area to be exactly `frame_size − 2×padding`.

---

### 31. Button - 1.5 confirmed DS specs (Student Type)

All specs from `get_design_context` live audit (2026-05-31, COMPONENT_SET `473:529`).

#### Sizing, padding, and text — all variants follow size, not variant

| Property | Size S | Size M | Size L |
|---|---|---|---|
| Height | 24px | 32px | 40px |
| Outer padding | `2px 4px` (py:2 px:4) | `2px 8px` (py:2 px:8) | `8px 12px` (py:8 px:12) |
| Border-radius | 60px pill | 60px pill | 60px pill |
| **Text** | **12px SemiBold** lh:18 | **12px SemiBold** lh:18 | **14px SemiBold** lh:20 |
| Text slot px | 4px | 4px | 8px |
| Leading icon clip | 16×16 | 16×16 | 24×24 |

> Size S and M share 12px/lh:18. **Size L uses 14px/lh:20** — do NOT assume 12px for L.

#### Arrow — structure differs by Variant, size within Variant follows the same pattern

| Property | Primary (S/M/L) | Secondary (S/M/L) | Tertiary (S/M/L) |
|---|---|---|---|
| Arrow structure | **filled circle** | **outlined circle** | **bare chevron — no circle** |
| Arrow fill | `#99ebce` | white | N/A |
| Arrow stroke | none | 1px `#00cc85` → `box-shadow:inset` | N/A |
| Arrow circle (S) | 16px (p:2px → 12×12 clip) | 16px (p:2px → 12×12 clip) | — |
| Arrow circle (M) | 20px (p:2px → 16×16 clip) | 20px (p:2px → 16×16 clip) | — |
| Arrow circle (L) | 24px (p:4px → 16×16 clip) | 24px (p:4px → 16×16 clip) | — |
| Arrow clip (S) | 12×12 | 12×12 | 12×12 (bare) |
| Arrow clip (M/L) | 16×16 | 16×16 | 16×16 (bare) |

**Tertiary has NO arrow circle.** The chevron sits bare in the content row — no bg, no border, no padding wrapper. See Rule 82 (no-transition), Rule 83 (is-pressing JS), and Rule 202 (Tertiary bare chevron, in zul.design.md).

#### DS reference nodes (Student, Default state)

| Variant / Size | DS node |
|---|---|
| Primary/S | `1437:8154` |
| Primary/M | `479:344` |
| Primary/L | `473:528` |
| Secondary/M | `538:1923` |
| Secondary/L | `538:1891` |
| Tertiary/M | `538:2099` |
| Tertiary/L | `538:2067` |

**Corrections applied (2026-05-31 live audit):**
1. **Secondary/M arrow was 18×18/1px** — that was the L Arrow (`showLArrow: false`, hidden). R Arrow (`showRArrow: true`) = **20×20/2px**, same as Primary/M.
2. **"All sizes share 12px SemiBold"** — wrong. **Size L = 14px SemiBold** (Body/B1 lh:20). S/M = 12px (Body/B5 lh:18).
3. **Primary/S outer padding was `2px 8px`** — wrong. Correct: **`2px 4px`** (`Spacing/space-xxs`).
4. **Leading icon clip size changes with size** — L=24×24, M/S=16×16.

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

### 40. Button - 1.5 Pressed palette — PRIMARY and SECONDARY share the same Pressed palette (UPDATED 2026-05-31)

**Source of truth: live DS `get_design_context` 2026-05-31 on node `538:1907`. Supersedes all prior contradictions.**

| Variant | Pressed bg | bg token | Pressed border | border token | Label |
|---|---|---|---|---|---|
| **Primary** (S/M/L) | `#00a36a` | `Surface/primary/focus` | `#00cc85` | `Border/primary/default` | `#00cc85` |
| **Secondary** (S/M/L) | `#00a36a` | `Surface/primary/focus` | `#00cc85` | `Border/primary/default` | `#00cc85` |
| **Tertiary** (S/M/L) | `#00564c` | `Surface/tertiary/default` | `#00453d` | `Border/tertiary/focus` | `#00cc85` |

**Label token all variants:** `Text/primary/default` = `#00cc85`

**Key DS nodes:**
- Primary/L Pressed: `473:650` (bg `#00a36a`, border `#00cc85`)
- Secondary/M Pressed: `538:1907` (bg `#00a36a`, border `#00cc85`) — re-verified 2026-05-31 via `get_design_context`
- Tertiary/L Pressed: `3029:20022` (bg `#00564c`, border `#00453d`)

**Mistake made:** Prior rules documented Secondary Pressed as `#00564c` (tertiary) — wrong. Live DS 2026-05-31 confirms Secondary uses the same `#00a36a` (primary/focus) palette as Primary. Only Tertiary uses the darker teal. Always re-verify live DS before implementing — DS token values change between sessions (Rule 61).

**See also:** Rule 82 (no transitions), Rule 83 (is-pressing JS), zul.design.md Rule 200 (three non-negotiables).

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
0a. Read design-md/zul.design.md  → ALL rules 1–160, confirmed specs, known mistakes — NO EXCEPTIONS
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
6.  Validate             → re-run get_design_context / use_figma on the node; get_screenshot for QA only (Rule 193)
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
1. get_design_context   → structured component data: variants, layout, token bindings (REQUIRED)
2. get_variable_defs    → extract exact Semantic variable names per fill/stroke/spacing (REQUIRED)
3. use_figma            → raw node inspection: padding, strokeAlign, width, height, children (REQUIRED)
4. Implement using local token system — zero hardcoded values, zero approximations
5. get_screenshot       → post-implementation QA ONLY — NEVER for spec extraction (Rule 193)
```

> **Rule 193 — screenshots are PROHIBITED for spec extraction.** Never use get_screenshot to determine colors, spacing, radius, or any design value. Use get_design_context + use_figma + get_variable_defs for all spec data (1:1 Dev Mode equivalent).

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

**Mobile overrides (confirmed 2026-05-28, Rules 180–181):**
```css
@media (max-width: 767px) {
  .static-cards-row .static-card                        { flex-basis: 100%; height: auto; min-height: 160px; }
  .static-cards-row .static-card .static-card__content { height: auto; }
  .static-card__img-col                                 { padding: 16px 0 16px 16px; }
  .static-card__illustration                            { max-height: 100px; flex: none; }
}
```
- `min-height: 160px` — floor so cards never shrink too short (Rule 180)
- `max-height: 100px; flex: none` on illustration — prevents stretch when card is taller than desktop 220px (Rule 181). `object-fit: contain` on the `<img>` prevents pixel distortion but the container itself grows too tall — cap the container.

**Mistake made (static card):**
- Content was `position: absolute; inset: 0` — should be `flex: 1 0 0; height: 100%; position: relative`
- Used `<img src="...">` for bg placeholder — showed broken icon. Use `<div>` + CSS `background-image`
- Content padding was `20px 24px` — actual DS is `20px 60px`
- Arrow chevron color was inferred from parent button node (wrong: `#f6fdfb`) — must get from arrow sub-node (`#00a36a`)
- Illustration stretched on mobile — missing `max-height: 100px; flex: none` override (2026-05-28)

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

**Primary Card - 1.5 / Secondary Card variant (node 2881:36272) — confirmed 2026-05-29:**
- Outer card: `border: 1px solid Border/default (#00cc85)`, `border-radius: Corner-4XL (24px)` (`Corner Radius/Corner-4XL`, Product → `Radius/4xl`, Semantic), `background: Surface/secondary/default-subtle (#e8fbe8)`, padding `16px`, gap `8px` (flex col)
- Content Placeholder (node 2881:36281): `background: Surface/general/default (white)`, `border: 1px solid Border/primary/focus (#00a36a)` (`strokeAlign: INSIDE` → use `box-shadow: inset`), **`border-radius: Radius/3xl = 18px`** (`Corner-2XL`, Product → `var(--corner-radius-corner-2xl)`)
- Content area (`.primary-card__content`): `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-space-m)`
- Section header: bookmark icon + title (Title/T2, 18px SemiBold, `Text/tertiary/default #00564c`) + Button - 1.5 (Secondary/M) with `ic-chevron-btn-m`

**Mistake made:** Inner card radius was `--radius-xl` (8px = `Radius/xl`). DS `get_design_context` on node `2881:36281` confirms `Radius/3xl = 18px`. `--radius-xl = 8px` is the Nav Button - 1.5 radius, not the Primary Card content area.

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

**Indicator dot (Indicator Badge - 1.5) — confirmed 2026-05-26:**
- `8×8px`, `#00cc85` fill, `strokeAlign: OUTSIDE`, 1px white stroke
- CSS: `box-shadow: 0 0 0 1px var(--border-on-color)` — no `inset` (Rule 60)

**CTA button — confirmed 2026-05-26:**
- DS Button - 1.5: `height: 40px` — use `height:` not `max-height:` for DS fixed-height buttons.

---

### 55. ~~Coloured brand/store icons → 2× PNG~~ — SUPERSEDED by Rule 57

This rule was wrong. Multi-color brand icons CAN be SVG symbols using hardcoded fills.
**Use Rule 57 instead.** See `design-md/zul.design.md` Rule 111 for the corrected approach.

---

### Mandatory workflow — BEFORE every session and every change

**Step 0 (mandatory):** Read `design-md/zul.design.md` AND refer to live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any change, or making any decision — including seemingly trivial fixes. No exceptions.

```
0a. Read design-md/zul.design.md  → ALL rules 1–160, confirmed specs, known mistakes — NO EXCEPTIONS
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
6.  Validate             → re-run get_design_context / use_figma on the node; get_screenshot for QA only (Rule 193)
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

### Mandatory workflow — BEFORE every session, every change, every decision (updated 2026-05-29)

> **"Always before starting any design, making any changes, or making any decisions — refer to DS and zul.design.md first."**

**Step 0 (mandatory, no exceptions):** Read `design-md/zul.design.md` AND open live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any change, or making any decision — including seemingly trivial fixes. Every mistake in this project is traceable to skipping this step.

```
□ 0a. Read design-md/zul.design.md       → ALL rules 1–192+, confirmed specs, known mistakes
□ 0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth — NOT memory, NOT docs, NOT prior notes
□ 0c. get_design_context on COMPONENT SET → list ALL variant names before touching any CSS
□ 0d. get_design_context on EACH state   → extract every token BEFORE writing any CSS
□ 0e. use_figma raw inspection           → confirm exact: padding, strokeAlign, width, height, radius
□ 0f. get_variable_defs on sub-nodes     → confirm Semantic token per fill/stroke/spacing
□ 0g. Cross-check CSS var against :root  → never guess px from token name (see Rule 191 corner radius trap)
□ 0h. exportAsync SVG_STRING for icons   → check size before PNG vs symbol decision
□ 0i. Post-implementation QA — get_screenshot ONLY after coding is done; NEVER for spec extraction (Rule 193)
      Any discrepancy found → go back to steps 0c–0g (node data), not the screenshot
□ 0j. After any fix — grep for same class in BOTH html files and sync (Rule 184)
```

**Never carry forward a radius, color, or spacing value from a prior session without re-verifying live in DS.** Values change. Use memory as context, not as ground truth.

**See zul.design.md Rule 192 for the full pre-flight checklist.**

---

### 59. Nav Button - 1.5 — full confirmed spec (COMPONENT_SET 3908:6148)

**44×44px square icon button. Radius/xl = 8px. 4 states — all from COMPONENT_SET `3908:6148`, never from standalone named components.**

| State | bg | bg hex | border | border hex | icon | icon hex |
|---|---|---|---|---|---|---|
| Default | `Surface/general/default` | `#ffffff` | none | — | `Icon/default/default` | `#808080` |
| Hover | `Surface/secondary/default-subtle` | `#e8fbe8` | `Border/primary/default` | `#00cc85` | `Icon/primary/default` | `#00cc85` |
| Pressed | `Surface/primary/focus` | `#00a36a` | `Border/primary/default` | `#00cc85` | `Icon/primary/default` | `#00cc85` |
| Active | `Surface/primary/default` | `#00cc85` | `Border/primary/focus` | `#00a36a` | `Icon/primary/on-color` | `#e1f9ea` |

**Active state = plain rounded square. No speech-bubble tail. No `nav-btn-union-bg`.**

**`--icon-primary-on-color` = `#e1f9ea`** — NOT `#f6fdfb` (that is `Text/primary/on-color`, a different token).

**Supersedes Rule 52 item 1 and Rule 99.** Both were based on standalone node `3908:6163` (a VECTOR artifact), not the COMPONENT_SET.

**Root lesson:** A standalone component named `ComponentName/Active` is NOT equivalent to `State=Active` inside the COMPONENT_SET. Always use the COMPONENT_SET as the canonical source.

---

---

### 60. `strokeAlign` → CSS mapping — always verify with `use_figma` before writing any ring/border

**Non-negotiable. Three values, three different CSS patterns.**

| Figma `strokeAlign` | CSS | Why |
|---|---|---|
| `INSIDE` | `box-shadow: inset 0 0 0 Npx var(--token)` | Ring stays inside bounds, zero layout effect |
| `OUTSIDE` | `box-shadow: 0 0 0 Npx var(--token)` | Ring outside bounds, follows `border-radius`, zero layout effect |
| `CENTER` | `border: Npx solid var(--token)` | Half inside/outside, affects box model |

**Never use `border: 1px solid` for INSIDE strokes** — it adds pixels outside, making the element larger than DS intended.
**Never use `outline` for OUTSIDE strokes** — `outline` ignores `border-radius`, producing a square ring on circular/pill elements.

```css
/* strokeAlign: INSIDE */
box-shadow: inset 0 0 0 1px var(--token);

/* strokeAlign: OUTSIDE */
box-shadow: 0 0 0 1px var(--token);   /* NO inset */
```

**How to check:** `use_figma` → `node.strokeAlign`. Three values = three patterns. Never assume.

**Confirmed INSIDE — Secondary/M button arrow circle (2026-05-19):**
All 5 states: `w:20 h:20`, `padding:2px`, `strokeAlign: INSIDE`. State changes = only `box-shadow` color + `background`. Never change `width`, `height`, or `padding` between states unless raw DS node confirms it.

**Confirmed OUTSIDE — Number Badge - 1.5 Primary/M (`618:418`, 2026-05-26):**
`strokeAlign: OUTSIDE`, `strokeWeight: 1`, stroke = white (`Border/on-color` = `--border-on-color: #ffffff`).
CSS: `box-shadow: 0 0 0 1px var(--border-on-color)` — no `inset`.

**Confirmed OUTSIDE — Indicator Badge - 1.5 dot (Notification dropdown, 2026-05-26):**
`8×8` dot, `strokeAlign: OUTSIDE`, `strokeWeight: 1`, stroke = white (`Border/on-color`).
CSS: `box-shadow: 0 0 0 1px var(--border-on-color)` — same pattern, no `inset`.
Template previously had no border — fixed by adding the `box-shadow` rule.

**Confirmed OUTSIDE — Icon Badge - 1.5 (`3908:1491`, 2026-05-28):**
`strokeAlign: OUTSIDE`, `strokeWeight: 1`, stroke = white (`Border/on-color`). 12×12px, fill `#00a2e8` (`--surface-informative-default`), padding 2px, icon = `Outline/check` at 8×8.
CSS: `box-shadow: 0 0 0 1px var(--border-on-color)` — no `inset`. Content area = 12 − 4 = 8px. See Rule 182.
**Mistakes made:** (1) Used `border: 1px solid white` → `border-box` shrank content to 6px, icon clipped. (2) Assumed INSIDE without checking DS → had to correct to OUTSIDE after `use_figma`. Always verify strokeAlign. See Rule 183.

**`get_design_context` generated code can misreport padding.** Always verify via raw `use_figma` (`paddingTop/Right/Bottom/Left`, `strokeAlign`, `strokeWeight`, `width`, `height`).

**See also:** zul.design.md Rule 118 (INSIDE full reference), Rule 160 (OUTSIDE confirmed pattern), Rules 182–183 (Icon Badge + strokeAlign must-verify rule).

---

### Mandatory workflow — BEFORE every design action, change, or decision (updated 2026-05-21)

**Step 0 (mandatory):** Read `design-md/zul.design.md` AND refer to live DS (`TLVKe3bgJTdVvuPAzgDq2f`) before starting any design work, making any change, or making any decision. No exceptions.

```
0a. Read design-md/zul.design.md       → ALL rules 1–187, confirmed specs, known mistakes
0b. Open DS: TLVKe3bgJTdVvuPAzgDq2f   → single source of truth — NOT memory, NOT docs, NOT prior session notes
0c. get_design_context on COMPONENT SET → list ALL variant names
0d. get_design_context on EACH state   → extract every token BEFORE writing CSS
0e. get_variable_defs on sub-nodes     → confirm Semantic tokens
0f. use_figma raw node inspection      → confirm exact padding, strokeAlign, width, height
0g. exportAsync SVG_STRING for icons   → check size before PNG vs symbol decision
0h. Post-implementation QA — get_screenshot ONLY after coding is done; NEVER for spec extraction (Rule 193)
    Any discrepancy found → go back to get_design_context / use_figma / get_variable_defs
0i. For carousel/slider JS: capture pre-clone anchor BEFORE the loop (Rule 130)
0j. Re-audit tokens if last audit > 3 days ago (Rule 153) — resolve every variable ID
    to current hex BEFORE writing any CSS. Token values change without notice.
0k. After any fix to a shared component — grep zul.page.template.html for the same
    component class. If found, apply the identical fix before committing (Rule 184).
0l. For ANY element dimension (width, height, padding, gap): re-fetch get_design_context
    on the exact node. Never carry forward numbers from prior session notes — DS values change.
    size-[Npx] = verify with use_figma on INSTANCE; flex-[1_0_0] = FILL; p-[Npx] = ALL sides (Rules 185–189).
0m. For illustrations/images inside a component frame: use_figma → read parent.children[0]
    to get the INSTANCE node's width/height/maxWidth/maxHeight. Never use the master
    component dimensions or the get_design_context size class directly (Rule 188–189).
```

**Shared components (always sync both files):** navbar, profile dropdown, notification dropdown, learn/locale/download dropdowns, footer, `:root` tokens, `<svg><defs>` icon symbols.

---

### 61. DS token values can change between sessions — always re-audit before any work

See `design-md/zul.design.md` Rules 153–156 for the full audit workflow and confirmed value updates (2026-05-24):
- `Text/primary/on-color` + `Icon/primary/on-color` → `Foundation/white` = `#ffffff` (was `#e1f9ea`)
- Disabled button arrow bg → `Surface/disabled/on color` = `#e5e5e5` (was incorrectly using `Surface/disabled/primary` = `#f2f2f2`)
- Button - 1.5 now has `Type=Teacher` variants (45 new, no impact on student prototype)

**Rule:** Never trust memory or prior session notes for token hex values. Always resolve live from DS before coding.

---

### 62. Sed line-range assembly — unclosed `<!--` before `<script>` silently kills all JS

When building an HTML file by concatenating `sed -n 'X,Yp'` extractions, an HTML comment whose `<!--` opener lands at the end of one range and whose `-->` closer falls in the **gap** between ranges is never written. The browser treats the entire `<script>` block that follows as comment text — no error, no warning, CSS hover works, but ALL click handlers are silently dead.

**Confirmed instance (2026-05-26):** Footer extracted as lines `4628–4651`. Line 4651 = `<!--`. Closer at line 4652 was the gap. Script 1 (lines `4653–5347`) ran inside an unclosed comment. Every navbar button appeared interactive but no handler ever registered.

**Fix:** `sed -i 'N,Md'` to delete the orphaned opener lines. Or: extend the footer range to include the `-->` line.

**Post-assembly mandatory check:**
```bash
grep -n "<!--\|-->\|<script>" file.html | grep -B1 "<script>" | head -20
```

**CSS `:hover` working ≠ JS working.** If buttons look interactive but clicks do nothing, check for unclosed `<!--` before the first `<script>` tag.

See `design-md/zul.design.md` Rule 158 for the full detection/fix pattern.

---

### 63. Page Template — structure and assembly pattern (`zul.page.template.html`)

**File:** `zul.test.git/zul.page.template.html`

**CSS layers (from home screen, skip home-specific CSS lines 165–1243):**
- Lines `18–163`: `:root` tokens + reset + base layout
- Lines `1244–3026`: footer + all navbar CSS + responsive breakpoints
- New: `.page-viewport` + `.page-viewport__placeholder` added after

**HTML structure:**
```
<body>
  <svg defs block />  ← all icon symbols, hidden
  <section id="Navigation-Shell">
    NavbarPrimary-Desktop + NavTopMenu-Desktop + NavBar-Mobile
    NavMenu-Tablet + tablet-overlay
  </section>
  <main> → .page-container → .main-content →
    <section id="PageViewport" class="page-viewport">  ← drop zone
  <footer>
  <script> ALL nav JS handlers </script>   ← Rule 62: no comment before this
  NavBar-Bottom + mobile-overlay + NavMenu-Mobile
  <script> mobile menu IIFE </script>      ← must come AFTER NavMenu-Mobile DOM
  <script> maximize IIFE </script>
```

**`<section id="Navigation-Shell">` is semantic only** — fixed-position children escape DOM stacking and use the viewport regardless.

**Mandatory post-assembly check (Rule 62):** always verify no `<!--` is orphaned before a `<script>` tag after any sed assembly.

See `design-md/zul.design.md` Rule 159 for full line-number table and extraction details.

---

---

### 64. Flex column fill chain — every ancestor needs `flex:1` + `display:flex; flex-direction:column`

To make a target element fill all remaining viewport height, every container between `<html>` and the target must participate:

```css
html { height: 100%; }
body { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; display: flex; flex-direction: column; }
.page-container { width: 100%; flex: 1; display: flex; flex-direction: column; }
.main-content   { flex: 1; display: flex; flex-direction: column; }
.page-viewport  { flex: 1; min-height: 0; }   /* min-height:0 prevents auto-size overflow */
```

**Checklist:** Every ancestor has `flex:1` + `display:flex; flex-direction:column`? Target has `min-height:0`? Container with `margin:0 auto` has `width:100%` (Rule 65)?

**Mistake made (2026-05-26):** `main` and `.page-container` had no `flex` rule — chain broken at two levels. Target had `min-height:320px` hardcoded instead of `flex:1`. See `design-md/zul.design.md` Rule 161.

---

### 65. `margin:0 auto` inside flex-column collapses width — always add `width:100%`

`margin: 0 auto` on a flex child absorbs all cross-axis space, collapsing the element to content width ("Fit"). To fill the container while still centering with a `max-width` cap:

```css
.page-container {
  width:     100%;           /* ← required */
  max-width: var(--page-max-width);
  margin:    0 auto;
}
```

Without `width:100%` the element appears narrow regardless of the parent width.

**Mistake made (2026-05-26):** `.page-container` had `max-width` + `margin:0 auto` but no `width`. Viewport appeared as a centered strip. See `design-md/zul.design.md` Rule 162.

---

### 66. Fixed footer gap — `body.padding-bottom` = footer height only; content padding provides DS gap

Visible gap above a `position:fixed` footer = `body.padding-bottom + content.padding-bottom − footer.height`. Having both non-zero causes double-counting.

```css
body          { padding-bottom: 60px; }                     /* = footer height */
.main-content { padding-bottom: var(--spacing-space-m); }   /* = 16px DS gap */
/* visible gap = 60 + 16 − 60 = 16px ✓ */
```

Never add the DS gap to `body.padding-bottom` — it already comes from `.main-content`.

**Mistake made (2026-05-26):** `body.padding-bottom: 74px` + `.main-content { padding-bottom:16px }` = 30px gap. Corrected to 60px. See `design-md/zul.design.md` Rule 163.

---

---

### 67. Image assets — one component-scoped subfolder per DS instance, under `src/image-repo/[page]/assets/[variant]/`

Every page's file-based images (those used via `<img src>`) live in:
```
src/image-repo/[page-name]/assets/[variant]/[ComponentName]/
```

Each DS component instance that uses `<img>` files gets its own subfolder named after its HTML section `id`. If the same asset appears in two components (e.g. logo in both desktop and mobile navbar), **copy it into each component folder separately** — never cross-reference between folders.

**Confirmed — page.template (2026-05-26):**
```
src/image-repo/page.template/assets/main/
├── NavbarPrimary-Desktop/   logo-mark.svg, logo-text.svg, Avatar-Aidan.png
├── LearnMenu/               feature-*.png × 12
└── NavBar-Mobile/           logo-mark.svg, logo-text.svg
```

**Path from `zul.test.git/` HTML files:** `../src/image-repo/[page]/assets/[variant]/[Component]/file`

**Inline SVG symbols (`<use href="#ic-*">`) are exempt** — they have no file path and need no folder entry.

See `design-md/zul.design.md` Rule 164.

---

### 68. Local-first asset setup — create + copy files locally before committing

Create folders and copy files locally first, then commit. A single `git pull` then gives teammates both structure and files with no separate setup.

```
1. New-Item -ItemType Directory -Force   ← create folders
2. Copy-Item source dest                 ← copy files into component subfolders
3. Get-ChildItem -Recurse -File          ← verify all files present
4. Update all <img src> paths in HTML
5. grep for old paths — must return empty
6. git add → commit → push
```

Never commit an empty folder — Git tracks files, not directories.

See `design-md/zul.design.md` Rule 165.

---

### 69. DS state names don't always match CSS pseudo-classes — always verify visually

The DS names states like "Focus", "Pressed", "Active" — but these don't map 1-to-1 to CSS `:focus`, `:active`, etc. Always inspect the COMPONENT_SET via `use_figma`, screenshot every state, then decide the CSS mapping based on **visual behaviour**, not the state name.

**Confirmed — Navbar Notification Button - Parts (`3908:13442`):**
- `State=Focus` is the click/touch feedback state — maps to CSS `:active` + `:focus-visible`
- bg: `Surface/secondary/default-subtle` = `#e8fbe8` (light green, NOT dark)
- Prior docs said "Pressed = `Surface/primary/focus (#00a36a)`" — wrong. Always re-verify live.

**Rule:** Before implementing ANY interactive state, call `use_figma` on the COMPONENT_SET node, list all variants, screenshot each, then map DS state → CSS pseudo-class based on what it looks like. See `design-md/zul.design.md` Rules 170–171.

---

### 70. JS interaction counters — use synchronous integer, never setTimeout + property check

For multi-step click interactions (e.g. read → dismiss), track state with a plain integer counter that increments synchronously in the click handler. Never use `setTimeout` + a DOM property check to detect when "all items" reach a state.

```js
var dismissedCount = 0;

item.addEventListener('click', function () {
  var n = (parseInt(item.dataset.clicks, 10) || 0) + 1;
  item.dataset.clicks = String(n);
  if (n === 1) { /* step 1 */ }
  else if (n === 2) {
    /* step 2 — collapse */
    dismissedCount++;
    if (dismissedCount >= items.length) container.classList.add('is-empty');
  }
});

// Reset counter on EVERY close path
function resetAll() {
  dismissedCount = 0;
  container.classList.remove('is-empty');
  /* restore item styles */
}
```

**Key rules:**
- `getBoundingClientRect()` flush is REQUIRED between setting `maxHeight` to a px value and then to `0` — without it, the browser batches both and no transition fires
- Reset must happen on ALL close paths — `mouseleave` AND outside-click handler. Missing one leaves state dirty on reopen
- `Array.prototype.every.call(NodeList, ...)` can be unreliable — use a counter instead
- When a panel has its own `padding` AND a child has `padding-top`, both stack. Use an `is-empty` class to zero the child padding when items collapse, so total gap = parent padding only

See `design-md/zul.design.md` Rule 172.

---

### 71. Number Badge DS position — on the Avatar, not action buttons

In the DS Navbar (confirmed `use_figma` on `866:5576`, 2026-05-27), the **Number Badge sits on the Avatar** at `top: 0; right: 0` of the 56×56 avatar frame — **not on any action button**. The bell/notification button has no badge in the DS.

The prototype intentionally places the badge on the bell button. When doing so:
- Add `transition: opacity 0.15s ease` to the `.num-badge` base rule.
- Hide it on dropdown open: `#notif-btn.is-active .num-badge { opacity: 0; }` — pure CSS, no JS.

**Rule:** Always use `use_figma` + sibling x/y coordinates to confirm which element a badge belongs to. Never trust `get_design_context` text alone for absolute positioning.

See `design-md/zul.design.md` Rules 173–174.

---

### 72. NavMenu accordion — flat layout, `margin-top` −8px/0 trick, DS padding specs

#### DS structure is flat — NO wrapper divs (⛔ old wrapper approach removed)
Triggers and sub-topic containers are **direct siblings** in the flex column. Never add `.nav-menu-accordion` wrappers — they don't match DS and cause rendering inconsistencies.

#### `margin-top` trick — closed: −8px, open: 0
A 0-height submenu in a flex column still consumes two gap slots (phantom 16px instead of 8px between trigger pairs). Fix: `margin-top: calc(-1 * var(--spacing-space-xs))` on the submenu cancels the phantom gap when closed. When open, `margin-top: 0` restores the 8px column gap — giving 8px visible separation between trigger and first sub-item.

**Both tablet AND mobile must reset to `margin-top: 0` when open.** Never keep tablet at −8px — `padding-top` is inside the element box and invisible. The visible gap must come from the restored column gap.

#### `flex gap` unreliable inside `overflow:hidden` + `max-height` — use sibling `margin-top`
`gap: 8px` on a flex container with `overflow: hidden` and animating `max-height` can silently produce 0px between items. Set `gap: 0` and use the adjacent sibling combinator scoped to the submenu:

```css
.nav-menu-submenu {
  display:        flex; flex-direction: column;
  gap:            0;
  padding-top:    0;                                      /* DS tablet/mobile pt:0 */
  padding-left:   var(--spacing-space-m);
  padding-right:  var(--spacing-space-m);
  box-sizing:     border-box;
  max-height:     0; overflow: hidden;
  margin-top:     calc(-1 * var(--spacing-space-xs));     /* cancel phantom gap closed */
  transition:     max-height 0.2s ease, margin-top 0.2s ease;
}
.nav-menu-submenu.is-open { max-height: 500px; margin-top: 0; }

/* 8px between sub-items — scoped so column-level items are unaffected */
.nav-menu-submenu .nav-menu-item + .nav-menu-item { margin-top: var(--spacing-space-xs); }

/* Mobile only */
#NavMenu-Mobile .nav-menu-submenu { border-radius: 24px; margin-top: calc(-1 * var(--spacing-space-xs)); transition: max-height 0.2s ease, margin-top 0.2s ease; }
#NavMenu-Mobile .nav-menu-submenu.is-open { max-height: 800px; margin-top: 0; padding-bottom: var(--spacing-space-m); }
```

#### DS sub-topic padding specs (confirmed 2026-05-28)
- Tablet (`5283:118410`): `pt:0, pb:0, pl:16, pr:16` | sub-items inner gap: 8px
- Mobile (`5283:122098`): `pt:0, pb:16, pl:16, pr:16, border-radius:24px` | sub-items inner gap: 8px

#### DS item spacing (node `3427:4590`)
- Container padding: 16px | Column gap: 8px | Item padding: `8px 16px` | Item icon→label gap: 10px

**See zul.design.md Rules 175–179.**

---

### 73. Auto-collapse timeout — `startAutoCollapse` / `cancelAutoCollapse` pattern

Any accordion or dropdown that opens on click should auto-collapse after idle time (5s default).

```js
var autoCollapseTimer = null;
function cancelAutoCollapse() { clearTimeout(autoCollapseTimer); autoCollapseTimer = null; }
function closeAll()           { cancelAutoCollapse(); /* close logic */ }
function startAutoCollapse()  { cancelAutoCollapse(); autoCollapseTimer = setTimeout(closeAll, 5000); }

// On click: closeAll() (cancels timer) → open new → startAutoCollapse()
// On external close: closeAll() via MutationObserver on aria-hidden
```

`closeAll()` must call `cancelAutoCollapse()` first — prevents orphaned timers firing on already-closed panels. **See zul.design.md Rule 177.**

---

### 74. DS `size-[Npx]` = fixed square, `flex-[1_0_0]` = FILL — never infer one from the other

When `get_design_context` output shows a sizing class on an element, map it exactly:

| DS context class | CSS |
|---|---|
| `size-[Npx]` or `shrink-0 size-[Npx]` | Verify via `use_figma` on the **instance node** — `get_design_context` size classes are available-space calculations, not actual instance sizes (Rule 188) |
| `flex-[1_0_0]` | `flex: 1 0 0` |
| `w-[Npx] flex-[1_0_0]` | `width: Npx; flex: 1 0 0` |

**Never use `flex: 1 0 0` for an element that DS shows as `size-[Npx]`.** A `flex: 1 0 0` in a column with a narrow fixed width (e.g. `width: 100px`) makes a portrait rectangle — visually stretched.

**See zul.design.md Rule 185.**

---

### 75. DS `p-[Npx]` = padding ALL sides — directional only if DS shows `pt-`, `pr-`, `pb-`, `pl-`

`p-[28px]` in `get_design_context` = `padding: 28px` all four sides. Applying it as `padding-right: 28px` only discards top and bottom padding — content hugs the card's top/bottom edges.

Only use directional padding (`padding-right`, `padding-top`, etc.) when the DS class explicitly uses a directional variant (`pr-[28px]`, `pt-[28px]`, `px-[28px]`, etc.).

**See zul.design.md Rule 187.**

---

### Static Card - 1.5 — confirmed DS spec (2026-05-28, Rules 185–187)

| Property | Value |
|---|---|
| Illustration | `width: 130px; height: 130px; max-width: 130px; max-height: 130px; flex: none` (DS instance `5183:105282`) |
| img-col total | `186×186px` (28+130+28) |
| img-col padding | `padding: 28px` all sides |
| Content frame gap | `gap: 16px` (Spacing/component/md) |
| Right-col padding | `padding: 28px` all sides |

Responsive: tablet `80×80`, mobile `100×100` illustration.

**Mistakes (this component):** (1) `flex: 1 0 0; width: 100px` → 100×164 portrait / stretched. (2) `gap: 12px` instead of 16px. (3) `padding-right` only instead of all sides. All caused by carrying forward prior-session estimates rather than re-fetching DS.

---

### 76. `get_design_context` size classes are available-space estimates — always verify with `use_figma` on the instance

`size-[164px]` in `get_design_context` output = available space after parent padding is subtracted, NOT the actual DS instance dimensions. The actual instance may be smaller and have explicit `maxWidth`/`maxHeight` set.

**Confirmed mismatch (Static Card, 2026-05-28):**
- `get_design_context`: `size-[164px]` (220px card − 28px top − 28px bottom = 164px)
- Actual instance `5183:105282`: `width: 130, height: 130, maxWidth: 130, maxHeight: 130`

**Rule:** After reading `get_design_context`, always follow up with `use_figma` to read the instance node's actual dimensions before writing any CSS. The `size-[Npx]` class is a starting hint, not a confirmed value.

**See zul.design.md Rule 188.**

---

### 77. Always query the instance node inside the parent frame — not the master component

The master component node has its own intrinsic dimensions. The instance placed inside another frame can have different FIXED overrides and explicit `maxWidth`/`maxHeight`. Only the instance node reflects the actual used dimensions.

```js
// Correct — get instance dimensions from parent's children
const imgCol = figma.getNodeById('parentFrameId');
const instance = imgCol.children[0];
return { width: instance.width, height: instance.height,
         maxWidth: instance.maxWidth, maxHeight: instance.maxHeight };

// Wrong — gives master component dimensions, not instance
const master = figma.getNodeById('masterComponentId');
```

**See zul.design.md Rule 189.**

---

### 78. `exportAsync` for PNG assets — NEVER use `node.screenshot()` or `get_screenshot`

`node.screenshot()` and `get_screenshot` composite onto the Figma canvas background (`#1e1e1e`). Transparent areas become opaque near-black (R=30, G=30, B=30, A=255) — transparency destroyed.

**Always use `exportAsync`:**
```js
const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });
```

`exportAsync` preserves true alpha. `node.screenshot()` is QA-only (after code is written), never for asset export.

**Confirmed (2026-05-29):** `Graphic/P.LiveTuition` (node `5436:35577`) via `get_screenshot` → black-background PNG. Via `exportAsync` → clean transparent PNG, A=0 corners confirmed.

**See zul.design.md Rule 194.**

---

### 79. Large PNG base64 — split into halves, write to temp files, decode in PowerShell

Write tool limit ~9,000 chars. A 1× PNG export produces ~18,000+ base64 chars. Split and rejoin:

```js
// use_figma
const b64 = btoa(bin);
const mid = Math.floor(b64.length / 2);
return { total: b64.length, h1: b64.slice(0, mid), h2: b64.slice(mid) };
```
Write `h1` → `asset_h1.txt`, `h2` → `asset_h2.txt`. Then:
```powershell
$b64 = (Get-Content "...\asset_h1.txt" -Raw).Trim() + (Get-Content "...\asset_h2.txt" -Raw).Trim()
$bytes = [Convert]::FromBase64String($b64)
[System.IO.File]::WriteAllBytes("C:\path\output.png", $bytes)
```
Write EXACT values only — never pad or extend. Verify byte count matches expected.

**See zul.design.md Rule 195.**

---

### 80. Simple task = direct action — no unnecessary exploration

When a task is a direct export/save (e.g. "fetch this graphic as alpha PNG"), execute it directly:
`use_figma exportAsync` → write halves → PowerShell decode → verify.

Do NOT read HTML, check CSS, audit component anatomy, or fetch design context unless explicitly required by the task. Match scope to what was requested.

**Confirmed mistake (2026-05-29):** "Export node as alpha PNG" triggered unnecessary HTML/CSS audit. User flagged as over-complication.

**See zul.design.md Rule 196.**

---

### 81. Page background = `Surface/general/default` (#ffffff) — `--surface-subtle` does not exist in DS

The DS Screen page uses **`Surface/general/default`** (`#ffffff`) as the page background fill — confirmed via `use_figma` on the "Pandai - Screen" frame (all instances use `VariableID:.../2375:1335` which resolves to `Surface/general/default`).

**`Surface/subtle` is not a DS token.** It was invented during prototype implementation and never existed in `TLVKe3bgJTdVvuPAzgDq2f`.

```css
/* Wrong — fabricated token, not in DS */
body { background: var(--surface-subtle); }

/* Correct — DS confirmed, Screen page standard */
body { background: var(--surface-general-default); }
```

**Rule:** Every HTML prototype's `body` background must use `var(--surface-general-default)`. Remove `--surface-subtle` from any `:root` block it appears in. Do not create a `--page-bg` alias — reference `--surface-general-default` directly.

**Confirmed mistake (2026-05-30):** All HTML prototypes (`zul.home.screen.html`, `zul.page.template.html`, `syakila.html`, `scoreCard.html`, `AnalysisCard.html`, `nadia_*.html`, `azrai.html`) had `body { background: var(--surface-subtle) }` using a fabricated `#F8FAFC` value. Verified DS Screen page uses `Surface/general/default` = `#ffffff`.

---

### 81b. Cross-file consistency — every resolved rule must propagate to ALL .md files in the same commit (= Rule 201 in zul.design.md)

When a rule is resolved, corrected, or added in `zul.design.md`, update **all** files that cover the same topic — `CLAUDE.md`, `design.color.md`, `design-md/nadia.design.md`, `design-md/syakila.design.md` — in the same commit. Never split into separate commits.

**What happens without this rule:** Three .md files (`CLAUDE.md`, `nadia.design.md`, `syakila.design.md`) documented the wrong Button - 1.5 Pressed palette for days because the resolution applied to `zul.design.md` was never propagated. Partial truth is worse than no truth — it creates false confidence in incorrect values.

**Rule:** A fix is not complete until it's consistent across all files containing it. After any rule update, always run the checklist: `zul.design.md` ✓ → `CLAUDE.md` ✓ → `design.color.md` ✓ → `nadia.design.md` ✓ → `syakila.design.md` ✓ → commit all together.

---

### 82. Button - 1.5 action animations — no CSS transitions on any state (= Rule 198 in zul.design.md)

All `Button - 1.5` instances use **instant state changes** — no `transition` on any property, on any element (container, label, arrow, arrow-clip).

**Rule:** Never add `transition` to `.btn-*`, `.btn-*__text`, `.btn-*__label`, `.btn-*__arrow`, or any child of a Button - 1.5 implementation.

**Confirmed violations found and removed:**
- `.btn-quiz-cta` container — `transition: background 0.15s, border-color 0.15s` (removed 2026-05-30)
- `.btn-add-classes__arrow` — `transition: background 0.12s ease, box-shadow 0.12s ease, color 0.12s ease` (removed 2026-05-31). Arrow lag caused by this was the reported "weird" button behavior.

---

### 83. Button - 1.5 — always pair CSS `:active` with JS `is-pressing` (= Rule 200b in zul.design.md)

Every Button - 1.5 `<button>` must have both CSS `.is-pressing` declarations AND JS mousedown/mouseup/mouseleave handlers. CSS `:active` alone is unreliable in VS Code Simple Browser (Electron webview).

```css
.btn:active,
.btn.is-pressing { /* pressed bg + border */ }
.btn:active .btn__child,
.btn.is-pressing .btn__child { /* child color overrides */ }
```

```js
document.querySelectorAll('.btn-quiz-cta, .btn-add-classes').forEach(function (btn) {
  btn.addEventListener('mousedown',  function () { btn.classList.add('is-pressing'); });
  btn.addEventListener('mouseup',    function () { btn.classList.remove('is-pressing'); });
  btn.addEventListener('mouseleave', function () { btn.classList.remove('is-pressing'); });
});
```

**Confirmed implementations (2026-05-31):** `.btn-quiz-cta` ✅, `.btn-add-classes` ✅. Still missing: `.static-card__btn` (add in next session touching StaticNewsCard-Desktop).

---

---

### 84. Tertiary button — no arrow circle, bare chevron only (= Rule 202 in zul.design.md)

**Source:** DS `TLVKe3bgJTdVvuPAzgDq2f`, `get_design_context` on nodes `538:2067` (L), `538:2099` (M), `1452:8381` (S). Audited 2026-05-31.

Tertiary is structurally different from Primary and Secondary:

| Element | Primary | Secondary | Tertiary |
|---|---|---|---|
| Button border | `1px #00a36a` | `1px #00cc85` | **none** |
| R Arrow container | filled circle (`#99ebce`) | outlined circle (white + 1px green) | **no container** |
| R Arrow | circle → clip | circle → clip | **bare clip only** |

The `showRArrow` chevron in Tertiary is a bare `overflow-clip` div placed directly in the content row — no wrapper div, no background, no `box-shadow`, no padding.

**CSS:**
```css
/* Primary */
.btn-primary__arrow { background: #99ebce; padding: 2px; border-radius: 60px; }
/* Secondary */
.btn-secondary__arrow { box-shadow: inset 0 0 0 1px var(--border-primary-default); padding: 2px; border-radius: 60px; }
/* Tertiary — NO wrapper */
.btn-tertiary .btn__chevron { overflow: hidden; flex-shrink: 0; width: 16px; height: 16px; }
```

**Never add** a circle wrapper div to a Tertiary button's arrow. Any `background`, `padding`, or `box-shadow` on a `.btn__arrow` inside Tertiary creates a circle that does not exist in the DS.

---

### 85. Secondary button outer frame — `strokeAlign: INSIDE` → `box-shadow: inset`, never `border` (= Rule 203 in zul.design.md)

**Source:** DS `use_figma` on node `538:1923`. Confirmed 2026-05-31.

The Secondary button outer frame has `strokeAlign: INSIDE`. Rule 60 applies: always `box-shadow: inset 0 0 0 1px`, never `border: 1px solid`.

**Critical cascade rule:** when `box-shadow: inset` is the border mechanism, state overrides (`:hover`, `:active`, `.is-active`, `:disabled`) must override the full `box-shadow` property. `border-color:` overrides have **zero effect** when there is no `border`.

```css
.btn-secondary-arrow { border: none; box-shadow: inset 0 0 0 1px var(--border-primary-default); }
.btn-secondary-arrow:hover   { background: var(--surface-secondary-default); box-shadow: inset 0 0 0 1px var(--border-secondary-focus); }
.btn-secondary-arrow:active  { background: var(--surface-primary-focus);     box-shadow: inset 0 0 0 1px var(--border-primary-default); }
.btn-secondary-arrow.is-active { background: var(--surface-primary-default); box-shadow: inset 0 0 0 1px var(--border-primary-focus); }
.btn-secondary-arrow:disabled,
.btn-secondary-arrow.is-disabled { background: var(--surface-disabled-primary); box-shadow: inset 0 0 0 1px var(--border-disabled-disabled); }
```

**Mistake made (2026-05-31):** Used `border: 1px solid` on the outer frame — all state `border-color` lines were silent no-ops.

---

### 86. Secondary/M Pressed arrow circle — confirmed DS values (= Rule 204 in zul.design.md)

**Source:** DS `use_figma` on node `538:1913`. Chevron variable `VariableID:119:10` = `Icon/primary/default`. Confirmed 2026-05-31.

| Property | Correct | Wrong (was) |
|---|---|---|
| bg | `Surface/primary/focus` `#00a36a` | `Surface/primary/default` `#00cc85` |
| box-shadow | `inset 0 0 0 1px var(--border-primary-default)` | `none` |
| chevron `color` | `Icon/primary/default` `#00cc85` | `Surface/primary/focus` `#00a36a` |

Bg and chevron color were swapped — chevron was invisible (same hex as bg). Arrow circle base `color` must also use `--icon-primary-default`, not `--text-primary-default` (same hex, but Rule 36: icon strokes → icon token).

**Mandatory pre-flight:** Always refer to DS and `zul.design.md` before any design work, change, or decision — including seemingly small fixes. These violations were present because the Pressed state was never verified live from DS. A 2-minute `use_figma` call on `538:1913` would have caught all three errors before they were committed.

---

### 87. Post-build DS audit — mandatory 1:1 property verification after every component (= Rule 214 in zul.design.md)

**Source:** User instruction 2026-06-02. Applies to every component built from DS node data.

Reading DS node values correctly and implementing them completely are two separate problems. A DS read confirms the right values — it does not verify that every property has been declared on the correct CSS element. The gap happens during implementation: variant/sibling classes carry over structural properties (flex, gap, font-size) but silently drop "obvious" ones like `color`.

**If building from DS node data (not screenshots), the output must be 1:1. There is no excuse for a discrepancy when exact values are available from the source.**

**Mandatory post-build audit — run after completing ANY component:**

```
For every node in the DS component tree:

□ TEXT nodes:
  → color           — explicit CSS `color:` on that element (never rely on inheritance)
  → font-size       — matches DS fontSize
  → font-weight     — matches DS fontWeight
  → line-height     — matches DS lineHeight
  → font-family     — Poppins unless DS specifies otherwise
  → text stroke     — check for DS stroke on TEXT node (Rule 206); if present → -webkit-text-stroke + paint-order

□ FRAME/GROUP nodes:
  → background      — explicit CSS `background:` matches DS fill token
  → border/stroke   — check strokeAlign first (Rule 60), then apply inset/outset/border correctly
  → border-radius   — matches DS cornerRadius via correct token
  → padding         — all 4 sides, not just directional (Rule 75)
  → gap             — matches DS itemSpacing / counterAxisSpacing
  → width / height  — fixed if DS specifies both (Rule 209)
  → flex-direction  — matches DS layoutMode (HORIZONTAL/VERTICAL)
  → align-items     — matches DS counterAxisAlignItems
  → justify-content — matches DS primaryAxisAlignItems

□ Visibility:
  → DS visible: false → NO HTML element, NO CSS rule

□ For every CSS class created:
  → Does it declare ALL properties from its DS node?
  → Not just the "different" ones — ALL of them, including color, font-size, line-height
```

**Workflow:**
```
1. Build the component (HTML + CSS) from DS node reads
2. Re-fetch the DS component node via use_figma
3. Walk every TEXT and FRAME child node
4. For each node: compare DS properties vs CSS declarations one by one
5. Fix every gap before committing
```

**Why this rule exists:**
`.modal-stat-caption--inline` (Score Modal) was implemented with `font-size`, `line-height`, `gap`, `flex-wrap` — all correctly read from DS — but `color: var(--text-default-caption)` was missing. DS node `5575:1112` clearly showed `Text/default/caption = #bfbfbf` on those spans. The property was read correctly; it was never written to CSS because `color` felt inherited. It wasn't — spans got `#404040` from body.

**Key rule:** Every text element needs an explicit `color:` declaration. Never assume correct inheritance. When writing a variant or sibling CSS class, carry over the full property set — not just what is structurally different.

---

*Generated: May 2026 | Last updated: 2026-06-02 (Rule 87 added — mandatory post-build DS audit, 1:1 property verification after every component) | Cleanup target: Original DS (TLVKe3bgJTdVvuPAzgDq2f)*
