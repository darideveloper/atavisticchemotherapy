## Why

The specialist bio ("Dr. Frank Arguello") carried only text: the universities list ended the section abruptly, 27 years of documented trajectory (1984 press coverage → 2011 book) had no visual evidence, the portrait vertically centered against a now-tall text column, and the page had no personal dedication despite the doctor's stated motivation (his mother's 1982 cancer death). This change gives the bio visual proof, a sticky portrait anchor on desktop, and a memorial dedication section at the page bottom.

## What Changes

- Adds a side-by-side archive-cards block after the "Formación y trayectoria" universities list: 1984 El Norte newspaper clipping and 2011 *Atavistic Metamorphosis* book cover, each with a solid plum (`#4c1139`) date bar, opening the existing fullscreen lightbox on tap. Grid stays 2-column on iPhone (never stacks).
- Equalizes archive-card caption bars on mobile via `flex-1` stretch so the shorter label's bar extends to the full card bottom (no white gap).
- Aligns the doctor portrait to the top of the bio grid (`items-start`) and makes it `lg:sticky` (`top-24`) so it follows the scroll on desktop only.
- Adds a new "Dedicatoria a mi madre" memorial section (Playfair Display title, italic dedication paragraphs verbatim, right-aligned `— Frank Arguello Astorga` signature, parents photo as-is via the shared Image atom with lightbox).
- Reorders the page bottom: Dedicatoria (`order:9`) now precedes References (`order:10`); SiteFooter bumped to `order:11`. References render last, before the footer.
- Recolors the dedication ornament (`── ◆ ──`) from rose to brand plum `#4c1139`.
- Adds three image assets: `prensa-el-norte-1984.png`, `libro-metamorfosis-atavica-2011.jpg`, `dedicatoria-padres.png`.

## Capabilities

### New Capabilities

- `archive-cards`: side-by-side historic-evidence cards (1984 press / 2011 book) with solid date bars, equal-height captions, and lightbox enlarge.
- `dedication-section`: memorial dedication block with prominent title, verbatim dedication text, right-aligned signature, and parents photo.

### Modified Capabilities

- `homepage-content`: page-bottom section order (dedication before references, references last before footer) and specialist-portrait behavior (top-aligned, sticky on desktop).

## Impact

- Affected code: `src/pages/index.astro` (SpecialistProfileSection, new DedicationSection, References order), `src/components/organisms/SiteFooter.astro` (flex order 10 → 11), three new files in `src/assets/content/`.
- No new dependencies, routes, or JS: reuses the `Image` atom (`lightbox` prop) and the existing `#lightbox` modal handler.
- No breaking changes: purely additive UI plus order-attribute renumbering.
