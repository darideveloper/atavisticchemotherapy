## Context

All items in this change are already implemented on `main` (commit `5d54697`, `pnpm build` green). The work spans one Astro page (`src/pages/index.astro`), one shared component (`SiteFooter.astro`), and three legal Markdown sources rendered through the `Markdown` atom (`marked`, raw HTML passes through — see `src/lib/markdown.ts`). Breakpoints `min-[900px]` / `lg` are the established responsive seams. This design records the technical choices behind the non-trivial items so future edits don't regress them.

## Goals / Non-Goals

**Goals:**
- Record why the mobile image reorder, scroll hardening, and footer-credit reversal were done the way they were.
- Keep desktop rendering pixel-identical for the logic-section reorder.

**Non-Goals:**
- No new components, routes, deps, or i18n keys (none were added).
- No visual redesign beyond the listed copy/density tweaks.

## Decisions

- **Logic-section mobile reorder via split + flex `order`, not duplication.** The text column was split into two blocks (H2 + intro + quote / remaining paragraphs) and the parent becomes `flex flex-col` below `900px` with `order-1/2/3` (text, images, text). Alternative — rendering the image grid twice with `hidden` toggles — was rejected: it doubles lightbox-bound DOM and image payload references. Desktop keeps the 12-col grid with explicit `col-start`/`row-start` placement (`images` spans rows 1–2, preserving `lg:sticky` travel room); `gap-x-12` preserved, `gap-y-4` (1rem) exactly replicates the old `space-y-4` seam, so desktop is visually unchanged.
- **Contact-link scroll hardened with double-`rAF`.** The modal close restores `body overflow`, which invalidates layout; a single `rAF` could compute `scrollIntoView` against the pre-restore layout. Double-`rAF` defers the smooth scroll past the reflow. Target changed from the mid-section `#aviso-tratamiento-previo` aside to the section top `#atavica-original`, which gained `scroll-mt-24` to clear the sticky header (same offset convention as the H2/aside).
- **Blue license number via inline style, not Tailwind class.** Legal bodies render through `set:html`, and classes inside `.md` sources are not guaranteed to be picked up by Tailwind's scanner; `<span style="color:#1d4ed8;font-weight:700">` renders deterministically.
- **`Rev.10/2026` as styled `<p>`, not Markdown.** Right-alignment + 12px needs raw HTML (`marked` passes it through; `validate-markdown` confirms no leftover markers).
- **Footer credit reinstated despite `legal-chrome` requiring its removal.** Owner's explicit request wins over the earlier spec; the contradiction is recorded as a MODIFIED requirement delta rather than silently drifted.
- **H1 as 2 single `<span>`s with `<br>`.** Dropping `whitespace-nowrap` lets each line wrap on narrow screens instead of overflowing; the `<br>` is belt-and-braces between two `block` spans per the owner's explicit ask.

## Risks / Trade-offs

- [Risk] Footer credit contradicts `legal-chrome` until the delta is archived → Mitigation: delta spec in this change makes the reversal explicit and reviewable.
- [Risk] Future editors re-merge the split text column, breaking mobile order → Mitigation: `specs/homepage-content` delta pins the order contract (`order-1/2/3` below 900px).
- [Risk] Cédula `1150234` is owner-supplied and unverified by us (prior spec deliberately omitted license numbers) → Mitigation: delta spec records provenance ("owner-supplied") so a future correction has a clear paper trail.
- [Risk] `min-[900px]` arbitrary breakpoint diverges from standard `lg` elsewhere → Mitigation: pre-existing convention in this section; left untouched deliberately.
