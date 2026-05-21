# BIMC CosMedic — Claude Code Project Guide

> Guide for Claude Code sessions working in `/var/www/cosmedic/`. Read this before doing anything; the comprehensive specs live in `docs/`.

## What this is

A new marketing site for **BIMC CosMedic**, the plastic-surgery & aesthetic-medicine clinic of Bali International Medical Centre in Nusa Dua, Bali. Audience: international medical tourists (AU, US, EU) seeking discretion, clinical credibility, and a restorative atmosphere.

Goal: ship a multi-page editorial-luxury site (~88 routes — homepage, 6 disciplines, 18 sub-categories, 41+ procedures, 8 surgeon profiles, plus journey/gallery/stories/press/pricing/recovery/contact/blog) with CMS-managed content, IDR-primary + AUD pricing, EN | ID language switcher.

- **Production domain**: `https://cosmedic.gaiada.online`
- **Repo**: `git@github.com:Gaia-Digital-Agency/cosmedic.git`
- **Stack**: Vite SSR · React · Tailwind · Payload CMS · Node · Postgres (VRTPN)
- **CMS branding**: White-labelled as **"Cosmedic CMS"** using `docs/brand-guidelines.pdf`

## Non-negotiables

Every change must respect:

1. **Frontend pixel-fidelity to Claude Design** — production matches design 100%. See [docs/sitemap.md](docs/sitemap.md) for the route matrix; see [design/](design/) for source.
2. **Lighthouse Green on every page** — Accessibility / Best Practices / SEO ≥ 90 on every route × every breakpoint.
3. **Editor-friendly CMS** — every editorial string + every image lives in a Payload collection. See [docs/db_schema.md](docs/db_schema.md).
4. **Cosmedic CMS branding** — Payload admin uses the BIMC brand identity. See [docs/cms_info.md](docs/cms_info.md).
5. **Multisite-safe** — `/var/www/cosmedic/` is one of ~10 sites on this server. **Never `pm2 restart all`. Always `nginx -t` before reload. Never touch sibling certs/databases.**

## Docs to read first

| File | When |
|---|---|
| [docs/architecture_info.md](docs/architecture_info.md) | Before any architectural decision — runtime topology, stack, deploy |
| [docs/file_structure.md](docs/file_structure.md) | Before moving/creating folders or files |
| [docs/db_schema.md](docs/db_schema.md) | Before designing or seeding any Payload collection (the WHAT) |
| [docs/db_ops.md](docs/db_ops.md) | Before Postgres provisioning, migrations, backups, or perf debugging (the HOW) |
| [docs/sitemap.md](docs/sitemap.md) | Before adding/removing routes or nav items |
| [docs/cms_info.md](docs/cms_info.md) | Before changing anything in `packages/cms/src/components/` or `payload.config.ts` admin block (the LOOK) |
| [docs/cms_ops.md](docs/cms_ops.md) | Before writing Payload hooks, access control, seed scripts, drafts/preview, or email pipeline (the HOW) |
| [docs/cms_schema.md](docs/cms_schema.md) | Before adding a UI surface — verify it traces to a CMS entity (Non-negotiable #3 audit) |
| [docs/plan.md](docs/plan.md) | Before starting any phase — the 14-phase execution plan + locked decisions |
| [docs/todo.md](docs/todo.md) | Master TODO — phase checklist + 47-page CMS record tracker |
| [docs/cms_todo.md](docs/cms_todo.md) | Working TODO — Phase M (mobile sweep) + Phase N (header/FAB/pricing fixes), updated 2026-05-21 |
| [docs/brand-guidelines.pdf](docs/brand-guidelines.pdf) | Canonical brand source — palette, typography, mark, usage rules |
| [docs/pricelist.xlsx](docs/pricelist.xlsx) | Canonical clinic price + procedure catalogue — seed source for Phase 6 |
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
- Treat `docs/brand-guidelines.pdf` and `docs/pricelist.xlsx` as **source-of-truth inputs** — quote from them when justifying decisions.
- Pixel-Fidelity Gate + Lighthouse Green Gate are launch-blocking. Don't bypass them.
- This server is the dev environment (user chose server-first). Edits happen here; commits + pushes happen here.

## Current state (Phase 8 complete)

- `packages/cms` — Payload 3.84.1 on Next.js 15.4.11 + Postgres adapter, port **4007**. Admin white-labelled as **Cosmedic CMS** (Cormorant Garamond + JetBrains Mono, brand-beige palette from `docs/brand-guidelines.pdf`). Light/dark toggle.
  - **23 collections** in `src/collections/`: Users · Media · Surgeons · Disciplines · SubCategories · Procedures · PriceListItems · InjectableProducts · MachineTreatments · HairRemovalAreas · BeforeAfterCases · Stories · PressMentions · Awards · RecoveryStays · PricingTiers · BlogPosts · BlogTags · Authors · JourneySteps · InclusionItems · ExclusionItems · Pages · Enquiries.
  - **10 globals** in `src/globals/`: Settings · Header · Footer · FloatingChrome · BrandStats · EndorsementMark · ConsultationPolicy · FormDefaults · EmailTemplates · SeoDefaults.
  - Phase-6 seed (`src/seed/runtime.ts` + `src/seed/parse-pricelist.ts`) parses all 7 sheets of `docs/pricelist.xlsx` and idempotently upserts into Payload via Local API. Run with `pnpm --filter @cosmedic/cms seed`. Seed source files are imported from `packages/web/src/content/*` via relative path (will be deleted after Phase 6c rewires every web page).
  - Counts seeded: **149 PriceListItems**, 93 Procedures, 8 Surgeons, 6 Disciplines, 17 SubCategories, 24 MachineTreatments, 43 HairRemovalAreas, 34 InjectableProducts, 6 JourneySteps, 5 Inclusions, 7 Exclusions, 5 Awards, 3 PressMentions, 6 RecoveryStays, 3 PricingTiers, 7 BlogPosts, 8 Pages, 10 globals.
- `packages/web` — Vite 6 SSR + React 19 + Express, port **3007**. Renders the full homepage matching the Claude Design source.
  - `design/global.css` (3,687 lines) ported **verbatim** to `packages/web/src/styles/globals.css`.
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
  - `/pricing` route renders a `ClinicCatalogueTable` block under the editorial pricing — full CMS-driven view of every line item from `docs/pricelist.xlsx` (surgical, machine, injection, BTL), grouped by sheet → category, with consultation-policy callout from `consultation-policy` global.
  - **Phase 6b + 6c**: Every page reads CMS data through lazy Proxy-backed shims at `src/content/*.ts` (see `src/lib/cms-proxy.ts` + `src/lib/cms-adapters.ts`) — no component rewrites needed. `lazyArray` / `lazyRecord` from `cms-proxy.ts` wrap exports so each access reifies from the current `getCmsCacheSync()` snapshot, memoized by `cmsCache.loadedAt`. Shell components (Header / Footer / FloatingChrome) wire to the corresponding globals. `<TrustStrip>` reads `brand-stats.stats`. `<Hero>` reads `pages[home]` for tagline/title/lede/heroImage. `<CmsExtraBlocks slug="..."/>` injects any clinic-edited `Pages.sections` blocks (15 block types) on Home / Journey / Contact / Privacy / Press / Gallery / Stories / VideoConsult / RecoveryStays. Payload `revalidationHooks()` (in `packages/cms/src/lib/revalidate.ts`) is spread into every collection + global so saves POST to `web /api/revalidate` and bust the cache within seconds. All 51 routes still 200 after the rewrite.
- Postgres `cosmedic` role + db provisioned on `127.0.0.1:5432`. Phase 6 catalogue migration applied. Super-admin seeded. Content seed run.
- pm2 manages both processes (`cosmedic-cms`, `cosmedic-web`); `pm2 save` persisted.

- **Phase 7**: `POST /api/enquiry` on web (Zod schema in `lib/enquiry-schema.ts` + IP rate-limit in `lib/enquiry-rate-limit.ts`: 2 req/IP/60s) creates `Enquiries` records via Payload REST. Honeypot is silent-accept-as-spam. `Enquiries.afterChange` (only on `operation === 'create'`) calls `sendEnquiryEmails` → loads the `email-templates` global + sends clinic-notify to `MAIL_CLINIC_TO` and autoresponder to submitter via the `nodemailerAdapter` in `packages/cms/src/lib/email-adapter.ts`. SMTP is env-driven (`SMTP_HOST/PORT/USER/PASS/SECURE`); when unset, JSON transport logs full message to stdout (no delivery — safe for dev + pre-launch). Hero quick-form on `/` + full form on `/contact` both POST to `/api/enquiry` with inline success/error states.

- **Phase 8**: Live at **https://cosmedic.gaiada.online** with green padlock. DNS A record points to `34.124.244.233`; Let's Encrypt cert at `/etc/letsencrypt/live/cosmedic.gaiada.online/` (issued 2026-05-20, expires 2026-08-18). nginx block in `/etc/nginx/sites-enabled/subdomains.gaiada.online` mirrors the christos VRTPN pattern — HTTP→HTTPS 301, web-owned `/api/{page-data,preview,exit-preview,revalidate,enquiry}` → `:3007`, Payload `/admin` + `/_next` + `/api` → `:4007` (25M client_max_body_size for media uploads), `/` → `:3007` (Vite SSR). Backup of pre-Phase-8 nginx config stashed at `/etc/nginx/backups/subdomains.gaiada.online.bak-phase8-*`. Smoke-tested: homepage 200, `/admin` 200, `/api/revalidate` `{ok:true}`, `/api/enquiry` returns Zod validation errors, all sibling sites unchanged. **Pending pre-launch**: SMTP provider for enquiry emails (currently JSON transport — no delivery).

**Known issue surfaced during Phase 8 smoke**: SSR router uses `/surgeon-<slug>` but sitemap + header links use `/surgeons/<slug>` — surgeon detail pages 404. Fix during Phase 11.

## Phase M (Mobile-Responsive Sweep) — IN PROGRESS, paused 2026-05-21

User-set acceptance criterion: **no horizontal scroll at any width on any route. Only vertical scroll.** User confirmed scope: header + all 51 routes. Burger contents: nav links only (logo + lang switcher + CTA stay visible in header bar at widths where they fit).

### Already shipped (live)
- **Logo white-smudge fix** — `.logo .logo-img-dark { display: none }` was being overridden by `.logo img { display: block }` (higher specificity). Both logo `<img>` elements were rendering side-by-side; the all-white variant created a faint smudge next to the dark logo. Scoped the swap selectors under `.logo`. (`packages/web/src/styles/globals.css:196-201`)
- **Logo-swap-on-scroll removed** — Header background stays cream at all scroll positions, but the CSS was swapping to the white logo when `.site-header.scrolled` — making the logo invisible. Removed the scrolled-state swap entirely. CMS `Header.logoDark` field is preserved (Rule 4) but no longer rendered until a real dark-header state is introduced. (`packages/web/src/styles/globals.css:196-204`)
- **M2 partial — burger threshold + header collapse rules** — at `max-width: 1100px`, primary nav now collapses to burger BUT lang switcher + CTA remain visible (previously they were hidden). At `max-width: 700px`, the inline `logo-endorsement-line` / `logo-endorsement-mark` are hidden (the logo PNG already includes "Managed by BIMC Hospital"), `lang-switcher` hides, header padding tightens, CTA shrinks. (`packages/web/src/styles/globals.css:1349-1380`)

### Known broken at pause point (must fix next session)
- **320–375px header overflow** — the CTA "Plan Your Treatment" still pushes the burger button off-screen. The `@media (max-width: 420px) { .header-cta span:not(.btn-arrow) { display: none } }` rule I added to collapse the CTA to icon-only was NOT applied at runtime (verified via screenshot: CTA text still rendering full at 320). Needs investigation — possibly specificity, possibly the inner `<span>` selector mismatching the rendered DOM. (`packages/web/src/styles/globals.css:1383-1388`)

### Audit-in-flight results (incomplete — 45 of 51 routes scanned)
Audit script: `/tmp/cosmedic-audit/audit.mjs` (uses chromium + CDP, measures `documentElement.scrollWidth > innerWidth` and lists offending elements). Run log: `/tmp/cosmedic-audit/run.log`. Re-run with `cd /tmp/cosmedic-audit && stdbuf -oL node audit.mjs > run.log 2>&1 &`.

Routes with confirmed horizontal overflow (so far):
- `/video-consult` — overflows by 97px at 768px viewport
- `/surgeon-risma` — overflows by 30px at 768px viewport
- `/surgeon-wara` — overflows by 21px at 768px viewport

Routes NOT yet audited at pause point: the remaining `/treatment-reconstructive-trauma`, `/treatment-recovery`, `/treatment-surgical`, `/treatment-surgical-body`, `/treatment-surgical-breast`, `/treatment-surgical-face`, `/treatment-weight-loss-*`. Resume by re-running the audit script — should take ~5 minutes wall-clock.

Note: most routes report OK on the document-level overflow check, but visual inspection of the homepage at 375px showed text that *appeared* clipped (e.g. hero headline "Considered work…in considered hands" cut mid-word). That clipping is caused by `overflow: hidden` on a parent, not by horizontal scroll. User criterion is no horizontal scroll, but clipped content is still a UX defect to address in M3.

### Task list snapshot
- #1 M1 (in_progress) — Multi-breakpoint audit of all 51 routes
- #2 M2 (pending) — Tighten nav→burger threshold (mostly done; 320–375 burger-missing bug remains)
- #3 M3 (pending, blocked by #1) — Per-route responsive fixes
- #4 M4 (pending, blocked by #2 + #3) — Re-screenshot + sign-off

### Resume protocol
1. Re-run audit, capture complete `OVERFLOW` list across all 51 routes.
2. Fix the 320–375 burger-missing bug first (smallest, most visible).
3. Tackle `/video-consult` (97px overflow — largest signal of structural issue).
4. Spot-check surgeon detail pages at 768 (`/surgeon-risma`, `/surgeon-wara`).
5. Run audit again; require zero overflows before declaring M4 done.

## Phase N (Header + Chrome + Pricing polish) — queued 2026-05-21

User added these alongside the Phase M resume work. Detail in [docs/cms_todo.md](docs/cms_todo.md).

- **N0 — Mobile-view spot check** across 320 / 375 / 414 / 640 / 768. Overlaps with M1 + M4 but specifically includes golden-path UX (clipped headlines, broken stacking, touch targets < 44px), not just document-level horizontal overflow.
- **N1 — "MANAGED BY BIMC HOSPITAL" endorsement alignment.** Vertically centre `logo-endorsement-line` / `logo-endorsement-mark` to the COSMEDIC brand logo glyph in the nav bar; resize for visual balance. Affected: `packages/web/src/components/shell/Header.tsx` + `globals.css` (`.logo`, `.logo-endorsement-line`, `.logo-endorsement-mark`).
- **N2 — Back-to-Top = WhatsApp FAB size.** In `FloatingChrome`, make the Back-to-Top button match the WA FAB's width / height / border-radius / shadow exactly so they read as a paired chrome cluster. Affected: `packages/web/src/components/shell/FloatingChrome.tsx` + floating-chrome rules in `globals.css`.
- **N3 — `/pricing` table consistency.** Inside the `ClinicCatalogueTable` block at `https://cosmedic.gaiada.online/pricing`: enforce consistent column widths across every category table, left-align all text columns (procedure name, notes, anaesthesia type). Numeric columns (IDR / AUD) stay right-aligned per currency convention. Affected: the `ClinicCatalogueTable` block component + its styles. Trace from `packages/web/src/routes/pricing/`.

**Order of work next session:** N1 → N2 → N3 (small, isolated, high-visibility wins) → resume M1 → M2 → M3 → M4.

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
