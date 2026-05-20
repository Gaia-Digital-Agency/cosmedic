# BIMC CosMedic — File Structure

> The target end-state layout of `/var/www/cosmedic/`. This describes where everything **should** live; the current state may be partially migrated. Tracked in this document so any contributor can read the intent without inferring it from the tree.

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
│   ├── sitemap.md                   ← every route, mega-menu, CTA inventory
│   ├── cms_info.md                  ← CosMedic Site CMS white-label spec
│   ├── editor_cheatsheet.md         ← how clinic staff use CosMedic Site CMS (Phase 14)
│   ├── runbook.md                   ← ops playbook (Phase 14)
│   ├── brand-guidelines.pdf         ← BIMC CosMedic Brand Guidelines v1.0 (canonical brand source)
│   └── pricelist.xlsx               ← clinic's canonical price + procedure catalogue (CMS seed source)
│
├── assets/                          ← seed imagery + brand assets (source-of-truth before Payload upload)
│   ├── logos/
│   │   ├── cosmedic-mark-on-light.png ← BIMC lockup, ink on light-beige (admin + site)
│   │   ├── cosmedic-mark-on-dark.png  ← BIMC lockup, inverse (dark footer + admin dark mode)
│   │   ├── cosmedic-mark-icon.png     ← 32×32 square mark (favicon + collapsed nav)
│   │   └── cosmedic-favicon.png       ← favicon variant
│   └── images/
│       ├── surgeons/                ← 8 surgeon portraits, 500×500, self-hosted
│       ├── treatments/              ← 6 discipline hero images + sub-category imagery
│       ├── results/                 ← 29 B&A composite images
│       └── lifestyle/               ← hero, recovery villa, place imagery (licensed/AI)
│
├── design_reference/                ← original Claude Design source (READ-ONLY reference)
│   ├── index.html                   ← homepage + the other root .html page shells (Babel-in-browser)
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
│   - Root files (`design_reference/*.html`): newer nested model — `treatment-{discipline}-{sub}.html`
│   - `_original-handoff/design/*.html`: older flat model — `procedure-{slug}.html` (41 files)
│   Both inform Phase 4 (detail templates).
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
│   │   │   ├── collections/         ← see db_schema.md
│   │   │   │   ├── Surgeons.ts
│   │   │   │   ├── Disciplines.ts
│   │   │   │   ├── SubCategories.ts
│   │   │   │   ├── Procedures.ts
│   │   │   │   ├── PriceListItems.ts
│   │   │   │   ├── InjectableProducts.ts
│   │   │   │   ├── MachineTreatments.ts
│   │   │   │   ├── HairRemovalAreas.ts
│   │   │   │   ├── BeforeAfterCases.ts
│   │   │   │   ├── Stories.ts
│   │   │   │   ├── PressMentions.ts
│   │   │   │   ├── Awards.ts
│   │   │   │   ├── RecoveryStays.ts
│   │   │   │   ├── PricingTiers.ts
│   │   │   │   ├── BlogPosts.ts
│   │   │   │   ├── BlogTags.ts
│   │   │   │   ├── Authors.ts
│   │   │   │   ├── Pages.ts
│   │   │   │   ├── JourneySteps.ts
│   │   │   │   ├── InclusionItems.ts
│   │   │   │   ├── ExclusionItems.ts
│   │   │   │   ├── Enquiries.ts
│   │   │   │   ├── NewsletterSubscribers.ts
│   │   │   │   ├── Redirects.ts
│   │   │   │   ├── Media.ts
│   │   │   │   └── Users.ts
│   │   │   ├── globals/
│   │   │   │   ├── Settings.ts      ← AUD↔IDR, contact info, social, etc.
│   │   │   │   ├── Header.ts        ← nav structure + mega-menus
│   │   │   │   ├── Footer.ts        ← link columns + social + address
│   │   │   │   ├── FloatingChrome.ts ← CTA pill + chat config
│   │   │   │   ├── BrandStats.ts    ← 28 years / 8 surgeons / etc.
│   │   │   │   ├── EndorsementMark.ts ← "Managed by BIMC Hospital"
│   │   │   │   ├── ConsultationPolicy.ts ← fee + waiver
│   │   │   │   ├── FormDefaults.ts  ← labels + placeholders + messages
│   │   │   │   ├── EmailTemplates.ts
│   │   │   │   └── SeoDefaults.ts
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
│   │   │   ├── components/          ← admin UI overrides (CosMedic Site CMS branding)
│   │   │   │   ├── CosmedicBeforeLogin.tsx
│   │   │   │   ├── CosmedicLogo.tsx       ← no-op (suppress Payload default)
│   │   │   │   └── CosmedicIcon.tsx
│   │   │   ├── styles/
│   │   │   │   └── admin-theme.css  ← brand-palette overrides for Payload admin
│   │   │   ├── access/              ← role-based access control
│   │   │   ├── hooks/               ← e.g. enquiry email, revalidate web cache
│   │   │   ├── seed/                ← scripts to seed from shared.jsx + pricelist.xlsx
│   │   │   │   ├── index.ts         ← orchestrator
│   │   │   │   ├── media.ts
│   │   │   │   ├── surgeons.ts
│   │   │   │   ├── disciplines.ts
│   │   │   │   ├── subcategories.ts
│   │   │   │   ├── procedures.ts
│   │   │   │   ├── priceList.ts     ← parses pricelist.xlsx all sheets
│   │   │   │   ├── injectableProducts.ts
│   │   │   │   ├── machineTreatments.ts
│   │   │   │   ├── hairRemoval.ts
│   │   │   │   ├── further-information.ts
│   │   │   │   ├── pages.ts
│   │   │   │   ├── beforeAfter.ts
│   │   │   │   ├── stories.ts
│   │   │   │   ├── pressMentions.ts
│   │   │   │   ├── awards.ts
│   │   │   │   ├── recoveryStays.ts
│   │   │   │   ├── pricingTiers.ts
│   │   │   │   ├── journeySteps.ts
│   │   │   │   ├── brand-stats.ts
│   │   │   │   ├── endorsement-mark.ts
│   │   │   │   ├── seo-defaults.ts
│   │   │   │   ├── settings.ts
│   │   │   │   ├── consultation-policy.ts
│   │   │   │   ├── form-defaults.ts
│   │   │   │   ├── email-templates.ts
│   │   │   │   └── admin.ts          ← bootstrap super_admin user from env
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
| `pages/*.jsx` + loose `.html` / `.jsx` at root | `design_reference/` | Quarantine the Babel-in-browser prototype so it's clearly READ-ONLY reference |
| `assets/surgeons/`, `assets/treatments/`, `assets/results/` | `assets/images/{surgeons,treatments,results}/` | Cleaner hierarchy; makes `assets/logos/` and `assets/images/` siblings |
| `BIMC CosMedic Homepage Wireframes.html`, `design-canvas.jsx`, `wireframes.jsx`, `tweaks-panel.jsx` | `design_reference/` | Same — quarantine non-production design tooling |
| `brand.pdf` | `docs/brand-guidelines.pdf` | Canonical brand source moves into the docs folder |
| `procedure.xlsx` | `docs/pricelist.xlsx` | CMS seed source moves into the docs folder |
| `design_handoff_bimc_cosmedic/` (the original handoff README + design copy) | merged into `design_reference/` | Avoid two copies of design files |

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
- `design_reference/` — the Babel-in-browser prototype + 75 HTML files. Frozen reference; never edited but always available.
- `assets/images/` — seed imagery.

After the project matures we may move `discovery/` to a separate archive (e.g. Google Drive) and remove from repo. For now, keep.
