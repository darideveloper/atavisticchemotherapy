## Why

New supplier-provided patient and doctor photographs arrived after the testimonials carousel shipped, and the homepage still served the old PNG composites (1.9 MB total, including one 553 KB file). Swapping in the supplied WebP assets, splitting Lourdes's composite into its two labeled photos, and making the doctor portrait render uncropped keeps the page truthful to the supplied materials while cutting image weight by ~90%.

## What Changes

- Doctor portrait (`#doctor`): replace `headshot.png` with supplied `headshot.webp` (960×1097); render at natural aspect (`w-full h-auto`, `widths [512, 960]`) instead of the fixed-height crop; strengthen the name overlay gradient and show it on all screen sizes (drop `lg:hidden`).
- Lourdes testimonial: replace the single 2017/2026 composite with the two supplied separated photos (`testimonio-lourdes-2017.webp`, `testimonio-lourdes-2026.webp`); entry now carries two images and renders in the existing 2-up grid path.
- Anna Victoria testimonial: replace PNG composite with supplied WebP; correct alt year-label 2025 → 2026 to match the image badge.
- Antonio testimonial: replace both PNGs with supplied WebP files (annotated 2025 pre-treatment scan, 2026 portrait); reorder radiology-first.
- Testimonial frames: frame background becomes content-driven — radiology/dark scans on black, photographs on white — replacing the old position-based rule (2nd image black, 1st rose); card photo mat changes rose → white to match.
- Delete the five superseded PNG originals.

## Capabilities

### New Capabilities

- `testimonial-frames`: frame background rules for testimonial card photos — dark scans render on black, photographs on white, driven by an explicit per-image flag.

### Modified Capabilities

- None — the `images` pipeline (local `ImageMetadata` imports through `IMAGE_SLOTS.testimonial` / `slideSet()`) and all `homepage-content` requirements behave exactly as before.

## Impact

- Affected code: `src/data/testimonials.ts` (imports, Lourdes split, Antonio reorder, `dark` flag), `src/pages/index.astro` (headshot import + card markup, `dark` passthrough), `src/components/organisms/TestimonialSlider.tsx` (frame bg rule, `dark` type field).
- Affected assets: 5 PNGs deleted, 6 WebP files added under `src/assets/content/`.
- No API, dependency, routing, or i18n changes. Slider autoplay, breakpoints, and contact rendering unchanged. Net source-asset weight: ~1.9 MB → ~0.2 MB.
