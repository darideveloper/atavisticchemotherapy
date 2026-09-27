## ADDED Requirements

### Requirement: Atomic directory hierarchy
The project SHALL provide `src/components/{atoms,molecules,organisms}` folders with strict import rules: `molecules`/`organisms` never import from UI layers directly, only `atoms` does.

#### Scenario: Import rules enforced
- **WHEN** `rg "^import" src --glob "*.{astro,ts,tsx}"` is run
- **THEN** molecules/organisms reference only atoms (or higher), never UI primitives directly

### Requirement: Vanilla atom primitive
The project SHALL provide a `cn` class util (in `src/lib/utils.ts`) and a self-bound vanilla `Input` atom that manages its own data via an injectable store hook.

#### Scenario: Atom binds store via prop
- **WHEN** an atom is used with a store hook prop
- **THEN** it reads/writes that store's field

#### Scenario: cn utility combines classes
- **WHEN** `cn('a', 'b')` is called
- **THEN** the joined conditional class string is returned
