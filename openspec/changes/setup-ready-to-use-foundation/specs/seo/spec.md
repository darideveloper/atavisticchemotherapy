## ADDED Requirements

### Requirement: SEO component hierarchy
The project SHALL provide a `BaseSEO` component consumed by the layout shell, plus a `PageSEO` component layered on top, resolving title and description with fallbacks from centralized config.

#### Scenario: BaseSEO loads in shell
- **WHEN** the layout renders
- **THEN** base meta, favicons, and an SEO slot are included

#### Scenario: PageSEO overrides defaults
- **WHEN** a page provides a title/description via `PageSEO`
- **THEN** those values override the shell defaults

### Requirement: Canonical and hreflang
The project SHALL emit canonical URLs and hreflang alternates for the supported locales, consuming the i18n system and site origin.

#### Scenario: Canonical emitted
- **WHEN** a page renders
- **THEN** a canonical URL for the resolved origin is present

#### Scenario: Hreflang alternates emitted
- **WHEN** a localized page renders
- **THEN** hreflang alternates for EN and ES are present

### Requirement: JSON-LD structured data
SEO components SHALL emit polymorphic JSON-LD across supported variants.

#### Scenario: JSON-LD emitted
- **WHEN** a page renders with SEO data
- **THEN** JSON-LD structured data is present in the HTML

### Requirement: Sitemap and robots
The project SHALL generate a sitemap via `@astrojs/sitemap` and expose `robots.txt` referencing it.

#### Scenario: Sitemap index generated
- **WHEN** `astro build` completes
- **THEN** `/sitemap-index.xml` is present in the build output

### Requirement: Favicon set
The project SHALL ship a favicon set (svg, ico, png, apple-touch-icon, og-image) referenced by the shell.

#### Scenario: Favicons referenced
- **WHEN** the layout renders
- **THEN** the favicon link tags point to the shipped asset set
