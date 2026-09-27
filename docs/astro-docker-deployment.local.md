---
source: templates://astro/astro-docker-deployment.local.md
version: 2026-09-27+local
---

# astro-docker-deployment — Project Overrides

> Project-specific additions for `astro-docker-deployment.md`. This file is never overwritten by `pull.sh`.

## This project

- Non-PWA: nginx.conf strips the offline error_page / service worker / manifest blocks.
- `pnpm build:i18n` used in the Docker build stage (runs validators + full i18n build).
- `SITE_URL` is a server-only build arg (Pattern B): `docker build --build-arg SITE_URL=https://atavisticchemotherapy.com -t atavisticchemotherapy:latest .`
- No `PUBLIC_*` build args (no backend contract).
- HTML gets no-cache + security headers (explict in the `/` location, since nginx location-level `add_header` overrides server-level inheritance); `/_astro/*` + static assets get immutable cache.
- Run/verify: `docker run -d -p 8080:80 atavisticchemotherapy:latest && curl -I localhost:8080/`.

