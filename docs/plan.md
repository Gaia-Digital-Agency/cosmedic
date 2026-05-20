# Plan — BIMC CosMedic launch on gda-s01

> **Canonical location**: `/var/www/cosmedic/docs/plan.md` (this file, tracked in git).
> The working draft at `~/.claude/plans/federated-wobbling-hinton.md` (Claude harness file) is now historical — edit this one going forward.

## Companion docs

| Doc | What |
|---|---|
| [architecture_info.md](./architecture_info.md) | Runtime topology, stack, deploy model |
| [file_structure.md](./file_structure.md) | Target directory layout + renames |
| [db_schema.md](./db_schema.md) | Full Payload collection + global schema (WHAT) |
| [db_ops.md](./db_ops.md) | Postgres provisioning, migrations, backup (HOW) |
| [cms_info.md](./cms_info.md) | CosMedic Site CMS white-label spec (LOOK) |
| [cms_ops.md](./cms_ops.md) | Payload init, hooks, access, drafts, seed, email (HOW) |
| [cms_schema.md](./cms_schema.md) | UI ↔ CMS coverage matrix (every page surface → CMS entity) |
| [sitemap.md](./sitemap.md) | All ~88 routes + nav IA + CTA inventory |
| [brand-guidelines.pdf](./brand-guidelines.pdf) | BIMC CosMedic Brand Guidelines v1.0 |
| [pricelist.xlsx](./pricelist.xlsx) | Clinic's canonical pricelist (CMS seed source) |

## ⚠️ Non-negotiable #1 — frontend pixel-fidelity to Claude Design

**The outcome of the frontend look must be 100% the same as what's provided by Claude Design.**

This is the contract. The Claude Design handoff (the `.html` / `.jsx` / `global.css` files in `/var/www/cosmedic/` and the README in `design_handoff_bimc_cosmedic/`) defines the truth. Every production component must match it:

- Pixel-faithful to tokens, spacing, typography, sizing, and ratios across all three breakpoints (≥1100, 700–1099, <700).
- Every interaction (mega-menu hover bridge, Reveal scroll-trigger, image hover scale, dropdown row slide-right, procedure row `READ →`, hamburger drawer) must reproduce the design's behaviour exactly.
- Every page rendered in production must be visually indistinguishable from its `.html` / `.jsx` source rendered through the Babel-in-browser prototype.

**Verification mechanism** (baked into every relevant phase):

1. **Side-by-side review** — open the design `.html` in one browser tab, the production build in another, at each breakpoint. Sign off page-by-page.
2. **Playwright visual regression** — `tests/e2e/visual/*.spec.ts` captures screenshots of every route at desktop / tablet / mobile widths and compares against design baselines.
3. **Design tokens are imported, not re-typed** — `globals.css` is ported verbatim from `design_reference/global.css`; Tailwind config reads from those vars (A.8). Drift is detectable.
4. **No "creative refactor" of design components** during port — match the JSX structure of `shared.jsx` / `pages/*.jsx` first, refactor for clean code only after pixel-match is verified.
5. **A signed-off "Pixel-Fidelity Gate" before Phase 8 (nginx + deploy)** — Phase 11 (QA + responsive polish) ends with explicit user sign-off that every route matches the design. Launch does not happen without it.

Any decision elsewhere in this plan that would compromise pixel-fidelity is overridden by this constraint.

## ⚠️ Non-negotiable #2 — Lighthouse Green on every page

Every public-facing route must score **Green (≥ 90)** on **Accessibility**, **Best Practices**, and **SEO** in Lighthouse. Performance is target ≥ 85 (some leeway because hero imagery may push LCP) but should also aim for Green when achievable.

- Enforced by an automated Lighthouse CI run in Phase 11 over every route × every breakpoint.
- A regression below 90 on any of the three core categories **blocks launch** the same way the Pixel-Fidelity Gate does.
- Decisions that would tank a11y / BP / SEO scores (e.g. images without alt text, blocking inline scripts, missing canonical URLs) are overridden by this constraint.

## ⚠️ Non-negotiable #3 — Editor-friendly CMS

Most user-facing text and all imagery on the site must be editable through the Payload admin UI by non-technical clinic staff. Concretely:

- Every editorial string (heros, ledes, body copy, FAQs, CTAs, button labels where contextual, footer text) lives in a Payload collection or global.
- Every photographic asset (surgeon portraits, B&A composites, treatment imagery, lifestyle imagery) is uploaded via Payload Media — never hard-coded in components.
- Hard-coded text is restricted to: structural UI strings (nav primitives like "More", "Close"), error messages, accessibility labels — and even these are translatable via the static i18n catalogue (Phase 9).
- Phase 6 (Payload schema + content port) is the gate that ensures this; Phase 11 audits compliance per route.

## ⚠️ Non-negotiable #4 — CosMedic Site CMS branding (white-labelled, Brand-Guidelines-driven)

Payload is white-labelled as **"COSMEDIC SITE CMS"** in the admin UI. Visual identity is derived directly from `docs/brand-guidelines.pdf` (BIMC CosMedic Brand Guidelines v1.0, 19 May 2026) — the same palette and typography as the public site, so admin feels like an editorial extension of the front-end. This **supersedes** the earlier Gaia-CMS-branded plan; the essentialbali Gaia pattern is no longer fetched or used.

**Implementation pattern** (white-label via Payload `admin` config) **is borrowed from essentialbali** — same component structure (`Icon`, `Logo` no-op, `beforeLogin` hero), only the assets and palette change.

**Visual identity** (sourced from `docs/brand-guidelines.pdf`)
- **Login hero** (stacked, centred):
  - `COSMEDIC SITE CMS` wordmark in **Cormorant Garamond Medium**, ink (`#1F1B16`).
  - BIMC CosMedic **lockup** below — the mark from brand.pdf §I (BIMC medical cross + profile silhouette + "Managed by BIMC Hospital" endorsement). On light surface, primary lockup uses ink on light-beige.
  - `MANAGED BY BIMC HOSPITAL · NUSA DUA · BALI` tagline in **JetBrains Mono 500, +18% tracking, uppercase**.
- **Logo asset (admin nav header, expanded)**: `/cosmedic-mark-on-light.png` (or .svg if available) — the lockup at small horizontal size.
- **Icon asset (admin nav, collapsed)**: `/cosmedic-mark-icon.png` — the medical cross + profile mark only, 32×32 square crop.
- **Favicon**: `/favicon.ico` — derived from the same mark.

**Palette** (from brand.pdf §II — 5 tokens + 1 accent, applied to admin theme):
- `--cs-paper:  #F4EFE6` light-beige (admin background, light mode)
- `--cs-cream:  #E6DCC8` dark-beige (admin section dividers, light mode)
- `--cs-ink:    #1F1B16` black (body text, headings)
- `--cs-brown:  #6B4A2B` dark-brown (primary buttons, eyebrow rules)
- `--cs-accent: #A67C52` bronze (links, italics, single highlight)
- Distribution: **beige first, ink second, one bronze gesture per surface** (brand.pdf §II — "treat the accent as a condiment, not a colour-block").

**Theme**
- `admin.theme: 'all'` — light/dark toggle (per user requirement). Light is default and primary.
- Light mode: warm-beige background, ink text, bronze accent on links/CTAs.
- Dark mode: ink-100 background, light-beige text, bronze accent.

**Typography** (admin UI overrides Payload defaults via injected CSS):
- Display + body: Cormorant Garamond (loaded from Google Fonts in admin head).
- Labels + metadata + buttons: JetBrains Mono, +18% tracking, uppercase for labels.
- Type scale: 6 steps (110/64/36/21/14/11) — apply to admin where Payload's defaults clash with the brand.

**Where the branding applies**
- Admin browser title / meta: `… — CosMedic Site CMS` (`admin.meta.titleSuffix`).
- OpenGraph for shared admin links: site name `CosMedic Site CMS`, image `/cosmedic-mark-on-light.png`.
- Admin nav (collapsed): compact mark.
- Admin nav (expanded): full lockup (small).
- Login screen: `beforeLogin` renders the hero. Payload's default wordmark is suppressed by no-op `Logo`.
- Email-from name: `CosMedic Site CMS <no-reply@cosmedic.gaiada.online>`.
- Password-reset emails: subject/body use the same brand language.

**Branding assets dependency**
- The BIMC CosMedic lockup itself (the visual mark from brand.pdf §I) is not yet a separate file on disk — `assets/logo.png` and `assets/logo-light.png` exist in the current cosmedic folder and are likely candidates, but they need verification against brand.pdf. Phase 0 Step 1c (renamed) verifies these assets and extracts the mark to a clean `/cosmedic-mark-*` asset set served by Payload admin from `packages/cms/public/`.
- Brand-yellow / Gaia-tree assets from gda-pn01 are **not used** for cosmedic.

## Context

A new marketing site for **BIMC CosMedic** (Bali International Medical Centre's plastic-surgery & aesthetic-medicine clinic) needs to go live on `gda-s01` alongside ~10 sibling sites. The design is fully specified — a 75-page editorial-luxury site delivered as a Babel-in-browser React prototype that is not for production. The job is to recreate it 100% faithfully in the production stack used by sister sites, port the surgeon / discipline / sub-category / procedure content into Payload, and ship.

The user requested architecture decisions be locked first. After locking them, the user asked for a `docs/architecture_info.md` document describing the ideal end-state — the file structure, runtime topology, data model, and component mapping that would deliver every detail of the Claude Design. That document is drafted below (Appendix A) and folded into the phases (the file gets created in Phase 0 alongside the git checkpoint).

## Architecture decisions (locked)

| Decision | Choice | Why |
|---|---|---|
| **Production domain** | `cosmedic.gaiada.online` | Matches every sibling. Reuses `templategen.gaiada.online` Let's Encrypt cert pattern + wildcard DNS — no new DNS work. |
| **Stack** | VRTPN — Vite + React + Tailwind + Payload + Node + Postgres. **Python dropped** from initial scope. | Matches `/var/www/christos/` exactly. Python role was undefined. |
| **Repo layout** | pnpm monorepo: `packages/cms` (Payload, Next.js host) + `packages/web` (Vite SSR + React + Tailwind). | Identical to christos and templatebase. Proven on this server. |
| **Port allocation** | Web `3007`, CMS `4007` | Next free pair after templatebase (3004/4004), templategen (3005/4005), christos (3006/4006). |
| **Postgres** | Local `127.0.0.1:5432` (already running). Dedicated `cosmedic` database + role. | Same pattern as sibling sites. |
| **Dev location** | Server-first — edit directly in `/var/www/cosmedic/` on `gda-s01`. | User chose. Departs from sibling pattern; documented in CLAUDE.md. |
| **Enquiry form** | Payload `Enquiries` collection + transactional email to clinic mailbox. | No external CRM dependency. Self-hosted, full lead history retained. |
| **First commit strategy** | Snapshot-then-plan — first commit = exact design handoff as-is (preserving `uploads/`). Reorg follows. | Faster checkpoint; full provenance preserved. |
| **Remote** | `git@github.com:Gaia-Digital-Agency/cosmedic.git` | Server SSH push access not yet verified — surfaces on first push. |

## Phases (updated to include architecture.md authoring)

| Phase | Title | Architecture sections (Appendix A) it implements |
|---|---|---|
| **0** | Documentation + git checkpoint | A.1, A.2 — write `README.md`, `docs/architecture_info.md`, `docs/sitemap.md`, `.gitignore`; rename `uploads/` → `discovery/`, `pages/`/loose `.jsx`/`.html` → `design_reference/`; git init, first commit, push. |
| **1** | Monorepo scaffold + **CosMedic Site CMS branding** | A.3, A.4 — pnpm workspace, packages/cms (Payload init **with CosMedic Site CMS admin branding** per Non-negotiable #4), packages/web (Vite SSR), `.env`, `ecosystem.config.cjs`, Postgres db/role, hello-world boot, `docs/cms_info.md`. |
| **2** | Theme + `PageShell` | A.7, A.8 — Tailwind theme from tokens, fonts, header (logo + mega-menu + active-state + EN\|ID), footer, floating CTA + chat. |
| **3** | Homepage | A.6, A.7 — hero+form, stats, treatments index, surgeons, gallery teaser, journey teaser, stories teaser, place. |
| **4** | Detail templates | A.5, A.6 — procedure detail (41 routes), discipline detail (6), sub-category detail (18), surgeon detail (8). One template per kind, data-driven. |
| **5** | Index pages | A.6 — Gallery (29 B&A + filters), Stories, Journey, Pricing, Recovery Stays, Press, Contact, Video Consult, Blog. |
| **6** | Payload schema + content port | A.5 — collections (Surgeons, Disciplines, Sub-categories, Procedures, B&A Cases, Stories, Press, PricingTiers, Enquiries, Media, Pages, Settings, RecoveryStays, BlogPosts). Seed from `shared.jsx` + `subcategory-data.jsx`. |
| **7** | Enquiry form backend | A.10 — Payload `Enquiries` collection, Zod validation, transactional email (provider TBD), honeypot. |
| **8** | nginx + SSL + DNS + deploy | A.2, A.13 — server block mirroring christos pattern, reuse `templategen.gaiada.online` cert, DNS A record, pm2 save. |
| **9** | i18n EN ⇄ ID | A.11 — Payload localised fields, locale-aware routing, translation pass. |
| **10** | Imagery — self-host + relicense | A.9 — download surgeon portraits from `cosmedic.bimcbali.com` → Payload media. Replace Unsplash placeholders. Sharp pipeline (AVIF/WebP, responsive sizes). |
| **11** | QA + responsive polish + **Pixel-Fidelity Gate** + **Lighthouse Green Gate** | A.7 + Non-negotiable #1 & #2 — mobile drawer nav (handoff TODO), breakpoint validation, a11y, **Lighthouse CI: Green (≥90) on a11y / Best Practices / SEO across every route × breakpoint**, link checker, **Playwright visual-regression suite green across all routes × all breakpoints, user sign-off page-by-page**. Launch (Phase 12) is blocked until **both** gates pass. |
| **12** | Launch | DNS cutover, smoke tests, monitoring (uptime + nginx error alerting), CMS editor accounts + roles, handover doc. |
| **13** | SEO + analytics | A.12 — sitemap.xml, robots.txt, OG/Twitter cards, structured data (MedicalClinic schema), GA4 or Plausible. |
| **14** | Post-launch ops | Postgres backup cron, Payload media backup, weekly cert renewal check, editor runbook + training. |

Cross-cutting (every phase): **multisite hygiene** (never `pm2 restart all`, always `nginx -t`, never touch sibling certs/databases) + **TypeScript strict + ESLint + Prettier** matching christos config.

## Phase 0 — Documentation + git checkpoint (ready to execute on plan-mode exit)

### Steps

1. **Create `/var/www/cosmedic/docs/` directory** and write `docs/architecture_info.md` with the content drafted in Appendix A below (copy verbatim).

1a. **Write `/var/www/cosmedic/README.md`** (project root, human-facing entry point). Structure:

   ```markdown
   # BIMC CosMedic

   Marketing site for BIMC CosMedic — Bali International Medical Centre's plastic-surgery
   & aesthetic-medicine clinic. Editorial-luxury multi-page site targeting international
   medical tourists from AU / US / EU.

   - **Live**: https://cosmedic.gaiada.online
   - **CMS**: https://cosmedic.gaiada.online/admin (branded as "CosMedic Site CMS")
   - **Repo**: https://github.com/Gaia-Digital-Agency/cosmedic
   - **Stack**: Vite SSR · React · Tailwind · Payload CMS · Node · Postgres (VRTPN)

   ## Quick links
   - [CLAUDE.md](./CLAUDE.md) — guide for Claude Code sessions on this folder
   - [docs/architecture_info.md](./docs/architecture_info.md) — end-state architecture (north star)
   - [docs/sitemap.md](./docs/sitemap.md) — every page · subpage · link · button
   - [docs/runbook.md](./docs/runbook.md) — ops playbook (deploy, restore, incident)
   - [design_reference/](./design_reference/) — original Claude Design source (READ-ONLY)

   ## Dev (server-first on gda-s01)
   ```bash
   cd /var/www/cosmedic
   pnpm install
   pnpm dev          # cms on :4007 + web on :3007 via concurrently
   ```

   ## Build + restart (production)
   ```bash
   pnpm build
   pm2 restart cosmedic-cms cosmedic-web
   ```

   ## Multisite safety
   This server hosts ~10 sibling sites. **Never** `pm2 restart all`, **always** `nginx -t`
   before reload, **never** touch sibling certs / databases. See CLAUDE.md.
   ```

1b. **Write `/var/www/cosmedic/docs/sitemap.md`** — comprehensive site map. Structure:

   ```markdown
   # CosMedic — Site Map

   Every page, every subpage, every link, every CTA. Source of truth for routing,
   navigation IA, and Pixel-Fidelity Gate sign-off (Phase 11).

   ## Header navigation
   | Label | Route | Has mega-menu? |
   |---|---|---|
   | Treatments | /treatments | YES → 6 disciplines × N sub-categories |
   | Surgeons | /surgeons | YES → 8 surgeon names |
   | Your Journey | /journey | no |
   | Gallery | /gallery | no |
   | Stories | /stories | no |
   | Contact | /contact | no |
   | EN \| ID | (locale switcher) | — |

   ## All routes (~85)
   ### Top-level
   - `/`               → Homepage
   - `/treatments`     → Treatments index (6 discipline cards)
   - `/surgeons`       → Surgeons index (grouped: Plastic Surgery / Aesthetic Medicine)
   - `/journey`        → 8-step journey
   - `/gallery`        → 29 B&A cases with filters
   - `/stories`        → Patient testimonials
   - `/press`          → Editorial mentions + awards
   - `/pricing`        → Tier packages + per-treatment table
   - `/recovery-stays` → Villa partners for post-op
   - `/contact`        → Enquiry form + practical info
   - `/video-consult`  → Video consultation flow
   - `/funnel-assessment` → Treatment assessment form
   - `/blog`           → Blog index
   - `/blog/:slug`     → Blog post
   - `/privacy`        → Privacy policy

   ### Treatment disciplines (6)
   - /treatments/surgical
   - /treatments/reconstructive
   - /treatments/non-surgical
   - /treatments/hair
   - /treatments/dental
   - /treatments/recovery   (Weight Loss)

   ### Sub-categories (18) — under each discipline
   - /treatments/surgical/{face, body, breast}
   - /treatments/reconstructive/{breast, trauma, craniofacial}
   - /treatments/non-surgical/{injectables, laser, skin}
   - /treatments/hair/{fue, therapy}
   - /treatments/dental/{veneers, alignment, whitening}
   - /treatments/recovery/{medical, endoscopic, surgical}

   ### Procedures (41) — under each sub-category
   - /treatments/surgical/face/{rhinoplasty, facelift, …}
   - /treatments/surgical/body/{abdominoplasty, brachioplasty, thigh-lift, liposculpture}
   - /treatments/surgical/breast/{augmentation, reduction, mastopexy}
   - /treatments/reconstructive/breast/{reconstruction, diep-flap}
   - /treatments/reconstructive/trauma/{scar-revision, burn-reconstruction}
   - /treatments/reconstructive/craniofacial/{cleft-lip-palate, maxillofacial-trauma}
   - /treatments/non-surgical/injectables/{botulinum-toxin, dermal-fillers, profhilo, polynucleotides, skin-boosters}
   - /treatments/non-surgical/laser/{fractional-laser, ipl}
   - /treatments/non-surgical/skin/{chemical-peel, hydrafacial, microneedling-rf, prp-skin, medical-facial}
   - /treatments/hair/fue/{sapphire-fue, dhi-choi}
   - /treatments/hair/therapy/{prp-scalp}
   - /treatments/dental/veneers/{porcelain, composite}
   - /treatments/dental/alignment/{clear-alignment}
   - /treatments/dental/whitening/{professional-whitening, smile-design}
   - /treatments/recovery/medical/{glp1, tirzepatide}
   - /treatments/recovery/endoscopic/{intragastric-balloon, esg}
   - /treatments/recovery/surgical/{sleeve, gastric-bypass}

   ### Surgeons (8)
   - /surgeons/{suka, astri, indra, wara, sissy, rosa, risma, theresia}

   ### Localised mirrors
   - /id/* — every route above also available under /id/ prefix (Phase 9)

   ## CTA / button inventory
   | CTA label | Lives on | Destination | Component |
   |---|---|---|---|
   | Plan your treatment | Floating chrome (every page) | /contact | `<FloatingChrome>` |
   | Plan Your Treatment | Homepage hero | /contact | `<Btn kind="primary">` |
   | Speak with a Concierge | Homepage, CTA bands | /contact | `<Btn kind="ghost">` |
   | Begin your journey | CTA band (most pages) | /contact | `<CTABandSlim>` |
   | READ → | Procedure rows on sub-category pages | sub/procedure | row hover |
   | Send enquiry | Hero form + /contact form | POST /api/enquiry | `<Btn>` (form submit) |
   | EN \| ID switcher | Header right | toggles locale prefix | `<LocaleSwitcher>` |
   | Chat | Floating chrome (every page) | opens chat overlay | `<FloatingChrome>` |
   | View all | Treatments / Gallery / Stories teasers on home | section index page | `<Btn kind="ghost">` |

   ## Footer navigation
   - **Treatments**: links to each of 6 discipline pages
   - **Surgeons**: links to each of 8 surgeon pages
   - **Information**: Journey · Gallery · Stories · Press · Pricing · Recovery Stays · Contact · Privacy
   - **Social**: Instagram · WhatsApp · Email (icons)
   - **Copyright**: © {year} BIMC CosMedic. Logo (white). Address line.

   ## Mega-menus
   ### Treatments mega-menu
   Columns of: [Discipline title] → [sub-category list]
   - **Surgical** → Face · Body · Breast
   - **Reconstructive** → Breast Reconstruction · Trauma & Scar · Craniofacial
   - **Non-surgical** → Injectables · Laser & Resurfacing · Skin Health
   - **Hair** → FUE Surgical · Follicle Therapy
   - **Dental** → Veneers · Alignment · Whitening
   - **Weight Loss** → Medical · Endoscopic · Bariatric Surgery

   ### Surgeons mega-menu
   Columns of: [Group] → [surgeon list]
   - **Plastic Surgery** → Suka · Astri · Indra · Wara
   - **Aesthetic Medicine** → Sissy · Rosa · Risma · Theresia

   ## Notes
   - This file is the **source of truth for the navigation IA** — keep it in sync with the
     `Header` + `Footer` Payload globals (Phase 6) and the Pixel-Fidelity Gate signoff
     checklist (Phase 11).
   ```

1c. **Move + curate brand inputs for CosMedic Site CMS** (replaces the earlier Gaia-asset-fetch step). `brand.pdf` and `procedure.xlsx` are already uploaded to `/var/www/cosmedic/`; this step moves them into `docs/` and prepares the BIMC CosMedic mark for use in Payload admin.

   ```bash
   mv /var/www/cosmedic/brand.pdf       /var/www/cosmedic/docs/brand-guidelines.pdf
   mv /var/www/cosmedic/procedure.xlsx  /var/www/cosmedic/docs/pricelist.xlsx
   ```

   Then for the CMS mark assets — extract clean variants of the BIMC CosMedic lockup so Payload admin can serve them from `/`:

   ```bash
   mkdir -p /var/www/cosmedic/assets/logos
   # The current /var/www/cosmedic/assets/logo.png + logo-light.png ARE the lockup variants.
   # Verify they match brand.pdf §I (medical cross + profile + "Managed by BIMC Hospital"):
   file /var/www/cosmedic/assets/logo.png /var/www/cosmedic/assets/logo-light.png
   # Produce CMS-public variants (Phase 1 needs them at packages/cms/public/):
   #   - cosmedic-mark-on-light.png  ← assets/logo.png (already bronze-on-transparent)
   #   - cosmedic-mark-on-dark.png   ← assets/logo-light.png (white-on-transparent)
   #   - cosmedic-mark-icon.png      ← 32×32 square crop of mark-only (needs ImageMagick or user-provided)
   #   - cosmedic-favicon.png        ← favicon variant (32×32)
   ```

   **If ImageMagick is available** on gda-s01:
   ```bash
   convert /var/www/cosmedic/assets/logo.png -resize 32x32 -gravity center -extent 32x32 /var/www/cosmedic/assets/logos/cosmedic-mark-icon.png
   convert /var/www/cosmedic/assets/logos/cosmedic-mark-icon.png /var/www/cosmedic/assets/logos/cosmedic-favicon.png
   ```
   **If not**, list the missing icon assets in `docs/cms-customization.md` as a user-input dependency.

   **Write `docs/cms-customization.md`** — short doc capturing:
   - Source: brand-guidelines.pdf (BIMC CosMedic v1.0, 19 May 2026).
   - Palette (5 tokens + 1 accent) mapped to Payload admin theme vars.
   - Typography (Cormorant + JetBrains Mono) loading strategy in admin.
   - Asset inventory (which file lives where, what each represents).
   - What's overridable per site (the wordmark string "CosMedic Site CMS", the per-site assets) vs what stays consistent across Gaia clients (the Payload component pattern).

2. **Write `.gitignore`** at `/var/www/cosmedic/.gitignore`:

   ```gitignore
   # Build outputs
   build
   dist
   .next
   .vercel
   next-env.d.ts
   tsconfig.tsbuildinfo

   # Dependencies
   node_modules

   # Env / secrets
   .env
   .env.local
   .env.*.local

   # OS
   .DS_Store
   Thumbs.db

   # Payload media (runtime uploads — managed by Payload, not git)
   public/media/
   packages/web/public/media/
   packages/cms/public/

   # Generated routing artifacts
   public/robots.txt
   public/sitemap*.xml

   # Test artifacts
   /test-results/
   /playwright-report/
   /blob-report/
   /playwright/.cache/

   # Local infra
   /database_backup/
   /.claude/worktrees/

   # graphify (laptop only)
   /graphify-out/
   ```

   `uploads/` is intentionally **not** excluded (snapshot-then-plan).

3. **Init repo + first commit**:

   ```bash
   cd /var/www/cosmedic
   git init -b main
   git remote add origin git@github.com:Gaia-Digital-Agency/cosmedic.git
   git add .
   git commit -m "Initial import: design handoff + CLAUDE.md + README.md + docs/{architecture,page-map}.md"
   git push -u origin main
   ```

4. **Verify** — `git log origin/main --oneline -1`. If SSH push fails (missing key or repo access), stop and surface the error.

### Verification

- `docs/architecture_info.md` exists and matches Appendix A
- `docs/sitemap.md` exists and matches the spec in Step 1b
- `README.md` exists at project root and matches the spec in Step 1a
- `git log` shows one commit on `main`
- Commit visible on GitHub
- `git status` is clean

---

## Phase 1 — Monorepo scaffold + CosMedic Site CMS branding

**Goal**: Both processes boot on assigned ports, Postgres provisioned, pm2 managing them. CosMedic Site CMS branding live in admin UI. No business logic yet — hello-world only.

**Reference docs** (read before executing):
- `docs/architecture_info.md` — runtime topology + stack rationale
- `docs/file_structure.md` — target monorepo layout
- `docs/cms_info.md` — CosMedic Site CMS branding spec (palette / typography / lockup / theme)
- `docs/cms_ops.md` §2-4 — Payload init flow, config skeleton, type generation
- `docs/cms_ops.md` §14 — Custom admin UI (CosmedicBeforeLogin/Logo/Icon + admin-theme.css)
- `docs/cms_ops.md` §16 — Bootstrap super-admin user from env
- `docs/db_ops.md` §2-3 — Postgres provisioning + connection config

**Steps**:

1. **Provision Postgres** (run as the `postgres` superuser):
   ```bash
   PW=$(openssl rand -base64 24)
   sudo -u postgres psql <<SQL
   CREATE ROLE cosmedic WITH LOGIN PASSWORD '$PW';
   CREATE DATABASE cosmedic OWNER cosmedic;
   GRANT ALL ON SCHEMA public TO cosmedic;
   SQL
   echo "DB password (stash in .env): $PW"
   ```

2. **Root config files**:
   - `package.json` — name `cosmedic`, type `module`, scripts mirror christos (`dev`, `build`, `start`, `dev:cms`, `dev:web`, `lint`, `format`, `test`, `generate:types`). Use `concurrently` for parallel dev.
   - `pnpm-workspace.yaml` — packages: `packages/*`.
   - `tsconfig.json` — extends `config/tooling/tsconfig.base.json`.
   - `config/tooling/{eslint.config.mjs, prettier.config.cjs, tsconfig.base.json}` — copied from christos.

3. **Scaffold `packages/cms` (Payload)**:
   ```bash
   cd /var/www/cosmedic
   pnpm create payload-app@latest --name cms --use-pnpm --template blank --db postgres
   ```
   - Move into `packages/cms/`.
   - `package.json` name `@cosmedic/cms`, PORT `4007`.
   - `payload.config.ts` — empty collections array initially (Users only via default), Postgres adapter pointed at `127.0.0.1:5432/cosmedic`.
   - `.env.example` (committed): `DATABASE_URI=postgres://cosmedic:REPLACE_ME@127.0.0.1:5432/cosmedic`, `PAYLOAD_SECRET=REPLACE_ME`, `PORT=4007`, `FRONTEND_URL=http://localhost:3007`.
   - `.env` (not committed): real values, generated from `.env.example`.

3a. **CosMedic Site CMS branding** in `packages/cms/payload.config.ts` (Non-negotiable #4). White-label Payload with the BIMC CosMedic brand from `docs/brand-guidelines.pdf`. Pattern borrowed from essentialbali (component scaffold: `Icon` + `Logo` no-op + `beforeLogin`), but assets and palette are CosMedic.

   ```ts
   // packages/cms/src/payload.config.ts (admin block only)
   admin: {
     user: Users.slug,
     theme: 'all',                                                  // light/dark toggle
     meta: {
       titleSuffix: ' — CosMedic Site CMS',
       description: 'BIMC CosMedic — content management for the clinic team.',
       icons: [
         { rel: 'icon', type: 'image/png', url: '/cosmedic-favicon.png' },
       ],
       openGraph: {
         siteName: 'CosMedic Site CMS',
         description: 'BIMC CosMedic — content management for the clinic team.',
         images: [{ url: '/cosmedic-mark-on-light.png' }],
       },
     },
     components: {
       graphics: {
         Icon: '@/components/CosmedicIcon',
         Logo: '@/components/CosmedicLogo',                         // no-op — suppresses Payload's default wordmark
       },
       beforeLogin: ['@/components/CosmedicBeforeLogin'],
     },
     // brand-driven theme override — injected via styles file (next code block)
     css: 'src/styles/admin-theme.css',
   },
   ```

   **`packages/cms/src/components/CosmedicBeforeLogin.tsx`** — login hero (stacked, Cormorant Garamond wordmark + BIMC lockup + Mono tagline):
   ```tsx
   import React from 'react'
   const CosmedicBeforeLogin: React.FC = () => (
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', gap: '1.1rem' }}>
       <h1 style={{ margin: 0, fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 500, fontSize: '2.4rem', letterSpacing: '0.02em', color: 'var(--theme-text)' }}>
         CosMedic Site CMS
       </h1>
       <img src="/cosmedic-mark-on-light.png" alt="BIMC CosMedic"
         style={{ width: '180px', height: 'auto', display: 'block' }} />
       <p style={{ margin: 0, fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--theme-elevation-500)' }}>
         Managed by BIMC Hospital · Nusa Dua · Bali
       </p>
     </div>
   )
   export default CosmedicBeforeLogin
   ```

   **`packages/cms/src/components/CosmedicLogo.tsx`** — no-op (suppresses Payload default):
   ```tsx
   import React from 'react'
   const CosmedicLogo: React.FC = () => null
   export default CosmedicLogo
   ```

   **`packages/cms/src/components/CosmedicIcon.tsx`** — compact mark for collapsed nav:
   ```tsx
   import React from 'react'
   const CosmedicIcon: React.FC = () => (
     <img src="/cosmedic-mark-icon.png" alt="BIMC CosMedic"
       style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'block' }} />
   )
   export default CosmedicIcon
   ```

   **`packages/cms/src/styles/admin-theme.css`** — applies brand palette + typography to Payload admin (overrides Payload's default theme-elevation vars):
   ```css
   :root {
     /* Brand palette (brand.pdf §II — 5 tokens + 1 accent) */
     --cs-paper:  #F4EFE6;
     --cs-cream:  #E6DCC8;
     --cs-ink:    #1F1B16;
     --cs-brown:  #6B4A2B;
     --cs-accent: #A67C52;

     /* Map onto Payload admin variables (light mode = default) */
     --theme-bg:            var(--cs-paper);
     --theme-text:          var(--cs-ink);
     --theme-elevation-50:  #ECE4D2;
     --theme-elevation-100: var(--cs-cream);
     --theme-elevation-500: var(--cs-brown);
     --theme-elevation-1000:var(--cs-ink);
     --theme-success-500:   var(--cs-brown);
     --theme-error-500:     #B95C5C;
     --color-accent:        var(--cs-accent);
   }
   [data-theme="dark"] {
     --theme-bg:            var(--cs-ink);
     --theme-text:          var(--cs-paper);
     --theme-elevation-50:  #2A241E;
     --theme-elevation-100: #3B332B;
     --theme-elevation-500: var(--cs-cream);
     --theme-elevation-1000:var(--cs-paper);
     --color-accent:        var(--cs-accent);
   }
   /* Brand typography in admin */
   body, .payload__app {
     font-family: 'Cormorant Garamond', 'Times New Roman', Georgia, serif;
   }
   .payload__app input, .payload__app button, code, .label, .eyebrow {
     font-family: 'JetBrains Mono', ui-monospace, monospace;
     letter-spacing: 0.05em;
   }
   ```

   **Static assets** at `packages/cms/public/`:
   - `cosmedic-mark-on-light.png` — BIMC CosMedic lockup (brand.pdf §I primary, ink on light-beige). Derived from `assets/logo.png` after Phase 0 verification.
   - `cosmedic-mark-on-dark.png` — same mark, inverse for dark theme. From `assets/logo-light.png`.
   - `cosmedic-mark-icon.png` — square crop (mark only, no endorsement), 32×32.
   - `cosmedic-favicon.png` — 32×32 favicon variant of the icon.

   **Google Fonts** for admin head (loaded via Payload `admin.meta.css` linked file or a small custom html head injection): Cormorant Garamond + JetBrains Mono.

   **Email-from name** in nodemailer config: `CosMedic Site CMS <no-reply@cosmedic.gaiada.online>`.

   **Light/dark verification**: with `theme: 'all'`, Payload follows system preference and shows toggle in the user menu. Both themes use the same brand palette mapped to the elevation vars above. Brand rule: "one bronze gesture per surface" — verify accent is on links/primary CTA only, never on cards/blocks.

3a-bis. **Bootstrap super-admin user** (Non-negotiable: never commit credentials):
   - `.env` (gitignored): `PAYLOAD_SEED_ADMIN_EMAIL=super_admin@email.com`, `PAYLOAD_SEED_ADMIN_PASSWORD=Teameditor@123`.
   - `packages/cms/src/seed/admin.ts` reads from env and creates the Users record on first boot only (no-op if user already exists).
   - **Post-launch hardening (Phase 12)**: rotate the bootstrap password, create per-editor accounts with role-based access, disable the bootstrap user OR change its password to a strong random value. `Teameditor@123` is convenience-only, never a long-lived production credential.

3b. **Write `docs/cms_info.md`** — short doc capturing: which assets are sourced from where (gda-pn01 essentialbali install), what's overridable per site (the per-site label = "BIMC CosMedic" here), brand-yellow hex value, the visual layout spec (matches essentialbali login photo), dark/light theme behaviour.

4. **Scaffold `packages/web` (Vite SSR)**:
   ```bash
   cd /var/www/cosmedic/packages
   pnpm create vite@latest web -- --template react-ts
   ```
   - Add `vite-plugin-ssr` (or React Router 7 SSR). christos uses `tsx server.ts` pattern — copy that.
   - `package.json` name `@cosmedic/web`, PORT `3007`, scripts `dev`, `build`, `start`.
   - `.env.example`: `PORT=3007`, `PAYLOAD_URL=http://localhost:4007`, `VITE_PAYLOAD_URL=http://localhost:4007`.
   - One hello-world route at `/` rendering "BIMC CosMedic — coming soon".

5. **`ecosystem.config.cjs`** at repo root (mirror christos):
   ```js
   module.exports = {
     apps: [
       { name: 'cosmedic-cms', cwd: './packages/cms', script: 'npx', args: 'next start -p 4007',
         env: { NODE_ENV: 'production', PORT: 4007 }, autorestart: true, max_memory_restart: '512M' },
       { name: 'cosmedic-web', cwd: './packages/web', script: 'pnpm', args: 'start',
         env: { NODE_ENV: 'production', PORT: 3007 }, autorestart: true, max_memory_restart: '512M' },
     ],
   };
   ```

6. **First boot**:
   ```bash
   cd /var/www/cosmedic
   pnpm install
   pnpm --filter @cosmedic/cms generate:types
   pnpm --filter @cosmedic/cms build
   pnpm --filter @cosmedic/web build
   pm2 start ecosystem.config.cjs --only cosmedic-cms,cosmedic-web
   pm2 save
   ```

7. **Commit** — second commit on `main`: "Scaffold monorepo (Payload + Vite SSR, ports 3007/4007)".

**Critical files created**: `package.json`, `pnpm-workspace.yaml`, `ecosystem.config.cjs`, `packages/cms/payload.config.ts`, `packages/web/vite.config.ts`, `.env.example` × 3.

**Verification**:
- `pm2 status` shows `cosmedic-cms` + `cosmedic-web` online.
- `curl -I http://127.0.0.1:3007` → 200.
- `curl -I http://127.0.0.1:4007/admin` → 200 (Payload login page).
- Ports 3007/4007 only — verify nothing else changed via `ss -tlnp | grep ':30\\|:40'`.
- Sibling pm2 processes (christos-*, templategen-*, etc.) all still `online`.

---

## Phase 2 — Theme + `PageShell`

**Goal**: Port `global.css` tokens to Tailwind, build `PageShell` (Header + Footer + FloatingChrome) so every subsequent page inherits the chrome. **Non-negotiable #1 starts being verifiable here** — the chrome must already match the design.

**Steps**:

1. **Copy `global.css` verbatim** to `packages/web/src/styles/globals.css` (preserves CSS-var-based rules).
2. **`tailwind.config.ts`** — theme.extend maps every var (see A.8 in Appendix A).
3. **Fonts** — `<link>` to Google Fonts (Cormorant Garamond / Inter / JetBrains Mono) in the root HTML template. Self-hosting deferred to Phase 11.
4. **Port primitives** from `shared.jsx` to `packages/web/src/components/primitives/`:
   - `<Btn>`, `<Mono>`, `<Eyebrow>` — pure presentational.
   - `<Img>` — `<picture>` + AVIF/WebP/JPG fallback + SVG-on-error matching design.
   - `<Reveal>` — IntersectionObserver hook, fade + translateY(24), `delay` prop for stagger.
   - `<PriceTag>` — IDR primary (de-DE locale, rounded to 50k) + AUD italic. Reads rate from `Settings` global (defaults to 10500).
   - `<ChapterOpener>`, `<TrustBar>`, `<CTABandSlim>`.
5. **Port shell** from `shared.jsx`:
   - `<Header>` — cream bg, fixed top, hairline bottom, logo left (`assets/logos/logo-bronze.png`), nav centred (Treatments / Surgeons / Your Journey / Gallery / Stories / Contact), mega-menus on Treatments + Surgeons (with `padding-top` hover bridge), active-state via current route match, EN|ID switcher right.
   - `<Footer>` — dark ink-100 bg, paper text, white logo, link columns (Treatments / Surgeons / Information), enquiry summary, social, copyright.
   - `<FloatingChrome>` — fixed CTA pill bottom-right ("Plan your treatment" → `/contact`), chat affordance.
6. **`<PageShell>`** composes them: `<Header /> {children} <Footer /> <FloatingChrome />`.
7. **Visual regression baseline** — capture screenshots of /, /treatments (stub), /surgeons (stub) at desktop 1440 / tablet 900 / mobile 390. Save under `tests/e2e/visual/baselines/phase-2-chrome/`.
8. **Side-by-side review** — open design `index.html` in one tab, production stub in another. Header + footer + floating chrome match.

**Critical files created**: `packages/web/src/styles/globals.css`, `tailwind.config.ts`, `packages/web/src/components/{primitives,shell}/*.tsx`.

**Verification**:
- Pixel diff between production chrome and design chrome ≤ 0.1% per pixel.
- Mega-menu hover stable (no flicker when crossing the gap).
- Active-state nav highlights correctly on each route.
- All breakpoints render without overflow.

---

## Phase 3 — Homepage

**Goal**: First fully built page. Source of truth for most primitives. Pre-Payload — data lives in `packages/web/src/content/seed.ts` (a TS port of `shared.jsx` window globals), to be replaced in Phase 6.

**Steps**:

1. **Seed data** at `packages/web/src/content/seed.ts` — ports `TREATMENT_LIST`, `SURGEON_LIST`, `SUBCATEGORIES_BY_DISCIPLINE`, `BA_PAIRS`, `STORY_PORTRAITS` as typed TS constants.
2. **Build sections matching `pages/home.jsx`**:
   - Hero — split layout, left = hero copy + embedded enquiry form (still stubbed; submit → console.log), right = lifestyle image. Reveal on enter.
   - TrustBar — ACHSI / ISAPS / years credentials.
   - Stats strip — numeric callouts (years, surgeons, procedures, countries).
   - Treatments index — 6 discipline cards from `TREATMENT_LIST`.
   - Surgeons strip — 8 portraits with hover scale 1.03 / 1.2s.
   - Gallery teaser — 4–6 B&A cards from `BA_PAIRS`, link to /gallery.
   - Journey teaser — preview of 8-step process.
   - Stories teaser — 2–3 testimonial cards.
   - "Place" / location section — Bali editorial photography.
   - CTABandSlim at end → /contact.
3. **Visual regression** — capture / at all three breakpoints. Add to suite.
4. **Side-by-side review** with `/var/www/cosmedic/index.html` rendered via the design's Babel-in-browser. Gate: visual diff ≤ tolerance.

**Critical files created**: `packages/web/src/routes/index.tsx`, `packages/web/src/content/seed.ts`, `packages/web/src/components/home/*.tsx`.

**Verification**: Homepage matches design at all breakpoints. Reveal animations trigger on scroll. Hover affordances work. Form submits to console (Phase 7 wires it).

---

## Phase 4 — Detail templates

**Goal**: Three reusable templates covering **73 routes** (6 disciplines + 18 sub-categories + 41 procedures + 8 surgeons). No duplicated markup.

**Steps**:

1. **`<ProcedureDetail>`** at `routes/treatments/[discipline]/[subcategory]/[procedure].tsx`:
   - `<ChapterOpener>` with `chapterTitle`, `tagline`, `lede`, breadcrumbs (Treatments / Discipline / Sub-category / Procedure), hero image.
   - Overview section.
   - Sections array (`id`, `t`, `body`) from subcategory-data schema.
   - `<PriceTag>` (IDR + AUD) using `priceFromAud`.
   - FAQs accordion.
   - Lead surgeon mini-card linking to `/surgeons/:slug`.
   - `<CTABandSlim>` at end.
2. **`<SubCategoryDetail>`** at `routes/treatments/[discipline]/[subcategory]/index.tsx`:
   - ChapterOpener.
   - Intro + Overview.
   - Procedures clickable list with `priceFromAud` + `READ →` slide-right hover.
   - Lead surgeon mini-card.
   - FAQs.
   - CTABand.
3. **`<DisciplineDetail>`** at `routes/treatments/[discipline]/index.tsx`:
   - ChapterOpener.
   - Sub-category cards (3 per discipline, link to sub-category).
   - Lead surgeons strip.
   - CTABand.
4. **`<SurgeonDetail>`** at `routes/surgeons/[slug].tsx`:
   - Portrait + name + cred + training + spec_areas (chips).
   - Long bio (richtext).
   - Linked procedures they perform.
   - CTABand.
5. **Visual regression** on representative routes:
   - `/treatments/surgical` (discipline)
   - `/treatments/surgical/breast` (sub-category)
   - `/treatments/surgical/breast/breast-augmentation` (procedure)
   - `/surgeons/suka` (surgeon)
6. **Side-by-side** with design equivalents (`treatment-surgical.html`, `treatment-surgical-breast.html`, etc.).

**Critical files created**: 4 template components + their routing scaffolds.

**Verification**: All 73 routes render without errors. Spot-check 4 routes (one per template type) match design 100%. `<a>` tags between templates work (sub-category → procedure → surgeon).

---

## Phase 5 — Index pages

**Goal**: The remaining 11 non-detail routes.

**Steps** — implement each route from seed data:

1. `/gallery` — B&A grid with category filters (Surgical / Non-surgical / Hair / Dental / etc.). Match `pages/gallery.jsx`.
2. `/stories` — testimonial cards from `STORY_PORTRAITS`. Match `pages/stories.jsx`.
3. `/journey` — 8-step process (chapter pattern with numbered steps). Match `pages/journey.jsx`.
4. `/pricing` — tier packages + per-treatment table with `<PriceTag>`. Match `pages/pricing.jsx`.
5. `/recovery-stays` — villa partner cards. Match `pages/recovery-stays.jsx`.
6. `/press` — editorial mentions + awards. Match `pages/press.jsx`.
7. `/contact` — enquiry form (still stubbed) + practical info. Match `pages/contact.jsx`.
8. `/video-consult` — content page. Match `pages/video-consult.jsx`.
9. `/blog` index + `/blog/:slug` template. Match `pages/blog.jsx` + `pages/blog-post.jsx`.
10. `/privacy` — content page.
11. `/funnel-assessment` — content page.

**Visual regression** — capture baselines for each.

**Critical files created**: 11 route files + supporting components (gallery filter, story card, journey step, pricing table, etc.).

**Verification**: All 85+ routes render. Visual diff ≤ tolerance on each.

---

## Phase 6 — Payload schema + content port

**Goal**: All collections live in Payload; data ported from `seed.ts` → Payload via Local API; `seed.ts` deleted; web fetches from Payload.

**Reference docs** (read before executing):
- `docs/db_schema.md` — full collection + global field-by-field spec (the WHAT)
- `docs/cms_ops.md` §5-6 — Collection + Global implementation patterns
- `docs/cms_ops.md` §7 — Access control patterns
- `docs/cms_ops.md` §8 — Localization (sets up the localized:true fields for Phase 9)
- `docs/cms_ops.md` §9 — Hooks (afterChange revalidation, enquiries email, media alt enforcement)
- `docs/cms_ops.md` §10 — Drafts + preview
- `docs/cms_ops.md` §11 — Media + image pipeline
- `docs/cms_ops.md` §12 — Seed flow (the seed-script pattern this phase implements)
- `docs/cms_ops.md` §15 — Web ↔ CMS data flow (for the web refactor at end of phase)
- `docs/cms_schema.md` — coverage matrix; verify every UI surface now sources from Payload
- `docs/db_ops.md` §4 — Migrations workflow (each schema change generates a migration)

**Steps**:

1. **Implement collections** in `packages/cms/src/collections/` per A.5 — Surgeons, Disciplines, SubCategories, Procedures, BeforeAfterCases, Stories, PressMentions, PricingTiers, RecoveryStays, BlogPosts, Enquiries, Media, Pages, Users.
2. **Implement globals**: Header, Footer, FloatingChrome, Settings.
3. **Access control**: default `read: () => true`, `update/create/delete: ({ req: { user } }) => !!user`.
4. **Flag user-facing fields** with `localized: true` (prep for Phase 9; not yet active).
5. **Generate types**: `pnpm --filter @cosmedic/cms generate:types` → `packages/cms/src/payload-types.ts`. Web imports types via TS path alias.
6. **Build seed scripts** at `packages/cms/src/seed/`:
   - **From `shared.jsx` + `pages/subcategory-data.jsx`** (editorial truth):
     `surgeons.ts`, `disciplines.ts`, `subcategories.ts`, `procedures.ts` (the 41 editorial procedures with rich content), `beforeAfter.ts`, `stories.ts`, `pressMentions.ts`, `awards.ts`, `pricingTiers.ts`, `recoveryStays.ts`, `journeySteps.ts`, `pages.ts`.
   - **From `docs/pricelist.xlsx`** (clinic's catalogue truth — parsed via `xlsx` package):
     `priceList.ts` — iterates all 7 sheets (Surgical Procedures, Non-Surgical Treatments, Machine, Injection, BTL, Further Information). Per row:
     - Detect sheet → set `sheet` field.
     - Detect section header rows (e.g. "Face & Neck", "Breast", "Eyelid", "Body") → set `category` / `subCategory`.
     - Detect `Top 3` marker in col 1 → set `featuredRank`.
     - Detect implant marker `*` in name → set `includesImplant: true` on linked Procedure.
     - Parse price columns (2025 IDR / 2025 AUD / 2026 IDR / 2026 AUD) into `pricing` group.
     - Parse range values ("IDR 1,386,000 – IDR1,584,000") into `priceIdrRangeLow` / `priceIdrRangeHigh`.
     - **Match by name** against the 41 editorial Procedures; if matched, set `linkedProcedure` rel and propagate pricing fields onto Procedures.pricing. Unmatched rows still create PriceListItems (pricelist transparency on `/pricing`).
     - `injectableProducts.ts` — parse Injection sheet → InjectableProducts collection (one record per brand+variant).
     - `machineTreatments.ts` — parse Machine sheet → MachineTreatments collection (three-tier pricing).
     - `hairRemoval.ts` — parse BTL sheet → HairRemovalAreas collection.
     - `further-information.ts` — parse the Include/Exclude lists into InclusionItems + ExclusionItems collections; parse Day 1-14 timeframe into JourneySteps.
   - **From `docs/brand-guidelines.pdf`**:
     `brand-stats.ts` — seeds BrandStats global (28 years, 8 ISAPS-FICS, 3400+ procedures, #1 hospital 2026, all sourced from brand.pdf §IV).
     `endorsement-mark.ts` — seeds EndorsementMark global with the lockup text + asset references.
     `seo-defaults.ts`, `settings.ts`, `consultation-policy.ts`, `form-defaults.ts`, `email-templates.ts` — seed remaining globals.
   - **Cross-references resolved** in `media.ts` (uploads from `assets/images/*` first, returns Media IDs) → `surgeons.ts` etc. consume those IDs.
   - **`index.ts`** orchestrates the order: Settings + globals → Media → Catalogue (Disciplines → SubCategories → Procedures + PriceListItems + InjectableProducts + MachineTreatments + HairRemovalAreas) → Editorial overrides (Pages, BeforeAfter, Stories, Press, Awards) → JourneySteps + Inclusions/Exclusions → Surgeons (with credentialedProcedures rels resolved last).
7. **Run seed** from a fresh empty DB:
   ```bash
   pnpm --filter @cosmedic/cms exec tsx src/seed/index.ts
   ```
   Idempotent: re-running on an existing DB should upsert (match by `slug` or natural key), not duplicate.
8. **Refactor web** to fetch from Payload:
   - `packages/web/src/lib/payload-client.ts` — typed fetch helpers wrapping `${PAYLOAD_URL}/api/{collection}`.
   - Per-route SSR data loaders (e.g. `loadHomeData`, `loadSurgeon(slug)`).
   - Cache layer: `/api/page-data?path=...` proxies to Payload + caches in memory with stale-while-revalidate.
9. **Delete `packages/web/src/content/seed.ts`**.
10. **Payload `afterChange` hook** on Pages/Surgeons/Procedures/etc. → `POST http://127.0.0.1:3007/api/revalidate` to bust web cache.

**Critical files created**: 14 collection files + 4 global files + ~10 seed scripts + payload-client + per-route loaders.

**Verification**:
- `/admin` login works; all 14 collections appear.
- Each collection seeded (count rows match handoff: 6 disciplines, 18 sub-categories, 41 procedures, 8 surgeons, 29 B&A, etc.).
- Every route still renders identically (visual regression suite still green).
- Edit a surgeon bio in /admin → refresh `/surgeons/suka` → see updated bio within 5s.

---

## Phase 7 — Enquiry form backend

**Goal**: Forms persist to Payload + email clinic.

**Steps**:

1. **`Enquiries` collection** already present from Phase 6. Fields: name, email, phone, country, treatmentInterest (relationship → Procedures), preferredDate (date), message (textarea), status (enum: new/contacted/converted/closed), submittedAt (auto), sourcePage (string), honeypot (hidden — silently reject if set).
2. **`POST /api/enquiry` handler** in `packages/web/src/routes/api/enquiry.ts`:
   - Zod validation.
   - Honeypot check.
   - In-memory rate-limit: 1 / IP / 60s.
   - POST to Payload Local API (or REST `POST /api/enquiries`) to create record.
   - Returns `{ ok: true }` or `{ ok: false, errors }`.
3. **`Enquiries.afterChange` hook** in Payload:
   - On `create`, sends email via nodemailer using `Settings.smtp.*` config.
   - To: `Settings.contactEmail`. Subject: `New enquiry — {name} — {treatmentInterest}`. Body: rendered template.
   - Optional autoresponder to submitter (Settings.autoresponderEnabled).
4. **SMTP provider** — TBD (user decides between Postmark / SES / clinic's relay). Stash provider creds in `.env`.
5. **Wire form UI**:
   - Hero form on `/` + form on `/contact` both POST to `/api/enquiry`.
   - react-hook-form + Zod resolver.
   - Show inline success state on 200.
6. **Optional**: Cloudflare Turnstile behind feature flag if abuse appears post-launch.

**Critical files created**: `packages/web/src/routes/api/enquiry.ts`, `packages/cms/src/collections/Enquiries.ts` (updated with hook), nodemailer wiring.

**Verification**: Submit form → enquiry visible at `/admin/collections/enquiries` → email arrives at `Settings.contactEmail` within 30s. Honeypot silently rejects bot submissions. Rate-limit returns 429 on 2nd submission within 60s.

---

## Phase 8 — nginx + SSL + DNS + deploy

**Goal**: Site reachable at `https://cosmedic.gaiada.online`.

**Steps**:

1. **DNS** — add A record (or CNAME to apex) for `cosmedic.gaiada.online` → server's public IP. (Manual via DNS provider's UI. Note A-record TTL — set short for first launch.)
2. **Append server block** to `/etc/nginx/sites-enabled/subdomains.gaiada.online`, mirroring the christos block byte-for-byte except `server_name` and ports:
   ```nginx
   server {
       listen 80;
       server_name cosmedic.gaiada.online;
       return 301 https://$host$request_uri;
   }
   server {
       listen 443 ssl http2;
       server_name cosmedic.gaiada.online;
       ssl_certificate     /etc/letsencrypt/live/cosmedic.gaiada.online/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/cosmedic.gaiada.online/privkey.pem;
       include /etc/letsencrypt/options-ssl-nginx.conf;
       ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

       # web-owned API
       location = /api/page-data    { proxy_pass http://127.0.0.1:3007; ...standard proxy headers... }
       location = /api/preview      { proxy_pass http://127.0.0.1:3007; ... }
       location = /api/exit-preview { proxy_pass http://127.0.0.1:3007; ... }
       location = /api/revalidate   { proxy_pass http://127.0.0.1:3007; ... }
       location = /api/enquiry      { proxy_pass http://127.0.0.1:3007; ... }

       # Payload admin + assets + API
       location /_next  { proxy_pass http://127.0.0.1:4007; ... }
       location /admin  { proxy_pass http://127.0.0.1:4007; ... (websocket upgrade) }
       location /api    { proxy_pass http://127.0.0.1:4007; client_max_body_size 25M; ... }

       # Everything else → web SSR
       location / { proxy_pass http://127.0.0.1:3007; ... }
   }
   ```
3. **SSL cert** — issue a dedicated cert (sibling sites all use templategen's cert but **that only works if templategen's cert SANs cover the subdomain**; cosmedic.gaiada.online is new, so almost certainly needs its own):
   ```bash
   sudo certbot --nginx -d cosmedic.gaiada.online
   ```
   This auto-edits the nginx config to point at the new cert. Verify the cert path in the server block matches.
4. **Validate + reload**:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```
   **Never** restart nginx.
5. **`pm2 save`** to persist startup.
6. **Smoke**:
   - `curl -I https://cosmedic.gaiada.online` → 200.
   - `curl -I https://cosmedic.gaiada.online/admin` → 200 (Payload login).
   - Browser: green padlock; navigate; submit form.

**Critical files modified**: `/etc/nginx/sites-enabled/subdomains.gaiada.online` (append block), `/etc/letsencrypt/live/cosmedic.gaiada.online/` (new cert dir created by certbot).

**Verification**: Site reachable, valid TLS, all routes return 200, sibling sites still up (`curl -I https://christos.gaiada.online` etc.).

---

## Phase 9 — i18n EN ⇄ ID

**Goal**: Full bilingual content + locale routing.

**Steps**:

1. **Enable Payload locales** in `payload.config.ts`:
   ```ts
   localization: { locales: ['en', 'id'], defaultLocale: 'en', fallback: true }
   ```
2. **Verify `localized: true`** on every user-facing field across all collections (set during Phase 6).
3. **Translate seed content** for `id` locale:
   - Clinic-provided translations OR contracted translator.
   - Update each record via `/admin` (it shows both locales side-by-side).
4. **Locale routing in web**:
   - `/id/*` mirrors all routes for ID locale.
   - Route loader pulls locale from URL; passes to payload-client (`?locale=id`).
5. **EN | ID switcher** in `<Header>` toggles URL prefix while preserving path (`/treatments/surgical` ⇄ `/id/treatments/surgical`).
6. **`<html lang>`** set per request. **`<link rel="alternate" hreflang>`** emitted in head for both locales.
7. **Static UI strings** (button labels, form errors, "Read more") in `packages/web/src/i18n/{en,id}.json` — small message catalogue, looked up via a tiny `t()` helper.
8. **Pricing display rule**: IDR primary always; AUD italic shown only when locale=EN.

**Critical files created/modified**: `payload.config.ts` (localization), every collection (localized flags verified), `packages/web/src/i18n/{en,id}.json`, locale-aware routing helpers.

**Verification**:
- Switch to ID → every editorial text element changes; switcher preserved path.
- View-source: `lang="id"`, `<link rel="alternate" hreflang="en" href=".../...">`.
- Visual regression on representative pages in ID locale.

---

## Phase 10 — Imagery: self-host + relicense

**Goal**: Zero CDN hot-links to `cosmedic.bimcbali.com`. Zero Unsplash placeholders.

**Steps**:

1. **Download surgeon portraits** from `cosmedic.bimcbali.com` (URLs encoded in `SURGEON_PORTRAITS`). Save to `assets/images/surgeons/{slug}.jpg`. 8 files.
2. **Download B&A composites** (URLs encoded in `BA_PAIRS`). Save to `assets/images/results/{slug}.jpg`. 29 files.
3. **Source licensed lifestyle imagery** OR AI-generate brand-controlled imagery (Midjourney / Imagen / etc. — pick provider with the user). Replace Unsplash IDs in seed for: hero, recovery villas, treatments, location, place sections.
4. **Re-run seed**: `pnpm --filter @cosmedic/cms exec tsx src/seed/media.ts` — uploads all to Payload Media, returns IDs.
5. **Update collection references**: Surgeons / BeforeAfterCases / Pages records point at uploaded Media IDs (cascading seed re-run, or manual via admin).
6. **Configure Payload `imageSizes`** in Media collection config:
   ```ts
   imageSizes: [
     { name: 'sm',  width: 480 },
     { name: 'md',  width: 768 },
     { name: 'lg',  width: 1280 },
     { name: 'xl',  width: 1920 },
     { name: '2xl', width: 2560 },
   ],
   formatOptions: { format: 'avif', options: { quality: 80 } }, // also generates webp + original
   ```
7. **Update `<Img>`** to emit `<picture>` with `<source srcset>` for AVIF + WebP + JPG fallback.
8. **nginx**: `location /api/media/ { ... expires 30d; add_header Cache-Control "public, immutable"; }`.
9. **Visual regression** — re-baseline after imagery swap (design colour-grading should be preserved when imagery is brand-licensed).

**Critical files modified**: `assets/images/*`, Payload Media collection config, `<Img>` component, nginx config (add cache header for media path).

**Verification**:
- Production network panel: no requests to `cosmedic.bimcbali.com` or `unsplash.com`.
- Lighthouse Performance on homepage ≥ 85 (will be improved further in Phase 11).
- Image sizes appropriate for viewport (no 2560 served to mobile).

---

## Phase 11 — QA + responsive polish + Pixel-Fidelity Gate + Lighthouse Green Gate + CMS-Sufficiency Gate

**Goal**: Three gates that block launch. Production matches design 100%, scores Green on Lighthouse a11y/BP/SEO across every route, and every UI surface traces to a CMS entity.

**Reference docs** (read before executing):
- `docs/sitemap.md` — route matrix for the visual-regression suite + sign-off checklist
- `docs/cms_schema.md` §5 — the 12-item coverage audit checklist (this is the CMS-Sufficiency Gate)
- `docs/cms_schema.md` §3 — per-page CMS mapping (what to verify per route)
- `docs/architecture_info.md` §11 — Lighthouse perf budget reference

**Steps**:

1. **Mobile drawer nav** (handoff README flags this as TODO):
   - Hamburger trigger at <700 viewport.
   - Slide-in drawer from right, ~85% width, paper bg.
   - Focus trap, ESC to close, click-outside to close, ARIA attrs.
   - Smooth animation matching design's other transitions.
2. **Breakpoint validation**:
   - ≥1100: full multi-column matches design.
   - 700–1099: grids → 2 cols, hero stacks, nav stays horizontal.
   - <700: single column, hero image above form, hamburger drawer.
   - Test every page at 1920 / 1440 / 1100 / 900 / 700 / 540 / 390.
3. **a11y audit** (Non-negotiable #2: Lighthouse Accessibility Green):
   - Lighthouse Accessibility **≥ 90 (Green)** on every route — target ≥ 95 where achievable.
   - `axe-core` CLI pass: zero violations.
   - Keyboard nav: tab through every interactive element, no traps, visible focus rings.
   - Screen reader: NVDA / VoiceOver pass on home + a procedure + the form.
   - Image alt text: every `<Img>` instance has meaningful alt (sourced from Payload Media `alt` field — surfaced in CMS as a required field).
4. **Lighthouse perf + SEO + BP budget** (all routes — Non-negotiable #2):
   - LCP ≤ 2.5s · CLS ≤ 0.1 · TBT ≤ 200ms
   - **Performance ≥ 85** (Green if achievable)
   - **SEO ≥ 90 (Green — required)**
   - **Best Practices ≥ 90 (Green — required)**
   - **Accessibility ≥ 90 (Green — required)**
   - Automated via **Lighthouse CI** running over the full route matrix; results stored as build artifacts. A regression below Green on a11y / BP / SEO blocks launch.
5. **Link checker**: `linkinator https://cosmedic.gaiada.online --recurse` — zero broken internal links.
6. **Broken-image checker**: scan for any 404 on `<img>` / `<picture>` requests.
7. **Form QA**: every enquiry form on the site submits successfully → Payload + email.
8. **🚧 Pixel-Fidelity Gate** (Non-negotiable #1):
   - **Playwright visual-regression suite** at `tests/e2e/visual/`:
     - One spec per route × breakpoint (~88 EN routes × 3 breakpoints = 264 screenshots; localised mirror doubles this in Phase 9).
     - Baselines captured from the design's `.html` files in `design_reference/` rendered via headless Chromium against `file://` URLs.
     - Tolerance: 0.1% per pixel, 1% total per screenshot.
   - **Page-by-page user sign-off**: checklist in `tests/e2e/visual/SIGNOFF.md` with one row per route — 47 pages + sub-pages + 41 procedure pages — marked "signed-off" only when you've personally confirmed the match.
   - **Suite must be green** AND **all sign-off rows ticked** before Phase 12 can begin.

9. **🚧 CMS-Sufficiency Gate** (Non-negotiable #3):
   - Walk through every row of the coverage audit in `docs/cms_schema.md` §5.
   - For each route in `docs/cms_schema.md` §3, verify: every text/CTA/image/list visible on the rendered page traces to a Payload field. No hard-coded strings beyond UI primitives.
   - Spot-check by editing a representative field in `/admin` per collection (e.g. change a surgeon's commonName) and confirm the public site updates within ~2s (via the revalidate hook).
   - Sign-off: checklist in `tests/cms-sufficiency-signoff.md` — every collection + global verified.
   - **Suite must be green** before Phase 12 can begin.

**Critical files created**: mobile drawer component, `tests/e2e/visual/*.spec.ts`, `tests/e2e/visual/baselines/`, `tests/e2e/visual/SIGNOFF.md`, `tests/cms-sufficiency-signoff.md`.

**Verification**: All three gates pass (Pixel-Fidelity + Lighthouse Green + CMS-Sufficiency). User explicitly signs off all three. Only then proceed to Phase 12.

---

## Phase 12 — Launch

**Goal**: Public launch.

**Steps**:

1. **Final smoke** on production URL — every navigation path, language switch, form submit, image loads.
2. **CMS editor accounts**:
   - Admin role: full access.
   - Editor role: collections except Users / Settings / Enquiries-delete.
   - Content-only role: Stories / BlogPosts / Pages only.
   - Create accounts for clinic staff with strong passwords sent via separate channel.
3. **Monitoring**:
   - Uptime: UptimeRobot or healthchecks.io — ping `/` and `/admin/api/health` every 5 min.
   - nginx error log → email alert (logwatch or a small filebeat/journald-based emitter).
   - `pm2 monit` — note baseline RAM + CPU.
4. **Internal announcement** to clinic team.
5. **Handover doc** at `docs/runbook.md`:
   - How to restart services (`pm2 restart cosmedic-cms cosmedic-web` — exact names).
   - How to add a procedure / surgeon / B&A case via /admin.
   - How to roll back a bad deploy.
   - SMTP credential rotation procedure.
   - Who to contact on incident (Gaia digital + clinic ops).

**Critical files created**: `docs/runbook.md`, monitoring config.

**Verification**: 48-hour soak with zero unresolved incidents. Final user sign-off.

---

## Phase 13 — SEO + analytics

**Goal**: Discoverable, measurable, structured.

**Steps**:

1. **`sitemap.xml`** regenerated on every Payload mutation (afterChange hook on Pages / Surgeons / Procedures / SubCategories / Disciplines / BeforeAfterCases / BlogPosts). Includes `hreflang` alternates per route. Served at `/sitemap.xml` from web.
2. **`robots.txt`** at `/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Disallow: /admin
   Disallow: /api/
   Disallow: /preview
   Sitemap: https://cosmedic.gaiada.online/sitemap.xml
   ```
3. **Per-page meta**:
   - Title: `{page} — BIMC CosMedic` (overridable per record).
   - Description from page lede or `Pages.seo.description`.
   - Canonical URL (locale-aware).
   - OG (image, title, description).
   - Twitter `summary_large_image`.
4. **Structured data (JSON-LD)**:
   - `MedicalClinic` on `/` and `/contact`.
   - `Physician` on each `/surgeons/:slug`.
   - `MedicalProcedure` on each procedure detail.
   - `BlogPosting` on each `/blog/:slug`.
5. **Analytics**:
   - GA4 or Plausible (user choice).
   - Custom events: `enquiry_submit`, `surgeon_view`, `procedure_view`, `language_switch`, `outbound_click`.
6. **Search Console + Bing Webmaster** — verify ownership, submit sitemap.

**Critical files created**: `lib/seo.ts`, sitemap generator, robots.txt route, JSON-LD components.

**Verification**: Google Rich Results test passes for /, /surgeons/suka, /treatments/surgical/breast/breast-augmentation. Sitemap parses. GA4 fires expected events.

---

## Phase 14 — Post-launch ops

**Goal**: Operational longevity.

**Steps**:

1. **Postgres backup cron**:
   ```cron
   30 02 * * * pg_dump cosmedic | gzip > /var/backups/cosmedic/cosmedic-$(date +\%F).sql.gz
   ```
   - Retention: 14 daily + 8 weekly + 6 monthly via `find -mtime` cleanup.
   - **Quarterly restore drill**: restore most recent backup to a sandbox DB, sanity-check.
2. **Payload media backup**:
   - Daily rsync of `packages/cms/public/media/` to off-server location (GCS / S3 / a sibling host).
3. **Cert renewal sanity**:
   - certbot timer already system-managed.
   - Weekly: `certbot certificates | grep cosmedic` → days remaining > 30.
4. **Editor training**:
   - 1-hour walkthrough of /admin with clinic content owner.
   - Quick-reference cheatsheet in `docs/editor-cheatsheet.md`.
5. **Runbook** (`docs/runbook.md` from Phase 12, expanded):
   - Deploy procedure (git pull → pnpm install → build → pm2 restart).
   - Incident response (site down, form not sending, admin locked out).
   - Rollback procedure (git revert + redeploy).
   - Postgres restore procedure.
6. **Quarterly audit**:
   - Re-run Lighthouse, fix regressions.
   - Dependency updates: `pnpm update --interactive` (Payload, Vite, React patches).
   - `npm audit` + Payload security advisories.
   - Sibling-site impact check (touch nothing).

**Critical files created**: cron entries, backup scripts at `scripts/backup-*.sh`, `docs/runbook.md` finalised, `docs/editor-cheatsheet.md`.

**Verification**: Backup cron creates a file daily. Restore drill succeeds. Cert renewal logs show no errors for 60+ days.

---

# Appendix A — Draft of `/var/www/cosmedic/docs/architecture_info.md`

**This is the verbatim content to write to `/var/www/cosmedic/docs/architecture_info.md` in Phase 0, Step 1.**

```markdown
# BIMC CosMedic — Ideal End-State Architecture

> Reference document. Describes the target shape of the production system: file structure, runtime topology, data model, and how every element of the Claude Design handoff is realised in production. Used as the north star for every implementation phase. Updated as decisions evolve.

## A.1 Goal

Deliver 100% of the BIMC CosMedic Claude Design handoff (75 pages, editorial-luxury aesthetic, IDR/AUD pricing, EN/ID bilingual, full surgeon and procedure catalogue) as a production multi-page marketing site on `https://cosmedic.gaiada.online`, served from `gda-s01` alongside ~10 sibling sites managed by pm2 + nginx + a shared local Postgres.

**The frontend look must be 100% the same as what is provided by Claude Design. This is the #1 non-negotiable — see the section at the top of this plan file for the verification mechanism.**

Other non-negotiables:

- **Pixel-faithful** to the handoff design tokens, typography, spacing, imagery treatment, and interaction model.
- **Lighthouse Green on a11y, Best Practices, SEO** on every route × every breakpoint (Non-negotiable #2).
- **CMS-editable** — every page, surgeon, procedure, B&A case, story, price, FAQ, and image is editable via Payload by non-technical clinic staff (Non-negotiable #3).
- **CosMedic Site CMS branding** — Payload admin UI is branded as "CosMedic Site CMS" matching `gda-pn01:/var/www/essentialbali` (Non-negotiable #4).
- **Bilingual** — every editorial string available in EN and ID via the `EN | ID` switcher already in the design.
- **Multisite-safe** — never touches sibling sites' files, certs, databases, or pm2 processes.

## A.2 Runtime topology

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
SSL cert: shared from /etc/letsencrypt/live/templategen.gaiada.online/.
```

**Why this split**: web owns rendering + revalidation; CMS owns content + admin + media. The two communicate over HTTP (web fetches content from CMS REST/GraphQL endpoints at build time and on revalidate). Same model proven on `christos.gaiada.online`.

## A.3 Tech stack

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
| TLS | Let's Encrypt (shared cert) | renewed via certbot |
| Forms | react-hook-form + Zod | latest |
| Email | nodemailer + Payload `payload-cms/email-nodemailer` | latest |
| Animation | IntersectionObserver (vanilla) + CSS transitions | — |
| Images | Sharp (server) + `<picture>` + AVIF/WebP | matches Payload media defaults |
| Testing | Vitest + Playwright | matches christos |
| Lint/format | ESLint + Prettier | matches christos |

## A.4 File structure (end state)

```
/var/www/cosmedic/                  ← deploy target on gda-s01
├── CLAUDE.md                        ← project guide for Claude sessions
├── README.md                        ← **human-facing project entry point** — what the project is, stack at a glance, how to run dev/build/deploy locally, link to docs/, link to live URL, link to design_reference/, link to CosMedic Site CMS admin URL
├── .gitignore
├── .env                             ← shared env (DB, SMTP, etc.) — never committed
├── package.json                     ← root: dev/build/start scripts via concurrently
├── pnpm-workspace.yaml              ← packages/* + config/*
├── pnpm-lock.yaml
├── ecosystem.config.cjs             ← pm2: cosmedic-cms + cosmedic-web
├── tsconfig.json                    ← shared base
│
├── .claude/                         ← Claude Code settings + worktrees (worktrees gitignored)
│   └── settings.json                ← (added later)
│
├── docs/                      ← long-form reference docs + canonical brand inputs (this folder is the "north star")
│   ├── architecture.md              ← this file
│   ├── page-map.md                  ← **every page · subpage · link · sublink · button** documented (Phase 0)
│   ├── design-tokens.md             ← extracted from global.css (Phase 2)
│   ├── content-model.md             ← full Payload collection schemas + xlsx mapping (Phase 6)
│   ├── cms-customization.md         ← CosMedic Site CMS branding spec + palette mapping (Phase 0/1)
│   ├── editor-cheatsheet.md         ← how clinic staff manage content via CosMedic Site CMS (Phase 14)
│   ├── runbook.md                   ← ops playbook (Phase 14)
│   ├── brand-guidelines.pdf         ← BIMC CosMedic Brand Guidelines v1.0 (moved from /brand.pdf in Phase 0)
│   └── pricelist.xlsx               ← clinic's canonical price + procedure catalogue (moved from /procedure.xlsx in Phase 0); CMS seed source for Phase 6
│
├── docs/                            ← shorter task-scoped docs
│   ├── decisions/                   ← ADR-style architectural decision records
│   └── handoff/                     ← copy of design_handoff_bimc_cosmedic/README.md + screenshots
│
├── assets/                          ← seed imagery (source-of-truth before Payload upload)
│   ├── logos/
│   │   ├── logo-bronze.png          ← BIMC CosMedic site logo (bronze, transparent)
│   │   ├── logo-light.png           ← BIMC CosMedic site logo (white, for dark footer)
│   │   ├── cosmedic-mark-on-light.png        ← Gaia tree-of-life mark (yellow square tile) — admin login + nav
│   │   ├── cosmedic-favicon.png     ← CosMedic Site CMS favicon (yellow tree square)
│   │   └── cosmedic-mark-on-light.png          ← CosMedic Site CMS OG image (1200×630, for admin login page link sharing)
│   └── images/
│       ├── surgeons/                ← 8 surgeon portraits, 500×500, self-hosted
│       ├── treatments/              ← 6 discipline hero images + sub-category imagery
│       ├── results/                 ← 29 B&A composite images
│       └── lifestyle/               ← hero, recovery villa, place imagery (licensed/AI)
│
├── design_reference/                ← original Claude Design source (kept read-only as reference)
│   └── (the 51 .html files, .jsx files, global.css moved here in reorg phase)
│
├── discovery/                       ← discovery artifacts (renamed from uploads/)
│   ├── feedback/                    ← claude-feedback.pdf, gemini-feedback.pdf
│   ├── roadmap/                     ← Claude/Gemini Roadmap PDFs
│   ├── screenshots/                 ← pasted-*.png discovery captures
│   └── source-imagery/              ← original surgeon photos from cosmedic.bimcbali.com
│
├── config/
│   └── tooling/
│       ├── eslint.config.mjs
│       ├── prettier.config.cjs
│       └── tsconfig.base.json
│
├── packages/
│   ├── cms/                         ← Payload CMS app (Next.js)
│   │   ├── package.json             ← name: @cosmedic/cms, PORT=4007
│   │   ├── next.config.mjs
│   │   ├── payload.config.ts
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── server.ts            ← Payload bootstrap
│   │   │   ├── collections/
│   │   │   │   ├── Surgeons.ts
│   │   │   │   ├── Disciplines.ts
│   │   │   │   ├── SubCategories.ts
│   │   │   │   ├── Procedures.ts
│   │   │   │   ├── BeforeAfterCases.ts
│   │   │   │   ├── Stories.ts
│   │   │   │   ├── PressMentions.ts
│   │   │   │   ├── PricingTiers.ts
│   │   │   │   ├── RecoveryStays.ts
│   │   │   │   ├── BlogPosts.ts
│   │   │   │   ├── Enquiries.ts
│   │   │   │   ├── Media.ts
│   │   │   │   ├── Pages.ts         ← editorial overrides (home, gallery, journey, etc.)
│   │   │   │   └── Users.ts
│   │   │   ├── globals/
│   │   │   │   ├── Header.ts        ← mega-menu structure, EN|ID labels
│   │   │   │   ├── Footer.ts        ← link columns, social, contact info
│   │   │   │   ├── Settings.ts      ← AUD↔IDR rate, SEO defaults, contact email
│   │   │   │   └── FloatingChrome.ts ← CTA pill text/href, chat config
│   │   │   ├── blocks/              ← reusable content blocks (Reveal, ChapterOpener, CTABand, etc.)
│   │   │   ├── access/              ← role-based access control
│   │   │   ├── hooks/               ← e.g. email on enquiry create
│   │   │   ├── seed/                ← scripts to seed from shared.jsx + subcategory-data.jsx
│   │   │   └── payload-types.ts     ← auto-generated by `pnpm generate:types`
│   │   └── public/media/            ← Payload local media storage (gitignored)
│   │
│   └── web/                         ← Vite SSR React app
│       ├── package.json             ← name: @cosmedic/web, PORT=3007
│       ├── vite.config.ts           ← SSR plugin, alias to @cosmedic/cms types
│       ├── tsconfig.json
│       ├── tailwind.config.ts       ← theme from design tokens (A.8)
│       ├── postcss.config.cjs
│       ├── src/
│       │   ├── entry-server.tsx
│       │   ├── entry-client.tsx
│       │   ├── App.tsx
│       │   ├── routes/              ← file-based or React Router (see A.6)
│       │   │   ├── index.tsx                       (homepage)
│       │   │   ├── treatments/
│       │   │   │   ├── index.tsx                   (treatments index)
│       │   │   │   ├── [discipline]/
│       │   │   │   │   ├── index.tsx               (discipline detail × 6)
│       │   │   │   │   └── [subcategory]/
│       │   │   │   │       ├── index.tsx           (sub-category detail × 18)
│       │   │   │   │       └── [procedure].tsx     (procedure detail × 41)
│       │   │   ├── surgeons/
│       │   │   │   ├── index.tsx
│       │   │   │   └── [slug].tsx                  (× 8)
│       │   │   ├── gallery.tsx
│       │   │   ├── stories.tsx
│       │   │   ├── journey.tsx
│       │   │   ├── pricing.tsx
│       │   │   ├── recovery-stays.tsx
│       │   │   ├── press.tsx
│       │   │   ├── contact.tsx
│       │   │   ├── video-consult.tsx
│       │   │   ├── blog/
│       │   │   │   ├── index.tsx
│       │   │   │   └── [slug].tsx
│       │   │   ├── privacy.tsx
│       │   │   └── [lang]/*                        ← localised mirror routes (A.11)
│       │   ├── components/
│       │   │   ├── shell/PageShell.tsx
│       │   │   ├── shell/Header.tsx                ← mega-menu, active-state, EN|ID
│       │   │   ├── shell/Footer.tsx
│       │   │   ├── shell/FloatingChrome.tsx        ← CTA pill + chat
│       │   │   ├── primitives/Btn.tsx
│       │   │   ├── primitives/Mono.tsx
│       │   │   ├── primitives/Eyebrow.tsx
│       │   │   ├── primitives/Img.tsx              ← with SVG fallback (matches design)
│       │   │   ├── primitives/Reveal.tsx           ← IntersectionObserver fade+translateY
│       │   │   ├── primitives/PriceTag.tsx         ← IDR primary + AUD italic
│       │   │   ├── primitives/ChapterOpener.tsx
│       │   │   ├── primitives/TrustBar.tsx
│       │   │   ├── primitives/CTABandSlim.tsx
│       │   │   └── blocks/                         ← composable richtext blocks
│       │   ├── lib/
│       │   │   ├── payload-client.ts               ← typed fetch helpers
│       │   │   ├── pricing.ts                      ← AUD→IDR conversion + format
│       │   │   ├── i18n.ts                         ← locale detection, switcher state
│       │   │   ├── reveal.ts                       ← IntersectionObserver hook
│       │   │   └── seo.ts                          ← meta + structured data builders
│       │   ├── styles/
│       │   │   ├── globals.css                     ← tokens + base + ported from design global.css
│       │   │   └── fonts.css                       ← @font-face if self-hosting fonts
│       │   └── content/                            ← static seed for pre-Payload phase (deleted in Phase 6)
│       └── public/
│           ├── favicon.ico
│           └── (no media — served from CMS)
│
├── tests/
│   ├── e2e/                         ← Playwright end-to-end (smoke + visual regression)
│   └── fixtures/
│
└── scripts/
    ├── seed.ts                      ← runs cms/src/seed/* on a fresh DB
    └── migrate.ts                   ← payload migrations runner
```

**Renames captured here** (from current `/var/www/cosmedic/` layout):

| Current | End state |
|---|---|
| `uploads/` | `discovery/` (subdivided by type) |
| `pages/*.jsx` (Babel-in-browser) | `design_reference/pages/*.jsx` (kept read-only as reference) + reimplemented in `packages/web/src/routes/` |
| `assets/surgeons/`, `assets/treatments/`, `assets/results/` | `assets/images/{surgeons,treatments,results}/` |
| `BIMC CosMedic Homepage Wireframes.html`, `design-canvas.jsx`, `wireframes.jsx`, `tweaks-panel.jsx` | `design_reference/` |

## A.5 Data model — Payload collections (comprehensive)

**Design principle**: every surface that has copy or imagery on the public site is a managed field. Sources of truth: `shared.jsx`, `pages/subcategory-data.jsx`, `docs/pricelist.xlsx` (full clinic catalogue), and `docs/brand-guidelines.pdf` (for stats + endorsement language). Hard-coding limited to: structural primitives (Btn / Mono / Eyebrow render-only), error-boundary fallbacks, build-time config.

### Catalogue collections (the clinic's reality)

| Collection | Source | Key fields | Notes |
|---|---|---|---|
| **Surgeons** (8) | `SURGEON_LIST` | slug, name, commonName, title, suffix, spec, train, proc, yearsInPractice, hue, group (`Plastic Surgery`/`Aesthetic Medicine`), lead (bool), credLine, bio (richtext), specAreas (array of strings), portrait (Media req'd alt), portraitPosition (CSS var), availabilitySchedule (array of `{ day, window, byAppointment }` — sourced from xlsx Further Info), languages (array — `en`/`id`/etc.), credentialedProcedures (relationship → Procedures) | Availability schedule + languages were missing from earlier spec; both appear in xlsx. |
| **Disciplines** (6) | `TREATMENT_LIST` | slug, order (n), title, subtitle, displayCount, hue, body, chapterTitle ([str, str]), tagline, lede, overview (richtext), heroImage (Media), procedures (relationship), leadSurgeons (relationship), faqs (array `{q, a}`), seo (group) | Overview field was missing. SEO group added per collection. |
| **SubCategories** (18) | `SUBCATEGORIES_BY_DISCIPLINE` + `subcategory-data.jsx` | slug, parent (rel → Disciplines), title, chapterTitle, tagline, lede, intro, overview, leadSurgeon (rel), sections (array `{id, t, body}`), faqs, procedures (rel), heroImage, seo | Existing — reaffirmed. |
| **Procedures** | `subcategory-data.jsx` + `pricelist.xlsx` rows | slug, name, shortName, parentDiscipline (rel), parentSubCategory (rel), description (richtext), sections (array `{id, t, body}` — for detail page sections), faqs, surgeonsCredentialed (rel), heroImage, **pricing** (group with priceIdr2025, priceAud2025, priceIdr2026, priceAud2026, currency notes), featuredRank (number, Top-3 from xlsx col 1), includesImplant (bool, from `*` marker in xlsx), included (relationship → InclusionItems), excluded (relationship → ExclusionItems), recoveryTimeline (relationship → JourneySteps subset), relatedBA (rel → BeforeAfterCases), relatedProcedures (rel), seo | **Major expansion** vs earlier draft. Pricing is multi-year + dual-currency. Includes/excludes via relationships to make universal lists editable in one place. |
| **PriceListItems** | `pricelist.xlsx` (all 7 sheets) | sheet (enum: surgical / non-surgical / machine / injection / btl), category, subCategory, name, unit (e.g. "1 ml", "per thread", "Face"), audienceTier (enum: standard / tourist / kitas_ktp / package), notes, priceIdr2025, priceAud2025, priceIdr2026, priceAud2026, priceIdrRangeLow / priceIdrRangeHigh (for "IDR 1,386,000 – IDR1,584,000" entries), linkedProcedure (rel → Procedures, optional), linkedInjectableProduct (rel → InjectableProducts, optional) | **NEW**. Decoupled from editorial Procedures — this is the full pricelist for the `/pricing` page transparency, including the 100s of line items that wouldn't all merit a procedure detail page. |
| **InjectableProducts** | `pricelist.xlsx` Injection + Non-Surgical sheets | name, brand (Restylane / Juvederm / Teosyal / etc.), productLine (Vital / Lyft / OBT / Ultra Plus / Volux / Voluma / Volbella / Volift / Volite / Redensity I/II / etc.), category (filler / botulinum-toxin / skin-booster / collagen-stimulator / bio-remodeling / hgh / thread-lift), unit (volume / units / threads), priceIdr, priceAud, notes, manufacturer, fdaApproved (bool) | **NEW**. Inventory of named products with their own SKU-level prices. Useful for "What products do you use?" transparency + future booking flow. |
| **MachineTreatments** | `pricelist.xlsx` Machine sheet | machineName (Laser Erbium / AFT / Pixel Q-Switch / Vascular Laser / etc.), area (Face / Neck / Chest / Half Arm / etc.), pricing (group: standardIdr, kitasKtpIdr, packageIdr — three-tier from xlsx), notes, linkedProcedure (rel, optional) | **NEW**. Three-tier audience pricing (Tourist / Kitas+KTP / Package) preserved. |
| **HairRemovalAreas** | `pricelist.xlsx` BTL sheet | area (Upper Lip / Chin / Whisker / Full Face / Under Arm / Full Back / Tummy / Buttock / etc.), bodyZone (face / upper / lower / package), priceIdr, notes | **NEW**. BTL hair removal is its own service line — needs its own admin surface. |
| **BeforeAfterCases** (29) | `BA_PAIRS` | slug, caseLabel, procedure (rel), composite (Media — single image, left=before/right=after), beforeAlt, afterAlt, surgeon (rel), tags, description, year, isFeatured (bool, for home teaser) | Added isFeatured + per-half alt text for accessibility (Non-negotiable #2). |
| **Stories** | `STORY_PORTRAITS` + clinic content | slug, patientLabel (anonymous-friendly), country, procedure (rel), portrait (Media), quote (short), body (richtext, long), videoUrl (optional — video testimonials), year, surgeon (rel), isFeatured | videoUrl + country added. |
| **PressMentions** | clinic content | publication, logo (Media), headline, url, publishedDate, summary, isFeatured | Reaffirmed. |
| **Awards** | clinic content | name, year, issuer, logo (Media), summary | **NEW** — referenced as "#1 hospital 2026" in brand.pdf §IV; needs to be editable as data. |
| **RecoveryStays** | clinic content | slug, name, location, heroImage (Media), gallery (array of Media), descriptor, amenities (array), priceFromAudPerNight, priceFromIdrPerNight, partnerUrl, geo (lat/lng for map) | Gallery + geo added. |
| **PricingTiers** | clinic content (concierge tiers) | slug, name, descriptor, priceFromAud, priceFromIdr, inclusions (array), sortOrder, isFeatured | Reaffirmed. |
| **BlogPosts** | future content | slug, title, lede, body (richtext), heroImage, author (rel → Authors), publishedAt, tags (rel → BlogTags), seo, readingTimeMinutes (auto) | Author + tags as relationships (was inline). |
| **BlogTags** | future content | slug, name, description | **NEW** — supporting taxonomy for blog. |
| **Authors** | future content | slug, name, role, bio, portrait (Media), surgeonProfile (rel → Surgeons, optional — if author is one of the surgeons) | **NEW**. |

### Editorial overrides (per-page handcrafted content)

| Collection | Purpose |
|---|---|
| **Pages** | One record per route (`/`, `/journey`, `/gallery`, `/stories`, `/press`, `/privacy`, `/contact`, `/video-consult`, `/funnel-assessment`). Each: slug, route, chapterTitle ([str, str]), tagline, lede, heroImage, sections (block array — reusable blocks: ChapterOpener, RichText, ImageGrid, CTABand, Stats, FAQAccordion, ProcedureList, SurgeonList, BAGrid, TestimonialList, RecoveryStayList, PressMentionList, ContactForm, JourneyStepList, ExternalEmbed), seo (group: title, description, ogImage, canonical), publishStatus (draft/published) |
| **JourneySteps** | One record per step of "Your Journey" (Day 1 / 2 / 4 / 7 / 10 / 14 from xlsx + 8-step journey from design). Each: slug, order, dayLabel ("Day 1"), title, body (richtext), icon (Media, optional), category (consult/medical/surgical/recovery/follow-up) — **NEW** so editorial team can reorder, edit, or add steps without touching code. Reused on `/journey` + procedure detail recovery timelines. |
| **InclusionItems** | Universal "what surgery includes" (from xlsx Further Info). Each: order, text, scope (`surgical-procedure` / `consultation` / `general`). Linked from Procedures.included. |
| **ExclusionItems** | Universal "what's excluded". Same structure as InclusionItems. |

### Dynamic data

| Collection | Purpose |
|---|---|
| **Enquiries** | Form submissions. Fields: name, email, phone, country, treatmentInterest (rel → Procedures or string), preferredDate, message, sourcePage, sourceCta, status (new/contacted/scheduled/converted/closed/spam), assignedTo (rel → Users), notes (timeline array), submittedAt, ip, userAgent. Access: editors read-write, public create-only via /api/enquiry. |
| **NewsletterSubscribers** | If newsletter feature added later. Fields: email, locale, consentedAt, source, status (active / unsubscribed). |
| **Redirects** | (Optional, low priority for first launch.) Fields: from (path), to (path), statusCode (301/302). Allows editors to fix broken inbound links without code. |

### Globals (singleton settings + structure)

| Global | Purpose |
|---|---|
| **Settings** | Site-wide config. Fields: siteName, siteTagline, defaultOgImage (Media), defaultMetaDescription, **audToIdrRate** (default 10500, from brand.pdf May 2026 rate), **roundIdrTo** (default 50000), contactEmail, contactPhone, whatsappNumber, addressLine1, addressLine2, city, postalCode, country, hoursMonFri, hoursSatSun, googleMapsUrl, socialLinks (array: platform, url), defaultLocale, currencyDisplayMode (`idr-only` / `idr-with-aud`). |
| **Header** | logo (Media, light + dark variants), navItems (array of `{ label, href, megaMenu (optional block: columns of `{ heading, items: [{label, href}] }`), activePattern }`), localeSwitcher (`{ enabled, labels: {en, id} }`). |
| **Footer** | logoLight (Media), linkColumns (array of `{ heading, items: [{label, href}] }`), enquirySummary (richtext), socialLinks (rel → Settings), addressBlock (richtext), copyrightTemplate (e.g. `© {year} BIMC CosMedic. All rights reserved.`). |
| **FloatingChrome** | ctaPill (`{ label, href, enabled }`), chat (`{ enabled, provider, embedScript, openOnLoad }`). |
| **BrandStats** | Stats strip values (brand.pdf §IV: 28 years / 8 ISAPS-FICS / 3,400+ procedures / #1 hospital 2026). Each stat: number, label, sourceNote. Used on home + about. **NEW** — was hard-coded earlier. |
| **EndorsementMark** | The "Managed by BIMC Hospital" endorsement text + lockup variants. Fields: endorsementLine, primaryLockup (Media), inverseLockup (Media), clearspaceUnit, minScreenWidthPx, minPrintMmWidth — captures the brand.pdf §I rules. **NEW**. |
| **ConsultationPolicy** | The fee + waiver text from xlsx ("CONSULTATION FEE : 150.000 — WILL BE FREE IF THE TREATMENT DONE THE SAME DAY"). Fields: feeIdr, feeAud, waiverConditionText, displayOn (multi-select: contact / procedure-detail / pricing / hero). **NEW**. |
| **FormDefaults** | Enquiry form labels + placeholders + success/error messages (so editors can rewrite without redeploy). Localised. **NEW**. |
| **EmailTemplates** | Templated copy for autoresponder / admin-notify emails. Each template: id, subject, bodyMjml, locale. **NEW**. |
| **SeoDefaults** | Default page title pattern, default OG image, robots.txt content, structured-data org info. **NEW** — was scattered earlier. |

### Cross-cutting field conventions

- Every editorial field is `localized: true` (Phase 9) — both `en` and `id` content.
- Every Media reference has a **required `alt` field** in the Media collection (Non-negotiable #2 a11y).
- Every collection has an `seo` group (title, description, ogImage, canonical) for per-record overrides.
- Every page-bound collection has a `publishStatus` enum (draft/published/scheduled) + `publishedAt` for drafts/previews via Payload's draft system.
- Every collection has `createdBy` / `updatedBy` (auto-tracked) for audit trail.
- Every "list" surface on the site has a CMS-managed `sortOrder` field — editors can reorder without code changes.

### Sufficiency-check checklist

Validate before Phase 11 sign-off — every item below must trace to a Payload field:

- [ ] Every textual string on the public site (except UI primitives like "More") is editable in CMS.
- [ ] Every image on the public site is from Payload Media or `assets/` (no random URLs).
- [ ] Every CTA label + destination is editable per page (via Pages.sections blocks).
- [ ] Every navigation item (header, footer, mega-menu) is editable (Header / Footer globals).
- [ ] Every price displayed on the site sources from PriceListItems or Procedures.pricing.
- [ ] Every FAQ is editable.
- [ ] Every stat (28 years, 8 surgeons, etc.) is editable (BrandStats global).
- [ ] Every endorsement / brand line (e.g. "Managed by BIMC Hospital") is editable (EndorsementMark global).
- [ ] Every form field (label, placeholder, error) is editable (FormDefaults global).
- [ ] Every email template (autoresponder, notification) is editable (EmailTemplates).
- [ ] Every page has a per-record SEO override.
- [ ] Both EN and ID content present for every editorial field.

## A.6 Routing model

Vite SSR routes (file-based). Total ~85 routes:

| Route | Source file | Backed by |
|---|---|---|
| `/` | `routes/index.tsx` | Pages global (home) + Disciplines + Surgeons + B&A |
| `/treatments` | `routes/treatments/index.tsx` | Disciplines |
| `/treatments/:discipline` | `routes/treatments/[discipline]/index.tsx` | Disciplines + child SubCategories |
| `/treatments/:discipline/:sub` | `.../[subcategory]/index.tsx` | SubCategories + child Procedures |
| `/treatments/:discipline/:sub/:procedure` | `.../[procedure].tsx` | Procedures |
| `/surgeons` | `routes/surgeons/index.tsx` | Surgeons (grouped by Plastic Surgery / Aesthetic Medicine) |
| `/surgeons/:slug` | `routes/surgeons/[slug].tsx` | Surgeons |
| `/gallery` | `routes/gallery.tsx` | BeforeAfterCases (with category filter) |
| `/stories` | `routes/stories.tsx` | Stories |
| `/journey` | `routes/journey.tsx` | Pages global (journey) — 8-step process |
| `/pricing` | `routes/pricing.tsx` | PricingTiers + Procedures |
| `/recovery-stays` | `routes/recovery-stays.tsx` | RecoveryStays |
| `/press` | `routes/press.tsx` | PressMentions |
| `/contact` | `routes/contact.tsx` | Pages global (contact) + form |
| `/video-consult` | `routes/video-consult.tsx` | Pages global (video-consult) |
| `/blog` | `routes/blog/index.tsx` | BlogPosts |
| `/blog/:slug` | `routes/blog/[slug].tsx` | BlogPosts |
| `/privacy` | `routes/privacy.tsx` | Pages global (privacy) |
| `/funnel-assessment` | `routes/funnel-assessment.tsx` | Pages global |
| `/id/*` | locale-aware mirror | Same components, locale='id' (Phase 9) |

URL design choice: deeper hierarchical structure (`/treatments/:discipline/:sub/:procedure`) instead of flat (`procedure-rhinoplasty`). Pro: SEO + breadcrumbs free. Con: not 1:1 with the handoff's flat HTML filenames. Will add redirects from old flat URLs if any are already indexed (none yet — first launch).

Web-owned API routes (proxied via nginx):

- `GET /api/page-data?path=...` — page-level data hydration cache
- `GET /api/preview` + `GET /api/exit-preview` — Payload draft preview tokens
- `POST /api/revalidate` — Payload afterChange hook calls this to bust ISR cache
- `POST /api/enquiry` — form submit endpoint (Phase 7)

## A.7 Component model — design primitives → React components

Direct mapping of `window.*` components in `shared.jsx` to `packages/web/src/components/`:

| Design (shared.jsx) | Production component | Notes |
|---|---|---|
| `window.PageShell` (implied) | `<PageShell>` | Wraps Header + Footer + FloatingChrome around children. Pulls activePage from route. |
| `window.Header` | `<Header>` | Cream bg, fixed, mega-menus on Treatments + Surgeons (padding-top bridge so hover isn't broken by gap), active-state via current route. Pulls menu structure from `Header` Global. EN\|ID switcher. |
| `window.Footer` | `<Footer>` | Dark ink-100, paper text, link columns from `Footer` Global. |
| `window.FloatingChrome` | `<FloatingChrome>` | CTA pill bottom-right + chat affordance. Always rendered, fixed-position. |
| `window.ChapterOpener` | `<ChapterOpener>` | Chapter eyebrow + serif title with italic accent on key word + lede + breadcrumbs + full-bleed image. |
| `window.Reveal` | `<Reveal>` | IntersectionObserver fade + translateY(24) on entry; `delay` prop for stagger. |
| `window.Img` | `<Img>` | `<picture>` with AVIF/WebP/JPG, brand-painted SVG fallback `onError` (preserves the design's "never broken-image-icon" rule). |
| `window.Btn` | `<Btn>` | `kind`: primary / accent / ghost. `as` prop renders `<a>` or `<button>`. |
| `window.Mono`, `window.Eyebrow` | `<Mono>`, `<Eyebrow>` | Mono font label primitives. |
| `window.PriceTag` | `<PriceTag>` | IDR primary (`Rp 89.250.000`, de-DE locale) + AUD italic underneath (`≈ AUD 8,500`). Reads rate from `Settings` global; defaults to 10500. Rounds IDR to nearest 50,000. |
| `window.TrustBar` | `<TrustBar>` | `tone="paper"|"cream"`, `compact` boolean. Shows ACHSI / ISAPS / years credentials. |
| `window.CTABandSlim` | `<CTABandSlim>` | Two-line serif title, lede, primary + secondary CTAs. Configurable from any page's content. |

Interaction primitives:

- **Mega-menu hover bridge**: `<Header>` adds `padding-top: 12px` on the dropdown panel so cursor crossing the gap stays "inside" — preserves the design's hover stability.
- **Active state**: detail pages light up the parent section nav item (e.g. `/treatments/surgical/face/rhinoplasty` highlights "Treatments" + the "Face" dropdown row).
- **Hover affordances** ported as Tailwind transitions: image `scale: 1.03` over `1.2s ease`, link underlines slide-in, dropdown rows shift right.

## A.8 Design token system

`global.css` `:root` custom properties are the single source of truth. Two-step propagation:

1. **`packages/web/src/styles/globals.css`** keeps the CSS vars verbatim (so vanilla CSS still works for one-off rules).
2. **`packages/web/tailwind.config.ts`** maps every var into the Tailwind theme:

```ts
theme: {
  extend: {
    colors: {
      paper:     'var(--paper)',
      cream:     'var(--cream)',
      ink: {
        100: 'var(--ink-100)',
         80: 'var(--ink-80)',
         60: 'var(--ink-60)',
         40: 'var(--ink-40)',
         20: 'var(--ink-20)',
         10: 'var(--ink-10)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        deep:    'var(--accent-deep)',
        tint:    'var(--accent-tint)',
      },
    },
    fontFamily: {
      serif: ['Cormorant Garamond', 'Times New Roman', 'Georgia', 'serif'],
      sans:  ['Inter', 'system-ui', 'sans-serif'],
      mono:  ['JetBrains Mono', 'ui-monospace', 'monospace'],
    },
    spacing: {
      'page-x': 'var(--page-x)', // 80px / 48px / 24px responsive
    },
    borderRadius: {
      DEFAULT: '0',  // editorial — no rounded corners
    },
    maxWidth: {
      page: '1480px',
    },
  },
},
```

Card radius **always 0**. Section vertical rhythm `clamp(72px, 10vw, 160px)`. Hairline = `1px solid theme(colors.ink.20)`.

Fonts: Google Fonts via `<link>` in HTML head (matches design); option to self-host later for perf.

## A.9 Asset pipeline

Three tiers of imagery, each with a clear pipeline:

1. **Brand assets** (logo, favicon): committed to repo at `assets/logos/`, imported directly in `packages/web/src/components/shell/`.
2. **Catalogue imagery** (surgeon portraits, treatment hero, B&A composites): managed in **Payload Media collection**. Seeded from `assets/images/` on first run. Stored in `packages/cms/public/media/` (Payload local FS) — `.gitignored`. Backed up via daily cron (Phase 14).
3. **Editorial / lifestyle**: same as catalogue — Payload Media, fully editor-managed.

Sharp pipeline (Payload `imageSizes` config) generates AVIF + WebP + JPG fallback at: 480, 768, 1280, 1920, 2560 wide. `<Img>` component emits `<picture>` with `srcset`. CDN-cached by nginx (`expires 30d`).

**Surgeon portrait standardisation**: each `Surgeons` record stores a `portraitPosition` (e.g. `center 30%`) consumed as a CSS variable on the rendered portrait, replicating the design's per-surgeon framing.

**Fallback SVG**: `<Img onError>` paints a brand-tinted SVG with the asset label + hue index — identical to the design behaviour. No broken-image icons ever.

## A.10 Form & email pipeline

```
User submits enquiry form (hero or /contact)
      │
      ▼
POST /api/enquiry  →  Vite SSR handler in packages/web
      │  validates with Zod schema (name, email, phone, country, treatmentInterest, message)
      │  honeypot field check (silent reject if filled)
      │  rate-limit by IP (in-memory or Payload-backed)
      ▼
POST to Payload REST  →  POST /api/enquiries (cms:4007)
      │  Payload Enquiries.afterChange hook fires
      ▼
Email out via nodemailer + Settings.smtp config
      │  → clinic mailbox (Settings.contactEmail)
      │  → optional autoresponder to submitter
      ▼
Return 200 to web SSR  →  show inline thank-you state
```

Spam controls: honeypot field, rate-limit (1 submission per IP per 60s), Cloudflare Turnstile if abuse appears.

## A.11 i18n strategy

- Every editorial field in Payload collections marked `localized: true` (Payload native).
- Locales: `en` (default), `id`.
- URL strategy: `cosmedic.gaiada.online/` = EN, `cosmedic.gaiada.online/id/` = ID. Switcher in header toggles between them, preserving path.
- Static UI strings (button labels, form errors, "Read more" etc.) live in `packages/web/src/i18n/{en,id}.json` — small message catalogue, not Payload-managed.
- `<html lang="...">` set per request; `<link rel="alternate" hreflang="...">` emitted in head for SEO.
- Pricing display localised: IDR primary always; AUD shown only when locale=EN (Phase 9 decision).

## A.12 SEO + structured data

- Per-page meta: title + description + canonical + OG (image, title, description) + Twitter card. Defaults from `Settings`, overrides per `Pages`/`Surgeons`/`Procedures`/`BlogPosts`.
- **MedicalClinic** schema.org JSON-LD on home + clinic info pages.
- **Physician** schema on each surgeon detail page.
- **MedicalProcedure** schema on each procedure detail.
- `sitemap.xml` regenerated on Payload `afterChange` for any localised collection; served from web at `/sitemap.xml`.
- `robots.txt` allows everything except `/admin`, `/api/`, draft preview routes.

## A.13 Build & deploy pipeline

**Build** (run on `gda-s01` because server-first dev was chosen):

```bash
cd /var/www/cosmedic
pnpm install
pnpm --filter @cosmedic/cms generate:types     # writes src/payload-types.ts
pnpm --filter @cosmedic/cms build              # Next build for Payload
pnpm --filter @cosmedic/web build              # Vite SSR bundle
```

**Start** (managed by pm2 — see `ecosystem.config.cjs`):

```bash
pm2 start ecosystem.config.cjs --only cosmedic-cms,cosmedic-web
pm2 save
```

**Deploy of an edit-and-push cycle** (eventual flow if/when dev moves to laptop):

```bash
git pull
pnpm install              # if deps changed
pnpm build
pm2 restart cosmedic-cms cosmedic-web
```

**nginx config** lives in `/etc/nginx/sites-enabled/subdomains.gaiada.online`. The cosmedic block is appended after the christos block, mirroring it byte-for-byte except for `server_name` and the proxy ports. Always: `sudo nginx -t && sudo systemctl reload nginx`. **Never** restart nginx.

## A.14 Multisite hygiene checklist

- [ ] `pm2 status` is never edited globally — only `cosmedic-cms` / `cosmedic-web` entries are touched.
- [ ] `pm2 restart all` is forbidden.
- [ ] nginx changes always validated with `nginx -t` before reload.
- [ ] Postgres role `cosmedic` owns DB `cosmedic`; never reuse another site's role.
- [ ] SSL cert is read-only from `/etc/letsencrypt/live/templategen.gaiada.online/` — never reissue, never share.
- [ ] No `pnpm install` from `/var/www/` (always cd into `/var/www/cosmedic/`).
- [ ] Ports 3007 / 4007 verified free on every (re)start.
- [ ] Backups of `cosmedic` DB do not include sibling DBs.

## A.15 Open questions (to resolve before relevant phase)

- SMTP provider (Postmark / SES / clinic's relay) — needed before Phase 7.
- Whether to self-host Google Fonts for perf — Phase 11.
- CMS editor accounts & roles — Phase 12.
- Whether Cloudflare or another CDN sits in front of nginx — Phase 13.
- Postgres backup retention policy — Phase 14.
```

---

# What's next (after Phase 0)

Once Phase 0 is done and `docs/architecture_info.md` is committed, the next planning round will drill into **Phase 1 — monorepo scaffold**: exact `package.json` contents, `pnpm-workspace.yaml`, `ecosystem.config.cjs`, Payload config, Vite config, Postgres provisioning commands, and a hello-world boot script.
