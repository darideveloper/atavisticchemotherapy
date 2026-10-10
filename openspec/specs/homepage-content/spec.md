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

The heading "Las Estadísticas Mundiales Sobre el Cáncer No Pueden Mentir" SHALL appear inside the collapsed `<summary>` of the statistics `<details>`, stacked after the "Diariamente, más de 27,000…" teaser, keeping its existing size classes (`text-2xl sm:text-3xl font-extrabold text-pink-100 tracking-tight`), and SHALL NOT remain in the expanded body.

#### Scenario: Heading visible without expanding

- **WHEN** the statistics `<details>` is collapsed
- **THEN** the visitor sees both the teaser line and the statistics heading

#### Scenario: No duplicate heading on expand

- **WHEN** the visitor expands the `<details>`
- **THEN** the body starts at paragraph "1)" with no repeated statistics heading

### Requirement: Realidad intro paragraph is justified

The paragraph beginning "Excluyendo algunas formas de leucemias…" SHALL use justified alignment (`text-justify`, not `text-left`).

#### Scenario: Justified alignment

- **WHEN** a visitor views the "La Realidad de la Oncología Actual" intro
- **THEN** the paragraph text is justified

### Requirement: Primary WhatsApp contact uses the direct US number link

The primary WhatsApp contact (`contact.whatsapp.username` in `src/data/site-config.ts`) SHALL use url `https://wa.me/13013059591` and label `+1 (301) 305-9591`, rendering as `WhatsApp (+1 (301) 305-9591)` with no username handle.

#### Scenario: Direct WhatsApp link

- **WHEN** a visitor clicks the first WhatsApp link in the urgent-contact paragraph
- **THEN** it opens `https://wa.me/13013059591` and its visible text is `WhatsApp (+1 (301) 305-9591)`
