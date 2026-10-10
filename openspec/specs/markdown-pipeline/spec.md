## Purpose

Build-time markdown rendering, styling, validation, and legal content collections.

## Requirements

### Requirement: Single markdown engine
The project SHALL provide `src/lib/markdown.ts` using `marked` + GFM, exposing `renderMarkdown()` for blocks, `renderInline()` for inline strings, and `stripMarkdown()` for plain-text (SEO) extraction.

#### Scenario: Block render
- **WHEN** a raw markdown block is passed to `renderMarkdown()`
- **THEN** HTML is produced for the block

#### Scenario: Inline render
- **WHEN** an inline markdown string is passed to `renderInline()`
- **THEN** only inline HTML is produced

#### Scenario: Plain text extraction
- **WHEN** markdown is passed to `stripMarkdown()`
- **THEN** plain text without formatting markers is returned

### Requirement: Markdown atom
The project SHALL provide a `<Markdown>` atom component (block usage) that renders markdown to HTML.

#### Scenario: Atom renders content
- **WHEN** a `<Markdown>` atom receives markdown
- **THEN** it renders the corresponding HTML

### Requirement: Markdown styling
The project SHALL style rendered markdown with the Tailwind Typography `.prose-*` chain, requiring `@tailwindcss/typography` as a dependency.

#### Scenario: Styled markdown output
- **WHEN** markdown renders through the atom
- **THEN** it uses `prose` styling classes

### Requirement: Validation check
The project SHALL run `validate-markdown` after build that scans `dist/*.html` for stray markdown markers (e.g. `**`).

#### Scenario: Build validates markdown
- **WHEN** `build:full` runs
- **THEN** `validate-markdown` fails the build if stray markdown markers remain in built HTML

### Requirement: Code-copy handler
The project SHALL provide `src/lib/code-copy.ts` with an idempotent `attachCodeCopy()` that binds copy buttons and re-runs on `astro:page-load`.

#### Scenario: Code buttons bind idempotently
- **WHEN** the code-copy attach runs on navigation
- **THEN** existing buttons are not re-bound and new buttons get the copy handler

### Requirement: Content Collections Variant F (legal pages)
The project SHALL define a `legal` collection in `src/content.config.ts` using the `glob()` loader with `base: "./src/content/legal"` and `generateId = "<slug>.<lang>"`, with schema `{ title, description, updated }`. Files live at `src/content/legal/{slug}.{es,en}.md` where slug is one of `privacy`, `terms`, `cookies`, `medical-disclaimer`, `legal-notice` (five pages × two languages = ten files, both languages required per slug).

#### Scenario: Collection loads legal entries
- **WHEN** `getCollection("legal")` runs
- **THEN** it returns one entry per localized markdown file with `id = "<slug>.<lang>"`

#### Scenario: Missing language fails the build
- **WHEN** a legal page's `.es` or `.en` file is absent
- **THEN** the page component throws at build time (no silent fallback)

### Requirement: Legal page component
The project SHALL provide a `LegalPage` component (in `src/components/pages/legal/`) that renders a legal entry's body via the `<Markdown>` atom, given a resolved entry.

#### Scenario: LegalPage renders entry body
- **WHEN** `LegalPage` receives a resolved legal entry
- **THEN** it renders the title, description, metadata, and markdown body

### Requirement: Legal pages in i18n route map
The project SHALL register legal pageKeys in the i18n route map so the catch-all `[...path].astro` serves each localized legal page via `LegalPage`.

#### Scenario: Legal page served by catch-all
- **WHEN** a localized legal route (EN unprefixed / ES prefixed) is requested
- **THEN** the catch-all renders the matching `LegalPage` entry
