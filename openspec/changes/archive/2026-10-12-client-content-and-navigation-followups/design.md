# Design

## Context

The landing page is a static Astro document with client-facing Spanish copy in `src/pages/index.astro`. It already has a reference preview system, a shared contact modal, and flex ordering for the page sections. The design must preserve the existing plum visual language and avoid moving clinical copy into a new content layer for this narrowly scoped follow-up.

## Goals / Non-Goals

**Goals:**

- Make the supplied copy and paragraph alignment match the client's annotated layouts.
- Keep headings and citations semantically distinct from body paragraphs.
- Make the moved treatment warning visible, readable, and linked to references 5–8.
- Keep the contact entry point visually consistent while replacing its dropdown behavior with a section link.

**Non-Goals:**

- Redesigning the landing page, changing section titles, or rewriting clinical claims.
- Changing the form submission API, contact fields, or reference data.
- Introducing a new component or dependency for a single static content block.

## Decisions

### Keep the copy in the current Astro page

The approved wording remains in the existing page so reviewers can compare the rendered copy with the client annotations. Semantic `p`, `h2`, `h3`, `blockquote`, `footer`, `aside`, and `figcaption` elements express the requested hierarchy.

### Use explicit paragraph alignment

Paragraphs inside containers that center headings receive `text-left` explicitly. Headings retain their existing centered treatment where requested. Quotation text and attribution keep their own alignment rules and are not treated as body paragraphs.

### Render the moved warning as a static callout

The warning uses a bordered, light-gray `aside` at the end of the atavistic chemotherapy content. Each reference remains a `sup.reference-note` link using the existing `referencePreview` helper and `reference-N` targets.

### Navigate from the modal with an explicit scroll handler

The form link keeps the established accordion visual language and `+` symbol through `.acc-link`, but is an anchor rather than a `details` element. Its click handler closes the modal without restoring focus to the previous opener, updates the URL hash, and calls `scrollIntoView` on the visible section heading. This avoids incorrect native fragment positioning caused by the page's flex `order` rules.

## Risks / Trade-offs

- Long clinical paragraphs can increase section height; retaining the existing text scale and spacing keeps the change predictable.
- A scripted scroll is needed because native fragment navigation does not account for the page's reordered flex sections reliably; the handler must continue to guard against a missing target.
- The static warning is repeated nowhere in the modal after the move, preventing duplicate patient guidance.

## Migration Plan

1. Apply the copy, alignment, caption, price, and reference markup changes.
2. Move the warning and add the section CTA.
3. Replace the modal dropdown with the styled section link and verify scroll behavior at mobile and desktop widths.
4. Run import, formatting, and OpenSpec validation; review the final diff as content and interaction changes.
