# Changes 4 — CMS Collection Restructure

> Date: 2026-05-26
> Status: PLANNED — ready to execute
> Author: Planning session with user

---

## Goal

Restructure the CMS admin sidebar so the Treatments and Pricing buckets map cleanly to the web mental model. Zero data loss. Zero frontend UI change. Full CRUD preserved on all collections.

---

## Target Structure

| Bucket | Collection | Records | Content |
|---|---|---|---|
| **Treatments** | Category | 6 | surgical · non-surgical · hair · dental · reconstructive · weight-loss |
| **Treatments** | Sub-Category | 17 | alignment · bariatric · body · breast ×2 · craniofacial · endoscopic · face · fue · glp-1 · injectables · laser · skin · therapy · trauma · veneers · whitening |
| **Treatments** | Procedure | 84 | surgical editorial procedures |
| **Pricing** | Surgical | 51 | operations · reconstructions |
| **Pricing** | Machine | 63 | laser · RF · IPL treatments |
| **Pricing** | Injection | 34 | fillers · toxins · skin boosters |
| **Pricing** | BTL | 43 | hair removal by body zone |

---

## Changes Required

### Change 1 — Label rename: Disciplines → Category
- **File:** `packages/cms/src/collections/Disciplines.ts`
- **Change:** `labels: { singular: 'Category', plural: 'Categories' }`
- **Slug:** `disciplines` — unchanged
- **DB table:** `disciplines` — unchanged
- **Frontend:** no change
- **Risk:** zero

### Change 2 — Split ClinicCatalogueItems into 4 collections

**Current:** One collection `ClinicCatalogueItems` (191 records) with `catalogueGroup` field (surgical/machine/injection/btl).

**Target:** 4 separate collections, each in the Pricing bucket.

| New Collection | Slug | DB Table | Label | Records |
|---|---|---|---|---|
| SurgicalItems | `surgical-items` | `surgical_items` | Surgical | 51 |
| MachineItems | `machine-items` | `machine_items` | Machine | 63 |
| InjectionItems | `injection-items` | `injection_items` | Injection | 34 |
| BTLItems | `btl-items` | `btl_items` | BTL | 43 |

Each new collection carries the **full field set** from `ClinicCatalogueItems`:
- slug, name, shortName
- catalogueGroup (hardcoded per collection, hidden in admin)
- mainCategory, subCategory (text)
- unit, audienceTier
- brand, productLine, manufacturer, fdaApproved (Injection only)
- bodyZone (BTL only)
- parentDiscipline (relationship → disciplines)
- description (richText), sections (array), faqs (array)
- heroImage (upload → media)
- pricing group (priceIdr2025, priceIdr2026, priceIdrRangeLow, priceIdrRangeHigh, priceNotes, displayYear)
- featuredRank, includesImplant (Surgical only)
- detail group (duration, recovery, included)
- seo group
- sortOrder

---

## Execution Steps

### Step 1 — Create 4 new collection files
`packages/cms/src/collections/SurgicalItems.ts`
`packages/cms/src/collections/MachineItems.ts`
`packages/cms/src/collections/InjectionItems.ts`
`packages/cms/src/collections/BTLItems.ts`

### Step 2 — Register in payload.config.ts
Add 4 new collections. Keep `ClinicCatalogueItems` registered until data verified.

### Step 3 — DB: Create 4 new tables
Generate and apply Payload migration to create the 4 new tables with correct ownership (`cosmedic` role).

### Step 4 — Data migration
SQL insert from `clinic_catalogue_items` into each new table filtered by `catalogue_group`:
```sql
INSERT INTO surgical_items SELECT ... FROM clinic_catalogue_items WHERE catalogue_group = 'surgical';
INSERT INTO machine_items  SELECT ... FROM clinic_catalogue_items WHERE catalogue_group = 'machine';
INSERT INTO injection_items SELECT ... FROM clinic_catalogue_items WHERE catalogue_group = 'injection';
INSERT INTO btl_items      SELECT ... FROM clinic_catalogue_items WHERE catalogue_group = 'btl';
```
Verify counts: 51 + 63 + 34 + 43 = 191 before proceeding.

### Step 5 — Frontend: cms.cache.ts
Fetch from 4 new endpoints and merge into existing `clinicCatalogueItems` array:
- `GET /api/surgical-items`
- `GET /api/machine-items`
- `GET /api/injection-items`
- `GET /api/btl-items`
`ClinicCatalogueTable.tsx` — no change (already groups by `catalogueGroup`).

### Step 6 — Remove ClinicCatalogueItems
Unregister from `payload.config.ts`. Keep `clinic_catalogue_items` DB table as backup.

### Step 7 — Label rename
`Disciplines.ts` → `labels: { singular: 'Category', plural: 'Categories' }`

### Step 8 — Restart + verify
`pm2 restart cosmedic-cms cosmedic-web`
Smoke check: curl `/pricing` returns 200, all 191 items render.

---

## Guarantees

| Requirement | How |
|---|---|
| No data loss | Old `clinic_catalogue_items` table kept until Step 6 verified |
| No duplication | Records move, not copied |
| Frontend UI unchanged | `ClinicCatalogueTable.tsx` untouched — already groups by `catalogueGroup` |
| Full CRUD preserved | Each new collection has identical field set to original |
| Slugs/API unchanged | New slugs are additive; old removed only after frontend rewired |
