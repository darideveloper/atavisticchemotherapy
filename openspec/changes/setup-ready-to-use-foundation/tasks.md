## 1. Foundation Config

- [ ] 1.1 Add `tsx` and `@tailwindcss/typography` to devDependencies/dependencies
- [ ] 1.2 Merge `astro.config.mjs`: port env + strictPort, site origin chain (`PORTLESS_URL → SITE_URL → prod`), `react()` + `sitemap()` integrations, `tailwindcss()` Vite plugin, `@/` alias, `output` static, `build.inlineStylesheets`
- [ ] 1.3 Update `tsconfig.json`: `@/* → src/*` paths, `jsx: react-jsx`
- [ ] 1.4 Create `.env.example` (with `SITE_URL=placeholder`) and `.gitignore` additions; create `env.d.ts` (`ImportMetaEnv` + `NodeJS.ProcessEnv`)
- [ ] 1.5 Update `package.json` scripts: `dev`, `build`, `build:i18n`, `build:full`, `validate-i18n`, `validate-markdown`, `validate-imports`, plus `packageManager`/`engines`
- [ ] 1.6 Create `src/pages/404.astro` and `src/pages/robots.txt.ts`
- [ ] 1.7 Add local-doc overrides in `docs/astro-base-config.local.md` with project specifics (alias, origin chain, scripts)

## 2. Portless Dev URL

- [ ] 2.1 Ensure `portless` available (global install documented, not a project dep); set `scripts.dev` to run astro via portless
- [ ] 2.2 Configure worktree-derived slug + `strictPort` in `astro.config.mjs` (no hardcoded hostname)
- [ ] 2.3 Verify `pnpm dev` serves at `https://<project>.localhost` via `portless list/status`
- [ ] 2.4 Add portless project specifics to `docs/astro-portless.local.md`

## 3. Site Config

- [ ] 3.1 Create `src/consts.ts` (`SITE_TITLE`, `SITE_DESCRIPTION`, `LOCALE_MAP`)
- [ ] 3.2 Create `src/data/site-config.ts` (typed `as const` placeholder `BUSINESS_DATA` + SEO bundle: phones, email, address, socials, hours)
- [ ] 3.3 Declare `PUBLIC_*` env vars in `env.d.ts`
- [ ] 3.4 Consume `site-config.ts` from the layout shell / footer / SEO (no hardcoded data)
- [ ] 3.5 Add placement notes in `docs/astro-site-config.local.md`

## 4. React Islands + Tailwind

- [ ] 4.1 Ensure `@astrojs/react`, `@tailwindcss/vite`, `tailwindcss`, `react`/`react-dom` (+types), `tw-animate-css` installed
- [ ] 4.2 Create `src/styles/global.css` (Tailwind + `tw-animate-css` + `@theme`)
- [ ] 4.3 Import `global.css` from `src/layouts/Layout.astro`
- [ ] 4.4 Add one demo island (`client:load`) proving hydration; keep static content server-rendered (no `"use client"`)
- [ ] 4.5 Add Astro↔React slot pattern example
- [ ] 4.6 Verify `pnpm build` + island hydrates; document in `docs/astro-react-islands.local.md`

## 5. Markdown Pipeline

- [ ] 5.1 Ensure `marked` installed; add `@tailwindcss/typography`
- [ ] 5.2 Create `src/lib/markdown.ts` (`renderMarkdown`, `renderInline`, `stripMarkdown`)
- [ ] 5.3 Create `src/components/atoms/Markdown.astro` atom (block usage)
- [ ] 5.4 Add `.markdown-prose*` / Tailwind typography styling in `global.css`
- [ ] 5.5 Create `scripts/validate-markdown.ts` (scan `dist/*.html` for stray `**`)
- [ ] 5.6 Add one markdown demo block; wire `stripMarkdown` into SEO meta description path
- [ ] 5.7 Wire `validate-markdown` into `build:full`; document in `docs/astro-markdown.local.md`

## 6. i18n EN+ES

- [ ] 6.1 Create `src/messages/en.json` and `es.json` (ES mirror as placeholder copy)
- [ ] 6.2 Create `src/lib/i18n/{ui.ts,routes.ts,utils.ts}` (`t()`, route helpers, locale map)
- [ ] 6.3 Create `src/pages/[...path].astro` catch-all with `getStaticPaths()` + `COMPONENT_MAP`
- [ ] 6.4 Create `LangBtns` language switcher (derives lang/pageKey from URL)
- [ ] 6.5 Configure legacy redirects in `astro.config.mjs` (relative import of routes)
- [ ] 6.6 Create `scripts/validate-i18n.ts` and `scripts/validate-imports.ts`
- [ ] 6.7 Wire `build:i18n = validate-i18n && validate-imports && astro build`; verify EN-unprefixed + `/es/` routes
- [ ] 6.8 Add project specifics to `docs/astro-i18n.local.md`

## 7. SEO

- [ ] 7.1 Ensure `@astrojs/sitemap` installed; add favicon set (svg, ico, png, apple-touch-icon, og-image)
- [ ] 7.2 Create `src/components/seo/BaseSEO.astro` (base meta, favicons, SEO slot) and consumers
- [ ] 7.3 Create `src/components/seo/PageSEO.astro` (title/desc overrides, canonical, hreflang, JSON-LD)
- [ ] 7.4 Wire `BaseSEO` into `Layout.astro` with SEO slot
- [ ] 7.5 Verify sitemap index, robots, canonical/hreflang/JSON-LD in built HTML
- [ ] 7.6 Add SEO project specifics to `docs/astro-seo.local.md`

## 8. Zustand + Zod Store

- [ ] 8.1 Ensure `zustand` + `zod` installed
- [ ] 8.2 Create `src/store/form.ts` (schemas + `setField`/`validateAll` + persist to localStorage, excluding transient)
- [ ] 8.3 Create `src/store/useField.ts` hook (hydration-safe)
- [ ] 8.4 Add one demo: edit field → Zod error, reload → persisted, submit validates
- [ ] 8.5 Document in `docs/astro-zustand-zod.local.md`

## 9. GSAP Reveals

- [ ] 9.1 Ensure `gsap` installed; create `src/lib/gsap.ts` (SSR-safe plugin registration, defaults, ScrollTrigger refresh, View Transitions lifecycle)
- [ ] 9.2 Add reusable ScrollTrigger section-reveal pattern (hybrid `.js-reveal` + `gsap.set(autoAlpha:1)` + `.from()`, `top 80%`, `matchMedia` reduced-motion fallback)
- [ ] 9.3 Add one `.js-reveal` demo section; `transition:animate="none"` wired
- [ ] 9.4 Document project specifics in `docs/gsap-scrolltrigger/*.local.md` as needed

## 10. Page Transitions

- [ ] 10.1 Add `<ClientRouter/>` to `Layout.astro` head with persistent Header/Footer shell
- [ ] 10.2 Apply `init()` + `astro:page-load` + `astro:after-swap` re-init pattern to client scripts
- [ ] 10.3 Verify nav without reload, back/forward, and no double-fire of GSAP/reveals
- [ ] 10.4 Document in `docs/astro-client-side-page-transitions.local.md`

## 11. Vanilla Atoms

- [ ] 11.1 Create `src/components/{atoms,molecules,organisms}` folders
- [ ] 11.2 Create `src/lib/utils.ts` with `cn` class util
- [ ] 11.3 Create self-bound vanilla `Input` atom (Tailwind, store hook injectable via prop)
- [ ] 11.4 Enforce import rules (molecules/organisms never import UI primitives directly)
- [ ] 11.5 Verify via `rg` import scan; document in `docs/astro-atomic-components.local.md`

## 12. Verification

- [ ] 12.1 `pnpm build:i18n` and `pnpm build:full` pass green
- [ ] 12.2 Confirm `validate-i18n`, `validate-markdown`, `validate-imports` all pass
- [ ] 12.3 `rg` no-hardcoded-business-data check passes (excluding `site-config`)
- [ ] 12.4 Each kit demo renders; screenshot/visit `index`, `/es/`, 404, robots, sitemap
- [ ] 12.5 Portless route live at auto-derived URL via `portless list/status`
- [ ] 12.6 Final cross-check against specs (all requirements have a passing test)
