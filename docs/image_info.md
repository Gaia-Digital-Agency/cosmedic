# BIMC CosMedic — Image Inventory + Rename Map (`image_info.md`)
**Generated:** 2026-05-29 · **Source:** live DB joined to `media` · **Sorted by:** URL · **94 slots** (67 filled · 27 empty)

### New-name scheme — `x_y_NN.ext`
`x` = page area · `y` = slot/subject · `NN` = sequence · `.ext` = file type.
Page codes: `global · home · proc · expert · gallery · journey · pricing · press · recovery · result · story · blog · contact`

### Naming convention — for FUTURE uploads (existing files left AS-IS, 2026-05-29)
The **New Name** column is the **target naming standard for new/replacement images**, not a rename of current files. Existing media is **not** renamed — decision: leave as-is.
**Why:** the 94 slots are served by only **50 distinct files**; 5 are shared across multiple slots (media 114 pagoda ×23, recover.webp ×6, logo-light ×2, reconstructive surgery ×2, non surgical ×2), so a 1:1 per-slot rename is impossible without duplicating files. Entity links are by media **ID**, so nothing needs renaming to keep working.
**How to use:** when real photography arrives, name each file per its New Name (e.g. `expert_suka_01.webp`, `proc_surgical_02.webp`) and upload to replace the current/placeholder image in the listed CMS location. Bulk upload then maps cleanly by name.


### Column legend (slimmed for A4 portrait)
- **Pos** = position in page · **CMS** = where to upload (Bucket›record›field, abbreviated)
- DB tag pattern: hero=`hero_image_id` · portrait=`portrait_id` · composite=`composite_id` · logo=`logo_id`/`logo_light_id` · step/place=`image_id` · cover=`cover_image_id` · group=`group_photo_id` · map=`map_image_id`
- `(empty)` = no image yet · `pagoda` = Nusa-Dua signage placeholder

| # | URL | Pos | CMS | Current File | New Name |
|--|--|--|--|--|--|
| 1 | (all) | Logo | Header·light | logo-light.webp | global_logo_01.webp |
| 2 | (all) | Logo | Header·dark | logo.webp | global_logo_02.webp |
| 3 | (all) | Logo | Footer | logo-light.webp | global_logo_03.webp |
| 4 | / | Hero | HomeHero | hero-homepage-2.webp | home_hero_01.webp |
| 5 | / | Place | HomePlace | Homepage__HomePlace__image--bali-temple-sunset--web-home-place-section.webp | home_place_01.webp |
| 6 | / | Cover | LeadMagnet | recovery-guide.webp | home_guide_01.webp |
| 7 | / | Group | Surgeons | cosmedic doctor team photo.webp | home_team_01.webp |
| 8 | /blog/before-you-fly | Hero | BlogPost | pagoda (seeded) | blog_post_01.webp |
| 9 | /blog/crani-bali | Hero | BlogPost | pagoda (seeded) | blog_post_02.webp |
| 10 | /blog/achsi-what-it-means | Hero | BlogPost | pagoda (seeded) | blog_post_03.webp |
| 11 | /blog/dental-veneers-honesty | Hero | BlogPost | pagoda (seeded) | blog_post_04.webp |
| 12 | /blog/fillers-restraint | Hero | BlogPost | pagoda (seeded) | blog_post_05.webp |
| 13 | /blog/the-quiet-rhinoplasty | Hero | BlogPost | pagoda (seeded) | blog_post_06.webp |
| 14 | /blog/the-villa-protocol | Hero | BlogPost | pagoda (seeded) | blog_post_07.webp |
| 15 | /contact | Hero | ContactHero | contact-hero.webp | contact_hero_01.webp |
| 16 | /contact | Map | VisitSection | Contact__ContactVisitSection__hospitalSignage--web-contact-visit.webp | contact_map_01.webp |
| 17 | /experts | Hero | SurgeonsHero | cosmedic doctor team photo-1.webp | expert_hero_01.webp |
| 18 | /experts/astri | Portrait | Surgeon·Astri | dr astri.webp | expert_astri_01.webp |
| 19 | /experts/indra | Portrait | Surgeon·Indra | dr indra.webp | expert_indra_01.webp |
| 20 | /experts/risma | Portrait | Surgeon·Risma | dr Risma.webp | expert_risma_01.webp |
| 21 | /experts/rosa | Portrait | Surgeon·Rosa | dr rosa.webp | expert_rosa_01.webp |
| 22 | /experts/sissy | Portrait | Surgeon·Sissy | dr sissy.webp | expert_sissy_01.webp |
| 23 | /experts/suka | Portrait | Surgeon·Suka | dr suka.webp | expert_suka_01.webp |
| 24 | /experts/theresia | Portrait | Surgeon·Theresia | dr Theresia.webp | expert_theresia_01.webp |
| 25 | /experts/wara | Portrait | Surgeon·Wara | dr gede.webp | expert_wara_01.webp |
| 26 | /gallery | Case | BACase·047 | necklift-female.webp | gallery_case_01.webp |
| 27 | /gallery | Case | BACase·001 | lip-lift-female.webp | gallery_case_02.webp |
| 28 | /gallery | Case | BACase·003 | lip-lift-male.webp | gallery_case_03.webp |
| 29 | /journey | Hero | JourneyHero | journey-hero.webp | journey_hero_01.webp |
| 30 | /journey | Step | Step·Enquiry | journey-step-enquiry.png | journey_step_01.png |
| 31 | /journey | Step | Step·Consult | journey-step-consult.png | journey_step_02.png |
| 32 | /journey | Step | Step·Plan | journey-step-plan.png | journey_step_03.png |
| 33 | /journey | Step | Step·Arrive | Journey__JourneySteps__step-arrival-international__image--web-journey.webp | journey_step_04.webp |
| 34 | /journey | Step | Step·Procedure | journey-step-procedure.png | journey_step_05.png |
| 35 | /journey | Step | Step·Recover | Journey__JourneySteps__step-arrival-bali__image--web-journey.webp | journey_step_06.webp |
| 36 | /journey | Step | Step·Homecoming | journey-step-homecoming.png | journey_step_07.png |
| 37 | /pricing | Hero | PricingHero | non surgical.webp | pricing_hero_01.webp |
| 38 | /press | Logo | Award·ISO9001 | (empty) | press_accred_01.webp |
| 39 | /press | Logo | Award·ACHSI | (empty) | press_accred_02.webp |
| 40 | /press | Logo | Award·HealthAsia | (empty) | press_accred_03.webp |
| 41 | /press | Logo | Award·ISAPS | (empty) | press_accred_04.webp |
| 42 | /press | Logo | Award·IPRAS | (empty) | press_accred_05.webp |
| 43 | /press | Logo | Award·JCI | (empty) | press_accred_06.webp |
| 44 | /press | Logo | Award·TGA | (empty) | press_accred_07.webp |
| 45 | /press | Logo | Award·FDA | (empty) | press_accred_08.webp |
| 46 | /press | Logo | Press·Vogue | (empty) | press_media_01.webp |
| 47 | /press | Logo | Press·TMag | (empty) | press_media_02.webp |
| 48 | /press | Logo | Press·Harpers | (empty) | press_media_03.webp |
| 49 | /press | Logo | Press·Robb | (empty) | press_media_04.webp |
| 50 | /press | Logo | Press·AFR | (empty) | press_media_05.webp |
| 51 | /press | Logo | Press·Tatler | (empty) | press_media_06.webp |
| 52 | /procedures | Hero | TreatmentsHero | reconstructive surgery.webp | proc_hero_01.webp |
| 53 | /procedures/dental | Hero | Disc·Dental | dental-2.webp | proc_dental_01.webp |
| 54 | /procedures/dental/dental-alignment | Hero | SubCat·Alignment | pagoda | proc_dental_02.webp |
| 55 | /procedures/dental/dental-veneers | Hero | SubCat·Veneers | pagoda | proc_dental_03.webp |
| 56 | /procedures/dental/dental-whitening | Hero | SubCat·Whitening | pagoda | proc_dental_04.webp |
| 57 | /procedures/hair | Hero | Disc·Hair | hair restoration.webp | proc_hair_01.webp |
| 58 | /procedures/hair/hair-fue | Hero | SubCat·FUE | Treatments__SubCategories__hair-fue__heroImage-1.webp | proc_hair_02.webp |
| 59 | /procedures/hair/hair-therapy | Hero | SubCat·Therapy | pagoda | proc_hair_03.webp |
| 60 | /procedures/non-surgical | Hero | Disc·NonSurg | non surgical.webp | proc_nonsurg_01.webp |
| 61 | /procedures/non-surgical/injectable | Hero | SubCat·Injectable | Treatments__SubCategories__non-surgical-injectables__heroImage.webp | proc_nonsurg_02.webp |
| 62 | /procedures/non-surgical/non-injectable | Hero | SubCat·Laser | Treatments__SubCategories__non-surgical-laser__heroImage.webp | proc_nonsurg_03.webp |
| 63 | /procedures/non-surgical/nonsurgical-others | Hero | SubCat·Skin | Treatments__SubCategories__non-surgical-skin__heroImage.webp | proc_nonsurg_04.webp |
| 64 | /procedures/reconstructive | Hero | Disc·Recon | reconstructive surgery.webp | proc_recon_01.webp |
| 65 | /procedures/reconstructive/reconstructive-breast | Hero | SubCat·BreastRecon | Treatments__SubCategories__reconstructive-breast__heroImage.webp | proc_recon_02.webp |
| 66 | /procedures/reconstructive/reconstructive-craniofacial | Hero | SubCat·Cranio | Treatments__SubCategories__reconstructive-craniofacial__heroImage.webp | proc_recon_03.webp |
| 67 | /procedures/reconstructive/reconstructive-trauma | Hero | SubCat·Trauma | Treatments__SubCategories__reconstructive-trauma__heroImage.webp | proc_recon_04.webp |
| 68 | /procedures/surgical | Hero | Disc·Surgical | surgical.webp | proc_surgical_01.webp |
| 69 | /procedures/surgical/surgical-arm | Hero | SubCat·Arm | pagoda | proc_surgical_02.webp |
| 70 | /procedures/surgical/surgical-body | Hero | SubCat·Body | Treatments__SubCategories__surgical-body__heroImage.webp | proc_surgical_03.webp |
| 71 | /procedures/surgical/surgical-breast | Hero | SubCat·Breast | Treatments__SubCategories__surgical-breast__heroImage.webp | proc_surgical_04.webp |
| 72 | /procedures/surgical/surgical-eyelid | Hero | SubCat·Eyelid | pagoda | proc_surgical_05.webp |
| 73 | /procedures/surgical/face-neck | Hero | SubCat·Face | Treatments__SubCategories__surgical-face__heroImage.webp | proc_surgical_06.webp |
| 74 | /procedures/surgical/surgical-others | Hero | SubCat·Others | pagoda | proc_surgical_07.webp |
| 75 | /procedures/surgical/rhinoplasty | Hero | SubCat·Rhino | pagoda | proc_surgical_08.webp |
| 76 | /procedures/weight-loss | Hero | Disc·WeightLoss | weight loss.webp | proc_weightloss_01.webp |
| 77 | /procedures/weight-loss/weight-loss-surgical | Hero | SubCat·Bariatric | Treatments__SubCategories__weight-loss-bariatric__heroImage--BIMC-OR-theatre.webp | proc_weightloss_02.webp |
| 78 | /procedures/weight-loss/weight-loss-endoscopic | Hero | SubCat·Endoscopic | Treatments__SubCategories__weight-loss-endoscopic__heroImage--BIMC-OR-active.webp | proc_weightloss_03.webp |
| 79 | /procedures/weight-loss/weight-loss-medical | Hero | SubCat·Medical | pagoda | proc_weightloss_04.webp |
| 80 | /recovery-stays | Villa | Villa·Apurva | recover.webp | recovery_villa_01.webp |
| 81 | /recovery-stays | Villa | Villa·Damai | recover.webp | recovery_villa_02.webp |
| 82 | /recovery-stays | Villa | Villa·Kelapa | recover.webp | recovery_villa_03.webp |
| 83 | /recovery-stays | Villa | Villa·Sembilan | recover.webp | recovery_villa_04.webp |
| 84 | /recovery-stays | Villa | Villa·Sereno | recover.webp | recovery_villa_05.webp |
| 85 | /recovery-stays | Villa | Villa·Tirta | recover.webp | recovery_villa_06.webp |
| 86 | /results | Hero | ResultsHero | Results__ResultsHero__heroImage--4-women-variant.webp | result_hero_01.webp |
| 87 | /stories | Portrait | Story·Aisha | Results__BeforeAfterCases__patient-portrait--web-results-stories.webp | story_patient_01.webp |
| 88 | /stories | Portrait | Story·Hiroko | About__Stories__hospital-corridor-atmosphere--web-stories-results.webp | story_patient_02.webp |
| 89 | /stories | Portrait | Story·Sarah | pagoda (seeded) | story_patient_03.webp |
| 90 | /stories | Portrait | Story·Margaux | pagoda (seeded) | story_patient_04.webp |
| 91 | /stories | Portrait | Story·James | pagoda (seeded) | story_patient_05.webp |
| 92 | /stories | Portrait | Story·Rachel | pagoda (seeded) | story_patient_06.webp |
| 93 | /stories | Portrait | Story·Chen | pagoda (seeded) | story_patient_07.webp |
| 94 | /stories | Portrait | Story·Daniel | pagoda (seeded) | story_patient_08.webp |

---
**Totals:** 94 slots · 80 filled · 14 empty (press logos only) · 6+13 pagoda placeholders (proc sub-cats: Alignment, Veneers, Whitening, Therapy, Arm, Eyelid, Others, Medical).
**Rename map:** Current File → New Name. Empty slots reserve a New Name for the future upload. `(all)` = appears on every page (chrome).
