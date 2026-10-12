# Proposal: Client Content and Navigation Follow-ups

## Why

The latest client review introduced a second group of approved copy, layout, and navigation corrections for the Spanish landing page. The changes affect clinical explanations, citation placement, section alignment, the dedication, comparison copy, and the contact form entry point. They must remain traceable because the page contains patient-facing clinical information.

## What Changes

- Update the visible Spanish copy supplied by the client, including the oncology reality paragraph, Bernard Peyrilhe quotation, comparison section, doctor biography location, dedication heading and caption, and media captions.
- Keep headings centered where requested while aligning body paragraphs to the left. Preserve right-aligned quotation attributions and the client's requested citation layout.
- Replace placeholder treatment pricing with `$2,900 USD`.
- Move the previously expanded-treatment warning out of the contact form and render it as a visible framed block at the end of the atavistic chemotherapy section.
- Preserve working reference links for references 5–8 in the moved warning text.
- Replace the modal warning dropdown with a styled `+` link to the main “¿Qué es la Quimioterapia Atavística y Cómo ser Considerado para Participar?” heading. The link must close the modal and scroll to the visually correct heading despite the page's flex section ordering.
- Add a second-opinion CTA at the end of the atavistic chemotherapy section using the existing contact modal behavior.
- Update the comparison, dedication, reference, testimonial, clinical-case, and caption paragraphs without changing section titles unless explicitly requested.

## Capabilities

### Modified Capabilities

- `homepage-content`: Defines the approved Spanish copy, paragraph alignment, quotation layout, treatment warning placement, pricing text, dedication caption, and comparison content.
- `reference-popups`: Requires the moved warning references to use the existing linked reference pattern and preserve accessible labels and previews.

## Implementation status

- The requested copy and alignment changes are applied in `src/pages/index.astro` and `src/components/organisms/ClinicalCaseExamples.astro`.
- The treatment warning is visible at the bottom of the atavistic chemotherapy section with active references 5–8.
- The contact modal uses a non-dropdown `+` link and a scripted scroll to the main target heading.
- The treatment price is rendered as `$2,900 USD`.

## Impact

- Affects the Spanish landing page, the contact modal, reference navigation, and the clinical-case presentation.
- Does not introduce a backend, new dependency, route, or medical claim beyond the client-provided copy.
- Existing uncommitted SEO, favicon, and asset changes remain in the working tree and are outside this proposal's scope.
