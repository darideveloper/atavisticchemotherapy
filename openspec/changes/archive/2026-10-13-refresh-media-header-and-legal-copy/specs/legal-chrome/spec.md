## MODIFIED Requirements

### Requirement: Shared sticky site header
The system SHALL provide `src/components/organisms/SiteHeader.astro` accepting a `lang` prop: a sticky (`sticky top-0`) white/blur bar carrying the `SITE_TITLE` wordmark rendered uppercase via CSS and linking to `/`, with no logo mark or icon image beside it, plus exactly 4 root-relative home-section links — `/#top`, `/#realidad`, `/#atavica`, `/#testimonios` — labeled via the existing `global.nav.home/reality/treatment/cases` keys in the page language. The wordmark text SHALL be the link's accessible name, with no `aria-label` overriding it. The header SHALL contain no language switcher and no CTA. No new message keys are introduced.

#### Scenario: Header links work from every page
- **WHEN** any top-bar link is activated on a legal page
- **THEN** the browser navigates to the homepage section (root-relative URL, verified with scroll; `data-astro-reload` fallback if `ClientRouter` drops the fragment)

#### Scenario: No new message keys
- **WHEN** `validate-i18n` runs
- **THEN** it passes with the pre-existing key set (header reuses `global.nav.*`, footer reuses `global.footer.*`)

#### Scenario: Wordmark renders without a logo mark
- **WHEN** the rendered header markup is inspected
- **THEN** the brand link contains only the wordmark element — no `<img>` and no `/favicon.svg` reference

#### Scenario: Uppercase is a display concern
- **WHEN** the header brand element and the `SITE_TITLE` source value are compared
- **THEN** the source value is the canonical Title Case brand and the uppercase presentation comes from a CSS class on the header element

#### Scenario: Wordmark names the link
- **WHEN** the brand link's accessible name is computed
- **THEN** it resolves from the visible wordmark text, with no `aria-label` override
