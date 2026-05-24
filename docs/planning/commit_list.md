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
| 15 | **N1** | Endorsement to logo — discovered duplicate (logo PNG already includes "Managed by BIMC Hospital" baked in); removed sibling .logo-endorsement-line/.logo-endorsement-mark render (CMS field kept) | `f053733` | ✅ shipped 2026-05-23 07:50 UTC | rendered .logo block now has exactly 2 imgs; zero logo-endorsement hits in HTML; routes 200 |
| 16 | **N2** | Back-to-Top FAB matches WhatsApp FAB size/shadow | `e6f8c8b` | ✅ shipped 2026-05-23 08:00 UTC | 44→54 width/height, shadow shape matches WA (`0 8px 28px`) with neutral ink tint, SVG 16→20 + stroke 1.8→2. User chose "match shape, keep neutral tint" |
| 17 | **N3** | `/pricing` table column consistency (after C9c renderer rewrite) | `e90302f` | ✅ shipped 2026-05-23 08:10 UTC | upper table 1.1fr 1.6fr → 1.6fr 1.2fr (matches lower); name+notes+price ratios now identical across all /pricing tables |
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
[2026-05-23 07:50 UTC]  f053733  N1            Remove duplicate "Managed by BIMC Hospital" sibling element from Header  Logo PNG already contained the tagline baked in. Sibling render + CSS removed (CMS field kept).
[2026-05-23 08:00 UTC]  e6f8c8b  N2            Back-to-Top FAB now 54x54 with WA shadow shape  Matches WhatsApp FAB size; shadow shape matches; neutral ink tint preserves editorial identity.
[2026-05-23 08:08 UTC]  87a434c  docs(cms)     Media collection admin.description explains Browse-by-Folder + Category as independent organisation mechanisms.
[2026-05-23 08:10 UTC]  e90302f  N3            Harmonise /pricing table column widths  Upper table now uses same 1.6fr/1.2fr/220px ratio as the lower ClinicCatalogueTable.
```


---

## Full commit history — numbered (oldest → newest)

1. `6405444` — Initial import: BIMC CosMedic design handoff + documentation
2. `2d1bcc4` — Reorg: move root design source files into design_reference/
3. `91d308a` — Reorg: uploads/ → discovery/ with semantic subfolders
4. `4e86342` — Reorg: assets/ → design_reference/assets/
5. `10dd61f` — docs: add db_ops.md + cms_ops.md (operational reference)
6. `255da40` — docs: add cms_schema.md (UI↔CMS coverage matrix) + cms_ops.md + db_ops.md
7. `20bb066` — docs: add plan.md (14-phase execution plan, moved from ~/.claude/plans)
8. `591baa7` — Phase 0: base 3PRTVN install + design_reference → design rename + docs/todo.md
9. `3fff63d` — Phase 1: monorepo scaffold + Cosmedic CMS branding
10. `60a5ad1` — Phase 2: theme + PageShell — chrome ported pixel-identical to Claude Design
11. `4478b9c` — Phase 3: homepage — 11 sections matching design/index.html
12. `8518c70` — docs: remove stale Phase 3 checklist duplicates from todo.md
13. `186c952` — Phase 4: detail templates — 37 live routes (homepage + 6 disciplines + 22 sub-categories + 8 surgeons)
14. `cc01afe` — Phase 5: index pages — 14 more routes (51 total live)
15. `510d983` — Phase 6a: Payload schema + xlsx pricing pipeline + /pricing rewired to CMS
16. `cf79c78` — Phase 6b + 6c: every page now reads from CMS; afterChange revalidate hooks
17. `4e484a5` — Phase 7: enquiry form backend (POST /api/enquiry → Enquiries → emails)
18. `055c4dc` — Phase 8: live at https://cosmedic.gaiada.online
19. `e799716` — admin polish: favicon + BeforeLogin centring + COSMEDIC icon
20. `561ecc4` — admin polish v2: COSMEDIC wordmark + stethoscope avatar
21. `bc5fdd4` — admin polish v3: square favicons + compact COSMEDIC + fixed meta.icons
22. `2bb7476` — admin polish v4 + Phase 10 media seed
23. `6b68521` — Phase 10 infra: <Img> + Payload responsive variants + nginx media cache
24. `4ce12a3` — ops/nginx: sync cosmedic snapshot with Phase 10 media-cache block
25. `76ea085` — Phase 11 (partial): mobile drawer a11y + form QA + sitemap doc fix
26. `5d792c3` — Phase 12 (partial): placeholders + runbook + smoke + helper env
27. `394d46e` — admin: developer-only API warning banner on every edit form
28. `52b17aa` — Phase 13 + Phase 9 quick wins + Phase 14 doable + admin polish + UX
29. `188dc58` — ui: deactivate EN|ID switcher until Phase 9 lengthy ships
30. `e965b63` — Phase M (partial) + cms_todo.md: mobile sweep checkpoint + N-series queued
31. `670eeb9` — cms_todo.md: queue 2026-05-22 DO FIRST — CMS image upload nginx fix
32. `fde91de` — cms_todo.md: queue DO SECOND — Pages → 14 Globals CMS UI restructure
33. `6c5299b` — ops: fix CMS image upload nginx redirect loop (DO FIRST done)
34. `3bc02e5` — feat(cms): restructure admin nav — Pages collection → 14 Page Globals
35. `cfa64e8` — docs(CLAUDE.md): record 2026-05-22 CMS UI restructure + gotchas
36. `5e5ece1` — phase-D: refresh 11 docs to reflect CMS_structure.md + consolidate to one TODO file
37. `bbc068e` — phase-C2: move BlogPosts/BlogTags/Authors/BlogPage to JOURNEY bucket
38. `bdcac0c` — phase-C3: remove orphan Pages collection (Step 10 — Rule 4 explicit approval)
39. `d7e2ee2` — phase-C4: add CmsSidebarExplainer banner to admin nav
40. `34ef42f` — phase-C5: wire Blog Page global to /blog index (R5 byte-identical)
41. `693a6bb` — phase-C6a: Home Page schema — add 9 A2 block group fields
42. `4cb1bbc` — feat(home): C6b — 9 home sections read CMS A2 blocks with hardcoded fallbacks
43. `1825844` — docs(commit_list): mark C6a + C6b shipped (rows + log)
44. `8be5b79` — feat(pricing): C7 — Pricing Page A2 wiring (3 blocks)
45. `be4706a` — docs(commit_list): mark C7 shipped (row + log)
46. `aed3e07` — feat(results): C8 — Before/After full editorial wiring
47. `792977b` — docs(commit_list): mark C8 shipped (row + log)
48. `3958e59` — feat(cms): C9a — Procedures catalogue schema (single source for all pricing)
49. `bd0a3fa` — docs(commit_list): mark C9a shipped (row + log)
50. `f93f650` — feat(cms): C9b — migrate 101 line items into Procedures
51. `af8019d` — docs(commit_list): mark C9b shipped (row + log)
52. `6313cfd` — feat(pricing): C9c-renderer — ClinicCatalogueTable reads from Procedures
53. `809bb9a` — docs(commit_list): mark C9c-renderer shipped; C9c-delete deferred
54. `aebdc99` — feat(cms): C9c-delete — drop 4 stale collections (DB tables retained)
55. `1c6bae0` — docs(commit_list): mark C9c-delete shipped (row + log)
56. `cd2004c` — fix(cms): prefix admin.group with sort number to match CMS_structure.md order
57. `1d502e6` — Revert "fix(cms): prefix admin.group with sort number to match CMS_structure.md order"
58. `abded5e` — chore: C10 — R1-R7 audit + R1 dead-field cleanup
59. `7a872f3` — docs(commit_list): mark C10 shipped (row + log)
60. `148ebfc` — chore(design): archive 51 reference HTML files into design/_html-archive/
61. `1ab4d64` — feat(web): P — install new favicon icon-set from cosmedic-favico.zip
62. `00fb317` — docs(commit_list): mark P shipped (row + log)
63. `f053733` — fix(header): N1 — remove duplicate "Managed by BIMC Hospital" sibling
64. `cf27514` — docs(commit_list): mark N1 shipped (row + log)
65. `e6f8c8b` — fix(chrome): N2 — Back-to-Top FAB matches WhatsApp FAB dimensions
66. `2f3eb83` — docs(commit_list): mark N2 shipped (row + log)
67. `87a434c` — docs(cms): explain Browse-by-Folder + Category in Media admin description
68. `e90302f` — fix(pricing): N3 — harmonise table column widths across /pricing tables
69. `0c5da0f` — docs(commit_list): mark N3 + Media-description shipped (row + log)
70. `5db0d38` — docs(cms): add Browse-by-Folder note to sidebar explainer
71. `0ee7046` — chore: Phase M complete + globals.css split + docs reorg
72. `b90037e` — docs(phase-q): reconcile change2a.pdf addendum + add q18 brand-token swap
73. `dc9278d` — fix(detail): q1 — .detail-body max-width → clamp(640px, 70vw, 920px)
74. `bb69bdb` — fix(hero): q2 — homepage mobile hero top padding 140px (≤700px)
75. `3713aa8` — docs(phase-q): add Notes + Commit columns to tracker; backfill q1 + q2
76. `a5e5e9e` — fix(brand): q18 — dark-brown token #6B4A2B → #533E27
77. `c5254aa` — docs(phase-q): mark q18 complete + commit ref a5e5e9e
78. `85e1412` — fix(hero): q3 — unified --hero-top-pad token (mobile)
79. `117a9cd` — docs(phase-q): mark q3 complete + commit ref 85e1412
80. `f114156` — feat(pricing): q16 — flip web consumers IDR-primary, AUD derived
81. `2762e9c` — docs(phase-q): mark q16 complete + commit ref f114156
82. `19c5600` — feat(home): q4 — single team photo replaces 6-card associates grid
83. `a6ddbcf` — docs(phase-q): mark q4 complete + commit ref 19c5600
84. `9afd1f4` — fix(layout): q9 — .page-breadcrumb tracks --page-x at ≤700px
85. `66936fe` — docs(phase-q): mark q9 complete + commit ref 9afd1f4
86. `2c6414e` — feat(primitives): q10 — shared <StatsRow> primitive (home + /treatments)
87. `ba18b94` — docs(phase-q): mark q10 complete + commit ref 2c6414e
88. `d2a1ce4` — feat(footer): q7 — dark-brown 3-column footer reskin (change2a Item 5)
89. `3ca8ffa` — docs(phase-q): mark q7 complete + commit ref d2a1ce4
90. `2670b77` — docs(phase-q): mark q8 complete — N/A, verification only
91. `8de7eb5` — fix(routing): q11 — flat slug rewrite /treatment-* → /treatments/*
92. `288a8d9` — docs(phase-q): mark q11 complete + commit ref 8de7eb5
93. `a18c700` — fix(cms): unblock next build — exclude 3 cross-package seed scripts
94. `39d21e6` — fix(breadcrumbs): q12 — unify SurgeonDetail + purge dead .chapter-breadcrumb
95. `e602e08` — docs(phase-q): mark q12 complete + commit ref 39d21e6
96. `2ed9f27` — docs(phase-q): mark q6 complete (audit-only) + add q19 follow-up
97. `ee24996` — docs(phase-q): q18 — CMS admin theme now live (build unblocked by a18c700)
98. `a1601e5` — feat(cms): q5 — remove PricingTiers collection (config + adapters + DB)
99. `05338e0` — docs(phase-q): mark q5 complete + commit ref a1601e5
100. `507622e` — fix(q13): wire stub forms to /api/enquiry + add 6 blog placeholder bodies
101. `d5bb63d` — docs(phase-q): mark q13 complete + commit ref 507622e
102. `72a769e` — docs(phase-q): q13 — fill Commit column + note test-data cleanup
103. `f1a2571` — docs(phase-q): q19 re-audit — re-scope to drop full inclusion/exclusion pipeline
104. `8cc80ae` — feat(cms): q15 — procedure sortOrder scoped per parentSubCategory
105. `7b6a9d7` — docs(phase-q): mark q15 complete + commit ref 8cc80ae
106. `9b99753` — feat(b&a): q14 — patient age + recovery duration on Before/After cards
107. `14d4f7b` — docs(phase-q): mark q14 complete + commit ref 9b99753
108. `1b35bfb` — feat(cms): q19 — drop InclusionItems + ExclusionItems pipeline end-to-end
109. `b95f926` — docs(phase-q): mark q19 complete + commit ref 1b35bfb
110. `c73a764` — docs(phase-q): q19 — fill Commit column + correct net-diff figures
