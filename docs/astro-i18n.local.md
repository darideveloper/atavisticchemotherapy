---
source: templates://astro/astro-i18n.local.md
version: 2026-09-27+local
---

# astro-i18n — Project Overrides

> Project-specific additions for `astro-i18n.md`. This file is never overwritten by `pull.sh`.

## This project

- **Spanish is the sole public language and is unprefixed.** `defaultLang = 'es'`.
- `routes.ts`: `home` → `""`; legal pages use their canonical Spanish slugs, such as `/privacidad` and `/terminos`.
- `src/messages/es.json` is the only UI catalog; `validate-i18n` ensures it is valid JSON and no inactive language catalogs remain.
- Legacy `/en/...` and `/es/...` URLs redirect to each page's canonical Spanish URL via `astro.config.mjs` `redirects`.
- Legal pageKeys are wired into the route map and served by the catch-all `[...path].astro` via `LegalPage`.

