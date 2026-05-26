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

## Execution Status

| # | Task | File(s) | Status |
|---|---|---|---|
| 1 | Rename Disciplines label → Category | `collections/Disciplines.ts` | ✅ Done |
| 2 | Create SurgicalItems.ts | `collections/SurgicalItems.ts` | ✅ Done |
| 3 | Create MachineItems.ts | `collections/MachineItems.ts` | ✅ Done |
| 4 | Create InjectionItems.ts | `collections/InjectionItems.ts` | ✅ Done |
| 5 | Create BTLItems.ts | `collections/BTLItems.ts` | ✅ Done |
| 6 | Register 4 collections in payload.config.ts | `payload.config.ts` | ✅ Done |
| 7 | DB migration — 4 new tables created | psql | ✅ Done |
| 8 | Data migration — 191 records moved | psql | ✅ Done |
| 9 | Verify counts 51+63+34+43=191 | psql | ✅ Done |
| 10 | Update cms.cache.ts — fetch from 4 endpoints | `web/src/lib/cms.cache.ts` | ✅ Done |
| 11 | Unregister ClinicCatalogueItems | `payload.config.ts` | ✅ Done |
| 12 | Restart + smoke check | pm2 + curl | ✅ Done |

---

## Guarantees

| Requirement | How |
|---|---|
| No data loss | Old `clinic_catalogue_items` table kept until Step 6 verified |
| No duplication | Records move, not copied |
| Frontend UI unchanged | `ClinicCatalogueTable.tsx` data shape unchanged — accordion is purely visual |
| Full CRUD preserved | Each new collection has identical field set to original |
| Slugs/API unchanged | New slugs are additive; old removed only after frontend rewired |

---

## Phase 2 — Pricing Page Accordion UI

> Status: PLANNED — pending execution approval
> Scope: `/pricing` page only. No data change. No CMS change. No other page affected.

### Goal

Replace flat price tables and flat wellness rows on `/pricing` with collapsible accordions at the category level. Page loads clean (all closed); editor opens only what they need.

### Page Structure After Change

```
Hero
Overview
──────────────────────────────────
CLINIC                              ← section heading (new)
  SURGICAL PROCEDURES               ← sheet header, always visible
    + Face & Neck                   ← accordion, closed by default
        Necklifting · Mini Facelifting · Facelifting + Necklifting · ...
    + Body
    + Breast
    + Eyelid
    + Rhinoplasty
    + Others
    + (uncategorised)
  MACHINE TREATMENTS
    + Laser AFT Rejuvenation
    + Laser Erbium Resurfacing
    + Pixel Q-Switch Nd-Yag
    + Pigmentation Removal
    + Laser 360
    + Tattoo Removal
    + Vascular Laser
  INJECTABLE CATALOGUE
    + Dermal Fillers
    + Skin Boosters
  BTL HAIR REMOVAL
    + Face
    + Body
    + Packages
    + Skin Treatments
──────────────────────────────────
WELLNESS                            ← section heading (new)
  SURGICAL                          ← discipline header, always visible
    + Face (sub-category)           ← accordion, closed by default
        Rhinoplasty · Facelift · ...
    + Body
    + Breast
  NON-SURGICAL
    + Injectables · Laser & Skin · ...
  HAIR · DENTAL · RECONSTRUCTIVE · WEIGHT-LOSS
    + (sub-categories per discipline)
──────────────────────────────────
Footnote
Insurance + Payment
```

### Files Changed

| File | Change |
|---|---|
| `packages/web/src/routes/pricing/ClinicCatalogueTable.tsx` | Add `openCategories` state (`Set<string>`). `mainCategory` headers become `<button>` toggles. Rows wrap in collapsible `<div>`. |
| `packages/web/src/routes/pricing/PricingPage.tsx` | Add `openSubCategories` state (`Set<string>`). Sub-category `h3` headers become `<button>` toggles. Treatment rows wrap in collapsible `<div>`. |

### State Design

**CLINIC (`ClinicCatalogueTable.tsx`)**
- State: `const [open, setOpen] = useState<Set<string>>(new Set())`
- Key per accordion: `` `${catalogueGroup}__${mainCategory}` `` (e.g. `surgical__Face & Neck`)
- Toggle: `setOpen(prev => { const s = new Set(prev); s.has(k) ? s.delete(k) : s.add(k); return s })`
- Default: empty Set — all closed

**WELLNESS (`PricingPage.tsx`)**
- State: `const [openSubs, setOpenSubs] = useState<Set<string>>(new Set())`
- Key per accordion: `` `${disciplineSlug}__${subSlug}` `` (e.g. `surgical__face`)
- Default: empty Set — all closed

### Accordion Header Design

```
┌─────────────────────────────────────────┐
│ Face & Neck                          +  │  ← closed
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Body                                 −  │  ← open
│   Abdominoplasty         Rp 45,000,000  │
│   Mini Abdominoplasty    Rp 32,000,000  │
│   ...                                   │
└─────────────────────────────────────────┘
```

- Header: full-width `<button>`, `cursor: pointer`, bottom border only
- Label: serif font, existing heading style
- Toggle icon: `+` (closed) / `−` (open), right-aligned, mono font
- Rows: wrapped in `<div style={{ overflow: 'hidden', maxHeight: open ? 9999 : 0, transition: 'max-height 220ms ease' }}>`

### No-Change Guarantees

| | |
|---|---|
| Price data | All IDR/AUD values, notes, badges unchanged |
| Row layout | `TableRow` component untouched |
| CMS wiring | No fetch changes — accordion is pure render state |
| Other pages | Zero impact outside `/pricing` |
| Mobile | Accordions improve mobile UX (less scroll) |

### Execution Tasks (Phase 2)

| # | Task | File |
|---|---|---|
| 13 | Add accordion to ClinicCatalogueTable.tsx (CLINIC section) | `ClinicCatalogueTable.tsx` |
| 14 | Add accordion to PricingPage.tsx (WELLNESS section) | `PricingPage.tsx` |
| 15 | Add CLINIC / WELLNESS section headings | `PricingPage.tsx` |
| 16 | Smoke check `/pricing` — all rows still render, accordions open/close | browser |
