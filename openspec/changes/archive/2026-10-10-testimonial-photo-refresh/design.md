## Context

The testimonials carousel (`TestimonialSlider.tsx` + `src/data/testimonials.ts`, shipped in `2026-10-04-patient-testimonials-carousel`) painted 2-up photo cells by position: 1st cell `bg-rose-50`, 2nd cell `bg-black`. That rule only looked right while the sole 2-image card (Antonio) happened to keep the dark scan second. New supplied photos force an Antonio reorder (scan first) and split Lourdes into two photos, which would put a dark scan on rose and a portrait on black. The doctor card separately still cropped the old PNG with fixed heights. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**

- Frame backgrounds driven by image content (dark scans black, photos white), immune to entry ordering.
- Supplied WebP assets adopted with zero pipeline changes; Lourdes split reuses the existing 2-up path.
- Doctor portrait uncropped at natural aspect with a readable always-visible overlay.

**Non-Goals:**

- No slider behavior changes (autoplay, breakpoints, contacts, loop).
- No lightbox for testimonial photos (explicitly excluded by the carousel proposal).
- No fix for the dev-only Swiper 504/hydration flakiness — environment issue, out of scope.

## Decisions

- **Explicit `dark` flag on the image entry over position or heuristics.** Alternatives: keep index-based rule (breaks on any reorder — the exact bug at hand); infer from filename/`alt` text (fragile, language-coupled). A boolean travels with the asset through the existing `testimonials.ts → index.astro → TestimonialSlider` mapping, defaults to light when omitted, and costs one type field.
- **Keep supplied WebP files as-is.** Astro re-encodes every local import into AVIF/WebP srcsets via `slideSet()` regardless of input format, so converting back to PNG would only add weight (~1.9 MB → ~0.2 MB kept).
- **One shared `IMAGE_SLOTS.testimonial` for all photos.** The 285 px Lourdes-2017 source gets widths clamped by Astro (emitted `w=285`, verified in build output) instead of a per-image slot — preserves the widths↔sizes invariant from `specs/images`.
- **Doctor card `h-auto` + `widths [512, 960]`.** Container is `max-w-lg` (512 px); the two widths cover 1x/retina without overserving. Overlay gradient deepened (`from-slate-900/90 via-slate-900/50`, extended with `pt-16`) and `lg:hidden` dropped per request.

## Risks / Trade-offs

- [Risk] 285 px Lourdes-2017 photo softens when CSS-upscaled on wide screens → Mitigation: accepted; it is the supplied asset, and the card slot is ≤384 px wide.
- [Risk] Future entries omit `dark` on a dark scan → Mitigation: omission defaults to white (photo assumption); flaggable in review by the black-scan visual convention.
- [Risk] Alt year-labels drifting from image badges (as Anna's 2025-vs-2026 did) → Mitigation: corrected in this change; noted as a review checklist item in `tasks.md`.

## Migration Plan

None — static asset swap plus import retargets, deployed with the normal `astro build`. Rollback is `git revert`. Superseded PNGs are deleted in the same change to prevent stale references.
