## 1. Hero and biography content

- [x] 1.1 Merge the hero strapline and `www.ClinicalTrials.gov (ID: NCT02366884) USA` into one `<p>` with a `<br>` between them (`src/pages/index.astro` hero card)
- [x] 1.2 Add "el Centro Médico de la Universidad de Connecticut y" to the training sentence in the Dr. Arguello bio paragraph

## 2. Section copy

- [x] 2.1 Replace the testimonials subtitle with "Solicite la opinión de estos pacientes que han sido tratados con quimioterapia atavística por el Dr. Arguello en México."
- [x] 2.2 Remove the `HAGA CLICK AQUÍ` paragraph from `#atavica-original`
- [x] 2.3 Remove the "Diariamente, más de 27,000…" teaser from the statistics `<summary>` and nest `(Leer Más)` inside the `<h2>`
- [x] 2.4 Replace the clinical-cases header copy with the selective-effect + sequence-of-events sentences (`ClinicalCaseExamples.astro`)
- [x] 2.5 Render the comparison heading as three lines (`Quimioterapia tradicional<br/>vs<br/>Quimioterapia atavística`)
- [x] 2.6 Change the urgent-contact prompt from "llámenos al" to "Escríbanos al" (`src/pages/index.astro`)

## 3. Terminology normalization

- [x] 3.1 Replace `atavistica`/`Atavistica`/`ATAVISTICA` and `atávica`/`Atávica` with the accented canonical forms across homepage copy, bio, clinical narratives, testimonial histories, SEO meta, and `messages/es.json`
- [x] 3.2 Replace the short form in `src/content/legal/medical-disclaimer.es.md` and `src/content/legal/terms.es.md`
- [x] 3.3 Verify no unaccented long form or short `atávica` remains in `src/`, and that `id="atavica"`, `/#atavica`, `metamorfosis-atavica.png`, and English `Atavistic` are untouched

## 4. Testimonial treatment line removal

- [x] 4.1 Remove the blue `#4658aa` treatment `<p>` from `TestimonialSlider.tsx`
- [x] 4.2 Remove the `treatment` field from all five `PATIENT_TESTIMONIALS` entries and the `treatment: string` type

## 5. Image lightbox coverage

- [x] 5.1 Add the `lightbox` prop and `cursor-zoom-in` to the headshot and hospital-photo `<Image>` in `src/pages/index.astro`
- [x] 5.2 Add `lightbox` and `cursor-zoom-in` to the shared clinical `<Image>` in `ClinicalCaseExamples.astro` (covers all seven clinical images)
- [x] 5.3 Add `data-lightbox` and `cursor-zoom-in` to both `<img>` render paths in `TestimonialSlider.tsx` (covers all six testimonial images)

## 6. Verify

- [x] 6.1 Run `pnpm run build` and confirm it completes with all pages generated
- [x] 6.2 Click each newly zoomable image (headshot, hospital, one 1-image and one 2-image clinical card, one 1-image and the Antonio 2-image slide) — confirm the modal opens with the correct caption and closes via button, backdrop, and Escape
- [x] 6.3 Confirm the testimonial slider still drags without opening the lightbox
