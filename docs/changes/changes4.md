# Changes 4 — CMS Collection Restructure

> Date: 2026-05-26
> Status: PLANNED — ready to execute
> Author: Planning session with user

---

## Goal

Restructure the CMS admin sidebar so the Treatments and Pricing buckets map cleanly to the web mental model. Zero data loss. Zero frontend UI change. Full CRUD preserved on all collections.

---

## Target Structure — Four Column Depth

| Bucket | Collection | Category | Items |
|---|---|---|---|
| **Treatments** | Category | — | surgical · non-surgical · hair · dental · reconstructive · weight-loss |
| **Treatments** | Sub-Category | — | alignment · bariatric · body · breast ×2 · craniofacial · endoscopic · face · fue · glp-1 · injectables · laser · skin · therapy · trauma · veneers · whitening |
| **Treatments** | Procedure | dental | Clear alignment · Composite veneers · Dental scale · Express alignment · Full smile · Lingual · Minimal-prep veneers · Porcelain veneers · Whitening ×2 · Retainer (12) |
| **Treatments** | Procedure | hair | Beard restoration · Combined FUE+DHI · Combined therapy · DHI · Eyebrow restoration · PRP scalp · Polynucleotides scalp · Sapphire FUE · Topical protocol (9) |
| **Treatments** | Procedure | non-surgical | Acne protocol · Botulinum toxin · Chemical peel · Dermal fillers · Fractional laser · HydraFacial · IPL · Medical facial · PRP · Polynucleotides · Pre-event facial · Profhilo · RF Microneedling · Skin boosters · 3-session programme (15) |
| **Treatments** | Procedure | reconstructive | Burn reconstruction · Cleft ×3 · DIEP flap · Implant reconstruction ×2 · Keloid · Maxillofacial · Microtia · Nipple-areola · Orbital · Scar revision ×2 · Skin grafts · Symmetrising · TRAM flap (13) |
| **Treatments** | Procedure | surgical | Abdominoplasty · Body contouring · Brachioplasty · Breast lift · Breast reduction · Brow lift · Blepharoplasty · Facelift · Implant revision · Lift with implants · Lip lift · Liposculpture · Neck lift · Nipple · Rhinoplasty · Saline implants · Silicone implants · Thigh lift (18) |
| **Treatments** | Procedure | weight-loss | Dietitian · ESG · Endoscopic revision · GLP-1 · Intragastric balloon ×2 · Maintenance · Mini bypass · Revision bariatric · Roux-en-Y · Semaglutide · Sleeve gastrectomy · Tirzepatide (13) |
| **Pricing** | Surgical | Arm | Armlifting · Extended Armlifting |
| **Pricing** | Surgical | Body | Abdominoplasty · Mini Abdominoplasty · Lipo Abdominoplasty · Extended Tummy Tuck · Body Lift · Small Liposuction · Medium Liposuction · Large Liposuction · Extra Large Liposuction · Fat Injection/Graft · Lower Body Lift |
| **Pricing** | Surgical | Breast | Breast Augmentation with Implant · with Nipple Reduction · replace existing · Implant removal · Breast Lifting · Uplifting with Implant · Implant removal + lifting · Implant Exchange + lifting · Nipple Reduction |
| **Pricing** | Surgical | Eyelid | Blepharoplasty Upper only · Lower only · Upper or lower · Double Eyelid |
| **Pricing** | Surgical | Face & Neck | Necklifting · Mini Facelifting · Facelifting + Necklifting · Foreheadlifting · Neck Liposuction |
| **Pricing** | Surgical | Rhinoplasty | Rhinoplasty with Cartilage · Nose Tips/Dorsum with Cartilage |
| **Pricing** | Surgical | Others | Otoplasty · Labiaplasty · Vaginoplasty · Small Scar Revision · Medium Scar Revision · Big Scar Revision · Minor Surgery · Gynecomastia · Lobuloplasty |
| **Pricing** | Surgical | *(uncategorised)* | Standard recovery villa · Premium recovery villa · Family-friendly villa · Extended recovery · Daily in-villa nursing · Manual lymphatic drainage · Gentle physiotherapy · Post-op nutrition consult · Three-session drainage course |
| **Pricing** | Machine | Laser AFT Rejuvenation | Face · Neck/Lip · Face and Neck · Chest · Hands · Half Arm · Full Arm · Half Leg · Full Leg (×3 tiers each) |
| **Pricing** | Machine | Laser Erbium Resurfacing | Face · Neck · Chest · Eyes (×3 tiers each) |
| **Pricing** | Machine | Pixel Q-Switch Nd-Yag | Face · Neck · Face and Neck · Eyes · Chest · Spot (×2 tiers each) |
| **Pricing** | Machine | Pigmentation Removal | 2×2cm · Spot (×2 tiers each) |
| **Pricing** | Machine | Laser 360 | Combination AFT+Pixel+Erbium (×3 tiers) |
| **Pricing** | Machine | Tattoo Removal | per cm2 (×3 tiers) |
| **Pricing** | Machine | Vascular Laser | 2×2cm (×2 tiers) |
| **Pricing** | Injection | Filler | BOTOX · Frown Lines · Eyes · Forehead · Restylane Lyft · Restylane OBT · Teosyal ×3 · Juvederm ×5 · Radiesse · Profhilo · Nebido · Saizen · Aptos · Double fix · PRP · Chemical Peel · Acne Peel ×2 · Microdermabrasion · Flamicort · Hyaluronidase · Mesotherapy ×4 |
| **Pricing** | Injection | Skin Booster | Restylane Vital · Teosyal Redensity I · Juvederm Volite |
| **Pricing** | BTL | Face | Upper Lip · Chin · Chin and Upper Lip · Whisker · Ears · Cheek · Full Face · Full Face and Neck · Lower Face · Upper Face · Eyelift/Eyebrow Lift · Double Chin · Lower Face and Submental |
| **Pricing** | BTL | Body | Under Arm · Full Back · Half Back · Full Chest · Chest and Stomach · Tummy · Full Arm · Half Arm · Hands · Full Leg · Half Leg · Buttock · Bikini Brazilian · Bikini Line · Fingers/Toes/Spot |
| **Pricing** | BTL | Packages | Chest+Stomach+Full Back · Armpit+Full Leg+Brazilian · Bikini+Under Arm |
| **Pricing** | BTL | Skin Treatments | Pigmentation ×2 · Vascular ×2 · Acne ×2 · Rejuvenation ×2 · Spot/per area · Neck and Submental |

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
