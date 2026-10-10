## ADDED Requirements

### Requirement: Page images open the shared lightbox on click

Every rendered content/clinical photograph — the doctor headshot, the hospital photo, the clinical-case images, the testimonial images, and the already-zoomable band-card and logic-grid images — SHALL open the shared `#lightbox` modal when clicked, reusing the existing `Image.astro` `lightbox` prop (emitting `data-lightbox`) in Astro and the equivalent `data-lightbox` attribute in the `TestimonialSlider` React island, each carrying a `cursor-zoom-in` affordance. Logos and icons (site logo, favicon) are excluded. The modal SHALL show the clicked image with its `alt` text as caption and close via the close button, backdrop click, or `Escape`.

#### Scenario: Astro images are zoomable

- **WHEN** a visitor clicks the headshot, the hospital photo, or any clinical-case image
- **THEN** the `#lightbox` opens with that image and its `alt` caption

#### Scenario: Island images are zoomable

- **WHEN** a visitor clicks a testimonial image
- **THEN** the `#lightbox` opens with that image and its `alt` caption

#### Scenario: Zoom affordance and close

- **WHEN** a zoomable image is hovered or the modal is open
- **THEN** the image shows a `cursor-zoom-in` cursor and the modal closes via the close button, backdrop click, or `Escape`

#### Scenario: Slider drag is unaffected

- **WHEN** a visitor drags the testimonial slider horizontally
- **THEN** the slider scrolls without opening the lightbox
