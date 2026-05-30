# Skill: CMS Mirror Web

**Purpose:** How to restructure a Payload CMS bucket so editors see the same structure, content, and flow as the web page they are editing.

---

## The 4 Rules

### Rule 1 — 95% similarity: content, sort position, flow

Every visible section on the web page must have a corresponding sub-group in the CMS card. Sub-groups must appear in the same order sections appear when scrolling the page. Field names inside each sub-group must match what the editor sees on screen.

- **Content:** every editorial string, image, and CTA visible to visitors is editable in CMS
- **Sort position:** sub-groups ordered top-to-bottom matching the page scroll
- **Flow:** section groupings match how a visitor reads the page — not how the data is technically organized

### Rule 2 — No CMS fields that are not on the web

Every visible CMS field must render somewhere on the web page. Ghost fields — fields editors can edit that never appear on site — must be removed or hidden. Audit every visible CMS field against the web component render before shipping.

### Rule 3 — No web content that is hardcoded

Every string, image, eyebrow, label, placeholder, button state, success message, and CTA visible to visitors must be editable in CMS. If a web component has a hardcoded fallback `|| 'Some text'`, that fallback must have a corresponding CMS field. Audit web components for `|| 'hardcoded'` patterns and add CMS fields for all missing ones.

### Rule 4 — No duplication of data

Each piece of data lives in exactly one place. When merging globals into one card: move fields into the destination, hide the source globals, update the web to read the new path. Fields that belong in Settings (phone, email, address, hours values) stay in Settings — referenced, never copied.

---

## Step-by-step Process

### Step 1 — Read the web page top to bottom

Open the web route component (e.g. `ContactPage.tsx`). Walk the render from top to bottom. For each visible section, note:
- Which CMS global it reads from: `useCms()` → which key
- Which fields it accesses: look for `g?.fieldName || 'fallback'` patterns
- Whether any fallbacks are hardcoded strings (Rule 3 violation)
- Whether any fields are NOT used at all (Rule 2 violation)

**Also grep for every source global key across ALL web files** — a global consumed by the primary route may also feed secondary routes. Changing the source breaks them silently:
```bash
grep -rn "cms?\.libraryCta\|cms?\.shareCta" packages/web/src/ --include="*.tsx"
```
Every consumer must still receive the data after the merge.

### Step 2 — Read all current CMS globals for the bucket

Read every global file in `packages/cms/src/globals/` for that bucket. Note which are visible (`hidden: true` absent) vs hidden. List all visible fields per global.

### Step 3 — Check the DB structure

For each source global, inspect **both** the main table AND the locales table — some globals have fields spread across both:
```bash
PGPASSWORD=... psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "\d <table_name>"
PGPASSWORD=... psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "\d <table_name>_locales"
```
Understand: which fields are localized (in `_locales` table) vs non-localized (in main table). This determines where new columns go and how data copies.

**Also check the actual row data** — not just the schema. A column can exist in the schema with a `defaultValue` but have NULL in the DB if the global was never saved:
```bash
PGPASSWORD=... psql -h 127.0.0.1 -U cosmedic -d cosmedic -tA -c "SELECT field1, field2 FROM <table>_locales WHERE _locale='en';"
```

### Step 4 — Build the mapping table

Create a table: **Section | Field | Current source | Action**

Actions:
- `already visible ✓` — already in the destination, no change
- `expose (hidden)` — field exists but `hidden: true`, just remove that flag
- `move → dest.group` — merge from source global into destination
- `stays in Settings` — value from Settings, not duplicated

### Step 5 — Confirm 95% coverage in both directions

Check web → CMS: every web-rendered string has a CMS field.
Check CMS → web: every visible CMS field renders on the web.

If below 95%, find the gaps and add them before implementing. Common gaps:
- Section eyebrows (often hardcoded `|| 'Visit'`, `|| '8 Specialists'`)
- Form submit states (Sending…, Sent, Success message)
- Success/error messages after form submission
- CTA button labels (`Open in Maps`, `Get directions`)

### Step 6 — Implement

**a. Update destination global schema**
- Change `label` to the card name (e.g. `'Contact'` not `'Hero'`)
- Expose hidden fields: remove `hidden: true`
- Add sub-groups in page order (top to bottom)
- Add missing fields at correct positions within each sub-group
- Match field `name` and nesting to the path the web component already reads

**b. DB migration** — single transaction, always include ownership:
```sql
BEGIN;
-- Localized fields → _locales table
ALTER TABLE <dest>_locales ADD COLUMN IF NOT EXISTS <group>_<field> varchar;
-- Non-localized fields → main table
ALTER TABLE <dest> ADD COLUMN IF NOT EXISTS <group>_<field> varchar;
-- Array: create table + sequence + locales table
CREATE TABLE <dest>_<group>_<array> (_order int NOT NULL, _parent_id int NOT NULL REFERENCES <dest>(id) ON DELETE CASCADE, id varchar NOT NULL PRIMARY KEY, ...);
CREATE SEQUENCE <dest>_<group>_<array>_locales_id_seq;
CREATE TABLE <dest>_<group>_<array>_locales (id int NOT NULL PRIMARY KEY DEFAULT nextval('...'), _locale _locales NOT NULL, _parent_id varchar NOT NULL REFERENCES <dest>_<group>_<array>(id) ON DELETE CASCADE, UNIQUE (_locale, _parent_id), ...);
ALTER SEQUENCE ... OWNED BY ...id;
ALTER TABLE ... OWNER TO cosmedic;
COMMIT;
```

**c. Copy data from source globals**

For localized fields (source in `_locales` table):
```sql
UPDATE dest_locales d SET dest_field = s.source_field
FROM source_locales s WHERE d._locale = s._locale;
```
For non-localized fields (source in main table):
```sql
UPDATE dest SET dest_field = (SELECT source_field FROM source LIMIT 1);
```
For non-localized source → localized destination (source was never i18n'd, destination should be):
```sql
-- Copy the single value into the 'en' locale row only
UPDATE dest_locales SET dest_field = (SELECT source_field FROM source LIMIT 1)
WHERE _locale = 'en';
```
For arrays:
```sql
INSERT INTO dest_array SELECT ... FROM source_array;
INSERT INTO dest_array_locales SELECT ... FROM source_array_locales;
```

**d. Seed NULLs with schema defaults** — CRITICAL STEP

Payload stores NULL in the DB until a record is explicitly saved. Hidden globals are often never saved, so their locales tables contain NULLs even though the web shows correct text (Payload serves `defaultValue` at runtime). After copying, always seed NULLs with the schema default values so editors see real data, not empty fields:

```sql
UPDATE dest_locales SET
  field_name = COALESCE(field_name, 'default value from schema'),
  ...
WHERE _locale = 'en';
```
Rule: use `COALESCE` not plain assignment — never overwrite real editor data.

**e. Update web layer**
- Route component: `cms?.sourceGlobal` → `cms?.destGlobal?.group`
- `cms.cache.ts`: replace source fetch with `Promise.resolve({})` + comment explaining the merge
- `cms.types.ts`: extend destination type with new sub-group shape; use `depth=2` if global contains arrays
- Fix any field path mismatches: e.g. web reads `hero.title?.a` but CMS has `titleA` → update web path

**Multi-page globals — cache assembly pattern:**
If the source global feeds multiple pages (e.g. `libraryCta` used on both /results and /gallery), don't change every consumer. Instead, re-assemble the old cache key from the new merged location:
```ts
// In cms.cache.ts return object:
libraryCta: (resultsHero as any).libraryCta ?? {},
shareCta:   (resultsHero as any).share ?? {},
```
Secondary pages (`GalleryPage`, `StoriesPage`) keep reading `cms?.libraryCta` unchanged. Only the primary route needs updating.

**f. Hide source globals**
```ts
admin: {
  group: 'BucketName', // merged into dest-slug.group
  hidden: true,
```

### Step 7 — Verify end-to-end

1. Build: `pnpm --filter cms build && pnpm --filter web build`
2. Restart: `pm2 restart cosmedic-cms cosmedic-web`
3. Confirm API has all data: `curl "http://127.0.0.1:4007/api/globals/<slug>?locale=en&depth=2"`
4. Confirm no NULL fields: check key fields are populated in the API response
5. Confirm web route 200: `curl -o /dev/null -w "%{http_code}" http://127.0.0.1:3007/<path>`
6. Commit and push

---

## Payload DB Rules

| Schema | DB location | Column naming |
|---|---|---|
| Non-localized field | main table | `group_field` (snake_case) |
| Localized field | `_locales` table | `group_field` (snake_case) |
| Upload/relation field | main table | `group_field_id` (FK to media/collection) |
| Array field | new `_array` table | own table + `_locales` if any localized fields |
| Nested group `a.b.c` | same table | `a_b_c` |

**Zero-migration trick:** if the new group name + field name = existing column name in the SAME table, Payload reads/writes the existing column with no migration. Example: wrapping `caption` in group `team` → column `team_caption` already exists → no migration needed.

**Payload never migrates in production:** always write DDL manually and register in `payload_migrations` if needed. Never run `payload migrate` — it hangs.

**Ownership:** every new table, sequence, and index must be `OWNER TO cosmedic` or queries will fail.

---

## Common Pitfalls

| Pitfall | Cause | Fix |
|---|---|---|
| CMS fields empty after merge | Source global was never saved — DB has NULLs, schema has defaults | Seed with `COALESCE(field, 'default')` after copy |
| API returns "Something went wrong" | Column in schema not yet in DB | Check error log for the missing column name, add it |
| `depth=1` returns empty arrays | Array needs depth=2 to hydrate | Set `depth=2` in `cms.cache.ts` fetch call |
| Web shows fallback text after migration | Field path mismatch: web reads `hero.title?.a`, CMS has `titleA` | Fix the web path to match actual API response key |
| CMS data exists but web always shows fallback | Web path references a nested group that no longer exists in schema (e.g. `hero?.title?.a` but schema now has flat `titleA`) | Verify API response shape with `curl` — fix web to match actual returned keys |
| Source array was never saved | Hidden globals never get explicit DB rows | Seed with direct INSERT using schema default values |
| Non-localized group field missing | `mapImageLabel`, `eyebrow` etc. without `localized:true` go in main table | Add `ALTER TABLE <dest> ADD COLUMN` for non-localized fields |
| Mixed localized/non-localized in same global | Some fields in main table, some in locales — easy to miss if only checking one | Always run `\d` on BOTH main and locales tables in Step 3 |
| Transaction rollback on `CREATE TABLE` | Sequence referenced before creation | Create sequence first, then table, then `OWNED BY` |
| Locales table `UNIQUE` conflict on copy | Source has multiple locale rows, dest only has 'en' | Use `WHERE _locale = 'en'` and add 'id' locale separately |
| Secondary page breaks silently | Source global fed multiple pages — only primary route updated | Grep ALL web files for every source key; use cache assembly pattern for secondary consumers |
| Ghost groups in source | Source global had a sub-group that was never read by web (e.g. LibraryCta.share) | Verify every group/field in source against web reads before planning; drop ghost groups |
| Cache assembled from wrong source | Cache built `shareCta` from `libraryCta.share` (never the active source) | Always trace the cache return object, not just the fetch calls — verify which key the web actually reads |
| Hidden-by-design arrays still needed | Array content (e.g. inclusions) kept hidden but still rendered via fallback | Keep reading from legacy global key in cache; don't break the fallback path |

---

## Worked Examples

### Homepage (home-hero) — 7 globals → 1 card

Web sections in order: Hero → Treatment → Pricing → Team Card → Gallery → Lead Magnet → Stories → Place.

All 7 source globals (HomeTreatmentsView, HomePricingView, HomeSurgeonsView, HomeGalleryView, HomeLeadMagnet, HomeStoriesView, HomePlace) absorbed as named sub-groups into HomeHero. Source globals hidden.

~50 new columns in home_hero/home_hero_locales. home_hero_place_rows array table created.

Key gap found: 5 fields were hardcoded in web but missing from CMS plan — `surgeons.eyebrow`, `leadMagnet.coverEyebrow`, `bodyEyebrow`, `successHeading`, `successBody/fineprint`. Added and seeded.

**Result:** editors open one HOMEPAGE card and scroll through exactly the same sections as visitors.

### Contact (contact-hero) — 3 globals → 1 card

Web sections in order: Breadcrumb → Hero Image → Enquiry → Visit Us → Hours.

ContactEnquirySection absorbed into ContactHero.enquiry (27 localized fields). ContactVisitSection labels (clinicHoursLabel, conciergeHoursLabel, openInMapsLabel, getDirectionsLabel, eyebrow) absorbed into ContactHero.visitSection. contact_hero_enquiry_intent_copy array table created.

Key gap found: source globals were hidden and never explicitly saved — all locales tables had NULLs. After copying NULLs, seeded all 27+ fields with COALESCE defaults matching schema.

**Result:** editors open one CONTACT card with all editable content in page order and real data visible.

### Results (results-hero) — 5 globals → 1 card

Web sections in order: Breadcrumb → Hero Image → Featured Cases → Library CTA → Stories → Share Story.

ResultsFeaturedCasesView, ResultsStoriesView, LibraryCta, ShareCta absorbed into ResultsHero as sub-groups. All 4 source globals were already `hidden: true`. 19 new localized columns in results_hero_locales, 2 non-localized in results_hero. All source data was real (no NULL seeding needed).

Key learnings:
1. **Multi-page globals:** `libraryCta` was consumed by GalleryPage and `shareCta` by StoriesPage — not just ResultsPage. Grepping all web files caught this before it broke.
2. **Cache assembly pattern used:** `libraryCta: (resultsHero as any).libraryCta ?? {}` and `shareCta: (resultsHero as any).share ?? {}` preserved secondary page reads without changing GalleryPage/StoriesPage.
3. **Ghost group dropped:** LibraryCta had a `share` sub-group with duplicate share CTA data. The web never read from `libraryCta.share` — it always read from the separate `shareCta` global. Traced via cache return object, not just fetch calls.
4. **Non-localized source → localized destination:** ShareCta had no `localized: true` fields (data in main table). When merged into ResultsHero as localized fields, copy used `WHERE _locale = 'en'` to insert into locales table.

**Result:** editors open one RESULTS card. GalleryPage and StoriesPage continue to work unchanged via cache assembly.

### Journey (journey-hero) — 3 globals → 1 card, 2 pages

Web pages covered: `/journey` and `/recovery-stays`. Sections in order: /journey Breadcrumb → Hero → Stats / /recovery-stays Breadcrumb → Hero → Top Stats → Portfolio → What's Included.

JourneyStats absorbed into journey-hero.stats (array). RecoveryStaysPage absorbed into journey-hero.recoveryStays group. JourneyStats was already hidden; RecoveryStaysPage hidden after merge. 6 non-localized + 14 localized columns added. 2 new array tables (stats, recoveryStays.topStats).

Key learnings:
1. **Multi-page single card:** when a bucket covers two web pages, one card can hold both. Use a top-level group per page (`recoveryStays`) to keep the sections clearly separated within the same card.
2. **Flat field vs nested group path mismatch (silent):** JourneyHero had flat `titleA`/`titleB` fields but the web read `hero?.title?.a`. The CMS had real data but the web always showed hardcoded fallback text because the path was wrong. Caught only by verifying the API response shape with `curl` — not visible from schema alone.
3. **Mixed localized/non-localized in same source global:** `rec_stays_pg` had some fields (e.g. `portfolio_section_heading_pre`) in the main table and others in the locales table. Always run `\d` on BOTH tables in Step 3.
4. **Hidden arrays kept via legacy path:** inclusions array kept hidden by design. The web still reads from `cms.recoveryStaysPage.inclusions` — so `recoveryStaysPage` stays in the cache return object pointing to the old global (not hidden from cache, only from admin).

**Result:** editors open one JOURNEY card covering both pages. /journey and /recovery-stays both return 200.

### Experts (surgeons-hero) — already correct structure, fixes only

Two pages → two cards already existed (Experts + Detail Template). No merge needed. Hidden globals were already returning `Promise.resolve({})` in cache — a prior merge had been done at schema level but data path was broken.

Key learnings:
1. **Already-merged but broken:** SurgeonsHero already had the `sections` group with lead/plastic/aesthetic sub-groups, and the cache already returned `{}` for the 3 hidden globals. But the web read `heading?.a` (nested group) while the schema had flat `headingA`. Data existed in DB but was never rendered.
2. **Check the cache assembly, not just the schema:** the fact that the hidden globals returned `{}` was the clue that a prior merge had been attempted. Always trace the full fetch chain — source globals, cache, and web access path.
3. **Empty string ≠ NULL for COALESCE:** seeding with `COALESCE(field, 'default')` won't fill an existing empty string `''`. Use `WHERE field IS NULL OR field = ''` when the DB may have empty strings rather than NULLs.
4. **Template globals:** SurgeonDetailTemplate covers all `/experts/[slug]` pages (×8). One CMS record → shared chrome across every individual page of the same type. Same pattern as Blog Post Template for `/blog/[slug]`.

**Result:** heading data now reads from CMS instead of hardcoded fallbacks. Breadcrumb exposed.

### Publications — hidden → visible, hardcoded → CMS

4 globals: BlogPage, PressPage, PrivacyPage (all hidden) + BlogPostTemplate (visible). Pages accessed via `findPageBySlug` not direct CMS keys.

Key learnings:
1. **`findPageBySlug` pattern:** BlogPage, PressPage, PrivacyPage are fetched into a `pages` array in the cache and looked up by slug. Different from the direct `cms.globalKey` pattern used by all other buckets. Data is in `blog_page`, `press_page`, `privacy_page` DB tables.
2. **`pageFields` factory does NOT include imageLabel or breadcrumbLabel:** the shared `pageFields({ hideHero: true })` provides title, slug, route, chapterTitle, tagline, lede, heroImage, sections, SEO. Any additional page-specific fields (imageLabel, breadcrumbLabel, stats) must be added explicitly to each page global.
3. **Exposing hidden globals = just removing `hidden: true`:** when columns already exist and data is already there, no migration needed. The simplest case of the full reorg.
4. **Hardcoded arrays need their own table:** the Press stats row (4 tiles) was fully hardcoded — no CMS global or DB table. Adding a `topStats` array required creating `press_page_top_stats` table and seeding it with the current hardcoded values. Always seed immediately so editors see real data, not empty fields.
5. **Template globals (Blog Post Template, Surgeon Detail Template):** one CMS record controls shared chrome across all pages of the same type. Never merge these — they are correctly separate cards by design.

**Result:** Publications 4 cards, all at 95%. Blog imageLabel/breadcrumb, Press stats row + imageLabel/breadcrumb, Privacy breadcrumb — all now CMS-editable.
