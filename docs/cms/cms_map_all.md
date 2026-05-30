# Cosmedic CMS — Complete Field Map

> **HERO MERGE PASS APPLIED (2026-05-30):** Full Hero merge — Visit→ContactHero, Sections→SurgeonsHero, PricingTerms→TreatmentsHero.pricing. 15 visible globals, ~320 editorial fields accessible.
>
> **For current visible state see `cms_map_simple.md`** (accurate as of 2026-05-30).
> This file is a full schema inventory — many items are now hidden. `[hidden]` = hidden in admin sidebar but still in DB and accessible via direct URL.
> Last updated: 2026-05-30. Source: `packages/cms/src/{collections,globals}/`.
>
> **Architecture pattern (2026-05-30):**
> Each bucket has one Hero card that absorbs related section globals as labeled sub-groups.
> Group label = section title in admin form. 15 cards cover all editor-facing content.
> Hidden globals remain queryable — schema must always match DB (no orphaned column references).

---

## 1. CMS Globals

### Shared Page Blocks (15 block types — available in every `sections` field)

| Block | Fields |
|---|---|
| richText | eyebrow, heading, body |
| imageGrid | heading, columns, images (src, alt, caption) |
| ctaBand | heading, lede, primaryLabel, primaryHref, secondaryLabel, secondaryHref |
| stats | heading, items (number, label, sourceNote) |
| faqAccordion | heading, items (q, a) |
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

### Globals — all fields

| Bucket | Item | Sidebar | Fields |
|---|---|:---:|---|
| **Homepage** | Home Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Homepage** | Home Hero | ✅ | breadcrumbLabel, eyebrow, title.a, title.b, lede, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref, quickEnquiry (eyebrow, heading, intro, nameLabel, namePlaceholder, emailLabel, emailPlaceholder, interestLabel, interestOptionalLabel, interestPlaceholder, revealInterestLabel, submitLabel, submittingLabel, successLabel, successFine, errorFine, fineprint), heroImage |
| **Homepage** | Home Intro | `[hidden]` | eyebrow, pullQuoteBefore, pullQuoteAccent, pullQuoteAfter, col1, col2 |
| **Homepage** | Home Treatments View | `[hidden]` | lede, eyebrow, heading.a, heading.b |
| **Homepage** | Home Surgeons View *(label: "Surgeons")* | ✅ | eyebrow, teamCaption *(heading)*, leadBody *(body)*, leadCtaLabel *(CTA)*, groupPhoto, groupPhotoAlt — legacy hidden: leadSurgeonEyebrow, leadStat1–3 Label/Value, associatesEyebrow |
| **Homepage** | Home Gallery View | `[hidden]` | lede, eyebrow, heading.a, heading.b, ctaLabel, ctaHref |
| **Homepage** | Home Stories View | `[hidden]` | lede, eyebrow, heading.a, heading.b, ctaLabel, ctaHref |
| **Homepage** | Home Pricing View | `[hidden]` | lede, eyebrow, heading.a, heading.b, footnote, viewAllLabel, viewAllHref |
| **Homepage** | Home Journey View | `[hidden]` | eyebrow, heading.a, heading.b, ctaLabel, ctaHref |
| **Homepage** | Home Lead Magnet | ✅ | coverImage, coverEyebrow, coverLine1, coverLine2, coverLine3, coverFoot1, coverFoot2, bodyEyebrow, heading.a, heading.b, lede, formPlaceholder, submitLabel, successHeading, successBody, fineprint |
| **Homepage** | Home Place | ✅ | eyebrow, heading.a, heading.b, body, rows (letter, text), ctaLabel, ctaHref, image |
| **Homepage** | Settings | ✅ | siteName, siteTagline, audToIdrRate, roundIdrTo, contactEmail, clinicEnquiryEmail, pressEmail, contactPhone, whatsappNumber, addressLine1, addressLine2, city, postalCode, country, hoursMonFri, hoursSatSun, googleMapsUrl, socialLinks (platform, url), defaultLocale, defaultOgImage, defaultMetaDescription |
| **Homepage** | Header | ✅ | navItems (label, href, activePattern, megaMenu), localeSwitcher (enabled, labelEn, labelId), logoLight, logoDark |
| **Homepage** | Footer | ✅ | brandTagline, treatmentsHeading, linkColumns (heading, items.label, items.href), newsletter (label, placeholder, buttonLabel), footerBottomLines, enquirySummary, addressBlock, copyrightTemplate, logoLight |
| **Homepage** | Floating Chrome | `[hidden]` | ctaPill.label, ctaPill.href, ctaPill.enabled, chat.enabled, chat.provider, chat.embedScript, chat.openOnLoad |
| **Homepage** | Brand Stats | `[hidden]` | stats (number, label, sourceNote) |
| **Homepage** | Endorsement Mark | `[hidden]` | endorsementLine, clearspaceUnit, minScreenWidthPx, minPrintMmWidth, primaryLockup, inverseLockup |
| **Homepage** | SEO Defaults | `[hidden]` | titlePattern, robotsTxt, sitemapBaseUrl, organizationSchema |
| **Treatments** | Treatments Page | `[hidden]` | slug, route, title, chapterTitle.a, chapterTitle.b, tagline, lede, heroImage, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Treatments** | Treatments Hero | ✅ | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **Treatments** | Treatments Index | ✅ | eyebrow, heading, lede, readMoreLabel, readMoreArrow |
| **Treatments** | Treatments Stats | `[hidden]` | stats (number, label) |
| **Treatments** | Discipline Detail Template | `[hidden]` | toc.onThisPageLabel, toc.overviewLabel, toc.subCategoriesLabel, toc.proceduresLabel, toc.faqsLabel, overview.heading, chooseAFocus.heading, chooseAFocus.bodyTemplate, chooseAFocus.availableLabel, chooseAFocus.comingLabel, procedures.heading, procedures.intro, faqs.heading, related.eyebrow, related.headingItalic, related.headingRoman, related.ledeTemplate |
| **Treatments** | Sub-Category Detail Template | `[hidden]` | chapterSeparator, toc.onThisPageLabel, toc.overviewLabel, toc.treatmentsLabel, toc.faqsLabel, takeAStep.eyebrow, takeAStep.videoConsultLabel, takeAStep.estimateLabel, takeAStep.whatsappLabel, takeAStep.replyLine, overview.heading, treatments.heading, treatments.intro, faqs.heading |
| **Treatments** | Pricing Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Treatments** | Pricing Hero *(label: "Pricing Hero")* | ✅ | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **Treatments** | Pricing Overview | ✅ | eyebrow, heading.a, heading.b, body |
| **Treatments** | Pricing Footnote | `[hidden]` | text |
| **Treatments** | Pricing Insurance | `[hidden]` | eyebrow, headingRoman, headingItalic, body |
| **Treatments** | Pricing Payment | `[hidden]` | eyebrow, headingRoman, headingItalic, termsText |
| **Treatments** | Pricing Catalogue View | `[hidden]` | sectionEyebrow, headingRoman, headingItalic, introTemplate, sheetLabels (surgicalTitle, surgicalSubtitle, machineTitle, machineSubtitle, injectionTitle, injectionSubtitle, btlTitle, btlSubtitle), hairZoneLabels (face, upperBody, lowerBody, packageZone), injectableCategoryLabels (botulinumToxin, filler, skinBooster, collagenStimulator, bioRemodeling) |
| **Treatments** | Pricing Discipline List | `[hidden]` | sectionEyebrow, onRequestLabel, includedLabel, arrowChar |
| **Treatments** | Consultation Policy | ✅ | feeIdr, waiverConditionText, displayOn |
| **Experts** | Surgeons Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Experts** | Surgeons Hero | ✅ | breadcrumbLabel, title.a, title.b, lede, heroImage, imageHue, imageLabel, chapter |
| **Experts** | Surgeons Lead View | `[hidden]` | sectionEyebrow, blockEyebrow, statLabelTrained, statLabelSpecialty, statLabelDistinction, ctaLabel |
| **Experts** | Surgeons Plastic View | `[hidden]` | lede, eyebrow, heading.a, heading.b, headingItalic |
| **Experts** | Surgeons Aesthetic View | `[hidden]` | lede, eyebrow, heading.a, heading.b, headingItalic |
| **Experts** | Surgeon Detail Template | `[hidden]` | breadcrumbHomeLabel, breadcrumbSurgeonsLabel, heroLeadLabel, heroSpecialistLabel, heroCtaConsultLabel, heroCtaTreatmentsLabelTemplate, heroCtaTreatmentsLabelFallback, statLabelYears, statLabelDistinction, statLabelSpecialty, sidebarLabelSpecialism, sidebarLabelCredentials, sidebarLabelLanguages, sidebarLabelAvailability, languagesFallback, availabilityFallback, facultyEyebrow, facultyHeading (pre, italic, post), specialtyEyebrow, specialtyHeadingTemplate, trainingEyebrow, trainingRowLabels, trainingRowRights, trainingRowPracticeMid, biographyEyebrow, secondaryBioParagraph |
| **Results** | Results Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Results** | Results Hero | ✅ | breadcrumbLabel, title.a, title.b, lede, heroImage, imageHue, imageLabel, chapter |
| **Results** | CTAs *(was: Library CTA + Share CTA merged)* | ✅ | eyebrow, headingPre, headingItalic, body, buttonLabel, buttonHref, share.eyebrow, share.headingPre, share.headingItalic, share.headingPost, share.body, share.buttonLabel, share.buttonHref |
| **Results** | Share CTA | `[hidden]` | eyebrow, headingPre, headingItalic, headingPost, body, buttonLabel, buttonHref *(data now in CTAs global)* |
| **Results** | Gallery Page | `[hidden]` | slug, route, title, breadcrumbLabel, filterBarLabel, countFormat, imageLabel, imageHue, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Results** | Stories Page | `[hidden]` | slug, route, title, breadcrumbLabel, imageLabel, imageHue, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Results** | Featured Cases View | `[hidden]` | eyebrow, headingPre, headingItalic, lede, filterBarLabel, countFormat |
| **Results** | Stories View | `[hidden]` | eyebrow, headingPre, headingItalic, lede |
| **Journey** | Journey Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Journey** | Journey Hero | ✅ | breadcrumbLabel, title.a, title.b, lede, heroImage, imageHue, imageLabel, chapter |
| **Journey** | Journey Stats | `[hidden]` | stats (number, label, italic) |
| **Journey** | Recovery Stays — Page | ✅ | slug, route, title, sections, publishStatus, seo, hero.chapter, hero.title.a, hero.title.b, hero.lede, hero.heroImage, hero.imageHue, hero.imageLabel, hero.breadcrumbLabel, topStats (number, label, italic), portfolioSection (eyebrow, headingPre `[hidden]`, headingItalic, headingPost, lede), inclusionsSection (eyebrow, headingPre `[hidden]`, headingItalic, headingPost, lede), inclusions (letter, title `[hidden]`, body `[hidden]`) |
| **Contact** | Contact Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Contact** | Contact Hero | ✅ | breadcrumbLabel, title.a, title.b, lede, heroImage, imageHue, imageLabel, chapter |
| **Contact** | Contact Enquiry Section | ✅ | eyebrow, headingPre, headingItalic, intro, trustLine, directLines (sectionLabel, conciergeLabel, whatsappLabel, emailLabel, pressLabel), intentCopy (slug, eyebrow, title, lede), formLabels (nameLabel, namePlaceholder, emailLabel, emailPlaceholder, treatmentLabel, treatmentPlaceholder, addDetailsLabel, countryLabel, countryPlaceholder, dateLabel, datePlaceholder, messageLabel, messagePlaceholder), submitLabels (send, sending, sent, successMessage) |
| **Contact** | Contact Visit Section | ✅ | eyebrow, headingPre, headingItalic, body, mapImage, mapImageLabel, mapImageHue, openInMapsLabel, getDirectionsLabel, clinicHoursLabel, conciergeHoursLabel, conciergeHoursValue |
| **Contact** | Form Defaults | `[hidden]` | labels (name, email, phone, country, treatment, message), placeholders (name, email, phone, country, treatment, message), submitLabel, successMessage, errorMessage, rateLimitMessage |
| **Contact** | Email Templates | `[hidden]` | templates (id, subject, bodyMjml, locale) |
| **Contact** | Video Consult Page | `[hidden]` | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **About** | Blog Page | `[hidden]` | slug, route, title, sections, publishStatus, seo, thisIssueEyebrow, readTheEssayCtaLabel, archiveSection (eyebrow, headingPre, headingItalic, lede, filterAllLabel, emptyStateCopy) |
| **About** | Press Page | ✅ | slug, route, title, sections, publishStatus, seo, accreditationsSection (eyebrow, heading, lede), pressSection (eyebrow, headingPre, headingItalic, lede), pressEnquiriesCtaLabel |
| **About** | Privacy Page | `[hidden]` | slug, route, title, sections, publishStatus, seo, lastUpdatedDate, versionLine, readingTimeLine, introParagraph, imageLabel, tocHeading, dpo (eyebrow, headingA, headingB, lede, emailLabel, email, postLabel, addressLine1, addressLine2, addressLine3, generalContactLabel) |
| **About** | Blog Post Template | `[hidden]` | byline (writtenByLabel, publishedLabel, lengthLabel, filedUnderLabel), aboutTheAuthor (eyebrowLabel, readFullProfileCta, bookConsultationCta), moreFromTheJournal (eyebrow, headingPre, headingItalic, backToJournalCta) |
| **About** | Not Found Page | `[hidden]` | eyebrow, headingA, headingB, lede, primaryBtnLabel, primaryBtnHref, secondaryBtnLabel, secondaryBtnHref |

---

## 2. CMS Collections — all fields

| Bucket | Item | Sidebar | Fields |
|---|---|:---:|---|
| **Homepage** | Press Mentions | ✅ | slug, publication, headline, url, publishedDate, summary, isFeatured, sortOrder, logo |
| **Homepage** | Awards | ✅ | slug, name, year, issuer, summary, sortOrder, logo |
| **Treatments** | Disciplines | ✅ | slug, title, subtitle, displayCount, hue, body, chapterTitle.a, chapterTitle.b, tagline, lede, overview, heroImage, leadSurgeons, faqs (q, a), seo.title, seo.description, seo.ogImage, sortOrder |
| **Treatments** | Sub Categories | ✅ | slug, parent, title, chapterTitle.a, chapterTitle.b, tagline, lede, intro, overview, leadSurgeon, sections, faqs (q, a), heroImage, seo.title, seo.description, seo.ogImage, sortOrder |
| **Treatments** | Procedures | ✅ | slug, name, shortName, catalogueGroup, mainCategory, subCategory, unit, audienceTier, brand, productLine, manufacturer, fdaApproved, bodyZone, parentDiscipline, parentSubCategory, description, sections, faqs (q, a), surgeonsCredentialed, heroImage, pricing.priceIdr2025, pricing.priceIdr2026, pricing.priceIdrRangeLow, pricing.priceIdrRangeHigh, pricing.priceNotes, pricing.displayYear, featuredRank, includesImplant, detail.duration, detail.recovery, detail.included, recoveryTimeline, relatedBA, relatedProcedures, seo.title, seo.description, seo.ogImage, sortOrder |
| **Experts** | Surgeons | ✅ | slug, designation, name, commonName, suffix, spec, train, proc, credLine, yearsInPractice, group, lead, sortOrder, bio, specAreas, credentialedProcedures, availabilitySchedule (day, windowStart, windowEnd, byAppointment), languages, portrait, portraitPosition, seo.title, seo.description, seo.ogImage, hue |
| **Results** | Before/After Cases | ✅ | slug, caseLabel, procedure, composite, beforeAlt, afterAlt, surgeon, tags, description, year, patientAge, recoveryDuration, isFeatured, seo.title, seo.description, seo.ogImage, sortOrder |
| **Results** | Patient Stories | ✅ | slug, patientLabel, country, procedure, procedureLabel, hue, portrait, quote, body, videoUrl, year, surgeon, isFeatured, publishStatus, seo.title, seo.description, seo.ogImage, sortOrder |
| **Journey** | Journey Steps | `[hidden]` | slug, order, number, title, body, bullets (letter, text), image, imageHue, dayLabel, icon, category, sortOrder |
| **Journey** | Recovery Stays — Villas | ✅ | slug, name, location, bedrooms, poolType, heroImage, imageHue, body, driveTime, nursingNote, gallery, descriptor, amenities, priceFromAudPerNight, priceFromIdrPerNight, partnerUrl, geo.lat, geo.lng, seo.title, seo.description, seo.ogImage, sortOrder |
| **Contact** | Enquiries | ✅ | name, email, phone, country, status, assignedTo, treatmentInterest, treatmentInterestText, preferredDate, message, internalNotes (at, by, text), submittedAt, ip, userAgent, honeypot, sourcePage, sourceCta |
| **About** | Blog Posts | ✅ | slug, title, lede, body, author, publishedAt, tags, readingTimeMinutes, heroImage, publishStatus, seo.title, seo.description, seo.ogImage, sortOrder |
| **About** | Blog Tags | `[hidden]` | slug, name, description, sortOrder |
| **About** | Authors | `[hidden]` | slug, name, role, bio, surgeonProfile, portrait |
| **About** | Privacy *(was: Privacy Sections)* | ✅ | slug, title, paragraphs, listItems, sortOrder |
| **Users** | Users | ✅ | email, avatar |
| **Media** | Media Library | `[hidden]` | filename, alt, category, isPlaceholder, credit, caption |
| *(internal)* | Analytics | `[hidden]` | question, askedAt, ip, country, city, timezone, userAgent |
