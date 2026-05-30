# Cosmedic CMS — Visible Field Map (Admin View)

> **Purpose**: What an editor sees in the CMS sidebar today.
> **Last updated:** 2026-05-30 (full visibility sweep — all Lede/Para/Image/Title/Body/Arrays exposed)
> **State:** ~72 visible items · all editorial fields visible · structural/technical fields still hidden
> Legend: [T] title/heading · [P] paragraph · [I] image · [C] link/button · [N] number · [S] select · [A] array

---

## Naming levels
Bucket > Item > Field > Detail > Data
Rule: Lede, Para, Image, Title, Body, Arrays must always be visible. Slugs, hrefs, hues, breadcrumbs, CTAhref stay hidden.

---

## 1. HOMEPAGE bucket

### Hero (Global — home-hero)
title.a [T], title.b [T], lede [P], primaryCtaLabel [C], secondaryCtaLabel [C], heroImage [I]

### Surgeons View (Global — home-surgeons-view)
teamCaption [T], leadBody [P], leadCtaLabel [C], groupPhoto [I], groupPhotoAlt [T]

### Treatments (Global — home-treatments-view)
heading.a [T], heading.b [T], lede [P]

### Pricing (Global — home-pricing-view)
heading.a [T], heading.b [T], lede [P], footnote [P], viewAllLabel [C]

### Gallery (Global — home-gallery-view)
heading.a [T], heading.b [T], lede [P], ctaLabel [C]

### Lead Magnet (Global — home-lead-magnet)
coverImage [I], coverTitle [P], coverFooter [T], heading.a [T], heading.b [T], lede [P], formPlaceholder [T], submitLabel [C]

### Stories (Global — home-stories-view)
heading.a [T], heading.b [T], lede [P], ctaLabel [C]

### Place (Global — home-place)
heading.a [T], heading.b [T], body [P], ctaLabel [C], image [I], rows [A: letter, text]

### Settings (Global — settings)
siteName [T], audToIdrRate [N], roundIdrTo [N], contactEmail [T], contactPhone [T], whatsappNumber [T], addressLine1 [T], addressLine2 [T], city [T], hoursMonFri [T], hoursSatSun [T], googleMapsUrl [C], socialLinks [A: platform, url]

### Intro (Global — home-intro)
pullQuoteBefore [T], pullQuoteAccent [T], pullQuoteAfter [T], col1 [P], col2 [P]

### Journey View (Global — home-journey-view)
heading.a [T], heading.b [T], ctaLabel [C]

### Header (Global — header)
navItems [A: label, href, megaMenu (heading, items[label, href])], logoLight [I], logoDark [I]

### Footer (Global — footer)
brandTagline [T], treatmentsHeading [T], linkColumns [A: heading, items[label, href]], newsletter.label [T], newsletter.placeholder [T], footerBottomLines [A: text], enquirySummary [P], addressBlock [P], logoLight [I]

### Brand Stats (Global — brand-stats)
stats [A: number, label]

### Endorsement Mark (Global — endorsement-mark)
endorsementLine [T], primaryLockup [I], inverseLockup [I]

### Floating CTA (Global — floating-chrome)
ctaPill.label [T], ctaPill.href [hidden], ctaPill.enabled

### SEO Defaults (Global — seo-defaults)
titlePattern [T], robotsTxt [T], sitemapBaseUrl [T]

### Main (Global — home-page)
title [T], slug [hidden], sections [A: blocks]

---

## 2. PROCEDURES bucket

### Hero (Global — treatments-hero)
titleA [T], titleB [T], lede [P], heroImage [I]

### Pricing Hero (Global — pricing-hero)
titleA [T], titleB [T], lede [P], heroImage [I]

### Index (Global — treatments-index-section)
heading [T], lede [P], readMoreLabel [C]

### Stats (Global — treatments-stats)
stats [A: number, label]

### Discipline Template (Global — discipline-detail-template)
toc.onThisPageLabel [T], toc.overviewLabel [T], toc.subCategoriesLabel [T], toc.proceduresLabel [T], toc.faqsLabel [T], overview.heading [T], chooseAFocus.heading [T], chooseAFocus.bodyTemplate [P], chooseAFocus.availableLabel [C], procedures.heading [T], procedures.intro [P], faqs.heading [T], related.eyebrow [T], related.headingItalic [T], related.headingRoman [T], related.ledeTemplate [P]

### Sub-Category Template (Global — sub-category-detail-template)
toc.onThisPageLabel [T], toc.overviewLabel [T], toc.treatmentsLabel [T], toc.faqsLabel [T], takeAStep.eyebrow [T], takeAStep.videoConsultLabel [C], takeAStep.estimateLabel [C], takeAStep.whatsappLabel [C], takeAStep.replyLine [T], overview.heading [T], treatments.heading [T], treatments.intro [P], faqs.heading [T]

### Overview (Global — pricing-overview)
heading.a [T], heading.b [T], body [P]

### Footnote (Global — pricing-footnote)
text [P]

### Insurance (Global — pricing-insurance)
headingRoman [T], headingItalic [T], body [P]

### Payment (Global — pricing-payment)
headingRoman [T], headingItalic [T], termsText [P]

### Consultation (Global — consultation-policy)
feeIdr [N], waiverConditionText [P]

### Discipline List View (Global — pricing-discipline-list-view)
sectionEyebrow [T], onRequestLabel [T], includedLabel [T]

### Catalogue View (Global — pricing-catalogue-view)
headingRoman [T], headingItalic [T], introTemplate [P], sheetLabels [T×8], hairZoneLabels [T×5], injectableCategoryLabels [T×9]

### Main (Global — treatments-page)
title [T], sections [A: blocks]

### Pricing Main (Global — pricing-page)
title [T], sections [A: blocks]

### Sub Treatments (Collection — disciplines)
title [T], subtitle [T], tagline [T], lede [P], body [P], overview [P], chapterTitle.a [T], chapterTitle.b [T], heroImage [I], faqs [A: q, a]

### Sub-Categories (Collection — sub-categories)
title [T], tagline [T], lede [P], intro [P], overview [P], chapterTitle.a [T], chapterTitle.b [T], sections [A: t, body], faqs [A: q, a], leadSurgeon, heroImage [I]

### (MIB) Machine · Injectable · BTL (Collection — procedures)
name [T], shortName [T], description [P], sections [A: t, body], faqs [A: q, a], pricing.priceIdr2026 [N], pricing.priceNotes [T], detail.duration [T], detail.recovery [T], detail.included [A: value], heroImage [I]

---

## 3. EXPERTS bucket

### Hero (Global — surgeons-hero)
title.a [T], title.b [T], lede [P], heroImage [I]

### Lead View (Global — surgeons-lead-view)
sectionEyebrow [T], blockEyebrow [T], statLabelTrained [T], statLabelSpecialty [T], statLabelDistinction [T], ctaLabel [C]

### Plastic Surgery View (Global — surgeons-plastic-view)
eyebrow [T], heading.a [T], heading.b [T], headingItalic [T], lede [P]

### Aesthetic Medicine View (Global — surgeons-aesthetic-view)
eyebrow [T], heading.a [T], heading.b [T], headingItalic [T], lede [P]

### Detail Template (Global — surgeon-detail-template)
heroLeadLabel [T], heroSpecialistLabel [T], heroCtaConsultLabel [C], statLabelYears [T], statLabelDistinction [T], statLabelSpecialty [T], sidebarLabelSpecialism [T], sidebarLabelCredentials [T], sidebarLabelLanguages [T], sidebarLabelAvailability [T], languagesFallback [T], availabilityFallback [T], facultyEyebrow [T], facultyHeading.pre [T], facultyHeading.italic [T], specialtyEyebrow [T], specialtyHeadingTemplate [P], trainingEyebrow [T], trainingRowLabels [A: value], trainingRowRights [A: value], biographyEyebrow [T], secondaryBioParagraph [P]

### Surgeons Main (Global — surgeons-page)
title [T], sections [A: blocks]

### Surgeons (Collection)
name [T], commonName [T], spec [T], train [T], proc [T], bio [P], specAreas [A: value], group [S], lead, portrait [I]

---

## 4. RESULTS bucket

### Hero (Global — results-hero)
title.a [T], title.b [T], lede [P], heroImage [I]

### CTAs (Global — library-cta)
eyebrow [T], headingPre [T], headingItalic [T], body [P], buttonLabel [C], share.eyebrow [T], share.headingPre [T], share.headingItalic [T], share.headingPost [T], share.body [P], share.buttonLabel [C]

### Featured Cases View (Global — results-featured-cases-view)
eyebrow [T], headingPre [T], headingItalic [T], lede [P], filterBarLabel [T], countFormat [T]

### Stories View (Global — results-stories-view)
eyebrow [T], headingPre [T], headingItalic [T], lede [P]

### Results Main (Global — results-page)
title [T], sections [A: blocks]

### Gallery (Global — gallery-page)
imageLabel [T], breadcrumbLabel [T], filterBarLabel [T], countFormat [T]

### Stories (Global — stories-page)
imageLabel [T], breadcrumbLabel [T]

### Before/After Cases (Collection)
caseLabel [T], composite [I], beforeAlt [T], afterAlt [T], description [P], recoveryDuration [T], year [N], isFeatured

### Patient Stories (Collection)
patientLabel [T], country [T], procedureLabel [T], portrait [I], quote [T], body [P], videoUrl [C], isFeatured

---

## 5. JOURNEY bucket

### Hero (Global — journey-hero)
title.a [T], title.b [T], lede [P], heroImage [I]

### Stats (Global — journey-stats)
stats [A: number, label]

### Page (Global — recovery-stays-page)
hero.title.a [T], hero.title.b [T], hero.lede [P], hero.heroImage [I], topStats [A: number, label], portfolioSection.eyebrow [T], portfolioSection.headingItalic [T], portfolioSection.headingPost [T], portfolioSection.lede [P], inclusionsSection.eyebrow [T], inclusionsSection.headingPre [T], inclusionsSection.headingItalic [T], inclusionsSection.lede [P], inclusions [A: letter, title, body]

### Journey Main (Global — journey-page)
title [T], sections [A: blocks]

### Recovery Stays — Villas (Collection)
name [T], location [T], body [P], heroImage [I], priceFromIdrPerNight [N], amenities [A: value], partnerUrl [C]

### Journey Steps (Collection)
title [T], body [P], bullets [A: text], image [I]

---

## 6. CONTACT bucket

### Hero (Global — contact-hero)
title.a [T], title.b [T], lede [P], heroImage [I]

### Visit Section (Global — contact-visit-section)
headingPre [T], headingItalic [T], body [P], mapImage [I], conciergeHoursValue [P]

### Enquiry Section (Global — contact-enquiry-section)
headingPre [T], headingItalic [T], intro [P], directLines.sectionLabel [T], directLines.conciergeLabel [T], directLines.whatsappLabel [T], directLines.emailLabel [T], directLines.pressLabel [T], trustLine [P], intentCopy [A: slug, eyebrow, title, lede], formLabels [T×12], submitLabels [T×4]

### Video Consult (Global — vid-consult-pg)
title [T], sections [A: blocks]

### Form Defaults (Global — form-defaults)
labels [T×6: name, email, phone, country, treatment, message], placeholders [T×6], submitLabel [C], successMessage [P], errorMessage [P], rateLimitMessage [P]

### Email Templates (Global — email-templates)
templates [A]

### Contact Main (Global — contact-page)
title [T], sections [A: blocks]

### Enquiries (Collection)
name [T], email [T], phone [T], country [T], status [S], message [P]

---

## 7. ABOUT bucket

### Blog Post Template (Global — blog-post-template)
*(chrome labels for blog detail pages)*

### Press (Global — press-page)
*(chrome for /press page)*

### Privacy (Global — privacy-page)
*(chrome for /privacy page)*

### Blog (Global — blog-page)
*(chrome for /blog page)*

### 404 Page (Global — not-found-page)
*(chrome for 404)*

### Blog Posts (Collection)
title [T], lede [P], body [P], heroImage [I], author [S], publishedAt, publishStatus [S]

### Press Mentions (Collection)
publication [T], headline [T], summary [P], publishedDate, isFeatured, logo [I]

### Awards (Collection)
name [T], year [N], issuer [T], summary [P], logo [I]

---

## 8. USERS

### Users (Collection)
email [T], avatar [I]

---

## Field count history

| Pass | Date | Sidebar items | Visible fields | Notes |
|------|------|:---:|:---:|------|
| Start | 2026-05-23 | 81 | ~270 | Baseline |
| Pass 1 | changes4 | ~60 | ~250 | Bucket restructure |
| Pass 2 | changes8 | ~50 | ~240 | Pricing bucket merge |
| Pass 3 | change09 | 36 | ~162 | −45 items, −108 fields |
| Pass 4 | 2026-05-29 | 26 | ~132 | −10 items, −30 fields |
| **Sweep** | **2026-05-30** | **~72** | **~320** | All Lede/Para/Image/Title/Body/Arrays exposed |
