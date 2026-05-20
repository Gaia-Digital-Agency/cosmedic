# BIMC CosMedic — Claude Code Project Guide

> Guide for Claude Code sessions working in `/var/www/cosmedic/`. Read this before doing anything; the comprehensive specs live in `docs/`.

## What this is

A new marketing site for **BIMC CosMedic**, the plastic-surgery & aesthetic-medicine clinic of Bali International Medical Centre in Nusa Dua, Bali. Audience: international medical tourists (AU, US, EU) seeking discretion, clinical credibility, and a restorative atmosphere.

Goal: ship a multi-page editorial-luxury site (~88 routes — homepage, 6 disciplines, 18 sub-categories, 41+ procedures, 8 surgeon profiles, plus journey/gallery/stories/press/pricing/recovery/contact/blog) with CMS-managed content, IDR-primary + AUD pricing, EN | ID language switcher.

- **Production domain**: `https://cosmedic.gaiada.online`
- **Repo**: `git@github.com:Gaia-Digital-Agency/cosmedic.git`
- **Stack**: Vite SSR · React · Tailwind · Payload CMS · Node · Postgres (VRTPN)
- **CMS branding**: White-labelled as **"CosMedic Site CMS"** using `docs/brand-guidelines.pdf`

## Non-negotiables

Every change must respect:

1. **Frontend pixel-fidelity to Claude Design** — production matches design 100%. See [docs/sitemap.md](docs/sitemap.md) for the route matrix; see [design_reference/](design_reference/) for source.
2. **Lighthouse Green on every page** — Accessibility / Best Practices / SEO ≥ 90 on every route × every breakpoint.
3. **Editor-friendly CMS** — every editorial string + every image lives in a Payload collection. See [docs/db_schema.md](docs/db_schema.md).
4. **CosMedic Site CMS branding** — Payload admin uses the BIMC brand identity. See [docs/cms_info.md](docs/cms_info.md).
5. **Multisite-safe** — `/var/www/cosmedic/` is one of ~10 sites on this server. **Never `pm2 restart all`. Always `nginx -t` before reload. Never touch sibling certs/databases.**

## Docs to read first

| File | When |
|---|---|
| [docs/architecture_info.md](docs/architecture_info.md) | Before any architectural decision — runtime topology, stack, deploy |
| [docs/file_structure.md](docs/file_structure.md) | Before moving/creating folders or files |
| [docs/db_schema.md](docs/db_schema.md) | Before designing or seeding any Payload collection |
| [docs/sitemap.md](docs/sitemap.md) | Before adding/removing routes or nav items |
| [docs/cms_info.md](docs/cms_info.md) | Before changing anything in `packages/cms/src/components/` or `payload.config.ts` admin block |
| [docs/brand-guidelines.pdf](docs/brand-guidelines.pdf) | Canonical brand source — palette, typography, mark, usage rules |
| [docs/pricelist.xlsx](docs/pricelist.xlsx) | Canonical clinic price + procedure catalogue — seed source for Phase 6 |
| [design_reference/](design_reference/) | Original Claude Design source — never modified, only mirrored |

## Sibling sites on this server (gda-s01)

Touch none of these. They are managed independently via pm2 + nginx:

`christos` · `dashboard` · `flowstep` · `rhproperties` · `templatebase` · `templategen` · `valuations` · `whatsnewasia` · `wteindo` · `zenbali`

The closest reference for the VRTPN pattern is `/var/www/christos/` — same monorepo layout (packages/cms + packages/web), same pm2 config style. Read but never modify.

## Port allocation

| Site | Web | CMS |
|---|---|---|
| templatebase | 3004 | 4004 |
| templategen | 3005 | 4005 |
| christos | 3006 | 4006 |
| **cosmedic** | **3007** | **4007** |

Verify free with `ss -tlnp | grep ':30\\|:40'` before binding.

## Postgres

Local Postgres on `127.0.0.1:5432`. Dedicated `cosmedic` role + db — never reuse another site's.

## Working rules for Claude sessions

- Scope every action to `/var/www/cosmedic/`. Touch siblings only when explicitly asked.
- Read the relevant `docs/*.md` before making decisions that affect that area.
- Treat `design_reference/` as **read-only**.
- Treat `docs/brand-guidelines.pdf` and `docs/pricelist.xlsx` as **source-of-truth inputs** — quote from them when justifying decisions.
- Pixel-Fidelity Gate + Lighthouse Green Gate are launch-blocking. Don't bypass them.
- This server is the dev environment (user chose server-first). Edits happen here; commits + pushes happen here.

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
2. Check `/var/www/christos/` for the established pattern.
3. Ask the user — better one clarifying question than a wrong assumption.
