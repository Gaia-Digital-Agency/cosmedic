# BIMC CosMedic — Claude Code Project Guide

> Guide for Claude Code sessions working in `/var/www/cosmedic/`. Read this before doing anything; the comprehensive specs live in `docs/`.

## What this is

A new marketing site for **BIMC CosMedic**, the plastic-surgery & aesthetic-medicine clinic of Bali International Medical Centre in Nusa Dua, Bali. Audience: international medical tourists (AU, US, EU) seeking discretion, clinical credibility, and a restorative atmosphere.

Goal: ship a multi-page editorial-luxury site (~88 routes — homepage, 6 disciplines, 18 sub-categories, 41+ procedures, 8 surgeon profiles, plus journey/gallery/stories/press/pricing/recovery/contact/blog) with CMS-managed content, IDR-primary + AUD pricing, EN | ID language switcher.

- **Production domain**: `https://cosmedic.gaiada.online`
- **Repo**: `git@github.com:Gaia-Digital-Agency/cosmedic.git`
- **Stack**: Vite SSR · React · Tailwind · Payload CMS · Node · Postgres (VRTPN)
- **CMS branding**: White-labelled as **"Cosmedic CMS"** using `docs/assets/brand-guidelines.pdf`

## Non-negotiables

Every change must respect:

1. **Frontend pixel-fidelity to Claude Design** — production matches design 100%. See [docs/architecture/sitemap.md](docs/architecture/sitemap.md) for the route matrix; see [design/](design/) for source.
2. **Lighthouse Green on every page** — Accessibility / Best Practices / SEO ≥ 90 on every route × every breakpoint.
3. **Editor-friendly CMS** — every editorial string + every image lives in a Payload collection. See [docs/db/db_schema.md](docs/db/db_schema.md).
4. **Cosmedic CMS branding** — Payload admin uses the BIMC brand identity. See [docs/cms/cms_info.md](docs/cms/cms_info.md).
5. **Multisite-safe** — `/var/www/cosmedic/` is one of ~10 sites on this server. **Never `pm2 restart all`. Always `nginx -t` before reload. Never touch sibling certs/databases.**

## Docs to read first

| File | When |
|---|---|
| [docs/architecture/architecture_info.md](docs/architecture/architecture_info.md) | Before any architectural decision — runtime topology, stack, deploy |
| [docs/architecture/file_structure.md](docs/architecture/file_structure.md) | Before moving/creating folders or files |
| [docs/db/db_schema.md](docs/db/db_schema.md) | Before designing or seeding any Payload collection (the WHAT) |
| [docs/db/db_ops.md](docs/db/db_ops.md) | Before Postgres provisioning, migrations, backups, or perf debugging (the HOW) |
| [docs/architecture/sitemap.md](docs/architecture/sitemap.md) | Before adding/removing routes or nav items |
| [docs/cms/cms_info.md](docs/cms/cms_info.md) | Before changing anything in `packages/cms/src/components/` or `payload.config.ts` admin block (the LOOK) |
| [docs/cms/cms_ops.md](docs/cms/cms_ops.md) | Before writing Payload hooks, access control, seed scripts, drafts/preview, or email pipeline (the HOW) |
| [docs/cms/cms_schema.md](docs/cms/cms_schema.md) | Before adding a UI surface — verify it traces to a CMS entity (Non-negotiable #3 audit) |
| [docs/planning/plan.md](docs/planning/plan.md) | Before starting any phase — the 14-phase execution plan + locked decisions |
| [docs/planning/all_todo.md](docs/planning/all_todo.md) | **Single TODO file** — covers DO FIRST/SECOND/THIRD plus Phases C (CMS → CMS_structure.md alignment), M (Mobile), N (Header/Chrome/Pricing polish), P (favicon), Q (changes01.docx batch). Replaces former `cms_todo.md` and absorbs `todo.md` (since 2026-05-23). |
| [docs/assets/brand-guidelines.pdf](docs/assets/brand-guidelines.pdf) | Canonical brand source — palette, typography, mark, usage rules |
| [docs/assets/pricelist.xlsx](docs/assets/pricelist.xlsx) | Canonical clinic price + procedure catalogue — seed source for Phase 6 |
| [design/](design/) | Original Claude Design source — never modified, only mirrored |

## Sibling sites on this server (gda-s01)

This server hosts ~10 other production sites under `*.gaiada.online`. **Do not look at them, read from them, or reference them.** All cosmedic work derives from this project's own `docs/` folder. Never `pm2 restart all`. Never reload nginx without `nginx -t`. Never touch any other site's files, certs, or databases.

## Port allocation

- **cosmedic-web** → `3007`
- **cosmedic-cms** → `4007`

Verify free with `ss -tlnp | grep ':3007\\|:4007'` before binding.

## Postgres

Local Postgres on `127.0.0.1:5432`. Dedicated `cosmedic` role + db — never reuse another site's.

## Working rules for Claude sessions

- Scope every action to `/var/www/cosmedic/`. Touch siblings only when explicitly asked.
- Read the relevant `docs/*.md` before making decisions that affect that area.
- Treat `design/` as **read-only**.
- Treat `docs/assets/brand-guidelines.pdf` and `docs/assets/pricelist.xlsx` as **source-of-truth inputs** — quote from them when justifying decisions.
- Pixel-Fidelity Gate + Lighthouse Green Gate are launch-blocking. Don't bypass them.
- This server is the dev environment (user chose server-first). Edits happen here; commits + pushes happen here.

## Current state (Phase Q 18/19 shipped 2026-05-24 · Phase 8 live · q17 deferred)

- `packages/cms` — Payload 3.84.1 on Next.js 15.4.11 + Postgres adapter, port **4007**. Admin white-labelled as **Cosmedic CMS** (Cormorant Garamond + JetBrains Mono, brand-beige palette from `docs/assets/brand-guidelines.pdf`). Light theme default (q19, 2026-05-24).
  - **18 collections** in `src/collections/` (as of Phase Q close 2026-05-24 — `PricingTiers` removed in q5 `a1601e5`; `InclusionItems` + `ExclusionItems` removed in q19 `1b35bfb`; `Pages` orphan still pending Rule 4 removal): Users · Media · Surgeons · Disciplines · SubCategories · Procedures · PriceListItems · InjectableProducts · MachineTreatments · HairRemovalAreas · BeforeAfterCases · Stories · PressMentions · Awards · RecoveryStays · BlogPosts · BlogTags · Authors · JourneySteps · Pages · Enquiries.
  - **24 globals**: 10 in `src/globals/` (Settings · Header · Footer · FloatingChrome · BrandStats · EndorsementMark · ConsultationPolicy · FormDefaults · EmailTemplates · SeoDefaults) + **14 Page Globals** in `src/globals/pages/` (HomePage · PressPage · PrivacyPage · TreatmentsPage · SurgeonsPage · ResultsPage · GalleryPage · PricingPage · JourneyPage · StoriesPage · RecoveryStaysPage · ContactPage · VideoConsultPage · BlogPage). Each Page Global is a singleton holding one route's editorial hero + sections.
  - **Admin taxonomy (9 buckets, mirrors site IA)**: Homepage · Treatments · Doctors · Results · Pricing · Journey · Contact · Blog · Media Library. Every collection + global has `admin.group` set to its bucket — open Pricing, see everything to manage `/pricing` (line items, tiers, consultation policy, the page global itself).
  - Phase-6 seed (`src/seed/runtime.ts` + `src/seed/parse-pricelist.ts`) parses all 7 sheets of `docs/assets/pricelist.xlsx` and idempotently upserts into Payload via Local API. Run with `pnpm --filter @cosmedic/cms seed`. Seed source files are imported from `packages/web/src/content/*` via relative path (will be deleted after Phase 6c rewires every web page).
  - Counts seeded: **149 PriceListItems**, 233 Procedures, 8 Surgeons, 6 Disciplines, 17 SubCategories, 24 MachineTreatments, 43 HairRemovalAreas, 34 InjectableProducts, 6 JourneySteps, 5 Awards, 3 PressMentions, 6 RecoveryStays, 7 BlogPosts, 8 Pages, 10 globals. (PricingTiers / InclusionItems / ExclusionItems no longer seeded — q5 + q19.)
- `packages/web` — Vite 6 SSR + React 19 + Express, port **3007**. Renders the full homepage matching the Claude Design source.
  - `design/global.css` (3,687 lines) ported **verbatim** then evolved to 3,927 lines through Phases 6–N + Phase M. **2026-05-23: split into 13 partials under `packages/web/src/styles/partials/`** (cascade order preserved line-for-line, MD5 of concat == pre-split file). `globals.css` is now a 13-line `@import` index. Edit the partial that owns the rule, not the index.
  - Google Fonts (Cormorant Garamond + Inter + JetBrains Mono) preconnected + loaded in `index.html`.
  - Primitives: `Btn`, `Mono`/`Eyebrow`, `Img` (painted-SVG fallback), `Reveal` (IntersectionObserver), `PriceTag` (IDR + AUD), `ChapterOpener`, `TrustBar`, `CTABandSlim`.
  - Shell: `Header` (mega-menu hover bridge, EN|ID, scroll-state, mobile drawer) + `Footer` (3 columns + newsletter) + `FloatingChrome` (CTA pill + WhatsApp fab) + `PageShell`.
  - Homepage (`src/routes/home/`): Hero · TrustStrip · Intro · Treatments · PricingTeaser · Surgeons · Gallery · LeadMagnet · Journey · Stories · Place.
  - Detail templates (`src/routes/detail/`): `DisciplineDetail` (6 routes) · `SubCategoryDetail` (22 routes) · `SurgeonDetail` (8 routes).
  - Index + content pages (`src/routes/*/`): `treatments` · `surgeons` · `results` · `gallery` · `stories` · `journey` · `pricing` · `recovery-stays` · `press` · `contact` · `video-consult` · `blog` (index + post) · `privacy` (14 routes).
  - Total **51 live routes** + 404 for unknown paths.
  - SSR router (`src/router.ts`) parses `pathname` → `{kind, slug}` via static-routes map + treatment/surgeon/blog matchers. Status 404 on unknown slugs. `entry-server.tsx` / `entry-client.tsx` both resolve before render so hydration matches SSR.
  - Seed data in `src/content/seed.ts` — `TREATMENT_LIST`, `SUBCATEGORIES_BY_DISCIPLINE`, `SURGEON_LIST`, `BA_PAIRS`, `STORY_PORTRAITS`, `IMG`, `TREATMENT_IMG()`, `SURGEON_IMG()`, `WHATSAPP_HREF`.
  - Editorial content for detail pages: `src/content/treatment-content.ts` (per-discipline) + `src/content/subcategory-data.ts` (per-sub-category, 22 entries, with `treatments[]` accordion data). Phase 6 replaces all four `src/content/*` files with Payload-backed fetch.
  - Brand + treatment + surgeon + B&A imagery at `packages/web/public/assets/{logo*.png,treatments/,surgeons/,results/}`.
  - **Phase 6a**: `src/lib/cms.ts` is the typed SSR-side data loader — fetches all CMS collections + globals from `http://127.0.0.1:4007/api/...` on first request, caches in-memory with 60s TTL, hydrates the client via `<script>window.__COSMEDIC_CMS__=...</script>` so SSR + hydration match. `server.ts` awaits `loadCmsCache()` before each render and threads the cache to `render(url, cms)`. Cache is bust-able via `POST /api/revalidate` — Payload `afterChange` hooks call this on every collection + global save.
  - `/pricing` route renders a `ClinicCatalogueTable` block under the editorial pricing — full CMS-driven view of every line item from `docs/assets/pricelist.xlsx` (surgical, machine, injection, BTL), grouped by sheet → category, with consultation-policy callout from `consultation-policy` global.
  - **Phase 6b + 6c**: Every page reads CMS data through lazy Proxy-backed shims at `src/content/*.ts` (see `src/lib/cms-proxy.ts` + `src/lib/cms-adapters.ts`) — no component rewrites needed. `lazyArray` / `lazyRecord` from `cms-proxy.ts` wrap exports so each access reifies from the current `getCmsCacheSync()` snapshot, memoized by `cmsCache.loadedAt`. Shell components (Header / Footer / FloatingChrome) wire to the corresponding globals. `<TrustStrip>` reads `brand-stats.stats`. `<Hero>` reads `pages[home]` for tagline/title/lede/heroImage. `<CmsExtraBlocks slug="..."/>` injects any clinic-edited `Pages.sections` blocks (15 block types) on Home / Journey / Contact / Privacy / Press / Gallery / Stories / VideoConsult / RecoveryStays. Payload `revalidationHooks()` (in `packages/cms/src/lib/revalidate.ts`) is spread into every collection + global so saves POST to `web /api/revalidate` and bust the cache within seconds. All 51 routes still 200 after the rewrite.
- Postgres `cosmedic` role + db provisioned on `127.0.0.1:5432`. Phase 6 catalogue migration applied. Super-admin seeded. Content seed run.
- pm2 manages both processes (`cosmedic-cms`, `cosmedic-web`); `pm2 save` persisted.

- **Phase 7**: `POST /api/enquiry` on web (Zod schema in `lib/enquiry-schema.ts` + IP rate-limit in `lib/enquiry-rate-limit.ts`: 2 req/IP/60s) creates `Enquiries` records via Payload REST. Honeypot is silent-accept-as-spam. `Enquiries.afterChange` (only on `operation === 'create'`) calls `sendEnquiryEmails` → loads the `email-templates` global + sends clinic-notify to `MAIL_CLINIC_TO` and autoresponder to submitter via the `nodemailerAdapter` in `packages/cms/src/lib/email-adapter.ts`. SMTP is env-driven (`SMTP_HOST/PORT/USER/PASS/SECURE`); when unset, JSON transport logs full message to stdout (no delivery — safe for dev + pre-launch). Hero quick-form on `/` + full form on `/contact` both POST to `/api/enquiry` with inline success/error states.

- **Phase 8**: Live at **https://cosmedic.gaiada.online** with green padlock. DNS A record points to `34.124.244.233`; Let's Encrypt cert at `/etc/letsencrypt/live/cosmedic.gaiada.online/` (issued 2026-05-20, expires 2026-08-18). nginx block in `/etc/nginx/sites-enabled/subdomains.gaiada.online` mirrors the christos VRTPN pattern — HTTP→HTTPS 301, web-owned `/api/{page-data,preview,exit-preview,revalidate,enquiry}` → `:3007`, Payload `/admin` + `/_next` + `/api` → `:4007` (25M client_max_body_size for media uploads), `/` → `:3007` (Vite SSR). Backup of pre-Phase-8 nginx config stashed at `/etc/nginx/backups/subdomains.gaiada.online.bak-phase8-*`. Smoke-tested: homepage 200, `/admin` 200, `/api/revalidate` `{ok:true}`, `/api/enquiry` returns Zod validation errors, all sibling sites unchanged. **Pending pre-launch**: SMTP provider for enquiry emails (currently JSON transport — no delivery).

~~**Known issue surfaced during Phase 8 smoke**: SSR router uses `/surgeon-<slug>` but sitemap + header links use `/surgeons/<slug>` — surgeon detail pages 404. Fix during Phase 11.~~ **Resolved** (verified 2026-05-24 via `/tmp/cosmedic-smoke/smoke.sh`): SSR router matches `/surgeons/<slug>` at `packages/web/src/router.ts:71`; all 8 surgeon routes return 200.

## 2026-05-22 — Item 1 + Item 2 shipped

### Item 1 — CMS image upload nginx fix (commit `6c5299b`)
- `location ^~ /api/media/` → `location ^~ /api/media/file/` in `/etc/nginx/sites-enabled/subdomains.gaiada.online` line 513. Breaks the nginx 301 → Payload 308 redirect loop that ate POST bodies.
- Phase-10 30d file cache preserved on `/api/media/file/*`; collection API `/api/media` freed for POST.
- Backup: `/etc/nginx/backups/subdomains.gaiada.online.bak-cmsfix-20260522-065211`.

### Item 2 — Pages → 14 Globals refactor (commit `3bc02e5`, Steps 1-9)
- The single `Pages` collection became 14 individual Payload Globals (one per static route). Each Global's `admin.group` matches its bucket in the new 9-bucket taxonomy → admin nav is one-to-one with the site IA.
- 28 collection + global `admin.group` strings re-grouped. Notable: PriceListItems moved from Treatments to **Pricing** (where editors expect to find prices); Stories + JourneySteps + RecoveryStays moved to **Journey**; PressMentions + Awards moved to **Homepage** (trust marks); all shell globals (Header / Footer / Settings / SeoDefaults / BrandStats / EndorsementMark / FloatingChrome) moved to **Homepage**.
- Media: added `folders: true` + a `category` select field (homepage / treatments / doctors / results / pricing / journey / contact / blog / uncategorised) so the asset library can be browsed by bucket.
- Postgres schema migration `20260522_072509_pages_to_globals` applied — adds 266 new tables/sequences/enums for the 14 globals + media folders. Marked applied in `payload_migrations` table as batch 4.
- Data migration: 8 existing Pages rows copied to corresponding Globals via `migrate-pages-to-globals.ts` (idempotent — skips already-populated globals). 6 new globals (treatments/surgeons/results/recovery-stays/video-consult/blog) seeded fresh via `seed-new-page-globals.ts`.
- Web data layer (`packages/web/src/lib/cms.ts`): the `CmsCache.pages: CmsPage[]` interface is preserved. Internally `fetchAll<CmsPage>('pages')` was replaced with `fetchAllPageGlobals()` (14 parallel `fetchGlobal` calls). `cms-adapters.ts` and route components untouched.
- `packages/cms/src/seed/runtime.ts`: pages array loop replaced with 14 `upsertGlobal()` calls. Fresh installs now seed Globals, not the Pages collection.
- All 14 globals respond 200, all 14 static routes serve 200, editorial copy rendering live from globals (Rule 3 preserved — site bytewise identical to pre-refactor).

### Gotchas to remember next session

- **`payload migrate` hangs silently on large migrations** even with `--force-accept-warning`. The 4800-LOC migration sat for 20+ min using 12 sec of CPU, never submitting any DDL. **Workaround**: extract the `await db.execute(sql\`...\`)` body via `awk 'NR>=5 && NR<=N { sub close-backtick from last line }'` to a `.sql` file and pipe to `psql --single-transaction -v ON_ERROR_STOP=1`. Applies in seconds. Then `INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ('<migration-name>', <next-batch>, NOW(), NOW())` to register it as applied.
- **Postgres 63-char identifier limit** — block field enums named `enum_<gslug>_blocks_<bslug>_<field>` can exceed it when the global slug is long. `recovery-stays-page` and `video-consult-page` needed `dbName: 'rec_stays_pg'` / `dbName: 'vid_consult_pg'` overrides on the GlobalConfig.
- **Direct psql DDL leaves objects owned by `postgres`** — the Payload runtime connects as `cosmedic` and gets `permission denied` on `ALTER`. After applying schema directly, run `ALTER TABLE/SEQUENCE/TYPE OWNER TO cosmedic` for every new public-schema object. One-shot pattern: `psql -tAc "SELECT 'ALTER TABLE \"' || tablename || '\" OWNER TO cosmedic;' FROM pg_tables WHERE schemaname='public'" | psql`. Also set default privileges: `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cosmedic`.
- **`tsx` scripts that call `getPayload()` trigger `pushDevSchema`** unless `NODE_ENV=production` is set. The drizzle push tries `ALTER TABLE ... DROP CONSTRAINT` and fails on non-owner. Always invoke one-off migration scripts as `NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx <script>`.
- **`git stash -u` will sweep untracked top-level directories** — `changes/` got vacuumed into the stash during rollback. Recoverable via `git checkout stash@{0}^3 -- <path>`. `/changes/` is now in `.gitignore` for scratch uploads.

### Item 2 Step 10 — Rule 4 gate, still pending

Old `Pages` collection still registered in `payload.config.ts` and still has its 8 rows in DB. Removing it from the config needs explicit user yes. DB table `pages` stays as data backup. One-line removal when approved.

## Phase M (Mobile-Responsive Sweep) — ✅ COMPLETE 2026-05-23

User criterion **met**: zero horizontal scroll on all 46 live routes × 5 widths (320 / 375 / 414 / 640 / 768). Sign-off doc at [docs/planning/phase-m-signoff.md](docs/planning/phase-m-signoff.md).

Final audit (`run15`): 260 scans, 0 layout overflows. Only remaining issues are 6 blog routes returning HTTP 404 — those are missing `BLOG_POST_BODIES` entries in `packages/web/src/content/blog-data.ts` (content gap, not a layout defect; tracked separately).

Highlights of what shipped:
- Header / burger: stays-in-bar at ≤1100px; endorsement line + lang switcher hidden ≤700px; CTA label collapses to arrow-only ≤420px.
- Global safety net: `html, body { overflow-x: hidden }` + `html { overflow-x: clip }` (clip preserves position:sticky); `img { max-width: 100% }`.
- Route-specific: `/video-consult` was +97px @768 → 0; `/recovery-stays` +47px @320 → 0 (villa-grid → 1fr ≤700px); `/contact` +13px → 0 (form grid → 1fr ≤700px); surgeon details cleared via `min-width: 0` on bio-layout columns.
- Audit harness lives in `/tmp/cosmedic-audit/` — re-run with `cd /tmp/cosmedic-audit && stdbuf -oL node audit.mjs > runXX.log 2>&1`.

## Phase N (Header + Chrome + Pricing polish) — ✅ COMPLETE 2026-05-23

N1 (`f053733`), N2 (`e6f8c8b`), N3 (`e90302f`) all shipped. Detail in [docs/planning/all_todo.md](docs/planning/all_todo.md).

## Phase Q (changes01.docx + change2a.pdf addendum batch) — ✅ 18/19 SHIPPED, q17 deferred

Final tally as of 2026-05-24:

| q | Item | Status | Commit |
|---|---|---|---|
| q1 | `.detail-body` max-width → `clamp(640px, 70vw, 920px)` | ✅ | `dc9278d` |
| q2 | Homepage mobile hero top padding 140px (≤700px) | ✅ | `bb69bdb` |
| q3 | Unified `--hero-top-pad` token across 3 hero patterns | ✅ | `85e1412` |
| q4 | Home: single team photo replaces 6-card associates | ✅ | `19c5600` |
| q5 | Remove `PricingTiers` collection (CMS + adapters + DB) | ✅ | `a1601e5` |
| q6 | CMS light theme default + Inclusion/Exclusion audit | ✅ | (audit-only → q19) |
| q7 | Dark-brown 3-column footer reskin | ✅ | `d2a1ce4` |
| q8 | Footer Treatments list CMS-driven (verification) | ✅ | N/A — verify only |
| q9 | `.page-breadcrumb` tracks `--page-x` at ≤700px | ✅ | `9afd1f4` |
| q10 | Shared `<StatsRow>` primitive (home + /treatments) | ✅ | `2c6414e` |
| q11 | Flat slug rewrite `/treatment-*` → `/treatments/*` | ✅ | `8de7eb5` |
| q12 | Breadcrumbs match new URLs + visual align | ✅ | `39d21e6` |
| q13 | Sitewide buttons + links sweep | ✅ | `507622e` |
| q14 | Before/After: patient age + recovery duration | ✅ | `9b99753` |
| q15 | Procedure sortOrder scoped per parentSubCategory | ✅ | `8cc80ae` |
| q16 | Pricing: IDR primary, AUD auto-calculated | ✅ | `f114156` |
| q17 | Image set refresh per Figma | ⏸ deferred | — |
| q18 | Dark-brown brand token `#6B4A2B` → `#533E27` | ✅ | `a5e5e9e` |
| q19 | Drop unused InclusionItems + ExclusionItems pipeline | ✅ | `1b35bfb` |

**Tracker:** [docs/planning/changerequest_21May.md](docs/planning/changerequest_21May.md) holds the per-q Notes + Commit columns (changes made, issues found, fixes applied, verify steps). The pre-q workflow (7 steps; Step 6 = "propose for approval — MUST not act before approval") is locked at the top of that file.

**Companion docs:** [docs/planning/change01.md](docs/planning/change01.md) (cluster tracker), [docs/planning/change2a.pdf](docs/planning/change2a.pdf) (visual reference).

**Infrastructure unblock during Phase Q:** CMS `next build` was failing on `@/lib/cms-proxy` resolution from cross-package web seed imports. Fixed in `a18c700` by adding 3 seed scripts (`seed-globals.ts`, `seed-taxonomy.ts`, `seed-content.ts`) to `packages/cms/tsconfig.json` `exclude`. These scripts only run via `tsx` CLI; Next.js doesn't need to bundle them. Removing from type-check pass unblocked the build.

**q17 stays deferred** until the Figma image set is delivered + inventoried (see [changerequest_21May.md](docs/planning/changerequest_21May.md) q17 row).

## Common ops

```bash
# Pull latest, rebuild, restart
cd /var/www/cosmedic
git pull
pnpm install            # if package.json changed
pnpm build
pm2 restart cosmedic-cms cosmedic-web

# Check sibling sites are still up (sanity)
pm2 status

# View logs
pm2 logs cosmedic-cms --lines 50
pm2 logs cosmedic-web --lines 50

# nginx reload (only after change)
sudo nginx -t && sudo systemctl reload nginx
```

## When you're not sure

1. Check the relevant `docs/*.md`.
2. Ask the user — better one clarifying question than a wrong assumption.
