## ADDED Requirements

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
