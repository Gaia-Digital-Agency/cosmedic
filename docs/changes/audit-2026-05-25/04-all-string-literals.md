# All string literals in TSX (2026-05-25)

Every quoted string literal in every .tsx/.ts file (77 files). Includes English-looking text only — filters out short tokens, imports, single chars.

### `components/PageBlocks.tsx` (2 literals)

```
348:    <SectionWrap heading={block.heading || 'Recovery Stays'}>
403:    <SectionWrap heading={block.heading || 'Your Journey'}>
```

### `components/detail/SurgeonMini.tsx` (1 literals)

```
21:      <Mono>{surgeon.lead ? 'Lead Surgeon' : 'Specialist'}</Mono>
```

### `components/primitives/BackToTop.tsx` (1 literals)

```
30:      aria-label="Back to top"
```

### `components/primitives/CTABandSlim.tsx` (3 literals)

```
14:  title = ['Begin your', 'journey.'],
16:  primary = 'Plan Your Treatment',
18:  secondary = 'Speak with a Concierge',
```

### `components/shell/FloatingChrome.tsx` (2 literals)

```
17:  const ctaLabel = fc?.ctaPill?.label || 'Plan Your Treatment'
78:          aria-label="WhatsApp the concierge"
```

### `components/shell/Footer.tsx` (6 literals)

```
58:    return [copyright, 'PT Trisaka Reksa Waluya', 'Designed in Bali']
63:  const cityLine = `${settings?.city || 'Nusa Dua'} ${settings?.postalCode || '80363'}, ${settings?.country || 'Bali, Indonesia'}`
65:  const brandTagline = fg?.brandTagline ?? 'Managed by BIMC Hospital'
68:  const newsletterLabel = fg?.newsletter?.label ?? 'Receive our quarterly journal'
69:  const newsletterPlaceholder = fg?.newsletter?.placeholder ?? 'Your email address'
87:            <input type="email" placeholder={newsletterPlaceholder} aria-label="Email address" />
```

### `components/shell/Header.tsx` (6 literals)

```
16:  const ctaLabel = cms?.floatingChrome?.ctaPill?.label || 'Plan Your Treatment'
27:  // logo PNG already contains "Managed by BIMC Hospital" baked in below the
85:    { key: 'surgical', label: 'Surgical Doctors', group: 'Plastic Surgery', anchor: 'surgical' },
86:    { key: 'aesthetic', label: 'Aesthetic Doctors', group: 'Aesthetic Medicine', anchor: 'aesthetic' },
210:              title="Indonesian locale coming soon"
242:            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
```

### `content/blog-data.ts` (16 literals)

```
26:    title: 'The quiet rhinoplasty',
42:    role: 'Patient Concierge Lead',
51:    title: 'The villa protocol.',
54:    role: 'Director of Recovery Stays',
69:    category: 'Non-surgical',
75:    title: 'What ACHSI accreditation actually means.',
114:  'Non-surgical',
144:    title: 'The quiet rhinoplasty',
161:      { kind: 'h', text: 'What restraint actually looks like' },
172:        text: "The total volume of tissue moved would not fill a teaspoon. And yet — her sister, her mother, her oldest friend will say only, 'You look well.'",
174:      { kind: 'h', text: 'The conversation before the surgery' },
198:          'Caudal septal extension only when the existing caudal septum is short.',
213:          'What is the smallest version of this operation that would solve the thing I came in for?',
245:    title: 'The villa protocol.',
262:    category: 'Non-surgical',
275:    title: 'What ACHSI accreditation actually means.',
```

### `lib/cms-adapters.ts` (2 literals)

```
41:  group: 'Plastic Surgery' | 'Aesthetic Medicine'
62:    group: s.group === 'plastic-surgery' ? 'Plastic Surgery' : 'Aesthetic Medicine',
```

### `lib/cms.types.ts` (1 literals)

```
241:  /** Optional override for "Drive to clinic" cell; if blank derived from location. */
```

### `lib/enquiry-schema.ts` (1 literals)

```
15:  email: z.string().trim().email('Invalid email').max(160),
```

### `lib/seo.ts` (2 literals)

```
102:          address: { '@type': 'PostalAddress', addressLocality: 'Nusa Dua', addressCountry: 'ID' },
169:            addressLocality: 'Nusa Dua',
```

### `routes/blog/BlogIndex.tsx` (3 literals)

```
46:  const titleA = page?.chapterTitle?.a || 'Notes from'
54:  const thisIssueEyebrow = page?.thisIssueEyebrow || 'This issue'
57:  const archiveEyebrow = archive.eyebrow || 'The archive'
```

### `routes/blog/BlogPost.tsx` (9 literals)

```
28:  // surgeon profile, badge the byline with a "View clinician profile" link.
39:      ? `${surgeonProfile.commonName || surgeonProfile.name || 'Surgeon profile'}`
47:  const writtenByLabel = byline.writtenByLabel || 'Written by'
50:  const filedUnderLabel = byline.filedUnderLabel || 'Filed under'
51:  const aboutEyebrow = aboutSec.eyebrowLabel || 'About the author'
52:  const readFullProfileCta = aboutSec.readFullProfileCta || 'Read full profile'
53:  const bookConsultationCta = aboutSec.bookConsultationCta || 'Book a consultation'
54:  const moreEyebrow = moreSec.eyebrow || 'More from the journal'
57:  const backToJournalCta = moreSec.backToJournalCta || 'Back to the journal'
```

### `routes/contact/ContactPage.tsx` (19 literals)

```
15:    eyebrow: 'Written estimate',
16:    title: 'Get a written estimate.',
20:    eyebrow: 'Video consult',
21:    title: 'Book a video consult.',
88:        headers: { 'Content-Type': 'application/json' },
110:        setErrorMessage(body.issues?.[0]?.message || 'Please check the form and try again.')
137:  const heroBreadcrumb = hero.breadcrumbLabel || 'Plan Your Journey'
167:              <Eyebrow>{enquiry.eyebrow || 'The Enquiry'}</Eyebrow>
169:                {enquiry.headingPre || 'Tell us a little'}{' '}
191:                <Mono>{directLines.sectionLabel || 'Direct lines'}</Mono>
253:                <input type="text" placeholder="First name" required value={name} onChange={(e) => setName(e.target.value)} />
320:                    <textarea placeholder="What you'd like to discuss, in your own words. Or simply say hello." value={message} onChange={(e) => setMessage(e.target.value)} />
350:                  <span>{submitting ? 'Sending…' : status === 'success' ? 'Sent — thank you' : 'Send enquiry'}</span>
379:                {visit.headingPre || 'Find us in'}{' '}
380:                <span className="italic">{visit.headingItalic || 'Nusa Dua.'}</span>
416:                    {visit.openInMapsLabel || 'Open in Maps'}
419:                  <Btn kind="ghost">{visit.openInMapsLabel || 'Open in Maps'}</Btn>
423:                    {visit.getDirectionsLabel || 'Get directions'}
426:                  <Btn kind="ghost">{visit.getDirectionsLabel || 'Get directions'}</Btn>
```

### `routes/detail/DisciplineDetail.tsx` (4 literals)

```
25:    subCategoriesLabel: 'Sub-categories',
31:    heading: 'Choose a focus',
42:  faqs: { heading: 'Frequently asked' },
45:    headingItalic: 'Often considered',
```

### `routes/detail/SubCategoryDetail.tsx` (2 literals)

```
30:    eyebrow: 'Take a step',
42:  faqs: { heading: 'Frequently asked' },
```

### `routes/detail/SurgeonDetail.tsx` (8 literals)

```
20:  heroLeadLabel: 'Lead Surgeon',
22:  heroCtaConsultLabel: 'Request a consultation',
26:  statLabelYears: 'Years in practice',
38:  specialtyEyebrow: 'Specialty areas',
41:  trainingRowLabels: ['Medical Degree', 'Specialty Training', 'Suffix', 'Practice', 'Memberships'],
42:  trainingRowRights: ['MBBS / MD', 'Board credential', 'Active', 'Active member'],
43:  facultyEyebrow: 'The faculty',
93:  const relSlug = s.group === 'Plastic Surgery' ? 'surgical' : 'non-surgical'
```

### `routes/gallery/GalleryPage.tsx` (3 literals)

```
25:  filterBarLabel: 'Featured cases',
28:    eyebrow: 'Private gallery',
33:    buttonLabel: 'Request the full library',
```

### `routes/home/Gallery.tsx` (2 literals)

```
15:  const lede = g?.lede || 'Three signature results from our facial repertoire.'
16:  const ctaLabel = g?.ctaLabel || 'View the full gallery'
```

### `routes/home/Hero.tsx` (8 literals)

```
12:  const titleA = g?.titleA || 'Plastic surgery'
22:  const primaryCtaLabel = g?.primaryCtaLabel || 'Plan Your Treatment'
23:  const secondaryCtaLabel = g?.secondaryCtaLabel || 'View Pricing'
32:  const qeNameLabel = qe?.nameLabel || 'Your name'
33:  const qeNamePlaceholder = qe?.namePlaceholder || 'First name'
36:  const qeInterestLabel = qe?.interestLabel || 'Area of interest'
40:  const qeSubmitLabel = qe?.submitLabel || 'Begin enquiry'
62:        headers: { 'Content-Type': 'application/json' },
```

### `routes/home/Intro.tsx` (2 literals)

```
9:  const eyebrow = g?.eyebrow || 'Our Approach'
18:    "Our centre sits within Indonesia's most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists — fellowship-trained in Korea, Japan, Singapore and across Indonesia — work alongside a concierge team that handles everything from your arrival at Ngurah Rai to your final follow-up by video."
```

### `routes/home/Journey.tsx` (4 literals)

```
11:  ['04', 'Procedure', 'Performed in our ACHSI-accredited theatres at BIMC Nusa Dua.'],
18:  const eyebrow = g?.eyebrow || 'Your Journey'
19:  const headingPart1 = g?.headingPart1 || 'From enquiry to'
21:  const ctaLabel = g?.ctaLabel || 'Read the full journey'
```

### `routes/home/LeadMagnet.tsx` (6 literals)

```
15:  const coverLine1 = g?.coverLine1 || 'The Bali'
20:  const bodyEyebrow = g?.bodyEyebrow || 'Free Guide'
21:  const headingPart1 = g?.headingPart1 || 'What to expect from'
26:  const formPlaceholder = g?.formPlaceholder || 'Your email address'
82:                    headers: { 'Content-Type': 'application/json' },
84:                      name: 'Newsletter Signup',
```

### `routes/home/Place.tsx` (2 literals)

```
19:  const eyebrow = g?.eyebrow || 'Recovery in Bali'
29:  const ctaLabel = g?.ctaLabel || 'View recovery stays'
```

### `routes/home/PricingTeaser.tsx` (5 literals)

```
9:  { name: 'Breast Augmentation', aud: 5800, slug: 'surgical-breast' },
11:  { name: 'Sapphire FUE Hair', aud: 3400, slug: 'hair-fue' },
14:  { name: 'Botulinum Toxin', aud: 320, slug: 'non-surgical-injectables' },
15:  { name: 'Dermal Fillers', aud: 480, slug: 'non-surgical-injectables' },
33:  const viewAllLabel = g?.viewAllLabel || 'View full pricing'
```

### `routes/home/Stories.tsx` (6 literals)

```
12:    n: 'Sarah K.',
21:    n: 'Margaux D.',
30:    n: 'James W.',
35:    verified: 'Verified video review',
42:  const eyebrow = g?.eyebrow || 'Verified Patient Stories'
57:  const ctaLabel = g?.ctaLabel || 'Read more stories'
```

### `routes/home/Surgeons.tsx` (5 literals)

```
15:  const eyebrow = g?.eyebrow || 'Meet the Surgeons'
16:  const leadSurgeonEyebrow = g?.leadSurgeonEyebrow || 'Lead Surgeon'
28:  const leadStat2Value = g?.leadStat2Value || 'Facial Aesthetics'
31:  const leadCtaLabel = g?.leadCtaLabel || 'Read the full profile'
33:  const teamCaption = g?.teamCaption || 'The Cosmedic Team'
```

### `routes/home/TrustStrip.tsx` (2 literals)

```
6:  { number: '28', label: 'Years in practice' },
8:  { number: '3,400+', label: 'Procedures performed' },
```

### `routes/journey/JourneyPage.tsx` (18 literals)

```
35:      ['B', 'Private booking link'],
36:      ['C', 'All major languages'],
37:      ['D', 'Held in confidence'],
65:      ['B', 'All-inclusive pricing'],
67:      ['D', 'Refined together'],
79:      ['A', 'Met at airport gate'],
80:      ['B', 'Black-car transfer'],
82:      ['D', 'Pre-op scan day after arrival'],
95:      ['B', 'Australian-standard anaesthesia'],
96:      ['C', 'Concierge with you throughout'],
110:      ['B', 'Daily nursing visits'],
124:      ['A', 'Black-car to airport'],
126:      ['C', 'Unlimited WhatsApp messaging'],
127:      ['D', 'Onward referrals if needed'],
133:  { number: '24h', label: 'Reply to first enquiry' },
134:  { number: '45min', label: 'Initial consultation' },
135:  { number: '12mo', label: 'Follow-up programme' },
180:  const breadcrumbLabel = hero?.breadcrumbLabel || 'Your Journey'
```

### `routes/press/PressPage.tsx` (3 literals)

```
27:  const titleA = page?.chapterTitle?.a || 'Held to the'
37:  const accredHeading = accred.heading || 'The credentials we hold.'
47:  const pressEnquiriesCta = page?.pressEnquiriesCtaLabel || 'Press enquiries'
```

### `routes/pricing/ClinicCatalogueTable.tsx` (15 literals)

```
32:  surgical: { title: 'Surgical Procedures', subtitle: '2025 & 2026 pricing · IDR + AUD' },
33:  machine: { title: 'Machine Treatments', subtitle: 'Erbium · AFT · Q-switched · Pixel' },
34:  injection: { title: 'Injectable Catalogue', subtitle: 'Named brand pricing per ml / unit' },
40:  'upper-body': 'Upper Body',
41:  'lower-body': 'Lower Body',
43:  other: 'Other BTL',
47:  'botulinum-toxin': 'Botulinum Toxin',
48:  filler: 'Dermal Fillers',
49:  'skin-booster': 'Skin Boosters',
50:  'collagen-stimulator': 'Collagen Stimulators',
51:  'bio-remodeling': 'Bio-Remodeling',
52:  'thread-lift': 'Thread Lift',
360:    p.bodyZone ? hairZoneLabels[p.bodyZone] : (hairZoneLabels.other || 'Other BTL'),
367:  const headingRoman = view.headingRoman || 'The full'
432:                        ? 'Includes implant'
```

### `routes/pricing/PricingPage.tsx` (1 literals)

```
18:  ['Finance', 'Available via partner lender'],
```

### `routes/recovery-stays/RecoveryStaysPage.tsx` (27 literals)

```
29:    name: 'Villa Sembilan', loc: 'Nusa Dua', br: '2 BR', pool: 'Private', fromIdr: 2_940_000, img: IMG.villa1, hue: 0,
31:    driveTime: '5 min', nursingNote: 'Available daily',
34:    name: 'Villa Damai', loc: 'Ubud', br: '3 BR', pool: 'Private', fromIdr: 4_410_000, img: IMG.villa2, hue: 1,
36:    driveTime: '45 min', nursingNote: 'Available daily',
39:    name: 'Villa Kelapa', loc: 'Jimbaran', br: '2 BR', pool: 'Private', fromIdr: 3_360_000, img: IMG.villa3, hue: 2,
41:    driveTime: '15 min', nursingNote: 'Available daily',
44:    name: 'Villa Tirta', loc: 'Nusa Dua', br: '4 BR', pool: 'Private', fromIdr: 6_090_000, img: IMG.villa4, hue: 3,
46:    driveTime: '5 min', nursingNote: 'Available daily',
49:    name: 'The Apurva Suite', loc: 'Nusa Dua', br: '1 BR', pool: 'Resort', fromIdr: 5_460_000, img: IMG.villa5, hue: 4,
51:    driveTime: '5 min', nursingNote: 'Available daily',
54:    name: 'Villa Sereno', loc: 'Sanur', br: '3 BR', pool: 'Private', fromIdr: 3_990_000, img: IMG.villa6, hue: 5,
56:    driveTime: '25 min', nursingNote: 'Available daily',
61:  { number: '6', label: 'Curated villas' },
62:  { number: '4', label: 'Locations across Bali' },
64:  { number: 'All', label: 'Provisioned by us', italic: true },
68:  { letter: 'A', title: 'Welcome provisioning', body: 'Fresh linens, groceries for two days, your favourite tea waiting.' },
69:  { letter: 'B', title: 'Daily housekeeping', body: 'Twice-daily turndown, laundry on request.' },
70:  { letter: 'C', title: 'Driver on call', body: '24-hour driver service, included for you and your party.' },
71:  { letter: 'D', title: 'Twenty-four-hour security', body: 'Every villa is staffed continuously.' },
72:  { letter: 'E', title: 'Full kitchen', body: 'We will stock it with what you ask us to stock it with.' },
74:  { letter: 'G', title: 'Daily nursing visits', body: 'By arrangement — included in surgical packages.' },
75:  { letter: 'H', title: 'Aftercare provisioning', body: 'Pharmacy, dressings, and post-op food restocked daily.' },
79:  loc === 'Nusa Dua' ? '5 min' : loc === 'Jimbaran' ? '15 min' : loc === 'Sanur' ? '25 min' : '45 min'
97:  const breadcrumbLabel = hero?.breadcrumbLabel || 'Recovery Stays'
105:  const portfolioEyebrow = portfolio?.eyebrow || 'The portfolio'
131:            nursingNote: v.nursingNote || fallback?.nursingNote || 'Available daily',
138:  const inclusionsEyebrow = inclusionsSec?.eyebrow || "What's included"
```

### `routes/results/ResultsPage.tsx` (13 literals)

```
33:    filterBarLabel: 'Featured cases',
43:    eyebrow: 'Private gallery',
48:    buttonLabel: 'Request the full library',
52:    eyebrow: 'Sharing your story',
58:    buttonLabel: 'Write to us',
62:    { q: 'I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself. The villa, the daily nursing, the slow afternoons — all of it felt like the opposite of medical tourism. It felt like being looked after.', n: 'Sarah K.', c: 'Sydney, Australia', p: 'Rhinoplasty · 2025', hue: 1 },
63:    { q: "dr. Suka talked me out of two of the three things I'd asked for. The result is the most natural I've ever looked. I'm grateful — and a little stunned that anyone would turn down work in a market like this. They are different here.", n: 'Margaux D.', c: 'Paris, France', p: 'Mid-face · 2024', hue: 3 },
64:    { q: "The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family. My concierge still texts me on the anniversary of my surgery. That's the part you don't see in the brochure.", n: 'James W.', c: 'Melbourne, Australia', p: 'Hair restoration · 2025', hue: 5 },
65:    { q: 'I had a complication on day three. The nurse was at my villa within twenty minutes; my surgeon was there within the hour. Nothing was hidden, nothing was rushed. They handled it with the kind of calm I associate with the very best hospitals at home.', n: 'Rachel T.', c: 'Auckland, New Zealand', p: 'Abdominoplasty · 2024', hue: 2 },
66:    { q: 'I am a slow decision-maker. My initial consultation was in March; my procedure was in November. They never rushed me, never tried to upsell, never made me feel anything other than welcome. By the time I arrived, I had no anxiety left at all.', n: 'Chen Y.', c: 'Singapore', p: 'Eyelid surgery · 2024', hue: 0 },
67:    { q: 'The Bali part of it was almost incidental in the end — I came for the surgeon, not the location. But by week two of recovery, watching the ocean from the villa, I understood why everyone insists on saying it. Recovery here is not the same as recovery at home.', n: 'Daniel R.', c: 'Los Angeles, USA', p: 'Facelift · 2025', hue: 4 },
68:    { q: 'My partner was nervous about flying somewhere for surgery. The concierge spoke to him directly, sent him photos of the villa, walked him through the safety record of the hospital. By the time we landed, he was the calm one. They thought of everything.', n: 'Aisha M.', c: 'London, UK', p: 'Liposculpture · 2025', hue: 1 },
69:    { q: "I had veneers fitted in three visits over fourteen days. The on-site ceramicist refined the shade twice — once between try-in and final placement, once after I'd lived with the smile for a day. It is the most considered piece of dental work I've ever had.", n: 'Hiroko S.', c: 'Tokyo, Japan', p: 'Smile design · 2024', hue: 3 },
```

### `routes/stories/StoriesPage.tsx` (10 literals)

```
26:    eyebrow: 'Sharing your story',
32:    buttonLabel: 'Write to us',
36:    { q: 'I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself. The villa, the daily nursing, the slow afternoons — all of it felt like the opposite of medical tourism. It felt like being looked after.', n: 'Sarah K.', c: 'Sydney, Australia', p: 'Rhinoplasty · 2025', hue: 1 },
37:    { q: "dr. Suka talked me out of two of the three things I'd asked for. The result is the most natural I've ever looked. I'm grateful — and a little stunned that anyone would turn down work in a market like this. They are different here.", n: 'Margaux D.', c: 'Paris, France', p: 'Mid-face · 2024', hue: 3 },
38:    { q: "The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family. My concierge still texts me on the anniversary of my surgery. That's the part you don't see in the brochure.", n: 'James W.', c: 'Melbourne, Australia', p: 'Hair restoration · 2025', hue: 5 },
39:    { q: 'I had a complication on day three. The nurse was at my villa within twenty minutes; my surgeon was there within the hour. Nothing was hidden, nothing was rushed. They handled it with the kind of calm I associate with the very best hospitals at home.', n: 'Rachel T.', c: 'Auckland, New Zealand', p: 'Abdominoplasty · 2024', hue: 2 },
40:    { q: 'I am a slow decision-maker. My initial consultation was in March; my procedure was in November. They never rushed me, never tried to upsell, never made me feel anything other than welcome. By the time I arrived, I had no anxiety left at all.', n: 'Chen Y.', c: 'Singapore', p: 'Eyelid surgery · 2024', hue: 0 },
41:    { q: 'The Bali part of it was almost incidental in the end — I came for the surgeon, not the location. But by week two of recovery, watching the ocean from the villa, I understood why everyone insists on saying it. Recovery here is not the same as recovery at home.', n: 'Daniel R.', c: 'Los Angeles, USA', p: 'Facelift · 2025', hue: 4 },
42:    { q: 'My partner was nervous about flying somewhere for surgery. The concierge spoke to him directly, sent him photos of the villa, walked him through the safety record of the hospital. By the time we landed, he was the calm one. They thought of everything.', n: 'Aisha M.', c: 'London, UK', p: 'Liposculpture · 2025', hue: 1 },
43:    { q: "I had veneers fitted in three visits over fourteen days. The on-site ceramicist refined the shade twice — once between try-in and final placement, once after I'd lived with the smile for a day. It is the most considered piece of dental work I've ever had.", n: 'Hiroko S.', c: 'Tokyo, Japan', p: 'Smile design · 2024', hue: 3 },
```

### `routes/surgeons/SurgeonsIndex.tsx` (8 literals)

```
20:    titleA: 'Hands you',
28:    sectionEyebrow: 'Lead Plastic Surgeon',
29:    blockEyebrow: 'Lead Surgeon',
33:    ctaLabel: 'Read the full profile',
36:    eyebrow: 'Plastic Surgery',
43:    eyebrow: 'Aesthetic Medicine',
90:  const PLASTIC = SURGEON_LIST.filter((s) => s.group === 'Plastic Surgery')
91:  const AESTHETIC = SURGEON_LIST.filter((s) => s.group === 'Aesthetic Medicine')
```

### `routes/treatments/TreatmentsIndex.tsx` (6 literals)

```
30:    heading: 'Browse by discipline.',
33:    readMoreLabel: 'Read more',
37:    { number: '28', label: 'Years in Bali' },
38:    { number: '2,400+', label: 'Procedures yearly' },
39:    { number: '8', label: 'Specialists on faculty' },
40:    { number: '96%', label: 'Patient satisfaction' },
```

### `routes/video-consult/BookingForm.tsx` (1 literals)

```
128:            <input type="text" placeholder="First name" value={p.name} onChange={(e) => p.setName(e.target.value)} required />
```

### `routes/video-consult/VideoConsultPage.tsx` (5 literals)

```
30:    if (proc) setTopic('Not sure yet')
49:        headers: { 'Content-Type': 'application/json' },
76:        title={['Twenty quiet', 'minutes.']}
87:          { label: 'Plan Your Journey', href: '/contact' },
88:          { label: 'Video Consult' },
```

### `routes/video-consult/WhatToExpect.tsx` (2 literals)

```
8:  ['I.', 'Twenty minutes', 'Long enough to listen, short enough not to overstay.'],
10:  ['III.', 'Zoom or Google Meet', 'Whichever your country prefers. Link emailed on booking.'],
```

### `routes/video-consult/data.ts` (3 literals)

```
11:  'Hair Restoration',
12:  'Non-surgical',
14:  'Not sure yet',
```

### `server.ts` (3 literals)

```
90:      res.setHeader('Retry-After', String(limit.retryAfterSeconds))
101:        headers: { 'Content-Type': 'application/json' },
220:        .set({ 'Content-Type': 'text/html' })
```

