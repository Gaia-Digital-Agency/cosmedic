# Hand-made code inventory (2026-05-23)

Excludes: payload-types.ts, drizzle migrations, node_modules, markdown, prisma, pnpm-lock.yaml, dist/, .next/, design/, Claude tooling configs, `package.json`/`tsconfig.json`, Payload's generated `importMap.js`.

Sorted by line count descending. Files >500 lines flagged for refactor (see [docs/changerequest_21May.md](changerequest_21May.md) refactor track).

## Top tier (>500 lines — refactor candidates)

| File | Path | Lines |
|---|---|---:|
| globals.css | `packages/web/src/styles/globals.css` | **3,892** |
| runtime.ts (seed) | `packages/cms/src/seed/runtime.ts` | **657** (refactor in progress) |
| VideoConsultPage.tsx | `packages/web/src/routes/video-consult/VideoConsultPage.tsx` | **525** |

## Heavy (300–500 lines)

| File | Path | Lines |
|---|---|---:|
| ClinicCatalogueTable.tsx | `packages/web/src/routes/pricing/ClinicCatalogueTable.tsx` | 482 |
| PageBlocks.tsx | `packages/web/src/components/PageBlocks.tsx` | 455 |
| ContactPage.tsx | `packages/web/src/routes/contact/ContactPage.tsx` | 420 |
| cms-adapters.ts | `packages/web/src/lib/cms-adapters.ts` | 415 |
| cms.types.ts | `packages/web/src/lib/cms.types.ts` | 412 |
| Header.tsx | `packages/web/src/components/shell/Header.tsx` | 394 |
| PricingPage.tsx | `packages/web/src/routes/pricing/PricingPage.tsx` | 385 |
| DisciplineDetail.tsx | `packages/web/src/routes/detail/DisciplineDetail.tsx` | 301 |

## Medium (200–299 lines)

| File | Path | Lines |
|---|---|---:|
| SurgeonDetail.tsx | `packages/web/src/routes/detail/SurgeonDetail.tsx` | 287 |
| parse-pricelist.ts | `packages/cms/src/seed/parse-pricelist.ts` | 285 |
| ResultsPage.tsx | `packages/web/src/routes/results/ResultsPage.tsx` | 276 |
| TreatmentRow.tsx | `packages/web/src/components/detail/TreatmentRow.tsx` | 252 |
| _pageFields.ts | `packages/cms/src/globals/pages/_pageFields.ts` | 252 |
| BlogPost.tsx | `packages/web/src/routes/blog/BlogPost.tsx` | 242 |
| media.ts (seed) | `packages/cms/src/seed/media.ts` | 234 |
| server.ts | `packages/web/src/server.ts` | 233 |
| RecoveryStaysPage.tsx | `packages/web/src/routes/recovery-stays/RecoveryStaysPage.tsx` | 231 |
| seed.ts (content) | `packages/web/src/content/seed.ts` | 228 |
| PrivacyPage.tsx | `packages/web/src/routes/privacy/PrivacyPage.tsx` | 226 |
| blog-data.ts | `packages/web/src/content/blog-data.ts` | 224 |
| seo.ts | `packages/web/src/lib/seo.ts` | 222 |
| Hero.tsx | `packages/web/src/routes/home/Hero.tsx` | 217 |
| PressPage.tsx | `packages/web/src/routes/press/PressPage.tsx` | 204 |
| SubCategoryDetail.tsx | `packages/web/src/routes/detail/SubCategoryDetail.tsx` | 200 |

## Modest (100–199 lines)

| File | Path | Lines |
|---|---|---:|
| SurgeonsIndex.tsx | `packages/web/src/routes/surgeons/SurgeonsIndex.tsx` | 176 |
| seed-globals.ts | `packages/cms/src/seed/seed-globals.ts` | 176 |
| HomePage.ts | `packages/cms/src/globals/pages/HomePage.ts` | 174 |
| JourneyPage.tsx | `packages/web/src/routes/journey/JourneyPage.tsx` | 170 |
| payload.config.ts | `packages/cms/src/payload.config.ts` | 169 |
| migrate-pricing-to-procedures.ts | `packages/cms/src/seed/migrate-pricing-to-procedures.ts` | 166 |
| BlogIndex.tsx | `packages/web/src/routes/blog/BlogIndex.tsx` | 165 |
| styles.css (cms frontend) | `packages/cms/src/app/(frontend)/styles.css` | 164 |
| Procedures.ts (collection) | `packages/cms/src/collections/Procedures.ts` | 161 |
| ProcedureFactsPanel.tsx | `packages/web/src/components/detail/ProcedureFactsPanel.tsx` | 157 |
| admin-theme.css | `packages/cms/src/styles/admin-theme.css` | 150 |
| cms.pages.types.ts | `packages/web/src/lib/cms.pages.types.ts` | 145 |
| cms.cache.ts | `packages/web/src/lib/cms.cache.ts` | 144 |
| Footer.tsx | `packages/web/src/components/shell/Footer.tsx` | 139 |
| Surgeons.tsx (home) | `packages/web/src/routes/home/Surgeons.tsx` | 132 |
| GalleryPage.tsx | `packages/web/src/routes/gallery/GalleryPage.tsx` | 131 |
| StoriesPage.tsx | `packages/web/src/routes/stories/StoriesPage.tsx` | 130 |
| CosmedicBeforeLogin.tsx | `packages/cms/src/components/CosmedicBeforeLogin.tsx` | 129 |
| Stories.tsx (home) | `packages/web/src/routes/home/Stories.tsx` | 111 |
| Gallery.tsx (home) | `packages/web/src/routes/home/Gallery.tsx` | 107 |
| enquiry-emails.ts | `packages/cms/src/lib/enquiry-emails.ts` | 103 |
| seed-new-page-globals.ts | `packages/cms/src/seed/seed-new-page-globals.ts` | 100 |

## Small (50–99 lines)

| File | Path | Lines |
|---|---|---:|
| Img.tsx | `packages/web/src/components/primitives/Img.tsx` | 97 |
| cms.media.ts | `packages/web/src/lib/cms.media.ts` | 96 |
| PricingTeaser.tsx | `packages/web/src/routes/home/PricingTeaser.tsx` | 91 |
| FloatingChrome.tsx | `packages/web/src/components/shell/FloatingChrome.tsx` | 87 |
| Surgeons.ts (collection) | `packages/cms/src/collections/Surgeons.ts` | 87 |
| LeadMagnet.tsx | `packages/web/src/routes/home/LeadMagnet.tsx` | 86 |
| router.ts | `packages/web/src/router.ts` | 86 |
| revalidate.ts | `packages/cms/src/lib/revalidate.ts` | 84 |
| lexical.ts (seed) | `packages/cms/src/seed/lexical.ts` | 81 |
| Media.ts (collection) | `packages/cms/src/collections/Media.ts` | 81 |
| Enquiries.ts | `packages/cms/src/collections/Enquiries.ts` | 80 |
| TreatmentsIndex.tsx | `packages/web/src/routes/treatments/TreatmentsIndex.tsx` | 79 |
| App.tsx | `packages/web/src/App.tsx` | 79 |
| cms-proxy.ts | `packages/web/src/lib/cms-proxy.ts` | 78 |
| SubCategories.ts | `packages/cms/src/collections/SubCategories.ts` | 78 |
| Place.tsx (home) | `packages/web/src/routes/home/Place.tsx` | 77 |
| Settings.ts (global) | `packages/cms/src/globals/Settings.ts` | 77 |
| CmsSidebarExplainer.tsx | `packages/cms/src/components/CmsSidebarExplainer.tsx` | 77 |
| PricingPage.ts (global) | `packages/cms/src/globals/pages/PricingPage.ts` | 76 |
| Treatments.tsx (home) | `packages/web/src/routes/home/Treatments.tsx` | 71 |
| BackToTop.tsx | `packages/web/src/components/primitives/BackToTop.tsx` | 71 |
| Disciplines.ts | `packages/cms/src/collections/Disciplines.ts` | 71 |
| PriceTag.tsx | `packages/web/src/components/primitives/PriceTag.tsx` | 67 |
| i18n/index.ts | `packages/web/src/i18n/index.ts` | 66 |
| TrustBar.tsx | `packages/web/src/components/primitives/TrustBar.tsx` | 66 |
| cms.fetch.ts | `packages/web/src/lib/cms.fetch.ts` | 65 |
| postgres-backup.sh | `ops/postgres-backup.sh` | 65 |
| Header.ts (global) | `packages/cms/src/globals/Header.ts` | 62 |
| Journey.tsx (home) | `packages/web/src/routes/home/Journey.tsx` | 60 |
| Reveal.tsx | `packages/web/src/components/primitives/Reveal.tsx` | 58 |
| smoke.sh | `ops/smoke.sh` | 57 |
| ChapterOpener.tsx | `packages/web/src/components/primitives/ChapterOpener.tsx` | 56 |
| FormDefaults.ts | `packages/cms/src/globals/FormDefaults.ts` | 54 |
| email-adapter.ts | `packages/cms/src/lib/email-adapter.ts` | 52 |
| ApiWarningBanner.tsx | `packages/cms/src/components/ApiWarningBanner.tsx` | 52 |
| CTABandSlim.tsx | `packages/web/src/components/primitives/CTABandSlim.tsx` | 49 |
| Intro.tsx (home) | `packages/web/src/routes/home/Intro.tsx` | 47 |
| seed-helpers.ts | `packages/cms/src/seed/seed-helpers.ts` | 47 |
| FloatingChrome.ts (global) | `packages/cms/src/globals/FloatingChrome.ts` | 46 |
| CosmedicUserAvatar.tsx | `packages/cms/src/components/CosmedicUserAvatar.tsx` | 45 |
| RecoveryStays.ts | `packages/cms/src/collections/RecoveryStays.ts` | 45 |
| JourneySteps.ts | `packages/cms/src/collections/JourneySteps.ts` | 44 |
| Btn.tsx | `packages/web/src/components/primitives/Btn.tsx` | 43 |

## Per-package totals (hand-made code only)

| Package | Approx hand-made LOC |
|---|---:|
| `packages/web/src/` | ~13,500 |
| `packages/cms/src/` | ~3,400 |
| `ops/` | ~120 |

Generated/lockfile content not counted here.

## Senior dev build estimate (backend + CMS only, UI design excluded)

**~8–12 weeks (2–3 months) for one senior dev** who already knows Payload + Vite SSR. Add 30–50% if learning Payload on the job.

Breakdown:

| Workstream | Senior dev time |
|---|---:|
| Payload schema design + Postgres adapter + migrations (23 collections + 24 globals incl. 14 page-globals) | 3–4 weeks |
| SSR data layer + 60s cache + adapter shims + `__COSMEDIC_CMS__` hydration | 2 weeks |
| Seed system + xlsx pricelist parser + idempotency across re-runs (149 price items, 233 procedures, 8 surgeons, etc.) | 1–2 weeks |
| Enquiry pipeline (Zod + IP rate-limit + email autoresponder + clinic-notify) | 1 week |
| nginx + pm2 + multisite ops + SSL + revalidate hook plumbing | 1 week |
| Phase-8 production cutover + Phase-9 catalogue unification (machine/injection/btl → Procedures) | 1–2 weeks |
| Testing, regression sweeps, post-launch polish | 1–2 weeks |

Adds 4+ weeks if porting the UI from the design source as well — but you said exclude UI, so above is purely backend + CMS work.

What inflates the estimate beyond a stock CMS-driven marketing site:
- Multisite-safe production constraints (no pm2 restart all, nginx -t before reload, sibling cert isolation)
- Two-package monorepo with seed code reaching across package boundaries
- xlsx-as-source-of-truth for pricing — non-trivial parser
- 14-global page model (replaced an originally-planned Pages collection mid-build)
- Phase-9 schema unification migrating 3 dead collections into Procedures while preserving live pricing
