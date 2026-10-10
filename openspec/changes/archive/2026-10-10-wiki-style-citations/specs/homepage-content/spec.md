## MODIFIED Requirements

### Requirement: Statistics and atavica citations render as split link-styled numbers without title

In the statistics accordion body and the `#atavica` white sections, citation references SHALL render as individual superscript citations in the form `<sup class="reference-note"><a href="#reference-N" aria-label="Referencia N" data-reference="...">[N]</a></sup>` (brackets inside the anchor, whole `[N]` clickable, superscript citations separated by single spaces as plain text, no commas), styled as superscript `0.75em` context-aware brand-blue links with underline on hover only and no `title` attribute, each carrying its own `href="#reference-N"`, single-item `data-reference` preview truncated to ~160 chars, and `aria-label="Referencia N"`.

#### Scenario: Statistics group is split

- **WHEN** a visitor views point 6) of the statistics accordion
- **THEN** the text reads `[5] [6] [7] [8]` as four separate raised superscript blue links with hover-only underline, not `(5, 6, 7, 8)` as one

#### Scenario: Atavica groups are split

- **WHEN** a visitor views the `#atavica` paragraphs
- **THEN** citations read `[1] [2]` and `[3] [4]` as separate superscript links with no native `title` tooltip
