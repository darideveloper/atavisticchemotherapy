## 1. Markup split and cleanup

- [x] 1.1 Split statistics accordion groups `(11, 12)` and `(5, 6, 7, 8)` into space-separated `[11] [12]` and `[5] [6] [7] [8]` atoms with 1:1 `href`, single-item preview, and `aria-label`
- [x] 1.2 Split `#atavica` groups `(Referencias 1, 2)` and `(3, 4)` into space-separated `[1] [2]` and `[3] [4]` atoms with 1:1 `href`, preview, and `aria-label`
- [x] 1.3 Convert singles `(9)`, `(10)`, `(13)`, `(14)`, `(15)` into `[9]`, `[10]`, `[13]`, `[14]`, `[15]` with 1:1 `href`, preview, and `aria-label`
- [x] 1.4 Remove every `title={referenceText(...)}` from `.reference-note` anchors; keep `data-reference` short preview + `aria-label` + `href`
- [x] 1.5 Add short-preview helper (word-boundary truncate to ~160 chars + `…`) and wire each anchor's `data-reference` to it; full text stays in `li#reference-N`

## 2. Link styling

- [x] 2.1 Restyle `.reference-note` as underlined context-aware blue links (light blue in `.on-dark`, standard blue on light), distinct hover state, retained `focus-visible` outline
- [x] 2.2 Remove old `color:inherit` / `text-decoration:none` hover rules and delete the `::after` tooltip CSS

## 3. Portal tooltip behavior

- [x] 3.1 Add single `#ref-tooltip` portal in `<body>` (`position:fixed`, `pointer-events:none`, width `min(24rem,72vw)`, below modal/lightbox z)
- [x] 3.2 Implement show on `mouseenter`/`focus` with above-preferring + flip-below positioning and 8px viewport clamping
- [x] 3.3 Implement hide on `mouseleave`/`blur`/`Esc`/scroll and on click-through navigation (re-show 150ms after scroll settles while focus stays on a note); keep existing `openReference` open-details + smooth-scroll behavior

## 4. Verification

- [x] 4.1 Hover each edge number (first/last in line, all `[5]–[8]`) on 360px and desktop widths: no card clipping, no viewport overflow, only custom popup visible
- [x] 4.2 Keyboard pass: tab through all numbers shows per-number popup, `Esc` dismisses, Enter/click lands on the correct `li#reference-N`
- [x] 4.3 Run `pnpm run dev` smoke check of statistics accordion, `#atavica` paragraphs, and `#referencias` open/scroll
