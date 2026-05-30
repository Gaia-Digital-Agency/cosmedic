# Cosmedic CMS — Visible Field Map (Admin View)

> **Purpose:** What an editor sees in the CMS today.
> **Last updated:** 2026-05-30 (Hero merge pass + section title fixes)
> **State:** 15 visible globals · all editorial fields exposed · structural fields hidden
> Legend: [T] title/heading · [P] paragraph · [I] image · [N] number · [A] array · [S] select · [C] CTA/link

---

## Naming levels
Bucket > Card > Section > Field
Rule: Lede, Para, Image, Title, Body, Arrays always visible. Slugs, hrefs, hues, breadcrumbs, chapter eyebrows hidden.

---

## 1. HOMEPAGE (6 visible cards)

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

### Settings (settings)
Site Name [T] · AUD→IDR Rate [N] · Round IDR To [N] · Lock Rate Manually · liveRateWidget [ui]
General Email [T] · Concierge Phone [T] · WhatsApp Number [T]
Address Line 1 [T] · Address Line 2 [T] · City [T]
Hours Mon–Fri [T] · Hours Saturday [T] · Google Maps URL [C]
socialLinks [A: platform, url]

---

## 2. PROCEDURES (3 visible cards)

### Hero (treatments-hero)
**Treatments:** titleA [T] · titleB [T] · lede [P] · heroImage [I]
**Pricing:**
- Hero: titleA [T] · titleB [T] · lede [P] · heroImage [I]
- Insurance: eyebrow [T] · headingRoman [T] · headingItalic [T] · body [P]
- Payment: eyebrow [T] · headingRoman [T] · headingItalic [T] · termsText [P]
- Consultation: feeIdr [N] · waiverConditionText [P]

### Discipline Template (discipline-detail-template)
**Table of Contents:** onThisPage · overview · subCategories · procedures · faqs labels [T×5]
**Overview:** heading [T]
**Choose a Focus:** heading [T] · bodyTemplate [P] · availableLabel [C] · comingLabel [C]
**Procedures:** heading [T] · intro [P]
**FAQs:** heading [T]
**Related:** eyebrow [T] · headingItalic [T] · headingRoman [T] · ledeTemplate [P]

### Catalogue View (pricing-catalogue-view)
sectionEyebrow [T] · headingRoman [T] · headingItalic [T] · introTemplate [P]
**Sheet Titles:** surgicalTitle/Subtitle · machineTitle/Subtitle · injectionTitle/Subtitle · btlTitle/Subtitle [T×8]
**Hair Zone Labels:** face · upperBody · lowerBody · packageZone · other [T×5]
**Injectable Category Labels:** 9 category labels [T×9]

---

## 3. EXPERTS (1 visible card — collections always visible)

### Hero (surgeons-hero)
titleA [T] · titleB [T] · lede [P] · heroImage [I] · imageLabel [T]
**Sections:**
- Lead Surgeon: sectionEyebrow [T] · blockEyebrow [T] · statLabelTrained/Specialty/Distinction [T×3] · ctaLabel [C]
- Plastic Surgery: lede [P] · eyebrow [T] · headingA [T] · headingB [T] · headingItalic [T]
- Aesthetic Medicine: lede [P] · eyebrow [T] · headingA [T] · headingB [T] · headingItalic [T]

### Detail Template (surgeon-detail-template)
Hero labels: heroLeadLabel · heroSpecialistLabel · heroCtaConsultLabel · heroCtaTreatmentsLabelFallback [T×4]
Stat labels: statLabelYears · statLabelDistinction · statLabelSpecialty [T×3]
Sidebar labels: sidebarLabelSpecialism · Credentials · Languages · Availability [T×4]
languagesFallback [T] · availabilityFallback [T]
facultyEyebrow [T] · **Faculty Heading:** pre [T] · italic [T] · post [T]
specialtyEyebrow [T] · specialtyHeadingTemplate [P]
trainingEyebrow [T] · trainingRowLabels [A: value×5] · trainingRowRights [A: value×4]
biographyEyebrow [T] · secondaryBioParagraph [P]

### Surgeons (collection)
name [T] · commonName [T] · spec [T] · train [T] · proc [T] · bio [P] · specAreas [A] · group [S] · lead · portrait [I]

---

## 4. RESULTS (1 visible card — collections always visible)

### Hero (results-hero)
titleA [T] · titleB [T] · lede [P] · heroImage [I] · imageLabel [T] · imageHue

### Before/After Cases (collection)
caseLabel [T] · composite [I] · beforeAlt [T] · afterAlt [T] · description [P] · recoveryDuration [T] · isFeatured

### Patient Stories (collection)
patientLabel [T] · country [T] · procedureLabel [T] · portrait [I] · quote [T] · body [P] · isFeatured

---

## 5. JOURNEY (1 visible card — collections always visible)

### Hero (journey-hero)
titleA [T] · titleB [T] · lede [P] · heroImage [I] · imageLabel [T]

### Page (recovery-stays-page)
**Hero:** title.a [T] · title.b [T] · lede [P] · heroImage [I]
topStats [A: number, label]
**Portfolio Section:** eyebrow [T] · headingItalic [T] · headingPost [T] · lede [P]

### Journey Steps (collection)
title [T] · body [P] · bullets [A: text] · image [I]

### Recovery Stays — Villas (collection)
name [T] · location [T] · body [P] · heroImage [I] · priceFromIdrPerNight [N] · amenities [A] · partnerUrl [C]

---

## 6. CONTACT (1 visible card — collections always visible)

### Hero (contact-hero)
titleA [T] · titleB [T] · lede [P] · heroImage [I] · imageLabel [T]
**Visit Section:** headingPre [T] · headingItalic [T] · body [P] · mapImage [I] · conciergeHoursValue [P]

### Enquiries (collection)
name [T] · email [T] · phone [T] · country [T] · status [S] · message [P]

---

## 7. PUBLICATIONS (1 visible card — collections always visible)

### Blog Post Template (blog-post-template)
**Byline Labels:** writtenByLabel · publishedLabel · lengthLabel · filedUnderLabel [T×4]
**About the Author:** eyebrowLabel · readFullProfileCta · bookConsultationCta [T×3]
**More from the Journal:** eyebrow · headingPre · headingItalic · backToJournalCta [T×4]

### Blog Posts (collection)
title [T] · lede [P] · body [P] · heroImage [I] · author [S] · publishedAt · publishStatus [S]

### Press Mentions (collection)
publication [T] · headline [T] · summary [P] · isFeatured · logo [I]

### Awards (collection)
name [T] · year [N] · issuer [T] · summary [P] · logo [I]

---

## 8. MEDIA LIBRARY

### Media (collection)
filename · alt [T] · caption [T] · isPlaceholder

---

## 9. USERS

### Users (collection)
email [T] · avatar [I]

---

## Field count history

| Pass | Date | Visible cards | Notes |
|---|---|:---:|------|
| Baseline | 2026-05-23 | 81 | All globals visible |
| Simplification 1–4 | 2026-05-29 | 26 | Over-hidden |
| Visibility sweep | 2026-05-30 | ~72 | All editorial fields exposed |
| Bucket cleanup | 2026-05-30 | ~40 | Strategic re-hiding |
| Hero merge pass | 2026-05-30 | **15** | Sections absorbed into Heroes |

> 15 globals visible · ~320 editorial fields accessible · structural/technical fields hidden
