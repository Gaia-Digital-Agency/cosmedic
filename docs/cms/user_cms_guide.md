# Cosmedic CMS — User Guide
**For:** the clinic content team · **Updated:** 2026-05-30
**Login URL:** https://cosmedic.gaiada.online/admin

> The CMS is where you edit everything on the website — text, images, prices, doctors, blog. Changes go live within ~1 minute. You never touch code.

---

## 🔑 Log In
1. Go to **https://cosmedic.gaiada.online/admin**
2. Enter your **email** and **password** → click **Login**.
- Forgot password? Use **"Forgot your password?"** on the login screen.

## 🚪 Log Out
- The **exit icon (↩ door)** is at the **very bottom of the left sidebar**.

## 👤 Your Account
Click your **avatar / initials** at the top of the sidebar:
- **My Account** — change your email or password
- **Theme** — Light / Dark / Auto (CMS defaults to Light)
- **Log out** — sign out

---

## 🗂️ How the CMS is organised

The sidebar has **8 sections** (buckets). Each section has **cards** — click any card to edit.

| Section | What you edit there |
|---|---|
| **Homepage** | Hero, section headings, doctors banner, lead magnet, place, settings |
| **Procedures** | All treatment and pricing page content + the full catalogue |
| **Experts** | Surgeon profile page content + individual surgeon records |
| **Results** | Before/after cases + patient stories |
| **Journey** | Recovery stays page + villa records + journey steps |
| **Contact** | Contact page + visit section + enquiries inbox |
| **Publications** | Blog posts + press mentions + awards |
| **Collections** | Users (team login accounts) |

> **Dark card = one item to edit** (a Global — e.g. "Hero") · **Light card = a list** (a Collection — e.g. "Surgeons")

---

<div style="page-break-after: always;"></div>

# 🏠 Homepage

## Hero card
The top section of the homepage.

| Field | What it controls |
|---|---|
| **Title — Line A** | Big headline, line 1 (roman type) |
| **Title — Line B** | Big headline, line 2 (italic) |
| **Intro paragraph** | Paragraph beneath the headline |
| **Primary CTA label** | Main button text |
| **Secondary CTA label** | Second button text |
| **Hero image** | Full-width background photo |

---

## Sections card
Section headings and intro paragraphs for the four mid-page sections on the homepage. Each section has its own sub-group inside the card.

| Section | Fields |
|---|---|
| **Treatments** | Eyebrow · Heading (A + B) · Intro paragraph |
| **Pricing** | Eyebrow · Heading (A + B) · Intro paragraph · Footnote · View-all button text |
| **Gallery** | Eyebrow · Heading (A + B) · Intro paragraph · CTA label |
| **Stories** | Eyebrow · Heading (A + B) · Intro paragraph · CTA label |

---

## Surgeons card
The full-width team banner on the homepage.

| Section | Fields |
|---|---|
| **Team Heading** | Banner headline (split on comma: before = roman, after = italic) |
| **Body & CTA** | Body paragraph · Button text |
| **Photo** | Group photo · Alt text |

---

## Lead Magnet card
The "Bali Recovery Guide" download section.

| Section | Fields |
|---|---|
| **Cover** | Cover image · Cover title (3 lines) · Cover footer |
| **Heading** | Heading (roman part + italic part) |
| (flat) | Intro paragraph · Email placeholder · Submit button text |

---

## Place card
The "Recover in paradise" section.

| Field | What it controls |
|---|---|
| **Heading (A + B)** | Section headline |
| **Body** | Paragraph describing Nusa Dua |
| **CTA label** | Button text |
| **Image** | Section photo |
| **Rows** | 4 lettered descriptors (A / B / C / D) |

---

## Settings card
Site-wide information used on every page. This is always the **last card** in the Homepage section.

| Field | What it controls |
|---|---|
| **Site Name** | Brand name in title bar and share cards |
| **AUD → IDR Rate** | Exchange rate driving every AUD price shown on site. Auto-updated daily. |
| **Round IDR To** | Rounding applied to converted IDR prices (default 50,000) |
| **Lock Rate Manually** | Turn ON to stop the daily auto-update (use when rate is locked by clinic) |
| **General Email** | Public clinic email on /contact |
| **Concierge Phone** | Phone shown on /contact |
| **WhatsApp Number** | Powers the green WhatsApp button on every page |
| **Address — Line 1 / 2** | Clinic street address |
| **City** | City (Nusa Dua) |
| **Hours — Mon–Fri / Saturday** | Opening hours text |
| **Google Maps URL** | Powers "Open in Maps" / "Get directions" buttons |
| **Social Links** | Instagram, Facebook, TikTok, etc. URLs |

> **AUD/IDR Auto-update:** The exchange rate checks open.er-api.com once a day. If the live rate is more than 5% different from the stored rate, it updates automatically. Click **"Fetch live rate"** in Settings to check and apply the current rate on demand.

---

## Press Mentions (list)
External press and editorial mentions. Shown on /press.

| Field | What it controls |
|---|---|
| Publication | Magazine / outlet name |
| Headline | The article headline or quote |
| Summary | Short description |
| Published date | Date of mention |
| Featured? | Show in the homepage Press strip (on/off) |
| Logo | Publication logo |

## Awards (list)
Accreditations and awards. Shown on /press.

| Field | What it controls |
|---|---|
| Name | Award or accreditation name |
| Year | Year awarded |
| Issuer | Issuing organisation |
| Summary | Short description |
| Logo | Award badge or seal |

---

<div style="page-break-after: always;"></div>

# 💉 Procedures

## Hero card
Controls the hero banner for both **/treatments** and **/pricing**. Two sections inside one card.

| Section | Fields |
|---|---|
| **Treatments** | Title A · Title B · Intro paragraph · Hero image |
| **Pricing** | Title A · Title B · Intro paragraph · Hero image |
| **Pricing → Insurance** | Section heading · Body paragraph |
| **Pricing → Payment** | Section heading · Payment terms (one row per line: `Label \| Value`) |
| **Pricing → Consultation** | Consultation fee (IDR) · Waiver text |

---

## Discipline Template card
Label text used across all 6 discipline pages (/treatments/surgical, /reconstructive, etc.). Edit once, applies everywhere.

Sections: **Table of Contents labels · Overview heading · Choose a Focus section · Procedures section · FAQs heading · Related section**

---

## Catalogue View card
Headings and labels for the full clinic catalogue table on /pricing.

Sections: **Sheet Titles** (Surgical / Machine / Injectables / BTL) · **Hair Zone Labels** · **Injectable Category Labels**

---

## Sub Treatments (list)
The 6 top-level discipline pages.

| Field | What it controls |
|---|---|
| Title | Discipline name (e.g. "Surgical") |
| Subtitle | Short list (e.g. "Rhinoplasty · Breast · Body") |
| Tagline | Eyebrow line |
| Intro paragraph | Lede under the hero |
| Body | Card paragraph on /treatments index |
| Overview | Long-form body on the discipline page |
| Hero image | Discipline page/card image |
| FAQs | Accordion at the bottom of the discipline page |

## Sub-Categories (list)
The 21+ sub-category pages (Face · Breast · Body · etc.).

| Field | What it controls |
|---|---|
| Title | Sub-category name |
| Tagline | Eyebrow |
| Intro paragraph | Lede |
| Intro / Overview | Rich-text body content |
| Sections | Body sections with headings |
| FAQs | Accordion |
| Lead Surgeon | The doctor assigned to this area |
| Hero image | Page/card image |

## (MIB) Machine · Injectable · BTL (list)
All procedures — surgical editorial items AND the full catalogue of machine treatments, injectables, and BTL hair removal.

| Field | What it controls |
|---|---|
| **Name** | Procedure name on the site |
| **Price (IDR 2026)** | IDR price — AUD shown automatically |
| **Price notes** | e.g. "Local Anesthesia", "General Anesthesia" |
| **Duration** | How long the procedure takes |
| **Recovery** | Recovery time summary |
| **Description** | Intro text in the accordion |
| **Sections** | Body sections inside the accordion |
| **FAQs** | FAQ accordion for this procedure |
| **Featured rank** | 1 / 2 / 3 to highlight on the sub-category page |
| **Hero image** | Procedure image |

---

<div style="page-break-after: always;"></div>

# 🩺 Experts

## Hero card
Controls the /experts page hero AND all three section grids (Lead Surgeon, Plastic Surgery, Aesthetic Medicine). Everything in one card.

| Section | Fields |
|---|---|
| **Hero** | Title A · Title B · Intro paragraph · Hero image · Image caption |
| **Sections → Lead Surgeon** | Section eyebrow · Block eyebrow · Stat labels (Trained / Specialty / Distinction) · CTA label |
| **Sections → Plastic Surgery** | Intro paragraph · Section heading |
| **Sections → Aesthetic Medicine** | Intro paragraph · Section heading |

---

## Detail Template card
Label text shared by all 8 surgeon detail pages (/experts/suka, /experts/indra, etc.). Edit once, applies to all.

Sections: **Hero labels · Stat labels · Sidebar labels · Faculty Heading · Specialty section · Training & Credentials · Biography**

---

## Surgeons (list)
Individual surgeon records. Each record feeds the surgeon's grid card AND their full /experts/{slug} profile page.

| Field | What it controls |
|---|---|
| **Name** | Full formal name (e.g. "dr. I Made Suka Adnyana, SpBP-RE") |
| **Common name** | Short name for menus (e.g. "Suka") |
| **Specialty** | One-line specialty headline |
| **Training** | Training narrative (e.g. "Indonesia · Japan") |
| **Distinction** | Memberships/distinction line |
| **Bio** | Full biography on the profile page |
| **Specialty areas** | Chip-style tags (3–5 short phrases) |
| **Group** | Plastic Surgery or Aesthetic Medicine |
| **Lead?** | Mark as the featured lead surgeon |
| **Portrait** | Doctor photo |

---

<div style="page-break-after: always;"></div>

# ✨ Results

## Hero card
The /results page hero banner.

| Field | What it controls |
|---|---|
| Title A · Title B | Page headline (two lines) |
| Intro paragraph | Paragraph beneath the headline |
| Hero image | Page hero background |

---

## Before/After Cases (list)
Before/after composite photos shown on /gallery and /results.

| Field | What it controls |
|---|---|
| Case label | e.g. "Case 047 — Necklift" |
| Composite image | The before/after photo (left = before, right = after) |
| Before alt / After alt | Accessibility text for each half |
| Description | Optional text about the case |
| Recovery duration | e.g. "6 weeks" |
| Featured? | Show on the homepage gallery (on/off) |

## Patient Stories (list)
Testimonials shown on /stories and /results.

| Field | What it controls |
|---|---|
| Patient label | Display name (e.g. "Sarah K., Sydney") |
| Country | Patient's country |
| Procedure label | Procedure shown on the card |
| Portrait | Patient photo |
| Quote | One-sentence pull-quote |
| Body | Full testimonial |
| Video URL | Optional video testimonial link |
| Featured? | Show prominently on /results (on/off) |

---

<div style="page-break-after: always;"></div>

# 🌴 Journey

## Hero card (Journey Hero)
The /journey page hero banner.

| Field | What it controls |
|---|---|
| Title A · Title B | Page headline (two lines) |
| Intro paragraph | Paragraph beneath the headline |
| Hero image | Page hero background |

---

## Page card (Recovery Stays)
The /recovery-stays page content.

| Section | Fields |
|---|---|
| **Hero** | Title A · Title B · Intro paragraph · Hero image |
| **Portfolio Section** | Section eyebrow · Heading · Intro paragraph |

---

## Journey Steps (list)
The numbered steps on /journey (Enquiry → Consult → Surgery → Recovery → Homecoming).

| Field | What it controls |
|---|---|
| Title | Step name |
| Body | Step description |
| Bullets | 4 short bullet points (A · B · C · D) |
| Image | Step illustration |

## Recovery Stays — Villas (list)
The villa cards on /recovery-stays.

| Field | What it controls |
|---|---|
| Name | Villa name |
| Location | Where it is (e.g. "Jimbaran") |
| Body | Description paragraph |
| Hero image | Villa photo |
| Price/night (IDR) | Nightly price in Rupiah |
| Amenities | List of amenities |
| Partner URL | Booking link |

---

<div style="page-break-after: always;"></div>

# 📞 Contact

## Hero card
Controls the /contact page hero AND the "Find us in Nusa Dua" section below it. Both in one card.

| Section | Fields |
|---|---|
| **Hero** | Title A · Title B · Intro paragraph · Hero image |
| **Visit Section** | Heading (roman + italic) · Body paragraph · Map image · Concierge hours |

> Contact details (email, phone, WhatsApp, address, opening hours) are edited in **Homepage → Settings** — change them once and they update everywhere on the site automatically.

---

## Enquiries (list — read-only)
Incoming enquiry form submissions. Editors cannot delete these — they are a permanent record.

| Field | What it is |
|---|---|
| Name / Email / Phone / Country | Visitor's contact details |
| Message | What they wrote |
| Status | Mark **New / Contacted / Scheduled / Converted / Closed** |
| Internal notes | Private team notes (never shown to visitors) |

---

<div style="page-break-after: always;"></div>

# 📰 Publications

## Blog Post Template card
Label text shared by all blog post pages. Edit once, applies to every article.

Sections: **Byline Labels · About the Author · More from the Journal**

---

## Blog Posts (list)

| Field | What it controls |
|---|---|
| Title | Article title |
| Intro paragraph | Short preview shown on /blog listing |
| Body | Full article content |
| Hero image | Article cover image |
| Author | Pick the author |
| Published date | Publication date |
| Publish status | **Draft** (not live) or **Published** (live) |

---

## Press Mentions (list)
*(Same as described in Homepage above — the list lives here but cards show on /press)*

## Awards (list)
*(Same as described in Homepage above — the list lives here but shown on /press)*

---

<div style="page-break-after: always;"></div>

# 💡 Quick tips

| Tip | Detail |
|---|---|
| **Saving** | Every edit needs **Save**. The live site updates within ~1 minute after saving. |
| **Images** | Click an image field → Upload or pick from Media Library. Always add **alt text** (describe the image for screen readers). |
| **Prices** | Enter only the **IDR** price — the AUD figure calculates automatically from the exchange rate in **Settings**. |
| **AUD/IDR Rate** | The rate auto-updates daily. Click **"Fetch live rate"** in Settings to check or apply it manually. Tick **"Lock Rate Manually"** to freeze it. |
| **EN / ID language** | The site supports English and Bahasa Indonesia. Translated content is handled automatically when editorial fields are saved. |
| **Can't find a field?** | Rarely-changed technical fields are hidden by design. Ask a developer if you genuinely need it. |
| **Draft vs Published** | Blog posts and stories can be saved as **Draft** — they won't appear on the live site until you change status to **Published**. |
| **Collections vs Globals** | A **dark card** is a single editable item (Global). A **light card** is a list of records (Collection). |
