# CosMedic — Site ↔ CMS Map

> A plain-language guide for editors. Find anything you see on cosmedic.gaiada.online on the **left** — see exactly where to change it in Cosmedic CMS on the **right**. No technical knowledge needed.

---

## How to use this map

When you log into Cosmedic CMS (`/admin`), the left sidebar groups everything into **8 buckets**, each labelled like a section of the site:

| Bucket in the CMS sidebar | What it controls |
|---|---|
| **Homepage** | The home page itself, plus the header, footer, floating buttons, awards, press mentions, and the privacy page |
| **Treatments** | Everything under `/treatments` — disciplines, sub-categories, individual procedures |
| **Doctors** | The 8 surgeons and the `/surgeons` index page |
| **Results** | Before/after photos and the `/results` + `/gallery` pages |
| **Pricing** | The `/pricing` page and the consultation-fee callout |
| **Journey** | The patient-journey timeline, stories, recovery villas, and the blog |
| **Contact** | The `/contact` and `/video-consult` pages, incoming enquiries, form labels, email templates |
| **Media Library** | Every image and PDF on the site |

Inside each bucket you'll see two kinds of items:

- **Entries that already exist** — e.g. "Home Page", "Header", "Pricing Page". These are one-of-a-kind; you open them and edit. (Technically called *globals*, but you don't need to remember that.)
- **Lists you can add to** — e.g. "Surgeons", "Procedures", "Before/After Cases". These hold many items; you create / edit / delete rows. (Technically called *collections*.)

> **Rule of thumb:** if you're looking for the editorial copy on a specific page, open the bucket → click the entry with that page's name. If you're looking for an item in a list (a single surgeon, a single procedure, a single blog post), open the bucket → click the list → find the row.

---

## 🌐 The chrome — appears on every page

These elements show up on **every** route of the site. Edit them once; the change is everywhere.

| What you see on the site | Where to change it in the CMS |
|---|---|
| **Logo** (top-left of the top bar) | Homepage bucket → **Header** → *Logo (light/dark)* |
| **"Managed by BIMC Hospital"** line next to the logo | Homepage bucket → **Endorsement Mark** → *Endorsement line / Primary lockup* |
| **Top-nav menu items** (Treatments, Doctors, Results, Pricing, Your Journey, Contact) | Homepage bucket → **Header** → *Primary nav items* |
| **Mega-menu drop-down** under "Treatments" (the multi-column panel) | Homepage bucket → **Header** → *Primary nav items → Treatments → Mega Menu* |
| **EN \| ID language switcher** (top-right) | Homepage bucket → **Header** → *Locale switcher* |
| **Footer logo + tagline** | Homepage bucket → **Footer** → *Logo / Enquiry summary* |
| **Footer link columns** (the 3 columns of links) | Homepage bucket → **Footer** → *Link columns* |
| **Footer address block** | Homepage bucket → **Footer** → *Address block* |
| **Footer copyright line** | Homepage bucket → **Footer** → *Copyright template* |
| **Floating "Plan Your Treatment" pill** (bottom-right) | Homepage bucket → **Floating Chrome** → *CTA pill* (label, link, on/off) |
| **Floating WhatsApp bubble** (bottom-right) | Homepage bucket → **Floating Chrome** → *Chat* (on/off, provider) |
| **"28 years · 8 ISAPS-FICS · 3,400+ procedures · #1 hospital"** trust strip under the homepage hero | Homepage bucket → **Brand Stats** → *Stats array* (each number, label, source note) |
| **Page titles in browser tab + Google** | Homepage bucket → **SEO Defaults** → *Title pattern* (also per-page SEO inside each Page entry) |
| **Site name, address, phone, WhatsApp number, opening hours, social links** (used wherever the site shows them) | Homepage bucket → **Settings** |

---

## 🏠 Homepage — `/`

Edit at: **Homepage bucket → Home Page**

| What you see on the page (top to bottom) | Where to change it |
|---|---|
| **Hero headline** (e.g. "Restorative care…") + lede + hero photo | Home Page → *Hero* (Chapter title / Tagline / Lede / Hero image) |
| **Hero "Book consult" button** | Home Page → *Hero* (CTA fields) — *or* via Header CTA if it's the top-right pill |
| **Quick-enquiry form** beside the hero (name / email / message) | Contact bucket → **Form Defaults** (labels, placeholders, success message, error message) |
| **"Our Approach" intro section** (italic pull-quote + 2-column body) | Home Page → *Intro block* |
| **Treatments preview grid** (the 6 discipline cards) | **Card copy + photo:** Treatments bucket → **Disciplines** (one row per discipline) · **Section heading + lede:** Home Page → *Treatments block* |
| **Pricing teaser** (eyebrow + headline + lede + footnote + "View all" link) | Home Page → *Pricing teaser block* |
| **Surgeons strip** (Lead Surgeon panel + 3 stats + team photo + associates list) | **Lead surgeon + associates:** Doctors bucket → **Surgeons** · **Surrounding copy + stats:** Home Page → *Surgeons block* |
| **Gallery teaser** (before/after preview + CTA) | **Photos:** Results bucket → **Before/After Cases** · **Surrounding copy:** Home Page → *Gallery block* |
| **Lead-magnet section** (download form + cover image) | Home Page → *Lead magnet block* |
| **Journey teaser** (eyebrow + heading + CTA) | Home Page → *Journey block* (timeline content itself lives in Journey bucket → Journey Steps) |
| **Stories strip** (testimonial cards) | **Testimonials:** Journey bucket → **Stories** · **Surrounding copy:** Home Page → *Stories block* |
| **"Recover in paradise" place section** (lettered rows + CTA) | Home Page → *Place block* |
| **Page SEO** (title, description, og-image for `/`) | Home Page → *SEO* (at the bottom of the entry) |

---

## 💆 Treatments

### Treatments index — `/treatments`

Edit at: **Treatments bucket → Treatments Page**

| What you see | Where to change it |
|---|---|
| Hero headline + lede + hero photo | Treatments Page → *Hero* |
| The 6 discipline cards on this page | Treatments bucket → **Disciplines** (each row = one card) |
| Editorial copy between the hero and the cards (if any) | Treatments Page → *Blocks* |

### Discipline page — `/treatments/surgical`, `/treatments/non-surgical`, etc. (6 routes)

Edit at: **Treatments bucket → Disciplines → click the row**

| What you see | Where to change it |
|---|---|
| Discipline name + hero copy + photo | Disciplines → row → *Title / Hero* |
| List of sub-categories under this discipline | Treatments bucket → **Sub-Categories** (each row's parent discipline determines which page it appears on) |
| Lead surgeon panel | Doctors bucket → **Surgeons** (the *Lead surgeon* set on the discipline row) |
| Any FAQ, accordion, or extra editorial below | Disciplines → row → *Blocks* |

### Sub-category page — e.g. `/treatments/face`, `/treatments/breast` (22 routes)

Edit at: **Treatments bucket → Sub-Categories → click the row**

| What you see | Where to change it |
|---|---|
| Sub-category name + hero copy | Sub-Categories → row → *Title / Hero* |
| List of procedures (the accordion) | Treatments bucket → **Procedures** (each procedure row's parent sub-category determines where it shows) |
| Editorial body / FAQ | Sub-Categories → row → *Blocks* |

### Procedure detail — e.g. `/treatments/rhinoplasty` (41+ routes)

Edit at: **Treatments bucket → Procedures → click the row**

| What you see | Where to change it |
|---|---|
| Procedure name, summary, photos | Procedures → row → *Title / Summary / Media* |
| Inclusions / exclusions list | Procedures → row → *Inclusions / Exclusions* (free-text on the row itself) |
| Price (IDR + AUD) | Procedures → row → *Pricing* (or via Pricing bucket → Procedures) |
| "Recovery timeline" block | Journey bucket → **Journey Steps** (shared across all procedures) |
| Lead surgeon | Doctors bucket → **Surgeons** |

---

## 👩‍⚕️ Doctors

### Surgeons index — `/surgeons`

Edit at: **Doctors bucket → Surgeons Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Surgeons Page → *Hero* |
| The grid of surgeon cards | Doctors bucket → **Surgeons** (each row = one card) |
| Editorial body | Surgeons Page → *Blocks* |

### Surgeon detail — `/surgeons/{slug}` (8 routes)

Edit at: **Doctors bucket → Surgeons → click the row**

| What you see | Where to change it |
|---|---|
| Surgeon name, credentials, portrait | Surgeons → row → *Name / Credentials / Portrait* |
| Bio, specialties, journey, languages | Surgeons → row → *Bio / Specialties / etc.* |
| "Book a consult with [name]" CTA | Homepage bucket → **Header** (uses site-wide CTA) — surgeon-specific CTA lives on the row |

---

## 📸 Results

### Results page — `/results`

Edit at: **Results bucket → Results Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Results Page → *Hero* |
| Curated before/after set | Results bucket → **Before/After Cases** (mark cases as *featured* to appear here) |
| Editorial body | Results Page → *Blocks* |

### Gallery — `/gallery`

Edit at: **Results bucket → Gallery Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Gallery Page → *Hero* |
| Full before/after grid | Results bucket → **Before/After Cases** (every row appears here) |
| Each individual card (before image, after image, procedure label) | Before/After Cases → click the row |

---

## 💰 Pricing — `/pricing`

Edit at: **Pricing bucket → Pricing Page** (for editorial copy) + **Treatments bucket → Procedures** (for line items)

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Pricing Page → *Hero* |
| Editorial overview between hero and table | Pricing Page → *Overview block* |
| The price tables (every line item) | Treatments bucket → **Procedures** (one row per line item — name, category, IDR price, AUD price, notes, anaesthesia) |
| Centred italic footnote between tables | Pricing Page → *Footnote block* |
| Insurance + payment terms (two-column section near the bottom) | Pricing Page → *Insurance payment block* |
| **"Consultation fee" callout box** | Pricing bucket → **Consultation Policy** → *Fee IDR / Fee AUD / Waiver text / Display placements* |
| Exchange rate used for AUD prices | Homepage bucket → **Settings** → *AUD to IDR rate / Round IDR to* |

---

## 🛫 Journey

### Journey timeline — `/journey`

Edit at: **Journey bucket → Journey Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Journey Page → *Hero* |
| The patient-journey timeline steps | Journey bucket → **Journey Steps** (one row per step — order field controls sequence) |
| Editorial body | Journey Page → *Blocks* |

### Stories — `/stories`

Edit at: **Journey bucket → Stories Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Stories Page → *Hero* |
| Patient testimonial cards | Journey bucket → **Stories** (anonymous labels only per policy) |

### Recovery Stays — `/recovery-stays`

Edit at: **Journey bucket → Recovery Stays Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Recovery Stays Page → *Hero* |
| Villa partner cards | Journey bucket → **Recovery Stays** (one row per villa) |

### Blog index — `/blog`

Edit at: **Journey bucket → Blog Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Blog Page → *Hero* |
| Filter chips (e.g. "Surgical", "Recovery") | Journey bucket → **Blog Tags** |
| Post cards | Journey bucket → **Blog Posts** |

### Blog post — `/blog/{slug}`

Edit at: **Journey bucket → Blog Posts → click the post**

| What you see | Where to change it |
|---|---|
| Title, body, cover image | Blog Posts → row → *Title / Body / Cover* |
| Author byline + "About the author" | Journey bucket → **Authors** |
| "Filed under" tags | Blog Posts → row → *Tags* (drawn from **Blog Tags**) |

---

## 📰 Press — `/press`

Edit at: **Homepage bucket → Press Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Press Page → *Hero* |
| Press mentions grid (logos + headlines) | Homepage bucket → **Press Mentions** |
| Awards / accreditations strip (ACHSI, ISAPS, IPRAS, etc.) | Homepage bucket → **Awards** |

---

## ✉️ Contact

### Contact page — `/contact`

Edit at: **Contact bucket → Contact Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Contact Page → *Hero* |
| Address, phone, hours, WhatsApp, Google Maps link | Homepage bucket → **Settings** (used everywhere these appear) |
| Form labels, placeholders, success/error messages | Contact bucket → **Form Defaults** |
| Where incoming enquiries go (your inbox view) | Contact bucket → **Enquiries** (read-only on the public site — submissions land here) |
| The email the clinic + the submitter receive after a form submit | Contact bucket → **Email Templates** (per-template subject + body) |

### Video Consult — `/video-consult`

Edit at: **Contact bucket → Video Consult Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Video Consult Page → *Hero* |
| Editorial body | Video Consult Page → *Blocks* |
| Form labels / messages | Contact bucket → **Form Defaults** (shared with Contact) |

---

## 🔐 Privacy — `/privacy`

Edit at: **Homepage bucket → Privacy Page**

| What you see | Where to change it |
|---|---|
| Hero copy + photo | Privacy Page → *Hero* |
| Privacy policy body | Privacy Page → *Blocks* |

---

## 🖼️ Images everywhere

Every photo, logo, PDF, or icon on the site is uploaded once and reused.

| What you want to do | Where in the CMS |
|---|---|
| Upload a new photo | **Media Library** → drag-and-drop |
| Browse by section (homepage / treatments / doctors / etc.) | Media Library → *Category* filter, or *Folders* |
| Replace a photo on a specific page | Open the page entry → click the image field → "Choose from library" |

---

## Quick glossary

- **Bucket** — a section in the CMS sidebar (Homepage / Treatments / Doctors / Results / Pricing / Journey / Contact / Media Library).
- **Entry** — a single one-of-a-kind item you open and edit (Home Page, Header, Pricing Page, Settings, etc.). Always exists; you can't add another.
- **List** — a collection of many similar items (Surgeons, Procedures, Blog Posts, Before/After Cases, etc.). You can add / edit / delete rows.
- **Section / block** — a sub-area inside an entry, like *Hero*, *Intro block*, *Pricing teaser block*. Each one corresponds to a visible band on the live page.
- **Field** — the smallest editable thing: a headline, a paragraph, an image, a price, a checkbox.

---

## Still can't find it?

If you can see something on the live site but can't locate it in this map, two likely places:

1. **It's in Settings** — site-wide things like phone, address, social links, currency rates all live in *Homepage → Settings*.
2. **It's a Header or Footer item** — top bar and bottom bar elements are *Homepage → Header* / *Homepage → Footer*.

If it's neither, ask the developer — there may be a hard-coded string that needs to be moved into the CMS (those are bugs, not features).
