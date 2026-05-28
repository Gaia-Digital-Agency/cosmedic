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
