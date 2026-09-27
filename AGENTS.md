## Development

Canonical dev start (Astro foreground under `portless run` — this is what serves the `.localhost` URL):

```bash
pnpm run dev
```

Never `--background` there — it orphans the proxy route. `astro dev --background` + `astro dev stop` / `status` / `logs` are reserved for direct non-portless runs (no `.localhost` URL). Servers are started manually — agents never autostart them (see `docs/astro-portless.md` § "Running under AI agents").

The site is served at **`https://atavisticchemotherapy.localhost`** with automatic HTTPS.

## Git worktrees

One checkout per branch, all runnable at once. `pnpm run dev` uses `portless run`, so each checkout gets its own URL automatically: main → `https://atavisticchemotherapy.localhost`, a worktree on branch `<branch>` → `https://<branch>.atavisticchemotherapy.localhost`.

This project uses **manual siblings only, in the same terminal session**. Never use the `worktree_create` / `worktree_delete` plugin tools here (they open a new terminal and nest under the central store). Never nest a worktree inside the main checkout.

```bash
/mnt/hd/develop/astro/
  atavisticchemotherapy/              # main checkout
  atavisticchemotherapy-<branch>/     # sibling worktree (e.g. atavisticchemotherapy-feature-auth)
```

Lifecycle:

```bash
git fetch origin
git worktree add ../atavisticchemotherapy-<branch> <branch>                  # existing branch
git worktree add ../atavisticchemotherapy-feature -b feature/xyz main        # new branch
git worktree list
# ... after merge, stop dev first (Ctrl+C), then full clean:
git worktree remove ../atavisticchemotherapy-<branch>
git worktree prune
git branch -d <branch>          # squash-merged branch; -D only with reviewed work
git fetch -p                    # drop stale remote-tracking refs
git worktree list               # verify clean — only main remains
```

Bootstrap each new sibling (gitignored paths are per-checkout — `node_modules/`, `.env`, `.astro/`, `dist/` don't transfer):

```bash
cd ../atavisticchemotherapy-<branch>
cp ../atavisticchemotherapy/.env .env
pnpm install
pnpm run dev   # → https://<branch>.atavisticchemotherapy.localhost
```

Gotchas:

- Real `pnpm install` per sibling (no `node_modules` symlink).
- A fresh `.env` copy keeps main's `SITE_URL` — harmless, the `PORTLESS_URL → SITE_URL → prod` chain resolves each checkout's own URL first.
- Openspec: nothing crosses automatically. Copy `openspec/changes/archive/` by hand (`cp -rn`) only when needed; active proposals stay isolated. New siblings also need `.opencode/skills/openspec-*` + `commands/opsx-*.md` synced by hand (markdown only); archive back to main before merge (only `archive/` is tracked).
- New siblings start from committed `HEAD` only — commit or stash uncommitted changes first.
- Teammate branches: `git fetch origin` and ensure a local branch exists (`git branch <name> origin/<name>`) BEFORE `git worktree add ../atavisticchemotherapy-<name> <name>`.
- Branch names with `/` get sanitized in the subdomain — check `portless list` after first run.
- One dev server per checkout; review before deleting; squash on merge.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
