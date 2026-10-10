## Context

All edits are in `src/pages/index.astro` (Astro + Tailwind). Current state before this change: universities `<li>` used `grid grid-cols-[0.875rem_minmax(0,1fr)_auto]` with right-aligned `<strong class="pl-2 text-right">`; grano-de-sal `<h3>` lacked terminal punctuation; statistics `<h2>` lived inside the expandable `.acc-body` (invisible when collapsed); realidad intro `<p>` used `text-left`. The collapsible styles live in `<style data-purpose="collapsibles">` where `details.acc > summary` is `display:flex`. No new dependencies or routes.

## Goals / Non-Goals

**Goals:**
- Inline universities items as natural text flow with bold location adjacent to name.
- Correct university order (Connecticut before Rochester).
- Fix heading punctuation.
- Surface the statistics heading in the collapsed summary without changing its type scale.
- Justify the realidad intro paragraph.
- Point the primary WhatsApp contact at the direct US number link.

**Non-Goals:**
- No new components, sections, or styling system changes.
- No i18n, SEO, or reference-link changes.
- No `variants/final.html` updates (static snapshot, not source of truth).

## Decisions

- **Plain `<li>` over grid/flex:** The 3-column grid forced a right-column location that wrapped poorly on narrow screens and read as a table. Inline flow (`◆ Name, **Location**`) is the shortest diff, inherits `ul.space-y-3` spacing, and wraps naturally. Alternative (flex justify-between) rejected — it reintroduces alignment fragility for zero benefit.
- **Order swap in markup, not CSS `order`:** Content order is semantic here; editing the two `<li>` lines directly keeps DOM = visual = screen-reader order. CSS reorder rejected (splits visual from accessible order).
- **Heading inside `<summary>`:** Wrapping summary content as `<span class="flex-1 space-y-2"><span class="block">teaser</span><h2 …>…</h2></span>` stacks both lines vertically inside the existing flex summary, so the `+`/`–` marker (`summary::after`) still sits at the row end. Keeps `text-2xl sm:text-3xl` classes untouched. Alternative (duplicate heading) rejected — duplicate h2 harms outline; alternative (move outside `<details>`) rejected — it would detach the heading from the expandable it titles.
- **`text-justify` utility over inline style:** Tailwind already provides it; one-class swap `text-left` → `text-justify` on the realidad intro `<p>`.
- **Direct `wa.me` number over username handle:** `https://wa.me/FrankArguello7777` is not a valid WhatsApp deep link (wa.me requires digits); replace with `https://wa.me/13013059591` labeled `+1 (301) 305-9591` in `contact.whatsapp.username`, reusing the existing `phone` value. Markup in `index.astro:517` stays untouched since it reads label/url from config.

## Risks / Trade-offs

- [h2 inside summary outline] → Mitigation: single h2, moved not copied; heading order in section stays logical (h2 title before body paragraphs).
- [Summary flex row with taller stacked content] → Mitigation: inner `space-y-2` block keeps `::after` marker vertically centered via existing `align-items:center`; verified no overflow at mobile width.
- [Justified text rivers on narrow screens] → Mitigation: paragraph is `max-w-4xl` with relaxed leading; accepted as requested style.
