---
source: templates://astro/astro-atomic-components.local.md
version: 2026-09-27+local
---

# astro-atomic-components — Project Overrides

> Project-specific additions for `astro-atomic-components.md`. This file is never overwritten by `pull.sh`.

## This project

- **Vanilla self-bound atoms** (no UI library): `src/components/atoms/Input.tsx` binds the Zustand store via the `useField` hook (injectable via props). No `ui/` wrapper tier.
- Hierarchy (current placement):
  - `atoms/` — primitives: `Input.tsx`, `Markdown.astro`, `Image.astro`, `DemoIsland.tsx` (counter demo). Only tier allowed to reference primitives.
  - `molecules/` — combinations of atoms: `LangBtns.astro` (header language switcher).
  - `organisms/` — screen regions: `FormDemo.tsx` (composes `atoms/Input` + store), `RevealSection.astro` (GSAP section).
  - Sibling namespaces: `pages/` (page components, e.g. `Home`, `legal/LegalPage`) and `seo/` (`BaseSEO`/`PageSEO`) are distinct layers per the component-dependencies guide — not raw UI primitives.
- `cn` util in `src/lib/utils.ts` for conditional class strings.
- Import rule: only `atoms/*` may reference primitives; `molecules`/`organisms` import from `atoms`, `store/*` or `lib/*` (enforced via import scan/`validate-imports`).

