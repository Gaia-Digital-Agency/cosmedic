# BIMC CosMedic — File Structure

> The target end-state layout of `/var/www/cosmedic/`. This describes where everything **should** live; the current state may be partially migrated. Tracked in this document so any contributor can read the intent without inferring it from the tree.
>
> **Updated 2026-05-27:** Live state. 18 collections registered. Separate pricing collections (MachineTreatments, InjectableProducts, HairRemovalAreas, SurgicalItems, MachineItems, InjectionItems, BTLItems, ClinicCatalogueItems, PriceListItems) and legacy collections (PricingTiers, InclusionItems, ExclusionItems, Pages) have all been unregistered — Procedures is the single pricing source. No standalone Pricing bucket in admin (merged into Treatments by changes08-A). CMS sidebar source of truth: [cms_structure.md](../cms/cms_structure.md).

---

## End-state directory tree

```
/var/www/cosmedic/                  ← deploy target on gda-s01
├── CLAUDE.md                        ← project guide for Claude Code sessions
├── README.md                        ← human-facing project entry point
├── .gitignore
├── .env                             ← shared env (DB, SMTP, etc.) — NEVER committed
├── .env.example                     ← committed template
├── package.json                     ← root: dev/build/start scripts via concurrently
├── pnpm-workspace.yaml              ← packages/* + config/*
├── pnpm-lock.yaml
├── ecosystem.config.cjs             ← pm2: cosmedic-cms + cosmedic-web
├── tsconfig.json                    ← shared base
│
├── .claude/                         ← Claude Code settings + worktrees (worktrees gitignored)
│   └── settings.json                ← (added when project-specific Claude settings exist)
│
├── docs/                            ← north-star documentation + canonical brand inputs
│   ├── architecture_info.md         ← runtime topology, stack, deploy
│   ├── file_structure.md            ← this file
│   ├── db_schema.md                 ← full Payload collection + global schema
│   ├── db_ops.md                    ← Postgres provisioning, migrations, backup, perf
│   ├── sitemap.md                   ← every route, mega-menu, CTA inventory
│   ├── cms_info.md                  ← Cosmedic CMS white-label spec
│   ├── cms_ops.md                   ← Payload hooks, access, seed, email, drafts
│   ├── cms_schema.md                ← UI ↔ CMS coverage matrix (legacy view; superseded by CMS_structure.md for buckets)
│   ├── CMS_structure.md             ← (2026-05-23) SOURCE OF TRUTH — locked sidebar buckets + entities + fields
│   ├── cms_custom_change.md         ← (2026-05-23) Reusable playbook — mirror CMS admin to site IA
│   ├── editor_cheatsheet.md         ← how clinic staff use Cosmedic CMS
│   ├── architecture/runbook.md      ← ops playbook
│   ├── site_features.md             ← visitor-eye narrative of every screen and feature
│   ├── plan.md                      ← 14-phase execution plan
│   ├── all_todo.md                  ← (2026-05-23) Single TODO file — replaces former cms_todo.md + todo.md
│   ├── commit_list.md               ← (2026-05-23) 27-commit tracker for Phases D/C/P/N/Q/M
│   ├── phase-10-imagery-gaps.md     ← Phase 10 imagery brief
│   ├── brand-guidelines.pdf         ← BIMC CosMedic Brand Guidelines v1.0 (canonical brand source)
│   └── pricelist.xlsx               ← clinic's canonical price + procedure catalogue (CMS seed source)
│
├── design/assets/         ← CURRENT — design source imagery, lives inside design/
│   ├── logo.png                     ← BIMC lockup (bronze on transparent) — referenced by design as `assets/logo.png`
│   ├── logo-light.png               ← BIMC lockup (white) — referenced as `assets/logo-light.png`
│   ├── surgeons/                    ← 8 surgeon portraits (suka.png, astri.png, etc.)
│   ├── treatments/                  ← 6 discipline hero images
│   └── results/                     ← 3 B&A composite images (lip-lift × 2, necklift × 1)
│
│   NOTE: This folder lives inside design/ because the design's
│   .html / .jsx files reference paths as `assets/logo.png` (relative). When
│   served by nginx with root=design/, those paths resolve correctly.
│   Renames or moves here would break the design preview — Non-negotiable #1.
│
├── assets/                          ← (Phase 1+) PRODUCTION asset structure for packages/web/
│   │                                   Empty until Phase 1 scaffold; populated then.
│   ├── logos/                       ← clean filenames (cosmedic-mark-on-light.png, etc.)
│   └── images/                      ← curated production imagery
│       ├── surgeons/                ← self-hosted from cosmedic.bimcbali.com (Phase 10)
│       ├── treatments/              ← brand-licensed or AI-generated (Phase 10)
│       ├── results/                 ← 29 B&A composites for production (Phase 10)
│       └── lifestyle/               ← hero / recovery villa / place imagery (Phase 10)
│
├── design/                ← original Claude Design source (READ-ONLY reference)
│   ├── _html-archive/               ← 2026-05-23 cleanup: the 51 newer-model .html page shells
│   │                                  (index.html, treatment-*.html, surgeon-*.html, blog.html,
│   │                                  pricing.html, etc.). Babel-in-browser; never imported.
│   ├── global.css                   ← canonical design tokens
│   ├── shared.jsx                   ← React primitives + data exports
│   ├── pages/                       ← per-route .jsx component specs (47 files)
│   ├── design-canvas.jsx            ← design exploration tooling
│   ├── wireframes.jsx
│   ├── tweaks-panel.jsx
│   └── _original-handoff/           ← the original handoff bundle preserved verbatim
│       ├── README.md                ← canonical handoff README (read first for design questions)
│       └── design/                  ← older handoff iteration: 41 procedure-*.html flat pages, etc.
│
│   Two iterations are preserved because they describe different routing models:
│   - `_html-archive/*.html`: newer nested model — `treatment-{discipline}-{sub}.html`
│   - `_original-handoff/design/*.html`: older flat model — `procedure-{slug}.html` (41 files)
│   Both inform Phase 4 (detail templates) and the Phase 11 pixel-fidelity diff.
│
├── discovery/                       ← discovery artifacts (was uploads/)
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
│   │   │   ├── collections/         ← 18 live collections (see db_schema.md)
│   │   │   │   ├── Analytics.ts     ← Ask The Doctor chat log (Contact bucket)
│   │   │   │   ├── Authors.ts
│   │   │   │   ├── Awards.ts
│   │   │   │   ├── BeforeAfterCases.ts
│   │   │   │   ├── BlogPosts.ts
│   │   │   │   ├── BlogTags.ts
│   │   │   │   ├── Disciplines.ts
│   │   │   │   ├── Enquiries.ts
│   │   │   │   ├── JourneySteps.ts
│   │   │   │   ├── Media.ts
│   │   │   │   ├── PressMentions.ts
│   │   │   │   ├── PrivacySections.ts
│   │   │   │   ├── Procedures.ts    ← single source of truth for ALL pricing
│   │   │   │   ├── RecoveryStays.ts
│   │   │   │   ├── Stories.ts
│   │   │   │   ├── SubCategories.ts
│   │   │   │   ├── Surgeons.ts
│   │   │   │   └── Users.ts
│   │   │   │
│   │   │   │   ← REMOVED (orphan DB tables remain but unregistered):
│   │   │   │     PricingTiers.ts · InclusionItems.ts · ExclusionItems.ts
│   │   │   │     MachineTreatments.ts · InjectableProducts.ts · HairRemovalAreas.ts
│   │   │   │     SurgicalItems.ts · MachineItems.ts · InjectionItems.ts
│   │   │   │     BTLItems.ts · ClinicCatalogueItems.ts · PriceListItems.ts
│   │   │   │     Pages.ts · NewsletterSubscribers.ts · Redirects.ts
│   │   │   │
│   │   │   ├── globals/
│   │   │   │   ├── Settings.ts      ← AUD↔IDR, contact info, social, etc.
│   │   │   │   ├── Header.ts        ← nav structure + mega-menus
│   │   │   │   ├── Footer.ts        ← link columns + social + address
│   │   │   │   ├── FloatingChrome.ts ← CTA pill + chat config
│   │   │   │   ├── BrandStats.ts    ← 28 years / 8 surgeons / etc.
│   │   │   │   ├── EndorsementMark.ts
│   │   │   │   ├── ConsultationPolicy.ts ← fee + waiver (group: Treatments)
│   │   │   │   ├── FormDefaults.ts
│   │   │   │   ├── EmailTemplates.ts
│   │   │   │   ├── SeoDefaults.ts
│   │   │   │   ├── pages/            ← per-route Page Globals + templates
│   │   │   │   │   ├── _pageFields.ts
│   │   │   │   │   ├── HomePage.ts · PressPage.ts · PrivacyPage.ts
│   │   │   │   │   ├── TreatmentsPage.ts · SurgeonsPage.ts · ResultsPage.ts
│   │   │   │   │   ├── GalleryPage.ts · PricingPage.ts · JourneyPage.ts
│   │   │   │   │   ├── StoriesPage.ts · RecoveryStaysPage.ts · ContactPage.ts
│   │   │   │   │   ├── VideoConsultPage.ts · BlogPage.ts · BlogPostTemplate.ts
│   │   │   │   │   └── NotFoundPage.ts
│   │   │   │   ├── home/             ← 10 Home section globals
│   │   │   │   ├── treatments/       ← Treatments + Pricing section globals
│   │   │   │   ├── pricing/          ← Pricing globals (group: Treatments after changes08-A)
│   │   │   │   ├── doctors/          ← Surgeons section globals
│   │   │   │   ├── results/          ← Results section globals
│   │   │   │   └── (ConsultationPolicy, FormDefaults, EmailTemplates at root)
│   │   │   ├── blocks/              ← reusable content blocks for Pages
│   │   │   │   ├── ChapterOpener.ts
│   │   │   │   ├── RichText.ts
│   │   │   │   ├── ImageGrid.ts
│   │   │   │   ├── CTABand.ts
│   │   │   │   ├── Stats.ts
│   │   │   │   ├── FAQAccordion.ts
│   │   │   │   ├── ProcedureList.ts
│   │   │   │   ├── SurgeonList.ts
│   │   │   │   ├── BAGrid.ts
│   │   │   │   ├── TestimonialList.ts
│   │   │   │   ├── RecoveryStayList.ts
│   │   │   │   ├── PressMentionList.ts
│   │   │   │   ├── ContactForm.ts
│   │   │   │   ├── JourneyStepList.ts
│   │   │   │   └── ExternalEmbed.ts
│   │   │   ├── components/          ← admin UI overrides (Cosmedic CMS branding)
│   │   │   │   ├── CosmedicBeforeLogin.tsx
│   │   │   │   ├── CosmedicLogo.tsx       ← no-op (suppress Payload default)
│   │   │   │   └── CosmedicIcon.tsx
│   │   │   ├── styles/
│   │   │   │   └── admin-theme.css  ← brand-palette overrides for Payload admin
│   │   │   ├── access/              ← role-based access control
│   │   │   ├── hooks/               ← e.g. enquiry email, revalidate web cache
│   │   │   ├── seed/                ← scripts to seed from content + pricelist.xlsx
│   │   │   │   ├── index.ts         ← orchestrator
│   │   │   │   ├── runtime.ts       ← main runtime seed
│   │   │   │   ├── parse-pricelist.ts ← parses pricelist.xlsx all 7 sheets
│   │   │   │   └── admin.ts         ← bootstrap super_admin user from env
│   │   │   └── payload-types.ts     ← auto-generated by `pnpm generate:types`
│   │   └── public/                  ← served by Payload from /
│   │       ├── cosmedic-mark-on-light.png
│   │       ├── cosmedic-mark-on-dark.png
│   │       ├── cosmedic-mark-icon.png
│   │       ├── cosmedic-favicon.png
│   │       └── media/               ← runtime Payload uploads (gitignored)
│   │
│   └── web/                         ← Vite SSR React app (port 3007)
│       ├── package.json             ← name: @cosmedic/web
│       ├── vite.config.ts           ← SSR plugin, alias to @cosmedic/cms types
│       ├── tsconfig.json
│       ├── tailwind.config.ts       ← theme from design tokens
│       ├── postcss.config.cjs
│       ├── src/
│       │   ├── entry-server.tsx
│       │   ├── entry-client.tsx
│       │   ├── App.tsx
│       │   ├── routes/              ← file-based — see sitemap.md
│       │   │   ├── index.tsx                       (homepage)
│       │   │   ├── treatments/
│       │   │   │   ├── index.tsx                   (treatments index)
│       │   │   │   ├── [discipline]/
│       │   │   │   │   ├── index.tsx               (discipline detail × 6)
│       │   │   │   │   └── [subcategory]/
│       │   │   │   │       ├── index.tsx           (sub-category detail × 18)
│       │   │   │   │       └── [procedure].tsx     (procedure detail × 41+)
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
│       │   │   ├── funnel-assessment.tsx
│       │   │   ├── blog/
│       │   │   │   ├── index.tsx
│       │   │   │   └── [slug].tsx
│       │   │   ├── privacy.tsx
│       │   │   ├── api/
│       │   │   │   ├── enquiry.ts
│       │   │   │   ├── page-data.ts
│       │   │   │   ├── preview.ts
│       │   │   │   ├── exit-preview.ts
│       │   │   │   └── revalidate.ts
│       │   │   └── [lang]/*         ← localised mirror routes (Phase 9)
│       │   ├── components/
│       │   │   ├── shell/PageShell.tsx
│       │   │   ├── shell/Header.tsx
│       │   │   ├── shell/Footer.tsx
│       │   │   ├── shell/FloatingChrome.tsx
│       │   │   ├── shell/LocaleSwitcher.tsx
│       │   │   ├── primitives/Btn.tsx
│       │   │   ├── primitives/Mono.tsx
│       │   │   ├── primitives/Eyebrow.tsx
│       │   │   ├── primitives/Img.tsx
│       │   │   ├── primitives/Reveal.tsx
│       │   │   ├── primitives/PriceTag.tsx
│       │   │   ├── primitives/ChapterOpener.tsx
│       │   │   ├── primitives/TrustBar.tsx
│       │   │   ├── primitives/CTABandSlim.tsx
│       │   │   └── blocks/          ← composable richtext blocks (renderer for CMS blocks)
│       │   ├── lib/
│       │   │   ├── payload-client.ts
│       │   │   ├── pricing.ts
│       │   │   ├── i18n.ts
│       │   │   ├── reveal.ts
│       │   │   └── seo.ts
│       │   ├── styles/
│       │   │   ├── globals.css      ← tokens + base + ported from design global.css
│       │   │   └── fonts.css        ← @font-face if self-hosting
│       │   ├── i18n/
│       │   │   ├── en.json
│       │   │   └── id.json
│       │   └── content/             ← static seed (deleted after Phase 6)
│       └── public/
│           ├── favicon.ico
│           └── robots.txt
│
├── tests/
│   ├── e2e/                         ← Playwright + visual regression
│   │   ├── visual/
│   │   │   ├── baselines/           ← screenshots of design .html files
│   │   │   └── SIGNOFF.md           ← page-by-page Pixel-Fidelity Gate
│   │   └── smoke/
│   └── fixtures/
│
└── scripts/
    ├── seed.ts                      ← runs packages/cms/src/seed/index.ts
    ├── migrate.ts                   ← payload migrations runner
    ├── backup-db.sh                 ← nightly Postgres dump
    └── backup-media.sh              ← rsync of packages/cms/public/media/
```

## Renames from the current (as-imported) state

| Current path | End-state path | Reason |
|---|---|---|
| `uploads/` | `discovery/` (subdivided by type) | Clarifies these are discovery artifacts, not production assets |
| `pages/*.jsx` + loose `.html` / `.jsx` at root | `design/` | Quarantine the Babel-in-browser prototype so it's clearly READ-ONLY reference |
| `assets/surgeons/`, `assets/treatments/`, `assets/results/` | `assets/images/{surgeons,treatments,results}/` | Cleaner hierarchy; makes `assets/logos/` and `assets/images/` siblings |
| `BIMC CosMedic Homepage Wireframes.html`, `design-canvas.jsx`, `wireframes.jsx`, `tweaks-panel.jsx` | `design/` | Same — quarantine non-production design tooling |
| `brand.pdf` | `docs/brand-guidelines.pdf` | Canonical brand source moves into the docs folder |
| `procedure.xlsx` | `docs/pricelist.xlsx` | CMS seed source moves into the docs folder |
| `design_handoff_bimc_cosmedic/` (the original handoff README + design copy) | merged into `design/` | Avoid two copies of design files |

## What is gitignored

See `.gitignore`. Highlights:
- `node_modules/`, build outputs (`dist`, `build`, `.next`, `.vercel`)
- `.env`, `.env.local`, `.env.*.local`
- Payload media uploads (`packages/cms/public/media/`)
- Test artifacts (`/test-results/`, `/playwright-report/`, `/blob-report/`)
- `/database_backup/`, `/.claude/worktrees/`
- `/graphify-out/` (laptop-only)
- OS junk (`.DS_Store`, `Thumbs.db`)
- `tsconfig.tsbuildinfo`

## What is intentionally NOT gitignored (for the snapshot-then-plan first commit)

- `discovery/` — the full uploads/ history including discovery PDFs + screenshots. Preserves provenance of the design + content decisions.
- `design/` — the Babel-in-browser prototype + 75 HTML files. Frozen reference; never edited but always available.
- `assets/images/` — seed imagery.

After the project matures we may move `discovery/` to a separate archive (e.g. Google Drive) and remove from repo. For now, keep.
