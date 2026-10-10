## Purpose

Legal catch-all routing and unified footer links.

## ADDED Requirements

### Requirement: Legal catch-all route
The system SHALL provide a `src/pages/[...path].astro` catch-all that resolves every registered legal pageKey via `getPageKeyFromUrl()` and renders the matching `legal` collection entry (`<slug>.<lang>`) through `LegalPage`, returning 404 only for unregistered paths.

#### Scenario: EN legal page served unprefixed
- **WHEN** `/privacy` is requested
- **THEN** the English `privacy.en` entry renders via `LegalPage` with HTTP 200

#### Scenario: ES legal page served prefixed
- **WHEN** `/es/privacidad` is requested
- **THEN** the Spanish `privacy.es` entry renders via `LegalPage` with HTTP 200

#### Scenario: Unknown path returns 404
- **WHEN** an unregistered path is requested
- **THEN** the system returns the 404 page, not a legal page

#### Scenario: Legacy EN prefix redirects
- **WHEN** `/en/privacy` is requested
- **THEN** it redirects to `/privacy` (existing `astro.config.mjs` legacy map) which renders with HTTP 200

### Requirement: Unified legal footer
Both footers (`Layout.astro` and `index.astro` MainFooter) SHALL render the same five legal links resolved via `getLocalizedPath(pageKey, lang)` for the current locale, with canonical labels (`Privacy Policy` / `Política de Privacidad`, `Terms of Use` / `Términos de Uso`, plus cookies, medical-disclaimer, legal-notice labels from the message catalogs).

#### Scenario: ES footer links to ES routes
- **WHEN** the homepage renders in Spanish
- **THEN** its footer links point to `/es/privacidad`, `/es/terminos`, and the three new ES routes — never to `/en/*`

#### Scenario: No label drift
- **WHEN** either footer renders `terms` in Spanish
- **THEN** the label is `Términos de Uso` (canonical), not `Términos y condiciones`

#### Scenario: All footer links resolve
- **WHEN** the built site is scanned
- **THEN** every footer `href` returns HTTP 200 in its locale
