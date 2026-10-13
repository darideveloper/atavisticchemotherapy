## MODIFIED Requirements

### Requirement: Shared site footer with credit line

The system SHALL provide `src/components/organisms/SiteFooter.astro` accepting a `lang` prop: the Spanish copyright line, the 5 legal links via `getLocalizedPath(pageKey, lang)` with canonical labels (`Términos de Uso` in Spanish), plus a small `text-[11px] text-slate-400` line below the legal nav reading `Powered by Dari Developer`, linking to `https://darideveloper.com/` with `target="_blank" rel="noopener"`. This reverses the earlier removal: the credit line is reinstated at the site owner's explicit request.

#### Scenario: Footer shows five localized links and the credit line

- **WHEN** any page renders the footer
- **THEN** it shows the copyright line, 5 legal links for the page locale, and the "Powered by Dari Developer" link below them

### Requirement: Homepage footer swap keeps the credit line

`src/pages/index.astro` SHALL render its footer via `<SiteFooter lang="es"/>`, and the rendered homepage footer SHALL include the "Powered by Dari Developer" line beneath the legal nav.

#### Scenario: Homepage footer region includes credit

- **WHEN** the built homepage footer is inspected
- **THEN** the credit line is present below the five legal links
