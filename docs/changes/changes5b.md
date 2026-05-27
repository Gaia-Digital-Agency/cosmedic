# Cosmedic CMS — 8 Main Buckets: Items & Fields

> Generated 2026-05-27. Source: `packages/cms/src/collections/` + `packages/cms/src/globals/`.
> Buckets 9 (Media Library) and 10 (Users — ungrouped) excluded as non-content buckets.
> Each row = one CMS item. Fields listed as `name (type)`.

---

| Bucket | Item | Fields |
|---|---|---|
| **Homepage** | Settings (global) | siteName (text), siteTagline (text), defaultOgImage (upload), defaultMetaDescription (textarea), audToIdrRate (number), roundIdrTo (number), contactEmail (text), clinicEnquiryEmail (text), pressEmail (text), contactPhone (text), whatsappNumber (text), addressLine1 (text), addressLine2 (text), city (text), postalCode (text), country (text), hoursMonFri (text), hoursSatSun (text), googleMapsUrl (text), socialLinks (array: platform, url), defaultLocale (select) |
| **Homepage** | Header (global) | logoLight (upload), logoDark (upload), navItems (array: label, href, activePattern, megaMenu[heading, items[label, href]]), localeSwitcher (group: enabled, labelEn, labelId) |
| **Homepage** | Footer (global) | logoLight (upload), brandTagline (text), treatmentsHeading (text), linkColumns (array: heading, items[label, href, social]), newsletter (group: label, placeholder, buttonLabel), footerBottomLines (array: text), enquirySummary (richText), addressBlock (richText), copyrightTemplate (text) |
| **Homepage** | FloatingChrome (global) | ctaPill (group: label, href, enabled), chat (group: enabled, provider, embedScript, openOnLoad) |
| **Homepage** | BrandStats (global) | stats (array: number, label, sourceNote) |
| **Homepage** | EndorsementMark (global) | endorsementLine (text), primaryLockup (upload), inverseLockup (upload), clearspaceUnit (text), minScreenWidthPx (number), minPrintMmWidth (number) |
| **Homepage** | SeoDefaults (global) | titlePattern (text), robotsTxt (textarea), sitemapBaseUrl (text), organizationSchema (json) |
| **Homepage** | HomePage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), publishStatus (select), seo (group: title, description, ogImage, canonical, noindex) |
| **Homepage** | HomeHero (global) | eyebrow (text), titleA (text), titleB (text), lede (textarea), heroImage (upload), breadcrumbLabel (text), primaryCtaLabel (text), secondaryCtaLabel (text), secondaryCtaHref (text), quickEnquiry (group: eyebrow, heading, intro, nameLabel, namePlaceholder, emailLabel, emailPlaceholder, interestLabel, interestOptionalLabel, interestPlaceholder, revealInterestLabel, submitLabel, submittingLabel, successLabel, successFine, errorFine, fineprint) |
| **Homepage** | HomeIntro (global) | eyebrow (text), pullQuoteBefore (text), pullQuoteAccent (text), pullQuoteAfter (text), col1 (textarea), col2 (textarea) |
| **Homepage** | HomeLeadMagnet (global) | coverEyebrow (text), coverLine1 (text), coverLine2 (text), coverLine3 (text), coverFoot1 (text), coverFoot2 (text), bodyEyebrow (text), headingPart1 (text), headingAccent (text), lede (textarea), formPlaceholder (text), submitLabel (text), successHeading (text), successBody (text), fineprint (text) |
| **Homepage** | HomePlace (global) | image (upload), eyebrow (text), headingPart1 (text), headingAccent (text), body (textarea), rows (array: letter, text), ctaLabel (text), ctaHref (text) |
| **Homepage** | HomeTreatmentsView (global) | eyebrow (text), headingPart1 (text), headingPart2 (text), lede (textarea) |
| **Homepage** | HomePricingView (global) | eyebrow (text), headingPart1 (text), headingPart2 (text), lede (textarea), footnote (textarea), viewAllLabel (text), viewAllHref (text) |
| **Homepage** | HomeSurgeonsView (global) | eyebrow (text), leadSurgeonEyebrow (text), leadBody (textarea), leadStat1Label (text), leadStat1Value (text), leadStat2Label (text), leadStat2Value (text), leadStat3Label (text), leadStat3Value (text), leadCtaLabel (text), associatesEyebrow (text), teamCaption (text), groupPhoto (upload), groupPhotoAlt (text) |
| **Homepage** | HomeGalleryView (global) | eyebrow (text), headingItalic (text), headingPart2 (text), lede (textarea), ctaLabel (text), ctaHref (text) |
| **Homepage** | HomeJourneyView (global) | eyebrow (text), headingPart1 (text), headingAccent (text), ctaLabel (text), ctaHref (text) |
| **Homepage** | HomeStoriesView (global) | eyebrow (text), headingItalic (text), headingPart2 (text), lede (textarea), ctaLabel (text), ctaHref (text) |
| **Treatments** | Disciplines (collection) | slug (text), title (text), subtitle (text), displayCount (text), hue (number), body (richText), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), overview (richText), heroImage (upload), leadSurgeons (relationship), faqs (array: q, a), seo (group), sortOrder (number) |
| **Treatments** | SubCategories (collection) | slug (text), parent (relationship→Disciplines), title (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), intro (richText), overview (richText), leadSurgeon (relationship→Surgeons), heroImage (upload), seo (group), sortOrder (number) |
| **Treatments** | Procedures (collection) | slug (text), name (text), shortName (text), catalogueGroup (select), mainCategory (text), subCategory (text), unit (text), audienceTier (select), brand (text), productLine (text), manufacturer (text), fdaApproved (checkbox), bodyZone (select), parentDiscipline (relationship), parentSubCategory (relationship), description (richText), sections (array: anchorId, t, body), faqs (array: q, a), surgeonsCredentialed (relationship), heroImage (upload), priceIdr2025 (number), priceIdr2026 (number), priceIdrRangeLow (number), priceIdrRangeHigh (number), priceNotes (text), displayYear (select), featuredRank (number), includesImplant (checkbox), duration (text), recovery (text), included (array), recoveryTimeline (relationship), relatedBA (relationship), relatedProcedures (relationship), seo (group), sortOrder (number) |
| **Treatments** | TreatmentsPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), publishStatus (select), seo (group) |
| **Treatments** | TreatmentsHero (global) | chapter (text), titleA (text), titleB (text), lede (textarea), heroImage (upload), imageHue (number), imageLabel (text), breadcrumbLabel (text) |
| **Treatments** | TreatmentsIndexSection (global) | eyebrow (text), heading (text), lede (textarea), readMoreLabel (text), readMoreArrow (text) |
| **Treatments** | TreatmentsStats (global) | stats (array: number, label) |
| **Treatments** | DisciplineDetailTemplate (global) | toc (group: onThisPageLabel, overviewLabel, subCategoriesLabel, proceduresLabel, faqsLabel), overview (group: heading), chooseAFocus (group: heading, bodyTemplate, availableLabel, comingLabel), procedures (group: heading, intro), faqs (group: heading), related (group: eyebrow, headingItalic, headingRoman, ledeTemplate) |
| **Treatments** | SubCategoryDetailTemplate (global) | chapterSeparator (text), toc (group: onThisPageLabel, overviewLabel, treatmentsLabel, faqsLabel), takeAStep (group: eyebrow, videoConsultLabel, estimateLabel, whatsappLabel, replyLine), overview (group: heading), treatments (group: heading, intro), faqs (group: heading) |
| **Doctors** | Surgeons (collection) | slug (text), name (text), commonName (text), title (text), suffix (text), spec (text), train (text), proc (text), credLine (text), yearsInPractice (number), hue (number), group (select), lead (checkbox), bio (richText), specAreas (array: value), portrait (upload), portraitPosition (text), availability (array: day, windowStart, windowEnd, byAppointment), languages (array: code), credentialedProcedures (relationship), seo (group), sortOrder (number) |
| **Doctors** | SurgeonsPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), publishStatus (select), seo (group) |
| **Doctors** | SurgeonsHero (global) | chapter (text), titleA (text), titleB (text), lede (textarea), heroImage (upload), imageHue (number), imageLabel (text), breadcrumbLabel (text) |
| **Doctors** | SurgeonsLeadView (global) | sectionEyebrow (text), blockEyebrow (text), statLabelTrained (text), statLabelSpecialty (text), statLabelDistinction (text), ctaLabel (text) |
| **Doctors** | SurgeonsPlasticView (global) | eyebrow (text), headingA (text), headingItalic (text), headingB (text), lede (textarea) |
| **Doctors** | SurgeonsAestheticView (global) | eyebrow (text), headingA (text), headingItalic (text), headingB (text), lede (textarea) |
| **Doctors** | SurgeonDetailTemplate (global) | heroLeadLabel (text), heroSpecialistLabel (text), heroCtaConsultLabel (text), heroCtaTreatmentsLabelTemplate (text), heroCtaTreatmentsLabelFallback (text), breadcrumbHomeLabel (text), breadcrumbSurgeonsLabel (text), statLabelYears (text), statLabelDistinction (text), statLabelSpecialty (text), biographyEyebrow (text), sidebarLabelSpecialism (text), sidebarLabelCredentials (text), sidebarLabelLanguages (text), sidebarLabelAvailability (text), languagesFallback (text), availabilityFallback (text), secondaryBioParagraph (textarea), specialtyEyebrow (text), specialtyHeadingTemplate (textarea), trainingEyebrow (text), trainingRowLabels (array: value), trainingRowRights (array: value), trainingRowPracticeMid (text), facultyEyebrow (text), facultyHeading (group: pre, italic, post) |
| **Results** | BeforeAfterCases (collection) | slug (text), caseLabel (text), procedure (relationship), composite (upload), beforeAlt (text), afterAlt (text), surgeon (relationship), tags (array: value), description (richText), year (number), patientAge (number), recoveryDuration (text), isFeatured (checkbox), seo (group), sortOrder (number) |
| **Results** | Stories (collection) | slug (text), patientLabel (text), country (text), procedure (relationship), procedureLabel (text), hue (number), portrait (upload), quote (text), body (richText), videoUrl (text), year (number), surgeon (relationship), isFeatured (checkbox), publishStatus (select), seo (group), sortOrder (number) |
| **Results** | ResultsPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), publishStatus (select), seo (group) |
| **Results** | GalleryPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), imageHue (number), imageLabel (text), breadcrumbLabel (text), filterBarLabel (text), countFormat (text), publishStatus (select), seo (group) |
| **Results** | StoriesPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), imageHue (number), imageLabel (text), breadcrumbLabel (text), publishStatus (select), seo (group) |
| **Results** | ResultsHero (global) | chapter (text), titleA (text), titleB (text), lede (textarea), heroImage (upload), imageHue (number), imageLabel (text), breadcrumbLabel (text) |
| **Results** | ResultsFeaturedCasesView (global) | eyebrow (text), headingPre (text), headingItalic (text), lede (textarea), filterBarLabel (text), countFormat (text) |
| **Results** | ResultsStoriesView (global) | eyebrow (text), headingPre (text), headingItalic (text), lede (textarea) |
| **Results** | LibraryCta (global) | eyebrow (text), headingPre (text), headingItalic (text), body (textarea), buttonLabel (text), buttonHref (text) |
| **Results** | ShareCta (global) | eyebrow (text), headingPre (text), headingItalic (text), headingPost (text), body (textarea), buttonLabel (text), buttonHref (text) |
| **Pricing** | SurgicalItems (collection) | slug (text), name (text), shortName (text), catalogueGroup (text), mainCategory (text), subCategory (text), unit (text), audienceTier (select), featuredRank (number), includesImplant (checkbox), parentDiscipline (relationship), description (richText), sections (array: anchorId, t, body), faqs (array: q, a), heroImage (upload), priceIdr2025 (number), priceIdr2026 (number), priceIdrRangeLow (number), priceIdrRangeHigh (number), priceNotes (text), displayYear (select), duration (text), recovery (text), included (array), seo (group), sortOrder (number) |
| **Pricing** | MachineItems (collection) | slug (text), name (text), shortName (text), catalogueGroup (text), mainCategory (text), subCategory (text), unit (text), audienceTier (select), parentDiscipline (relationship), description (richText), sections (array: anchorId, t, body), faqs (array: q, a), heroImage (upload), priceIdr2025 (number), priceIdr2026 (number), priceIdrRangeLow (number), priceIdrRangeHigh (number), priceNotes (text), displayYear (select), duration (text), recovery (text), included (array), seo (group), sortOrder (number) |
| **Pricing** | InjectionItems (collection) | slug (text), name (text), shortName (text), catalogueGroup (text), mainCategory (text), subCategory (text), unit (text), audienceTier (select), brand (text), productLine (text), manufacturer (text), fdaApproved (checkbox), parentDiscipline (relationship), description (richText), sections (array: anchorId, t, body), faqs (array: q, a), heroImage (upload), priceIdr2025 (number), priceIdr2026 (number), priceIdrRangeLow (number), priceIdrRangeHigh (number), priceNotes (text), displayYear (select), duration (text), recovery (text), included (array), seo (group), sortOrder (number) |
| **Pricing** | BTLItems (collection) | slug (text), name (text), shortName (text), catalogueGroup (text), mainCategory (text), subCategory (text), unit (text), audienceTier (select), bodyZone (select), parentDiscipline (relationship), description (richText), sections (array: anchorId, t, body), faqs (array: q, a), heroImage (upload), priceIdr2025 (number), priceIdr2026 (number), priceIdrRangeLow (number), priceIdrRangeHigh (number), priceNotes (text), displayYear (select), duration (text), recovery (text), included (array), seo (group), sortOrder (number) |
| **Pricing** | ClinicCatalogueItems (collection) | slug (text), name (text), shortName (text), catalogueGroup (select), mainCategory (text), subCategory (text), unit (text), audienceTier (select), brand (text), productLine (text), manufacturer (text), fdaApproved (checkbox), bodyZone (select), parentDiscipline (relationship), description (richText), sections (array: anchorId, t, body), faqs (array: q, a), heroImage (upload), priceIdr2025 (number), priceIdr2026 (number), priceIdrRangeLow (number), priceIdrRangeHigh (number), priceNotes (text), displayYear (select), featuredRank (number), includesImplant (checkbox), duration (text), recovery (text), included (array), seo (group), sortOrder (number) |
| **Pricing** | PricingPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), publishStatus (select), seo (group) |
| **Pricing** | PricingHero (global) | chapter (text), titleA (text), titleB (text), lede (textarea), heroImage (upload), imageHue (number), imageLabel (text), breadcrumbLabel (text) |
| **Pricing** | PricingOverview (global) | eyebrow (text), headingPart1 (text), headingPart2 (text), body (textarea) |
| **Pricing** | PricingFootnote (global) | text (textarea) |
| **Pricing** | PricingInsurance (global) | eyebrow (text), headingRoman (text), headingItalic (text), body (textarea) |
| **Pricing** | PricingPayment (global) | eyebrow (text), headingRoman (text), headingItalic (text), termsText (textarea) |
| **Pricing** | PricingDisciplineListView (global) | sectionEyebrow (text), onRequestLabel (text), includedLabel (text), arrowChar (text) |
| **Pricing** | PricingCatalogueView (global) | sectionEyebrow (text), headingRoman (text), headingItalic (text), introTemplate (textarea), sheetLabels (group: surgicalTitle, surgicalSubtitle, machineTitle, machineSubtitle, injectionTitle, injectionSubtitle, btlTitle, btlSubtitle), hairZoneLabels (group: face, upperBody, lowerBody, packageZone, other), injectableCategoryLabels (group: botulinumToxin, filler, skinBooster, collagenStimulator, bioRemodeling, threadLift, mesotherapy, hgh, other) |
| **Pricing** | ConsultationPolicy (global) | feeIdr (number), waiverConditionText (textarea), displayOn (select: hasMany) |
| **Journey** | JourneySteps (collection) | slug (text), order (number), number (text), title (text), body (richText), bullets (array: letter, text), image (upload), imageHue (number), dayLabel (text), icon (upload), category (select), sortOrder (number) |
| **Journey** | RecoveryStays (collection) | slug (text), name (text), location (text), bedrooms (text), poolType (text), heroImage (upload), imageHue (number), body (textarea), driveTime (text), nursingNote (text), gallery (array: image), descriptor (richText), amenities (array: value), priceFromAudPerNight (number), priceFromIdrPerNight (number), partnerUrl (text), geo (group: lat, lng), seo (group), sortOrder (number) |
| **Journey** | JourneyPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), publishStatus (select), seo (group) |
| **Journey** | RecoveryStaysPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), hero (group: chapter, titleA, titleB, lede, heroImage), topStats (array: number, label), portfolioSection (group: eyebrow, heading, lede), inclusionsSection (group: eyebrow, heading, lede), inclusions (array: icon, text), publishStatus (select), seo (group) |
| **Journey** | JourneyHero (global) | chapter (text), titleA (text), titleB (text), lede (textarea), heroImage (upload), imageHue (number), imageLabel (text), breadcrumbLabel (text) |
| **Journey** | JourneyStats (global) | stats (array: number, label, italic) |
| **Contact** | Enquiries (collection) | name (text), email (text), phone (text), country (text), treatmentInterest (relationship), treatmentInterestText (text), preferredDate (date), message (textarea), sourcePage (text), sourceCta (text), status (select), assignedTo (relationship), internalNotes (array: at, by, text), submittedAt (date, readOnly), ip (text, readOnly), userAgent (text, readOnly), honeypot (text, hidden) |
| **Contact** | Analytics (collection) | question (textarea, readOnly), askedAt (date, readOnly), ip (text, readOnly), country (text, readOnly), city (text, readOnly), timezone (text, readOnly), userAgent (text, readOnly) |
| **Contact** | ContactPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), publishStatus (select), seo (group) |
| **Contact** | VideoConsultPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), publishStatus (select), seo (group) |
| **Contact** | ContactHero (global) | chapter (text), titleA (text), titleB (text), lede (textarea), heroImage (upload), imageHue (number), imageLabel (text), breadcrumbLabel (text) |
| **Contact** | ContactEnquirySection (global) | eyebrow (text), headingPre (text), headingItalic (text), intro (textarea), directLines (group: sectionLabel, conciergeLabel, whatsappLabel, emailLabel, pressLabel), trustLine (textarea), intentCopy (array: slug, eyebrow, title, lede), formLabels (group: nameLabel, namePlaceholder, emailLabel, emailPlaceholder, treatmentLabel, treatmentPlaceholder, addDetailsLabel, countryLabel, countryPlaceholder, dateLabel, datePlaceholder, messageLabel, messagePlaceholder), submitLabels (group: send, sending, sent, successMessage) |
| **Contact** | ContactVisitSection (global) | eyebrow (text), headingPre (text), headingItalic (text), body (textarea), mapImage (upload), mapImageLabel (text), mapImageHue (number), openInMapsLabel (text), getDirectionsLabel (text), clinicHoursLabel (text), conciergeHoursLabel (text), conciergeHoursValue (textarea) |
| **Contact** | FormDefaults (global) | labels (group: name, email, phone, country, treatment, message), placeholders (group: name, email, phone, country, treatment, message), submitLabel (text), successMessage (textarea), errorMessage (textarea), rateLimitMessage (textarea) |
| **Contact** | EmailTemplates (global) | templates (array: id, subject, bodyMjml, locale) |
| **About** | BlogPosts (collection) | slug (text), title (text), lede (textarea), body (richText), heroImage (upload), author (relationship→Authors), publishedAt (date), tags (relationship→BlogTags), readingTimeMinutes (number), publishStatus (select), seo (group), sortOrder (number) |
| **About** | BlogTags (collection) | slug (text), name (text), description (textarea), sortOrder (number) |
| **About** | Authors (collection) | slug (text), name (text), role (text), bio (richText), portrait (upload), surgeonProfile (relationship→Surgeons) |
| **About** | PressMentions (collection) | slug (text), publication (text), logo (upload), headline (text), url (text), publishedDate (date), summary (textarea), isFeatured (checkbox), sortOrder (number) |
| **About** | Awards (collection) | slug (text), name (text), year (number), issuer (text), logo (upload), summary (textarea), sortOrder (number) |
| **About** | PrivacySections (collection) | slug (text), title (text), paragraphs (array: text), listItems (array: text), sortOrder (number) |
| **About** | BlogPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), thisIssueEyebrow (text), readTheEssayCtaLabel (text), archiveSection (group: eyebrow, heading, lede), publishStatus (select), seo (group) |
| **About** | PressPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), accreditationsSection (group: eyebrow, heading, lede), pressSection (group: eyebrow, heading, lede), pressEnquiriesCtaLabel (text), publishStatus (select), seo (group) |
| **About** | PrivacyPage (page global) | title (text), slug (text), route (text), chapterTitleA (text), chapterTitleB (text), tagline (text), lede (textarea), heroImage (upload), sections (blocks: 15 types), lastUpdatedDate (text), versionLine (text), readingTimeLine (text), introParagraph (textarea), imageLabel (text), tocHeading (text), dpo (group: name, email, address), publishStatus (select), seo (group) |
| **About** | NotFoundPage (page global) | eyebrow (text), headingA (text), headingB (text), lede (textarea), primaryBtnLabel (text), primaryBtnHref (text), secondaryBtnLabel (text), secondaryBtnHref (text) |
| **About** | BlogPostTemplate (global) | byline (group: writtenByLabel, publishedLabel, lengthLabel, filedUnderLabel), aboutTheAuthor (group: eyebrowLabel, readFullProfileCta, bookConsultationCta), moreFromTheJournal (group: eyebrow, headingPre, headingItalic, backToJournalCta) |

---

## Counts

| Bucket | Collections | Globals (incl. page globals) | Total items |
|---|---|---|---|
| Homepage | 0 | 18 | 18 |
| Treatments | 3 | 6 | 9 |
| Doctors | 1 | 6 | 7 |
| Results | 2 | 8 | 10 |
| Pricing | 5 | 9 | 14 |
| Journey | 2 | 4 | 6 |
| Contact | 2 | 7 | 9 |
| About | 6 | 5 | 11 |
| **Total** | **21** | **63** | **84** |

---

## Shared: Page Blocks (15 types, available in every page global `sections` field)

| Block type | Fields |
|---|---|
| richText | eyebrow (text), heading (text), body (richText) |
| imageGrid | heading (text), columns (number), images (array: src upload, alt text, caption text) |
| ctaBand | heading (text), lede (textarea), primaryLabel (text), primaryHref (text), secondaryLabel (text), secondaryHref (text) |
| stats | heading (text), items (array: number text, label text, sourceNote text) |
| faqAccordion | heading (text), items (array: q text, a richText) |
| procedureList | heading (text), filterDiscipline (relationship), filterSubCategory (relationship), layout (select), limit (number) |
| surgeonList | heading (text), filterGroup (select), layout (select) |
| baGrid | heading (text), filterProcedure (relationship), limit (number), featuredOnly (checkbox) |
| testimonialList | heading (text), count (number), featuredOnly (checkbox) |
| recoveryStayList | heading (text), limit (number) |
| pressMentionList | heading (text), limit (number) |
| contactForm | heading (text), lede (textarea), sourceCta (text) |
| journeyStepList | heading (text), filterCategory (select) |
| externalEmbed | heading (text), iframeUrl (text), html (textarea) |
| notes | kind (select), heading (text), body (richText) |
