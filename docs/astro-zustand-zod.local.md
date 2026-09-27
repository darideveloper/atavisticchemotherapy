---
source: templates://astro/astro-zustand-zod.local.md
version: 2026-09-27+local
---

# astro-zustand-zod — Project Overrides

> Project-specific additions for `astro-zustand-zod.md`. This file is never overwritten by `pull.sh`.

## This project

- Store: `src/store/form.ts` (Zustand + `persist` middleware, Zod-validated fields via `setField`/`validateAll`, persisted to `app-form-storage` localStorage; `errors`/`isLoading` excluded from persistence).
- Hook: `src/store/useField.ts` (`useField(field)` returns `[value, setField]`, safe across SSR/hydration; reads via `getState()` on both server and client).
- Vanilla self-bound atoms are the approach here (see `astro-atomic-components.local.md`) — no `ui/` wrapper layer.
- Demo: `src/components/organisms/FormDemo.tsx` (`client:load`) proving Zod errors, persistence, and `validateAll`.

