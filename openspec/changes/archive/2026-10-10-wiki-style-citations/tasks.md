## 1. Citation markup (sup > a, brackets inside)

- [x] 1.1 Move brackets inside anchors and wrap in `sup.reference-note` for all citations in statistics accordion (`index.astro:362`) and `#atavica` sections (`index.astro:393,398`)
- [x] 1.2 Verify each sup carries its own `href="#reference-N"`, single-item `data-reference={referencePreview(N-1)}`, `aria-label="Referencia N"`, space-separated with no commas or `title`

## 2. Branded Wikipedia styling

- [x] 2.1 Add `sup.reference-note { font-size:.75em; vertical-align:super; line-height:0; }` and scope brand blues to inner anchor (`#1d4ed8` light / `#93c5fd` on `.on-dark`)
- [x] 2.2 Switch to hover-only underline (`text-decoration:none` default → `underline` on `:hover`), keep `focus-visible` outline, verify dark-card contrast

## 3. JS selector hardening + regression check

- [x] 3.1 Update delegated handlers (`click`, `mouseover`/`mouseout`, `focusin`) to resolve the inner anchor from `sup.reference-note` (keep `data-reference` tooltip + `openReference` scroll behavior unchanged)
- [x] 3.2 Verify: hover/focus shows per-number preview, `Esc`/blur/scroll hides, click opens `#referencias` details and lands on correct `li#reference-N`, direct `#reference-N` URL opens on load, 360px viewport has no clipping
