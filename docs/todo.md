# BIMC CosMedic — Master TODO

> Tracking file for the 14-phase plan + the 47 pages each phase touches. Pair with [plan.md](./plan.md) for the full spec of each phase.

---

## Phases

- [x] **PHASE 0 — Documentation + git checkpoint**
  - [x] Project root: `README.md`, `CLAUDE.md`, `.gitignore`, `.claude/`
  - [x] `docs/architecture_info.md`, `file_structure.md`, `db_schema.md`, `db_ops.md`, `cms_info.md`, `cms_ops.md`, `cms_schema.md`, `sitemap.md`, `plan.md`, `todo.md`
  - [x] `docs/brand-guidelines.pdf` (moved from /brand.pdf)
  - [x] `docs/pricelist.xlsx` (moved from /procedure.xlsx)
  - [x] Reorg: `uploads/` → `discovery/{feedback,roadmap,screenshots,source-imagery}`
  - [x] Reorg: design source + `assets/` → `design/`
  - [x] Initial commits pushed to `origin/main` on GitHub
  - [x] Base 3PRTVN install (root `package.json` + `pnpm install`) — pre-Phase-1

- [x] **PHASE 1 — Monorepo scaffold + Cosmedic CMS branding**
  - [x] Postgres `cosmedic` role + db provisioned (local 127.0.0.1:5432)
  - [x] `pnpm-workspace.yaml` + `packages/cms` (Payload 3.84.1 on Next 15.4.11, port 4007) + `packages/web` (Vite SSR + Express, port 3007)
  - [x] `ecosystem.config.cjs` for pm2 (`cosmedic-cms` + `cosmedic-web`)
  - [x] `.env` + `.env.example` (DATABASE_URI, PAYLOAD_SECRET, PORT vars, bootstrap admin)
  - [x] Cosmedic CMS admin branding: `CosmedicBeforeLogin.tsx`, `CosmedicLogo.tsx` (no-op), `CosmedicIcon.tsx`, `admin-theme.css` (brand palette + Cormorant Garamond + JetBrains Mono)
  - [x] Brand palette + typography wired into admin
  - [x] `theme: 'all'` (light/dark toggle)
  - [x] Hello-world boot — both processes online, `/admin` shows the Cosmedic CMS login (verified 200)
  - [x] Initial Payload migration generated + applied (`src/migrations/20260520_112358.ts`)
  - [x] Bootstrap super-admin seeded from `.env` (super_admin@email.com) — auth verified, JWT issued
  - [x] Smoke: `curl localhost:3007` → 200 + "BIMC CosMedic"; `curl localhost:4007/admin` → 200; sibling sites untouched (christos / templategen / templatebase / flowstep all still online)
  - [x] `docs/site_features.md` written (site walkthrough + features inventory)

- [x] **PHASE 2 — Theme + PageShell**
  - [x] Port `global.css` (3,687 lines) verbatim → `packages/web/src/styles/globals.css`
  - [x] Google Fonts loaded (Cormorant Garamond + Inter + JetBrains Mono) via `<link>` in index.html
  - [x] Primitives: `Btn`, `Mono`, `Eyebrow`, `Img` (with painted-SVG fallback), `Reveal` (IntersectionObserver), `PriceTag` (IDR + AUD), `ChapterOpener`, `TrustBar`, `CTABandSlim`
  - [x] Shell: `Header` (mega-menu hover bridge, EN|ID switcher, scroll-state, mobile drawer), `Footer` (3 link columns + newsletter), `FloatingChrome` (fixed CTA + WhatsApp fab), `PageShell` composer
  - [x] Mega-menu hover bridge (2 s scheduled close + bridge padding) preserved from design
  - [x] EN | ID switcher state in header (stubbed — locale routing arrives Phase 9)
  - [x] Seed data ported (`TREATMENT_LIST`, `SUBCATEGORIES_BY_DISCIPLINE`, `SURGEON_LIST`, `WHATSAPP_HREF`) → `src/content/seed.ts`
  - [x] Brand assets `design/assets/logo*.png` copied to `packages/web/public/assets/`
  - [x] Pricing helper `src/lib/pricing.ts` (AUD↔IDR @ 10,500, rounded to 50k IDR)
  - [x] `App.tsx` rewired to render `<PageShell>` with a Phase-2 placeholder body — chrome renders 200 with full design CSS bundled
  - [ ] Visual regression baseline (Playwright) — deferred to Phase 11 alongside the full QA gate
  - [ ] Tailwind theme mapping — deferred (CSS-vars + class names from `globals.css` are already the source of truth; Tailwind layer will be added only if/when needed)

- [x] **PHASE 3 — Homepage**
  - [x] `packages/web/src/content/seed.ts` extended with `IMG` (Unsplash URLs), `STORY_PORTRAITS`, `BA_PAIRS`, `TREATMENT_IMG()`, `SURGEON_IMG()`
  - [x] `design/assets/{treatments,surgeons,results}/` copied to `packages/web/public/assets/`
  - [x] Hero (image bg + vignette + headline + 2-field quick enquiry form with progressive disclosure)
  - [x] TrustStrip (4 stats: 28 yrs · 8 ISAPS-FICS · 3,400+ procedures · #1 hospital 2026)
  - [x] Intro ("Our Approach" eyebrow + pull-quote + 2-col body, all reveal-staggered)
  - [x] Treatments (6 discipline cards in `treatments-grid`)
  - [x] PricingTeaser (8 price rows + AUD↔IDR conversion + foot disclaimer + "View full pricing")
  - [x] Surgeons (lead-surgeon feature block + 6 associate cards)
  - [x] Gallery (3 B&A cards: Necklift · Lip Lift × 2)
  - [x] LeadMagnet (Bali Recovery Guide cover + email-capture form + success state)
  - [x] Journey (5 steps: Consult · Plan · Arrive · Procedure · Recover)
  - [x] Stories (3 testimonials with verified-review chips + portraits)
  - [x] Place (Bali recovery copy + A/B/C/D list + recovery-stays CTA)
  - [x] HomeApp wired in `App.tsx` — `<PageShell>` wraps all 11 sections
  - [x] Build verified: 51 modules, 72 kB CSS bundle, 238 kB JS bundle (gzip 12 kB + 74 kB)
  - [x] All home section classNames present in SSR markup (`hero-v2`, `trust-strip`, `intro`, `treatments`, `price-teaser`, `surgeons`, `gallery`, `lead-magnet`, `journey`, `stories`, `place`)
  - [ ] Side-by-side visual comparison vs `design/index.html` — pixel-fidelity gate (full Playwright suite in Phase 11)

- [x] **PHASE 4 — Detail templates (36 detail routes from 3 templates + router)**
  - [x] SSR router (`src/router.ts`) — pathname → `{ kind, slug }` discriminator, status 404 on unknown slugs
  - [x] `server.ts` + `entry-server.tsx` pass URL into render; client hydrates via `window.location.pathname`
  - [x] App.tsx switches on route to dispatch HomePage / DisciplineDetail / SubCategoryDetail / SurgeonDetail / NotFound
  - [x] `DisciplineDetail` template → 6 discipline pages (`/treatment-surgical` etc., ChapterOpener + sticky TOC + overview + sections + sub-categories (or procedures fallback) + FAQs + Related)
  - [x] `SubCategoryDetail` template → 22 sub-category pages (12 expected + extras like `recovery-villas`, `concierge-*`) — accordion TreatmentRow per row with full price + duration + recovery + included list + 3 CTAs
  - [x] `SurgeonDetail` template → 8 surgeon pages (hero + breadcrumb + stats + bio + specialty areas + training table + other-surgeon strip)
  - [x] Shared sub-components: `FAQItem` (accordion), `TreatmentRow` (accordion), `SurgeonMini`
  - [x] `NotFound` (404) — branded page with `/contact` CTA
  - [x] TREATMENT_CONTENT data → `src/content/treatment-content.ts` (6 disciplines, ~250 lines)
  - [x] SUBCATEGORY_DATA → `src/content/subcategory-data.ts` (22 entries, ~1,000 lines) — `parent`, `chapterTitle`, `sections[]`, `treatments[]`, `faqs[]`
  - [x] All routes verified: 1 home + 6 disciplines + 22 sub-categories + 8 surgeons = **37 routes returning 200**, unknown paths return 404
  - [ ] ProcedureDetail × 41 — deferred to Phase 6 (procedure detail rendered inline as accordion rows on sub-category pages per design; standalone routes need procedure data in Procedures collection)
  - [ ] Side-by-side visual comparison vs design HTML — Phase 11 pixel-fidelity gate

- [ ] **PHASE 5 — Index pages (11 remaining routes)**
  - [ ] `/gallery` with category filters
  - [ ] `/stories`
  - [ ] `/journey` (8-step process)
  - [ ] `/pricing` (tier packages + per-treatment table)
  - [ ] `/recovery-stays`
  - [ ] `/press`
  - [ ] `/contact` (form stubbed)
  - [ ] `/video-consult`
  - [ ] `/blog` index + `/blog/:slug`
  - [ ] `/privacy`
  - [ ] `/funnel-assessment`

- [ ] **PHASE 6 — Payload schema + content port (PRIMARY CMS PHASE)**
  - [ ] 17 collections implemented per `docs/db_schema.md`
  - [ ] 10 globals implemented
  - [ ] 15 reusable blocks for `Pages.sections`
  - [ ] Access control + `localized: true` flags + `seo` groups
  - [ ] `pnpm generate:types` → typed Payload client in web
  - [ ] Seed scripts: surgeons, disciplines, subcategories, procedures, **pages**, beforeAfter, stories, pressMentions, awards, pricingTiers, recoveryStays, journeySteps, priceList (xlsx parser), injectableProducts, machineTreatments, hairRemoval, brand-stats, endorsement-mark, settings, consultation-policy, form-defaults, email-templates, seo-defaults, admin (super-admin)
  - [ ] `afterChange` hooks: revalidate web, sitemap regen, media-alt enforcement
  - [ ] Web refactored to fetch from Payload (delete `seed.ts`)
  - [ ] Edit-and-see-live verified

- [ ] **PHASE 7 — Enquiry form backend**
  - [ ] `Enquiries` collection (honeypot, status enum, timeline notes)
  - [ ] `POST /api/enquiry` handler (Zod + rate-limit + honeypot)
  - [ ] `Enquiries.afterChange` → nodemailer → clinic mailbox
  - [ ] SMTP provider chosen + configured (Postmark / SES / clinic relay)
  - [ ] Hero form + `/contact` form wired
  - [ ] End-to-end test: submit → admin sees record + email arrives

- [ ] **PHASE 8 — nginx + SSL + DNS + deploy**
  - [ ] DNS A record: `cosmedic.gaiada.online` → `34.124.244.233`
  - [ ] nginx server block (port 80, then 443 after certbot)
  - [ ] `sudo certbot --nginx -d cosmedic.gaiada.online`
  - [ ] `sudo nginx -t && sudo systemctl reload nginx`
  - [ ] `pm2 save`
  - [ ] Smoke: `https://cosmedic.gaiada.online` 200, `/admin` 200, sibling sites unchanged

- [ ] **PHASE 9 — i18n EN ⇄ ID**
  - [ ] `payload.config.ts`: `localization: { locales: ['en', 'id'], defaultLocale: 'en' }`
  - [ ] Verify `localized: true` on every editorial field
  - [ ] Locale routing: `/id/*` mirror
  - [ ] EN | ID switcher wired
  - [ ] `<html lang>` + `hreflang` meta
  - [ ] Static UI strings in `i18n/{en,id}.json`
  - [ ] Translation pass (clinic-provided or contracted)
  - [ ] Visual regression for ID locale

- [ ] **PHASE 10 — Imagery (self-host + relicense)**
  - [ ] Download 8 surgeon portraits from cosmedic.bimcbali.com CDN
  - [ ] Download 29 B&A composites
  - [ ] Replace Unsplash placeholders (license or AI-generate brand imagery)
  - [ ] Re-run media seed → Payload Media
  - [ ] Payload `imageSizes`: 480/768/1280/1920/2560 × AVIF/WebP/JPG
  - [ ] `<Img>` emits `<picture>`
  - [ ] nginx caches `/api/media/*` (`expires 30d`)
  - [ ] No outbound requests to cosmedic.bimcbali.com or unsplash.com

- [ ] **PHASE 11 — QA + Gates (LAUNCH-BLOCKING)**
  - [ ] Mobile drawer nav (a11y + focus trap + ESC close)
  - [ ] Breakpoints validated: 1920 / 1440 / 1100 / 900 / 700 / 540 / 390
  - [ ] Lighthouse Green on every route × breakpoint: Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
  - [ ] axe-core: zero violations
  - [ ] Lighthouse CI configured + green
  - [ ] `linkinator`: zero broken links
  - [ ] Broken-image checker: zero 404s
  - [ ] Form QA: every form submits → email arrives
  - [ ] 🚧 **Pixel-Fidelity Gate**: Playwright visual-regression suite (88 routes × 3 breakpoints), all sign-off rows ticked in `tests/e2e/visual/SIGNOFF.md`
  - [ ] 🚧 **CMS-Sufficiency Gate**: walk `docs/cms_schema.md` §5 — every UI surface traces to a Payload entity
  - [ ] 🚧 **Lighthouse Green Gate**: CI green across full route matrix

- [ ] **PHASE 12 — Launch**
  - [ ] Final production smoke tests
  - [ ] CMS editor accounts created with roles
  - [ ] Bootstrap admin password rotated (Teameditor@123 → strong random)
  - [ ] Monitoring: uptime + nginx error log alerting + `pm2 monit` baseline
  - [ ] Handover doc `docs/runbook.md` written
  - [ ] 48-hour soak, zero unresolved incidents

- [ ] **PHASE 13 — SEO + analytics**
  - [ ] `sitemap.xml` auto-regenerated on Payload mutations (with hreflang)
  - [ ] `robots.txt`
  - [ ] Per-page meta (title, description, canonical, OG, Twitter)
  - [ ] JSON-LD: `MedicalClinic`, `Physician` (per surgeon), `MedicalProcedure` (per procedure), `BlogPosting`
  - [ ] Analytics (GA4 or Plausible) + custom events (enquiry, surgeon_view, language_switch, etc.)
  - [ ] Google Search Console + Bing Webmaster verified

- [ ] **PHASE 14 — Post-launch ops**
  - [ ] Postgres backup cron (daily, retention 14/8/6)
  - [ ] Payload media backup (daily rsync off-server)
  - [ ] Cert renewal sanity (certbot timer, weekly check)
  - [ ] Editor training (1-hour walkthrough)
  - [ ] `docs/editor_cheatsheet.md` written
  - [ ] `docs/runbook.md` finalized (deploy / incident / rollback / restore)
  - [ ] Quarterly audit cycle set up

---

## 47 Pages — CMS page-record checklist (Phase 6)

Each row is one CMS-managed page record. The "Source" column shows which collection creates it. Tick when the seed script creates the record AND the public route renders it from Payload (no longer from `seed.ts`).

### Top-level pages (15) — Pages collection

| # | Route | Page record (Pages.slug) | Status |
|---|---|---|---|
| 1 | `/` | `home` | [ ] |
| 2 | `/treatments` | `treatments` | [ ] |
| 3 | `/surgeons` | `surgeons` | [ ] |
| 4 | `/journey` | `journey` | [ ] |
| 5 | `/gallery` | `gallery` | [ ] |
| 6 | `/stories` | `stories` | [ ] |
| 7 | `/press` | `press` | [ ] |
| 8 | `/pricing` | `pricing` | [ ] |
| 9 | `/recovery-stays` | `recovery-stays` | [ ] |
| 10 | `/contact` | `contact` | [ ] |
| 11 | `/video-consult` | `video-consult` | [ ] |
| 12 | `/funnel-assessment` | `funnel-assessment` | [ ] |
| 13 | `/blog` | `blog` | [ ] |
| 14 | `/blog/:slug` (template) | (per BlogPost record) | [ ] |
| 15 | `/privacy` | `privacy` | [ ] |

### Discipline pages (6) — Disciplines collection

| # | Route | Disciplines.slug | Status |
|---|---|---|---|
| 16 | `/treatments/surgical` | `surgical` | [ ] |
| 17 | `/treatments/reconstructive` | `reconstructive` | [ ] |
| 18 | `/treatments/non-surgical` | `non-surgical` | [ ] |
| 19 | `/treatments/hair` | `hair` | [ ] |
| 20 | `/treatments/dental` | `dental` | [ ] |
| 21 | `/treatments/recovery` (Weight Loss) | `recovery` | [ ] |

### Sub-category pages (18) — SubCategories collection

| # | Route | SubCategories.slug | Status |
|---|---|---|---|
| 22 | `/treatments/surgical/face` | `surgical-face` | [ ] |
| 23 | `/treatments/surgical/body` | `surgical-body` | [ ] |
| 24 | `/treatments/surgical/breast` | `surgical-breast` | [ ] |
| 25 | `/treatments/reconstructive/breast` | `reconstructive-breast` | [ ] |
| 26 | `/treatments/reconstructive/trauma` | `reconstructive-trauma` | [ ] |
| 27 | `/treatments/reconstructive/craniofacial` | `reconstructive-craniofacial` | [ ] |
| 28 | `/treatments/non-surgical/injectables` | `non-surgical-injectables` | [ ] |
| 29 | `/treatments/non-surgical/laser` | `non-surgical-laser` | [ ] |
| 30 | `/treatments/non-surgical/skin` | `non-surgical-skin` | [ ] |
| 31 | `/treatments/hair/fue` | `hair-fue` | [ ] |
| 32 | `/treatments/hair/therapy` | `hair-therapy` | [ ] |
| 33 | `/treatments/dental/veneers` | `dental-veneers` | [ ] |
| 34 | `/treatments/dental/alignment` | `dental-alignment` | [ ] |
| 35 | `/treatments/dental/whitening` | `dental-whitening` | [ ] |
| 36 | `/treatments/recovery/medical` | `weight-loss-medical` | [ ] |
| 37 | `/treatments/recovery/endoscopic` | `weight-loss-endoscopic` | [ ] |
| 38 | `/treatments/recovery/surgical` | `weight-loss-surgical` | [ ] |
| 39 | (reserved — confirm 18th sub-category in seed) | — | [ ] |

> Note: confirm exactly 18 sub-categories during Phase 6 seed (the breakdown above currently lists 17 + 1 reserved row to match the design's 18-count from `shared.jsx` `SUBCATEGORIES_BY_DISCIPLINE`).

### Surgeon pages (8) — Surgeons collection

| # | Route | Surgeons.slug | Status |
|---|---|---|---|
| 40 | `/surgeons/suka` | `suka` | [ ] |
| 41 | `/surgeons/astri` | `astri` | [ ] |
| 42 | `/surgeons/indra` | `indra` | [ ] |
| 43 | `/surgeons/wara` | `wara` | [ ] |
| 44 | `/surgeons/sissy` | `sissy` | [ ] |
| 45 | `/surgeons/rosa` | `rosa` | [ ] |
| 46 | `/surgeons/risma` | `risma` | [ ] |
| 47 | `/surgeons/theresia` | `theresia` | [ ] |

### Plus (not in the 47, but live as routes)

- **Procedure pages (41+)** — each rendered via the `<ProcedureDetail>` template, one per `Procedures` record.
- **Localised `/id/*` mirrors** — every route above doubles in Phase 9.

---

## Cross-cutting open dependencies

- [ ] DNS A record `cosmedic.gaiada.online` → `34.124.244.233` (user action via DNS provider)
- [ ] SMTP provider (Postmark / SES / clinic relay)
- [ ] Indonesian translation pass (clinic-provided or contractor)
- [ ] Lifestyle imagery licensing OR AI-generate brand-controlled
- [ ] Self-host surgeon photos from cosmedic.bimcbali.com CDN
- [ ] Figma access for `KjPZnGnbpa994mf7byvcW7` (share with uiux@gaiada.com)
- [ ] PressMentions / Awards / Stories / RecoveryStays content from clinic
- [ ] Editor accounts list (who gets admin vs editor vs content-only)
- [ ] Bootstrap admin password rotation before launch
