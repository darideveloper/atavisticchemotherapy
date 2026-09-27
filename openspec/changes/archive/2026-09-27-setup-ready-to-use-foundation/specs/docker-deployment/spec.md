## ADDED Requirements

### Requirement: Multi-stage Docker build
The project SHALL provide a multi-stage `Dockerfile`: a `node:lts-alpine` build stage using `corepack prepare pnpm@<latest>` and `pnpm install --frozen-lockfile`, and an `nginx:alpine` serve stage copying `dist` and `nginx.conf`. `package.json` SHALL carry `packageManager` and `engines` pnpm/node constraints.

#### Scenario: Image builds the static site
- **WHEN** `docker build --build-arg SITE_URL=https://atavisticchemotherapy.com -t app:latest .` runs
- **THEN** it installs with the frozen lockfile, runs `pnpm build`, and produces a serving image

### Requirement: SITE_URL build arg
The Dockerfile SHALL accept `SITE_URL` as a server-only build arg (Pattern B) so production canonicals resolve per environment. Because the project has no backend, no `PUBLIC_*` build args are defined.

#### Scenario: Canonical set at build time
- **WHEN** `SITE_URL` is passed as a build arg
- **THEN** the built site's canonical URLs resolve to that origin

### Requirement: Nginx config (non-PWA)
The project SHALL provide `nginx.conf` serving `dist` with gzip, security headers, immutable caching for `/_astro/` and static assets, and no-cache for HTML. It SHALL exclude the PWA-only blocks (offline error_page, service worker, manifest).

#### Scenario: Assets cached immutable
- **WHEN** a `/_astro/` or hashed static asset is requested
- **THEN** it is served with `public, max-age=31536000, immutable`

#### Scenario: HTML not cached
- **WHEN** an HTML page is requested
- **THEN** it is served with `no-cache`

### Requirement: Dockerignore
The project SHALL provide a `.dockerignore` excluding `node_modules/`, `dist/`, `.git/`, `.env*`, and markdown/docs so the build context stays clean and dev `.env` never reaches the build.

#### Scenario: Dev env excluded
- **WHEN** the build context is assembled
- **THEN** `.env*` files are not copied into the image

### Requirement: Deploy verification
The project SHALL document/verify local run of the image: `docker run -d -p 8080:80 app:latest` and `curl localhost:8080/`.

#### Scenario: Container serves site
- **WHEN** the image runs on port 8080
- **THEN** `curl localhost:8080/` returns the site HTML (200)