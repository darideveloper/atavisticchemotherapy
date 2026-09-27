## Why

The project is a fresh Astro 7 scaffold with `docs/` vendor guides for 17+ features but none of the infrastructure wired up. Right now it can't readily use any of them (no `@/` alias, no Tailwind wiring, no localized routing, no SEO shell). We need a verified, ready-to-use foundation so each documented feature can be adopted on demand without redoing project structure.

## What Changes

Establish the base config and infrastructure the vendor docs depend on, then scaffold each library/kit with one working demo so the project is genuinely "ready to use" per feature.

- **Base config**: merge `astro.config.mjs` (Tailwind + React + sitemap integrations, site origin chain, `@/` alias), `tsconfig`, `env.d.ts`, `.env.example`, `.gitignore`, package scripts + validators, `tsx` dev dep, `404.astro`, `robots.txt.ts`.
- **Portless dev URLs**: dev served at an auto worktree-derived `https://<project>.localhost` with `strictPort`.
- **Centralized site config**: `src/data/site-config.ts` placeholder `BUSINESS_DATA` (contact, socials), consumed by shell/SEO.
- **Ready kits** (each: lib/module + one working demo):
  - React islands + Tailwind v4 (`global.css`, one `client:load` island).
  - Markdown pipeline (`lib/markdown.ts` render/inline/strip + `<Markdown>` atom + `@tailwindcss/typography` + `validate-markdown`).
  - i18n EN+ES (`messages/{en,es}.json`, `lib/i18n/{ui,routes,utils}.ts`, `[...path].astro`, `LangBtns`, `validate-i18n`, legacy redirects, `build:i18n`).
  - SEO (`BaseSEO` + `PageSEO` in shell, hreflang/canonical/JSON-LD, favicon set, sitemap).
  - Zustand+Zod store (`store/form.ts`, `useField.ts`, persist + Zod error demo).
  - GSAP reveals-only (`lib/gsap.ts` + one `.js-reveal` section; no loader).
  - View Transitions (`<ClientRouter/>` + `astro:page-load` re-init pattern).
  - Vanilla atoms (`atoms/molecules/organisms` folders + `cn` util + `Input` atom).

**Explicitly out of scope (deferred):** Docker/nginx/Coolify deployment, git worktrees setup, Swiper appendix, blog/RSS, `prices.ts`/`faq.ts`, GSAP branded loader, shadcn atoms.

## Capabilities

### New Capabilities
- `foundation-config`: base config, origins, env, validators, routing precedence, 404/robots.
- `dev-portless`: auto worktree-derived localhost HTTPS dev URL workflow.
- `site-config`: centralized typed business data consumed by shell and SEO.
- `react-islands`: React islands + Tailwind v4 wiring with hydration-safe patterns.
- `markdown-pipeline`: build-time markdown render/inline/strip + `<Markdown>` atom.
- `i18n`: EN+ES localized routing, message catalogs, `t()`, language switcher.
- `seo`: `BaseSEO`/`PageSEO` hierarchy, hreflang/canonical/JSON-LD, sitemap/robots.
- `zustand-zod`: Zod-validated persisted stores with `useField()` hook.
- `gsap-reveals`: reusable ScrollTrigger section-reveal system (reduced-motion safe).
- `page-transitions`: SPA-like transitions with correct re-init lifecycle.
- `atomic-components`: vanilla atoms/molecules/organisms hierarchy + `cn` util.

### Modified Capabilities
<!-- No existing specs; all capabilities are new -->

## Impact

- **Config**: `astro.config.mjs`, `tsconfig.json`, `env.d.ts` (new), `.env.example` (new), `.gitignore`, `package.json` scripts/deps.
- **Deps added**: `@astrojs/react`, `@tailwindcss/vite`, `tailwindcss`, `react`/`react-dom` (+types), `tw-animate-css`, `zod`, `zustand`, `marked`, `@tailwindcss/typography`, `gsap`, `@astrojs/sitemap`; dev `tsx`. (GSAP/react/sitemap/zod/zustand/marked already in package.json.)
- **New source dirs**: `src/styles/`, `src/lib/`, `src/data/`, `src/store/`, `src/components/{seo,atoms,molecules,organisms}`, `src/messages/`, `src/pages/[...path].astro`, `scripts/`.
- **Verification**: `pnpm build:i18n` and `pnpm build:full` pass; `validate-i18n`, `validate-markdown`, `validate-imports` green; no hardcoded business data (`rg` check); portless route live.
