## Purpose

Side-by-side historic-evidence cards (1984 press clipping, 2011 book cover) closing the specialist bio, with full uncropped images, solid date bars whose captions sit beneath each image, and fullscreen enlarge.

## Requirements

### Requirement: Archive cards render side-by-side on all viewports

The archive block after the "Formación y trayectoria" list SHALL use a fixed 2-column grid (`grid-cols-2`) that never stacks, with the 1984 newspaper card left and the 2011 book card right.

#### Scenario: iPhone shows both cards in one row

- **WHEN** a visitor views the bio on a ~360px viewport
- **THEN** both cards appear in a single row, each roughly half the content width

#### Scenario: Correct image-to-year pairing

- **WHEN** a visitor reads the two cards
- **THEN** the El Norte clipping pairs with the `1984` bar and the *Atavistic Metamorphosis* cover pairs with the `2011` bar

### Requirement: Date bars are solid plum with legible years

Each card SHALL carry a solid `#4c1139` caption bar containing the year (`1984` / `2011`) in bold white type plus a small uppercase label (`El Norte · UANL` / `Libro · Atavistic Metamorphosis`).

#### Scenario: Year readable at a glance

- **WHEN** a visitor scans the bio bottom
- **THEN** both years are legible without enlarging either image

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

### Requirement: Archive images enlarge in the shared lightbox

Both archive images SHALL render through the shared `Image` atom with the `lightbox` prop (plus `cursor-zoom-in` and a loupe chip), opening the existing fullscreen `#lightbox` modal at full resolution.

#### Scenario: Tap newspaper to read it

- **WHEN** a visitor taps the newspaper thumbnail
- **THEN** the fullscreen lightbox opens showing the clipping large enough to read

### Requirement: Enlarge hint is present

A `Toca cualquier imagen para ampliar` hint SHALL appear centered below the card grid.

#### Scenario: Hint visible

- **WHEN** a visitor views the archive block
- **THEN** the hint text is visible below both cards
