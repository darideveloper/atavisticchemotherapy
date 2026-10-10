## MODIFIED Requirements

### Requirement: Statistics heading is visible when collapsed

The heading "Las Estadísticas Mundiales Sobre el Cáncer No Pueden Mentir" SHALL appear inside the collapsed `<summary>` of the statistics `<details>`, keeping its existing size classes (`text-2xl sm:text-3xl font-extrabold text-pink-100 tracking-tight`), with the "Leer Más" cue nested inside the same `<h2>` after the heading text, and SHALL NOT repeat in the expanded body. The prior "Diariamente, más de 27,000…" teaser line SHALL be removed from the summary.

#### Scenario: Heading visible without expanding

- **WHEN** the statistics `<details>` is collapsed
- **THEN** the visitor sees the statistics heading with `(Leer Más)` inside it and no "Diariamente, más de 27,000…" teaser line

#### Scenario: No duplicate heading on expand

- **WHEN** the visitor expands the `<details>`
- **THEN** the body starts at paragraph "1)" with no repeated statistics heading

## ADDED Requirements

### Requirement: Hero strapline carries the trial identifier on one block

The hero strapline SHALL be a single paragraph containing "Cambiando Vidas y la Práctica de Oncología Desde el 2011" followed by a line break and "www.ClinicalTrials.gov (ID: NCT02366884) USA" on the next line, rendered as one `<p>` (not two), keeping the existing type classes.

#### Scenario: Trial line shares the strapline paragraph

- **WHEN** the hero card is inspected
- **THEN** the strapline and the `www.ClinicalTrials.gov (ID: NCT02366884) USA` line render inside the same `<p>` separated by a `<br>`

### Requirement: Bio lists the University of Connecticut Medical Center

The Dr. Arguello bio paragraph SHALL state that he completed oncology training at the University of Connecticut Medical Center and at the University of Rochester School of Medicine and Dentistry in Rochester, New York.

#### Scenario: Connecticut appears before Rochester

- **WHEN** the biography paragraph is read
- **THEN** it names "el Centro Médico de la Universidad de Connecticut y en la Escuela de Medicina y Odontología de la Universidad de Rochester, en Rochester, Nueva York"

### Requirement: Testimonials subtitle invites contact

The testimonials section subtitle SHALL read "Solicite la opinión de estos pacientes que han sido tratados con quimioterapia atavística por el Dr. Arguello en México."

#### Scenario: Subtitle wording

- **WHEN** the testimonials header is read
- **THEN** the paragraph under `#testimonios-heading` matches the invite wording

### Requirement: No call-to-action paragraph in the what-is section

The `#atavica-original` section SHALL NOT contain the paragraph beginning "Si usted desea ver ejemplos de la respuesta antitumoral… HAGA CLICK AQUÍ".

#### Scenario: CTA paragraph absent

- **WHEN** the `#atavica-original` section is scanned
- **THEN** no "HAGA CLICK AQUÍ" span or its enclosing paragraph is present

### Requirement: Clinical-cases header describes selective anticancer effect

The clinical-cases section header SHALL describe the examples as showing the notable selective anticancer effect of Atavistic Chemotherapy in advanced-cancer patients considered terminal or hospice by hospitals in Canada, the United States, or Mexico, followed by the sentence stating the visual and clinical descriptions illustrate the sequence before, during, and after treatment.

#### Scenario: Header copy present

- **WHEN** the `#ejemplos` header is read
- **THEN** it contains the selective-effect and sequence-of-events sentences and no longer the old "Secuencias de imágenes…" / "El contenido se presenta…" wording

### Requirement: Comparison heading renders on three lines

The comparison heading (`#comparacion-heading`) SHALL render as three lines — "Quimioterapia tradicional", "vs", "Quimioterapia atavística" — via two `<br/>` breaks, with Title Case on the treatment name and no period after "vs".

#### Scenario: Three-line heading

- **WHEN** the comparison section heading is inspected
- **THEN** it contains `Quimioterapia tradicional<br/>vs<br/>Quimioterapia atavística`

### Requirement: Urgent-contact prompt reads Escríbanos

The urgent-contact paragraph SHALL prompt "Escríbanos al +1 (301) 305-9591" (not "llámenos al") while keeping the existing `tel:` link and WhatsApp links.

#### Scenario: Prompt wording

- **WHEN** the urgent-contact paragraph is read
- **THEN** the phone link text begins "Escríbanos al"

### Requirement: Testimonial cards omit the blue treatment line

Testimonial cards SHALL NOT render the bold blue `#4658aa` treatment paragraph, and the `PATIENT_TESTIMONIALS` entries SHALL NOT carry a `treatment` field.

#### Scenario: No treatment line rendered

- **WHEN** any testimonial card is viewed
- **THEN** no blue treatment line appears beneath the history paragraph

#### Scenario: Treatment field removed from data

- **WHEN** `src/data/testimonials.ts` is inspected
- **THEN** no entry defines a `treatment` property
