---
source: templates://astro/astro-site-config.local.md
version: 2026-09-27+local
---

# astro-site-config — Project Overrides

> Project-specific additions for `astro-site-config.md`. This file is never overwritten by `pull.sh`.

## This project

- Prod canonical: `https://atavisticchemotherapy.com` (`BUSINESS_DATA.url` fallback).
- Dev canonical chain (same order everywhere): `PORTLESS_URL → SITE_URL → https://atavisticchemotherapy.com`.
  - `astro.config.mjs`: `site: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? "https://atavisticchemotherapy.com"`
  - `src/data/site-config.ts`: `url: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? "https://atavisticchemotherapy.com"`
- `.env` instance: `SITE_URL=https://atavisticchemotherapy.localhost`. No backend vars (no-backend project).
- Business data still placeholder until real contact/socials land (see parent doc §1 `TODO(replace)`).

