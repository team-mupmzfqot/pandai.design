$src = 'C:\Users\Sykil\OneDrive\Desktop\Pandai Design System 1.5\syakila.test.git\textbook.html'
$dst = 'C:\Users\Sykil\OneDrive\Desktop\Pandai Design System 1.5\syakila.test.git\bookmarks.html'
$lines = [System.IO.File]::ReadAllLines($src, [System.Text.Encoding]::UTF8)

# Verified boundary 0-indices:
# 2091 = last line before TEXTBOOKS CSS comment (blank line after page-viewport rules)
# 2092..2200 = textbook-specific CSS block
# 2201 = </style>
# 3304 = <main>
# 3553 = </main>
# 4821 = <!-- Textbook page JS ... -->
# 4852 = </body>
# 4853 = </html>

# Fix title
$lines[5] = '  <title>Pandai &mdash; Bookmarks</title>'

# Bookmarks-specific CSS block
$bmCSS = @'
    /* ===================================================================
       BOOKMARKS PAGE -- DS node 5171:142563
       Outer frame: 1441x944, VERTICAL, bg white, pad r:60 b:30 l:60, gap 16
       Source: TLVKe3bgJTdVvuPAzgDq2f
    =================================================================== */

    /* Breadcrumb - 1.5 (same pattern as textbook page) */
    .bm-breadcrumb { display: flex; align-items: center; gap: var(--spacing-space-m); min-height: 36px; }
    .bm-breadcrumb__title-group { display: flex; align-items: center; gap: var(--spacing-space-m); flex-shrink: 0; }
    .bm-breadcrumb__title { font-size: 24px; font-weight: 500; line-height: 36px; color: var(--text-tertiary-default); white-space: nowrap; }
    .bm-breadcrumb__sep { width: 1px; height: 24px; background: var(--border-general-default); flex-shrink: 0; }
    .bm-breadcrumb__trail { display: flex; align-items: center; gap: var(--spacing-space-xs); }

    /* Breadcrumb link -- icon + text + optional chevron */
    .bm-bc-link { display: flex; align-items: center; gap: var(--spacing-space-xs); flex-shrink: 0; cursor: pointer; text-decoration: none; }
    .bm-bc-link svg { width: 20px; height: 20px; display: block; flex-shrink: 0; color: var(--text-primary-default); }
    .bm-bc-link__text { font-size: 14px; font-weight: 400; line-height: 20px; color: var(--text-primary-default); white-space: nowrap; }
    .bm-bc-link:hover .bm-bc-link__text { text-decoration: underline; }
    .bm-bc-link--current { cursor: default; }
    .bm-bc-link--current svg { color: var(--text-default-body); }
    .bm-bc-link--current .bm-bc-link__text { color: var(--text-default-body); }
    .bm-bc-link--current:hover .bm-bc-link__text { text-decoration: none; }
    .bm-bc-sep { display: flex; align-items: center; color: var(--text-default-caption); }
    .bm-bc-sep svg { width: 16px; height: 16px; display: block; }

    /* Quick Notes Card - 1.5
       DS: 1321x270, VERTICAL, pad 16, gap 16
       bg: Surface/secondary/default-subtle #e8fbe8
       border: 1px #00cc85 INSIDE -> box-shadow:inset
       radius: 24px (Corner-4XL) */
    .qnc { background: var(--surface-secondary-default-subtle); box-shadow: inset 0 0 0 1px var(--border-primary-default); border-radius: var(--corner-radius-corner-4xl); padding: var(--spacing-space-m); display: flex; flex-direction: column; gap: var(--spacing-space-m); }

    /* Card header -- DS: HORIZONTAL, 110px height, subject-specific bg, radius 18, border INSIDE */
    .qnc__header { display: flex; flex-direction: row; height: 110px; border-radius: var(--corner-radius-corner-2xl); box-shadow: inset 0 0 0 1px var(--qnc-header-border); background: var(--qnc-header-bg); overflow: hidden; }

    /* Icon area -- DS: 110x110, CENTER content, two 60x60 items, gap 10 */
    .qnc__icon-area { width: 110px; min-width: 110px; height: 110px; display: flex; align-items: center; justify-content: center; gap: 10px; flex-shrink: 0; }
    .qnc__subject-icon { width: 60px; height: 60px; object-fit: contain; flex-shrink: 0; }
    .qnc__thumbnail { width: 60px; height: 60px; border-radius: 8px; box-shadow: inset 0 0 0 1px #eaebf3; overflow: hidden; flex-shrink: 0; background: var(--surface-general-default-secondary); object-fit: cover; }

    /* Header content -- DS: HORIZONTAL, flex:1, pad t:16 r:16 b:16 l:0 */
    .qnc__header-content { flex: 1 0 0; display: flex; align-items: center; padding: var(--spacing-space-m) var(--spacing-space-m) var(--spacing-space-m) 0; }
    .qnc__label { display: flex; flex-direction: column; gap: 2px; padding-left: 24px; }
    .qnc__title { font-size: 24px; font-weight: 700; line-height: 36px; color: #ffffff; }
    .qnc__desc { font-size: 14px; font-weight: 500; line-height: 20px; color: #ffffff; }

    /* Card content table -- DS: white bg, radius 16, border 1px #d9d9d9 INSIDE */
    .qnc__content { background: var(--surface-general-default); box-shadow: inset 0 0 0 1px var(--border-general-default); border-radius: var(--corner-radius-corner-xl); overflow: hidden; }
    .qnc__row { display: flex; flex-direction: row; min-height: 56px; }
    .qnc__row + .qnc__row { border-top: 1px solid var(--border-general-default); }
    .qnc__cell-label { width: 290px; min-width: 290px; display: flex; align-items: center; gap: var(--spacing-space-xs); padding: var(--spacing-space-m); background: var(--qnc-cell-bg); border-right: 1px solid var(--border-general-default); flex-shrink: 0; }
    .qnc__cell-body { flex: 1 0 0; display: flex; align-items: center; padding: var(--spacing-space-m); gap: var(--spacing-space-xs); }
    .qnc__topic-name { font-size: 14px; font-weight: 400; line-height: 20px; color: var(--text-default-body); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .qnc__note-text { font-size: 14px; font-weight: 400; line-height: 20px; color: var(--text-default-body); }
    .qnc__badge { display: inline-flex; align-items: center; padding: 2px 8px; background: #e1f9ea; box-shadow: inset 0 0 0 1px #66e0b6; border-radius: var(--corner-radius-corner-rounded); font-size: 10px; font-weight: 600; line-height: 16px; color: var(--text-tertiary-default); white-space: nowrap; flex-shrink: 0; }

    /* Per-card subject colors */
    .qnc--addmath   { --qnc-header-bg: #283589; --qnc-header-border: #182052; --qnc-cell-bg: #eaebf3; }
    .qnc--chemistry { --qnc-header-bg: #e20082; --qnc-header-border: #88004e; --qnc-cell-bg: #fce6f3; }
    .qnc--business  { --qnc-header-bg: #efb42b; --qnc-header-border: #8f6c1a; --qnc-cell-bg: #fef6e2; }

    /* Stats Cards Row -- DS: 1376x304, HORIZONTAL, gap 32px */
    .stats-row { display: flex; flex-direction: row; gap: 32px; }

    /* Stats Card -- DS: 672x304, radius 24, 1px #00cc85 OUTSIDE border */
    .stats-card { flex: 1 0 0; height: 304px; border-radius: var(--corner-radius-corner-4xl); box-shadow: 0 0 0 1px var(--border-primary-default); overflow: hidden; position: relative; display: flex; flex-direction: column; justify-content: flex-end; }
    .stats-card__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; background: var(--surface-secondary-default-subtle); }

    /* Bottom content panel -- DS: pad t:30 r:10 b:30 l:10, gap 10, bg white, 1px #00cc85 INSIDE */
    .stats-card__panel { position: relative; background: var(--surface-general-default); box-shadow: inset 0 0 0 1px var(--border-primary-default); padding: 30px 10px; display: flex; flex-direction: column; gap: 10px; }
    .stats-card__text { font-size: 16px; font-weight: 500; line-height: 24px; color: var(--text-default-heading); max-width: 355px; }
    .stats-card__title { font-size: 24px; font-weight: 700; line-height: 36px; color: var(--text-default-heading); max-width: 355px; }
    .stats-card__subtitle { font-size: 16px; font-weight: 500; line-height: 24px; color: var(--text-default-heading); max-width: 355px; }

    /* Primary/M button inside stats card */
    .stats-btn { display: inline-flex; align-items: center; gap: var(--spacing-space-xxs); height: 32px; max-height: 32px; padding: 2px 8px; background: var(--surface-primary-default); box-shadow: inset 0 0 0 1px var(--border-primary-focus); border-radius: var(--corner-radius-corner-rounded); border: none; cursor: pointer; flex-shrink: 0; align-self: flex-start; }
    .stats-btn__label { font-family: var(--font-family); font-size: 12px; font-weight: 600; line-height: 18px; color: var(--text-primary-on-color); white-space: nowrap; }
    .stats-btn__arrow { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; background: #99ebce; border-radius: var(--corner-radius-corner-rounded); flex-shrink: 0; }
    .stats-btn__arrow svg { width: 16px; height: 16px; display: block; color: var(--border-primary-focus); }
    .stats-btn:hover { background: var(--surface-secondary-default); box-shadow: inset 0 0 0 1px var(--border-secondary-focus); }
    .stats-btn:hover .stats-btn__label { color: var(--text-secondary-focus); }
    .stats-btn:hover .stats-btn__arrow { background: #e8fbe8; }
    .stats-btn:hover .stats-btn__arrow svg { color: var(--text-secondary-focus); }
    .stats-btn:active, .stats-btn.is-pressing { background: var(--surface-primary-focus); box-shadow: inset 0 0 0 1px var(--border-primary-default); }
    .stats-btn:active .stats-btn__label, .stats-btn.is-pressing .stats-btn__label { color: var(--text-primary-default); }
    .stats-btn:active .stats-btn__arrow, .stats-btn.is-pressing .stats-btn__arrow { background: var(--surface-primary-default); }
    .stats-btn:active .stats-btn__arrow svg, .stats-btn.is-pressing .stats-btn__arrow svg { color: var(--surface-tertiary-default); }
'@

# Main content replacement (replaces lines 3304..3553 inclusive in source)
$mainContent = @'
  <main>
    <div class="page-container">
      <div class="main-content">

        <!-- === BREADCRUMB ============================================ -->
        <!-- DS: Breadcrumb - 1.5, node 5171:142567 -- Title "Bookmarks" + path: Learn > Bookmarks -->
        <section id="Breadcrumb-Desktop">
          <nav class="bm-breadcrumb" aria-label="Breadcrumb">
            <div class="bm-breadcrumb__title-group">
              <span class="bm-breadcrumb__title">Bookmarks</span>
              <div class="bm-breadcrumb__sep" aria-hidden="true"></div>
            </div>
            <div class="bm-breadcrumb__trail">
              <!-- "Learn" link -- Outline/book icon + text (DS: #00cc85) -->
              <a href="#" class="bm-bc-link">
                <svg viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#ic-book"/></svg>
                <span class="bm-bc-link__text">Learn</span>
              </a>
              <!-- Chevron separator -->
              <span class="bm-bc-sep" aria-hidden="true">
                <svg viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><use href="#ic-chevron-right"/></svg>
              </span>
              <!-- "Bookmarks" -- current page (DS: #666666) -->
              <span class="bm-bc-link bm-bc-link--current" aria-current="page">
                <svg viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#ic-info"/></svg>
                <span class="bm-bc-link__text">Bookmarks</span>
              </span>
            </div>
          </nav>
        </section>

        <!-- === QUICK NOTES CARDS (x3) =============================== -->

        <!-- Card 1 -- Add Maths -->
        <section id="QuickNotesCard-AddMath">
          <div class="qnc qnc--addmath">
            <div class="qnc__header">
              <div class="qnc__icon-area">
                <div class="qnc__subject-icon" style="display:flex;align-items:center;justify-content:center;">
                  <img src="../src/image-repo/Learn/bookmarks/myBookmarks/icon-addmath.png" alt="Add Mathematics" width="60" height="60" style="width:60px;height:60px;object-fit:contain;" onerror="this.style.display='none'">
                </div>
                <div class="qnc__thumbnail"></div>
              </div>
              <div class="qnc__header-content">
                <div class="qnc__label">
                  <span class="qnc__title">Topics</span>
                  <span class="qnc__desc">Add Mathematics</span>
                </div>
              </div>
            </div>
            <div class="qnc__content">
              <div class="qnc__row">
                <div class="qnc__cell-label">
                  <span class="qnc__badge">Ch 1</span>
                  <span class="qnc__topic-name">Functions</span>
                </div>
                <div class="qnc__cell-body">
                  <span class="qnc__note-text">Types of relations: one-to-one, many-to-one, one-to-many, many-to-many. Function notation f(x).</span>
                </div>
              </div>
              <div class="qnc__row">
                <div class="qnc__cell-label">
                  <span class="qnc__badge">Ch 2</span>
                  <span class="qnc__topic-name">Quadratic Functions</span>
                </div>
                <div class="qnc__cell-body">
                  <span class="qnc__note-text">Completing the square, discriminant b&#178;-4ac, axis of symmetry x = -b/2a.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Card 2 -- Chemistry -->
        <section id="QuickNotesCard-Chemistry">
          <div class="qnc qnc--chemistry">
            <div class="qnc__header">
              <div class="qnc__icon-area">
                <div class="qnc__subject-icon" style="display:flex;align-items:center;justify-content:center;">
                  <img src="../src/image-repo/Learn/bookmarks/myBookmarks/icon-chemistry.png" alt="Chemistry" width="60" height="60" style="width:60px;height:60px;object-fit:contain;" onerror="this.style.display='none'">
                </div>
                <div class="qnc__thumbnail"></div>
              </div>
              <div class="qnc__header-content">
                <div class="qnc__label">
                  <span class="qnc__title">Topics</span>
                  <span class="qnc__desc">Chemistry</span>
                </div>
              </div>
            </div>
            <div class="qnc__content">
              <div class="qnc__row">
                <div class="qnc__cell-label">
                  <span class="qnc__badge">Ch 3</span>
                  <span class="qnc__topic-name">Beneficial Microorganisms</span>
                </div>
                <div class="qnc__cell-body">
                  <span class="qnc__note-text">Bacteria used in food production: Lactobacillus for yogurt, yeast for fermentation processes.</span>
                </div>
              </div>
              <div class="qnc__row">
                <div class="qnc__cell-label">
                  <span class="qnc__badge">Ch 5</span>
                  <span class="qnc__topic-name">Electrochemistry</span>
                </div>
                <div class="qnc__cell-body">
                  <span class="qnc__note-text">Electrolysis, electroplating, Faraday's laws, standard electrode potential.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Card 3 -- Business -->
        <section id="QuickNotesCard-Business">
          <div class="qnc qnc--business">
            <div class="qnc__header">
              <div class="qnc__icon-area">
                <div class="qnc__subject-icon" style="display:flex;align-items:center;justify-content:center;">
                  <img src="../src/image-repo/Learn/bookmarks/myBookmarks/icon-business.png" alt="Business" width="60" height="60" style="width:60px;height:60px;object-fit:contain;" onerror="this.style.display='none'">
                </div>
                <div class="qnc__thumbnail"></div>
              </div>
              <div class="qnc__header-content">
                <div class="qnc__label">
                  <span class="qnc__title">Topics</span>
                  <span class="qnc__desc">Business Studies</span>
                </div>
              </div>
            </div>
            <div class="qnc__content">
              <div class="qnc__row">
                <div class="qnc__cell-label">
                  <span class="qnc__badge">Ch 4</span>
                  <span class="qnc__topic-name">Marketing Mix</span>
                </div>
                <div class="qnc__cell-body">
                  <span class="qnc__note-text">The 4Ps: Product, Price, Place, Promotion. How each element drives customer value.</span>
                </div>
              </div>
              <div class="qnc__row">
                <div class="qnc__cell-label">
                  <span class="qnc__badge">Ch 6</span>
                  <span class="qnc__topic-name">Financial Statements</span>
                </div>
                <div class="qnc__cell-body">
                  <span class="qnc__note-text">Income statement, balance sheet, cash flow &#8212; reading and interpreting financial data.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- === STATS CARDS ROW ======================================= -->
        <section id="StatsCards-Desktop">
          <div class="stats-row">

            <!-- Stats Card 1 -- Report Card CTA -->
            <div class="stats-card">
              <div class="stats-card__bg" aria-hidden="true"
                style="background-image:url('../src/image-repo/Learn/bookmarks/myBookmarks/stats-card-1-bg.png'); background-size:cover; background-position:center;">
              </div>
              <div class="stats-card__panel">
                <p class="stats-card__text">Have you checked the report card to monitor your progress?</p>
                <button class="stats-btn" aria-label="View your report card now">
                  <span class="stats-btn__label">View your report card now!</span>
                  <span class="stats-btn__arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#ic-chevron-btn-m"/></svg>
                  </span>
                </button>
              </div>
            </div>

            <!-- Stats Card 2 -- Goals CTA -->
            <div class="stats-card">
              <div class="stats-card__bg" aria-hidden="true"
                style="background-image:url('../src/image-repo/Learn/bookmarks/myBookmarks/stats-card-2-bg.png'); background-size:cover; background-position:center;">
              </div>
              <div class="stats-card__panel">
                <div style="display:flex;flex-direction:column;gap:0;">
                  <p class="stats-card__title">Goal set by your parents</p>
                  <p class="stats-card__subtitle">There are goals and rewards waiting!</p>
                </div>
                <button class="stats-btn" aria-label="View goals">
                  <span class="stats-btn__label">10 Goals Set to you!</span>
                  <span class="stats-btn__arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#ic-chevron-btn-m"/></svg>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  </main>
'@

# Build the output list
$out = [System.Collections.Generic.List[string]]::new()

# PART 1: shared CSS (0-indexed 0..2091, stop before textbook CSS comment at 2092)
for ($i = 0; $i -lt 2092; $i++) { $out.Add($lines[$i]) }

# PART 2: bookmarks CSS (replaces 2092..2200, the textbook CSS block)
$out.Add($bmCSS)

# PART 3: </style> line + navbars (0-indexed 2201..3303, up to but NOT including <main> at 3304)
for ($i = 2201; $i -lt 3304; $i++) { $out.Add($lines[$i]) }

# PART 4: new main content (replaces 3304..3553, the original <main>...</main>)
$out.Add($mainContent)

# PART 5: footer + shared JS (0-indexed 3554..4820, up to but NOT including Textbook JS at 4821)
for ($i = 3554; $i -lt 4821; $i++) { $out.Add($lines[$i]) }

# PART 6: SKIP textbook page JS (4821..4851)

# PART 7: </body> + </html> (0-indexed 4852..4853)
for ($i = 4852; $i -lt $lines.Count; $i++) { $out.Add($lines[$i]) }

# Write output with UTF-8 without BOM
$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($dst, $out, $encoding)
Write-Output "Written: $dst"
Write-Output "Output line count: $($out.Count)"

# Quick verification
$check = [System.IO.File]::ReadAllLines($dst, [System.Text.Encoding]::UTF8)
$mainCount = 0
$mainEndCount = 0
foreach ($l in $check) {
    if ($l -match '^\s*<main>\s*$') { $mainCount++ }
    if ($l -match '^\s*</main>\s*$') { $mainEndCount++ }
}
Write-Output "<main> count: $mainCount (expected 1)"
Write-Output "</main> count: $mainEndCount (expected 1)"

$hasTbAlert = $check | Where-Object { $_ -match 'tb-alert' }
$hasQnc = $check | Where-Object { $_ -match 'class="qnc' }
Write-Output "Has tb-alert: $(if ($hasTbAlert) { 'YES - BAD' } else { 'no - good' })"
Write-Output "Has .qnc: $(if ($hasQnc) { 'yes - good' } else { 'NO - BAD' })"
