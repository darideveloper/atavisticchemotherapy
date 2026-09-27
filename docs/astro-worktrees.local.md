---
source: templates://astro/astro-worktrees.local.md
version: 2026-09-27+local
---

# astro-worktrees — Project Overrides

> Project-specific additions for `astro-worktrees.md`. This file is never overwritten by `pull.sh`.

## This project (manual-siblings-only, like enredarte)

- Layout:
  ```bash
  /mnt/hd/develop/astro/
    atavisticchemotherapy/              # main checkout
    atavisticchemotherapy-<branch>/     # sibling worktree (e.g. atavisticchemotherapy-feature-auth)
  ```
- URLs: main → `https://atavisticchemotherapy.localhost`, worktree → `https://<branch>.atavisticchemotherapy.localhost`.
- Plugin banned: never use `worktree_create` / `worktree_delete`, no `.opencode/worktree.jsonc`, no central store under `~/.local/share/opencode/worktree/`. Same-session manual lifecycle only.
- Bootstrap per sibling: `cp ../atavisticchemotherapy/.env .env` (or `cp .env.example .env` on fresh clone), real `pnpm install` (no symlink), hand-sync `.opencode/skills/openspec-*` + `commands/opsx-*.md`, `pnpm run dev`, verify with `portless list`.
- `.env` carries `SITE_URL=https://atavisticchemotherapy.localhost` only (no backend). A stale `SITE_URL` copy is harmless — `PORTLESS_URL → SITE_URL → https://atavisticchemotherapy.com` resolves each checkout's own URL first.
- Openspec isolation: active `openspec/changes/*` never cross checkouts; copy back only `openspec/changes/archive/` by hand before merge.

