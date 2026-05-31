# Pandai DS — Documentation Frame Design Reference

Guide for creating and extending component documentation frames in the Pandai DS 1.5 Figma file (`TLVKe3bgJTdVvuPAzgDq2f`).

**Always read this file AND `design-md/zul.design.md` before starting any documentation design, making any changes, or making any decisions.**

---

## Mandatory Pre-Work Checklist

Before starting any documentation design work — no exceptions:

```
1. Read ds.documentation.md (this file)          → anatomy, section patterns, critical bugs
2. Read design-md/zul.design.md                  → all active rules (currently 1–152+)
3. Open DS: TLVKe3bgJTdVvuPAzgDq2f in Figma      → single source of truth
4. get_design_context on reference doc frame      → confirm current visual language
5. get_design_context on target COMPONENT_SET     → list ALL variants before writing code
6. get_design_context on EACH variant node        → confirm tokens and structure per state
7. Check DS Component Asset Index (memory)        → get correct node IDs before any lookup
8. Build incrementally: placeholder → section by section → screenshot after each
9. After each section append: verify ALL children y positions (catch y=0 bug early)
10. Final: full-frame screenshot → compare against reference doc frame
```

---

## Canonical Reference

| Item | Value |
|---|---|
| File | `TLVKe3bgJTdVvuPAzgDq2f` (Pandai DS 1.5) |
| Page | ⚙️ Button Group (`1986:23828`) |
| Reference frame | "Pandai - Components: Button Group" — node `4210:4726` |
| Built frame (May 2026) | "Calendar Option, L" variant properties — node `4995:301` |

---

## Frame Anatomy

### Outer Frame
- Width: **1488px** (fixed — all doc frames share this width)
- Layout: `VERTICAL`, `gap: 0`, white background
- Children: Header (fixed 160px) + Content (HUG vertical)

### Header (160px)
- Layout: `HORIZONTAL`, `paddingTop: 28`, `gap: 24`
- Left rect: `118×132`, `r: 24`, fill `#e8fbe8`, stroke `1px #00cc85`
- Text stack (425px wide, VERTICAL): "Pandai 1.5" (small) + "Components" (large, `#00cc85`)
- Right rect: `FILL × 132`, `r: 24`, fill `#e8fbe8`, stroke `1px #00cc85`

### Content Frame
- Layout: `VERTICAL`, `padding: 60`, `gap: 28`
- `layoutSizingVertical: 'HUG'` (valid here — Content is the auto-layout frame itself, not a child of one)
- Children: DocHeader + Component box

### DocHeader
- Layout: `VERTICAL`, `paddingLeft: 28`, `gap: 10`
- Title: 48px SemiBold Poppins `#00cc85` — the component/variant name
- Description: 24px Medium Poppins `#666666` — one-line summary of what the component does
- Tags row: `HORIZONTAL`, `gap: 8` — color-coded type pills (see Tag Pills below)

### Component Box
- Layout: `VERTICAL`, `padding: 28`, `gap: 28`, `r: 24`, stroke `1px #d9d9d9`
- `layoutSizingHorizontal: 'FILL'`
- `layoutSizingVertical: 'FIXED'` ← **CRITICAL — must be FIXED, not HUG (see Bug section)**
- Children: alternating `§Section` frames + `1px #e5e7eb` RECTANGLE dividers

---

## Section Tag Pills

Every section opens with a green pill label:

| Property | Value |
|---|---|
| Background | `#e8fbe8` |
| Stroke | `1px solid #70bc6f` |
| Text color | `#70bc6f` |
| Font | Poppins SemiBold 11px, line-height 16px |
| Padding | `t:4 r:12 b:4 l:12` |
| Border-radius | 99px |
| Layout | `HORIZONTAL`, `HUG × HUG` |

**Label format:** `"Section Title  —  Subtitle"` (em-dash `—` with spaces on both sides)

**Example labels:**
- `"Size  —  Variant Properties"`
- `"State  —  Button Group - Parts"`
- `"Instance Swap  —  Icon  ·  Show Icon  ·  Show Label"`
- `"Text Properties  —  Label"`

---

## Section Patterns

### §Variants

Documents all size/type variants of the component.

**Structure:**
1. Green section tag: `"Size  —  Variant Properties"` (or `"Type  —  ..."`)
2. Description text (13px Regular `#666666`)
3. Column header row: one "L" / "M" / "S" grey pill per available size
4. One row per component type: grey label pill + component instance(s)

**If only one size exists** (e.g. Calendar Option, L only): show single "L" column header, single instance — never invent M/S columns.

---

### §Parts — States

Documents all interactive states of the component-parts variant.

**Structure:**
1. Green section tag: `"State  —  ComponentName - Parts"`
2. Description text
3. State label row: left spacer + state name labels (Default / Hover / Pressed / Disabled / Active)
4. State instances row: one component instance per state
5. Grey pill: `"Sizes — L · M · S at Default state"`
6. Size instances row: L + M + S instances all at Default state

**Button Group - Parts confirmed state node IDs (COMPONENT_SET `646:673`):**

| State | Node ID |
|---|---|
| Active | `665:592` |
| Disabled | `646:738` |
| Pressed | `646:746` |
| Hover | `646:754` |
| Default (L) | `646:762` |
| Default (M) | `1510:7832` |
| Default (S) | `1510:7902` |

---

### §Instance Swap

Documents boolean and swap properties on the component.

**Structure:**
1. Green section tag: `"Instance Swap  —  [property names joined by  ·  ]"`
2. For each boolean property:
   - Sub-header row: property name pill + `"= true"` label + `"= false"` label
   - Instance row: `= true` instance (default) + `= false` instance (property toggled off)
3. Annotation text below instances

**Setting properties on instances:**
```js
inst.setProperties({ 'Show Icon#473:5': false });
inst.setProperties({ 'Show Label#643:3': false });
```

**Button Group - Parts confirmed component properties:**

| Key | Type | Default |
|---|---|---|
| `Label#473:4` | TEXT | `"Button"` |
| `Show Icon#473:5` | BOOLEAN | `true` |
| `Show Label#643:3` | BOOLEAN | `true` |

---

### §Text Properties

Documents editable text properties.

**Structure:**
1. Green section tag: `"Text Properties  —  [property name]"`
2. Property descriptor row: property name pill + `"string"` type pill + description
3. Default instance (label = default value) + custom instance (label = example custom value)
4. Annotation below custom instance showing the value used

**Setting text properties:**
```js
inst.setProperties({ 'Label#473:4': 'Monthly' });
```

---

## Typography Reference

| Use | Font | Size | Weight | Color |
|---|---|---|---|---|
| Frame title | Poppins | 48px | SemiBold | `#00cc85` |
| Frame description | Poppins | 24px | Medium | `#666666` |
| Section tag label | Poppins | 11px | SemiBold | `#70bc6f` |
| Body / annotations | Poppins | 13px | Regular | `#666666` |
| Small annotations | Poppins | 12px | Regular | `#666666` |

---

## Color Reference

| Hex | Use |
|---|---|
| `#00cc85` | Frame titles, header text, component box accent |
| `#e8fbe8` | Header rects background, section tag background |
| `#70bc6f` | Section tag text + stroke |
| `#666666` | Descriptions, body text, annotations |
| `#d9d9d9` | Component box stroke |
| `#e5e7eb` | Section divider rectangles (1px height) |
| `#f2f2f2` | Grey label pills |

---

## Critical Bug — `layoutSizingVertical = 'HUG'` on FRAME children

**This is the #1 cause of broken layouts in documentation frames.**

`figma.createAutoLayout()` defaults `layoutSizingVertical = 'HUG'` on new frames. When that frame is then appended as a **child of a VERTICAL auto-layout parent**, this value becomes invalid — and the **last appended child snaps to `y: 0`**, overlapping the first child.

**Rule:** Immediately after appending any FRAME child to a vertical auto-layout, explicitly set:
```js
child.layoutSizingVertical = 'FIXED';
child.layoutSizingHorizontal = 'FILL';  // or 'FIXED' if not full-width
```

**Does NOT apply to TEXT children** — text nodes can use `'HUG'` freely in any context.

**Detection:** After each `appendChild`, read `child.y`. If it returns `0` when you expected a non-zero position, the HUG bug has triggered. Fix immediately before appending the next child.

**Confirmed affected nodes (May 2026 session):**
- Component box children: set `layoutSizingVertical = 'FIXED'`
- All §Section frame children of the component box: set `layoutSizingVertical = 'FIXED'`
- Row frames (state row, size row, icon row, label row) inside sections: set `layoutSizingVertical = 'FIXED'`

---

## Positioning New Documentation Frames

1. Switch to the target page via `await figma.setCurrentPageAsync(page)`
2. Find the rightmost existing frame: scan `page.children`, compute `x + width` for each
3. Place new frame at `x = rightmost_x + gap` (gap = 100–200px), `y = same y as reference frame`
4. Confirm the position with a read-back before building content

**Button Group page current layout (confirmed May 2026):**
- Reference frame `4210:4726` at x ≈ 4224
- New frame `4995:301` at x = 5724 (gap ≈ 100px from right edge of reference)

---

## Incremental Build Workflow

Never build the entire frame in one `use_figma` call. Work section by section:

```
Step 1: Create outer frame + header → screenshot → confirm dimensions
Step 2: Create content frame + DocHeader → screenshot → confirm height expansion
Step 3: Create component box (empty) → confirm it appears
Step 4: Build §Variants section → append → verify child y positions
Step 5: Add divider → build §Parts States → append → verify child y positions
Step 6: Add divider → build §Instance Swap → append → verify child y positions
Step 7: Add divider → build §Text Properties → append → verify child y positions
Step 8: Final screenshot → compare against reference frame
```

**After each append step: read `child.y` for every child of the parent auto-layout.** If any `y === 0` unexpectedly, stop and apply the FIXED fix before continuing.

---

## Component Instances in Documentation

When placing component instances in documentation frames:

```js
// 1. Find the component by node ID (from DS Component Asset Index)
const comp = await figma.importComponentByKeyAsync(componentKey);
// OR find by ID on current page:
const comp = figma.currentPage.findOne(n => n.id === 'NODE_ID' && n.type === 'COMPONENT');

// 2. Create instance
const inst = comp.createInstance();

// 3. Set properties (boolean/text swaps)
inst.setProperties({ 'Show Icon#473:5': false });

// 4. Append to parent
parentFrame.appendChild(inst);
inst.layoutSizingVertical = 'FIXED';  // apply FIXED immediately after append
```

**Never hardcode assumed property keys.** Always verify keys from `component.componentPropertyDefinitions` before calling `setProperties()`.

---

## Mandatory Pre-Work — Updated Rule (June 2026)

**Before starting ANY documentation design work, making any changes, or making any decisions:**

```
□ 1. Read ds.documentation.md (this file)            → all anatomy, patterns, and critical bugs
□ 2. Read design-md/zul.design.md                    → all active rules (1–204+)
□ 3. Open live DS: TLVKe3bgJTdVvuPAzgDq2f            → single source of truth — NOT memory
□ 4. get_design_context on reference doc frame        → confirm current visual language
□ 5. get_design_context on target COMPONENT_SET       → list ALL variants before writing any code
□ 6. Check DS Component Asset Index (memory)          → get node IDs — never guess
□ 7. For grids/showcases: plan column-first grouping  → see "Grid Layout Rules" section below
□ 8. Build incrementally — verify after each section  → never build entire frame in one call
□ 9. After adding all grid content: re-apply HUG      → see "Critical Bug 2" below
```

---

## Grid Layout Rules (HORIZONTAL WRAP showcase frames)

When building a multi-variant, multi-state showcase grid (e.g. Button Group States):

### Column-first grouping — ALWAYS

**Never group by size row.** Always group by scenario column.

| Wrong (row-based) | Correct (column-based) |
|---|---|
| L-row (all 7 scenario instances) | scenario-1-col (L + M + S stacked) |
| M-row (all 7 scenario instances) | scenario-2-col (L + M + S stacked) |
| S-row (all 7 scenario instances) | scenario-3-col … |

**Why:** When `layoutWrap: 'WRAP'` is enabled, row-based grouping wraps each size row independently — L-row wraps at col 4, M-row wraps at col 3, S-row wraps at col 5 — producing misaligned, disorganized output. Column-based grouping wraps entire scenario units together.

### Correct grid structure

```
scenarios-grid (HORIZONTAL, WRAP, FIXED width, counterAxisAlignItems: 'MIN')
└── scenario-col × N  (VERTICAL, HUG, gap 20)
    ├── "Scenario N" label
    └── size-cell × 3  (VERTICAL, HUG, gap 6)
        ├── component instance
        └── "L  D·D·D" size+state label
```

### Grid frame settings

```js
const grid = figma.createAutoLayout('HORIZONTAL', {
  name: 'scenarios-grid',
  fills: [],
  itemSpacing: 24,                         // gap between scenario columns
  layoutSizingHorizontal: 'FIXED',         // constrain wrap boundary
  layoutSizingVertical: 'HUG',             // must be re-applied after content (see Bug 2)
  counterAxisAlignItems: 'MIN',            // align wrapped rows to top — always MIN for grids
});
grid.layoutWrap = 'WRAP';
try { grid.counterAxisSpacing = 32; } catch(e) {}  // gap between wrapped rows
grid.resize(targetWidth, 10);             // set width; height locked here — re-apply HUG after

// ← Add ALL children here ←

// MANDATORY: re-apply HUG after all children are added
grid.layoutSizingVertical = 'HUG';
parentSection.layoutSizingVertical = 'HUG';
```

### State abbreviation convention

| State | Abbreviation |
|---|---|
| Default | D |
| Hover | H |
| Pressed | P |
| Active | A |
| Disabled | X |

---

## Critical Bug 2 — `resize()` locks height, overriding `layoutSizingVertical: 'HUG'`

**This is distinct from the y:0 HUG bug above. Both must be guarded against.**

Calling `resize(w, h)` on any auto-layout frame locks BOTH dimensions to FIXED pixel values, overriding any `layoutSizingVertical: 'HUG'` setting — even if HUG was set in the `createAutoLayout` props. The frame height is then frozen at the explicit `h` value (e.g. 10px), regardless of content added afterward.

**Symptom:** Grid or section card shows only a sliver (e.g. h=10) even though children have correct non-zero heights (e.g. 237px tall scenario columns).

**Detection:** After creating and populating a grid, `console.log` or `return` the grid height. If it equals the value passed to `resize()`, the bug has triggered.

**Rule: Always re-apply `layoutSizingVertical = 'HUG'` AFTER adding all children — never rely on the creation-time prop.**

```js
// WRONG — HUG set at creation time but resize() overrides it
const grid = figma.createAutoLayout('HORIZONTAL', { layoutSizingVertical: 'HUG', ... });
grid.resize(1312, 10);   // ← this locks height at 10px!
// ... add children ...
// grid.height is still 10px — children are clipped

// CORRECT — re-apply HUG after all content is added
const grid = figma.createAutoLayout('HORIZONTAL', { ... });
grid.resize(1312, 10);
// ... add ALL children ...
grid.layoutSizingVertical = 'HUG';   // ← re-apply after content
parentSection.layoutSizingVertical = 'HUG';  // ← also fix the parent
```

---

## Figma Plugin API — Documentation-Specific Gotchas

### `importComponentByKeyAsync` vs `getNodeByIdAsync`

| Use | When |
|---|---|
| `importComponentByKeyAsync(key)` | Component IS published to team library |
| `getNodeByIdAsync(id)` | Component is NOT published (e.g. Parts variants on same page) |

`importComponentByKeyAsync` throws `"Component with key '...' not found"` for unpublished components. Button Group - Parts (`646:673`) is NOT published — always use `getNodeByIdAsync`.

### `insertBefore` does not exist — use `insertChild(indexOf)`

```js
// WRONG
parent.insertBefore(newNode, referenceNode);  // TypeError: no such property 'insertBefore'

// CORRECT
parent.insertChild(parent.children.indexOf(referenceNode), newNode);
```

### Node `findOne` is case-sensitive

`findOne(n => n.name === 'content')` fails if the actual frame name is `'Content'`. Always inspect with `use_figma` first:
```js
return docFrame.children.map(c => ({ id: c.id, name: c.name }));
```

### Part state overrides — always wrap in try/catch

`setProperties({ State: '...' })` throws for Part sub-instances where `mainComponent.variantProperties === null` (inaccessible component branches). Use try/catch for every Part iteration:

```js
parts.forEach((p, i) => {
  try { p.setProperties({ State: combo[i] }); } catch(e) {}
});
```

**Known inaccessible Part slots (Button Group - 1.5, confirmed June 2026):**
- Navigate Group — **left arrow** Part: `variantProps: null`, State override silently fails
- Calendar Option — **right arrow** Part: `variantProps: null`, State override silently fails

Only override the slots you know are accessible. For Navigate Group, the right-arrow state is the only independently controllable slot.

### MCP tool registration — session startup only

Figma MCP tools (`use_figma`, `get_design_context`, etc.) register only when the session starts. If they appear in `<system-reminder>` as deferred tools, load schemas with:

```
ToolSearch query="select:mcp__claude_ai_Figma__use_figma,mcp__claude_ai_Figma__get_design_context"
```

---

## Button Group — States Frame (June 2026)

| Item | Value |
|---|---|
| Frame name | "Pandai - Components: Button Group — States" |
| Node ID | `5596:404` |
| Page | ⚙️ Button Group (`1986:23828`) |
| Position | x=5624, y=-2191 (beside reference frame `4210:4726` at x=4036) |
| Width | 1488px |
| Content node | `5596:412` (name: "Content", capital C) |

**Sections and their nodes:**

| Section | Node | Description |
|---|---|---|
| Header | `5596:413` | Green pill + description text |
| Button Group (Section 1) | `5610:1133` | 7 scenarios × L/M/S, randomized state combos |
| Navigate Group (Section 2) | `5614:857` | 5 scenarios × L/M/S, right arrow state varies |
| Calendar Option (Section 3) | `5614:1200` | 5 scenarios × L only, [Prev/Monthly/Yearly] combos |
| Parts Matrix (Section 4) | `5602:1012` | All states × all sizes reference matrix |

**Button Group - Parts node IDs (NOT published — use `getNodeByIdAsync`):**

| Size | State | Node ID |
|---|---|---|
| L | Default | `5591:2069` |
| L | Hover | `646:754` |
| L | Pressed | `5591:2081` |
| L | Active | `665:592` |
| L | Disabled | `646:738` |
| M | Default | `1510:7832` |
| M | Hover | `1510:7826` |
| M | Pressed | `1510:7814` |
| M | Active | `1510:7820` |
| M | Disabled | `1510:7808` |
| S | Default | `1510:7902` |
| S | Hover | `1510:7896` |
| S | Pressed | `1510:7884` |
| S | Active | `1510:7890` |
| S | Disabled | `1510:7878` |

**Button Group - 1.5 assembled component node IDs:**

| Type | Size | Node ID |
|---|---|---|
| Button Group | L | `646:975` |
| Button Group | M | `1510:7913` |
| Button Group | S | `1510:7953` |
| Navigate Group | L | `646:1012` |
| Navigate Group | M | `1510:7993` |
| Navigate Group | S | `1510:8006` |
| Calendar Option | L | `4590:95334` |

---

## What Was Built — May 2026

**Frame: "Calendar Option, L" variant properties documentation**
- Node: `4995:301`, page `1986:23828` (⚙️ Button Group)
- Final size: 1488×1777px
- Sections: §Variants (y:28, h:201) · §Parts States (y:286, h:293) · §Instance Swap (y:636, h:394) · §Text Properties (y:1087, h:167)
- Key finding: Calendar Option only has Size=L — documented with a single column rather than L/M/S

**Issues resolved:**
- Content frame stuck at 100px → fixed by setting `primaryAxisSizingMode = 'AUTO'` + `layoutSizingVertical = 'HUG'`
- `layoutMode` property access on TEXT nodes → fixed with `['FRAME','COMPONENT','INSTANCE','GROUP','COMPONENT_SET'].includes(n.type)` guard
- `fontName` returns symbol on mixed-font nodes → fixed with `typeof n.fontName.family === 'string'` check
- Last auto-layout child snapping to `y: 0` → fixed by setting `layoutSizingVertical = 'FIXED'` on all FRAME children of vertical auto-layout parents
