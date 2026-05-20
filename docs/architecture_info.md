# BIMC CosMedic — System Architecture

> **North-star document.** Describes the target shape of the production system: runtime topology, tech stack, deployment model, and architectural invariants. Used by every implementation phase as the reference. Updated as decisions evolve.

---

## 1. Goal

Deliver 100% of the BIMC CosMedic Claude Design handoff (75+ pages, editorial-luxury aesthetic, IDR/AUD pricing, EN/ID bilingual, full surgeon and procedure catalogue) as a production multi-page marketing site at **`https://cosmedic.gaiada.online`**, served from `gda-s01` alongside ~10 sibling sites managed by pm2 + nginx + a shared local Postgres.

## 2. Non-negotiables

1. **Frontend pixel-fidelity to Claude Design** — production must match the design 100% across all breakpoints and interactions. Visual regression suite + page-by-page sign-off enforces this (see `docs/sitemap.md` and Phase 11 in the plan).
2. **Lighthouse Green on every page** — Accessibility / Best Practices / SEO ≥ 90 on every public route × every breakpoint. Lighthouse CI blocks launch if any drops below Green.
3. **Editor-friendly CMS** — every editorial string + every image is editable in Payload by non-technical clinic staff. Hard-coding is restricted to UI primitives. See `docs/db_schema.md`.
4. **CosMedic Site CMS branding** — Payload is white-labelled using the brand identity from `docs/brand-guidelines.pdf`. See `docs/cms_info.md`.
5. **Multisite-safe** — never touches sibling sites' files, certs, databases, or pm2 processes.
6. **Bilingual** — every editorial string available in EN and ID via the `EN | ID` switcher already in the design.

## 3. Runtime topology

```
              ┌────────────────────────────────────────────────┐
              │  https://cosmedic.gaiada.online                │
              └────────────┬───────────────────────────────────┘
                           │ 443 (TLS)
                           ▼
              ┌────────────────────────────────────────────────┐
              │  nginx (sites-enabled/subdomains.gaiada.online)│
              │  server_name cosmedic.gaiada.online            │
              │                                                │
              │  /admin       → 127.0.0.1:4007   (Payload UI)  │
              │  /_next       → 127.0.0.1:4007   (Payload _next)│
              │  /api/*       → 127.0.0.1:4007   (Payload API) │
              │  /api/page-data    → 127.0.0.1:3007  (web)     │
              │  /api/preview      → 127.0.0.1:3007  (web)     │
              │  /api/exit-preview → 127.0.0.1:3007  (web)     │
              │  /api/revalidate   → 127.0.0.1:3007  (web)     │
              │  /api/enquiry      → 127.0.0.1:3007  (web)     │
              │  /             → 127.0.0.1:3007   (Vite SSR)   │
              └────┬────────────────────────────────────┬──────┘
                   │                                    │
                   ▼                                    ▼
        ┌──────────────────────┐            ┌──────────────────────┐
        │ pm2: cosmedic-web    │            │ pm2: cosmedic-cms    │
        │ Vite SSR + React     │            │ Payload (Next.js)    │
        │ packages/web         │            │ packages/cms         │
        │ :3007                │            │ :4007                │
        └──────────┬───────────┘            └──────────┬───────────┘
                   │                                    │
                   └──────────────┬─────────────────────┘
                                  ▼
                       ┌──────────────────────┐
                       │ Postgres 127.0.0.1:5432│
                       │ db: cosmedic           │
                       │ role: cosmedic         │
                       └──────────────────────┘

External SMTP relay (Phase 7) — destination TBD (Postmark / SES / clinic relay).
SSL cert: dedicated cert for cosmedic.gaiada.online via certbot (Phase 8).
```

**Why this split**: web owns rendering + revalidation; CMS owns content + admin + media. The two communicate over HTTP (web fetches content from CMS REST/GraphQL endpoints at build time and on revalidate). Same model proven on `christos.gaiada.online`.

## 4. Tech stack (VRTPN)

| Layer | Choice | Version target |
|---|---|---|
| Runtime | Node | ≥ 20.9 |
| Package manager | pnpm | ^10 (workspace) |
| Web framework | Vite SSR + React 18 | Vite ^5 |
| CMS | Payload | ^3 (Next.js host) |
| CSS | Tailwind | ^3 + custom theme from design tokens |
| DB | PostgreSQL | 15+ (system-installed on gda-s01) |
| Process manager | pm2 | latest |
| Reverse proxy | nginx | system-installed |
| TLS | Let's Encrypt via certbot | dedicated cert |
| Forms | react-hook-form + Zod | latest |
| Email | nodemailer + `payload-cms/email-nodemailer` | latest |
| Animation | IntersectionObserver (vanilla) + CSS transitions | — |
| Images | Sharp (server) + `<picture>` + AVIF/WebP | Payload Media `imageSizes` |
| Testing | Vitest + Playwright | matches christos |
| Lint/format | ESLint + Prettier | matches christos |

The internal abbreviation for this stack on Gaia infra is **VRTPN** — Vite, React, Tailwind, Payload, Node (with Postgres backing). Same stack runs on `christos.gaiada.online` and `templatebase.gaiada.online`. Python is not in scope for the initial cosmedic launch; the user dropped it after architecture review.

## 5. Repository / monorepo layout

See `docs/file_structure.md` for the complete tree. High level:

```
/var/www/cosmedic/
├── packages/cms/    ← Payload CMS (port 4007)
├── packages/web/    ← Vite SSR + React + Tailwind (port 3007)
├── docs/            ← this folder — north-star documentation + brand inputs
├── assets/          ← seed imagery + brand assets
├── design/← original Claude Design source (kept read-only)
├── discovery/       ← discovery artifacts (was uploads/)
├── config/tooling/  ← shared ESLint / Prettier / TS configs
├── tests/           ← Vitest + Playwright + visual regression
├── scripts/         ← seed + migrate + backup
└── ecosystem.config.cjs  ← pm2 entries (cosmedic-cms + cosmedic-web)
```

## 6. Data model

See `docs/db_schema.md`. ~17 catalogue collections + 4 editorial-override collections + 3 dynamic collections + 10 globals. Seed sources: `shared.jsx`, `pages/subcategory-data.jsx`, `docs/pricelist.xlsx`, `docs/brand-guidelines.pdf`.

## 7. Routing model

See `docs/sitemap.md`. ~85 routes including localised `/id/*` mirrors. File-based routing via Vite SSR.

## 8. Component model

`shared.jsx` defines ~12 React components used across the design (`PageShell`, `Header`, `Footer`, `FloatingChrome`, `ChapterOpener`, `Reveal`, `Img`, `Btn`, `PriceTag`, `Mono`, `Eyebrow`, `TrustBar`, `CTABandSlim`). Each is ported 1:1 to `packages/web/src/components/` preserving structure, then theme-styled via Tailwind.

## 9. Design token system

`global.css` `:root` custom properties are the single source of truth. Propagated:

1. `packages/web/src/styles/globals.css` — keeps the CSS vars verbatim.
2. `packages/web/tailwind.config.ts` — maps every var into the Tailwind theme.

Brand palette (5 tokens + 1 accent from `docs/brand-guidelines.pdf` §II):

```
--paper:       #F4EFE6   /* light-beige — page background */
--cream:       #E6DCC8   /* dark-beige — section dividers */
--ink-100:     #1F1B16   /* black — text, dark surfaces */
--accent-deep: #6B4A2B   /* dark-brown — primary buttons */
--accent:      #A67C52   /* bronze — links, italic accents */
```

Distribution rule (brand.pdf §II): **beige first, ink second, one bronze gesture per surface.**

Typography: **Cormorant Garamond** (display + body) + **JetBrains Mono** (labels + metadata, +18% tracking).
Type scale: 6 steps (110 / 64 / 36 / 21 / 14 / 11).

## 10. Asset pipeline

Three tiers:

1. **Brand assets** (logo, favicon, BIMC lockup) — committed to repo at `assets/logos/`.
2. **Catalogue imagery** (surgeon portraits, treatment hero, B&A composites) — managed in Payload Media. Seeded from `assets/images/` on first run.
3. **Editorial / lifestyle** — same as catalogue, fully editor-managed.

Sharp pipeline (Payload `imageSizes`): 480, 768, 1280, 1920, 2560 wide × AVIF + WebP + JPG fallback. nginx caches `/api/media/*` with `expires 30d`.

Surgeon portrait standardisation: each Surgeons record stores a `portraitPosition` (CSS var) replicating the design's per-surgeon framing.

Fallback SVG: `<Img onError>` paints a brand-tinted SVG with the asset label + hue index — matches design "never broken-image-icon" rule.

## 11. Form & email pipeline

```
User submits enquiry  →  POST /api/enquiry  →  Zod + honeypot + rate-limit
                                                       │
                                                       ▼
                                          POST /api/enquiries (Payload local)
                                                       │
                                                       ▼
                                          Enquiries.afterChange hook
                                                       │
                                                       ▼
                                 nodemailer → SMTP relay → clinic mailbox
```

Spam controls: honeypot field, rate-limit (1 / IP / 60s), Cloudflare Turnstile behind a flag if abuse detected.

## 12. i18n strategy

- Payload native localization: `locales: ['en', 'id']`, `defaultLocale: 'en'`, `fallback: true`.
- Every editorial field flagged `localized: true`.
- URL strategy: `/` = EN, `/id/` = ID.
- Static UI strings catalogued in `packages/web/src/i18n/{en,id}.json`.
- `<html lang>` + `<link rel="alternate" hreflang>` emitted per request.

## 13. SEO + structured data

- Per-page meta with overrides per record.
- `MedicalClinic` JSON-LD on `/` and `/contact`.
- `Physician` on each `/surgeons/:slug`.
- `MedicalProcedure` on each procedure detail.
- `BlogPosting` on each blog post.
- `sitemap.xml` regenerated on Payload afterChange.
- `robots.txt`: allow `/`, disallow `/admin`, `/api/`, `/preview`.

## 14. Build & deploy

**Build** (server-first on gda-s01):
```bash
pnpm install
pnpm --filter @cosmedic/cms generate:types
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
```

**Start** (managed by pm2):
```bash
pm2 start ecosystem.config.cjs --only cosmedic-cms,cosmedic-web
pm2 save
```

**Iterate**:
```bash
git pull
pnpm install              # if deps changed
pnpm build
pm2 restart cosmedic-cms cosmedic-web
```

nginx config lives in `/etc/nginx/sites-enabled/subdomains.gaiada.online`. cosmedic block is appended after the christos block, mirroring it byte-for-byte except `server_name` and proxy ports. **Always `sudo nginx -t` before reload. Never restart nginx.**

## 15. Multisite hygiene checklist

This server hosts ~10 sibling production sites managed by pm2 + nginx. Cosmedic must not affect them:

- ❌ Never `pm2 restart all`. Only `cosmedic-cms` / `cosmedic-web`.
- ❌ Never restart nginx. Reload only, after `nginx -t`.
- ❌ Never reuse another site's Postgres role or DB.
- ❌ Never share or rename Let's Encrypt certs.
- ❌ Never run `pnpm install` from `/var/www/` — always inside `/var/www/cosmedic/`.
- ✅ Ports 3007 / 4007 reserved (verified free with `ss -tlnp`).
- ✅ Cosmedic Postgres role + db are isolated.
- ✅ Cosmedic SSL cert is dedicated; sibling certs untouched.
- ✅ All operations scoped to `/var/www/cosmedic/`.

Sibling sites: `christos`, `dashboard`, `flowstep`, `rhproperties`, `templatebase`, `templategen`, `valuations`, `whatsnewasia`, `wteindo`, `zenbali`.

## 16. Open dependencies (resolve before relevant phase)

- SMTP provider (Postmark / SES / clinic relay) — needed before Phase 7.
- Final BIMC lockup asset files vs `assets/logo.png` — verify against `docs/brand-guidelines.pdf` §I.
- CMS editor accounts & roles — Phase 12.
- CDN in front of nginx (Cloudflare?) — Phase 13.
- Postgres backup retention policy — Phase 14.
- Final Indonesian translations of editorial content — Phase 9.
