## 1. Assets

- [x] 1.1 Copy client images to `src/assets/content/`: newspaper → `prensa-el-norte-1984.png`, book cover → `libro-metamorfosis-atavica-2011.jpg`, parents photo → `dedicatoria-padres.png`
- [x] 1.2 Import all three assets in `src/pages/index.astro`

## 2. Archive cards (bio bottom)

- [x] 2.1 Add fixed `grid-cols-2` card grid after the universities `<ul>`: newspaper card (1984) left, book card (2011) right, via the shared `Image` atom with `lightbox`, `cursor-zoom-in`, loupe chip, `object-cover object-top` thumbs (`h-56 sm:h-72`)
- [x] 2.2 Add solid `#4c1139` date bars with year + label, stretched equal-height (`flex-1 flex flex-col justify-center` on both `figcaption`s)
- [x] 2.3 Add centered `Toca cualquier imagen para ampliar` hint below the grid

## 3. Portrait alignment + sticky

- [x] 3.1 Change bio grid to `items-start` and photo column to `lg:sticky lg:top-24 self-start`

## 4. Dedication section

- [x] 4.1 Insert `#dedicatoria` section (Playfair title `Dedicatoria a mi madre`, plum `── ◆ ──` ornament, parents photo card via `Image` atom with `lightbox`, verbatim italic paragraphs, right-aligned `— Frank Arguello Astorga`) with `style="order:9"`
- [x] 4.2 Renumber flow: References `order:9` → `10`, `SiteFooter` `order:10` → `11`

## 5. Verification

- [x] 5.1 Run `pnpm run build` until green
- [x] 5.2 Visually verify at 360px (side-by-side cards, equal plum bars, no white gap) and desktop (sticky portrait, dedication centered, references last before footer); tap each new image to confirm fullscreen lightbox
