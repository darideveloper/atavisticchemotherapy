## MODIFIED Requirements

### Requirement: Content Collections Variant F (legal pages)
The project SHALL define a `legal` collection in `src/content.config.ts` using the `glob()` loader with `base: "./src/content/legal"` and `generateId = "<slug>.<lang>"`, with schema `{ title, description, updated }`. Files live at `src/content/legal/{slug}.{es,en}.md` where slug is one of `privacy`, `terms`, `cookies`, `medical-disclaimer`, `legal-notice` (five pages × two languages = ten files, both languages required per slug).

#### Scenario: Collection loads legal entries
- **WHEN** `getCollection("legal")` runs
- **THEN** it returns one entry per localized markdown file with `id = "<slug>.<lang>"`

#### Scenario: Missing language fails the build
- **WHEN** a legal page's `.es` or `.en` file is absent
- **THEN** the page component throws at build time (no silent fallback)
