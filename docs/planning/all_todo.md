# Cosmedic — Working TODO

> Active worklist captured 2026-05-21. Lives alongside the master phase-tracker in [docs/todo.md](todo.md) but focuses on the in-flight Mobile-Responsive Sweep (Phase M) + the new N-series items the user added after Phase 8 went live.
>
> **Hard sign-off rule (set by user):** _No horizontal scroll at any width on any route. Only vertical scroll._
>
> **2026-05-24 status banner:** Phase Q is **18/19 shipped** (q17 deferred — Figma asset delivery). Phases M, N, P also complete. Per-q tracker (with Notes + Commit columns and the Step-6 propose-for-approval workflow) is at [changerequest_21May.md](./changerequest_21May.md). Cluster summary at [change01.md](./change01.md). Visual addendum at [change2a.pdf](./change2a.pdf).
>
> **2026-05-24 URL-shape note:** All `/treatment-<slug>`, `/surgeon-<slug>`, `/blog-<slug>` references in the historical narrative below refer to the **pre-q11 routing shape**. Production now serves `/treatments/<slug>`, `/surgeons/<slug>`, `/blog/<slug>` (q11 — `8de7eb5`). Legacy URLs hard-404 on purpose. Historical text preserved as-written — do not retroactively rewrite slug strings; the router.ts diff in `8de7eb5` is the source of truth.
>
> **2026-05-24 CMS-collection note:** `PricingTiers` (q5 — `a1601e5`) and `InclusionItems` + `ExclusionItems` (q19 — `1b35bfb`) have been removed end-to-end (collections + DB + adapters). Historical references to these below reflect pre-removal state.

---


## 2026-05-22 — DO FIRST: CMS image upload fix ✅ COMPLETE

**Issue:** CMS image upload `POST /api/media` broken by nginx ↔ Payload redirect loop. nginx 301'd `/api/media` → `/api/media/`; Payload 308'd back. POST body stripped, infinite loop.

**Fix applied 2026-05-22 06:52 UTC:** Changed `location ^~ /api/media/` → `location ^~ /api/media/file/` at line 513 of `/etc/nginx/sites-enabled/subdomains.gaiada.online`. Phase-10 30d caching intent preserved (Payload serves files at `/api/media/file/<name>.webp`); the `/api/media` collection API is freed for POST.

**Backup:** `/etc/nginx/backups/subdomains.gaiada.online.bak-cmsfix-20260522-065211`

### Verification (all green at 06:56 UTC)

- [x] `sudo nginx -t` passed.
- [x] `sudo systemctl reload nginx` completed without errors.
- [x] `GET /api/media?limit=1` via HTTPS → **200 OK** (was 301-loop).
- [x] `POST /api/media` via HTTPS → **403** (Payload auth-required; no redirect loop). Real upload from authenticated browser session will be 201.
- [x] `GET /api/media/file/villa6.webp` → **200 OK** with `cache-control: max-age=2592000, public, immutable` (30d cache intent preserved).
- [x] All sibling sites still up (only the cosmedic block touched).

**Note (separate issue, not blocking):** `villa6.webp` exists as a DB row but not on disk (`packages/cms/media/` is empty). This is Phase-10 imagery-gap territory, tracked separately. Phase 10 still needs an upload pass; the upload pipeline itself is now unblocked.

---

## 2026-05-22 — DO SECOND: CMS UI Restructure (Pages → 14 Globals refactor) ✅ STEPS 1-9 COMPLETE

**Shipped 2026-05-22.** Steps 1-9 of the 10-step plan applied; Step 10 (Rule 4 gate — remove orphaned `Pages` collection) awaits explicit user yes in a follow-up session.

### What landed

- 14 Page Globals (`globals/pages/`): HomePage, PressPage, PrivacyPage, TreatmentsPage, SurgeonsPage, ResultsPage, GalleryPage, PricingPage, JourneyPage, StoriesPage, RecoveryStaysPage, ContactPage, VideoConsultPage, BlogPage — each in its bucket's admin.group.
- 28 collection/global `admin.group` strings re-grouped to the 9-bucket taxonomy.
- Media gained `folders: true` + a `category` select field (homepage/treatments/doctors/results/pricing/journey/contact/blog/uncategorised).
- Postgres migration `20260522_072509_pages_to_globals` applied (266 new tables/sequences/types). Schema migration was applied directly via `psql --single-transaction` because `payload migrate` hung silently in JS — registered in `payload_migrations` table as batch 4.
- All Postgres objects re-owned from `postgres` → `cosmedic` (table+sequence+enum); default privileges set.
- Data migration `migrate-pages-to-globals.ts` copied 8 existing Pages rows → 8 Globals (migrated=8 skipped=0 errors=0).
- 6 new globals (treatments/surgeons/results/recovery-stays/video-consult/blog) seeded via one-off `seed-new-page-globals.ts`.
- `packages/web/src/lib/cms.ts` now assembles `pages: CmsPage[]` from 14 parallel `fetchGlobal()` calls. `cms-adapters.ts` untouched (signature preserved). Route components untouched.
- `packages/cms/src/seed/runtime.ts` rewritten: `pages` array loop replaced with `pageGlobals` loop calling `upsertGlobal()` × 14.
- All 14 globals respond 200, all 14 static routes serve 200, all dynamic routes still 200. Editorial copy ("Considered work in considered hands", "Transparent pricing", etc.) confirmed live from the new globals.

### Gotchas captured

- `recovery-stays-page` and `video-consult-page` need `dbName` override to stay under Postgres' 63-char identifier limit (used `rec_stays_pg` and `vid_consult_pg`).
- `payload migrate` runner hangs at ~4800 LOC migrations even with `--force-accept-warning`. Workaround: extract the UP SQL via `awk 'NR>=5 && NR<=4181 ...'` and pipe to `psql --single-transaction`. Faster than waiting and avoids the silent JS hang.
- `tsx` scripts that use `getPayload()` trigger `pushDevSchema` unless `NODE_ENV=production` is set. Pass it explicitly for any one-off migration script.
- Direct psql DDL leaves tables owned by `postgres`; the Payload runtime connects as `cosmedic` and gets `permission denied` on ALTER. After applying schema directly, must `ALTER TABLE/SEQUENCE/TYPE OWNER TO cosmedic` for all public-schema objects.

### Step 10 — RULE 4 GATE — ✅ RESOLVED 2026-05-24 (commit `a17f6d9`)

`Pages` collection unregistered from `payload.config.ts` and `src/collections/Pages.ts` removed. `/api/pages` confirmed 404. DB table `public.pages` retained with its 8 rows as a one-shot rollback backup — safe to drop manually if/when sign-off is final.

### Original plan below (kept for reference)

**Approved 2026-05-22 after multi-turn discussion.** Converts the single `Pages` collection (8 rows today, 14 after extension) into 14 individual Payload Globals — each living in its bucket. Re-groups all 23 collections + 10 existing globals into a 9-bucket admin taxonomy that mirrors the site IA one-to-one. Adds Media folders + category field. Site rendering byte-identical (Rule 3). Zero custom React/admin code.

### Why

The Payload "Collection" type stores many rows of the same shape; "Global" stores singletons. Each of the 14 editorial pages IS a singleton (one Home, one Pricing, one Journey). The current Pages-collection-of-1s is over-modelled — converting to Globals matches Payload's intended model and gives the editor a per-bucket page record with **no** custom code and **no** cross-bucket navigation cost.

### Final bucket taxonomy (frozen)

```
COLLECTIONS
  Homepage              PressMentions · Awards
  Treatments            Disciplines · SubCategories · Procedures
                        InjectableProducts · MachineTreatments · HairRemovalAreas
                        InclusionItems · ExclusionItems
  Doctors               Surgeons
  Results               BeforeAfterCases
  Pricing               PriceListItems · PricingTiers     ← PriceListItems MOVED here
  Journey               JourneySteps · Stories · RecoveryStays
  Contact               Enquiries
  Blog                  BlogPosts · BlogTags · Authors
  Media Library         Media

GLOBALS
  Homepage              HomePage · PressPage · PrivacyPage
                        BrandStats · Header · Footer · EndorsementMark
                        FloatingChrome · Settings · SeoDefaults
  Treatments            TreatmentsPage
  Doctors               SurgeonsPage
  Results               ResultsPage · GalleryPage
  Pricing               PricingPage · ConsultationPolicy
  Journey               JourneyPage · StoriesPage · RecoveryStaysPage
  Contact               ContactPage · VideoConsultPage
                        FormDefaults · EmailTemplates
  Blog                  BlogPage
```

Rename: "Your Journey" → **Journey** in CMS admin. All other bucket labels keep their full names ("Media Library", not "Media").

### 10-step execution plan

- [ ] **Step 0 — Schema audit (5 min, read-only)**. Read full `packages/cms/src/collections/Pages.ts` field definition. Capture every field (chapterTitle, tagline, lede, sections blocks, heroImage, seo, publishStatus, etc.). The 14 new Globals must mirror exactly. Show field list before scaffolding.
- [ ] **Step 1 — Shared field factory**. New file `packages/cms/src/globals/pages/_pageFields.ts` exports `pageFields()` returning the Step-0 field array. Reused by every Page Global → no duplication.
- [ ] **Step 2 — Scaffold 14 Page Globals** under `packages/cms/src/globals/pages/`:

  | File | Global slug | `admin.group` | Replaces |
  |---|---|---|---|
  | HomePage.ts | `home-page` | Homepage | Pages(home) |
  | PressPage.ts | `press-page` | Homepage | Pages(press) |
  | PrivacyPage.ts | `privacy-page` | Homepage | Pages(privacy) |
  | TreatmentsPage.ts | `treatments-page` | Treatments | Pages(treatments) NEW |
  | SurgeonsPage.ts | `surgeons-page` | Doctors | Pages(surgeons) NEW |
  | ResultsPage.ts | `results-page` | Results | Pages(results) NEW |
  | GalleryPage.ts | `gallery-page` | Results | Pages(gallery) |
  | PricingPage.ts | `pricing-page` | Pricing | Pages(pricing) |
  | JourneyPage.ts | `journey-page` | Journey | Pages(journey) |
  | StoriesPage.ts | `stories-page` | Journey | Pages(stories) |
  | RecoveryStaysPage.ts | `recovery-stays-page` | Journey | Pages(recovery-stays) NEW |
  | ContactPage.ts | `contact-page` | Contact | Pages(contact) |
  | VideoConsultPage.ts | `video-consult-page` | Contact | Pages(video-consult) NEW |
  | BlogPage.ts | `blog-page` | Blog | Pages(blog) NEW |

  Each ~12 LOC: import shared fields + slug + admin.group + `hooks: revalidationHooks()`.

- [ ] **Step 3 — Register globals in `packages/cms/src/payload.config.ts`**. Add 14 imports, push into the `globals: [...]` array. Pages collection import stays — both live side-by-side until Step 10.
- [ ] **Step 4 — Re-group `admin.group` strings (27 single-line edits)**:

  | File | Old `admin.group` | New `admin.group` |
  |---|---|---|
  | collections/Pages.ts | Pages | Homepage *(temporary, removed in Step 10)* |
  | collections/PressMentions.ts | Results & Stories | Homepage |
  | collections/Awards.ts | Results & Stories | Homepage |
  | collections/Disciplines.ts | Treatments & Pricing | Treatments |
  | collections/SubCategories.ts | Treatments & Pricing | Treatments |
  | collections/Procedures.ts | Treatments & Pricing | Treatments |
  | collections/InjectableProducts.ts | Treatments & Pricing | Treatments |
  | collections/MachineTreatments.ts | Treatments & Pricing | Treatments |
  | collections/HairRemovalAreas.ts | Treatments & Pricing | Treatments |
  | collections/InclusionItems.ts | Treatments & Pricing | Treatments |
  | collections/ExclusionItems.ts | Treatments & Pricing | Treatments |
  | collections/PriceListItems.ts | Treatments & Pricing | **Pricing** |
  | collections/PricingTiers.ts | Treatments & Pricing | Pricing |
  | collections/BeforeAfterCases.ts | Results & Stories | Results |
  | collections/Stories.ts | Results & Stories | Journey |
  | collections/JourneySteps.ts | Pages | Journey |
  | collections/RecoveryStays.ts | Pages | Journey |
  | collections/Enquiries.ts | Forms & Email | Contact |
  | globals/Header.ts | Header & Footer | Homepage |
  | globals/Footer.ts | Header & Footer | Homepage |
  | globals/EndorsementMark.ts | Header & Footer | Homepage |
  | globals/FloatingChrome.ts | Site-wide | Homepage |
  | globals/Settings.ts | Site-wide | Homepage |
  | globals/SeoDefaults.ts | SEO & Meta | Homepage |
  | globals/BrandStats.ts | Home Page | Homepage |
  | globals/ConsultationPolicy.ts | Treatments & Pricing | Pricing |
  | globals/FormDefaults.ts | Forms & Email | Contact |
  | globals/EmailTemplates.ts | Forms & Email | Contact |

  No-change (listed for clarity): `Surgeons` (Doctors), `BlogPosts/Tags/Authors` (Blog), `Media` (Media Library), `Users` (unset, admin-only).

- [ ] **Step 5 — Media: folders + category**. `packages/cms/src/collections/Media.ts`. Enable Payload's `upload.folders`. Add a `category` select field with options: `homepage / treatments / doctors / results / pricing / journey / contact / blog / uncategorised`. Existing media defaults to `uncategorised`, no validation break.
- [ ] **Step 6 — Migration script**. New file `packages/cms/src/seed/migrate-pages-to-globals.ts`. Reads existing 8 Pages rows via Payload local API → writes to corresponding Globals via `payload.updateGlobal`. Idempotent (skips Globals already non-default — does NOT overwrite editor edits). Logs `migrated=X skipped=Y errors=Z`. Run via `pnpm --filter @cosmedic/cms tsx src/seed/migrate-pages-to-globals.ts`.
- [ ] **Step 7 — Web data layer update** (preserves interface, no route component touched):
  - `packages/web/src/lib/cms.ts`: replace single `fetchAll<CmsPage>('pages')` with 14 `fetchGlobal<CmsPage>(...)` calls, assemble into the existing `pages: CmsPage[]` array on `CmsCache`. Same shape, different source.
  - `packages/web/src/lib/cms-adapters.ts`: NO signature changes. `findPageBySlug` / `findPageByRoute` keep reading from `cms.pages[]`.
  - Route components (HomePage, Hero, CmsExtraBlocks, PageBlocks, etc.): **not modified**.
- [ ] **Step 8 — Build, restart, verify**:
  ```bash
  cd /var/www/cosmedic
  pnpm build
  pm2 restart cosmedic-cms cosmedic-web
  pnpm --filter @cosmedic/cms tsx src/seed/migrate-pages-to-globals.ts
  ```
  Then: admin sidebar screenshot, open all 14 page Globals confirm content present, curl all 51 routes for HTTP 200, visual diff of `/` against pre-refactor capture. Save proof before telling user to look (Rule 7).
- [ ] **Step 9 — Update seed/runtime.ts for fresh installs**. Delete the `pages` array loop (current lines ~665-717). Replace with 14 `upsertGlobal()` calls — same content + the 6 new entries (treatments/surgeons/results/recovery-stays/video-consult/blog). Future seeds skip the Pages collection entirely.
- [ ] **Step 10 — RULE 4 GATE — REQUIRES EXPLICIT USER YES**. Ask: "Remove the now-orphaned `Pages` collection from `payload.config.ts`?" If yes: one-line removal. DB table `pages` remains (data preserved, just orphaned). NEVER do this without the user's explicit go-ahead.

### Files touched (~54 total)

| Type | Count |
|---|---|
| New globals (`globals/pages/`) | 15 (1 factory + 14 Page Globals) |
| Collection files (admin.group string) | 23 |
| Global files (admin.group string) | 10 |
| payload.config.ts (register globals) | 1 |
| Media.ts (folders + category) | 1 |
| New migration script | 1 |
| seed/runtime.ts (replace pages loop) | 1 |
| web/src/lib/cms.ts | 1 |
| web/src/lib/cms-adapters.ts (verify) | 1 |

### Rules check — all 7 satisfied

- **#1 Simplify**: collapses awkward Pages-as-list-of-singletons into native Globals.
- **#2 Preserve granularity**: every field on every existing Page row migrated 1:1.
- **#3 No visual change on CMS refactor**: Step 7 keeps `cms.pages[]` interface intact — render output bytewise identical.
- **#4 No unilateral deletes**: Pages collection survives Steps 1-9; removed only in Step 10 with explicit yes.
- **#5 Plan first**: this section.
- **#6 Intuitive site↔CMS mapping**: final taxonomy = exact site IA, every bucket self-contained.
- **#7 Verify before user-tests**: Step 8 batch screenshot + curl before showing user.

### Rollback

If Step 8 verification fails: `git revert` CMS + web changes → `pm2 restart cosmedic-cms cosmedic-web` → site renders as before. Pages collection data untouched (migration only WRITES to Globals, never modifies Pages). Worst case ~10 min back to known-good.

### Risks to verify at Step 0 / Step 1 / Step 7

- `payload.updateGlobal` semantics on first run (creates fresh record vs errors). May need find-then-create-or-update fallback (~5 LOC).
- Block field registry import path works in Globals same as Collections — verify before Step 2.
- `cms.pages[]` consumers (`findPageByRoute`, `<CmsExtraBlocks>`, `PageBlocks`) all keep working — re-verify in Step 7.

### Estimated effort

~3 hr active work before Step 10 (the Rule 4 gate). Step 10 happens in a follow-up session after user has poked the admin.

---

## 2026-05-23 — DO THIRD: CMS structural changes (align code with `docs/CMS_structure.md`)

> **Status as of 2026-05-25 (CR25May 25.12 closure):**
> - **C1 / C2 / C3 / C4 / C5** ✅ shipped earlier (see commit log).
> - **C6** ✅ superseded by R2 (`3a87d4c`) — 10 home section globals + 9 routes verified.
> - **C7** ✅ superseded by R6 (`92cbb92`) — 7 pricing section globals + PricingPage verified.
> - **C8** ✅ complete — 7/8 fields shipped; `year` renders via `c.time` adapter (live verified).
> - **C9** ❌ deferred — high-risk pricing unification non-blocking; 4 collections still serve `/pricing`.
> - **C10** ✅ rescoped — final audit + sign-off absorbed into CR25May launch-blocking items.
>
> Sign-off path now flows through CR25May (`docs/changes/change_request_may25.md`) — Phase C is closed except for the deliberate C9 deferral.

Source of truth: [docs/CMS_structure.md](CMS_structure.md). Every change below brings the code in line with that file. Apply phases in order — each phase commits + deploys + verifies before the next starts.

**Standing rules (prevail through every phase) — labelled R1–R7 to avoid clashing with Phase C:**

| # | Constraint | Enforced by |
|---|---|---|
| R1 | No dead fields — every CMS field is read by at least one site surface (Enquiries CRM fields exempt) | `/tmp/cms-field-audit-v2.mjs` |
| R2 | No dead code — every collection/global has at least one route consumer | grep audit at end of each phase |
| R3 | No duplicates — each piece of editorial data lives in exactly one collection | data-integrity check before any delete |
| R4 | CMS manages every visible site surface (Rule 2) | seed CMS with EXACT existing copy before swapping renderer |
| R5 | Visual invariance — rendered site byte-identical before/after each phase (Rule 3) | curl + visual diff after each commit |
| R6 | Payload admin capabilities preserved — add/remove/edit collections + globals work normally; no hooks suppressed; no admin features broken | `/admin` smoke-test each phase |
| R7 | Multisite-safe — never `pm2 restart all`; `nginx -t` before reload; never touch sibling sites | each phase deploy step |

### Phase summary

| Phase | Task | Risk | Verify gate |
|---|---|---|---|
| C1 | Commit docs | trivial | working tree clean |
| C2 | BLOG → JOURNEY bucket merge | low | sidebar shows 4 blog items under Journey |
| C3 | Remove orphan `Pages` collection (Step 10) | low | `/admin/collections/pages` 404; rest of admin OK |
| C4 | Admin sidebar Collections-vs-Globals explainer | low | banner renders above sidebar |
| C5 | Wire `Blog Page` global to `/blog` index | low | `/blog` byte-identical; editor edits hero in CMS |
| C6 | Home Page A2 — wire 9 hardcoded section frames | medium | `/` byte-identical; 9 blocks editable |
| C7 | Pricing Page A2 — wire 3 hardcoded section frames | medium | `/pricing` byte-identical |
| C8 | Before/After full editorial wiring (5 dead fields + `isFeatured` filter) | medium | 0 dead B&A fields |
| C9 | Pricing unification — 4 collections collapse into Procedures | **HIGH** | `/pricing` byte-identical; Procedures = 142 rows |
| C10 | Full Rule 7 audit + sign-off | — | every gate green |

---

### Phase C1 — Doc commits

| Task | Files |
|---|---|
| Commit `docs/CMS_structure.md` (source of truth, table form) | docs/CMS_structure.md |
| Commit `docs/cms_custom_change.md` (reusable playbook) | docs/cms_custom_change.md |
| Commit `docs/all_todo.md` (this section — renamed from `cms_todo.md`) | docs/all_todo.md |

**Verify:** `git status` clean. No code changes.

---

### Phase C2 — BLOG → JOURNEY bucket merge

| Task | File |
|---|---|
| `admin.group: 'Blog'` → `'Journey'` | `packages/cms/src/collections/BlogPosts.ts` |
| same | `packages/cms/src/collections/BlogTags.ts` |
| same | `packages/cms/src/collections/Authors.ts` |
| same | `packages/cms/src/globals/pages/BlogPage.ts` |
| `pm2 restart cosmedic-cms` (NOT all) | — |

**Verify:** `/admin` sidebar shows BlogPosts, BlogTags, Authors, Blog Page under **Journey**; "Blog" bucket gone.

---

### Phase C3 — Remove orphan `Pages` collection (Step 10)

Rule 4 explicit approval already granted by user. DB table `pages` (8 rows) left as backup — only the Payload registration goes.

| Task | File |
|---|---|
| Remove `Pages` import + entry from `collections: [...]` | `packages/cms/src/payload.config.ts` |
| Delete the file | `packages/cms/src/collections/Pages.ts` |
| pm2 restart | — |

**Verify:** `/admin/collections/pages` returns 404; rest of admin loads; no log errors.

---

### Phase C4 — Admin sidebar explainer (Collections vs Globals)

Editors don't know the Payload terminology. ~30 LOC component, rendered above sidebar nav via `admin.components.beforeNavLinks`.

| Task | File |
|---|---|
| Create `CmsSidebarExplainer.tsx` (text: "Collections → many of the same thing · Globals → one-of-a-kind") | `packages/cms/src/components/CmsSidebarExplainer.tsx` |
| Wire `admin.components.beforeNavLinks` | `packages/cms/src/payload.config.ts` |
| `pnpm build` cms | — |

**Verify:** explainer block renders above sidebar in light + dark mode.

---

### Phase C5 — Wire `Blog Page` global to `/blog` index

| Task | Files |
|---|---|
| Replace hardcoded hero copy in BlogIndex with `findPageBySlug('blog')` reads (chapterTitle, tagline, lede, heroImage) | `packages/web/src/routes/blog/BlogIndex.tsx` |
| Add `<CmsExtraBlocks slug="blog" />` slot | same |
| Seed `blog-page` Global with EXACT existing hardcoded copy (Rule 3) | one-off `seed-blog-page.ts` |

**Verify (R5):** `/blog` byte-identical before/after; edit a hero field in CMS → revalidate → change visible.

---

### Phase C6 — Home Page A2 — wire 9 hardcoded section frames — ✅ SUPERSEDED 2026-05-25 by R2 (CR25May 25.12 audit)

Original scope: extend single Home Page Global with 9 block fields.

**Actual outcome — R2 (commit `3a87d4c`, 2026-05-25)** took a different + cleaner path: created **10 dedicated section globals under `packages/cms/src/globals/home/`** instead of nested block fields on Home Page. All 9 home routes verified reading from CMS section globals on 2026-05-25:

| Route | Section global |
|---|---|
| `routes/home/Hero.tsx` | `homeHero` |
| `routes/home/Intro.tsx` | `homeIntro` |
| `routes/home/Treatments.tsx` | `homeTreatmentsView` |
| `routes/home/PricingTeaser.tsx` | `homePricingView` |
| `routes/home/Surgeons.tsx` | `homeSurgeonsView` |
| `routes/home/Gallery.tsx` | `homeGalleryView` |
| `routes/home/LeadMagnet.tsx` | `homeLeadMagnet` |
| `routes/home/Journey.tsx` | `homeJourneyView` |
| `routes/home/Stories.tsx` | `homeStoriesView` |
| `routes/home/Place.tsx` | `homePlace` |

Home Page Global's 9 deprecated block fields retained under Rule 9 until sign-off (do not re-design — those are scheduled deletion, not re-wire targets).

---

### Phase C7 — Pricing Page A2 — wire 3 hardcoded section frames — ✅ SUPERSEDED 2026-05-25 by R6 (CR25May 25.12 audit)

Original scope: extend Pricing Page Global with 3 block fields (`overviewBlock`, `footnoteBlock`, `insurancePaymentBlock`).

**Actual outcome — R6 (commit `92cbb92`, 2026-05-24)** shipped **7 section globals under `packages/cms/src/globals/pricing/`** that fully cover the 3 original blocks + extra hero/list/catalogue chrome:

| /pricing block | Pricing section global (verified read in `PricingPage.tsx`) |
|---|---|
| Overview | `pricingOverview` |
| Footnote | `pricingFootnote` |
| Insurance | `pricingInsurance` |
| Payment | `pricingPayment` |
| Hero chrome | `pricingHero` |
| Discipline list view | `pricingDisciplineListView` |
| Clinic catalogue view | `pricingCatalogueView` |

Legacy nested block columns retained as Rule-4 DB backup.

---

### Phase C8 — Before/After full editorial wiring — ✅ COMPLETE (2026-05-25 CR25May 25.12 audit)

5 dead fields on `BeforeAfterCases` get rendered; `isFeatured` becomes a filter on home.

**Status per render site (verified grep + live curl 2026-05-25):**

| Field | `routes/gallery/GalleryPage.tsx` | `routes/results/ResultsPage.tsx` | `routes/home/Gallery.tsx` | Status |
|---|:-:|:-:|:-:|---|
| `description` (richText under card) | ✓ | ✓ | ✓ | ✅ Shipped |
| `beforeAlt` (composite `alt`) | ✓ | ✓ | ✓ | ✅ Shipped |
| `afterAlt` (composite `alt`) | ✓ | ✓ | ✓ | ✅ Shipped |
| `surgeonName` mini-byline | ✓ | ✓ | ✓ | ✅ Shipped |
| `patientAge` (q14) | ✓ | ✓ | ✓ | ✅ Shipped |
| `recoveryDuration` (q14) | ✓ | ✓ | ✓ | ✅ Shipped |
| `isFeatured` filter on home Gallery | n/a | n/a | ✓ | ✅ Shipped |
| `year` next to caseLabel | ✓ via `c.time` | ✓ via `c.time` | ✓ via `c.time` | ✅ Shipped (renders as `<span class="ba-time">2025</span>`; `time: String(ba.year)` mapping in `seed.ts` BaPair adapter line 118; live verified) |
| Optional: `procedure` → detail page link | — | — | — | Deferred (optional) |

**C8 closed.** Optional `procedure` link not implemented but flagged optional in original scope.

---

### Phase C9 — Pricing unification (single-source via Procedures) — ❌ DEFERRED (2026-05-25 CR25May 25.12 audit)

**Deferral rationale:** /pricing renders correctly via the existing 4 collections (MachineTreatments=24, InjectableProducts=34, HairRemovalAreas=43, PriceListItems=149). No editorial pain point in admin. Not launch-blocking. C9 is a HIGH-RISK consolidation that would touch 11 files + DB drops; deferring keeps Standing Rule 9 (no unilateral deletes) clean. Re-open after launch when there's a clear editor-side ROI.

Per [docs/CMS_structure.md §5.2](CMS_structure.md). Procedures expands to be the unified pricing catalogue; 4 collections collapse into it. **Data preservation is the gate (no data loss).**

| Sub-task | Files / data |
|---|---|
| Extend Procedures schema with catalogue fields | `packages/cms/src/collections/Procedures.ts`: add `catalogueGroup` (select: surgical/machine/injection/btl), `mainCategory` (text), `subCategory` (text), `audienceTier` (select), `brand`, `productLine`, `manufacturer`, `fdaApproved`, `bodyZone` — group-specific fields conditionally shown via `admin.condition` |
| Postgres migration for new fields | new migration |
| Backfill the 41 existing Procedures: `catalogueGroup='surgical'`, `mainCategory` from `parentSubCategory.title` (or manual map) | migration script |
| Migrate 24 `machine_treatments` rows → new Procedures records (catalogueGroup='machine', mainCategory=machineName, name=area, pricing.standardIdr → priceIdr2026, etc.) | migration script |
| Migrate 34 `injectable_products` rows → new Procedures records (catalogueGroup='injection', mainCategory=category, name=name, brand/productLine/manufacturer/fdaApproved/priceIdr/priceAud preserved) | migration script |
| Migrate 43 `hair_removal_areas` rows → new Procedures records (catalogueGroup='btl', mainCategory=bodyZone label, name=area, priceIdr) | migration script |
| Verify 46 `price_list_items` surgical rows match Procedures.pricing (already-aligned check); if drift, reconcile to canonical | data-integrity script |
| **Pre-delete sanity:** assert (new Procedures count) ≥ 41 + 24 + 34 + 43 = 142 | migration script |
| Drop the 4 collections from `payload.config.ts` registration | `packages/cms/src/payload.config.ts` |
| Delete 4 collection files | `packages/cms/src/collections/{MachineTreatments,InjectableProducts,HairRemovalAreas,PriceListItems}.ts` |
| Rewrite `/pricing` renderer to query Procedures grouped by `catalogueGroup → mainCategory → subCategory → name` | `packages/web/src/routes/pricing/ClinicCatalogueTable.tsx` |
| Update `packages/web/src/lib/cms.ts` to drop the 4 deleted collection fetches | `cms.ts` |
| Update `cms-adapters.ts` price-related helpers if needed | `cms-adapters.ts` |
| Drop DB tables `machine_treatments`, `injectable_products`, `hair_removal_areas`, `price_list_items` ONLY after Rule 7 verify passes (Rule 4 — explicit re-approval at execution time) | DB |
| Update `parse-pricelist.ts` seed: write everything into Procedures, not the 4 deleted collections | `packages/cms/src/seed/parse-pricelist.ts` |
| Update `runtime.ts` seed orchestrator | `packages/cms/src/seed/runtime.ts` |

**Verify (R3 + R5):**
- `/pricing` 4 catalogue tables render byte-identical pre vs post
- Procedure detail pages still render price (was reading Procedures.pricing, unchanged)
- Home pricing teaser still renders price
- `SELECT COUNT(*) FROM procedures` = 142

---

### Phase C10 — Final audit + sign-off — ✅ RESCOPED + ABSORBED (2026-05-25 CR25May 25.12 audit)

**Status after 25.12 audit:**
- C6 ✅ Superseded by R2 — 10 home section globals shipped + all 9 home routes verified reading from them.
- C7 ✅ Superseded by R6 — 7 pricing section globals shipped + PricingPage verified reading from them.
- C8 ✅ Complete — all 8 BeforeAfterCases fields rendering on 3 sites (`year` via `c.time` adapter; live verified on `/gallery`).
- C9 ❌ Deferred (high-risk, non-blocking; 4 collections still working).

C10's original sub-tasks now map onto **CR25May launch-blocking items**:

| C10 sub-task | New owner |
|---|---|
| Dead-fields audit | CR25May 25.34 (CMS admin walk-through) |
| Upload-field render audit | CR25May 25.5 (Phase 10 imagery — A1 wire shipped) + 25.34 |
| All 51 routes return 200 | CR25May 25.32 (Visual inspection LAUNCH-BLOCKING) |
| Visual diff key pages | CR25May 25.32 |
| Sidebar matches `CMS_structure.md` | Tracked via Phase R completion (R3 + R5 remaining) |
| Grep audit for deleted refs | n/a — no collections deleted (C9 deferred) |
| `git diff main..` review | Continuous (one-commit-per-phase Standing Rule 12) |

**Sign-off path:** CR25May launch-blocking items 25.3 / 25.4 / 25.5 / 25.32 / 25.33 / 25.36 / 25.38 / 25.39 close → site ships → C10 implicitly satisfied.

---



Audit script lives at `/tmp/cosmedic-audit/audit.mjs`. Re-run with:

```bash
cd /tmp/cosmedic-audit && stdbuf -oL node audit.mjs > run.log 2>&1 &
```

It loops every route × `[320, 375, 414, 640, 768, 1024, 1280, 1440]` and reports `OVERFLOW route @ widths: ...` for any document-level horizontal overflow.

### Already shipped (live)

- **Logo white-smudge fix** — scoped `.logo .logo-img-dark { display: none }` to beat `.logo img { display: block }` specificity. (`packages/web/src/styles/globals.css:196-201`)
- **Logo-swap-on-scroll removed** — header background stays cream at all scroll positions, so swapping to the white-on-dark logo variant turned the mark invisible. Swap rules removed; CMS `Header.logoDark` field preserved (Rule 4 — no unilateral deletion). (`packages/web/src/styles/globals.css:196-204`)
- **M2 partial — burger threshold + header collapse rules** — at `max-width: 1100px` primary nav collapses to burger but lang switcher + CTA stay visible; at `max-width: 700px` endorsement line + lang switcher hide, header padding tightens, CTA shrinks. (`packages/web/src/styles/globals.css:1349-1380`)

### M1 — Multi-breakpoint overflow audit ✅ COMPLETE 2026-05-23

- [x] Audit run on all 46 live routes × 5 widths (320 / 375 / 414 / 640 / 768) — see `/tmp/cosmedic-audit/run15.log`.

### M2 — 320–375px burger-missing bug ✅ COMPLETE 2026-05-23

- [x] CTA collapses to arrow-only at ≤420px (header `<span>` rule corrected for specificity); burger now visible at 320 / 375.

### M3 — Per-route fixes ✅ COMPLETE 2026-05-23

- [x] `/video-consult` — was +97px @768 → 0. (page-section + child grids → `min-width: 0` and `grid-template-columns: 1fr` at ≤700px).
- [x] `/surgeon-risma` — was +30px @768 → 0. (surgeon-bio-layout columns `min-width: 0`).
- [x] `/surgeon-wara` — was +21px @768 → 0. (same fix).
- [x] `/recovery-stays` — was +47px @320 → 0. (villa-grid → `1fr` at ≤700px).
- [x] `/contact` — was +13px @320 → 0. (form-grid → `1fr` at ≤700px).
- [x] `/pricing` — was +15px @320 → 0. (global `html { overflow-x: clip }` plus chapter-bg img safeguards).

### M4 — Sign-off ✅ COMPLETE 2026-05-23

- [x] `run15`: 0 horizontal overflows across all 46 live routes × 5 widths.
- [x] Sign-off doc: [phase-m-signoff.md](./phase-m-signoff.md).
- ⚠️ 6 blog routes return HTTP 404 — those are missing `BLOG_POST_BODIES` entries in `packages/web/src/content/blog-data.ts`. **Separate content gap, not a Phase M defect.** Tracked separately.

---

## Phase N — New items (added 2026-05-21)

### N0 — Check Mobile View

- [ ] Golden-path mobile-UX pass across 320 / 375 / 414 / 640 / 768 — overlaps with M1+M4 but specifically includes visual quality (clipped headlines, broken stacking, touched targets <44px), not just overflow.

### N1 — Vertically centre "MANAGED BY BIMC HOSPITAL" endorsement to logo

- [ ] In the header bar, align `logo-endorsement-line` / `logo-endorsement-mark` so it reads as vertically centred with the COSMEDIC brand logo glyph.
- Resize as needed for visual balance (currently the line sits beside the wordmark but is not optically centred).
- Must remain readable at desktop widths; already hidden ≤ 700px (per the already-shipped M2 partial).
- Affected: `packages/web/src/components/shell/Header.tsx` + `packages/web/src/styles/globals.css` (`.logo`, `.logo-endorsement-line`, `.logo-endorsement-mark`).

### N2 — Back-to-Top button = same size as WhatsApp FAB

- [ ] In FloatingChrome, the Back-to-Top button and the WhatsApp FAB should share **identical width / height / border-radius / shadow** so they read as a paired chrome cluster.
- Today the back-to-top is smaller and visually mismatched.
- Affected: `packages/web/src/components/shell/FloatingChrome.tsx` + the floating-chrome rules in `packages/web/src/styles/globals.css`.

### N3 — `/pricing` table consistency

URL: https://cosmedic.gaiada.online/pricing

- [ ] Enforce **consistent column widths** across every category table inside the `ClinicCatalogueTable` block (today they jitter from sheet to sheet because each `<table>` auto-sizes to its own content).
- [ ] Enforce **left-aligned text** for text columns (procedure name, notes, anaesthesia type).
- Numeric columns (IDR / AUD) stay right-aligned per currency convention.
- Affected: the `ClinicCatalogueTable` block component + its styles. Trace from `packages/web/src/routes/pricing/`.

---

## Phase P — Favicon + brand-icon set (added 2026-05-23)

Source: [changes/cosmedic-favico.zip](../changes/cosmedic-favico.zip) — 7 assets at 16/32/180/192/512 px + favicon.ico + site.webmanifest. (Brand mark is the cream cross with face-profile inside — same mark used on `<img>` logos, just the icon-set version.)

| Task | Files |
|---|---|
| Extract zip → `packages/web/public/` | `packages/web/public/{favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png, site.webmanifest}` |
| Update `<link>` tags in `packages/web/index.html` (and any per-route `<head>` injection) — favicon.ico, 16/32 png, apple-touch-icon, manifest | `packages/web/index.html` |
| Confirm `site.webmanifest` references the right icons + brand colour | `packages/web/public/site.webmanifest` |
| Add favicon entries to web build's static asset pipeline if needed | check Vite config |
| Verify in browser tab + iOS home-screen "Add to Home Screen" preview | manual |

**Note:** the **logo wordmark** change ("brown coloured one") is a separate task — that's item #1 of [changes/changes01.docx](../changes/changes01.docx) and belongs in **Phase Q**, not P. P is favicon icon-set only.

**Verify:** browser tab on every route shows the new icon; iOS PWA preview renders correctly; favicon.ico served at `/favicon.ico` with 200.

---

## Phase Q — changes01.docx + change2a.pdf addendum batch ✅ 18/19 SHIPPED 2026-05-24

Source files: [/changes/changes01.docx](../changes/changes01.docx) (27 items) + [change2a.pdf](./change2a.pdf) (28 items, addendum). Reconciled into **19 ordered q-items (q1–q19)** in [changerequest_21May.md](./changerequest_21May.md) — the active per-q tracker with Notes + Commit columns and the 7-step propose-for-approval workflow.

**Tally:**

| q | Item | Commit |
|---|---|---|
| q1 | `.detail-body` clamp(640px, 70vw, 920px) | `dc9278d` |
| q2 | Homepage mobile hero top-padding 140px | `bb69bdb` |
| q3 | `--hero-top-pad` token (mobile) | `85e1412` |
| q4 | Home team-photo replaces 6-card grid | `19c5600` |
| q5 | Drop PricingTiers collection | `a1601e5` |
| q6 | CMS light theme + I/E audit (→ q19) | audit only |
| q7 | Dark-brown 3-column footer | `d2a1ce4` |
| q8 | Footer Treatments auto-driven (verify) | N/A |
| q9 | `.page-breadcrumb` → `--page-x` | `9afd1f4` |
| q10 | Shared `<StatsRow>` primitive | `2c6414e` |
| q11 | Flat slug rewrite | `8de7eb5` |
| q12 | Breadcrumb match new URLs + align | `39d21e6` |
| q13 | Buttons + links sweep | `507622e` |
| q14 | B&A patient age + recovery duration | `9b99753` |
| q15 | Procedure sortOrder per parentSubCategory | `8cc80ae` |
| q16 | Pricing IDR-primary, AUD derived | `f114156` |
| q17 | Image set refresh (Figma) | ⏸ deferred |
| q18 | Dark-brown token `#6B4A2B` → `#533E27` | `a5e5e9e` |
| q19 | Drop InclusionItems + ExclusionItems pipeline | `1b35bfb` |

**Infrastructure unblock during Phase Q:** CMS `next build` was failing on `@/lib/cms-proxy` resolution from cross-package web seed imports. Fixed in `a18c700` by excluding 3 seed scripts (`seed-globals.ts`, `seed-taxonomy.ts`, `seed-content.ts`) from CMS tsconfig. They only run via `tsx` CLI; Next.js doesn't need to bundle them.

**q17 stays deferred** until Figma image set is delivered + inventoried (see q17 row in [changerequest_21May.md](./changerequest_21May.md)).

---

## Order of work

1. **DO FIRST** ✅ — CMS image upload nginx fix.
2. **DO SECOND** ✅ — CMS UI Restructure (Pages → 14 Globals refactor + bucket re-grouping + Media folders).
3. **DO THIRD — Phase C (C1–C10)** — CMS structural alignment to `CMS_structure.md`. **Apply before N3 because N3 (/pricing column consistency) touches the renderer that C9 rewrites.**
4. **Phase P** — favicon set.
5. **Phase N (N1, N2)** — endorsement centring, FAB pairing. (Can run in parallel with C; pure CSS, doesn't touch CMS.)
6. **Phase N (N3)** — /pricing table column consistency. **After C9 — pricing renderer is rewritten in C9.**
7. **Phase Q** — changes01.docx batch (after clustering).
8. **Phase M (M1–M4)** — mobile-responsive sweep.

---

## Working rules in force (from the user, verbatim)

- _"YOU HAVE NO PRIVELEGAE TO REMOVE OR DELETE ANYTHING"_ — no unilateral removal of CMS fields/collections/schema; dead fields get wired, never stripped.
- _"NO FRONT SIDE CHANGE IF CMS IS CHANGED, THATS ANOTHER RULE"_ — visual invariance: the rendered look/behaviour must not change when CMS schema is refactored.
- _"All pages and subpages, no horizontal scroll, page should fit viewport horizontally. Only Vertical scroll."_ — Phase M acceptance criterion.

See also: [feedback_cosmedic_rules.md](../../home/azlan/.claude/projects/-var-www-cosmedic/memory/feedback_cosmedic_rules.md) (auto-memory) for the seven-rule expanded set.

---

## Archive — pre-2026-05-23 master phase tracker (was `docs/todo.md`)

This section is the verbatim contents of the now-deleted `docs/todo.md`. Preserved for historical phase tracking (Phase 0–14 record) + pending Phase 11/12/13/14 open items. New work tracked above under DO FIRST/SECOND/THIRD + Phases C/M/N/P/Q. **Do not edit this section — it is frozen as of the all_todo.md consolidation.**

# BIMC CosMedic — Master TODO

> Tracking file for the 14-phase plan + the 47 pages each phase touches. Pair with [plan.md](./plan.md) for the full spec of each phase.

---

## Phases

- [x] **PHASE 0 — Documentation + git checkpoint**
  - [x] Project root: `README.md`, `CLAUDE.md`, `.gitignore`, `.claude/`
  - [x] `docs/architecture_info.md`, `file_structure.md`, `db_schema.md`, `db_ops.md`, `cms_info.md`, `cms_ops.md`, `cms_schema.md`, `sitemap.md`, `plan.md`, `todo.md`
  - [x] `docs/brand-guidelines.pdf` (moved from /brand.pdf)
  - [x] `docs/pricelist.xlsx` (moved from /procedure.xlsx)
  - [x] Reorg: `uploads/` → `discovery/{feedback,roadmap,screenshots,source-imagery}`
  - [x] Reorg: design source + `assets/` → `design/`
  - [x] Initial commits pushed to `origin/main` on GitHub
  - [x] Base 3PRTVN install (root `package.json` + `pnpm install`) — pre-Phase-1

- [x] **PHASE 1 — Monorepo scaffold + Cosmedic CMS branding**
  - [x] Postgres `cosmedic` role + db provisioned (local 127.0.0.1:5432)
  - [x] `pnpm-workspace.yaml` + `packages/cms` (Payload 3.84.1 on Next 15.4.11, port 4007) + `packages/web` (Vite SSR + Express, port 3007)
  - [x] `ecosystem.config.cjs` for pm2 (`cosmedic-cms` + `cosmedic-web`)
  - [x] `.env` + `.env.example` (DATABASE_URI, PAYLOAD_SECRET, PORT vars, bootstrap admin)
  - [x] Cosmedic CMS admin branding: `CosmedicBeforeLogin.tsx`, `CosmedicLogo.tsx` (no-op), `CosmedicIcon.tsx`, `admin-theme.css` (brand palette + Cormorant Garamond + JetBrains Mono)
  - [x] Brand palette + typography wired into admin
  - [x] `theme: 'all'` (light/dark toggle)
  - [x] Hello-world boot — both processes online, `/admin` shows the Cosmedic CMS login (verified 200)
  - [x] Initial Payload migration generated + applied (`src/migrations/20260520_112358.ts`)
  - [x] Bootstrap super-admin seeded from `.env` (super_admin@email.com) — auth verified, JWT issued
  - [x] Smoke: `curl localhost:3007` → 200 + "BIMC CosMedic"; `curl localhost:4007/admin` → 200; sibling sites untouched (christos / templategen / templatebase / flowstep all still online)
  - [x] `docs/site_features.md` written (site walkthrough + features inventory)

- [x] **PHASE 2 — Theme + PageShell**
  - [x] Port `global.css` (3,687 lines) verbatim → `packages/web/src/styles/globals.css`
  - [x] Google Fonts loaded (Cormorant Garamond + Inter + JetBrains Mono) via `<link>` in index.html
  - [x] Primitives: `Btn`, `Mono`, `Eyebrow`, `Img` (with painted-SVG fallback), `Reveal` (IntersectionObserver), `PriceTag` (IDR + AUD), `ChapterOpener`, `TrustBar`, `CTABandSlim`
  - [x] Shell: `Header` (mega-menu hover bridge, EN|ID switcher, scroll-state, mobile drawer), `Footer` (3 link columns + newsletter), `FloatingChrome` (fixed CTA + WhatsApp fab), `PageShell` composer
  - [x] Mega-menu hover bridge (2 s scheduled close + bridge padding) preserved from design
  - [x] EN | ID switcher state in header (stubbed — locale routing arrives Phase 9)
  - [x] Seed data ported (`TREATMENT_LIST`, `SUBCATEGORIES_BY_DISCIPLINE`, `SURGEON_LIST`, `WHATSAPP_HREF`) → `src/content/seed.ts`
  - [x] Brand assets `design/assets/logo*.png` copied to `packages/web/public/assets/`
  - [x] Pricing helper `src/lib/pricing.ts` (AUD↔IDR @ 10,500, rounded to 50k IDR)
  - [x] `App.tsx` rewired to render `<PageShell>` with a Phase-2 placeholder body — chrome renders 200 with full design CSS bundled
  - [ ] Visual regression baseline (Playwright) — deferred to Phase 11 alongside the full QA gate
  - [ ] Tailwind theme mapping — deferred (CSS-vars + class names from `globals.css` are already the source of truth; Tailwind layer will be added only if/when needed)

- [x] **PHASE 3 — Homepage**
  - [x] `packages/web/src/content/seed.ts` extended with `IMG` (Unsplash URLs), `STORY_PORTRAITS`, `BA_PAIRS`, `TREATMENT_IMG()`, `SURGEON_IMG()`
  - [x] `design/assets/{treatments,surgeons,results}/` copied to `packages/web/public/assets/`
  - [x] Hero (image bg + vignette + headline + 2-field quick enquiry form with progressive disclosure)
  - [x] TrustStrip (4 stats: 28 yrs · 8 ISAPS-FICS · 3,400+ procedures · #1 hospital 2026)
  - [x] Intro ("Our Approach" eyebrow + pull-quote + 2-col body, all reveal-staggered)
  - [x] Treatments (6 discipline cards in `treatments-grid`)
  - [x] PricingTeaser (8 price rows + AUD↔IDR conversion + foot disclaimer + "View full pricing")
  - [x] Surgeons (lead-surgeon feature block + 6 associate cards)
  - [x] Gallery (3 B&A cards: Necklift · Lip Lift × 2)
  - [x] LeadMagnet (Bali Recovery Guide cover + email-capture form + success state)
  - [x] Journey (5 steps: Consult · Plan · Arrive · Procedure · Recover)
  - [x] Stories (3 testimonials with verified-review chips + portraits)
  - [x] Place (Bali recovery copy + A/B/C/D list + recovery-stays CTA)
  - [x] HomeApp wired in `App.tsx` — `<PageShell>` wraps all 11 sections
  - [x] Build verified: 51 modules, 72 kB CSS bundle, 238 kB JS bundle (gzip 12 kB + 74 kB)
  - [x] All home section classNames present in SSR markup (`hero-v2`, `trust-strip`, `intro`, `treatments`, `price-teaser`, `surgeons`, `gallery`, `lead-magnet`, `journey`, `stories`, `place`)
  - [ ] Side-by-side visual comparison vs `design/_html-archive/index.html` — pixel-fidelity gate (full Playwright suite in Phase 11)

- [x] **PHASE 4 — Detail templates (36 detail routes from 3 templates + router)**
  - [x] SSR router (`src/router.ts`) — pathname → `{ kind, slug }` discriminator, status 404 on unknown slugs
  - [x] `server.ts` + `entry-server.tsx` pass URL into render; client hydrates via `window.location.pathname`
  - [x] App.tsx switches on route to dispatch HomePage / DisciplineDetail / SubCategoryDetail / SurgeonDetail / NotFound
  - [x] `DisciplineDetail` template → 6 discipline pages (`/treatment-surgical` etc., ChapterOpener + sticky TOC + overview + sections + sub-categories (or procedures fallback) + FAQs + Related)
  - [x] `SubCategoryDetail` template → 22 sub-category pages (12 expected + extras like `recovery-villas`, `concierge-*`) — accordion TreatmentRow per row with full price + duration + recovery + included list + 3 CTAs
  - [x] `SurgeonDetail` template → 8 surgeon pages (hero + breadcrumb + stats + bio + specialty areas + training table + other-surgeon strip)
  - [x] Shared sub-components: `FAQItem` (accordion), `TreatmentRow` (accordion), `SurgeonMini`
  - [x] `NotFound` (404) — branded page with `/contact` CTA
  - [x] TREATMENT_CONTENT data → `src/content/treatment-content.ts` (6 disciplines, ~250 lines)
  - [x] SUBCATEGORY_DATA → `src/content/subcategory-data.ts` (22 entries, ~1,000 lines) — `parent`, `chapterTitle`, `sections[]`, `treatments[]`, `faqs[]`
  - [x] All routes verified: 1 home + 6 disciplines + 22 sub-categories + 8 surgeons = **37 routes returning 200**, unknown paths return 404
  - [ ] ProcedureDetail × 41 — deferred to Phase 6 (procedure detail rendered inline as accordion rows on sub-category pages per design; standalone routes need procedure data in Procedures collection)
  - [ ] Side-by-side visual comparison vs design HTML — Phase 11 pixel-fidelity gate

- [x] **PHASE 5 — Index pages (14 routes built)**
  - [x] `/treatments` index — 6 discipline rows with hero + count + body
  - [x] `/surgeons` index — lead-surgeon feature + Plastic Surgery + Aesthetic Medicine grids
  - [x] `/results` — hybrid B&A gallery + stories archive
  - [x] `/gallery` — 4-up B&A grid with featured-cases filter bar
  - [x] `/stories` — 8 testimonials, story-row layout
  - [x] `/journey` — 7-step full journey (Enquiry → Homecoming) with paired imagery
  - [x] `/pricing` — full per-treatment table grouped by discipline + sub-category + insurance/payment columns
  - [x] `/recovery-stays` — 6 villa cards + 8-item "what's included" grid
  - [x] `/press` — 8 accreditations + 6 press mentions
  - [x] `/contact` — enquiry form + practical info + visit map (URL params: `?intent=estimate&procedure=...` prefill)
  - [x] `/video-consult` — 14-day calendar grid + time-slot picker + topic chips + submit success state
  - [x] `/blog` index — featured post + 6-card archive + 7-category filter
  - [x] `/blog-the-quiet-rhinoplasty` (rhinoplasty post body); other slugs 404 until Phase 6 backs them
  - [x] `/privacy` — 10-section policy with sticky TOC + DPO contact callout
  - [x] Router extended to `STATIC_ROUTES` map + `/blog-{slug}` matcher; App.tsx dispatcher updated
  - [x] All 14 new routes verified 200; unknown `/blog-{slug}` returns 404
  - [ ] `/funnel-assessment` — design has `.html` only (no `.jsx`); will port in Phase 6 alongside the form-builder block

- [~] **PHASE 6 — Payload schema + content port (PRIMARY CMS PHASE)** — *6a complete, 6b/6c next*
  - [x] **23 collections** implemented per `docs/db_schema.md` (17 catalogue + 4 editorial-override + Enquiries + Users + Media)
  - [x] **10 globals** implemented (Settings, Header, Footer, FloatingChrome, BrandStats, EndorsementMark, ConsultationPolicy, FormDefaults, EmailTemplates, SeoDefaults)
  - [x] 16 reusable blocks for `Pages.sections` (richText, imageGrid, ctaBand, stats, faqAccordion, procedureList, surgeonList, baGrid, testimonialList, recoveryStayList, pressMentionList, contactForm, journeyStepList, externalEmbed, notes)
  - [x] Access control + `seo` groups + `publishStatus` on draftable collections
  - [x] `pnpm generate:types` → typed Payload client in web (`src/payload-types.ts`)
  - [x] Seed scripts: surgeons, disciplines, subcategories, procedures, **pages**, beforeAfter, stories, pressMentions, awards, pricingTiers, recoveryStays, journeySteps, priceList (xlsx parser: 7 sheets → PriceListItems + InjectableProducts + MachineTreatments + HairRemovalAreas + Inclusions + Exclusions + JourneySteps), brand-stats, endorsement-mark, settings, consultation-policy, form-defaults, email-templates, seo-defaults, admin (super-admin), blogPosts (metas), header, footer
  - [x] **Phase 6 catalogue migration** generated + applied (`20260520_123550_phase_6_catalogue` + `20260520_125136_rename_section_anchor`)
  - [x] Seed run — counts: **149 PriceListItems, 93 Procedures, 8 Surgeons, 6 Disciplines, 17 SubCategories, 24 MachineTreatments, 43 HairRemovalAreas, 34 InjectableProducts, 6 JourneySteps, 5 Inclusions, 7 Exclusions, 5 Awards, 3 PressMentions, 6 RecoveryStays, 3 PricingTiers, 7 BlogPosts, 8 Pages, 10 globals**
  - [x] Web SSR cache (`packages/web/src/lib/cms.ts`) fetches all collections + globals from Payload REST, hydrates client via embedded JSON
  - [x] `/pricing` rewired — new `ClinicCatalogueTable` renders full CMS catalogue (surgical + machine + injection + BTL + consultation-policy callout) inline beneath the editorial pricing block
  - [x] All 51 existing routes still 200 (no regressions)
  - [x] **6b** — `src/content/{seed,subcategory-data,treatment-content}.ts` rewritten as Proxy-backed CMS shims via `lib/cms-proxy.ts` (lazyArray + lazyRecord). Every component import unchanged but values resolve from `getCmsCacheSync()` at access time. Router slug lookups made lazy. `entry-server.tsx` calls `setCmsCacheSync(cms)` so the SSR bundle's module instance sees the data.
  - [x] **6b** — Header reads `header.localeSwitcher` + `settings.siteName` + `floating-chrome.ctaPill`. Footer reads `footer.linkColumns` + `settings.address*` + `copyrightTemplate`. FloatingChrome reads `floating-chrome.ctaPill` + `settings.whatsappNumber`. TrustStrip reads `brand-stats.stats`. Hero reads `pages[home]` for tagline/title/lede/heroImage.
  - [x] **6c** — `<PageBlocks>` renderer for 15 `Pages.sections` block types (richText / imageGrid / ctaBand / stats / faqAccordion / procedureList / surgeonList / baGrid / testimonialList / recoveryStayList / pressMentionList / contactForm / journeyStepList / externalEmbed / notes).
  - [x] **6c** — `<CmsExtraBlocks slug="...">` injected into Home, Journey, Contact, Privacy, Press, Gallery, Stories, VideoConsult, RecoveryStays — any clinic-edited Pages.sections blocks render automatically.
  - [x] **6c** — `afterChange` revalidate hooks wired into every collection (21) + every global (10) via `packages/cms/src/lib/revalidate.ts`. Edits POST to `web /api/revalidate` to bust the 60s cache instantly.
  - [x] **6c** — Edit-and-see-live verified (any save in /admin invalidates the web cache within 1s; next request reflects the change).
  - [ ] **6c-followup (deferred)** — Sufficiency Gate audit per `docs/cms_schema.md` §5 (visual walk-through of every UI surface); deletion of `src/content/*.ts` (they're now thin shims that can stay or be removed); per-discipline pricing tiers; blog post bodies migration into CMS; sitemap regen on Payload mutations.

- [x] **PHASE 7 — Enquiry form backend**
  - [x] `Enquiries` collection (honeypot, status enum, timeline notes) — already from Phase 6a
  - [x] `POST /api/enquiry` handler in `packages/web/src/server.ts` (Zod via `lib/enquiry-schema.ts` + IP rate-limit 2/min via `lib/enquiry-rate-limit.ts` + honeypot silent-accept-as-spam)
  - [x] nodemailer email adapter in `packages/cms/src/lib/email-adapter.ts` (env-driven SMTP, JSON-transport fallback)
  - [x] `Enquiries.afterChange` on create → `sendEnquiryEmails` → clinic-notify + autoresponder, copy from `email-templates` global
  - [x] Hero quick-form on `/` + full form on `/contact` POST to `/api/enquiry` with inline success/error/rate-limit states
  - [x] End-to-end test: 2 records (1 new, 1 spam); clinic-notify + autoresponder logged for the new record; honeypot record skipped
  - [ ] **Open**: SMTP provider chosen + configured (Postmark / SES / clinic relay) — fill `SMTP_*` in `.env` once picked. Phase 8 launch can proceed; emails currently land in CMS stdout logs.
  - [ ] Optional: Cloudflare Turnstile if abuse appears post-launch

- [x] **PHASE 8 — nginx + SSL + DNS + deploy** *(commit 055c4dc — live at https://cosmedic.gaiada.online)*
  - [x] DNS A record: `cosmedic.gaiada.online` → `34.124.244.233` (already pointed pre-session)
  - [x] nginx server block replaces stale Phase-0 static-design-preview block in `/etc/nginx/sites-enabled/subdomains.gaiada.online` — mirrors christos VRTPN pattern with ports 3007/4007 + adds `/api/enquiry` web-route. Snapshot in repo at `ops/nginx/cosmedic.gaiada.online.conf`. Pre-Phase-8 backup at `/etc/nginx/backups/subdomains.gaiada.online.bak-phase8-*`
  - [x] Let's Encrypt cert at `/etc/letsencrypt/live/cosmedic.gaiada.online/` (issued 2026-05-20, expires 2026-08-18, auto-renew via certbot.timer)
  - [x] `sudo nginx -t && sudo systemctl reload nginx` — clean, only benign pre-existing http2-redefine warnings; no "conflicting server name" warnings
  - [x] `pm2 save` — `cosmedic-cms` + `cosmedic-web` persisted
  - [x] Smoke: `/` 200 (Express), `/admin` 200 (Next.js/Payload), `/treatments` 200, `/pricing` 200, `POST /api/revalidate` `{ok:true}`, `POST /api/enquiry` returns Zod 400 with validation errors, HTTP→HTTPS 301
  - [x] Sibling sites verified unchanged (christos / templatebase / templategen / flowstep all 200)
  - [ ] **Open**: SMTP provider chosen + configured (carries over from Phase 7 — Postmark / SES / clinic relay) — enquiry emails currently land in CMS stdout logs, not delivered
  - [x] **Resolved 2026-05-24** (verified via `/tmp/cosmedic-smoke/smoke.sh`): SSR router now matches `/surgeons/<slug>` at `packages/web/src/router.ts:71` (shipped in q11 `8de7eb5`). All 8 surgeon routes return 200.

- [~] **Post-Phase-8 admin polish** *(in progress)*
  - [x] Web favicon: copied `cosmedic-favicon.png` + lockup variants to `packages/web/public/`; added `<link rel="icon">` + apple-touch-icon to `packages/web/index.html`
  - [x] CMS favicon: same file now served at root via web (admin meta `/cosmedic-favicon.png` resolves through nginx → web)
  - [x] `CosmedicIcon.tsx`: replaced cropped/clipped 32×32 image with pure-text "C" wordmark in Cormorant Garamond on brand bronze (avoids the "BIN" clipping artefact in the collapsed admin nav)
  - [x] `CosmedicBeforeLogin.tsx`: explicit `marginInline: auto` + `maxWidth: 420` + `textAlign: center` + `width: 100%` on every child to guarantee centring inside Payload's login wrapper; logo lockup moved above the wordmark per brand.pdf §I
  - [ ] Light/dark toggle: Payload 3 exposes the theme toggle inside the **user account menu** (top-right avatar → Account → Admin Theme). No floating toggle by default; add a custom one if more discoverable surfacing is wanted
  - [ ] Rebuild cms + restart `cosmedic-cms`; smoke `/admin/login` shows centred lockup, browser tab shows brand favicon
  - [ ] Commit the polish patch

- [ ] **PHASE 9 — i18n EN ⇄ ID**
  - [ ] `payload.config.ts`: `localization: { locales: ['en', 'id'], defaultLocale: 'en' }`
  - [ ] Verify `localized: true` on every editorial field
  - [ ] Locale routing: `/id/*` mirror
  - [ ] EN | ID switcher wired
  - [ ] `<html lang>` + `hreflang` meta
  - [ ] Static UI strings in `i18n/{en,id}.json`
  - [ ] Translation pass (clinic-provided or contracted)
  - [ ] Visual regression for ID locale

- [~] **PHASE 10 — Imagery (self-host + relicense)** *(infra complete; lifestyle imagery blocked on user AI generation)*
  - [x] Audit imagery state — bimcbali.com hot-link plan was stale (assets already self-hosted in Phase 6); 18 of ~50 slots have local files at `packages/web/public/assets/{surgeons,results,treatments}/`. 23 lifestyle/villa/hero/portrait slots still need AI gen — full brief at `docs/phase-10-imagery-gaps.md`
  - [x] Payload `imageSizes` configured: sm (480w) / md (768) / lg (1280) / xl (1920) / xxl (2560), WebP encoding at descending quality (82/80/78/76/74)
  - [x] Media seed (`packages/cms/src/seed/media.ts` + `seed:media` standalone runner): idempotent walk over `packages/web/public/assets/{surgeons,results,treatments,lifestyle}/`, find-by-filename, upload to Payload Media, then link Media IDs back onto records by slug
  - [x] First seed run: **18 files uploaded** (8 surgeon portraits + 4 BA composites + 6 treatment-discipline heroes), **13 linked** (8 surgeons + 5 of 6 disciplines — `concierge.webp` has no matching Discipline record). 4 BA composites unlinked until matching BeforeAfterCases records exist with those slugs.
  - [x] `<Img>` primitive refactored: accepts optional `media={CmsMedia}` prop. When given, emits `<picture><source type="image/webp" srcset=…><img></picture>` with srcset built from `imageSizes`. Legacy `src`-only callers continue working unchanged.
  - [x] `mediaSrcSet` + `mediaMime` helpers in `src/lib/cms.ts`; `CmsMedia` type extended with `sizes` field
  - [x] Adapters extended: `LegacySurgeon.portrait` + `LegacyTreatment.heroImage` pass through the raw CmsMedia object so components can hand it to `<Img>` without re-fetching
  - [x] 3 hot-path call sites wired: home `<Surgeons>` (lead + associates), home `<Treatments>` (discipline grid); `<Hero>` already consumes `pages[home].heroImage` through `mediaUrl` and now benefits from the srcset path automatically when a hero image is set in admin
  - [x] Root-relative URL fix: split `PAYLOAD_URL` (server-internal, `http://127.0.0.1:4007` for SSR fetches) from `PUBLIC_PAYLOAD_URL` (browser, empty = root-relative). Was baking the internal port into HTML; nginx now handles `/api/media/*` routing.
  - [x] nginx 30d immutable cache for `/api/media/*` — added a `location ^~ /api/media/` block above the existing `/api` proxy in `subdomains.gaiada.online`. Verified via `cache-control: max-age=2592000, public, immutable` on a live variant fetch. Backup at `/etc/nginx/backups/subdomains.gaiada.online.bak-phase10-*`.
  - [x] Smoke: variants `surgical-480x330.webp` / `suka-480x480.webp` / `surgical.webp` all serve 200 from `https://cosmedic.gaiada.online/api/media/file/…` with WebP content-type
  - [ ] **Open**: 23 lifestyle/villa/hero/portrait slots — user AI generation per `docs/phase-10-imagery-gaps.md` then `pnpm seed:media` re-run
  - [ ] **Open**: 25 of 29 B&A composites — need clinical sign-off + image set; deferred from this phase
  - [ ] **Open**: extend `media` prop to remaining 19 `<Img>` call sites once lifestyle imagery lands (currently only the 3 hot paths benefit from srcset; the rest still single-img)
  - [ ] **Open**: full Lighthouse Performance pass to confirm WebP+srcset reduces LCP/TBT

- [~] **PHASE 11 — QA + Gates (LAUNCH-BLOCKING)** — *first pass in progress; Lighthouse/Playwright tooling deferred to a CI workstream*
  - [x] Mobile drawer nav a11y: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-hidden` on the drawer, ESC closes drawer, body scroll lock, restore-to-burger focus on close (native — drawer hides so focus returns to invoking button). Focus-trap inside drawer not added — a follow-up tracked under §Phase-11 backlog.
  - [x] Forms a11y: implicit `<label>` wrapping `<input>` on every field (Hero + Contact), success block has `role="status"`, error/rate-limit block has `role="alert"`. Inline `aria-invalid` on individual fields after server validation — deferred to follow-up.
  - [x] **Form QA**: POST `/api/enquiry` with valid payload → `{"ok":true}` 200, Enquiry record id=3 created in Payload, `[enquiry-emails] clinic notify sent` + `autoresponder sent` logged via JSON transport (SMTP wiring is Phase 12.1)
  - [x] Docs drift fixed: `docs/sitemap.md` surgeon URL pattern corrected from `/surgeons/{slug}` to actual `/surgeon-{slug}` (matches design + router + live header links)
  - [ ] **Open**: axe-core run + zero-violation pass — needs `@axe-core/playwright` install + CI script (workstream)
  - [ ] **Open**: Lighthouse Green ≥ 90 a11y/BP/SEO on every route × breakpoint — needs Lighthouse-CI install + budget config (workstream)
  - [ ] **Open**: linkinator + broken-image sweep across all 51 routes (workstream)
  - [ ] **Open**: Playwright visual-regression suite for Pixel-Fidelity Gate (workstream)
  - [ ] **Open**: CMS-Sufficiency Gate — walk `docs/cms_schema.md` §5 (manual review)
  - [ ] **Open**: Breakpoints visual check across 1920/1440/1100/900/700/540/390 (manual)
  - [ ] **Open**: Re-activate EN|ID language switcher in `<Header>` — currently visible-but-disabled (`aria-disabled`, `pointer-events: none`, 55% opacity, "Indonesian locale coming soon" tooltip). Was causing CSS inconsistency because clicking it linked to `/id/*` routes that don't have SSR support yet. Re-activate alongside Phase 9 lengthy when locale routing + ID editorial content land.

- [~] **PHASE 12 — Launch** *(infra + docs done; SMTP / editor accounts / pw rotation blocked on user input)*
  - [x] `docs/architecture/runbook.md` written — full ops playbook (deploy / restart / logs / nginx / TLS / Postgres / enquiry pipeline / incident / rollback / health endpoints)
  - [x] `ops/smoke.sh` — curl-based smoke checker (10 cosmedic endpoints + every sibling site). Exits non-zero on failure. Use pre/post-deploy.
  - [x] BeforeLogin sign-in helper is now env-gated (`PAYLOAD_SHOW_SIGNIN_HELPER=false` in cms `.env` hides the card after password rotation)
  - [x] Production smoke (Phase 12.6 first pass): bash ops/smoke.sh — all 10 cosmedic checks green; sibling sites unaffected (`gtec` pre-existing red, not us)
  - [ ] **Open · BLOCKER**: SMTP provider + credentials. **See "SMTP hookup recipe" section below for the exact steps when ready.**
  - [ ] **Open · BLOCKER**: Per-editor CMS accounts. Needs clinic team list (name + email + role). Roles to define: `admin` (Users), `editor` (Catalogue + Editorial collections), `reader` (read-only).
  - [ ] **Open · BLOCKER**: Rotate bootstrap super_admin password (after SMTP works so password-reset email delivers). Then flip `PAYLOAD_SHOW_SIGNIN_HELPER=false` and `pm2 restart cosmedic-cms --update-env`.
  - [ ] **Open**: External uptime ping (e.g. UptimeRobot 5-min HTTPS probe against `/` + `/admin/login` + 2x sibling test URLs)
  - [ ] **Open**: nginx-error alerting (tail `/var/log/nginx/error.log` for cosmedic; send to alerting webhook)
  - [ ] **Open**: 48-hour soak post-launch (no unresolved incidents)

- [x] **PHASE 13 — SEO + analytics** *(scaffold complete; analytics provider envs blank until user picks one)*
  - [x] `/robots.txt` route — Express handler in `server.ts`. Allow `/`, disallow `/api/` and `/admin`, sitemap pointer.
  - [x] `/sitemap.xml` route — Express handler. 14 static routes + dynamic slugs from CMS cache (every Surgeon, Discipline, SubCategory, BlogPost). Re-generated on every request (CMS cache is the source of truth, busted on every record save via `afterChange` hooks).
  - [x] Per-route SEO meta in `<head>` — `src/lib/seo.ts` `seoFor(pathname, cms)` returns `{title, description, canonical, ogImage, jsonLd}`. SSR pipeline injects via `<!--seo-outlet-->` replacement marker in `index.html`. Pulls page-record overrides from `Pages.title`/`lede`/`heroImage` + surgeon name+spec + discipline title — falls back to `seo-defaults` global.
  - [x] JSON-LD structured data — `MedicalClinic` on homepage; `Physician` on `/surgeon-<slug>` (linked to BIMC Hospital affiliation); `MedicalProcedure` on `/treatment-<slug>`; `BlogPosting` on `/blog-<slug>`. Emitted as `<script type="application/ld+json">` per route.
  - [x] Analytics scaffold — `src/lib/seo.ts` `renderAnalytics()` emits a Plausible snippet when `PLAUSIBLE_DOMAIN` env is set, OR a GA4 snippet when `GA4_MEASUREMENT_ID` env is set. Both off by default. Injected via `<!--analytics-outlet-->` marker in `<body>`.
  - [ ] **Open · user decision**: pick Plausible vs GA4. To enable: set the matching env var in `packages/web/.env` and `pm2 restart cosmedic-web --update-env`. Per-event custom tracking (`enquiry_submit`, `surgeon_view`, `language_switch`) is a follow-up wire-up once a provider is chosen.
  - [ ] **Open**: Google Search Console + Bing Webmaster — verify ownership via `<meta name="google-site-verification">` once a Search Console account is created. Add to `SeoDefaults` global so it ships on every page.

- [~] **PHASE 14 — Post-launch ops** *(scripts + docs ready; cron-install + media backup blocked on user)*
  - [x] `ops/postgres-backup.sh` — weekly pg_dump (Sunday 03:00) + gzip + 12-week retention + corruption smoke test. Reads DB password from `packages/cms/.env`. Cron install instructions inline.
  - [x] `docs/editor_cheatsheet.md` — clinic-facing 1-pager: sign in, find collections, update surgeons / treatments / imagery / blog, what the API button is, what NOT to touch.
  - [x] Cert renewal — `certbot.timer` is already running on the host (weekly). `sudo systemctl status certbot.timer` to verify; no manual cron needed.
  - [ ] **Open**: install the postgres backup cron. As `azlan`, `crontab -e` and add:
        `0 3 * * 0 /var/www/cosmedic/ops/postgres-backup.sh >> /var/log/cosmedic-backup.log 2>&1`
        Then verify after the first Sunday: `ls -la /var/backups/cosmedic/`.
  - [ ] **Open**: Payload media backup — weekly rsync of `/var/www/cosmedic/packages/cms/media/` to off-server location. Same cron slot, separate script.
  - [ ] **Open**: editor training session (1h walkthrough) — use `docs/editor_cheatsheet.md` as agenda.
  - [ ] **Open**: quarterly audit cycle (cert expiry / npm audit / lighthouse drift / backup-restore drill).

---

## SMTP hookup recipe (Phase 12.1)

Enquiry emails currently land in the cms stdout as JSON-formatted payloads (the nodemailer "json" transport fallback). Real delivery needs SMTP credentials wired in. **All other email infra is already in place** — the `Enquiries.afterChange` hook calls `sendEnquiryEmails`, which reads the `email-templates` global, formats clinic-notify + autoresponder, and sends via `nodemailerAdapter` in `packages/cms/src/lib/email-adapter.ts`.

To activate:

1. **Pick a provider** (recommended: Postmark or AWS SES; cheap, deliverable, supports DKIM).
2. **DNS** — add the provider's SPF (`v=spf1 include:spf.example.com -all`) + DKIM records (`postmark._domainkey` or `selector._domainkey`) for `cosmedic.gaiada.online` (sender domain). DMARC alignment recommended (`p=none` to start; tighten later).
3. **Edit `packages/cms/.env`** (gitignored — never commit):
   ```
   SMTP_HOST=smtp.postmarkapp.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=<provider api token>
   SMTP_PASS=<same as user for Postmark>
   MAIL_FROM_NAME="Cosmedic CMS"
   MAIL_FROM_ADDRESS=no-reply@cosmedic.gaiada.online
   MAIL_CLINIC_TO=cosmedic@bimcbali.com
   ```
4. **Restart** the cms with env reload: `pm2 restart cosmedic-cms --update-env`
5. **Verify** end-to-end:
   ```bash
   curl -s -X POST https://cosmedic.gaiada.online/api/enquiry \
     -H 'content-type: application/json' \
     -d '{"name":"SMTP test","email":"<your-real-inbox>","areaOfInterest":"surgical","message":"smoke"}'
   pm2 logs cosmedic-cms --lines 30 --nostream | grep enquiry-emails
   ```
   Expect: `clinic notify sent to cosmedic@bimcbali.com` + `autoresponder sent to <your-inbox>`. Confirm both arrive in real inboxes (check spam folder on the autoresponder side; SPF/DKIM correct = no spam).
6. **Once delivery verified**: rotate the super_admin password via admin UI (top-right avatar → Account), then add `PAYLOAD_SHOW_SIGNIN_HELPER=false` to `.env` and restart cms again. The pre-launch sign-in helper card disappears from `/admin/login`.

If delivery fails:
- `nslookup -type=txt cosmedic.gaiada.online` shows SPF? DKIM selectors resolve?
- `pm2 logs cosmedic-cms --lines 50 --nostream --err | grep -i nodemailer` for SMTP-level errors
- Postmark/SES dashboard shows the failed send with a specific reason (bounce, blocked, suspended)

## Future actions — clear list

| What | Who | When |
|---|---|---|
| Pick SMTP provider + add creds | Dev | Before clinic editor handover |
| Pick analytics (Plausible / GA4) + set env | Dev | Pre-launch |
| Provide clinic team list (names + emails + roles) | Dev | Pre-launch |
| Generate AI imagery per `docs/phase-10-imagery-gaps.md` | Dev | Replaces 24 placeholders + ~25 B&A composites |
| Approve / regenerate Indonesian translations | Dev | Phase 9 lengthy (post-launch OK) |
| Install postgres backup cron | Dev | Pre-launch |
| Set up UptimeRobot / external pinger | Dev | Pre-launch |
| Verify Search Console + Bing | Dev | Post-launch |
| Run Lighthouse CI + axe + Playwright visual regression | Dev | Phase 11 backlog |
| Phase 9 lengthy (Payload localization config + localized:true flags on every editorial field + Indonesian editorial copy drafted via ML and reviewed by clinic) | Dev + clinic | Deferred per user; resumes after launch + at least one editorial-team training |
  - [ ] `docs/editor_cheatsheet.md` written
  - [ ] `docs/architecture/runbook.md` finalized (deploy / incident / rollback / restore)
  - [ ] Quarterly audit cycle set up

---

## 47 Pages — CMS page-record checklist (Phase 6 — COMPLETE)

Each row is one CMS-managed page record. Route paths reflect the **actual** flat-slug URLs in production (e.g. `/treatment-surgical-breast`, not `/treatments/surgical/breast`). All 47 pages now render from the live CMS cache via the Proxy-backed `src/content/*` shims (Phase 6b) + per-route `<CmsExtraBlocks>` (Phase 6c).

### Top-level pages (15) — Pages collection + per-route components

| # | Route | Pages.slug | CMS-driven? | Status |
|---|---|---|---|---|
| 1 | `/` | `home` | Hero (chapter/title/lede/heroImage) + TrustStrip (brand-stats) + 9 design sections + `<CmsExtraBlocks slug="home">` for clinic-added blocks | [x] |
| 2 | `/treatments` | (uses `disciplines` collection) | 6 discipline cards from CMS | [x] |
| 3 | `/surgeons` | (uses `surgeons` collection) | 8 surgeon cards from CMS | [x] |
| 4 | `/journey` | `journey` | Static 7-step layout + `<CmsExtraBlocks slug="journey">` | [x] |
| 5 | `/gallery` | `gallery` | BA cards from CMS + `<CmsExtraBlocks slug="gallery">` | [x] |
| 6 | `/stories` | `stories` | Testimonial cards from CMS + `<CmsExtraBlocks slug="stories">` | [x] |
| 7 | `/press` | `press` | Press mentions + accreditations from CMS + `<CmsExtraBlocks slug="press">` | [x] |
| 8 | `/pricing` | `pricing` | Full `ClinicCatalogueTable` (149 PriceListItems + 24 Machine + 34 Injectables + 43 BTL) from CMS | [x] |
| 9 | `/recovery-stays` | (uses `recovery-stays` collection) | 6 villas from CMS + `<CmsExtraBlocks slug="recovery-stays">` | [x] |
| 10 | `/contact` | `contact` | Form scaffold + `<CmsExtraBlocks slug="contact">` (form backend wired in Phase 7) | [x] |
| 11 | `/video-consult` | `video-consult` | 14-day picker scaffold + `<CmsExtraBlocks slug="video-consult">` | [x] |
| 12 | `/funnel-assessment` | (deferred — `.html` only in design, no `.jsx`) | — | [ ] (Phase 6 follow-up) |
| 13 | `/blog` | (uses `blog-posts` collection) | Index renders from CMS metas | [x] |
| 14 | `/blog-:slug` (template) | (per BlogPost record) | Renders from BlogPosts collection; only `the-quiet-rhinoplasty` body populated, other 6 return 404 until clinic provides bodies | [partial] |
| 15 | `/privacy` | `privacy` | Static policy + `<CmsExtraBlocks slug="privacy">` | [x] |

### Discipline pages (6) — Disciplines collection

| # | Route | Disciplines.slug | Status |
|---|---|---|---|
| 16 | `/treatment-surgical` | `surgical` | [x] |
| 17 | `/treatment-reconstructive` | `reconstructive` | [x] |
| 18 | `/treatment-non-surgical` | `non-surgical` | [x] |
| 19 | `/treatment-hair` | `hair` | [x] |
| 20 | `/treatment-dental` | `dental` | [x] |
| 21 | `/treatment-recovery` (Weight Loss) | `recovery` | [x] |

### Sub-category pages (17) — SubCategories collection

The design's `SUBCATEGORIES_BY_DISCIPLINE` defines **17** sub-categories (not 18 — earlier estimate was off-by-one). All seeded + rendered.

| # | Route | SubCategories.slug | Status |
|---|---|---|---|
| 22 | `/treatment-surgical-face` | `surgical-face` | [x] |
| 23 | `/treatment-surgical-body` | `surgical-body` | [x] |
| 24 | `/treatment-surgical-breast` | `surgical-breast` | [x] |
| 25 | `/treatment-reconstructive-breast` | `reconstructive-breast` | [x] |
| 26 | `/treatment-reconstructive-trauma` | `reconstructive-trauma` | [x] |
| 27 | `/treatment-reconstructive-craniofacial` | `reconstructive-craniofacial` | [x] |
| 28 | `/treatment-non-surgical-injectables` | `non-surgical-injectables` | [x] |
| 29 | `/treatment-non-surgical-laser` | `non-surgical-laser` | [x] |
| 30 | `/treatment-non-surgical-skin` | `non-surgical-skin` | [x] |
| 31 | `/treatment-hair-fue` | `hair-fue` | [x] |
| 32 | `/treatment-hair-therapy` | `hair-therapy` | [x] |
| 33 | `/treatment-dental-veneers` | `dental-veneers` | [x] |
| 34 | `/treatment-dental-alignment` | `dental-alignment` | [x] |
| 35 | `/treatment-dental-whitening` | `dental-whitening` | [x] |
| 36 | `/treatment-weight-loss-medical` | `weight-loss-medical` | [x] |
| 37 | `/treatment-weight-loss-endoscopic` | `weight-loss-endoscopic` | [x] |
| 38 | `/treatment-weight-loss-surgical` | `weight-loss-surgical` | [x] |

### Surgeon pages (8) — Surgeons collection

| # | Route | Surgeons.slug | Status |
|---|---|---|---|
| 39 | `/surgeon-suka` | `suka` | [x] |
| 40 | `/surgeon-astri` | `astri` | [x] |
| 41 | `/surgeon-indra` | `indra` | [x] |
| 42 | `/surgeon-wara` | `wara` | [x] |
| 43 | `/surgeon-sissy` | `sissy` | [x] |
| 44 | `/surgeon-rosa` | `rosa` | [x] |
| 45 | `/surgeon-risma` | `risma` | [x] |
| 46 | `/surgeon-theresia` | `theresia` | [x] |

**Total: 46 of 47 live + CMS-driven** (only `/funnel-assessment` deferred). Counts: 14 top-level + 6 disciplines + 17 sub-categories + 8 surgeons + 1 blog-post template = 46. (Earlier "47" target included `/funnel-assessment`.)

### Plus (not in the 47, but live as routes)

- **Editorial Procedures (93 in CMS)** — rendered inline as accordion rows on each sub-category page via the Procedures collection. Standalone `/procedure-:slug` routes deferred (low traffic value vs sub-category groupings).
- **Localised `/id/*` mirrors** — every route above doubles in Phase 9.
- **API routes**: `/api/revalidate` (POST, wired Phase 6c) · `/api/enquiry` (POST, wired Phase 7) · `/api/page-data`, `/api/preview`, `/api/exit-preview` (Phase 9+).

---

## Cross-cutting open dependencies

| Dep | Status | Phase |
|---|---|---|
| DNS A record `cosmedic.gaiada.online` → `34.124.244.233` | [ ] (user action via DNS provider) | 8 |
| SMTP provider (Postmark / SES / clinic relay) | [ ] (Phase 7 lands a nodemailer scaffold with env-driven SMTP + console fallback; pick + configure once chosen) | 7 |
| Indonesian translation pass (clinic-provided or contractor) | [ ] | 9 |
| Lifestyle imagery licensing OR AI-generate brand-controlled | [ ] | 10 |
| Self-host surgeon photos from cosmedic.bimcbali.com CDN | [ ] | 10 |
| Figma access for `KjPZnGnbpa994mf7byvcW7` (share with uiux@gaiada.com) | [ ] (optional — design already ported from `design/`) | — |
| PressMentions / Awards / Stories / RecoveryStays content from clinic | [partial] (Phase 6 seeded placeholders: 3 press, 5 awards, 0 stories, 6 villas; clinic refines via /admin) | post-launch |
| Remaining 6 blog post bodies | [ ] (only `the-quiet-rhinoplasty` body populated; clinic writes the rest in /admin) | post-launch |
| Per-discipline pricing tiers | [ ] (currently 3 tiers global across all disciplines; if needed, add discipline relationship to PricingTiers) | post-launch |
| Editor accounts list (who gets admin vs editor vs content-only) | [ ] | 12 |
| Bootstrap admin password rotation before launch (`Teameditor@123` → strong random) | [ ] | 12 |
| Sitemap regeneration on Payload mutations | [ ] | 13 |
| Cloudflare Turnstile if abuse appears post-launch on `/api/enquiry` | [ ] | post-launch |
