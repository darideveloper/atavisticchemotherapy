## Purpose

SPA-like transitions with correct re-init lifecycle.

## Requirements

### Requirement: Client Router enabled
The project SHALL enable SPA-like page transitions by placing `<ClientRouter/>` in the layout head, with a persistent Header/Footer shell.

#### Scenario: Navigation without reload
- **WHEN** a user navigates between pages
- **THEN** the transition happens without a full page reload

### Requirement: Re-init lifecycle
Client scripts SHALL follow the `init()` + `astro:page-load` + `astro:after-swap` pattern so widgets re-initialize on every page transition, and GSAP sections SHALL opt out via `transition:animate="none"`.

#### Scenario: Widgets re-init after swap
- **WHEN** a page transition completes
- **THEN** interactive widgets and animations on the new page re-initialize

#### Scenario: Back/forward works
- **WHEN** the browser back/forward is used
- **THEN** previous scroll state and page state are restored without broken widgets
