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

- [~] **PHASE 11 — QA + Gates (LAUNCH-BLOCKING)** — *first pass in progress; Lighthouse/Playwright tooling deferred to a CI workstream*
  - [x] Mobile drawer nav a11y: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-hidden` on the drawer, ESC closes drawer, body scroll lock, restore-to-burger focus on close (native — drawer hides so focus returns to invoking button). Focus-trap inside drawer not added — a follow-up tracked under §Phase-11 backlog.
  - [x] Forms a11y: implicit `<label>` wrapping `<input>` on every field (Hero + Contact), success block has `role="status"`, error/rate-limit block has `role="alert"`. Inline `aria-invalid` on individual fields after server validation — deferred to follow-up.
  - [x] **Form QA**: POST `/api/enquiry` with valid payload → `{"ok":true}` 200, Enquiry record id=3 created in Payload, `[enquiry-emails] clinic notify sent` + `autoresponder sent` logged via JSON transport (SMTP wiring is Phase 12.1)
  - [x] Docs drift fixed: `docs/sitemap.md` surgeon URL pattern corrected from `/surgeons/{slug}` to actual `/surgeon-{slug}` (matches design + router + live header links)
  - [ ] **Open**: axe-core run + zero-violation pass — needs `@axe-core/playwright` install + CI script (workstream)
  - [ ] **Open**: Lighthouse Green ≥ 90 a11y/BP/SEO on every route × breakpoint — needs Lighthouse-CI install + budget config (workstream)
  - [ ] **Open**: linkinator + broken-image sweep across all 51 routes (workstream)
  - [ ] **Open**: Playwright visual-regression suite for Pixel-Fidelity Gate (workstream)
  - [ ] **Open**: CMS-Sufficiency Gate — walk `docs/cms_schema.md` §5 (manual review)
  - [ ] **Open**: Breakpoints visual check across 1920/1440/1100/900/700/540/390 (manual)

- [~] **PHASE 12 — Launch** *(infra + docs done; SMTP / editor accounts / pw rotation blocked on user input)*
  - [x] `docs/runbook.md` written — full ops playbook (deploy / restart / logs / nginx / TLS / Postgres / enquiry pipeline / incident / rollback / health endpoints)
  - [x] `ops/smoke.sh` — curl-based smoke checker (10 cosmedic endpoints + every sibling site). Exits non-zero on failure. Use pre/post-deploy.
  - [x] BeforeLogin sign-in helper is now env-gated (`PAYLOAD_SHOW_SIGNIN_HELPER=false` in cms `.env` hides the card after password rotation)
  - [x] Production smoke (Phase 12.6 first pass): bash ops/smoke.sh — all 10 cosmedic checks green; sibling sites unaffected (`gtec` pre-existing red, not us)
  - [ ] **Open · BLOCKER**: SMTP provider + credentials. **See "SMTP hookup recipe" section below for the exact steps when ready.**
  - [ ] **Open · BLOCKER**: Per-editor CMS accounts. Needs clinic team list (name + email + role). Roles to define: `admin` (Users), `editor` (Catalogue + Editorial collections), `reader` (read-only).
  - [ ] **Open · BLOCKER**: Rotate bootstrap super_admin password (after SMTP works so password-reset email delivers). Then flip `PAYLOAD_SHOW_SIGNIN_HELPER=false` and `pm2 restart cosmedic-cms --update-env`.
  - [ ] **Open**: External uptime ping (e.g. UptimeRobot 5-min HTTPS probe against `/` + `/admin/login` + 2x sibling test URLs)
  - [ ] **Open**: nginx-error alerting (tail `/var/log/nginx/error.log` for cosmedic; send to alerting webhook)
  - [ ] **Open**: 48-hour soak post-launch (no unresolved incidents)

- [x] **PHASE 13 — SEO + analytics** *(scaffold complete; analytics provider envs blank until user picks one)*
  - [x] `/robots.txt` route — Express handler in `server.ts`. Allow `/`, disallow `/api/` and `/admin`, sitemap pointer.
  - [x] `/sitemap.xml` route — Express handler. 14 static routes + dynamic slugs from CMS cache (every Surgeon, Discipline, SubCategory, BlogPost). Re-generated on every request (CMS cache is the source of truth, busted on every record save via `afterChange` hooks).
  - [x] Per-route SEO meta in `<head>` — `src/lib/seo.ts` `seoFor(pathname, cms)` returns `{title, description, canonical, ogImage, jsonLd}`. SSR pipeline injects via `<!--seo-outlet-->` replacement marker in `index.html`. Pulls page-record overrides from `Pages.title`/`lede`/`heroImage` + surgeon name+spec + discipline title — falls back to `seo-defaults` global.
  - [x] JSON-LD structured data — `MedicalClinic` on homepage; `Physician` on `/surgeon-<slug>` (linked to BIMC Hospital affiliation); `MedicalProcedure` on `/treatment-<slug>`; `BlogPosting` on `/blog-<slug>`. Emitted as `<script type="application/ld+json">` per route.
  - [x] Analytics scaffold — `src/lib/seo.ts` `renderAnalytics()` emits a Plausible snippet when `PLAUSIBLE_DOMAIN` env is set, OR a GA4 snippet when `GA4_MEASUREMENT_ID` env is set. Both off by default. Injected via `<!--analytics-outlet-->` marker in `<body>`.
  - [ ] **Open · user decision**: pick Plausible vs GA4. To enable: set the matching env var in `packages/web/.env` and `pm2 restart cosmedic-web --update-env`. Per-event custom tracking (`enquiry_submit`, `surgeon_view`, `language_switch`) is a follow-up wire-up once a provider is chosen.
  - [ ] **Open**: Google Search Console + Bing Webmaster — verify ownership via `<meta name="google-site-verification">` once a Search Console account is created. Add to `SeoDefaults` global so it ships on every page.

- [~] **PHASE 14 — Post-launch ops** *(scripts + docs ready; cron-install + media backup blocked on user)*
  - [x] `ops/postgres-backup.sh` — weekly pg_dump (Sunday 03:00) + gzip + 12-week retention + corruption smoke test. Reads DB password from `packages/cms/.env`. Cron install instructions inline.
  - [x] `docs/editor_cheatsheet.md` — clinic-facing 1-pager: sign in, find collections, update surgeons / treatments / imagery / blog, what the API button is, what NOT to touch.
  - [x] Cert renewal — `certbot.timer` is already running on the host (weekly). `sudo systemctl status certbot.timer` to verify; no manual cron needed.
  - [ ] **Open**: install the postgres backup cron. As `azlan`, `crontab -e` and add:
        `0 3 * * 0 /var/www/cosmedic/ops/postgres-backup.sh >> /var/log/cosmedic-backup.log 2>&1`
        Then verify after the first Sunday: `ls -la /var/backups/cosmedic/`.
  - [ ] **Open**: Payload media backup — weekly rsync of `/var/www/cosmedic/packages/cms/media/` to off-server location. Same cron slot, separate script.
  - [ ] **Open**: editor training session (1h walkthrough) — use `docs/editor_cheatsheet.md` as agenda.
  - [ ] **Open**: quarterly audit cycle (cert expiry / npm audit / lighthouse drift / backup-restore drill).

---

## SMTP hookup recipe (Phase 12.1)

Enquiry emails currently land in the cms stdout as JSON-formatted payloads (the nodemailer "json" transport fallback). Real delivery needs SMTP credentials wired in. **All other email infra is already in place** — the `Enquiries.afterChange` hook calls `sendEnquiryEmails`, which reads the `email-templates` global, formats clinic-notify + autoresponder, and sends via `nodemailerAdapter` in `packages/cms/src/lib/email-adapter.ts`.

To activate:

1. **Pick a provider** (recommended: Postmark or AWS SES; cheap, deliverable, supports DKIM).
2. **DNS** — add the provider's SPF (`v=spf1 include:spf.example.com -all`) + DKIM records (`postmark._domainkey` or `selector._domainkey`) for `cosmedic.gaiada.online` (sender domain). DMARC alignment recommended (`p=none` to start; tighten later).
3. **Edit `packages/cms/.env`** (gitignored — never commit):
   ```
   SMTP_HOST=smtp.postmarkapp.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=<provider api token>
   SMTP_PASS=<same as user for Postmark>
   MAIL_FROM_NAME="Cosmedic CMS"
   MAIL_FROM_ADDRESS=no-reply@cosmedic.gaiada.online
   MAIL_CLINIC_TO=cosmedic@bimcbali.com
   ```
4. **Restart** the cms with env reload: `pm2 restart cosmedic-cms --update-env`
5. **Verify** end-to-end:
   ```bash
   curl -s -X POST https://cosmedic.gaiada.online/api/enquiry \
     -H 'content-type: application/json' \
     -d '{"name":"SMTP test","email":"<your-real-inbox>","areaOfInterest":"surgical","message":"smoke"}'
   pm2 logs cosmedic-cms --lines 30 --nostream | grep enquiry-emails
   ```
   Expect: `clinic notify sent to cosmedic@bimcbali.com` + `autoresponder sent to <your-inbox>`. Confirm both arrive in real inboxes (check spam folder on the autoresponder side; SPF/DKIM correct = no spam).
6. **Once delivery verified**: rotate the super_admin password via admin UI (top-right avatar → Account), then add `PAYLOAD_SHOW_SIGNIN_HELPER=false` to `.env` and restart cms again. The pre-launch sign-in helper card disappears from `/admin/login`.

If delivery fails:
- `nslookup -type=txt cosmedic.gaiada.online` shows SPF? DKIM selectors resolve?
- `pm2 logs cosmedic-cms --lines 50 --nostream --err | grep -i nodemailer` for SMTP-level errors
- Postmark/SES dashboard shows the failed send with a specific reason (bounce, blocked, suspended)

## Future actions — clear list

| What | Who | When |
|---|---|---|
| Pick SMTP provider + add creds | Dev | Before clinic editor handover |
| Pick analytics (Plausible / GA4) + set env | Dev | Pre-launch |
| Provide clinic team list (names + emails + roles) | Dev | Pre-launch |
| Generate AI imagery per `docs/phase-10-imagery-gaps.md` | Dev | Replaces 24 placeholders + ~25 B&A composites |
| Approve / regenerate Indonesian translations | Dev | Phase 9 lengthy (post-launch OK) |
| Install postgres backup cron | Dev | Pre-launch |
| Set up UptimeRobot / external pinger | Dev | Pre-launch |
| Verify Search Console + Bing | Dev | Post-launch |
| Run Lighthouse CI + axe + Playwright visual regression | Dev | Phase 11 backlog |
| Phase 9 lengthy (Payload localization config + localized:true flags on every editorial field + Indonesian editorial copy drafted via ML and reviewed by clinic) | Dev + clinic | Deferred per user; resumes after launch + at least one editorial-team training |
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
