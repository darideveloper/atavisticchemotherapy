## Why

Upstream `agent-docs` (stack `astro`) shipped rule tightenings — a MUST-create-`.gitignore`-from-template rule and openspec-isolation clarifications — and the project's 24 vendored `docs/*.md` files were re-pulled to latest `main`. The project must land that pull and close the one compliance gap it exposed so all project rules hold again.

## What Changes

- Commit the re-pulled vendored docs (`docs/*.md`, 24 files) as a docs-only commit; no `*.local.md`, `INDEX.md`, or non-docs files included.
- Label the non-canonical `.gitignore` sections (logs, `.DS_Store`, `.idea`) so every entry below the canonical template block is clearly marked, per the new rule.
- Run the base-config verification matrix (`build:full`, wikilink grep, orphan-hunt) to confirm the project still satisfies all standing rules; fix only failures caused by this change and file any pre-existing breakage as a separate change.
- No new docs layers adopted (`fetch-wrapper`, `pwa` stay out); no behavior or content changes to the site.

## Capabilities

### New Capabilities

- None. This change lands a docs sync plus a cosmetic compliance fix; it introduces no new product capabilities.

### Modified Capabilities

- `foundation-config`: adopt the upstream MUST rule — `.gitignore` is created from the canonical template verbatim, with any extra ignores below it clearly marked (canonical vs. project-specific vs. generic-local sections distinguishable).

## Impact

- `docs/*.md` (24 vendored files, content + `version:` stamps); `.gitignore` (one comment header, no ignore semantics change).
- `openspec/specs/foundation-config` gains a delta spec for the `.gitignore` rule.
- No runtime, routing, i18n, styling, or deployment impact. Untracked `variants/` scratch stays untouched and uncommitted.
