# Cosmedic — App Map

> Single reference combining: web sitemap · CMS globals · CMS collections.
> Generated 2026-05-27. Source: router.ts · changes6-globals.md · changes5-collections.md.

---

## 1. Web Sitemap — 52 live routes

| # | URL | Page Title | Bucket |
|---|---|---|---|
| 1 | `/` | Homepage | Homepage |
| 2 | `/treatments` | Treatments | Treatments |
| 3 | `/treatments/surgical` | Plastic Surgery | Treatments |
| 4 | `/treatments/surgical/face` | Face | Treatments |
| 5 | `/treatments/surgical/body` | Body | Treatments |
| 6 | `/treatments/surgical/breast` | Breast | Treatments |
| 7 | `/treatments/reconstructive` | Reconstructive Surgery | Treatments |
| 8 | `/treatments/reconstructive/breast` | Breast Reconstruction | Treatments |
| 9 | `/treatments/reconstructive/trauma` | Trauma & Scar | Treatments |
| 10 | `/treatments/reconstructive/craniofacial` | Craniofacial | Treatments |
| 11 | `/treatments/non-surgical` | Non-surgical | Treatments |
| 12 | `/treatments/non-surgical/injectables` | Injectables | Treatments |
| 13 | `/treatments/non-surgical/laser` | Laser & Resurfacing | Treatments |
| 14 | `/treatments/non-surgical/skin` | Skin Health | Treatments |
| 15 | `/treatments/hair` | Hair Restoration | Treatments |
| 16 | `/treatments/hair/fue` | FUE Surgical | Treatments |
| 17 | `/treatments/hair/therapy` | Follicle Therapy | Treatments |
| 18 | `/treatments/dental` | Dental Aesthetics | Treatments |
| 19 | `/treatments/dental/veneers` | Veneers | Treatments |
| 20 | `/treatments/dental/alignment` | Alignment | Treatments |
| 21 | `/treatments/dental/whitening` | Whitening | Treatments |
| 22 | `/treatments/weight-loss` | Weight Loss | Treatments |
| 23 | `/treatments/weight-loss/glp-1` | Medical | Treatments |
| 24 | `/treatments/weight-loss/endoscopic` | Endoscopic | Treatments |
| 25 | `/treatments/weight-loss/bariatric` | Bariatric Surgery | Treatments |
| 26 | `/surgeons` | Surgeons | Doctors |
| 27 | `/surgeons/suka` | I Made Suka Adnyana | Doctors |
| 28 | `/surgeons/astri` | Astrinita Lestari Suyata | Doctors |
| 29 | `/surgeons/indra` | Ida Bagus Agung Indra Pramana | Doctors |
| 30 | `/surgeons/wara` | Gede Wara Samsarga | Doctors |
| 31 | `/surgeons/sissy` | Sissy Yunita Surya | Doctors |
| 32 | `/surgeons/rosa` | Rosalina Silvia Dewi | Doctors |
| 33 | `/surgeons/risma` | I Gusti Ayu Risma Pramita | Doctors |
| 34 | `/surgeons/theresia` | Theresia Indri Indrawati Setiadi | Doctors |
| 35 | `/results` | Results | Results |
| 36 | `/gallery` | Gallery | Results |
| 37 | `/stories` | Stories | Results |
| 38 | `/pricing` | Pricing | Pricing |
| 39 | `/journey` | Journey | Journey |
| 40 | `/recovery-stays` | Recovery Stays | Journey |
| 41 | `/press` | Press | About |
| 42 | `/contact` | Contact | Contact |
| 43 | `/video-consult` | Video Consult | Contact |
| 44 | `/blog` | Blog | About |
| 45 | `/blog/the-quiet-rhinoplasty` | The quiet rhinoplasty | About |
| 46 | `/blog/before-you-fly` | Before you fly: a six-week pre-op letter. | About |
| 47 | `/blog/the-villa-protocol` | The villa protocol. | About |
| 48 | `/blog/fillers-restraint` | On fillers, restraint, and the long view. | About |
| 49 | `/blog/achsi-what-it-means` | What ACHSI accreditation actually means. | About |
| 50 | `/blog/crani-bali` | Craniomaxillofacial surgery in Bali, in 2026. | About |
| 51 | `/blog/dental-veneers-honesty` | Veneers: what we say no to. | About |
| 52 | `/privacy` | Privacy | About |

**301 legacy redirects (28)** — flat `/treatments/{slug}` and prefixed `/treatments/surgical-face` etc. → nested equivalents. Not counted as live routes.
**404** — returned for any unrecognised path.

---

## 2. CMS Globals — 63 globals across 8 buckets

### Shared Page Blocks (15 types — available in every `sections` field)

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

### Globals Table

**Page global base (always first):** `slug, route, title, sections, publishStatus, seo`
**Hero standard order:** `breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter`

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

## 3. CMS Collections — 21 collections across 8 buckets + Users + Media

| Bucket | Item | Fields |
|---|---|---|
| **Homepage** | Main | slug, route, title, sections, publishStatus, seo |
| **Homepage** | Hero | breadcrumbLabel, eyebrow, title, lede, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref, quickEnquiry, heroImage |
| **Homepage** | Intro | eyebrow, pullQuoteBefore, pullQuoteAccent, pullQuoteAfter, col1, col2 |
| **Homepage** | Treatments View | eyebrow, heading, lede |
| **Homepage** | Surgeons View | eyebrow, leadSurgeonEyebrow, leadBody, leadStat1Label, leadStat1Value, leadStat2Label, leadStat2Value, leadStat3Label, leadStat3Value, leadCtaLabel, associatesEyebrow, teamCaption, groupPhoto, groupPhotoAlt |
| **Homepage** | Gallery View | eyebrow, heading, lede, ctaLabel, ctaHref |
| **Homepage** | Stories View | eyebrow, heading, lede, ctaLabel, ctaHref |
| **Homepage** | Pricing View | eyebrow, heading, lede, footnote, viewAllLabel, viewAllHref |
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
| **Treatments** | Main | slug, route, title, chapterTitle, tagline, lede, heroImage, sections, publishStatus, seo |
| **Treatments** | Hero | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **Treatments** | Index | eyebrow, heading, lede, readMoreLabel, readMoreArrow |
| **Treatments** | Stats | stats |
| **Treatments** | Discipline Template | toc, overview, chooseAFocus, procedures, faqs, related |
| **Treatments** | Sub-Category Template | chapterSeparator, toc, takeAStep, overview, treatments, faqs |
| **Treatments** | Categories | slug, title, subtitle, displayCount, tagline, lede, chapterTitle, body, overview, faqs, leadSurgeons, heroImage, seo, sortOrder, hue |
| **Treatments** | Sub-Categories | slug, parent, title, chapterTitle, tagline, lede, intro, overview, leadSurgeon, sections, faqs, heroImage, seo, sortOrder |
| **Treatments** | Procedures | slug, name, shortName, catalogueGroup, mainCategory, subCategory, unit, audienceTier, brand, productLine, manufacturer, fdaApproved, bodyZone, parentDiscipline, parentSubCategory, description, sections, faqs, surgeonsCredentialed, pricing, featuredRank, includesImplant, detail, recoveryTimeline, relatedBA, relatedProcedures, heroImage, seo, sortOrder |
| **Doctors** | Main | slug, route, title, sections, publishStatus, seo |
| **Doctors** | Hero | breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter |
| **Doctors** | Surgeons | slug, designation, name, commonName, suffix, spec, train, proc, credLine, yearsInPractice, group, lead, sortOrder, bio, specAreas, credentialedProcedures, availabilitySchedule, languages, portrait, portraitPosition, seo, hue |
| **Doctors** | Lead View | sectionEyebrow, blockEyebrow, statLabelTrained, statLabelSpecialty, statLabelDistinction, ctaLabel |
| **Doctors** | Plastic Surgery View | lede, eyebrow, heading, headingItalic |
| **Doctors** | Aesthetic Medicine View | lede, eyebrow, heading, headingItalic |
| **Doctors** | Detail Template | breadcrumbHomeLabel, breadcrumbSurgeonsLabel, heroLeadLabel, heroSpecialistLabel, heroCtaConsultLabel, heroCtaTreatmentsLabelTemplate, heroCtaTreatmentsLabelFallback, statLabelYears, statLabelDistinction, statLabelSpecialty, sidebarLabelSpecialism, sidebarLabelCredentials, sidebarLabelLanguages, sidebarLabelAvailability, languagesFallback, availabilityFallback, facultyEyebrow, facultyHeading, specialtyEyebrow, specialtyHeadingTemplate, trainingEyebrow, trainingRowLabels, trainingRowRights, trainingRowPracticeMid, biographyEyebrow, secondaryBioParagraph |
| **Results** | Main | slug, route, title, sections, publishStatus, seo |
| **Results** | Hero | breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter |
| **Results** | Library CTA | eyebrow, headingPre, headingItalic, body, buttonLabel, buttonHref |
| **Results** | Share CTA | eyebrow, headingPre, headingItalic, headingPost, body, buttonLabel, buttonHref |
| **Results** | Gallery | breadcrumbLabel, filterBarLabel, countFormat, imageLabel, imageHue |
| **Results** | Stories | breadcrumbLabel, imageLabel, imageHue |
| **Results** | Before-After Cases | slug, caseLabel, sortOrder, procedure, surgeon, year, patientAge, recoveryDuration, tags, description, isFeatured, composite, beforeAlt, afterAlt, seo |
| **Results** | Patient Stories | slug, patientLabel, country, sortOrder, procedure, surgeon, procedureLabel, year, quote, body, videoUrl, isFeatured, publishStatus, portrait, hue, seo |
| **Results** | Featured Cases View | eyebrow, headingPre, headingItalic, lede, filterBarLabel, countFormat |
| **Results** | Stories View | eyebrow, headingPre, headingItalic, lede |
| **Pricing** | Main | slug, route, title, sections, publishStatus, seo |
| **Pricing** | Hero | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **Pricing** | Overview | eyebrow, headingPart1, headingPart2, body |
| **Pricing** | Footnote | text |
| **Pricing** | Insurance | eyebrow, headingRoman, headingItalic, body |
| **Pricing** | Payment | eyebrow, headingRoman, headingItalic, termsText |
| **Pricing** | Catalogue View | sectionEyebrow, headingRoman, headingItalic, introTemplate, sheetLabels, hairZoneLabels, injectableCategoryLabels |
| **Pricing** | Discipline List View | sectionEyebrow, onRequestLabel, includedLabel, arrowChar |
| **Pricing** | Consultation | feeIdr, waiverConditionText, displayOn |
| **Journey** | Main | slug, route, title, sections, publishStatus, seo |
| **Journey** | Hero | breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter |
| **Journey** | Steps | slug, order, number, sortOrder, title, body, bullets, image, imageHue, dayLabel, icon, category |
| **Journey** | Stats | stats |
| **Journey** | Recovery Stays | hero, topStats, portfolioSection, inclusionsSection, inclusions |
| **Journey** | Villas | slug, name, location, sortOrder, bedrooms, poolType, driveTime, nursingNote, body, amenities, priceFromIdrPerNight, priceFromAudPerNight, partnerUrl, heroImage, imageHue, gallery, geo, seo, descriptor |
| **Contact** | Main | slug, route, title, sections, publishStatus, seo |
| **Contact** | Hero | breadcrumbLabel, title, lede, heroImage, imageHue, imageLabel, chapter |
| **Contact** | Enquiry Section | eyebrow, headingPre, headingItalic, intro, trustLine, directLines, intentCopy, formLabels, submitLabels |
| **Contact** | Visit Section | eyebrow, headingPre, headingItalic, body, openInMapsLabel, getDirectionsLabel, clinicHoursLabel, conciergeHoursLabel, conciergeHoursValue, mapImage, mapImageLabel, mapImageHue |
| **Contact** | Form | labels, placeholders, submitLabel, successMessage, errorMessage, rateLimitMessage |
| **Contact** | Email | templates |
| **Contact** | Inbox | name, email, phone, country, status, assignedTo, treatmentInterest, treatmentInterestText, preferredDate, message, internalNotes, sourcePage, sourceCta, submittedAt, ip, userAgent, honeypot |
| **Contact** | Video Consult | slug, route, title, chapterTitle, tagline, lede, heroImage, sections, publishStatus, seo |
| **About** | Blog | slug, route, title, sections, publishStatus, seo, thisIssueEyebrow, readTheEssayCtaLabel, archiveSection |
| **About** | Press | slug, route, title, sections, publishStatus, seo, accreditationsSection, pressSection, pressEnquiriesCtaLabel |
| **About** | Privacy | slug, route, title, sections, publishStatus, seo, lastUpdatedDate, versionLine, readingTimeLine, introParagraph, imageLabel, tocHeading, dpo |
| **About** | Blog Post Template | byline, aboutTheAuthor, moreFromTheJournal |
| **About** | Blog Posts | slug, title, lede, body, author, publishedAt, tags, readingTimeMinutes, publishStatus, heroImage, seo, sortOrder |
| **About** | Blog Tags | slug, name, description, sortOrder |
| **About** | Authors | slug, name, role, bio, surgeonProfile, portrait |
| **About** | Press Mentions | slug, publication, headline, url, publishedDate, summary, isFeatured, sortOrder, logo |
| **About** | Awards | slug, name, year, issuer, summary, sortOrder, logo |
| **About** | Privacy Sections | slug, title, paragraphs, listItems, sortOrder |
| **Users** | Users | email |
| **Media** | Media | filename, alt, category, isPlaceholder, credit, caption |
