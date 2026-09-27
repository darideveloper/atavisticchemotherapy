---
source: templates://astro/gsap-scrolltrigger/README.local.md
version: 2026-09-27+local
---

# gsap-scrolltrigger/README — Project Overrides

> Project-specific additions for `gsap-scrolltrigger/README.md`. This file is never overwritten by `pull.sh`.

## This project

- Shared module: `src/lib/gsap.ts` (SSR-safe registration of ScrollTrigger, global defaults, load-refresh).
- Reveals-only (no branded loader / entrance orchestration — doc 02 deferred).
- Demo: `src/components/organisms/RevealSection.astro` — hybrid `.js-reveal` + `gsap.set(autoAlpha:1)` + `.from()` with `matchMedia` reduced-motion fallback, `transition:animate="none"`, `init()` + `astro:page-load` re-init + `ScrollTrigger.refresh()`.

