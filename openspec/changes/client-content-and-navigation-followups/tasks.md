# Tasks

## 1. Client copy and alignment

- [x] 1.1 Apply the client-approved oncology, comparison, dedication, biography, caption, and quotation copy without changing unrelated headings.
- [x] 1.2 Align body paragraphs explicitly to the left in sections whose containers center headings; preserve requested citation and attribution alignment.
- [x] 1.3 Replace the treatment placeholder with `$2,900 USD` and add the extracted dedication image caption.

## 2. Warning relocation and references

- [x] 2.1 Move the treatment warning from the contact modal to the end of the atavistic chemotherapy section in a visible framed block.
- [x] 2.2 Convert references 5–8 to the existing linked superscript pattern and verify each target and preview remains available.
- [x] 2.3 Add the second-opinion CTA at the end of the section using the existing modal trigger.

## 3. Contact navigation

- [x] 3.1 Replace the modal warning dropdown with a styled `+` link to the main atavistic chemotherapy heading.
- [x] 3.2 Close the modal and scroll to the visible heading using the explicit section-link handler; avoid focus restoration that would undo the scroll.

## 4. Verification

- [x] 4.1 Run `git diff --check` and `pnpm run validate-imports`.
- [ ] 4.2 Verify the modal link, static warning, references, and CTA in desktop and mobile browser captures.
- [ ] 4.3 Run `openspec validate client-content-and-navigation-followups` once the local schema installation is available.
