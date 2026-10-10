## ADDED Requirements

### Requirement: Legal pageKeys in route map
The project SHALL register five legal pageKeys in `src/lib/i18n/routes.ts` — `privacy`, `terms`, `cookies`, `medical-disclaimer`, `legal-notice` — each with an EN unprefixed path and an ES `/es/*`-prefixed path, keep `src/messages/en.json` + `es.json` footer/page entries key-synchronized for all five, and expose them through `getLocalizedPath()` / `getPageKeyFromUrl()` so the catch-all serves each localized legal page via `LegalPage`. Exact paths:

| pageKey | EN | ES |
|---|---|---|
| `privacy` | `privacy` | `es/privacidad` |
| `terms` | `terms` | `es/terminos` |
| `cookies` | `cookies` | `es/cookies` |
| `medical-disclaimer` | `medical-disclaimer` | `es/aviso-medico` |
| `legal-notice` | `legal-notice` | `es/aviso-legal` |

#### Scenario: New legal routes resolve both locales
- **WHEN** a localized new legal route (EN unprefixed / ES prefixed) is requested
- **THEN** `getPageKeyFromUrl()` returns the matching pageKey and the catch-all renders the corresponding `LegalPage` entry

#### Scenario: Exact new-page paths resolve
- **WHEN** `/cookies`, `/medical-disclaimer`, `/legal-notice`, `/es/cookies`, `/es/aviso-medico`, or `/es/aviso-legal` is requested
- **THEN** the matching localized `LegalPage` entry renders with HTTP 200

#### Scenario: Message catalogs stay synchronized
- **WHEN** `validate-i18n` runs
- **THEN** it fails the build if footer or page entries for any of the five legal pageKeys differ between `en.json` and `es.json`
