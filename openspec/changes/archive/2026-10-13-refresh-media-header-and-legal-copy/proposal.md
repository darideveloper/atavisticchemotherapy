## Why

The site's media and chrome have drifted from the copy and assets the owner now wants published: two `#realidad` card graphics and five testimonial photos were superseded in a single session, the social share image in `public/` was invalid (PNG bytes under a `.jpg` name, 1898×897) against meta tags declaring a 1200×630 JPEG, the header still showed an English wordmark next to a redundant logo mark, the clinical-case card images were cropped into a fixed 288px box, and the legal notice buried the professional-license statement as a separate bullet. This change captures that refresh as one reviewed unit so the spec, the assets, and the markup agree again.

## What Changes

- **Section card graphics (`#realidad`)**: replace `src/assets/content/Eye-Enucleation.jpg` and `Mastectomy.jpg` with the owner's updated collages (Spanish caption, `1809`/`2026` and `1st`/`16th Century` labels). `Mastectomy` changes from landscape (1242×858) to portrait (1227×1342).
- **Clinical-case card images (`#ejemplos`)**: render every case image full-width at natural aspect (`w-full h-auto`) with a top-rounded corner (`rounded-t-xl`), replacing the fixed `h-72` media box with `object-contain`. Removes the now-redundant `overflow-hidden rounded-lg` clip on the `figure`.
- **Testimonial photos**: replace the five `src/assets/content/testimonio-*.webp` files with recompressed versions; `testimonio-lourdes.webp` also carries a content correction (year labels `2018`/`2026` instead of `2017`/`2026`).
- **Social share image**: replace `public/og-image.jpg` with a true `image/jpeg` at 1200×630 (37 KB) so the file matches the `og:image:type`/`width`/`height` tags already emitted.
- **Header brand**: drop the `/favicon.svg` logo mark from `SiteHeader.astro`; rename the display brand from `Atavistic Chemotherapy` to `Quimioterapia Atavística` in `src/consts.ts` and `BUSINESS_DATA.name`, rendered uppercase in the header via CSS. The visible wordmark becomes the link's accessible name (the stale `aria-label` is dropped). The rename extends to the remaining display-brand surfaces — the homepage JSON-LD `schemaName`, the 404 page's card label and landmark `aria-label` (both re-bound to `SITE_TITLE`), and the hero logo `alt`, which is corrected to describe the actual artwork (`Dr. Frank Arguello Cancer Clinic — The New Science of Atavistic Oncology and Therapy`) rather than the brand. `alternateName` becomes the English name now that the primary `name` is Spanish.
- **Legal notice**: fold the professional-license sentence (`cédula profesional 1150234`, blue highlight preserved) into the end of the credentials bullet in `legal-notice.es.md`, instead of its own list item.
- **Hero H1 spacing**: replace the redundant `<br>` between the two hero title spans — "QUIMIOTERAPIA ATAVÍSTICA" and "(ATAVISTIC CHEMOTHERAPY™)" — with a `0.575em` top margin, halving the gap (55px → 28px at the 48px desktop size). The block spans already stack, so the `<br>` contributed a full extra line box.
- **Repo hygiene**: ignore FUSE leftovers (`.fuse_hidden*`) in `.gitignore` under a marked section comment.

Non-goals: the header wordmark casing stays a display concern (`uppercase` in CSS, canonical Title Case in the source value); legal-entity strings (`BUSINESS_DATA.legalName`, the legal notices' "The Atavistic Chemotherapy Clinical Trial", the footer `© 2026 Atavistic Chemotherapy Clinical Trial™` line, and the bio caption "Director, Atavistic Chemotherapy Clinical Trial") are deliberately **not** renamed; the homepage `<title>`/`og:title` stays the deliberately bilingual `"Atavistic Chemotherapy | Quimioterapia Atavística"`; `variants/assets/` keeps its own stale copies of the two card graphics; no image *content* is authored here — every asset is owner-supplied.

## Capabilities

### New Capabilities

None. Every change modifies an existing capability or swaps an owner-supplied asset.

### Modified Capabilities

- `legal-chrome`: the shared sticky header requirement drops the logo mark, sources the wordmark from the renamed brand, and renders it uppercase via CSS.
- `site-config`: `BUSINESS_DATA.name` becomes the Spanish display brand, explicitly distinct from `legalName`; the `SITE_TITLE` fallback follows.
- `images`: the `og:image` integration requirement gains the physical contract for the default `public/` og image (real JPEG, 1200×630, consistent with the emitted meta).
- `homepage-content`: new requirement that clinical-case card images render full-width at natural aspect with a top-rounded corner, and the hero H1 requirement loses its `<br>` in favour of a half-line gap.
- `legal-content`: the legal-notice requirement states the credentials and the professional license read as one continuous statement in the responsible-person list.
- `foundation-config`: the canonical `.gitignore` requirement covers the FUSE hidden-file pattern under a marked section comment.

## Impact

- **Assets**: `src/assets/content/Eye-Enucleation.jpg`, `Mastectomy.jpg`, `testimonio-{isaura,lourdes,marisol,anna-victoria,antonio}.webp`, `public/og-image.jpg`.
- **Markup/stylesheet**: `src/components/organisms/ClinicalCaseExamples.astro` (case image classes), `src/components/organisms/SiteHeader.astro` (logo removal, brand source, casing), `src/pages/index.astro` (hero H1 spacing, `schemaName`, `alternateName`, hero logo `alt`), `src/pages/404.astro` (brand label + landmark label re-bound to `SITE_TITLE`).
- **Data/config**: `src/consts.ts` (`SITE_TITLE`), `src/data/site-config.ts` (`BUSINESS_DATA.name`), `.gitignore`.
- **Content**: `src/content/legal/legal-notice.es.md`.
- **Downstream effects**: `og:site_name`, JSON-LD `name`, and the `"<page title> | <brand>"` tagline switch to the Spanish brand; `og:image:alt` follows the brand. The footer copyright and `legalName` are unchanged by design.
- **Out of scope**: `variants/final.html` + `variants/assets/*` keep the old graphics; no build config, routing, i18n keys, or legal-page scope changes.
