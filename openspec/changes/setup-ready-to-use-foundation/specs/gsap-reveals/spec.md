## ADDED Requirements

### Requirement: Shared GSAP module
The project SHALL provide `src/lib/gsap.ts` (SSR-safe: plugin registration, defaults, ScrollTrigger refresh) wired for the View Transitions lifecycle.

#### Scenario: GSAP SSR-safe import
- **WHEN** the module is imported server-side
- **THEN** it imports without crashing on window/document absence

#### Scenario: ScrollTrigger refreshes
- **WHEN** a transition redraws the page
- **THEN** ScrollTrigger positions refresh correctly

### Requirement: Reusable section reveal
The project SHALL provide a reusable ScrollTrigger-reveal pattern (hybrid `.js-reveal` + `gsap.set(autoAlpha: 1)` + `.from()`) triggered at `top 80%`, with a `matchMedia` reduced-motion fallback.

#### Scenario: Section reveals on scroll
- **WHEN** a DOM section is scrolled into view
- **THEN** it animates in via ScrollTrigger

#### Scenario: Content visible without JS
- **WHEN** JS is disabled or fails
- **THEN** revealed content remains visible (SEO-safe)

#### Scenario: Reduced-motion respected
- **WHEN** the user prefers reduced motion
- **THEN** reveal animations are skipped or fast-forwarded
