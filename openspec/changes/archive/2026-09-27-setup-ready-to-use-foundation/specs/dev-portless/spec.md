## ADDED Requirements

### Requirement: Portless dev URL with strict port
The dev server SHALL run through portless at a named `https://<project>.localhost` URL (main = `https://atavisticchemotherapy.localhost`, worktree = `https://<branch>.atavisticchemotherapy.localhost`), with the port derived from `PORT` (fallback to 4321) and `strictPort: true` in `astro.config.mjs`.

#### Scenario: Dev server on named localhost
- **WHEN** `pnpm dev` is started via portless
- **THEN** the site is reachable at an `https://<project>.localhost` URL

#### Scenario: Worktree-derived slug
- **WHEN** dev runs inside a git worktree
- **THEN** the localhost subdomain is auto-derived from the project/worktree name without hardcoding

### Requirement: Origin chain
The Astro site origin SHALL resolve in priority order `PORTLESS_URL` → `SITE_URL` → `https://atavisticchemotherapy.com`, and portless config SHALL reference it.

#### Scenario: Env origin fallback
- **WHEN** only `SITE_URL` is set
- **THEN** the site origin uses `SITE_URL`

#### Scenario: Prod fallback
- **WHEN** neither `PORTLESS_URL` nor `SITE_URL` is set
- **THEN** the site origin falls back to `https://atavisticchemotherapy.com`
