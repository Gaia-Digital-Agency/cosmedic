# Cosmedic CMS — Complete Field Map

> **Last updated: 2026-05-30 (session 2)**
> Verified against source files in `packages/cms/src/{collections,globals}/`.
> `[hidden]` = hidden in admin sidebar but schema exists in DB.
> ✅ = visible to editors in admin sidebar.
>
> **16 visible globals** across 7 buckets. Architecture: each bucket has one Hero card
> that absorbs related section globals as labeled sub-groups.
> Hidden globals remain queryable — schema must always match DB.

---

## 1. CMS Globals

| Bucket | Item | Sidebar | Fields |
|---|---|:---:|---|
| **Homepage** | Home Hero | ✅ | title.a, title.b, lede, primaryCtaLabel, secondaryCtaLabel, heroImage — *hidden*: breadcrumbLabel, eyebrow, secondaryCtaHref, quickEnquiry.* |
| **Homepage** | Sections *(home-treatments-view)* | ✅ | **Treatments:** lede, eyebrow, heading.a, heading.b · **Pricing:** lede, eyebrow, heading.a, heading.b, footnote, viewAllLabel · **Gallery:** lede, eyebrow, heading.a, heading.b, ctaLabel · **Stories:** lede, eyebrow, heading.a, heading.b, ctaLabel |
| **Homepage** | Surgeons *(home-surgeons-view)* | ✅ | **Team Heading:** caption · **Body & CTA:** body, ctaLabel · **Photo:** photo, photoAlt — *hidden*: eyebrow, leadSurgeonEyebrow, leadStat1–3, associatesEyebrow |
| **Homepage** | Lead Magnet *(home-lead-magnet)* | ✅ | **Cover:** image, title, footer · **Heading:** a, b · lede, formPlaceholder, submitLabel — *hidden*: coverEyebrow, bodyEyebrow, successHeading, successBody, fineprint |
| **Homepage** | Place *(home-place)* | ✅ | **Heading:** a, b · body, rows (letter, text), ctaLabel, image — *hidden*: eyebrow, ctaHref |
| **Homepage** | Settings | ✅ | siteName, audToIdrRate (+ liveRateWidget ui), rateLockedManually, rateLastFetchedAt (readonly), rateSource (readonly), roundIdrTo, contactEmail, contactPhone, whatsappNumber, addressLine1, addressLine2, city, hoursMonFri, hoursSatSun, googleMapsUrl, socialLinks (platform, url) — *hidden*: siteTagline, clinicEnquiryEmail, pressEmail, postalCode, country, defaultLocale, defaultOgImage, defaultMetaDescription |
| **Homepage** | Header | `[hidden]` | navItems (label, href, activePattern, megaMenu), localeSwitcher (enabled, labelEn, labelId), logoLight, logoDark |
| **Homepage** | Footer | `[hidden]` | brandTagline, treatmentsHeading, linkColumns (heading, items.label, items.href), newsletter (label, placeholder, buttonLabel), footerBottomLines, enquirySummary, addressBlock, copyrightTemplate, logoLight |
| **Homepage** | Home Intro | `[hidden]` | intro (eyebrow, pullQuoteBefore, pullQuoteAccent, pullQuoteAfter, col1, col2), journey (eyebrow, heading.a, heading.b, ctaLabel), trustStrip (number, label, sourceNote) |
| **Homepage** | Home Gallery View | `[hidden]` | lede, eyebrow, heading.a, heading.b, ctaLabel, ctaHref *(content now in Sections card)* |
| **Homepage** | Home Stories View | `[hidden]` | lede, eyebrow, heading.a, heading.b, ctaLabel, ctaHref *(content now in Sections card)* |
| **Homepage** | Home Pricing View | `[hidden]` | lede, eyebrow, heading.a, heading.b, footnote, viewAllLabel, viewAllHref *(content now in Sections card)* |
| **Homepage** | Home Journey View | `[hidden]` | eyebrow, heading.a, heading.b, ctaLabel, ctaHref *(content now in Sections card)* |
| **Homepage** | Floating Chrome | `[hidden]` | ctaPill.label, ctaPill.href, ctaPill.enabled, chat.enabled, chat.provider, chat.embedScript |
| **Homepage** | Brand Stats | `[hidden]` | stats (number, label, sourceNote) |
| **Homepage** | Endorsement Mark | `[hidden]` | endorsementLine, clearspaceUnit, minScreenWidthPx, minPrintMmWidth, primaryLockup, inverseLockup |
| **Homepage** | SEO Defaults | `[hidden]` | titlePattern, robotsTxt, sitemapBaseUrl, organizationSchema |
| **Procedures** | Hero *(treatments-hero)* | ✅ | **Treatments group:** titleA, titleB, lede, heroImage · **Pricing group:** titleA, titleB, lede, heroImage · Insurance (eyebrow, headingRoman, headingItalic, body) · Payment (eyebrow, headingRoman, headingItalic, termsText) · Consultation (feeIdr, waiverConditionText) |
| **Procedures** | Discipline Template *(discipline-detail-template)* | ✅ | **TOC:** onThisPageLabel, overviewLabel, subCategoriesLabel, proceduresLabel, faqsLabel · **Overview:** heading · **Choose a Focus:** heading, bodyTemplate, availableLabel, comingLabel · **Procedures:** heading, intro · **FAQs:** heading · **Related:** eyebrow, headingItalic, headingRoman, ledeTemplate |
| **Procedures** | Catalogue View *(pricing-catalogue-view)* | ✅ | sectionEyebrow, headingRoman, headingItalic, introTemplate, sheetLabels (surgicalTitle/Subtitle, machineTitle/Subtitle, injectionTitle/Subtitle, btlTitle/Subtitle), hairZoneLabels (face, upperBody, lowerBody, packageZone, other), injectableCategoryLabels (9 labels) |
| **Procedures** | Sub-Category Template | `[hidden]` | chapterSeparator, toc (onThisPageLabel, overviewLabel, treatmentsLabel, faqsLabel), takeAStep (eyebrow, videoConsultLabel, estimateLabel, whatsappLabel, replyLine), overview.heading, treatments (heading, intro), faqs.heading |
| **Procedures** | Treatments Index | `[hidden]` | eyebrow, heading, lede, readMoreLabel, readMoreArrow |
| **Procedures** | Treatments Stats | `[hidden]` | stats (number, label) |
| **Procedures** | Pricing Hero | `[hidden]` | chapter, titleA, titleB, lede, heroImage *(now in Hero → Pricing group)* |
| **Procedures** | Pricing Overview | `[hidden]` | eyebrow, heading.a, heading.b, body |
| **Procedures** | Pricing Footnote | `[hidden]` | text |
| **Procedures** | Pricing Insurance | `[hidden]` | eyebrow, headingRoman, headingItalic, body *(now in Hero → Pricing → Insurance)* |
| **Procedures** | Pricing Payment | `[hidden]` | eyebrow, headingRoman, headingItalic, termsText *(now in Hero → Pricing → Payment)* |
| **Procedures** | Pricing Discipline List | `[hidden]` | sectionEyebrow, onRequestLabel, includedLabel, arrowChar |
| **Procedures** | Consultation Policy | `[hidden]` | feeIdr, waiverConditionText, displayOn *(now in Hero → Pricing → Consultation)* |
| **Procedures** | Treatments Page | `[hidden]` | slug, route, title, chapterTitle.a/b, tagline, lede, heroImage, sections, publishStatus, seo.* |
| **Procedures** | Pricing Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.* |
| **Experts** | Hero *(surgeons-hero)* | ✅ | titleA, titleB, lede, heroImage, imageLabel · **Sections:** Lead (sectionEyebrow, blockEyebrow, statLabelTrained/Specialty/Distinction, ctaLabel) · Plastic Surgery (lede, eyebrow, headingA, headingB, headingItalic) · Aesthetic Medicine (lede, eyebrow, headingA, headingB, headingItalic) — *hidden*: breadcrumbLabel, imageHue, chapter |
| **Experts** | Detail Template *(surgeon-detail-template)* | ✅ | breadcrumbHomeLabel, breadcrumbSurgeonsLabel · heroLeadLabel, heroSpecialistLabel, heroCtaConsultLabel, heroCtaTreatmentsLabelFallback · statLabelYears, statLabelDistinction, statLabelSpecialty · sidebarLabelSpecialism/Credentials/Languages/Availability · languagesFallback, availabilityFallback · facultyEyebrow, facultyHeading (pre, italic, post) · specialtyEyebrow, specialtyHeadingTemplate · trainingEyebrow, trainingRowLabels (×5), trainingRowRights (×4), trainingRowPracticeMid (readonly) · biographyEyebrow, secondaryBioParagraph |
| **Experts** | Surgeons Lead View | `[hidden]` | sectionEyebrow, blockEyebrow, statLabelTrained/Specialty/Distinction, ctaLabel *(now in Hero → Sections → Lead)* |
| **Experts** | Surgeons Plastic View | `[hidden]` | lede, eyebrow, heading.a, heading.b, headingItalic *(now in Hero → Sections → Plastic Surgery)* |
| **Experts** | Surgeons Aesthetic View | `[hidden]` | lede, eyebrow, heading.a, heading.b, headingItalic *(now in Hero → Sections → Aesthetic Medicine)* |
| **Experts** | Surgeons Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.* |
| **Results** | Hero *(results-hero)* | ✅ | titleA, titleB, lede, heroImage, imageLabel — *hidden*: breadcrumbLabel, imageHue, chapter |
| **Results** | Library CTA | `[hidden]` | eyebrow, headingPre, headingItalic, body, buttonLabel, buttonHref, share.eyebrow/headingPre/headingItalic/headingPost/body/buttonLabel/buttonHref |
| **Results** | Featured Cases View | `[hidden]` | eyebrow, headingPre, headingItalic, lede, filterBarLabel, countFormat |
| **Results** | Stories View | `[hidden]` | eyebrow, headingPre, headingItalic, lede |
| **Results** | Share CTA | `[hidden]` | eyebrow, headingPre, headingItalic, headingPost, body, buttonLabel, buttonHref |
| **Results** | Results Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.* |
| **Results** | Gallery Page | `[hidden]` | slug, route, title, breadcrumbLabel, filterBarLabel, countFormat, imageLabel, sections, publishStatus, seo.* |
| **Results** | Stories Page | `[hidden]` | slug, route, title, breadcrumbLabel, imageLabel, sections, publishStatus, seo.* |
| **Journey** | Hero *(journey-hero)* | ✅ | titleA, titleB, lede, heroImage, imageHue, imageLabel, chapter — *hidden*: breadcrumbLabel |
| **Journey** | Page *(recovery-stays-page)* | ✅ | **Hero:** title.a, title.b, lede, heroImage, imageHue, imageLabel, breadcrumbLabel, chapter · topStats (number, label, italic) · **Portfolio Section:** eyebrow, headingItalic, headingPost, lede — *hidden*: inclusionsSection, inclusions |
| **Journey** | Journey Stats | `[hidden]` | stats (number, label, italic) |
| **Journey** | Journey Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.* |
| **Contact** | Hero *(contact-hero)* | ✅ | titleA, titleB, lede, heroImage, imageLabel · **Visit Section:** headingPre, headingItalic, body, mapImage, conciergeHoursValue — *hidden*: breadcrumbLabel, imageHue, chapter |
| **Contact** | Enquiry *(contact-enquiry-section)* | `[hidden]` | eyebrow, headingPre, headingItalic, intro, trustLine, directLines (sectionLabel, conciergeLabel, whatsappLabel, emailLabel, pressLabel), intentCopy (slug, eyebrow, title, lede), formLabels (12 fields), submitLabels (send, sending, sent, successMessage) |
| **Contact** | Visit *(contact-visit-section)* | `[hidden]` | headingPre, headingItalic, body, mapImage, conciergeHoursValue *(content now in Hero → Visit Section)* |
| **Contact** | Form Defaults | `[hidden]` | labels (name, email, phone, country, treatment, message), placeholders, submitLabel, successMessage, errorMessage, rateLimitMessage |
| **Contact** | Email Templates | `[hidden]` | templates (id, subject, bodyMjml, locale) |
| **Contact** | Contact Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.* |
| **Contact** | Video Consult Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.* |
| **Publications** | Blog Post Template | ✅ | **Byline Labels:** writtenByLabel, publishedLabel, lengthLabel, filedUnderLabel · **About the Author:** eyebrowLabel, readFullProfileCta, bookConsultationCta · **More from the Journal:** eyebrow, headingPre, headingItalic, backToJournalCta |
| **Publications** | Blog Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.*, thisIssueEyebrow, readTheEssayCtaLabel, archiveSection.* |
| **Publications** | Press Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.*, accreditationsSection.*, pressSection.*, pressEnquiriesCtaLabel |
| **Publications** | Privacy Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.*, lastUpdatedDate, versionLine, readingTimeLine, introParagraph, tocHeading, dpo.* |
| **Publications** | Not Found Page | `[hidden]` | eyebrow, headingA, headingB, lede, primaryBtnLabel, primaryBtnHref, secondaryBtnLabel, secondaryBtnHref |

---

## 2. CMS Collections — all fields

| Bucket | Collection | Sidebar | Visible Fields | Hidden Fields |
|---|---|:---:|---|---|
| **Homepage** | — | — | — | — |
| **Procedures** | Disciplines | ✅ | title, subtitle, body, tagline, lede, overview, heroImage, sections (t, body), faqs (q, a) | slug, displayCount, hue, chapterTitle.a/b, leadSurgeons, seo.* |
| **Procedures** | Sub-Categories | ✅ | title, tagline, lede, intro, overview, leadSurgeon, sections (t, body), faqs (q, a), heroImage | slug, parent, chapterTitle.a/b, seo.* |
| **Procedures** | Procedures | ✅ | name, shortName, description, sections (t, body), faqs (q, a), heroImage, pricing.priceIdr2026, pricing.priceNotes, detail.duration, detail.recovery, detail.included (value), featuredRank | slug, catalogueGroup, mainCategory, subCategory, unit, audienceTier, brand, productLine, manufacturer, fdaApproved, bodyZone, parentDiscipline, parentSubCategory, pricing.priceIdr2025/RangeLow/RangeHigh/displayYear, includesImplant, surgeonsCredentialed, recoveryTimeline, relatedBA, relatedProcedures, sortOrder, seo.* |
| **Experts** | Surgeons | ✅ | name, commonName, spec, train, proc, group, lead, bio, specAreas (value), portrait, languages (code) | slug, suffix, credLine, yearsInPractice, credentialedProcedures, availabilitySchedule, portraitPosition, hue, seo.* |
| **Results** | Before/After Cases | ✅ | caseLabel, composite, beforeAlt, afterAlt, description, year, recoveryDuration, isFeatured | slug, procedure, surgeon, tags, patientAge, seo.* |
| **Results** | Patient Stories | ✅ | patientLabel, country, procedureLabel, portrait, quote, body, videoUrl, isFeatured | slug, procedure, hue, year, surgeon, publishStatus, seo.* |
| **Journey** | Journey Steps | `[hidden]` | order, number, title, body, bullets (letter, text), image, imageHue, dayLabel | slug, icon, category, sortOrder |
| **Journey** | Recovery Stays — Villas | ✅ | name, location, bedrooms, poolType, heroImage, body, driveTime, nursingNote, amenities (value), priceFromIdrPerNight, partnerUrl | slug, imageHue, gallery, descriptor, priceFromAudPerNight, geo.lat/lng, seo.* |
| **Contact** | Enquiries | ✅ | name, email, phone, country, preferredDate, message, status, assignedTo, internalNotes (at, by, text) | submittedAt, ip, userAgent, honeypot, sourcePage, sourceCta, treatmentInterest, treatmentInterestText |
| **Contact** | Analytics | `[hidden]` | question, askedAt, ip, country, city, timezone, userAgent | — |
| **Publications** | Blog Posts | ✅ | title, lede, body, author, publishedAt, tags, heroImage, publishStatus | slug, readingTimeMinutes, seo.* |
| **Publications** | Press Mentions | ✅ | publication, headline, url, publishedDate, summary, isFeatured, logo | slug, sortOrder |
| **Publications** | Awards | ✅ | name, year, issuer, summary, logo | slug, sortOrder |
| **Publications** | Blog Tags | `[hidden]` | slug, name, description, sortOrder | — |
| **Publications** | Authors | `[hidden]` | slug, name, role, bio, surgeonProfile, portrait | — |
| **Publications** | Privacy Sections | ✅ | title, paragraphs, listItems | slug, sortOrder |
| **Media Library** | Media | ✅ | filename, alt, caption, category | isPlaceholder, credit |
| **Users** | Users | ✅ | email, avatar | — |
