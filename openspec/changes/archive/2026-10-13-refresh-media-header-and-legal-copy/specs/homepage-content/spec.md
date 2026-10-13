## ADDED Requirements

### Requirement: Clinical-case card images render full-width at natural aspect

Each image in the clinical-cases section (`#ejemplos`) SHALL render full-width at its natural aspect ratio (`block h-auto w-full`) with a top-rounded corner (`rounded-t-xl`) and a `cursor-zoom-in` affordance, replacing any fixed-height media box and `object-contain` fitting. The media wrapper SHALL NOT clip images into a fixed-height box, and each `figure` SHALL size to its own image so multi-image cards keep independent heights.

#### Scenario: Images follow their source aspect ratio

- **WHEN** a clinical-case card renders an image whose aspect ratio differs from its neighbours
- **THEN** each image keeps its own natural aspect ratio at full column width, with no cropping or letterboxing

#### Scenario: Top corners are rounded

- **WHEN** a clinical-case card image is inspected
- **THEN** it carries `rounded-t-xl` and its top corners are rounded while the bottom edge stays square

#### Scenario: No fixed-height media box

- **WHEN** the clinical-case media wrapper is inspected
- **THEN** it carries no fixed height class and no `object-contain`, so a portrait source is not clipped

#### Scenario: Images stay zoomable

- **WHEN** a visitor clicks a clinical-case card image
- **THEN** the shared `#lightbox` opens with that image and its `alt` caption

## MODIFIED Requirements

### Requirement: Hero H1 leads with the Spanish title

The hero `<h1>` SHALL render exactly two single `<span class="block">` elements — "QUIMIOTERAPIA ATAVÍSTICA" (no parentheses) first, then "(ATAVISTIC CHEMOTHERAPY™)" with the TM mark as `<sup>` — with no `whitespace-nowrap`, so each line may wrap on narrow screens. The two titles SHALL be separated by half a line — a `0.575em` top margin on the second span, i.e. half the H1's `1.15` line-height — and SHALL NOT be separated by a `<br>`, which between two block spans added a full extra line box (55px at 48px font size) and doubled the intended gap.

#### Scenario: H1 order and structure

- **WHEN** a visitor views the hero
- **THEN** the Spanish title appears on top without parentheses and the parenthesized English title with TM appears below it

#### Scenario: Titles are separated by half a line

- **WHEN** the vertical gap between the two H1 spans is measured at any breakpoint
- **THEN** it equals half the H1's line-height (≈`0.575em`), scales with the responsive font size, and the spans do not overlap

#### Scenario: No redundant break

- **WHEN** the H1's child nodes are inspected
- **THEN** they are two `<span class="block">` elements with no `<br>` between them
