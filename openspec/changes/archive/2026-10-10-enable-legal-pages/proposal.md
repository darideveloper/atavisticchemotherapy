## Why

Footer links to Privacy (`/privacy`, `/es/privacidad`) and Terms (`/terms`, `/es/terminos`) are dead — `src/pages/` has no route to render the `legal` collection, so both return 404. The four markdown files that do exist are explicit placeholders ("Replace with the real policy before launch"), the homepage promises a price of `XXXX`, and the trial status (NCT02366884) plus controller identity (empty email/address in `site-config.ts`) are unverified. For a clinical-trial site collecting health data across US + Mexico + EU/Spain, shipping placeholders and curative claims ("potencialmente curar") without disclaimers is a launch blocker.

## What Changes

- Add a catch-all legal route rendering `LegalPage` for every `legal` collection entry in both languages (EN unprefixed, ES `/es/*`), with legacy `/en/*` redirects already covered by `astro.config.mjs`. Bodies render from the Markdown files through the documented Variant F chain (`getCollection("legal")` → entry by `${pageKey}.${lang}`, throw on missing → `LegalPage` renders `entry.body` via `<Markdown>`).
- Add shared branded site chrome: new `SiteHeader` (sticky minimal bar — small logo + 4 root-relative home-section links, no lang switch, no CTA) and `SiteFooter` (current `MainFooter` markup moved verbatim minus the "Powered by" line, `lang` prop, 5 legal links via `getLocalizedPath()` with canonical labels). `Layout.astro` swaps its scaffold header/footer for these components (legal pages and 404 inherit branding); `index.astro` swaps its inline `MainFooter` for `<SiteFooter lang="es"/>` (single hunk, visually identical except the removed credit line).
- Replace placeholder copy with five risk-free legal pages in EN + ES (10 files): `privacy`, `terms`, `cookies`, `medical-disclaimer`, `legal-notice`. All content uses only confirmed facts (individual-doctor controller, inbox-only form handling, zero tracking, documented testimonial consent, price hidden as personalized quote).
- Remove or neutralize every risky/unclear statement: no `XXXX` price, no trial-status claims (plain identifier + ClinicalTrials.gov link, no status adjectives), no guaranteed outcomes, no new PII beyond already-consented testimonials, no license numbers, addresses, or entities beyond confirmed facts.
- Wire routes + translations + SEO (`routes.ts`, `messages/*.json`, `PageSEO` pageKeys, sitemap) and verify via existing validators (`validate-i18n`, `validate-imports`, `validate-markdown`) plus a manual `dist/` banned-string scan (missing language file fails the build, footer links resolve, no `XXXX`/placeholder strings remain).

## Capabilities

### New Capabilities
- `legal-routing`: catch-all legal route, localized path resolution, footer unification, legacy redirect coverage, 404-free guarantees for all footer links.
- `legal-content`: the five legal documents (privacy, terms, cookies, medical-disclaimer, legal-notice) in EN + ES with only verified facts; risk-free wording for health claims, pricing, trial status, and patient data.
- `legal-chrome`: shared branded header/footer (`SiteHeader`, `SiteFooter`), `Layout` chrome swap, homepage footer swap, and `LegalPage` branding (simple constrained title block, plum accent override) so legal pages match the site instead of rendering through the bare scaffold.

### Modified Capabilities
- `i18n`: extend `routes.ts` pageKeys with `cookies`, `medical-disclaimer`, `legal-notice` alongside existing `privacy`/`terms` (requirement change: footer must link 5 pages, both languages).
- `markdown-pipeline`: extend `legal` collection contract from 2 slugs to 5 slugs, both languages required, no silent fallback (requirement change: build fails on any missing `legal/*.{en,es}.md`).

## Impact

- Affected: `src/pages/[...path].astro` (new), `src/components/organisms/SiteHeader.astro` + `SiteFooter.astro` (new), `src/components/pages/legal/LegalPage.astro` (simple title block + container + accent override), `src/pages/index.astro` footer (single-hunk swap), `src/layouts/Layout.astro` chrome (header/footer swap, drop `LangBtns` import), `src/lib/i18n/routes.ts`, `src/messages/en.json`, `src/messages/es.json` (no new keys — header reuses `global.nav.*`, footer reuses `global.footer.*`), `src/content/legal/*` (10 files), `src/components/seo/PageSEO.astro` pageKeys, `scripts/validate-*.ts`, sitemap output (+10 URLs).
- No API or dependency changes; contact form (`src/lib/api/contact.ts`) untouched — privacy text describes its inbox-only behavior as-is.
- Non-goals: real price publication, trial-status verification with IRB, cookie banner (zero tracking confirmed — statement only), counsel review (flagged as follow-up, not part of this change).
- Residual risk owned elsewhere: homepage `XXXX` pricing and efficacy claims in `src/pages/index.astro` stay live until the active `homepage-content-polish` change addresses them; this change ensures legal pages never contradict the homepage (personalized quote, no outcome promises) but does not edit homepage copy.
