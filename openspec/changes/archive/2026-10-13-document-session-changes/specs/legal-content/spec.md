## MODIFIED Requirements

### Requirement: Medical disclaimer neutralizes efficacy claims

The `medical-disclaimer` pages SHALL state the site provides information only and does not replace the reader's own doctors ("sus médicos"); Atavistic Chemotherapy is investigational with no guaranteed outcome; past cases and survivor accounts do not predict individual results; trial identifier NCT02366884 is given with a link to ClinicalTrials.gov without asserting any status; accepted patients must register and complete/sign an informed-consent letter; and readers must consult a qualified professional before any decision.

#### Scenario: Disclaimer gives verification link instead of status claim

- **WHEN** the disclaimer is read
- **THEN** it links ClinicalTrials.gov for NCT02366884 without asserting any status and without commenting on completeness

#### Scenario: Disclaimer defers to the reader's doctors

- **WHEN** the disclaimer is read
- **THEN** it states the content never replaces the criteria of "sus médicos" who know the case, and notes the registration/consent requirement for accepted patients

### Requirement: Legal notice identifies the responsible person with owner-supplied license number

The `legal-notice` pages SHALL identify Dr. Arguello (Médico Cirujano y Partero, UANL Monterrey; oncology training Rochester / NCI Frederick per `content.md`) as the responsible individual behind The Atavistic Chemotherapy Clinical Trial, state he is legally authorized to practice medicine in Mexico with cédula profesional `1150234` (number highlighted blue), give the published contact channels, and note testimonials are published with documented consent. The pages SHALL NOT invent an address, registration number beyond the supplied cédula, or corporate entity.

#### Scenario: Legal notice shows credentials and cédula

- **WHEN** the legal notice is read
- **THEN** it names the training history from `content.md`, shows the owner-supplied cédula `1150234` highlighted blue, and contains no fabricated address or corporate entity

## ADDED Requirements

### Requirement: Medical disclaimer explains informed consent

The `medical-disclaimer` pages SHALL include a "Qué es un consentimiento informado" section (before "Qué hacer") with the four owner-supplied bullets covering: documentation of understanding/acceptance and the right to refuse; the capacity and pressure-free-decision presumptions; comprehension of the strategy, purpose, and risks via the website and Dr. Arguello's explanations with opportunity to ask questions; the binding nature of the signed form until revoked, copy/original handling, and either party's freedom to stop treatment; and the registration-review flow. A small right-aligned `Rev.10/2026` line SHALL close the section.

#### Scenario: Informed-consent section present

- **WHEN** the medical disclaimer is read
- **THEN** the "Qué es un consentimiento informado" section with the four bullets and the right-aligned small `Rev.10/2026` line appears before "Qué hacer"

### Requirement: Terms defers to the reader's own doctors

The `terms` pages SHALL state medical content never replaces the advice of the reader's own doctors ("sus médicos") rather than "un oncólogo calificado".

#### Scenario: Terms uses "sus médicos"

- **WHEN** the terms page is read
- **THEN** the medical-advice sentence refers to "sus médicos", not "un oncólogo calificado"
