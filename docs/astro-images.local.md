---
source: templates://astro/astro-images.local.md
version: 2026-09-27+local
---

# astro-images — Project Overrides

> Project-specific additions for `astro-images.md`. This file is never overwritten by `pull.sh`.

## This project

- **No backend contract** — no `PUBLIC_API_BASE_URL`, so `remoteImagePatterns()` contributes **no** API-host entry. If remote images exist, they come from a static CDN host only (`https://your-cdn.s3.example.com` → substitute the real one); otherwise omit `image.remotePatterns` entirely.
- Local images live in `src/assets/` and are imported as `ImageMetadata` (optimized); brand icons/og-image live in `public/` (verbatim).
- Shared `Image.astro` atom + `src/lib/images.ts` with `IMAGE_SLOTS` tuned to this site's card/grid/hero/portrait widths — adjust `sizes` strings to the actual CSS slots.
- LCP: pick one hero image per page → `lcpPreload()` → `imagesrcset` preload in `Layout.astro` `<head>`.
- React islands present → precompute `SlideSet`s via `slideSet()` for byte parity.
- og-image fallback in `public/`; sitemap `filter` drops non-indexed paths.