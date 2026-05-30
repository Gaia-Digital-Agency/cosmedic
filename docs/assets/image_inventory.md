# Image Inventory — cosmedic.gaiada.online

**Last updated:** 2026-05-27 08:00 UTC  
**Legend:** ✅ Real photo · 🟢 AI-generated (Vertex AI Imagen 3) · 🟥 PLACEHOLDER · ⬜ Not set / falls back to static asset

---

## Page Hero Images (CMS-managed, each editable under respective bucket)

| Page / Route | CMS Admin Path | Media ID | Filename | Status |
|---|---|---|---|---|
| `/` — Homepage Hero | Homepage › Home Hero › heroImage | 50 | `hero-homepage.webp` | ✅ |
| `/` — Home Place section | Homepage › Place › image | 61 | `recover.webp` | ✅ |
| `/` — Surgeons block group photo | Homepage › Surgeons Block › groupPhoto | 58 | `cosmedic doctor team photo.webp` | ✅ |
| `/` — Lead Magnet cover | Homepage › Lead Magnet › coverImage | 72 | `recovery-guide.webp` | ✅ |
| `/treatments` | Treatments › Treatments Hero › heroImage | 52 | `reconstructive surgery.webp` | ✅ |
| `/results` | Results › Results Hero › heroImage | 51 | `surgical-1.webp` | ✅ |
| `/surgeons` | Doctors › Surgeons Hero › heroImage | 69 | `cosmedic doctor team photo-1.webp` | ✅ |
| `/pricing` | Pricing › Pricing Hero › heroImage | 53 | `non surgical.webp` | ✅ |
| `/journey` | Journey › Journey Hero › heroImage | 94 | `journey-hero.webp` | 🟢 AI-generated |
| `/contact` | Contact › Contact Hero › heroImage | 96 | `contact-hero.webp` | 🟢 AI-generated |

**All 10 hero slots filled. Zero duplicates. Zero placeholders.**

---

## Sub-Category Hero Images (CMS-managed via Treatments › Sub Categories › heroImage)

When empty, falls back to the parent discipline's static public asset. Upload a real photo per sub-category to override.

| Route | Sub-Category | Media ID | Filename | Status |
|---|---|---|---|---|
| `/treatments/dental/alignment` | Alignment | — | *(inherits dental static)* | ⬜ |
| `/treatments/dental/veneers` | Veneers | — | *(inherits dental static)* | ⬜ |
| `/treatments/dental/whitening` | Whitening | — | *(inherits dental static)* | ⬜ |
| `/treatments/hair/fue` | FUE Surgical | — | *(inherits hair static)* | ⬜ |
| `/treatments/hair/therapy` | Follicle Therapy | — | *(inherits hair static)* | ⬜ |
| `/treatments/non-surgical/injectables` | Injectables | — | *(inherits non-surgical static)* | ⬜ |
| `/treatments/non-surgical/laser` | Laser & Resurfacing | — | *(inherits non-surgical static)* | ⬜ |
| `/treatments/non-surgical/skin` | Skin Health | — | *(inherits non-surgical static)* | ⬜ |
| `/treatments/reconstructive/breast` | Breast Reconstruction | — | *(inherits reconstructive static)* | ⬜ |
| `/treatments/reconstructive/craniofacial` | Craniofacial | — | *(inherits reconstructive static)* | ⬜ |
| `/treatments/reconstructive/trauma` | Trauma & Scar | — | *(inherits reconstructive static)* | ⬜ |
| `/treatments/surgical/body` | Body | — | *(inherits surgical static)* | ⬜ |
| `/treatments/surgical/breast` | Breast | — | *(inherits surgical static)* | ⬜ |
| `/treatments/surgical/face` | Face | — | *(inherits surgical static)* | ⬜ |
| `/treatments/weight-loss/bariatric` | Bariatric Surgery | — | *(inherits weight-loss static)* | ⬜ |
| `/treatments/weight-loss/endoscopic` | Endoscopic | — | *(inherits weight-loss static)* | ⬜ |
| `/treatments/weight-loss/glp-1` | Medical | — | *(inherits weight-loss static)* | ⬜ |

**17 sub-category slots use the parent discipline fallback.** Each slot is independently uploadable in the CMS — no code change required.

---

## Surgeon Portrait Images (CMS-managed via Doctors › Surgeons › portrait)

| Route | Surgeon | Media ID | Filename | Status |
|---|---|---|---|---|
| `/surgeons/astri` | Dr. Astrinita | 60 | `dr astri.webp` | ✅ |
| `/surgeons/indra` | Dr. Indra | 63 | `dr indra.webp` | ✅ |
| `/surgeons/risma` | Dr. Risma | 67 | `dr Risma.webp` | ✅ |
| `/surgeons/rosa` | Dr. Rosa | 66 | `dr rosa.webp` | ✅ |
| `/surgeons/sissy` | Dr. Sissy | 65 | `dr sissy.webp` | ✅ |
| `/surgeons/suka` | Dr. Suka | 59 | `dr suka.webp` | ✅ |
| `/surgeons/theresia` | Dr. Theresia | 68 | `dr Theresia.webp` | ✅ |
| `/surgeons/wara` | Dr. Wara | 64 | `dr gede.webp` | ✅ |

**All 8 surgeon portraits: real photos ✅**

---

## Contact / Visit Map Image

| Location | CMS Admin Path | Media ID | Filename | Status |
|---|---|---|---|---|
| `/contact` — Visit section map | Contact › Visit Section › mapImage | 95 | `contact-map.webp` | 🟢 AI-generated |

---

## Placeholder File Reference

| File | Path | Size | Description |
|---|---|---|---|
| `placeholder.png` | `packages/cms/media/placeholder.png` | 28 KB | Magenta/dark checkerboard 1200×800px — visually unmistakable. Not wired to any live slot. Use via CMS upload field when a slot needs a temporary stand-in. |

**To replace any image:** Admin → relevant bucket → image upload field → Replace → upload → Save. Cache auto-busts within 60 seconds.

---

## Route Health (last checked 2026-05-27 08:00 UTC)

All 52 live routes return HTTP 200. No broken internal links on homepage.

| Check | Result |
|---|---|
| All 52 routes | ✅ 52/52 HTTP 200 |
| CMS admin `/admin` | ✅ 200 |
| `POST /api/revalidate` | ✅ `{"ok":true}` |
| Homepage internal links | ✅ All 44 href values map to known routes |

---

## Summary

| Category | Total Slots | Real Photos | AI-Generated | Placeholders | Not Set (fallback) |
|---|---|---|---|---|---|
| Page heroes | 10 | 8 | 2 | 0 | 0 |
| Sub-category heroes | 17 | 0 | 0 | 0 | 17 |
| Surgeon portraits | 8 | 8 | 0 | 0 | 0 |
| Contact map | 1 | 0 | 1 | 0 | 0 |
| **Total** | **36** | **16** | **3** | **0** | **17** |
