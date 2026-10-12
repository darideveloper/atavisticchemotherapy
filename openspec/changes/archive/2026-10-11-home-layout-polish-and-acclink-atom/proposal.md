## Why

A round of client-facing polish on the Spanish landing page tightened paragraph alignment and accordion widths, corrected a treatment-name capitalization, shortened the contact-modal link, and required a reusable link style that could also open an external profile. The accordion link was previously a one-off inline element; extracting it keeps the styling consistent and lets the doctor profile link out to Google Scholar without re-implementing it.

## What Changes

- Render the hero benefit bullet with its first treatment name lowercased: "La quimioterapia atavística ha demostrado…" (was "Atavística").
- Center and justify the "La Realidad de la Oncología Actual" intro paragraph (`mx-auto text-justify`).
- Narrow the "Las Estadísticas Mundiales Sobre el Cáncer No Pueden Mentir" accordion card to `max-w-3xl` and left-align its heading (removing `text-center`).
- Center the comparison intro paragraph ("Ambas son quimioterapias…") and widen the comparison header block to `max-w-5xl`.
- Center the dedication caption "Celia Astorga de Arguello (1932-1982)".
- Shorten the contact-modal section link to "¿Qué es la Quimioterapia Atavística y Cómo ser Considerado?" (drop "para Participar").
- Introduce a reusable `AccLink` atom that carries the styled `acc-link` accordion-link appearance, an optional trailing icon (`+`, external `↗`, or none), and `_blank` link safety.
- Move the `.acc-link` CSS out of the landing page into the `AccLink` atom; migrate the contact-modal section link to use it.
- Add an external Google Scholar button ("Ver perfil de publicaciones en Google Scholar") at the bottom of the Dr. Arguello specialist-profile section.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `homepage-content`: Treatment-name capitalization, intro/heading/caption alignment, accordion card width, comparison header width, and the contact-modal section-link label change.
- `atomic-components`: Adds the `AccLink` atom and its icon/target behavior contract, and moves `acc-link` styling ownership into the atom.

## Impact

- Affects `src/pages/index.astro` (hero bullet, realidad intro, statistics accordion, comparison header, dedication caption, doctor profile section, contact modal link).
- Adds `src/components/atoms/AccLink.astro`; removes the inline `.acc-link` rules from `src/pages/index.astro`.
- No new dependency, route, backend, or medical claim beyond the client-provided copy.
- The new external button points to Google Scholar (`https://scholar.google.com/citations?user=H9kKoOQAAAAJ&hl=en`) and opens in a new tab.
