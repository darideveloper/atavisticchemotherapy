## Context

The homepage is a single static Astro page (`src/pages/index.astro`) with data-driven sections: `ClinicalCaseExamples.astro` maps over `CLINICAL_CASES`, and the `TestimonialSlider` React island maps over `PATIENT_TESTIMONIALS`. A click-to-zoom modal already exists as a single `#lightbox` shell plus a document-level delegated click listener keyed on `[data-lightbox]`, and the shared `Image.astro` atom already emits `data-lightbox` from a `lightbox` prop. During review, content, terminology, and image-behavior edits were applied directly to the working tree without a spec. This change retroactively defines the rules so they are traceable and regression-testable.

## Goals / Non-Goals

**Goals:**
- Capture the applied homepage/content edits as spec requirements.
- Define one canonical Spanish spelling of the treatment name and apply it site-wide.
- Require every rendered page image to open the shared lightbox, reusing existing machinery.

**Non-Goals:**
- No new component, dependency, route, or API.
- No grouped prev/next navigation between paired images (single-image modal per decision).
- No change to image URLs, asset filenames, section ids, or English/SEO `Atavistic` strings.
- No spec rules for pure cosmetic tweaks that were not given an exact target string by the user (e.g. the references subtitle font size, the clinical-cases header `max-w` width); those stay out of the requirement set. Wording the user specified exactly (`<br>` placement, `vs` without a period, Title Case) IS captured as a requirement.

## Decisions

- **Reuse the global `#lightbox` instead of per-section modals.** The shell and delegated listener already exist and work for any `[data-lightbox]` node, including React-rendered ones. Alternatives (a gallery library, per-section dialogs) add dependencies and code for no behavioral gain.
- **`lightbox` prop on the shared clinical `<Image>`** covers all seven clinical images with one edit; the `TestimonialSlider` island gets a native `data-lightbox` attribute on both `<img>` render paths because it renders its own `<picture>` markup (byte-parity requirement) and cannot use the Astro atom.
- **Terminology fixed to the long accented form `atavística`** rather than the RAE short form `atávica`, because body copy already used the long unaccented form overwhelmingly and only the SEO meta used `atávica`; one long form keeps the brand phrase intact. Identifiers and filenames are exempt to avoid breaking URLs and asset references.
- **Testimonial treatment line removed at both layers** (data field + render) so the type no longer carries an unused property.

## Risks / Trade-offs

- [Risk] A later edit reintroduces an unaccented or short-form spelling → Mitigation: the `content-consistency` scenarios are greppable (scan rendered output and data files).
- [Risk] Adding `data-lightbox` in the island could interfere with Swiper drag → Mitigation: delegation fires only on a clean click/tap; drag does not produce a click target, and this was verified manually.
- [Risk] Enforcing a single long form may diverge from future SEO keyword choices → Mitigation: the rule explicitly scopes to user-facing Spanish content and exempts identifiers/English.

## Migration Plan

Already applied in the working tree; no deploy sequencing needed. Archive this change once `/opsx-verify-change` confirms the spec scenarios hold against the current code. Rollback is a normal revert of the touched files (no data or schema migration).

## Open Questions

- None.
