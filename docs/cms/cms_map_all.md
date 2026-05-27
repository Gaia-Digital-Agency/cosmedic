# Cosmedic CMS — Complete Field Map

> Full inventory of every field across all 19 collections and 42 globals.
> Format mirrors `docs/changes/app_map.md`. Source: `packages/cms/src/{collections,globals}/`.
> Dot-notation for group sub-fields (`heading.a`, `pricing.priceIdr2026`). Arrays shown as `items (field, field)`.
> Generated 2026-05-27.

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

| Bucket | Item | Fields |
|---|---|---|
| **Homepage** | Home Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Homepage** | Home Hero | breadcrumbLabel, eyebrow, title.a, title.b, lede, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref, quickEnquiry.eyebrow, quickEnquiry.heading, quickEnquiry.intro, quickEnquiry.nameLabel, quickEnquiry.namePlaceholder, quickEnquiry.emailLabel, quickEnquiry.emailPlaceholder, quickEnquiry.interestLabel, quickEnquiry.interestOptionalLabel, quickEnquiry.interestPlaceholder, quickEnquiry.revealInterestLabel, quickEnquiry.submitLabel, quickEnquiry.submittingLabel, quickEnquiry.successLabel, quickEnquiry.successFine, quickEnquiry.errorFine, quickEnquiry.fineprint, heroImage |
| **Homepage** | Home Intro | eyebrow, pullQuoteBefore, pullQuoteAccent, pullQuoteAfter, col1, col2 |
| **Homepage** | Home Treatments View | lede, eyebrow, heading.a, heading.b |
| **Homepage** | Home Surgeons View | eyebrow, leadSurgeonEyebrow, leadBody, leadStat1Label, leadStat1Value, leadStat2Label, leadStat2Value, leadStat3Label, leadStat3Value, leadCtaLabel, associatesEyebrow, teamCaption, groupPhoto, groupPhotoAlt |
| **Homepage** | Home Gallery View | lede, eyebrow, heading.a, heading.b, ctaLabel, ctaHref |
| **Homepage** | Home Stories View | lede, eyebrow, heading.a, heading.b, ctaLabel, ctaHref |
| **Homepage** | Home Pricing View | lede, eyebrow, heading.a, heading.b, footnote, viewAllLabel, viewAllHref |
| **Homepage** | Home Journey View | eyebrow, heading.a, heading.b, ctaLabel, ctaHref |
| **Homepage** | Home Lead Magnet | coverImage, coverEyebrow, coverLine1, coverLine2, coverLine3, coverFoot1, coverFoot2, bodyEyebrow, heading.a, heading.b, lede, formPlaceholder, submitLabel, successHeading, successBody, fineprint |
| **Homepage** | Home Place | eyebrow, heading.a, heading.b, body, rows (letter, text), ctaLabel, ctaHref, image |
| **Homepage** | Settings | siteName, siteTagline, audToIdrRate, roundIdrTo, contactEmail, clinicEnquiryEmail, pressEmail, contactPhone, whatsappNumber, addressLine1, addressLine2, city, postalCode, country, hoursMonFri, hoursSatSun, googleMapsUrl, socialLinks (platform, url), defaultLocale, defaultOgImage, defaultMetaDescription |
| **Homepage** | Header | navItems (label, href, activePattern, megaMenu), localeSwitcher (enabled, labelEn, labelId), logoLight, logoDark |
| **Homepage** | Footer | brandTagline, treatmentsHeading, linkColumns (heading, items.label, items.href), newsletter (label, placeholder, buttonLabel), footerBottomLines, enquirySummary, addressBlock, copyrightTemplate, logoLight |
| **Homepage** | Floating Chrome | ctaPill.label, ctaPill.href, ctaPill.enabled, chat.enabled, chat.provider, chat.embedScript, chat.openOnLoad |
| **Homepage** | Brand Stats | stats (number, label, sourceNote) |
| **Homepage** | Endorsement Mark | endorsementLine, clearspaceUnit, minScreenWidthPx, minPrintMmWidth, primaryLockup, inverseLockup |
| **Homepage** | SEO Defaults | titlePattern, robotsTxt, sitemapBaseUrl, organizationSchema |
| **Treatments** | Treatments Page | slug, route, title, chapterTitle.a, chapterTitle.b, tagline, lede, heroImage, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Treatments** | Treatments Hero | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **Treatments** | Treatments Index | eyebrow, heading, lede, readMoreLabel, readMoreArrow |
| **Treatments** | Treatments Stats | stats (number, label) |
| **Treatments** | Discipline Detail Template | toc.onThisPageLabel, toc.overviewLabel, toc.subCategoriesLabel, toc.proceduresLabel, toc.faqsLabel, overview.heading, chooseAFocus.heading, chooseAFocus.bodyTemplate, chooseAFocus.availableLabel, chooseAFocus.comingLabel, procedures.heading, procedures.intro, faqs.heading, related.eyebrow, related.headingItalic, related.headingRoman, related.ledeTemplate |
| **Treatments** | Sub-Category Detail Template | chapterSeparator, toc.onThisPageLabel, toc.overviewLabel, toc.treatmentsLabel, toc.faqsLabel, takeAStep.eyebrow, takeAStep.videoConsultLabel, takeAStep.estimateLabel, takeAStep.whatsappLabel, takeAStep.replyLine, overview.heading, treatments.heading, treatments.intro, faqs.heading |
| **Doctors** | Surgeons Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Doctors** | Surgeons Hero | breadcrumbLabel, title.a, title.b, lede, heroImage, imageHue, imageLabel, chapter |
| **Doctors** | Surgeons Lead View | sectionEyebrow, blockEyebrow, statLabelTrained, statLabelSpecialty, statLabelDistinction, ctaLabel |
| **Doctors** | Surgeons Plastic View | lede, eyebrow, heading.a, heading.b, headingItalic |
| **Doctors** | Surgeons Aesthetic View | lede, eyebrow, heading.a, heading.b, headingItalic |
| **Doctors** | Surgeon Detail Template | breadcrumbHomeLabel, breadcrumbSurgeonsLabel, heroLeadLabel, heroSpecialistLabel, heroCtaConsultLabel, heroCtaTreatmentsLabelTemplate, heroCtaTreatmentsLabelFallback, statLabelYears, statLabelDistinction, statLabelSpecialty, sidebarLabelSpecialism, sidebarLabelCredentials, sidebarLabelLanguages, sidebarLabelAvailability, languagesFallback, availabilityFallback, facultyEyebrow, facultyHeading.pre, facultyHeading.italic, facultyHeading.post, specialtyEyebrow, specialtyHeadingTemplate, trainingEyebrow, trainingRowLabels, trainingRowRights, trainingRowPracticeMid, biographyEyebrow, secondaryBioParagraph |
| **Results** | Results Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Results** | Results Hero | breadcrumbLabel, title.a, title.b, lede, heroImage, imageHue, imageLabel, chapter |
| **Results** | Library CTA | eyebrow, headingPre, headingItalic, body, buttonLabel, buttonHref |
| **Results** | Share CTA | eyebrow, headingPre, headingItalic, headingPost, body, buttonLabel, buttonHref |
| **Results** | Gallery Page | slug, route, title, breadcrumbLabel, filterBarLabel, countFormat, imageLabel, imageHue, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Results** | Stories Page | slug, route, title, breadcrumbLabel, imageLabel, imageHue, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Results** | Featured Cases View | eyebrow, headingPre, headingItalic, lede, filterBarLabel, countFormat |
| **Results** | Stories View | eyebrow, headingPre, headingItalic, lede |
| **Pricing** | Pricing Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Pricing** | Pricing Hero | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **Pricing** | Pricing Overview | eyebrow, heading.a, heading.b, body |
| **Pricing** | Pricing Footnote | text |
| **Pricing** | Pricing Insurance | eyebrow, headingRoman, headingItalic, body |
| **Pricing** | Pricing Payment | eyebrow, headingRoman, headingItalic, termsText |
| **Pricing** | Pricing Catalogue View | sectionEyebrow, headingRoman, headingItalic, introTemplate, sheetLabels.surgicalTitle, sheetLabels.surgicalSubtitle, sheetLabels.machineTitle, sheetLabels.machineSubtitle, sheetLabels.injectionTitle, sheetLabels.injectionSubtitle, sheetLabels.btlTitle, sheetLabels.btlSubtitle, hairZoneLabels.face, hairZoneLabels.upperBody, hairZoneLabels.lowerBody, hairZoneLabels.packageZone, injectableCategoryLabels.botulinumToxin, injectableCategoryLabels.filler, injectableCategoryLabels.skinBooster, injectableCategoryLabels.collagenStimulator, injectableCategoryLabels.bioRemodeling |
| **Pricing** | Pricing Discipline List | sectionEyebrow, onRequestLabel, includedLabel, arrowChar |
| **Pricing** | Consultation Policy | feeIdr, waiverConditionText, displayOn |
| **Journey** | Journey Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Journey** | Journey Hero | breadcrumbLabel, title.a, title.b, lede, heroImage, imageHue, imageLabel, chapter |
| **Journey** | Journey Stats | stats (number, label, italic) |
| **Journey** | Recovery Stays Page | slug, route, title, sections, publishStatus, seo, hero.chapter, hero.title.a, hero.title.b, hero.lede, hero.heroImage, hero.imageHue, hero.imageLabel, hero.breadcrumbLabel, topStats (number, label, italic), portfolioSection.eyebrow, portfolioSection.headingPre, portfolioSection.headingItalic, portfolioSection.headingPost, portfolioSection.lede, inclusionsSection.eyebrow, inclusionsSection.headingPre, inclusionsSection.headingItalic, inclusionsSection.headingPost, inclusionsSection.lede, inclusions (letter, title, body) |
| **Contact** | Contact Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **Contact** | Contact Hero | breadcrumbLabel, title.a, title.b, lede, heroImage, imageHue, imageLabel, chapter |
| **Contact** | Contact Enquiry Section | eyebrow, headingPre, headingItalic, intro, trustLine, directLines.sectionLabel, directLines.conciergeLabel, directLines.whatsappLabel, directLines.emailLabel, directLines.pressLabel, intentCopy (slug, eyebrow, title, lede), formLabels.nameLabel, formLabels.namePlaceholder, formLabels.emailLabel, formLabels.emailPlaceholder, formLabels.treatmentLabel, formLabels.treatmentPlaceholder, formLabels.addDetailsLabel, formLabels.countryLabel, formLabels.countryPlaceholder, formLabels.dateLabel, formLabels.datePlaceholder, formLabels.messageLabel, formLabels.messagePlaceholder, submitLabels.send, submitLabels.sending, submitLabels.sent, submitLabels.successMessage |
| **Contact** | Contact Visit Section | eyebrow, headingPre, headingItalic, body, mapImage, mapImageLabel, mapImageHue, openInMapsLabel, getDirectionsLabel, clinicHoursLabel, conciergeHoursLabel, conciergeHoursValue |
| **Contact** | Form Defaults | labels.name, labels.email, labels.phone, labels.country, labels.treatment, labels.message, placeholders.name, placeholders.email, placeholders.phone, placeholders.country, placeholders.treatment, placeholders.message, submitLabel, successMessage, errorMessage, rateLimitMessage |
| **Contact** | Email Templates | templates (id, subject, bodyMjml, locale) |
| **Contact** | Video Consult Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage |
| **About** | Blog Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage, thisIssueEyebrow, readTheEssayCtaLabel, archiveSection.eyebrow, archiveSection.headingPre, archiveSection.headingItalic, archiveSection.lede, archiveSection.filterAllLabel, archiveSection.emptyStateCopy |
| **About** | Press Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage, accreditationsSection.eyebrow, accreditationsSection.heading, accreditationsSection.lede, pressSection.eyebrow, pressSection.headingPre, pressSection.headingItalic, pressSection.lede, pressEnquiriesCtaLabel |
| **About** | Privacy Page | slug, route, title, sections, publishStatus, seo.title, seo.description, seo.ogImage, lastUpdatedDate, versionLine, readingTimeLine, introParagraph, imageLabel, tocHeading, dpo.eyebrow, dpo.headingA, dpo.headingB, dpo.lede, dpo.emailLabel, dpo.email, dpo.postLabel, dpo.addressLine1, dpo.addressLine2, dpo.addressLine3, dpo.generalContactLabel |
| **About** | Blog Post Template | byline.writtenByLabel, byline.publishedLabel, byline.lengthLabel, byline.filedUnderLabel, aboutTheAuthor.eyebrowLabel, aboutTheAuthor.readFullProfileCta, aboutTheAuthor.bookConsultationCta, moreFromTheJournal.eyebrow, moreFromTheJournal.headingPre, moreFromTheJournal.headingItalic, moreFromTheJournal.backToJournalCta |
| **About** | Not Found Page | eyebrow, headingA, headingB, lede, primaryBtnLabel, primaryBtnHref, secondaryBtnLabel, secondaryBtnHref |

---

## 2. CMS Collections — all fields

| Bucket | Item | Fields |
|---|---|---|
| **Homepage** | Press Mentions | slug, publication, headline, url, publishedDate, summary, isFeatured, sortOrder, logo |
| **Homepage** | Awards | slug, name, year, issuer, summary, sortOrder, logo |
| **Treatments** | Disciplines | slug, title, subtitle, displayCount, hue, body, chapterTitle.a, chapterTitle.b, tagline, lede, overview, heroImage, leadSurgeons, faqs (q, a), seo.title, seo.description, seo.ogImage, sortOrder |
| **Treatments** | Sub Categories | slug, parent, title, chapterTitle.a, chapterTitle.b, tagline, lede, intro, overview, leadSurgeon, sections, faqs (q, a), heroImage, seo.title, seo.description, seo.ogImage, sortOrder |
| **Treatments** | Procedures | slug, name, shortName, catalogueGroup, mainCategory, subCategory, unit, audienceTier, brand, productLine, manufacturer, fdaApproved, bodyZone, parentDiscipline, parentSubCategory, description, sections, faqs (q, a), surgeonsCredentialed, heroImage, pricing.priceIdr2025, pricing.priceIdr2026, pricing.priceIdrRangeLow, pricing.priceIdrRangeHigh, pricing.priceNotes, pricing.displayYear, featuredRank, includesImplant, detail.duration, detail.recovery, detail.included, recoveryTimeline, relatedBA, relatedProcedures, seo.title, seo.description, seo.ogImage, sortOrder |
| **Doctors** | Surgeons | slug, designation, name, commonName, suffix, spec, train, proc, credLine, yearsInPractice, group, lead, sortOrder, bio, specAreas, credentialedProcedures, availabilitySchedule (day, windowStart, windowEnd, byAppointment), languages, portrait, portraitPosition, seo.title, seo.description, seo.ogImage, hue |
| **Results** | Before/After Cases | slug, caseLabel, procedure, composite, beforeAlt, afterAlt, surgeon, tags, description, year, patientAge, recoveryDuration, isFeatured, seo.title, seo.description, seo.ogImage, sortOrder |
| **Results** | Patient Stories | slug, patientLabel, country, procedure, procedureLabel, hue, portrait, quote, body, videoUrl, year, surgeon, isFeatured, publishStatus, seo.title, seo.description, seo.ogImage, sortOrder |
| **Journey** | Journey Steps | slug, order, number, title, body, bullets (letter, text), image, imageHue, dayLabel, icon, category, sortOrder |
| **Journey** | Recovery Stays | slug, name, location, bedrooms, poolType, heroImage, imageHue, body, driveTime, nursingNote, gallery, descriptor, amenities, priceFromAudPerNight, priceFromIdrPerNight, partnerUrl, geo.lat, geo.lng, seo.title, seo.description, seo.ogImage, sortOrder |
| **Contact** | Enquiries | name, email, phone, country, status, assignedTo, treatmentInterest, treatmentInterestText, preferredDate, message, internalNotes (at, by, text), submittedAt, ip, userAgent, honeypot, sourcePage, sourceCta |
| **About** | Blog Posts | slug, title, lede, body, author, publishedAt, tags, readingTimeMinutes, heroImage, publishStatus, seo.title, seo.description, seo.ogImage, sortOrder |
| **About** | Blog Tags | slug, name, description, sortOrder |
| **About** | Authors | slug, name, role, bio, surgeonProfile, portrait |
| **About** | Privacy Sections | slug, title, paragraphs, listItems, sortOrder |
| **Users** | Users | email, avatar |
| **Media** | Media | filename, alt, category, isPlaceholder, credit, caption |
| *(internal)* | Analytics | question, askedAt, ip, country, city, timezone, userAgent |
