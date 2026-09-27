## Purpose

BaseSEO/PageSEO hierarchy, canonical/hreflang/JSON-LD, sitemap and robots.

## Requirements

### Requirement: SEO component hierarchy
The project SHALL provide a `BaseSEO` component rendering base meta/favicons/JSON-LD, plus a `PageSEO` component layered on top, resolving title and description with fallbacks from centralized config. Pages SHALL inject SEO via an Astro `slot="seo"` (the Layout shell exposes `<slot name="seo" />` in `<head>`), per the documented slot pattern.

#### Scenario: SEO injected through head slot
- **WHEN** a page renders `<PageSEO slot="seo" />` inside `<Layout>`
- **THEN** the metadata is injected into `<head>` via the shell's `seo` slot

#### Scenario: PageSEO overrides defaults
- **WHEN** a page provides a title/description via `PageSEO`
- **THEN** those values override the shell/const defaults

### Requirement: Canonical and hreflang
The project SHALL emit canonical URLs and hreflang alternates for the supported locales, consuming the i18n system and site origin.

#### Scenario: Canonical emitted
- **WHEN** a page renders
- **THEN** a canonical URL for the resolved origin is present

#### Scenario: Hreflang alternates emitted
- **WHEN** a localized page renders
- **THEN** hreflang alternates for EN and ES are present

### Requirement: JSON-LD structured data
SEO components SHALL emit polymorphic JSON-LD across supported variants, defaulting `jsonType` to `LocalBusiness` for standard pages.

#### Scenario: JSON-LD emitted
- **WHEN** a page renders with SEO data
- **THEN** JSON-LD structured data is present in the HTML

#### Scenario: Default LocalBusiness schema
- **WHEN** a page uses `PageSEO` without overriding `jsonType`
- **THEN** the JSON-LD type is `LocalBusiness` with address, contact, geo, opening hours, and `sameAs` from the centralized config

### Requirement: og:image integration
The SEO base component SHALL special-case the og image per the images layer: absolute (`http`) og images pass through; relative ones get the `BUSINESS_DATA.url` prefix.

#### Scenario: Relative og image prefixed
- **WHEN** an og image path is relative
- **THEN** it is emitted with the `BUSINESS_DATA.url` prefix

### Requirement: Sitemap and robots
The project SHALL generate a sitemap via `@astrojs/sitemap` and expose `robots.txt` referencing it.

#### Scenario: Sitemap index generated
- **WHEN** `astro build` completes
- **THEN** `/sitemap-index.xml` is present in the build output

#### Scenario: Sitemap filter applied
- **WHEN** a path is not meant to be indexed
- **THEN** the sitemap `filter` drops it from the sitemap

### Requirement: Favicon set
The project SHALL ship a favicon set (svg, ico, png, apple-touch-icon, og-image) referenced by the shell.

#### Scenario: Favicons referenced
- **WHEN** the layout renders
- **THEN** the favicon link tags point to the shipped asset set
