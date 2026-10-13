## MODIFIED Requirements

### Requirement: Legal notice identifies the responsible person with owner-supplied license number
The `legal-notice` pages SHALL identify Dr. Arguello (Médico Cirujano y Partero, UANL Monterrey; oncology training Rochester / NCI Frederick per `content.md`) as the responsible individual behind The Atavistic Chemotherapy Clinical Trial, state he is legally authorized to practice medicine in Mexico with cédula profesional `1150234` (number highlighted blue), give the published contact channels, and note testimonials are published with documented consent. The credentials and the professional license SHALL read as one continuous statement — the authorization and cédula appended to the training-history item of the responsible-person list — rather than as a separate list item. The pages SHALL NOT invent an address, registration number beyond the supplied cédula, or corporate entity.

#### Scenario: Legal notice shows credentials and cédula
- **WHEN** the legal notice is read
- **THEN** it names the training history from `content.md`, shows the owner-supplied cédula `1150234` highlighted blue, and contains no fabricated address or corporate entity

#### Scenario: Credentials and license share one item
- **WHEN** the responsible-person list of the Spanish legal notice is inspected
- **THEN** the authorization sentence with the highlighted cédula appears at the end of the same list item as the training history, with no separate bullet for it
