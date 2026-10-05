# Design: Patient Testimonials Carousel

## Context

The main page is a static Astro landing page. The customer provided three portrait profile compositions and separate contact information. The section must fit the existing plum and blush visual language while making multiple patient cards easy to scan.

## Goals / Non-Goals

**Goals:**

- Reuse the site's white rounded clinical-card treatment in a compact, three-column desktop carousel.
- Keep each profile's paired photos and all supplied text in a single card, with identical card heights.
- Keep full card content visible without nested scrolling; set enough shared card height for the longest profile.
- Show three cards on desktop, two on tablet, and one on mobile.
- Automatically cycle tablet and mobile cards infinitely without visible navigation buttons or a numerical indicator.
- Preserve the supplied profile text and contact destinations exactly, and retain a model that can accept up to five profiles.

**Non-Goals:**

- Opening profile photos in the existing lightbox.
- Rewriting medical statements, inventing additional patients, contacts, or claims.
- Adding a backend, content management system, or manual navigation controls.

## Decisions

### Store patient profiles as data

Keep names, image paths, alt text, diagnosis, supplied profile copy, treatment note, and contact destinations in structured records. The Astro page maps those records into a consistent card. This makes the two missing profiles simple to add once their approved information arrives.

### Use cropped paired-photo assets

The source posters combine photos and long text in a narrow image. Crop the supplied photo region into local assets so the photograph reads at card scale; preserve relevant date labels and use the source poster only as the editing basis, not as the card image.

### Keep the image and text in one equal-height card

Place the paired-photo image at the top of each white card and the name, contact block, diagnosis, history, and treatment note below it. Share one fixed minimum card height across profiles, sized for the longest supplied copy. Do not add an internal scroll area or make the image open a modal.

### Rotate cards in a circular sequence

At desktop widths, show all three available cards and keep the track still. At tablet and mobile widths, show two and one cards respectively. After each timed transition, move the leading card to the end of the track. For three profiles this produces 1–2, 2–3, 3–1, then repeats without an empty slot. Remove the previous/next buttons and slide counter.

### Use only supplied contact destinations

Email addresses use `mailto:` links. Isaura and Lourdes have WhatsApp links built from their supplied phone numbers. Marisol's “Ing. Ramirez” label has no link because a number was not supplied.

### Update profile years in local images

Change only the supplied 2025 date labels to 2026. Keep the rest of the original image content intact, then derive the cropped photo assets from those updated local images.

## Risks / Trade-offs

- Automatic movement may be undesirable for visitors who request reduced motion. Respect the system reduced-motion preference and keep all profile information available in a static presentation in that case.
- A shared fixed card height leaves some whitespace under shorter profiles. This keeps the row aligned and the full card contents visible.
- Only three complete profiles are available. Render only those profiles and leave no empty placeholders.
- These images and contact details are intended for publication because the client supplied them for the site.

## Migration Plan

1. Save the supplied full profile images locally and update their 2025 labels.
2. Produce local crops for each profile's paired photos.
3. Store the supplied text and contacts in testimonial records.
4. Add the equal-height responsive cards after the treatment explanation and implement circular automatic rotation for tablet and mobile.
5. Verify desktop, tablet, and mobile presentation; verify the 1–2 → 2–3 → 3–1 cycle and reduced-motion behavior.
