---
source: templates://astro/astro-docker-deployment.local.md
version: 2026-09-27+local
---

# astro-docker-deployment — Project Overrides

> Project-specific additions for `astro-docker-deployment.md`. This file is never overwritten by `pull.sh`.

## This project

- Non-PWA: nginx.conf strips the offline error_page / service worker / manifest blocks.
- `pnpm build:i18n` used in the Docker build stage (runs validators + full i18n build).
- `SITE_URL` is a server-only build arg (Pattern B): `docker build --build-arg SITE_URL=https://quimioterapia-atavistica.org -t atavisticchemotherapy:latest .`
- The contact form uses client-safe `PUBLIC_CONTACT_FORM_ENDPOINT`, `PUBLIC_CONTACT_FORM_USER`, and `PUBLIC_CONTACT_FORM_API_KEY` values. Pass all three as Docker build args so Astro can inline them during the static build.
- Example: `docker build --build-arg SITE_URL=https://quimioterapia-atavistica.org --build-arg PUBLIC_CONTACT_FORM_ENDPOINT="$PUBLIC_CONTACT_FORM_ENDPOINT" --build-arg PUBLIC_CONTACT_FORM_USER="$PUBLIC_CONTACT_FORM_USER" --build-arg PUBLIC_CONTACT_FORM_API_KEY="$PUBLIC_CONTACT_FORM_API_KEY" -t atavisticchemotherapy:latest .`
- HTML gets no-cache + security headers (explict in the `/` location, since nginx location-level `add_header` overrides server-level inheritance); `/_astro/*` + static assets get immutable cache.
- Run/verify: `docker run -d -p 8080:80 atavisticchemotherapy:latest && curl -I localhost:8080/`.

