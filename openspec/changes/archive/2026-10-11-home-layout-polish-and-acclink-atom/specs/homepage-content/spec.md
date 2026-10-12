## ADDED Requirements

### Requirement: Hero benefit bullet lowercases the treatment name

The hero benefit bullet beginning with the treatment name SHALL render "La quimioterapia atavística ha demostrado…" with a lowercase "atavística" (not "Atavística") in the first word after the article.

#### Scenario: Lowercase treatment name in hero bullet

- **WHEN** a visitor reads the first hero benefit bullet
- **THEN** it begins "La quimioterapia atavística ha demostrado erradicar cánceres inoperables…" with the first "atavística" lowercased

### Requirement: Comparison intro paragraph is centered

The comparison intro paragraph "Ambas son quimioterapias en que ambas se basan en el uso de químicos o fármacos como tratamiento fundamental." SHALL be centered (`text-center`).

#### Scenario: Centered comparison intro

- **WHEN** a visitor views the comparison section intro paragraph
- **THEN** the paragraph text is centered within its container

### Requirement: Dedication caption is centered

The dedication caption "Celia Astorga de Arguello (1932-1982)" SHALL render centered (`text-center`, not `text-left`).

#### Scenario: Centered dedication caption

- **WHEN** a visitor views the dedication figure caption
- **THEN** "Celia Astorga de Arguello" and "(1932-1982)" are centered beneath the photo

### Requirement: Contact-modal section link label is shortened

The contact-modal section link that targets the atavistic chemotherapy heading SHALL read "¿Qué es la Quimioterapia Atavística y Cómo ser Considerado?" (without the trailing "para Participar").

#### Scenario: Shortened modal link text

- **WHEN** the contact modal is opened
- **THEN** the section link text is exactly "¿Qué es la Quimioterapia Atavística y Cómo ser Considerado?" and still navigates to the target heading

### Requirement: Doctor profile links to Google Scholar

The Dr. Arguello specialist-profile section SHALL render an external button, "Ver perfil de publicaciones en Google Scholar", at the bottom of its text column, linking to `https://scholar.google.com/citations?user=H9kKoOQAAAAJ&hl=en` and opening in a new tab.

#### Scenario: Scholar button present and safe

- **WHEN** a visitor views the bottom of the doctor profile text column
- **THEN** an external link "Ver perfil de publicaciones en Google Scholar" is present with `target="_blank"` and `rel="noopener noreferrer"` pointing to the Google Scholar profile URL

## MODIFIED Requirements

### Requirement: Realidad intro paragraph is justified

The paragraph in "La Realidad de la Oncología Actual" that begins "Si excluimos algunas formas de leucemias, linfomas y tumores de células germinales…" SHALL use justified alignment (`text-justify`, not `text-left`) and SHALL be centered within its container (`mx-auto` on its `max-w-4xl` box).

#### Scenario: Justified and centered alignment

- **WHEN** a visitor views the "La Realidad de la Oncología Actual" intro
- **THEN** the paragraph text is justified and its constrained box is horizontally centered

### Requirement: Statistics heading is visible when collapsed

The heading "Las Estadísticas Mundiales Sobre el Cáncer No Pueden Mentir" SHALL appear inside the collapsed `<summary>` of the statistics `<details>`, keeping its existing size classes (`text-2xl sm:text-3xl font-extrabold text-pink-100 tracking-tight`), left-aligned (`text-left`, not `text-center`), with the "Leer Más" cue nested inside the same `<h2>` after the heading text, and SHALL NOT repeat in the expanded body. The prior "Diariamente, más de 27,000…" teaser line SHALL be removed from the summary. The statistics accordion wrapper SHALL be constrained to `max-w-3xl` and horizontally centered.

#### Scenario: Heading visible without expanding

- **WHEN** the statistics `<details>` is collapsed
- **THEN** the visitor sees the statistics heading with `(Leer Más)` inside it and no "Diariamente, más de 27,000…" teaser line

#### Scenario: Heading is left-aligned

- **WHEN** the statistics `<details>` summary is inspected
- **THEN** the heading carries `text-left` and not `text-center`

#### Scenario: Card width is constrained

- **WHEN** the statistics accordion wrapper is inspected
- **THEN** it carries `max-w-3xl` and `mx-auto`

#### Scenario: No duplicate heading on expand

- **WHEN** the visitor expands the `<details>`
- **THEN** the body starts at paragraph "1)" with no repeated statistics heading

### Requirement: Comparison heading renders on three lines

The comparison heading (`#comparacion-heading`) SHALL render as three lines — "Quimioterapia tradicional", "vs", "Quimioterapia atavística" — via two `<br/>` breaks, with Title Case on the treatment name and no period after "vs". The header container wrapping the heading and the comparison intro paragraph SHALL be constrained to `max-w-5xl` and centered.

#### Scenario: Three-line heading

- **WHEN** the comparison section heading is inspected
- **THEN** it contains `Quimioterapia tradicional<br/>vs<br/>Quimioterapia atavística`

#### Scenario: Header container width

- **WHEN** the comparison header container is inspected
- **THEN** it carries `max-w-5xl mx-auto`
