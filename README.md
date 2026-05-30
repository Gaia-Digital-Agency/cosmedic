# BIMC CosMedic

Marketing site for **BIMC CosMedic** — Bali International Medical Centre's plastic-surgery & aesthetic-medicine clinic in Nusa Dua, Bali. Editorial-luxury multi-page site for international medical tourists from AU / US / EU.

- **Live (production)**: <https://cosmedic.gaiada.online>
- **CMS** (white-labelled as "Cosmedic CMS"): <https://cosmedic.gaiada.online/admin>
- **Repo**: <https://github.com/Gaia-Digital-Agency/cosmedic>
- **Stack**: Vite SSR · React · Tailwind · Payload CMS · Node · Postgres (VRTPN)

## Quick links

| Doc | What |
|---|---|
| [CLAUDE.md](./CLAUDE.md) | Guide for Claude Code sessions — read before every session |
| [docs/architecture/architecture_info.md](./docs/architecture/architecture_info.md) | Runtime topology, stack, deployment |
| [docs/architecture/file_structure.md](./docs/architecture/file_structure.md) | End-state directory tree + renames |
| [docs/architecture/sitemap.md](./docs/architecture/sitemap.md) | Every page · subpage · CTA · button · mega-menu |
| [docs/db/db_schema.md](./docs/db/db_schema.md) | Full Payload CMS collection + global schema |
| [docs/db/db_ops.md](./docs/db/db_ops.md) | Postgres provisioning, migrations, backup, restore |
| [docs/cms/cms_info.md](./docs/cms/cms_info.md) | Cosmedic CMS white-label spec |
| [docs/cms/cms_ops.md](./docs/cms/cms_ops.md) | Payload hooks, access, seed, email |
| [docs/cms/cms_map_simple.md](./docs/cms/cms_map_simple.md) | **Current visible CMS map** — 15 cards, all fields listed |
| [docs/cms/cms_map_all.md](./docs/cms/cms_map_all.md) | Full schema inventory (all globals + collections) |
| [docs/cms/cms_optional.md](./docs/cms/cms_optional.md) | Conflict log — fields visible on web but hidden in CMS (all resolved) |
| [docs/cms/editor_cheatsheet.md](./docs/cms/editor_cheatsheet.md) | Clinic-editor quick reference |
| [docs/maps/sweep_map.md](./docs/maps/sweep_map.md) | 52-route × 10-level CMS visibility sweep map |
| [docs/maps/app_map.md](./docs/maps/app_map.md) | Admin bucket → site page mapping |
| [docs/maps/remap.md](./docs/maps/remap.md) | Phase R Admin IA Remap reference |
| [docs/language/enid_plan.md](./docs/language/enid_plan.md) | EN/ID i18n implementation plan (Phase A+A2 complete) |
| [docs/language/enid.md](./docs/language/enid.md) | EN/ID architecture rationale |
| [docs/planning/plan.md](./docs/planning/plan.md) | 14-phase execution plan + locked decisions |
| [docs/planning/all_todo.md](./docs/planning/all_todo.md) | Single TODO file |
| [docs/changes/change_request_may25.md](./docs/changes/change_request_may25.md) | CR25May — 48 items, 3 launch-blocking open |
| [docs/assets/brand-guidelines.pdf](./docs/assets/brand-guidelines.pdf) | BIMC CosMedic Brand Guidelines (canonical) |
| [docs/assets/pricelist.xlsx](./docs/assets/pricelist.xlsx) | Clinic price + procedure catalogue (seed source) |
| [design/](./design/) | Original Claude Design source (READ-ONLY) |

## Stack at a glance

| Layer | Choice |
|---|---|
| Web framework | Vite 6 SSR + React 19 |
| Styling | Tailwind 3 + brand-driven theme |
| CMS | Payload 3.84.1 (Next.js 15 host) |
| Database | PostgreSQL 15+ (local on `gda-s01`) |
| Process manager | pm2 (`cosmedic-cms` · `cosmedic-web`) |
| Reverse proxy | nginx |
| TLS | Let's Encrypt via certbot |
| Forms | react-hook-form + Zod |
| Email | nodemailer (SMTP TBD) |
| AI translation | Vertex AI gemini-2.5-flash (auto-translate hook, silent until Phase F) |
| Exchange rate | open.er-api.com (auto-updated daily ±5% threshold) |

Internal abbreviation: **VRTPN**.

## Dev (server-first on `gda-s01`)

```bash
cd /var/www/cosmedic
pnpm install
pnpm build
pm2 restart cosmedic-cms cosmedic-web
```

nginx config: `/etc/nginx/sites-enabled/subdomains.gaiada.online`. Always `sudo nginx -t` before reloading.

## ⚠️ Multisite safety

This server hosts ~10 sibling production sites. Cosmedic operations must not affect them:

- ❌ **Never** `pm2 restart all`. Only `cosmedic-cms` / `cosmedic-web`.
- ❌ **Never** restart nginx. Reload only, after `nginx -t`.
- ❌ **Never** reuse another site's Postgres role or DB.
- ✅ Ports `3007` (web) + `4007` (cms) are reserved.
- ✅ Cosmedic Postgres role + db are isolated.

## License

Proprietary. © Gaia Digital Agency / BIMC CosMedic.
