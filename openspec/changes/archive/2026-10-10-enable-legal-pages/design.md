## Context

The landing page (`src/pages/index.astro`, hardcoded ES copy) links to `/en/privacy` and `/en/terms`, which redirect to `/{privacy,terms}` but have no renderer — `src/pages/` contains only `index.astro`, `404.astro`, `robots.txt.ts`. The `legal` collection (`privacy`, `terms` × EN/ES) and `LegalPage` component exist but are orphaned. All four markdown files are placeholders. Business facts confirmed in explore: controller = individual doctor (Dr. Arguello); form = inbox-only via `contact.ts` external POST (env empty); tracking = zero; testimonial consent = documented; price = hidden (`XXXX` must go); trial NCT02366884 status/IRB = unclear. Jurisdictions US + Mexico + EU/Spain force GDPR + LFPDPPP + HIPAA-adjacent wording. `PRODUCT.md`/`DESIGN.md` are stale IVF-template leftovers — ignored; `content.md` + `index.astro` are the real source.

## Goals / Non-Goals

**Goals:**
- Every footer link resolves (EN + ES) with no 404, all five links shared through one `SiteFooter` via `getLocalizedPath()`.
- Five legal pages × 2 languages using only verified facts; zero placeholders, zero `XXXX`, zero "active trial" claims.
- Legal pages match site branding: shared sticky logo bar + homepage footer (no "Powered by" line anywhere) + simple constrained title block, instead of the bare scaffold shell.
- Health-claim risk neutralized: investigational language, no guaranteed outcomes, ClinicalTrials.gov verification link.
- Build-time guarantees: missing language file fails build; placeholder-string scan fails build.

**Non-Goals:**
- Publishing a real price, verifying trial/IRB status, or obtaining counsel review — flagged as follow-ups.
- Cookie banner or tracking infrastructure (confirmed zero tracking — statement page only).
- Changing contact-form behavior or storage (inbox-only described as-is).
- Redesigning footer visual style beyond link correctness + label consistency.

## Decisions

- **Catch-all `[...path].astro` over five static pages.** Rationale: `routes.ts` + `getPageKeyFromUrl()` + `LegalPage` pattern already assumed by docs and `markdown-pipeline` spec ("Legal pages in i18n route map"); one route serves current 2 + new 3 slugs without duplication. Alternative (individual `privacy.astro` files) rejected — diverges from i18n route-map contract and doubles locale handling.
- **Five pages: `privacy`, `terms`, `cookies`, `medical-disclaimer`, `legal-notice`.** Rationale: footer minimum for US+MX+EU is privacy + terms + cookies; oncology efficacy copy + "does not substitute medical advice" one-liner force a standalone `medical-disclaimer`; MX/ES imprint expectation forces `legal-notice` (responsible person, stated credentials, contact). Alternative (2 pages only) rejected — leaves ePrivacy, health-claim, and imprint gaps.
- **Risk-free wording by omission.** Rationale: the safe text states only what is confirmed (individual-doctor controller, inbox-only handling, zero tracking, documented testimonial consent, personalized-quote pricing, plain ClinicalTrials.gov reference). No `XXXX`, no status adjectives, no cure promises, no new PII, no commentary on what is or isn't included. Alternative (best-effort complete legalese) rejected — fabricating controller details or trial claims creates liability.
- **Footer unification on `getLocalizedPath()`.** Rationale: `Layout.astro` already does this correctly; `index.astro` MainFooter hardcodes `/en/*` on an ES page. Single shared link source fixes ES UX and label drift (`Términos de Uso` canonical). Alternative (keep two footers) rejected — they will drift again.
- **Shared chrome components over self-contained LegalPage styling (Option B).** Rationale: legal pages rendered through the bare scaffold look unbranded; extracting `SiteHeader`/`SiteFooter` organisms gives one source of chrome for legal pages, 404, and the homepage footer. Alternative (self-contained branded `LegalPage`, Option A) rejected by user decision — shared components prevent drift. Note: dropping the `LangBtns` import from `Layout` leaves that component unreferenced; it is kept in-tree (harmless, reusable), not deleted.
- **Minimal sticky bar, 4 reused nav links, no lang switch, no CTA.** Rationale: the homepage has no persistent nav and no `#contacto` element (CTAs open a homepage-only JS modal), so the bar links only to real section anchors as root-relative URLs that work from every page. Mapping (labels in page language, zero new message keys):

  | key | anchor | EN label | ES label |
  |---|---|---|---|
  | `home` | `/#top` | Home | Inicio |
  | `reality` | `/#realidad` | Reality | Realidad |
  | `treatment` | `/#atavica` | Treatment | Tratamiento |
  | `cases` | `/#testimonios` | Cases | Casos |

  Sticky (`sticky top-0`, white/blur) because legal pages are long texts and no homepage precedent exists. No lang switch and no CTA per explicit user decision; EN labels landing on Spanish homepage content accepted.
- **Simple LegalPage title block + Spanish footer + no "Powered by".** Rationale: plain constrained heading block (title/description/`updated`, `max-w-3xl`) keeps legal pages quiet instead of a heavy hero band; footer non-link text stays Spanish on all 10 pages (no new keys); the "Powered by Dari Developer" line is removed everywhere per explicit user request. Markdown teal heading-hover is overridden to plum scoped to legal articles only — the shared atom is untouched.
- **Content lives in `src/content/legal/{slug}.{en,es}.md`, rendered by existing `LegalPage` + `<Markdown>`.** Rationale: reuses `markdown-pipeline` Variant F contract, `PageSEO` pageKeys, sitemap inclusion. No new CMS or JSON-copy approach.

## Risks / Trade-offs

- [Risk] Trial reference without a status adjective may feel thin → Mitigation: plain identifier + direct ClinicalTrials.gov link with no adjectives; readers verify there.
- [Risk] `[...path].astro` catch-all collides with future marketing pages → Mitigation: route map is the single source (`getPageKeyFromUrl` returns null → 404); new pages must register a pageKey first (spec requirement).
- [Risk] `ClientRouter` (view transitions in `Layout`) may swallow cross-page `#anchor` scrolling, landing at homepage top instead of the section → Mitigation: click-verify every top-bar link from a legal page during implementation; fallback is `data-astro-reload` on header links.
- [Risk] Single-hunk touch on `index.astro` can conflict with the active `homepage-content-polish` change → Mitigation: merge that change first or resolve the one footer hunk manually; the swap is visually identical except the removed credit line (verified by diffing the footer region of `dist/index.html`).
- [Risk] Controller contact limited to confirmed phone + WhatsApp channels → Mitigation: privacy/legal-notice list exactly those channels, with no commentary on other channels; nothing is invented.
- [Risk] Testimonial PII stays published (consent documented but not verifiable in repo) → Mitigation: no new PII added; legal text notes "published with consent"; trade-off accepted per user confirmation.
- [Risk] Homepage keeps showing `XXXX` pricing and efficacy claims (`index.astro:390`) while legal pages say "personalized quote / no guaranteed outcome" → Mitigation: residual risk explicitly owned by the active `homepage-content-polish` change; this change only guarantees legal pages never contradict it and never repeat the `XXXX` figure.
- [Risk] Homepage is ES-hardcoded while EN is the default locale → Mitigation: out of scope for this change except footer links; noted so legal EN pages don't assume an EN homepage exists.

## Migration Plan

1. Land catch-all + 10 markdown files + routes/messages/SEO wiring behind normal build (`validate-i18n`, `validate-imports`, `validate-markdown`, `astro build`).
2. Verify: `/privacy`, `/terms`, `/cookies`, `/medical-disclaimer`, `/legal-notice`, `/es/privacidad`, `/es/terminos`, `/es/cookies`, `/es/aviso-medico`, `/es/aviso-legal` return 200; `/en/*` legacy redirects hold; sitemap lists all 10.
3. Land chrome: `SiteHeader` + `SiteFooter` components, `Layout` chrome swap, `index.astro` single-hunk footer swap, `LegalPage` title block + container + accent override.
4. Verify chrome: all 10 legal pages + 404 show logo bar + branded footer (EN + ES, desktop + mobile); homepage footer diff shows only the removed credit line; every top-bar link scrolls to its homepage section from a legal page (`data-astro-reload` fallback if `ClientRouter` drops fragments); banned-string scan still clean.
5. Rollback: revert single change (route + content + chrome are additive; footers restore by reverting hunks). No data migration.
4. Post-launch follow-ups (not in this change): supply controller email + address, professional license number, IRB/trial-status confirmation, counsel review.
