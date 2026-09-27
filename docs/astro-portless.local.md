---
source: templates://astro/astro-portless.local.md
version: 2026-09-27+local
---

# astro-portless — Project Overrides

> Project-specific additions for `astro-portless.md`. This file is never overwritten by `pull.sh`.

## This project

- Main checkout URL: `https://atavisticchemotherapy.localhost`
- Worktree URL: `https://<branch>.atavisticchemotherapy.localhost` (`portless list` is source of truth; `/` in branch names gets sanitized)
- Prod fallback: `https://atavisticchemotherapy.com` (dev never reaches it — Portless always injects `PORTLESS_URL`)
- No backend contract (no `PUBLIC_API_BASE_URL` / `API_TOKEN`). `.env` carries `SITE_URL` only.
- Manual siblings only, same terminal session — plugin banned (see `astro-worktrees.local.md`). Never `--background` the portless-wrapped server; agents never autostart servers.

