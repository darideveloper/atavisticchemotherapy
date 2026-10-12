## MODIFIED Requirements

### Requirement: Testimonial frame backgrounds follow content type

Multi-image testimonial cards SHALL render images flagged `dark` on a black cell background (`bg-black`) and all other images on a white cell background (`bg-white`), independent of image order. The card photo mat SHALL be white. Single-image cards SHALL render at natural aspect (`h-auto w-full object-cover`) with a rounded top (`rounded-t-xl`) nesting inside the card's `rounded-2xl` corners, with no frame background rule.

#### Scenario: Radiology scan renders on black

- **WHEN** a multi-image card renders a scan flagged `dark` alongside a portrait
- **THEN** the scan cell carries `bg-black` and the portrait cell carries `bg-white`

#### Scenario: Photographs render on white

- **WHEN** a multi-image card renders unflagged photos
- **THEN** each cell carries `bg-white`

#### Scenario: Flag omitted defaults to photo

- **WHEN** an image entry omits `dark`
- **THEN** it is treated as a photograph and renders on `bg-white`

#### Scenario: Single-image cards render full-width at natural aspect

- **WHEN** a testimonial entry carries one image
- **THEN** it renders `h-auto w-full object-cover` with `rounded-t-xl` inside a `block` container with no contain/frame background rule
