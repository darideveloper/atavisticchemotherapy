---
source: templates://astro/astro-react-islands.local.md
version: 2026-09-27+local
---

# astro-react-islands — Project Overrides

> Project-specific additions for `astro-react-islands.md`. This file is never overwritten by `pull.sh`.

## This project

- Tailwind v4 + `@astrojs/react` wired via `astro.config.mjs` (`tailwindcss()` Vite plugin + `react()`).
- Global CSS: `src/styles/global.css` (`@import "tailwindcss"` + `tw-animate-css` + `@theme` tokens), imported once from `src/layouts/Layout.astro`.
- Demo island: `src/components/atoms/DemoIsland.tsx` (`client:load`, children via Astro slot renders server-side).
- React components never import the i18n system — translations arrive as props.

