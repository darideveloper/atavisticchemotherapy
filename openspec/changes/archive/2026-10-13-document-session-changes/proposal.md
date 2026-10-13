## Why

A working session with the site owner produced a batch of content, copy, and mobile-layout refinements across the homepage and legal pages. They are already implemented (commit `5d54697`, pushed to `main`), but were made without planning artifacts. This change documents them retroactively so specs, design, and tasks stay truthful — including one deliberate reversal: the footer credit line that `legal-chrome` previously required removed is reinstated at the owner's request.

## What Changes

Homepage (`src/pages/index.astro`):
- Hero H1 reordered to `QUIMIOTERAPIA ATAVÍSTICA` on top (no parens) + `(ATAVISTIC CHEMOTHERAPY™)` below, separated by `<br>`, as exactly 2 single `<span>`s.
- Contact-modal `AccLink` ("¿Qué es la Quimioterapia Atavística y Cómo ser Considerado?") retargeted from `#aviso-tratamiento-previo` to `#atavica-original`; section gained `scroll-mt-24`; scroll handler hardened to double-`rAF`.
- 1984 / 2011 bio captions compacted (less padding, one step smaller type, tighter leading), more so on mobile.
- Google Scholar `AccLink` text extended to "...del Dr. Arguello en la literatura médica internacional".
- Removed duplicate H3 "¿En qué Consiste la Quimioterapia Atavística y Cómo ser Considerado para Participar?".
- Comparison strapline: "Ambas ... ambas ..." → "Las dos ... las dos ...".
- Added bold+underlined H3 "IMPORTANTE" atop the `#aviso-tratamiento-previo` aside.
- Logic section (`#atavica`): text column split in two; on mobile only (`<900px`) the 4-image grid renders directly under the Delbrück quote via flex `order`; desktop grid placement unchanged.
- Dedication image `alt` extended with "el Dr. Rafael Arguello Paz".

Site footer (`src/components/organisms/SiteFooter.astro`):
- Added small "Powered by Dari Developer" line (link `https://darideveloper.com/`, new tab) below the legal nav. **Reverses the prior removal.**

Legal pages (`src/content/legal/*.es.md`):
- `legal-notice`: new bullet — professional license to practice in Mexico, `cédula profesional 1150234` highlighted blue.
- `terms` + `medical-disclaimer`: "un oncólogo calificado" → "sus médicos" (verb agreement fixed: `conozcan`).
- `medical-disclaimer`: consent-registration sentence appended to the NCT02366884 bullet; new "Qué es un consentimiento informado" section with 4 bullets + right-aligned small `Rev.10/2026`.

## Capabilities

### New Capabilities

- None. Every item modifies existing behavior or copy.

### Modified Capabilities

- `homepage-content`: hero H1 order/structure, contact-modal link target + scroll timing, bio caption density, Scholar link text, IMPORTANTE heading, H3 removal, "Las dos" wording, logic-section mobile image order.
- `legal-chrome`: footer credit line reinstated — reverses the "footer without credit line" requirement; delta spec records the owner's decision.
- `legal-content`: cédula bullet, "sus médicos" wording, consent sentence, new informed-consent section.
- `dedication-section`: dedication photo `alt` names the husband.

## Impact

- Touched: `src/pages/index.astro`, `src/components/organisms/SiteFooter.astro`, `src/content/legal/legal-notice.es.md`, `src/content/legal/medical-disclaimer.es.md`, `src/content/legal/terms.es.md`.
- No new dependencies, routes, or components. No API changes.
- Risk: footer credit contradicts `legal-chrome` spec until its delta lands; mobile reorder relies on `min-[900px]` breakpoints already used in the file. Full `pnpm build` passes.
