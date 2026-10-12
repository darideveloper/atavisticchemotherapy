## ADDED Requirements

### Requirement: AccLink atom renders a styled accordion link

The project SHALL provide an `AccLink` atom at `src/components/atoms/AccLink.astro` that reproduces the `acc-link` appearance (bordered, rounded, bold, brand-colored, `+`-icon row) and SHALL own that styling, so the landing page no longer defines `.acc-link` CSS inline.

#### Scenario: Migrated modal link is styled by the atom

- **WHEN** the contact-modal section link renders
- **THEN** it is produced by `AccLink` and receives the accordion-link appearance from the atom's scoped styles, not from page-level CSS

#### Scenario: Inline acc-link CSS removed

- **WHEN** `src/pages/index.astro` is inspected
- **THEN** no `.acc-link` rule remains in its `<style>` blocks

### Requirement: AccLink supports icon variants and safe external targets

The `AccLink` atom SHALL accept `href` (required) plus optional `target`, `rel`, `icon` (`'+'`, `'external'`, or `'none'`, default `'+'`), `class`, and arbitrary pass-through attributes; it SHALL render the chosen icon as an `aria-hidden` element after the slotted text and SHALL apply `rel="noopener noreferrer"` by default when `target="_blank"`.

#### Scenario: External link opens safely with external icon

- **WHEN** `AccLink` is used with `target="_blank"` and `icon="external"`
- **THEN** the anchor renders `target="_blank"`, `rel="noopener noreferrer"`, and a trailing `↗` icon hidden from assistive tech

#### Scenario: Default icon is plus

- **WHEN** `AccLink` is used without an `icon` prop
- **THEN** the anchor renders the `+` icon

#### Scenario: Pass-through attributes reach the anchor

- **WHEN** `AccLink` is used with a `data-*` attribute or a `class` (e.g. `data-contact-section-link`, `sm:col-span-2`)
- **THEN** those attributes appear on the rendered `<a>` element

#### Scenario: Icon can be suppressed

- **WHEN** `AccLink` is used with `icon="none"`
- **THEN** the anchor renders without an icon element
