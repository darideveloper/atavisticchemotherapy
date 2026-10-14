## 1. Responsive header — structure

- [x] 1.1 In `src/components/organisms/SiteHeader.astro`, allow the wordmark to shrink: change the brand `a` from `shrink-0` to `min-w-0` and the wordmark `span` from `text-base` to `truncate text-sm sm:text-base` so the bar can never be widened by its title
- [x] 1.2 Reduce the inner wrapper vertical padding to `py-2.5 sm:py-3` (keeping `px-4 sm:px-6 lg:px-8`) so the sticky bar is compact on mobile
- [x] 1.3 Remove `flex-wrap` from the nav and give it the responsive dropdown treatment: base `absolute inset-x-0 top-full hidden flex-col gap-y-1 border-b border-rose-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur`, and `sm:static sm:flex sm:flex-row sm:items-center sm:justify-end sm:gap-x-5 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`
- [x] 1.4 Add `id="nav-toggle"` (`type="checkbox"`, `class="sr-only pointer-events-none"`, `aria-label="Abrir o cerrar el menú"`) plus the two `sm:hidden` labels `☰` (`.nav-open`) and `✕` (`.nav-close`, `hidden` by default) bound via `for`, and add the `nav-panel` class to the nav

## 2. Responsive header — menu behaviour

- [x] 2.1 Add the scoped `<style>` block: inside `@media (width < 40rem)`, `#nav-toggle:checked ~ .nav-panel { display: flex }`, `~ .nav-open { display: none }`, `~ .nav-close { display: flex }` — id specificity keeps this independent of Tailwind v4 variant ordering
- [x] 2.2 Add the `:focus-visible` outline (`2px solid #c24694`, `offset 2px`) on both labels so the visually hidden checkbox keeps a keyboard affordance
- [x] 2.3 Add the single delegated `document` `click` listener that unchecks `#nav-toggle` when the click target is inside `.nav-panel a`, so the menu closes after a link is chosen and survives `ClientRouter` swaps without re-init

## 3. Archive cards — full-visible images

- [x] 3.1 Add `items-start` to the archive grid in `src/pages/index.astro` so each column keeps its own height
- [x] 3.2 Change both archive `<Image>` elements (1984 clipping and 2011 cover) from `h-56 sm:h-72 w-full object-cover object-top cursor-zoom-in transition duration-500 group-hover:scale-105` to `block w-full h-auto cursor-zoom-in`
- [x] 3.3 Remove the now-unused `group` class from both media wrappers (it only existed to drive the removed hover zoom)
- [x] 3.4 Move the loupe chip from `bottom-2 right-2` to `top-2 right-2` on both cards so it is clear of the image's bottom content
- [x] 3.5 Record the chip move as a user-approved trade-off (the top-right corner may overlap the 1984 clipping's masthead/date zone); fallbacks if it proves distracting are reverting to `bottom-2` or removing the chip — neither affects image visibility

## 4. Archive cards — compact captions

- [x] 4.1 Update both `figcaption` bars to `px-1 py-1 sm:px-1.5 sm:py-2` (keeping `bg-[#4c1139] text-center flex-1 flex flex-col justify-center`)
- [x] 4.2 Update both year spans to `text-xs sm:text-base … tracking-[0.14em] sm:tracking-[0.2em]`
- [x] 4.3 Update both label spans to `text-[8px] sm:text-[10px] … tracking-normal sm:tracking-wider` so the longer label fits one line on a half-width mobile card

## 5. Comparison intro paragraph (mobile type)

- [x] 5.1 In `src/pages/index.astro`, change the `#comparacion` intro paragraph (`"Las dos son quimioterapias…"`) from `text-sm` to `text-xs sm:text-sm`, leaving the two comparison body paragraphs at `text-sm`
- [x] 5.2 Confirm the built paragraph renders `text-xs sm:text-sm` and that the sibling body paragraphs still carry `text-sm`

## 6. Verification

- [x] 6.1 Run `pnpm run build` (validators + `astro build`) and confirm all 7 pages build with no new warnings
- [x] 6.2 Confirm `dist/index.html` emits the `(width<40rem)` media query wrapping the `#nav-toggle:checked` rules and the `sm:` utilities at `(width>=40rem)`, so the mobile and desktop nav branches are mutually exclusive
- [x] 6.3 Confirm the built header carries the toggle markup (`#nav-toggle` input + the two labels) with astro scoping applied, and the nav no longer carries `flex-wrap`
- [x] 6.4 Confirm the built archive images carry `block w-full h-auto` with no `object-cover`/`object-top`/`h-56`/`sm:h-72`, and both `figcaption` bars carry the compact mobile classes
- [x] 6.5 Reviewed the header and archive block in a browser (playwright-cli, 360×800 and 1280×900 against the running dev server): mobile bar is a **single row (55px)**, the toggle reveals a panel **below the bar** with the 4 links stacked (toggle swaps `☰`→`✕`), the menu **closes on link tap** (`#nav-toggle.checked === false`, hash `#realidad`, page scrolled to 3597), desktop shows the **inline row nav with no toggle**, both archive images render at their **natural aspect with no crop** (prensa 0.746 rendered vs 0.746 natural; libro 0.666 vs 0.666), the `Libro · Atavistic Metamorphosis` label is **one line** at both widths, and the intro paragraph measured **12px/19.5px** on mobile and **14px/22.75px** on desktop — 0 console errors. Closes the *longer label fits one line on mobile* estimate
- [x] 6.6 Updated the stale `## Purpose` line in `openspec/specs/archive-cards/spec.md` during the archive-time spec sync — it now reads "full uncropped images, solid date bars whose captions sit beneath each image" instead of "equal-height captions"
