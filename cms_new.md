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

---

## JOURNEY bucket — 1 card (PENDING)

**Pattern:** Single JOURNEY card (journey-hero) covering both /journey and /recovery-stays. Web page order top to bottom, /journey first then /recovery-stays.

### Card 1 — JOURNEY (journey-hero)

| Section | Field | Source global | Source DB | Localized | Action |
|---|---|---|---|---|---|
| **— /journey —** | | | | | |
| Breadcrumb | Page Label | journey-hero | locales: breadcrumb_label | yes | expose (hidden) |
| Hero Image | Two Line — TitleA | journey-hero | locales: title_a | yes | visible ✓ + fix web path (hero?.title?.a → hero?.titleA) |
| Hero Image | Two Line — TitleB | journey-hero | locales: title_b | yes | visible ✓ + fix web path |
| Hero Image | Paragraph | journey-hero | locales: lede | yes | visible ✓ |
| Hero Image | Image | journey-hero | main: hero_image_id | no (FK) | visible ✓ |
| Hero Image | Image Label | journey-hero | locales: image_label | yes | visible ✓ |
| Journey Steps | — | JourneySteps collection | collection | — | collection — no change |
| Stats | Rows (number, label, italic) | journey-stats.stats | journey_stats_stats + locales | array | move → journey-hero.stats |
| **— /recovery-stays —** | | | | | |
| Breadcrumb | Page Label | rec_stays_pg.hero | locales: hero_breadcrumb_label | yes | move → journey-hero.recoveryStays.hero |
| Hero Image | Two Line — TitleA | rec_stays_pg.hero.title.a | locales: hero_title_a | yes | move |
| Hero Image | Two Line — TitleB | rec_stays_pg.hero.title.b | locales: hero_title_b | yes | move |
| Hero Image | Paragraph | rec_stays_pg.hero.lede | locales: hero_lede | yes | move |
| Hero Image | Image | rec_stays_pg.hero.heroImage | main: hero_hero_image_id | no (FK) | move |
| Hero Image | Image Label | rec_stays_pg.hero.imageLabel | locales: hero_image_label | yes | move |
| Top Stats | Rows (number, label, italic) | rec_stays_pg.topStats | rec_stays_pg_top_stats + locales | array | move → journey-hero.recoveryStays.topStats |
| Portfolio | Eyebrow | rec_stays_pg.portfolioSection | locales: portfolio_section_eyebrow | yes | move |
| Portfolio | Two Line — TitleA | rec_stays_pg.portfolioSection | locales: portfolio_section_heading_pre | yes | move |
| Portfolio | Two Line — TitleB | rec_stays_pg.portfolioSection | locales: portfolio_section_heading_italic | yes | move |
| Portfolio | Title C (roman tail) | rec_stays_pg.portfolioSection | locales: portfolio_section_heading_post | yes | move |
| Portfolio | Paragraph | rec_stays_pg.portfolioSection | locales: portfolio_section_lede | yes | move |
| What's Included | Eyebrow | rec_stays_pg.inclusionsSection | locales: inclusions_section_eyebrow | yes | move + expose |
| What's Included | Two Line — TitleA | rec_stays_pg.inclusionsSection | locales: inclusions_section_heading_pre | yes | move + expose |
| What's Included | Two Line — TitleB | rec_stays_pg.inclusionsSection | locales: inclusions_section_heading_italic | yes | move + expose |
| What's Included | Title C (roman tail) | rec_stays_pg.inclusionsSection | locales: inclusions_section_heading_post | yes | move + expose |
| What's Included | Paragraph | rec_stays_pg.inclusionsSection | locales: inclusions_section_lede | yes | move + expose |
| Inclusions grid | — | rec_stays_pg.inclusions | rec_stays_pg_inclusions | array | keep hidden by design |
| Villa cards | — | RecoveryStays collection | collection | — | collection — no change |

**Hidden by design:** chapter (both), imageHue (both), all buttonHref fields.

**Web path fix:** JourneyPage.tsx reads `hero?.title?.a` — CMS has flat `titleA`. Fix web path after merge.

**After:** journey-stats → hidden. recovery-stays-page → hidden. journey-page → already hidden. One JOURNEY card.

---

## EXPERTS bucket — 2 cards (PENDING)

**Pattern:** Already correct structure — 2 cards for 2 pages. No merge needed. Fixes only.

### Card 1 — EXPERTS (surgeons-hero) → /experts

| Section | Field | Source DB | Action |
|---|---|---|---|
| Breadcrumb | Page Label | surgeons_hero: breadcrumb_label | expose (hidden) |
| Hero Image | Two Line — TitleA | locales: title_a | already visible ✓ |
| Hero Image | Two Line — TitleB | locales: title_b | already visible ✓ |
| Hero Image | Paragraph | locales: lede | already visible ✓ |
| Hero Image | Image | main: hero_image_id | already visible ✓ |
| Hero Image | Image Label | locales: image_label | already visible ✓ |
| Lead Surgeon | Section Eyebrow | locales: sections_lead_section_eyebrow | already visible ✓ |
| Lead Surgeon | Block Eyebrow | locales: sections_lead_block_eyebrow | already visible ✓ |
| Lead Surgeon | Stat labels ×3 | locales: sections_lead_stat_label_* | already visible ✓ |
| Lead Surgeon | CTA label | locales: sections_lead_cta_label | already visible ✓ |
| Plastic Surgery | Eyebrow | locales: sections_plastic_surgery_eyebrow | already visible ✓ |
| Plastic Surgery | Two Line — TitleA (roman prefix) | locales: sections_plastic_surgery_heading_a | fix web path: heading?.a → headingA |
| Plastic Surgery | Two Line — TitleB (italic) | locales: sections_plastic_surgery_heading_italic | seed NULL → 'Reconstructive' |
| Plastic Surgery | Title C (roman suffix) | locales: sections_plastic_surgery_heading_b | fix web path: heading?.b → headingB |
| Plastic Surgery | Paragraph | locales: sections_plastic_surgery_lede | already visible ✓ |
| Aesthetic Medicine | Eyebrow | locales: sections_aesthetic_medicine_eyebrow | already visible ✓ |
| Aesthetic Medicine | Two Line — TitleA | locales: sections_aesthetic_medicine_heading_a | seed NULL → '' |
| Aesthetic Medicine | Two Line — TitleB (italic) | locales: sections_aesthetic_medicine_heading_italic | seed NULL → 'Quiet' |
| Aesthetic Medicine | Title C | locales: sections_aesthetic_medicine_heading_b | fix web path: heading?.b → headingB |
| Aesthetic Medicine | Paragraph | locales: sections_aesthetic_medicine_lede | already visible ✓ |

### Card 2 — DETAIL TEMPLATE (surgeon-detail-template) → /experts/[slug]

Already correct — all fields visible, no changes needed.

**No DB migration required.** All columns already exist.

**Changes:**
1. SurgeonsHero label `'Hero'` → `'Experts'`
2. Expose `breadcrumbLabel`
3. Seed 3 NULL fields in surgeons_hero_locales
4. Fix 3 web path mismatches in SurgeonsIndex.tsx (`heading?.a` → `headingA` etc.)

---

## PUBLICATIONS bucket — 4 cards ✅ SHIPPED

**Pattern:** One card per web page. BlogPostTemplate is a shared template (not a page card).
All three page globals were hidden — exposed by removing `hidden: true`. No migration for the expose step.

### Card 1 — BLOG (blog-page) → /blog

| Section | Field | Source DB | Action |
|---|---|---|---|
| Breadcrumb | Page Label | blog_page: breadcrumb_label | add field + column (default: 'Journal') |
| Hero Image | Two Line — TitleA | blog_page_locales: chapter_title_a | pageFields — already present |
| Hero Image | Two Line — TitleB | blog_page_locales: chapter_title_b | pageFields — already present |
| Hero Image | Paragraph | blog_page_locales: lede | pageFields — already present |
| Hero Image | Image | blog_page: hero_image_id | pageFields — already present |
| Hero Image | Image Label | blog_page: image_label | add field + column (default: 'JOURNAL') |
| This Issue | Eyebrow | blog_page: this_issue_eyebrow | already in global ✓ |
| This Issue | Read Essay CTA | blog_page: read_the_essay_cta_label | already in global ✓ |
| Archive | Eyebrow | blog_page: archive_section_eyebrow | already in global ✓ |
| Archive | Two Line — TitleA | blog_page: archive_section_heading_pre | already in global ✓ |
| Archive | Two Line — TitleB | blog_page: archive_section_heading_italic | already in global ✓ |
| Archive | Paragraph | blog_page: archive_section_lede | already in global ✓ |
| Archive | Filter All label | blog_page: archive_section_filter_all_label | already in global ✓ |
| Archive | Empty state copy | blog_page: archive_section_empty_state_copy | already in global ✓ |

### Card 2 — PRESS (press-page) → /press

| Section | Field | Source DB | Action |
|---|---|---|---|
| Breadcrumb | Page Label | press_page: breadcrumb_label | add field + column (default: 'Accreditations & Press') |
| Hero Image | Two Line — TitleA | press_page_locales: chapter_title_a | pageFields — already present |
| Hero Image | Two Line — TitleB | press_page_locales: chapter_title_b | pageFields — already present |
| Hero Image | Paragraph | press_page_locales: lede | pageFields — already present |
| Hero Image | Image | press_page: hero_image_id | pageFields — already present |
| Hero Image | Image Label | press_page: image_label | add field + column (default: 'ACCREDITATIONS') |
| Stats Row | 4 tiles (number, label, italic) | press_page_top_stats | add array field + table, seed hardcoded values |
| Accreditations | Eyebrow | press_page: accreditations_section_eyebrow | already in global ✓ |
| Accreditations | Heading | press_page: accreditations_section_heading | already in global ✓ |
| Accreditations | Paragraph | press_page: accreditations_section_lede | already in global ✓ |
| In the Press | Eyebrow | press_page: press_section_eyebrow | already in global ✓ |
| In the Press | Two Line — TitleA | press_page: press_section_heading_pre | already in global ✓ |
| In the Press | Two Line — TitleB | press_page: press_section_heading_italic | already in global ✓ |
| In the Press | Paragraph | press_page: press_section_lede | already in global ✓ |
| In the Press | CTA label | press_page: press_enquiries_cta_label | already in global ✓ |

### Card 3 — PRIVACY (privacy-page) → /privacy

| Section | Field | Source DB | Action |
|---|---|---|---|
| Breadcrumb | Page Label | privacy_page: breadcrumb_label | add field + column (default: 'Privacy & Terms') |
| Hero Image | Two Line — TitleA/TitleB, Paragraph, Image | privacy_page_locales | pageFields — already present |
| Hero Image | Image Label | privacy_page: image_label | already in global ✓ |
| Metadata | Last Updated | privacy_page: last_updated_date | already in global ✓ |
| Metadata | Version line | privacy_page: version_line | already in global ✓ |
| Metadata | Reading time | privacy_page: reading_time_line | already in global ✓ |
| Content | Intro paragraph | privacy_page: intro_paragraph | already in global ✓ |
| Content | TOC heading | privacy_page: toc_heading | already in global ✓ |
| Content | Privacy sections | PrivacySections collection | collection — no global needed |
| DPO | 10 fields (eyebrow, heading, lede, email, address, CTA) | privacy_page: dpo_* | already in global ✓ |

### Card 4 — BLOG POST TEMPLATE (blog-post-template) → /blog/[slug]

Template card — shared chrome across all individual blog posts. Already visible and correct. No changes needed.
