# Cosmedic — DB Change Log

> Running record of all database health checks, audits, cleanups, and schema changes outside the normal Payload migration pipeline. Most recent entry first.

---

## 2026-05-27 — DB Health Audit + Orphan Cleanup

**Performed by:** Claude Code session (azlan)
**DB:** `cosmedic` on `127.0.0.1:5432`
**Total tables before:** 425 → **after:** 405 (−20)

### What was checked

| Check | Result |
|---|---|
| Total tables | 425 |
| FK violations (orphan rows) | ✅ 0 found |
| Invalid/unvalidated constraints | ✅ 0 found |
| Sequence vs MAX(id) drift | ✅ All sequences ahead of or equal to max ID |
| Duplicate slugs | ⚠️ `sub_categories.slug = 'breast'` ×2 — **by design** (different parent disciplines: `surgical` + `reconstructive`; URL is `/treatments/{discipline}/{sub}` so they are distinct routes) |
| Backup/temp/orphan tables | 3 items found — see Drops below |
| Orphaned enum types | 1 found — see Drops below |
| Dead rows | 58 tables with dead rows (stale autovacuum stats) — cleared by VACUUM ANALYZE |
| Tables with 0 live rows in pg_stat | 16 tables — **false alarm**, stale stats only; actual COUNT(*) confirmed data present in all |
| DB total size | 39 MB |

### VACUUM ANALYZE

Ran `VACUUM ANALYZE` on full DB. All dead rows cleared. `pg_stat_user_tables` stats refreshed.
All 58 tables that showed dead rows are now clean.

> Cascade warning during VACUUM: `permission denied to vacuum pg_authid` etc. — expected; `cosmedic` role only owns the `public` schema objects.

---

### Drops performed

#### 1. `procedures_backup_25_13c` — manual backup table

- **275 rows**; created during CR25May change 25.13c (IDR/AUD currency toggle on treatment detail pages)
- No references in any `.ts` / `.tsx` / `.json` source file
- Not registered as a Payload collection
- **Dropped:** `DROP TABLE procedures_backup_25_13c`

#### 2. `enum_settings_currency_display_mode` — orphaned enum type

- Values: `idr-only` | `idr-with-aud`
- Created in migration `20260520_123550_phase_6_catalogue` as part of `Settings.currency_display_mode` field
- Field removed from `packages/cms/src/globals/Settings.ts` in CR25May 25.17 (confirmed by comment: *"currencyDisplayMode removed 25.17 — was dead code; PriceTag switches on aud_to_idr_rate"*)
- No column in any table references this type
- No code in `packages/web/src/` or `packages/cms/src/` consumes `currencyDisplayMode`
- Only appears in historical migration `.json` snapshots (read-only, never re-run)
- **Dropped:** `DROP TYPE enum_settings_currency_display_mode`

#### 3. `pages` + 18 `pages_blocks_*` sub-tables — retired collection

Tables dropped (19 total):

```
pages
pages_blocks_ba_grid
pages_blocks_contact_form
pages_blocks_cta_band
pages_blocks_external_embed
pages_blocks_faq_accordion
pages_blocks_faq_accordion_items
pages_blocks_image_grid
pages_blocks_image_grid_images
pages_blocks_journey_step_list
pages_blocks_notes
pages_blocks_press_mention_list
pages_blocks_procedure_list
pages_blocks_recovery_stay_list
pages_blocks_rich_text
pages_blocks_stats
pages_blocks_stats_items
pages_blocks_surgeon_list
pages_blocks_testimonial_list
```

- `pages` had **8 rows** — backup copy of data migrated to 14 Page Globals in `20260522_072509_pages_to_globals` (2026-05-22)
- `Pages` collection unregistered from `payload.config.ts` in commit `a17f6d9` (2026-05-24); `/api/pages` confirmed 404 before drop
- All 8 rows previously migrated to individual Page Globals via `migrate-pages-to-globals.ts` (verified at migration time: migrated=8, skipped=0, errors=0)
- No references to `pages_blocks_*` in any `.ts` / `.tsx` source file
- `cms.pages` in web (`packages/web/src/lib/`) reads from the 14 Page Globals, not this table
- **Cascade note:** `DROP TABLE pages CASCADE` removed a dead FK `payload_locked_documents_rels_pages_fk` on `payload_locked_documents_rels` — expected; the Pages collection was already unregistered so this FK was unreachable
- **Dropped:** `DROP TABLE ... CASCADE` (all 19 tables in one transaction)

---

### Post-drop verification

#### DB integrity
- `payload_locked_documents_rels` — intact, COUNT = 0 ✅
- CMS `/api/globals/settings` — 200 ✅
- Web homepage — 200 ✅

#### Full route sweep — 52/52 × 200 OK

| Category | Routes tested | Result |
|---|---|---|
| Homepage | `/` | ✅ 200 |
| Treatments index | `/treatments` | ✅ 200 |
| Discipline pages (6) | `/treatments/surgical` · `/treatments/reconstructive` · `/treatments/non-surgical` · `/treatments/hair` · `/treatments/dental` · `/treatments/weight-loss` | ✅ 200 all |
| Sub-category pages (17) | `surgical/face` · `surgical/body` · `surgical/breast` · `reconstructive/breast` · `reconstructive/trauma` · `reconstructive/craniofacial` · `non-surgical/injectables` · `non-surgical/laser` · `non-surgical/skin` · `hair/fue` · `hair/therapy` · `dental/veneers` · `dental/alignment` · `dental/whitening` · `weight-loss/glp-1` · `weight-loss/endoscopic` · `weight-loss/bariatric` | ✅ 200 all |
| Surgeons index | `/surgeons` | ✅ 200 |
| Surgeon detail (8) | `/surgeons/suka` · `astri` · `indra` · `wara` · `sissy` · `rosa` · `risma` · `theresia` | ✅ 200 all |
| Results / Gallery / Stories | `/results` · `/gallery` · `/stories` | ✅ 200 all |
| Journey / Pricing / Recovery | `/journey` · `/pricing` · `/recovery-stays` | ✅ 200 all |
| Press / Contact / Video / Blog | `/press` · `/contact` · `/video-consult` · `/blog` | ✅ 200 all |
| Blog posts (7) | `the-quiet-rhinoplasty` · `before-you-fly` · `the-villa-protocol` · `fillers-restraint` · `achsi-what-it-means` · `crani-bali` · `dental-veneers-honesty` | ✅ 200 all |
| Privacy | `/privacy` | ✅ 200 |

#### 301 redirects (5 sampled) — all correct
- `/treatments/surgical-face` → `/treatments/surgical/face` ✅
- `/treatments/breast` → `/treatments/surgical/breast` ✅
- `/treatments/injectables` → `/treatments/non-surgical/injectables` ✅
- `/treatments/recovery` → `/treatments/weight-loss` ✅
- `/treatments/weight-loss-surgical` → `/treatments/weight-loss/bariatric` ✅

#### 404 handling (5 sampled)
- `/treatments/fake-discipline` ✅ 404
- `/treatments/surgical/fake-sub` ✅ 404
- `/surgeons/fake-surgeon` ✅ 404
- `/blog/fake-post` ✅ 404
- `/nonexistent-page` ✅ 404

#### CMS admin
- `http://127.0.0.1:4007/admin` — 200 ✅

---

### Notes / known informational items

1. **Migration disk vs DB mismatch (informational, no action needed):**
   Ten migration registrations exist in `payload_migrations` with no corresponding `.ts` file on disk — these were applied directly via `psql --single-transaction` (documented Payload workaround for large migrations that hang in the JS runner). Schema is correct; Payload will not re-run them. The missing files are:
   `20260523_062500_phase_c7_pricing_a2`, `20260523_065500_phase_c9a_procedures_catalogue`, `20260525_120000_footer_atoms_coverage`, `20260525_130000_settings_clinic_enquiry_email`, `20260525_150000_home_place_image`, `20260526_000000_add_27_28_29_fields`, `20260526_000000_changes4_split_pricing_collections`, `20260526_analytics`, `20260526_clinic_catalogue_items_locked_docs_rels`, `20260523_055554_phase_c6_homepage_a2` (has `.json` only).

2. **`payload_folders` / `payload_folders_folder_type` (0 rows, harmless):**
   Payload 3.x built-in tables for the media folder feature. Created automatically by Payload, not used by this project. Not dropped — managed by Payload core, not safe to remove manually.

3. **`payload-types.ts` has stale `currencyDisplayMode` type entry:**
   `packages/cms/src/payload-types.ts` still contains `currencyDisplayMode?: ('idr-only' | 'idr-with-aud') | null`. This is a leftover from before 25.17. It is not consumed by any code and will be overwritten next time `pnpm --filter @cosmedic/cms generate:types` is run. No functional impact.
