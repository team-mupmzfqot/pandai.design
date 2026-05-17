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
- Secondary button Pressed state was incorrectly noted as "fills solid with Surface/primary/default", then later mis-corrected to dark teal (#00564c). **Confirmed live DS (May 2026, node 538:1907):** bg `#00a36a` (`Surface/primary/focus`), border `#00cc85` (`Border/primary/default`), text `#00cc85` (`Text/primary/default`). See Rule 40 for the full corrected table.
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

### 8. Icon clip framing — always `exportAsync` the icon INSTANCE, never derive from Iconography insets

The only reliable way to get icon rendering correct inside a clip container is to call `exportAsync({ format: 'SVG_STRING' })` on the icon INSTANCE within the DS component. The exported SVG contains the exact `viewBox` and path coordinates to use directly — no CSS clip padding needed, because the natural margins are baked into the path data.

**Rule:** `viewBox` in the symbol must equal the clip container's CSS size. For 20×20 clips → `viewBox="0 0 20 20"`. For 24×24 clips → `viewBox="-1 -1 26 26"` (with translated paths + buffer). See Rule 27 for the full viewBox guide.

**Confirmed — NavTopMenu icons (DS node 3406:802, May 2026):**
All 9 nav button icons export at `viewBox="0 0 20 20"`. The clip container is 20×20. Use DS-exported paths at 1:1 scale. No CSS padding on the clip.

```js
// Correct workflow
const iconInst = container.findOne(n => n.id === 'I3406:804;538:2070'); // icon instance ID
const svg = await iconInst.exportAsync({ format: 'SVG_STRING' });
// svg.viewBox tells you the correct viewBox to use in the <symbol>
```

**What NOT to do:**
- Never derive clip padding from DS inset percentages and apply them as CSS `padding` on the clip element — this double-crops icons that already have margins in their paths.
- Never use `viewBox="0 0 24 24"` for icons that render in a 20×20 clip — this scales icons to 83.3%, making them appear smaller and thinner than DS.

**Previous (wrong) approach — corrected May 2026:**
An earlier implementation used per-icon CSS padding (e.g. `padding: 1.67px 2.5px`) on the 20×20 clip container, with `viewBox="0 0 24 24"` symbols. This was derived from DS inset percentages. When the DS exports were checked, every icon used `viewBox="0 0 20 20"` with NO clip padding — the margins were already in the path coordinates. The CSS padding was double-cropping all icons. All 9 symbols were updated and padding rules removed.

**Action icons (NavbarPrimary — 24px, NO clip container):**
These are a different case — rendered at 24×24 with no clip div. Use `viewBox="-1 -1 26 26"` with translated paths. See Rule 27.

**Mistake made:** Applied blanket `8.33%` clip padding to all nav icons based on Iconography page insets — wrong source. The correct source is always `exportAsync` on the icon instance within the actual DS component.

---

### 9. Spec context matters — always check the parent component, not standalone specs

A component's spec values can differ depending on where it appears. The same element (e.g., Pill Badge) has different typography when used standalone vs. embedded inside another component.

**Mistake made:** Pill Badge font-size was changed to `12px` based on the standalone Pill Badge DS spec — but inside Quiz Card the correct value is `10px` (`Body/B8`). Had to revert after fetching the actual Quiz Card node spec.

**Rule:** When implementing an element that appears inside a larger component, always `get_design_context` on the **parent component node**, not the standalone element node.

---

### 10. Every page section must be a named `<section>` — never a bare `<div>`

Every major content block on a page must be wrapped in `<section id="SectionName-Desktop">`. This applies to Navbar, Welcome, Carousel, Static Cards, and every content section below.

**Naming convention:** `id="[ComponentName]-Desktop"` — e.g. `Welcome-Desktop`, `Carousel-Desktop`, `StaticNewsCard-Desktop`.

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

**M vs S:** bg and border colors are identical between sizes. Size=M = 32px (was previously called "L"), Size=S = 24px (was previously called "M"). Since quiz cards use S size (24px), always check S variants for quiz card badges. The prototype base `.subject-badge` CSS = M (32px), quiz card override = S (24px).

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
- Geography text exception was undocumented — DS uses `#478220` (dark green) on the light green bg. Missing `--badge-text` override renders white text on `#77d836` (unreadable).
- Component location was wrong — badges are on `⚙️ Badges` page (COMPONENT_SETs), not Iconography page as previously documented.
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
- Footer - 1.5 height: **44px** (updated May 2026; was 60px — padding changed from `t:20/b:20` to `t:12/b:12`)

**Rule:** `body { padding-bottom: 74px; }` — 44px (footer) + 30px (DS gap).

> **Updated May 2026:** Footer height reduced from 60px to 44px in DS. `body.padding-bottom` updated from 90px → 74px accordingly.

**Important:** Not all spacing values in DS screen frames are token-bound. Always check `boundVariables` on a node before assuming a raw px value maps to a Semantic token. If absent from `boundVariables`, treat it as a hardcoded design decision and use the raw value.

**Mistake made:** `body` had `padding-bottom: 60px` (footer height only), cutting off 30px of breathing room. Corrected to 90px, then to 74px when the footer height was updated in the DS.

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

**Navbar nav button icons (NavTopMenu — 20×20 clip containers):** Use `exportAsync` on the icon instance → DS exports these at `viewBox="0 0 20 20"`. Use that viewBox directly, NO CSS clip padding. Do NOT use `viewBox="0 0 24 24"` — that scales icons to 83.3%. See Rule 8 for the full corrected workflow. The old note about "leave viewBoxes tight to path" was wrong and has been corrected (May 2026).

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
| Outer padding | `2px 4px` (`space-xxs`) | `2px 8px` (`space-xs`) | `2px 8px` (`space-xs`) |
| Border-radius | 60px (pill) | 60px | 60px |
| Text | 12px SemiBold | 12px SemiBold | 12px SemiBold |
| Text slot padding | `0 4px` | `0 4px` | `0 4px` |
| Arrow circle size | 16×16 | 20×20 | 18×18 |
| Arrow padding | 2px (content-box) | 2px (content-box) | 1px (content-box) |
| Arrow clip | 12×12 | 16×16 | 16×16 |
| Arrow fill | `#99ebce` | `#99ebce` | white |
| Arrow stroke | none | none | 1px `#00cc85` → use `box-shadow:inset` |
| DS node (Default) | `1437:8154` | `479:344` | `538:1923` |

**Primary/S uses `Spacing/space-xxs` (4px) for outer horizontal padding — NOT 8px.** Primary/M and Secondary/M use `Spacing/space-xs` (8px). Text size `12px SemiBold` is the same across all sizes.

**Mistake corrected (May 2026):** Rule 31 previously stated all sizes share `2px 8px` outer padding. Live DS audit via `get_design_context` confirmed Primary/S is `px-[Spacing/space-xxs, 4px]` = `2px 4px`. The quiz CTA buttons on the home screen were rendering 8px wider than DS because of this error.

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

### Footer - 1.5 confirmed DS specs (node 2073:6579, updated May 2026)

| Property | Value |
|---|---|
| Height | **44px** (was 60px — updated May 2026) |
| Padding | `t:12 r:28 b:12 l:28` → `Spacing/space-s` (12px) vertical, `Spacing/space-2xl` (28px) horizontal |
| CSS pattern | `height: 44px` + `align-items: center` + `padding: 0 var(--spacing-space-2xl)` |
| Border | top only, 1px `#00cc85` (`--border-default`) — `strokeTopWeight:1`, all other sides 0 |
| Background | white (`--surface-general-default`) |
| Layout | `HORIZONTAL`, `SPACE_BETWEEN`, `crossAlign:CENTER` |
| Left group gap | 4px (`--spacing-space-xxs`) |
| Right group gap | 4px (`--spacing-space-xxs`) |
| All text | 14px / weight:500 / `#666666` (`--text-default-body`) |
| Link "Pandai.org" | 14px / weight:500 / `#00cc85` (`--text-primary-default`) — info + chevron icons `visible:false`, text only |
| Heart icon | `<use href="#ic-heart">`, 20×20, `color:var(--icon-primary-default)` (`#00cc85`) |
| Positioning | `position:fixed; bottom:0; left:0; right:0; z-index:100` |
| `body` padding-bottom | `74px` = 44px footer + 30px DS gap (was 90px when footer was 60px) |
| Mobile stacked height | 72px = 12+20+8+20+12 → `body { padding-bottom: 102px }` (unchanged) |

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

### 40. Button - 1.5 Pressed palette — confirmed live DS (May 2026, re-verified May 2026)

All variants (Primary, Secondary, Tertiary) share the **same Pressed state palette** — **Primary/focus mid-green**, NOT the Tertiary dark-teal that was previously documented. The dark-teal palette (`#00564c`) was a documentation error; the live DS has always resolved Pressed to `Surface/primary/focus`.

**Confirmed Pressed state — all variants, Student type (re-verified May 2026 from live DS):**

| Property | Token | Hex |
|---|---|---|
| Button background | `Surface/primary/focus` | `#00a36a` |
| Button border | `Border/primary/default` | `#00cc85` |
| Label / icon | `Text/primary/default` / `Icon/primary/default` | `#00cc85` |
| Arrow bg (if shown) | `Surface/primary/default` | `#00cc85` |
| Arrow chevron | `Icon/primary/focus` | `#00a36a` |

This applies to: `Primary/S` (1437:8138), `Primary/M` (479:326), `Secondary/M` (538:1907), `Tertiary/L` (3029:20022).

**CSS pattern:**
```css
.btn:active,
.btn.is-pressing {
  background:   var(--surface-primary-focus);   /* #00a36a */
  border-color: var(--border-primary-default);  /* #00cc85 */
}
.btn:active .btn__label { color: var(--text-primary-default); }   /* #00cc85 */
/* Arrow chevron — use --surface-primary-focus (#00a36a), same hex as Icon/primary/focus */
```

**Previous documentation error:** An earlier session documented Pressed as `Surface/tertiary/default` (#00564c) / `Border/tertiary/focus` (#00453d). This was wrong. The error propagated into code and was corrected by re-fetching live `get_variable_defs` on every state node (May 2026 audit). Always re-verify from live DS — never trust previously written colour notes for state tokens.

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

### 45. DS state tokens can change — always re-verify from live DS, never trust prior notes

The DS is a living file. Token values assigned to component states (especially Pressed) can change between sessions as the DS is updated. Never assume a state's colours are the same as what was written in a previous session note or rule.

**What changed (May 2026 audit):** All Button - 1.5 Pressed states were re-fetched from the live DS via `get_variable_defs`. Every variant that was previously documented as using `Surface/tertiary/default` (#00564c) / Tertiary dark-teal for Pressed was found to actually use `Surface/primary/focus` (#00a36a). Five buttons in `zul.home.screen.html` had wrong Pressed state CSS and were corrected in one audit pass.

**Rule:** For any interactive state — especially Pressed — always call `get_variable_defs` on the specific DS variant node **in the current session**. Do not reuse colour values from previous sessions, CLAUDE.md notes, or zul.design.md entries without re-verification against the live DS.

**Detection workflow:**
```
1. Find all variant nodes for the component set (use_figma → filter by Type + State + Variant + Size)
2. Call get_variable_defs on each state node in parallel
3. Compare against current CSS — token by token
4. Update CSS where tokens have drifted
```

**The only reliable source is `get_variable_defs` on the live DS node.** Everything else is a cached snapshot that may be stale.

---

### Mandatory workflow — BEFORE every session and every change

> **Non-negotiable. No exceptions. This applies to every task — even "small" fixes.**

```
Step 0a: Read zul.design.md       → load all confirmed specs, session rules, known mistakes
Step 0b: Refer to live DS         → TLVKe3bgJTdVvuPAzgDq2f — single source of truth
Step 1:  search_design_system     → confirm component exists in DS, get component key
Step 2:  use_figma                → find node ID across pages
Step 3:  get_design_context       → pull structure, dimensions, token bindings per variant
Step 4:  get_variable_defs        → confirm exact Semantic token names on the node
Step 5:  Implement                → use only token values from steps 3–4, no assumptions
Step 6:  Validate                 → compare against get_screenshot
```

**Step 0a and 0b are mandatory before ANY design work, ANY change, and ANY decision — including seemingly trivial fixes.** The biggest errors in this project have come from skipping the DS lookup and relying on memory or prior notes.

> Example of a "small" fix that required DS inspection (May 2026): The Pandai logo looked "abit off." Root cause required `use_figma` on node `1898:6965` to discover the exact DS dimensions (116.479×28px, gap 4.204px, wordmark height 19.573px) — none of which matched the hardcoded CSS. Memory and prior notes were wrong. See Rule 73.

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
- **All image placeholder assets live in `src/image-repo/`** — referenced as `../src/image-repo/filename` from `zul.test.git/` HTML. Never use `icons/` for placeholder images.

**Quiz card image area — confirmed CSS pattern (May 2026):**
```css
.quiz-card__image {
  background-color:    transparent;      /* no grey fill — show image as-is */
  background-size:     cover;            /* fill area, crop from center — no stretching */
  background-position: center;
  background-repeat:   no-repeat;
}
```
- `background-size: cover` — fills the image area, crops from center. Use this for DS "Fill" behaviour.
- `background-size: contain` — shows full image without cropping but leaves gaps. Use only when full image must be visible.
- `background-color: transparent` — no placeholder grey; cards without an image show white
- Set per card via inline `style="background-image: url('../src/image-repo/subfolder/filename');"` on the `<div>`

**`src/image-repo/` folder structure (May 2026):**
Organised into subfolders by section. Path from `zul.test.git/` HTML: `../src/image-repo/subfolder/filename`

| Folder / File | Used in |
|---|---|
| `Quiz-Card/*.png` | Section #5 quiz card image placeholders (18 cards) |
| `Static-Card/*.jpg/png` | Section #3 carousel cards (4 cards) |
| `bm.png` | Section #6 quiz card image placeholders |
| `carousel-slide.png` | (legacy placeholder — replaced by Static-Card images) |
| `ic-user.png` | Navbar avatar |

**Carousel center card — always the first card in HTML (May 2026):**

The JS infinite-loop cloning makes `idx = total` center **orig0** (the first original card) on load:
```
track order after cloning: [clone3, clone2, clone1, clone0, orig0, orig1, orig2, orig3, ...]
idx = total = 4  →  centers orig0 = first card in HTML
```
**Rule:** To guarantee a specific image always appears centered on load, place it as the **first** `<div class="carousel__card">` in the HTML.

**Carousel images — confirmed (May 2026):**
| Card | Image | Note |
|---|---|---|
| 1 (center) | `Static-Card/jdp.jpg` | Always centered on load |
| 2 | `Static-Card/2 (3).png` | |
| 3 | `Static-Card/3.jpg` | |
| 4 | `Static-Card/2 (3).png` | repeat |

**Page section structure (confirmed May 2026):**
```html
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
- Default CSS: `#NavBar-Mobile { display:none }` always. No media-query toggle needed for this desktop prototype.
- `body { min-width: 400px }` — minimum mobile layout width

**JS architecture (confirmed May 2026):**
- Non-critical JS (carousel etc.) wrapped in `try/catch` so errors never block other handlers
```js
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

### 45. Subject Badge icon export — always call `exportAsync` on the icon INSTANCE, not the badge component

The `⚙️ Badges` page holds `COMPONENT_SET` nodes named `Subject Badge/[Name]` (e.g. `Subject Badge/Comp-Science`). Each set has children named with `Size=M` / `Size=L`. Inside each size component is a `Subject/XXX` INSTANCE node — that is the icon.

**Export must be called on the INSTANCE, not the badge component.** The badge includes the icon slot, label panel, and pointer. The icon instance exports cleanly as a standalone icon SVG.

**Confirmed workflow (May 2026):**
```js
const badgesPage = figma.root.children.find(p => p.name === '⚙️ Badges');
await figma.setCurrentPageAsync(badgesPage);
const compSet = badgesPage.findOne(n => n.id === '<component-set-id>');
const mComp   = compSet.children.find(c => c.name.includes('Size=M'));
const iconInst = mComp.findOne(n => n.type === 'INSTANCE' && n.name.startsWith('Subject/'));
const svg = await iconInst.exportAsync({ format: 'SVG_STRING' });
```

**Badge component naming on `⚙️ Badges` page** — abbreviated names, not the display label:

| Display label | Component set name |
|---|---|
| Computer Science | `Subject Badge/Comp-Science` |
| Bahasa Melayu | `Subject Badge/BMelayu` |
| Islamic Studies | `Subject Badge/Islamic` |
| Add Math | `Subject Badge/Add-Math` |
| KAFA | `Subject Badge/KAFA` |
| RBT | `Subject Badge/RBT` |

Always `findAll(n => n.type === 'COMPONENT_SET' && n.name.startsWith('Subject Badge/'))` first to confirm the exact names before searching by assumed label.

---

### 46. Some DS subject badge SVGs have no `<g clip-path>` wrapper — structure varies per subject

Not all Subject Badge icon exports have the same SVG structure. Some subjects export with a `<g clip-path="url(#clipN)">` wrapper enclosing all paths; others export with paths placed directly inside `<svg>` with no wrapper at all.

**Confirmed no-clip-path subjects (May 2026):**
- `Comp-Science` — paths directly in `<svg>`, no `<g>` wrapper
- `BMelayu` — paths directly in `<svg>`, no `<g>` wrapper

**Rule:** Never add a `<g clip-path>` wrapper to a badge SVG that doesn't have one in the DS export. The DS intentionally omits it for these icons — the paths already fit the viewBox without clipping.

**Mistake made:** The old CS badge HTML had a manually-added `<g clip-path="url(#clip0_3283_85259_cs)">` wrapper. The new DS export has no such wrapper. Replacing required removing the `<g>` and `<defs><clipPath>` entirely.

---

### 47. Full SVG replacement = paths + structure — updating only clip IDs leaves broken state

When a subject badge SVG needs updating, replacing only the `clip-path` ID references (e.g. renaming `clip_math` → `clip0_3283_85245`) while leaving the old path data is a **broken halfway state**. The clip rect dimensions may match but the rendered icon shape is still wrong because the path coordinates are from a different DS export version.

**Rule:** Any SVG replacement must be a full replacement — the complete `<g clip-path>...<defs>` block including all path data. Never do partial updates (ID-only, rect-only, or first-path-only).

**Signal that a partial update was done:** The badge renders but the icon looks wrong/misshapen or proportions don't match the DS screenshot. This means path coordinates are old.

---

### 48. DS badge SVG `height` attribute must match the DS export exactly

The outer `<svg>` tag attributes (`width`, `height`, `viewBox`) in the DS export are exact and must not be altered. Mismatches cause the browser to scale or clip the icon.

**Confirmed mistake (May 2026):** Science badge had `height="23"` in the prototype HTML. The DS export is `height="24"`. A 1px discrepancy causes the icon to render slightly squished vertically.

**Rule:** When doing a full SVG replacement, always include the outer `<svg width="X" height="Y" viewBox="...">` tag in the replacement, not just the inner content.

---

### 49. Large DS SVG exports — split `exportAsync` output when it exceeds ~18KB

Some subject icons (Geography globe at ~18.8KB, KAFA at ~8KB) produce SVG strings that exceed the Figma plugin tool output limit (~20KB). The export still succeeds but the returned string is truncated.

**Workaround:** Request the SVG length first, then retrieve in two halves:
```js
const svg = await iconInst.exportAsync({ format: 'SVG_STRING' });
const mid = Math.floor(svg.length / 2);
return { total: svg.length, part1: svg.substring(0, mid), part2: svg.substring(mid) };
```

Concatenate `part1 + part2` to reconstruct the full SVG. The midpoint split may land mid-coordinate in a path `d` attribute — SVG path data is whitespace-tolerant and the concatenated number will parse correctly (e.g. `17.75` | `38 15.0193` → `17.7538 15.0193`).

**Subjects known to be large:** Geography (~18.8KB), KAFA (~8KB). All others are under 5KB.

---

### 50. Subject Badge DS component IDs — confirmed (May 2026)

Component set IDs on `⚙️ Badges` page for direct lookup via `badgesPage.findOne(n => n.id === '<id>')`:

| Subject | Component Set ID |
|---|---|
| RBT | `3283:85760` |
| KAFA | `3283:85852` |
| History | `3302:67103` |
| English | `3302:67112` |
| Biology | `3302:67121` |
| Physics | `3302:67217` |
| Science | `3302:67235` |
| Account | `3302:67244` |
| Business | `3309:67505` |
| Economy | `3309:67514` |
| Add-Math | `3309:67526` |
| Chemistry | `3309:67537` |
| Geography | `3309:67546` |
| Math | `3309:67555` |
| Moral | `3309:67564` |
| Islamic | `3309:67573` |
| BMelayu | `3309:67585` |
| Comp-Science | `3309:67594` |
| Chinese-Lang | `3309:67603` |

---

### 51. DS component drift check — always re-inspect live DS before assuming specs are stable

Component dimensions, padding, and token bindings in the DS can change between sessions. Never assume a previously-confirmed spec is still current. Before touching any component in a new session, re-run `use_figma` on the live node to catch drift.

**Confirmed drift (May 2026 — Footer):**
- Old confirmed spec: height 60px, `paddingTop/Bottom: 20` (`Spacing/space-l`)
- New DS state: height **44px**, `paddingTop/Bottom: 12` (`Spacing/space-s`)
- Impact: prototype `body { padding-bottom }` also wrong — must track all downstream effects

**Drift check workflow:**
```
1. use_figma → inspect the live node (not from CLAUDE.md or memory)
2. Compare height, padding, fills, strokes, children vs. current HTML/CSS
3. For every changed property, find ALL places in the prototype it affects
4. Update CSS + comments + zul.design.md spec table in one pass
```

**Downstream effects to check whenever footer height changes:**
- `.footer__inner { height }` — direct height
- `body { padding-bottom }` — must equal footer height + 30px DS gap
- Mobile `body { padding-bottom }` — based on stacked height, recalculate if padding changed
- Any CSS comment referencing the old height value

---

### 52. `strokeTopWeight` / `strokeBottomWeight` etc. — check individual sides for partial borders

In the Figma Plugin API, `strokeWeight` is the uniform weight. To check whether a stroke applies to all 4 sides or only specific sides, read the individual properties:

```js
node.strokeTopWeight    // top border weight (px)
node.strokeRightWeight  // right border weight
node.strokeBottomWeight // bottom border weight
node.strokeLeftWeight   // left border weight
```

**Footer confirmed (May 2026):** `strokeTopWeight: 1`, all others `0` — confirms top-only border. `strokeWeight` alone would return `1` but wouldn't reveal that right/bottom/left are 0.

**Rule:** When implementing a partial border (e.g. top-only), always confirm via `strokeTopWeight` etc. before using `border-top` in CSS. A node with `strokeWeight: 1` and `strokeAlign: INSIDE` could be top-only OR all-sides — only the individual weights tell you which.

---

### 53. `boundVariables` on a node — use this to confirm exactly which Semantic token binds to each property

`node.boundVariables` maps CSS-equivalent property names to `VariableID` objects. This is the authoritative way to confirm which Semantic token drives a given property — more reliable than reading the fills/strokes color values and guessing the token name.

**Confirmed Footer example (May 2026):**
```js
variant.boundVariables = {
  paddingLeft:   { type: 'VARIABLE_ALIAS', id: 'VariableID:90:318' },  // Spacing/space-2xl = 28px
  paddingTop:    { type: 'VARIABLE_ALIAS', id: 'VariableID:90:305' },  // Spacing/space-s = 12px
  paddingRight:  { type: 'VARIABLE_ALIAS', id: 'VariableID:90:318' },  // Spacing/space-2xl = 28px
  paddingBottom: { type: 'VARIABLE_ALIAS', id: 'VariableID:90:305' },  // Spacing/space-s = 12px
  fills:   [{ type: 'VARIABLE_ALIAS', id: 'VariableID:123:10' }],      // Surface/general/default
  strokes: [{ type: 'VARIABLE_ALIAS', id: 'VariableID:124:59' }],      // Border/default = #00cc85
}
```

**Rule:** When you see a raw px or hex value on a DS node, always check `boundVariables` first to get the Semantic token name. If the property is missing from `boundVariables`, the value is hardcoded — treat it as a raw design decision, not a token.

---

### 54. Fixed height in CSS is fragile when DS padding changes — prefer padding-driven height

The prototype used `height: 60px` (hardcoded) for `.footer__inner` with no explicit vertical padding. When the DS changed `paddingTop/Bottom` from 20px → 12px, the CSS height needed a manual update.

**More resilient pattern — let padding drive the height:**
```css
.footer__inner {
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         var(--spacing-space-s) var(--spacing-space-2xl); /* 12px 28px — DS bound tokens */
}
```

This auto-sizes to `padding-top + content-height + padding-bottom`. If the DS changes the padding token, the CSS inherits the new height without a manual fix — as long as the token variable value is updated.

**Trade-off:** `height: Xpx` is explicit and easy to audit visually. `padding`-driven height requires knowing what content height contributes. For single-row bars (navbar, footer) where content height is fixed (20px text), padding-driven is safer.

**Confirmed instance (May 2026):** Footer text is 20px (line-height). With `padding: 12px 28px`, total height = 12 + 20 + 12 = **44px** — matches DS exactly, and will automatically update if `--spacing-space-s` ever changes.

---

---

### 55. Inspect DS page instances, not component defaults — `componentProperties` is the source of truth

A component's default variant properties (e.g. Secondary/M has `showRArrow: true` by default) are NOT what matters. What matters is what the specific INSTANCE on the page has overridden. Always call `inst.componentProperties` on the actual page instance.

**Workflow to find all button configs on a specific screen:**
```js
// Find the correct screen frame first
const pandai = screenPage.children.find(n => n.name === 'Pandai Student');
const homeFrame = pandai.children.find(n => n.id === '3088:61197');

// Find all Button-1.5 instances by component set ID (473:529)
const btns = homeFrame.findAll(n => {
  if (n.type !== 'INSTANCE') return false;
  return n.mainComponent?.parent?.id === '473:529';
});

// Read instance-level overrides
btns.forEach(inst => {
  const p = inst.componentProperties;
  console.log(p.Variants?.value, p.Size?.value,
    'icon:', p['Show Leading Icon#1437:0']?.value,
    'Rarrow:', p['Show R Arrow#473:6']?.value,
    'label:', p['↳ Label#473:4']?.value);
});
```

**Confirmed home screen button configs (DS frame 3088:61197, May 2026):**

| Usage | Variant/Size | showLeadingIcon | showLArrow | showRArrow | Label |
|---|---|---|---|---|---|
| Quiz card CTA | Primary/S | false | false | **true** | "Button" |
| Check-in card | Primary/M | false | false | **true** | "View your report card now!" |
| Add Classes | Secondary/M | **true** | false | **false** | "Add Classes" |

**Key insight:** Secondary/M "Add Classes" has `showRArrow: false` (instance override). The component default has the arrow visible — but this page's instance explicitly hides it.

---

### 56. Never share a CSS class between button instances with different `showRArrow` configs

If two buttons use the same CSS class but one has `showRArrow: true` and the other has `showRArrow: false`, removing the arrow CSS (to match the false-instance) silently breaks the true-instance.

**Confirmed mistake (May 2026):**
- "Add Classes" (Secondary/M, `showRArrow: false`) and "View Activity History" (Secondary/M, `showRArrow: true`) both used `.btn-add-classes`
- Removing arrow CSS from `.btn-add-classes` broke "View Activity History" — the `ic-chevron-btn-m` SVG rendered at full size with no containment
- Fix: gave "View Activity History" its own class `.btn-secondary-arrow` with full arrow specs

**Rule:** Each unique DS instance configuration needs its own CSS class. Two buttons that share a variant but differ in `showRArrow`, `showLeadingIcon`, or any boolean property must have separate classes. Never assume two buttons with the same Figma component type have the same HTML structure.

---

### 57. Always get a DS screenshot before inserting a new section — confirm position and order

When adding a section derived from the DS to the prototype, take a `get_screenshot` of the home frame FIRST to confirm:
1. Where the section appears in the vertical flow
2. What sections come before and after it

**Confirmed mistake (May 2026):** Added the Stats Card section between Welcome and Carousel — but the DS frame shows Welcome → **Carousel** → Stats Card. The wrong insertion order pushed the Carousel to position #3, breaking the page flow. A single screenshot before inserting would have prevented this.

**DS home+footer frame (`3088:61197`) — confirmed section order (May 2026):**
```
1. Welcome (status badges + check-in card)
2. Carousel - 1.5
3. Static News Cards  [prototype-only, not in DS]
4. Your Selected Subjects (18 quiz cards)
5. Your Recent Activities (3 quiz cards)
```

The Stats Card (two pastel panels with Primary/M CTAs) appears in the DS after the Carousel but was rejected by the user — do not add it again without explicit instruction.

---

### 58. `componentProperties` boolean key format — exact strings required

Component property keys in Figma include the internal node ID suffix (e.g. `#1437:0`). These exact strings must be used when reading instance overrides via `inst.componentProperties`.

**Confirmed Button - 1.5 property keys (May 2026):**

| Property | Key string | Type |
|---|---|---|
| Show Leading Icon | `'Show Leading Icon#1437:0'` | BOOLEAN |
| Show Label | `'Show Label#643:3'` | BOOLEAN |
| Show L Arrow | `'Show L Arrow#2086:18'` | BOOLEAN |
| Show R Arrow | `'Show R Arrow#473:6'` | BOOLEAN |
| Label text | `'↳ Label#473:4'` | TEXT |
| Leading icon swap | `'↳ Leading Icon#1437:25'` | INSTANCE_SWAP |
| Right icon swap | `'↳ Right Icon#2783:0'` | INSTANCE_SWAP |
| Variant | `'Variants'` | VARIANT |
| Size | `'Size'` | VARIANT |
| State | `'State'` | VARIANT |
| Type | `'Type'` | VARIANT |

**Button - 1.5 component set ID:** `473:529` — use `mc?.parent?.id === '473:529'` to reliably identify Button-1.5 instances across all pages.

---

### 59. Prototype home screen — confirmed section inventory (May 2026)

Current sections in `zul.test.git/zul.home.screen.html` in visual order:

| Position | Section ID | Content |
|---|---|---|
| #1 | `Welcome-Desktop` | Status badges · Welcome text · Check-in card |
| 2 | `Carousel-Desktop` | Featured carousel — 5 image cards (428×186px) |
| 3 | `StaticNewsCard-Desktop` | 2 side-by-side promo static cards |
| 4 | `YourSelectedSubjects-Desktop` | 18 quiz cards (3-col grid) · Modify List button |
| 5 | `YourRecentActivities-Desktop` | 3 quiz cards · View Activity History button |
| Fixed bottom | `footer.footer` | Copyright · Heart · Pandai.org |

**Section classes:** Sections 4 and 5 share `.section-frame` (green border card). Sections 2 and 3 are full-width sections with their own CSS. Section 1 is `.section-welcome` (flex row).

---

### 60. CSS comment integrity — a missing `/*` silently discards the next CSS rule

When a `/* ════...════` opener line is deleted (e.g. by a bulk script removing box-drawing characters) but the closing `════...════ */` line remains, the CSS parser treats the orphaned comment text + the following CSS rule selector as one long **invalid selector**. The rule block is silently discarded — no error, no warning.

**How it happened (May 2026):** A PowerShell script removed lines containing box-drawing chars (╔═ etc.). It deleted the `/*` opener but left `MAIN CONTENT` + `═══...═══ */` behind. The parser read `MAIN CONTENT ═══...═══ */ .main-content` as one selector → `.main-content { gap: 16px }` never applied → inter-section gap was broken across multiple debug sessions.

**Fix:** Scan for orphaned closers after any bulk line-delete:
```powershell
Select-String -Path file.html -Pattern "^\s*[^/].*\*/$"
```
Then prepend `/*` to the line before the orphaned text. Example: `   MAIN CONTENT` → `   /* MAIN CONTENT`.

**Mistake made:** User reported "still no gap" across multiple rounds. Root cause was the broken comment silently killing the CSS rule — not the gap value itself.

---

### 61. Mandatory session workflow — read DS & zul.design.md BEFORE any change

**Before starting any design work, making any change, or making any decision — including seemingly trivial fixes:**

```
0a. Read design-md/zul.design.md   → session rules, confirmed specs, section inventory
0b. Refer to DS (TLVKe3bgJTdVvuPAzgDq2f) → single source of truth for all values
1.  search_design_system            → confirm component exists, get component key
2.  get_design_context              → token bindings, dimensions, structure per variant
3.  get_variable_defs               → confirm Semantic token names on the node
4.  Implement                       → DS values only, no assumptions
5.  Validate                        → compare against get_screenshot
```

**This is non-negotiable.** Steps 0a and 0b are mandatory even for "small" changes — spacing tweaks, token lookups, responsive overrides. No guessing, no skipping DS lookup, no implementing from memory alone. zul.design.md holds confirmed specs from past sessions; always load it first to avoid re-learning already-solved problems.

**Why this matters — confirmed May 2026:** The Status Badge - 1.5 DS structure changed on 2026-05-14 (Streak/Lives/Ruby L layout unified, content gap changed 8px→4px, sizes updated). Two sessions in a row produced "looks a bit off" because the live DS was not re-inspected before implementing. Always re-verify — component specs can change between sessions.

---

### 62. Minimum page width — set `min-width: 390px` on BOTH `html` AND `body`

The DS mobile frame is **390px** wide (DS Responsives collection, Mobile mode). The prototype must never render narrower than this.

**Rule:** Always set `min-width: 390px` on **both** `html` and `body`. Setting it on `body` alone is not sufficient — the `html` root element can still shrink below the body's minimum, and the scrollbar clamp may not trigger correctly in all browsers.

```css
html      { min-width: 390px; }
body      { min-width: 390px; ... }
```

When the viewport is narrowed below 390px, the browser shows a horizontal scrollbar — the page content does not reflow or collapse below the DS minimum.

**Mistake made (May 2026):** `body { min-width: 400px }` was set but `html` had no `min-width`. Two errors: (1) 400px is not the DS value — correct is **390px**; (2) missing `html` rule meant the clamp didn't hold in all browsers.

---

### 63. Flex row cards — use `flex: 1; min-width: Xpx` not `width: Xpx; flex-shrink: 0`

A hardcoded `width` + `flex-shrink: 0` on a card in a flex row locks it to a fixed size at all viewports. It cannot adapt when the row gets wider or narrower — it either overflows or leaves dead space.

**Rule:** Cards that should fill available space in a flex row must use `flex: 1; min-width: Xpx`. This lets the card grow to fill space alongside siblings, while `min-width` sets a floor so it never collapses to nothing.

```css
/* Wrong — fixed, never adapts */
.check-in-card { width: 350px; flex-shrink: 0; }

/* Correct — fills space, floors at 150px */
.check-in-card { flex: 1; min-width: 150px; }
```

The tablet/mobile `width: 100%` override remains intact — when the section switches to `flex-direction: column`, `width: 100%` takes over and `flex: 1` has no effect in the cross-axis.

**Mistake made (May 2026):** `.check-in-card` had `width: 350px; flex-shrink: 0` — fixed size that couldn't fill the section width. Corrected to `flex: 1; min-width: 150px`.

---

### 64. Navbar Primary Desktop — logo is a clip container, not a flex row

The Pandai logo (`Logo/Pandai/Logo Horizontal`, node `1898:6965`) is a **116×28px `overflow:hidden` container** with two absolutely positioned children. Never implement it as a flex row of two `<img>` tags.

**Confirmed DS structure (May 2026):**
- Container: `width:116px; height:28px; overflow:hidden; position:relative; flex-shrink:0`
- Mark child (`inset-[0_76.95%_0_0]`): `position:absolute; left:0; top:0; bottom:0; width:26.86px`
- Wordmark child (`inset-[15.07%_0_15.03%_26.66%]`): `position:absolute; left:30.93px; top:4.22px; right:0; bottom:4.21px`

```css
.navbar-primary__logo         { width:116px; height:28px; overflow:hidden; position:relative; flex-shrink:0; display:block; }
.navbar-primary__logo-mark    { position:absolute; left:0; top:0; bottom:0; width:26.86px; }
.navbar-primary__logo-mark img{ display:block; width:100%; height:100%; }
.navbar-primary__logo-text    { position:absolute; left:30.93px; top:4.22px; right:0; bottom:4.21px; }
.navbar-primary__logo-text img{ display:block; width:100%; height:100%; }
```

**Mistake made (May 2026):** Logo was implemented as `<a>` with `display:flex; gap:8px` and two `<img>` tags side by side. This produced the wrong gap (~8px vs DS ~4px), wrong text height (18px vs DS 19.57px), and wrong total width (~113px vs DS 116px).

---

### 65. Navbar Primary Desktop — Avatar group structure (node 1084:1836)

The actions group (right side of Navbar Primary) has a specific three-level structure that must be followed exactly. The badge is a **sibling of the avatar**, not a child of an avatar-wrapper div.

**Confirmed DS structure:**
```
Avatar group: flex: 1 0 0 · gap:16px · align-items:center · justify-content:flex-end · position:relative · min-width:1px
  ├── Row wrap: display:flex · align-self:stretch · align-items:center   ← intermediate wrapper
  │   └── Top Icons: display:flex · gap:8px · height:100% · align-items:center · justify-content:flex-end · flex-shrink:0
  │       └── 6 × Nav Button - Parts
  ├── Avatar (flex-shrink:0)
  └── Badge (position:absolute · right:-0.48px · top:0)   ← sibling of avatar, within group
```

**Key rules:**
- Actions group uses `flex: 1 0 0; justify-content: flex-end` — fills remaining bar width, pushes content right. NOT `flex-shrink:0` with `space-between` on parent.
- An intermediate `self-stretch` wrapper div sits between the actions group and the icons row.
- Icons row has `height: 100%` (matches the 48px avatar height).
- Badge `right: -0.48px` is relative to the actions group (which is `position:relative`), not a separate avatar-wrap div.

**Mistake made (May 2026):** Used `justify-content:space-between` on the parent bar + `flex-shrink:0` on the actions group. Missing the intermediate row-wrap. Badge inside a separate `.navbar-primary__avatar-wrap` div instead of directly in the actions group.

---

### 66. Nav Button - Parts — Hover and Pressed both have a 1px border

Default state has NO border. All three non-default visible states have a `1px solid` border that changes color.

**Confirmed DS tokens (node `3427:63111`, May 2026):**

| State | Background | Border | Icon |
|---|---|---|---|
| Default | `Surface/general/default` `#ffffff` | none | `Icon/default/default` `#808080` |
| Hover | `Surface/secondary/default-subtle` `#e8fbe8` | 1px `Icon/primary/default` `#00cc85` | `Icon/primary/default` `#00cc85` |
| Pressed | `Surface/tertiary/default` `#00564c` | 1px `Icon/primary/default` `#00cc85` | `Icon/primary/default` `#00cc85` |
| Active | `Surface/primary/default` `#00cc85` | 1px `Icon/primary/focus` `#00a36a` (INSIDE, 1px) | `Icon/primary/on-color` `#f6fdfb` |

Always use `box-shadow: inset 0 0 0 1px <color>` for the border — never `border: 1px solid` — to avoid layout shift when the border appears/disappears on state change.

```css
.navbar-action-btn:hover  { background: #e8fbe8; box-shadow: inset 0 0 0 1px #00cc85; color: #00cc85; }
.navbar-action-btn:active { background: #00564c; box-shadow: inset 0 0 0 1px #00cc85; color: #00cc85; }
.navbar-action-btn.is-active { background: #00cc85; box-shadow: inset 0 0 0 1px #00a36a; color: #f6fdfb; }
```

**Mistake made (May 2026):** Hover and Pressed states were implemented with only background/icon color change — no border. DS clearly shows all three non-default states with a 1px border visible in the screenshot.

---

### 67. `get_design_context` gives approximate values — always verify exact px with `use_figma`

`get_design_context` returns React+Tailwind code derived from Figma's CSS percentage calculations. These are approximations that can differ from the actual Figma node pixel measurements.

**Rule:** When exact pixel dimensions are critical (image positioning, clip containers, fixed-size elements), always verify with `use_figma` node inspection:
```js
const node = page.findOne(n => n.id === 'NODE_ID');
return { w: node.width, h: node.height, x: node.x, y: node.y };
```

**Confirmed example — Avatar image child (node `684:622`, May 2026):**
- `get_design_context` showed: `left:[-7px] right:[-7px] top:[-1px]` + `aspect-[24/24]` → implies 62×62px
- `use_figma` actual: `w:60, h:60, x:-6, y:0` → **60×60px at x:-6, y:0**
- CSS diff: `left:-6px` (not -7px), `top:0` (not -1px), no `aspect-ratio` needed, explicit `width:60px; height:60px`

The `get_design_context` percentage-based insets rounded differently from actual node coordinates. Always trust `use_figma` over `get_design_context` for exact positioning values.

---

### 68. Avatar - 1.5 Type=Image — use `<img>` not SVG, exact DS dimensions from `use_figma`

The `Type=Image` variant of Avatar - 1.5 contains an **IMAGE fill** child, not an SVG icon. Always implement it with an `<img>` element.

**Confirmed DS specs — Size=L Type=Image (node `684:621`, May 2026):**

Container:
- `display:flex; align-items:flex-start` (NOT `align-items:center`)
- `width:48px; height:48px; border-radius:60px; border:1px solid #00cc85; overflow:hidden; position:relative`

Image child (node `684:622`):
- Fill type: `IMAGE` with `scaleMode: FILL`
- Dimensions: `width:60px; height:60px`
- Position: `x:-6, y:0` relative to container

```css
.navbar-avatar {
  display: flex; align-items: flex-start;
  width: 48px; height: 48px;
  border-radius: 60px; border: 1px solid var(--border-default);
  overflow: hidden; position: relative; flex-shrink: 0;
}
.navbar-avatar__image {
  position: absolute; left: -6px; top: 0;
  width: 60px; height: 60px;
  object-fit: cover; pointer-events: none;
  display: block; max-width: none;
}
```

```html
<div class="navbar-avatar">
  <img class="navbar-avatar__image" src="icons/avatar-user.png" alt="User avatar">
</div>
```

**Mistakes made (May 2026):**
- Used `<div>` + SVG `<use href="#ic-user">` instead of `<img>` — wrong element for Image variant.
- `bottom:0` constraint compressed the image to 49px tall instead of the correct 60px.
- Used `aspect-ratio:1` from design context instead of explicit `width:60px; height:60px` from `use_figma`.
- Used `left:-7px; top:-1px` (design context approximation) instead of `left:-6px; top:0` (actual Figma node).

---

### 69. Section wrapper vs component internal padding — never mix page-level offset into the component

Page-level horizontal alignment (the `var(--page-padding-x)` offset from the viewport edge) belongs on the **section wrapper**, not inside the component bar itself. The component bar keeps only its DS-specified internal padding.

**Rule:**
```css
/* Section wrapper — provides page-level horizontal margin */
#NavbarPrimary-Desktop { padding: 0 var(--page-padding-x); }
#NavTopMenu-Desktop    { padding: 0 var(--page-padding-x); }
#NavBar-Mobile         { padding: 0 var(--page-padding-x); }

/* Component bar — keeps only DS internal padding, untouched */
.navbar-primary  { padding: var(--spacing-space-xs) var(--spacing-space-xl); }  /* 8px 24px — DS spec */
.navbar-mobile   { padding: var(--spacing-space-m)  24px; }                     /* 16px 24px — DS spec */
```

**Why this separation matters:**
- The component's internal padding is a DS design decision (how much breathing room inside the bar).
- The page-level offset is a layout decision (where the bar sits relative to the viewport).
- Mixing both into the component's `padding` makes it impossible to change one without affecting the other, and causes the component to render differently if placed in a different context.

**All three navbar sections apply this pattern (May 2026):**

| Section | Shown at | Section `padding` | Bar internal `padding` |
|---|---|---|---|
| `#NavbarPrimary-Desktop` | ≥ 1320px | `0 var(--page-padding-x)` = **60px** | `8px 24px` (DS `Spacing/space-xl`) |
| `#NavTopMenu-Desktop` | ≥ 1320px | `0 var(--page-padding-x)` = **60px** | `8px` internal (DS pill padding) |
| `#NavBar-Mobile` | ≤ 1319px | `0 var(--page-padding-x)` = **60→32→16px** | `16px 24px` (DS `Spacing/space-m`/`space-xl`) |

The mobile navbar section uses `var(--page-padding-x)` so it automatically scales with the responsive system: 60px when it first appears (1280–1319px), 32px at tablet (≤1279px), 16px at mobile (≤767px).

**Mistake made (May 2026):**
- `.navbar-primary` had `padding: 8px var(--page-padding-x)` — 60px baked into the component bar.
- `#NavbarPrimary-Desktop` section had no padding.
- Result: changing `--page-padding-x` would have changed DS component proportions, and the bar visually showed no offset from the viewport edges (the bar border was edge-to-edge with no grey margin visible).
- Fix: move the 60px to the section, restore DS `24px` inside the bar.

---

### 70. Repeated SVG icons — define once as `<symbol>`, reference with `<use>`

Any SVG that appears more than once in the HTML — including colored multi-path icons like subject badges — should be defined as a `<symbol>` in the `<defs>` block and referenced everywhere via `<use href="#id">`. Inlining the same SVG repeatedly inflates the file and creates drift risk if the icon ever changes.

**Rule:** Every SVG icon with more than one occurrence belongs in `<defs>` as a `<symbol>`. This applies to both stroke icons (nav icons, action icons) and fill icons (subject badge icons, badge pointers).

**`<symbol>` vs inline SVG — decision:**

| Case | Pattern |
|---|---|
| Icon appears once | Inline SVG is fine |
| Icon appears 2+ times | `<symbol>` + `<use>` |
| Icon has gradients | Keep gradient `<defs>` inside the symbol — self-contained |
| Icon has `<clipPath>` = its viewBox | Strip the clipPath — symbol viewport clips identically |

**ClipPath stripping — safe when clipPath == viewBox bounds:**
Figma exports SVGs with `<g clip-path="url(#clip...)"><...paths...></g><defs><clipPath id="clip..."><rect width="W" height="H"/></clipPath></defs>`. When the clipPath is just a rectangle matching the viewBox dimensions, it is redundant — the `<symbol>` viewport clips content to those bounds automatically. Strip both the `<g clip-path>` wrapper and the `<defs><clipPath>` block.

**Gradient defs inside symbols — self-containment pattern:**
If an SVG has gradient fills, keep the gradient `<linearGradient>`/`<radialGradient>` definitions inside the symbol (as nested `<defs>`), NOT the clipPath. Rename IDs to avoid global collisions (e.g. `subj-kafa-grad-0` instead of `paint0_linear_3283_85130`). Modern browsers resolve `url(#...)` references inside `<use>` shadow DOM to the host document — the gradient inside the symbol is accessible.

```html
<!-- Self-contained symbol with gradients -->
<symbol id="ic-subj-kafa" viewBox="0 0 24.32 24">
  <defs>
    <linearGradient id="subj-kafa-grad-0" x1="..." gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFC664"/><stop offset="1" stop-color="#FFEBA6"/>
    </linearGradient>
    <!-- more gradients... -->
  </defs>
  <!-- paths referencing url(#subj-kafa-grad-0) -->
</symbol>

<!-- Usage — as many times as needed, zero duplication -->
<svg width="25" height="24" viewBox="0 0 24.32 24" aria-hidden="true">
  <use href="#ic-subj-kafa"/>
</svg>
```

**Implementation results — subject badge optimization (May 2026):**
- 18 subject icon SVGs + 1 badge pointer → 19 `<symbol>` definitions
- 21 inline icon SVGs + 21 inline pointer SVGs → 42 `<use>` references
- Saved **10,494 bytes** (237,602 → 227,108 bytes, −4.4%) with no visual change
- KAFA's 3 linear gradients kept inside its symbol with renamed IDs
- All redundant `<clipPath>` wrappers removed

**Mistake avoided:** Considered putting gradient defs in the top-level defs (outside the symbol). Self-containment inside the symbol is cleaner — the symbol carries everything it needs, and moving it doesn't break gradient references.

---

### 71. NavTopMenu pill container — `align-items: center` and explicit button backgrounds

**DS node:** `3406:789` (Type=Desktop variant) — NOT `3406:788` (that is the component set frame).

The "Navbar Content" pill (inner node `3406:802`) has two properties that must be set exactly:

1. **`align-items: center`** — The DS specifies `items-center` on the pill container. Using `flex-start` is a spec deviation even when buttons happen to equal the inner height (40px in 40px). Always use `center` to remain correct as content changes.

2. **Explicit `background: var(--surface-general-default)` on each button** — The DS has `bg-[var(--surface/general/default,white)]` on every individual button (`Button - 1.5` instance inside the pill). Without it, hover transitions start from an inherited (not explicit) white — which works visually today but can break if the pill's background ever changes.

**Confirmed CSS (May 2026):**
```css
.navbar-nav-menu {
  align-items: center;   /* DS items-center on "Navbar Content" 3406:802 — was wrongly flex-start */
}
.nav-menu-btn__inner {
  background: var(--surface-general-default);   /* DS bg-white on each button — explicit, not inherited */
}
```

**DS component structure — NavTopMenu Desktop 1.5 (3406:789):**
```
[outer wrapper: max-w-1440px, w-1288px, no border]
  [Navbar Content 3406:802: h-56px, p-8px, border green 1px, radius-999px, bg-white, items-center]
    [Content 3406:803: flex row, gap-8px, items-center, shrink-0]
      [9× Button-1.5: bg-white, py-8px px-12px, radius-60px]
        [inner: flex row, gap-0, items-center, min-h-24px]
          [icon-wrap: 24×24 flex center]
            [icon-clip: 20×20, overflow-hidden, NO clip padding — natural margins in 20×20 paths]
          [text: 14px SemiBold #666, px-8px]
          [chevron-clip: 16×16, inset 37.5%/25%] ← only for Class, Learn, Achievement, Potential, Rewards
```

**Mistake corrected (May 2026):**
- HTML comment said "DS node 3406:788" — correct node is `3406:789`. `3406:788` is the component set frame; `3406:789` is the Desktop variant that was implemented.
- `.navbar-nav-menu { align-items: flex-start }` — should be `center` per DS `items-center` on the pill container.
- `.nav-menu-btn__inner` had no `background` — DS specifies explicit white on every button.

---

---

### 72. Icon-in-clip rendering — viewBox must equal clip container size; use `exportAsync`, not inset percentages

When an icon renders inside a CSS clip container (`overflow: hidden`), the SVG `viewBox` must match the clip's CSS dimensions. The correct paths come from `exportAsync({ format: 'SVG_STRING' })` on the icon INSTANCE within the DS component — not from the Iconography page.

**The rule:**
- Clip is 20×20 → `viewBox="0 0 20 20"` → no CSS padding on clip
- Clip is 24×24 (action icons, no clip container) → `viewBox="-1 -1 26 26"` with translated paths

**Why viewBox must match clip size:**
When `viewBox="0 0 24 24"` is used in a 20×20 CSS box, the browser scales the 24×24 coordinate space to fit 20×20 — every icon renders at 83.3% of its intended size. Strokes appear thinner, shapes appear smaller. The user will notice immediately when comparing side-by-side with DS.

**Why NO clip padding:**
DS icon instances exported via `exportAsync` already have natural margins baked into the path coordinates within their viewBox. Adding CSS `padding` on the clip container crops the already-margined icon a second time, making icons even smaller.

**Confirmed — NavTopMenu DS component (3406:802, May 2026):**
- All 9 icon instances export at `viewBox="0 0 20 20"`
- Natural margins in paths: home ≈ 2.5px L/R, 1.67px T/B; star ≈ 1.67px all; etc.
- CSS clip padding = 0 on all buttons
- Correct symbol format: `<symbol id="ic-home" viewBox="0 0 20 20" ...><path d="M7.5 18.33..."/></symbol>`

**Workflow:**
```js
// 1. Find the component using the icon
const page = figma.root.children.find(p => p.name === '⚙️ Menu Bar');
await figma.setCurrentPageAsync(page);
const container = page.findOne(n => n.id === '3406:802');

// 2. Export the icon INSTANCE (not the component frame from Iconography)
const iconInst = container.findOne(n => n.id === 'I3406:804;538:2070');
const svg = await iconInst.exportAsync({ format: 'SVG_STRING' });
// svg now contains <svg width="20" height="20" viewBox="0 0 20 20" ...>

// 3. Extract: viewBox → use as symbol viewBox; path data → use as symbol path
// 4. Strip any <g clip-path> wrapper if the clipPath rect matches the viewBox (redundant)
```

**Mistake corrected (May 2026):** NavTopMenu icons had `viewBox="0 0 24 24"` with CSS per-icon padding. Both were wrong. All 9 symbols were re-exported from DS instances, updated to `viewBox="0 0 20 20"`, and all clip padding CSS rules were removed.

**See also Rule 76** — the failure mode when `padding` on clip AND a tight-path `viewBox` are both present (stroke collapses). The NavTopMenu chevron-down (16×16 clip) was a concrete instance of this.

---

### 73. Company logo — constrain by height only, never fix both dimensions

A company logo must **never** have both `width` and `height` fixed in CSS. Set height only; width is determined automatically by the SVG's intrinsic aspect ratio from its `viewBox`. This keeps the logo undistorted, consistent across all breakpoints, and requires zero maintenance if the height ever changes.

**The rule:**
```css
/* WRONG — both dimensions hardcoded, fragile and context-dependent */
.logo-mark { width: 26.86px; height: 28px; }
.logo-text { width: 85.07px; height: 18px; }

/* CORRECT — height constrains, width flows from SVG viewBox aspect ratio */
.logo-mark { display: block; height: 28px;     width: auto; }
.logo-text { display: block; height: 19.573px; width: auto; }
```

**The correct logo container pattern** (flex row — same for desktop and mobile):
```css
.logo {
  display:     flex;
  align-items: center;
  gap:         4.2px;   /* DS gap: mark right edge → wordmark left edge */
  height:      28px;    /* single controlled dimension */
  flex-shrink: 0;
}
```

**Never use absolute positioning** to assemble the mark + wordmark. Absolute-positioned children require fixed pixel widths (which break proportions) and a fixed container width (which must be kept in sync manually). The flex approach is self-consistent: each `<img>` sizes itself from its SVG's intrinsic ratio.

**Same pattern everywhere.** Every navbar — desktop, mobile, tablet, any future breakpoint — must use the identical logo CSS. Only the `height` value ever changes (if the DS specifies a smaller logo for mobile). Never maintain two different logo implementations.

**DS-confirmed logo node `1898:6965` specs (May 2026):**

| Part | DS dimensions | CSS rule |
|---|---|---|
| Mark (Group) | `26.851 × 28px` | `height: 28px; width: auto` |
| Wordmark (Vector) | `85.424 × 19.573px` | `height: 19.573px; width: auto` |
| Gap (mark → wordmark) | `31.055 − 26.851 = 4.204px` | `gap: 4.2px` on flex container |
| Total logo | `116.479 × 28px` | flows from content, not hardcoded |
| Wordmark color | `Surface/general/pandai-logo` | `#444A56` in Light mode |

**What was wrong (May 2026):**
- Desktop logo: absolutely-positioned `<div>` wrappers around each `<img>`, with `width: 116px; height: 28px` on the container. The container width was rounded (116 vs DS 116.479px), shifting the wordmark left 0.12px and making the wordmark container 0.35px too narrow.
- Mobile logo: flex row but `gap: 8px` (DS is 4.2px) and `height: 18px` on wordmark (DS is 19.573px — slightly squished text).
- Both implementations were inconsistent with each other despite rendering the same logo.

**Mistake made:** Logo width was derived by rounding the DS node's `116.479px` to `116px`, then using that rounded base to compute percentage-based offsets — compounding the rounding error. The correct approach never needs the total logo width at all.

---

### 74. Status Badge - 1.5 — full confirmed specs (DS updated 2026-05-14, node 2312:10653)

The DS was updated on **2026-05-14** — all 5 badge types (Score, Coins, Streak, Lives, Ruby) now share **identical layout structure** for both L and M sizes. Old notes about Streak/Lives/Ruby L having a separate right-side icon container (w:122px) are **obsolete**.

**Always use `min-width`, never `max-width`.** This was the source of the "looks a bit off" issue — badges collapsed narrower than intended when `max-width` was used.

#### L size (desktop + tablet)

| Property | Value | DS token |
|---|---|---|
| Height | `48px; min-height: 48px` | — |
| Min-width | **`115px`** | — |
| Pill padding | `8px all` | `Spacing/space-xs` |
| Border-radius | `40.5px` | — |
| Content `padding-left` | `8px` | `Spacing/space-xs` |
| Content `padding-right` | `2px` | `Spacing/component/3xs` |
| Content `gap` | **`4px`** | `Spacing/space-xxs` |
| Icon circle size | **`32 × 32px`** | pill(48) − py-pad(16) = 32 |
| Icon circle `padding` | `4px all` | `Spacing/component/2xs` |
| Label | visible — 10px/600 SemiBold | `Body/B7` |
| Value | 16px/700 Bold, lh:24px | `Title/T3` |

#### M size (mobile ≤767px)

| Property | Value | DS token |
|---|---|---|
| Height | `32px; max-height: 32px` | — |
| Min-width | **`89px`** | — |
| Pill padding | `4px 2px 4px 4px` | `Spacing/space-xxs` / `Spacing/component/3xs` |
| Border-radius | `40.5px` | — |
| Content `padding-left` | `8px` | `Spacing/space-xs` |
| Content `padding-right` | `2px` | `Spacing/component/3xs` |
| Content `gap` | `4px` | `Spacing/space-xxs` |
| Icon circle size | **`24 × 24px`** | fixed |
| Icon circle `padding` | `pt:4 pr:2 pb:4 pl:2` | — |
| Label | **`display: none`** — `visible:false` in DS | — |
| Value | **14px/600 SemiBold**, lh:20px | `Body/B1` |

**Content gap is 4px at BOTH sizes** — not 8px. Old implementation had `gap: 8px` (Spacing/space-xs) which was wrong.

**Coins badge: text stroke applies to M value too.** DS node `3752:4050` (Coins M value) has `stroke: #cba500, weight:1, OUTSIDE`. Same CSS rule as L:
```css
.status-pill--coins .status-pill__value {
  -webkit-text-stroke: 2px #cba500;
  paint-order:         stroke fill;
}
```

**Icon img CSS — use `100%/100%` not fixed px:**
```css
.status-pill__icon img { width: 100%; height: 100%; object-fit: contain; display: block; }
```
The icon circle's own dimensions (32×32 L, 24×24 M) and padding define the available space. `object-fit: contain` preserves each icon's natural aspect ratio within that space. Fixed pixel sizes on the `<img>` break when circle size changes between L and M.

**Confirmed CSS (prototype, May 2026):**
```css
/* L — desktop + tablet */
.status-pill {
  height: 48px; min-height: 48px; min-width: 115px;
  padding: var(--spacing-space-xs); /* 8px all */
  border-radius: 40.5px;
}
.status-pill__content { gap: var(--spacing-space-xxs); padding-left: var(--spacing-space-xs); padding-right: 2px; }
.status-pill__icon    { width: 32px; height: 32px; padding: 4px; }

/* M — mobile only */
@media (max-width: 767px) {
  .status-pill        { height: 32px; max-height: 32px; min-height: unset; min-width: 89px; padding: 4px 2px 4px 4px; }
  .status-pill__label { display: none; }
  .status-pill__value { font-size: 14px; font-weight: 600; line-height: 20px; }
  .status-pill__icon  { width: 24px; height: 24px; padding: 4px 2px; }
}
```

**Mistakes made (May 2026):**
- Used `max-width: 115px` / `max-width: 89px` instead of `min-width` — badges collapsed too narrow.
- Content `gap` was `8px` — actual DS is `4px` for all variants at both sizes.
- Icon circle was `39px wide × 100% height` — actual is `32×32px` for L (pill height 48 minus 8px top+bottom padding = 32).
- Rule 25's CSS of `width:24px; height:24px` on `<img>` is superseded — use `100%/100%` with the circle defining the box.
- Old sessions noted Streak/Lives/Ruby L as `w:122px` with separate icon container — DS update (2026-05-14) unified all 5 types to the same layout. Always re-inspect live DS; component structure can change between sessions.

### 75. Responsive max-width control — use a CSS variable, not a hardcoded property

When a component needs `max-width` only at a specific breakpoint (e.g. desktop only), store it as a CSS custom property in `:root` and override it in the relevant media query `:root` blocks. Never hardcode the value directly on the selector when it needs to be toggled per breakpoint.

**Pattern:**
```css
/* :root — desktop default */
:root {
  --check-in-card-max-width: 390px;
}

/* Tablet */
@media (max-width: 1279px) {
  :root { --check-in-card-max-width: none; }
}

/* Mobile */
@media (max-width: 767px) {
  :root { --check-in-card-max-width: none; }
}

/* Component */
.check-in-card {
  max-width: var(--check-in-card-max-width);
}
```

**Why:** A single variable in `:root` is the only place to change to revert or adjust the constraint. No hunting across media query blocks. Adding `none` explicitly to both tablet and mobile `:root` blocks is also required — even though the tablet rule cascades to mobile, being explicit prevents breakage if query order is ever changed.

**Confirmed instance — Check-In Card (May 2026):**
- Desktop: `max-width: 390px` (DS mobile frame width — card is capped to phone-width on wide viewports)
- Tablet (`≤1279px`): `max-width: none` — card fills `width: 100%` in the stacked column layout
- Mobile (`≤767px`): `max-width: none` — same

**Rule:** Whenever a layout property differs between breakpoints, check if a CSS variable in `:root` makes it easier to revert or adjust. This is especially useful for sizing constraints (`max-width`, `min-width`, `width`) that need to be "removed" at certain breakpoints.

---

### 76. CSS padding on clip + tight-path viewBox = stroke collapse — never combine

Putting CSS `padding` on a clip container AND using a `viewBox` tightly sized to the path is a **silent failure** — the SVG renders into a smaller content area and scales down, collapsing the stroke to a fraction of 1.5px (effectively invisible).

**The failure mode:**
```
Clip container: 16×16px
Padding: 6px top/bottom, 4px left/right (box-sizing: border-box)
Content area: 16 - 6 - 6 = 4px tall, 16 - 4 - 4 = 8px wide = 8×4px
ViewBox: "-1 -1 14 8" (14×8 units, tight around path)
Scale: min(8/14, 4/8) = 0.5×
Stroke: 1.5 × 0.5 = 0.75px  ← nearly invisible
```

**Rule (extends Rule 72):** For any clip-container icon:
- `viewBox` = `"0 0 <clip_w> <clip_h>"` — match the clip CSS size exactly
- Path coordinates in **clip-space** (0 → clip_size), not local/tight path coordinates
- **No CSS padding** on the clip container — path position is encoded in the viewBox

```
Scale at 1:1: clip_px / clip_viewBox_units = 16/16 = 1.0 → stroke = 1.5px ✓
```

**Confirmed — NavTopMenu chevron-down (DS node I3406:808;538:2074, May 2026):**

| Property | Value |
|---|---|
| Clip container | 16×16px, `overflow: hidden` |
| DS inset | 37.5% top/bottom, 25% left/right |
| Active area in clip | top: 6px, bottom: 10px, left: 4px, right: 12px (8×4px) |
| Symbol `id` | `ic-chevron-down` |
| `viewBox` | `"0 0 16 16"` |
| Path | `M 4 6 L 8 10 L 12 6` |
| Stroke | `1.5` at 1:1 scale = **1.5px** |
| CSS on clip | `width: 16px; height: 16px; overflow: hidden; flex-shrink: 0;` — no padding |

**Mistake made (May 2026):**
- Symbol had `viewBox="-1 -1 14 8"` with path `M 0 0 L 6 6 L 12 0` (tight to path in local coords)
- Clip had `padding: 6px 4px; box-sizing: border-box` → content area shrunk to 8×4px
- Scale = 0.5 → stroke = 0.75px → chevron appeared nearly invisible / "off"
- Fix: remove padding, set `viewBox="0 0 16 16"`, translate path to clip-space coords

**Quick diagnostic:** If a chevron or icon looks faint/thin/off in a clip container, first check whether CSS padding + a tight viewBox are both present on the same element. That combination always collapses the stroke.

---

---

### 77. Semantic Tokens — every CSS color/spacing must use `var(--token)`; hardcoded hex requires DS-source comment

Every CSS property value for color, spacing, radius, or font **must resolve through a `var(--semantic-token)`**. Hardcoded hex values in rule declarations are prohibited unless NO Semantic token equivalent exists (e.g. subject-specific badge colors from DS Iconography, Status Badge type colors not in Semantic collection). All exceptions must be followed by a comment citing the DS node or collection source.

**Violations found in audit (May 2026) — must fix:**

| Line | Hardcoded value | Element | Correct replacement |
|---|---|---|---|
| 307 | `background: #f2f2f2` | `.check-in-card__progress` | `var(--surface-disabled-primary)` |
| 299 | `color: #00564c` | `.check-in-card__label` | `var(--text-tertiary-default)` |
| 337 | `color: #00564c` | `.check-in-card__stats-value` | `var(--text-tertiary-default)` |
| 903 | `background: #fff` | `.subject-badge__icon` | `var(--surface-general-default)` |

**Acceptable exceptions — must have DS-source comment:**
- Status Badge Score bg/border: `#00cc85 / #00a36a` → same as `var(--surface-primary-default) / var(--border-primary-default)`; use the token instead
- Status Badge Coins: `#fece00 / #cba500` — no Semantic token; source: Status Badge - 1.5 node `2312:10653`, Type=Coins fills
- Status Badge Streak: `#7367f0 / #5c52c0` — no Semantic token; source: Status Badge - 1.5, Type=Streak fills
- Status Badge Lives: `#ff5c98 / #cc4a7a` — no Semantic token; source: Status Badge - 1.5, Type=Lives fills
- Status Badge Ruby: `#ff4c51 / #b23539` — no Semantic token; source: Status Badge - 1.5, Type=Ruby fills
- Subject Badge per-subject colors (lines 940–958) — sourced from `🔰 Iconography` page; no Semantic equivalents; acceptable as CSS custom properties with subject class scope

**Rule:** If you can map a hardcoded hex to an existing `var(--*)` in `:root`, always use the variable. Only fall back to hex if you have searched `:root` and confirmed there is no matching Semantic token.

---

### 78. DS Component naming in HTML — exact COMPONENT_SET name + variant label + node ID in every comment

Every DS component used in HTML must be annotated in a `<!-- -->` comment with its exact Figma **COMPONENT_SET name** (not a shortened alias), the specific **variant in use**, and the **node ID**. This allows any future session to look up the live DS node without guessing.

**Correct annotation format:**
```html
<!-- ComponentSetName / VariantKey=VariantValue (node XXXX:YYYY) -->
```

**Confirmed correct DS COMPONENT_SET names from audit (May 2026):**

| HTML section / element | Correct COMPONENT_SET name | Variant in use | Node ID |
|---|---|---|---|
| `#NavBar-Desktop` | **Navbar Primary Desktop - 1.5** | Type=Desktop | `866:5576` |
| `#NavBar-Mobile` | **Navbar Tablet - 1.5** | Type=Mobile | `1943:22641` |
| Status Badge | **Status Badge - 1.5** | Type=[Score\|Coins\|Streak\|Lives\|Ruby], Size=[L\|M] | `2312:10653` |
| Check-In Card | **Check-In Card - 1.5** | (single component, no variants) | `2600:82` |
| Carousel | **Carousel - 1.5** | Type=Desktop | `1200:1789` |
| Carousel (mobile) | **Carousel - 1.5** | Type=Mobile | `3060:869` |
| Static Card | **Static Card - 1.5** | (single component) | `2616:2959` |
| Primary Card | **Primary Card - 1.5** | Type=Secondary Card | `2881:36272` |
| Quiz Card | **Quiz Card - 1.5** | Type=Default | `2339:5346` |
| Subject Badge (L) | **Subject Badge - 1.5** | Size=L | `2339:1343` |
| Subject Badge (M) | **Subject Badge - 1.5** | Size=M | `2339:1349` |
| Button (Primary/M) | **Button - 1.5** | Type=Student, State=Default, Variants=Primary, Size=M | `479:344` |
| Button (Primary/S) | **Button - 1.5** | Type=Student, State=Default, Variants=Primary, Size=S | `1437:8154` |
| Button (Secondary/M) | **Button - 1.5** | Type=Student, State=Default, Variants=Secondary, Size=M | `538:1923` |
| Footer | **Footer - 1.5** | Property 1=Default | `2073:6579` |

**All available variants per component (from live DS audit):**

| Component | Variant properties | All options |
|---|---|---|
| Navbar Primary Desktop - 1.5 | Type | [Desktop] |
| Navbar Tablet - 1.5 | Type | [Mobile] |
| Status Badge - 1.5 | Type, Size | Type: [Score, Coins, Streak, Lives, Ruby], Size: [L, M] |
| Check-In Card - 1.5 | — | single component |
| Carousel - 1.5 | Type | [Desktop, Mobile] |
| Static Card - 1.5 | — | single component |
| Primary Card - 1.5 | Type | [Primary Card, Secondary Card] |
| Quiz Card - 1.5 | Type | [Default] |
| Button - 1.5 | Type, State, Variants, Size | Type: [Student, Teacher] · State: [Default, Hover, Pressed, Disabled, Active] · Variants: [Primary, Secondary, Tertiary] · Size: [L, M, S] |
| Footer - 1.5 | Property 1 | [Default] |
| Subject Badge - 1.5 | Size | [L, M] (per subject component set) |

**Mistake pattern:** Using shortened names like "Navbar 1.5", "Navbar Mobile", "Navbar Desktop" without the full COMPONENT_SET name — makes it impossible to locate the correct node in a future session without re-searching.

---

### 79. Icon container sizes must match the DS clip frame exactly — source via `exportAsync` on the instance

The icon clip container's CSS `width` and `height` must match the DS clip frame's dimensions pixel-for-pixel. Never estimate or scale. Always export from the icon **INSTANCE inside the actual DS component** (not from the Iconography page standalone), then read the exported SVG's `viewBox` to get the correct container size.

**Confirmed icon container sizes from live DS audit (May 2026):**

| Component | Icon | DS container | clips | HTML container | Status |
|---|---|---|---|---|---|
| Status Badge - 1.5 / Size=L | Icon | 32×32 | no | 32×32 | ✅ |
| Status Badge - 1.5 / Size=M | Icon | 24×24 | no | 24×24 | ✅ |
| Check-In Card - 1.5 | Icon | 24×24 | yes | 24×24 | ✅ |
| Button - 1.5 / Primary/M | Outline/chevron-right | 16×16 | yes | 16×16 | ✅ |
| Button - 1.5 / Primary/S | Outline/chevron-right | 12×12 | yes | 12×12 | ✅ |
| Carousel - 1.5 / Desktop | Outline/chevron-left | 20×20 | yes | 20×20 | ✅ |
| Navbar Primary Desktop - 1.5 | Action icons (6×) | 24×24 | yes | 24×24 | ✅ |
| Navbar Tablet - 1.5 | Menu icon | 24×24 | yes | 24×24 | ✅ |
| Primary Card - 1.5 | Leading Icon (bookmark) | 24×24 | yes | 24×24 | ✅ |
| Primary Card - 1.5 | Outline/info | 20×20 | yes | not implemented | ⚠️ |
| Quiz Card - 1.5 | Pill badge icon (Outline/video) | 10×10 | yes | not implemented | ⚠️ |

**⚠️ Not implemented notes:**
- `Outline/info` (20×20) and `Outline/chevron-right` (20×20) in Primary Card header — these appear in the DS component but are not surfaced in the prototype header. Flag if implementing the full section header later.
- `Outline/video` (10×10) in Quiz Card pill badges — extremely small clip container; if implementing pill badge icons, use `exportAsync` on the `I2339:5352;602:660` instance.

**Rule:** When in doubt about a container size, run:
```js
const iconInst = componentNode.findOne(n => n.id === '<instance-id>');
const svg = await iconInst.exportAsync({ format: 'SVG_STRING' });
// Read the viewBox from the svg string — that IS your container size
```

---

### 80. All DS icons must be SVG Symbols in `<defs>` — never `<img src="*.svg">` for any DS-sourced icon

Every DS icon used on the page must be:
1. **Exported** from its container frame instance inside the DS component via `exportAsync({ format: 'SVG_STRING' })`
2. **Defined** as a `<symbol id="ic-*">` in the `<svg><defs>` block at the top of `<body>`
3. **Referenced** everywhere via `<svg><use href="#ic-*"/></svg>`

Using `<img src="icons/ic-*.svg">` for DS icons is prohibited. It:
- Breaks the `stroke="currentColor"` inheritance chain (icon can't be recolored by parent CSS `color:`)
- Creates separate HTTP requests per icon
- Makes state changes (hover/active/disabled) require separate JS color manipulation
- Violates the single source-of-truth principle (symbol in defs vs external file)

**Current violation found in audit (May 2026) — must fix:**

Status Badge icons use `<img src="icons/ic-status-*.svg">` instead of symbols:

| Current (wrong) | Correct symbol ID | DS source |
|---|---|---|
| `<img src="icons/ic-status-trophy.svg">` | `<use href="#ic-status-trophy">` | P.Trophy — 20×24px |
| `<img src="icons/ic-status-coin.svg">` | `<use href="#ic-status-coin">` | P.Coin — 24×24px |
| `<img src="icons/ic-status-streak.svg">` | `<use href="#ic-status-streak">` | P.Streak — 17×24px |
| `<img src="icons/ic-status-heart.svg">` (lives) | `<use href="#ic-status-lives">` | P.Heart — 22×24px |
| `<img src="icons/ic-status-ruby.svg">` | `<use href="#ic-status-ruby">` | P.Ruby — 24×23px |

**Fix:** Add 5 new `<symbol>` definitions to the `<svg><defs>` block. Export each from its instance inside Status Badge - 1.5 (node `2312:10653`) using `exportAsync`. Then replace all 5 `<img>` tags with `<svg><use href="#ic-status-*"/></svg>`.

**Note on non-square status icons:** These icons have different natural widths (17–24px) at 24px height. Per Rule 25: render in a 24×24 CSS box with `object-fit: contain`. When using `<use>`, set `width` and `height` on the `<svg>` element to the icon's natural dimensions (e.g. `width="17" height="24"` for Streak). The parent 24×24 container handles alignment.

**Currently confirmed symbols in `<defs>` (47 symbols — correct):**
`ic-image · ic-chevron-down · ic-chevron-left · ic-chevron-right · ic-chevron-btn · ic-chevron-btn-m · ic-plus · ic-arrow-right · ic-search · ic-maximize · ic-smartphone · ic-bell · ic-bookmark · ic-clock · ic-en · ic-waffle · ic-info · ic-heart · ic-menu · ic-user · ic-home · ic-check-circle · ic-battle · ic-book-open · ic-users · ic-book · ic-bar-chart · ic-star · ic-gift · ic-subj-pointer` + 18 subject icons (`ic-subj-add-math` through `ic-subj-bm`)

**Missing — must add:** `ic-status-trophy · ic-status-coin · ic-status-streak · ic-status-lives · ic-status-ruby`

---

### 81. List all `componentPropertyDefinitions` before implementing any DS component

Before writing a single line of HTML for a DS component, call `use_figma` to read `node.componentPropertyDefinitions` (for COMPONENT_SET / non-variant COMPONENT) or `node.variantProperties` + `node.parent.componentPropertyDefinitions` (for variant COMPONENT). Document every property and explicitly note whether it is implemented in HTML, and if not, what the chosen default is.

**Why this matters:** Missing a `visible: false` boolean produces phantom HTML structure. Missing an instance-swap property produces a generic placeholder instead of the correct DS icon. Implementing only one variant when multiple exist produces incorrect states.

**Confirmed instance properties from live DS audit (May 2026):**

**Button - 1.5 (COMPONENT_SET `473:529`):**

| Property key | Type | Default | HTML implementation |
|---|---|---|---|
| `↳ Label#473:4` | TEXT | "Button" | ✅ varies per context |
| `Show R Arrow#473:6` | BOOLEAN | true | ✅ true in Primary; false in Secondary/Add Classes (Rule 56) |
| `Show Label#643:3` | BOOLEAN | true | ✅ always true |
| `Show Leading Icon#1437:0` | BOOLEAN | true | ❌ always false in prototype — intentional |
| `↳ Leading Icon#1437:25` | INSTANCE_SWAP | Outline/image | ❌ not implemented — leading icon hidden |
| `Show L Arrow#2086:18` | BOOLEAN | false | ✅ always false |
| `↳ Right Icon#2783:0` | INSTANCE_SWAP | Outline/image | ❌ not implemented |

**Check-In Card - 1.5 (single COMPONENT `2600:82`):**

| Property | Type | HTML implementation |
|---|---|---|
| `Label#4059:0` | TEXT | ✅ "Today's Check-In" |
| `Icon#4059:1` | INSTANCE_SWAP | ⚠️ implemented as `<img src>` — must convert to `<symbol>/<use>` |
| `Value#4059:2` | TEXT | ✅ streak count value |

**Static Card - 1.5 (single COMPONENT `2616:2959`):**

| Property | Type | HTML implementation |
|---|---|---|
| `↳ Header#2616:0` | TEXT | ✅ card title |
| `Show Header#2616:1` | BOOLEAN | ✅ always true — intentional |
| `↳ Description#2616:2` | TEXT | ✅ card description |
| `Show Description#2616:3` | BOOLEAN | ✅ always true — intentional |

**Primary Card - 1.5 (COMPONENT_SET `2339:5393`, Type=Secondary Card):**

| Property | Type | HTML implementation |
|---|---|---|
| `Header#2881:0` | TEXT | ✅ section title |
| `Leading Icon#2881:3` | INSTANCE_SWAP | ✅ Outline/bookmark (`ic-bookmark`) |
| `Show Leading Icon#2881:6` | BOOLEAN | ✅ always true — intentional |
| `Header2#2881:9` | TEXT | ✅ subtitle |
| `Show Header#2881:12` | BOOLEAN | ✅ always true — intentional |

**Quiz Card - 1.5 (COMPONENT_SET `2339:5345`):**

| Property | Type | HTML implementation |
|---|---|---|
| `Subject Badge#1806:20` | INSTANCE_SWAP | ✅ per-subject badge |
| `Show Pill Badge 1#1808:22` | BOOLEAN | ✅ always true — intentional |
| `Show Pill Badge 2#1808:24` | BOOLEAN | ✅ always true — intentional |
| `Show Pill Badge 3#1808:26` | BOOLEAN | ✅ always true — intentional |
| `Show Pill Badge 4#1808:28` | BOOLEAN | ✅ always true — intentional |
| `Show CTA#1818:0` | BOOLEAN | ✅ always true — intentional |
| `Type` (variant) | VARIANT | ✅ Type=Default only — only variant in DS |

**Rule:** For every boolean property: if false → the corresponding HTML element must be absent (not just `display:none`). For every INSTANCE_SWAP: confirm what the DS page instance uses (not the component default) via `inst.componentProperties` on the home screen frame.

---

### 82. Pre-implementation DS audit checklist — mandatory for every component

Before implementing or modifying any DS component in the prototype, complete this checklist in order. No step may be skipped, even for "small" changes.

```
□ 0a. Read design-md/zul.design.md — load all confirmed specs + section inventory
□ 0b. Open DS file TLVKe3bgJTdVvuPAzgDq2f — single source of truth

□ 1. COMPONENT_SET name
     use_figma → confirm exact name (e.g. "Navbar Primary Desktop - 1.5")
     → add to HTML comment as <!-- ComponentSetName / Variant (node ID) -->

□ 2. All variants
     Read node.componentPropertyDefinitions on the COMPONENT_SET
     → list every Type/State/Size/Variant option
     → confirm which variant the prototype implements

□ 3. Instance properties
     For each BOOLEAN property: confirm visible=true/false → include or exclude from HTML
     For each INSTANCE_SWAP: check inst.componentProperties on the DS screen instance
     For each TEXT: use DS label or placeholder text
     → document all in a comment block above the HTML section

□ 4. Icon containers
     For each icon inside the component:
       use_figma → findAll to get container node → read .width, .height, .clipsContent
       exportAsync({ format: 'SVG_STRING' }) on the INSTANCE (not Iconography standalone)
     → CSS container must match DS dimensions exactly (Rule 79)
     → SVG must go into <symbol id="ic-*"> in defs (Rule 80)

□ 5. Semantic tokens
     get_variable_defs on each sub-node that carries a fill, stroke, or spacing
     → every CSS property must use var(--semantic-token) (Rule 77)
     → exceptions: note DS source node in comment

□ 6. Screenshot validation
     get_screenshot of the DS component node after each implementation step
     → compare rendered HTML against DS screenshot side-by-side
     → if off: go back to step 4 or 5 before proceeding
```

**Shortcut forbidden:** Never skip to step 4 or 5 without completing steps 1–3 first. The most common implementation bugs come from guessing variant names, skipping boolean properties, or using wrong icon container sizes — all caught by steps 1–3.

---

### 83. Semantic token mapping — verify by `:root` hex value, never by token name alone

When replacing a hardcoded hex with a `var(--*)`, always look up which `:root` variable resolves to that exact hex. Never infer the correct token from the name — similar-sounding tokens can resolve to completely different values.

**Confirmed mistake (May 2026 — Score badge border):**
- Hardcoded: `border-color: #00a36a`
- Wrong mapping: `var(--border-primary-default)` → resolves to `#00cc85` (same as badge background → border became invisible)
- Correct mapping: `var(--border-primary-focus)` → resolves to `#00a36a` ✓

**Token name ≠ token value. Always cross-check:**
```
1. Find the hex in `:root` — search for the hex string directly
2. Read the variable name that owns it
3. Use that variable name — not a guess based on semantic similarity
```

**Known trap — greens that look alike:**

| Token | Value | Use |
|---|---|---|
| `--border-primary-default` | `#00cc85` | Borders on neutral containers (navbar, footer) |
| `--border-primary-focus` | `#00a36a` | Badge borders, button borders, hover states |
| `--surface-primary-default` | `#00cc85` | Badge/button fill backgrounds |
| `--surface-primary-focus` | `#00a36a` | Arrow circle bg in button, active state fills |

`Border/primary/default` and `Surface/primary/default` share the same hex (`#00cc85`). When a border uses `#00a36a` (the darker shade), the correct token is `Border/primary/focus`, NOT `Border/primary/default`.

**Rule:** Before any Group A (Semantic Token) fix, run this check:
```
grep ":#00a36a\|: #00a36a" zul.home.screen.html → confirms --border-primary-focus
grep ":#00cc85\|: #00cc85" zul.home.screen.html → confirms --border-primary-default OR --surface-primary-default
```

---

### 84. `<svg><use>` icons need their own CSS size rule — `img` rules never cascade to `svg`

When replacing `<img src="*.svg">` with `<svg><use href="#ic-*"/>`, any existing `.container img { width: ...; height: ... }` CSS rule becomes dead code — it does NOT apply to `<svg>` elements.

**Always add a matching `svg` rule alongside every `img` rule for icon containers:**
```css
/* Both rules required — img and svg are distinct element types */
.status-pill__icon img { width: 100%; height: 100%; object-fit: contain; display: block; }
.status-pill__icon svg { height: 24px; width: auto; display: block; flex-shrink: 0; }
```

**Why `width: auto` not `width: 100%`:** SVG elements with `width: 100%` fill the container width and scale proportionally — which can distort non-square icons if the container is square. `width: auto` defers to the SVG's own `viewBox` aspect ratio, giving the correct proportional width for a given height.

**Confirmed mistake (May 2026 — Status Badge):**
- `.status-pill__icon img { ... }` existed but `.status-pill__icon svg { ... }` was missing
- After converting all status icons from `<img>` to `<svg><use>`, the icons had no CSS size constraint
- Icons rendered at their HTML `width`/`height` attributes unconditionally, overflowing the M container

**Checklist when replacing `<img>` with `<svg><use>`:**
```
□ Find the existing .container img { ... } CSS rule
□ Add matching .container svg { height: Xpx; width: auto; display: block; } rule
□ Verify the height matches the content area (see Rule 85), not the container total
□ Add responsive override if the container size changes at a breakpoint
```

---

### 85. Icon content area formula — container height minus vertical padding = rendered icon height

The icon's rendered height is NOT the container's total height. It is the container height minus top and bottom padding. Always calculate the content area before setting icon CSS height.

**Formula:**
```
icon rendered height = container height − padding-top − padding-bottom
```

**Confirmed DS values from `get_design_context` (Status Badge - 1.5, node 2312:10653):**

| Size | Container | Padding | Icon content height | CSS rule |
|---|---|---|---|---|
| **L** (desktop) | 32×32px | `4px all sides` | 32 − 4 − 4 = **24px** | `height: 24px` |
| **M** (mobile) | 24×24px | `px:2px py:4px` | 24 − 4 − 4 = **16px** | `height: 16px` |

**Subject Badge - 1.5 (node 2339:1343/1349):**

| Size | Badge height | Outer padding | Icon content height | CSS rule |
|---|---|---|---|---|
| **L** (desktop/tablet) | 32px badge | `4px top+bottom` | 32 − 4 − 4 = **24px** | `height: 24px` |
| **M** (mobile) | 24px badge | `4px top+bottom` | 24 − 4 − 4 = **16px** | `height: 16px` |

**Rule:** When a DS component uses `h-full` on an icon inside a padded flex container, that `h-full` resolves to the CONTENT area height (container − padding), not the total outer height. Always verify with `get_design_context` → read the padding values → subtract to get the icon height.

**Mistake pattern:** Setting icon CSS to `height: 24px` for both L and M because "all icons are 24px" — correct for L, but M's content area is only 16px, causing 8px overflow.

---

### 86. Always refer to DS & `zul.design.md` before any design work, change, or decision

This rule supersedes all others as the mandatory first step. No exception exists — not for "quick fixes", not for "obvious" changes, not for token substitutions.

**Required before EVERY action:**
```
Step 0a → Read design-md/zul.design.md (load confirmed specs, mistakes, rules 1–85)
Step 0b → Open DS file TLVKe3bgJTdVvuPAzgDq2f (single source of truth for all values)
Step 0c → get_design_context on the relevant DS component node
Step 0d → Cross-check any CSS variable value against :root before using it
```

**Why this matters — every mistake in this project traced back to skipping Step 0:**
- Primary color guessed as `#2FAC51` instead of `#00cc85` (Rule 1)
- Score badge border mapped to wrong token (`--border-primary-default` = `#00cc85` instead of `--border-primary-focus` = `#00a36a`) (Rule 83)
- Footer height assumed as 60px, DS changed to 44px (Rule 51)
- Icon containers assumed no-padding, DS showed specific padding per variant (Rule 85)
- Button pressed state assumed as primary green, DS uses Tertiary dark teal (Rule 19)

**Every one of these would have been caught by reading zul.design.md + checking the DS node first.**

**Shortcut cost:** A 2-minute DS inspection saves a full debug cycle. Every "quick" change that skips Step 0 has cost more time to fix than the inspection would have taken.

---

### 87. SVG symbol icon audit — three layers must all be DS-consistent

Every icon in the prototype has three interdependent layers. Fixing only one silently breaks the others.

| Layer | What to check | Common error |
|---|---|---|
| **Symbol `viewBox`** | Coordinate space must match the exported DS instance dimensions | M-size viewBox used while rendering at L-size |
| **Path coordinate scale** | Path `d=` values must be in the same coordinate space as the viewBox | Paths from M-size instance placed in L-size viewBox |
| **CSS dimensions** | `width` + `height` on the `<svg>` must match DS instance frame | `width:auto` gives wrong width for non-square icons |

**Audit workflow (mandatory before any icon change):**
```
1. grep all <symbol> IDs and viewBoxes in the file
2. For each symbol: confirm viewBox matches the DS instance frame size via use_figma
3. For each <svg><use>: confirm CSS width/height matches DS instance frame
4. For status/subject icons: confirm exported paths came from the correct DS size (L vs M)
```

**Confirmed mistake (May 2026 icon audit):** Status badge symbols `ic-status-trophy`, `ic-status-coin`, `ic-status-lives`, `ic-status-ruby` had M-size path data (viewBox ~14-18px wide × 16px tall) but were rendered at L-size CSS (24px tall). Carousel chevrons missing 1px viewBox buffer per Rule 27. Subject badge icons using `height:auto` instead of explicit DS instance dimensions.

---

### 88. Status Badge icons — always export from the DS size that matches the rendered context

The DS Status Badge component (`2312:10653`) has **two sizes**: L (48px badge, icon at 24px tall) and M (32px badge, icon at 16px tall). Path coordinate scales are completely different between sizes — they cannot be swapped.

**DS-confirmed L-size icon dimensions (node `2312:10653`):**

| Icon | DS L instance | viewBox to use | CSS rule |
|---|---|---|---|
| P.Trophy | w:20.23 h:24 | `0 0 21 24` | `height:24px; width:auto` |
| P.Coin | w:24 h:24 | `0 0 24 24` | `height:24px; width:auto` |
| P.Streak | w:17 h:24 | `0 0 17 24` | `height:24px; width:auto` |
| P.Heart (Lives) | w:21.57 h:24 | `0 0 22 24` | `height:24px; width:auto` |
| P.Ruby | w:24 h:**22** | `0 0 24 22` | `height:**22px**; width:auto` — see Rule 90 |

**DS-confirmed M-size icon dimensions (for mobile scaling at 16px tall):**

| Icon | DS M instance | Used at |
|---|---|---|
| P.Trophy | w:13.49 h:16 | Mobile `height:16px` |
| P.Coin | w:16 h:16 | Mobile `height:16px` |
| P.Streak | w:11.33 h:16 | Mobile `height:16px` |
| P.Heart | w:14.67 h:16 | Mobile `height:16px` |
| P.Ruby | w:17.45 h:16 | Mobile `height:16px` |

**How to export paths from the correct DS size:**
```js
// use_figma — always target the instance node for the SIZE you are rendering at
const node = figma.getNodeById('3747:1357');  // Trophy L-size instance
const svg = await node.exportAsync({ format: 'SVG_STRING' });
// The exported viewBox will match the instance frame — use it directly in <symbol>
```

**Mistake made (May 2026):** Symbols were built from M-size instances but rendered at L-size CSS. Trophy symbol `viewBox="0 0 14 16"` displayed at `height:24px` → actual render: 21×22.86px (letterboxed, 1.14px too short). Ruby `viewBox="0 0 18 16"` at `height:24px` → 27×24px (3px too wide). Fixed by re-exporting all 4 symbols from DS L-size instances.

---

### 89. Subject badge icon sizing — always explicit `width:Xpx; height:Xpx`, never `width:auto`

DS-confirmed instance dimensions from the Subject Badge - 1.5 component (May 2026):

| Badge size | DS node | DS icon instance | CSS rule |
|---|---|---|---|
| L (32px badge) | `2339:1343` | **20×20** | `width: 20px; height: 20px` |
| M (24px badge) | `2339:1349` | **16×16** | `width: 16px; height: 16px` |

**Why `width:auto` is wrong:** Subject icons are non-square (Add Math is 21:24, Chemistry is 15:24, etc.). `height:20px; width:auto` computes width from the viewBox aspect ratio — e.g., Add Math at `0 0 21 24` gives width = 20 × (21/24) = 17.5px. But the DS places the icon in a 20×20 instance frame, centering the icon within that frame. The CSS must mirror the 20×20 frame, not the icon's natural proportions.

**Why `height:24px; width:auto` (old approach) was doubly wrong:** Height was 24px instead of 20px (20% too tall, filling the slot padding), AND width was auto (wrong proportions).

**Complete override pattern for M-size badges in quiz cards:**
```css
/* Base — L badge icons (20×20) */
.subject-badge__icon svg,
.subject-badge__icon img { width: 20px; height: 20px; }

/* Quiz card M badge override (16×16) */
.quiz-card__header .subject-badge__icon svg,
.quiz-card__header .subject-badge__icon img { width: 16px; height: 16px; }

/* Section with L badges inside quiz cards (e.g. YourSelectedSubjects) */
#SectionName-Desktop .quiz-card__header .subject-badge__icon svg,
#SectionName-Desktop .quiz-card__header .subject-badge__icon img { width: 20px; height: 20px; }
```

**Mistake made (May 2026):** Base CSS used `height: 24px; width: auto` — icon was 20% taller than DS and non-square icons had wrong width. YourSelectedSubjects override used `height: 24px; width: auto` but intended L-size (20×20). All corrected to explicit pixel pairs.

---

### 90. Ruby status icon is non-square (24×22) — requires a dedicated height override

Ruby L (DS node `3761:236`) is the **only status badge icon that is not 24px tall**. Its DS L dimensions are **w:24 h:22**. All other status icons are 24px tall.

The global rule `.status-pill__icon svg { height: 24px; width: auto; }` renders Ruby at 24px tall, which computes width = 24 × (24/22) = **26.18px** — too wide and too tall.

**Required CSS override:**
```css
.status-pill--ruby .status-pill__icon svg { height: 22px; }
/* width:auto then computes: 22 × (24/22) = 24px ✓ — matches DS w:24 h:22 */
```

**Mobile size:** At `height:16px`, Ruby M is `w:17.45 h:16`. The `viewBox="0 0 24 22"` with `height:16px; width:auto` gives width = 16 × (24/22) = 17.45px ✓ — matches DS M exactly.

**Pattern — any non-square status icon needs its own height override:**
```css
/* Standard icons (height=24px at L, height=16px at M): no override needed */
.status-pill__icon svg { height: 24px; width: auto; }
/* Non-square L icon — override height to DS native h, width:auto resolves to DS native w */
.status-pill--ruby .status-pill__icon svg { height: 22px; }  /* DS: 24×22 */
```

**Check this whenever** adding a new status icon type: inspect the DS instance height. If it differs from 24px, add a class-scoped height override.

---

---

### 91. Profile Menu - 1.5 — confirmed DS specs (node 3908:3679, May 2026)

Dropdown panel that opens below the navbar avatar. Sourced from `⚙️ Menu Bar` page.

**Container:**
| Property | Value | Token |
|---|---|---|
| Width | 320px | — |
| Background | white | `Surface/general/default` |
| Border | 1px `#00cc85` | `Border/primary/default` |
| Border-radius | 24px | `Corner Radius/corner-4xl` |
| Padding | 16px all sides | `Spacing/component/md` |
| Gap | 8px | `Spacing/component/xs` |

**Positioning (prototype):**
- `position: absolute; top: 80px; right: var(--page-padding-x)` anchored to `#NavbarPrimary-Desktop` (`position: relative`)
- `top: 80px` = Navbar h:64 + gap 16px — aligns Profile Menu top with Nav Menu Bar top (DS confirmed: NavMenu y=80)
- Escapes `.navbar-primary`'s `overflow: hidden` by living as a sibling element outside it
- Open state: class `.is-open` → `opacity:1; transform:translateY(0); visibility:visible; pointer-events:auto`
- Closed state: `opacity:0; transform:translateY(-8px); visibility:hidden; pointer-events:none`
- Transition: `opacity 0.15s ease, transform 0.15s ease, visibility 0s linear <delay>`
- Open trigger: click `.navbar-avatar`; Close trigger: `mouseleave` on the dropdown panel itself

**Header block (node 3908:1481):**
- Background: `#f6fef6` (`Surface/secondary/default-hover`) — CSS var: `--surface-secondary-default-hover`
- Border: 1px `#00cc85`; Border-radius: 16px (`corner-2xl`); Padding: 16px vertical; Gap: 10px; centered column

**Avatar (node 3908:1484):** 64×64px, border-radius 60px, 1px `#00cc85` border, white bg

**Number Badge (node 3908:1485):** absolute `top:0; right:0` on 64×64 wrap; 20×20; green `#00cc85` bg; Poppins SemiBold 10px; `#f6fdfb` text

**Name row:** Poppins Bold 18px / 28lh, `#00564c` (`Text/tertiary/default`)

**Verified icon badge (node 3908:1491):** 12×12; bg `#00a2e8`; 1px white border; pill radius; 2px padding; 8×8 check icon white stroke

**Username:** Poppins Medium 12px, `#666` (`Text/default/body`)

**Plan pill (node 3908:1493):** white bg; 1px `#00cc85` border; pill radius; padding `2px 8px`; Poppins Medium 10px; `#00cc85` text

**Upgrade link (node 3908:1495):** flex row; gap 8px; `Filled/star` icon 20×20 `#00cc85`; Poppins Regular 14px; `#00cc85` text

**Menu items:** 7 rows + divider + Log Out — all use `Dropdown - Parts` → see Rule 92

**Menu icons (all 24×24, `symbol`/`<use>`, `viewBox="-1 -1 26 26"`, `stroke="currentColor"`):**
- My Profile: `ic-user-circle` (node 1942:23330)
- Manage Account: `ic-user-check` (node 260:1300)
- Subscribe Pandai Premium: `ic-star-24` (node 260:1192)
- Payment History: `ic-credit-card` (node 260:656)
- Share My Progress: `ic-progress-mobile` (node 1524:3597)
- Learn and Earn: `ic-gift` (node 260:765)
- Online Support: `ic-life-buoy` (node 260:855)
- Log Out: `ic-power` (node 260:1057)
- Upgrade link star: `ic-star-filled-24` (node 3074:60862) — `fill="currentColor"` on path

**Divider:** 1px `#d9d9d9` (`Border/general/default`) horizontal rule between Online Support and Log Out

**New CSS variable added (May 2026):**
```css
--surface-secondary-default-hover: #f6fef6;   /* Surface/secondary/default-hover — profile menu header bg */
```

---

### 92. Dropdown - Parts — confirmed DS state tokens (node 1342:4370, May 2026)

Component set on `⚙️ Dropdown Menu` page. Used inside Profile Menu - 1.5. Type used in profile menu: `Type=Check List` (default appearance) with interactive states from `Type=Main List`.

**All states — confirmed from `get_design_context` (May 2026):**

| State | Background | Border | Radius | Label color | Label weight |
|---|---|---|---|---|---|
| **Default** | none | none | — | `#666` (`Text/default/body`) | SemiBold 14px |
| **Hover** | `#e8fbe8` (`Surface/secondary/default-subtle`) | `1px #00cc85` | **pill (108px)** | `#00cc85` (`Text/primary/default`) | SemiBold 14px |
| **Selected** | `#b5f291` (`Surface/secondary/default`) | `1px #00a36a` | pill (108px) | `#00a36a` (`Text/primary/default-hover`) | SemiBold 14px |
| **Disabled** | none | none | — | `#bfbfbf` (`Text/disabled/default`) | SemiBold 14px |

**Icon color:** `#00cc85` in all states. Does not change on hover.

**Padding (all states):** `px: 16px / py: 8px` (`Spacing/space-m` / `Spacing/space-xs`)

**CSS implementation pattern (prototype):**
```css
/* Use box-shadow:inset for border — no layout shift (Rule 30) */
/* border-radius: pill always — visible only when bg is present */
.profile-dropdown__item {
  padding:       8px 16px;
  border-radius: 108px;               /* pill — matches DS hover shape */
  transition:    background 0.12s ease, box-shadow 0.12s ease;
}
.profile-dropdown__item:hover {
  background: #e8fbe8;                /* Surface/secondary/default-subtle */
  box-shadow: inset 0 0 0 1px #00cc85; /* Border/primary/default */
}
.profile-dropdown__item:hover .profile-dropdown__item-label {
  color: #00cc85;                     /* Text/primary/default */
}
.profile-dropdown__item:active {
  background: #b5f291;                /* Surface/secondary/default — Selected palette */
  box-shadow: inset 0 0 0 1px #00a36a; /* Border/primary/focus */
}
.profile-dropdown__item:active .profile-dropdown__item-label {
  color: #00a36a;                     /* Text/primary/default-hover */
}
```

**Mistake made (May 2026):**
- Hover BG: used `#d9f7ed` (wrong) → correct is `#e8fbe8`
- Hover border: missing entirely
- Hover radius: `8px` (wrong) → correct is `108px` pill
- Hover label: colour unchanged (wrong) → correct is `#00cc85`
- None of these were visible from the Default state alone. **This is why Rule 93 exists.**

---

### 93. Always audit component anatomy — Nested Instances, Variants, States, Properties

**This is the single most important workflow discipline.** Before writing any HTML or CSS for a DS component, audit all four anatomy layers:

**1. Nested Instances**
Every sub-component used inside a parent is its own COMPONENT_SET with its own variants and states. Always look each one up independently.
```
Profile Menu - 1.5 contains → Dropdown - Parts (node 1342:4370)
Button - 1.5 contains        → chevron clip node (Rule 16)
Carousel - 1.5 contains      → Button Icon - 1.5
```
Never implement a sub-component based on what the parent component's `get_design_context` shows. Always pull the nested component's own COMPONENT_SET.

**2. Variants**
List ALL variants in the COMPONENT_SET before writing any code:
```js
// use_figma to list all variants in a set
const set = await figma.getNodeByIdAsync('<COMPONENT_SET_ID>');
return set.children.map(c => c.name);
```
Never assume what variants exist. The variant you see in the parent screen may not be the Default variant.

**3. States**
Pull EVERY interactive state (Default, Hover, Pressed/Active, Selected, Disabled, Focus) via `get_design_context` BEFORE writing any CSS. Required tokens to extract per state:
- Background token + hex
- Border token + hex
- Border-radius
- Label/text color token + hex
- Icon color token + hex

**4. Properties**
Check all `componentPropertyDefinitions` on the COMPONENT_SET:
- `BOOLEAN` props (`visible`, `showIcon`, `showLabel`) → `visible: false` means exclude from HTML entirely (Rule 41)
- `INSTANCE_SWAP` props → identifies which nested sub-component is in use
- `TEXT` props → actual label content

**Required workflow (every component, no exceptions):**
```
1. get_design_context on COMPONENT_SET node → read all variant names
2. get_design_context on EACH state variant → extract tokens per state
3. For EACH nested instance → repeat steps 1–2 on that sub-component's own set
4. Check all componentPropertyDefinitions → confirm visible/hidden children
5. ONLY THEN write HTML and CSS
```

**Mistake made (May 2026 — Profile Menu dropdown):**
Implemented all menu items from the Profile Menu parent `get_design_context` output, which only showed the Default/Check List state. Did not separately audit `Dropdown - Parts` (node 1342:4370). The correct Hover state has `#e8fbe8` bg + `1px solid #00cc85` border + **pill border-radius (108px)** + `#00cc85` label — zero of which was visible from the parent's output. All hover styles required correction after the fact.

**Rule added to CLAUDE.md as Rule 49. Memory saved as `feedback_check_component_anatomy.md`.**

---

### Mandatory workflow — BEFORE every design action, change, or decision (updated May 2026)

**Non-negotiable. Applies to every session, every component, every fix — no exceptions.**

```
Step 0a → Read design-md/zul.design.md      ← ALL rules 1–93 + confirmed specs
Step 0b → Open DS: TLVKe3bgJTdVvuPAzgDq2f  ← single source of truth
Step 0c → Audit component anatomy (Rule 93):
           - get_design_context on COMPONENT_SET node → list all variants
           - get_design_context on each state variant → extract all tokens
           - Repeat for every nested sub-component
           - Check all componentPropertyDefinitions (visible/hidden/swap)
Step 0d → get_variable_defs on exact sub-nodes for every fill/stroke/spacing
Step 0e → Cross-check CSS variable value against :root before using it (Rule 83)
Step 0f → For icons: confirm viewBox, path scale, AND CSS dimensions (Rule 87)
Step 0g → get_screenshot after implementation → compare against DS side-by-side
```

**Why this matters — every mistake in this project came from skipping Step 0:**
- Primary color guessed as `#2FAC51` instead of `#00cc85` — skipped 0b
- Score badge border used wrong token — skipped 0e
- Button pressed state wrong colour — skipped 0c (state variants not audited)
- Profile menu hover styles all wrong — skipped 0c (nested instance not audited)
- Footer height assumed 60px, DS changed to 44px — skipped 0b

**A 2-minute DS inspection always saves more time than the bug it prevents.**

---

### 94. Inter-component gaps — always read DS screen frame children, never guess

When positioning any floating element (dropdown, tooltip, popover) or setting `margin-top` between two stacked sections, always derive the value from the **DS screen frame's child node coordinates**, not from assumption or a "looks right" estimate.

**Method:**
```js
// use_figma on the Screen frame node
const home = await figma.getNodeByIdAsync('<screen-node-id>');
home.children.map(c => ({ name: c.name, y: c.y, h: c.height }));
// gap between A and B = B.y - (A.y + A.h)
```

**Confirmed DS screen layout — Home frame `3658:64086` (May 2026):**

| Component | y | h | Bottom edge |
|---|---|---|---|
| Navbar Primary Desktop - 1.5 | 0 | 64 | **64** |
| Nav Menu Desktop - 1.5 | **80** | 56 | 136 |
| Content frame | 152 | 72 | — |

**Gaps confirmed:**
- Navbar → Nav Menu Bar: `80 − 64 = **16px**` (`Spacing/space-m`) ← prototype had 12px, corrected
- Nav Menu Bar → Content: `152 − 136 = 16px` (`Spacing/space-m`)

**Mistakes corrected (May 2026):**
- `#NavTopMenu-Desktop { margin-top }` was `var(--spacing-space-s)` = 12px → corrected to `var(--spacing-space-m)` = **16px**
- Profile Menu dropdown `top` was `68px` → corrected to **80px** (aligns top-to-top with Nav Menu Bar)

---

### 95. Absolute-positioned dropdown `top` = DS screen y-coordinate of the aligned element

When a floating panel (dropdown, profile menu, popover) must align its top edge with another element on the page, its `top` value equals that element's **y-coordinate in the DS screen frame** — not the navbar height, not a guessed offset.

**Formula:**
```
dropdown top = target_element.y  (from DS screen frame children)
```

**Confirmed — Profile Menu - 1.5 (May 2026):**
- Nav Menu Bar top in DS screen: `y = 80px`
- Profile Menu `top` must be: `80px`
- Old value: `68px` (navbar h:64 + 4px arbitrary gap) → **wrong**
- Correct value: `80px` → top-to-top aligned with Nav Menu Bar ✓

**General pattern for any dropdown anchored to `#NavbarPrimary-Desktop`:**
```css
.my-dropdown {
  position: absolute;
  top: 80px;   /* = Nav Menu Bar y in DS screen — aligns with menu bar top */
  right: var(--page-padding-x);
}
```

**Why `top: 68px` was wrong:** It was calculated as navbar height (64px) + a 4px visual guess. The DS screen defines the actual spacing as 16px (Spacing/space-m), making the correct value 64 + 16 = 80px. Always use DS screen coordinates — never add arbitrary offsets.

---

### Mandatory workflow — BEFORE every design action, change, or decision (updated 2026-05-17)

**Non-negotiable. Every session. Every component. Every fix. Every decision. No exceptions.**

> This is the single most important section in this file. Every mistake in this project — wrong colors, wrong states, wrong hover styles, wrong icon sizes, broken layout — traced back to skipping one of these steps. Read it before you type anything.

```
Step 0a → Read design-md/zul.design.md          ← ALL rules 1–105 + confirmed specs
Step 0b → Open DS: TLVKe3bgJTdVvuPAzgDq2f       ← SINGLE SOURCE OF TRUTH. Not memory. Not docs. The DS.
Step 0c → Audit component anatomy (Rule 49, 93):
           - use_figma: find the component SET — list ALL variants by name
           - get_design_context on each relevant state variant → extract all tokens
           - Repeat for every nested sub-component (Rule 49)
           - Check componentPropertyDefinitions → confirm visible/hidden/swap props
Step 0d → For spacing/positioning: read DS screen frame y-coords (Rules 94–95)
Step 0e → get_variable_defs on exact sub-nodes for every fill/stroke/spacing (Rule 12)
Step 0f → Cross-check CSS variable value against :root before using it (Rule 83)
Step 0g → For icons: confirm viewBox, path scale, AND CSS dimensions (Rule 87)
Step 0h → For Subject Badges: run full audit script (Rule 101e) before touching any badge CSS
Step 0i → get_screenshot after implementation → compare against DS side-by-side
```

**Why Step 0b matters more than docs:** zul.design.md and CLAUDE.md can lag the DS. In the 2026-05-17 badge audit, the HTML was ahead of the docs, and the docs had 4 wrong values. The DS was the only correct source. Always re-verify live — never trust any written record as a substitute for a DS lookup.

**A 2-minute DS inspection always saves more time than the bug it prevents.**

---

---

### Rule 96 — Complex illustrated icons → PNG, not SVG

DS feature icons (e.g. `Feature/live-tuition`, `Feature/quiz`, `Feature/personality`) are multi-colour isometric illustrations with 15–56KB of SVG path data. They cannot be exported as SVG through the tool output limit (~15–20KB per call). Always export these as **2× PNG** via `exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } })` and save as actual `.png` files.

**Decision rule:** Before starting any icon export batch, check SVG byte sizes first (`exportAsync({ format: 'SVG_STRING' })` → `svg.length`). If any icon exceeds ~12KB, switch the entire batch to PNG immediately. Do not attempt SVG chunking.

**PNG exception for Learn Menu (confirmed May 2026):** All 12 `Feature/*` icons in the Learn Menu use PNG (2×). This is the authorised exception — the icons are authentic Figma exports, not hand-coded.

**Mistake made:** Spent an entire session alternating between SVG → chunked SVG → PNG → SVG instead of checking sizes first and committing to PNG after the first truncation. Commit to one format before the first export call.

---

### Rule 97 — Bulk HTML removal: always verify wrapper closing tags

When removing a block of HTML by line range, the containing element's closing tag (`</section>`, `</div>`) may sit OUTSIDE the removed range but was logically tied to the content you're deleting. Removing the content without the closer — or vice versa — leaves the DOM structure broken.

**Verification workflow (mandatory before any bulk HTML removal):**
```
1. grep -n "<section\|</section>" file.html  ← baseline: every open has a close
2. Identify the FULL containing element boundary — not just the content block
3. After removal: re-run the same grep and confirm every open still has a close
```

**Confirmed mistake (May 2026):** Removed Learn Menu HTML (lines 2150–2182 original). The `</section><!-- end NavbarPrimary-Desktop -->` was at line 2073 — BEFORE the removed range — and should have been preserved. It was missing from the output, breaking the HTML nesting of every element below the navbar. The bug manifested as: desktop page padding "too wide," responsive breakpoints not applying, NavTopMenu rendered inside NavbarPrimary-Desktop.

**Root cause:** I trusted line-number math (`lines.slice(...)`) without verifying that every structural tag was accounted for. Always grep-verify after bulk file operations.

---

---

### Rule 98 — `<button>` wrapper for DS icon buttons: explicit dimensions + full outline reset

Any `<button>` used as the outer wrapper for a DS action icon component (e.g. `Nav Button - 1.5`) **must** have:

```css
.my-btn {
  width:              44px;   /* exact DS component width */
  height:             44px;   /* exact DS component height */
  min-width:          44px;   /* prevents browser compression on press */
  outline:            none;
  -webkit-appearance: none;
  appearance:         none;
  border:             none;
  background:         transparent;
  padding:            0;
}
.my-btn:focus        { outline: none; }
.my-btn:focus-visible { outline: none; }
```

**Why explicit dimensions:** Without `width`/`height`/`min-width`, the browser's default button sizing can compress the element on press (`:active`) — the button appears to narrow or shrink even when all child elements are the correct size. The button box must be pinned to exactly the DS frame dimensions.

**Why three outline rules:** `outline: none` in the base rule prevents the ring in most browsers. `:focus` covers click focus in older browsers. `:focus-visible` overrides any browser UA stylesheet that re-adds the ring for keyboard navigation. All three together guarantee zero focus ring at all times.

**Confirmed mistake (May 2026):** `.navbar-action-btn` had no `width`/`height` and no `outline: none`. The button compressed visually on press and showed a blue focus ring after click. Adding `width: 44px; height: 44px; min-width: 44px; outline: none` + the two pseudo-class overrides fixed both issues.

---

### Rule 99 — Nav Button - 1.5 Active state icon color: `Text/primary/on-color`, never grey

When a nav action button enters `.is-active` (speech-bubble Union bg visible), the icon inside the clip must use **`var(--text-primary-on-color)`** = `#f6fdfb`. This is the near-white used for content rendered on a colored `Surface/primary` background — the same token used on Button labels.

**Confirmed from DS node `3908:6163` (Nav Button - 1.5, Active state, May 2026):**
- Icon vector fill: `rgb(246,253,251)` = `#f6fdfb` → maps to `Text/primary/on-color`
- Stroke: same `#f6fdfb` at `weight: 1.5`

**Wrong values to avoid:**
| Wrong value | Why wrong |
|---|---|
| `#d9d9d9` | DS "default" icon grey — for inactive/rest state only |
| `#808080` | `Icon/default/default` — for rest state icons |
| `var(--icon-primary-default)` `#00cc85` | Hover/pressed state on the rect — not the Union active state |

**Rule:** Always call `use_figma` on the Active state node specifically (not Default) to confirm icon fill. The token changes completely between states — never inherit Default state token assumptions for Active.

---

### Rule 100 — `clip-path: path()` inner border: outer-div border color + `::before` scaled fill

CSS `clip-path` clips ALL box properties — `border`, `box-shadow: inset`, `outline` are all clipped away and cannot produce an inner border. To replicate a DS inner stroke on a `clip-path: path()` shape:

1. Set the outer div's `background` to the **border color** (e.g. `var(--surface-primary-focus)` = `#00a36a`)
2. Add a `::before` pseudo-element with the **fill color** (e.g. `var(--surface-primary-default)` = `#00cc85`), `clip-path: inherit`, and a scale transform that shrinks it by ~1px on all sides

**CSS pattern:**
```css
.clip-shape {
  background: var(--border-color);   /* outer ring color */
  clip-path: path('M...');
  position: relative;
}
.clip-shape::before {
  content:          '';
  position:         absolute;
  inset:            0;
  background:       var(--fill-color);  /* inner fill color */
  clip-path:        inherit;
  transform:        scale(Sx, Sy);
  transform-origin: 50% 50%;
}
```

**Scale formula for ~1px border:**
```
Sx = (W - 2) / W    →  e.g. (44 - 2) / 44 = 0.9545
Sy = (H - 2) / H    →  e.g. (51.172 - 2) / 51.172 = 0.9609
```

`transform-origin: 50% 50%` centers the scale so the border is visually uniform on all sides.

**`clip-path: inherit`** — the pseudo-element inherits the exact same `path(...)` from the parent. The scale is then applied to the already-clipped content, producing a smaller version of the same shape that reveals the outer fill color as a border ring.

**Confirmed instance — Nav Button - 1.5 Union bg (node 3908:6165, May 2026):**
- W=44, H=51.172 → Sx=0.9545, Sy=0.9609
- Border color: `var(--surface-primary-focus)` = `#00a36a`
- Fill color: `var(--surface-primary-default)` = `#00cc85`

**Limitation:** The border is not perfectly uniform at 1px because scale() doesn't produce a true parallel offset of a complex curve. For the Union speech-bubble shape this is imperceptible at the rendered size (44px). For larger shapes where the imperfection would be visible, use an SVG `<path>` with native `fill` + `stroke` + `overflow: hidden` on the SVG wrapper instead.

---

---

### Rule 101 — Subject Badge audit: DS is always authoritative — docs and implementations drift

**What this rule is:** A standing lesson from the 2026-05-17 full Subject Badge live DS audit. Applies to Subject Badges specifically, and as a principle to all DS component audits.

---

#### 101a. Component location and size naming can change between sessions

The Subject Badge component **moved pages** and **renamed its sizes** at some point between May 2026 and May 2026-05-17:

| Property | Old (documented) | New (live DS 2026-05-17) |
|---|---|---|
| Page | `🔰 Iconography` | `⚙️ Badges` |
| Node type | `COMPONENT` (individual) | `COMPONENT_SET` (variant set) |
| Size=32px name | `- L` | `Size=M` |
| Size=24px name | `- M` | `Size=S` |

**Rule:** Never hardcode a page name or size variant name from memory when writing a Figma lookup script. Always discover dynamically:

```js
// CORRECT — discovers wherever they live
const sets = [];
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  const found = page.findAll(n => n.type === 'COMPONENT_SET' && n.name.startsWith('Subject Badge/'));
  found.forEach(n => sets.push({ page: page.name, id: n.id, name: n.name, variants: n.children.map(c => c.name) }));
}
return sets;
```

---

#### 101b. Always pull text color from the TEXT node inside the Label frame — per subject

The badge text color is on the `TEXT` node inside the `Label` child frame, not on the component root or label panel. The extraction path is:

```
COMPONENT (variant node)
  └── FRAME "Content"          → .strokes[0].color = border color
        ├── FRAME "Subject Icon"  (white slot — skip)
        └── FRAME "Label"      → .fills[0].color   = badge bg color
              ├── TEXT "Subject" → .fills[0].color  = text color
              └── VECTOR "Pointer"
```

**Correct extraction code:**
```js
const contentFrame = node.children.find(c => c.name === 'Content');
const labelFrame   = contentFrame?.children.find(c => c.name === 'Label');
const textNode     = labelFrame?.children.find(c => c.type === 'TEXT');

const border = contentFrame?.strokes?.[0]?.color;
const bg     = labelFrame?.fills?.[0]?.color;
const text   = textNode?.fills?.[0]?.color;
```

**Why this matters:** A generic `findAll` walk will hit the Subject Icon's vector fills before the Label fill, returning the wrong color as the "badge bg". Always target named children directly.

---

#### 101c. Text exceptions are not always the documented ones — always audit all 20

As of 2026-05-17 there are **three** dark-text exceptions (light backgrounds):

| Subject | bg | `--badge-text` |
|---|---|---|
| Science | `#ffd641` (yellow) | `#998027` |
| KAFA | `#8ae3a9` (mint green) | `#538865` |
| Geography | `#77d836` (light green) | `#478220` |

Geography was **not documented** prior to this audit. It renders white text on a light green badge — unreadable. The docs only listed Science and KAFA as exceptions.

**Rule:** When running a Subject Badge audit, always extract text color for ALL subjects and compare each against `#f2f2f2`. Any subject whose bg is a light or mid-tone color is a candidate for a dark-text exception. Never assume the documented exceptions are complete.

---

#### 101d. Docs can be wrong while the implementation is right — always verify both

In this audit, the HTML was **more accurate** than CLAUDE.md and zul.design.md for 3 border colors (Add Math, Account, Bahasa Melayu) and KAFA text. The docs had old values that were never corrected after a prior DS update.

**Rule priority (descending):**
```
1. Live DS (use_figma → inspect node → extract color)   ← always authoritative
2. Current HTML/CSS implementation                       ← may be ahead of docs
3. zul.design.md + CLAUDE.md                            ← may lag the DS
4. design.color.md                                       ← was already updated, still verify
```

When a doc value and the HTML value disagree, **go to the DS first** — one of the two is correct, but only the DS decides which.

---

#### 101e. Do a full Subject Badge color audit before any badge-related work

Any time a session involves Subject Badges (adding a new subject, changing badge layout, implementing a new quiz card section), run the full audit script below before touching any CSS:

```js
// Full audit — run at session start when badges are in scope
const badgesPage = figma.root.children.find(p => p.name.includes('Badges'));
await figma.setCurrentPageAsync(badgesPage);
const toHex = c => `#${[c.r,c.g,c.b].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('')}`;
const sets = badgesPage.findAll(n => n.type === 'COMPONENT_SET' && n.name.startsWith('Subject Badge/'));
const results = [];
for (const set of sets) {
  const sVariant = set.children.find(c => c.name.includes('Size=S'));
  if (!sVariant) continue;
  const content = sVariant.children.find(c => c.name === 'Content');
  const label   = content?.children.find(c => c.name === 'Label');
  const text    = label?.children.find(c => c.type === 'TEXT');
  results.push({
    subject: set.name.replace('Subject Badge/', ''),
    bg:     label?.fills?.[0]?.color ? toHex(label.fills[0].color) : '?',
    border: content?.strokes?.[0]?.color ? toHex(content.strokes[0].color) : '?',
    text:   text?.fills?.[0]?.color ? toHex(text.fills[0].color) : '?'
  });
}
return results.sort((a,b) => a.subject.localeCompare(b.subject));
```

Compare output against CSS variables in the HTML. Any mismatch must be fixed before other work begins.

---

---

### Rule 102 — Nav dropdown horizontal alignment: RIGHT-align to trigger button's right edge

Any `position: absolute` dropdown inside `#NavbarPrimary-Desktop` that is triggered by a button near the **right side** of the navbar must be positioned so its **right edge aligns with the trigger button's right edge**. The panel extends leftward. Never left-align these dropdowns to the button's left edge — the panel would overflow off-screen to the right.

**CSS default:**
```css
.my-dropdown {
  position: absolute;
  top:   80px;    /* navbar 64px + 16px gap — confirmed for all nav dropdowns */
  right: 0;       /* JS overrides per button; default fallback at viewport right */
  left:  auto;
  width: Xpx;     /* DS-confirmed width */
}
```

**JS pattern — `positionDropdown()`:**
```js
function positionDropdown() {
  var btnRect     = btn.getBoundingClientRect();
  var sectionRect = navSection.getBoundingClientRect();  // #NavbarPrimary-Desktop
  // right-align: dropdown right edge = trigger button right edge
  var rightOffset = sectionRect.right - btnRect.right;
  var dropW       = dropdown.offsetWidth || dsWidth;
  var maxRight    = sectionRect.width - dropW;   // clamp so it never clips left edge
  dropdown.style.right = Math.max(0, Math.min(rightOffset, maxRight)) + 'px';
  dropdown.style.left  = 'auto';
}
```

**Why `sectionRect.right - btnRect.right`:** `sectionRect.right` = viewport right edge (the section is full-width). `btnRect.right` = button's right edge from viewport left. Their difference = distance from the button's right edge to the viewport right. Setting `right: this value` on an element inside the section moves the element's right edge to the button's right edge. ✓

**All nav dropdowns confirmed at `top: 80px` (DS Frame 1707479685, May 2026):**
| Dropdown | DS y | Width |
|---|---|---|
| Download Apps | 80px | 238px |
| Notification | 80px | 320px |
| Learn Menu | 80px | 365px |
| Profile | 80px | 319px |

**DS gallery frames ≠ real UI x-positions:** The DS screen frame "Frame 1707479685" shows all four dropdowns simultaneously as a component gallery. Their x-coordinates in that frame (23, 282, 623, 1009) are display-only positioning for the gallery layout — NOT the actual CSS `left` values. Only `y` (always 80) and `width` are reliable from that frame. Horizontal alignment must always be derived from the trigger button via JS.

**Confirmed mistake (May 2026):** `positionDropdown()` computed `left = btnRect.left - sectionRect.left`. Since the waffle button is near the right edge of the navbar, the 365px dropdown was placed at `btnRect.left` (e.g. x=1196), which `maxLeft` clamped to x=1075 — positioning it partially over the right padding area and entirely to the right of the content. The fix: switch to `right`-based positioning so the panel sits correctly to the LEFT of the waffle button.

---

---

### Rule 103 — Always check `src/image-repo/` before exporting assets from Figma

Before exporting any icon, illustration, or image from Figma, **check the project's `src/image-repo/` directory first**. Authored assets stored there are the correct, production-ready versions — proper resolution, proper transparency, already prepared by the designer.

**Directory structure confirmed (May 2026):**
```
pandai.design/
  src/
    image-repo/
      Learn-Menu/       ← 12 feature icons (live-tuition, live-help, quiz, etc.)
        chapters.png
        experiments.png
        live-help.png
        live-tuition.png
        personality.png
        practice.png
        quick-notes.png
        quiz.png
        rewards.png
        textbook.png      ← maps to feature-textbooks.png in icons/
        university.png
        videos.png
```

**Workflow (mandatory for any image asset):**
```
1. Check src/image-repo/<ComponentName>/ — use these files if present
2. Only if absent: export from Figma via use_figma or get_screenshot
3. Copy to zul.test.git/icons/ with the correct feature-*.png naming
```

**Name mapping (src/image-repo/Learn-Menu → zul.test.git/icons):**
| Source filename | Target filename |
|---|---|
| `chapters.png` | `feature-chapters.png` |
| `experiments.png` | `feature-experiments.png` |
| `live-help.png` | `feature-live-help.png` |
| `live-tuition.png` | `feature-live-tuition.png` |
| `personality.png` | `feature-personality.png` |
| `practice.png` | `feature-practice.png` |
| `quick-notes.png` | `feature-quick-notes.png` |
| `quiz.png` | `feature-quiz.png` |
| `rewards.png` | `feature-rewards.png` |
| `textbook.png` | `feature-textbooks.png` |
| `university.png` | `feature-university.png` |
| `videos.png` | `feature-videos.png` |

**Mistake made (May 2026):** Spent multiple sessions trying to export icons via `use_figma` (base64 too large to write) and `get_screenshot` (only 52×52px, 1–3KB — too small and blurry), when the correct 12–30KB RGBA transparent PNGs were already sitting in `src/image-repo/Learn-Menu/`.

---

### Rule 104 — `get_screenshot` is for visual reference only — never use it for asset export

The Figma MCP `get_screenshot` tool returns a screenshot of a node at its **native 1× size** (e.g., 52×52px for a 52px component). This is appropriate for visual inspection during design review, but never for asset export into the prototype.

**Confirmed behavior (May 2026):**
- Returns PNG at component's native pixel dimensions (no upscaling)
- Feature/* icons: returned at 52×52px
- File size: 1–3KB (vs correct assets at 12–30KB)
- Even though color type = 6 (RGBA), the small size causes blurriness at 70px CSS display

**For checking transparency:** Use PowerShell to read byte 25 of the PNG (color type byte): `2` = RGB (no alpha), `6` = RGBA (alpha channel present). But RGBA alone doesn't guarantee the content is visually correct — check actual file size too. Correct Learn Menu icons are 12–30KB; anything under 5KB is a wrong export.

**Use `get_screenshot` for:** Side-by-side visual comparison, design review, confirming layout before implementation.

**Never use `get_screenshot` for:** Saving to `icons/` directory, using as `<img src>` in the prototype.

---

### Rule 105 — Learn Menu Button - Parts: only 3 states (Default / Hover / Selected)

The DS component `Learn Menu Button - Parts` (node `3880:50098`) has **exactly 3 states**. There is no Pressed, Active, or Focus state.

| State | bg | border | text |
|---|---|---|---|
| **Default** | transparent | none | `#404040` — `Text/default/heading` (`var(--text-default-heading)`) |
| **Hover** | `#e8fbe8` — `Surface/secondary/default-subtle` | `1px #00cc85` — `Border/primary/default` | `#00564c` — `Text/tertiary/default` |
| **Selected** | `#b5f291` — `Surface/secondary/default` | `1px #70bc6f` — `Border/secondary/focus` | `#00564c` — `Text/tertiary/default` |

**Key details:**
- `padding: 8px` all sides, `border-radius: 12px`, `min-height: 114px` per cell
- Grid: `display: grid; grid-template-columns: repeat(3, 1fr)` — NO gap between cells (items pack flush)
- Label: `font-size: 14px; font-weight: 600; line-height: 20px`
- Default label color is `Text/default/heading` = `#404040` — **NOT** `Text/default/body` = `#666666`

**Mistakes made (May 2026):**
- Implemented `.is-pressing` dark-teal state (from Rule 40) — this palette does NOT apply to Learn Menu Button, which has no Pressed variant in the DS. Always pull states from the SPECIFIC component's COMPONENT_SET, not from a general rule.
- Default label used `var(--text-default-body)` = `#666` — actual DS varName `106:34` maps to `Text/default/heading` = `#404040`.

---

*Generated: May 2026 | Last updated: 2026-05-18 (Rules 103–105 — image-repo first, get_screenshot reference only, Learn Menu Button states) | Cleanup target: Original DS (TLVKe3bgJTdVvuPAzgDq2f)*
