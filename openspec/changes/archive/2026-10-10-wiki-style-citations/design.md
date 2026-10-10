## Context

Citation numbers render as baseline `a.reference-note` in `src/pages/index.astro` (statistics accordion `details.acc.on-dark`, `#atavica` white sections). Current form is `[<a class="reference-note" href="#reference-N" aria-label="Referencia N" data-reference="...">N</a>]` — brackets are plain text outside the anchor, full-size, always underlined blue (`#1d4ed8` light / `#93c5fd` dark). Popup is a single `#ref-tooltip` portal (`position:fixed`, `min(24rem,72vw)`, `z-index:60`) fed by `data-reference` (~160-char `referencePreview()`); click opens `#referencias details` + smooth-scrolls to `li#reference-N`. Reference: `https://en.wikipedia.org/wiki/Cancer_in_adolescents_and_young_adults` — `sup.mw-ref > a > span.mw-reflink-text` with brackets inside, `~0.8em`, `#3366cc`, no underline until hover. Agreed decisions from explore: faithful `0.75em`, hover-only underline, `sup > a` with brackets inside, brand blues, no backlinks, keep tooltip, all spots.

## Goals / Non-Goals

**Goals:**
- Superscript Wikipedia-recognizable citations in brand colors.
- Whole `[N]` clickable with per-number `href`/`data-reference`/`aria-label` preserved.
- Zero behavior regression: tooltip, click-to-reference, keyboard, `Esc`/scroll dismiss.

**Non-Goals:**
- No backlink (`^` / Jump-up) links in `#referencias` list.
- No tooltip system replacement (keep `#ref-tooltip` portal as-is).
- No changes to `REFERENCES` full text, `referencePreview()` truncation, or reference list content.
- No touch-target enlargement beyond faithful size (explicitly accepted).

## Decisions

- **Markup: `sup.reference-note > a` with brackets inside.** `sup` carries the `reference-note` class (moved off the anchor); delegated JS selectors must be updated to resolve the inner `a` via `closest('sup.reference-note')` → `querySelector('a')` or `closest('.reference-note a, a.reference-note')` fallback. Brackets move from text nodes into the anchor text (`[10]`), making the full token one hit-target like Wikipedia. Alternative `a > sup` rejected: breaks Wikipedia fidelity and complicates the existing CSS/JS contract.
- **CSS: `sup.reference-note { font-size:.75em; vertical-align:super; line-height:0; }`, anchor inside inherits brand blue, `text-decoration:none` default → `underline` on `:hover`.** `line-height:0` prevents sup from expanding paragraph line-boxes (Wikipedia effect). Dark context `.acc.on-dark sup.reference-note a { color:#93c5fd }` preserved. `focus-visible` outline retained on the anchor. Alternative `0.8em + padding` rejected per explicit faithful-size decision.
- **JS: no logic change, selector hardening only.** `positionRefTip()`/`openReference()` keep reading `data-reference`/`hash` from the anchor; `mouseover`/`focusin`/`click` delegation must resolve `event.target.closest('.reference-note a, a.reference-note')` and then the inner `a`. Tooltip positioning math (center-above, 8px clamp, flip-below) unchanged — smaller sup rect still yields valid `getBoundingClientRect()`.
- **No `title` attribute, no commas.** Existing constraints carry over; groups stay space-separated `[5] [6] [7] [8]`.

## Risks / Trade-offs

- [Risk] `0.75em` sup is a ~12px tap target, below WCAG 2.5.8 minimum → Mitigation: explicitly accepted for fidelity; hover/focus/keyboard path remains; revisit with padding if complaints arise.
- [Risk] Removing default underline reduces affordance on dark plum card → Mitigation: light-blue `#93c5fd` + hover underline + existing `focus-visible` outline; verify contrast in review.
- [Risk] Moving brackets inside the anchor changes copy-paste and snapshot tests → Mitigation: update specs + any Playwright assertions expecting `]</a>` or outside-bracket text nodes.
- [Risk] `sup` with `line-height:0` can clip tooltip anchor rect on some fonts → Mitigation: `getBoundingClientRect()` on the inner `a` still returns layout box; visual QA at 360px + desktop.

## Migration Plan

- Single-file edit in `src/pages/index.astro` (anchors + CSS + selector hardening). No data migration. Rollback: revert that file + archived specs.
- Verify: `pnpm run dev` → hover/focus each `[N]`, `Esc` dismiss, click lands on correct `li#reference-N`, direct `#reference-N` URL opens details.

## Open Questions

- None — all five explore gaps resolved (size, underline, structure, backlinks, scope/tooltip).
