## ADDED Requirements

### Requirement: Statistics and atavica citations render as split link-styled numbers without title

In the statistics accordion body and the `#atavica` white sections, citation references SHALL render as individual `[N]` anchors (brackets separated by single spaces as plain text, no commas), styled as context-aware blue underlined links with no `title` attribute, each carrying its own `href="#reference-N"`, single-item `data-reference` preview truncated to ~160 chars, and `aria-label="Referencia N"`.

#### Scenario: Statistics group is split

- **WHEN** a visitor views point 6) of the statistics accordion
- **THEN** the text reads `[5] [6] [7] [8]` as four separate blue underlined links, not `(5, 6, 7, 8)` as one

#### Scenario: Atavica groups are split

- **WHEN** a visitor views the `#atavica` paragraphs
- **THEN** citations read `[1] [2]` and `[3] [4]` as separate links with no native `title` tooltip
