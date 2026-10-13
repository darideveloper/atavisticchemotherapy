## 1. Section card graphics (`#realidad`)

- [x] 1.1 Convert the owner's updated `Eye-Enucleation.png` and `Mastectomy.png` to JPEG (q90/q88, stripped metadata) and overwrite `src/assets/content/Eye-Enucleation.jpg` and `src/assets/content/Mastectomy.jpg`, keeping the existing `.jpg` paths so `index.astro` imports stay unchanged
- [x] 1.2 Confirm both card graphics now carry the updated collages (Spanish caption, `1809`/`2026`, `1st`/`16th Century` labels) and that `Mastectomy.jpg` is portrait 1227×1342

## 2. Clinical-case card images (`#ejemplos`)

- [x] 2.1 Switch `src/components/organisms/ClinicalCaseExamples.astro` images to `block h-auto w-full cursor-zoom-in` and drop the fixed `h-72 shrink-0` media box
- [x] 2.2 Add `rounded-t-xl` to the case image and remove `overflow-hidden rounded-lg` from the `figure` so the top-only rounding is not clipped
- [x] 2.3 Add `self-start` to the `figure` so multi-image cards keep independent heights

## 3. Testimonial photos

- [x] 3.1 Copy the five updated `testimonio-{isaura,lourdes,marisol,anna-victoria,antonio}.webp` files over `src/assets/content/`, stripping the source's `-1` suffix so `src/data/testimonials.ts` imports stay unchanged
- [x] 3.2 Confirm `testimonio-lourdes.webp` carries the corrected `2018`/`2026` year labels and that no testimonial `alt` text needs updating

## 4. Social share image

- [x] 4.1 Replace `public/og-image.jpg` with the true 1200×630 JPEG (center-cropped from the 1920×1080 source) so it matches the `image/jpeg` + `1200×630` tags `BaseSEO.astro` emits
- [x] 4.2 Verify `dist/og-image.jpg` is byte-identical to `public/og-image.jpg` and that `dist/index.html` emits `og:image:type`/`width`/`height` consistent with the file

## 5. Display-brand rename (remaining work)

- [x] 5.1 Set `SITE_TITLE` in `src/consts.ts` to the canonical `Quimioterapia Atavística` (Title Case, accented)
- [x] 5.2 Set `BUSINESS_DATA.name` in `src/data/site-config.ts` to `Quimioterapia Atavística`, leaving `legalName` as `The Atavistic Chemotherapy Clinical Trial`
- [x] 5.3 Confirm the footer `© 2026 Atavistic Chemotherapy Clinical Trial™` line and `BUSINESS_DATA.legalName` are unchanged (deliberate separation of display brand vs legal entity)

## 6. Header chrome

- [x] 6.1 Remove the `/favicon.svg` logo `<img>` from `src/components/organisms/SiteHeader.astro`
- [x] 6.2 Drop the now-stale `aria-label` from the brand link so the visible wordmark is the accessible name
- [x] 6.3 Bind the wordmark back to `SITE_TITLE` (replacing the hardcoded literal) and add the `uppercase` class to the wordmark element so display casing stays a CSS concern
- [x] 6.4 Re-add the `SITE_TITLE` import to `SiteHeader.astro` and confirm no unused-import lint/type complaint

## 7. Legal notice copy

- [x] 7.1 Merge the professional-license sentence (`cédula profesional 1150234`, blue highlight preserved) into the end of the credentials bullet in `src/content/legal/legal-notice.es.md`, removing it as a separate list item
- [x] 7.2 Confirm the rendered `aviso-legal` page shows 2 bullets under `## Responsable` with the cédula highlight intact

## 8. Repo hygiene

- [x] 8.1 Add the non-anchored `.fuse_hidden*` pattern to `.gitignore` under a marked section comment
- [x] 8.2 Confirm `git check-ignore -v` matches the existing FUSE leftover and `git status` no longer lists it
- [x] 8.3 Decide whether `docs/astro-base-config.md` § `.gitignore` needs the FUSE rule so the canonical template and the extras list stay consistent — **decision: no doc change**; that section defines the fixed canonical block and states extras go below under a marker, which is exactly where `.fuse_hidden*` sits

## 9. Verification

- [x] 9.1 Run `pnpm run build` (validators + `astro build`) and confirm all 7 pages build with no new warnings
- [x] 9.2 Confirm the `dist/index.html` header carries the wordmark whose source value equals `SITE_TITLE` (`Quimioterapia Atavística`) with the `uppercase` class supplying display casing, plus no `<img>` and no `aria-label`
- [x] 9.3 Confirm `og:site_name`, the JSON-LD `name`, and the `"<title> | <brand>"` tagline on a non-home page now read the Spanish brand — **verified in `dist`**: `og:site_name` (home + non-home) and JSON-LD `name` = `Quimioterapia Atavística`, non-home title = `Aviso Legal | Quimioterapia Atavística`. This needed four surfaces outside the originally scoped files: homepage `schemaName`, the 404 card label + landmark `aria-label` (both re-bound to `SITE_TITLE`), the hero logo `alt` (corrected to describe the artwork), and `extraJson.alternateName` (flipped to the English name). Remaining English strings are only the bilingual homepage `<title>`, `alternateName`/`keywords`, and legal-entity text
- [x] 9.4 Confirm the 7 clinical-case images carry `rounded-t-xl` and no `object-contain`, and that no fixed-height media box remains in the section
- [x] 9.5 Review the `#realidad` and `#ejemplos` sections in the browser at desktop and mobile widths for the ragged/unbalanced card heights called out in the design risks — **measured at 1440×900 via playwright-cli**: `#realidad` cards are uniformly 721px (the portrait `Mastectomy` did *not* unbalance the row) and `#ejemplos` cards are uniformly 745px/724px per row, so the predicted raggedness did not materialise. Remaining cosmetic effect: image heights inside `#ejemplos` vary 206–471px, so each card's text block starts at a different offset and shorter-image cards carry extra whitespace in the body; the multi-image Alice B. card's two scans also differ in height, leaving a mat gap under the shorter one. Accepted per design decision 5

## 10. Hero H1 spacing

- [x] 10.1 Replace the redundant `<br>` between the two hero H1 spans with a `0.575em` top margin on the second span, halving the gap between "QUIMIOTERAPIA ATAVÍSTICA" and "(ATAVISTIC CHEMOTHERAPY™)"
- [x] 10.2 Verify the measured gap is half the previous value at both breakpoints with no overlap — **measured via playwright-cli**: desktop (48px font) 55px → 28px, H1 height 166px → 138px; mobile (25.35px font) 15px, i.e. `0.574em` at both, `overlaps: false`
