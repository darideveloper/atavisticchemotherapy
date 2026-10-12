## Purpose

Homepage content and presentation rules for the universities list, statistics accordion heading placement, card heading punctuation, intro paragraph alignment, and WhatsApp contact link.
## Requirements
### Requirement: Universities list renders as inline text with bold location

The universities list in "Formación y trayectoria" SHALL render each item as inline flow: diamond marker, university name, and bold location adjacent on the same line (wrapping naturally), with no grid or flex layout on the `<li>`.

#### Scenario: Locations sit next to names

- **WHEN** a visitor views the "Formación y trayectoria" list
- **THEN** each item reads e.g. "◆ Universidad Autónoma de Nuevo León, **México**" with the location inline after the name, not stacked below or pushed to a right column

#### Scenario: No grid classes remain

- **WHEN** inspecting the four `<li>` elements
- **THEN** none carries `grid`, `grid-cols-*`, or `flex` display classes

### Requirement: Universities appear in the agreed order

The list SHALL order items: Nuevo León (México), Connecticut (Connecticut, USA), Rochester (New York, USA), Instituto Nacional del Cáncer NIH (Maryland, USA).

#### Scenario: Connecticut precedes Rochester

- **WHEN** a visitor reads the list top to bottom
- **THEN** "Universidad de Connecticut" appears before "Universidad de Rochester"

### Requirement: Grano-de-sal heading ends with a period

The card heading "Las quimioterapias o inmunoterapias actuales no pueden curar un cáncer tan diminuto como un grano de sal" SHALL end with `.`.

#### Scenario: Punctuation present

- **WHEN** a visitor views the eye-enucleation card `<h3>`
- **THEN** the heading text ends with "sal."

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

### Requirement: Realidad intro paragraph is justified

The paragraph in "La Realidad de la Oncología Actual" that begins "Si excluimos algunas formas de leucemias, linfomas y tumores de células germinales…" SHALL use justified alignment (`text-justify`, not `text-left`) and SHALL be centered within its container (`mx-auto` on its `max-w-4xl` box).

#### Scenario: Justified and centered alignment

- **WHEN** a visitor views the "La Realidad de la Oncología Actual" intro
- **THEN** the paragraph text is justified and its constrained box is horizontally centered

### Requirement: Primary WhatsApp contact uses the direct US number link

The primary WhatsApp contact (`contact.whatsapp.username` in `src/data/site-config.ts`) SHALL use url `https://wa.me/13013059591` and label `+1 (301) 305-9591`, rendering as `WhatsApp (+1 (301) 305-9591)` with no username handle.

#### Scenario: Direct WhatsApp link

- **WHEN** a visitor clicks the first WhatsApp link in the urgent-contact paragraph
- **THEN** it opens `https://wa.me/13013059591` and its visible text is `WhatsApp (+1 (301) 305-9591)`

### Requirement: Statistics and atavica citations render as split link-styled numbers without title

In the statistics accordion body and the `#atavica` white sections, citation references SHALL render as individual superscript citations in the form `<sup class="reference-note"><a href="#reference-N" aria-label="Referencia N" data-reference="...">[N]</a></sup>` (brackets inside the anchor, whole `[N]` clickable, superscript citations separated by single spaces as plain text, no commas), styled as superscript `0.75em` context-aware brand-blue links with underline on hover only and no `title` attribute, each carrying its own `href="#reference-N"`, single-item `data-reference` preview truncated to ~160 chars, and `aria-label="Referencia N"`.

#### Scenario: Statistics group is split

- **WHEN** a visitor views point 6) of the statistics accordion
- **THEN** the text reads `[5] [6] [7] [8]` as four separate raised superscript blue links with hover-only underline, not `(5, 6, 7, 8)` as one

#### Scenario: Atavica groups are split

- **WHEN** a visitor views the `#atavica` paragraphs
- **THEN** citations read `[1] [2]` and `[3] [4]` as separate superscript links with no native `title` tooltip

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

The comparison heading (`#comparacion-heading`) SHALL render as three lines — "Quimioterapia tradicional", "vs", "Quimioterapia atavística" — via two `<br/>` breaks, with Title Case on the treatment name and no period after "vs". The header container wrapping the heading and the comparison intro paragraph SHALL be constrained to `max-w-5xl` and centered.

#### Scenario: Three-line heading

- **WHEN** the comparison section heading is inspected
- **THEN** it contains `Quimioterapia tradicional<br/>vs<br/>Quimioterapia atavística`

#### Scenario: Header container width

- **WHEN** the comparison header container is inspected
- **THEN** it carries `max-w-5xl mx-auto`

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

### Requirement: Doctor portrait is top-aligned and sticky on desktop

The bio grid SHALL use `items-start` (portrait top-aligned with the text column) and the photo column SHALL be sticky on desktop only (`lg:sticky lg:top-24 self-start`), remaining static on mobile.

#### Scenario: Portrait follows desktop scroll

- **WHEN** a visitor scrolls the bio on a desktop viewport
- **THEN** the portrait stays visible while the bio text, universities list, and archive cards scroll past

#### Scenario: Mobile stacking unchanged

- **WHEN** a visitor views the bio below the `lg` breakpoint
- **THEN** the photo renders statically above the text with no sticky behavior

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

### Requirement: Client copy remains literal and traceable
The Spanish landing SHALL render the client-provided copy for the oncology reality, comparison, dedication, quotation, captions, treatment guidance, and price without adding unrelated claims.

#### Scenario: Updated clinical copy is visible
- **WHEN** a visitor reads the affected landing sections
- **THEN** the approved copy is present, `$2,900 USD` replaces the former placeholder, and the extracted dedication caption appears below its image

### Requirement: Body paragraphs use left alignment except where specified
Body paragraphs SHALL be explicitly left aligned, except where a specific alignment requirement applies justified or centered alignment to a named paragraph; headings retain their section-specific alignment and quotation attributions retain their requested alignment.

#### Scenario: Centered heading container contains body copy
- **WHEN** a section centers its heading container
- **THEN** its body paragraph still renders left aligned unless a specific alignment requirement names it

### Requirement: Treatment warning is visible in the atavistic section
The treatment warning SHALL render as a static framed block at the end of the “¿Qué es la Quimioterapia Atavística y Cómo ser Considerado para Participar?” section.

#### Scenario: Visitor reaches the section end
- **WHEN** the visitor reads through the section
- **THEN** the warning is visible without opening a dropdown and the second-opinion CTA appears after it

