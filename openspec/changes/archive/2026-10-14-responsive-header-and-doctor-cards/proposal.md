## Why

On phones the shared header had no room: the `SITE_TITLE` wordmark was `shrink-0` (~238px at 16px uppercase) and the 4-link nav was allowed to `flex-wrap` (~279px), so on a ~360px viewport the bar could not hold all four links on one line and wrapped onto a second row, making the sticky bar taller than the single row it was designed for and pushing page content down. In the doctor bio, the two archive cards forced a fixed `h-56 sm:h-72` media box with `object-cover object-top`, cropping the 1984 newspaper and 2011 book cover, and the caption bar sat flush against the cropped edge so it read as overlapping the image; the caption type was also too large for a half-width mobile card. This change captures the responsive header and the full-visible archive-card treatment as one reviewed unit so the spec and the markup agree again.

## What Changes

- **Responsive header (`SiteHeader.astro`)**: below the `sm` breakpoint the 4 nav links collapse into a disclosure menu (a visually hidden checkbox plus `☰` / `✕` labels) laid out as a full-width dropdown under the bar; from `sm` up the inline nav is unchanged. `flex-wrap` is removed from the nav (the cause of the multi-row header). The wordmark may shrink and truncate (`min-w-0` + `truncate`) instead of forcing overflow, and its mobile size drops to `text-sm`.
- **Open/close without a dependency**: the menu state is driven by scoped CSS (`@media (width < 40rem)` + `#nav-toggle:checked ~ …`), so it still works with JavaScript disabled. A single delegated `click` listener closes the menu after a link is tapped and survives `ClientRouter` view transitions (this close-on-tap step is JavaScript-only — the open/close itself is not); a `:focus-visible` outline keeps the keyboard affordance the visually hidden input would otherwise lose.
- **Archive images render full and uncropped (`index.astro`)**: the two archive images switch from `h-56 sm:h-72 w-full object-cover object-top … group-hover:scale-105` to `block w-full h-auto` — natural aspect ratio, full container width, no crop — and the grid gains `items-start` so each column keeps its own height. The loupe chip moves from `bottom-2` to `top-2`; this trades the previous overlap of the image's bottom content for an accepted overlap of the top-right corner (see the design risks).
- **Compact caption bars on mobile**: the two `figcaption` bars and their spans adopt mobile-first sizing — padding `px-1 py-1 sm:px-1.5 sm:py-2`, year `text-xs … tracking-[0.14em]` (desktop unchanged at `sm:text-base tracking-[0.2em]`), subtitle `text-[8px] … tracking-normal` (desktop unchanged at `sm:text-[10px] tracking-wider`). The reduced subtitle tracking is what lets `Libro · Atavistic Metamorphosis` fit one line instead of wrapping to two on a half-width card.
- **Equal-height captions superseded**: because cards now size to their own image, the two plum bars no longer bottom-align. Each caption sits directly beneath its own image; `flex-1` + `justify-center` are retained but only pad the bar against its own card.
- **Comparison intro drops a type step on mobile (`index.astro`)**: the `#comparacion` intro line — "Las dos son quimioterapias en que las dos se basan en el uso de químicos o fármacos como tratamiento fundamental." — changes from `text-sm` to `text-xs sm:text-sm`, so it renders at 12px on mobile and keeps its existing 14px from `sm` up. Only this paragraph changes; the two comparison body paragraphs keep `text-sm`.

Non-goals: no new nav links, message keys, or CTA; no language switcher; the desktop header layout, the lightbox, the `Image` atom, and the archive image *files* are untouched; the stale `El Norte · UANL` label text in the existing `archive-cards` spec is left as-is (only the sizing/equal-height behaviour is re-specified); no JavaScript framework or new dependency is added.

## Capabilities

### New Capabilities

None. Every change re-specifies behaviour of existing capabilities.

### Modified Capabilities

- `legal-chrome`: the shared sticky header requirement gains a responsive disclosure menu — below `sm` the 4 links live behind a toggle and open as a dropdown, above `sm` they stay inline, and the wordmark may truncate rather than force a wrapped bar.
- `archive-cards`: the fixed-height cropped media box is replaced by a full-visible natural-aspect image requirement; the "caption bars share equal height on mobile" requirement is superseded by captions that sit directly beneath their own image, and a new requirement fixes the compact mobile caption sizing.
- `homepage-content`: a new requirement fixes the `#comparacion` intro paragraph to a compact mobile type step (`text-xs sm:text-sm`) while its centering and the sibling body paragraphs are unchanged.

## Impact

- **Components**: `src/components/organisms/SiteHeader.astro` (logo sizing, new toggle + labels, nav dropdown classes, scoped menu CSS, close-on-tap script).
- **Pages**: `src/pages/index.astro` (archive grid `items-start`, both archive `<Image>` classes, loupe chip position, both caption bars + spans, `#comparacion` intro paragraph type).
- **Specs**: `openspec/specs/legal-chrome/spec.md`, `openspec/specs/archive-cards/spec.md`, `openspec/specs/homepage-content/spec.md` (via change deltas).
- **Downstream effects**: every page inherits the new header behaviour through `src/layouts/Layout.astro`; the archive cards keep the shared `Image` atom and `#lightbox`, so only their sizing classes change; the `#comparacion` intro is a single literal paragraph, so no i18n key or content file is affected. No build config, routing, i18n keys, assets, or legal content are affected.
- **Out of scope**: `dist/` build output; any other section's images, headings, or body paragraphs.
