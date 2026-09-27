## Purpose

React islands + Tailwind v4 wired with hydration-safe patterns.

## Requirements

### Requirement: React integration wired
The project SHALL integrate `@astrojs/react` and the Tailwind v4 Vite plugin, and provide `src/styles/global.css` (Tailwind + `tw-animate-css` + `@theme`) imported by the layout shell.

#### Scenario: Global styles applied
- **WHEN** the layout loads
- **THEN** Tailwind global CSS is applied site-wide

### Requirement: Hydration-safe islands
Interactive React widgets SHALL be rendered with a `client:*` directive and hydrated on the client without using `"use client"`, while static content remains server-rendered HTML.

#### Scenario: Island hydrates on load
- **WHEN** a visible interactive element uses `client:load`
- **THEN** it hydrates and is interactive in the browser

#### Scenario: Static HTML present without JS
- **WHEN** the page HTML is inspected
- **THEN** the island's static content is present before hydration

### Requirement: Astro↔React slot pattern
The project SHALL expose an Astro↔React slot pattern so content passed via Astro slots renders as static HTML, keeping it crawler-visible.

#### Scenario: Slot content is server-rendered
- **WHEN** content is passed through an Astro slot into a React island
- **THEN** it is present in the static HTML
