## ADDED Requirements

### Requirement: Client copy remains literal and traceable
The Spanish landing SHALL render the client-provided copy for the oncology reality, comparison, dedication, quotation, captions, treatment guidance, and price without adding unrelated claims.

#### Scenario: Updated clinical copy is visible
- **WHEN** a visitor reads the affected landing sections
- **THEN** the approved copy is present, `$2,900 USD` replaces the former placeholder, and the extracted dedication caption appears below its image

### Requirement: Body paragraphs use left alignment except where specified
Body paragraphs SHALL be explicitly left aligned, except where a specific alignment requirement applies justified or centered alignment to a named paragraph; headings retain their section-specific alignment and quotation attributions retain their requested alignment.

#### Scenario: Centered heading container contains body copy
- **WHEN** a section centers its heading container
- **THEN** its body paragraph still renders left aligned unless a specific alignment requirement names it

### Requirement: Treatment warning is visible in the atavistic section
The treatment warning SHALL render as a static framed block at the end of the “¿Qué es la Quimioterapia Atavística y Cómo ser Considerado para Participar?” section.

#### Scenario: Visitor reaches the section end
- **WHEN** the visitor reads through the section
- **THEN** the warning is visible without opening a dropdown and the second-opinion CTA appears after it
