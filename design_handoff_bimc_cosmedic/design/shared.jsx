/* global React */
const { useState, useEffect, useRef } = React;

// =====================================================
// SITE DATA
// =====================================================
window.TREATMENT_LIST = [
  { slug: "surgical",       n: "01", t: "Surgical",            sub: "Rhinoplasty · Breast · Body",          count: "9 procedures", hue: 0,
    body: "Considered surgical work performed in our ACHSI-accredited theatres — from rhinoplasty and rejuvenation to breast and body contouring.",
    procedures: ["Rhinoplasty", "Breast augmentation", "Breast reduction", "Mastopexy", "Liposculpture", "Abdominoplasty", "Brachioplasty", "Thigh lift", "Facelift"] },
  { slug: "non-surgical",   n: "02", t: "Non-surgical",        sub: "Injectables · Laser · Skin",           count: "12 protocols", hue: 1,
    body: "Quiet, expert hands for the everyday refinements — neuromodulators, dermal fillers, laser resurfacing and medical-grade facials.",
    procedures: ["Botulinum toxin", "Dermal fillers", "Profhilo", "Polynucleotides", "Skin boosters", "Fractional laser", "IPL", "Chemical peel", "HydraFacial", "Microneedling RF", "PRP for skin", "Medical-grade facial"] },
  { slug: "hair",           n: "03", t: "Hair Restoration",    sub: "FUE & Follicle Therapy",                count: "3 protocols", hue: 2,
    body: "Follicular unit extraction and PRP-based therapies, performed over considered single-day or staged sessions.",
    procedures: ["Sapphire FUE", "DHI Choi Implanter", "PRP scalp therapy"] },
  { slug: "dental",         n: "04", t: "Dental Aesthetics",   sub: "Veneers · Alignment · Whitening",       count: "5 services",  hue: 3,
    body: "The smile, refined. Porcelain veneers, clear alignment, professional whitening — paced to suit your visit.",
    procedures: ["Porcelain veneers", "Composite veneers", "Clear alignment", "Professional whitening", "Smile design consult"] },
  { slug: "recovery",       n: "05", t: "Recovery & Wellness", sub: "Post-op Villas · Nutrition · Rehab",    count: "Curated stays", hue: 4,
    body: "Private recovery villas in Nusa Dua and Ubud, paired with daily nursing visits and gentle wellness.",
    procedures: ["Recovery villa stays", "Daily in-villa nursing", "Manual lymphatic drainage", "Post-op nutrition", "Gentle physiotherapy", "Aftercare follow-up"] },
  { slug: "concierge",      n: "06", t: "Concierge",           sub: "Travel · Stay · Aftercare",             count: "End-to-end",  hue: 5,
    body: "From your first enquiry to the year of remote follow-ups that follows — a single point of contact, always.",
    procedures: ["Airport transfers", "Visa coordination", "Translation services", "Family accommodation", "Twelve-month telehealth follow-up"] },
];

window.SURGEON_LIST = [
  { slug: "suka", name: "I Made Suka Adnyana", common: "Suka", title: "dr.", suffix: "SpBP-RE (K)",
    spec: "Plastic Surgery — Facial, Body & Breast", train: "Indonesia · Japan", proc: "ISAPS Member", years: "7", hue: 0, lead: true,
    cred: "dr. SpBP-RE (K) · ISAPS Member",
    group: "Plastic Surgery",
    bio: "dr. Suka is a member of the prestigious International Society of Aesthetic Plastic Surgery (ISAPS), one of the world's leading professional bodies for board-certified aesthetic plastic surgeons. He has been a central figure in the plastic and aesthetic medical community for the past seven years with a passion for facial aesthetics, body and breast contouring. dr. Suka has completed numerous specialized training in skin aesthetics, including extensive training in maxillofacial in Japan. His skills, experience, and reputation have elevated him as one of the most recognized plastic surgeons in Bali. According to dr. Suka, there are some important things that should be considered before undergoing cosmetic surgery in order to achieve the desired result. Further consultation with an ISAPS-certified plastic surgeon is important before patients decide to undergo the surgery.",
    spec_areas: ["Facial Aesthetics", "Body Contouring", "Breast Surgery", "Maxillofacial"],
  },
  { slug: "astri", name: "Astrinita Lestari Suyata", common: "Astri", title: "Dr.", suffix: "Sp.BP-RE",
    spec: "Plastic, Reconstructive & Aesthetic Surgery", train: "Hasanuddin · Udayana · South Korea", proc: "ISAPS Member", years: "8", hue: 1,
    cred: "Dr. Sp.BP-RE · ISAPS Member · Korea Fellowship",
    group: "Plastic Surgery",
    bio: "Dr. Astrinita Lestari Suyata, Sp.B.P.R.E — more familiarly known as Dr. Astri — is an internationally trained Plastic Reconstructive and Aesthetic Surgeon and a proud member of the International Society of Aesthetic Plastic Surgery (ISAPS). With diverse experience, Dr. Astri offers cutting-edge techniques in Face Rejuvenation Surgery and Body Contouring with a combination of non-surgical and minimally invasive treatments. Graduating cum laude from Hasanuddin University in 2013, she completed her specialist training in Reconstructive and Aesthetic Plastic Surgery at Udayana University (2017–2021). In her commitment to excellence, she has undertaken extensive professional development in both Indonesia and abroad, including a prestigious fellowship in South Korea — the global epicenter of advanced plastic surgery. Her approach blends precision, artistry, and patient-centered care, ensuring natural-looking, long-lasting results.",
    spec_areas: ["Face Rejuvenation", "Body Contouring", "Non-surgical", "Minimally Invasive"],
  },
  { slug: "indra", name: "Ida Bagus Agung Indra Pramana", common: "Indra", title: "dr.", suffix: "Sp.B.P.R.E., FICS",
    spec: "Plastic, Reconstructive & Aesthetic Surgery", train: "Udayana University", proc: "FICS · Active Researcher", years: "2", hue: 2,
    cred: "dr. Sp.B.P.R.E., FICS",
    group: "Plastic Surgery",
    bio: "Dr. Indra graduated from the Plastic Reconstructive and Aesthetic Surgery Study Program at the Faculty of Medicine, Udayana University Bali in 2024. He is also a Fellow of the International College of Surgeons, Indonesia Section. Dedicated to providing patients with the best possible care, dr. Indra actively participates in advanced courses and workshops to refine surgical techniques and expand knowledge. His latest Symposium & Workshop is \"Continuing Medical Education: Trauma in Plastic Surgery\" by the Faculty of Medicine, Udayana University as instructor in 2024. Dr. Indra is actively involved in research studies — in 2023, he was 3rd-place winner of the Scientific Poster Competition at The 5th Updates in Plastic Surgery, by the Indonesian Association of Plastic Reconstructive & Aesthetic Surgeons in Bandung.",
    spec_areas: ["Reconstructive", "Aesthetic Surgery", "Trauma", "Research"],
  },
  { slug: "wara", name: "Gede Wara Samsarga", common: "Wara", title: "dr.", suffix: "Sp.BP-RE, Subsp.KM(K), FICS",
    spec: "Plastic Surgery — Craniomaxillofacial Subspecialty", train: "Udayana · Singapore Fellowship", proc: "Subspecialist · FICS", years: "10", hue: 3,
    cred: "dr. Sp.BP-RE, Subsp.KM(K), FICS",
    group: "Plastic Surgery",
    bio: "Dr. Wara is a Plastic Reconstructive and Aesthetic Surgeon with extensive experience in reconstructive and aesthetic surgery, especially in the craniomaxillofacial subspecialty. He studied medical education at Udayana University and completed his plastic surgery specialization at the same university. Furthermore, he completed his fellowship training in craniomaxillofacial surgery in 2023, which confirmed his expertise in handling complex conditions related to the facial bones, skull, and lower jaw. Dr. Wara actively participates in various international courses, advanced training, and workshops on the latest techniques and innovations in the field of reconstructive and aesthetic plastic surgery. In 2024, he undertook the International Fellowship in Advanced Aesthetic Science, Singapore, related to advanced techniques of upper and lower blepharoplasty and Botti brow, face, and neck lift.",
    spec_areas: ["Craniomaxillofacial", "Blepharoplasty", "Brow & Face Lift", "Neck Lift"],
  },
  { slug: "sissy", name: "Sissy Yunita Surya", common: "Sissy", title: "dr.", suffix: "M. Biomed (AAM)",
    spec: "Aesthetic & Anti-Aging Medicine", train: "Udayana University · AAM", proc: "Magister AAM 2016", years: "17", hue: 4,
    cred: "dr. M. Biomed (AAM)",
    group: "Aesthetic Medicine",
    bio: "Graduated as a physician from Udayana University in 2007, dr. Sissy started her duty in BIMC Hospital the following year as an emergency and international escort doctor. She acquired further knowledge in anti-aging medicine and received a Magister in Anti-Aging Medicine (AAM) in 2016. With numerous national and international seminars and aesthetic/dermatology workshops behind her, dr. Sissy has developed a range of valuable skills and knowledge specializing in injectable treatments, hormonal therapy, laser, and thread lift procedures. \"Being an anti-aging and aesthetic doctor is a very fulfilling specialty in the medical care field,\" says dr. Sissy. \"I have patients of all ages, men and women, who have an array of skin and aging issues, some minor, others more significant — most all of which are solved with excellent outcomes.\"",
    spec_areas: ["Injectables", "Hormonal Therapy", "Laser", "Thread Lift"],
  },
  { slug: "rosa", name: "Rosalina Silvia Dewi", common: "Rosa", title: "dr.", suffix: "M. Biomed (AAM), Diploma AAAM (USA)",
    spec: "Aesthetic & Anti-Aging Medicine", train: "Udayana · AAAM (USA)", proc: "Diploma AAAM", years: "12", hue: 5,
    cred: "dr. M. Biomed (AAM), Diploma AAAM (USA)",
    group: "Aesthetic Medicine",
    bio: "dr. Rosa studied anti-aging at Udayana University, Bali, achieving a magister degree, with further studies at the American Academy of Aesthetic Medicine (USA). With her extensive medical knowledge and training, dr. Rosa is an expert in injectable medical treatments, rejuvenation laser treatments, and aesthetic non-surgical facial treatments. She is an active member of the Indonesian Centre for Anti-Aging Medicine. dr. Rosa believes that each of us has a certain beauty within. With her numerous experiences in Botox and filler treatments, dr. Rosa is capable of applying her expertise in often what is seen as the most difficult facial areas — the eyes and nose. Filler injections must be performed with great precision in a specialized clinic like BIMC in order to regain the subtleties in one's unique profile. \"The key,\" according to dr. Rosa, \"is providing patients just the right balance of filler for a natural look. Never overdo a good thing.\"",
    spec_areas: ["Botox & Fillers", "Laser Rejuvenation", "Non-surgical Facials", "Eye & Nose Refinement"],
  },
  { slug: "risma", name: "I Gusti Ayu Risma Pramita", common: "Risma", title: "dr.", suffix: "Sp.D.V.E.",
    spec: "Dermatology, Venereology & Aesthetics", train: "Udayana University", proc: "Sp.D.V.E. 2024", years: "2", hue: 0,
    cred: "dr. Sp.D.V.E.",
    group: "Aesthetic Medicine",
    bio: "Dr. Risma is a Dermatologist, Venereologist & Aesthetician who graduated from the Faculty of Medicine, Udayana University Bali in 2024. Her passion for dermatology is evident in her active participation in continuing education, including specialized courses and workshops on Cosmetic Dermatology Training, Filler, Laser, LIFU & HIFU, PRP, RF Microneedling, Endolift, Innovative Mesotherapy, Face Liposculpture, and Double Chin treatment. She also participated as a speaker in the \"6th BALI SWAM (Seminar & Workshop in Aesthetic Medicine) Masterclass\" and \"Choose Your Skincare\" Workshop by Ganesha Pharmacy College in 2024 — and is Certified for The 7th Rank of National Board Examination. With a focus on patient education and well-being, dr. Risma provides personalized treatment plans tailored to individual needs.",
    spec_areas: ["Cosmetic Dermatology", "LIFU & HIFU", "RF Microneedling", "Face Liposculpture"],
  },
  { slug: "theresia", name: "Theresia Indri Indrawati Setiadi", common: "Theresia", title: "dr.", suffix: "Sp.DVE",
    spec: "Dermatology, Venereology & Aesthetics", train: "Diponegoro University · Korea", proc: "Sp.DVE · KCCS Member", years: "2", hue: 1,
    cred: "dr. Sp.DVE · Korean College of Cosmetic Surgery",
    group: "Aesthetic Medicine",
    bio: "Dr. Theresia, Sp.DVE is a Dermatologist, Venereologist, and Aesthetician who graduated from the Faculty of Medicine, Diponegoro University, Indonesia, in 2024. Her commitment to the field of dermatology and aesthetics is reflected in her extensive participation in national and international trainings — Basic Aesthetic and Laser Science Course, Platelet-Rich Plasma (PRP), Ozone & Shockwave Therapy, Slimming and Body Shaping, Injectable treatments (Dermal Filler, Skin Booster, and Botulinum toxin), and Aesthetic Nerve Block Anesthesia. She has been actively involved as a webinar speaker by Dokterpost and is also a member of the Korean College of Cosmetic Surgery (2024–2025). With clinical experience in multiple aesthetic and dermatology clinics in Bali, Dr. Theresia is known for her patient-centered approach, delivering tailored treatment plans that emphasize both skin health and individual well-being.",
    spec_areas: ["Dermal Fillers", "Skin Boosters", "PRP", "Body Shaping"],
  },
];

// =====================================================
// IMAGE SET — Unsplash with brand-painted SVG fallbacks
// =====================================================
window.placeholder = (label, hueShift = 0, w = 1200, h = 1500) => {
  const hues = [
    ["#E6DCC8", "#C9B89A"],
    ["#EFE8DA", "#A67C52"],
    ["#DCD0B8", "#6B4A2B"],
    ["#F4EFE6", "#B58963"],
    ["#C9B89A", "#423B30"],
    ["#E6DCC8", "#6B6354"],
  ];
  const [a, b] = hues[hueShift % hues.length];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="r" cx="0.3" cy="0.25" r="0.7">
      <stop offset="0%" stop-color="${a}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${b}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#r)"/>
  <g opacity="0.18" stroke="${b}" stroke-width="1" fill="none">
    <circle cx="${w * 0.32}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.28}"/>
    <circle cx="${w * 0.32}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.20}"/>
    <circle cx="${w * 0.32}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.36}"/>
  </g>
  <text x="${w - 32}" y="${h - 32}" text-anchor="end"
        font-family="JetBrains Mono, monospace" font-size="16"
        letter-spacing="3" fill="${b}" opacity="0.55">${label}</text>
</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

// Build a stable Unsplash URL from a known photo ID with editorial crop params.
window.uid = (id, w = 1200, h = 1500, opts = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80${opts ? "&" + opts : ""}`;

// Legacy keyword endpoint — kept as a last-resort fallback (Img has its own painted fallback).
window.u = (q, w = 1200, h = 1500) =>
  `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(q)}`;

// Verified Unsplash photo IDs — each one has been reviewed for fit:
// neutral palette, editorial composition, no identifiable people unless
// the role calls for it (and then: professional, conservative).
const ID = {
  // Hero — neutral spa/luxury minimal
  hero:        "photo-1540555700478-4be289fbecef",  // skincare bottles, neutral
  heroAlt:     "photo-1556228720-195a672e8a03",     // marble + bottles, soft

  // Treatment imagery
  surgical:    "photo-1631815589968-fdb09a223b1e",  // soft fabric / clinical-luxe
  injectables: "photo-1570172619644-dfd03ed5d881",  // serum / dropper close-up
  hair:        "photo-1522337360788-8b13dee7a37e",  // hair salon, neutral
  dental:      "photo-1606811971618-4486d14f3f99",  // dentist suite, calm
  recovery:    "photo-1582719508461-905c673771fd",  // luxury villa interior
  concierge:   "photo-1519810755548-39cd217da494",  // open suitcase / travel, neutral

  // Bali / sense of place
  bali:        "photo-1537996194471-e657df975ab4",  // Bali rice terraces
  baliAlt:     "photo-1559494007-9f5847c49d94",     // tropical foliage
  bali2:       "photo-1604999565976-8913ad2ddb7c",  // bali temple, soft

  // Villas — bali interiors / pools
  villa1:      "photo-1540541338287-41700207dee6",  // pool, minimal
  villa2:      "photo-1582719478250-c89cae4dc85b",  // villa interior
  villa3:      "photo-1566073771259-6a8506099945",  // luxury resort, neutral
  villa4:      "photo-1571896349842-33c89424de2d",  // open villa, soft
  villa5:      "photo-1600585154340-be6161a56a0c",  // contemporary interior
  villa6:      "photo-1564013799919-ab600027ffc6",  // bali-style villa

  // Clinic / facility
  clinic:      "photo-1631217872822-1c2546d6b864",  // luxe medical interior
  clinicAlt:   "photo-1629909613654-28e377c37b09",  // calm interior, marble
  reception:   "photo-1582719478250-c89cae4dc85b",  // soft reception
  textureOne:  "photo-1505944270255-72b8c68c6a70",  // soft fabric texture
  textureTwo:  "photo-1515378791036-0648a3ef77b2",  // marble / abstract
  light:       "photo-1620462544879-1afb18cdd2f0",  // soft light study

  // Surgeon portraits — verified professional, neutral-toned headshots
  // Source: Unsplash medical / professional collection
  surgeonF1:   "photo-1559839734-2b71ea197ec2",     // f, professional, warm
  surgeonF2:   "photo-1594824476967-48c8b964273f",  // f, professional
  surgeonF3:   "photo-1551836022-d5d88e9218df",     // f, neutral background
  surgeonM1:   "photo-1612531386530-97286d97c2d2",  // m, professional
  surgeonM2:   "photo-1622253692010-333f2da6031d",  // m, neutral
  surgeonM3:   "photo-1537368910025-700350fe46c7",  // m, professional

  // Patient portraits (for stories) — neutral, editorial
  story1:      "photo-1494790108377-be9c29b29330",
  story2:      "photo-1531123897727-8f129e1688ce",
  story3:      "photo-1544005313-94ddf0286df2",
  story4:      "photo-1488426862026-3ee34a7d66df",
  story5:      "photo-1573496359142-b8d87734a5a2",
  story6:      "photo-1487412720507-e7ab37603c6f",
  story7:      "photo-1534528741775-53994a69daeb",
  story8:      "photo-1524504388940-b1c1722653e1",
};

window.IMG = {
  hero:           uid(ID.hero,        1400, 1800),
  surgical:       uid(ID.surgical,    1000, 1250),
  injectables:    uid(ID.injectables, 1000, 1250),
  hair:           uid(ID.hair,        1000, 1250),
  dental:         uid(ID.dental,      1000, 1250),
  recovery:       uid(ID.recovery,    1000, 1250),
  concierge:      uid(ID.concierge,   1000, 1250),
  bali:           uid(ID.bali,        1200, 1500),
  baliAlt:        uid(ID.baliAlt,     1200, 1500),
  villa1:         uid(ID.villa1,      1200, 900),
  villa2:         uid(ID.villa2,      1200, 900),
  villa3:         uid(ID.villa3,      1200, 900),
  villa4:         uid(ID.villa4,      1200, 900),
  villa5:         uid(ID.villa5,      1200, 900),
  villa6:         uid(ID.villa6,      1200, 900),
  clinic:         uid(ID.clinic,      1400, 900),
  clinicAlt:      uid(ID.clinicAlt,   1400, 900),
  reception:      uid(ID.reception,   1200, 800),
  texture:        uid(ID.textureOne,  1200, 800),
  textureAlt:     uid(ID.textureTwo,  1200, 800),
  light:          uid(ID.light,       1200, 800),
};

// Per-treatment images — use the verified ID library
const TREATMENT_HERO_IDS = {
  surgical:      ID.textureTwo,
  "non-surgical": ID.injectables,
  hair:          ID.hair,
  dental:        ID.dental,
  recovery:      ID.recovery,
  concierge:     ID.concierge,
};
window.TREATMENT_LIST.forEach(t => {
  t.img = window.IMG[t.slug] || placeholder(t.t.toUpperCase(), t.hue, 1200, 1500);
  t.heroImg = uid(TREATMENT_HERO_IDS[t.slug] || ID.hero, 1600, 1100);
});

// Real surgeon portraits from cosmedic.bimcbali.com
const SURGEON_PORTRAITS = {
  suka:     "https://cosmedic.bimcbali.com/wp-content/uploads/2023/02/dr.-I-Made-Suka-Adnyana-SpBP-RE.png",
  astri:    "https://cosmedic.bimcbali.com/wp-content/uploads/2023/02/dr.-Astrinita-Lestari-Suyata-Sp.BP-RE.png",
  indra:    "https://cosmedic.bimcbali.com/wp-content/uploads/2024/08/dr.-Indra-cosmedic-copy.webp",
  wara:     "https://cosmedic.bimcbali.com/wp-content/uploads/2025/02/dr-Wara.png",
  sissy:    "https://cosmedic.bimcbali.com/wp-content/uploads/2023/02/dr.-Sissy-Yunita-Surya-M.png",
  rosa:     "https://cosmedic.bimcbali.com/wp-content/uploads/2023/02/dr.-Rosalina-Silvia-Dewi-M.-Biomed-AAM-Diploma-AAAM-USA.png",
  risma:    "https://cosmedic.bimcbali.com/wp-content/uploads/2024/08/dr.-Risma-cosmedic-copy-2.webp",
  theresia: "https://cosmedic.bimcbali.com/wp-content/uploads/2025/08/dr.-Theresia-Sp.-D.V.E.webp",
};
window.SURGEON_LIST.forEach(s => {
  const portrait = SURGEON_PORTRAITS[s.slug];
  s.img     = portrait;
  s.heroImg = portrait;
});

// Patient story portraits
window.STORY_PORTRAITS = [
  uid(ID.story1, 400, 400),
  uid(ID.story2, 400, 400),
  uid(ID.story3, 400, 400),
  uid(ID.story4, 400, 400),
  uid(ID.story5, 400, 400),
  uid(ID.story6, 400, 400),
  uid(ID.story7, 400, 400),
  uid(ID.story8, 400, 400),
];

// =====================================================
// BEFORE & AFTER — sourced from cosmedic.bimcbali.com/before-after/
// Each `image` is a single combined before/after photograph.
// =====================================================
const BA_BASE = "https://cosmedic.bimcbali.com/wp-content/uploads/2025/09/";
window.BA_PAIRS = [
  { num: "Case 001", label: "Lip Lift",                 time: "Three months",  cat: "surgical",     image: BA_BASE + "Lip-Lift-resized.webp" },
  { num: "Case 042", label: "Facelift & Necklift",      time: "Six months",    cat: "surgical",     image: BA_BASE + "Facelift-Necklift-1-resized.jpg" },
  { num: "Case 047", label: "Facelift & Necklift",      time: "Five months",   cat: "surgical",     image: BA_BASE + "Facelift-Necklift-2-resized.jpg" },
  { num: "Case 051", label: "Facelift & Necklift",      time: "Six months",    cat: "surgical",     image: BA_BASE + "Facelift-Necklift-3-resized.jpg" },
  { num: "Case 058", label: "Facelift & Necklift",      time: "Four months",   cat: "surgical",     image: BA_BASE + "Facelift-Necklift-4-resized.jpg" },
  { num: "Case 063", label: "Facelift & Necklift",      time: "Six months",    cat: "surgical",     image: BA_BASE + "Facelift-Necklift-5-resized.jpg" },
  { num: "Case 069", label: "Facelift & Necklift",      time: "Five months",   cat: "surgical",     image: BA_BASE + "Facelift-Necklift-6-resized.jpg" },
  { num: "Case 074", label: "Facelift & Necklift",      time: "Six months",    cat: "surgical",     image: BA_BASE + "Facelift-Necklift-7-resized.jpg" },
  { num: "Case 079", label: "Facelift & Necklift",      time: "Four months",   cat: "surgical",     image: BA_BASE + "Facelift-Necklift-8-resized.jpg" },
  { num: "Case 083", label: "Facelift & Necklift",      time: "Six months",    cat: "surgical",     image: BA_BASE + "Facelift-Necklift-9-resized.jpg" },
  { num: "Case 086", label: "Facelift & Necklift",      time: "Five months",   cat: "surgical",     image: BA_BASE + "Facelift-Necklift-10-resized.jpg" },
  { num: "Case 089", label: "Facelift & Necklift",      time: "Six months",    cat: "surgical",     image: BA_BASE + "Facelift-Necklift-11-resized.jpg" },
  { num: "Case 092", label: "Facelift & Necklift",      time: "Six months",    cat: "surgical",     image: BA_BASE + "Facelift-Necklift-12-resized.jpg" },
  { num: "Case 101", label: "Blepharoplasty",           time: "Three months",  cat: "surgical",     image: BA_BASE + "Blepharoplasty-1-resized.webp" },
  { num: "Case 105", label: "Blepharoplasty",           time: "Three months",  cat: "surgical",     image: BA_BASE + "Blepharoplasty-2-resized.webp" },
  { num: "Case 109", label: "Blepharoplasty",           time: "Four months",   cat: "surgical",     image: BA_BASE + "Blepharoplasty-3-resized.webp" },
  { num: "Case 112", label: "Blepharoplasty",           time: "Three months",  cat: "surgical",     image: BA_BASE + "Blepharoplasty-4-resized.webp" },
  { num: "Case 115", label: "Blepharoplasty",           time: "Three months",  cat: "surgical",     image: BA_BASE + "Blepharoplasty-5-resized.webp" },
  { num: "Case 118", label: "Blepharoplasty",           time: "Four months",   cat: "surgical",     image: BA_BASE + "Blepharoplasty-6-resized.webp" },
  { num: "Case 121", label: "Blepharoplasty",           time: "Three months",  cat: "surgical",     image: BA_BASE + "Blepharoplasty-7-resized.webp" },
  { num: "Case 134", label: "Abdominoplasty",           time: "Six months",    cat: "surgical",     image: BA_BASE + "Tummy-Tuck-1-resized.webp" },
  { num: "Case 138", label: "Abdominoplasty",           time: "Six months",    cat: "surgical",     image: BA_BASE + "Tummy-Tuck-2-resized.webp" },
  { num: "Case 152", label: "Mommy Makeover",           time: "Eight months",  cat: "surgical",     image: BA_BASE + "Mommy-Make-Over-1-resized.webp" },
  { num: "Case 158", label: "Mommy Makeover",           time: "Six months",    cat: "surgical",     image: BA_BASE + "Mommy-Make-Over-2-resized.webp" },
  { num: "Case 164", label: "Breast Augmentation",      time: "Five months",   cat: "surgical",     image: BA_BASE + "Breast-Augmentation-resized.webp" },
  { num: "Case 169", label: "Breast Augmentation",      time: "Six months",    cat: "surgical",     image: "https://cosmedic.bimcbali.com/wp-content/uploads/2026/02/Breast-Augmentation.webp" },
  { num: "Case 175", label: "Breast Augmentation & Lift", time: "Six months",  cat: "surgical",     image: BA_BASE + "Breast-Augmentation-Breast-Lift-1-resized.webp" },
  { num: "Case 178", label: "Breast Augmentation & Lift", time: "Seven months",cat: "surgical",     image: BA_BASE + "Breast-Augmentation-Breast-Lift-2-resized.webp" },
  { num: "Case 184", label: "Liposuction & Fat Transfer", time: "Four months", cat: "surgical",     image: BA_BASE + "Liposuction-Fat-Transfer-resized.webp" },
];

// =====================================================
// PRICING — IDR primary, AUD secondary
// =====================================================

// Conversion rate. May 2026: 1 AUD ≈ 10,500 IDR. Round to nearest 50,000 IDR for clean numbers.
const AUD_TO_IDR = 10500;

const formatIDR = (idr) => {
  // Indonesian uses "." as thousands separator. Round to nearest 50,000.
  const rounded = Math.round(idr / 50000) * 50000;
  return "Rp " + rounded.toLocaleString("de-DE"); // de-DE uses dots as thousands separators
};

const formatAUD = (aud) => "AUD " + aud.toLocaleString("en-AU");

// Parse strings like "AUD 8,500", "AUD 280 / night", "Included", "Complimentary"
window.priceParts = (audStr) => {
  if (!audStr || typeof audStr !== "string") return null;
  const m = audStr.match(/AUD\s*([\d,]+)(.*)$/i);
  if (!m) {
    // Not a numeric AUD price (e.g. "Included", "Complimentary") — return as-is
    return { idr: audStr, aud: null, suffix: "" };
  }
  const num = parseInt(m[1].replace(/,/g, ""), 10);
  const suffix = m[2] || ""; // " / night", " / session", etc.
  return {
    idr: formatIDR(num * AUD_TO_IDR) + suffix,
    aud: formatAUD(num) + suffix,
    suffix,
  };
};

// Renders an IDR primary + AUD italic secondary stack.
// align: "right" (procedure list) or "left" (other cases).
window.PriceTag = ({ aud, align = "right", invert = false }) => {
  const p = window.priceParts(aud);
  if (!p) return null;
  if (!p.aud) {
    // Non-numeric — just render the original (e.g. "Included")
    return (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: invert ? "rgba(255,255,255,0.7)" : "var(--accent-deep)", textAlign: align }}>
        {p.idr}
      </span>
    );
  }
  return (
    <span style={{ display: "flex", flexDirection: "column", alignItems: align === "right" ? "flex-end" : "flex-start", gap: 4 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: invert ? "white" : "var(--accent-deep)", whiteSpace: "nowrap" }}>
        {p.idr}
      </span>
      <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, color: invert ? "rgba(255,255,255,0.6)" : "var(--ink-60)", whiteSpace: "nowrap" }}>
        ≈ {p.aud}
      </span>
    </span>
  );
};

// =====================================================
// PRIMITIVES
// =====================================================
window.useReveal = () => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
};

window.Reveal = ({ children, delay = 0, y = 24, as = "div", style = {}, ...rest }) => {
  const [ref, shown] = window.useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 1.1s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 1.1s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

window.Img = ({ src, fallbackLabel = "BIMC", fallbackHue = 0, alt = "", ...rest }) => {
  const [s, setS] = useState(src);
  return (
    <img
      src={s}
      alt={alt}
      loading="lazy"
      onError={() => setS(window.placeholder(fallbackLabel, fallbackHue, 1200, 1500))}
      {...rest}
    />
  );
};

window.Mono = ({ children, style = {} }) => (
  <span className="mono" style={style}>{children}</span>
);

window.Eyebrow = ({ children, style = {} }) => (
  <span className="eyebrow" style={style}>
    <span className="eyebrow-rule" />
    <span>{children}</span>
  </span>
);

window.Btn = ({ children, kind = "primary", as = "button", href, style = {}, full = false, ...rest }) => {
  const cls = `btn btn-${kind}${full ? " btn-full" : ""}`;
  if (as === "a" || href) {
    return (
      <a href={href || "#"} className={cls} style={style} {...rest}>
        <span>{children}</span>
        <span className="btn-arrow">→</span>
      </a>
    );
  }
  return (
    <button className={cls} style={style} {...rest}>
      <span>{children}</span>
      <span className="btn-arrow">→</span>
    </button>
  );
};

// =====================================================
// HEADER WITH MEGA-MENU
// =====================================================
window.Header = ({ activePage = "" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <a href="index.html" className="logo">
          <img src="assets/logo.png" alt="BIMC CosMedic — Managed by BIMC Hospital" />
        </a>
        <nav className="primary-nav">
          <div className="has-dropdown">
            <a href="treatments.html" className={activePage.startsWith("treatment") ? "active" : ""}>Treatments</a>
            <div className="dropdown-panel">
              <div className="dropdown-panel-inner">
                {window.TREATMENT_LIST.map(t => (
                  <a key={t.slug} href={`treatment-${t.slug}.html`} className={activePage === `treatment-${t.slug}` ? "active" : ""}>
                    <span>{t.t}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="has-dropdown">
            <a href="surgeons.html" className={activePage.startsWith("surgeon") ? "active" : ""}>Surgeons</a>
            <div className="dropdown-panel">
              <div className="dropdown-panel-inner">
                {window.SURGEON_LIST.map((s, i) => (
                  <a key={s.slug} href={`surgeon-${s.slug}.html`} className={activePage === `surgeon-${s.slug}` ? "active" : ""}>
                    <span>Dr. {s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href="journey.html" className={activePage === "journey" ? "active" : ""}>Your Journey</a>
          <a href="gallery.html" className={activePage === "gallery" ? "active" : ""}>Gallery</a>
          <a href="stories.html" className={activePage === "stories" ? "active" : ""}>Stories</a>
          <a href="contact.html" className={activePage === "contact" ? "active" : ""}>Contact</a>
        </nav>
        <div className="header-right">
          <div className="lang-switcher">
            {["EN", "ID"].map(l => (
              <button
                key={l}
                className={`lang-pill ${lang === l ? "active" : ""}`}
                onClick={() => setLang(l)}
              >{l}</button>
            ))}
          </div>
          <a href="contact.html" className="header-cta">
            <span>Plan Your Treatment</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
};

// =====================================================
// FOOTER
// =====================================================
window.Footer = () => (
  <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-brand">
        <a href="index.html" className="logo logo-dark">
          <img src="assets/logo-light.png" alt="BIMC CosMedic" />
        </a>
        <p>
          BIMC Hospital Nusa Dua<br />
          Kawasan ITDC Blok D<br />
          Nusa Dua 80363, Bali, Indonesia
        </p>
        <p className="footer-newsletter-label">Receive our quarterly journal</p>
        <form className="footer-newsletter" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Your email address" />
          <button>→</button>
        </form>
      </div>

      <div className="footer-col">
        <window.Mono>Treatments</window.Mono>
        <ul>
          {window.TREATMENT_LIST.map(t => (
            <li key={t.slug}><a href={`treatment-${t.slug}.html`}>{t.t}</a></li>
          ))}
        </ul>
      </div>
      <div className="footer-col">
        <window.Mono>About</window.Mono>
        <ul>
          <li><a href="surgeons.html">Surgeons</a></li>
          <li><a href="press.html">Accreditations</a></li>
          <li><a href="press.html">Press</a></li>
          <li><a href="stories.html">Stories</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <window.Mono>Journey</window.Mono>
        <ul>
          <li><a href="journey.html">How it works</a></li>
          <li><a href="recovery-stays.html">Recovery stays</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="gallery.html">Gallery</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <window.Mono>Connect</window.Mono>
        <ul>
          <li><a href="contact.html">Concierge</a></li>
          <li><a href="contact.html">WhatsApp</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Privacy &amp; Terms</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <window.Mono>© MMXXVI BIMC CosMedic Centre</window.Mono>
      <window.Mono>ACHSI Accredited · Est. 1998</window.Mono>
      <window.Mono>Designed in Bali</window.Mono>
    </div>
  </footer>
);

// =====================================================
// FLOATING — fixed CTA + chat (always-on)
// =====================================================
window.FloatingChrome = () => {
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={`fixed-cta ${scrolled ? "show" : ""}`}>
        <a href="contact.html" className="fixed-cta-btn">
          <span className="dot" />
          <span>Plan Your Treatment</span>
          <span className="btn-arrow">→</span>
        </a>
      </div>

      <button
        className={`chat-fab ${chatOpen ? "open" : ""}`}
        onClick={() => setChatOpen(o => !o)}
        aria-label="Concierge chat"
      >
        {chatOpen ? "×" : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5c0 4.142-4.03 7.5-9 7.5a9.7 9.7 0 0 1-3.36-.59L3 20l1.59-4.64A6.96 6.96 0 0 1 3 11.5C3 7.358 7.03 4 12 4s9 3.358 9 7.5z" />
          </svg>
        )}
      </button>

      <div className={`chat-panel ${chatOpen ? "open" : ""}`}>
        <div className="chat-head">
          <div>
            <window.Mono>Live Concierge</window.Mono>
            <h4>Speak with us.</h4>
          </div>
          <button onClick={() => setChatOpen(false)} className="chat-close">×</button>
        </div>
        <div className="chat-body">
          <div className="chat-greet">
            <span className="chat-avatar">A</span>
            <div>
              <p>Hello — I'm Anya, your concierge. How may I help you plan?</p>
              <span className="chat-meta">Replies typically within ten minutes</span>
            </div>
          </div>
          <div className="chat-options">
            <button>I'd like to book a consultation</button>
            <button>Tell me about recovery stays</button>
            <button>Pricing &amp; payment</button>
            <button>Speak in another language</button>
          </div>
        </div>
        <div className="chat-foot">
          <input type="text" placeholder="Write a message…" />
          <button>→</button>
        </div>
      </div>
    </>
  );
};

// =====================================================
// CHAPTER OPENER (used on every interior page)
// =====================================================
window.ChapterOpener = ({ chapter, title, lede, image, breadcrumbs = [], imageHue = 0, imageLabel = "BIMC" }) => (
  <section className="chapter-opener">
    <div className="chapter-bg">
      <window.Img src={image} fallbackLabel={imageLabel} fallbackHue={imageHue} alt="" />
    </div>
    <div className="chapter-content">
      <div className="chapter-meta">
        {breadcrumbs.length > 0 && (
          <div className="chapter-breadcrumb">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="sep">/</span>}
                {b.href ? <a href={b.href}>{b.label}</a> : <span>{b.label}</span>}
              </React.Fragment>
            ))}
          </div>
        )}
        <window.Eyebrow>{chapter}</window.Eyebrow>
        <h1 className="chapter-title">
          {Array.isArray(title) ? title.map((line, i) => (
            <span key={i} className={`line ${i % 2 === 1 ? "italic" : ""}`}>{line}</span>
          )) : title}
        </h1>
      </div>
      <div className="chapter-side">
        {lede && <p>{lede}</p>}
      </div>
    </div>
  </section>
);

// =====================================================
// CTA BAND (slim, used at bottom of every interior page)
// =====================================================
window.CTABandSlim = ({ title = ["Begin your", "journey."], lede, primary = "Plan Your Treatment", primaryHref = "contact.html", secondary = "Speak with a Concierge", secondaryHref = "contact.html" }) => (
  <section className="cta-band-slim">
    <window.Mono style={{ color: "rgba(255,255,255,0.6)", position: "relative" }}>An Invitation</window.Mono>
    <h2>
      {Array.isArray(title) ? title.map((l, i) => (
        <React.Fragment key={i}>
          <span className={i % 2 === 1 ? "italic" : ""}>{l}</span>
          {i < title.length - 1 && <br />}
        </React.Fragment>
      )) : title}
    </h2>
    <p>{lede || "A private consultation, treatment plan, and stay — coordinated as one. A concierge will reply within twenty-four hours."}</p>
    <div className="cta-buttons-row">
      <a href={primaryHref} className="btn btn-accent"><span>{primary}</span><span className="btn-arrow">→</span></a>
      <a href={secondaryHref} className="btn btn-ghost-light"><span>{secondary}</span><span className="btn-arrow">→</span></a>
    </div>
  </section>
);

// =====================================================
// SHARED PAGE LAYOUT
// =====================================================
window.PageShell = ({ activePage, children, hideCTA = false }) => (
  <>
    <window.Header activePage={activePage} />
    <main>{children}</main>
    {!hideCTA && <window.CTABandSlim />}
    <window.Footer />
    <window.FloatingChrome />
  </>
);
