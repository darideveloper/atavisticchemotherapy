## 1. Confirm implemented state matches specs

- [x] 1.1 Verify hero H1 has 2 single spans (ES title top, parenthesized EN+TM below, `<br>` between) in `src/pages/index.astro`
- [x] 1.2 Verify contact-modal `AccLink` targets `#atavica-original`, section has `scroll-mt-24`, handler uses double-`rAF`
- [x] 1.3 Verify 1984/2011 captions use compact classes and Scholar button carries the extended label
- [x] 1.4 Verify IMPORTANTE H3 exists in `#aviso-tratamiento-previo` and the duplicate H3 is gone
- [x] 1.5 Verify footer credit line links `https://darideveloper.com/` with `target="_blank" rel="noopener"`
- [x] 1.6 Verify legal-notice cédula bullet, "sus médicos" wording in terms/disclaimer, and the informed-consent section with `Rev.10/2026`
- [x] 1.7 Verify dedication photo `alt` names Dr. Rafael Arguello Paz
- [x] 1.8 Verify comparison intro reads "Las dos son quimioterapias en que las dos se basan…" and stays centered

## 2. Validate and visually check

- [x] 2.1 Run `pnpm validate-imports`, `pnpm validate-markdown`, and `pnpm build` — all green
- [x] 2.2 Check `#atavica` on a narrow viewport: image grid sits directly under the Delbrück quote; confirm desktop grid unchanged
- [x] 2.3 Open the contact modal, click the section link, confirm the modal closes and the page lands on the section top
