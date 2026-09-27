## Context

The project is a fresh Astro 7 scaffold (`astro.config.mjs` is empty, `src/` has only the stock Welcome/Layout, no Tailwind alias, no integrations beyond defaults). `package.json` already includes `@astrojs/react`, `@astrojs/sitemap`, `@tailwindcss/vite`, `tailwindcss`, `react`, `marked`, `gsap`, `zod`, `zustand`, `tw-animate-css`. The `docs/` folder is a vendored vendor+local doc set describing 17+ features with documented interdependencies. Nothing is wired yet, so no documented feature is currently usable.

## Goals / Non-Goals

**Goals:**
- Stand up the base config + infra (foundation-config, dev-portless, site-config) that every doc depends on.
- Scaffold each opt-in kit (react-islands, markdown-pipeline, i18n, seo, images, zustand-zod, gsap-reveals, page-transitions, atomic-components) with one working demo each so the project is "ready to use" per feature.
- Provide automated verification (`validate-i18n`, `validate-markdown`, `validate-imports`, `build:i18n`, `build:full`) that prove the foundation is healthy.
- Respect the vendor/local doc precedence: real project specifics only in `*.local.md`; nothing in `*.md`.

**Non-Goals:**
- Swiper appendix; blog/RSS (`BlogSEO`/`BlogPostSEO`, `rss.xml.js`); `prices.ts`/`faq.ts`/`vehicle-features.ts`; GSAP branded loader/entrance; shadcn-based atoms. Git worktrees already exist as a committed spec (`worktree-dev-workflow`) and are out of scope. `content.md`/`design/` scratch (real 4-page site blueprint) is ignored by this change.

## Decisions

### D1. Build order follows doc dependency graph
Docs declare prerequisites: `base-config` underlies portless (port env), site-config (origin), react-islands (`@/`), SEO, i18n, markdown, images. SEO's §0 lists i18n and markdown (`stripMarkdown`) as prerequisites, and `astro-images` links from SEO §6.2. So order is: **base → portless/site-config → react-islands → markdown → i18n → seo → images → remaining kits (zustand/zod, gsap, transitions, atoms) → verify**.
- *Alternative rejected:* grouping SEO with other "kits" in one phase would force reworking SEO once i18n/markdown/images land.

### D2. Vanilla atoms, not shadcn
`astro-atomic-components` offers two mutually-exclusive approaches. Vanilla self-bound atoms chosen: no `ui/` layer, atoms use Tailwind directly and bind a store via injectable hook. Keeps dependencies minimal (`cn` util only, no shadcn init).
- *Alternative rejected:* shadcn adds `ui/` layer + wrapper ceremony; heavier than needed for a foundation whose atoms are not yet specified.

### D3. GSAP reveals-only, no loader
`gsap-scrolltrigger/02` (branded loader + entrance orchestration) is set aside. Only `lib/gsap.ts` + reusable ScrollTrigger section-reveal (doc 01 + 03) ship. Rationale: content visible immediately, SEO-safe, no page-gating complexity.
- **No-JS progressive enhancement is required for SEO safety:** reveal elements carry the `.js-reveal` class (CSS `opacity:0; visibility:hidden`), and the Layout shell renders `<html class="no-js">` with an inline `no-js→js` swap. A global `.no-js .js-reveal { opacity:1 !important; visibility:visible !important }` override keeps content visible when JS is disabled (doc 05 §2). This closes the "content visible without JS" scenario.
- *Alternative rejected:* full loader system adds flash-of-empty risk and requires the `loader:complete` queue not otherwise used.

### D4. i18n EN+ES with EN-default / `es/`-prefixed routing
`[...path].astro` catch-all with `getStaticPaths()`, catalogs in `src/messages/{en,es}.json`, `t()` utils, `LangBtns` switcher, `validate-i18n` key-sync gate, legacy redirects `/en/* → /`. **EN is the default language (unprefixed, `defaultLang='en'`); ES is prefixed (`/es/`).** English catalogs act as source of truth; Spanish mirrors as placeholder copy.
- *Note:* irrelevant mention of "n8n" from the user was a typo for i18n; ignored.

### D5. SEO hierarchy limited to BaseSEO + PageSEO
No blog; so only `BaseSEO → PageSEO` layers ship. Default `jsonType="LocalBusiness"`. Canonical/hreflang consume site origin + i18n; JSON-LD polymorphic across the shipped variants. `stripMarkdown()` from markdown lib feeds meta descriptions. og-image pass-through/prefix per the images layer.

### D6. Placeholder business data
`site-config.ts` ships placeholder `BUSINESS_DATA` (url fallback `https://atavisticchemotherapy.com`, phones/email/address/socials/hours) + `SITE_TITLE`/`SITE_DESCRIPTION`/`LOCALE_MAP` in `consts.ts`. Real values replaceable later without touching markup (guarded by the `rg` no-hardcoded-data check).

### D7. Auto worktree-derived portless slug
Dev URL slug is derived from the project/worktree name rather than hardcoded (`astro-worktrees`+`astro-portless` pattern) — main `https://atavisticchemotherapy.localhost`, worktree `https://<branch>.atavisticchemotherapy.localhost` — with origin chain `PORTLESS_URL → SITE_URL → https://atavisticchemotherapy.com` and `strictPort`.

### D8. Verifiable build scripts
Dependencies `tsx` (dev) and `@tailwindcss/typography` (for `.prose-*`) are required. `build:i18n` = `validate-i18n && validate-imports && astro build`; `build:full` adds post-build `validate-markdown`. These give a concrete "ready to use" signal.

### D9. SSG images, local-only (no remotePatterns)
`astro-images` ships: `lib/images.ts` (`AVIF_QUALITY=55`/`WEBP_QUALITY=78`, `IMAGE_SLOTS`, `lcpPreload()`, `slideSet()`), `Image.astro` atom, LCP preload in Layout head, og-image pass-through. Because the project has **no backend and no static CDN host**, `image.remotePatterns` is omitted entirely — local `ImageMetadata` imports (the whole image story here) bypass the gate anyway.
- **`sharp` is an explicit project dependency** (not merely "bundled"): Astro's `astro:assets` image service could not resolve the transitive copy shipped under `.pnpm`, so `sharp` is installed as a direct `dependencies` entry so the demo `Image.astro` atom can emit AVIF/WebP.
- LCP preload is wired on the Home page: `Home.astro` passes `preloadImage` (+ `preloadSizes`) to `<Layout>`, which emits a plain `<link rel="preload" as="image" href>` fallback. The responsive `imagesrcset` form remains available via `preloadSrcSet` for pages that resolve a hero via `lcpPreload()`.

### D10. Markdown uses Content Collections Variant F
Legal pages are authored as local `.md` files: `src/content.config.ts` (`legal` collection, `glob()` loader, `generateId = "<slug>.<lang>"`), `src/content/legal/{slug}.{es,en}.md` (both languages required, throw on missing), `LegalPage` component, pageKeys wired into the i18n route map + catch-all. `code-copy.ts` handler included; `stripMarkdown()` feeds `BaseSEO`.

### D11. Docker deployment, non-PWA
Multi-stage `Dockerfile` (node:lts-alpine build via corepack pnpm + `--frozen-lockfile` → nginx:alpine serve), `nginx.conf` with gzip/security/immutable-asset headers (PWA blocks stripped — non-PWA project), `.dockerignore` excluding `.env*`. `SITE_URL` is a server-only build arg (Pattern B); no `PUBLIC_*` args (no backend). Included per the "enable all doc features" goal.

## Risks / Trade-offs

- [Validate-i18n/imports block honest builds] → Keep placeholders key-synchronized; validators are the guard to update when adding locales.
- [View Transitions double-fire or duplicate GSAP/reveals after swap] → Follow `astro:page-load`/`astro:after-swap` re-init pattern and `transition:animate="none"` on GSAP sections (doc cross-required).
- [React hydration mismatch on SSR static pages] → Use `client:*` + Astro slot pattern so static content stays server-rendered; no `"use client"`.
- [Tailwind v4 + typography plugin combos] → Wire `@headlesscss`-compatible `@tailwindcss/typography` via Vite; verify `.prose-*` styling in the markdown demo.
- [Off-by-one in origin chain mislabels canonicals] → Centralize origin resolution in base-config; SEO/sitemap read it, never recompute.
- [Demo island/capabilities overreach scope] → Each kit ships exactly one demo; future features are separate changes.
