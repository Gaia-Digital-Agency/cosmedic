# Cosmedic CMS — Visible Field Map (Admin View)

> **What an editor sees in the CMS today.**
> Last updated: 2026-05-30 (session 2) — verified against source files.
> **16 visible globals · 12 visible collections · all editorial fields exposed**
> Legend: [T] title/heading · [P] paragraph · [I] image · [N] number · [A] array · [S] select · [C] CTA

---

## Naming levels
Bucket > Card > Section > Field

**Rule:** Lede, Para, Image, Title, Body, Arrays always visible.
Slugs, hrefs, hues, breadcrumbs, chapter eyebrows hidden.

---

## 1. HOMEPAGE — 6 visible globals

### Hero (home-hero)
title.a [T] · title.b [T] · lede [P] · primaryCtaLabel [C] · secondaryCtaLabel [C] · heroImage [I]

### Sections (home-treatments-view)
**Treatments:** lede [P] · eyebrow [T] · heading.a [T] · heading.b [T]
**Pricing:** lede [P] · eyebrow [T] · heading.a [T] · heading.b [T] · footnote [P] · viewAllLabel [C]
**Gallery:** lede [P] · eyebrow [T] · heading.a [T] · heading.b [T] · ctaLabel [C]
**Stories:** lede [P] · eyebrow [T] · heading.a [T] · heading.b [T] · ctaLabel [C]

### Surgeons (home-surgeons-view)
**Team Heading:** caption [T]
**Body & CTA:** body [P] · ctaLabel [C]
**Photo:** photo [I] · photoAlt [T]

### Lead Magnet (home-lead-magnet)
**Cover:** image [I] · title [P] · footer [T]
**Heading:** a [T] · b [T]
lede [P] · formPlaceholder [T] · submitLabel [C]

### Place (home-place)
**Heading:** a [T] · b [T]
body [P] · ctaLabel [C] · image [I] · rows [A: letter, text]

### Settings
siteName [T] · audToIdrRate [N] · rateLockedManually · roundIdrTo [N]
contactEmail [T] · contactPhone [T] · whatsappNumber [T]
addressLine1 [T] · addressLine2 [T] · city [T]
hoursMonFri [T] · hoursSatSun [T] · googleMapsUrl [C]
socialLinks [A: platform, url]

---

## 2. PROCEDURES — 3 visible globals

### Hero (treatments-hero)
**Treatments section:**
titleA [T] · titleB [T] · lede [P] · heroImage [I]

**Pricing section:**
titleA [T] · titleB [T] · lede [P] · heroImage [I]
*Insurance:* eyebrow [T] · headingRoman [T] · headingItalic [T] · body [P]
*Payment:* eyebrow [T] · headingRoman [T] · headingItalic [T] · termsText [P]
*Consultation:* feeIdr [N] · waiverConditionText [P]

### Discipline Template (discipline-detail-template)
**Table of Contents:** onThisPageLabel [T] · overviewLabel [T] · subCategoriesLabel [T] · proceduresLabel [T] · faqsLabel [T]
**Overview:** heading [T]
**Choose a Focus:** heading [T] · bodyTemplate [P] · availableLabel [C] · comingLabel [C]
**Procedures:** heading [T] · intro [P]
**FAQs:** heading [T]
**Related:** eyebrow [T] · headingItalic [T] · headingRoman [T] · ledeTemplate [P]

### Catalogue View (pricing-catalogue-view)
sectionEyebrow [T] · headingRoman [T] · headingItalic [T] · introTemplate [P]
sheetLabels [A: surgicalTitle/Subtitle, machineTitle/Subtitle, injectionTitle/Subtitle, btlTitle/Subtitle]
hairZoneLabels [A: face, upperBody, lowerBody, packageZone, other]
injectableCategoryLabels [A: 9 category labels]

### Collections in Procedures bucket
**Disciplines:** title [T] · subtitle [T] · body [P] · tagline [T] · lede [P] · overview [P] · heroImage [I] · sections [A: t, body] · faqs [A: q, a]
**Sub-Categories:** title [T] · tagline [T] · lede [P] · intro [P] · overview [P] · leadSurgeon · sections [A: t, body] · faqs [A: q, a] · heroImage [I]
**Procedures:** name [T] · shortName [T] · description [P] · sections [A: t, body] · faqs [A: q, a] · heroImage [I] · pricing.priceIdr2026 [N] · pricing.priceNotes [T] · detail.duration [T] · detail.recovery [T] · detail.included [A] · featuredRank [N]

---

## 3. EXPERTS — 2 visible globals

### Hero (surgeons-hero)
titleA [T] · titleB [T] · lede [P] · heroImage [I] · imageLabel [T]
**Sections:**
*Lead Surgeon:* sectionEyebrow [T] · blockEyebrow [T] · statLabelTrained [T] · statLabelSpecialty [T] · statLabelDistinction [T] · ctaLabel [C]
*Plastic Surgery:* lede [P] · eyebrow [T] · headingA [T] · headingB [T] · headingItalic [T]
*Aesthetic Medicine:* lede [P] · eyebrow [T] · headingA [T] · headingB [T] · headingItalic [T]

### Detail Template (surgeon-detail-template)
heroLeadLabel [T] · heroSpecialistLabel [T] · heroCtaConsultLabel [C] · heroCtaTreatmentsLabelFallback [C]
statLabelYears [T] · statLabelDistinction [T] · statLabelSpecialty [T]
sidebarLabelSpecialism [T] · sidebarLabelCredentials [T] · sidebarLabelLanguages [T] · sidebarLabelAvailability [T]
languagesFallback [T] · availabilityFallback [T]
facultyEyebrow [T] · **Faculty Heading:** pre [T] · italic [T] · post [T]
specialtyEyebrow [T] · specialtyHeadingTemplate [P]
trainingEyebrow [T] · trainingRowLabels [A: value ×5] · trainingRowRights [A: value ×4] · trainingRowPracticeMid (readonly)
biographyEyebrow [T] · secondaryBioParagraph [P]

### Collection in Experts bucket
**Surgeons:** name [T] · commonName [T] · spec [T] · train [T] · proc [T] · group [S] · lead · bio [P] · specAreas [A] · portrait [I] · languages [A]

---

## 4. RESULTS — 1 visible global

### Hero (results-hero)
titleA [T] · titleB [T] · lede [P] · heroImage [I] · imageLabel [T]

### Collections in Results bucket
**Before/After Cases:** caseLabel [T] · composite [I] · beforeAlt [T] · afterAlt [T] · description [P] · year [N] · recoveryDuration [T] · isFeatured
**Patient Stories:** patientLabel [T] · country [T] · procedureLabel [T] · portrait [I] · quote [T] · body [P] · videoUrl [T] · isFeatured

---

## 5. JOURNEY — 2 visible globals

### Hero (journey-hero)
titleA [T] · titleB [T] · lede [P] · heroImage [I] · imageHue [N] · imageLabel [T] · chapter [T]

### Page (recovery-stays-page)
**Hero:** title.a [T] · title.b [T] · lede [P] · heroImage [I] · imageLabel [T]
topStats [A: number, label]
**Portfolio Section:** eyebrow [T] · headingItalic [T] · headingPost [T] · lede [P]

### Collections in Journey bucket
**Recovery Stays — Villas:** name [T] · location [T] · bedrooms [T] · poolType [T] · heroImage [I] · body [P] · driveTime [T] · nursingNote [T] · amenities [A] · priceFromIdrPerNight [N] · partnerUrl [C]

---

## 6. CONTACT — 1 visible global

### Hero (contact-hero)
titleA [T] · titleB [T] · lede [P] · heroImage [I] · imageLabel [T]
**Visit Section:** headingPre [T] · headingItalic [T] · body [P] · mapImage [I] · conciergeHoursValue [P]

### Collection in Contact bucket
**Enquiries:** name [T] · email [T] · phone [T] · country [T] · preferredDate [T] · message [P] · status [S] · assignedTo · internalNotes [A: at, by, text]

---

## 7. PUBLICATIONS — 1 visible global

### Blog Post Template (blog-post-template)
**Byline Labels:** writtenByLabel [T] · publishedLabel [T] · lengthLabel [T] · filedUnderLabel [T]
**About the Author:** eyebrowLabel [T] · readFullProfileCta [C] · bookConsultationCta [C]
**More from the Journal:** eyebrow [T] · headingPre [T] · headingItalic [T] · backToJournalCta [C]

### Collections in Publications bucket
**Blog Posts:** title [T] · lede [P] · body [P] · author [S] · publishedAt · tags · heroImage [I] · publishStatus [S]
**Press Mentions:** publication [T] · headline [T] · url [C] · publishedDate · summary [P] · isFeatured · logo [I]
**Awards:** name [T] · year [N] · issuer [T] · summary [P] · logo [I]
**Privacy Sections:** title [T] · paragraphs [A] · listItems [A]

---

## 8. MEDIA LIBRARY

**Media:** filename · alt [T] · caption [T] · category

---

## Visible count summary

| Bucket | Visible globals | Visible collections |
|---|:---:|:---:|
| Homepage | 6 | 0 |
| Procedures | 3 | 3 |
| Experts | 2 | 1 |
| Results | 1 | 2 |
| Journey | 2 | 1 |
| Contact | 1 | 1 |
| Publications | 1 | 4 |
| Media Library | 0 | 1 |
| **Total** | **16** | **13** |
