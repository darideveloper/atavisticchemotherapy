## ADDED Requirements

### Requirement: Canonical .gitignore with marked extras
The project's `.gitignore` SHALL contain the canonical template block verbatim (build output, generated types, dependencies, environment variables, `openspec/changes/*` + `!openspec/changes/archive/` pair, `.*/` dotfolder ignore), and any entries below that block SHALL sit under section comments that mark them as project-specific or generic-local conveniences.

#### Scenario: Canonical block intact
- **WHEN** `.gitignore` is compared against the template in `docs/astro-base-config.md` § `.gitignore`
- **THEN** the first block matches verbatim, including the openspec archive pair

#### Scenario: Extras are labeled
- **WHEN** `.gitignore` is inspected below the canonical block
- **THEN** every entry belongs to a commented section identifying it as project-specific or generic-local
