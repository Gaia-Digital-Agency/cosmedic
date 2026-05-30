# BIMC CosMedic — Claude Code Project Guide
**Updated:** 2026-05-30 | **Server:** `ssh gda-s01 → /var/www/cosmedic/`

> Read this before doing anything. Comprehensive specs live in `docs/` on the server.

---

## What this is

A marketing site for **BIMC CosMedic**, the plastic-surgery & aesthetic-medicine clinic of Bali International Medical Centre in Nusa Dua, Bali. Audience: international medical tourists (AU, US, EU).

- **Production**: `https://cosmedic.gaiada.online`
- **Repo**: `git@github.com:Gaia-Digital-Agency/cosmedic.git`
- **Stack**: Vite 6 SSR · React 19 · Tailwind · Payload CMS 3.84.1 · Node · Postgres (VRTPN)
- **CMS branding**: White-labelled as **"Cosmedic CMS"**

---

## Connections

| | |
|---|---|
| SSH | `gda-s01` → `/var/www/cosmedic/` |
| CMS Admin | https://cosmedic.gaiada.online/admin (port 4007) |
| Web | https://cosmedic.gaiada.online (port 3007) |

## Ports
- **cosmedic-web** → `3007`
- **cosmedic-cms** → `4007`

## Postgres
Local on `127.0.0.1:5432`. Role + db: `cosmedic`. Never reuse another site's.
`PGPASSWORD=$(grep DATABASE_URI packages/cms/.env | sed 's/.*cosmedic:\([^@]*\)@.*/\1/')`

---

## Non-negotiables

1. **Frontend pixel-fidelity** — production matches design 100%.
2. **Lighthouse Green** — Accessibility / Best Practices / SEO ≥ 90 on every route × breakpoint.
3. **Editor-friendly CMS** — every editorial string + image in Payload. See `docs/cms/cms_map_simple.md`.
4. **Cosmedic CMS branding** — Payload admin uses BIMC brand identity.
5. **Multisite-safe** — never `pm2 restart all` · always `nginx -t` before reload · never touch sibling certs/databases.

---

## Key docs

| File | When |
|---|---|
| [docs/architecture/architecture_info.md](docs/architecture/architecture_info.md) | Before any architectural decision |
| [docs/db/db_schema.md](docs/db/db_schema.md) | Before designing or seeding any Payload collection |
| [docs/db/db_ops.md](docs/db/db_ops.md) | Before Postgres migrations, backups, perf |
| [docs/architecture/sitemap.md](docs/architecture/sitemap.md) | Before adding/removing routes |
| [docs/cms/cms_map_simple.md](docs/cms/cms_map_simple.md) | **Current CMS visible card map** — 15 cards, all fields |
| [docs/cms/cms_map_all.md](docs/cms/cms_map_all.md) | Full schema inventory |
| [docs/maps/sweep_map.md](docs/maps/sweep_map.md) | 52-route × 10-level visibility audit |
| [docs/language/enid_plan.md](docs/language/enid_plan.md) | EN/ID i18n plan (Phase A+A2 done, B-G pending) |
| [docs/changes/change_request_may25.md](docs/changes/change_request_may25.md) | Active CR25May — 3 launch-blocking open |
| [docs/assets/brand-guidelines.pdf](docs/assets/brand-guidelines.pdf) | Canonical brand source |
| [docs/assets/pricelist.xlsx](docs/assets/pricelist.xlsx) | Price + procedure catalogue — seed source |

---

## Sibling sites

Server hosts ~10 other production sites. **Do not reference them.** All cosmedic work derives from this project's own `docs/` folder.

---

## Working rules

- Scope every action to `/var/www/cosmedic/`. Touch siblings only when explicitly asked.
- **Research first, state confidence level, describe change, wait for approval. Never act on assumptions.**
- Treat `design/` as **read-only**.
- **Be supercritical + 99.9999% accurate.** Verify TWICE before claiming done. No aspirational checkboxes.
- **Never overwrite existing CMS/DB data.** Seed/migration only fills empty destinations. Ask before changing non-empty editor content.
- **Before any bulk find/sed/replace:** check git log for user-decided state and exclude those files. Bulk ops that undo explicit decisions are not acceptable.
- **Titles, Paragraphs/Text, Images, Arrays must never be hidden from editors.** Only slugs, hrefs, breadcrumbs, hues, chapter eyebrows, CTAhref, success/error states, legacy fields may be hidden.
- **Hidden globals still queried by Payload** — schema must always match DB columns even for hidden globals, or queries fail at runtime.
- Commits + pushes happen on this server. Commit after every complete phase.

---

## Current state (2026-05-30)

**Live:** https://cosmedic.gaiada.online · DNS `34.124.244.233` · Let's Encrypt expires 2026-08-18
**52 routes HTTP 200 ✅** · CR25May **3 launch-blocking open**: 25.3 SMTP · 25.32 visual QA · 25.38 form E2E

### CMS — Payload 3.84.1, port 4007

**Collections (18):** Users · Media · Surgeons · Disciplines · SubCategories · Procedures · BeforeAfterCases · Stories · PressMentions · Awards · RecoveryStays · BlogPosts · BlogTags · Authors · JourneySteps · Enquiries · PrivacySections · Analytics

**Admin buckets (renamed 2026-05-30):**

| Bucket | Visible cards | Key content |
|---|---|---|
| Homepage | Hero · Sections · Surgeons · Lead Magnet · Place · Settings | Section headings, brand identity, contact info |
| Procedures | Hero · Discipline Template · Catalogue View | /treatments + /pricing hero, section labels, catalogue |
| Experts | Hero · Detail Template | /experts hero + 3 section grids + surgeon detail labels |
| Results | Hero | /results hero |
| Journey | Page | /recovery-stays hero + portfolio section |
| Contact | Hero | /contact hero + visit section |
| Publications | Blog Post Template | Blog article chrome |

**CMS architecture pattern:** Each bucket has one Hero card that absorbs related section globals as labeled sub-groups. 15 visible globals total out of ~57.

**Full visible field map:** `docs/cms/cms_map_simple.md`

### i18n — EN/ID (Phase A+A2 complete)

- **Phase A ✅** — Payload localization: `locales: ['en','id'], defaultLocale: 'en', fallback: true`. 88 locale tables, all 11 collections + ~42 globals have `localized: true` on editorial fields. Existing EN content migrated.
- **Phase A2 ✅** — Auto-translate hook: `packages/cms/src/hooks/autoTranslate.ts`. Vertex AI gemini-2.5-flash. `AUTO_TRANSLATE_ENABLED=false` until Phase F backfill. Hook registered on all 11 collections + HomeHero.
- **Phases B–G** — Web fetch locale param, `/id/*` routing, switcher enable, backfill, verification — pending.

### AUD/IDR Exchange Rate (live)

`packages/cms/src/lib/exchangeRate.ts` — auto-fetches from open.er-api.com daily (±5% threshold). "Fetch live rate" button in Settings. Rate stored in `settings.audToIdrRate`.

### Web — Vite 6 SSR + React 19 + Express, port 3007

- **Routes:** `/procedures/{discipline}/{sub}` (nested). `/experts/{slug}` for surgeons. 28 legacy 301-redirects.
- **CSS:** 13 partials under `packages/web/src/styles/partials/`. Edit the owning partial.
- **CMS data layer:** `src/lib/cms.cache.ts` — fetches all globals from `http://127.0.0.1:4007/api/...`, 60s TTL, busted via `POST /api/revalidate` on every Payload save.
- **Pricing:** IDR primary + AUD secondary. All prices from `Procedures.pricing.priceIdr2026`.

### nginx

`/etc/nginx/sites-enabled/subdomains.gaiada.online`: HTTP→HTTPS 301, `/api/media/file/` → disk alias, `/api/*` + `/_next/*` + `/admin*` → :4007, `/` → :3007. Backups under `/etc/nginx/backups/`.

---

## Gotchas

- **`payload migrate` hangs** — extract SQL body, pipe to `psql --single-transaction -v ON_ERROR_STOP=1`. Register manually: `INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ('<name>', <batch>, NOW(), NOW())`.
- **Postgres 63-char identifier limit** — long enum names may hit the limit. Use `dbName` overrides on affected fields.
- **Direct psql DDL leaves objects owned by `postgres`** — run `ALTER TABLE/SEQUENCE/TYPE OWNER TO cosmedic` after applying DDL directly. One-shot: `psql -tAc "SELECT 'ALTER TABLE \"' || tablename || '\" OWNER TO cosmedic;' FROM pg_tables WHERE schemaname='public'" | psql`.
- **`tsx` scripts that call `getPayload()` trigger `pushDevSchema`** — always prefix with `NODE_ENV=production`.
- **psql peer-auth** — always connect via TCP: `psql -h 127.0.0.1 -U cosmedic -d cosmedic`.
- **DB backup** — daily cron at `0 2 * * *` UTC → `/var/backups/cosmedic/`, 14-copy retention.
- **Hidden globals still queried by Payload** — if a hidden global's TypeScript schema references a DB column that doesn't exist, the CMS throws query errors at runtime. Schema must always match actual DB columns.
- **Group wrappers change expected column names** — wrapping field `teamCaption` in group `team` changes expected column from `team_caption` to `team_team_caption`. Use the zero-migration trick: if `group_name + field_name = existing_column_name`, no migration needed (e.g. group `team` + field `caption` → `team_caption` ✓).
- **Bulk sed/replace ops** — always check git log before running bulk operations. Never let a bulk sweep undo explicit user-requested hidden states.
- **CMS `next build` chokes on cross-package seed imports** — add seed scripts to `packages/cms/tsconfig.json` `exclude`.
- **`git stash -u` sweeps untracked top-level directories** — `/changes/` is in `.gitignore`.

---

## Completed phases

- **Phase M** ✅ 2026-05-23 — Mobile-responsive sweep. Zero horizontal scroll across 46 routes × 5 widths.
- **Phase N** ✅ 2026-05-23 — Header / Chrome / Pricing polish.
- **Phase Q** ✅ 2026-05-27 — 19/19 change requests shipped. Figma images delivered.
- **Phase R** ✅ (partial) — R0/R1/R2/R4/R6/R7/R8 shipped. R3/R5 pending.
- **changes08** ✅ 2026-05-27 — 9 Pricing globals moved to Treatments bucket.
- **Figma → CMS images** ✅ 2026-05-27 — 25 images, all 18 sub-category hero slots filled.
- **i18n Phase A** ✅ 2026-05-30 — Payload localization foundation. 88 locale tables, EN data migrated.
- **i18n Phase A2** ✅ 2026-05-30 — Auto-translate hook (Vertex AI, silent until Phase F).
- **CMS nav cleanup** ✅ 2026-05-30 — Buckets renamed, Hero merges (Visit/Sections/PricingTerms → Heroes), 15 lean visible cards, all editorial fields exposed, consistent section titles.
- **AUD/IDR auto-rate** ✅ 2026-05-30 — Daily exchange rate fetch with ±5% threshold, "Fetch live rate" UI.

---

## Common ops

```bash
# Pull latest, rebuild, restart
cd /var/www/cosmedic && git pull
pnpm install     # if package.json changed
pnpm build
pm2 restart cosmedic-cms cosmedic-web

# Logs
pm2 logs cosmedic-cms --lines 50
pm2 logs cosmedic-web --lines 50

# nginx reload (only after change)
sudo nginx -t && sudo systemctl reload nginx

# DB backup (manual)
bash ops/postgres-backup.sh

# Check all services
pm2 status
```

---

## When you're not sure

1. Check `docs/cms/cms_map_simple.md` for current CMS state.
2. Check the relevant `docs/*.md` for context.
3. Ask — one clarifying question beats a wrong assumption.
