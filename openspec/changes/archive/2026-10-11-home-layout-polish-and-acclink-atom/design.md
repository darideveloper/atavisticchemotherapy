## Context

The landing page keeps its accordion-style links (`.acc-link`) inline in `src/pages/index.astro`. That class is a single-use `<a>` in the contact modal, but the doctor profile section now needs the same visual treatment for an external profile link. Keeping the style inline would either duplicate the CSS or force a page-scoped class to be reused from a component it does not own. This change extracts the style into an atom and applies the pending alignment/width/copy polish in the same pass.

Constraints: this is a static Astro site under `pnpm build`; components follow the existing `src/components/atoms` convention (see `Image.astro`, which declares `Props` and owns its markup); no new runtime dependency.

## Goals / Non-Goals

**Goals:**

- One reusable atom that reproduces the `acc-link` appearance and supports internal, in-page, and external targets.
- External links open safely (`target="_blank"` + `rel="noopener noreferrer"`).
- Eliminate the duplicated/inline `acc-link` CSS from the landing page.
- Apply the requested alignment, width, capitalization, and label polish without changing unrelated sections.

**Non-Goals:**

- No new page, route, backend, or dependency.
- No restyling of the `details.acc` accordion itself (the `+`/`–` summary markers stay in `index.astro`).
- No shared design-token system; the atom keeps the current literal colors.

## Decisions

- **New atom `src/components/atoms/AccLink.astro`.** Rationale: matches the project's atoms convention and gives the style a single owner. Alternative considered: a global CSS class in `Layout.astro` — rejected because it spreads page styling into the layout.
- **Props: `href` (required), `target`, `rel`, `icon: '+' | 'external' | 'none'` (default `'+'`), `class`, plus rest-spread.** Rest-spread is required so callers can pass behavior hooks like `data-contact-section-link` (used by the modal's click delegation) onto the rendered anchor. Alternative: hard-code a `data-*` prop — rejected as less general.
- **Icon rendered as a real `<span aria-hidden="true">` instead of a `::after` pseudo-element.** Needed to switch the glyph (`+` vs `↗`) via a prop; the previous `content`-based approach could only vary by state.
- **Auto `rel`:** when `target="_blank"`, `rel` defaults to `noopener noreferrer` unless the caller overrides. Rationale: prevents incomplete external links by construction.
- **Scoped styles in the atom.** Astro scopes component CSS, so removing the page-level `.acc-link` rules is required (the migrated element no longer carries the page's scope id).

## Risks / Trade-offs

- [Migrated modal link loses styling if the page rules are not removed] → Astro component styles are scoped; the old `.acc-link` rules must be deleted in the same change so there is no dead/conflicting CSS.
- [`data-contact-section-link` not forwarded to the anchor] → Use rest-spread (`...rest`) on the `<a>`; verified in rendered HTML that the attribute appears on the anchor.
- [External link carries the modal navigation hook by mistake] → The external button must not pass `data-contact-section-link`; the delegation handler would `preventDefault` it.
- [Layout shift between open/closed accordion states] → Out of scope here; the pre-existing `details.acc` `::after` marker sizing is untouched.
- [Alignment tension with `client-content-and-navigation-followups`] → That active change's `homepage-content` delta requires body paragraphs to be explicitly left-aligned; this change justifies the Realidad intro and centers the comparison intro and dedication caption. The newer client instruction supersedes the left-alignment rule for these specific paragraphs, so this change wins if both are archived. Resolve at archive time by ordering the deltas so this change's alignment requirements apply last.

## Migration Plan

1. Add `AccLink.astro` with the extracted styles and icon logic.
2. Import it in `index.astro`, delete the inline `.acc-link` CSS, and migrate the contact-modal link (keeping `data-contact-section-link` and `class="sm:col-span-2"`).
3. Add the external Google Scholar button in the doctor profile section.
4. Verify with `pnpm build` and inspect rendered HTML for the anchor attributes; rollback is reverting the two files.

## Open Questions

- None blocking. The Google Scholar button label ("Ver perfil de publicaciones en Google Scholar") is a staff-supplied default and can be reworded by the client without affecting the component contract.
