## 1. Land Docs Pull

- [x] 1.1 Review vendored diff (`git diff docs/`) — confirm only the 24 expected `*.md` files, no `*.local.md` or `INDEX.md`
- [x] 1.2 Commit docs-only (`git add docs/` + commit, only with your explicit approval); leave untracked `variants/` untouched

## 2. Close .gitignore Gap

- [x] 2.1 Add section header above the logs/`.DS_Store`/`.idea` block marking it generic-local (comment-only, no semantics change)
- [x] 2.2 Verify canonical block still verbatim vs `docs/astro-base-config.md` template and spec scenario `Canonical block intact` passes

## 3. Prove Compliance

- [x] 3.1 Run `pnpm run build:full` (i18n + imports validators, build, post-build markdown validator)
- [x] 3.2 Run wikilink grep (`rg "\[\[" src content.md design docs 2>/dev/null`) — expect zero hits
- [x] 3.3 Run orphan-hunt (`rg "^import" src` vs `rg --files src/components`) — resolve or file follow-up for orphans
- [x] 3.4 Confirm secrets grep on `docs/` shows placeholders only
- [x] 3.5 Confirm openspec isolation state: no active `openspec/changes/*` proposals outside `archive/`, no `worktree.jsonc` MAIN-sync
