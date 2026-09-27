## Purpose

Zod-validated persisted Zustand stores with a hydration-safe hook.

## Requirements

### Requirement: Zod-validated store
The project SHALL provide `src/store/form.ts` (Zustand + `persist`) where every field has a Zod schema validated on `setField` and on a `validateAll()` submit, persisting to localStorage.

#### Scenario: Field validation
- **WHEN** `setField` is called with an invalid value
- **THEN** a Zod error is recorded for that field

#### Scenario: Full-form validation
- **WHEN** `validateAll()` is invoked
- **THEN** it blocks/permits based on all fields' Zod schemas

#### Scenario: Persistence across reload
- **WHEN** the page reloads
- **THEN** the store state is restored from localStorage, excluding transient state

### Requirement: Hydration-safe hook
The project SHALL provide a `useField()` hook (and store bindings) that reads/writes a single field safely across hydration.

#### Scenario: Safe field access
- **WHEN** a component calls `useField('email')`
- **THEN** it reads and writes that field without hydration mismatch
