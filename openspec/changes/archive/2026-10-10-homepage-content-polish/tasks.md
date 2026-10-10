## 1. Universities list

- [x] 1.1 Remove grid classes from the four `<li>` in "Formación y trayectoria" (`src/pages/index.astro` ~258–261), render `◆ Name, **Location**` inline with plain `<strong>` (no `block`/`text-right`)
- [x] 1.2 Reorder so "Universidad de Connecticut, Connecticut, USA" precedes "Universidad de Rochester, New York, USA"
- [x] 1.3 Verify items wrap on mobile with location adjacent, `ul.space-y-3` spacing intact

## 2. Card heading punctuation

- [x] 2.1 Add terminal `.` to the grano-de-sal `<h3>` ("…como un grano de sal.")

## 3. Statistics accordion heading

- [x] 3.1 Move `<h2>` "Las Estadísticas Mundiales…" from `.acc-body` into `<summary>`, stacked after the Diariamente teaser via `<span class="flex-1 space-y-2"><span class="block">…</span><h2 …>`, keeping size classes
- [x] 3.2 Verify collapsed view shows teaser + heading, expanded body starts at "1)", `summary::after` marker still aligned

## 4. Realidad intro alignment

- [x] 4.1 Swap `text-left` → `text-justify` on the "Excluyendo algunas formas…" `<p>` (`src/pages/index.astro` ~274)

## 5. WhatsApp contact link

- [x] 5.1 In `src/data/site-config.ts`, set `contact.whatsapp.username` to label `+1 (301) 305-9591` and url `https://wa.me/13013059591` (no handle)
- [x] 5.2 Verify urgent-contact paragraph renders `WhatsApp (+1 (301) 305-9591)` linking to the direct wa.me URL

## 6. Verify

- [x] 6.1 Run `pnpm run dev`, check Formación list, grano-de-sal card, realidad intro, and statistics accordion collapsed + expanded on desktop and mobile
- [x] 6.2 Confirm `git diff` touches only `src/pages/index.astro` and `src/data/site-config.ts`
