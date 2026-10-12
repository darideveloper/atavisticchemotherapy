## 1. AccLink atom extraction

- [x] 1.1 Create `src/components/atoms/AccLink.astro` with `href` (required), `target`, `rel`, `icon` (`'+' | 'external' | 'none'`, default `'+'`), `class`, and rest-spread pass-through, rendering the icon as an `aria-hidden` element after the slot.
- [x] 1.2 Move the `acc-link` styling (border, radius, bold, brand color, flex row, hover, focus-visible, icon size) into the atom's scoped `<style>`; default `rel="noopener noreferrer"` when `target="_blank"`.
- [x] 1.3 Remove the inline `.acc-link` CSS rules from `src/pages/index.astro`.

## 2. Landing alignment, width, and copy polish

- [x] 2.1 Lowercase the first treatment name in the hero benefit bullet ("atavística").
- [x] 2.2 Center and justify the "La Realidad de la Oncología Actual" intro paragraph (`max-w-4xl mx-auto text-justify`).
- [x] 2.3 Set the statistics accordion card wrapper to `max-w-3xl mx-auto` and left-align its heading (`text-left`).
- [x] 2.4 Center the comparison intro paragraph ("Ambas son quimioterapias…").
- [x] 2.5 Widen the comparison header container to `max-w-5xl mx-auto`.
- [x] 2.6 Center the dedication caption "Celia Astorga de Arguello (1932-1982)".

## 3. Migrate modal link and add external profile button

- [x] 3.1 Replace the contact-modal section link with `<AccLink data-contact-section-link class="sm:col-span-2" href="#aviso-tratamiento-previo">` and its shortened label.
- [x] 3.2 Add the external Google Scholar `AccLink` (`target="_blank" icon="external"`) at the bottom of the doctor profile text column.

## 4. Verification

- [x] 4.1 Run `pnpm build` and confirm it completes without errors.
- [x] 4.2 Confirm rendered HTML: scholar anchor has `target="_blank"` + `rel="noopener noreferrer"`, modal link keeps `data-contact-section-link`, and no `.acc-link` rule remains in `index.astro`.
- [x] 4.3 Run `openspec validate home-layout-polish-and-acclink-atom` and resolve any schema issues.
