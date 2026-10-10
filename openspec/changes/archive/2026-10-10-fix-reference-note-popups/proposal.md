## Why

The citation numbers (`(9)`, `(10)`, `(5, 6, 7, 8)`) in the "Diariamente, más de 27,000…" / "Las Estadísticas Mundiales Sobre el Cáncer No Pueden Mentir" accordion and the `#atavica` section have four confirmed defects: the hover popup is clipped by the card's `overflow:hidden` near edges, numbers don't look like links, the native `title` tooltip overlaps the custom popup, and grouped citations share one popup instead of one per number.

## What Changes

- Replace the CSS-only `::after` tooltip (bound to `attr(data-reference)`) with a single body-portal tooltip positioned with `position:fixed`, viewport-clamped (8px margin), prefer-above with flip-below fallback.
- Remove all native `title` attributes from `.reference-note` anchors; tooltip content comes from `data-reference`, accessible names stay in `aria-label`.
- Restyle `.reference-note` as context-aware links: light blue + underline on dark plum backgrounds, standard blue + underline on white backgrounds, with distinct hover and `focus-visible` states.
- Split every grouped citation into individual links in `[N]` form (`[5] [6] [7] [8]`, `[11] [12]`, `[3] [4]`, `[1] [2]`), each with its own `href="#reference-N"`, `data-reference`, and `aria-label`. Brackets separated by single spaces are plain text outside the anchors (no commas). Singles `(9)`, `(10)`, `(13)`, `(14)`, `(15)` become `[9]`, `[10]`, `[13]`, `[14]`, `[15]`.
- Shorten popup text to a preview (word-boundary truncate to ~160 chars with `…`); keep full citations in the `#referencias` list. Keep popup width cap at `min(24rem, 72vw)`.
- Preserve click-to-reference navigation (open `#referencias` `<details>` + smooth scroll to `li#reference-N`); keyboard focus shows the popup, `Esc`/blur/scroll hides it; popup stays below contact modal and lightbox.

## Capabilities

### New Capabilities

- `reference-popups`: hover/focus citation popup behavior — portal positioning, viewport clamping + flip, shortened preview content, per-number popups, link styling, keyboard and touch behavior.

### Modified Capabilities

- `homepage-content`: statistics accordion and `#atavica` reference rendering changes (split `[N]` numbering, no `title`, link-styled numbers). Presentation requirements change, not just implementation.

## Impact

- `src/pages/index.astro`: collapsible styles, `referenceText` usage, all 9 `.reference-note` anchors, references `<ol>`, inline tooltip script.
- No new dependencies; no API changes; visual change limited to citation numbers and their popups.
