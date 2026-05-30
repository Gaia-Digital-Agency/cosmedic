# BIMC CosMedic — Claude Code Project Guide
**Updated:** 2026-05-29 | **Server:** `ssh gda-s01 → /var/www/cosmedic/` | **Local:** `cd ~/downloads/cosmedic_local && claude`

> Read this before doing anything. Comprehensive specs live in `docs/` on the server.

---

## What this is

A new marketing site for **BIMC CosMedic**, the plastic-surgery & aesthetic-medicine clinic of Bali International Medical Centre in Nusa Dua, Bali. Audience: international medical tourists (AU, US, EU) seeking discretion, clinical credibility, and a restorative atmosphere.

Goal: ship a multi-page editorial-luxury site (~88 routes — homepage, 6 disciplines, 18 sub-categories, 41+ procedures, 8 surgeon profiles, plus journey/gallery/stories/press/pricing/recovery/contact/blog) with CMS-managed content, IDR-primary + AUD pricing, EN | ID language switcher.

- **Production domain**: `https://cosmedic.gaiada.online`
- **Repo**: `git@github.com:Gaia-Digital-Agency/cosmedic.git`
- **Stack**: Vite SSR · React · Tailwind · Payload CMS · Node · Postgres (VRTPN)
- **CMS branding**: White-labelled as **"Cosmedic CMS"** using `docs/assets/brand-guidelines.pdf`

---

## Connections

| | |
|---|---|
| SSH | `gda-s01` → `/var/www/cosmedic/` |
| CMS Admin | https://cosmedic.gaiada.online/admin (port 4007) |
| Web | https://cosmedic.gaiada.online (port 3007) |
| Stack | Vite 6 SSR + React 19 + Payload CMS 3.84.1 + Postgres |

## Figma Source

| | |
|---|---|
| File | Cosmedic Image generation · `KjPZnGnbpa994mf7byvcW7` |
| Pages | Page 1 (main moodboard) · Page 2 (extra photos) · Page 3 (empty) |
| MCP | User-scope API key stored in `~/.claude.json` on local machine (never commit to git) |

---

## Non-negotiables

Every change must respect:

1. **Frontend pixel-fidelity to Claude Design** — production matches design 100%. See [docs/architecture/sitemap.md](docs/architecture/sitemap.md) for the route matrix; see [design/](design/) for source.
2. **Lighthouse Green on every page** — Accessibility / Best Practices / SEO ≥ 90 on every route × every breakpoint.
3. **Editor-friendly CMS** — every editorial string + every image lives in a Payload collection. See [docs/db/db_schema.md](docs/db/db_schema.md).
4. **Cosmedic CMS branding** — Payload admin uses the BIMC brand identity. See [docs/cms/cms_info.md](docs/cms/cms_info.md).
5. **Multisite-safe** — `/var/www/cosmedic/` is one of ~10 sites on this server. **Never `pm2 restart all`. Always `nginx -t` before reload. Never touch sibling certs/databases.**

---

## Docs to read first

| File | When |
|---|---|
| [docs/architecture/architecture_info.md](docs/architecture/architecture_info.md) | Before any architectural decision — runtime topology, stack, deploy |
| [docs/architecture/file_structure.md](docs/architecture/file_structure.md) | Before moving/creating folders or files |
| [docs/db/db_schema.md](docs/db/db_schema.md) | Before designing or seeding any Payload collection (the WHAT) |
| [docs/db/db_ops.md](docs/db/db_ops.md) | Before Postgres provisioning, migrations, backups, or perf debugging (the HOW) |
| [docs/architecture/sitemap.md](docs/architecture/sitemap.md) | Before adding/removing routes or nav items |
| [docs/cms/cms_info.md](docs/cms/cms_info.md) | Before changing anything in `packages/cms/src/components/` or `payload.config.ts` admin block |
| [docs/cms/cms_ops.md](docs/cms/cms_ops.md) | Before writing Payload hooks, access control, seed scripts, drafts/preview, or email pipeline |
| [docs/cms/cms_schema.md](docs/cms/cms_schema.md) | Before adding a UI surface — verify it traces to a CMS entity |
| [docs/planning/plan.md](docs/planning/plan.md) | Before starting any phase — the 14-phase execution plan + locked decisions |
| [docs/planning/all_todo.md](docs/planning/all_todo.md) | **Single TODO file** — covers DO FIRST/SECOND/THIRD plus Phases C/M/N/P/Q. Replaces former `cms_todo.md` and absorbs `todo.md` (since 2026-05-23). |
| [docs/remap.md](docs/remap.md) | **Phase R — Admin↔Site IA Remap.** Target Bucket structure (9 prefixed + Users) + per-Bucket item maps. |
| [docs/remap_plan.md](docs/remap_plan.md) | **Phase R implementation plan.** R0/R1/R2/R4/R6/R7/R8 ✅ shipped · R3/R5 pending. |
| [docs/changes/change_request_may25.md](docs/changes/change_request_may25.md) | **Active change request (CR25May).** 48-item TODO + Details. Section 1 = Rules. Read before every change. |
| [docs/assets/brand-guidelines.pdf](docs/assets/brand-guidelines.pdf) | Canonical brand source — palette, typography, mark, usage rules |
| [docs/assets/pricelist.xlsx](docs/assets/pricelist.xlsx) | Canonical clinic price + procedure catalogue — seed source for Phase 6 |
| [design/](design/) | Original Claude Design source — never modified, only mirrored |

---

## Sibling sites on this server (gda-s01)

This server hosts ~10 other production sites under `*.gaiada.online`. **Do not look at them, read from them, or reference them.** All cosmedic work derives from this project's own `docs/` folder. Never `pm2 restart all`. Never reload nginx without `nginx -t`. Never touch any other site's files, certs, or databases.

## Port allocation

- **cosmedic-web** → `3007`
- **cosmedic-cms** → `4007`

Verify free with `ss -tlnp | grep ':3007\|:4007'` before binding.

## Postgres

Local Postgres on `127.0.0.1:5432`. Dedicated `cosmedic` role + db — never reuse another site's.

---

## Working rules for Claude sessions

- Scope every action to `/var/www/cosmedic/`. Touch siblings only when explicitly asked.
- Read the relevant `docs/*.md` before making decisions that affect that area.
- Treat `design/` as **read-only**.
- Treat `docs/assets/brand-guidelines.pdf` and `docs/assets/pricelist.xlsx` as **source-of-truth inputs** — quote from them when justifying decisions.
- Pixel-Fidelity Gate + Lighthouse Green Gate are launch-blocking. Don't bypass them.
- This server is the dev environment (user chose server-first). Edits happen here; commits + pushes happen here.
- **Be supercritical + reality-grounded + 99.9999999999999% accurate.** Never overreport. Every claim of "done", every checkbox ticked, every count must reflect literal truth on disk / live site / DB. **If unsure: verify TWICE, not once** (two independent checks — e.g. grep the file AND curl the URL; query the DB AND read the page HTML). No partial-credit framing, no aspirational status, no "✅" for items where any part is blocked.
- **Never overwrite existing CMS/DB data.** If a field/row already has a non-empty value, do NOT overwrite. Seed/migration only inserts when destination is empty (`WHERE col IS NULL OR col = ''`). Wire-up reads before write. If existing non-empty data needs to change, **ASK first** — editor content is authoritative, seed defaults are placeholders.

---

## Current state (2026-05-29)

**Live:** https://cosmedic.gaiada.online · DNS `34.124.244.233` · Let's Encrypt cert expires 2026-08-18 · **52 routes HTTP 200 ✅** · CR25May 38/48 closed · **3 launch-blocking open: 25.3 SMTP · 25.32 visual QA · 25.38 form E2E**

### `packages/cms` — Payload 3.84.1, port 4007

- **18 live collections**: Users · Media · Surgeons · Disciplines · SubCategories · Procedures · BeforeAfterCases · Stories · PressMentions · Awards · RecoveryStays · BlogPosts · BlogTags · Authors · JourneySteps · Enquiries · PrivacySections · Analytics.
- **~42 globals** across `src/globals/` (10 top-level) + `src/globals/pages/` (14 Page Globals + 18 Section Globals from Phase R).
- **8 admin buckets**: Homepage · Treatments · Doctors · Results · Journey · Contact · About · Media Library + ungrouped Users. Full bucket map in [docs/changes/app_map.md](docs/changes/app_map.md).
- Seed: `pnpm --filter @cosmedic/cms seed` — idempotent upsert from `docs/assets/pricelist.xlsx` + `packages/web/src/content/*`.

### `packages/web` — Vite 6 SSR + React 19 + Express, port 3007

- **URL structure**: `/treatments/{discipline}/{sub}` (nested). 28 legacy flat URLs 301-redirect via `LEGACY_SUB_REDIRECTS` in `router.ts`. Discipline slugs: `surgical` · `reconstructive` · `non-surgical` · `hair` · `dental` · `weight-loss`.
- **CSS**: split into 13 partials under `packages/web/src/styles/partials/`. Edit the owning partial, not `globals.css`.
- **CMS data layer**: `src/lib/cms.ts` fetches all collections+globals from `http://127.0.0.1:4007/api/...`, caches 60s TTL, busted via `POST /api/revalidate` on every Payload save.
- **Enquiry pipeline**: `POST /api/enquiry` → Zod validate + IP rate-limit (2/IP/60s) → Payload Enquiries → nodemailer email. SMTP creds pending (CR25May 25.3).
- **Pricing**: IDR primary + AUD secondary always shown inline. All prices on `Procedures.pricing_price_idr2026`. `catalogue_group` drives `/pricing` table grouping.

### nginx

Block in `/etc/nginx/sites-enabled/subdomains.gaiada.online`: HTTP→HTTPS 301, `/api/media/file/` → disk alias, `/api/*` + `/_next/*` + `/admin*` → :4007, `/` → :3007 (25M body for uploads). Backups under `/etc/nginx/backups/`.

### Images (2026-05-29)

**Figma → CMS image migration: ✅ COMPLETE** (commit `9cd808a`, 2026-05-27)

- All 18 sub-category hero slots filled with Figma images.
- `isPlaceholder: true` on media IDs 73–92 — synthetic seed PNGs, suppressed in `mediaUrl()`. Do not unset.
- `?v=1` cache-bust on all CMS media URLs via `withVer()`. Bump to `v=2` on next migration.
- Full inventory: [docs/assets/image_inventory.md](docs/assets/image_inventory.md).

**Figma source summary** (46 total images):

| Category | Count | Status |
|---|:---:|---|
| Total Figma images | 46 | All unique |
| Surgeon portraits | 8 | ✅ Already in CMS — skip re-upload |
| Uploaded 2026-05-27 | 25 | ✅ Done (commit `9cd808a`) |
| not_usable (REF-ONLY + owner-rejected) | 13 | Do not upload |

**8 surgeons — confirmed in CMS** (pixel-matched against live site):

| Surgeon | Slug | CMS file |
|---|---|---|
| Dr. I Made Suka Adnyana | `suka` | dr suka.webp |
| Dr. Ida Bagus Agung Indra Pramana | `indra` | dr indra.webp |
| Dr. Gede Wara Samsarga | `wara` | dr gede.webp |
| Dr. Astrinita Lestari Suyata | `astri` | dr astri.webp |
| Dr. Rosalina Silvia Dewi | `rosa` | dr rosa.webp |
| Dr. I Gusti Ayu Risma Pramita | `risma` | dr Risma.webp |
| Dr. Sissy Yunita Surya | `sissy` | dr sissy.webp |
| Dr. Theresia Indri Indrawati Setiadi | `theresia` | dr Theresia.webp |

**Not uploaded (owner-rejected or REF-ONLY):**

| File | Reason |
|---|---|
| `About__AboutPage__technology-or-approach-section__image--magnific-composite.png` | Owner rejected 2026-05-27 |
| `Contact__ContactVisitSection__buildingExterior--web-contact-visit.png` | Owner rejected 2026-05-27 |
| `Homepage__HomeHero__heroImage--VERIFY-DUPLICATE-OF-CMS-ID-50.png` | Owner rejected 2026-05-27 |
| `REF-ONLY__design-screenshot-01..09__DO-NOT-UPLOAD.png` | Design screenshots |
| `REF-ONLY__WRONG-PROJECT-Kalmra-moodboard__DO-NOT-UPLOAD.png` | Wrong project |

**Photography gaps — no suitable image exists yet:**

1. `hair/therapy` — Follicle Therapy
2. `dental/alignment`
3. `dental/veneers`
4. `dental/whitening`
5. `weight-loss/glp-1`

---

## Local working folder (`~/downloads/cosmedic_local/`)

Used for local Claude Code sessions (Figma MCP, image prep, planning). Not deployed to server.

```
cosmedic_local/
├── CLAUDE.md                      ← This file
├── .claude/                       ← Claude Code local config (Figma MCP key here)
├── figma_finding.md               ← Complete Figma → CMS → Web 1:1 map
├── images/                        ← 33 confirmed-usable Figma images (PNGs + converted WebPs)
│   ├── Treatments__SubCategories__*.png
│   ├── Doctors__Surgeons__*__ALREADY-IN-CMS.png
│   ├── Doctors__SurgeonsHero__*.png
│   ├── Homepage__*.png  Contact__*.png  Journey__*.png  Results__*.png  About__*.png
│   ├── not_usable/                ← 13 files — DO NOT UPLOAD
│   └── MAPPING.md                 ← Quick-reference table
└── current_cms_photos/            ← 8 surgeon webps pulled from live site (for comparison)
```

---

## Gotchas to remember next session

- **`payload migrate` hangs silently on large migrations** even with `--force-accept-warning`. Workaround: extract the `await db.execute(sql\`...\`)` body to a `.sql` file and pipe to `psql --single-transaction -v ON_ERROR_STOP=1`. Then register manually: `INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ('<name>', <batch>, NOW(), NOW())`.
- **Postgres 63-char identifier limit** — block field enums named `enum_<gslug>_blocks_<bslug>_<field>` can exceed it. `recovery-stays-page` and `video-consult-page` needed `dbName` overrides.
- **Direct psql DDL leaves objects owned by `postgres`** — Payload connects as `cosmedic` and gets `permission denied`. After applying schema directly, run `ALTER TABLE/SEQUENCE/TYPE OWNER TO cosmedic` for every new public-schema object. One-shot: `psql -tAc "SELECT 'ALTER TABLE \"' || tablename || '\" OWNER TO cosmedic;' FROM pg_tables WHERE schemaname='public'" | psql`. Also: `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cosmedic`.
- **`tsx` scripts that call `getPayload()` trigger `pushDevSchema`** unless `NODE_ENV=production` is set. Always: `NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx <script>`.
- **`git stash -u` sweeps untracked top-level directories** — `/changes/` is now in `.gitignore` for scratch uploads.
- **CMS `next build` chokes on cross-package seed imports** of `@/lib/cms-proxy`. Fix: add seed scripts to `packages/cms/tsconfig.json` `exclude` (precedent: `a18c700`).
- **psql peer-auth error** — always connect via TCP: `psql -h 127.0.0.1 -U cosmedic -d cosmedic`. Extract password: `PGPASSWORD=$(grep DATABASE_URI packages/cms/.env | sed 's/.*cosmedic:\([^@]*\)@.*/\1/')`.
- **DB backup** — daily `pg_dump` cron at `0 2 * * *` UTC. Dumps to `/var/backups/cosmedic/`, retains 14 copies. To restore: `PGPASSWORD=... pg_restore -h 127.0.0.1 -U cosmedic -d cosmedic -Fc /var/backups/cosmedic/<file>.dump`.

---

## Completed phases

- **Phase M — Mobile-Responsive Sweep** ✅ 2026-05-23. Zero horizontal scroll across 46 routes × 5 widths. Sign-off: [docs/planning/phase-m-signoff.md](docs/planning/phase-m-signoff.md).
- **Phase N — Header / Chrome / Pricing polish** ✅ 2026-05-23.
- **Phase Q — change-request batch** ✅ 19/19 shipped (q17 Figma images delivered 2026-05-27, commit `9cd808a`). Tracker: [docs/changes/changes01-phaseQ.md](docs/changes/changes01-phaseQ.md).
- **Phase R (Admin IA Remap)** — R0/R1/R2/R4/R6/R7/R8 ✅ shipped · R3/R5 pending. Plan: [docs/remap_plan.md](docs/remap_plan.md).
- **changes08** ✅ 2026-05-27 — 9 Pricing globals moved to Treatments bucket; 5 orphan pricing collection TS files deleted.
- **Figma → CMS image migration** ✅ 2026-05-27 — 25 images uploaded, all 18 sub-category hero slots filled (commit `9cd808a`). Local working folder: `~/downloads/cosmedic_local/`.

---

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

---

## When you're not sure

1. Check the relevant `docs/*.md`.
2. Ask the user — better one clarifying question than a wrong assumption.
