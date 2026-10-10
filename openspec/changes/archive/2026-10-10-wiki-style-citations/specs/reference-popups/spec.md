## MODIFIED Requirements

### Requirement: Citation numbers look like links

The system SHALL style superscript `sup.reference-note` citations at faithful `0.75em` with `vertical-align: super` and `line-height: 0`, rendering the anchor inside in context-aware brand blue (light blue `#93c5fd` on dark plum backgrounds, standard blue `#1d4ed8` on white backgrounds) with NO underline by default and underline on hover, plus a visible `focus-visible` outline.

#### Scenario: Dark card numbers read as links

- **WHEN** a visitor views citation numbers inside the dark statistics accordion
- **THEN** numbers appear as raised superscript light-blue `[N]` with underline only on hover, not body-pink text

#### Scenario: Light section numbers read as links

- **WHEN** a visitor views citation numbers in the white `#atavica` section
- **THEN** numbers appear as raised superscript standard-link-blue `[N]` with underline only on hover

### Requirement: Each citation number has its own popup and target

The system SHALL render each cited number as an individual superscript citation in the form `<sup class="reference-note"><a href="#reference-N" aria-label="Referencia N" data-reference="...">[N]</a></sup>` with brackets inside the anchor and the whole `[N]` clickable, each carrying its own single-item `data-reference` and `aria-label="Referencia N"`, with superscript citations separated by single spaces as plain text outside the `sup` elements (no commas).

#### Scenario: Per-number popup in a former group

- **WHEN** a visitor hovers `[6]` within `[5] [6] [7] [8]`
- **THEN** the popup shows only reference 6, not references 5–8 concatenated

#### Scenario: Per-number navigation in a former group

- **WHEN** a visitor clicks `[7]` within `[5] [6] [7] [8]`
- **THEN** the `#referencias` details opens and the page scrolls to `li#reference-7`, not `#reference-5`
