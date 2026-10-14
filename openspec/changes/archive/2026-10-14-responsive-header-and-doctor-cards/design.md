## Context

Two responsive defects surfaced in the same review session, plus one follow-up mobile type tweak:

1. **Header**: `src/components/organisms/SiteHeader.astro` rendered the `SITE_TITLE` wordmark as `shrink-0` (`~238px` at 16px uppercase) beside a `flex-wrap` nav of 4 links (`~279px` at 14px with `gap-x-5`). A ~360px viewport has ~343px of content box, so the bar could not fit one row and wrapped onto a second row, making the sticky bar taller than the single row it was designed for and covering page content. Shrinking type alone does not fix it: at `text-xs` the title and nav still exceed the ~343px content box.
2. **Archive cards**: the two cards in the doctor bio forced `h-56 sm:h-72 w-full object-cover object-top`, which cropped both portrait sources and left the `figcaption` reading as if it overlapped the image bottom. The caption type (`text-sm`/`text-[9px]` with `tracking-[0.2em]`/`tracking-wider`) was sized for a full-width card, not a half-width mobile one, so the book label wrapped to two lines.
3. **Comparison intro**: the `#comparacion` intro paragraph ran at `text-sm` (14px) on mobile — the same size as the section body — making the short bridging sentence compete with the two body paragraphs on a narrow screen.

Constraints: the site is a Spanish-only, static Astro build with Tailwind v4 (`@tailwindcss/vite`), a `ClientRouter` (view transitions), and a preference for no new dependencies. The header is shared by all 7 pages through `Layout.astro`, and `openspec/specs/archive-cards` already governed the card behaviour.

## Goals / Non-Goals

**Goals:**

- One-row mobile header that never wraps or overflows, with the 4 links reachable on a phone.
- Archive images fully visible at their natural aspect, with the caption reliably below the image.
- Captions that stay tidy on a half-width mobile card without changing the desktop look.
- Compact mobile type on the comparison intro paragraph, leaving the desktop size and the sibling body paragraphs unchanged.
- No new dependency, and the menu still works with JavaScript disabled.

**Non-Goals:**

- Changing the desktop header layout, nav links, message keys, or adding a CTA/language switcher.
- Replacing or re-encoding the archive image files.
- Making the two cards bottom-align again (explicitly dropped).
- Resizing any comparison-section paragraph other than the intro line (the two body paragraphs keep `text-sm`).
- Extending the toggle to other components or building a generic nav component.

## Decisions

### 1. CSS-only disclosure menu (checkbox + labels) over a JS button

Below `sm` the nav is hidden behind an `<input id="nav-toggle" type="checkbox" class="sr-only pointer-events-none">` and two labels (`☰` / `✕`, both `sm:hidden`) whose `for` points at it. Scoped CSS opens the panel on `:checked`.

- *Why*: it works with JS disabled, needs no state, and avoids a hydration/`ClientRouter` re-init path. The `Layout.astro` `no-js`/`js` pattern shows the project already cares about degraded-no-JS behaviour.
- *Alternatives considered*: a `<button aria-expanded>` + script (better SR semantics, but needs re-binding on every view-transition and fails closed without JS); a native `<details>`/`<summary>` (least markup, but styling the summary and keeping `aria-*` correct is awkward); a horizontal-scroll nav (guarantees one row but hides the 4th link and is a poor nav pattern).
- *Accepted cost*: assistive tech announces a checkbox rather than a disclosure button. Mitigated by keeping the input focusable and drawing a `:focus-visible` outline on the visible label.

### 2. Breakpoint at `sm` (40rem), and remove `flex-wrap`

`sm` is used because the title + nav pair needs ~533px, which fits inside the ~592px content box at 640px. `flex-wrap` is removed so the nav can never grow the bar; on mobile it is simply `hidden` until checked.

### 3. Explicit scoped CSS with id specificity, not Tailwind `peer-checked:`

The open/close rules live in the component's `<style>` block:

```css
@media (width < 40rem) {
  #nav-toggle:checked ~ .nav-panel { display: flex; }
  #nav-toggle:checked ~ .nav-open  { display: none; }
  #nav-toggle:checked ~ .nav-close { display: flex; }
}
```

- *Why*: `#nav-toggle:checked ~ .nav-panel` has higher specificity than the `hidden` utility, so the outcome does not depend on Tailwind v4's variant sort order (a `peer-checked:flex` vs `sm:hidden` collision is order-sensitive). It is also trivially auditable in the built CSS.
- *Alternative considered*: `peer-checked:*` utilities — shorter, but mixes breakpoint and state variants whose cascade order is not obvious and can regress on a Tailwind upgrade.

### 4. Close-on-tap via one delegated `click` listener

```js
document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element) || !event.target.closest('.nav-panel a')) return
  const toggle = document.getElementById('nav-toggle')
  if (toggle instanceof HTMLInputElement) toggle.checked = false
})
```

- *Why*: without it, tapping an anchor leaves the menu open (same-document fragment navigation does not reload). A single listener on `document` is registered once and survives `ClientRouter` swaps, so no `astro:page-load` re-init is required.

### 5. Full-visible images with `items-start`, dropping equal-height captions

Images become `block w-full h-auto` (no `object-cover`, no `object-top`, no hover `scale-105` which would reintroduce a crop). The grid gains `items-start`.

- *Why*: the requirement is that every image is fully visible; any fixed height or `object-fit` contradicts that. `items-start` lets each card end at its own content height.
- *Alternatives considered*: `object-contain` inside a fixed box (letterboxes the portrait clipping, adds bars); `items-stretch` + `figcaption mt-auto` to keep bottom alignment (re-inserts an empty gap under the shorter image, which the change is specifically moving away from).
- *Trade-off*: the two cards no longer share a bottom edge. Accepted, and the previous `flex-1`/`justify-center` are retained only to pad each bar within its own card.

### 6. Loupe chip moved to `top-2`

The `⤢` chip was at `bottom-2 right-2`, over the image's lower content (whatever occupies the clipping's footer area). Moving it to `top-2 right-2` keeps it off that bottom content — an accepted trade-off, since on the 1984 clipping the top-right corner holds the masthead/date zone, so the chip may now sit over that instead (see risks).

### 7. Compact mobile caption sizing, desktop untouched

Mobile-first values with `sm:` overrides: bar `px-1 py-1 sm:px-1.5 sm:py-2`; year `text-xs tracking-[0.14em] sm:text-base sm:tracking-[0.2em]`; label `text-[8px] tracking-normal sm:text-[10px] sm:tracking-wider`.

- *Why*: at `text-[9px]` + `tracking-wider`, `Libro · Atavistic Metamorphosis` (~29 chars) needs ~165px but the half-width card offers ~144px, so it wrapped to two lines. Dropping mobile tracking and the label size should bring it to one line (~133px, not yet measured in a browser — see risks); the year step-down keeps the bar from dominating the card.

### 8. Comparison intro paragraph drops one type step on mobile

The `#comparacion` intro paragraph goes from `mt-2 text-center text-sm leading-relaxed` to `mt-2 text-center text-xs sm:text-sm leading-relaxed` — a single class swap on that one line.

- *Why*: it is a short bridging sentence under the `#comparacion` H2; at 14px it competes with the section body on a narrow screen. Dropping to `text-xs` (12px) on mobile tightens it without touching the two body paragraphs or the desktop rendering. `leading-relaxed` keeps overriding the line-height at both steps (12px → 19.5px, 14px → 22.75px), because it follows `text-xs`/`text-sm` in the class list.
- *Alternatives considered*: shrinking the whole comparison block (would shrink the body copy too, which was not asked for); shortening the copy (a content change, not a type one).
- *Scope*: exactly one paragraph. The other two `text-sm` paragraphs in the same section (`index.astro:398`, `:402`) are deliberately untouched.

## Risks / Trade-offs

- **[Checkbox toggle is announced as a checkbox, not a disclosure button]** → Keep the input focusable and style `:focus-visible` on the label; scope is one nav, and a JS button can replace it later without touching the spec's user-visible behaviour.
- **[Menu does not close after a tap when JavaScript is disabled]** → Accepted: with JS disabled the menu closes by toggling the control again; opening and link navigation are unaffected. The `legal-chrome` spec qualifies that behaviour as JS-dependent.
- **[Cards no longer bottom-align; shorter image leaves the row visually uneven]** → Accepted by design (Decision 5); both images are fully visible, which is the stated goal.
- **[Loupe chip at `top-2` may cover the clipping's top-right content]** → Accepted trade-off (Decision 6, user-approved): the chip no longer covers the image's bottom content but may sit over the 1984 clipping's masthead/date zone. If this proves distracting, reverting to `bottom-2` or removing the chip are the two fallbacks; neither changes the image-visibility requirement.
- **[Label-fit claim is computed, not measured]** → The "longer label fits one line on mobile" scenario is estimated (~133px vs ~144px available) and is pending the browser pass in `tasks.md` 5.5; treat it as unverified until that task runs.
- **[`truncate` could clip a long wordmark on the narrowest screens]** → The full wordmark stays in the DOM as the link's accessible name; only the visual overflow is ellipsised, and a one-row bar is preferred over a wrapped sticky header.
- **[`@media (width < 40rem)` range syntax]** → Supported by current browsers and handled by the Tailwind/Lightning CSS pipeline; the built CSS was inspected to confirm the media query wraps the checked rules and that `sm:` utilities emit at `(width >= 40rem)`.
- **[Mobile nav links are ~20px tall tap targets]** → Cosmetic; an optional `py-2` on the panel links would enlarge them, deliberately left out to keep the change minimal.

## Migration Plan

No data or routing migration. The change is markup + scoped CSS in two files and takes effect on the next build for all pages.

- Deploy: `pnpm run build` (runs `validate-imports` + `astro build`).
- Rollback: revert `SiteHeader.astro` and the archive-card block of `index.astro`; no other file depends on the new classes.
- Verification: inspect `dist/index.html` for the `(width<40rem)` media query wrapping the checked rules, the `sm:` utilities emitting at `(width>=40rem)`, the toggle markup, and the archive image classes; review the header and archive block at mobile and desktop widths.

## Open Questions

- Should the mobile panel links get `py-2` for a larger tap target? Currently out of scope to keep the diff minimal.
- Should the stale `El Norte · UANL` label text in the `archive-cards` spec be corrected to the rendered `El Norte · Monterrey, NL`? Left as-is here to keep this change focused on sizing and layout.
