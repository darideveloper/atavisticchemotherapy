## Purpose

Shared site header/footer and quiet legal page branding.

## ADDED Requirements

### Requirement: Shared sticky site header
The system SHALL provide `src/components/organisms/SiteHeader.astro` accepting a `lang` prop: a sticky (`sticky top-0`) white/blur bar with a small logo (`/favicon.svg` + `SITE_TITLE` wordmark linking to `/`) and exactly 4 root-relative home-section links — `/#top`, `/#realidad`, `/#atavica`, `/#testimonios` — labeled via the existing `global.nav.home/reality/treatment/cases` keys in the page language. The header SHALL contain no language switcher and no CTA. No new message keys are introduced.

#### Scenario: Header links work from every page
- **WHEN** any top-bar link is activated on a legal page
- **THEN** the browser navigates to the homepage section (root-relative URL, verified with scroll; `data-astro-reload` fallback if `ClientRouter` drops the fragment)

#### Scenario: No new message keys
- **WHEN** `validate-i18n` runs
- **THEN** it passes with the pre-existing key set (header reuses `global.nav.*`, footer reuses `global.footer.*`)

### Requirement: Shared site footer with credit line
The system SHALL provide `src/components/organisms/SiteFooter.astro` accepting a `lang` prop: the Spanish copyright line, the 5 legal links via `getLocalizedPath(pageKey, lang)` with canonical labels (`Términos de Uso` in Spanish), plus a small `text-[11px] text-slate-400` line below the legal nav reading `Powered by Dari Developer`, linking to `https://darideveloper.com/` with `target="_blank" rel="noopener"`. This reverses the earlier removal: the credit line is reinstated at the site owner's explicit request.

#### Scenario: Footer shows five localized links and the credit line
- **WHEN** any page renders the footer
- **THEN** it shows the copyright line, 5 legal links for the page locale, and the "Powered by Dari Developer" link below them

### Requirement: Layout renders the shared chrome
`src/layouts/Layout.astro` SHALL render `<SiteHeader>` / `<SiteFooter>` (passing `lang`) instead of its scaffold header/footer, keeping head/SEO slot/styles untouched and dropping the now-unused `LangBtns` import. Legal pages and the 404 page inherit branding automatically.

#### Scenario: Legal and 404 pages share chrome
- **WHEN** a legal page or the 404 page renders
- **THEN** its header and footer markup match the shared components

### Requirement: Homepage footer swap keeps the credit line
`src/pages/index.astro` SHALL render its footer via `<SiteFooter lang="es"/>`, and the rendered homepage footer SHALL include the "Powered by Dari Developer" line beneath the legal nav.

#### Scenario: Homepage footer region includes credit
- **WHEN** the built homepage footer is inspected
- **THEN** the credit line is present below the five legal links

### Requirement: LegalPage branding stays quiet and scoped
`src/components/pages/legal/LegalPage.astro` SHALL render a simple constrained title block (title, description, `updated`, `max-w-3xl`, white background — no hero band) above the unchanged `<Markdown content={entry.body}>` body, with the teal heading-hover accent overridden to plum scoped to legal articles only. The shared `Markdown` atom is untouched. Markdown sources (`.md` files) are not modified by this capability.

#### Scenario: Legal body still renders from Markdown
- **WHEN** a legal page renders
- **THEN** the body HTML matches the pre-change Markdown output for the same source file
