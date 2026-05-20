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

## Current state (Phase 2 complete)

- `packages/cms` — Payload 3.84.1 on Next.js 15.4.11 + Postgres adapter, port **4007**. Admin white-labelled as **Cosmedic CMS** (Cormorant Garamond + JetBrains Mono, brand-beige palette from `docs/brand-guidelines.pdf`). Light/dark toggle.
- `packages/web` — Vite 6 SSR + React 19 + Express, port **3007**. Now renders the full site chrome.
  - `design/global.css` (3,687 lines) ported **verbatim** to `packages/web/src/styles/globals.css`.
  - Google Fonts (Cormorant Garamond + Inter + JetBrains Mono) preconnected + loaded in `index.html`.
  - Primitives ported from `design/shared.jsx`: `Btn`, `Mono`/`Eyebrow`, `Img` (painted-SVG fallback), `Reveal` (IntersectionObserver), `PriceTag` (IDR + AUD), `ChapterOpener`, `TrustBar`, `CTABandSlim`.
  - Shell ported: `Header` (mega-menu hover bridge, EN|ID switcher, scroll-state, mobile drawer), `Footer` (3 link columns + newsletter + tri-mono bottom strip), `FloatingChrome` (fixed CTA pill + WhatsApp fab), `PageShell` composer.
  - Seed data lives in `src/content/seed.ts` (TREATMENT_LIST, SUBCATEGORIES_BY_DISCIPLINE, SURGEON_LIST, WHATSAPP_HREF) — Phase 6 replaces with Payload-backed fetch.
  - Brand mark assets at `packages/web/public/assets/logo*.png` (mirrors design source).
- Postgres `cosmedic` role + db provisioned on `127.0.0.1:5432`. Initial Payload migration applied. Super-admin seeded.
- pm2 manages both processes (`cosmedic-cms`, `cosmedic-web`); `pm2 save` persisted.
- DNS `cosmedic.gaiada.online` still NXDOMAIN — Phase 8 (nginx + SSL + DNS) handles cutover.

Next session: **Phase 3** (homepage) per `docs/plan.md`.

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
