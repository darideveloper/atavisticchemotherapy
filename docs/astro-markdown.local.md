---
source: templates://astro/astro-markdown.local.md
version: 2026-09-27+local
---

# astro-markdown — Project Overrides

> Project-specific additions for `astro-markdown.md`. This file is never overwritten by `pull.sh`.

## This project

- **Markdown-file pages use Content Collections (§6 Variant F).** The `legal` collection is defined in `src/content.config.ts` (glob loader, `base: "./src/content/legal"`, `generateId = "<slug>.<lang>"`), schema `{ title, description, updated }` as strings.
- Files live at `src/content/legal/{slug}.{es,en}.md` — **both languages required**; the page component throws at build if either is missing (no silent fallback).
- Project languages: `en` (default, unprefixed) and `es` (prefixed `/es/…`) — see `astro-i18n.local.md`. The ID convention `<slug>.<lang>` gives each localized page one source file.
- Legal pageKeys are registered in the i18n route map and served by the catch-all `[...path].astro`, mapping each `pageKey` to `LegalPage` (renders body via `<Markdown content={entry.body} />`).
- Routing is the **i18n catch-all** path (Variant F §4 "With i18n"). The standalone `getStaticPaths` route (Variant F §4 "No i18n") is only a fallback if this project ever drops i18n — not used today.
- Blog (if added) prefers Variant E (`renderMarkdown` block body) over the atom, to carve the article layout — current scope has no blog.
- `stripMarkdown()` feeds all `<meta name="description">` values (`BaseSEO`), so `**`/links never leak into SEO.