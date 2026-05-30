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

### Step 2 — Read all current CMS globals for the bucket

Read every global file in `packages/cms/src/globals/` for that bucket. Note which are visible (`hidden: true` absent) vs hidden. List all visible fields per global.

### Step 3 — Check the DB structure

For each source global, inspect the actual table schema:
```bash
PGPASSWORD=... psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "\d <table_name>"
PGPASSWORD=... psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "\d <table_name>_locales"
```
Understand: which fields are localized (in `_locales` table) vs non-localized (in main table). This determines where new columns go and how data copies.

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

For localized fields:
```sql
UPDATE dest_locales d SET dest_field = s.source_field
FROM source_locales s WHERE d._locale = s._locale;
```
For non-localized:
```sql
UPDATE dest SET dest_field = (SELECT source_field FROM source LIMIT 1);
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
| Source array was never saved | Hidden globals never get explicit DB rows | Seed with direct INSERT using schema default values |
| Non-localized group field missing | `mapImageLabel`, `eyebrow` etc. without `localized:true` go in main table | Add `ALTER TABLE <dest> ADD COLUMN` for non-localized fields |
| Transaction rollback on `CREATE TABLE` | Sequence referenced before creation | Create sequence first, then table, then `OWNED BY` |
| Locales table `UNIQUE` conflict on copy | Source has multiple locale rows, dest only has 'en' | Use `WHERE _locale = 'en'` and add 'id' locale separately |

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
