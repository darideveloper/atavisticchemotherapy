## ADDED Requirements

### Requirement: Comparison intro paragraph uses compact mobile type

The comparison intro paragraph in `#comparacion` — "Las dos son quimioterapias en que las dos se basan en el uso de químicos o fármacos como tratamiento fundamental." — SHALL use mobile-first type (`text-xs sm:text-sm`) with `leading-relaxed`, so it renders at `text-xs` (0.75rem / 12px) below the `sm` breakpoint and keeps the existing `text-sm` (0.875rem / 14px) from `sm` up. `leading-relaxed` SHALL continue to set the line height at both steps. No other paragraph in the comparison section SHALL change size.

#### Scenario: Intro drops to 12px on mobile
- **WHEN** the comparison intro paragraph renders below the `sm` breakpoint
- **THEN** its font size is `text-xs` (0.75rem / 12px) while its line height stays `leading-relaxed` (1.625)

#### Scenario: Desktop size is unchanged
- **WHEN** the same paragraph renders at or above `sm`
- **THEN** it keeps `text-sm` (0.875rem / 14px) and the `leading-relaxed` line height

#### Scenario: Only the intro paragraph changes
- **WHEN** the two comparison body paragraphs ("Quimioterapia tradicional" / "Quimioterapia atavística") are inspected
- **THEN** they keep their existing `text-sm` sizing at every viewport
