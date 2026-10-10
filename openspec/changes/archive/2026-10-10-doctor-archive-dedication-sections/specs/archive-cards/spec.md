## Purpose

Side-by-side historic-evidence cards (1984 press clipping, 2011 book cover) closing the specialist bio, with solid date bars, equal-height captions, and fullscreen enlarge.

## ADDED Requirements

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

### Requirement: Caption bars share equal height on mobile

Both `figcaption` bars SHALL stretch to the full card bottom (`flex-1`) with vertically centered content, so no white gap appears under the shorter label when the book label wraps to two lines.

#### Scenario: No white gap under the newspaper bar

- **WHEN** the book label wraps to two lines on a narrow viewport
- **THEN** the newspaper's plum bar extends to match and both cards bottom-align

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
