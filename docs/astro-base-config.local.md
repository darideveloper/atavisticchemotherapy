---
source: templates://astro/astro-base-config.local.md
version: 2026-09-27+local
---

# astro-base-config — Project Overrides

> Project-specific additions for `astro-base-config.md`. This file is never overwritten by `pull.sh`.

## This project

- Prod domain: `https://quimioterapia-atavistica.org`. Instantiated `site` line:
  ```js
  site: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? 'https://quimioterapia-atavistica.org',
  ```
- Scripts instance: `dev: portless run pnpm astro dev` (foreground only). No backend validators beyond `validate-imports`; add `validate-i18n` / `validate-markdown` only when those layers land.
- `.env.example` instance:
  ```bash
  SITE_URL=https://atavisticchemotherapy.localhost
  ```
  The `PUBLIC_CONTACT_FORM_*` block is required for the client-safe contact form during production builds.
- `env.d.ts`: the client-safe `PUBLIC_CONTACT_FORM_*` readers are typed alongside server-only `SITE_URL` / `PORT` / `HOST` / `PORTLESS_URL` per parent doc §4.

