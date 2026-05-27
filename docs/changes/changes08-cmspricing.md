# changes08 — CMS Pricing Bucket Consolidation

> Authored: 2026-05-27  
> Goal: Eliminate the standalone Pricing bucket. All pricing-related admin items live under Treatments. Procedures collection is the single source of truth for all price data.

---

## Context

The Pricing bucket existed as a separate admin group containing both page-chrome globals (for `/pricing`) and 5 collections that duplicate fields already present on the `Procedures` collection. The `Procedures` collection in the Treatments bucket already holds every price row for every treatment type via its `catalogueGroup` field (`surgical` / `machine` / `injection` / `btl`).

This change consolidates everything so:
- All treatment + pricing admin items are under one bucket: **Treatments**
- `Procedures` is the single source of truth for all price data
- The Pricing bucket ceases to exist

---

## Workstream A — Move 9 Globals (zero risk, admin cosmetic)

**What changes:** `group: 'Pricing'` → `group: 'Treatments'` in 9 TypeScript files.  
**What does NOT change:** No DB schema, no data, no frontend code, no migrations.

### Files to edit

| File | Current label | New label | Notes |
|---|---|---|---|
| `src/globals/pages/PricingPage.ts` | Main | **Pricing: Page** | Rename to avoid collision with Treatments "Main" |
| `src/globals/pricing/PricingHero.ts` | Hero | **Pricing: Hero** | Rename to avoid collision with Treatments "Hero" |
| `src/globals/pricing/PricingOverview.ts` | Overview | Overview | Clean move — no collision |
| `src/globals/pricing/PricingFootnote.ts` | Footnote | Footnote | Clean move |
| `src/globals/pricing/PricingInsurance.ts` | Insurance | Insurance | Clean move |
| `src/globals/pricing/PricingPayment.ts` | Payment | Payment | Clean move |
| `src/globals/pricing/PricingCatalogueView.ts` | Catalogue View | Catalogue View | Clean move |
| `src/globals/pricing/PricingDisciplineListView.ts` | Discipline List View | Discipline List View | Clean move — different purpose from Treatments "Discipline Template" |
| `src/globals/ConsultationPolicy.ts` | Consultation | Consultation | Clean move |

### Treatments bucket after Workstream A

| # | Admin Label | Type |
|---|---|---|
| 1 | Main | Global |
| 2 | Hero | Global |
| 3 | Index | Global |
| 4 | Stats | Global |
| 5 | Discipline Template | Global |
| 6 | Sub-Category Template | Global |
| 7 | **Pricing: Page** | Global ← moved |
| 8 | **Pricing: Hero** | Global ← moved |
| 9 | **Overview** | Global ← moved |
| 10 | **Footnote** | Global ← moved |
| 11 | **Insurance** | Global ← moved |
| 12 | **Payment** | Global ← moved |
| 13 | **Catalogue View** | Global ← moved |
| 14 | **Discipline List View** | Global ← moved |
| 15 | **Consultation** | Global ← moved |
| 16 | Categories | Collection |
| 17 | Sub-Categories | Collection |
| 18 | Procedures | Collection ← sole pricing data source |

**Status: ⏳ Pending**

---

## Workstream B — Delete 5 Duplicate Collections

**What changes:** Unregister + delete 5 collection files; rewire web frontend to read from `Procedures`; drop 5 DB tables.  
**Risk:** Medium — frontend currently reads from these collections. Must rewire before dropping.

### Collections to delete

| Collection | File | DB table | Rows (approx) | Already in Procedures? |
|---|---|---|---|---|
| Surgical | `collections/SurgicalItems.ts` | `surgical_items` | ~41 | ✅ `catalogueGroup=surgical` |
| Machine | `collections/MachineItems.ts` | `machine_items` | ~24 | ✅ `catalogueGroup=machine` |
| Injection | `collections/InjectionItems.ts` | `injection_items` | ~34 | ✅ `catalogueGroup=injection` |
| BTL | `collections/BTLItems.ts` | `btl_items` | ~43 | ✅ `catalogueGroup=btl` |
| Clinic Catalogue Items | `collections/ClinicCatalogueItems.ts` | `clinic_catalogue_items` | ~149 | ✅ covered by above |

### Frontend files to rewire

| Web file | Currently reads from | Rewire to |
|---|---|---|
| `src/routes/pricing/ClinicCatalogueTable.tsx` | `cms.clinicCatalogueItems` | `cms.procedures` filtered by `catalogueGroup` |
| `src/routes/pricing/PricingPage.tsx` | May reference surgical/machine/injection/btl item types | `cms.procedures` filtered by `catalogueGroup` |
| `src/lib/cms.ts` | Fetches each collection separately | Remove separate fetches; `procedures` covers all |

### Execution order for Workstream B

1. **Audit** — query DB to confirm Procedures holds equivalent rows for each catalogueGroup
2. **Rewire web** — update `ClinicCatalogueTable.tsx` + `PricingPage.tsx` + `cms.ts` to read from Procedures
3. **Verify** — build + smoke-test `/pricing` renders all price tables correctly with correct IDR + AUD values
4. **Unregister** — remove imports + array entries from `payload.config.ts`
5. **Delete files** — remove the 5 `.ts` collection files
6. **Drop tables** — `DROP TABLE surgical_items, machine_items, injection_items, btl_items, clinic_catalogue_items CASCADE`
7. **CMS rebuild** — `pnpm --filter @cosmedic/cms build` + restart

**Status: ⏳ Pending**

---

## Overlap analysis (no false duplicates)

| Item | Looks similar to | Actually a duplicate? |
|---|---|---|
| Pricing: Hero | Treatments Hero | No — same fields, different page (`/pricing` vs `/treatments`) |
| Pricing: Page | Treatments Main | No — same fields, different page |
| Discipline List View | Discipline Template | No — Discipline Template = structure of `/treatments/{discipline}` pages; Discipline List View = display chrome for treatment list section on `/pricing` |
| Homepage → Pricing View | Pricing globals | No — Homepage Pricing View is the teaser block on `/`; stays in Homepage bucket |

---

## What is NOT changing

- `Procedures` collection fields — untouched
- All web routes — no URL changes
- Any existing CMS data — no overwrites
- Homepage → Pricing View global — stays in Homepage bucket (it's homepage content)
- `Settings.audToIdrRate` — exchange rate unchanged, stays in Settings (Homepage bucket)
