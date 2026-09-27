---
source: templates://astro/astro-base-config.local.md
version: 2026-09-27+local
---

# astro-base-config — Project Overrides

> Project-specific additions for `astro-base-config.md`. This file is never overwritten by `pull.sh`.

## This project

- Prod domain: `https://atavisticchemotherapy.com`. Instantiated `site` line:
  ```js
  site: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? 'https://atavisticchemotherapy.com',
  ```
- Scripts instance: `dev: portless run pnpm astro dev` (foreground only). No backend validators beyond `validate-imports`; add `validate-i18n` / `validate-markdown` only when those layers land.
- `.env.example` instance:
  ```bash
  SITE_URL=https://atavisticchemotherapy.localhost
  ```
  No backend block (no-backend project).
- `env.d.ts`: empty `ImportMetaEnv` default (no `PUBLIC_*` readers). Server-only `SITE_URL` / `PORT` / `HOST` / `PORTLESS_URL` typed via `NodeJS.ProcessEnv` per parent doc §4.

