# Cosmedic CMS — 8 Main Buckets: Globals & Fields

> **Globals only.** Collections documented separately in `changes5-collections.md`.
> Rearrangement guidelines from `changes5-collections.md §Rearrangement Guidelines` applied: D1–D9.
> D10 applied to Treatments and Pricing **except** Pricing Overview (headingPart1/headingPart2 → heading per D1 — same split pattern as all other views).
> Generated 2026-05-27.

---

## Shared Page Blocks

Shown first. Available in every page global `sections` field (15 block types). Always the same set, always the same field order.

| Block | Fields |
|---|---|
| richText | eyebrow, heading, body |
| imageGrid | heading, columns, images[src, alt, caption] |
| ctaBand | heading, lede, primaryLabel, primaryHref, secondaryLabel, secondaryHref |
| stats | heading, items[number, label, sourceNote] |
| faqAccordion | heading, items[q, a] |
| procedureList | heading, filterDiscipline, filterSubCategory, layout, limit |
| surgeonList | heading, filterGroup, layout |
| baGrid | heading, filterProcedure, limit, featuredOnly |
| testimonialList | heading, count, featuredOnly |
| recoveryStayList | heading, limit |
| pressMentionList | heading, limit |
| contactForm | heading, lede, sourceCta |
| journeyStepList | heading, filterCategory |
| externalEmbed | heading, iframeUrl, html |
| notes | kind, heading, body |

---

## Globals Table

**Page global base (always first):** `slug, route, title, sections, publishStatus, seo`
**Hero standard order (D3):** `breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter`

| Bucket | Item | Fields |
|---|---|---|
| **Homepage** | Main | slug, route, title, sections, publishStatus, seo |
| **Homepage** | Hero | breadcrumbLabel, eyebrow, title, lede, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref, quickEnquiry, heroImage |
| **Homepage** | Intro | eyebrow, pullQuoteBefore, pullQuoteAccent, pullQuoteAfter, col1, col2 |
| **Homepage** | Treatments View | lede, eyebrow, heading |
| **Homepage** | Surgeons View | eyebrow, leadSurgeonEyebrow, leadBody, leadStat1Label, leadStat1Value, leadStat2Label, leadStat2Value, leadStat3Label, leadStat3Value, leadCtaLabel, associatesEyebrow, teamCaption, groupPhoto, groupPhotoAlt |
| **Homepage** | Gallery View | lede, eyebrow, heading, ctaLabel, ctaHref |
| **Homepage** | Stories View | lede, eyebrow, heading, ctaLabel, ctaHref |
| **Homepage** | Pricing View | lede, eyebrow, heading, footnote, viewAllLabel, viewAllHref |
| **Homepage** | Journey View | eyebrow, heading, ctaLabel, ctaHref |
| **Homepage** | Lead Magnet | coverEyebrow, coverLine1, coverLine2, coverLine3, coverFoot1, coverFoot2, bodyEyebrow, heading, lede, formPlaceholder, submitLabel, successHeading, successBody, fineprint |
| **Homepage** | Place | eyebrow, heading, body, rows, ctaLabel, ctaHref, image |
| **Homepage** | Settings | siteName, siteTagline, audToIdrRate, roundIdrTo, contactEmail, clinicEnquiryEmail, pressEmail, contactPhone, whatsappNumber, addressLine1, addressLine2, city, postalCode, country, hoursMonFri, hoursSatSun, googleMapsUrl, socialLinks, defaultLocale, defaultOgImage, defaultMetaDescription |
| **Homepage** | Header | navItems, localeSwitcher, logoLight, logoDark |
| **Homepage** | Footer | brandTagline, treatmentsHeading, linkColumns, newsletter, footerBottomLines, enquirySummary, addressBlock, copyrightTemplate, logoLight |
| **Homepage** | Floating CTA | ctaPill, chat |
| **Homepage** | Trust Strip | stats |
| **Homepage** | Endorsement | endorsementLine, clearspaceUnit, minScreenWidthPx, minPrintMmWidth, primaryLockup, inverseLockup |
| **Homepage** | SEO Defaults | titlePattern, robotsTxt, sitemapBaseUrl, organizationSchema |
| **Treatments** | Main | slug, route, title, chapterTitleA, chapterTitleB, tagline, lede, heroImage, sections, publishStatus, seo |
| **Treatments** | Hero | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **Treatments** | Index | eyebrow, heading, lede, readMoreLabel, readMoreArrow |
| **Treatments** | Stats | stats |
| **Treatments** | Discipline Template | toc, overview, chooseAFocus, procedures, faqs, related |
| **Treatments** | Sub-Category Template | chapterSeparator, toc, takeAStep, overview, treatments, faqs |
| **Doctors** | Main | slug, route, title, sections, publishStatus, seo |
| **Doctors** | Hero | breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter |
| **Doctors** | Lead View | sectionEyebrow, blockEyebrow, statLabelTrained, statLabelSpecialty, statLabelDistinction, ctaLabel |
| **Doctors** | Plastic Surgery View | lede, eyebrow, heading, headingItalic |
| **Doctors** | Aesthetic Medicine View | lede, eyebrow, heading, headingItalic |
| **Doctors** | Detail Template | breadcrumbHomeLabel, breadcrumbSurgeonsLabel, heroLeadLabel, heroSpecialistLabel, heroCtaConsultLabel, heroCtaTreatmentsLabelTemplate, heroCtaTreatmentsLabelFallback, statLabelYears, statLabelDistinction, statLabelSpecialty, sidebarLabelSpecialism, sidebarLabelCredentials, sidebarLabelLanguages, sidebarLabelAvailability, languagesFallback, availabilityFallback, facultyEyebrow, facultyHeading, specialtyEyebrow, specialtyHeadingTemplate, trainingEyebrow, trainingRowLabels, trainingRowRights, trainingRowPracticeMid, biographyEyebrow, secondaryBioParagraph |
| **Results** | Main | slug, route, title, sections, publishStatus, seo |
| **Results** | Hero | breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter |
| **Results** | Library CTA | eyebrow, headingPre, headingItalic, body, buttonLabel, buttonHref |
| **Results** | Share CTA | eyebrow, headingPre, headingItalic, headingPost, body, buttonLabel, buttonHref |
| **Results** | Gallery | slug, route, title, sections, publishStatus, seo, breadcrumbLabel, filterBarLabel, countFormat, imageLabel, imageHue |
| **Results** | Stories | slug, route, title, sections, publishStatus, seo, breadcrumbLabel, imageLabel, imageHue |
| **Results** | Featured Cases View | eyebrow, headingPre, headingItalic, lede, filterBarLabel, countFormat |
| **Results** | Stories View | eyebrow, headingPre, headingItalic, lede |
| **Pricing** | Main | slug, route, title, sections, publishStatus, seo |
| **Pricing** | Hero | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **Pricing** | Overview | eyebrow, heading, body |
| **Pricing** | Footnote | text |
| **Pricing** | Insurance | eyebrow, headingRoman, headingItalic, body |
| **Pricing** | Payment | eyebrow, headingRoman, headingItalic, termsText |
| **Pricing** | Catalogue View | sectionEyebrow, headingRoman, headingItalic, introTemplate, sheetLabels, hairZoneLabels, injectableCategoryLabels |
| **Pricing** | Discipline List View | sectionEyebrow, onRequestLabel, includedLabel, arrowChar |
| **Pricing** | Consultation | feeIdr, waiverConditionText, displayOn |
| **Journey** | Main | slug, route, title, sections, publishStatus, seo |
| **Journey** | Hero | breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter |
| **Journey** | Stats | stats |
| **Journey** | Recovery Stays | slug, route, title, sections, publishStatus, seo, hero, topStats, portfolioSection, inclusionsSection, inclusions |
| **Contact** | Main | slug, route, title, sections, publishStatus, seo |
| **Contact** | Hero | breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter |
| **Contact** | Enquiry Section | eyebrow, headingPre, headingItalic, intro, trustLine, directLines, intentCopy, formLabels, submitLabels |
| **Contact** | Visit Section | eyebrow, headingPre, headingItalic, body, openInMapsLabel, getDirectionsLabel, clinicHoursLabel, conciergeHoursLabel, conciergeHoursValue, mapImage, mapImageLabel, mapImageHue |
| **Contact** | Form | labels, placeholders, submitLabel, successMessage, errorMessage, rateLimitMessage |
| **Contact** | Email | templates |
| **Contact** | Video Consult | slug, route, title, sections, publishStatus, seo |
| **About** | Blog | slug, route, title, sections, publishStatus, seo, thisIssueEyebrow, readTheEssayCtaLabel, archiveSection |
| **About** | Press | slug, route, title, sections, publishStatus, seo, accreditationsSection, pressSection, pressEnquiriesCtaLabel |
| **About** | Privacy | slug, route, title, sections, publishStatus, seo, lastUpdatedDate, versionLine, readingTimeLine, introParagraph, imageLabel, tocHeading, dpo |
| **About** | Blog Post Template | byline, aboutTheAuthor, moreFromTheJournal |
| **About** | Not Found | eyebrow, headingA, headingB, lede, primaryBtnLabel, primaryBtnHref, secondaryBtnLabel, secondaryBtnHref |

---

## Counts

| Bucket | Globals | of which Page Globals |
|---|---|---|
| Homepage | 18 | 1 — Main |
| Treatments | 6 | 1 — Main |
| Doctors | 6 | 1 — Main |
| Results | 8 | 3 — Main · Gallery · Stories |
| Pricing | 9 | 1 — Main |
| Journey | 4 | 2 — Main · Recovery Stays |
| Contact | 7 | 2 — Main · Video Consult |
| About | 5 | 3 — Blog · Press · Privacy |
| **Total** | **63** | **14** |

---

## Rearrangement Applied

### D1 — Merged split headings/titles

| Item | Before | After |
|---|---|---|
| Homepage Hero | titleA, titleB | title |
| Homepage Treatments View | headingPart1, headingPart2 | heading |
| Homepage Gallery View | headingItalic, headingPart2 | heading |
| Homepage Stories View | headingItalic, headingPart2 | heading |
| Homepage Pricing View | headingPart1, headingPart2 | heading |
| Homepage Journey View | headingPart1, headingAccent | heading |
| Homepage Lead Magnet | headingPart1, headingAccent | heading |
| Homepage Place | headingPart1, headingAccent | heading |
| Doctors Hero | titleA, titleB | title |
| Doctors Plastic Surgery View | headingA, headingB | heading |
| Doctors Aesthetic Medicine View | headingA, headingB | heading |
| Results Hero | titleA, titleB | title |
| Journey Hero | titleA, titleB | title |
| Contact Hero | titleA, titleB | title |
| **Pricing Overview** | **headingPart1, headingPart2** | **heading** |

**Exception kept:** `pullQuoteBefore / pullQuoteAccent / pullQuoteAfter` in Homepage Intro — stays split (three semantically distinct parts, not a line-break split).
**D10 exceptions:** Treatments Hero, Pricing Hero — `titleA / titleB` unchanged. Pricing Overview — D1 applied (same split pattern as every other view; D10 defers to D1 for naming consistency).

### D3 — Hero standard field order
`breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter`
Applied to: Doctors Hero, Results Hero, Journey Hero, Contact Hero.
Homepage Hero variant: `breadcrumbLabel, eyebrow, title, lede, [CTAs], quickEnquiry, heroImage`.
D10 exception: Treatments Hero and Pricing Hero — original order kept.

### D4 — Content reading order
eyebrow → heading → lede → body → CTAs → supporting fields.
Applied throughout all section globals.

### D5 — Group related fields together
Doctors Lead View: stat labels kept together (`statLabelTrained, statLabelSpecialty, statLabelDistinction`).

### D6 — Detail Template group order
Doctors Detail Template: breadcrumbs → hero labels → stat labels → sidebar labels → fallbacks → faculty → specialty → training → biography.

### D7 — Image fields second-last, site config singles last

| Item | Field(s) moved to end |
|---|---|
| Homepage Settings | defaultOgImage, defaultMetaDescription |
| Homepage Header | logoLight, logoDark |
| Homepage Footer | logoLight |
| Homepage Endorsement | primaryLockup, inverseLockup |
| Homepage Place | image |

### D8 — lede before eyebrow in section views
Applied to: Homepage Treatments View, Homepage Gallery View, Homepage Stories View, Homepage Pricing View, Doctors Plastic Surgery View, Doctors Aesthetic Medicine View.

### D9 — Remove duplicate hero fields from Main globals
Doctors, Results, Journey, Contact Main globals: hero fields removed — edit in dedicated Hero item.
*(SurgeonsPage + PricingPage already done in code; JourneyPage, ContactPage, ResultsPage pending — tracked in changes5-collections.md Phase 3 TODO.)*

### D10 — Treatments and Pricing fields otherwise unchanged
No other field merges, reorders, or config changes applied to Treatments or Pricing bucket items.
