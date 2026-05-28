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
| [docs/changes/change_request_may25.md](docs/changes/change_request_may25.md) | **Active change request (CR25May).** 48-item TODO + Details. Section 1 = Rules (8 CMS + 3 Standing + 4 Operating + 8-step workflow). Read before every change. |
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

## Current state (2026-05-27)

**Live:** https://cosmedic.gaiada.online · DNS `34.124.244.233` · Let's Encrypt cert expires 2026-08-18 · **52 routes HTTP 200 ✅** · CR25May 38/48 closed · **3 launch-blocking open: 25.3 SMTP · 25.32 visual QA · 25.38 form E2E**

### `packages/cms` — Payload 3.84.1, port 4007

- **18 live collections**: Users · Media · Surgeons · Disciplines · SubCategories · Procedures · BeforeAfterCases · Stories · PressMentions · Awards · RecoveryStays · BlogPosts · BlogTags · Authors · JourneySteps · Enquiries · PrivacySections · Analytics.
- **~42 globals** across `src/globals/` (10 top-level) + `src/globals/pages/` (14 Page Globals + 18 Section Globals from Phase R).
- **8 admin buckets** (no standalone Pricing bucket — changes08-A moved 9 Pricing globals to Treatments): Homepage · Treatments · Doctors · Results · Journey · Contact · About · Media Library + ungrouped Users. Full bucket map in [docs/changes/app_map.md](docs/changes/app_map.md).
- Seed: `pnpm --filter @cosmedic/cms seed` — idempotent upsert from `docs/assets/pricelist.xlsx` + `packages/web/src/content/*`.

### `packages/web` — Vite 6 SSR + React 19 + Express, port 3007

- **URL structure**: `/treatments/{discipline}/{sub}` (nested, e.g. `/treatments/surgical/face`). 28 legacy flat URLs 301-redirect via `LEGACY_SUB_REDIRECTS` in `router.ts`. Discipline slugs: `surgical` · `reconstructive` · `non-surgical` · `hair` · `dental` · `weight-loss`.
- **CSS**: split into 13 partials under `packages/web/src/styles/partials/`. Edit the owning partial, not `globals.css` (13-line `@import` index).
- **CMS data layer**: `src/lib/cms.ts` fetches all collections+globals from `http://127.0.0.1:4007/api/...`, caches 60s TTL, busted via `POST /api/revalidate` on every Payload save. Pages read via lazy Proxy shims (`cms-proxy.ts` + `cms-adapters.ts`).
- **Enquiry pipeline**: `POST /api/enquiry` → Zod validate + IP rate-limit (2/IP/60s) → Payload Enquiries → nodemailer email. SMTP creds pending (CR25May 25.3).
- **Pricing**: IDR primary + AUD secondary always shown inline (no toggle). All prices on `Procedures.pricing_price_idr2026`. `catalogue_group` (`surgical`/`machine`/`injection`/`btl`) drives `/pricing` table grouping.

### nginx

Block in `/etc/nginx/sites-enabled/subdomains.gaiada.online`: HTTP→HTTPS 301, `/api/media/file/` → disk alias, `/api/*` + `/_next/*` + `/admin*` → :4007, `/` → :3007 (25M body for uploads). Backups under `/etc/nginx/backups/`.

### Images (2026-05-27)

- All 18 sub-category hero slots filled (Figma images, commit `9cd808a`).
- `isPlaceholder: true` on media IDs 73–92 — synthetic seed PNGs, suppressed in `mediaUrl()`. Do not unset.
- `?v=1` cache-bust on all CMS media URLs via `withVer()`. Bump to `v=2` on migration.
- Full inventory: [docs/image_inventory.md](docs/image_inventory.md).

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

- **Phase M — Mobile-Responsive Sweep** ✅ 2026-05-23. Zero horizontal scroll across 46 routes × 5 widths. Sign-off: [docs/planning/phase-m-signoff.md](docs/planning/phase-m-signoff.md).
- **Phase N — Header / Chrome / Pricing polish** ✅ 2026-05-23.
- **Phase Q — change-request batch** ✅ 19/19 shipped (q17 Figma images delivered 2026-05-27, commit `9cd808a`). Per-q tracker: [docs/changes/changerequest_21May.md](docs/changes/changerequest_21May.md).
- **Phase R (Admin IA Remap)** — R0/R1/R2/R4/R6/R7/R8 ✅ shipped · R3/R5 pending. Plan: [docs/remap_plan.md](docs/remap_plan.md).
- **changes08** ✅ 2026-05-27 — 9 Pricing globals moved to Treatments bucket; 5 orphan pricing collection TS files deleted. Orphan DB tables retained.

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
