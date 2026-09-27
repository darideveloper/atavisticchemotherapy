## ADDED Requirements

### Requirement: SSG image transform library
The project SHALL provide `src/lib/images.ts` owning `AVIF_QUALITY`/`WEBP_QUALITY` constants, `IMAGE_SLOTS` (paired widths↔sizes), and helpers `lcpPreload()` and `slideSet()` built on `getImage` from `astro:assets`, with retry-with-backoff that falls back to verbatim URL rather than failing the build.

#### Scenario: Local image optimized
- **WHEN** a local `ImageMetadata` import is passed through the image atom
- **THEN** it is transformed to AVIF + WebP responsive `<picture>` output

#### Scenario: Fetch failure falls back
- **WHEN** `getImage` throws (transient remote flake)
- **THEN** the helper retries then returns fallback so the caller uses the verbatim URL

### Requirement: Image atom
The project SHALL provide `src/components/atoms/Image.astro` — one shared component for every prose/visual image, accepting `src` (`string | ImageMetadata`), `alt` (required), and lazy/priority props, rendering optimization-aware lazy/eager HTML.

#### Scenario: Atom renders picture
- **WHEN** an `Image.astro` atom receives a transformable source
- **THEN** it renders a `<picture>` with AVIF/WebP sources and a fallback `<img>`

#### Scenario: Alt and loading flags honored
- **WHEN** a caller passes `alt`, `loading="eager"`, and `fetchpriority="high"`
- **THEN** the rendered markup reflects those attributes

### Requirement: LCP / hero preload
The project SHALL select one hero/preload image per page, resolve it via `lcpPreload()`, and emit a responsive `<link rel="preload" as="image" imagesrcset imagesizes fetchpriority="high">` in the layout head (falling back to plain `href` preload). The Home page SHALL supply its hero image so the preload link is actually emitted.

#### Scenario: Preload emitted in head
- **WHEN** a page supplies a preload image + slot (e.g. Home passes `preloadImage`/`preloadSizes` to `<Layout>`)
- **THEN** the layout emits the preload link (plain `href` form when no transformed srcset is provided)

### Requirement: Remote pattern gate (local-only)
The project SHALL gate remote-image optimization by `image.remotePatterns` in `astro.config.mjs`. Because the project has no backend and no static CDN host, the gate SHALL be omitted (local `ImageMetadata` imports need no pattern and bypass the gate).

#### Scenario: No remote optimization without allowlist
- **WHEN** no `remotePatterns` are configured
- **THEN** remote URL strings pass through verbatim and are not optimized

#### Scenario: Local images unaffected
- **WHEN** local `ImageMetadata` imports are used
- **THEN** they are optimized regardless of `remotePatterns`

### Requirement: og:image integration
The SEO base component SHALL special-case the og image: absolute (`http`) og images pass through; relative ones get the `BUSINESS_DATA.url` prefix; a default og image lives in `public/`.

#### Scenario: Relative og image prefixed
- **WHEN** an og image path is relative
- **THEN** it is emitted with the `BUSINESS_DATA.url` prefix

### Requirement: React-island byte parity
For React islands, the project SHALL precompute slide sets in the Astro wrapper via `slideSet()` and render the identical `<picture>` markup by hand so output stays byte-identical to atom-rendered images.

#### Scenario: Island renders matching picture
- **WHEN** a React island receives a precomputed `SlideSet`
- **THEN** it renders `<picture>` markup identical to the atom output