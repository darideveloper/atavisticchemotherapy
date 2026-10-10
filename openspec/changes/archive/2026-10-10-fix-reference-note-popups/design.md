## Context

Citation numbers render as `a.reference-note` in `src/pages/index.astro` (statistics accordion `details.acc.on-dark`, `#atavica` white sections). The popup is a CSS-only `::after` reading `attr(data-reference)`; the card has `overflow:hidden` for its `1rem` radius. All anchors duplicate the citation in `title` + `data-reference`. Grouped citations (`(5, 6, 7, 8)`, `(11, 12)`, `(3, 4)`, `(Referencias 1, 2)`) are single anchors with concatenated text and a single `href` to the first item. Click navigation relies on `href="#reference-N"` + an inline script that opens `#referencias details` and smooth-scrolls to `li#reference-N`. User decisions: shortened preview, keep `min(24rem,72vw)`, focus shows + `Esc` hides, popup below modals, scope = all reference notes, grouped form becomes `[5] [6] [7] [8]`.

## Goals / Non-Goals

**Goals:**

- Popup never clipped by the card and never overflows the viewport (clamped + flip).
- Numbers read as links with context-appropriate blue + underline.
- No native `title` tooltip competing with the custom popup.
- One popup per number with correct 1:1 `href` navigation.
- Keyboard parity (focus shows, `Esc`/blur hides); touch keeps hover-tip + click-jumps.

**Non-Goals:**

- No new tooltip library or dependency; no redesign of the references list itself.
- No change to citation contents; full text stays in `#referencias`.
- No popup above modals/lightbox; no interactive (clickable) popup content.

## Decisions

### 1. Single body-portal tooltip with `position:fixed` over CSS-only repositioning

What: one `#ref-tooltip` div in `<body>`, `pointer-events:none`, filled from the hovered anchor's `data-reference` (shortened preview), positioned from `getBoundingClientRect()` with 8px viewport margin; prefer above, flip below when space is short; hide on scroll, and re-show 150ms after scroll settles only while keyboard focus remains on a reference note (smooth focus-scroll would otherwise erase the focus tip).
Why: `::after` is inside `details.acc{overflow:hidden}` and can never escape by spec; per-side CSS classes would need manual per-number tuning and break on resize/i18n. A portal escapes all card clipping and centralizes clamping logic.
Alternatives considered: `details[open]{overflow:visible}` (breaks rounded corners, still overflows small screens); Floating-UI/popover API (extra dep / broader compat risk for a single tooltip).

### 2. Shortened preview in popup, full text in list

What: popup shows truncated citation (word boundary, ~160 chars) + `…`; `data-reference` (or JS map) holds the short form; `li#reference-N` keeps the full string.
Why: user chose compact popups; full refs (e.g. #9 GBD 2019) are paragraph-length and unusable at `24rem` on mobile.
Alternative: full text with scrollable popup — rejected (scroll inside hover tip is hostile on touch).

### 3. Context-aware link styling

What: `.on-dark .reference-note` → light blue (`sky-300` range) + underline; light sections → `blue-700` range + underline; hover darkens + subtle background tint; `focus-visible` outline retained.
Why: a single blue fails contrast on either plum-dark or white; `color:inherit + text-decoration:none` is the current cause of "not a link" look.
Alternative: single fixed blue — rejected per user choice and contrast.

### 4. Split groups into `[N]` atoms

What: `(5, 6, 7, 8)` becomes `[5] [6] [7] [8]` — brackets separated by single spaces are text nodes (no commas), each `[N]` its own anchor with `href="#reference-N"`, single-item `data-reference`, `aria-label="Referencia N"`. Same for `[11] [12]`, `[3] [4]`, `[1] [2]`; singles `(9)`, `(10)`, `(13)`, `(14)`, `(15)` become `[9]`, `[10]`, `[13]`, `[14]`, `[15]`.
Why: fixes both shared-popup and wrong-target click (today all group clicks land on the first id only).
Alternative: keep `(…)` shape with invisible per-number hit areas — rejected per user pick and fragile.

### 5. Delete `title`, keep `aria-label` + `href`

What: remove every `title={referenceText(...)}`; keep `data-reference` (short preview) and `aria-label`; keep `href` navigation and extend the existing `openReference` script (also hide portal tip on click/scroll).
Why: `title` fires the native delayed tooltip that overlaps the custom one; `aria-label` already covers AT names and `href` covers no-JS fallback.

## Risks / Trade-offs

- [Risk] Portal tip mispositions after fonts/images shift layout → Mitigation: position on show + hide on scroll/resize instead of live-tracking.
- [Risk] Shortening hides distinguishing tail (DOI/PMID) when refs share prefixes → Mitigation: truncate at word boundary from the end, always keep leading `N.` + journal/year visible; full text one click away.
- [Risk] `position:fixed` inside transformed ancestors — portal is in `<body>` outside transformed subtrees, but verify no global transform on `body` → Mitigation: visual check on mobile + desktop.
- [Risk] Touch: first tap may both show tip and navigate before user reads it → Mitigation: per user decision (tip + jump) tip is transient on touch; full ref is the landing target, acceptable trade-off.
