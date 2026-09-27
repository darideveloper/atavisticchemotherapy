---
source: templates://astro/astro-i18n.local.md
version: 2026-09-27+local
---

# astro-i18n — Project Overrides

> Project-specific additions for `astro-i18n.md`. This file is never overwritten by `pull.sh`.

## This project

- **Default language EN (unprefixed), Spanish ES prefixed (`/es/`).** `defaultLang = 'en'`.
- `routes.ts`: `home` → `en: ""`, `es: "es"`; legal pages `privacy`/`terms` map to `en: privacy|terms`, `es: es/privacidad|es/terminos`.
- `src/messages/en.json` is the source of truth; `es.json` mirrors the same key set (enforced by `validate-i18n`).
- Legacy redirect: `/en/<path>` → `/<path>` (and `/en` → `/`) via `astro.config.mjs` `redirects`.
- Legal pageKeys (privacy, terms) are wired into the route map and served by the catch-all `[...path].astro` via `LegalPage`.

