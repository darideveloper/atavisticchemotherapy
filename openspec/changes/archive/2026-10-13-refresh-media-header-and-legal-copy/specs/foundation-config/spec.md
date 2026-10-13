## MODIFIED Requirements

### Requirement: Canonical .gitignore with marked extras
The project's `.gitignore` SHALL contain the canonical template block verbatim (build output, generated types, dependencies, environment variables, `openspec/changes/*` + `!openspec/changes/archive/` pair, `.*/` dotfolder ignore), and any entries below that block SHALL sit under section comments that mark them as project-specific or generic-local conveniences. Generic-local noise SHALL include the FUSE hidden-file pattern (`.fuse_hidden*`), so leftovers created when an open file is replaced on a FUSE mount never enter the repository.

#### Scenario: Canonical block intact
- **WHEN** `.gitignore` is compared against the template in `docs/astro-base-config.md` § `.gitignore`
- **THEN** the first block matches verbatim, including the openspec archive pair

#### Scenario: Extras are labeled
- **WHEN** `.gitignore` is inspected below the canonical block
- **THEN** every entry belongs to a commented section identifying it as project-specific or generic-local

#### Scenario: FUSE leftovers stay untracked
- **WHEN** a `.fuse_hidden*` file exists anywhere in the checkout
- **THEN** `git check-ignore` matches it against the `.fuse_hidden*` rule and `git status` leaves it out of the untracked list
