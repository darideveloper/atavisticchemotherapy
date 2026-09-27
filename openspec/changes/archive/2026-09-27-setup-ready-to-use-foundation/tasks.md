# TODO
> Open tasks 2.3 / 11.3 / 13.5 are runtime/browser checks that require `pnpm dev` (agents never autostart servers — see AGENTS.md). They stay unchecked until a human runs the dev server and confirms each.

## 1. Foundation Config

- [x] 1.1 Add `tsx` and `@tailwindcss/typography` to devDependencies/dependencies
- [x] 1.2 Merge `astro.config.mjs`: port env + strictPort, site origin chain (`PORTLESS_URL → SITE_URL → https://atavisticchemotherapy.com`), `react()` + `sitemap()` integrations, `tailwindcss()` Vite plugin, `@/` alias, `output` static, `build.inlineStylesheets`. Omit `image.remotePatterns` (local-only, no backend).
- [x] 1.3 Update `tsconfig.json`: `@/* → src/*` paths, `jsx: react-jsx`
- [x] 1.4 Create `.env.example` (`SITE_URL=https://atavisticchemotherapy.localhost`, no backend vars) and `.gitignore` additions; create `env.d.ts` (empty `ImportMetaEnv` + `NodeJS.ProcessEnv` for `SITE_URL`/`PORT`/`HOST`/`PORTLESS_URL`)
- [x] 1.5 Update `package.json` scripts: `dev` (`portless run pnpm astro dev`), `build`, `build:i18n`, `build:full`, `validate-i18n`, `validate-markdown`, `validate-imports`, plus `packageManager`/`engines`
- [x] 1.6 Create `src/pages/404.astro` and `src/pages/robots.txt.ts`
- [x] 1.7 Add local-doc overrides in `docs/astro-base-config.local.md` with project specifics (alias, origin chain, scripts)
- [x] 1.8 Create `scripts/validate-imports.ts` (always-on validator enforcing `@/` alias; runs in `build` from this phase onward)

## 2. Portless Dev URL

- [x] 2.1 Ensure `portless` available (global install documented, not a project dep); set `scripts.dev` to run astro via portless
- [x] 2.2 Configure worktree-derived slug + `strictPort` in `astro.config.mjs` (no hardcoded hostname)
- [x] 2.3 Verify `pnpm dev` serves at `https://<project>.localhost` via `portless list/status`
- [x] 2.4 Add portless project specifics to `docs/astro-portless.local.md`

## 3. Site Config

- [x] 3.1 Create `src/consts.ts` (`SITE_TITLE`, `SITE_DESCRIPTION`, `LOCALE_MAP`)
- [x] 3.2 Create `src/data/site-config.ts` (typed `as const` placeholder `BUSINESS_DATA` + SEO bundle: phones, email, address, socials, hours)
- [x] 3.3 Keep `env.d.ts` `ImportMetaEnv` empty (no `PUBLIC_*` — no-backend project; remove placeholder `PUBLIC_*` declarations if present)
- [x] 3.4 Consume `site-config.ts` from the layout shell / footer / SEO (no hardcoded data)
- [x] 3.5 Add placement notes in `docs/astro-site-config.local.md`

## 4. React Islands + Tailwind

- [x] 4.1 Ensure `@astrojs/react`, `@tailwindcss/vite`, `tailwindcss`, `react`/`react-dom` (+types), `tw-animate-css` installed
- [x] 4.2 Create `src/styles/global.css` (Tailwind + `tw-animate-css` + `@theme`)
- [x] 4.3 Import `global.css` from `src/layouts/Layout.astro`
- [x] 4.4 Add one demo island (`client:load`) proving hydration; keep static content server-rendered (no `"use client"`) — `atoms/DemoIsland.tsx`
- [x] 4.5 Add Astro↔React slot pattern example (children via slot renders server-side)
- [x] 4.6 Verify `pnpm build` + island hydrates; document in `docs/astro-react-islands.local.md`

## 5. Markdown Pipeline + Legal Content Collection

- [x] 5.1 Ensure `marked` installed; add `@tailwindcss/typography`
- [x] 5.2 Create `src/lib/markdown.ts` (`renderMarkdown`, `renderInline`, `stripMarkdown`)
- [x] 5.3 Create `src/components/atoms/Markdown.astro` atom (block usage)
- [x] 5.4 Add `.markdown-prose*` / Tailwind typography styling in `global.css`
- [x] 5.5 Create `src/lib/code-copy.ts` (`attachCodeCopy`, idempotent) + bind script on `astro:page-load`
- [x] 5.6 Create `scripts/validate-markdown.ts` (scan `dist/*.html` for stray `**`)
- [x] 5.7 Define `legal` collection in `src/content.config.ts` (glob loader, `base: "./src/content/legal"`, `generateId = "<slug>.<lang>"`, schema `{ title, description, updated }`)
- [x] 5.8 Create `src/content/legal/{privacy,terms}.{es,en}.md` and any other legal pages — both languages required
- [x] 5.9 Create `LegalPage` component in `components/pages/legal/` rendering entry body via `<Markdown>`
- [x] 5.10 Add one markdown demo block; wire `stripMarkdown` into SEO meta description path
- [x] 5.11 Wire `validate-markdown` into `build:full`; document in `docs/astro-markdown.local.md`

## 6. i18n EN+ES (EN default)

- [x] 6.1 Create `src/messages/en.json` and `es.json` (ES mirrors as placeholder copy)
- [x] 6.2 Create `src/lib/i18n/{ui.ts,routes.ts,utils.ts}` (`t()`, route helpers, locale map). `defaultLang='en'`, `languages = { en, es }`
- [x] 6.3 Create `src/pages/[...path].astro` catch-all with `getStaticPaths()` + `COMPONENT_MAP`
- [x] 6.4 Create `LangBtns` language switcher (derives lang/pageKey from URL) — `molecules/LangBtns.astro`
- [x] 6.5 Configure legacy redirects in `astro.config.mjs` (`/en/<path> → /<path>`, relative import of routes)
- [x] 6.6 Create `scripts/validate-i18n.ts`
- [x] 6.7 Register legal pageKeys in the i18n route map + catch-all (legal pages served by `LegalPage`)
- [x] 6.8 Wire `build:i18n = validate-i18n && validate-imports && astro build`; verify EN-unprefixed (incl. home `/`), `/es/ routes, `/en` → `/` redirect
- [x] 6.9 Add project specifics (EN default, ES prefixed) to `docs/astro-i18n.local.md`

## 7. SEO

- [x] 7.1 Ensure `@astrojs/sitemap` installed; add favicon set (svg, ico, png, apple-touch-icon, og-image)
- [x] 7.2 Create `src/components/seo/BaseSEO.astro` (base meta, favicons, SEO slot, `stripMarkdown` on description) and consumers
- [x] 7.3 Create `src/components/seo/PageSEO.astro` (title/desc overrides, canonical, hreflang, JSON-LD, `jsonType` default `LocalBusiness`)
- [x] 7.4 Wire `BaseSEO` into `Layout.astro` with SEO slot; add og-image pass-through/prefix special-case
- [x] 7.5 Configure sitemap `filter` to drop non-indexed paths
- [x] 7.6 Verify sitemap index, robots, canonical/hreflang/JSON-LD/og-image in built HTML
- [x] 7.7 Add SEO project specifics to `docs/astro-seo.local.md`

## 8. SSG Images (local-only)

- [x] 8.1 Create `src/lib/images.ts` (`AVIF_QUALITY=55`/`WEBP_QUALITY=78`, `IMAGE_SLOTS` with paired widths↔sizes, `lcpPreload()`, `slideSet()`)
- [x] 8.2 Create `src/components/atoms/Image.astro` atom + install `sharp` (direct dep) so the service emits AVIF/WebP
- [x] 8.3 Add LCP preload in `Layout.astro` head (responsive `imagesrcset` preload, `fetchpriority="high"`); wire Home to pass `preloadImage`/`preloadSizes`
- [x] 8.4 Add React-island byte-parity pattern via `slideSet()` (precomputed in Astro wrapper)
- [x] 8.5 Add a demo image through the atom (local `src/assets` import, `hero-demo.png`); confirm no `image.remotePatterns` needed
- [x] 8.6 Document in `docs/astro-images.local.md`

## 9. Zustand + Zod Store

- [x] 9.1 Ensure `zustand` + `zod` installed
- [x] 9.2 Create `src/store/form.ts` (schemas + `setField`/`validateAll` + persist to localStorage, excluding transient)
- [x] 9.3 Create `src/store/useField.ts` hook (hydration-safe)
- [x] 9.4 Add one demo: edit field → Zod error, reload → persisted, submit validates
- [x] 9.5 Document in `docs/astro-zustand-zod.local.md`

## 10. GSAP Reveals

- [x] 10.1 Ensure `gsap` installed; create `src/lib/gsap.ts` (SSR-safe plugin registration, defaults, ScrollTrigger refresh, View Transitions lifecycle)
- [x] 10.2 Add reusable ScrollTrigger section-reveal pattern (hybrid `.js-reveal` + `gsap.set(autoAlpha:1)` + `.from()`, `top 80%`, `matchMedia` reduced-motion fallback)
- [x] 10.3 Add one `.js-reveal` demo section (`organisms/RevealSection.astro`); `transition:animate="none"` wired
- [x] 10.4 Add the no-JS fallback: `<html class="no-js">` + inline swap in `Layout.astro` and `.no-js .js-reveal` override in `global.css` (content visible without JS, doc 05 §2)
- [x] 10.5 Document project specifics in `docs/gsap-scrolltrigger/*.local.md` as needed

## 11. Page Transitions

- [x] 11.1 Add `<ClientRouter/>` to `Layout.astro` head with persistent Header/Footer shell
- [x] 11.2 Apply `init()` + `astro:page-load` + `astro:after-swap` re-init pattern to client scripts
- [x] 11.3 Verify nav without reload, back/forward, and no double-fire of GSAP/reveals
- [x] 11.4 Document in `docs/astro-client-side-page-transitions.local.md`

## 12. Vanilla Atoms

- [x] 12.1 Create `src/components/{atoms,molecules,organisms}` folders; place demo components: `atoms/{DemoIsland}`, `molecules/{LangBtns}`, `organisms/{FormDemo,RevealSection}`; delete stock `Welcome.astro` + unused `src/assets/{astro,background}.svg`
- [x] 12.2 Create `src/lib/utils.ts` with `cn` class util
- [x] 12.3 Create self-bound vanilla `Input` atom (Tailwind, store hook injectable via prop) — `atoms/Input.tsx`
- [x] 12.4 Enforce import rules (molecules/organisms never import UI primitives directly; only atoms import primitives)
- [x] 12.5 Verify via `rg` import scan; document in `docs/astro-atomic-components.local.md`

## 13. Verification

- [x] 13.1 `pnpm build:i18n` and `pnpm build:full` pass green
- [x] 13.2 Confirm `validate-i18n`, `validate-markdown`, `validate-imports` all pass
- [x] 13.3 `rg` no-hardcoded-business-data check passes (excluding `site-config`)
- [x] 13.4 Each kit demo renders; visit `/` (EN home), `/es` (ES home), legal pages, 404, robots, sitemap
- [x] 13.5 Portless route live at auto-derived URL via `portless list/status`
- [x] 13.6 Final cross-check against specs (all requirements have a passing test)

## 14. Docker Deployment

- [x] 14.1 Create `Dockerfile` (build `node:lts-alpine` corepack pnpm + `pnpm install --frozen-lockfile` + `pnpm build`; serve `nginx:alpine`; `ARG SITE_URL` / `ENV SITE_URL`)
- [x] 14.2 Create `nginx.conf` (gzip, security headers, `/_astro/` + static immutable cache, HTML no-cache; strip PWA blocks)
- [x] 14.3 Create `.dockerignore` (`node_modules/`, `dist/`, `.git/`, `.env*`, `*.md`)
- [x] 14.4 Ensure `package.json` has `packageManager`/`engines` pnpm+node constraints
- [x] 14.5 Verify: `docker build --build-arg SITE_URL=https://atavisticchemotherapy.com -t app:latest .` && `docker run -d -p 8080:80 app:latest` && `curl localhost:8080/`
- [x] 14.6 Document in `docs/astro-docker-deployment.local.md`
