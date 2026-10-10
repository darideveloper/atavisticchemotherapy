## Purpose

Delta to the existing `homepage-content` capability: specialist-portrait positioning behavior in the bio grid.

## ADDED Requirements

### Requirement: Doctor portrait is top-aligned and sticky on desktop

The bio grid SHALL use `items-start` (portrait top-aligned with the text column) and the photo column SHALL be sticky on desktop only (`lg:sticky lg:top-24 self-start`), remaining static on mobile.

#### Scenario: Portrait follows desktop scroll

- **WHEN** a visitor scrolls the bio on a desktop viewport
- **THEN** the portrait stays visible while the bio text, universities list, and archive cards scroll past

#### Scenario: Mobile stacking unchanged

- **WHEN** a visitor views the bio below the `lg` breakpoint
- **THEN** the photo renders statically above the text with no sticky behavior
