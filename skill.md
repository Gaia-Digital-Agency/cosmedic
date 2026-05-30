# Skill: CMS Mirror Web

**Purpose:** How to restructure a Payload CMS bucket so editors see the same structure as the web page they are editing.

---

## The Core Principle

**CMS card structure = web page section order, top to bottom.**

An editor should be able to scroll the live website and then open the CMS and find the exact same sections, in the exact same order. No mental mapping. No hunting across multiple cards.

---

## The 4 Rules

### 1. 95% similarity — content, sort position, flow

Every visible section on the web page must have a corresponding sub-group in the CMS card. The sub-groups must be in the same order the sections appear when scrolling the page. The field names inside each sub-group must match what the editor sees on screen.

- **Content:** every editorial string, image, and CTA visible to visitors is editable in CMS
- **Sort position:** sub-groups are ordered top-to-bottom matching the page
- **Flow:** section groupings match how a visitor reads the page

### 2. No CMS fields that are not on the web

Every field an editor can see in the CMS must render somewhere on the web page. Ghost fields — fields editors can edit but that never appear on the site — must be removed or hidden. Before shipping, audit each visible CMS field and confirm it has a corresponding render in the web component.

### 3. No web content that is hardcoded

Every string, image, eyebrow, label, placeholder, button state, and CTA visible to visitors must be editable in CMS. If the web component has a hardcoded fallback like `|| 'Some text'`, that fallback must have a corresponding CMS field. Audit web components for hardcoded fallbacks and add CMS fields for any that are missing.

### 4. No duplication of data

Each piece of data lives in exactly one place. When merging multiple globals into one card:
- Move fields into the destination global
- Hide the source globals (never delete — DB data is preserved)
- Update the web to read from the new path
- Fields that belong in Settings (phone, email, address, hours values) stay in Settings and are referenced, not duplicated

---

## Step-by-step Process

### Step 1 — Read the web page top to bottom

Open the web route component (e.g. `ContactPage.tsx`). List every visible section in render order. For each section note:
- What CMS global it reads from (`useCms()` → which key)
- What fields it accesses (look for `g?.fieldName || 'fallback'` patterns)
- Whether any fallbacks are hardcoded strings (Rule 3)

### Step 2 — Read all current CMS globals for the bucket

Read every global file in `packages/cms/src/globals/` for that bucket. Note which are visible vs hidden. List all visible fields.

### Step 3 — Check the DB

For each source global, check the table schema:
```bash
PGPASSWORD=... psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "\d <table_name>"
PGPASSWORD=... psql -h 127.0.0.1 -U cosmedic -d cosmedic -c "\d <table_name>_locales"
```
Understand: which fields are localized (in `_locales` table) vs non-localized (in main table).

### Step 4 — Build the mapping table

Create a table with columns: **Section | Field | Current source | Action**

Actions are:
- `already visible ✓` — field already in the destination global, no change
- `expose (hidden)` — field exists but `hidden: true`, just remove that flag
- `move → dest.group` — merge from source global into destination
- `stays in Settings` — value comes from Settings, not duplicated

### Step 5 — Confirm 95% coverage

Check both directions:
- CMS → Web: every visible CMS field renders on the web
- Web → CMS: every web string has a CMS field (no hardcoded fallbacks)

If coverage is below 95%, find the gaps and add them to the plan before implementing.

### Step 6 — Implement

**a. Update the destination global schema** (`packages/cms/src/globals/...`)
- Change `label` to the card name (e.g. `'Contact'` not `'Hero'`)
- Expose hidden fields (remove `hidden: true`)
- Add new sub-groups in page order
- Add missing fields at correct positions within each sub-group

**b. DB migration** — for each new field:
- Localized fields → `ALTER TABLE <dest>_locales ADD COLUMN IF NOT EXISTS <col> varchar`
- Non-localized fields → `ALTER TABLE <dest> ADD COLUMN IF NOT EXISTS <col> varchar`
- Array fields → create new `<dest>_<group>_<array>` and `<dest>_<group>_<array>_locales` tables

Run as a single transaction (`BEGIN; ... COMMIT;`). Always `OWNER TO cosmedic` on new tables/sequences.

**c. Copy data** — for each source global, copy into destination:
```sql
UPDATE dest_locales d SET dest_field = s.source_field
FROM source_locales s WHERE d._locale = s._locale;
-- For non-localized:
UPDATE dest SET dest_field = (SELECT source_field FROM source LIMIT 1);
-- For arrays: INSERT INTO dest_array SELECT ... FROM source_array;
```

**d. Update web layer**
- Route component: change `cms?.sourceGlobal` → `cms?.destGlobal?.group`
- `cms.cache.ts`: replace source global fetch with `Promise.resolve({})` + comment
- `cms.types.ts`: extend destination type with new sub-group shape; increase `depth` if arrays

**e. Hide source globals**
- Add `hidden: true` to `admin` in the source global file
- Add a comment: `// merged into dest-global.group`

### Step 7 — Verify

1. Build both packages: `pnpm --filter cms build && pnpm --filter web build`
2. Restart: `pm2 restart cosmedic-cms cosmedic-web`
3. Confirm API returns all new fields: `curl http://127.0.0.1:4007/api/globals/<slug>?locale=en&depth=2`
4. Confirm web route returns 200: `curl -o /dev/null -w "%{http_code}" http://127.0.0.1:3007/<path>`
5. Commit and push

---

## Common Pitfalls

| Pitfall | Fix |
|---|---|
| `payload migrate` hangs | Extract SQL, pipe to `psql --single-transaction -v ON_ERROR_STOP=1` |
| Column not found at runtime | Check schema — localized fields go in `_locales` table, non-localized in main table |
| Array table locales sequence missing | Create sequence first, then table, then `ALTER SEQUENCE OWNED BY` |
| Web reads `title?.a` but CMS has `titleA` | Fix the web path to match the actual API response field name |
| Source array was never saved to DB | Seed default values directly via psql INSERT |
| `depth=1` misses array content | Use `depth=2` in `cms.cache.ts` when the global contains arrays |
| New non-localized group fields missing from main table | Check if `mapImageLabel`, `mapImageHue`, `eyebrow` (non-localized) need columns in main table |

---

## Example: What was done

### Homepage (home-hero)
7 globals → 1 card. Web sections in order: Hero → Treatment → Pricing → Team Card → Gallery → Lead Magnet → Stories → Place.

All 7 source globals absorbed as sub-groups into HomeHero. Source globals hidden. ~50 new columns added to home_hero / home_hero_locales. home_hero_place_rows array table created.

**Result:** editors open one HOMEPAGE card and scroll through the same sections as visitors.

### Contact (contact-hero)
3 globals → 1 card. Web sections in order: Breadcrumb → Hero Image → Enquiry → Visit Us → Hours.

ContactEnquirySection absorbed into ContactHero.enquiry. ContactVisitSection labels absorbed into ContactHero.visitSection. ~31 new columns in contact_hero_locales. contact_hero_enquiry_intent_copy array table created.

**Result:** editors open one CONTACT card and see all editable content in page order.
