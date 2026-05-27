# CMS Simplification — Implementation Plan

> Goal: make the Cosmedic CMS usable by a non-technical average admin.
> Source of truth: `docs/cms/cms_map_simple.md` (what stays visible) + `docs/cms/cms_map_all.md` (full field reference).
> Generated 2026-05-27.

---

## Approach

Use **role-based conditional hiding** so a super-admin (role: `admin`) sees every field, while a clinic editor (role: `editor`) sees only the simplified fields from `cms_map_simple.md`.

```ts
// Pattern used throughout — add to any field's admin block:
admin: { hidden: ({ req }) => req.user?.role !== 'admin' }

// Pattern for hiding entire collections / globals from the sidebar:
admin: { hidden: ({ req }) => req.user?.role !== 'admin' }
// (same API, applied at the config root, not inside fields[])
```

This is non-breaking: hidden fields still exist in the DB, are still consumed by the web, and are still writable via seed/API. Only the admin UI surface changes.

---

## Risk Assessment

| Risk | Severity | Notes |
|---|---|---|
| DB schema change | None | `hidden` is a UI flag only — no DDL |
| Frontend change | None | Web reads fields from API, unaffected |
| Seed / migration | None | Seed scripts bypass the admin UI |
| CMS build error | Low | TypeScript compile error if syntax wrong — caught before deploy |
| Admin lockout | None | Role `admin` always sees everything |
| Editor over-hides | Low | Mitigated by reviewing plan against `cms_map_simple.md` before shipping |

---

## Pre-flight

```bash
# Verify CMS is running before starting
pm2 status | grep cosmedic-cms
# Confirm 52 web routes are 200 (baseline)
curl -so /dev/null -w "%{http_code}" https://cosmedic.gaiada.online/ | grep 200
```

---

## Phase S0 — Add `role` field to Users collection

**File:** `packages/cms/src/collections/Users.ts`

Add a `role` select field. Existing users (including the seeded super-admin) must default to `admin` so nothing breaks on first deploy.

```ts
{
  name: 'role',
  type: 'select',
  required: true,
  defaultValue: 'admin',
  options: [
    { label: 'Admin — sees all fields', value: 'admin' },
    { label: 'Editor — sees simplified fields', value: 'editor' },
  ],
  admin: {
    description: 'Controls which CMS fields are visible to this user.',
    position: 'sidebar',
  },
},
```

**After S0:** rebuild + restart CMS. Confirm existing super-admin account now shows role = `admin` in the Users form.

**No migration needed** — Payload adds the column via next push or migration. Default value covers all existing rows.

---

## Phase S1 — Hide 8 entities from the sidebar entirely

Apply `admin: { hidden: ({ req }) => req.user?.role !== 'admin' }` to the **collection/global config object** (not inside `fields[]`) for each entity below.

| TS File | Entity | Reason |
|---|---|---|
| `src/collections/Media.ts` | Media Library | Editors manage images inside each entity |
| `src/globals/SeoDefaults.ts` | SEO Defaults | All technical (robots.txt, schema JSON) |
| `src/globals/EndorsementMark.ts` | Endorsement Mark | Brand governance, not editorial |
| `src/globals/treatments/DisciplineDetailTemplate.ts` | Discipline Detail Template | All UI chrome labels |
| `src/globals/treatments/SubCategoryDetailTemplate.ts` | Sub-Category Detail Template | All UI chrome labels |
| `src/globals/doctors/SurgeonDetailTemplate.ts` | Surgeon Detail Template | All UI chrome labels |
| `src/globals/pages/BlogPostTemplate.ts` | Blog Post Template | All UI chrome labels |
| `src/globals/pricing/PricingDisciplineListView.ts` | Pricing Discipline List | All remaining fields are UI chrome (onRequestLabel, includedLabel, arrowChar) — nothing editorial after sectionEyebrow is hidden |

**Example (Media.ts):**

```ts
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    hidden: ({ req }) => req.user?.role !== 'admin',   // ← add this line
  },
  ...
}
```

---

## Phase S2 — Hide fields in Collections

For each field to hide, merge `admin: { hidden: ({ req }) => req.user?.role !== 'admin' }` into the existing `admin` block (or add one if absent). Never remove a field or change its `name`.

### `PressMentions.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `url`, `sortOrder` | publication, headline, summary, publishedDate, isFeatured, logo |

### `Awards.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `sortOrder` | name, year, issuer, summary, logo |

### `Disciplines.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `displayCount`, `hue`, `chapterTitle`, `leadSurgeons`, `seo`, `sortOrder`, `lede` | title, subtitle, tagline, body, overview, heroImage, faqs |

### `SubCategories.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `parent`, `chapterTitle`, `leadSurgeon`, `sections`, `seo`, `sortOrder`, `lede`, `intro` | title, tagline, overview, heroImage, faqs |

### `Procedures.ts` *(highest field count — most to hide)*
| Hide | Keep visible |
|---|---|
| `slug`, `catalogueGroup`, `mainCategory`, `subCategory`, `unit`, `audienceTier`, `brand`, `productLine`, `manufacturer`, `fdaApproved`, `bodyZone`, `parentDiscipline`, `parentSubCategory`, `sections`, `surgeonsCredentialed`, `pricing.priceIdr2025`, `pricing.priceIdrRangeLow`, `pricing.priceIdrRangeHigh`, `pricing.displayYear`, `featuredRank`, `includesImplant`, `recoveryTimeline`, `relatedBA`, `relatedProcedures`, `seo`, `sortOrder` | name, shortName, description, heroImage, pricing.priceIdr2026, pricing.priceNotes, detail.duration, detail.recovery, detail.included, faqs |

### `Surgeons.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `commonName`, `suffix`, `spec`, `train`, `proc`, `credLine`, `yearsInPractice`, `group`, `lead`, `sortOrder`, `credentialedProcedures`, `availabilitySchedule`, `languages`, `portraitPosition`, `seo`, `hue` | name, designation, bio, portrait, specAreas |

### `BeforeAfterCases.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `procedure`, `surgeon`, `tags`, `seo`, `sortOrder` | caseLabel, composite, beforeAlt, afterAlt, description, year, patientAge, recoveryDuration, isFeatured |

### `Stories.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `procedure`, `hue`, `year`, `surgeon`, `seo`, `sortOrder` | patientLabel, country, procedureLabel, quote, body, portrait, videoUrl, publishStatus |

### `JourneySteps.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `order`, `bullets`, `imageHue`, `icon`, `category`, `sortOrder` | number, title, body, image, dayLabel |

### `RecoveryStays.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `bedrooms`, `poolType`, `imageHue`, `driveTime`, `nursingNote`, `gallery`, `descriptor`, `priceFromAudPerNight`, `geo`, `seo`, `sortOrder` | name, location, body, heroImage, priceFromIdrPerNight, amenities, partnerUrl |

### `Enquiries.ts`
| Hide | Keep visible |
|---|---|
| `submittedAt`, `ip`, `userAgent`, `sourcePage`, `sourceCta`, `treatmentInterest`, `treatmentInterestText`, `preferredDate` | name, email, phone, country, status, assignedTo, message, internalNotes |
> Note: `honeypot` is already `admin: { hidden: true }` — leave it as is.

### `BlogPosts.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `readingTimeMinutes`, `seo`, `sortOrder`, `lede` | title, body, heroImage, author, publishedAt, tags, publishStatus |

### `BlogTags.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `sortOrder` | name, description |

### `Authors.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `surgeonProfile` | name, role, bio, portrait |

### `PrivacySections.ts`
| Hide | Keep visible |
|---|---|
| `slug`, `sortOrder` | title, paragraphs, listItems |

### `Analytics.ts`
| Hide | Keep visible |
|---|---|
| `ip`, `timezone`, `userAgent` | question, askedAt, country, city |

### `Users.ts`
Nothing to hide beyond what S0 adds. `email` (built-in auth field) and `avatar` stay visible.

---

## Phase S3 — Hide fields in Globals

Same rule: merge `admin: { hidden: ({ req }) => req.user?.role !== 'admin' }` into each field's `admin` block.

### Homepage bucket

| Global TS File | Hide | Keep visible |
|---|---|---|
| `pages/HomePage.ts` | slug, route, publishStatus, seo | title, sections |
| `home/HomeHero.ts` | breadcrumbLabel, secondaryCtaHref, quickEnquiry.nameLabel, quickEnquiry.namePlaceholder, quickEnquiry.emailLabel, quickEnquiry.emailPlaceholder, quickEnquiry.interestLabel, quickEnquiry.interestOptionalLabel, quickEnquiry.interestPlaceholder, quickEnquiry.revealInterestLabel, quickEnquiry.submitLabel, quickEnquiry.submittingLabel, quickEnquiry.successLabel, quickEnquiry.successFine, quickEnquiry.errorFine, quickEnquiry.fineprint, eyebrow, lede | title.a, title.b, primaryCtaLabel, secondaryCtaLabel, heroImage |
| `home/HomeIntro.ts` | eyebrow, pullQuoteBefore, pullQuoteAccent, pullQuoteAfter | col1, col2 |
| `home/HomeTreatmentsView.ts` | eyebrow, lede | heading.a, heading.b |
| `home/HomeSurgeonsView.ts` | leadStat1Label, leadStat1Value, leadStat2Label, leadStat2Value, leadStat3Label, leadStat3Value, groupPhotoAlt, eyebrow, leadSurgeonEyebrow, leadBody, associatesEyebrow | leadCtaLabel, teamCaption, groupPhoto |
| `home/HomeGalleryView.ts` | eyebrow, lede | heading.a, heading.b, ctaLabel |
| `home/HomeStoriesView.ts` | eyebrow, lede | heading.a, heading.b, ctaLabel |
| `home/HomePricingView.ts` | viewAllHref, eyebrow, lede, footnote | heading.a, heading.b, viewAllLabel |
| `home/HomeJourneyView.ts` | eyebrow | heading.a, heading.b, ctaLabel |
| `home/HomeLeadMagnet.ts` | coverEyebrow, coverFoot1, coverFoot2, bodyEyebrow, formPlaceholder, submitLabel, fineprint, lede, successHeading, successBody | coverImage, coverLine1, coverLine2, coverLine3, heading.a, heading.b |
| `home/HomePlace.ts` | eyebrow | heading.a, heading.b, body, ctaLabel, image |
| `Settings.ts` | audToIdrRate, roundIdrTo, pressEmail, postalCode, country, googleMapsUrl, socialLinks, defaultLocale, defaultOgImage, defaultMetaDescription | siteName, siteTagline, contactEmail, clinicEnquiryEmail, contactPhone, whatsappNumber, addressLine1, addressLine2, city, hoursMonFri, hoursSatSun |
| `Header.ts` | navItems, localeSwitcher | logoLight, logoDark |
| `Footer.ts` | treatmentsHeading, linkColumns, newsletter, footerBottomLines | brandTagline, enquirySummary, addressBlock, copyrightTemplate, logoLight |
| `FloatingChrome.ts` | ctaPill.enabled, chat.provider, chat.embedScript, chat.openOnLoad, chat.enabled | ctaPill.label, ctaPill.href |
| `BrandStats.ts` | sourceNote (per stat) | number, label |
| `EndorsementMark.ts` | *entire entity — S1* | — |
| `SeoDefaults.ts` | *entire entity — S1* | — |

### Treatments bucket

| Global TS File | Hide | Keep visible |
|---|---|---|
| `pages/TreatmentsPage.ts` | slug, route, chapterTitle, publishStatus, seo, lede | title, tagline, heroImage, sections |
| `treatments/TreatmentsHero.ts` | chapter, imageHue, imageLabel, breadcrumbLabel, lede | titleA, titleB, heroImage |
| `treatments/TreatmentsIndexSection.ts` | readMoreLabel, readMoreArrow, eyebrow, lede | heading |
| `treatments/TreatmentsStats.ts` | — | all fields visible |
| `treatments/DisciplineDetailTemplate.ts` | *entire entity — S1* | — |
| `treatments/SubCategoryDetailTemplate.ts` | *entire entity — S1* | — |
| `pricing/PricingPage.ts` | slug, route, publishStatus, seo | title, sections |
| `pricing/PricingHero.ts` | chapter, imageHue, imageLabel, breadcrumbLabel, lede | titleA, titleB, heroImage |
| `pricing/PricingOverview.ts` | eyebrow | heading.a, heading.b, body |
| `pricing/PricingFootnote.ts` | — | text |
| `pricing/PricingInsurance.ts` | eyebrow | headingRoman, headingItalic, body |
| `pricing/PricingPayment.ts` | eyebrow | headingRoman, headingItalic, termsText |
| `pricing/PricingCatalogueView.ts` | sheetLabels.*, hairZoneLabels.*, injectableCategoryLabels.*, sectionEyebrow, introTemplate | headingRoman, headingItalic |
| `pricing/PricingDisciplineListView.ts` | *entire entity — S1* | — |
| `ConsultationPolicy.ts` | displayOn | feeIdr, waiverConditionText |

### Doctors bucket

| Global TS File | Hide | Keep visible |
|---|---|---|
| `pages/SurgeonsPage.ts` | slug, route, publishStatus, seo | title, sections |
| `doctors/SurgeonsHero.ts` | breadcrumbLabel, imageHue, imageLabel, chapter, lede | title.a, title.b, heroImage |
| `doctors/SurgeonsLeadView.ts` | statLabelTrained, statLabelSpecialty, statLabelDistinction, sectionEyebrow, blockEyebrow | ctaLabel |
| `doctors/SurgeonsPlasticView.ts` | eyebrow, lede | heading.a, heading.b, headingItalic |
| `doctors/SurgeonsAestheticView.ts` | eyebrow, lede | heading.a, heading.b, headingItalic |
| `doctors/SurgeonDetailTemplate.ts` | *entire entity — S1* | — |

### Results bucket

| Global TS File | Hide | Keep visible |
|---|---|---|
| `pages/ResultsPage.ts` | slug, route, publishStatus, seo | title, sections |
| `results/ResultsHero.ts` | breadcrumbLabel, imageHue, imageLabel, chapter, lede | title.a, title.b, heroImage |
| `results/LibraryCta.ts` | eyebrow | headingPre, headingItalic, body, buttonLabel, buttonHref |
| `results/ShareCta.ts` | eyebrow | headingPre, headingItalic, headingPost, body, buttonLabel, buttonHref |
| `pages/GalleryPage.ts` | slug, route, breadcrumbLabel, filterBarLabel, countFormat, imageLabel, imageHue, publishStatus, seo | title, sections |
| `pages/StoriesPage.ts` | slug, route, breadcrumbLabel, imageLabel, imageHue, publishStatus, seo | title, sections |
| `results/ResultsFeaturedCasesView.ts` | filterBarLabel, countFormat, eyebrow, lede | headingPre, headingItalic |
| `results/ResultsStoriesView.ts` | eyebrow, lede | headingPre, headingItalic |

### Journey bucket

| Global TS File | Hide | Keep visible |
|---|---|---|
| `pages/JourneyPage.ts` | slug, route, publishStatus, seo | title, sections |
| `pages/JourneyHero.ts` | breadcrumbLabel, imageHue, imageLabel, chapter, lede | title.a, title.b, heroImage |
| `pages/JourneyStats.ts` | italic (per stat) | number, label |
| `pages/RecoveryStaysPage.ts` | slug, route, publishStatus, seo, hero.chapter, hero.imageHue, hero.imageLabel, hero.breadcrumbLabel, topStats.italic, portfolioSection.headingItalic, portfolioSection.headingPost, inclusionsSection.headingItalic, inclusionsSection.headingPost, hero.lede, portfolioSection.lede, inclusionsSection.lede | hero.title.a, hero.title.b, hero.heroImage, portfolioSection.headingPre, inclusionsSection.headingPre, inclusions.title, inclusions.body |

### Contact bucket

| Global TS File | Hide | Keep visible |
|---|---|---|
| `pages/ContactPage.ts` | slug, route, publishStatus, seo | title, sections |
| `pages/ContactHero.ts` | breadcrumbLabel, imageHue, imageLabel, chapter, lede | title.a, title.b, heroImage |
| `pages/ContactEnquirySection.ts` | directLines.*, intentCopy.slug, formLabels.*, submitLabels.send, submitLabels.sending, submitLabels.sent, eyebrow, intro, trustLine, submitLabels.successMessage | headingPre, headingItalic |
| `pages/ContactVisitSection.ts` | mapImageLabel, mapImageHue, openInMapsLabel, getDirectionsLabel, clinicHoursLabel, conciergeHoursLabel, eyebrow | headingPre, headingItalic, body, mapImage, conciergeHoursValue |
| `FormDefaults.ts` | labels.*, placeholders.*, submitLabel, rateLimitMessage | successMessage, errorMessage |
| `EmailTemplates.ts` | templates.id, templates.locale | templates.subject, templates.bodyMjml |
| `pages/VideoConsultPage.ts` | slug, route, publishStatus, seo | title, sections |

### About bucket

| Global TS File | Hide | Keep visible |
|---|---|---|
| `pages/BlogPage.ts` | slug, route, publishStatus, seo, readTheEssayCtaLabel, archiveSection.filterAllLabel, archiveSection.emptyStateCopy, thisIssueEyebrow, archiveSection.eyebrow, archiveSection.headingItalic, archiveSection.lede | title, sections, archiveSection.headingPre |
| `pages/PressPage.ts` | slug, route, publishStatus, seo, pressEnquiriesCtaLabel | title, sections, accreditationsSection.heading, pressSection.headingPre |
| `pages/PrivacyPage.ts` | slug, route, publishStatus, seo, versionLine, readingTimeLine, imageLabel, tocHeading, dpo.*, introParagraph | title, sections, lastUpdatedDate |
| `pages/BlogPostTemplate.ts` | *entire entity — S1* | — |
| `pages/NotFoundPage.ts` | secondaryBtnLabel, secondaryBtnHref, eyebrow, lede | headingA, headingB, primaryBtnLabel, primaryBtnHref |

---

## Phase S4 — Build, restart, verify

```bash
# 1. Build CMS
pnpm --filter @cosmedic/cms build

# 2. Restart CMS only (never pm2 restart all)
pm2 restart cosmedic-cms

# 3. Confirm CMS starts cleanly
pm2 logs cosmedic-cms --lines 30 --nostream

# 4. Confirm 52 web routes still 200
curl -so /dev/null -w "%{http_code}" https://cosmedic.gaiada.online/
curl -so /dev/null -w "%{http_code}" https://cosmedic.gaiada.online/treatments
curl -so /dev/null -w "%{http_code}" https://cosmedic.gaiada.online/surgeons
curl -so /dev/null -w "%{http_code}" https://cosmedic.gaiada.online/pricing

# 5. Admin visual check
#    Login as admin role → should see ALL fields (no change)
#    Create/login as editor role → should see simplified fields only
```

---

## Execution order (by risk, lowest first)

| Phase | Effort | Risk | Dependency |
|---|---|---|---|
| S0 — User roles | 30 min | Very low | None |
| S1 — Hide 8 entities | 30 min | Very low | S0 |
| S2 — Collection fields | 2–3 hrs | Low | S0 |
| S3 — Global fields | 3–4 hrs | Low | S0, S2 done |
| S4 — Verify | 30 min | None | S3 |

**Total estimated effort: ~7 hours**

Build + restart happens **once** after S3 is complete — not after each phase, to avoid repeated downtime.

---

## Rollback

If the build fails or the admin breaks after deploy:

```bash
git diff --stat                     # see which files changed
git stash                           # stash all changes
pm2 restart cosmedic-cms            # restore working CMS
# Then investigate the build error, fix, and re-apply
```

No DB migration is needed in either direction — `admin.hidden` changes are TypeScript-only.

---

## Open questions (resolve before implementing)

1. **`sections` on Page container globals** — currently plan keeps `sections` visible for all users (editors can add/edit blocks). Confirm this is correct or hide sections for editors and push them to use the section-specific globals instead.
2. **`url` field on Press Mentions** — excluded from editor view; editors cannot add a link to the press article. Confirm this is intentional or add back.
3. **`availabilitySchedule` + `languages` on Surgeons** — excluded; clinic staff managing doctor schedules cannot update these. Confirm intentional.
4. **`bedrooms`, `poolType`, `driveTime`, `nursingNote` on Recovery Stays** — excluded. Confirm the Recovery Stays simplified view covers what villa managers need.
5. **Enquiries `treatmentInterestText` + `preferredDate`** — excluded from editor view of enquiry records. Confirm this is acceptable for front-desk staff.
