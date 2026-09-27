## Purpose

EN-default/ES-prefixed localized routing, catalogs, and validation.

## Requirements

### Requirement: Localized routing EN+ES
The project SHALL support two locales with **EN as the default language (unprefixed, `defaultLang='en'`)** and ES prefixed (`/es/`) routing, implemented via `src/lib/i18n/{ui.ts,routes.ts,utils.ts}` and a `src/pages/[...path].astro` catch-all with `getStaticPaths()`.

#### Scenario: EN default route
- **WHEN** `/foo` is requested
- **THEN** the English version is served at the unprefixed path

#### Scenario: ES prefixed route
- **WHEN** `/es/foo` is requested
- **THEN** the Spanish version is served at the prefixed path

#### Scenario: EN home at root
- **WHEN** `/` is requested
- **THEN** the English home page is served (home EN path is `""` → root)

#### Scenario: ES home at /es
- **WHEN** `/es` is requested
- **THEN** the Spanish home page is served

### Requirement: Translation catalogs
The project SHALL provide `src/messages/en.json` and `es.json` with a validated `t()` lookup utility, keeping both catalogs key-synchronized.

#### Scenario: Key lookup returns translated value
- **WHEN** `t('key', lang)` is called
- **THEN** the translated string for that key and locale is returned

### Requirement: Language switcher
The project SHALL provide a `LangBtns` switcher that derives `lang` and `pageKey` from the current URL to toggle between the current locale and its alternate.

#### Scenario: Switcher toggles locale
- **WHEN** a user activates the switcher
- **THEN** the URL navigates to the alternate locale version of the same page

### Requirement: Key synchronization validation
The project SHALL run `validate-i18n` at build time that fails if `en.json` and `es.json` keys are out of sync, and provide legacy redirect handling mapping old prefixed `/en/<path>` URLs to their unprefixed equivalents.

#### Scenario: Out-of-sync catalogs fail build
- **WHEN** `en.json` and `es.json` have differing keys
- **THEN** `validate-i18n` makes the build fail

#### Scenario: Legacy /en redirect
- **WHEN** a request hits `/en/<path>` (or `/en` for home)
- **THEN** it redirects to the unprefixed `/<path>` (or `/`) preserving SEO authority

### Requirement: i18n build pipeline
The project SHALL expose a `build:i18n` script that runs `validate-i18n`, `validate-imports`, then `astro build`.

#### Scenario: Build runs validators first
- **WHEN** `pnpm build:i18n` is invoked
- **THEN** validators run before the Astro build and block on failure
