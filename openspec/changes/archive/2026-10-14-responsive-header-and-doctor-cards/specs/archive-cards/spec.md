## ADDED Requirements

### Requirement: Archive images render full and uncropped at natural aspect
Each archive image SHALL render full-width at its own natural aspect ratio (`block w-full h-auto`) inside the card, replacing any fixed-height media box and any `object-cover`/`object-top` cropping. The media wrapper SHALL NOT clip an image into a fixed-height box, and the grid SHALL top-align the two cards (`items-start`) so every image is visible from top to bottom with its caption below it. The loupe chip SHALL sit at the top-right of the media area so it stays clear of the image's bottom content — an accepted trade-off, since it may overlap the image's top-right area instead.

#### Scenario: Portrait clipping is gone
- **WHEN** an archive card renders a portrait source (the 1984 clipping at 1433×1920 or the 2011 cover at 333×500)
- **THEN** the whole image is visible at full column width with no cropped top and no cropped bottom

#### Scenario: Each image follows its source aspect ratio
- **WHEN** the two archive cards are compared
- **THEN** each image keeps its own aspect ratio and full container width rather than being forced into a shared height

#### Scenario: Chip is anchored at the top-right
- **WHEN** the loupe chip is rendered over an archive image
- **THEN** it is anchored at the top-right corner, clear of the image's bottom content

### Requirement: Caption bar sits directly beneath its image
Each archive card SHALL place its `figcaption` bar in normal flow directly below its own image, so the bar never overlaps the image. The bar MAY keep `flex-1` and vertically centered content to pad itself within its own card, but the two cards SHALL NOT be forced to a shared height or bottom alignment.

#### Scenario: No overlap between label and image
- **WHEN** an archive card is inspected at any viewport
- **THEN** its plum caption bar begins below the image's bottom edge with no part of the image behind it

#### Scenario: Cards size to their own content
- **WHEN** the two archive cards have images of different rendered heights
- **THEN** each card ends after its own caption bar, and the shorter card does not stretch to match the taller one

### Requirement: Caption bars use compact mobile sizing
The archive caption bars SHALL use mobile-first sizing that keeps both labels tidy on a half-width card while leaving the desktop presentation unchanged: bar padding `px-1 py-1 sm:px-1.5 sm:py-2`, the year at `text-xs` on mobile with `tracking-[0.14em]` (`sm:text-base` / `sm:tracking-[0.2em]`), and the small label at `text-[8px]` on mobile with `tracking-normal` (`sm:text-[10px]` / `sm:tracking-wider`). The reduced mobile tracking SHALL allow the longer label to sit on one line on a half-width card where it previously wrapped to two.

#### Scenario: Longer label fits one line on mobile
- **WHEN** the `Libro · Atavistic Metamorphosis` bar renders on a half-width mobile card
- **THEN** the label fits on a single line rather than wrapping to two

#### Scenario: Desktop caption is unchanged
- **WHEN** the same caption is viewed at or above `sm`
- **THEN** it keeps the larger `sm:text-base` year, `sm:text-[10px]` label, and wider `sm:tracking` spacing

#### Scenario: Year stays legible
- **WHEN** a visitor scans the caption on a mobile viewport
- **THEN** the year remains bold white and readable against the plum bar

## REMOVED Requirements

### Requirement: Caption bars share equal height on mobile
**Reason**: Archive cards now size to their own image at the image's natural aspect (no fixed-height media box), so the two plum bars no longer share a bottom edge. Forcing a shared height would reintroduce the empty gap under the shorter image that the original requirement set out to avoid, in the opposite direction.
**Migration**: Replaced by "Caption bar sits directly beneath its image" (per-card flow) and "Caption bars use compact mobile sizing" (smaller type and tracking instead of equal-height padding).
