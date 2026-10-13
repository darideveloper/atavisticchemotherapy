## MODIFIED Requirements

### Requirement: og:image integration
The SEO base component SHALL special-case the og image: absolute (`http`) og images pass through; relative ones get the `BUSINESS_DATA.url` prefix; a default og image lives in `public/`. The default `public/og-image.jpg` SHALL be an actual JPEG whose pixel dimensions match the `og:image:type`/`og:image:width`/`og:image:height` meta tags emitted by the SEO base component (currently `image/jpeg`, 1200×630), so no platform has to crop or letterbox an unexpected aspect ratio.

#### Scenario: Relative og image prefixed
- **WHEN** an og image path is relative
- **THEN** it is emitted with the `BUSINESS_DATA.url` prefix

#### Scenario: Default og image matches its declared meta
- **WHEN** `public/og-image.jpg` is probed for format and dimensions
- **THEN** it is JPEG at exactly the width/height declared by the emitted `og:image:*` meta tags

#### Scenario: Build output carries the default og image
- **WHEN** `astro build` completes
- **THEN** `dist/og-image.jpg` is byte-identical to `public/og-image.jpg` and the emitted `og:image` URL resolves to it
