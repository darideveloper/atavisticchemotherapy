## MODIFIED Requirements

### Requirement: Shared sticky site header
The system SHALL provide `src/components/organisms/SiteHeader.astro` accepting a `lang` prop: a sticky (`sticky top-0`) white/blur bar carrying the `SITE_TITLE` wordmark rendered uppercase via CSS and linking to `/`, with no logo mark or icon image beside it, plus exactly 4 root-relative home-section links — `/#top`, `/#realidad`, `/#atavica`, `/#testimonios` — labeled via the existing `global.nav.home/reality/treatment/cases` keys in the page language. The wordmark text SHALL be the link's accessible name, with no `aria-label` overriding it. The header SHALL contain no language switcher and no CTA. No new message keys are introduced. Below the `sm` breakpoint (640px) the 4 links SHALL be presented in a disclosure menu — hidden by default, revealed by a single toggle control, and laid out as a full-width panel directly below the bar — and the sticky bar SHALL remain a single row (the links may stack vertically inside the open panel); from `sm` up the 4 links SHALL render inline in the bar with no toggle shown. Opening and closing the menu SHALL work through CSS alone, so it still functions with JavaScript disabled. The wordmark SHALL be allowed to shrink and truncate with an ellipsis rather than forcing the bar beyond one row.

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

#### Scenario: Mobile header stays a single row
- **WHEN** any page renders at a ~360px viewport
- **THEN** the sticky bar is one row containing the wordmark and the menu toggle, with no wrapped nav links and no horizontal overflow

#### Scenario: Toggle reveals the collapsed links
- **WHEN** the toggle is activated on a viewport below `sm`
- **THEN** the 4 links appear stacked in a full-width panel directly below the bar and the toggle shows its close state

#### Scenario: Menu opens without JavaScript
- **WHEN** JavaScript is disabled and the toggle is activated
- **THEN** the menu still opens because the open/close state is driven by CSS, not by a script

#### Scenario: Desktop keeps the inline nav
- **WHEN** the viewport is at or above `sm`
- **THEN** the 4 links render inline in the bar and no toggle control is displayed

#### Scenario: Menu closes after a link is chosen
- **WHEN** JavaScript is enabled and a link inside the open mobile menu is activated
- **THEN** the menu returns to its collapsed state before the destination renders

#### Scenario: Wordmark truncates instead of wrapping
- **WHEN** the wordmark is wider than the space remaining beside the toggle
- **THEN** it truncates with an ellipsis and the bar remains a single row
