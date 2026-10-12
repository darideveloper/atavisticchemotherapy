## Context

The testimonials carousel (`TestimonialSlider.tsx` + `src/data/testimonials.ts`) shipped with a two-path photo area: single-image cards rendered full-bleed (`h-56` grid, `object-fill`) while two-image cards (Lourdes split, Antonio scan+portrait from `2026-10-10-testimonial-photo-refresh`) rendered in a 2-up `object-contain` grid with the content-driven `dark` frame rule (`testimonial-frames` spec). The new supplier batch delivers one pre-composed photo per patient, so Lourdes and Antonio no longer need the 2-up path and no dark scans remain in the data. The old single-image rendering also cropped photos to a fixed `h-56` height with square corners that sat awkwardly inside the `rounded-2xl` card. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**

- Every testimonial card renders its single supplied photo at natural aspect, full card width, with rounded top corners matching the card.
- Data model reflects reality: exactly one image per entry, no `dark` flags while no scans are served.
- Dead 2-up/`dark` rendering path kept (not deleted) so a future multi-image entry still works.

**Non-Goals:**

- No slider behavior changes (autoplay, breakpoints 1/2/3-up, loop, contacts, lightbox).
- No pipeline changes (`IMAGE_SLOTS.testimonial` / `slideSet()` untouched; Astro still re-encodes to AVIF/WebP srcsets).
- No removal of the `dark` type field / passthrough plumbing (`TestimonialImage.dark`, `index.astro` default `false`) — retained for future multi-image entries.
- No alt-text rewrite beyond the Lourdes/Antonio collapse (existing single-image alts kept as supplied).

## Decisions

- **Natural aspect (`h-auto w-full object-cover`) over fixed-height crop.** Alternatives: keep `h-56 object-fill` (crops/distorts the new composites, the complaint that prompted the follow-up); per-image aspect slots (overkill — `object-cover` at full width handles varying ratios uniformly). Matches the doctor-portrait precedent (`w-full h-auto`) from the previous refresh.
- **`rounded-t-xl` on the image, not the container.** The card is `rounded-2xl overflow-hidden` with a `p-2` white mat, so the photo never touches the card edge; rounding the `<img>` itself (one step down at `xl` vs the card's `2xl`) nests the corners visually. Alternative of rounding the container would leave a square photo on a rounded mat.
- **`block` container for single vs `grid h-56` for multi, branched on `images.length`.** Keeps one component serving both shapes; the multi branch (with `dark` bg rule) is now dormant but costs nothing and avoids a second breaking change if a future entry ships two photos.
- **Collapse in data, not just CSS.** Hiding the second image via CSS would still download it; removing the entries from `testimonials.ts` drops the bytes and the 2-up layout in one move.
- **Keep supplied WebP files as-is.** The `slideSet()` pipeline re-encodes regardless of input, so no pre-conversion; total testimonial source weight falls ~1.1 MB → ~0.5 MB mostly via the two PNG deletions.

## Risks / Trade-offs

- [Risk] New composites vary in aspect ratio → card heights vary across slides → Mitigation: accepted; `SwiperSlide !h-auto` + `article h-full` already equalize per-view, and natural aspect avoids crop distortion.
- [Risk] `dark` plumbing (`type` field, `index.astro` passthrough, multi-branch `bg-black`) is now dead code → Mitigation: deliberately retained (documented non-goal); flagged as cleanup if no multi-image entry returns.
- [Risk] Alt texts for Lourdes/Antonio are now generic (`Fotografía de …`) vs the previous year/scan-specific labels → Mitigation: the composites themselves carry the labels/badges; generic alt avoids contradicting image content.

## Migration Plan

None — static asset swap plus import retargets and a single-component render-path tweak, deployed with the normal `astro build` (verified: 12 pages, 136 images). Rollback is `git revert`. Superseded files (including the stale `public/assets` composites) deleted in the same change to prevent stale references.
