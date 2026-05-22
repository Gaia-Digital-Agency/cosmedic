# Cosmedic — Working TODO

> Active worklist captured 2026-05-21. Lives alongside the master phase-tracker in [docs/todo.md](todo.md) but focuses on the in-flight Mobile-Responsive Sweep (Phase M) + the new N-series items the user added after Phase 8 went live.
>
> **Hard sign-off rule (set by user):** _No horizontal scroll at any width on any route. Only vertical scroll._

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

### Step 10 — RULE 4 GATE — still pending

Old `Pages` collection still registered in `payload.config.ts` and still has 8 rows in DB. Removing it requires user's explicit yes. Until then it sits in the admin sidebar under "Homepage" group (the temp re-group from Step 4), accessible but redundant. After approval: one-line removal from `payload.config.ts`; DB table `pages` stays for safety (orphaned data preserved).

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

## Phase M — Mobile-Responsive Sweep (paused 2026-05-21, resuming)

Audit script lives at `/tmp/cosmedic-audit/audit.mjs`. Re-run with:

```bash
cd /tmp/cosmedic-audit && stdbuf -oL node audit.mjs > run.log 2>&1 &
```

It loops every route × `[320, 375, 414, 640, 768, 1024, 1280, 1440]` and reports `OVERFLOW route @ widths: ...` for any document-level horizontal overflow.

### Already shipped (live)

- **Logo white-smudge fix** — scoped `.logo .logo-img-dark { display: none }` to beat `.logo img { display: block }` specificity. (`packages/web/src/styles/globals.css:196-201`)
- **Logo-swap-on-scroll removed** — header background stays cream at all scroll positions, so swapping to the white-on-dark logo variant turned the mark invisible. Swap rules removed; CMS `Header.logoDark` field preserved (Rule 4 — no unilateral deletion). (`packages/web/src/styles/globals.css:196-204`)
- **M2 partial — burger threshold + header collapse rules** — at `max-width: 1100px` primary nav collapses to burger but lang switcher + CTA stay visible; at `max-width: 700px` endorsement line + lang switcher hide, header padding tightens, CTA shrinks. (`packages/web/src/styles/globals.css:1349-1380`)

### M1 — Finish multi-breakpoint overflow audit

- [ ] Re-run audit; capture complete `OVERFLOW` list across all 51 routes × 8 widths.
- 45 / 51 routes scanned before pause. Unscanned: `/treatment-reconstructive-trauma`, `/treatment-recovery`, `/treatment-surgical`, `/treatment-surgical-body`, `/treatment-surgical-breast`, `/treatment-surgical-face`, `/treatment-weight-loss-endoscopic`, `/treatment-weight-loss-medical`, `/treatment-weight-loss-surgical`.

### M2 — Fix 320–375px burger-missing bug

- [ ] At 320–375px the CTA "Plan Your Treatment" still pushes the burger button off-screen.
- The rule `@media (max-width: 420px) { .header-cta span:not(.btn-arrow) { display: none } }` was added but does NOT apply at runtime — verified via screenshot (CTA text still rendering full at 320).
- Likely culprit: specificity or the inner `<span>` selector mismatching the rendered DOM. Investigate first; then either bump specificity or restructure the CTA markup.
- File: `packages/web/src/styles/globals.css:1383-1388`.

### M3 — Per-route fixes (confirmed overflows so far)

- [ ] `/video-consult` — overflows by **+97px** at 768px viewport. Largest signal → likely a wide grid / iframe / form element. Structural.
- [ ] `/surgeon-risma` — overflows by **+30px** at 768px viewport.
- [ ] `/surgeon-wara` — overflows by **+21px** at 768px viewport.
- [ ] Plus whatever M1 surfaces from the remaining 6 routes.

### M4 — Sign-off

- [ ] Re-run audit; require zero document-level horizontal overflows on every route × 8 widths before declaring Phase M complete.
- [ ] Visual spot-check at 320 / 375 / 414 / 640 / 768 — header, golden-path CTAs, hero copy not clipped by parent `overflow: hidden`. (Document-overflow check won't catch parent-clipped content; mobile-view QA must.)

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

## Order of work

1. **DO FIRST** — CMS image upload nginx fix (one-line nginx config edit + reload, ~10 min).
2. **DO SECOND** — CMS UI Restructure (Pages → 14 Globals refactor + bucket re-grouping + Media folders). 10-step plan above. ~3 hr before the Step-10 Rule 4 gate. **Run this before the N/M items below — it touches the admin tree and is cleaner to land before UX polish.**
3. **N1, N2, N3** — endorsement centring, FAB pairing, /pricing table consistency.
4. **M1** — re-run audit to get full overflow list.
5. **M2** — fix 320–375 burger bug.
6. **M3** — per-route structural fixes (`/video-consult` first, surgeons after).
7. **M4** — re-audit, sign off.

---

## Working rules in force (from the user, verbatim)

- _"YOU HAVE NO PRIVELEGAE TO REMOVE OR DELETE ANYTHING"_ — no unilateral removal of CMS fields/collections/schema; dead fields get wired, never stripped.
- _"NO FRONT SIDE CHANGE IF CMS IS CHANGED, THATS ANOTHER RULE"_ — visual invariance: the rendered look/behaviour must not change when CMS schema is refactored.
- _"All pages and subpages, no horizontal scroll, page should fit viewport horizontally. Only Vertical scroll."_ — Phase M acceptance criterion.

See also: [feedback_cosmedic_rules.md](../../home/azlan/.claude/projects/-var-www-cosmedic/memory/feedback_cosmedic_rules.md) (auto-memory) for the seven-rule expanded set.
