# Cosmedic CMS — Editor Cheatsheet

> Quick reference for clinic editorial team. For deeper ops, see [runbook.md](./runbook.md).

## Sign in

- **URL**: https://cosmedic.gaiada.online/admin
- **Credentials**: provided privately by your developer
- Theme toggle: top-right avatar → **Account** → **Admin Theme** (Light / Dark / Auto)

## The dashboard

Collections are grouped:

| Group | What lives here |
|---|---|
| (top) | **Users** (admin accounts), **Media** (image library) |
| **Catalogue** | Surgeons · Disciplines · Sub Categories · Procedures |
| **Pricing Catalogue** | Price List Items · Injectable Products · Machine Treatments · Hair Removal Areas |
| **Editorial** | Pages · Before/After Cases · Stories · Press Mentions · Awards · Recovery Stays · Pricing Tiers · Blog Posts · Blog Tags · Authors · Journey Steps · Inclusion Items · Exclusion Items |
| **Enquiries** | Form submissions (read-only flow) |

Scroll the dashboard to see all groups; long page.

## Updating a surgeon

1. Catalogue → **Surgeons** → click a name
2. Edit any field on the form
3. **Save** (top-right). Changes go live in ~1 second.
4. To change the portrait, click the **Image Upload** field (bordered, bronze-dashed). Drag-drop a new file or pick from existing Media.

## Updating a treatment / discipline

1. Catalogue → **Disciplines** (the 6 chapters) or **Sub Categories** (the 17 leaves) or **Procedures**
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

1. Editorial → **Blog Posts** → **Create New**
2. Fill `slug` (e.g. `recovery-from-rhinoplasty`), `title`, `excerpt`, `body` (rich text)
3. Optional: pick an `author` (Editorial → Authors), `tags` (Blog Tags), `coverImage`
4. **Save**
5. Visit `https://cosmedic.gaiada.online/blog-<slug>` to verify

## Bulk pricing updates

Annual price refresh: open the relevant **Price List Item** record → change the IDR/AUD numbers → Save. The `/pricing` page re-renders within a second. Bulk reprice is done by re-running the seed script via the developer (re-imports `docs/pricelist.xlsx`).

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
