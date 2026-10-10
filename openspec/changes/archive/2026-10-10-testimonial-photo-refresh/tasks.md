## 1. Doctor portrait refresh

- [x] 1.1 Copy supplied `headshot.webp` (960×1097) to `src/assets/content/` and retarget the `headshot` import in `src/pages/index.astro`
- [x] 1.2 Render at natural aspect (`w-full h-auto`, `widths [512, 960]`), removing the fixed-height crop
- [x] 1.3 Strengthen overlay gradient (`from-slate-900/90 via-slate-900/50`, `pt-16`) and drop `lg:hidden` so it shows on all screens
- [x] 1.4 Delete superseded `headshot.png`

## 2. Testimonial photo swaps

- [x] 2.1 Lourdes: copy supplied files as `testimonio-lourdes-2017.webp` + `testimonio-lourdes-2026.webp`, split entry into two images with alts `Fotografía de Lourdes de 2017` / `Fotografía de Lourdes de 2026` (reuses existing 2-up path)
- [x] 2.2 Anna Victoria: copy supplied file as `testimonio-anna-victoria-fotos.webp`, retarget import, fix alt year-label 2025 → 2026 to match the image badge
- [x] 2.3 Antonio: copy supplied files as `testimonio-antonio-radiologia.webp` + `testimonio-antonio-retrato.webp`, retarget imports, reorder scan-first
- [x] 2.4 Delete the four superseded testimonial PNGs

## 3. Content-driven frames (`testimonial-frames` spec)

- [x] 3.1 Flag Antonio radiology with `dark: true` in `src/data/testimonials.ts`
- [x] 3.2 Pass `dark` through the `optimizedTestimonials` mapping in `src/pages/index.astro` (defaults to `false` when omitted)
- [x] 3.3 Render `dark` cells on `bg-black`, photo cells on `bg-white` in `TestimonialSlider.tsx`; change photo mat rose → white

## 4. Verification

- [x] 4.1 `pnpm validate-imports` passes
- [x] 4.2 `pnpm astro build` completes (12 pages; all new variants emitted, 285 px source correctly clamped to `w=285`)
- [x] 4.3 Live check: doctor card renders uncropped at 960/1097 ratio with readable overlay on desktop + 390 px viewports
- [x] 4.4 Run `openspec-verify-change` for this change, then archive before merge (only `archive/` merges back to main) — verified, archived 2026-10-10
