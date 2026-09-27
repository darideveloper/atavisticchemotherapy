## Context

The project is a fresh Astro 7 scaffold (`astro.config.mjs` is empty, `src/` has only the stock Welcome/Layout, no Tailwind alias, no integrations beyond defaults). `package.json` already includes `@astrojs/react`, `@astrojs/sitemap`, `@tailwindcss/vite`, `tailwindcss`, `react`, `marked`, `gsap`, `zod`, `zustand`, `tw-animate-css`. The `docs/` folder is a vendored vendor+local doc set describing 17+ features with documented interdependencies. Nothing is wired yet, so no documented feature is currently usable.

## Goals / Non-Goals

**Goals:**
- Stand up the base config + infra (foundation-config, dev-portless, site-config) that every doc depends on.
- Scaffold each opt-in kit (react-islands, markdown-pipeline, i18n, seo, zustand-zod, gsap-reveals, page-transitions, atomic-components) with one working demo each so the project is "ready to use" per feature.
- Provide automated verification (`validate-i18n`, `validate-markdown`, `validate-imports`, `build:i18n`, `build:full`) that prove the foundation is healthy.
- Respect the vendor/local doc precedence: real project specifics only in `*.local.md`; nothing in `*.md`.

**Non-Goals:**
- Docker/nginx/Coolify deployment; git worktrees setup; Swiper appendix; blog/RSS (`BlogSEO`/`BlogPostSEO`, `rss.xml.js`); `prices.ts`/`faq.ts`/`vehicle-features.ts`; GSAP branded loader/entrance; shadcn-based atoms.

## Decisions

### D1. Build order follows doc dependency graph
Docs declare prerequisites: `base-config` underlies portless (port env), site-config (origin), react-islands (`@/`), SEO, i18n, markdown. SEO's §0 lists i18n and markdown (`stripMarkdown`) as prerequisites. So order is: **base → portless/site-config → react-islands → markdown → i18n → seo → remaining kits (zustand/zod, gsap, transitions, atoms) → verify**.
- *Alternative rejected:* grouping SEO with other "kits" in one phase would force reworking SEO once i18n/markdown land.

### D2. Vanilla atoms, not shadcn
`astro-atomic-components` offers two mutually-exclusive approaches. Vanilla self-bound atoms chosen: no `ui/` layer, atoms use Tailwind directly and bind a store via injectable hook. Keeps dependencies minimal (`cn` util only, no shadcn init).
- *Alternative rejected:* shadcn adds `ui/` layer + wrapper ceremony; heavier than needed for a foundation whose atoms are not yet specified.

### D3. GSAP reveals-only, no loader
`gsap-scrolltrigger/02` (branded loader + entrance orchestration) is set aside. Only `lib/gsap.ts` + reusable ScrollTrigger section-reveal (doc 01 + 03) ship. Rationale: content visible immediately, SEO-safe, no page-gating complexity.
- *Alternative rejected:* full loader system adds flash-of-empty risk and requires the `loader:complete` queue not otherwise used.

### D4. i18n EN+ES with EN-unprefixed / `es/`-prefixed routing
`[...path].astro` catch-all with `getStaticPaths()`, catalogs in `src/messages/{en,es}.json`, `t()` utils, `LangBtns` switcher, `validate-i18n` key-sync gate, legacy redirects. English catalogs act as source of truth; Spanish mirrors as placeholder copy.
- *Note:* irrelevant mention of "n8n" from the user was a typo for i18n; ignored.

### D5. SEO hierarchy limited to BaseSEO + PageSEO
No blog; so only `BaseSEO → PageSEO` layers ship. Canonical/hreflang consume site origin + i18n; JSON-LD polymorphic across the shipped variants. `stripMarkdown()` from markdown lib feeds meta descriptions.

### D6. Placeholder business data
`site-config.ts` ships placeholder `BUSINESS_DATA` (phones/email/address/socials/hours) + `SITE_TITLE`/`SITE_DESCRIPTION`/`LOCALE_MAP` in `consts.ts`. Real values replaceable later without touching markup (guarded by the `rg` no-hardcoded-data check).

### D7. Auto worktree-derived portless slug
Dev URL slug is derived from the project/worktree name rather than hardcoded (`astro-worktrees`+`astro-portless` pattern), with origin chain `PORTLESS_URL → SITE_URL → prod` and `strictPort`.

### D8. Verifiable build scripts
Dependencies `tsx` (dev) and `@tailwindcss/typography` (for `.prose-*`) are required. `build:i18n` = `validate-i18n && validate-imports && astro build`; `build:full` adds post-build `validate-markdown`. These give a concrete "ready to use" signal.

## Risks / Trade-offs

- [Validate-i18n/imports block honest builds] → Keep placeholders key-synchronized; validators are the guard to update when adding locales.
- [View Transitions double-fire or duplicate GSAP/reveals after swap] → Follow `astro:page-load`/`astro:after-swap` re-init pattern and `transition:animate="none"` on GSAP sections (doc cross-required).
- [React hydration mismatch on SSR static pages] → Use `client:*` + Astro slot pattern so static content stays server-rendered; no `"use client"`.
- [Tailwind v4 + typography plugin combos] → Wire `@headlesscss`-compatible `@tailwindcss/typography` via Vite; verify `.prose-*` styling in the markdown demo.
- [Off-by-one in origin chain mislabels canonicals] → Centralize origin resolution in base-config; SEO/sitemap read it, never recompute.
- [Demo island/capabilities overreach scope] → Each kit ships exactly one demo; future features are separate changes.
