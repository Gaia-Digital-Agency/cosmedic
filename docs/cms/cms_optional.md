# CMS — Fields Visible in UI but Hidden in CMS

> These fields ARE rendered on the public web frontend but are currently hidden from editors in the CMS.
> This is the conflict list — editors cannot update content that the site displays.
> Source: frontend audit 2026-05-27 against `packages/web/src`.
> Rule: if it renders in the UI, it must be visible in the CMS.

| Bucket | Item | Field |
|---|---|---|
| Homepage | HomeHero | eyebrow |
| Homepage | HomeHero | lede |
| Homepage | HomeHero | secondaryCtaHref |
| Homepage | HomeHero | quickEnquiry.eyebrow |
| Homepage | HomeHero | quickEnquiry.heading |
| Homepage | HomeHero | quickEnquiry.intro |
| Homepage | HomeHero | quickEnquiry.nameLabel |
| Homepage | HomeHero | quickEnquiry.namePlaceholder |
| Homepage | HomeHero | quickEnquiry.emailLabel |
| Homepage | HomeHero | quickEnquiry.emailPlaceholder |
| Homepage | HomeHero | quickEnquiry.interestLabel |
| Homepage | HomeHero | quickEnquiry.interestOptionalLabel |
| Homepage | HomeHero | quickEnquiry.interestPlaceholder |
| Homepage | HomeHero | quickEnquiry.revealInterestLabel |
| Homepage | HomeHero | quickEnquiry.submitLabel |
| Homepage | HomeHero | quickEnquiry.submittingLabel |
| Homepage | HomeHero | quickEnquiry.successLabel |
| Homepage | HomeHero | quickEnquiry.successFine |
| Homepage | HomeHero | quickEnquiry.errorFine |
| Homepage | HomeHero | quickEnquiry.fineprint |
| Homepage | HomeIntro | eyebrow |
| Homepage | HomeIntro | pullQuoteBefore |
| Homepage | HomeIntro | pullQuoteAccent |
| Homepage | HomeIntro | pullQuoteAfter |
| Homepage | HomeTreatmentsView | eyebrow |
| Homepage | HomeTreatmentsView | lede |
| Homepage | HomeSurgeonsView | eyebrow |
| Homepage | HomeSurgeonsView | leadSurgeonEyebrow |
| Homepage | HomeSurgeonsView | leadBody |
| Homepage | HomeSurgeonsView | leadStat1Label |
| Homepage | HomeSurgeonsView | leadStat1Value |
| Homepage | HomeSurgeonsView | leadStat2Label |
| Homepage | HomeSurgeonsView | leadStat2Value |
| Homepage | HomeSurgeonsView | leadStat3Label |
| Homepage | HomeSurgeonsView | leadStat3Value |
| Homepage | HomeSurgeonsView | associatesEyebrow |
| Homepage | HomeSurgeonsView | groupPhotoAlt |
| Homepage | HomeGalleryView | eyebrow |
| Homepage | HomeGalleryView | lede |
| Homepage | HomeGalleryView | ctaHref |
| Homepage | HomeStoriesView | eyebrow |
| Homepage | HomeStoriesView | lede |
| Homepage | HomeStoriesView | ctaHref |
| Homepage | HomePricingView | eyebrow |
| Homepage | HomePricingView | lede |
| Homepage | HomePricingView | footnote |
| Homepage | HomePricingView | viewAllHref |
| Homepage | HomeJourneyView | eyebrow |
| Homepage | HomeJourneyView | ctaHref |
| Homepage | HomeLeadMagnet | coverEyebrow |
| Homepage | HomeLeadMagnet | coverFoot1 |
| Homepage | HomeLeadMagnet | coverFoot2 |
| Homepage | HomeLeadMagnet | bodyEyebrow |
| Homepage | HomeLeadMagnet | lede |
| Homepage | HomeLeadMagnet | formPlaceholder |
| Homepage | HomeLeadMagnet | submitLabel |
| Homepage | HomeLeadMagnet | successHeading |
| Homepage | HomeLeadMagnet | successBody |
| Homepage | HomeLeadMagnet | fineprint |
| Treatments | Disciplines | lede |
| Treatments | SubCategories | chapterTitle *(group)* |
| Treatments | SubCategories | leadSurgeon |
| Treatments | SubCategories | sections |
| Treatments | SubCategories | lede |
| Treatments | SubCategories | intro |
| Treatments | Procedures | featuredRank |
| Treatments | Procedures | pricing.priceIdr2025 ¹ |
| Doctors | Surgeons | commonName |
| Doctors | Surgeons | suffix |
| Doctors | Surgeons | spec |
| Doctors | Surgeons | train |
| Doctors | Surgeons | proc |
| Doctors | Surgeons | group |
| Doctors | Surgeons | lead |
| Doctors | Surgeons | availabilitySchedule |
| Doctors | Surgeons | languages |
| Journey | JourneySteps | order |
| Journey | JourneySteps | bullets |
| Journey | RecoveryStays | bedrooms |
| Journey | RecoveryStays | poolType |
| Journey | RecoveryStays | driveTime |
| Journey | RecoveryStays | nursingNote ² |
| Blog | Authors | surgeonProfile |
| Press | PressMentions | url |

---

¹ Rendered as fallback (`priceIdr2026 ?? priceIdr2025`). Currently kept hidden by user decision — revisit if 2025 prices still active.
² Rendered as right-most meta cell on villa cards. Verified from field description; not grep-confirmed.

---

## change09 — Hidden by simplification (2026-05-29)

> Items and fields hidden from editor-role sidebar as part of CMS simplification pass 2.
> All remain accessible to admin-role users.
> Risk: 🟢 = `admin.hidden: true` only · 🟡 = global merged/restructured · 🔴 = field merge (migration required)

### Entire sidebar items hidden (🟢) — all done ✅

| Bucket | Item | Reason |
|---|---|---|
| Homepage | Home Intro | UI chrome — pull-quote fragments, brand-authored |
| Homepage | Home Treatments View | UI chrome — heading only |
| Homepage | Home Surgeons View *(restored as "Surgeons")* | Re-exposed for banner editing |
| Homepage | Home Gallery View | UI chrome — heading only |
| Homepage | Home Stories View | UI chrome — heading only |
| Homepage | Home Pricing View | UI chrome — heading only |
| Homepage | Home Journey View | UI chrome — heading only |
| Homepage | Brand Stats | Rarely changed; unlock for admin if needed |
| Homepage | Floating Chrome | CTA pill label — rarely changed |
| Treatments | Treatments Stats | UI chrome |
| Treatments | Pricing Footnote | Rarely changed small print |
| Treatments | Pricing Insurance | Rarely changed |
| Treatments | Pricing Payment | Rarely changed |
| Treatments | Pricing Catalogue View | Pure UI chrome |
| Experts | Surgeons Lead View | UI chrome label only |
| Experts | Surgeons Plastic View | UI chrome — section heading only |
| Experts | Surgeons Aesthetic View | UI chrome — section heading only |
| Results | Gallery Page | title only — page-global |
| Results | Stories Page | title only — page-global |
| Results | Featured Cases View | UI chrome |
| Results | Stories View | UI chrome |
| Journey | Journey Stats | UI chrome |
| Journey | Journey Steps | UI chrome / rarely changed |
| Contact | Form Defaults | Technical — error/success messages |
| Contact | Email Templates | Technical — MJML templates |
| Contact | Video Consult Page | Page-global — routing/SEO only |
| About | Blog Page | Page-global — routing/SEO only |
| About | Blog Tags | Inline on Blog Posts; 0 rows in DB |
| About | Privacy Page | Page-global — routing/SEO only |
| About | Not Found Page | Admin-only |
| About | Authors | 0 rows in DB |

### Page globals hidden (🟢) — all done ✅

| Removed from sidebar | Note |
|---|---|
| Home Page | Routing/SEO — admin access retained |
| Treatments Page | Routing/SEO — admin access retained |
| Surgeons Page | Routing/SEO — admin access retained |
| Results Page | Routing/SEO — admin access retained |
| Gallery Page | Routing/SEO — admin access retained |
| Stories Page | Routing/SEO — admin access retained |
| Pricing Page | Routing/SEO — admin access retained |
| Journey Page | Routing/SEO — admin access retained |
| Contact Page | Routing/SEO — admin access retained |
| Video Consult Page | Routing/SEO — admin access retained |
| Blog Page | Routing/SEO — admin access retained |
| Privacy Page | Routing/SEO — admin access retained |

### Fields hidden within visible items (🟢) — done ✅

| Bucket | Item | Fields hidden |
|---|---|---|
| Journey | Recovery Stays — Page | portfolioSection.headingPre, inclusionsSection.headingPre, inclusions.title, inclusions.body |
| Homepage | Surgeons | leadSurgeonEyebrow, leadStat1–3 Label/Value, associatesEyebrow |

### Items merged (🟡) — done ✅

| Change | Detail |
|---|---|
| Library CTA + Share CTA → CTAs | Share CTA fields merged into library-cta global as `share.*` group. DB migrated. |
| HomeSurgeonsView restructured | Unhidden as "Surgeons"; new banner fields surfaced; legacy stat fields hidden |
| PrivacySections → "Privacy" | Label rename only |
| RecoveryStaysPage → "Recovery Stays — Page" | Label rename only |
| RecoveryStays → "Recovery Stays — Villas" | Label rename only |
| PricingHero → "Pricing Hero" | Disambiguates from Treatments Hero in same bucket |

### Fields merged — migration required (🔴) — pending

| Bucket | Item | Before | After | Status |
|---|---|---|---|---|
| All Hero globals | titleA + titleB / title.a + title.b | two fields | single `title` | ⏳ step 09.7 — confirm before executing |
| Homepage view sections | heading.a + heading.b | two fields | single `heading` | ⏳ step 09.7 |

---

## cms_iteration4 — Hidden by simplification Pass 4 (2026-05-29)

### Naming levels established
Bucket > Item > Field > Detail > Data
Operational benchmark: < 1 min to update any visible field with data.
Rule: if an item has an image field (upload type) → item must stay visible.

### Items hidden entirely (Group A — 🟢 admin.hidden: true)

| Bucket | Item | Fields removed |
|--------|------|:---:|
| Treatments | Treatments Index | −1 |
| Treatments | Pricing Overview | −2 |
| Treatments | Consultation Policy | −2 |
| Results | CTAs / Library CTA | −11 |
| Contact | Contact Enquiry Section | −2 |
| About | Press Page (global) | −3 |
| About | Authors | −2 |
| About | Privacy Sections | −3 |

### Fields hidden within visible items (Group B — 🟢 admin.hidden: true)

| Item | Fields hidden |
|------|--------------|
| Home Hero | eyebrow · lede · secondaryCtaHref · quickEnquiry (entire group, 18 sub-fields) |
| Home Surgeons View | eyebrow |
| Home Lead Magnet | coverEyebrow · bodyEyebrow · successHeading · successBody · fineprint |
| Home Place | eyebrow · rows · ctaHref |
| Settings | siteTagline · audToIdrRate · roundIdrTo · clinicEnquiryEmail · pressEmail · postalCode · country · defaultLocale · defaultOgImage · defaultMetaDescription |
| Header | navItems (array) · localeSwitcher (group) |
| Footer | treatmentsHeading · linkColumns · footerBottomLines · enquirySummary · addressBlock · copyrightTemplate |
| Treatments Hero | chapter · lede · imageHue · imageLabel · breadcrumbLabel |
| Pricing Hero | chapter · lede · imageHue · imageLabel · breadcrumbLabel |
| Surgeons Hero | chapter · breadcrumbLabel · lede · imageHue · imageLabel |
| Results Hero | chapter · lede · imageHue · imageLabel · breadcrumbLabel |
| Journey Hero | lede |
| Contact Hero | chapter · lede · imageHue · imageLabel · breadcrumbLabel |
| Contact Visit Section | eyebrow · body · mapImageLabel · mapImageHue · openInMapsLabel · getDirectionsLabel · clinicHoursLabel · conciergeHoursLabel |
| Disciplines | lede · body · overview · faqs |
| Sub Categories | chapterTitle (group) · intro · overview · sections · faqs |
| Procedures | description · faqs |
| Surgeons | suffix · train · proc · bio · specAreas · availabilitySchedule · languages · sortOrder |
| Before/After Cases | description |

### Result
36 items → 26 items · ~240 visible fields → ~130 visible fields (−46%)
Cumulative hidden: ~88% of all fields

### Pending — Group C (🔴 DB migrations, deferred)
| ID | Change | Status |
|----|--------|--------|
| C1 | Surgeons: designation+name → name | ⏳ pending approval |
| C2 | Hero globals: title.a+title.b → title (newline) | ⏳ pending approval |
| C3 | Lead Magnet: coverLine1+2+3 → coverTitle | ⏳ pending approval |
| C4 | Lead Magnet: coverFoot1+2 → coverFooter | ⏳ pending approval |
