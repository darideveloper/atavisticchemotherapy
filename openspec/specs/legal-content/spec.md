## Purpose

Bilingual risk-free legal documents.

## ADDED Requirements

### Requirement: Five risk-free legal pages in both languages
The system SHALL ship five legal documents — `privacy`, `terms`, `cookies`, `medical-disclaimer`, `legal-notice` — each as `src/content/legal/{slug}.en.md` and `src/content/legal/{slug}.es.md` (10 files), front-matter `{ title, description, updated }`, bodies containing only verified facts and risk-free wording as defined below.

#### Scenario: All ten files exist
- **WHEN** the build runs
- **THEN** all ten `legal/{privacy,terms,cookies,medical-disclaimer,legal-notice}.{en,es}.md` files are present or the build fails

#### Scenario: No placeholders or price figures
- **WHEN** built HTML is scanned
- **THEN** no legal page contains `XXXX`, `Replace with the real`, `Contenido provisional`, `Sustituir por`, `TODO`, `available on request`, `disponible a solicitud`, `unverified`, `sin verificar`, `not ready`, or `pendiente de`

### Requirement: Privacy content uses only confirmed facts
The `privacy` pages SHALL state: controller is the individual doctor (Dr. Arguello, The Atavistic Chemotherapy Clinical Trial); contact via the published phone/WhatsApp channels; data collected is evaluation-form input (name, contact, medical context); handling is inbox-only review with no database/CRM storage; zero analytics/tracking; patient stories published with documented consent; rights requests (access, rectification, erasure, opposition — GDPR + LFPDPPP) via the published contact channels. The pages SHALL NOT invent an email address, physical address, retention period, processor name, or DPO.

#### Scenario: Privacy states inbox-only handling
- **WHEN** the privacy page is read
- **THEN** it states form submissions are reviewed directly (inbox-only, no database/CRM) and lists only the published phone/WhatsApp contact channels

### Requirement: Terms content hides price and guarantees
The `terms` pages SHALL describe the service as a free second-opinion evaluation with any treatment cost given only as a personalized quote (no figures, no `XXXX`); describe the historically offered conditional first-month arrangement only as "past practice, confirmed per case in writing" without promising it; prohibit misuse; assert IP; limit liability to the maximum extent permitted; and provide the published contact channels for questions. The pages SHALL NOT promise outcomes or a specific price.

#### Scenario: Terms contain no price
- **WHEN** the terms pages are read
- **THEN** they contain no currency figures and state costs are quoted personally after evaluation

### Requirement: Cookies statement declares zero tracking
The `cookies` pages SHALL state the site sets no analytics, advertising, or cross-site tracking cookies and uses only strictly-necessary technical means to serve static content, with instructions to contact via published channels with questions. No consent banner is required.

#### Scenario: Cookies page needs no banner
- **WHEN** the cookies page is read
- **THEN** it declares zero analytics/advertising tracking and requires no banner logic in the site

### Requirement: Medical disclaimer neutralizes efficacy claims
The `medical-disclaimer` pages SHALL state the site provides information only and does not replace an oncologist; Atavistic Chemotherapy is investigational with no guaranteed outcome; past cases and survivor accounts do not predict individual results; trial identifier NCT02366884 is given with a link to ClinicalTrials.gov without asserting any status; and readers must consult a qualified professional before any decision.

#### Scenario: Disclaimer gives verification link instead of status claim
- **WHEN** the disclaimer is read
- **THEN** it links ClinicalTrials.gov for NCT02366884 without asserting any status and without commenting on completeness

### Requirement: Legal notice identifies the responsible person without fabricating details
The `legal-notice` pages SHALL identify Dr. Arguello (Médico Cirujano y Partero, UANL Monterrey; oncology training Rochester / NCI Frederick per `content.md`) as the responsible individual behind The Atavistic Chemotherapy Clinical Trial, give the published contact channels, and note testimonials are published with documented consent. The pages SHALL state only confirmed credentials, omit license numbers, addresses, and registration details entirely without commentary, and SHALL NOT invent an address, registration number, or corporate entity.

#### Scenario: Legal notice shows credentials with silent omission
- **WHEN** the legal notice is read
- **THEN** it names the training history from `content.md`, omits license numbers and addresses entirely without commentary, and contains no fabricated number or address
