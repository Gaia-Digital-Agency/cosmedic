# BIMC CosMedic

Marketing site for **BIMC CosMedic** — Bali International Medical Centre's plastic-surgery & aesthetic-medicine clinic in Nusa Dua, Bali. Editorial-luxury multi-page site for international medical tourists from AU / US / EU.

- **Live (production)**: <https://cosmedic.gaiada.online>
- **CMS** (white-labelled as "Cosmedic CMS"): <https://cosmedic.gaiada.online/admin>
- **Repo**: <https://github.com/Gaia-Digital-Agency/cosmedic>
- **Stack**: Vite SSR · React · Tailwind · Payload CMS · Node · Postgres (VRTPN)

## Quick links

| Doc | What |
|---|---|
| [CLAUDE.md](./CLAUDE.md) | Guide for Claude Code sessions in this folder |
| [docs/architecture/architecture_info.md](./docs/architecture/architecture_info.md) | Runtime topology, stack, deployment |
| [docs/architecture/file_structure.md](./docs/architecture/file_structure.md) | End-state directory tree + renames |
| [docs/architecture/sitemap.md](./docs/architecture/sitemap.md) | Every page · subpage · CTA · button · mega-menu |
| [docs/architecture/site_features.md](./docs/architecture/site_features.md) | Visitor walkthrough + every site feature, primitive, and interaction |
| [docs/db/db_schema.md](./docs/db/db_schema.md) | Full Payload CMS collection + global schema (WHAT) |
| [docs/db/db_ops.md](./docs/db/db_ops.md) | Postgres provisioning, migrations, backup, restore, perf (HOW) |
| [docs/cms/cms_info.md](./docs/cms/cms_info.md) | Cosmedic CMS white-label spec (LOOK) |
| [docs/cms/cms_ops.md](./docs/cms/cms_ops.md) | Payload init, hooks, access, drafts, media, seed, email (HOW) |
| [docs/cms/cms_schema.md](./docs/cms/cms_schema.md) | UI ↔ CMS coverage matrix — every page surface mapped to its CMS entity |
| [docs/cms/CMS_structure.md](./docs/cms/CMS_structure.md) | **Source of truth** — locked CMS sidebar structure (buckets · entities · fields) the code aligns to |
| [docs/cms/editor_cheatsheet.md](./docs/cms/editor_cheatsheet.md) | Clinic-editor quick reference for the CMS |
| [docs/planning/plan.md](./docs/planning/plan.md) | Full 14-phase execution plan + locked architecture decisions + Appendix A |
| [docs/planning/all_todo.md](./docs/planning/all_todo.md) | **Single TODO file** — DO FIRST/SECOND/THIRD shipped, Phases C/M(✅)/N(✅)/P(✅)/Q(18/19✅) tracked here |
| [docs/changes/changerequest_21May.md](./docs/changes/changerequest_21May.md) | **Phase Q ordered tracker** — 19 q-items with per-q Notes + Commit columns (Step-6 propose-for-approval workflow) |
| [docs/changes/change01.md](./docs/changes/change01.md) | Phase Q cluster tracker — original `changes01.docx` 27-item batch + Q-7 addendum |
| [docs/changes/change2a.pdf](./docs/changes/change2a.pdf) | Phase Q visual addendum (28 text+image items) — uploaded 2026-05-24 |
| [docs/changes/change_request_may25.md](./docs/changes/change_request_may25.md) | **Active CR — 41 items, 31 closed, 3 launch-blocking open** (25.3 SMTP · 25.32 visual QA · 25.38 form E2E). See also [temp.md](./temp.md) for Completed/Pending summary. |
| [docs/planning/phase-m-signoff.md](./docs/planning/phase-m-signoff.md) | Phase M mobile-responsive audit · sign-off (2026-05-23) |
| [docs/planning/commit_list.md](./docs/planning/commit_list.md) | Commit-level tracker for the Phases D/C/P/N/Q/M work plan |
| [docs/assets/brand-guidelines.pdf](./docs/assets/brand-guidelines.pdf) | BIMC CosMedic Brand Guidelines v1.0 (canonical brand source) |
| [docs/assets/pricelist.xlsx](./docs/assets/pricelist.xlsx) | Clinic's price + procedure catalogue (CMS seed source) |
| [design/](./design/) | Original Claude Design source (READ-ONLY) |

## Stack at a glance

| Layer | Choice |
|---|---|
| Web framework | Vite 6 SSR + React 19 |
| Styling | Tailwind 3 + brand-driven theme |
| CMS | Payload 3 (Next.js host) |
| Database | PostgreSQL 15+ (local on `gda-s01`) |
| Process manager | pm2 (`cosmedic-cms` + `cosmedic-web`) |
| Reverse proxy | nginx |
| TLS | Let's Encrypt via certbot |
| Forms | react-hook-form + Zod |
| Email | nodemailer (SMTP provider TBD) |
| Images | Sharp + AVIF/WebP via Payload Media |
| Testing | Vitest + Playwright + visual regression |

Internal abbreviation for this stack across Gaia infra: **VRTPN**.

## Dev (server-first on `gda-s01`)

Development happens directly on `/var/www/cosmedic/` on the `gda-s01` server (user chose server-first; departs from sibling sites' laptop-first pattern).

```bash
cd /var/www/cosmedic
pnpm install
pnpm dev          # concurrently: cms (4007) + web (3007)
```

## Build + deploy

```bash
pnpm build
pm2 restart cosmedic-cms cosmedic-web
```

nginx config lives in `/etc/nginx/sites-enabled/subdomains.gaiada.online`. Always `sudo nginx -t` before reloading. **Never restart nginx.**

## ⚠️ Multisite safety

This server hosts ~10 sibling production sites (`christos`, `dashboard`, `flowstep`, `rhproperties`, `templatebase`, `templategen`, `valuations`, `whatsnewasia`, `wteindo`, `zenbali`). They are managed independently. Cosmedic operations must not affect them:

- ❌ **Never** `pm2 restart all`. Only restart `cosmedic-cms` / `cosmedic-web`.
- ❌ **Never** restart nginx. Reload only, after `nginx -t` passes.
- ❌ **Never** reuse another site's Postgres role or DB.
- ❌ **Never** share or rename Let's Encrypt certs.
- ❌ **Never** run `pnpm install` from `/var/www/`. Always from inside `/var/www/cosmedic/`.
- ✅ Ports `3007` (web) + `4007` (cms) are reserved.
- ✅ Cosmedic Postgres `role` + `db` are isolated.
- ✅ Cosmedic SSL cert is dedicated; sibling certs untouched.

## License

Proprietary. © Gaia Digital Agency / BIMC CosMedic.
