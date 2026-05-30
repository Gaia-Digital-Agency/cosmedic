# Cosmedic CMS — Reorg Plan
**Updated:** 2026-05-30 | **Pattern:** CMS card structure mirrors web page flow, top to bottom.

---

## HOMEPAGE bucket — 3 cards ✅ SHIPPED

### Card 1 — HOMEPAGE (home-hero)

#### Hero Image
- [x] Two Line — TitleA, TitleB
- [x] Paragraph
- [x] CTA Button 1
- [x] CTA Button 2
- [x] Hero Image

#### Treatment
- [x] Label above heading
- [x] Two Line — TitleA, TitleB
- [x] Intro Paragraph

#### Pricing
- [x] Label above heading
- [x] Two Line — TitleA, TitleB
- [x] Intro Paragraph
- [x] Footnote
- [x] CTA Button

#### Team Card
- [x] Eyebrow ← was hardcoded '8 Specialists'
- [x] Title
- [x] Intro Paragraph
- [x] CTA Button
- [x] Image

#### Gallery
- [x] Label above heading
- [x] Two Line — TitleA, TitleB
- [x] Intro Paragraph
- [x] CTA Button

#### Lead Magnet
- [x] Cover Eyebrow ← was hardcoded 'A guide · 24 pages · PDF'
- [x] Cover TitleA
- [x] Cover TitleB
- [x] Image
- [x] Body Eyebrow ← was hardcoded 'Free Guide'
- [x] Two Line — TitleA, TitleB
- [x] Intro Paragraph
- [x] Form Placeholder
- [x] Submit Button
- [x] Success Heading ← was hardcoded '✓ Sent'
- [x] Success Body ← was hardcoded 'Check your inbox…'
- [x] Fineprint ← was hardcoded 'One email…'

#### Stories
- [x] Label above heading
- [x] Two Line — TitleA, TitleB
- [x] Intro Paragraph
- [x] CTA Button

#### Place
- [x] Two Line — TitleA, TitleB
- [x] Intro Paragraph
- [x] CTA Button
- [x] Image
- [x] Rows

---

### Card 2 — SETTINGS (settings)

- [x] Site Name
- [x] AUD → IDR Rate
- [x] Lock Rate Manually
- [x] Rate Last Fetched At
- [x] Rate Source
- [x] Round IDR To
- [x] General Email
- [x] Concierge Phone
- [x] WhatsApp Number
- [x] Address Line 1
- [x] Address Line 2
- [x] City
- [x] Hours — Mon–Fri
- [x] Hours — Saturday
- [x] Google Maps URL
- [x] Social Links — No Change
- [x] Hide API Button and API Section

---

### Card 3 — FOOTER (footer)

#### Newsletter
- [x] Email Title
- [x] Email Placeholder

#### Treatment
- [x] Link items ×6 (auto-derived from Disciplines collection)

#### About
- [x] Link items ×7 (label + URL)

#### Connect
- [x] Link items ×4 (Platform + URL pairs)

---

## CONTACT bucket — 1 card (PENDING)

**Pattern:** Single CONTACT card (contact-hero). All data in one global. Web page order top to bottom.

### Card 1 — CONTACT (contact-hero)

| Section | Field | Current source | Action |
|---|---|---|---|
| **Breadcrumb** | Home Label | Settings.siteName | stays in Settings |
| **Breadcrumb** | Page Label | contact-hero.breadcrumbLabel | expose (currently hidden) |
| **Hero Image** | Two Line — TitleA | contact-hero.titleA | already visible |
| **Hero Image** | Two Line — TitleB | contact-hero.titleB | already visible |
| **Hero Image** | Paragraph | contact-hero.lede | already visible |
| **Hero Image** | Image | contact-hero.heroImage | already visible |
| **Hero Image** | Image Label | contact-hero.imageLabel | already visible |
| **Enquiry** | Eyebrow | contact-enquiry-section.eyebrow | move → contact-hero.enquiry |
| **Enquiry** | Title A | contact-enquiry-section.headingPre | move |
| **Enquiry** | Title B | contact-enquiry-section.headingItalic | move |
| **Enquiry** | Paragraph | contact-enquiry-section.intro | move |
| **Enquiry** | Eyebrow — Direct Lines | contact-enquiry-section.directLines.sectionLabel | move |
| **Enquiry** | Concierge label | contact-enquiry-section.directLines.conciergeLabel | move |
| **Enquiry** | WhatsApp label | contact-enquiry-section.directLines.whatsappLabel | move |
| **Enquiry** | Email label | contact-enquiry-section.directLines.emailLabel | move |
| **Enquiry** | Press label | contact-enquiry-section.directLines.pressLabel | move |
| **Enquiry** | Name label + placeholder | contact-enquiry-section.formLabels.nameLabel/Placeholder | move |
| **Enquiry** | Email label + placeholder | contact-enquiry-section.formLabels.emailLabel/Placeholder | move |
| **Enquiry** | Interest Area label + placeholder | contact-enquiry-section.formLabels.treatmentLabel/Placeholder | move |
| **Enquiry** | Country label + placeholder | contact-enquiry-section.formLabels.countryLabel/Placeholder | move |
| **Enquiry** | Dates label + placeholder | contact-enquiry-section.formLabels.dateLabel/Placeholder | move |
| **Enquiry** | Message label + placeholder | contact-enquiry-section.formLabels.messageLabel/Placeholder | move |
| **Enquiry** | Add details toggle label | contact-enquiry-section.formLabels.addDetailsLabel | move |
| **Enquiry** | Trust line | contact-enquiry-section.trustLine | move |
| **Enquiry** | Submit — Send | contact-enquiry-section.submitLabels.send | move |
| **Enquiry** | Submit — Sending | contact-enquiry-section.submitLabels.sending | move |
| **Enquiry** | Submit — Sent | contact-enquiry-section.submitLabels.sent | move |
| **Enquiry** | Submit — Success message | contact-enquiry-section.submitLabels.successMessage | move |
| **Enquiry** | Intent Copy (estimate + video-consult) | contact-enquiry-section.intentCopy | move |
| **Visit Us** | Two Line — TitleA | contact-hero.visitSection.headingPre | already in contact-hero ✓ |
| **Visit Us** | Two Line — TitleB | contact-hero.visitSection.headingItalic | already in contact-hero ✓ |
| **Visit Us** | Paragraph | contact-hero.visitSection.body | already in contact-hero ✓ |
| **Visit Us** | Image | contact-hero.visitSection.mapImage | already in contact-hero ✓ |
| **Hours** | Eyebrow — Clinic | contact-visit-section.clinicHoursLabel | move → contact-hero.visitSection |
| **Hours** | Day 1 | Settings.hoursMonFri | stays in Settings |
| **Hours** | Day 2 | Settings.hoursSatSun | stays in Settings |
| **Hours** | Eyebrow — Concierge | contact-visit-section.conciergeHoursLabel | move → contact-hero.visitSection |
| **Hours** | Concierge value | contact-hero.visitSection.conciergeHoursValue | already in contact-hero ✓ |

**After:** contact-enquiry-section → hidden. contact-visit-section → hidden. One CONTACT card.

---

## RESULTS bucket — 1 card (PENDING)

**Pattern:** Single RESULTS card (results-hero). Web page order top to bottom.

### Card 1 — RESULTS (results-hero)

| Section | Field | Source global | Source DB | Localized | Action |
|---|---|---|---|---|---|
| **Breadcrumb** | Page Label | results-hero | main: breadcrumb_label | no | expose (remove hidden) |
| **Hero Image** | Two Line — TitleA | results-hero | locales: title_a | yes | already visible |
| **Hero Image** | Two Line — TitleB | results-hero | locales: title_b | yes | already visible |
| **Hero Image** | Paragraph | results-hero | locales: lede | yes | already visible |
| **Hero Image** | Image | results-hero | main: hero_image_id | no (FK) | already visible |
| **Hero Image** | Image Label | results-hero | locales: image_label | yes | already visible |
| **Featured Cases** | Two Line — TitleA | results-featured-cases-view | locales: heading_pre | yes | move → results-hero.featuredCases |
| **Featured Cases** | Two Line — TitleB | results-featured-cases-view | locales: heading_italic | yes | move |
| **Featured Cases** | Paragraph | results-featured-cases-view | locales: lede | yes | move |
| **Featured Cases** | Filter Bar Label | results-featured-cases-view | locales: filter_bar_label | yes | move |
| **Featured Cases** | Count Format | results-featured-cases-view | locales: count_format | yes | move |
| **Library CTA** | Eyebrow | library-cta | locales: eyebrow | yes | move → results-hero.libraryCta |
| **Library CTA** | Two Line — TitleA | library-cta | locales: heading_pre | yes | move |
| **Library CTA** | Two Line — TitleB | library-cta | locales: heading_italic | yes | move |
| **Library CTA** | Paragraph | library-cta | locales: body | yes | move |
| **Library CTA** | CTA Button | library-cta | locales: button_label | yes | move |
| **Stories** | Two Line — TitleA | results-stories-view | locales: heading_pre | yes | move → results-hero.storiesView |
| **Stories** | Two Line — TitleB | results-stories-view | locales: heading_italic | yes | move |
| **Stories** | Paragraph | results-stories-view | locales: lede | yes | move |
| **Share Story** | Eyebrow | share-cta | main: eyebrow | no → make localized | move → results-hero.share |
| **Share Story** | Two Line — TitleA | share-cta | main: heading_pre | no → make localized | move |
| **Share Story** | Two Line — TitleB | share-cta | main: heading_italic | no → make localized | move |
| **Share Story** | Title C (roman tail) | share-cta | main: heading_post | no → make localized | move |
| **Share Story** | Paragraph | share-cta | main: body | no → make localized | move |
| **Share Story** | CTA Button | share-cta | main: button_label | no → make localized | move |

**Duplication resolved:** library_cta_locales.share_* columns are ghost data — web reads from share-cta, not libraryCta.share. Drop, not carried forward.

**Hidden by design:** chapter, imageHue, all buttonHref fields.

**After:** results-featured-cases-view → hidden. results-stories-view → hidden. library-cta → hidden. share-cta → hidden. One RESULTS card.
