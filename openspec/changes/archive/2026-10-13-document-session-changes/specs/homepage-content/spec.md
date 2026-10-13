## MODIFIED Requirements

### Requirement: Comparison intro paragraph is centered

The comparison intro paragraph "Las dos son quimioterapias en que las dos se basan en el uso de químicos o fármacos como tratamiento fundamental." SHALL be centered (`text-center`).

#### Scenario: Centered comparison intro

- **WHEN** a visitor views the comparison section intro paragraph
- **THEN** the paragraph text is centered within its container

### Requirement: Contact-modal section link label is shortened

The contact-modal section link SHALL read "¿Qué es la Quimioterapia Atavística y Cómo ser Considerado?" (without the trailing "para Participar"), target the top of the what-is section (`#atavica-original`), and smooth-scroll to it after closing the modal via a double-`requestAnimationFrame` `scrollIntoView({ behavior: 'smooth', block: 'start' })`.

#### Scenario: Shortened modal link text

- **WHEN** the contact modal is opened
- **THEN** the section link text is exactly "¿Qué es la Quimioterapia Atavística y Cómo ser Considerado?" and still navigates to the top of `#atavica-original`

#### Scenario: Modal link lands on the section top

- **WHEN** a visitor clicks the section link inside the open contact modal
- **THEN** the modal closes and the page smooth-scrolls to the top of `#atavica-original` (not the mid-section aside), clear of the sticky header

### Requirement: Doctor profile links to Google Scholar

The Dr. Arguello specialist-profile section SHALL render an external button, "Ver perfil de publicaciones en Google Scholar del Dr. Arguello en la literatura médica internacional", at the bottom of its text column, linking to `https://scholar.google.com/citations?user=H9kKoOQAAAAJ&hl=en` and opening in a new tab.

#### Scenario: Scholar button present and safe

- **WHEN** a visitor views the bottom of the doctor profile text column
- **THEN** an external link with the full label is present with `target="_blank"` and `rel="noopener noreferrer"` pointing to the Google Scholar profile URL

## ADDED Requirements

### Requirement: Hero H1 leads with the Spanish title

The hero `<h1>` SHALL render exactly two single `<span class="block">` elements — "QUIMIOTERAPIA ATAVÍSTICA" (no parentheses) first, a `<br>`, then "(ATAVISTIC CHEMOTHERAPY™)" with the TM mark as `<sup>` — with no `whitespace-nowrap`, so each line may wrap on narrow screens.

#### Scenario: H1 order and structure

- **WHEN** a visitor views the hero
- **THEN** the Spanish title appears on top without parentheses and the parenthesized English title with TM appears below it

### Requirement: Bio captions are compact

The 1984 newspaper and 2011 book `<figcaption>` elements SHALL use compact density: `px-1.5 py-1.5 sm:py-2`, year at `text-sm sm:text-base`, subtitle at `text-[9px] sm:text-[10px]`, both with `leading-tight` and no top margin on the subtitle.

#### Scenario: Compact captions on mobile and desktop

- **WHEN** a visitor views the specialist-profile image grid on mobile or desktop
- **THEN** both captions render in the reduced padding and type sizes while keeping the plum background and centered layout

### Requirement: Prior-treatment aside carries an IMPORTANTE heading

The `#aviso-tratamiento-previo` aside SHALL open with an `<h3>` reading "IMPORTANTE", bold and underlined (`font-extrabold underline underline-offset-4`), placed before the warning paragraph.

#### Scenario: IMPORTANTE heading visible

- **WHEN** a visitor reads the prior-treatment warning
- **THEN** a bold, underlined "IMPORTANTE" heading appears above the warning text

### Requirement: Logic-section images follow the quote on mobile only

Below `900px` the `#atavica` section SHALL render in order: title/intro/Delbrück-quote block, then the 4-image grid, then the remaining paragraphs (flex `order-1/2/3`). At `min-[900px]` and above the 12-column grid placement SHALL be unchanged (images cols 1–5 spanning both rows with sticky behavior; text cols 6–12; 1rem row seam).

#### Scenario: Mobile image order

- **WHEN** a visitor views the logic section on a narrow screen
- **THEN** the image grid appears directly under the quote instead of above the section text

#### Scenario: Desktop layout unchanged

- **WHEN** a visitor views the logic section at desktop width
- **THEN** images sit in the left column and all text in the right column exactly as before

## REMOVED Requirements

### Requirement: Duplicate what-is H3

**Reason**: The "¿En qué Consiste la Quimioterapia Atavística y Cómo ser Considerado para Participar?" H3 duplicated the section H2's topic; removed at the owner's request, leaving the H2 as the single section heading.
**Migration**: None — heading removed, surrounding paragraphs unchanged.
