## ADDED Requirements

### Requirement: Canonical accented Spanish treatment name

All user-facing Spanish content SHALL spell the treatment using the accented canonical forms — `atavística`/`atavístico` (lowercase), `Atavística`/`Atavístico` (Title Case), or `ATAVÍSTICA`/`ATAVÍSTICO` (upper case) — and SHALL NOT use the unaccented `atavistica`/`Atavistica`/`ATAVISTICA`, nor the short accented `atávica`/`Atávica`, except inside code identifiers, URL fragments (`id="atavica"`, `#atavica`), asset filenames, and English strings.

#### Scenario: Homepage copy uses the accented form

- **WHEN** the rendered homepage is scanned for the treatment name
- **THEN** every Spanish occurrence reads `atavística` / `Atavística` / `ATAVÍSTICA` with no unaccented long form and no short `atávica` form

#### Scenario: Data and metadata use the accented form

- **WHEN** clinical-case narratives, testimonial histories, SEO title/description/keywords, and `messages/es.json` are read
- **THEN** every Spanish treatment spelling is the accented canonical form

#### Scenario: Identifiers and English are exempt

- **WHEN** `id="atavica"`, `id="atavica-original"`, `/#atavica`, `metamorfosis-atavica.png`, and English `Atavistic` strings are inspected
- **THEN** they remain unchanged and the terminology rule does not apply to them
