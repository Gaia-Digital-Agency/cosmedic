# Pass 1 — Sitewide hardcoded-atom audit (2026-05-25)

> Output of the first audit pass. 44 files scanned (34 routes + 10 components).
> 127 atoms identified. See pass-2 file for the deeper enumeration covering all 77 in-scope files.

## Summary
- Files scanned: 44
- Total hardcoded atoms identified: 127
- Breakdown: 23 images, 78 strings, 26 URLs

## Per-file findings

### packages/web/src/routes/home/Hero.tsx
- Line 11 [STRING] `'A sanctuary in Nusa Dua · Est. 1998'` — eyebrow. CMS: homeHero.eyebrow
- Line 12-13 [STRING] `'Plastic surgery'` + `'in Bali, by ISAPS surgeons.'` — title. CMS: homeHero.titleA, titleB
- Line 27-46 [STRING] Quick enquiry form labels/placeholders/messages — CMS: homeHero.quickEnquiry nested object
- Line 89 [IMAGE] `src={heroImage}` — CMS-driven, OK

### packages/web/src/routes/home/TrustStrip.tsx
- Lines 6-10 [STRING] FALLBACK_STATS — CMS: brandStats.stats

### packages/web/src/routes/home/Intro.tsx
- Line 9 [STRING] `'Our Approach'` — eyebrow. CMS: homeIntro.eyebrow
- Lines 10-12 [STRING] Pull-quote parts — CMS: homeIntro.pullQuoteBefore/Accent/After
- Lines 14-18 [STRING] Two long paragraphs — CMS: homeIntro.col1, col2

### packages/web/src/routes/home/Treatments.tsx
- Line 11 [STRING] `'Treatments'` — CMS: homeTreatmentsView.eyebrow
- Line 12-13 [STRING] heading parts — CMS: homeTreatmentsView.headingPart1, headingPart2
- Line 15-16 [STRING] lede — CMS: homeTreatmentsView.lede

### packages/web/src/routes/home/PricingTeaser.tsx
- Line 24 [STRING] eyebrow — CMS: homePricingView.eyebrow
- Line 25-26 [STRING] heading — CMS: homePricingView.headingPart1, headingPart2
- Line 28-29 [STRING] lede — CMS: homePricingView.lede
- Line 31-32 [STRING] footnote — CMS: homePricingView.footnote
- Lines 7-16 [STRING] PRICE_TEASER array — pull from Payload procedures collection

### packages/web/src/routes/home/Surgeons.tsx
- Line 15 [STRING] `'Meet the Surgeons'` — CMS: homeSurgeonsView.eyebrow
- Line 16 [STRING] `'Lead Surgeon'` — CMS: homeSurgeonsView.leadSurgeonEyebrow
- Lines 17-23 [STRING] lead surgeon bio — CMS: homeSurgeonsView.leadBody
- Lines 25-30 [STRING] stat labels/values — CMS: homeSurgeonsView.leadStat1/2/3 labels and values
- Line 31 [STRING] CTA — CMS: homeSurgeonsView.leadCtaLabel
- Line 32 [STRING] associates eyebrow — CMS: homeSurgeonsView.associatesEyebrow
- Line 33 [STRING] team caption — CMS: homeSurgeonsView.teamCaption

### packages/web/src/routes/home/Gallery.tsx
- Line 12 [STRING] eyebrow — CMS: homeGalleryView.eyebrow
- Line 13 [STRING] heading italic — CMS: homeGalleryView.headingItalic
- Line 14 [STRING] heading part 2 — CMS: homeGalleryView.headingPart2
- Line 15 [STRING] lede — CMS: homeGalleryView.lede
- Line 16 [STRING] CTA label — CMS: homeGalleryView.ctaLabel
- Line 17 [STRING] CTA href — CMS: homeGalleryView.ctaHref

### packages/web/src/routes/home/LeadMagnet.tsx
- Line 14 [STRING] cover eyebrow — CMS: homeLeadMagnet.coverEyebrow
- Lines 15-17 [STRING] cover lines — CMS: homeLeadMagnet.coverLine1/2/3
- Lines 18-19 [STRING] cover footer — CMS: homeLeadMagnet.coverFoot1/2
- Line 20 [STRING] body eyebrow — CMS: homeLeadMagnet.bodyEyebrow
- Lines 21-22 [STRING] heading parts — CMS: homeLeadMagnet.headingPart1, headingAccent
- Lines 24-25 [STRING] lede — CMS: homeLeadMagnet.lede
- Line 26-30 [STRING] form/success/fineprint — CMS: homeLeadMagnet.formPlaceholder/submitLabel/successHeading/successBody/fineprint
- Line 113 [STRING] submitting label — CMS: homeLeadMagnet.submittingLabel

### packages/web/src/routes/home/Journey.tsx
- Lines 7-13 [STRING] STEPS array — CMS: homeJourneyView.steps (or journeySteps collection)
- Line 18 [STRING] eyebrow — CMS: homeJourneyView.eyebrow
- Line 19-22 [STRING] heading/CTA — CMS: homeJourneyView headingPart1/headingAccent/ctaLabel/ctaHref

### packages/web/src/routes/home/Stories.tsx
- Lines 9-37 [STRING] STORIES array — Payload stories collection
- Line 42 [STRING] eyebrow — CMS: homeStoriesView.eyebrow
- Line 43-44 [STRING] heading — CMS: homeStoriesView.headingItalic, headingPart2
- Lines 45-54 [STRING] lede — CMS: homeStoriesView.lede
- Lines 57-58 [STRING] CTA — CMS: homeStoriesView.ctaLabel, ctaHref

### packages/web/src/routes/home/Place.tsx
- Lines 9-14 [STRING] DEFAULT_ROWS — CMS: homePlace.rows (exists)
- Line 19 [STRING] eyebrow — CMS: homePlace.eyebrow (exists)
- Lines 20-21 [STRING] heading parts — CMS: homePlace.headingPart1, headingAccent (exists)
- Lines 23-24 [STRING] body — CMS: homePlace.body (exists)
- Lines 29-30 [STRING] CTA — CMS: homePlace.ctaLabel, ctaHref (exists)
- Line 37 [IMAGE] image — CMS: homePlace.image (just added, this commit)

### packages/web/src/routes/treatments/TreatmentsIndex.tsx
- Lines 18-42 [STRING] FB object with hero/index/stats — CMS: treatmentsHero/treatmentsIndexSection/treatmentsStats globals

### packages/web/src/routes/surgeons/SurgeonsIndex.tsx
- Lines 17-49 [STRING] FB strings — CMS: surgeonsHero/surgeonsLeadView/surgeonsPlasticView/surgeonsAestheticView globals
- Line 123 [STRING] loading lede — defensive placeholder

### packages/web/src/routes/detail/DisciplineDetail.tsx
- Lines 21-50 [STRING] FB object — CMS: disciplineDetailTemplate global
- Line 100-101 [STRING] breadcrumb labels — minor priority

### packages/web/src/routes/detail/SubCategoryDetail.tsx
- Lines 21-43 [STRING] FB object — CMS: subCategoryDetailTemplate global
- Line 159 [URL] hardcoded WhatsApp number — should use settings.whatsappNumber

### packages/web/src/routes/detail/SurgeonDetail.tsx
- Lines 19-49 [STRING] TFB template object — CMS: surgeonDetailTemplate global

### packages/web/src/routes/journey/JourneyPage.tsx
- Lines 24-130 [STRING] FALLBACK_STEPS array — CMS: journeySteps collection
- Lines 132-136 [STRING] FALLBACK_STATS — CMS: journeyStats global

### packages/web/src/routes/recovery-stays/RecoveryStaysPage.tsx
- Lines 27-58 [STRING] FALLBACK_VILLAS — CMS: recoveryStays collection
- Lines 60-65 [STRING] FALLBACK_TOP_STATS — CMS: recoveryStaysPage.topStats
- Lines 67-76 [STRING] FALLBACK_INCLUSIONS — CMS: recoveryStaysPage.inclusionsSection

### packages/web/src/routes/contact/ContactPage.tsx
- Lines 13-24 [STRING] INTENT_COPY — CMS: contactIntentCopy global (new)
- Line 26-43 [STRING] REQUIRED/OPTIONAL labels — CMS: contactEnquirySection
- Line 167-171 [STRING] heading — CMS: contactEnquirySection.headingPre, headingItalic
- Lines 181-182 [STRING] intro — CMS: contactEnquirySection.intro
- Line 191-234 [STRING] direct lines section — CMS: contactEnquirySection.directLines
- Line 262 [STRING] treatment select placeholder — CMS: contactEnquirySection.treatmentSelectPlaceholder
- Line 303 [STRING] add details button — CMS: contactEnquirySection.addDetailsLabel
- Lines 311-319 [STRING] optional field labels — CMS: contactEnquirySection
- Lines 346-347 [STRING] trust line — CMS: contactEnquirySection.trustLine
- Line 350 [STRING] submit labels — CMS: contactEnquirySection.sendingLabel/sentLabel/submitLabel
- Lines 356-359 [STRING] success/error — CMS: contactEnquirySection.successHeading/successBody

### packages/web/src/routes/gallery/GalleryPage.tsx
- Lines 14-36 [STRING] FB object — CMS: galleryPage + libraryCta globals

### packages/web/src/routes/pricing/PricingPage.tsx
- Lines 12-19 [STRING] DEFAULT_PAYMENT_TERMS — CMS: pricingPayment.termsText
- Line 43-45 [STRING] footnote — CMS: pricingFootnote.text
- Lines 51-56 [STRING] insurance — CMS: pricingInsurance
- Lines 58-62 [STRING] payment heading — CMS: pricingPayment
- Line 65-67 [STRING] discipline list view labels — CMS: pricingDisciplineListView

### packages/web/src/routes/video-consult/VideoConsultPage.tsx
- Line 75 [STRING] chapter — CMS: videoConsultHero (new)
- Line 76 [STRING] title — CMS: videoConsultHero
- Lines 77-81 [STRING] lede — CMS: videoConsultHero
- Line 83-84 [STRING] fallback label + breadcrumb — CMS: videoConsultHero

### packages/web/src/routes/video-consult/WhatToExpect.tsx
- Lines 7-12 [STRING] BULLETS array — CMS: videoConsultWhat global (new)
- Line 17 [STRING] eyebrow — CMS: videoConsultWhat.eyebrow
- Line 18 [STRING] heading — CMS: videoConsultWhat headings
- Line 68 [STRING] coordinated by — CMS: videoConsultWhat.coordinatedByLabel
- Line 99 [STRING] footer text — CMS: videoConsultWhat.coordinatorsNote

### packages/web/src/routes/stories/StoriesPage.tsx
- Lines 14-44 [STRING] FB strings + 8 stories fallback — CMS: storiesPage + shareCta globals + Payload stories collection

### packages/web/src/routes/blog/BlogIndex.tsx
- Lines 45-66 [STRING] fallback blog page strings — CMS: blog page global

### packages/web/src/routes/blog/BlogPost.tsx
- Lines 42-57 [STRING] tpl object — CMS: blogPostTemplate global (exists)

### packages/web/src/routes/press/PressPage.tsx
- Lines 26-46 [STRING] fallback strings — CMS: press page global
- Lines 64, 71 [STRING] hardcoded stats — CMS: pressPage.stats array

### packages/web/src/routes/privacy/PrivacyPage.tsx
- Line 18-28 [STRING] chapter/title/lede/metadata — CMS: privacyPage
- Lines 79-154 [STRING] TOC heading, DPO section (4 strings), address, contact button — CMS: privacyPage with more fields

### packages/web/src/routes/NotFound.tsx
- Lines 20-34 [STRING] all error page text (eyebrow, heading, body, button labels) — CMS: notFoundPage global (new)

### packages/web/src/components/shell/Header.tsx
- Line 14-17 [STRING] locale switcher EN/ID — CMS: header.localeSwitcher
- Line 85-87, 108, 153, 189-197 [STRING] nav link texts — CMS: header.navItems array (new) OR keep hardcoded
- Line 268, 309, 314-315 [STRING] mobile menu — same as nav

### packages/web/src/components/shell/Footer.tsx
- Lines 58-70 [STRING] all confirmed CMS via 11.b. OK.
- Lines 136-151 [STRING] hardcoded fallback links — already covered by linkColumns

### packages/web/src/components/shell/FloatingChrome.tsx
- Line 17-18 [STRING] CTA label/href — CMS: floatingChrome.ctaPill (exists)
- Line 78 [STRING] WhatsApp aria-label — CMS: floatingChrome.chat.ariaLabel

### packages/web/src/components/PageBlocks.tsx
- Line 138, 243, 270, 300, 348, 374, 403 [STRING] block headings as defensive fallbacks — acceptable

### packages/web/src/components/detail/SurgeonMini.tsx
- Line 21 [STRING] role labels — CMS: surgeonMiniLabel or surgeonDetailTemplate
- Line 28 [STRING] read profile button — CMS: surgeonDetailTemplate
