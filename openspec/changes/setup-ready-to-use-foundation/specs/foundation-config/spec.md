## ADDED Requirements

### Requirement: Unified Astro base configuration
The project SHALL have a merged `astro.config.mjs` that wires the Tailwind v4 Vite plugin, the React integration, and the sitemap integration, along with a site origin chain resolved from `PORTLESS_URL` → `SITE_URL` → production origin.

#### Scenario: Build uses configured site
- **WHEN** `astro build` is invoked
- **THEN** the generated sitemap and canonical URLs reflect the resolved site origin

#### Scenario: Aliased imports resolve
- **WHEN** a component imports from `@/lib/x`
- **THEN** it resolves to `src/lib/x` via the `tsconfig` and Astro alias configuration

### Requirement: Type-safe env handling
The project SHALL provide `env.d.ts` (empty `ImportMetaEnv` + `NodeJS.ProcessEnv`) and an `.env.example` documenting `SITE_URL`, so env access is typed and secrets stay out of the repo.

#### Scenario: Env types are declared
- **WHEN** a file accesses `import.meta.env`
- **THEN** the access is covered by declared types

### Requirement: Validation scripts
The project SHALL expose package scripts (`validate-i18n`, `validate-markdown`, `validate-imports`) and a `build:i18n` script that runs validators before `astro build`, using `tsx` as a dev dependency.

#### Scenario: Validators run before build
- **WHEN** `pnpm build:i18n` is invoked
- **THEN** the validators execute and fail the build on violations before building

### Requirement: Base pages present
The project SHALL provide `src/pages/404.astro` and `src/pages/robots.txt.ts`.

#### Scenario: 404 page renders
- **WHEN** an unknown route is requested
- **THEN** the custom 404 page is served

#### Scenario: robots.txt generated
- **WHEN** `/robots.txt` is requested
- **THEN** a robots file is served that references the sitemap
