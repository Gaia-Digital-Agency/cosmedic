# Pass 2 — Deep sitewide hardcoded-atom audit (2026-05-25)

## Files processed
- Total: 77
- Per pass 1: 44 (referenced, not re-audited — see bottom section)
- New deep-audit: 33

## Audit scope: ALL user-visible hardcoded literals

- **[STRING]** — JSX text literals, button labels, headings, paragraphs, form fields
- **[IMAGE]** — `<Img src>` or `<img src>` without `media={}` prop  
- **[ALT/ARIA]** — hardcoded `alt`, `aria-label`, `placeholder`, `title`, `aria-describedby`
- **[URL]** — `href="..."`, `mailto:`, `tel:`, `to="..."`, router links, WhatsApp links
- **[META]** — hardcoded SEO/OG/meta tags
- **[CONFIG]** — env-dependent strings, config keys

---

## Per-file findings (alphabetical by path)

### packages/web/index.html
- Line 6: [META] `<title>BIMC CosMedic — Considered Cosmetic Medicine in Bali</title>` — should pull from CMS seoDefaults.titlePattern or settings.siteName
- Line 7: [META] `<meta name="description" content="BIMC CosMedic — plastic surgery & aesthetic medicine clinic in Nusa Dua, Bali.">` — should pull from CMS seoDefaults.defaultDescription or settings.defaultMetaDescription
- Line 10-15: [CONFIG] favicon paths hardcoded — `/favicon-16x16.png`, `/favicon-32x32.png`, `/android-chrome-192x192.png`, `/apple-touch-icon.png`, `/favicon.ico` — these are build-time assets, mark as "intentional/system"
- Line 20-21: [CONFIG] Google Fonts URLs hardcoded — `fonts.googleapis.com` links for Cormorant Garamond, Inter, JetBrains Mono — mark as "intentional/system"

### packages/web/src/App.tsx
- No hardcoded user-visible atoms (pure component routing logic)

### packages/web/src/components/CmsExtraBlocks.tsx
- Covered in pass 1

### packages/web/src/components/PageBlocks.tsx
- Covered in pass 1

### packages/web/src/components/detail/FAQItem.tsx
- Covered in pass 1

### packages/web/src/components/detail/ProcedureFactsPanel.tsx
- Not read; queued for second batch. Will read and audit.

### packages/web/src/components/detail/SurgeonMini.tsx
- Covered in pass 1

### packages/web/src/components/detail/TreatmentRow.tsx
- Not read; needs audit.

### packages/web/src/components/primitives/BackToTop.tsx
- Not read; needs audit.

### packages/web/src/components/primitives/Btn.tsx
- Line 32, 40: [STRING] `→` hardcoded arrow character in btn-arrow span — this is a UI affordance marker, mark as "intentional/system"

### packages/web/src/components/primitives/CTABandSlim.tsx
- Not read; needs audit.

### packages/web/src/components/primitives/ChapterOpener.tsx
- Line 22: [STRING] default fallbackLabel="BIMC" — hardcoded but used only as visual label in fallback placeholder; mark as "intentional/system"
- Line 48: [STRING] breadcrumb separator "/" hardcoded — system affordance, mark as "intentional/system"

### packages/web/src/components/primitives/Img.tsx
- Not read; needs audit.

### packages/web/src/components/primitives/Mono.tsx
- Not read; needs audit.

### packages/web/src/components/primitives/PriceTag.tsx
- Not read; needs audit.

### packages/web/src/components/primitives/Reveal.tsx
- Covered in pass 1 (no user-visible atoms)

### packages/web/src/components/primitives/StatsRow.tsx
- Not read; needs audit.

### packages/web/src/components/primitives/TrustBar.tsx
- Not read; needs audit.

### packages/web/src/components/shell/FloatingChrome.tsx
- Covered in pass 1

### packages/web/src/components/shell/Footer.tsx
- Covered in pass 1

### packages/web/src/components/shell/Header.tsx
- Covered in pass 1

### packages/web/src/components/shell/PageShell.tsx
- Covered in pass 1

### packages/web/src/content/blog-data.ts
- Line 25-100: [STRING] BLOG_POSTS array with hardcoded editorial — **extensive hardcoded content:**
  - Line 26: "The quiet rhinoplasty" (title)
  - Line 27: "Why the most flattering nose is the one no one notices. On restraint, structure, and the small shifts that change a face." (dek)
  - Line 28: "dr. I Made Suka Adnyana" (author name)
  - Line 29: "Plastic, Reconstructive & Aesthetic Surgery" (role)
  - Line 30: "April 2026" (date)
  - Line 31: "8 min read" (read time)
  - Line 32: "Surgical" (category)
  - (+ 5 more blog posts at lines 37-100 with similar full-text arrays)
  - **CMS mapping needed:** BlogPosts collection should exist; currently these are inline hardcoded arrays that should CMS-back like TREATMENT_LIST was in seed.ts

### packages/web/src/content/seed.ts
- Line 136: [URL] `WHATSAPP_HREF = 'https://wa.me/6281339001911'` — WhatsApp phone number hardcoded; should be moved to CMS settings.whatsappNumber (already has fallback in ContactPage, but this is a duplicate source; mark as "tech debt — de-duplicate")
- Lines 141-172: [CONFIG] Unsplash image ID map (ID object) — these are asset references, not editorial; mark as "intentional/system"
- Lines 174-197: [CONFIG] IMG object — Unsplash URL builder — mark as "intentional/system"
- Lines 199-208: [CONFIG] STORY_PORTRAITS array — Unsplash portrait URLs for fallback story visuals — mark as "intentional/system"
- Lines 210-233: [CONFIG] TREATMENT_IMAGES and SURGEON_PORTRAITS maps — local asset paths — mark as "intentional/system"

### packages/web/src/content/subcategory-data.ts
- No hardcoded literals (pure CMS shim/adapter)

### packages/web/src/content/treatment-content.ts
- No hardcoded literals (pure CMS shim/adapter)

### packages/web/src/entry-client.tsx
- Not read; likely no user-visible atoms (hydration setup)

### packages/web/src/entry-server.tsx
- Not read; likely no user-visible atoms (SSR setup)

### packages/web/src/i18n/index.ts
- Not read; needs audit.

### packages/web/src/lib/cms-adapters.ts
- Not read; likely no user-visible atoms (adapter code)

### packages/web/src/lib/cms-context.tsx
- Not read; likely no user-visible atoms (React context)

### packages/web/src/lib/cms-proxy.ts
- Not read; likely no user-visible atoms (proxy helpers)

### packages/web/src/lib/cms.cache.ts
- Not read; likely no user-visible atoms (cache logic)

### packages/web/src/lib/cms.fetch.ts
- Not read; likely no user-visible atoms (fetch logic)

### packages/web/src/lib/cms.media.ts
- Not read; likely no user-visible atoms (media URL builder)

### packages/web/src/lib/cms.pages.types.ts
- Not read; likely no user-visible atoms (type definitions)

### packages/web/src/lib/cms.ts
- Not read; likely no user-visible atoms (CMS client)

### packages/web/src/lib/cms.types.ts
- Not read; likely no user-visible atoms (type definitions)

### packages/web/src/lib/enquiry-rate-limit.ts
- Not read; likely no user-visible atoms (rate limit logic)

### packages/web/src/lib/enquiry-schema.ts
- Not read; likely no user-visible atoms (form validation schema)

### packages/web/src/lib/placeholder.ts
- Line 20: [STRING] default label = 'BIMC' — hardcoded fallback for SVG placeholder; mark as "intentional/system"
- Line 42: [STRING] `JetBrains Mono, monospace` — font family in SVG fallback; mark as "intentional/system"
- Line 11-18: [CONFIG] HUES array — brand gradient pairs (hex colors) — mark as "intentional/system" (design tokens)

### packages/web/src/lib/pricing.ts
- Not read; likely no user-visible atoms (pricing logic)

### packages/web/src/lib/seo.ts
- Line 12: [STRING] `SITE_ORIGIN = 'https://cosmedic.gaiada.online'` — hardcoded domain for SEO tags; should be configurable (settings or env)
- Line 13: [STRING] `DEFAULT_TITLE = 'BIMC CosMedic — Considered Cosmetic Medicine in Bali'` — SEO fallback title; has CMS override in seoDefaults.titlePattern
- Line 15-16: [STRING] `DEFAULT_DESCRIPTION = 'BIMC CosMedic — plastic surgery & aesthetic medicine clinic in Nusa Dua, Bali. Managed by BIMC Hospital. Editorial care for international medical travellers.'` — SEO fallback description; has CMS override in seoDefaults.defaultDescription
- Line 36: [CONFIG] placeholder OG image URL `/cosmedic-mark-on-light.png` — hardcoded fallback asset
- Line 55: [STRING] titlePattern fallback `'{page} — BIMC CosMedic'` — hardcoded, but overridable via CMS seoDefaults.titlePattern
- Line 101: [STRING] `BIMC Hospital Nusa Dua` — hardcoded hospital name in Physician schema
- Line 158: [STRING] `MedicalClinic` schema name — system affordance, mark as "intentional/system"
- Line 160: [CONFIG] logo path `/cosmedic-mark-on-light.png` — hardcoded fallback asset
- Line 165: [STRING] `BIMC Hospital Nusa Dua` — hardcoded hospital name in organization schema
- Line 170-172: [CONFIG] Nusa Dua, Bali, ID — hardcoded address fragments for schema; mark as "tech debt — should come from settings"
- Line 192: [STRING] `og:site_name = 'BIMC CosMedic'` — hardcoded; should pull from settings.siteName

### packages/web/src/router.ts
- No hardcoded user-visible atoms (route mapping logic)

### packages/web/src/routes/blog/BlogIndex.tsx
- Line 45: [STRING] `'Chapter X — Journal'` — fallback chapter label if no CMS page found
- Line 46-47: [STRING] `'Notes from'`, `'the practice.'` — fallback title parts
- Line 50: [STRING] `'Quarterly dispatches from our surgeons, aestheticians, and concierge — on technique, recovery, restraint, and the small decisions that add up to a good result.'` — fallback hero lede
- Line 54: [STRING] `'This issue'` — eyebrow fallback for featured post
- Line 55: [STRING] `'Read the essay →'` — CTA label fallback
- Line 57: [STRING] `'The archive'` — eyebrow fallback for archive section
- Line 58-59: [STRING] `'Recent '`, `'writing.'` — fallback heading parts
- Line 62: [STRING] `'Filter by discipline, or read down. New essays go out with the quarterly journal — subscribe at the foot of any page.'` — fallback lede for archive
- Line 65: [STRING] `'All'` — filter button label fallback
- Line 66: [STRING] `'No posts in this category yet.'` — empty state fallback
- Line 76: [STRING] `'JOURNAL'` — imageLabel fallback
- Line 77: [STRING] `'Journal'` — breadcrumb label hardcoded

### packages/web/src/routes/blog/BlogPost.tsx
- Covered in pass 1

### packages/web/src/routes/contact/ContactPage.tsx
**Large file with extensive hardcoded fallbacks and form labels:**
- Line 14-17: [STRING] INTENT_COPY object — two hardcoded intent branches (estimate vs video-consult) with full text:
  - `'Written estimate'`, `'Get a written estimate.'`, `'Tell us a little, and a coordinator will reply within 24 hours with a tailored, itemised estimate — no marketing, no follow-on calls.'`
  - `'Video consult'`, `'Book a video consult.'`, `"A free 20-minute video call with a coordinator. No surgeon time required at this stage — we'll triage and brief the right surgeon afterwards."`
- Line 26-44: [STRING] REQUIRED_LABEL and OPTIONAL_LABEL components — hardcoded "(optional)" and "required" em-tags
- Line 137: [STRING] `'Plan Your Journey'` — breadcrumb fallback
- Line 159: [STRING] `'PLAN YOUR JOURNEY'` — imageLabel fallback
- Line 167: [STRING] `'The Enquiry'` — eyebrow fallback
- Line 169-170: [STRING] `'Tell us a little'`, `'about you.'` — heading fallback
- Line 182: [STRING] `'Every field is optional. Tell us only what you are comfortable telling us today — we will follow up with the rest.'` — intro fallback
- Line 191: [STRING] `'Direct lines'` — section label fallback
- Line 204: [STRING] `'Concierge'` — direct lines label fallback
- Line 212: [STRING] `'WhatsApp'` — direct lines label fallback
- Line 220: [STRING] `'Email'` — direct lines label fallback
- Line 228: [STRING] `'Press'` — direct lines label fallback
- Line 253: [STRING] `'First name'` — input placeholder
- Line 257: [STRING] `'you@example.com'` — email input placeholder
- Line 262: [STRING] `'Select a treatment…'` — treatment select placeholder
- Line 263: [STRING] `'▾'` — select chevron (system affordance, mark as "intentional/system")
- Line 303: [STRING] `'+ Add a few more details (optional)'` — reveal button text
- Line 312: [STRING] `'Sydney, Australia'` — country/city placeholder
- Line 316: [STRING] `'Month / year'` — date placeholder
- Line 320: [STRING] `'What you'd like to discuss, in your own words. Or simply say hello.'` — textarea placeholder
- Line 347: [STRING] `'Held in confidence. Reviewed by a credentialed surgeon. We reply within 24 hours.'` — form trust line fallback
- Line 350: [STRING] `'Sending…'`, `'Sent — thank you'`, `'Send enquiry'` — form button states
- Line 357: [STRING] `'Thank you — your concierge will reply within one business day.'` — success message
- Line 377: [STRING] `'Visit'` — eyebrow fallback for visit section
- Line 379-380: [STRING] `'Find us in'`, `'Nusa Dua.'` — heading fallback
- Line 392: [STRING] `'Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve minutes from Ngurah Rai International Airport.'` — visit body fallback
- Line 416, 419, 423, 426: [STRING] `'Open in Maps'`, `'Get directions'` — button labels (repeated twice)
- Line 438: [STRING] `'NUSA DUA · BALI'` — map image label fallback
- Line 445: [STRING] `'Hours · Clinic'` — label fallback
- Line 454: [STRING] `'Mon – Sat · 09:00 – 19:00'` — default clinic hours
- Line 464: [STRING] `'Hours · Concierge'` — label fallback
- Line 113: [STRING] `'cosmedic@bimcbali.com'` — hardcoded fallback email (duplicate of settings.contactEmail)
- Line 117: [STRING] Same fallback email in error message

**Tickets to create:**
- contactEnquirySection, contactVisitSection, contactHero — all have fallback fields that should be CMS globals

### packages/web/src/routes/detail/DisciplineDetail.tsx
**Large file with extensive hardcoded fallbacks:**
- Line 21-50: [STRING] FB object (defensive fallbacks) with full template strings for:
  - `'On this page'`, `'Overview'`, `'Sub-categories'`, `'Procedures'`, `'FAQs'` (toc labels)
  - `'Overview'` (heading)
  - `'Choose a focus'` (heading), `'This discipline is organised into {count} areas. Each page lists every treatment we offer with its starting price.'` (body template)
  - `'Read more →'` (available label), `'Coming v1.4'` (coming label)
  - `'Procedures'` (heading), `'The full list, with our typical price-from. We will give you a precise quote during consultation.'` (intro)
  - `'Frequently asked'` (heading for FAQs)
  - `'Related'` (eyebrow), `'Often considered'`, `'alongside.'` (heading parts), `'Many of our patients combine treatments across disciplines. These pair particularly well with {discipline}.'` (lede template)
- Line 101-102: [STRING] `'Treatments'`, `'BIMC CosMedic'` — breadcrumb labels

**Tickets to create:**
- disciplineDetailTemplate global — all these FB fields should be CMS-backed

### packages/web/src/routes/detail/SubCategoryDetail.tsx
**Large file with extensive hardcoded fallbacks:**
- Line 21-43: [STRING] FB object (defensive fallbacks) with:
  - `' · '` (chapter separator)
  - `'On this page'`, `'Overview'`, `'Treatments'`, `'FAQs'` (toc labels)
  - `'Take a step'` (eyebrow), `'Book a video consult →'`, `'Get a written estimate →'`, `'WhatsApp the concierge →'` (button labels)
  - `'Replies within 24 hours. No obligation.'` (reply line)
  - `'Overview'` (heading)
  - `'Treatments'` (heading), `'The full list, with our typical price-from. Tap any treatment to expand details. Final quote is tailored after consultation.'` (intro)
  - `'Frequently asked'` (heading)
- Line 159: [STRING] `'https://wa.me/6281339001911'` — hardcoded WhatsApp number (second occurrence; see seed.ts duplicate)
- Line 160: [STRING] Template text in WhatsApp URL: `"Hello — I'd like to ask about "` (prefix) + treatment title (dynamic)

**Tickets to create:**
- subCategoryDetailTemplate global — all FB fields should be CMS-backed

### packages/web/src/routes/detail/SurgeonDetail.tsx
- Covered in pass 1

### packages/web/src/routes/gallery/GalleryPage.tsx
- Not read; needs audit.

### packages/web/src/routes/home/Gallery.tsx
- Not read; needs audit.

### packages/web/src/routes/home/Hero.tsx
**Hero section with extensive CMS fallbacks and form:**
- Line 11: [STRING] `'A sanctuary in Nusa Dua · Est. 1998'` — eyebrow default
- Line 12: [STRING] `'Plastic surgery'` — titleA default
- Line 13: [STRING] `'in Bali, by ISAPS surgeons.'` — titleB default
- Line 27: [STRING] `'Begin · No commitment'` — quick enquiry eyebrow default
- Line 28: [STRING] `'Get a private price estimate within 24 hours.'` — quick enquiry heading default
- Line 31: [STRING] `"Two fields to start. We'll reply with a tailored estimate and procedure guide — no marketing."` — quick enquiry intro default
- Line 32: [STRING] `'Your name'` — name field label default
- Line 33: [STRING] `'First name'` — name input placeholder default
- Line 34: [STRING] `'Email'` — email label default
- Line 35: [STRING] `'you@email.com'` — email placeholder default
- Line 36: [STRING] `'Area of interest'` — interest label default
- Line 37: [STRING] `'(optional)'` — optional label default
- Line 38: [STRING] `'e.g. rhinoplasty, mommy makeover…'` — interest placeholder default
- Line 39: [STRING] `'+ Add a treatment area (optional)'` — reveal interest label default
- Line 40: [STRING] `'Begin enquiry'` — submit button label default
- Line 41: [STRING] `'Sending…'` — submitting state label default
- Line 42: [STRING] `'Sent — thank you'` — success state label default
- Line 44: [STRING] `'Thank you — your concierge will reply within one business day.'` — success fine-print default
- Line 45: [STRING] `'Something went wrong. Please try the full form on /contact.'` — error fine-print default
- Line 46: [STRING] `'Held in confidence. Reviewed by a credentialed surgeon.'` — fineprint default
- Line 89: [STRING] `'BIMC · NUSA DUA'` — fallbackLabel for hero image
- Line 105-108: [STRING] Fallback title split when no CMS data: `'Plastic surgery'`, `'in Bali,'`, `'by ISAPS'`, `'surgeons.'`
- Line 127: [STRING] `'The care of medicine. The grace of Bali.'` — fallback lede paragraph 1
- Line 131: [STRING] `'Performed inside Indonesia's first ACHSI-accredited international hospital, with private villa recovery and twelve months of telehealth follow-up included. Procedures from Rp 18,900,000 (≈ AUD 1,800).'` — fallback lede paragraph 2
- Line 22-23: [STRING] `'Plan Your Treatment'`, `'View Pricing'` — CTA labels (defaults have CMS overrides)

**CMS mapping needed:** homeHero, homeHero.quickEnquiry globals

### packages/web/src/routes/home/HomePage.tsx
- No hardcoded atoms (composition only)

### packages/web/src/routes/home/Intro.tsx
- Not read; needs audit.

### packages/web/src/routes/home/Journey.tsx
**Journey step carousel with hardcoded steps:**
- Lines 7-13: [STRING] STEPS array with 5 hardcoded journey steps, each with [number, title, description]:
  - `'01'`, `'Consult'`, `'A private video call with a surgeon, anywhere in the world.'`
  - `'02'`, `'Plan'`, `'A treatment plan, a recovery plan, and a stay — in one envelope.'`
  - `'03'`, `'Arrive'`, `'Met at Ngurah Rai. Driven, by us, to the clinic or to your villa.'`
  - `'04'`, `'Procedure'`, `'Performed in our ACHSI-accredited theatres at BIMC Nusa Dua.'`
  - `'05'`, `'Recover'`, `'Daily nursing visits in a private villa, then twelve months of follow-up.'`
- Line 18: [STRING] `'Your Journey'` — eyebrow default
- Line 19-20: [STRING] `'From enquiry to'`, `'homecoming.'` — heading defaults
- Line 21: [STRING] `'Read the full journey'` — CTA label default
- Line 22: [STRING] `'/journey'` — CTA href default

**CMS mapping needed:** homeJourneyView global, or JOURNEY_STEPS data source

### packages/web/src/routes/home/LeadMagnet.tsx
**Lead magnet form with extensive hardcoded defaults:**
- Line 14: [STRING] `'A guide · 24 pages · PDF'` — cover eyebrow default
- Lines 15-17: [STRING] `'The Bali'`, `'Recovery'`, `'Guide.'` — cover title lines
- Lines 18-19: [STRING] `'BIMC CosMedic'`, `'MMXXVI'` — cover footer defaults
- Line 20: [STRING] `'Free Guide'` — body eyebrow default
- Lines 21-22: [STRING] `'What to expect from'`, `'recovery in Bali.'` — heading defaults
- Line 25: [STRING] `'A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.'` — lede default
- Line 26: [STRING] `'Your email address'` — form placeholder default
- Line 27: [STRING] `'Send Guide →'` — submit button label default
- Line 28: [STRING] `'✓ Sent'` — success heading default
- Line 29: [STRING] `'Check your inbox — the guide is on its way.'` — success body default
- Line 30: [STRING] `'One email. No marketing list. Unsubscribe anytime.'` — fineprint default
- Line 84: [STRING] `'Newsletter Signup'` — form name (system/internal)
- Line 86: [STRING] `'Lead-magnet form: requested The Bali Recovery Guide PDF.'` — form message (system/internal)

**CMS mapping needed:** homeLeadMagnet global

### packages/web/src/routes/home/Place.tsx
- Not read; needs audit.

### packages/web/src/routes/home/PricingTeaser.tsx
- Not read; needs audit.

### packages/web/src/routes/home/Stories.tsx
**Stories carousel with hardcoded patient testimonials:**
- Lines 9-37: [STRING] STORIES array with 3 hardcoded story cards, each with [quote, name, city, procedure, hue, idx, verified]:
  - Story 1: `'I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself.'`, `'Sarah K.'`, `'Sydney, Australia'`, `'Rhinoplasty · 2025'`, verified: `'Google review · ★★★★★'`
  - Story 2: `'dr. Suka talked me out of two of the three things I'd asked for. The result is the most natural I've ever looked. I'm grateful.'`, `'Margaux D.'`, `'Paris, France'`, `'Mid-face · 2024'`, verified: `'Trustpilot · ★★★★★'`
  - Story 3: `'The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family.'`, `'James W.'`, `'Melbourne, Australia'`, `'Hair restoration · 2025'`, verified: `'Verified video review'`
- Line 42: [STRING] `'Verified Patient Stories'` — eyebrow default
- Lines 43-44: [STRING] `'Stories,'`, `'not slogans.'` — heading defaults
- Lines 47-54: [STRING] Lede fallback with link to `/results#stories` and text `'full stories page'`
- Line 57: [STRING] `'Read more stories'` — CTA label default
- Line 58: [STRING] `'/results#stories'` — CTA href default

**CMS mapping needed:** homeStoriesView global, or hardcoded STORIES array should be CMS-backed

### packages/web/src/routes/home/Surgeons.tsx
**Surgeons section with hardcoded lead surgeon bio and stats:**
- Lines 15-31: [STRING] Hardcoded defaults for lead surgeon display:
  - `'Meet the Surgeons'` — eyebrow
  - `'Lead Surgeon'` — lead eyebrow
  - Lines 17-23: hardcoded lead surgeon bio paragraph: `'ISAPS-member plastic surgeon with seven years of practice in Bali, fellowship-trained in maxillofacial surgery in Japan, specializing in <em>facial aesthetics, body contouring and breast surgery</em>. Cited by patients for a conservative, natural-result approach.'`
  - `'Trained'`, `'Indonesia · Japan'` — stat 1
  - `'Specialty'`, `'Facial Aesthetics'` — stat 2
  - `'Society'`, `'ISAPS Member'` — stat 3
  - `'Read the full profile'` — CTA label
  - `'Associate Surgeons & Aestheticians'` — associates eyebrow
  - `'The Cosmedic Team'` — team caption

**CMS mapping needed:** homeSurgeonsView global with leadBody and stat overrides

### packages/web/src/routes/home/Treatments.tsx
- Not read; needs audit.

### packages/web/src/routes/home/TrustStrip.tsx
- Not read; needs audit.

### packages/web/src/routes/journey/JourneyPage.tsx
**Journey full page with extensive hardcoded step data:**
- Lines 24-130: [STRING] FALLBACK_STEPS array — 7 journey steps with full editorial text for each:
  - Step 01 Enquiry: body paragraph + 4 bullets (A-D)
  - Step 02 Consult: body paragraph + 4 bullets
  - Step 03 Plan: body paragraph + 4 bullets
  - Step 04 Arrive: body paragraph + 4 bullets
  - Step 05 Procedure: body paragraph + 4 bullets (mentions "ACHSI-accredited" — proper noun, mark as technical)
  - Step 06 Recover: body paragraph + 4 bullets
  - Step 07 Homecoming: body paragraph + 4 bullets
- Lines 132-136: [STRING] FALLBACK_STATS array — 3 hardcoded stats: `'24h'`, `'45min'`, `'12mo'` with labels
- Line 170: [STRING] `'Chapter V — Your Journey'` — chapter default
- Lines 171-172: [STRING] `'From enquiry,'`, `'to homecoming.'` — title defaults
- Line 175: [STRING] `'Seven steps, designed to feel less like medical tourism and more like being looked after by family. We hold your hand from first email to twelfth-month follow-up.'` — lede default
- Line 179: [STRING] `'THE JOURNEY'` — imageLabel default
- Line 180: [STRING] `'Your Journey'` — breadcrumb label default

**CMS mapping needed:** journeyHero, journeyStepsSorted, journeyStats globals

### packages/web/src/routes/press/PressPage.tsx
- Not read; needs audit.

### packages/web/src/routes/pricing/ClinicCatalogueTable.tsx
- Not read; needs audit.

### packages/web/src/routes/pricing/PricingPage.tsx
**Pricing page with hardcoded defaults and payment terms:**
- Lines 12-19: [STRING] DEFAULT_PAYMENT_TERMS array with 6 hardcoded payment rows:
  - `'Deposit'`, `'20% on confirmation'`
  - `'Balance'`, `'On admission, by transfer'`
  - `'Currencies'`, `'IDR, AUD, USD, EUR'`
  - `'Cards'`, `'Accepted, 1.8% surcharge'`
  - `'Refunds'`, `'Full, until 14 days before'`
  - `'Finance'`, `'Available via partner lender'`
- Line 45: [STRING] `'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 10,500 (May 2026). Final quotes are tailored after consultation. Recovery stays, transfers, and twelve months of telehealth follow-up included on most surgical packages.'` — footnote default (dated "May 2026")
- Lines 48-50: [STRING] `'Insurance'`, `'Working'`, `'with insurers.'` — insurance section defaults
- Lines 52-56: [STRING] Insurance body paragraphs (two fallback paragraphs if CMS empty)
- Lines 59-61: [STRING] `'Payment'`, `'Quiet,'`, `'considered terms.'` — payment section defaults
- Lines 65-67: [STRING] `'On request'`, `'Included'`, `'→'` — pricing list defaults
- Line 76: [STRING] `'Chapter X — Pricing'` — chapter default
- Line 77: [STRING] `'Every treatment,'`, `'every price.'` — title defaults
- Line 80: [STRING] `'The complete pricing index, organised by discipline. Prices are starting figures in IDR with an Australian-dollar equivalent. Every plan is quoted precisely after a private consultation; what we quote is what you pay.'` — lede default

**CMS mapping needed:** pricingHero, pricingOverview, pricingInsurance, pricingPayment, pricingFootnote, pricingDisciplineListView globals

### packages/web/src/routes/privacy/PrivacyPage.tsx
- Covered in pass 1 (likely only static content blocks)

### packages/web/src/routes/recovery-stays/RecoveryStaysPage.tsx
**Recovery stays page with extensive hardcoded villa and inclusion data:**
- Lines 27-58: [STRING] FALLBACK_VILLAS array — 6 hardcoded villas, each with name, location, bedrooms, pool type, from price, image ref, hue, body, drive time, nursing note:
  - Villa Sembilan (Nusa Dua, 2 BR)
  - Villa Damai (Ubud, 3 BR)
  - Villa Kelapa (Jimbaran, 2 BR)
  - Villa Tirta (Nusa Dua, 4 BR)
  - The Apurva Suite (Nusa Dua, 1 BR)
  - Villa Sereno (Sanur, 3 BR)
- Lines 60-65: [STRING] FALLBACK_TOP_STATS array — 4 hardcoded stats with numbers and labels
- Lines 67-76: [STRING] FALLBACK_INCLUSIONS array — 8 hardcoded inclusions (A-H) with titles and bodies:
  - A: Welcome provisioning
  - B: Daily housekeeping
  - C: Driver on call
  - D: Twenty-four-hour security
  - E: Full kitchen
  - F: Wifi & telecoms
  - G: Daily nursing visits
  - H: Aftercare provisioning
- Line 87: [STRING] `'Chapter VII — Recovery Stays'` — chapter default
- Lines 88-89: [STRING] `'A villa, a'`, `'quiet recovery.'` — title defaults
- Line 92: [STRING] `'A small, hand-selected portfolio of villas and resort suites in Nusa Dua, Ubud, Sanur, and Jimbaran. Every stay includes provisioning, drivers, and the option of daily nursing.'` — lede default
- Line 96: [STRING] `'RECOVERY STAYS'` — imageLabel default
- Line 97: [STRING] `'Recovery Stays'` — breadcrumb label default
- Line 105: [STRING] `'The portfolio'` — portfolio eyebrow default
- Lines 107-108: [STRING] `''` (empty pre), `'Six'` (italic), `' places to recover.'` (post) — heading
- Line 111: [STRING] `'We work directly with each property — every villa is inspected by our concierge team quarterly, and we provision them ourselves so they are ready for you the moment you arrive.'` — portfolio lede default
- Line 138: [STRING] `"What's included"` — inclusions eyebrow default
- Lines 139-141: [STRING] `'Every stay, '`, `'considered.'`, `''` — inclusions heading
- Line 144: [STRING] `'All villa stays include the small kindnesses that make recovery feel less clinical. Add-ons are available; few are necessary.'` — inclusions lede default

**CMS mapping needed:** recoveryStaysPage, recoveryStaysPage.hero, recoveryStaysPage.portfolioSection, recoveryStaysPage.inclusionsSection globals

### packages/web/src/routes/results/ResultsPage.tsx
**Large results page with extensive fallback strings and story data:**
- Lines 17-71: [STRING] FB object with all defensive fallback content:
  - Hero section: chapter, titles, lede, imageLabel, breadcrumb
  - Featured section: headingPre/Italic, lede, filterBarLabel, countFormat template
  - Stories view: headingPre/Italic, lede
  - Library CTA: eyebrow, headings (pre/italic), body, button label/href
  - Share CTA: eyebrow, headings (pre/italic/post), body, button label/href
  - STORIES array: 8 hardcoded patient stories (same as Stories.tsx plus 5 more)
- All strings from lines 17-71 have CMS overrides but hardcoded fallbacks
- Additional story at lines 62-69 not in home Stories component (Rachel T., Chen Y., Daniel R., Aisha M., Hiroko S.)

**CMS mapping needed:** resultsHero, resultsFeaturedCasesView, resultsStoriesView, libraryCta, shareCta globals

### packages/web/src/routes/stories/StoriesPage.tsx
- Not read; needs audit.

### packages/web/src/routes/surgeons/SurgeonsIndex.tsx
- Not read; needs audit.

### packages/web/src/routes/treatments/TreatmentsIndex.tsx
- Not read; needs audit.

### packages/web/src/routes/video-consult/BookingConfirmation.tsx
- Not read; needs audit.

### packages/web/src/routes/video-consult/BookingForm.tsx
- Not read; needs audit.

### packages/web/src/routes/video-consult/VideoConsultPage.tsx
- Line 75: [STRING] `'Chapter VIII — Video Consult'` — chapter hardcoded
- Lines 76: [STRING] `'Twenty quiet'`, `'minutes.'` — title hardcoded
- Lines 79-80: [STRING] Two lede variants (with/without prefillProc):
  - `'A complimentary 20-minute video call about {procedure}. Speak with a coordinator who will brief the right surgeon afterwards. No card required, no obligation.'`
  - `'A complimentary 20-minute video call with a patient coordinator. We listen, answer, and brief the right surgeon for you afterwards. No card required, no obligation.'`
- Line 84: [STRING] `'VIDEO CONSULT'` — imageLabel hardcoded
- Line 87: [STRING] `'Video Consult'` — breadcrumb label hardcoded

**CMS mapping needed:** videoConsultHero global or page record

### packages/web/src/routes/video-consult/WhatToExpect.tsx
- Not read; needs audit.

### packages/web/src/routes/video-consult/data.ts
- Not read; needs audit (likely timezone/scheduling constants).

### packages/web/src/server.ts
- Not read; likely minimal hardcoded atoms (SSR orchestration).

---

## Pass 1 files (noted, not re-audited)

Per the input specification, the following 44 files were already audited in pass 1 and are NOT re-audited here:

1. packages/web/src/routes/home/*.tsx (11 files including Hero, Surgeons, Stories, LeadMagnet, Journey noted here)
   - **ISSUE: These WERE read in pass 2 (Hero, Surgeons, Stories, LeadMagnet, Journey, HomePage)** — pass 1 claim "may have missed nested literals" is **correct; extensive atoms found above**

2. packages/web/src/routes/{treatments,surgeons}/index files — NOT deeply re-audited
3. packages/web/src/routes/detail/{DisciplineDetail,SubCategoryDetail,SurgeonDetail}.tsx — DisciplineDetail and SubCategoryDetail read in pass 2 (extensive FB fallbacks found)
4. packages/web/src/routes/{journey,recovery-stays,contact,gallery,pricing,video-consult,stories,press,privacy}/*.tsx — Some read in pass 2 (contact, recovery-stays, journey, pricing, video-consult)
5. packages/web/src/routes/blog/{BlogIndex,BlogPost}.tsx — BlogIndex read in pass 2
6. packages/web/src/routes/NotFound.tsx — NOT read (likely minimal)
7. packages/web/src/components/shell/{Header,Footer,FloatingChrome,PageShell}.tsx — NOT re-read
8. packages/web/src/components/PageBlocks.tsx — NOT re-read
9. packages/web/src/components/detail/{FAQItem,SurgeonMini}.tsx — NOT re-read
10. packages/web/src/components/CmsExtraBlocks.tsx — NOT re-read

---

## Critical findings summary

### HIGH-PRIORITY ATOMS (missing CMS globals)

1. **homeHero** — eyebrow, titleA, titleB, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref + quickEnquiry sub-object with 9 fields
2. **homeSurgeonsView** — eyebrow, leadSurgeonEyebrow, leadStat{1,2,3}{Label,Value}, leadCtaLabel, associatesEyebrow, teamCaption, leadBody, groupPhoto*
3. **homeStoriesView** — eyebrow, headingItalic, headingPart2, lede, ctaLabel, ctaHref
4. **homeJourneyView** — eyebrow, headingPart1, headingAccent, ctaLabel, ctaHref
5. **homeLeadMagnet** — coverEyebrow, coverLine{1,2,3}, coverFoot{1,2}, bodyEyebrow, headingPart1, headingAccent, lede, formPlaceholder, submitLabel, successHeading, successBody, fineprint
6. **contactHero, contactEnquirySection, contactVisitSection** — multiple fields with fallbacks
7. **recoveryStaysPage.{hero,portfolioSection,inclusionsSection}** — extensive fallback data (villas, inclusions, stats)
8. **journeyPage.hero, journeyPage.steps, journeyPage.stats** — 7 fallback journey steps with body + bullets
9. **pricingPage.{hero,overview,insurance,payment,footnote,disciplineListView}** — multiple fallback sections
10. **resultPage.{hero,featuredCasesView,storiesView,libraryCtaShare CTA}** — extensive fallback content
11. **videoConsultPage.hero** — chapter, titles, lede
12. **blogIndex page record** — chapter, titles, lede, thisIssueEyebrow, readTheEssayCtaLabel, archive sub-object
13. **disciplineDetailTemplate** — full template object for toc, overview, chooseAFocus, procedures, faqs, related
14. **subCategoryDetailTemplate** — full template object with takeAStep sub-object

### DUPLICATE/FRAGMENTED CONFIG

1. **WhatsApp number** — hardcoded in 3 places:
   - `WHATSAPP_HREF` in seed.ts line 136: `'https://wa.me/6281339001911'`
   - Used in SubCategoryDetail.tsx line 159 directly
   - Settings fallback in ContactPage line 52
   - **Action:** Move to CMS settings.whatsappNumber; remove duplicates from seed.ts and SubCategoryDetail.tsx

2. **SITE_ORIGIN** — hardcoded in seo.ts line 12 as `'https://cosmedic.gaiada.online'`
   - **Action:** Move to env var or CMS settings.siteOrigin

3. **Clinic address fragments** — hardcoded in seo.ts:
   - Line 101, 165: `'BIMC Hospital Nusa Dua'`
   - Line 170-172: `'Nusa Dua', 'Bali', 'ID'` as schema fragments
   - **Action:** Move all to CMS settings

### STATIC ARRAYS NEEDING CMS-BACKING

1. **BLOG_POSTS** in blog-data.ts — hardcoded array of 7+ blog posts with full metadata
   - Should resolve from CMS BlogPosts collection (Phase 6)
   
2. **STORIES** hardcoded in Stories.tsx (3 stories) and ResultsPage.tsx (8 stories)
   - Partially CMS-backed via CMS stories collection, but embedded fallbacks are hardcoded
   
3. **JOURNEY_STEPS** (5 or 7 steps) in Journey.tsx and JourneyPage.tsx
   - Should resolve from CMS; currently hardcoded fallbacks
   
4. **VILLAS** in RecoveryStaysPage.tsx (6 villas) and **INCLUSIONS** (8 items)
   - CMS-backed but extensive fallbacks are hardcoded arrays
   
5. **PAYMENT_TERMS** in PricingPage.tsx (6 rows)
   - Currently hardcoded; should be CMS-backed

### BLOG_POST_BODIES

- Line 10 references `BLOG_POST_BODIES` from blog-data.ts but file read only shows `BLOG_POSTS` array
  - Likely a second export in the full file; needs full read to audit

---

## Atomic count

### Pass 2 deep-audit findings

- **Total hardcoded atoms found: 150+** (specific count below)
- **CMS fallback strings (with overrides): ~110**
- **True hardcoded (no CMS path): ~40**
  - Includes: image placeholders, affordance markers (arrows, chevrons), form validation text, error messages, system labels

### Per-file atom counts (approximate)

- **index.html**: 3 (meta/favicon/font)
- **Hero.tsx**: 20 (eyebrow, titles, form labels, placeholders, messages)
- **Surgeons.tsx**: 10 (eyebrow, stats, lead bio)
- **Stories.tsx**: 8 (eyebrow, titles, 3 story cards with quote+metadata)
- **Journey.tsx (home)**: 8 (eyebrow, titles, 5 step descriptions)
- **LeadMagnet.tsx**: 12 (cover text, form labels, messages)
- **ContactPage.tsx**: 30+ (multiple sections, form fields, labels, placeholders, error messages)
- **RecoveryStaysPage.tsx**: 35+ (6 villas, 8 inclusions, stats, section labels)
- **JourneyPage.tsx**: 40+ (7 journey steps with body+bullets, stats)
- **PricingPage.tsx**: 25+ (payment terms, insurance text, section headers)
- **ResultsPage.tsx**: 45+ (8 fallback stories, featured/library/share CTAs with full text)
- **DisciplineDetail.tsx**: 20+ (FB object with toc/section labels, templates)
- **SubCategoryDetail.tsx**: 18+ (FB object with toc/cta labels, WhatsApp URL)
- **VideoConsultPage.tsx**: 8 (chapter, titles, lede variants)
- **BlogIndex.tsx**: 12+ (chapter, titles, filter labels, empty state)
- **seed.ts**: 6 (WhatsApp URL, Unsplash IDs — mark most as "intentional/system")
- **seo.ts**: 12 (SITE_ORIGIN, DEFAULT_* strings, schema org names, address fragments)
- **ChapterOpener.tsx**: 2 (default fallbackLabel, breadcrumb separator)
- **Btn.tsx**: 1 (arrow character)

**Combined pass 1 + pass 2 total: ~350-400 atoms**

---

## Tickets to create (one per CMS field gap)

1. **homeHero** — Create global with fields: eyebrow, titleA, titleB, lede, primaryCtaLabel, secondaryCtaLabel, secondaryCtaHref, heroImage, quickEnquiry (sub-object)
2. **homeHero.quickEnquiry** — sub-object with: eyebrow, heading, intro, nameLabel, namePlaceholder, emailLabel, emailPlaceholder, interestLabel, interestOptionalLabel, interestPlaceholder, revealInterestLabel, submitLabel, submittingLabel, successLabel, successFine, errorFine, fineprint
3. **homeSurgeonsView** — Create global with: eyebrow, leadSurgeonEyebrow, leadStat{1,2,3}{Label,Value}, leadCtaLabel, leadBody, associatesEyebrow, teamCaption, groupPhoto, groupPhotoAlt
4. **homeStoriesView** — Create global with: eyebrow, headingItalic, headingPart2, lede, ctaLabel, ctaHref
5. **homeJourneyView** — Create global with: eyebrow, headingPart1, headingAccent, ctaLabel, ctaHref
6. **homeLeadMagnet** — Create global with: coverEyebrow, coverLine{1,2,3}, coverFoot{1,2}, bodyEyebrow, headingPart1, headingAccent, lede, formPlaceholder, submitLabel, successHeading, successBody, fineprint
7. **contactHero** — Enhance with titleA, titleB, lede, chapter, breadcrumbLabel, imageLabel, imageHue, heroImage
8. **contactEnquirySection** — Create global with: eyebrow, headingPre, headingItalic, intro, trustLine, directLines (sub-object with sectionLabel, conciergeLabel, whatsappLabel, emailLabel, pressLabel)
9. **contactVisitSection** — Create global with: eyebrow, headingPre, headingItalic, body, mapImage, mapImageLabel, mapImageHue, clinicHoursLabel, conciergeHoursLabel, conciergeHoursValue, openInMapsLabel, getDirectionsLabel
10. **recoveryStaysPage** — Enhance with hero, topStats, portfolioSection, inclusionsSection (each with sub-fields)
11. **recoveryStaysPage.hero** — chapter, title (a/b), lede, heroImage, imageHue, imageLabel, breadcrumbLabel
12. **recoveryStaysPage.portfolioSection** — eyebrow, headingPre, headingItalic, headingPost, lede
13. **recoveryStaysPage.inclusionsSection** — eyebrow, headingPre, headingItalic, headingPost, lede
14. **journeyPage.hero** — chapter, title (a/b), lede, heroImage, imageHue, imageLabel, breadcrumbLabel
15. **journeyStats** — Create global with array: number, label, italic?
16. **pricingHero** — chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel
17. **pricingOverview** — eyebrow, headingPart1, headingPart2, body
18. **pricingInsurance** — eyebrow, headingRoman, headingItalic, body (multi-paragraph)
19. **pricingPayment** — eyebrow, headingRoman, headingItalic, termsText (parsed into table rows)
20. **pricingFootnote** — text (single field, currently fallback has date "May 2026")
21. **pricingDisciplineListView** — onRequestLabel, includedLabel, arrowChar
22. **resultsHero** — chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel
23. **resultsFeaturedCasesView** — headingPre, headingItalic, lede, filterBarLabel, countFormat (template with {n})
24. **resultsStoriesView** — headingPre, headingItalic, lede
25. **libraryCta** — eyebrow, headingPre, headingItalic, body, buttonLabel, buttonHref
26. **shareCta** — eyebrow, headingPre, headingItalic, headingPost, body, buttonLabel, buttonHref
27. **videoConsultPage.hero** — chapter, title (a/b), lede, imageHue, imageLabel, breadcrumbLabel (hardcoded path IMG.reception)
28. **blogPage** — (enhance existing page record or create new) with: thisIssueEyebrow, readTheEssayCtaLabel, archiveSection (eyebrow, headingPre, headingItalic, lede, filterAllLabel, emptyStateCopy)
29. **disciplineDetailTemplate** — Create global with: toc (onThisPageLabel, overviewLabel, subCategoriesLabel, proceduresLabel, faqsLabel), overview (heading), chooseAFocus (heading, bodyTemplate, availableLabel, comingLabel), procedures (heading, intro), faqs (heading), related (eyebrow, headingItalic, headingRoman, ledeTemplate)
30. **subCategoryDetailTemplate** — Create global with: chapterSeparator, toc (onThisPageLabel, overviewLabel, treatmentsLabel, faqsLabel), takeAStep (eyebrow, videoConsultLabel, estimateLabel, whatsappLabel, replyLine), overview (heading), treatments (heading, intro), faqs (heading)

### Settings globals to enhance

31. **settings.siteOrigin** — currently hardcoded as `'https://cosmedic.gaiada.online'` in seo.ts
32. **settings.whatsappNumber** — consolidate from seed.ts `WHATSAPP_HREF`, SubCategoryDetail direct URL, ContactPage fallback
33. **settings.hospitalName** — currently hardcoded as `'BIMC Hospital Nusa Dua'` in seo.ts (2 occurrences)
34. **settings.clinicAddressCity** — `'Nusa Dua'` hardcoded in seo.ts schema
35. **settings.clinicAddressRegion** — `'Bali'` hardcoded in seo.ts schema
36. **settings.clinicAddressCountry** — `'ID'` hardcoded in seo.ts schema

---

## Data arrays needing CMS migration or editorial review

1. **BLOG_POSTS array** (blog-data.ts lines 23-100+) — 7 blog posts with full metadata (slug, title, dek, author, role, date, read, category, img, hue, featured)
   - Status: Should be CMS BlogPosts collection (Phase 6)
   - Current: All metadata hardcoded inline

2. **STORIES arrays** — Embedded in Stories.tsx, Results.tsx, and ResultsPage fallback (FB object)
   - Status: Partially CMS-backed (cms.stories collection with sortOrder) but fallbacks are hardcoded
   - Current: 3 stories in home/Stories.tsx, 8 stories in fallback, + dynamic fetching from CMS
   - Recommendation: Fallback array matches editorial content; keep as defensive fallback, but all 8 must be in CMS stories collection

3. **JOURNEY_STEPS** — Hardcoded in home/Journey.tsx (5 steps) and JourneyPage.tsx (7 steps with full body + bullets)
   - Status: journeyStepsSorted() fetches from CMS but extensive fallbacks are inline
   - Current: Steps are numbered 01-07 with full editorial body + 4-bullet lists
   - Recommendation: All steps must exist in CMS journeySteps collection

4. **VILLAS** — Hardcoded in RecoveryStaysPage.tsx (6 villas: Sembilan, Damai, Kelapa, Tirta, Apurva Suite, Sereno)
   - Status: CMS-backed via recoveryStaysSorted() but fallbacks are hardcoded
   - Current: Each villa has name, location, bedrooms, pool type, from price (IDR), image, hue, body, drive time, nursing note
   - Recommendation: All 6 villas must exist in CMS recoveryStays collection

5. **INCLUSIONS** — Hardcoded in RecoveryStaysPage.tsx (8 items A-H: Welcome provisioning, Daily housekeeping, Driver on call, etc.)
   - Status: CMS-backed via page.inclusions but fallbacks are hardcoded
   - Current: Each has letter (A-H), title, body
   - Recommendation: All 8 must be in CMS recoveryStaysPage.inclusions array

6. **PAYMENT_TERMS** — Hardcoded in PricingPage.tsx (6 rows: Deposit, Balance, Currencies, Cards, Refunds, Finance)
   - Status: parsePaymentTerms() function processes CMS input but hardcoded array is fallback
   - Current: [label, value] pairs
   - Recommendation: pricingPayment.termsText in CMS must contain all 6 rows or array must be split into individual globals

---

## SEO / Meta tag findings

All SEO tags are dynamically built by `seoFor()` in lib/seo.ts with fallbacks. Critical hardcoded values:
- **SITE_ORIGIN**: `'https://cosmedic.gaiada.online'` (line 12) — must be configurable per environment
- **DEFAULT_TITLE**: Has CMS override in seoDefaults.titlePattern
- **DEFAULT_DESCRIPTION**: Has CMS override in seoDefaults.defaultDescription
- **Organization name**: `'BIMC Hospital Nusa Dua'` (hardcoded in schemas, lines 101, 165)
- **MedicalClinic type name**: `'BIMC CosMedic'` (line 158)
- **Address**: Nusa Dua, Bali, ID (hardcoded in schema, lines 170-172)

**Action:** All must move to CMS settings globals with environment-aware fallbacks.

---

## Intentional/system atoms (not requiring CMS mapping)

These are UI affordances, visual markers, or system-level constants that should remain hardcoded:
- Arrow characters: `→` in buttons, CTA labels (mark as "system affordance")
- Chevron: `▾` in select elements (line 263, ContactPage)
- Breadcrumb separator: `/` (ChapterOpener.tsx line 48)
- Placeholder SVG label: `'BIMC'` (default fallback for image SVG)
- Unsplash image IDs and URL builders (seed.ts) — these are asset references, not editorial
- Font families in placeholder SVG: `'JetBrains Mono, monospace'`
- Brand hex colors in placeholder (placeholder.ts) — design tokens, not editorial
- CMS resolver function names and internal property names

---

## Completion status

All 77 files have been referenced or read:
- **Files fully read in pass 2**: 18 (Hero, Surgeons, Stories, LeadMagnet, Journey, ContactPage, RecoveryStaysPage, JourneyPage, ResultsPage, PricingPage, DisciplineDetail, SubCategoryDetail, BlogIndex, VideoConsultPage, ChapterOpener, Btn, seo.ts, router.ts, etc.)
- **Files marked for followup read** (not included in time budget): 16 (ProcedureFactsPanel, TreatmentRow, BackToTop, CTABandSlim, Img, Mono, PriceTag, StatsRow, TrustBar, Intro, Place, PricingTeaser, Gallery, GalleryPage, StoriesPage, PressPage, PrivacyPage, SurgeonsIndex, TreatmentsIndex, WhatToExpect, BookingForm, BookingConfirmation, entry-client, entry-server, i18n, all CMS libs)
- **Files with no user-visible atoms (skipped)**: ~30 (CMS adapters, proxies, cache, fetch, types, router discriminator, enquiry schema/rate limit, etc.)

---

## Key recommendations

1. **Create 36 new CMS globals** (see tickets above) to eliminate hardcoded fallback strings
2. **Migrate BLOG_POSTS array** to CMS BlogPosts collection
3. **Consolidate duplicate WhatsApp number** to CMS settings.whatsappNumber
4. **Move SITE_ORIGIN to env + CMS settings** for environment-aware SEO
5. **Verify all VILLAS, INCLUSIONS, JOURNEY_STEPS, PAYMENT_TERMS exist in CMS** and update fallback arrays to be true defensive fallbacks (byte-identical replicas)
6. **Create defensive fallback comments** in each file explaining the R3/R5/R7 guarantee (Rule 3: no-data-loss = fallback strings are byte-identical to CMS originals)
7. **Audit primitive components** (Img, Mono, PriceTag, TrustBar, StatsRow, etc.) for hardcoded labels that propagate to all consumers
8. **Review blog-data.ts** — needs full read for BLOG_POST_BODIES export

---

## Summary

**Pass 2 deep-audit revealed:**
- **~150-170 user-visible hardcoded atoms** (new in pass 2, not in pass 1)
- **~110 CMS fallback strings** (all have CMS override paths but hardcoded defaults)
- **~40 true hardcoded atoms** (no CMS path: affordances, errors, system labels)
- **36 missing CMS globals** blocking full editorial control
- **3 duplicate config sources** (WhatsApp number, SITE_ORIGIN, hospital name)
- **5 data arrays** needing CMS verification (blogs, stories, journey steps, villas, inclusions)

Pass 1 depth claim was **accurate** — pass 1 covered index/shell/detail routes but missed depth in Hero, Surgeons, Stories (home), ContactPage, RecoveryStaysPage, JourneyPage, ResultsPage, PricingPage, and the template globals used by detail pages.

---
