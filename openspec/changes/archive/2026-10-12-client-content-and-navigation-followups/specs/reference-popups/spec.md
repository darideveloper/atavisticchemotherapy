## ADDED Requirements

### Requirement: Moved warning references remain interactive
References 5, 6, 7, and 8 in the moved warning SHALL use the existing superscript reference-note pattern.

#### Scenario: Visitor selects a moved reference
- **WHEN** a visitor focuses or activates one of references 5–8
- **THEN** the corresponding `reference-N` target and preview text remain available through the existing reference interaction

### Requirement: Modal section link preserves the plus affordance
The contact modal SHALL show the existing styled `+` affordance with a link to the main atavistic chemotherapy heading, without rendering the former warning as a dropdown.

#### Scenario: Visitor activates the plus link
- **WHEN** the visitor activates the link in the contact modal
- **THEN** the modal closes and the page scrolls to the “¿Qué es la Quimioterapia Atavística y Cómo ser Considerado para Participar?” heading
