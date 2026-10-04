# Spec Delta

## Purpose

Present the client-supplied patient profiles, photographs, and approved contact methods in a responsive, equal-height card carousel.

## ADDED Requirements

### Requirement: Responsive patient testimonial carousel

The landing page SHALL render a patient-testimonials section after the treatment-explanation content that references patients treated in Mexico. Each available profile SHALL appear in one equal-height card containing its cropped paired-photo image and complete supplied text. The cards SHALL show three items on desktop, two on tablet, and one on mobile. The full card content SHALL remain visible without internal scrolling. The section heading SHALL use the regular section `h2` size.

#### Scenario: Available patient profiles are displayed
- **WHEN** a visitor reaches the testimonial section
- **THEN** the available profiles for Isaura, Lourdes, and Marisol appear in consistent cards with their supplied copy and paired-photo images

#### Scenario: Equal-height cards adapt to viewport
- **WHEN** the carousel is displayed on desktop, tablet, or mobile
- **THEN** it shows three, two, or one cards respectively, with equal card heights at that viewport

#### Scenario: Full content appears in the card
- **WHEN** a visitor reads a testimonial
- **THEN** its photo, name, contact details, diagnosis, history, and treatment note are in the same card and no internal scrolling or image lightbox is required

### Requirement: Infinite automatic card progression

At tablet and mobile widths, the carousel SHALL advance automatically without visible navigation controls or a numeric slide indicator. With three records and two visible cards, the sequence SHALL cycle 1–2, 2–3, 3–1, then 1–2 without blank space. At desktop width, all three cards SHALL remain visible together without automatic movement. When reduced motion is requested, the carousel SHALL stop moving while keeping the rendered profile cards accessible.

#### Scenario: Two visible cards cycle without a gap
- **WHEN** three profiles are available and two cards fit in the viewport
- **THEN** automatic movement cycles through 1–2, 2–3, 3–1, and 1–2

#### Scenario: One visible card cycles automatically
- **WHEN** the viewport is mobile-sized
- **THEN** the carousel cycles through each available card and returns to the first without a blank interval

#### Scenario: Desktop shows all available profiles
- **WHEN** the viewport is desktop-sized
- **THEN** all three profile cards remain visible together and the carousel track does not move

#### Scenario: Reduced motion keeps all profiles accessible
- **WHEN** the visitor requests reduced motion
- **THEN** automatic movement stops and the available profile cards remain accessible without animation

### Requirement: Approved patient contact information

Each testimonial SHALL place a bold “Información de contacto” line directly below the patient's name and display only contact values supplied for that patient. Email addresses SHALL be `mailto:` links. A WhatsApp link SHALL be used only when a complete phone number was supplied; incomplete or nonnumeric values SHALL remain plain text.

#### Scenario: Isaura's approved contacts appear
- **WHEN** Isaura's card is displayed
- **THEN** it shows `clinica@ismadental.com` and WhatsApp `871 122 5746`

#### Scenario: Lourdes's approved contacts appear
- **WHEN** Lourdes's card is displayed
- **THEN** it shows `bluelulu10@yahoo.com` and WhatsApp `656 338 2516`

#### Scenario: Marisol's incomplete WhatsApp value stays unlinked
- **WHEN** Marisol's card is displayed
- **THEN** it shows `Marisolmarazul@hotmail.com` as an email link and `Ing. Ramirez` as plain text

### Requirement: Profile capacity and dated imagery

The carousel data model SHALL support up to five patients while rendering only complete approved profiles. The provided images' 2025 profile-year labels SHALL show 2026 in the published assets. The testimonial images SHALL not open the site's image lightbox.

#### Scenario: Missing profiles do not create placeholders
- **WHEN** only three complete approved profiles are available
- **THEN** exactly those three cards are rendered

#### Scenario: Profile year labels are updated
- **WHEN** a visitor sees a supplied profile image whose year was 2025
- **THEN** its corresponding label reads 2026
