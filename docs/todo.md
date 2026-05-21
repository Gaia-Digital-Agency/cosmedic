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

- [x] **PHASE 5 — Index pages (14 routes built)**
  - [x] `/treatments` index — 6 discipline rows with hero + count + body
  - [x] `/surgeons` index — lead-surgeon feature + Plastic Surgery + Aesthetic Medicine grids
  - [x] `/results` — hybrid B&A gallery + stories archive
  - [x] `/gallery` — 4-up B&A grid with featured-cases filter bar
  - [x] `/stories` — 8 testimonials, story-row layout
  - [x] `/journey` — 7-step full journey (Enquiry → Homecoming) with paired imagery
  - [x] `/pricing` — full per-treatment table grouped by discipline + sub-category + insurance/payment columns
  - [x] `/recovery-stays` — 6 villa cards + 8-item "what's included" grid
  - [x] `/press` — 8 accreditations + 6 press mentions
  - [x] `/contact` — enquiry form + practical info + visit map (URL params: `?intent=estimate&procedure=...` prefill)
  - [x] `/video-consult` — 14-day calendar grid + time-slot picker + topic chips + submit success state
  - [x] `/blog` index — featured post + 6-card archive + 7-category filter
  - [x] `/blog-the-quiet-rhinoplasty` (rhinoplasty post body); other slugs 404 until Phase 6 backs them
  - [x] `/privacy` — 10-section policy with sticky TOC + DPO contact callout
  - [x] Router extended to `STATIC_ROUTES` map + `/blog-{slug}` matcher; App.tsx dispatcher updated
  - [x] All 14 new routes verified 200; unknown `/blog-{slug}` returns 404
  - [ ] `/funnel-assessment` — design has `.html` only (no `.jsx`); will port in Phase 6 alongside the form-builder block

- [~] **PHASE 6 — Payload schema + content port (PRIMARY CMS PHASE)** — *6a complete, 6b/6c next*
  - [x] **23 collections** implemented per `docs/db_schema.md` (17 catalogue + 4 editorial-override + Enquiries + Users + Media)
  - [x] **10 globals** implemented (Settings, Header, Footer, FloatingChrome, BrandStats, EndorsementMark, ConsultationPolicy, FormDefaults, EmailTemplates, SeoDefaults)
  - [x] 16 reusable blocks for `Pages.sections` (richText, imageGrid, ctaBand, stats, faqAccordion, procedureList, surgeonList, baGrid, testimonialList, recoveryStayList, pressMentionList, contactForm, journeyStepList, externalEmbed, notes)
  - [x] Access control + `seo` groups + `publishStatus` on draftable collections
  - [x] `pnpm generate:types` → typed Payload client in web (`src/payload-types.ts`)
  - [x] Seed scripts: surgeons, disciplines, subcategories, procedures, **pages**, beforeAfter, stories, pressMentions, awards, pricingTiers, recoveryStays, journeySteps, priceList (xlsx parser: 7 sheets → PriceListItems + InjectableProducts + MachineTreatments + HairRemovalAreas + Inclusions + Exclusions + JourneySteps), brand-stats, endorsement-mark, settings, consultation-policy, form-defaults, email-templates, seo-defaults, admin (super-admin), blogPosts (metas), header, footer
  - [x] **Phase 6 catalogue migration** generated + applied (`20260520_123550_phase_6_catalogue` + `20260520_125136_rename_section_anchor`)
  - [x] Seed run — counts: **149 PriceListItems, 93 Procedures, 8 Surgeons, 6 Disciplines, 17 SubCategories, 24 MachineTreatments, 43 HairRemovalAreas, 34 InjectableProducts, 6 JourneySteps, 5 Inclusions, 7 Exclusions, 5 Awards, 3 PressMentions, 6 RecoveryStays, 3 PricingTiers, 7 BlogPosts, 8 Pages, 10 globals**
  - [x] Web SSR cache (`packages/web/src/lib/cms.ts`) fetches all collections + globals from Payload REST, hydrates client via embedded JSON
  - [x] `/pricing` rewired — new `ClinicCatalogueTable` renders full CMS catalogue (surgical + machine + injection + BTL + consultation-policy callout) inline beneath the editorial pricing block
  - [x] All 51 existing routes still 200 (no regressions)
  - [x] **6b** — `src/content/{seed,subcategory-data,treatment-content}.ts` rewritten as Proxy-backed CMS shims via `lib/cms-proxy.ts` (lazyArray + lazyRecord). Every component import unchanged but values resolve from `getCmsCacheSync()` at access time. Router slug lookups made lazy. `entry-server.tsx` calls `setCmsCacheSync(cms)` so the SSR bundle's module instance sees the data.
  - [x] **6b** — Header reads `header.localeSwitcher` + `settings.siteName` + `floating-chrome.ctaPill`. Footer reads `footer.linkColumns` + `settings.address*` + `copyrightTemplate`. FloatingChrome reads `floating-chrome.ctaPill` + `settings.whatsappNumber`. TrustStrip reads `brand-stats.stats`. Hero reads `pages[home]` for tagline/title/lede/heroImage.
  - [x] **6c** — `<PageBlocks>` renderer for 15 `Pages.sections` block types (richText / imageGrid / ctaBand / stats / faqAccordion / procedureList / surgeonList / baGrid / testimonialList / recoveryStayList / pressMentionList / contactForm / journeyStepList / externalEmbed / notes).
  - [x] **6c** — `<CmsExtraBlocks slug="...">` injected into Home, Journey, Contact, Privacy, Press, Gallery, Stories, VideoConsult, RecoveryStays — any clinic-edited Pages.sections blocks render automatically.
  - [x] **6c** — `afterChange` revalidate hooks wired into every collection (21) + every global (10) via `packages/cms/src/lib/revalidate.ts`. Edits POST to `web /api/revalidate` to bust the 60s cache instantly.
  - [x] **6c** — Edit-and-see-live verified (any save in /admin invalidates the web cache within 1s; next request reflects the change).
  - [ ] **6c-followup (deferred)** — Sufficiency Gate audit per `docs/cms_schema.md` §5 (visual walk-through of every UI surface); deletion of `src/content/*.ts` (they're now thin shims that can stay or be removed); per-discipline pricing tiers; blog post bodies migration into CMS; sitemap regen on Payload mutations.

- [x] **PHASE 7 — Enquiry form backend**
  - [x] `Enquiries` collection (honeypot, status enum, timeline notes) — already from Phase 6a
  - [x] `POST /api/enquiry` handler in `packages/web/src/server.ts` (Zod via `lib/enquiry-schema.ts` + IP rate-limit 2/min via `lib/enquiry-rate-limit.ts` + honeypot silent-accept-as-spam)
  - [x] nodemailer email adapter in `packages/cms/src/lib/email-adapter.ts` (env-driven SMTP, JSON-transport fallback)
  - [x] `Enquiries.afterChange` on create → `sendEnquiryEmails` → clinic-notify + autoresponder, copy from `email-templates` global
  - [x] Hero quick-form on `/` + full form on `/contact` POST to `/api/enquiry` with inline success/error/rate-limit states
  - [x] End-to-end test: 2 records (1 new, 1 spam); clinic-notify + autoresponder logged for the new record; honeypot record skipped
  - [ ] **Open**: SMTP provider chosen + configured (Postmark / SES / clinic relay) — fill `SMTP_*` in `.env` once picked. Phase 8 launch can proceed; emails currently land in CMS stdout logs.
  - [ ] Optional: Cloudflare Turnstile if abuse appears post-launch

- [x] **PHASE 8 — nginx + SSL + DNS + deploy** *(commit 055c4dc — live at https://cosmedic.gaiada.online)*
  - [x] DNS A record: `cosmedic.gaiada.online` → `34.124.244.233` (already pointed pre-session)
  - [x] nginx server block replaces stale Phase-0 static-design-preview block in `/etc/nginx/sites-enabled/subdomains.gaiada.online` — mirrors christos VRTPN pattern with ports 3007/4007 + adds `/api/enquiry` web-route. Snapshot in repo at `ops/nginx/cosmedic.gaiada.online.conf`. Pre-Phase-8 backup at `/etc/nginx/backups/subdomains.gaiada.online.bak-phase8-*`
  - [x] Let's Encrypt cert at `/etc/letsencrypt/live/cosmedic.gaiada.online/` (issued 2026-05-20, expires 2026-08-18, auto-renew via certbot.timer)
  - [x] `sudo nginx -t && sudo systemctl reload nginx` — clean, only benign pre-existing http2-redefine warnings; no "conflicting server name" warnings
  - [x] `pm2 save` — `cosmedic-cms` + `cosmedic-web` persisted
  - [x] Smoke: `/` 200 (Express), `/admin` 200 (Next.js/Payload), `/treatments` 200, `/pricing` 200, `POST /api/revalidate` `{ok:true}`, `POST /api/enquiry` returns Zod 400 with validation errors, HTTP→HTTPS 301
  - [x] Sibling sites verified unchanged (christos / templatebase / templategen / flowstep all 200)
  - [ ] **Open**: SMTP provider chosen + configured (carries over from Phase 7 — Postmark / SES / clinic relay) — enquiry emails currently land in CMS stdout logs, not delivered
  - [ ] **Open** (uncovered during Phase 8 smoke): SSR router uses `/surgeon-<slug>` but `/surgeons/<slug>` returns 404; Header + sitemap.md use the latter pattern. Slug-pattern mismatch — fix during Phase 11

- [~] **Post-Phase-8 admin polish** *(in progress)*
  - [x] Web favicon: copied `cosmedic-favicon.png` + lockup variants to `packages/web/public/`; added `<link rel="icon">` + apple-touch-icon to `packages/web/index.html`
  - [x] CMS favicon: same file now served at root via web (admin meta `/cosmedic-favicon.png` resolves through nginx → web)
  - [x] `CosmedicIcon.tsx`: replaced cropped/clipped 32×32 image with pure-text "C" wordmark in Cormorant Garamond on brand bronze (avoids the "BIN" clipping artefact in the collapsed admin nav)
  - [x] `CosmedicBeforeLogin.tsx`: explicit `marginInline: auto` + `maxWidth: 420` + `textAlign: center` + `width: 100%` on every child to guarantee centring inside Payload's login wrapper; logo lockup moved above the wordmark per brand.pdf §I
  - [ ] Light/dark toggle: Payload 3 exposes the theme toggle inside the **user account menu** (top-right avatar → Account → Admin Theme). No floating toggle by default; add a custom one if more discoverable surfacing is wanted
  - [ ] Rebuild cms + restart `cosmedic-cms`; smoke `/admin/login` shows centred lockup, browser tab shows brand favicon
  - [ ] Commit the polish patch

- [ ] **PHASE 9 — i18n EN ⇄ ID**
  - [ ] `payload.config.ts`: `localization: { locales: ['en', 'id'], defaultLocale: 'en' }`
  - [ ] Verify `localized: true` on every editorial field
  - [ ] Locale routing: `/id/*` mirror
  - [ ] EN | ID switcher wired
  - [ ] `<html lang>` + `hreflang` meta
  - [ ] Static UI strings in `i18n/{en,id}.json`
  - [ ] Translation pass (clinic-provided or contracted)
  - [ ] Visual regression for ID locale

- [~] **PHASE 10 — Imagery (self-host + relicense)** *(infra complete; lifestyle imagery blocked on user AI generation)*
  - [x] Audit imagery state — bimcbali.com hot-link plan was stale (assets already self-hosted in Phase 6); 18 of ~50 slots have local files at `packages/web/public/assets/{surgeons,results,treatments}/`. 23 lifestyle/villa/hero/portrait slots still need AI gen — full brief at `docs/phase-10-imagery-gaps.md`
  - [x] Payload `imageSizes` configured: sm (480w) / md (768) / lg (1280) / xl (1920) / xxl (2560), WebP encoding at descending quality (82/80/78/76/74)
  - [x] Media seed (`packages/cms/src/seed/media.ts` + `seed:media` standalone runner): idempotent walk over `packages/web/public/assets/{surgeons,results,treatments,lifestyle}/`, find-by-filename, upload to Payload Media, then link Media IDs back onto records by slug
  - [x] First seed run: **18 files uploaded** (8 surgeon portraits + 4 BA composites + 6 treatment-discipline heroes), **13 linked** (8 surgeons + 5 of 6 disciplines — `concierge.webp` has no matching Discipline record). 4 BA composites unlinked until matching BeforeAfterCases records exist with those slugs.
  - [x] `<Img>` primitive refactored: accepts optional `media={CmsMedia}` prop. When given, emits `<picture><source type="image/webp" srcset=…><img></picture>` with srcset built from `imageSizes`. Legacy `src`-only callers continue working unchanged.
  - [x] `mediaSrcSet` + `mediaMime` helpers in `src/lib/cms.ts`; `CmsMedia` type extended with `sizes` field
  - [x] Adapters extended: `LegacySurgeon.portrait` + `LegacyTreatment.heroImage` pass through the raw CmsMedia object so components can hand it to `<Img>` without re-fetching
  - [x] 3 hot-path call sites wired: home `<Surgeons>` (lead + associates), home `<Treatments>` (discipline grid); `<Hero>` already consumes `pages[home].heroImage` through `mediaUrl` and now benefits from the srcset path automatically when a hero image is set in admin
  - [x] Root-relative URL fix: split `PAYLOAD_URL` (server-internal, `http://127.0.0.1:4007` for SSR fetches) from `PUBLIC_PAYLOAD_URL` (browser, empty = root-relative). Was baking the internal port into HTML; nginx now handles `/api/media/*` routing.
  - [x] nginx 30d immutable cache for `/api/media/*` — added a `location ^~ /api/media/` block above the existing `/api` proxy in `subdomains.gaiada.online`. Verified via `cache-control: max-age=2592000, public, immutable` on a live variant fetch. Backup at `/etc/nginx/backups/subdomains.gaiada.online.bak-phase10-*`.
  - [x] Smoke: variants `surgical-480x330.webp` / `suka-480x480.webp` / `surgical.webp` all serve 200 from `https://cosmedic.gaiada.online/api/media/file/…` with WebP content-type
  - [ ] **Open**: 23 lifestyle/villa/hero/portrait slots — user AI generation per `docs/phase-10-imagery-gaps.md` then `pnpm seed:media` re-run
  - [ ] **Open**: 25 of 29 B&A composites — need clinical sign-off + image set; deferred from this phase
  - [ ] **Open**: extend `media` prop to remaining 19 `<Img>` call sites once lifestyle imagery lands (currently only the 3 hot paths benefit from srcset; the rest still single-img)
  - [ ] **Open**: full Lighthouse Performance pass to confirm WebP+srcset reduces LCP/TBT

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

## 47 Pages — CMS page-record checklist (Phase 6 — COMPLETE)

Each row is one CMS-managed page record. Route paths reflect the **actual** flat-slug URLs in production (e.g. `/treatment-surgical-breast`, not `/treatments/surgical/breast`). All 47 pages now render from the live CMS cache via the Proxy-backed `src/content/*` shims (Phase 6b) + per-route `<CmsExtraBlocks>` (Phase 6c).

### Top-level pages (15) — Pages collection + per-route components

| # | Route | Pages.slug | CMS-driven? | Status |
|---|---|---|---|---|
| 1 | `/` | `home` | Hero (chapter/title/lede/heroImage) + TrustStrip (brand-stats) + 9 design sections + `<CmsExtraBlocks slug="home">` for clinic-added blocks | [x] |
| 2 | `/treatments` | (uses `disciplines` collection) | 6 discipline cards from CMS | [x] |
| 3 | `/surgeons` | (uses `surgeons` collection) | 8 surgeon cards from CMS | [x] |
| 4 | `/journey` | `journey` | Static 7-step layout + `<CmsExtraBlocks slug="journey">` | [x] |
| 5 | `/gallery` | `gallery` | BA cards from CMS + `<CmsExtraBlocks slug="gallery">` | [x] |
| 6 | `/stories` | `stories` | Testimonial cards from CMS + `<CmsExtraBlocks slug="stories">` | [x] |
| 7 | `/press` | `press` | Press mentions + accreditations from CMS + `<CmsExtraBlocks slug="press">` | [x] |
| 8 | `/pricing` | `pricing` | Full `ClinicCatalogueTable` (149 PriceListItems + 24 Machine + 34 Injectables + 43 BTL) from CMS | [x] |
| 9 | `/recovery-stays` | (uses `recovery-stays` collection) | 6 villas from CMS + `<CmsExtraBlocks slug="recovery-stays">` | [x] |
| 10 | `/contact` | `contact` | Form scaffold + `<CmsExtraBlocks slug="contact">` (form backend wired in Phase 7) | [x] |
| 11 | `/video-consult` | `video-consult` | 14-day picker scaffold + `<CmsExtraBlocks slug="video-consult">` | [x] |
| 12 | `/funnel-assessment` | (deferred — `.html` only in design, no `.jsx`) | — | [ ] (Phase 6 follow-up) |
| 13 | `/blog` | (uses `blog-posts` collection) | Index renders from CMS metas | [x] |
| 14 | `/blog-:slug` (template) | (per BlogPost record) | Renders from BlogPosts collection; only `the-quiet-rhinoplasty` body populated, other 6 return 404 until clinic provides bodies | [partial] |
| 15 | `/privacy` | `privacy` | Static policy + `<CmsExtraBlocks slug="privacy">` | [x] |

### Discipline pages (6) — Disciplines collection

| # | Route | Disciplines.slug | Status |
|---|---|---|---|
| 16 | `/treatment-surgical` | `surgical` | [x] |
| 17 | `/treatment-reconstructive` | `reconstructive` | [x] |
| 18 | `/treatment-non-surgical` | `non-surgical` | [x] |
| 19 | `/treatment-hair` | `hair` | [x] |
| 20 | `/treatment-dental` | `dental` | [x] |
| 21 | `/treatment-recovery` (Weight Loss) | `recovery` | [x] |

### Sub-category pages (17) — SubCategories collection

The design's `SUBCATEGORIES_BY_DISCIPLINE` defines **17** sub-categories (not 18 — earlier estimate was off-by-one). All seeded + rendered.

| # | Route | SubCategories.slug | Status |
|---|---|---|---|
| 22 | `/treatment-surgical-face` | `surgical-face` | [x] |
| 23 | `/treatment-surgical-body` | `surgical-body` | [x] |
| 24 | `/treatment-surgical-breast` | `surgical-breast` | [x] |
| 25 | `/treatment-reconstructive-breast` | `reconstructive-breast` | [x] |
| 26 | `/treatment-reconstructive-trauma` | `reconstructive-trauma` | [x] |
| 27 | `/treatment-reconstructive-craniofacial` | `reconstructive-craniofacial` | [x] |
| 28 | `/treatment-non-surgical-injectables` | `non-surgical-injectables` | [x] |
| 29 | `/treatment-non-surgical-laser` | `non-surgical-laser` | [x] |
| 30 | `/treatment-non-surgical-skin` | `non-surgical-skin` | [x] |
| 31 | `/treatment-hair-fue` | `hair-fue` | [x] |
| 32 | `/treatment-hair-therapy` | `hair-therapy` | [x] |
| 33 | `/treatment-dental-veneers` | `dental-veneers` | [x] |
| 34 | `/treatment-dental-alignment` | `dental-alignment` | [x] |
| 35 | `/treatment-dental-whitening` | `dental-whitening` | [x] |
| 36 | `/treatment-weight-loss-medical` | `weight-loss-medical` | [x] |
| 37 | `/treatment-weight-loss-endoscopic` | `weight-loss-endoscopic` | [x] |
| 38 | `/treatment-weight-loss-surgical` | `weight-loss-surgical` | [x] |

### Surgeon pages (8) — Surgeons collection

| # | Route | Surgeons.slug | Status |
|---|---|---|---|
| 39 | `/surgeon-suka` | `suka` | [x] |
| 40 | `/surgeon-astri` | `astri` | [x] |
| 41 | `/surgeon-indra` | `indra` | [x] |
| 42 | `/surgeon-wara` | `wara` | [x] |
| 43 | `/surgeon-sissy` | `sissy` | [x] |
| 44 | `/surgeon-rosa` | `rosa` | [x] |
| 45 | `/surgeon-risma` | `risma` | [x] |
| 46 | `/surgeon-theresia` | `theresia` | [x] |

**Total: 46 of 47 live + CMS-driven** (only `/funnel-assessment` deferred). Counts: 14 top-level + 6 disciplines + 17 sub-categories + 8 surgeons + 1 blog-post template = 46. (Earlier "47" target included `/funnel-assessment`.)

### Plus (not in the 47, but live as routes)

- **Editorial Procedures (93 in CMS)** — rendered inline as accordion rows on each sub-category page via the Procedures collection. Standalone `/procedure-:slug` routes deferred (low traffic value vs sub-category groupings).
- **Localised `/id/*` mirrors** — every route above doubles in Phase 9.
- **API routes**: `/api/revalidate` (POST, wired Phase 6c) · `/api/enquiry` (POST, wired Phase 7) · `/api/page-data`, `/api/preview`, `/api/exit-preview` (Phase 9+).

---

## Cross-cutting open dependencies

| Dep | Status | Phase |
|---|---|---|
| DNS A record `cosmedic.gaiada.online` → `34.124.244.233` | [ ] (user action via DNS provider) | 8 |
| SMTP provider (Postmark / SES / clinic relay) | [ ] (Phase 7 lands a nodemailer scaffold with env-driven SMTP + console fallback; pick + configure once chosen) | 7 |
| Indonesian translation pass (clinic-provided or contractor) | [ ] | 9 |
| Lifestyle imagery licensing OR AI-generate brand-controlled | [ ] | 10 |
| Self-host surgeon photos from cosmedic.bimcbali.com CDN | [ ] | 10 |
| Figma access for `KjPZnGnbpa994mf7byvcW7` (share with uiux@gaiada.com) | [ ] (optional — design already ported from `design/`) | — |
| PressMentions / Awards / Stories / RecoveryStays content from clinic | [partial] (Phase 6 seeded placeholders: 3 press, 5 awards, 0 stories, 6 villas; clinic refines via /admin) | post-launch |
| Remaining 6 blog post bodies | [ ] (only `the-quiet-rhinoplasty` body populated; clinic writes the rest in /admin) | post-launch |
| Per-discipline pricing tiers | [ ] (currently 3 tiers global across all disciplines; if needed, add discipline relationship to PricingTiers) | post-launch |
| Editor accounts list (who gets admin vs editor vs content-only) | [ ] | 12 |
| Bootstrap admin password rotation before launch (`Teameditor@123` → strong random) | [ ] | 12 |
| Sitemap regeneration on Payload mutations | [ ] | 13 |
| Cloudflare Turnstile if abuse appears post-launch on `/api/enquiry` | [ ] | post-launch |
