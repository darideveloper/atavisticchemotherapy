## Context

`docs/*.md` (24 vendored files, stack `astro`) were re-pulled from `agent-docs@main` via `pull.sh` (base + layers `i18n,images,markdown,react-islands,zustand-zod,gsap-scrolltrigger`; `fetch-wrapper`/`pwa` excluded). The pull is currently uncommitted working-tree state. Upstream added one MUST rule (`.gitignore` created from the canonical template verbatim) and clarified openspec isolation (already satisfied: only `archive/` present, no `worktree.jsonc`). Audit found a single cosmetic gap: unmarked generic extras in `.gitignore`.

## Goals / Non-Goals

**Goals:**
- Land the docs pull as an isolated docs-only commit.
- Close the `.gitignore` labeling gap per the new MUST rule.
- Prove ongoing compliance by running the base-config verification matrix.

**Non-Goals:**
- Adopting new docs layers, touching site code/content, changing ignore semantics, committing `variants/` scratch, re-stamping `version:` hashes (degit yields `+unreleased`; accepted as-is).

## Decisions

- **Docs commit scoped to `docs/` only** (`git add docs/`). Rationale: keeps the vendor sync reviewable and separate from the unrelated untracked `variants/` work. Alternative (commit everything) rejected — would mix scratch into history.
- **Comment-only `.gitignore` fix, no reordering or semantics change.** Rationale: the canonical block is already byte-identical to the template; only section labeling is missing. A single header comment above the logs/`.DS_Store`/`.idea` block plus keeping the existing project-specific mark satisfies "clearly marked" with zero behavior risk.
- **Run `build:full` (not just `build`) for verification.** Rationale: this project carries the `i18n` and `markdown` layers, so the matrix requires `validate-i18n` and post-build `validate-markdown`; `build:full` chains all three validators. Orphan-hunt and wikilink grep run alongside as read-only checks.

## Risks / Trade-offs

- [Risk] `version: +unreleased` stamps look like a downgrade from `+61ecb02` → Accepted: cosmetic only; content is latest `main`. Re-pulling from an `agent-docs` checkout would stamp real hashes but adds setup for no content gain.
- [Risk] `build:full` surfaces a pre-existing failure unrelated to this change → Mitigation: fix only failures caused by the change; file pre-existing breakage as a separate change, don't expand scope.
- [Risk] Future pulls re-clobbering committed `*.md` customizations → Mitigation: none needed yet — audit showed zero local customizations in vendored files; project content lives in `*.local.md`, which `pull.sh` never touches.
