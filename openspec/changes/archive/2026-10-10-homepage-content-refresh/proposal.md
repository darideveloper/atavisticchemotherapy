## Why

A batch of content and presentation fixes was applied directly to the homepage and its data during review, but never captured as a spec, so the rules live only in the diff. This change formalizes the substantive work so future edits do not regress it: three themes came up — homepage copy corrections, a site-wide Spanish terminology normalization, and image click-to-zoom coverage.

## What Changes

- **Homepage copy**: hero ClinicalTrials line merged into the strapline block; bio adds the University of Connecticut Medical Center to Dr. Arguello's oncology training; the testimonials subtitle is reworded to invite contact; the `HAGA CLICK AQUÍ` paragraph is removed; the statistics accordion drops the `Diariamente, más de 27,000…` teaser so the heading stands alone (with the `Leer Más` cue nested in the `<h2>`); the clinical-cases header copy is replaced; the comparison heading renders as three lines (`Quimioterapia tradicional` / `vs` / `Quimioterapia atavística`, Title Case, no period); the urgent-contact prompt reads `Escríbanos al`.
- **Testimonials data**: the five blue bottom `treatment` lines are removed from `PATIENT_TESTIMONIALS` and from the card render.
- **Terminology**: every user-facing Spanish spelling of the treatment is normalized to the accented canonical form `atavística` / `Atavística` / `ATAVÍSTICA` (previously mixed `atavistica` and `atávica`), across homepage copy, bios, clinical narratives, testimonial histories, SEO title/description/keywords, `messages/es.json`, and the Spanish legal pages.
- **Image lightbox**: every rendered page photo (doctor headshot, hospital photo, 7 clinical-case images, 6 testimonial images) opens the shared `#lightbox` modal on click, with a zoom cursor affordance, reusing the existing global lightbox and the `Image` atom `lightbox` prop.

## Capabilities

### New Capabilities

- `content-consistency`: a canonical Spanish terminology rule for the treatment name, applied across all user-facing content so the accented form is used everywhere and only in that form.

### Modified Capabilities

- `homepage-content`: new and edited homepage copy rules (hero ClinicalTrials line, bio Connecticut training, testimonials subtitle, removed call-to-action paragraph, single-heading statistics accordion, clinical-cases header copy, comparison heading line breaks/casing, `Escríbanos` contact prompt) and removal of the testimonial treatment line.
- `images`: click-to-zoom coverage — every rendered page image participates in the shared `#lightbox` modal via the `Image` atom `lightbox` prop (or an equivalent `data-lightbox` attribute in React islands).

## Impact

- Affected code: `src/pages/index.astro`, `src/components/organisms/ClinicalCaseExamples.astro`, `src/components/organisms/TestimonialSlider.tsx`, `src/data/testimonials.ts`, `src/data/clinical-cases.ts`, `src/messages/es.json`, `src/content/legal/medical-disclaimer.es.md`, `src/content/legal/terms.es.md`.
- No new dependencies, routes, or API changes. Image URLs, section ids (`#atavica`, `#ejemplos`), asset filenames, and English/SEO `Atavistic` strings are intentionally unchanged.
- Lightbox adds no new component — it reuses the existing `#lightbox` shell and delegated click listener in `src/pages/index.astro`.
