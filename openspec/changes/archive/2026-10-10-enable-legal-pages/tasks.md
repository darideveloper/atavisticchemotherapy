## 1. Routing foundation

- [x] 1.1 Create `src/pages/[...path].astro` catch-all resolving legal pageKeys via `getPageKeyFromUrl()` and rendering `LegalPage` from the `legal` collection
- [x] 1.2 Extend `src/lib/i18n/routes.ts` with `cookies`, `medical-disclaimer`, `legal-notice` (EN unprefixed + ES `/es/*` paths)
- [x] 1.3 Sync `src/messages/en.json` + `es.json` footer and `pages.*` entries for all five legal pageKeys and run `pnpm validate-i18n`

## 2. Footer unification

- [x] 2.1 Replace hardcoded `/en/privacy` + `/en/terms` in `src/pages/index.astro` MainFooter with `getLocalizedPath()` links for all five pages
- [x] 2.2 Align `src/layouts/Layout.astro` footer with the same five links and canonical labels (`Términos de Uso`)
- [x] 2.3 Wire new pageKeys into `PageSEO` so each legal page emits correct title/description/canonical per locale

## 3. Legal content (EN + ES)

- [x] 3.1 Rewrite `src/content/legal/privacy.{en,es}.md` (individual-doctor controller, inbox-only handling, zero tracking, rights channels)
- [x] 3.2 Rewrite `src/content/legal/terms.{en,es}.md` (free evaluation, personalized-quote pricing, no figures, liability/IP)
- [x] 3.3 Create `src/content/legal/cookies.{en,es}.md` (zero-tracking statement, no banner)
- [x] 3.4 Create `src/content/legal/medical-disclaimer.{en,es}.md` (informational-only, investigational, NCT02366884 identifier + ClinicalTrials.gov link with no status adjectives, silent omission)
- [x] 3.5 Create `src/content/legal/legal-notice.{en,es}.md` (responsible individual, training history, consented testimonials, silent omission — no license/address commentary)

## 4. Verification

- [x] 4.1 Run `pnpm build:i18n` + `pnpm build:full` (validators + markdown scan) with zero errors
- [x] 4.2 Verify all 10 legal URLs return 200, `/en/*` legacy URLs redirect, unknown paths 404, sitemap lists all 10
- [x] 4.3 Scan `dist/` for banned strings (`XXXX`, `Replace with the real`, `Contenido provisional`, `Sustituir por`, `TODO`, `available on request`, `disponible a solicitud`, `unverified`, `sin verificar`, `not ready`, `pendiente de`) and confirm zero hits

## 5. Shared branded chrome

- [x] 5.1 Create `src/components/organisms/SiteHeader.astro` (sticky bar, small logo, 4 root-relative links via `global.nav.*`, no lang switch/CTA, `@/` imports only)
- [x] 5.2 Create `src/components/organisms/SiteFooter.astro` (verbatim `MainFooter` minus "Powered by", `lang` prop, 5 links via `getLocalizedPath()`)
- [x] 5.3 Swap `src/layouts/Layout.astro` chrome to `<SiteHeader>`/`<SiteFooter>`; drop unused `LangBtns` import
- [x] 5.4 Swap `src/pages/index.astro` inline footer for `<SiteFooter lang="es"/>` (single hunk; coordinate with `homepage-content-polish`)
- [x] 5.5 Brand `src/components/pages/legal/LegalPage.astro` (simple heading block, container, plum accent override scoped to legal articles; Markdown sources untouched)
- [x] 5.6 Verify: `build:full` clean; 10 legal pages show logo bar + branded footer (EN + ES, desktop + mobile); homepage footer diff shows only the removed credit line; top-bar anchor scroll works from legal pages (`data-astro-reload` fallback if needed); banned-string scan still clean
