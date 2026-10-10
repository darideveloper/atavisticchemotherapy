## ADDED Requirements

### Requirement: Testimonial frame backgrounds follow content type

Multi-image testimonial cards SHALL render images flagged `dark` on a black cell background (`bg-black`) and all other images on a white cell background (`bg-white`), independent of image order. The card photo mat SHALL be white. Single-image cards SHALL keep the existing full-bleed `object-fill` rendering with no frame rule.

#### Scenario: Radiology scan renders on black

- **WHEN** Antonio's card renders with the scan first and the portrait second
- **THEN** the scan cell carries `bg-black` and the portrait cell carries `bg-white`

#### Scenario: Photographs render on white

- **WHEN** Lourdes's card renders its two unflagged photos
- **THEN** both cells carry `bg-white`

#### Scenario: Flag omitted defaults to photo

- **WHEN** an image entry omits `dark`
- **THEN** it is treated as a photograph and renders on `bg-white`

#### Scenario: Single-image cards unaffected

- **WHEN** a testimonial entry carries one image
- **THEN** it renders full-bleed `object-fill` with no contain/frame background rule
