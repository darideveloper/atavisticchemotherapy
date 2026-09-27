## ADDED Requirements

### Requirement: Centralized typed business data
The project SHALL provide `src/data/site-config.ts` exporting typed, `as const` placeholder `BUSINESS_DATA` (phones, email, address, social links, business hours) plus a `BUSINESS_DATA` SEO bundle, consumed by the layout shell and SEO components rather than hardcoded values.

#### Scenario: No hardcoded business data in pages
- **WHEN** `rg "tel:|@|https://" src --glob "*.astro"` excludes `site-config`
- **THEN** no hardcoded business data appears in markup

#### Scenario: Shell consumes config
- **WHEN** the layout or footer renders contact info
- **THEN** it reads from `site-config.ts`

### Requirement: Consts fallbacks
The project SHALL export `SITE_TITLE`, `SITE_DESCRIPTION`, and a `LOCALE_MAP` from `src/consts.ts` as typed fallbacks.

#### Scenario: Defaults available
- **WHEN** a component needs a site title without per-page data
- **THEN** it reads the fallback from `consts.ts`
