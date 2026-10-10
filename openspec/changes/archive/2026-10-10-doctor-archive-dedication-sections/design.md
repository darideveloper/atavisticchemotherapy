## Context

`src/pages/index.astro` renders the homepage as a flex column (`main.page-flow`) whose sections are positioned by inline `style="order:N"` attributes (orders 1–11; see the `collapsibles` style block). All imagery goes through the shared `Image` atom (`src/components/atoms/Image.astro`, `lightbox` prop → `data-lightbox`), opened fullscreen by the global `#lightbox` modal handler at the page bottom. The loaded fonts are Inter + Playfair Display (600). The palette's brand plum is `#4c1139` (deep) with `#641b4e`/`#9a3676` accents; the plum band gradient is `#742058 → #581642 → #460f33`.

Before this change, `SpecialistProfileSection` (`#doctor`, order 2) used `items-center` on its 12-column grid, the bio column ended with the universities `<ul>`, and the page bottom ran References (order 9) → footer (order 10).

## Goals / Non-Goals

**Goals:**
- Give the bio visual evidence (1984 press, 2011 book) that stays side-by-side on a 360px iPhone and enlarges via the existing lightbox.
- Keep the portrait visible while the long bio column scrolls on desktop, without affecting mobile.
- Add an elegiac dedication section at the page bottom with zero new dependencies.
- End the page with References directly above the footer.

**Non-Goals:**
- No new lightbox/modal code; no new fonts, routes, or components.
- No re-cropping of the parents photo (blue frame and baked-in caption kept as supplied).
- No changes to the universities list rules, statistics accordion, or any other section.

## Decisions

- **Reuse the `Image` atom with `lightbox` for all three new images** over hand-rolled `<img>` tags. Rationale: free AVIF/WebP responsive output, consistent `cursor-zoom-in` affordance, and the global modal handler picks up `data-lightbox` with no JS. Alternative (plain `<img>`) rejected: loses optimization and enlarge behavior the client explicitly requested.
- **Archive cards: `grid-cols-2` fixed (never stacks) + `object-cover object-top` thumbs at `h-56 sm:h-72`.** Rationale: client requirement "side by side on the iPhone"; `object-top` keeps newspaper headline and book title visible in thumbs while the lightbox carries full reading. Alternative (stack on mobile) rejected per client; alternative (`object-contain`, unequal heights) rejected for ragged grid.
- **Equal-height date bars via `flex-1 flex flex-col justify-center` on `figcaption`.** Rationale: grid already stretches both `figure` boxes to the row height, but the auto-height plum bar left a white gap under the shorter caption; `flex-1` makes the bar itself absorb the space. This was chosen over shortening the book label (loses information) and over fixed `min-h` (fragile across breakpoints). Overlay-style bars (date on the image) were explored and rejected: they crop the newspaper caption and add contrast risk.
- **Portrait: `items-start` + `lg:sticky lg:top-24 self-start` on the photo column.** Rationale: top-alignment is required for sticky to make sense; `lg:` prefix confines stickiness to desktop where the bio column is long enough to scroll; `top-24` clears the sticky site header. Mobile stacking order is unchanged (photo first, text below).
- **Dedication as a standalone section (`#dedicatoria`) between References and footer in DOM, ordered 9/10/11**, over appending inside `#doctor`. Rationale: the elegy needs whitespace and full measure width (`max-w-3xl` centered); inside the bio column it would sit cramped beside archive cards. Order renumbering (dedication 9, references 10, footer 11) was required because CSS `order` accepts integers only — no fractional slot existed between 9 and 10.
- **Playfair Display (already loaded) for title/body/signature; plum `#4c1139` ornament.** Rationale: inscriptional tone with zero font cost; plum matches date bars and headings instead of introducing a new accent.

## Risks / Trade-offs

- [Risk] 48KB book-cover JPEG softens at fullscreen → Mitigation: accepted; swap in a higher-res scan later with no markup change. Newspaper PNG (5.7MB source) is high-res and reads well enlarged.
- [Risk] `object-cover` crops newspaper body text in thumbs → Mitigation: thumbs are evidence + invitation ("Toca cualquier imagen para ampliar" hint included); full reading happens in the lightbox.
- [Risk] Sticky portrait could overlap following sections if the column is shorter than the viewport → Mitigation: `self-start` + `top-24`; the bio column (bio + universities + archive cards) is far taller than the photo, so stickiness releases naturally at the grid end.
- [Risk] Baked-in caption pixels in the parents photo duplicate any HTML caption → Mitigation: no separate HTML caption rendered; alt text carries the identification for screen readers.
- [Risk] Order-attribute renumbering must stay consistent if sections are added later → Mitigation: documented in tasks; inline styles remain the single source of flow order.
