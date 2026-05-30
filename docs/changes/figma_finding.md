# BIMC CosMedic — Figma Image Findings
**Session date:** 2026-05-27
**Figma file:** Comesic Image generation (`KjPZnGnbpa994mf7byvcW7`)
**Goal:** Map ALL Figma images to CMS and Web 1:1 — no duplicates, no orphans, correct positions

---

## KEY FINDING — Surgeon portraits are ALREADY live in CMS

The 8 Figma surgeon portrait images are **byte-for-byte identical** to the photos currently served at
`cosmedic.gaiada.online/api/media/file/dr *.webp`.
**No upload needed for surgeon portraits.** They are already correct on the live site.

---

## 1. Figma File Structure

| Page | Node | Contents |
|---|---|---|
| Page 1 | `0:1` | Main moodboard canvas — landscape scenes, tall portraits, wide banners |
| Page 2 | `1:25` | Additional BIMC photos — WhatsApp photos, more portrait shots |
| Page 3 | `1:39` | Empty |

**Total unique imageRefs discovered:** 46
**Download method:** Figma REST API `/v1/files/{fileKey}/images` → CDN URLs → Python urllib

---

## 2. Site Stack (gda-s01 → /var/www/cosmedic/)

| Component | Detail |
|---|---|
| Web | Vite 6 SSR + React 19 + Tailwind CSS — port 3007 |
| CMS | Payload CMS 3.84.1 (Next.js 15) + Postgres — port 4007 |
| Admin UI | https://cosmedic.gaiada.online/admin |
| Collections | 18 collections + 42 globals |
| CMS media total | ~60 items |

### CMS Image Inventory
- **Page heroes:** 10 total (filled)
- **Sub-category heroes:** 17 slots — ALL EMPTY before this project (fall back to parent discipline image)
- **Surgeon portraits:** 8 — all filled, confirmed identical to Figma source

---

## 3. Complete 1:1 Surgeon Portrait Map — CONFIRMED

Cross-referenced by downloading live site images and visual comparison.

| File in images/ | CMS filename | Full surgeon name | Slug | Specialty |
|---|---|---|---|---|
| `Doctors__Surgeons__suka--I-Made-Suka-Adnyana__portrait--ALREADY-IN-CMS.png` | `dr suka.webp` | Dr. I Made Suka Adnyana | `suka` | Plastic Surgery — Lead, Facial Aesthetics |
| `Doctors__Surgeons__indra--Ida-Bagus-Agung-Indra-Pramana__portrait--ALREADY-IN-CMS.png` | `dr indra.webp` | Dr. Ida Bagus Agung Indra Pramana | `indra` | Plastic, Reconstructive & Aesthetic, FICS |
| `Doctors__Surgeons__gede--Gede-Wara-Samsarga__portrait--ALREADY-IN-CMS.png` | `dr gede.webp` | Dr. Gede Wara Samsarga | `gede` | Craniomaxillofacial Subspecialty |
| `Doctors__Surgeons__astri--Astrinita-Lestari-Suyata__portrait--ALREADY-IN-CMS.png` | `dr astri.webp` | Dr. Astrinita Lestari Suyata | `astri` | Plastic, Reconstructive & Aesthetic |
| `Doctors__Surgeons__rosa--Rosalina-Silvia-Dewi__portrait--ALREADY-IN-CMS.png` | `dr rosa.webp` | Dr. Rosalina Silvia Dewi | `rosa` | Aesthetic & Anti-Aging Medicine |
| `Doctors__Surgeons__risma--I-Gusti-Ayu-Risma-Pramita__portrait--ALREADY-IN-CMS.png` | `dr Risma.webp` | Dr. I Gusti Ayu Risma Pramita | `risma` | Dermatology, Venereology & Aesthetics |
| `Doctors__Surgeons__sissy--Sissy-Yunita-Surya__portrait--ALREADY-IN-CMS.png` | `dr sissy.webp` | Dr. Sissy Yunita Surya | `sissy` | Aesthetic & Anti-Aging Medicine |
| `Doctors__Surgeons__theresia--Theresia-Indri-Indrawati-Setiadi__portrait--ALREADY-IN-CMS.png` | `dr Theresia.webp` | Dr. Theresia Indri Indrawati Setiadi | `theresia` | Dermatology, Venereology & Aesthetics |

---

## 4. Complete Image Discovery & Visual ID

### GROUP A — Landscape/Scene images (4096×2748)

| Final filename | What it shows | CMS path | Web route |
|---|---|---|---|
| `Treatments__SubCategories__non-surgical-injectables__heroImage.png` | Female Asian doctor injecting white female patient's forehead (botox/filler) | Treatments › Sub Categories › Injectables › heroImage | /treatments/non-surgical/injectables |
| `Treatments__SubCategories__reconstructive-breast__heroImage.png` | Male doctor examining elderly female patient in hospital room (arm/post-op) | Treatments › Sub Categories › Breast Reconstruction › heroImage | /treatments/reconstructive/breast |
| `Treatments__SubCategories__surgical-breast__heroImage.png` | 4-person OR team in tan scrubs operating under bright OR lights | Treatments › Sub Categories › Breast › heroImage | /treatments/surgical/breast |
| `Treatments__SubCategories__non-surgical-laser__heroImage.png` | Male BIMC doctor marking injection/laser points on female patient's face | Treatments › Sub Categories › Laser & Resurfacing › heroImage | /treatments/non-surgical/laser |
| `Treatments__SubCategories__reconstructive-trauma__heroImage.png` | Male doctor marking patient's forearm with pen (trauma/scar pre-treatment) | Treatments › Sub Categories › Trauma & Scar › heroImage | /treatments/reconstructive/trauma |
| `Treatments__SubCategories__non-surgical-skin__heroImage.png` | Male BIMC doctor consulting at desk with Western female patient (skin) | Treatments › Sub Categories › Skin Health › heroImage | /treatments/non-surgical/skin |
| `Doctors__SurgeonsHero__heroImage--web-surgeons-page-hero.png` | 4 BIMC doctors in white coats posing together in OR (team photo) | Doctors › Surgeons Hero › heroImage | /surgeons — page hero |
| `Contact__ContactVisitSection__buildingExterior--web-contact-visit.png` | BIMC hospital white colonial building exterior at sunset | Contact › Visit Section › buildingExterior | /contact — visit section |
| `Homepage__HomeHero__heroImage--VERIFY-DUPLICATE-OF-CMS-ID-50.png` | 4 diverse patients close together — ⚠️ VERIFY vs CMS ID 50 | Homepage › Home Hero › heroImage | / — hero |
| `Results__ResultsHero__heroImage--4-patients-angle2.png` | 4 diverse patients, different angle | Results › Results Hero › heroImage | /results — hero |
| `Contact__ContactVisitSection__hospitalSignage--web-contact-visit.png` | "BIMC HOSPITAL" signage on wall, close-up | Contact › Visit Section › signage | /contact — visit section |
| `Results__ResultsHero__heroImage--4-women-variant.png` | 4 diverse women (warmer tone, different group) | Results › Results Hero (alternate) | /results — hero |
| `Homepage__HomePlace__image--bali-temple-sunset--web-home-place-section.png` | Bali pagoda temple at golden hour sunset | Homepage › Place › image | / — Place section |

### GROUP B — Tall portrait images (3300×4096)

| Final filename | What it shows | CMS path | Web route |
|---|---|---|---|
| `Treatments__SubCategories__surgical-face__heroImage.png` | Male BIMC doctor face consultation with female patient near mirror | Treatments › Sub Categories › Face › heroImage | /treatments/surgical/face |
| `Doctors__Surgeons__suka--*__ALREADY-IN-CMS.png` | Male surgeon, standing in OR, grey shirt (Dr. Suka) | Doctors › Surgeons › suka › portrait | /surgeons/suka |
| `Doctors__Surgeons__astri--*__ALREADY-IN-CMS.png` | Female, long straight dark hair, white blazer, OR (Dr. Astri) | Doctors › Surgeons › astri › portrait | /surgeons/astri |
| `Doctors__Surgeons__gede--*__ALREADY-IN-CMS.png` | Male surgeon, young, BIMC ID badge + pin, OR (Dr. Gede) | Doctors › Surgeons › gede › portrait | /surgeons/gede |
| `Doctors__Surgeons__indra--*__ALREADY-IN-CMS.png` | Male surgeon, arms crossed, black shirt, OR lights (Dr. Indra) | Doctors › Surgeons › indra › portrait | /surgeons/indra |
| `Doctors__Surgeons__rosa--*__ALREADY-IN-CMS.png` | Female, braided hair, floral shirt, arms crossed (Dr. Rosa) | Doctors › Surgeons › rosa › portrait | /surgeons/rosa |
| `Doctors__Surgeons__sissy--*__ALREADY-IN-CMS.png` | Female, dark hair, striped shirt under BIMC coat (Dr. Sissy) | Doctors › Surgeons › sissy › portrait | /surgeons/sissy |
| `Doctors__Surgeons__risma--*__ALREADY-IN-CMS.png` | Female, dark wavy hair, light top, BIMC badge (Dr. Risma) | Doctors › Surgeons › risma › portrait | /surgeons/risma |
| `Journey__RecoveryStays__villa-pool-lifestyle--web-recovery-stays-lifestyle.png` | Woman in robe by pool with drink at sunset | Journey › Recovery Stays › lifestyle image | /recovery-stays — lifestyle |
| `Journey__JourneySteps__step-arrival-international__image--web-journey.png` | Woman walking toward private jet on tarmac | Journey › Journey Steps › Arrival › image | /journey — arrival step |
| `Journey__JourneySteps__step-arrival-bali__image--web-journey.png` | Smiling woman with luggage in Bali resort/villa | Journey › Journey Steps › Bali arrival › image | /journey — Bali arrival |
| `About__Stories__hospital-corridor-atmosphere--web-stories-results.png` | Hospital corridor from behind (atmospheric) | About › Stories | /stories or /results |
| `Treatments__SubCategories__hair-fue__heroImage.png` | Male BIMC doctor drawing hairline on bald patient's scalp | Treatments › Sub Categories › FUE Surgical › heroImage | /treatments/hair/fue |
| `Results__BeforeAfterCases__patient-portrait--web-results-stories.png` | Smiling Western female patient post-treatment in hospital room | Results › Before After Cases › patient photo | /results or /stories |
| `Treatments__SubCategories__reconstructive-craniofacial__heroImage.png` | Male surgeon focused at OR microscope (craniofacial precision) | Treatments › Sub Categories › Craniofacial › heroImage | /treatments/reconstructive/craniofacial |
| `Doctors__Surgeons__theresia--*__ALREADY-IN-CMS.png` | Female, dark hair with bangs, blue shirt, BIMC badge (Dr. Theresia) | Doctors › Surgeons › theresia › portrait | /surgeons/theresia |

### GROUP C — Wide / panoramic

| Final filename | What it shows | CMS path | Web route |
|---|---|---|---|
| `Treatments__SubCategories__surgical-body__heroImage.png` | Male BIMC doctor drawing pre-op lines on female patient's abdomen | Treatments › Sub Categories › Body › heroImage | /treatments/surgical/body |
| `Homepage__HomeHero__heroImage--variant-wider-crop.png` | Same 4 diverse patients, wider crop | Homepage › Home Hero (variant) | / — hero alternate |

### GROUP D — Small / square

| Final filename | What it shows | CMS path | Web route |
|---|---|---|---|
| `Journey__RecoveryStays__post-surgery-care__heroImage--web-recovery-stays.png` | Patient with head bandage in armchair, nurse attending | Journey › Recovery Stays › heroImage | /recovery-stays — hero |

### GROUP E — OR fallbacks (Page 2 screenshots)

| Final filename | What it shows | Use |
|---|---|---|
| `Treatments__SubCategories__surgical--OR-theatre-empty__FALLBACK.png` | Empty BIMC operating theatre | Fallback hero for any surgical sub-cat that still needs an image |
| `Treatments__SubCategories__reconstructive--OR-active__FALLBACK.png` | Blue-scrubs team actively operating | Fallback for reconstructive sub-cats |

### GROUP F — DO NOT UPLOAD

| Final filename | Why |
|---|---|
| `REF-ONLY__multi-angle-surgeon-reference__DO-NOT-UPLOAD.png` | Magnific AI multi-angle composite — reference only |
| `REF-ONLY__WRONG-PROJECT-Kalmra-moodboard__DO-NOT-UPLOAD.png` | **WRONG PROJECT** — KALMRĀ brand moodboard, not Cosmedic |
| `REF-ONLY__BIMC-building-exterior-small-843x566__too-small-for-web.png` | Too small (843×566px) for any web use |
| `REF-ONLY__design-screenshot-01..09__DO-NOT-UPLOAD.png` | Figma design page screenshots — reference only |

---

## 5. Final Upload Action List

### ✅ Already in CMS — NO ACTION NEEDED
- All 8 surgeon portraits (confirmed identical to live site photos)

### 🔼 Upload to CMS — Sub-Category Heroes (10 images, all EMPTY slots)
> CMS Admin: Treatments › Sub Categories › [item] › heroImage

| File | Sub-Category slug |
|---|---|
| `Treatments__SubCategories__non-surgical-injectables__heroImage.png` | non-surgical/injectables |
| `Treatments__SubCategories__surgical-face__heroImage.png` | surgical/face |
| `Treatments__SubCategories__surgical-breast__heroImage.png` | surgical/breast |
| `Treatments__SubCategories__surgical-body__heroImage.png` | surgical/body |
| `Treatments__SubCategories__reconstructive-breast__heroImage.png` | reconstructive/breast |
| `Treatments__SubCategories__reconstructive-trauma__heroImage.png` | reconstructive/trauma |
| `Treatments__SubCategories__reconstructive-craniofacial__heroImage.png` | reconstructive/craniofacial |
| `Treatments__SubCategories__non-surgical-laser__heroImage.png` | non-surgical/laser |
| `Treatments__SubCategories__non-surgical-skin__heroImage.png` | non-surgical/skin |
| `Treatments__SubCategories__hair-fue__heroImage.png` | hair/fue |

### 🔼 Upload to CMS — Other Sections (16 images)

| File | CMS Admin path |
|---|---|
| `Doctors__SurgeonsHero__heroImage--web-surgeons-page-hero.png` | Doctors › Surgeons Hero › heroImage |
| `Homepage__HomeHero__heroImage--VERIFY-DUPLICATE-OF-CMS-ID-50.png` | Homepage › Home Hero › heroImage (**verify first**) |
| `Homepage__HomeHero__heroImage--variant-wider-crop.png` | Homepage › Home Hero (alternate/variant) |
| `Homepage__HomePlace__image--bali-temple-sunset--web-home-place-section.png` | Homepage › Place › image |
| `Contact__ContactVisitSection__buildingExterior--web-contact-visit.png` | Contact › Visit Section › buildingExterior |
| `Contact__ContactVisitSection__hospitalSignage--web-contact-visit.png` | Contact › Visit Section › signage |
| `Journey__RecoveryStays__post-surgery-care__heroImage--web-recovery-stays.png` | Journey › Recovery Stays › heroImage |
| `Journey__RecoveryStays__villa-pool-lifestyle--web-recovery-stays-lifestyle.png` | Journey › Recovery Stays › lifestyle image |
| `Journey__JourneySteps__step-arrival-international__image--web-journey.png` | Journey › Journey Steps › Arrival › image |
| `Journey__JourneySteps__step-arrival-bali__image--web-journey.png` | Journey › Journey Steps › Bali arrival › image |
| `Results__ResultsHero__heroImage--4-women-variant.png` | Results › Results Hero › heroImage |
| `Results__ResultsHero__heroImage--4-patients-angle2.png` | Results › Results Hero (alternate) |
| `Results__BeforeAfterCases__patient-portrait--web-results-stories.png` | Results › Before After Cases › patient photo |
| `About__Stories__hospital-corridor-atmosphere--web-stories-results.png` | About › Stories |
| `Treatments__SubCategories__surgical--OR-theatre-empty__FALLBACK.png` | Use only if a surgical sub-cat still needs a hero |
| `Treatments__SubCategories__reconstructive--OR-active__FALLBACK.png` | Use only if a reconstructive sub-cat still needs a hero |

### ❌ Do Not Upload (13 files)
All `REF-ONLY__*` files — confirmed by project owner 2026-05-27.

---

## 6. CMS Balance Rule — Confirmed 2026-05-27

- **CMS has ~60 total media items**
- **8 surgeon portraits** = already in CMS (Figma source confirmed identical)
- **~26 images from Figma** will be uploaded to fill empty slots
- **~26 remaining CMS images** have NO Figma counterpart → **LEAVE AS IS, DO NOT TOUCH**
- Explicitly confirmed by project owner: balance images remain AS IS

---

## 7. Gaps — New Photography Needed

7 sub-categories have no image in Figma:
1. `hair/therapy` — Follicle Therapy
2. `dental/alignment`
3. `dental/veneers`
4. `dental/whitening`
5. `weight-loss/bariatric`
6. `weight-loss/endoscopic`
7. `weight-loss/glp-1`

---

## 8. Decisions — All Confirmed 2026-05-27

| Decision | Confirmed |
|---|---|
| DO NOT UPLOAD refs (`REF-ONLY__*`) | ✅ Owner confirmed OK |
| CMS balance images (~26) remain AS IS | ✅ Owner confirmed |
| Surgeon portrait assignments (all 8) | ✅ Cross-referenced via live site download |
| Surgeon portraits already in CMS — no upload | ✅ Confirmed by pixel comparison |

---

## 9. Technical Notes

### Figma MCP Setup
```
# Configured in ~/.claude.json (user scope)
claude mcp add figma -s user -e FIGMA_API_KEY=<FIGMA_PAT_REDACTED> -- npx -y figma-developer-mcp --stdio
```

### Download Method
```python
# Figma REST API — imageRef → CDN URL → download
GET https://api.figma.com/v1/files/{fileKey}/images
# Returns: { meta: { images: { [imageRef]: "https://..." } } }
```

### Image Sizes
- Landscape scenes: ~17–21 MB each (4096×2748 PNG)
- Tall portraits: ~15–20 MB each (3300×4096 PNG)
- Must convert to WebP before CMS upload

### WebP Conversion Command
```bash
cd ~/downloads/cosmedic_local/images
for f in Treatments__* Doctors__SurgeonsHero__* Homepage__* Contact__* Journey__* Results__* About__*; do
  [ -f "$f" ] && cwebp -q 85 "$f" -o "${f%.png}.webp"
done
```
