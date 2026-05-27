# Cosmedic CMS — Editor Cheatsheet

> Quick reference for clinic editorial team. For deeper ops, see [runbook.md](../architecture/runbook.md).
>
> **Bucket structure source of truth:** [CMS_structure.md](./CMS_structure.md) — full table of every bucket / entity / field. This cheatsheet is the friendly version.

## Sign in

- **URL**: https://cosmedic.gaiada.online/admin
- **Credentials**: provided privately by your developer
- Theme toggle: top-right avatar → **Account** → **Admin Theme** (Light / Dark / Auto)

## The dashboard

The sidebar is grouped into **8 buckets** (Homepage / Treatments / Doctors / Results / Journey / Contact / About / Media) plus Users ungrouped. A short banner at the top explains the difference between **Collections** (many records) and **Globals** (one-of-a-kind).

| Bucket | What lives here |
|---|---|
| *(ungrouped)* | **Users** (admin accounts) |
| **Homepage** | Home Page (+ 10 sub-globals: Hero · Intro · Treatments View · Surgeons View · Gallery View · Stories View · Pricing View · Journey View · Lead Magnet · Place) · Brand Stats · Header · Footer · Floating Chrome · Endorsement Mark · Settings · SEO Defaults |
| **Treatments** | **Collections:** Disciplines · Sub-Categories · Procedures · **Globals:** Treatments Page · Treatments Hero · Index · Stats · Discipline Template · Sub-Category Template · **Pricing: Page** · **Pricing: Hero** · Overview · Footnote · Insurance · Payment · Catalogue View · Discipline List View · Consultation |
| **Doctors** | **Collections:** Surgeons · **Globals:** Surgeons Page · Hero · Lead View · Plastic Surgery View · Aesthetic Medicine View · Surgeon Detail Template |
| **Results** | **Collections:** Before/After Cases · Patient Stories · **Globals:** Results Page · Results Hero · Gallery Page · Stories Page · Library CTA · Share CTA |
| **Journey** | **Collections:** Journey Steps · Recovery Stays · **Globals:** Journey Page · Journey Hero · Journey Stats · Recovery Stays Page |
| **Contact** | **Collections:** Enquiries · Analytics (Ask The Doctor) · **Globals:** Contact Page · Contact Hero · Enquiry Section · Visit Section · Form Defaults · Email Templates · Video Consult Page |
| **About** | **Collections:** Blog Posts · Blog Tags · Authors · Press Mentions · Awards · Privacy Sections · **Globals:** Blog Page · Blog Post Template · Press Page · Privacy Page · Not Found Page |
| **Media** | Media (image library, browsable by folder + category) |

> Note: There is no standalone **Pricing** bucket. All pricing-related admin items are under **Treatments** (prefixed "Pricing: …") since changes08.

## Updating a surgeon

1. **DOCTORS → Surgeons** → click a name
2. Edit any field on the form
3. **Save** (top-right). Changes go live in ~1 second.
4. To change the portrait, click the **Image Upload** field (bordered, bronze-dashed). Drag-drop a new file or pick from existing Media.

## Updating a treatment / discipline

1. **Treatments → Disciplines** (the 6 chapters) or **Sub-Categories** (the 18 sub-pages) or **Procedures**
2. Edit `title`, `tagline`, `lede`, `body`, `chapterTitle`, `faqs` etc.
3. **Save**

## Replacing imagery

Every image field shows as a **bordered bronze-dashed box** with an "IMAGE UPLOAD" label. Three ways:

- **Drag a file** onto the box → uploads + attaches in one go
- **Click the box** → "Upload file" or "Choose from existing"
- **Click the existing thumbnail** → swap

**Always set the alt text** when uploading a new image — required for accessibility and SEO. The CMS won't save without it.

## Toggling features on the site

Common booleans (every checkbox = click to flip, then Save):

- **Surgeon → Lead** : promote to homepage feature card
- **Page → Publish Status** : show/hide a page
- **Procedure → Featured** : promote on its sub-category
- **Enquiry → Status** : new / contacted / closed (workflow)

## Adding a new blog post

1. **About → Blog Posts** → **Create New**
2. Fill `slug` (e.g. `recovery-from-rhinoplasty`), `title`, `lede`, `body` (rich text)
3. Optional: pick an `author` (About → Authors), `tags` (About → Blog Tags), `heroImage`
4. **Save**
5. Visit `https://cosmedic.gaiada.online/blog/<slug>` to verify

## Bulk pricing updates

All pricing (Surgical + Machine + Injection + BTL line items) is managed in **Treatments → Procedures**. Each Procedures record holds IDR + AUD prices, catalogue group (surgical/machine/injection/btl), main category, sub category, and editorial fields. Prices display IDR primary with AUD secondary — no toggle needed.

Change the IDR/AUD numbers → Save; `/pricing` re-renders within a second. Bulk re-price: re-run the seed script via the developer (re-imports `docs/assets/pricelist.xlsx`).

## When something looks wrong

1. Try a hard refresh (Ctrl/Cmd+Shift+R) — your browser may be caching
2. Check you saved (the "Save" button shows a brief checkmark)
3. If the site doesn't update within a minute, **POST /api/revalidate** is the manual cache-bust. The developer can hit it via terminal: `curl -X POST https://cosmedic.gaiada.online/api/revalidate -d '{}'`
4. If a record won't save, check for red-bordered fields — required fields are missing
5. If you upload an image and it doesn't appear, verify the `alt` text is filled in

## The API button — DO NOT USE

Every record shows an **"API"** button at the top-right (next to **Edit**). A warning banner explains: this is for external integrations or future AI functionality. Editing records through the JSON view bypasses validation, cache busting, and email hooks. **Always use the form below the banner.** If you accidentally click into the API view, just hit Back.

## Enquiries

- Editorial → **Enquiries** lists every form submission
- Each row shows name / email / interest / status / created date
- Open a record to read the message and add notes
- Status workflow: `new` → `contacted` → `closed`
- The clinic gets an email notification the moment a submission arrives (once SMTP is wired)

## Locale switcher (English / Indonesian)

- The header has an `EN | ID` switcher
- Currently only English is fully translated; Indonesian shows English fallback for any missing strings
- Full Indonesian translation rolls out in a later phase

## Asking for help

- Editorial questions → your editorial lead
- Technical problems → forward the error message + the URL you were on to the developer
- Don't try to fix DB-level issues yourself; that's a developer task
