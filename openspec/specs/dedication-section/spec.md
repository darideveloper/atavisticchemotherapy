## Purpose

Memorial dedication block ("Dedicatoria a mi madre") near the page bottom with prominent title, verbatim dedication text, right-aligned signature, and parents photo.

## Requirements

### Requirement: Dedication section renders before References at the page bottom

The `#dedicatoria` section SHALL render before References at the page bottom: it is placed after the References section in DOM order but carries flex `order:9` while References carry `order:10` and the footer `order:11`, so References render last directly above the footer.

#### Scenario: References close the page

- **WHEN** a visitor scrolls to the page bottom
- **THEN** the order is dedication → references → footer

### Requirement: Title is prominent with brand-plum ornament

The section SHALL show the `Dedicatoria a mi madre` title in Playfair Display at `text-3xl sm:text-4xl`, centered, followed by a `── ◆ ──` ornament in brand plum `#4c1139`.

#### Scenario: Title and ornament visible

- **WHEN** a visitor reaches the dedication section
- **THEN** the prominent centered title and plum ornament appear above the photo

### Requirement: Dedication text is verbatim with right-aligned signature

The two dedication paragraphs SHALL appear exactly as supplied (Playfair italic, `text-lg`, centered, `max-w-3xl`), followed by the `— Frank Arguello Astorga` signature right-aligned in semibold italic.

#### Scenario: Text and signature match

- **WHEN** a visitor reads the dedication
- **THEN** both paragraphs match the supplied wording and the signature sits at the right margin

### Requirement: Parents photo displays as-is with lightbox enlarge

The parents photo SHALL render as supplied (blue frame and baked-in caption kept) in a centered `max-w-md` card through the shared `Image` atom with the `lightbox` prop, loupe chip, and `cursor-zoom-in`; no separate HTML caption SHALL be added.

#### Scenario: Tap photo to enlarge

- **WHEN** a visitor taps the parents photo
- **THEN** the fullscreen lightbox opens

#### Scenario: No duplicated caption

- **WHEN** a visitor views the photo card
- **THEN** no HTML caption duplicates the caption baked into the image pixels

### Requirement: Parents photo alt names both parents

The dedication parents-photo `alt` text SHALL read "Celia Astorga de Arguello (1932-1982) junto a su esposo el Dr. Rafael Arguello Paz", identifying both parents for assistive technology. No visible caption changes.

#### Scenario: Alt names both parents

- **WHEN** a screen reader announces the dedication photo
- **THEN** it names Celia Astorga de Arguello (1932-1982) and her husband Dr. Rafael Arguello Paz
