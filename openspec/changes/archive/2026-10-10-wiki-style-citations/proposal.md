## Why

Citation numbers currently render as full-size baseline links with brackets outside the anchor (`[<a>10</a>]`), which looks unlike the Wikipedia convention visitors recognize. Adopting Wikipedia-style superscript citations improves scannability and trust while keeping project branding.

## What Changes

- Render each citation as Wikipedia-style superscript: `<sup class="reference-note"><a href="#reference-N" aria-label="Referencia N" data-reference="...">[N]</a></sup>` with brackets inside the link.
- Style sup citations at faithful `0.75em`, `vertical-align: super`, brand blues (`#1d4ed8` on light, `#93c5fd` on dark plum), no underline by default, underline on hover; keep `focus-visible` outline.
- Keep existing behavior unchanged: per-number `href`/`data-reference`/`aria-label`, custom `#ref-tooltip` preview, click-to-open `#referencias` details + smooth scroll, keyboard (`focus` shows, `Esc`/blur/scroll hides), no `title` attribute, no backlinks.
- Apply to all existing `.reference-note` spots (statistics accordion + `#atavica` sections).

## Capabilities

### New Capabilities

- None — behavior contract already covered by existing specs; this change restyles markup within it.

### Modified Capabilities

- `reference-popups`: citation markup becomes `sup > a` with brackets inside; link styling becomes superscript `0.75em` with hover-only underline (brand blues preserved).
- `homepage-content`: citation rendering description changes from baseline underlined `[N]` anchors to superscript hover-underline `[N]` anchors (same per-number `href`/`data-reference`/`aria-label` contract).

## Impact

- Affected code: `src/pages/index.astro` (citation anchors in statistics accordion + `#atavica` sections, `.reference-note` CSS block lines ~176-180).
- JS behavior preserved with selector hardening: `positionRefTip()`, `openReference()`, `referencePreview()`, and `#ref-tooltip` portal logic stay unchanged, but delegated handlers must resolve the inner anchor from `sup.reference-note` (existing `closest('a.reference-note')` alone returns null once the class moves to `sup`); verify sup hit-target still triggers hover/focus.
- No new dependencies, APIs, or routes.
