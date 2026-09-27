---
name: Aspire Centre Women and Fertility
description: Plum sanctuary landing system extracted from design template
colors:
  plum: "#641B4E"
  plum-deep: "#4C1139"
  plum-light: "#8A2B6E"
  orchid: "#9A3676"
  accent: "#BD4B93"
  ink: "#1E293B"
  subtle: "#64748B"
  paper: "#FCFAFC"
  blush: "#F8F5F8"
  card-plum: "#5C1642"
  cta-plum: "#78235A"
  contact-plum: "#862768"
  contact-plum-hover: "#721E57"
  call-plum: "#6B1E53"
  call-plum-hover: "#53133F"
  logo-plum: "#77215A"
  span-pink: "#A83279"
  band-from: "#742058"
  band-mid: "#581642"
  band-to: "#460F33"
  process-from: "#421232"
  process-via: "#5C1A47"
  process-to: "#3A0F2C"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  pill: "9999px"
  arch-top: "90px 90px 30px 30px"
  arch-bottom: "30px 30px 90px 90px"
  xl: "16px"
  xxl: "24px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "#9B3174"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-contact:
    backgroundColor: "{colors.contact-plum}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-call:
    backgroundColor: "{colors.call-plum}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-solid:
    backgroundColor: "{colors.cta-plum}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  card-indication:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "20px"
---

# Design System: Aspire Centre Women and Fertility

## Overview

**Creative North Star: "The Plum Sanctuary"**

A warm clinical sanctuary: deep plum authority softened by blush surfaces, pill CTAs, and arch photography. Single landing page that reassures first and explains second — every section resolves to booking. Density is airy (80px sections, max-w-7xl container); decoration is restrained to gradients, glass, and arches.

**Key Characteristics:**
- Soft and reassuring, never stark or urgent
- One accent family (plum), used sparingly
- Pill buttons and arch photos as signature geometry

## Colors

One plum family carries brand; neutrals carry text and surface.

### Primary
- **plum** (#641B4E): hero glass card base, brand anchor. Glass treatment only over imagery.
- **plum-deep** (#4C1139): header wordmark, call button, darkest gradient stop.
- **plum-light** (#8A2B6E): nav hover, contact button.
- **orchid** (#9A3676): eyebrow labels, icon bullets, hero gradient start.
- **accent** (#BD4B93): hero gradient end, selection color. Sparing highlights only.

### Neutral
- **ink** (#1E293B): headings and body text on light.
- **subtle** (#64748B): secondary text, captions.
- **paper** (#FCFAFC): page background.
- **blush** (#F8F5F8): alternate section background (process guide).
- **card-plum** (#5C1642): indication card titles.
- **cta-plum** (#78235A): solid CTA button; hover `#631849`.
- **contact-plum** (#862768, hover `#721E57`): header CONTACT US pill only.
- **call-plum** (#6B1E53, hover `#53133F`): header CALL NOW pill only.
- **logo-plum** (#77215A): logo roundel strokes on `pink-50/60` fill.
- **span-pink** (#A83279): inline accent word inside H2 ("Difference") only.
- **band gradient** (`linear-gradient(135deg, #742058 0%, #581642 50%, #460F33 100%)`): Who-Should-Consider band background only.
- **process gradient** (`linear-gradient(to right, #421232, #5C1A47, #3A0F2C)`): consolidated process card background only.

### Named Rules (optional, powerful)
**The One Plum Rule.** Plum/accent ink covers ≤10% of any screen. Its rarity is the point; body surfaces stay paper/white/blush.

## Typography

**Display Font:** Inter (with system-ui fallback)
**Body Font:** Inter (with system-ui fallback)

**Character:** Humanist sans, confident headings with tight tracking against relaxed 1.65 body. No serif in implementation (Playfair is loaded in the template but unused — dropped).

### Hierarchy
- **Display** (800, clamp 30–48px, 1.15): hero H1 only.
- **Headline** (800, clamp 24–36px, 1.2): section H2s, centered or left.
- **Title** (700, 16px, 1.4): card titles, icon bullet headings.
- **Body** (400, 14px, 1.65): paragraphs, card copy, max ~68ch.
- **Label** (600, 12px, 0.08em, uppercase): eyebrows, buttons, badges.

### Named Rules (optional)
**The Eyebrow Rule.** Section eyebrows are always 12px uppercase orchid; never body-color.

## Layout

Container `max-w-7xl` with `px-4/6/8` gutters. Sections `py-20` (lg `py-24`). Desktop grids: 12-col specialist split, 4-col indication matrix, 5/7 arch duo + points, 5/7 process card. Mobile stacks; 4-card matrix becomes 1–2 col; tabs collapse to stacked content. Header sticky `h-20` with blur; anchors drive all nav.

Global behavior: `scroll-behavior: smooth`; text selection `bg orchid (#9A3676)` with white text; focus rings orchid/accent `2px + 2px offset` on every interactive element.

### Section Map (source: design/code.html line ranges)
- MainHeader: lines 67–107 — sticky nav + dual pills.
- HeroSection: lines 111–151 — photo + glass card + gradient CTA.
- SpecialistProfile: lines 154–214 — photo + bio + media row.
- WhoShouldConsider: lines 217–288 — plum band + 4-card matrix.
- WhyActingNow: lines 291–367 — arch duo + 3 icon points + solid CTA.
- ProcessGuide: lines 370–419 — blush section + dark gradient card + overlays.
- MainFooter: lines 423–428 — centered minimal footer.

## Elevation & Depth

Flat by default; shadows appear only as response to state or to lift cards off paper.

### Shadow Vocabulary (if applicable)
- **card-rest** (`box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1)`): indication cards, photo frames at rest.
- **hero-glass** (`background: rgba(98,24,76,0.88); backdrop-filter: blur(14px)`): hero content card over imagery only.
- **cta-lift** (`box-shadow: 0 10px 25px -5px rgba(154,54,118,0.4); transform: translateY(-2px)`): primary button hover.

### Named Rules (optional)
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only on hover, glass-over-image, or elevated cards.

## Shapes

Pills for every CTA (`9999px`); arches are asymmetric and directional — left photo `arch-top (90px 90px 30px 30px)`, right photo `arch-bottom (30px 30px 90px 90px)`, never symmetric and never swapped; cards `rounded-2xl` (16px), hero/process containers `rounded-3xl` (24px). Borders are hairline (`rose-100/slate-100`) or translucent white on dark. No new radii without replacing one.

## Components

Soft and reassuring: rounded, warm, gentle lifts — never sharp or aggressive.

### Buttons
- **Shape:** pill (9999px), uppercase 12px label.
- **Primary:** gradient `linear-gradient(to right, #9B3174, #C24694)`, white text, `14px 28px`; hover `brightness(.94)` + lifts 2px with `cta-lift` shadow. Frontmatter `button-primary` records the `#9B3174` start stop (schema holds one color; full gradient lives here + sidecar).
- **Hover / Focus:** contact darkens `#862768→#721E57`; call darkens `#6B1E53→#53133F`; solid darkens `#78235A→#631849`; primary deepens gradient + `translateY(-2px)`; every button shows a visible orchid/accent focus ring.
- **Secondary / Ghost / Tertiary (if applicable):** contact (`#862768`) and call (`#6B1E53`) header pills; solid (`#78235A`) section CTA. No ghost variant in template.

### Cards / Containers
- **Corner Style:** gently rounded (16px cards, 24px hero/process).
- **Background:** white on paper/blush; plum glass only over hero image; dark plum gradient only for process card.
- **Shadow Strategy:** card-rest at rest; cta-lift on hover (see Elevation).
- **Border:** hairline rose/slate on light; `white/20` on dark.
- **Internal Padding:** 20px cards; 32–40px hero/process.

### Inputs / Fields
- **Style:** not present in template; when added use white fill, slate hairline, pill or 12px radius to match button language.
- **Focus:** plum-light border + soft orchid ring.
- **Error / Disabled:** error in warm red; disabled at 50% opacity — to be resolved during implementation.

### Navigation
- Sticky white/95 blur header, hairline rose border. Links 14px medium slate, plum-light hover. Dual pill CTAs persist right. Mobile: hide center links, keep call pill.

### Hero Glass Card
Signature component: plum glass (`rgba(98,24,76,.88)` + 14px blur), `white/20` border, 24px radius, white headline + rose-100 body + checkmark list + gradient CTA. Used once, over imagery only.

### Indication Card
White `rounded-2xl` card: `h-44` image band with rose-50 pad, centered card-plum title (min 44px), 12px slate body. Hover lifts 4px.

### Logo Lockup (recipe, no new token)
Roundel `w-12 h-12 rounded-full` with `pink-200` border on `pink-50/60` fill, inner SVG strokes in `logo-plum (#77215A)`; wordmark 16px bold `plum-deep` → hover `plum-light`, sub-line 10px uppercase `subtle`. Always left in the sticky header; never recolor the strokes.

### Media Mentions Row (recipe)
Horizontal wrap row `gap-6/8`: 8world (blue-600 black + rose-500 M), 联合早报 (red-600 serif black), cna (slate-800 extrabold + red-600 CSS triangle), asiaone (amber-600 pill, white 14px extrabold). Order and treatments are fixed; never restyle into uniform badges.

### Process Card Overlays (recipe)
Inside the dark process gradient only: mono `10px` overlays — date `emerald-400 on black/60 rounded px-2 py-0.5` at `top-4 left-4`, caliper readout `cyan-400` at `bottom-4 left-4`. Images `object-cover`, ultrasound pane `contrast-125 opacity-75 on black`.

### Hero Imagery (recipe)
Photo `object-cover object-[65%_35%] scale-105` with dual overlays: `from-black/55 via-black/30 to-transparent` (horizontal) + `from-slate-950/60 via-transparent to-black/20` (vertical). Glass card sits above; never place un-overlaid text on the photo.

## Do's and Don'ts

Concrete guardrails from the template. Strict: pill CTAs only, plum ≤10%, no new radii.

### Do:
- **Do** use pill CTAs for every action (exact: 9999px, uppercase 12px).
- **Do** keep body surfaces paper/white/blush; reserve plum for glass, gradients, and accents.
- **Do** use the asymmetric arch pair only for the Why-Now photo moment (`arch-top` left, `arch-bottom` right).
- **Do** keep eyebrows 12px uppercase orchid above every H2 that needs one.
- **Do** keep header pills on their exact hexes (contact `#862768→#721E57`, call `#6B1E53→#53133F`) and the hero CTA on its exact gradient.
- **Do** follow the section map order and line-range composition when rebuilding the page.

### Don't:
- **Don't** introduce new accent hues — deepen/lighten plum instead.
- **Don't** place body copy on plum except inside the hero glass card.
- **Don't** use square buttons or sharp cards; the system has no 0–8px radii.
- **Don't** reuse `lh3.googleusercontent` hotlinks or CDN Tailwind v3 in production — replace with local assets and Tailwind v4 `@theme` on implement.
