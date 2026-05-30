# CMS Iteration 4 — Simplification Pass 3
**Date:** 2026-05-29 · **Status:** EXECUTED ✅
**History:** Pass 1 (changes4) · Pass 2 (changes8) · Pass 3 (changes9/change09) · **Pass 4 = this**
**From:** 36 items · ~240 visible fields
**Result:** 26 items · ~130 visible fields (−10 items, −110 fields, −46%)
**Logged server:** `/var/www/cosmedic/docs/cms/`

---

## Naming levels (established 2026-05-29)

| Level | Definition | Example |
|-------|-----------|---------|
| **Bucket** | Top-level sidebar nav group | Treatments |
| **Item** | A single collection or global within a bucket | Surgeons (collection), Surgeons Hero (global) |
| **Field** | Named input within an item | name, heroImage, tagline |
| **Detail** | Sub-field inside a group or nested field | title.a, quickEnquiry.nameLabel |
| **Data** | Actual records in a collection | Each row: dr. Suka, dr. Astri … |

---

## Operational benchmark
> **< 1 minute** to update any field that has data = admin territory. Over 1 min = developer territory → hide.
> **New rule:** If an item contains an image field (`upload` type) → item must stay visible.

---

## Group A — Items hidden entirely (🟢 `admin.hidden: true`, reversible)

| Bucket | Item (global/collection) | Reason | Fields removed |
|--------|--------------------------|--------|:---:|
| Treatments | Treatments Index | Heading chrome, 1 field | −1 |
| Treatments | Pricing Overview | Heading chrome, no image | −2 |
| Treatments | Consultation Policy | Rarely changed, no image | −2 |
| Results | CTAs / Library CTA | Dev button-label content, no image | −11 |
| Contact | Contact Enquiry Section | Chrome headings, no image | −2 |
| About | Press Page (global) | Chrome headings, no image | −3 |
| About | Authors | 0 rows in DB | −2 |
| About | Privacy Sections | Legal text, dev-managed, no image | −3 |

---

## Group B — Fields hidden within visible items (🟢 `admin.hidden: true`, reversible)

### HOMEPAGE bucket

**Home Hero** (Global)
| Hidden field / detail | Reason |
|----------------------|--------|
| `eyebrow` | All eyebrows hidden (rule) |
| `lede` | Dev-authored brand copy |
| `secondaryCtaHref` | Dev URL |
| `quickEnquiry.eyebrow` | Eyebrow rule |
| `quickEnquiry.heading` | Dev copy |
| `quickEnquiry.intro` | Dev copy |
| `quickEnquiry.nameLabel` | Form label, dev-managed |
| `quickEnquiry.namePlaceholder` | Form label |
| `quickEnquiry.emailLabel` | Form label |
| `quickEnquiry.emailPlaceholder` | Form label |
| `quickEnquiry.interestLabel` | Form label |
| `quickEnquiry.interestOptionalLabel` | Form label |
| `quickEnquiry.interestPlaceholder` | Form label |
| `quickEnquiry.revealInterestLabel` | Form label |
| `quickEnquiry.submitLabel` | Form label |
| `quickEnquiry.submittingLabel` | Form label |
| `quickEnquiry.successLabel` | Form label |
| `quickEnquiry.successFine` | Form label |
| `quickEnquiry.errorFine` | Form label |
| `quickEnquiry.fineprint` | Form label |
Keeps: `title.a` · `title.b` · `primaryCtaLabel` · `secondaryCtaLabel` · `heroImage`

**HomeSurgeonsView** (Global — "Surgeons" in admin)
| Hidden | Reason |
|--------|--------|
| `eyebrow` | Eyebrow rule |
Keeps: `teamCaption` · `leadBody` · `leadCtaLabel` · `groupPhoto` · `groupPhotoAlt`

**Home Lead Magnet** (Global — kept, has `coverImage`)
| Hidden / Merged | Reason |
|----------------|--------|
| `coverEyebrow` | Eyebrow rule |
| `bodyEyebrow` | Eyebrow rule |
| `successHeading` | Edge-case copy, dev-managed |
| `successBody` | Edge-case copy |
| `fineprint` | Edge-case copy |
| `coverLine1` + `coverLine2` + `coverLine3` → **`coverTitle`** | C3 merge (see Group C) |
| `coverFoot1` + `coverFoot2` → **`coverFooter`** | C4 merge (see Group C) |
Keeps: `coverImage` · `coverTitle` · `coverFooter` · `heading.a` · `heading.b` · `lede` · `formPlaceholder` · `submitLabel`

**Home Place** (Global — kept, has `image`)
| Hidden | Reason |
|--------|--------|
| `eyebrow` | Eyebrow rule |
| `rows` (array) | Dev-managed stat chips |
| `ctaHref` | Dev URL |
Keeps: `heading.a` · `heading.b` · `body` · `ctaLabel` · `image`

**Settings** (Global)
| Hidden | Reason |
|--------|--------|
| `siteTagline` | Dev-managed |
| `audToIdrRate` | Dev-managed rate |
| `roundIdrTo` | Dev-managed |
| `clinicEnquiryEmail` | Dev-managed |
| `pressEmail` | Dev-managed |
| `postalCode` | Rarely changes |
| `country` | Rarely changes |
| `defaultLocale` | Dev-managed |
| `defaultOgImage` | Dev-managed |
| `defaultMetaDescription` | Dev-managed |
Keeps: `siteName` · `contactEmail` · `contactPhone` · `whatsappNumber` · `addressLine1` · `addressLine2` · `city` · `hoursMonFri` · `hoursSatSun` · `googleMapsUrl` · `socialLinks`

**Header** (Global — kept, has `logoLight` + `logoDark`)
| Hidden | Reason |
|--------|--------|
| `navItems` (array) | Dev-managed, too complex (matches URL structure) |
| `localeSwitcher` (group) | Dev-managed |
Keeps: `logoLight` · `logoDark`

**Footer** (Global)
| Hidden | Reason |
|--------|--------|
| `treatmentsHeading` | Dev-managed label |
| `linkColumns` (array) | Dev-managed nav links |
| `newsletter.buttonLabel` | Dev-managed |
| `footerBottomLines` (array) | Copyright, rarely changes |
| `enquirySummary` | Dev-managed |
| `addressBlock` | Dev-managed |
| `copyrightTemplate` | Deprecated |
Keeps: `brandTagline` · `newsletter.label` · `newsletter.placeholder` · `logoLight`

---

### TREATMENTS bucket

**Treatments Hero** (Global — kept, has `heroImage`)
| Hidden | Reason |
|--------|--------|
| `chapter` | Eyebrow/chapter label |
| `lede` | Dev-authored copy |
| `imageHue` | Dev colour token |
| `imageLabel` | Dev caption |
| `breadcrumbLabel` | Dev routing label |
Keeps: `titleA` · `titleB` · `heroImage`

**Pricing Hero** (Global — kept, has `heroImage`)
Same as Treatments Hero pattern.
Keeps: `titleA` · `titleB` · `heroImage`

**Disciplines** (Collection)
| Hidden | Reason |
|--------|--------|
| `lede` | Dev-authored (rendered but > 1 min) |
| `body` (richText) | 3–10 min, dev content |
| `overview` (richText) | 5–20 min, dev content |
| `faqs` (array) | Complex, dev content |
Keeps: `title` · `subtitle` · `tagline` · `heroImage`

**Sub Categories** (Collection)
| Hidden | Reason |
|--------|--------|
| `chapterTitle` (group: a + b) | Dev heading chrome |
| `intro` (richText) | 3–10 min, dev content |
| `overview` (richText) | 5–20 min, dev content |
| `sections` (array) | 10–30 min, dev content |
| `faqs` (array) | Complex, dev content |
Keeps: `title` · `tagline` · `lede` · `leadSurgeon` · `heroImage`

**Procedures** (Collection)
| Hidden | Reason |
|--------|--------|
| `description` (richText) | 3–10 min, dev content |
| `detail.included` (array) | Dev-managed list |
| `faqs` (array) | Complex, dev content |
Keeps: `name` · `shortName` · `pricing.priceIdr2026` · `pricing.priceNotes` · `detail.duration` · `detail.recovery` · `featuredRank` · `heroImage`

---

### EXPERTS bucket

**Surgeons Hero** (Global — kept, has `heroImage`)
| Hidden | Reason |
|--------|--------|
| `chapter` | Eyebrow rule |
| `breadcrumbLabel` | Dev routing |
| `lede` | Dev copy |
| `imageHue` | Dev colour token |
| `imageLabel` | Dev caption |
Keeps: `title.a` · `title.b` · `heroImage`

**Surgeons** (Collection)
| Hidden | Reason |
|--------|--------|
| `suffix` | Post-nominals, dev-formatted |
| `train` | Dev-authored bio fragment |
| `proc` | Dev-authored bio fragment |
| `bio` (richText) | 5–20 min, dev-authored |
| `specAreas` (array) | Dev-managed chips |
| `availabilitySchedule` (array) | Dev-managed |
| `languages` (array) | Dev-managed |
| `sortOrder` | Dev ordering |
Keeps: `designation` · `name` · `commonName` · `spec` · `group` · `lead` · `portrait`
*(C1 merge of designation+name deferred to Group C)*

---

### RESULTS bucket

**Results Hero** (Global — kept, has `heroImage`)
| Hidden | Reason |
|--------|--------|
| `chapter` | Eyebrow rule |
| `lede` | Dev copy |
| `imageHue` | Dev colour token |
| `imageLabel` | Dev caption |
| `breadcrumbLabel` | Dev routing |
Keeps: `title.a` · `title.b` · `heroImage`

**Before/After Cases** (Collection — kept, has `composite`)
| Hidden | Reason |
|--------|--------|
| `description` (richText) | 3–10 min, dev content |
Keeps: `caseLabel` · `composite` · `beforeAlt` · `afterAlt` · `year` · `patientAge` · `recoveryDuration` · `isFeatured`

---

### CONTACT bucket

**Contact Hero** (Global — kept, has `heroImage`)
Same as hero pattern.
| Hidden | `chapter` · `lede` · `imageHue` · `imageLabel` · `breadcrumbLabel` |
Keeps: `title.a` · `title.b` · `heroImage`

**Contact Visit Section** (Global — kept, has `mapImage`)
| Hidden | Reason |
|--------|--------|
| `eyebrow` | Eyebrow rule |
| `body` | Dev copy |
| `mapImageLabel` | Dev caption |
| `mapImageHue` | Dev colour token |
| `openInMapsLabel` | Rarely changed label |
| `getDirectionsLabel` | Rarely changed label |
| `clinicHoursLabel` | Rarely changed label |
| `conciergeHoursLabel` | Rarely changed label |
Keeps: `headingPre` · `headingItalic` · `mapImage` · `conciergeHoursValue`

---

## Group C — Field merges (🔴 DB migration — deferred, separate approval)

| ID | Item | Before | After | DB change needed |
|----|------|--------|-------|-----------------|
| C1 | Surgeons | `designation` + `name` | `name` = "dr. I Made Suka Adnyana" | Prepend designation to name · drop designation column |
| C2 | 6 Hero globals | `title.a` + `title.b` (or `titleA`+`titleB`) | `title` textarea (newline-split) | Merge columns per hero table · drop old pair |
| C3 | Lead Magnet | `coverLine1` + `coverLine2` + `coverLine3` | `coverTitle` | Concat 3 → 1 column |
| C4 | Lead Magnet | `coverFoot1` + `coverFoot2` | `coverFooter` | Concat 2 → 1 column |

---

## Result — Bucket / Item / Field summary

| Bucket | Items before | Items after | Fields before | Fields after |
|--------|:---:|:---:|:---:|:---:|
| Homepage | 9 | 8 | ~88 | ~46 |
| Treatments | 8 | 5 | ~49 | ~21 |
| Experts | 2 | 2 | ~23 | ~8 |
| Results | 5 | 3 | ~25 | ~20 |
| Journey | 3 | 3 | ~14 | ~12 |
| Contact | 4 | 3 | ~27 | ~15 |
| About | 4 | 1 | ~12 | ~6 |
| Users | 1 | 1 | 2 | 2 |
| **Total** | **36** | **26** | **~240** | **~130** |

---

## Visual: Globals CMS card color (separate task — no DB/frontend change)
Recolor global sidebar cards: Dark Brown background · White title text
File: `packages/cms/src/app/globals.css` or custom CSS path
