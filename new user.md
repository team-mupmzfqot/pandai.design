# New User Onboarding — Pandai Design System 1.5 Repo

> **Read this top to bottom before touching anything.** It is the single fastest way to become productive in this repo without repeating the mistakes already catalogued across ~1.2 MB of design logs.
>
> **Audience:** a fresh Claude (or any AI agent / new human dev) starting work in this repository for the first time.
>
> **What this repo is:** a design-to-code workspace where Pandai's UI screens are rebuilt as pixel-accurate static HTML/CSS/JS prototypes, sourced 1:1 from the **Pandai Design System 1.5** Figma file via the Figma MCP. There is also a small React/TypeScript component library under `src/`, but the active day-to-day work is the HTML prototypes.
>
> **Verified:** 2026-06-09 — MCP connections, Figma auth, and DS access were all live-checked when this file was written (see §3).

---

## 0. The one rule that prevents 95% of all mistakes

**Every mistake recorded in this project came from skipping "Step 0."** Before you write a single line of CSS, HTML, or even make a "trivial" decision:

```
□ 0a. Read design-md/zul.design.md        → the master design log (rules 1–238)
□ 0b. Read CLAUDE.md                       → project rules 1–100 (already auto-loaded each session)
□ 0c. Open the DS live: TLVKe3bgJTdVvuPAzgDq2f → single source of truth, NOT memory/docs
□ 0d. Load the relevant memory files       → check MEMORY.md index, load matching entries
□ 0e. Load Figma skills                    → /figma-use BEFORE any use_figma call
□ 0f. get_design_context on the COMPONENT_SET → list ALL variant names before any CSS
□ 0g. Confirm WHICH variant the prototype follows — ask if uncertain, never assume
□ 0h. get_design_context on EACH state     → extract every token BEFORE writing CSS
□ 0i. use_figma raw inspection             → confirm padding, strokeAlign, clipsContent, w/h, radius
□ 0j. get_variable_defs on the exact sub-node → confirm the Semantic token per fill/stroke/spacing
□ 0k. Cross-check the CSS var against :root → never guess a px value from a token name
□ 0l. get_screenshot ONLY for post-build QA → NEVER to extract spec values (Rule 193)
□ 0m. After any fix to a shared component → sync the change to BOTH HTML files (Rule 184)
```

> **Why so strict?** DS token values change between sessions without notice. Session notes and `.md` files are navigation context, **not** authoritative values. Always re-verify live from Figma. A 2-minute inspection always costs less than the bug it prevents.

---

## 1. Project identity at a glance

| Thing | Value |
|---|---|
| Product | **Pandai** — Malaysian educational platform (Student / Teacher / Parent roles) |
| This repo's job | Rebuild Pandai screens as DS-accurate static HTML prototypes for engineer handoff |
| Design tool | Figma → Figma MCP → Claude Code → VS Code |
| Git remote | `git@github.com:team-mupmzfqot/pandai.design.git` |
| Default branch | `main` |
| Active working branch | `staging` (PRs usually target `main`) |
| Primary working dir | `c:\Users\zulfa\OneDrive\Desktop\pandai.design` |
| Platform | Windows 11 · PowerShell + Bash both available |
| Role context for all prototypes | **Student** → primary color is OG-Green `#00cc85` (Student is **not** pink) |

---

## 2. Design System 1.5 — the single source of truth

### The ONLY valid file

| File key | Name | Status |
|---|---|---|
| **`TLVKe3bgJTdVvuPAzgDq2f`** | **Pandai Design System 1.5** | ✅ The ONLY authoritative source |

Library key (for scoping `search_design_system` with `includeLibraryKeys`):
`lk-fe531914dfc4e3a70293a1336eb81a76c4c49789305f3db519f3ad93e1770d4d25575f3453c3b5f280b719ea562d7f0e2c345bbfa0f023638b25983f4613efba`

### FORBIDDEN sources — ignore entirely if `search_design_system` returns them

| Don't use | Why |
|---|---|
| `Y0DLhf2MGdGwG0jyjN7EbQ` — "Pandai DS 1.5 (WIP) (BACKUP)" | Historical snapshot only |
| "Web - Pandai Design System (UI KIT)" | Old/different system |
| "Mobile - Design System (UI KIT)" | Old/different system |
| "TEMPLATE LIBRARY FOR PANDAI (vuexy…)" | Unrelated template |
| Pages named "Zul's Dungeon" / "Nadia Exploration" / "Syakila Components" | Scratch pages, not authoritative |

`search_design_system` **will** return matches from these libraries (confirmed live — the same "Button" query returns DS 1.5 + WIP Backup + two UI Kits). Filter to DS 1.5 only.

### Token architecture (three layered collections)

```
Primitives ──┐
             ├──► Product (Student / Teacher / Parent modes) ──┐
             │                                                  ├──► Semantic (Light / Dark) ──► CSS custom properties
             └──────────────────────────────────────────────►─┘
```

| Collection | Modes | Use in CSS? |
|---|---|---|
| **Primitives** (~478 vars) | 1 (Value) | Never directly — only via aliases |
| **Product** (~174 vars) | 3 (Student/Teacher/Parent) | Only for role-specific components (e.g. Button - 1.5) |
| **Semantic** (~329 vars) | 2 (Light/Dark) | **Default — ~95% of all CSS** |
| **Responsives** (~64 vars) | 3 (Desktop/Tablet/Mobile) | For breakpoint type scale + grid |

- **Token name = Figma path, kebab-cased.** `Surface/primary/default` → `--surface-primary-default`. No `--pd-` prefix, no abbreviations, no invented names.
- **Pick the token by semantic context, not by hex.** `--icon-primary-default` and `--surface-primary-default` are both `#00cc85` — only one is right per line.
- Published as a Figma Team Library (255 paint styles, 6 effect styles, 21 text styles, 195+ component sets, 938 variables).
- **Authoritative color reference:** [`design.color.md`](design.color.md). When CLAUDE.md and design.color.md disagree on a state color, **design.color.md wins** — but live DS beats both.

---

## 3. MCP — connections to verify on day one

Run this first and confirm the output:

```bash
claude mcp list
```

Expected (verified 2026-06-09):

| Server | URL | Status | Use it? |
|---|---|---|---|
| **claude.ai Figma** | `https://mcp.figma.com/mcp` | ✓ Connected | ✅ **Yes — this is the active one** (`mcp__claude_ai_Figma__*` tools) |
| `figma-desktop` | `http://127.0.0.1:3845/mcp` | ✓ Connected | Fallback (Figma Desktop app must be running) |
| `plugin:figma:figma` | `https://mcp.figma.com/mcp` | ! Needs authentication | Ignore / not required |

### Verify auth + DS access

```
mcp__claude_ai_Figma__whoami
```
Should return: **Zulfadhli bin Azizan** · `zulfadhli@pandai.org`, with access to "Pandai Workspace v2" (pro tier).

```
mcp__claude_ai_Figma__search_design_system(query: "Button", fileKey: "TLVKe3bgJTdVvuPAzgDq2f")
```
Should return components whose `libraryName` is **"Pandai Design System 1.5"** (e.g. Button - 1.5, Pill Button - 1.5). If you only get UI-KIT / WIP-Backup results, auth or file access is broken — stop and fix before proceeding.

### Figma MCP tools (deferred — load via ToolSearch before first use)

The Figma tools are deferred. Fetch a schema with `ToolSearch query:"select:<tool_name>"` before calling. Core ones:

| Tool | Purpose | When |
|---|---|---|
| `search_design_system` | Find a component/variable/style by name → get its key | Step 1 of lookup |
| `get_design_context` | Structured variants, tokens, layout, dimensions | **Primary spec tool** |
| `get_variable_defs` | Exact Semantic token name per fill/stroke/spacing | Confirm tokens on sub-nodes |
| `use_figma` | Raw node inspection / JS in file (padding, strokeAlign, w/h) | Confirm exact geometry — **requires `/figma-use` skill first** |
| `get_screenshot` | Visual render | **QA only, NEVER for spec extraction** (Rule 193) |
| `get_metadata`, `get_libraries`, `get_figjam`, `exportAsync` (via use_figma) | Supporting | As needed |

### Mandatory skills (load before the matching tool)

| Skill | Required before |
|---|---|
| **`/figma-use`** | **Every** `use_figma` call (non-negotiable) |
| `/figma-generate-design` | Pushing a page/layout into Figma |
| `/figma-generate-library` | Building DS components in Figma |
| `/figma-code-connect` | Mapping Figma components to code |
| `/figma-create-new-file` | Before `create_new_file` |
| `/figma-generate-diagram` | Before `generate_diagram` |

---

## 4. The standard Figma → code workflow

```
1. search_design_system   → confirm the component exists in DS 1.5, get its componentKey
2. get_design_context     → on the COMPONENT_SET: list ALL variants + per-variant tokens/layout
3. get_design_context     → on EACH interactive state (Default/Hover/Pressed/Active/Selected/Disabled)
4. get_variable_defs      → on the EXACT sub-node you're styling (chevron color ≠ button color)
5. /figma-use → use_figma → raw geometry: padding, strokeAlign, clipsContent, width, height, radius
6. Implement              → only DS-confirmed values, zero hardcoded hex / px, zero approximation
7. get_screenshot         → post-build QA ONLY. Discrepancy? Go back to steps 2–5, not the screenshot
```

**Hard prohibitions** (from CLAUDE.md / zul.design.md — see those for the full list):
- No gradients. No `box-shadow` for elevation on cards/modals (use `1px solid var(--border-primary-default)`).
- No hardcoded hex or px in rule declarations — always a CSS custom property mapped to a DS token.
- No guessing states by darkening/lightening — every state is a discrete DS variant, pulled separately.
- `strokeAlign` maps precisely: `INSIDE` → `box-shadow: inset`; `OUTSIDE` → `box-shadow` (no inset); `CENTER` → `border`. Always verify with `use_figma`.
- Every icon is an `<svg><use href="#ic-*">` symbol — never inline a duplicate path; viewBox must match the DS export frame size (+1px buffer).

---

## 5. Repository map

### Documentation (`.md`) — read in this order

| File | Size | What it is | Read when |
|---|---|---|---|
| **`CLAUDE.md`** | 166 KB | Project rules 1–100 + mandatory workflow. Auto-loaded every session. | Always (it's in context) |
| **`design-md/zul.design.md`** | 535 KB | The master design log — rules 1–238, every confirmed spec + mistake. | Before any design work |
| **`design.color.md`** | 50 KB | Authoritative color/token reference (tokens, subject palette, state recipes). | Before any color CSS |
| **`ds.documentation.md`** | 20 KB | How to build/extend Figma documentation frames. | Only for doc-frame work |
| `design-md/nadia.design.md` | 200 KB | Nadia's workstream log (Class/Practise/Rewards). | When working her pages |
| `design-md/syakila.design.md` | 230 KB | Syakila's workstream log (Learn/Achievement). | When working her pages |
| `design-md/azrai.git.md` | 10 KB | Azrai's workstream log (Profile/Customizer). | When working his pages |
| `MEMORY.md` (in `~/.claude/projects/.../memory/`) | index | Pointer to 100+ atomic memory files. | Every session start |

> **Cross-file consistency rule:** when a rule is resolved/corrected, propagate it to **all** `.md` files covering that topic **in the same commit** (CLAUDE.md, design.color.md, zul/nadia/syakila design logs). Partial truth is worse than none.

### Prototype workstreams (the active work)

| Directory | Owner | Contents |
|---|---|---|
| **`zul.test.git/`** | Zul | `zul.home.screen.html` (home — **authoritative source**), `zul.page.template.html` (subpage template), `assets/`, `icons/` |
| `Nadia.test.git/` | Nadia | `Class/`, `Practise/`, `Rewards/` HTML pages |
| `syakila.test.git/` | Syakila | 15 HTML pages — Learn hub, quick notes, videos, experiments, textbook, score/report/analysis cards |
| `azrai.test.git/` | Azrai | `azrai.html`, `characterCustomizer.html` (Profile page), `assets/` |
| **`test.page.compiled/`** | shared | 25 **compiled/synced** pages for engineer handoff. `home.html` is synced FROM `zul.home.screen.html` (authoritative). `assets/` shared. |

> The two-file sync (Rule 184): shared components — navbar, dropdowns, footer, `:root` tokens, `<svg><defs>` symbols — must be kept identical across `zul.home.screen.html` AND `zul.page.template.html` (and propagated into `test.page.compiled/` pages). Grep both before committing a shared-component fix.

### React/TS component library

| Path | Contents |
|---|---|
| `src/components/` | `Button.tsx`, `SchoolHeaderCard/`, `StudentProgressCard/` (+ `.styles.ts`), `index.ts` |
| `src/tokens/` | `colors.ts`, `spacing.ts`, `typography.ts` |
| `src/styles/`, `src/utils/` | supporting |
| `pandai.design/` | a **nested second copy** of the package (separate `src/`, tests, `docs/`, its own CLAUDE.md). Legacy/parallel — confirm with the user before editing here. |

### Asset repository — `src/image-repo/`

Convention (CLAUDE.md Rules 67–68): one component-scoped subfolder per DS instance:
```
src/image-repo/[page-name]/assets/[variant]/[ComponentName]/file
```
- One folder per DS instance that uses `<img>` files. Copy shared assets into each folder — never cross-reference.
- Inline `<use href="#ic-*">` symbols are exempt (no file path).
- **Before exporting any asset:** grep the HTML for an existing `<symbol id=…>` and `Glob src/image-repo/` — it may already exist.
- Pages with established assets: `page.home` (41 assets, 7 subfolders), `page.template`, plus `Achievement/`, `Learn/`, `Learn-Menu/`, `Home/`.

---

## 6. Running the prototypes (dev server)

These are **static HTML files** — no build step. Serve the repo root and open the file.

A `SessionStart` hook (`.claude/settings.local.json`) **auto-starts** a static server on `:3000` if one isn't already running:
```
npx serve . --listen 3000   (launched hidden via cmd.exe)
```

Open a page in the VS Code Simple Browser, e.g.:
```
http://localhost:3000/zul.test.git/zul.home.screen.html
http://localhost:3000/test.page.compiled/home.html
```

Manual start (if the hook didn't run):
```powershell
Start-Process -FilePath "cmd.exe" -ArgumentList '/c','cd /d "C:\Users\zulfa\OneDrive\Desktop\pandai.design" && npx serve . --listen 3000' -WindowStyle Hidden
```

> Azrai's pages are previewed with **live-server**, not `npx serve` — note the difference if working in `azrai.test.git/`.
>
> **`npm run dev` / `npm run build` are not the prototype workflow** — `package.json` build/test are no-ops; `start` runs Vite for the React library only. The prototypes are pure static files.

The repo also has `build-bookmarks.ps1` — a PowerShell page-generator that assembles one HTML page from another by line-range splicing (used in Syakila's workstream). If you touch it, note CLAUDE.md Rule 45/62: bulk line-splicing can orphan `/*` comment openers or `<!--` before `<script>`, silently killing CSS rules / all JS. Always grep-verify after assembly.

---

## 7. Git workflow

- **Current branch:** `staging`. **Default/PR target:** `main`.
- Other branches: `development-component`, `fix/icon-viewbox-badge-sizing`, `master` (legacy).
- Commit/push **only when the user asks.** If on `main`, branch first.
- Permissions already allowed (`.claude/settings.local.json`): `git config/add/commit/push/pull/mv/stash`.
- Commit message footer (required by harness):
  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```
- The working tree usually has many modified/untracked `test.page.compiled/*.html` files — these are sync outputs. Check with the user before assuming they're stray.

---

## 8. The persistent memory system

There's a file-based memory at:
```
C:\Users\zulfa\.claude\projects\c--Users-zulfa-OneDrive-Desktop-pandai-design\memory\
```
- `MEMORY.md` is the index (loaded each session) — one line per memory.
- ~100+ atomic memory files, each one fact with frontmatter (`type: user | feedback | project | reference`).
- **At session start:** scan `MEMORY.md` and load entries relevant to your task.
- **When you confirm something non-obvious** (a DS value, a corrected approach, a user preference): write a new memory file + add its index line. Don't duplicate what the repo/git already records.
- Memories reflect what was true when written — **re-verify any named file/token/flag against live DS before relying on it.**

---

## 9. First-session checklist (do this in order)

```
□ 1. Confirm you're in c:\Users\zulfa\OneDrive\Desktop\pandai.design on branch `staging`
□ 2. Run `claude mcp list` → confirm "claude.ai Figma: ✓ Connected"
□ 3. Run whoami → confirm zulfadhli@pandai.org has DS access
□ 4. search_design_system(query, fileKey:"TLVKe3bgJTdVvuPAzgDq2f") → confirm "Pandai Design System 1.5" results
□ 5. Skim CLAUDE.md (auto-loaded) + open design-md/zul.design.md
□ 6. Read MEMORY.md index; load memories matching your task
□ 7. Identify which prototype file(s) your task touches (zul / nadia / syakila / azrai / compiled)
□ 8. Confirm the dev server is up on :3000 (or start it)
□ 9. For ANY design change → run the Step 0 checklist (§0) before writing code
□ 10. After a shared-component change → sync both HTML files + propagate to compiled pages
```

---

## 10. Quick-reference: the non-negotiables

1. **DS 1.5 (`TLVKe3bgJTdVvuPAzgDq2f`) is the only source.** Ignore WIP Backup + UI Kits + scratch pages.
2. **Never hardcode a hex or px** — always a CSS var mapped to a DS token; pick by semantic context.
3. **Never approximate a state** — pull each variant from Figma; states change between sessions, re-verify live.
4. **`/figma-use` before every `use_figma`.** Screenshots are QA-only, never for specs.
5. **Confirm the variant** the prototype follows before building — ask if unsure.
6. **`strokeAlign` → CSS** mapping verified per element. No gradients. No elevation shadows on containers.
7. **Sync shared components** across both zul HTML files (and compiled pages) in the same change.
8. **Student role = OG-Green `#00cc85`.** Not pink (that's Teacher).
9. **Commit/push only when asked**, on a non-`main` branch, with the Co-Authored-By footer.
10. **When in doubt, inspect the sub-node, not the parent**, and re-read zul.design.md.

---

*Generated 2026-06-09 for fresh-agent onboarding. Living document — if a connection, file path, or rule changes, update this file and note it in the relevant `.md` log. Authoritative rule sources remain CLAUDE.md, design-md/zul.design.md, and design.color.md; the live DS beats all docs.*
