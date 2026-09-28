## Purpose

Unified Astro base config, typed env, validators, and base pages.

## Requirements

### Requirement: Unified Astro base configuration
The project SHALL have a merged `astro.config.mjs` that wires the Tailwind v4 Vite plugin, the React integration, and the sitemap integration, along with a site origin chain `PORTLESS_URL` → `SITE_URL` → `https://atavisticchemotherapy.com`.

#### Scenario: Build uses configured site
- **WHEN** `astro build` is invoked
- **THEN** the generated sitemap and canonical URLs reflect the resolved site origin

#### Scenario: Aliased imports resolve
- **WHEN** a component imports from `@/lib/x`
- **THEN** it resolves to `src/lib/x` via the `tsconfig` and Astro alias configuration

### Requirement: Type-safe env handling
The project SHALL provide `env.d.ts` (empty `ImportMetaEnv` + `NodeJS.ProcessEnv` for `SITE_URL`/`PORT`/`HOST`/`PORTLESS_URL`) and an `.env.example` documenting `SITE_URL=https://atavisticchemotherapy.localhost`. The project has no backend contract, so no `PUBLIC_*` client-side env is declared.

#### Scenario: Env types are declared
- **WHEN** a file accesses server-only env via `process.env`
- **THEN** the access is covered by declared types

#### Scenario: Empty client env
- **WHEN** an `ImportMetaEnv` declaration is inspected
- **THEN** it contains no `PUBLIC_*` members (no-backend project)

### Requirement: Validation scripts
The project SHALL expose package scripts (`validate-i18n`, `validate-markdown`, `validate-imports`) and a `build:i18n` script that runs validators before `astro build`, using `tsx` as a dev dependency. `validate-imports` always runs; `validate-i18n` / `validate-markdown` run when their layers are present.

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

### Requirement: Canonical .gitignore with marked extras
The project's `.gitignore` SHALL contain the canonical template block verbatim (build output, generated types, dependencies, environment variables, `openspec/changes/*` + `!openspec/changes/archive/` pair, `.*/` dotfolder ignore), and any entries below that block SHALL sit under section comments that mark them as project-specific or generic-local conveniences.

#### Scenario: Canonical block intact
- **WHEN** `.gitignore` is compared against the template in `docs/astro-base-config.md` § `.gitignore`
- **THEN** the first block matches verbatim, including the openspec archive pair

#### Scenario: Extras are labeled
- **WHEN** `.gitignore` is inspected below the canonical block
- **THEN** every entry belongs to a commented section identifying it as project-specific or generic-local
