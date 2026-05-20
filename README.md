# BIMC CosMedic

Marketing site for **BIMC CosMedic** — Bali International Medical Centre's plastic-surgery & aesthetic-medicine clinic in Nusa Dua, Bali. Editorial-luxury multi-page site for international medical tourists from AU / US / EU.

- **Live (production)**: <https://cosmedic.gaiada.online>
- **CMS** (white-labelled as "CosMedic Site CMS"): <https://cosmedic.gaiada.online/admin>
- **Repo**: <https://github.com/Gaia-Digital-Agency/cosmedic>
- **Stack**: Vite SSR · React · Tailwind · Payload CMS · Node · Postgres (VRTPN)

## Quick links

| Doc | What |
|---|---|
| [CLAUDE.md](./CLAUDE.md) | Guide for Claude Code sessions in this folder |
| [docs/architecture_info.md](./docs/architecture_info.md) | Runtime topology, stack, deployment |
| [docs/file_structure.md](./docs/file_structure.md) | End-state directory tree + renames |
| [docs/db_schema.md](./docs/db_schema.md) | Full Payload CMS collection + global schema (WHAT) |
| [docs/db_ops.md](./docs/db_ops.md) | Postgres provisioning, migrations, backup, restore, perf (HOW) |
| [docs/sitemap.md](./docs/sitemap.md) | Every page · subpage · CTA · button · mega-menu |
| [docs/cms_info.md](./docs/cms_info.md) | CosMedic Site CMS white-label spec (LOOK) |
| [docs/cms_ops.md](./docs/cms_ops.md) | Payload init, hooks, access, drafts, media, seed, email (HOW) |
| [docs/cms_schema.md](./docs/cms_schema.md) | UI ↔ CMS coverage matrix — every page surface mapped to its CMS entity |
| [docs/plan.md](./docs/plan.md) | Full 14-phase execution plan + locked architecture decisions + Appendix A |
| [docs/brand-guidelines.pdf](./docs/brand-guidelines.pdf) | BIMC CosMedic Brand Guidelines v1.0 (canonical brand source) |
| [docs/pricelist.xlsx](./docs/pricelist.xlsx) | Clinic's price + procedure catalogue (CMS seed source) |
| [design/](./design/) | Original Claude Design source (READ-ONLY) |

## Stack at a glance

| Layer | Choice |
|---|---|
| Web framework | Vite SSR + React 18 |
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

## Project status

This is the initial documentation + design-handoff import. Phases 1–14 are documented in the planning file; execution proceeds phase-by-phase with user approval at each gate.

- **Phase 0** (current): Documentation capture + git checkpoint of the starting state.
- **Phase 1**: Monorepo scaffold (packages/cms + packages/web on ports 4007/3007).
- **Phase 2**: Theme + PageShell port from `design/`.
- **Phase 3+**: Homepage → detail templates → index pages → CMS schema → forms → deploy.
- **Phase 11**: Pixel-Fidelity Gate + Lighthouse Green Gate (launch-blocking).
- **Phase 12**: Launch at `https://cosmedic.gaiada.online`.

See [CLAUDE.md](./CLAUDE.md) and `docs/` for the full picture.

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
