## 1. Testimonial asset swap (retroactive — done)

- [x] 1.1 Copy supplied files from `~/Downloads/tinified/` to `src/assets/content/` as `testimonio-anna-victoria.webp`, `testimonio-antonio.webp`, `testimonio-isaura.webp`, `testimonio-lourdes.webp`, `testimonio-marisol.webp`
- [x] 1.2 Delete the 7 superseded files: `testimonio-anna-victoria-fotos.webp`, `testimonio-antonio-radiologia.webp`, `testimonio-antonio-retrato.webp`, `testimonio-isaura-fotos.png`, `testimonio-lourdes-2017.webp`, `testimonio-lourdes-2026.webp`, `testimonio-marisol-fotos.png`
- [x] 1.3 Verify no remaining references to deleted filenames (`grep testimonio-*-fotos / testimonio-*-2017 / radiologia / retrato` returns nothing outside archive docs)
- [x] 1.4 Delete the 4 stale unreferenced `public/assets/testimonio-{anna-victoria,isaura,lourdes,marisol}.png` composites (~4.8 MB) and confirm nothing imports them

## 2. Data model collapse to single image (retroactive — done)

- [x] 2.1 Retarget the 5 imports in `src/data/testimonials.ts` to the new filenames
- [x] 2.2 Collapse Lourdes entry to one image (`lourdesPhotos`, alt `Fotografía de Lourdes`)
- [x] 2.3 Collapse Antonio entry to one image (`antonioPhotos`, alt `Fotografía de Antonio`); remove `dark: true` from data
- [x] 2.4 Confirm every entry carries exactly one image and no entry defines `treatment` (`homepage-content` invariant holds)

## 3. Single-image render path (retroactive — done)

- [x] 3.1 Container in `TestimonialSlider.tsx`: `block` for single-image cards, `grid h-56 grid-cols-2` retained for multi-image
- [x] 3.2 Single-image class: `h-auto w-full rounded-t-xl object-cover cursor-zoom-in` (replaces `h-full w-full object-fill`); `<picture>` wrapper `block h-auto w-full` for single
- [x] 3.3 Multi-image/`dark` branch untouched (`object-contain` + `bg-black`/`bg-white`); `data-lightbox` + `cursor-zoom-in` kept on both paths (`images` spec invariant holds)

## 4. Verification

- [x] 4.1 `pnpm run build` completes (12 pages, 136 images optimized; new `testimonio-*` variants emitted)
- [x] 4.2 Live check `#testimonios`: all 5 cards render one photo each at full width, natural aspect, rounded top nesting inside the `rounded-2xl` card; slider drag does not open the lightbox, click opens `#lightbox` with alt caption (visually confirmed by the user outside the agent session)
- [x] 4.3 Run `openspec-verify-change` for this change, then archive before merge (only `archive/` merges back to main)
