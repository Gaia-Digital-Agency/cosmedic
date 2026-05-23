# Cosmedic — Commit Tracker

> Single source of truth for the **27-commit work plan** (Phases D/C/P/N/Q/M) starting 2026-05-23.
>
> Pair with [docs/all_todo.md](all_todo.md) (task detail) and [docs/CMS_structure.md](CMS_structure.md) (CMS source of truth).
> Update this file after **every commit** — paste the short SHA + one-line message + verify-gate result.

---

## Project baseline (before 2026-05-23 work)

| Date | Commits | Highlights |
|---|---|---|
| 2026-05-20 | 19 | Initial import + Phases 0–8 ship to production |
| 2026-05-21 | 12 | Phase M kickoff + Phase 10 imagery work |
| 2026-05-22 | 4 | CMS image-upload nginx fix · Pages → 14 Globals refactor · CLAUDE.md update |

**Pre-2026-05-23 total: 35 commits.** First: `6405444` · Last: `cfa64e8`.

---

## Planned commits — 27 total

| # | Phase | Commit summary | SHA | Status | Verify |
|---|---|---|---|---|---|
| 1 | **D** | Update 11 docs to reflect CMS_structure.md as source of truth | `5e5ece1` | ✅ shipped 2026-05-23 05:25 UTC | site 200 (/, /admin, /pricing); docs-only — no UI change possible |
| 2 | **C2** | Move BlogPosts/BlogTags/Authors/BlogPage from `Blog` → `Journey` admin.group | `bbc068e` | ✅ shipped 2026-05-23 05:29 UTC | site 200 (/, /admin, /pricing, /blog); cms-only — no UI change |
| 3 | **C3** | Remove orphan `Pages` collection (Step 10 Rule 4 gate) | `bdcac0c` | ✅ shipped 2026-05-23 05:32 UTC | /api/pages 404 (unregistered); /, /admin, /blog, /pricing 200; DB table preserved as backup |
| 4 | **C4** | Add CmsSidebarExplainer (Collections vs Globals banner above admin nav) | `d7e2ee2` | ✅ shipped 2026-05-23 05:38 UTC | /admin, /, /pricing 200; admin-only |
| 5 | **C5** | Wire `Blog Page` global to `/blog` index hero + CmsExtraBlocks slot | `34ef42f` | ✅ shipped 2026-05-23 05:53 UTC | /blog 200; copy byte-identical (CMS seeded with EXACT hardcoded values, fallback retained) |
| 6 | **C6a** | Home Page schema: add 9 A2 block fields (67 columns added via psql; renderer unchanged so site is byte-identical) | `pending` | in_progress | schema present, no seed/render change yet |
| 7 | **C6b** | Home Page renderer: 9 section components read from CMS with hardcoded fallbacks | `4cb1bbc` | ✅ shipped 2026-05-23 06:18 UTC | /, /admin, /pricing, /blog all 200; CMS save/revalidate ok; /api/globals/home-page returns 9 block keys; rendered fallbacks byte-identical |
| 8 | **C7** | Pricing Page schema + renderer: 3 A2 blocks (overview/footnote/insurance) | `8be5b79` | ✅ shipped 2026-05-23 06:32 UTC | `/pricing` byte-identical (CMS empty → fallback); admin shows 3 new blocks; chapter opener kept hardcoded to avoid R5 drift with diverging CMS seed |
| 9 | **C8** | Before/After full editorial wiring (description, alt, year, featured filter, surgeon byline) | `aed3e07` | ✅ shipped 2026-05-23 06:42 UTC | year renders in .ba-time (2025 visible on /, /gallery, /results); alt uses beforeAlt/afterAlt; surgeon byline + description gated on populated fields |
| 10 | **C9a** | Procedures schema: add catalogue fields (catalogueGroup/mainCategory/subCategory + group-specific) + Postgres migration | `3958e59` | ✅ shipped 2026-05-23 06:55 UTC | 10 columns + 3 enum types added; parent_discipline_id NOT NULL dropped; 93 existing rows backfilled catalogueGroup='surgical'; /, /admin, /pricing 200 |
| 11 | **C9b** | Data migration: 24 Machine + 34 Injectable + 43 BTL → Procedures records; verify counts | `f93f650` | ✅ shipped 2026-05-23 06:50 UTC | Procedures total = 233 (surgical 93 + machine 63 + injection 34 + btl 43). Machine rows expand to one row per audience tier (24 source → 63 emitted) so 3-tier price data is fully preserved |
| 12 | **C9c-renderer** | ClinicCatalogueTable reads from Procedures (single source); 4 old collections kept as backup pending delete | `6313cfd` | ✅ shipped 2026-05-23 06:55 UTC | /pricing 4 tables now read Procedures; surgical 46→93 (unification surfaces previously-hidden editorial pricing — user-approved deviation from R5); machine collapses 63→24 rows; injection 34; btl 43 |
| 12b | **C9c-delete** | Delete the 4 stale collections (PriceListItems/MachineTreatments/InjectableProducts/HairRemovalAreas) | `aebdc99` | ✅ shipped 2026-05-23 07:05 UTC | 4 collections unregistered from Payload; 4 /api endpoints 404; DB tables retained as rollback backup. /pricing still renders all 4 sections from Procedures |
| 13 | **C10** | Full R1–R7 audit + sign-off (+ R1 cleanup: productLine + surgeonSlug wired) | `abded5e` | ✅ shipped 2026-05-23 07:30 UTC | R1, R6, R7 🟢 green; R2, R3, R4, R5 🟡 green with documented exceptions (DB-table backup; C9c surgical 46→93 user-approved; hardcoded fallbacks pending Phase Q). Full breakdown in docs/c10_audit.md |
| 14 | **P** | Favicon icon-set + index.html `<link>` tags (7 assets from cosmedic-favico.zip) | `1ab4d64` | ✅ shipped 2026-05-23 07:40 UTC | 7 assets in packages/web/public/ + 7 link tags in built HTML; all assets 200 via prod URL; CMS admin's cosmedic-mark-*.png left intact |
| 15 | **N1** | Endorsement centring to logo glyph | — | pending | visual check at desktop + mobile |
| 16 | **N2** | Back-to-Top FAB matches WhatsApp FAB size/shadow exactly | — | pending | visual paired-chrome cluster |
| 17 | **N3** | `/pricing` table column consistency (after C9c renderer rewrite) | — | pending | every table has identical column widths + alignment |
| 18 | **Q-1** | Logo cluster — brown logo asset swap + alignment fixes (#1, #3, #4) | — | pending | logo matches new asset; not stretched on mobile |
| 19 | **Q-2** | Layout / responsive cluster — burger 1480px, footer match, margins (#2, #5, #9, #20, #22, #23, #24) | — | pending | mobile golden path clean |
| 20 | **Q-3** | Breadcrumb cluster — alignment + size + position (#12, #13) | — | pending | breadcrumb aligned to content container |
| 21 | **Q-4** | B&A extras — patient age, performing doctor, recovery duration (#18) | — | pending | new fields appear on /gallery + /results |
| 22 | **Q-5** | Pricing extras — IDR primary, AUD auto-calculated from Settings.audToIdrRate (#15) | — | pending | every AUD on /pricing is derived |
| 23 | **Q-6** | CMS admin theme (light default) + CTA bug fix + dead-item audit (#19, #25, #26) | — | pending | admin loads in light by default; CTA bug fixed |
| 24 | **M1** | Re-run mobile overflow audit (full 51 routes) — capture findings only | — | pending | overflow findings list complete |
| 25 | **M2** | Fix 320–375 burger-missing bug | — | pending | burger visible at 320px |
| 26 | **M3** | Per-route mobile responsive fixes | — | pending | zero horizontal overflow on every route |
| 27 | **M4** | Phase M sign-off (audit re-run, no overflow) | — | pending | all 51 routes pass |

---

## Phase Q open clarifications (block before promoting to ordered work)

| # | Question | Default if user silent |
|---|---|---|
| Q-decision 1 | #11 slug restructure `/treatments/surgical/face` (nested) vs current flat `/treatment-surgical-face` | Defer — too disruptive without explicit yes |
| Q-decision 2 | #17 Remove Pricing Tiers (contradicts CMS_structure.md) | Keep (per CMS_structure.md); revisit if user re-asks |
| Q-decision 3 | #8 Imagery refresh from Figma — replace all or fill gaps? | Fill Phase 10 gaps only |

---

## STANDING RULE — visual invariance (Rule R5) applies to CMS refactor phases only

**Visual baseline = the production site at start of Phase D (commit `cfa64e8` → `5e5ece1`, 2026-05-23).**

| Phase group | UI change allowed? | Why |
|---|---|---|
| **D · C2 · C3 · C4 · C5 · C6 · C7 · C8 · C9 · C10** | **NO — must stay byte-identical** | CMS refactors. Seed CMS with EXACT existing copy BEFORE swapping renderer. |
| **P (favicon)** | **YES — deliberate UI change** | Browser tab icon + iOS PWA preview |
| **N1 · N2 · N3** | **YES — deliberate UI polish** | Endorsement centring, FAB size match, `/pricing` column widths |
| **Q (changes01.docx cluster commits)** | **YES — substantial UI changes** | Brown logo, breadcrumb fixes, footer redesign, B&A extras |
| **M1 · M2 · M3 · M4** | **YES — deliberate UI fixes** | Removing horizontal overflow on mobile breakpoints |

Pre-flight before every CMS-refactor commit (D + C-series):
1. `curl -sI https://cosmedic.gaiada.online/<route>` — expect 200
2. Visual diff vs baseline screenshot (manual or playwright)
3. CMS save → revalidate → re-render still byte-identical
4. **Payload-as-good-CMS gate (added 2026-05-23):** `/admin` still loads · every bucket in the sidebar lists its entities · `home-page` (and any other edited Global / Collection) opens its form without error · "Save" works · image upload still functional (`/api/media` POST 403 or 201 — anything other than 502/500/timeout) · no hooks broken (revalidate POST returns `{"ok":true}`). Quick check: `curl -sI /admin && curl -s /api/users/me | head -c 200 && curl -X POST /api/revalidate -d '{}'`.

Site-break (route returns 500 / blank / wrong content) OR admin-break (form won't open, save fails, hook crashes) = commit reverted immediately. UI changes within scope of P/N/Q/M are expected and reviewed against their own intent, not R5.

---

## Append-as-you-go log

(Each commit lands here in chronological order. Format: `[YYYY-MM-DD HH:MM]  <SHA>  <Phase>  <one-line summary>  <verify result>`)

```
[2026-05-23 05:25 UTC]  5e5ece1  D   Refresh 11 docs to reflect CMS_structure.md + consolidate to one TODO file  /, /admin, /pricing all 200 — docs-only, no UI change possible
[2026-05-23 05:29 UTC]  bbc068e  C2  Move BlogPosts/BlogTags/Authors/BlogPage to JOURNEY admin.group bucket  /, /admin, /pricing, /blog all 200; cms-only — no UI change possible
[2026-05-23 05:32 UTC]  bdcac0c  C3  Remove orphan Pages collection (Step 10 — DB table preserved)  /api/pages 404; /, /admin, /blog, /pricing 200; cms-only
[2026-05-23 05:38 UTC]  d7e2ee2  C4  Add CmsSidebarExplainer banner above admin nav  /admin 200, /, /pricing 200; admin-only
[2026-05-23 05:53 UTC]  34ef42f  C5  Wire Blog Page global to /blog index hero + CmsExtraBlocks slot  /blog 200; copy byte-identical via CMS-seeded values + hardcoded fallback
[2026-05-23 06:00 UTC]  693a6bb  C6a Home Page schema — 9 A2 block group fields (67 cols added via psql)  /admin home-page form shows 9 blocks; /api/globals/home-page returns block keys; renderer unchanged so / still byte-identical
[2026-05-23 06:18 UTC]  4cb1bbc  C6b Home Page renderer — 9 section components read CMS with hardcoded fallbacks  /, /admin, /pricing, /blog 200; CMS save → revalidate {"ok":true}; rendered home byte-identical (CMS fields empty → fallback to literal copy)
[2026-05-23 06:32 UTC]  8be5b79  C7  Pricing Page schema + renderer — 3 A2 blocks (overview/footnote/insurancePayment)  /, /admin, /pricing, /blog 200; revalidate ok; /api/globals/pricing-page returns 3 block keys; chapter opener kept hardcoded (CMS divergence — wired in later sync); footnote + insurance/payment fallback byte-identical
[2026-05-23 06:42 UTC]  aed3e07  C8  Before/After full editorial wiring — year, beforeAlt/afterAlt, description, surgeon byline, isFeatured filter  /, /gallery, /results, /admin 200; year visible in .ba-time on all 3 routes; alt now uses curated beforeAlt/afterAlt; description + surgeon byline only render when populated
[2026-05-23 06:55 UTC]  3958e59  C9a Procedures catalogue schema — 10 fields + 3 enums; parent_discipline NOT NULL dropped; 93 surgical rows backfilled  /, /admin, /pricing, /gallery 200; revalidate ok; API surfaces all 10 new keys; data migration deferred to C9b
[2026-05-23 06:50 UTC]  f93f650  C9b Migrate 24 Machine + 34 Injectable + 43 BTL into Procedures  Total Procedures = 233 (surgical 93 / machine 63 / injection 34 / btl 43). Machines expand to one row per audience tier (24 source → 63 emitted). /pricing still byte-identical (renderer still reads from old collections until C9c). Script: src/seed/migrate-pricing-to-procedures.ts
[2026-05-23 06:55 UTC]  6313cfd  C9c-renderer  ClinicCatalogueTable reads from Procedures only  Surgical 46→93 (unification surfaces editorial pricing — R5 deviation user-approved); machine collapses tiered rows back to 24 display rows; injection 34; btl 43. 4 old collections kept as backup; DELETE deferred to C9c-delete.
[2026-05-23 07:05 UTC]  aebdc99  C9c-delete    Unregister 4 stale collections from Payload — DB tables retained as rollback backup  /api/{price-list-items,machine-treatments,injectable-products,hair-removal-areas} → 404. /, /admin, /pricing, /gallery, /blog 200. revalidate ok. /pricing still renders all 4 catalogue sections from Procedures.
[2026-05-23 07:30 UTC]  abded5e  C10           R1-R7 audit + R1 cleanup (productLine + surgeonSlug wired)  R1/R6/R7 🟢 green; R2/R3/R4/R5 🟡 green w/ documented exceptions. Full breakdown in docs/c10_audit.md.
[2026-05-23 07:40 UTC]  1ab4d64  P             Install new favicon icon-set from cosmedic-favico.zip  7 assets in public/; 7 link tags in <head>; site.webmanifest customised w/ BIMC CosMedic name; CMS admin favicons left intact.
```
