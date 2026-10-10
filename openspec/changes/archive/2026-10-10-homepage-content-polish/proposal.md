## Why

The homepage (`src/pages/index.astro`) had small but visible content issues: a cramped 3-column grid for the universities list, a missing period in a card heading, a key statistics heading hidden until expand, and a left-aligned intro paragraph that reads better justified. Fixing them together improves readability and visual hierarchy in one pass.

## What Changes

- Universities list ("Formación y trayectoria"): remove 3-column grid (`grid grid-cols-[0.875rem_minmax(0,1fr)_auto]`), render each item as inline flow `◆ Name, **Location**` with location bold and adjacent (not stacked below, not right-column aligned).
- Universities order: move "Universidad de Connecticut, Connecticut, USA" before "Universidad de Rochester, New York, USA" (final order: Nuevo León, Connecticut, Rochester, NCI/NIH).
- Card heading: add missing `.` to "Las quimioterapias o inmunoterapias actuales no pueden curar un cáncer tan diminuto como un grano de sal".
- Statistics accordion: move `<h2>` "Las Estadísticas Mundiales Sobre el Cáncer No Pueden Mentir" out of the expanded `.acc-body` into the collapsed `<summary>`, stacked after the "Diariamente, más de 27,000…" teaser line; keep existing size classes.
- Intro paragraph ("Excluyendo algunas formas de leucemias…"): change `text-left` to `text-justify`.
- WhatsApp contact: replace `WhatsApp (@FrankArguello7777)` handle link (`https://wa.me/FrankArguello7777`) with direct link `https://wa.me/13013059591` labeled `+1 (301) 305-9591`, rendered as `WhatsApp (+1 (301) 305-9591)`.

## Capabilities

### New Capabilities

- `homepage-content`: content and presentation rules for the homepage universities list, statistics accordion heading placement, card heading punctuation, intro paragraph alignment, and WhatsApp contact link.

### Modified Capabilities

- None — no existing spec requirements change.

## Impact

- Affected code: `src/pages/index.astro` (lines ~255–326: universities `<ul>`, grano-de-sal `<h3>`, realidad intro `<p>`, statistics `<details>`) and `src/data/site-config.ts` (`contact.whatsapp.username` label + url).
- No API, dependency, routing, or i18n changes.
- Visual-only; no behavior change except accordion summary now shows two lines (teaser + h2) when collapsed.
