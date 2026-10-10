## Purpose

Hover/focus citation popup behavior for `.reference-note` links — portal positioning, viewport clamping and flip, shortened preview content, per-number popups, link styling, and keyboard/touch behavior.

## Requirements

### Requirement: Citation popup escapes the card and stays in viewport

The system SHALL render citation popups in a single body-portal element positioned with `position:fixed`, clamped to an 8px viewport margin, preferring above the anchor and flipping below when space is insufficient.

#### Scenario: Popup near card edge is fully visible

- **WHEN** a visitor hovers the `[9]` number next to the left or right border of the statistics card
- **THEN** the full popup is visible, not cut by the card border

#### Scenario: Popup never overflows the screen

- **WHEN** a visitor hovers any citation number on a 360px-wide viewport
- **THEN** the popup stays within the left and right viewport edges

#### Scenario: Popup flips when no space above

- **WHEN** a visitor hovers a citation in the first visible line with insufficient space above
- **THEN** the popup appears below the number instead of being cut at the top

### Requirement: Citation popup shows shortened preview

The system SHALL show a shortened citation preview (truncated at a word boundary to ~160 characters with `…`) in the popup while the `#referencias` list retains the full text, with popup width capped at `min(24rem, 72vw)`.

#### Scenario: Long citation is compact

- **WHEN** a visitor hovers `[9]` (Global Burden of Disease, paragraph-length)
- **THEN** the popup shows the leading `9.` + journal/year portion ending with `…`, not the entire paragraph

### Requirement: Citation numbers look like links

The system SHALL style superscript `sup.reference-note` citations at faithful `0.75em` with `vertical-align: super` and `line-height: 0`, rendering the anchor inside in context-aware brand blue (light blue `#93c5fd` on dark plum backgrounds, standard blue `#1d4ed8` on white backgrounds) with NO underline by default and underline on hover, plus a visible `focus-visible` outline.

#### Scenario: Dark card numbers read as links

- **WHEN** a visitor views citation numbers inside the dark statistics accordion
- **THEN** numbers appear as raised superscript light-blue `[N]` with underline only on hover, not body-pink text

#### Scenario: Light section numbers read as links

- **WHEN** a visitor views citation numbers in the white `#atavica` section
- **THEN** numbers appear as raised superscript standard-link-blue `[N]` with underline only on hover

### Requirement: No native title tooltip competes with the popup

The system SHALL NOT render a `title` attribute on any `.reference-note` anchor; the popup content SHALL come from `data-reference` and accessible names from `aria-label`.

#### Scenario: Single popup on hover

- **WHEN** a visitor hovers any citation number for more than 2 seconds
- **THEN** only the custom popup is visible and no native OS tooltip appears over it

### Requirement: Each citation number has its own popup and target

The system SHALL render each cited number as an individual superscript citation in the form `<sup class="reference-note"><a href="#reference-N" aria-label="Referencia N" data-reference="...">[N]</a></sup>` with brackets inside the anchor and the whole `[N]` clickable, each carrying its own single-item `data-reference` and `aria-label="Referencia N"`, with superscript citations separated by single spaces as plain text outside the `sup` elements (no commas).

#### Scenario: Per-number popup in a former group

- **WHEN** a visitor hovers `[6]` within `[5] [6] [7] [8]`
- **THEN** the popup shows only reference 6, not references 5–8 concatenated

#### Scenario: Per-number navigation in a former group

- **WHEN** a visitor clicks `[7]` within `[5] [6] [7] [8]`
- **THEN** the `#referencias` details opens and the page scrolls to `li#reference-7`, not `#reference-5`

### Requirement: Popup supports keyboard and preserves click navigation

The system SHALL show the popup on keyboard focus, hide it on blur, `Esc`, or scroll, keep it non-interactive (`pointer-events:none`) below modal/lightbox layers, and SHALL preserve click-to-reference navigation (open `#referencias` details + smooth-scroll to the target `li`).

#### Scenario: Keyboard reveals and dismisses popup

- **WHEN** a visitor tabs to `[10]` and then presses `Esc`
- **THEN** the popup appears on focus and disappears on `Esc`

#### Scenario: Click still jumps to the reference

- **WHEN** a visitor clicks `[10]`
- **THEN** the `#referencias` details expands and the view scrolls to `li#reference-10`
