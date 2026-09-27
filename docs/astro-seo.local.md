---
source: templates://astro/astro-seo.local.md
version: 2026-09-27+local
---

# astro-seo — Project Overrides

> Project-specific additions for `astro-seo.md`. This file is never overwritten by `pull.sh`.

## This project

- `BaseSEO` + `PageSEO` shipped (no blog, so no `BlogSEO`/`BlogPostSEO`).
- Default `jsonType = "LocalBusiness"` for standard pages.
- `stripMarkdown()` feeds all `<meta name="description">` (keeps `**`/links out of SEO).
- og-image: relative paths get the `BUSINESS_DATA.url` prefix; default `/og-image.jpg` lives in `public/`.
- Sitemap `filter` drops `/checkout`, `/thank-you` (no such pages yet — placeholder).
- Favicon set in `public/`: `favicon.svg|ico|png`, `apple-touch-icon.png`, `og-image.jpg`.

