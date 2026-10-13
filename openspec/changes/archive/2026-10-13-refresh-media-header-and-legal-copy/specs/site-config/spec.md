## MODIFIED Requirements

### Requirement: Centralized typed business data
The project SHALL provide `src/data/site-config.ts` exporting typed, `as const` placeholder `BUSINESS_DATA` (url canonical fallback `https://quimioterapia-atavistica.org`, display `name`, phones, email, address, social links, business hours) plus a `BUSINESS_DATA` SEO bundle, consumed by the layout shell and SEO components rather than hardcoded values. `url` SHALL resolve the same `PORTLESS_URL → SITE_URL → https://quimioterapia-atavistica.org` chain as the config. `name` SHALL carry the Spanish display brand `Quimioterapia Atavística` and SHALL be distinct from `legalName`, which stays the English trial identifier `The Atavistic Chemotherapy Clinical Trial`.

#### Scenario: No hardcoded business data in pages
- **WHEN** `rg "tel:|@|https://" src --glob "*.astro"` excludes `site-config`
- **THEN** no hardcoded business data appears in markup

#### Scenario: Shell consumes config
- **WHEN** the layout or footer renders contact info
- **THEN** it reads from `site-config.ts`

#### Scenario: Canonical origin chain
- **WHEN** only `SITE_URL` is set
- **THEN** `BUSINESS_DATA.url` resolves to `SITE_URL` for canonical/SEO output

#### Scenario: Display brand is Spanish, legal name is not
- **WHEN** `BUSINESS_DATA.name` and `BUSINESS_DATA.legalName` are inspected
- **THEN** `name` reads `Quimioterapia Atavística` while `legalName` keeps the English trial identifier

#### Scenario: Every display-brand surface resolves the Spanish brand
- **WHEN** the built homepage is scanned for the header wordmark, `og:site_name`, the JSON-LD `name`, the non-home title tagline, and the 404 page's card label and landmark label
- **THEN** each reads `Quimioterapia Atavística`, with the English brand retained only as `alternateName`, in `keywords`, in the bilingual homepage `<title>`, and in legal-entity strings
