## Context

A single editing session on the main checkout refreshed owner-supplied media and adjusted three pieces of site copy/chrome. The work is already applied to the working tree and verified with `pnpm run build` (7 pages); this change captures it so the archived specs and the code agree.

Current state before this change:

- `#realidad` plum cards and the five testimonial cards carried superseded artwork.
- `public/og-image.jpg` was PNG bytes under a `.jpg` name at 1898×897, while `BaseSEO.astro` declares `image/jpeg`, 1200×630.
- `SiteHeader.astro` rendered a `/favicon.svg` mark plus the `SITE_TITLE` wordmark (`Atavistic Chemotherapy`).
- `ClinicalCaseExamples.astro` fitted images with `object-contain` inside a fixed `h-72` grid box.
- `legal-notice.es.md` listed the professional authorization as its own bullet.
- `.gitignore` had no rule for FUSE leftover files.

Constraints: static SSG (no backend), Spanish-only public site, images flow through the `Image.astro` atom / `IMAGE_SLOTS`, and `validate-i18n` must keep passing with no new message keys. Per `dev-portless`/`worktree-dev-workflow`, dev servers are started manually and are not autostarted by agents.

## Goals / Non-Goals

**Goals:**

- Make the shipped media match the owner's latest artwork, converted to the formats/extensions the code already declares.
- Give the brand exactly one source of truth for both the header wordmark and the SEO name, with casing as a presentation concern.
- Let clinical-case images display at their natural aspect with a top-rounded corner, matching the testimonial card treatment.
- Give the default og image a testable physical contract so it cannot silently drift from its meta tags again.
- Keep repo hygiene (FUSE leftovers) and legal-notice prose in line with how the page actually reads.

**Non-Goals:**

- Not renaming legal-entity strings: `BUSINESS_DATA.legalName` and the footer `© 2026 Atavistic Chemotherapy Clinical Trial™` line stay English identifiers.
- Not re-authoring any image content — every asset is owner-supplied; this change only stores, converts, and wires it.
- Not syncing `variants/assets/*` (static prototype copies of the two card graphics).
- Not touching routing, i18n keys, build config, or legal-page scope.

## Decisions

**1. Brand lives in one place; the header binds to it.**
`SITE_TITLE` (`src/consts.ts`) becomes the canonical `Quimioterapia Atavística` and `BUSINESS_DATA.name` mirrors it; `SiteHeader.astro` goes back to `{SITE_TITLE}` instead of the hardcoded literal introduced during the session, and `404.astro` binds both its card label and landmark `aria-label` to the same constant. *Alternatives:* keep the hardcoded string in the header (rejected — two brand sources drift, and the header would disagree with `og:title`/`og:site_name`); point the header at `BUSINESS_DATA.name` (rejected — `SITE_TITLE` is already the documented fallback the header and SEO share, per `site-config`).

**1a. The rename covers display surfaces, not legal identifiers.**
Applied: `SITE_TITLE`, `BUSINESS_DATA.name`, the homepage `schemaName` (so the JSON-LD entity `name` is Spanish, matching `og:site_name` and the title tagline), the 404 card label + landmark label, and the hero logo `alt`. Deliberately kept English: `BUSINESS_DATA.legalName` and the legal notices ("The Atavistic Chemotherapy Clinical Trial"), the footer `© 2026 …™` line, the bio caption "Director, Atavistic Chemotherapy Clinical Trial", and the bilingual homepage `<title>`/`og:title`. `extraJson.alternateName` flips to the English name so the structured data still surfaces both. *Verified in the build:* `og:site_name`, JSON-LD `name`, and the non-home tagline all read the Spanish brand; the only remaining English strings are the ones listed above.

**2. Casing is a CSS concern, not a source-value concern.**
The source values stay canonical Title Case (`Quimioterapia Atavística`) and the header applies a Tailwind `uppercase` class. *Why:* the same value drives `<title>`, `og:title` and `og:image:alt`, where all-caps reads as shouting, while the header must display uppercase per the owner's instruction. *Alternative:* store `QUIMIOTERAPIA ATAVÍSTICA` (rejected — forces all-caps into every SEO surface).

**3. Legal entity strings stay English.**
`name` (display brand) is separated from `legalName` (trial identifier). This is asserted in the `site-config` delta so a future verify does not "helpfully" unify them. *Trade-off:* the site mixes a Spanish display brand with an English legal name — intentional, because the copyright/legal lines identify the trial entity rather than the marketing brand.

**4. Rounding moves from the `figure` to the image.**
`rounded-t-xl` goes on the `<img>` (matching `TestimonialSlider.tsx`), and the `figure` loses `overflow-hidden rounded-lg`. *Why:* while the `figure` clipped, it forced *all four* corners onto the smaller `0.5rem` radius, so adding `rounded-t-xl` to the image alone had no effect. *Alternative:* put `rounded-t-xl` on the `figure` and keep it clipping (works, but splits the rounding logic between wrapper and image and diverges from the testimonial pattern).

**5. Natural aspect replaces the fixed media box.**
The `h-72 shrink-0` wrapper and `object-contain` are dropped for `w-full h-auto`, with `self-start` on each `figure` so multi-image cards keep independent heights. *Why:* the fixed box would clip anything taller than 264 px once `object-contain` was removed; `h-auto` only makes sense when the container can grow. *Trade-off:* image heights are no longer uniform across the three-column grid, so rows stretch to the tallest card. *Alternative:* keep a uniform look with `aspect-ratio` + `object-cover` (rejected for now — it reintroduces cropping, which is what the owner was moving away from).

**6. og image is re-rasterized to the declared contract, not the reverse.**
The 1920×1080 source is center-cropped to 1.91:1 and exported as a true 1200×630 JPEG (37 KB). *Why:* 1200×630 is the platform-standard card, and the meta tags already declare it; changing the tags to 16:9 would leave platforms cropping unpredictably. *Alternatives:* keep 16:9 and update `BaseSEO` width/height (rejected — more churn, less predictable rendering); ship PNG (rejected — heavier, contradicts `og:image:type`).

**7. Card graphics keep their `.jpg` filenames; bytes are re-encoded in place.**
The updated PNGs were converted to JPEG (q90/q88) at the existing paths, so `index.astro` imports did not change. Testimonial webp files were copied verbatim (already WebP, already smaller than their predecessors).

**8. The FUSE ignore pattern is non-anchored.**
`.fuse_hidden*` (rather than `/public/.fuse_hidden*`) sits under its own marked section comment. *Why:* FUSE can leave such a file anywhere the pattern has an open handle, and the existing `.*/` dotfolder rule only matches directories, not files.

**9. Legal-notice license sentence is merged as prose.**
No markup change: the authorization sentence, including the blue `<span>` around `1150234`, is appended to the training-history bullet. The `## Responsable` list drops from three items to two.

**10. The hero H1 gap is a margin, not a `<br>`.**
Both hero title spans are `block`, so they already stack; the `<br>` between them produced one *additional* empty line box of the H1's full line-height (measured 55px at the 48px desktop size), doubling the intended separation. It is replaced by `mt-[0.575em]` on the second span — exactly half the `1.15` line-height — which scales with the responsive `clamp()`/`sm:`/`lg:` font sizes. *Alternatives:* shrink the H1's `line-height` (rejected — it would compress the text lines themselves and risk glyph overlap, since a line box shorter than the glyphs is what causes collisions); reduce the second span's `font-size` (rejected — the empty line's height comes from the H1's line-height, not the span's, so this would not have changed the gap at all). Measured after the change: 28px desktop / 15px mobile, both `0.574em`, no overlap.

## Risks / Trade-offs

- [Risk] `Mastectomy.jpg` changed from landscape (1.45:1) to portrait (0.91:1), so the `#realidad` three-card row now stretches to a much taller middle card → Mitigation: accepted as the owner's artwork; verify visually on the built page, and revisit with `aspect-ratio`/`object-cover` only if the row reads badly.
- [Risk] Re-rasterizing 16:9 → 1.91:1 can clip edge content in the og image → Mitigation: the emblem and the `DR. FRANK ARGUELLO / CANCER CLINIC` block are centered; verified visually, with nothing meaningful in the 36 px trimmed from top and bottom.
- [Risk] The Spanish display brand now appears in `og:site_name`, JSON-LD `name` and the `"<title> | <brand>"` tagline, while legal strings stay English → Mitigation: intentional and asserted in the `site-config` delta; the English name is preserved as `extraJson.alternateName` and in `keywords`, and the remaining English strings are enumerated in decision 1a so they are not treated as regressions.
- [Risk] Correcting the hero logo `alt` couples the alt text to artwork that still reads "DR. FRANK ARGUELLO CANCER CLINIC" → Mitigation: the alt now mirrors the visible artwork; if the logo is ever redrawn in Spanish, the alt must move with it (no spec pins the artwork's wording).
- [Risk] Removing the header logo mark reduces instant brand recognition → Mitigation: the tab favicon is untouched (`Layout.astro` head), the wordmark is the accessible name, and the owner requested the removal.
- [Risk] Non-uniform clinical-case card heights leave ragged cards and `bg-rose-50` mat visible under shorter images → Mitigation: `figure` background already matches the section background (`#f8f5f8`) and the mat is rose; revisit with the `aspect-ratio` alternative if the owner prefers uniformity.
- [Risk] `.fuse_hidden*` is broad enough to ignore a legitimate file with that exact prefix → Mitigation: acceptable; FUSE owns that namespace, and `git check-ignore` confirms the match is the intended artifact.
- [Risk] `variants/assets/Eye-Enucleation.jpg` and `Mastectomy.jpg` stay stale, so the prototype disagrees with the site → Mitigation: explicitly out of scope; sync on request.

## Migration Plan

Static SSG with no runtime data — "migration" is a rebuild and redeploy, with no dual-run or schema step.

1. Assets and code changes land in one commit; `pnpm run build` must pass (validators + image transforms).
2. Verify `dist/og-image.jpg` is the new JPEG and that `dist/index.html` carries matching `og:image:*` tags.
3. Verify the header wordmark, the `#ejemplos` image classes, and the `aviso-legal` bullet count in `dist`.
4. Rollback: `git revert` the single commit — no state to unwind, and the previous og image/artwork is restored by the same commit.

## Open Questions

- Should `docs/astro-base-config.md` § `.gitignore` (the template that `foundation-config` compares against "verbatim") gain the FUSE rule, so the canonical block and the extras list stay consistent? *Resolved: no* — that section defines the fixed canonical block and states extras go below under a marker, which is where `.fuse_hidden*` sits.
- Does the owner want `variants/assets/*` resynced with the new card graphics?
- Should the hero logo artwork itself be redrawn in Spanish? The header now shows a Spanish wordmark while the logo image still reads "DR. FRANK ARGUELLO CANCER CLINIC", so the hero carries two brands in two languages.
- *Resolved by measurement (task 9.5):* the portrait `Mastectomy` card did **not** unbalance the `#realidad` row — all three cards render at 721px, and `#ejemplos` rows are even at 745/724px. No layout follow-up is needed unless the owner dislikes the uneven image heights inside `#ejemplos` (206–471px), in which case the `aspect-ratio` + `object-cover` alternative would return uniformity at the cost of cropping.
