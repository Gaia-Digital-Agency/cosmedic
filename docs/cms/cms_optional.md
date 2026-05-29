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

> Items and fields hidden from editor-role users as part of CMS simplification pass 2.
> All remain accessible to admin-role users. Move back to `cms_map_simple.md` if re-exposure needed.
> Risk: 🟢 = `admin.hidden` only · 🟡 = global merged away · 🔴 = field merged (migration required)

### Entire sidebar items hidden (🟢)

| Bucket | Item | Reason |
|---|---|---|
| Homepage | Home Intro | UI chrome — pull-quote fragments, brand-authored |
| Homepage | Home Treatments View | UI chrome — heading only |
| Homepage | Home Surgeons View | UI chrome — group photo + section labels |
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
| Results | Gallery Page | title only — absorbed into Results Hero |
| Results | Stories Page | title only — absorbed into Results Hero |
| Results | Featured Cases View | UI chrome |
| Results | Stories View | UI chrome |
| Journey | Journey Stats | UI chrome |
| Journey | Journey Steps | UI chrome / rarely changed by editors |
| Contact | Form Defaults | Technical — error/success messages |
| Contact | Email Templates | Technical — MJML templates |
| Contact | Video Consult Page | Merged into Contact bucket (admin access retained) |
| About | Blog Page | Merged into Blog Posts item |
| About | Blog Tags | Inline on Blog Posts; hidden top-level |
| About | Privacy Page | Merged into Privacy item |
| About | Not Found Page | Admin-only |

### Fields hidden within visible items (🟢)

| Bucket | Item | Fields hidden |
|---|---|---|
| Journey | Recovery Stays Page | portfolioSection.headingPre, inclusionsSection.headingPre, inclusions.title, inclusions.body |

### Items merged away — global removed (🟡)

| Removed item | Merged into | Status |
|---|---|---|
| Home Page | Home Hero | ⏳ pending 09.5 |
| Treatments Page | Treatments Hero | ⏳ pending 09.5 |
| Surgeons Page | Surgeons Hero | ⏳ pending 09.5 |
| Results Page | Results Hero | ⏳ pending 09.5 |
| Gallery Page | Results Hero | ⏳ pending 09.5 |
| Stories Page | Results Hero | ⏳ pending 09.5 |
| Pricing Page | Pricing Hero | ⏳ pending 09.5 |
| Journey Page | Journey Hero | ⏳ pending 09.5 |
| Contact Page | Contact Hero | ⏳ pending 09.5 |
| Video Consult Page | Contact Hero | ⏳ pending 09.5 |
| Blog Page | Blog Posts | ⏳ pending 09.5 |
| Privacy Page | Privacy | ⏳ pending 09.5 |

### Fields merged — migration required (🔴)

| Bucket | Item | Before | After | Status |
|---|---|---|---|---|
| All Hero globals | titleA + titleB / title.a + title.b | two fields | single `title` | ⏳ pending 09.7 — confirm before executing |
| Homepage view sections | heading.a + heading.b | two fields | single `heading` | ⏳ pending 09.7 |
