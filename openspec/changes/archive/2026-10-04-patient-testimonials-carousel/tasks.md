# Tasks

## 1. Testimonial source material

- [x] 1.1 Copy the three supplied patient-profile images into local assets, change only their visible 2025 labels to 2026, and verify the remaining image content is unchanged.
- [x] 1.2 Transcribe the client-supplied profile text for Isaura, Lourdes, and Marisol into structured testimonial records; verify each record contains its paired images, diagnosis, body copy, treatment note, and approved contact values.

## 2. Carousel section

- [x] 2.1 Create a patient-testimonials section after the treatment-explanation content using a variant of the existing clinical cards; verify the desktop and mobile carousel renders the three available records without empty cards.
- [x] 2.2 Add accessible slide controls and current-slide identification; verify pointer and keyboard navigation can reach every available testimonial.
- [x] 2.3 Reuse the image lightbox for each testimonial image; verify the selected image and descriptive caption open and Escape closes the modal.

## 3. Contact presentation

- [x] 3.1 Render a bold “Información de contacto” line below each patient name, followed by the client-supplied email and WhatsApp data; verify no medical or contact text is invented or paraphrased.
- [x] 3.2 Create `mailto:` links for all three supplied email addresses and WhatsApp links only for Isaura and Lourdes; verify Marisol’s “Ing. Ramirez” remains a non-link label.

## 4. Verification

- [x] 4.1 Run `pnpm build` and `git diff --check`; verify the site builds successfully and no formatting errors are reported.
- [x] 4.2 Inspect the section at desktop and mobile widths; verify readable full profile content, 2026 image labels, carousel navigation, contacts, and image enlargement.

## 5. Photo-focused carousel correction

- [x] 5.1 Create local cropped photo assets from the client-supplied profiles, retaining the visible source year labels.
- [x] 5.2 Replace full profile posters in the carousel with the corresponding cropped photo assets.
- [x] 5.3 Constrain the carousel card width and rebalance its media/text layout for desktop and mobile reading.

## 6. Compact scale correction

- [x] 6.1 Reduce the testimonial card's visual scale by approximately 40%, including its width, image, typography, spacing, and navigation controls, without changing its content.

## 7. Multi-card carousel correction

- [x] 7.1 Render three equal-height cards at desktop width, two at tablet width, and one at mobile width, preserving access to the full supplied content within each card.
- [x] 7.2 Use the regular h2 scale for the section title and preserve the established title hierarchy for card headings.

## 8. Continuous testimonial card correction

- [x] 8.1 Remove the testimonial image lightbox trigger and internal card scrolling.
- [x] 8.2 Increase the uniform card height so each supplied photo and full profile appear in one continuous card surface.

## 9. Automatic carousel controls correction

- [x] 9.1 Remove the visible previous/next controls and numeric status indicator.
- [x] 9.2 Progress through off-screen cards automatically on tablet and mobile while retaining the static three-card desktop view.

## 10. Cyclic carousel sequence correction

- [x] 10.1 Rotate the card nodes after each automatic transition so tablet widths cycle through 1–2, 2–3, and 3–1 without blank space.
