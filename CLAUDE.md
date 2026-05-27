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
| [docs/remap.md](docs/remap.md) | **Phase R — Admin↔Site IA Remap.** Target Bucket structure (9 prefixed + Users) + per-Bucket item maps. Planning ✅ User · Media · Journey · Contact · Homepage · About; ⏳ Treatments · Doctors · Results · Pricing. |
| [docs/remap_plan.md](docs/remap_plan.md) | **Phase R implementation plan.** R0/R1/R2/R4/R6/R7/R8 ✅ shipped · R3/R5 pending. Rules 8 (universal coverage, no duplication) + 9 (full Payload capability preserved). |
| [docs/changes/change_request_may25.md](docs/changes/change_request_may25.md) | **Active change request (CR25May).** 70-item TODO + Details. Section 1 = Rules (8 CMS + 3 Standing + 4 Operating + 8-step workflow). Read before every change. |
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
- **Be supercritical + reality-grounded + 99.9999999999999% accurate.** Never overreport. Every claim of "done", every checkbox ticked, every count must reflect literal truth on disk / live site / DB. **If unsure: verify TWICE, not once** (two independent checks — e.g. grep the file AND curl the URL; query the DB AND read the page HTML). No partial-credit framing, no aspirational status, no "✅" for items where any part is blocked.
- **Never overwrite existing CMS/DB data.** If a field/row already has a non-empty value, do NOT overwrite. Seed/migration only inserts when destination is empty (`WHERE col IS NULL OR col = ''`). Wire-up reads before write. If existing non-empty data needs to change, **ASK first** — editor content is authoritative, seed defaults are placeholders.

## Current state (Phase R0/R1/R2/R4/R6/R7/R8 shipped · R3/R5 pending · Phase 8 live · CR25May 31/41 closed · 3 launch-blocking open · image audit 2026-05-27 ✅)

- `packages/cms` — Payload 3.84.1 on Next.js 15.4.11 + Postgres adapter, port **4007**. Admin white-labelled as **Cosmedic CMS** (Cormorant Garamond + JetBrains Mono, brand-beige palette from `docs/assets/brand-guidelines.pdf`). Light theme default (q19, 2026-05-24).
  - **18 collections** in `src/collections/` (as of 2026-05-24 — `PricingTiers` removed in q5 `a1601e5`; `InclusionItems` + `ExclusionItems` removed in q19 `1b35bfb`; orphan `Pages` collection removed (Rule 4 gate resolved 2026-05-24 — DB table `pages` retained with 8 backup rows); R8 added `PrivacySections`): Users · Media · Surgeons · Disciplines · SubCategories · Procedures · BeforeAfterCases · Stories · PressMentions · Awards · RecoveryStays · BlogPosts · BlogTags · Authors · JourneySteps · Enquiries · PrivacySections.
  - **42 globals**: 10 in `src/globals/` (Settings · Header · Footer · FloatingChrome · BrandStats · EndorsementMark · ConsultationPolicy · FormDefaults · EmailTemplates · SeoDefaults) + **14 Page Globals** in `src/globals/pages/` (HomePage · PressPage · PrivacyPage · TreatmentsPage · SurgeonsPage · ResultsPage · GalleryPage · PricingPage · JourneyPage · StoriesPage · RecoveryStaysPage · ContactPage · VideoConsultPage · BlogPage) + **18 Section Globals** added by per-Bucket detail phases: R1 ContactHero / ContactEnquirySection / ContactVisitSection (`pages/`); R7 JourneyHero / JourneyStats (`pages/`); R8 BlogPostTemplate (`pages/`); R4 SurgeonsHero / SurgeonsLeadView / SurgeonsPlasticView / SurgeonsAestheticView / SurgeonDetailTemplate (`doctors/`); R6 PricingHero / PricingOverview / PricingFootnote / PricingInsurance / PricingPayment / PricingDisciplineListView / PricingCatalogueView (`pricing/`).
  - **Admin taxonomy (R0 shipped 2026-05-24 `97c1e23`):** 9 Buckets matching site IA reading order. **Letter prefixes stripped in 25.18 (`59d7f36`)** — groups now read: Homepage · Treatments · Doctors · Results · Pricing · Journey · Contact · About · Media Library · + Users ungrouped. Counts post per-Bucket detail phases — Homepage (8) · Treatments (4) · Doctors (7) · Results (5) · Pricing (9) · Journey (6) · Contact (8) · About (10) · Media Library (1). Per-Bucket detail phases planned in [docs/remap.md](docs/remap.md) + [docs/remap_plan.md](docs/remap_plan.md). **Execution order**: R0 ✅ → R8 ✅ → R7 ✅ → R1 ✅ → R4 ✅ → R6 ✅ → **R5 next** → R3 → R2 (lowest-risk-first).
  - Phase-6 seed (`src/seed/runtime.ts` + `src/seed/parse-pricelist.ts`) parses all 7 sheets of `docs/assets/pricelist.xlsx` and idempotently upserts into Payload via Local API. Run with `pnpm --filter @cosmedic/cms seed`. Seed source files are imported from `packages/web/src/content/*` via relative path (will be deleted after Phase 6c rewires every web page).
  - Counts seeded: **149 PriceListItems**, 233 Procedures, 8 Surgeons, 6 Disciplines, 17 SubCategories, 24 MachineTreatments, 43 HairRemovalAreas, 34 InjectableProducts, 6 JourneySteps, 5 Awards, 3 PressMentions, 6 RecoveryStays, 7 BlogPosts, 10 globals. (PricingTiers / InclusionItems / ExclusionItems / Pages no longer seeded — q5, q19, Rule-4 close-out.)
- `packages/web` — Vite 6 SSR + React 19 + Express, port **3007**. Renders the full homepage matching the Claude Design source.
  - `design/global.css` (3,687 lines) ported **verbatim** then evolved to 3,927 lines through Phases 6–N + Phase M. **2026-05-23: split into 13 partials under `packages/web/src/styles/partials/`** (cascade order preserved line-for-line, MD5 of concat == pre-split file). `globals.css` is now a 13-line `@import` index. Edit the partial that owns the rule, not the index.
  - Google Fonts (Cormorant Garamond + Inter + JetBrains Mono) preconnected + loaded in `index.html`.
  - Primitives: `Btn`, `Mono`/`Eyebrow`, `Img` (painted-SVG fallback), `Reveal` (IntersectionObserver), `PriceTag` (IDR + AUD), `ChapterOpener`, `TrustBar`, `CTABandSlim`.
  - Shell: `Header` (mega-menu hover bridge, EN|ID, scroll-state, mobile drawer) + `Footer` (3 columns + newsletter) + `FloatingChrome` (CTA pill + WhatsApp fab) + `PageShell`.
  - Homepage (`src/routes/home/`): Hero · TrustStrip · Intro · Treatments · PricingTeaser · Surgeons · Gallery · LeadMagnet · Journey · Stories · Place.
  - Detail templates (`src/routes/detail/`): `DisciplineDetail` (6 routes) · `SubCategoryDetail` (17 routes) · `SurgeonDetail` (8 routes).
  - Index + content pages (`src/routes/*/`): `treatments` · `surgeons` · `results` · `gallery` · `stories` · `journey` · `pricing` · `recovery-stays` · `press` · `contact` · `video-consult` · `blog` (index + 7 posts) · `privacy` (14 routes).
  - Total **52 live routes** + 404 for unknown paths.
  - **URL structure (post-25.15)**: sub-categories nested at `/treatments/{discipline-slug}/{sub-slug}` (e.g. `/treatments/surgical/face`). 28 legacy flat URLs redirect via 301 (`LEGACY_SUB_REDIRECTS` in `router.ts`). Discipline slugs: `weight-loss` · `dental` · `hair` · `non-surgical` · `reconstructive` · `surgical` (note: `recovery` renamed to `weight-loss` in 25.14).
  - SSR router (`src/router.ts`) parses `pathname` → `{kind, slug}` via static-routes map + nested treatment/surgeon/blog matchers + 301 redirect handler. Status 404 on unknown slugs. `entry-server.tsx` / `entry-client.tsx` both resolve before render so hydration matches SSR.
  - Seed data in `src/content/seed.ts` — `TREATMENT_LIST`, `SUBCATEGORIES_BY_DISCIPLINE`, `SURGEON_LIST`, `BA_PAIRS`, `STORY_PORTRAITS`, `IMG`, `TREATMENT_IMG()`, `SURGEON_IMG()`, `WHATSAPP_HREF`.
  - Editorial content for detail pages: `src/content/treatment-content.ts` (per-discipline) + `src/content/subcategory-data.ts` (per-sub-category, 22 entries, with `treatments[]` accordion data). Phase 6 replaces all four `src/content/*` files with Payload-backed fetch.
  - Brand + treatment + surgeon + B&A imagery at `packages/web/public/assets/{logo*.png,treatments/,surgeons/,results/}`.
  - **Phase 6a**: `src/lib/cms.ts` is the typed SSR-side data loader — fetches all CMS collections + globals from `http://127.0.0.1:4007/api/...` on first request, caches in-memory with 60s TTL, hydrates the client via `<script>window.__COSMEDIC_CMS__=...</script>` so SSR + hydration match. `server.ts` awaits `loadCmsCache()` before each render and threads the cache to `render(url, cms)`. Cache is bust-able via `POST /api/revalidate` — Payload `afterChange` hooks call this on every collection + global save.
  - `/pricing` route renders a `ClinicCatalogueTable` block under the editorial pricing — full CMS-driven view of every line item from `docs/assets/pricelist.xlsx` (surgical, machine, injection, BTL), grouped by sheet → category, with consultation-policy callout from `consultation-policy` global.
  - **Phase 6b + 6c**: Every page reads CMS data through lazy Proxy-backed shims at `src/content/*.ts` (see `src/lib/cms-proxy.ts` + `src/lib/cms-adapters.ts`) — no component rewrites needed. `lazyArray` / `lazyRecord` from `cms-proxy.ts` wrap exports so each access reifies from the current `getCmsCacheSync()` snapshot, memoized by `cmsCache.loadedAt`. Shell components (Header / Footer / FloatingChrome) wire to the corresponding globals. `<TrustStrip>` reads `brand-stats.stats`. `<Hero>` reads `pages[home]` for tagline/title/lede/heroImage. `<CmsExtraBlocks slug="..."/>` injects any clinic-edited `Pages.sections` blocks (15 block types) on Home / Journey / Contact / Privacy / Press / Gallery / Stories / VideoConsult / RecoveryStays. Payload `revalidationHooks()` (in `packages/cms/src/lib/revalidate.ts`) is spread into every collection + global so saves POST to `web /api/revalidate` and bust the cache within seconds. All 51 routes still 200 after the rewrite.
- Postgres `cosmedic` role + db provisioned on `127.0.0.1:5432`. Phase 6 catalogue migration applied. Super-admin seeded. Content seed run.
- pm2 manages both processes (`cosmedic-cms`, `cosmedic-web`); `pm2 save` persisted.

- **Phase 7 enquiry pipeline**: `POST /api/enquiry` on web (Zod schema in `lib/enquiry-schema.ts` + IP rate-limit in `lib/enquiry-rate-limit.ts`: 2 req/IP/60s) creates `Enquiries` records via Payload REST. Honeypot is silent-accept-as-spam. `Enquiries.afterChange` (create only) calls `sendEnquiryEmails` → loads the `email-templates` global + resolves destination via `resolveClinicEmail()` (chain: `Settings.clinicEnquiryEmail` → `MAIL_CLINIC_TO` env → fallback) + sends clinic-notify + autoresponder via `nodemailerAdapter` in `packages/cms/src/lib/email-adapter.ts`. SMTP wiring is Path B (commit `b397c5d`, 2026-05-25): `transportOptions: { host, port, secure, auth, skipVerify: true }` — no JSON fallback. Hero quick-form on `/` + full form on `/contact` both POST to `/api/enquiry` with inline success/error states. **Pending creds**: see CR25May 25.3.

- **Phase 8**: Live at **https://cosmedic.gaiada.online** with green padlock. DNS A → `34.124.244.233`; Let's Encrypt cert at `/etc/letsencrypt/live/cosmedic.gaiada.online/` (issued 2026-05-20, expires 2026-08-18). nginx block in `/etc/nginx/sites-enabled/subdomains.gaiada.online` mirrors the VRTPN pattern — HTTP→HTTPS 301, web-owned `/api/{page-data,preview,exit-preview,revalidate,enquiry}` → `:3007`, Payload `/admin` + `/_next` + `/api` → `:4007` (25M client_max_body_size for media uploads), `/` → `:3007` (Vite SSR). Nginx backups under `/etc/nginx/backups/`. SMTP creds outstanding: see CR25May 25.3.

- **CR25May status (2026-05-27): 31/41 closed · 3 launch-blocking open (25.3 SMTP, 25.32 visual QA, 25.38 form E2E)**. See [docs/changes/change_request_may25.md](docs/changes/change_request_may25.md) + [temp.md](temp.md) for full Completed/Pending breakdown.

- **changes5 — CMS field rearrangement (2026-05-27)**: Phase 1 (15 TypeScript field reorders — D3/D7 compliance: Hero globals all follow breadcrumbLabel→title→lede→heroImage→imageHue→imageLabel→chapter; images moved last before seo; Settings/Header/Footer/Endorsement logos to end; BlogPosts/Authors/PressMentions/Awards images to end) + Phase 3 (3 `pageFields({ hideHero: true })` toggles on JourneyPage/ContactPage/ResultsPage) shipped. Build ✅ CMS restarted. Phase 2 (D1/D2 field merges with DB migrations) still pending. See [docs/changes/changes5-collections.md](docs/changes/changes5-collections.md).

- **Key CR25May commits (2026-05-25 → 2026-05-26)**:
  - `c9a1efe` — 25.19 brown.svg logo swap + 5-color palette enforcement.
  - `3a87d4c` — R2 Homepage Bucket detail: 10 section globals under `globals/home/`.
  - `2ed10ec` — 25.13c IDR/AUD toggle on treatment detail pages.
  - `881c136` — 25.30+25.31 WhatsApp number + hospital name single-sourced from CMS Settings.
  - `14a292f` — 25.17 PricingTeaser + PricingPage flipped to IDR-source; AUD fields removed from Procedures CMS.
  - `a27f5b4` — 25.40+25.41 nav reorder (Treatments > Results > Doctors > Pricing > Journey > Contact) + Clinic Catalogue first on /pricing.
  - `59d7f36` — 25.18 strip letter prefixes from all admin bucket groups.
  - `d3178fd` / `035dbba` — 25.27+25.28+25.29 contact/privacy/not-found pages wired to CMS.
  - `0318d16` — 25.23 Home Place image wired to CMS (HomePlace.image upload field).
  - `6f73326` — 25.36 DB backup cron setup; fix 25.40/25.41 detail status; refresh temp.md.

### Historical infra changes (kept for context)

- **nginx CMS upload fix** (`6c5299b`, 2026-05-22): `location ^~ /api/media/` → `/api/media/file/` to break a 301→308 loop that ate POST bodies. Phase-10 30d cache preserved on `/file/*`.
- **Pages → 14 Globals refactor** (`3bc02e5`, 2026-05-22): single `Pages` collection split into 14 per-route Globals, then later expanded to 18 Section Globals via R1/R4/R6/R7/R8. Original `Pages` collection unregistered 2026-05-24; DB table retained as one-shot rollback backup.

### Image pipeline (2026-05-27)

- **All 52 routes HTTP 200 ✅** (verified 2026-05-27). Real blog slugs: `the-quiet-rhinoplasty`, `before-you-fly`, `the-villa-protocol`, `fillers-restraint`, `achsi-what-it-means`, `crani-bali`, `dental-veneers-honesty`.
- **10 page hero slots** — all unique, zero duplicates, zero placeholders. Journey + contact heroes are Vertex AI Imagen 3 generated (`journey-hero.webp` ID 94, `contact-hero.webp` ID 96).
- **Contact visit map** (`contact-map.webp` ID 95) — AI-generated Nusa Dua coastal map illustration.
- **`isPlaceholder` flag on IDs 73–92** — synthetic cream-coloured lifestyle PNGs from seed-upgrade-media.ts; suppressed in `mediaUrl()`. Do not unset.
- **nginx media serving** — `/api/media/file/` served direct from disk (`alias /var/www/cosmedic/packages/cms/media/`), falling back to Payload proxy. CMS restarts never cause 404s.
- **`?v=1` cache-bust** — appended to all CMS media URLs via `withVer()` in `cms.media.ts`. Bump to `v=2` on production migration.
- **SubCategoryDetail heroImage** — now reads `cms.subCategories[slug].heroImage` first, falls back to `TREATMENT_IMG(parent.slug)`. 17 sub-cat slots are CMS-ready; none have images uploaded yet.
- **Full image inventory** → `docs/image_inventory.md`.

### Gotchas to remember next session

- **`payload migrate` hangs silently on large migrations** even with `--force-accept-warning`. The 4800-LOC migration sat for 20+ min using 12 sec of CPU, never submitting any DDL. **Workaround**: extract the `await db.execute(sql\`...\`)` body via `awk 'NR>=5 && NR<=N { sub close-backtick from last line }'` to a `.sql` file and pipe to `psql --single-transaction -v ON_ERROR_STOP=1`. Applies in seconds. Then `INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ('<migration-name>', <next-batch>, NOW(), NOW())` to register it as applied.
- **Postgres 63-char identifier limit** — block field enums named `enum_<gslug>_blocks_<bslug>_<field>` can exceed it when the global slug is long. `recovery-stays-page` and `video-consult-page` needed `dbName: 'rec_stays_pg'` / `dbName: 'vid_consult_pg'` overrides on the GlobalConfig.
- **Direct psql DDL leaves objects owned by `postgres`** — the Payload runtime connects as `cosmedic` and gets `permission denied` on `ALTER`. After applying schema directly, run `ALTER TABLE/SEQUENCE/TYPE OWNER TO cosmedic` for every new public-schema object. One-shot pattern: `psql -tAc "SELECT 'ALTER TABLE \"' || tablename || '\" OWNER TO cosmedic;' FROM pg_tables WHERE schemaname='public'" | psql`. Also set default privileges: `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cosmedic`.
- **`tsx` scripts that call `getPayload()` trigger `pushDevSchema`** unless `NODE_ENV=production` is set. The drizzle push tries `ALTER TABLE ... DROP CONSTRAINT` and fails on non-owner. Always invoke one-off migration scripts as `NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx <script>`.
- **`git stash -u` will sweep untracked top-level directories** — `changes/` got vacuumed into the stash during rollback. Recoverable via `git checkout stash@{0}^3 -- <path>`. `/changes/` is now in `.gitignore` for scratch uploads.
- **CMS `next build` chokes on cross-package seed imports** of `@/lib/cms-proxy`. Fix: add seed scripts to `packages/cms/tsconfig.json` `exclude` (precedent: `a18c700`). They run via `tsx` CLI; Next doesn't need to bundle them.
- **psql peer-auth error** (`FATAL: Peer authentication failed for user "cosmedic"`) — always connect via TCP: `psql -h 127.0.0.1 -U cosmedic -d cosmedic`. Extract password: `PGPASSWORD=$(grep DATABASE_URI packages/cms/.env | sed 's/.*cosmedic:\([^@]*\)@.*/\1/')`.
- **DB backup** — daily `pg_dump` cron at `0 2 * * *` UTC via `/usr/local/bin/cosmedic-db-backup.sh`. Dumps to `/var/backups/cosmedic/`, retains 14 copies, logs to `/var/log/cosmedic-backup.log`. First dump: `cosmedic-20260526-053120.dump` (1.5 MB). To restore: `PGPASSWORD=... pg_restore -h 127.0.0.1 -U cosmedic -d cosmedic -Fc /var/backups/cosmedic/<file>.dump`.

## Completed phases (full detail in docs)

- **Phase M — Mobile-Responsive Sweep** ✅ 2026-05-23. Zero horizontal scroll across 46 routes × 5 widths (320/375/414/640/768). Sign-off: [docs/planning/phase-m-signoff.md](docs/planning/phase-m-signoff.md). Audit harness at `/tmp/cosmedic-audit/`.
- **Phase N — Header / Chrome / Pricing polish** ✅ 2026-05-23. N1 `f053733`, N2 `e6f8c8b`, N3 `e90302f`.
- **Phase Q — change-request batch** ✅ 18/19 shipped 2026-05-24 (q17 image-set deferred pending Figma access). Per-q tracker: [docs/changes/changerequest_21May.md](docs/changes/changerequest_21May.md). Companion: [docs/changes/change01.md](docs/changes/change01.md), [docs/changes/change2a.pdf](docs/changes/change2a.pdf).

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
