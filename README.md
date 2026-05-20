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
| [docs/architecture_info.md](./docs/architecture_info.md) | Runtime topology, stack, deployment |
| [docs/file_structure.md](./docs/file_structure.md) | End-state directory tree + renames |
| [docs/db_schema.md](./docs/db_schema.md) | Full Payload CMS collection + global schema (WHAT) |
| [docs/db_ops.md](./docs/db_ops.md) | Postgres provisioning, migrations, backup, restore, perf (HOW) |
| [docs/sitemap.md](./docs/sitemap.md) | Every page · subpage · CTA · button · mega-menu |
| [docs/cms_info.md](./docs/cms_info.md) | Cosmedic CMS white-label spec (LOOK) |
| [docs/cms_ops.md](./docs/cms_ops.md) | Payload init, hooks, access, drafts, media, seed, email (HOW) |
| [docs/cms_schema.md](./docs/cms_schema.md) | UI ↔ CMS coverage matrix — every page surface mapped to its CMS entity |
| [docs/site_features.md](./docs/site_features.md) | Visitor walkthrough + every site feature, primitive, and interaction |
| [docs/plan.md](./docs/plan.md) | Full 14-phase execution plan + locked architecture decisions + Appendix A |
| [docs/todo.md](./docs/todo.md) | Master TODO — 14-phase checklist + 47-page CMS tracker |
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

- **Phase 0** ✅ Documentation capture + git checkpoint of the starting state.
- **Phase 1** ✅ Monorepo scaffold — packages/cms (Payload 3 on Next.js, port 4007) + packages/web (Vite SSR, port 3007), Postgres provisioned, Cosmedic CMS branding, super-admin seeded.
- **Phase 2** ✅ Theme + PageShell ported from `design/`: full `global.css`, primitives (Btn / Mono / Eyebrow / Img / Reveal / PriceTag / ChapterOpener / TrustBar / CTABandSlim), shell (Header + Footer + FloatingChrome + PageShell).
- **Phase 3** ✅ Homepage: 11 sections matching `design/index.html` — Hero · TrustStrip · Intro · Treatments · PricingTeaser · Surgeons · Gallery · LeadMagnet · Journey · Stories · Place. All read from `seed.ts`; Phase 6 swaps to Payload (mapping captured in `docs/cms_schema.md`).
- **Phase 4** ✅ Detail templates: SSR router + 3 page templates covering **37 live routes** — DisciplineDetail (×6), SubCategoryDetail (×22, accordion treatment rows with IDR + AUD prices), SurgeonDetail (×8 with hero + bio + specialty areas + training). 404 fallback page. Editorial data ported to `src/content/treatment-content.ts` + `src/content/subcategory-data.ts`.
- **Phase 5** ✅ Index pages: 14 more routes — treatments + surgeons + results indices, gallery, stories, journey (7 steps), pricing (full table), recovery-stays (6 villas), press (8 accreditations + 6 mentions), contact (form + visit map), video-consult (14-day picker), blog index + post, privacy. **Total 51 live routes.**
- **Phase 6a** ✅ Payload schema + xlsx pricing pipeline. 23 collections + 10 globals defined; full `docs/pricelist.xlsx` parsed (7 sheets) and seeded → **149 PriceListItems, 93 Procedures, 8 Surgeons, 6 Disciplines, 17 SubCategories, 24 MachineTreatments, 43 HairRemovalAreas (BTL), 34 InjectableProducts, 6 JourneySteps, 5 Inclusions, 7 Exclusions, 5 Awards, 3 PressMentions, 6 RecoveryStays, 3 PricingTiers, 7 BlogPosts, 8 Pages**. Web SSR cache (`packages/web/src/lib/cms.ts`) fetches all of it from Payload REST + hydrates the client. `/pricing` renders the full CMS-driven clinic catalogue via `ClinicCatalogueTable` — every line item editable in Cosmedic CMS by the clinic team.
- **Phase 6b + 6c** ✅ Every page reads from the CMS cache via lazy Proxy-backed shims at `src/content/*.ts` (no component rewrites needed). Shell wires globals: Header reads `header.localeSwitcher` + `floating-chrome.ctaPill` + `settings.siteName`; Footer reads `footer.linkColumns` + `settings.address` + `copyrightTemplate`; FloatingChrome reads `floating-chrome.ctaPill` + `settings.whatsappNumber`. TrustStrip reads `brand-stats.stats`. Hero reads `pages[home]` for tagline/title/lede/heroImage. `<CmsExtraBlocks slug="..."/>` injects any clinic-edited `Pages.sections` blocks (15 block types: richText / imageGrid / ctaBand / stats / faqAccordion / procedureList / surgeonList / baGrid / testimonialList / recoveryStayList / pressMentionList / contactForm / journeyStepList / externalEmbed / notes) into Home / Journey / Contact / Privacy / Press / Gallery / Stories / VideoConsult / RecoveryStays. Payload `afterChange` hooks on every collection + global POST to `web /api/revalidate` so edits show up within seconds. All 51 routes still 200.
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
