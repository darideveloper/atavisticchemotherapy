---
source: templates://astro/astro-client-side-page-transitions.local.md
version: 2026-09-27+local
---

# astro-client-side-page-transitions — Project Overrides

> Project-specific additions for `astro-client-side-page-transitions.md`. This file is never overwritten by `pull.sh`.

## This project

- Router ON (Base default): `<ClientRouter />` in `src/layouts/Layout.astro` `<head>` with persistent header/footer shell.
- Re-init pattern applied in all client scripts via `astro:page-load` + `astro:after-swap` (see `RevealSection.astro`, `Markdown.astro` code-copy).
- GSAP sections use `transition:animate="none"` on the section root + `ScrollTrigger.refresh()` on `astro:page-load`.

