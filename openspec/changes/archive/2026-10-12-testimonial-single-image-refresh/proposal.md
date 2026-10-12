## Why

New supplier-provided patient photographs arrived as single pre-composed images (one per testimonial, via `~/Downloads/tinified/`), replacing the previous mix of single composites and split two-photo entries. The homepage still served the 7 old assets (including two 400–600 KB PNGs) and rendered Lourdes/Antonio through the 2-up grid path with the `dark`-scan frame rule. Adopting the supplied single-image WebPs keeps the page truthful to the supplied materials, drops every card to the simpler single-image path, and saves ~700 KB of superseded asset weight.

## What Changes

- Isaura: `testimonio-isaura-fotos.png` (408 KB) → supplied `testimonio-isaura.webp` (46 KB); entry stays single-image, import retargeted.
- Marisol: `testimonio-marisol-fotos.png` (604 KB) → supplied `testimonio-marisol.webp` (74 KB); entry stays single-image, import retargeted.
- Anna Victoria: `testimonio-anna-victoria-fotos.webp` → supplied `testimonio-anna-victoria.webp` (72 KB); entry stays single-image, import retargeted.
- Lourdes: `testimonio-lourdes-2017.webp` + `testimonio-lourdes-2026.webp` → supplied single `testimonio-lourdes.webp` (170 KB); entry collapses 2 images → 1 (`Fotografía de Lourdes`).
- Antonio: `testimonio-antonio-radiologia.webp` + `testimonio-antonio-retrato.webp` → supplied single `testimonio-antonio.webp` (117 KB); entry collapses 2 images → 1 (`Fotografía de Antonio`); the `dark: true` scan flag disappears from the data (no dark scans remain).
- Single-image rendering in `TestimonialSlider.tsx`: fixed-height full-bleed (`h-56` grid cell, `h-full w-full object-fill`, square corners) → natural aspect (`h-auto w-full object-cover`, `rounded-t-xl`) inside a `block` container, so the photo's top corners nest inside the card's `rounded-2xl overflow-hidden`.
- Delete the 7 superseded files from `src/assets/content/`.
- Delete the 4 stale unreferenced composites from `public/assets/` (`testimonio-anna-victoria.png`, `testimonio-isaura.png`, `testimonio-lourdes.png`, `testimonio-marisol.png`, ~4.8 MB total) — superseded by earlier refreshes, no longer imported anywhere.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `testimonial-frames`: single-image rule changes from full-bleed `object-fill` with no frame to natural-aspect `object-cover` with a `rounded-t-xl` top; the multi-image/`dark` rule is retained in code but has no remaining data (all 5 entries carry exactly one image).

## Impact

- Affected code: `src/data/testimonials.ts` (imports, Lourdes/Antonio collapse, `dark` flag removed from data), `src/components/organisms/TestimonialSlider.tsx` (single-image path). `src/pages/index.astro` mapping (`dark` passthrough defaulting to `false`, `slideSet()` via `IMAGE_SLOTS.testimonial`) behaves exactly as before.
- Affected assets: 7 files deleted + 5 WebP files added under `src/assets/content/` (net ~1.1 MB → ~0.5 MB), plus 4 stale unreferenced PNGs (~4.8 MB) deleted from `public/assets/`.
- No API, dependency, routing, slider-behavior, contact-rendering, or i18n changes. The `images` pipeline and all `homepage-content` requirements behave exactly as before. Lightbox (`data-lightbox` + `cursor-zoom-in`) unchanged.
