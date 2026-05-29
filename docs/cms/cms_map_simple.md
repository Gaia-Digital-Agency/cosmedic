# Cosmedic CMS — Visible Field Map (Admin View)

> **Purpose**: What an editor sees in the CMS sidebar today.
> **Last updated:** 2026-05-29 (iteration 4 complete — Groups A, B, C1, C3, C4 applied)
> **State:** 26 visible items · ~132 visible fields · 88% of all fields hidden
> Legend: [T] title/heading · [P] paragraph · [I] image · [C] link/button · [N] number · [S] select

---

## Naming levels
Bucket > Item > Field > Detail > Data
Operational benchmark: < 1 min to update any visible field with data.
Rule: if an item has an image field (upload type) the item must stay visible.

---

## 1. HOMEPAGE bucket — 9 items (7 globals + 2 collections)

### Home Hero (Global)
title.a [T], title.b [T], primaryCtaLabel [C], secondaryCtaLabel [C], heroImage [I]

### Surgeons View (Global)
teamCaption [T], leadBody [P], leadCtaLabel [C], groupPhoto [I], groupPhotoAlt [T]

### Lead Magnet (Global)
coverImage [I], coverTitle [P] *(3 lines: roman / italic / roman)*, coverFooter [T] *(Brand · Year)*, heading.a [T], heading.b [T], lede [P], formPlaceholder [T], submitLabel [C]

### Home Place (Global)
heading.a [T], heading.b [T], body [P], ctaLabel [C], image [I]

### Settings (Global)
siteName [T], **audToIdrRate [N]**, **roundIdrTo [N]**, contactEmail [T], contactPhone [T], whatsappNumber [T], addressLine1 [T], addressLine2 [T], city [T], hoursMonFri [T], hoursSatSun [T], googleMapsUrl [C], socialLinks (platform + url)

### Header (Global)
logoLight [I], logoDark [I]

### Footer (Global)
brandTagline [T], newsletter.label [T], newsletter.placeholder [T], logoLight [I]

### Press Mentions (Collection)
publication [T], headline [T], summary [P], publishedDate [T], isFeatured, logo [I]

### Awards (Collection)
name [T], year [N], issuer [T], summary [P], logo [I]

---

## 2. TREATMENTS bucket — 5 items (2 globals + 3 collections)

### Treatments Hero (Global)
titleA [T], titleB [T], heroImage [I]

### Pricing Hero (Global)
titleA [T], titleB [T], heroImage [I]

### Disciplines (Collection)
title [T], subtitle [T], tagline [T], heroImage [I]

### Sub Categories (Collection)
title [T], tagline [T], lede [P], leadSurgeon [S], heroImage [I]

### Procedures (Collection)
name [T], shortName [T], pricing.priceIdr2026 [N], pricing.priceNotes [T], detail.duration [T], detail.recovery [T], featuredRank [N], heroImage [I]

---

## 3. EXPERTS bucket — 2 items (1 global + 1 collection)

### Surgeons Hero (Global)
title.a [T], title.b [T], heroImage [I]

### Surgeons (Collection) — C1 merged: designation+name → name
name [T] *(includes designation e.g. dr. I Made Suka Adnyana)*, commonName [T], spec [T], group [S], lead [checkbox], portrait [I]

---

## 4. RESULTS bucket — 3 items (1 global + 2 collections)

### Results Hero (Global)
title.a [T], title.b [T], heroImage [I]

### Before/After Cases (Collection)
caseLabel [T], composite [I], beforeAlt [T], afterAlt [T], year [N], patientAge [N], recoveryDuration [T], isFeatured

### Patient Stories (Collection)
patientLabel [T], country [T], procedureLabel [T], portrait [I], quote [T], body [P], videoUrl [C], isFeatured

---

## 5. JOURNEY bucket — 3 items (2 globals + 1 collection)

### Journey Hero (Global)
title.a [T], title.b [T], heroImage [I]

### Recovery Stays — Page (Global)
hero.title.a [T], hero.title.b [T], hero.heroImage [I]

### Recovery Stays — Villas (Collection)
name [T], location [T], body [P], heroImage [I], priceFromIdrPerNight [N], amenities [T], partnerUrl [C]

---

## 6. CONTACT bucket — 3 items (2 globals + 1 collection)

### Contact Hero (Global)
title.a [T], title.b [T], heroImage [I]

### Contact Visit Section (Global) — kept: has mapImage
headingPre [T], headingItalic [T], mapImage [I], conciergeHoursValue [P]

### Enquiries (Collection)
name [T], email [T], phone [T], country [T], status [S], message [P], internalNotes [P]

---

## 7. ABOUT bucket — 1 item (1 collection)

### Blog Posts (Collection)
title [T], body [P], heroImage [I], author [S], publishedAt, publishStatus [S]

---

## 8. USERS — 1 item

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
| **Pass 4** | **2026-05-29** | **26** | **~132** | −10 items, −30 fields |
| Fix | 2026-05-29 | 26 | **~134** | audToIdrRate + roundIdrTo restored |

---

## Hidden items (accessible to admin role via direct URL)

| Bucket | Item | Reason |
|--------|------|--------|
| Homepage | Home Page | Page-global routing/SEO only |
| Homepage | Home Intro | UI chrome |
| Homepage | Home Treatments View | UI chrome |
| Homepage | Home Gallery View | UI chrome |
| Homepage | Home Stories View | UI chrome |
| Homepage | Home Pricing View | UI chrome |
| Homepage | Home Journey View | UI chrome |
| Homepage | Brand Stats | Rarely changed |
| Homepage | Floating Chrome | Rarely changed |
| Homepage | Endorsement Mark | Brand governance |
| Homepage | SEO Defaults | Technical |
| Treatments | Treatments Page | Page-global |
| Treatments | Treatments Index | Chrome — 1 heading field |
| Treatments | Treatments Stats | UI chrome |
| Treatments | Discipline Detail Template | UI chrome |
| Treatments | Sub-Category Detail Template | UI chrome |
| Treatments | Pricing Page | Page-global |
| Treatments | Pricing Overview | Chrome — 2 fields |
| Treatments | Pricing Footnote | Rarely changed |
| Treatments | Pricing Insurance | Rarely changed |
| Treatments | Pricing Payment | Rarely changed |
| Treatments | Consultation Policy | Call clinic to change |
| Treatments | Pricing Catalogue View | UI chrome |
| Treatments | Pricing Discipline List | UI chrome |
| Experts | Surgeons Page | Page-global |
| Experts | Surgeons Lead View | UI chrome |
| Experts | Surgeons Plastic View | UI chrome |
| Experts | Surgeons Aesthetic View | UI chrome |
| Experts | Surgeon Detail Template | UI chrome |
| Results | Results Page | Page-global |
| Results | CTAs / Library CTA | Dev button-label content |
| Results | Share CTA | Merged into CTAs |
| Results | Gallery Page | Page-global |
| Results | Stories Page | Page-global |
| Results | Featured Cases View | UI chrome |
| Results | Stories View | UI chrome |
| Journey | Journey Page | Page-global |
| Journey | Journey Stats | UI chrome |
| Journey | Journey Steps | Rarely changed |
| Contact | Contact Page | Page-global |
| Contact | Contact Enquiry Section | Chrome headings |
| Contact | Form Defaults | Technical |
| Contact | Email Templates | Technical |
| Contact | Video Consult Page | Page-global |
| About | Press Page (global) | Chrome headings |
| About | Blog Page | Page-global |
| About | Blog Post Template | UI chrome |
| About | Not Found Page | Admin-only |
| About | Privacy Page | Page-global |
| About | Blog Tags | 0 rows in DB |
| About | Authors | 0 rows in DB |
| About | Privacy Sections | Legal — dev-managed |

