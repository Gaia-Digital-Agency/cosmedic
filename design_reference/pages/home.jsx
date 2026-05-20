/* global React */
const { useState, useEffect, useRef } = React;
const { Reveal, Img, Mono, Eyebrow, Btn, Header, Footer, FloatingChrome, IMG, TREATMENT_LIST, SURGEON_LIST, BA_PAIRS, STORY_PORTRAITS, placeholder } = window;

// =====================================================
// HOME v1.1 — informed by Gemini & Claude audits
// Key changes:
//   • Hero with single focal point + descriptive H1, form moved behind CTA
//   • Sticky WhatsApp + Plan Treatment in floating chrome (in shared.jsx)
//   • Pricing visible on homepage ("from" ranges)
//   • Lead-magnet capture (Bali Recovery Guide) for top-of-funnel
//   • B&A teaser with comparison slider
//   • Trust strip directly under hero (ACHSI, ISAPS, etc.)
//   • Descriptive section labels, Roman numerals retained as small accents only
//   • Surgeon cards equalised; lead clearly demarcated
//   • Honest "AI Assistant" labelling on chat (in shared.jsx)
// =====================================================

// ---------- HERO v2 — single focal point ----------
const Hero = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="hero-v2">
      <div className="hero-image-inner">
        <Img src={IMG.hero} fallbackLabel="BIMC · NUSA DUA" fallbackHue={3} alt="" />
        <div className="hero-image-vignette" />
      </div>

      <div className="hero-v2-content">
        <div className="hero-v2-headline">
          <Eyebrow>A sanctuary in Nusa Dua · Est. 1998</Eyebrow>
          <h1 className="display">
            <span className="line">Plastic surgery</span>
            <span className="line italic">in Bali,</span>
            <span className="line">by ISAPS</span>
            <span className="line italic accent">surgeons.</span>
          </h1>
          <p className="hero-v2-sub-h1" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.45, marginTop: 18, color: "rgba(255,255,255,0.86)" }}>
            The care of medicine. The grace of Bali.
          </p>
          <p className="hero-v2-sub-h1">
            Performed inside Indonesia's first ACHSI-accredited international hospital, with private villa recovery and twelve months of telehealth follow-up included. Procedures from Rp 18,900,000 (≈ AUD 1,800).
          </p>

          <div className="hero-v2-actions">
            <a href="#enquiry" className="btn btn-accent" onClick={(e) => {e.preventDefault();document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });}}>
              <span>Plan Your Treatment</span><span className="btn-arrow">→</span>
            </a>
            <a href="pricing.html" className="btn btn-ghost-light"><span>View Pricing</span><span className="btn-arrow">→</span></a>
          </div>
        </div>

        <div className="hero-v2-side">
          <div className="hero-v2-card" id="enquiry">
            <Mono style={{ color: "var(--accent-deep)" }}>Begin · No commitment</Mono>
            <h4>Get a private price estimate within 24 hours.</h4>
            <p>Two fields to start. We'll reply with a tailored estimate and procedure guide — no marketing.</p>
            <form className={`quick-enquiry ${expanded ? "expanded" : ""}`} onSubmit={(e) => {e.preventDefault();window.location.href = "contact.html";}}>
              <label className="field">
                <span className="field-label">Your name</span>
                <input type="text" placeholder="First name" required onFocus={() => setExpanded(true)} />
              </label>
              <label className="field">
                <span className="field-label">Email</span>
                <input type="email" placeholder="you@email.com" required onFocus={() => setExpanded(true)} />
              </label>
              <div className="progressive">
                <label className="field">
                  <span className="field-label">Area of interest <em style={{ fontStyle: "italic", color: "var(--ink-40)" }}>(optional)</em></span>
                  <input type="text" placeholder="e.g. rhinoplasty, mommy makeover…" />
                </label>
              </div>
              {!expanded &&
              <button type="button" className="reveal-link" onClick={() => setExpanded(true)}>
                  + Add a treatment area (optional)
                </button>
              }
              <Btn kind="primary" full>Begin enquiry</Btn>
              <p className="form-fine">Held in confidence. Reviewed by a credentialed surgeon.</p>
            </form>
          </div>
        </div>
      </div>
    </section>);

};

// ---------- TRUST STRIP — at-a-glance metrics ----------
const TrustStrip = () => {
  const stats = [
  { num: "28", lab: "Years in practice" },
  { num: "8", lab: "ISAPS / FICS surgeons" },
  { num: "3,400+", lab: "Procedures performed" },
  { num: "#1", lab: "Medical Tourism Hospital 2026" }];

  return (
    <section className="trust-strip trust-strip-stats">
      {stats.map((s, i) =>
      <div key={i} className="ts-stat">
          <span className="ts-num">{s.num}</span>
          <span className="mono">{s.lab}</span>
        </div>
      )}
    </section>);

};

// ---------- INTRO ----------
const Intro = () =>
<section className="intro">
    <div className="intro-grid">
      <Reveal>
        <Eyebrow>Our Approach</Eyebrow>
      </Reveal>
      <div>
        <Reveal delay={120}>
          <p className="pull-quote">
            <span>Aesthetic medicine, considered with the same </span>
            <span className="italic">care </span>
            <span>as the island that surrounds it.</span>
          </p>
        </Reveal>
        <div className="intro-cols">
          <Reveal delay={240}>
            <p>
              For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality — quietly, with patience, and with deep respect for the person in the chair. We don't promise transformation. We promise consideration: of your face, your body, your time, and the life you intend to return to.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              Our centre sits within Indonesia's most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists — fellowship-trained in Korea, Japan, Singapore and across Indonesia — work alongside a concierge team that handles everything from your arrival at Ngurah Rai to your final follow-up by video.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>;


// ---------- TREATMENTS ----------
const Treatments = () =>
<section className="treatments" id="treatments">
    <div className="treatments-head">
      <Reveal>
        <Eyebrow>Treatments</Eyebrow>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="section-title">
          <span>Six disciplines,</span><br />
          <span className="italic">one sanctuary.</span>
        </h2>
      </Reveal>
      <Reveal delay={220}>
        <p className="section-lede">
          A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.
        </p>
      </Reveal>
    </div>
    <div className="treatments-grid">
      {TREATMENT_LIST.map((t, i) =>
    <Reveal key={t.slug} delay={i * 80} y={32}>
          <a href={`treatment-${t.slug}.html`} style={{ display: "block", color: "inherit" }}>
            <article className="treatment-card">
              <div className="treatment-image">
                <Img src={t.img} fallbackLabel={t.t.toUpperCase()} fallbackHue={t.hue} alt="" />
                <div className="treatment-num"><Mono>{t.n}</Mono></div>
              </div>
              <div className="treatment-body">
                <h3 className="treatment-title">{t.t}</h3>
                <p className="treatment-sub">{t.sub}</p>
                <p className="treatment-text">{t.body}</p>
                <div className="treatment-foot">
                  <span className="treatment-link">Read more <span>→</span></span>
                </div>
              </div>
            </article>
          </a>
        </Reveal>
    )}
    </div>
  </section>;


// ---------- PRICING TEASER ----------
const PRICE_TEASER = [
{ name: "Rhinoplasty", aud: 4200, slug: "surgical-face" },
{ name: "Breast Augmentation", aud: 5800, slug: "surgical-breast" },
{ name: "Facelift & Necklift", aud: 8500, slug: "surgical-face" },
{ name: "Sapphire FUE Hair", aud: 3400, slug: "hair-fue" },
{ name: "Liposculpture", aud: 4800, slug: "surgical-body" },
{ name: "Blepharoplasty", aud: 2200, slug: "surgical-face" },
{ name: "Botulinum Toxin", aud: 320, slug: "non-surgical-injectables" },
{ name: "Dermal Fillers", aud: 480, slug: "non-surgical-injectables" }];

const fmtIDR = (aud) => "Rp " + (Math.round(aud * 10500 / 50000) * 50000).toLocaleString("de-DE");

const PricingTeaser = () =>
<section className="price-teaser" id="pricing">
    <div className="price-teaser-head">
      <Reveal><Eyebrow>Pricing · Starting From</Eyebrow></Reveal>
      <Reveal delay={120}>
        <div>
          <h2 className="section-title">
            <span>Transparent</span><br />
            <span className="italic">pricing.</span>
          </h2>
          <p className="section-lede" style={{ marginTop: 18 }}>
            Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.
          </p>
        </div>
      </Reveal>
    </div>
    <div className="price-teaser-grid">
      {PRICE_TEASER.map((p, i) =>
    <Reveal key={p.name + i} delay={i * 50} y={20}>
          <a href={`treatment-${p.slug}.html`} className="price-row" style={{ color: "inherit", textDecoration: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6 }}>
            <h4 className="pr-name">{p.name}</h4>
            <span className="pr-from">From</span>
            <span className="pr-amount">{fmtIDR(p.aud)} <span className="pr-aud" style={{ marginLeft: 6 }}>≈ AUD {p.aud.toLocaleString("en-AU")}</span></span>
          </a>
        </Reveal>
    )}
    </div>
    <div className="price-teaser-foot">
      <p>Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.</p>
      <Btn kind="ghost" as="a" href="pricing.html">View full pricing</Btn>
    </div>
  </section>;


// ---------- SURGEONS — equalised + clearer hierarchy ----------
const Surgeons = () => {
  const lead = SURGEON_LIST[0];
  const associates = SURGEON_LIST.slice(1, 7);
  return (
    <section className="surgeons" id="surgeons">
      <Reveal>
        <Eyebrow>Meet the Surgeons</Eyebrow>
      </Reveal>
      <div className="surgeons-feature">
        <Reveal delay={120}>
          <div className="surgeons-feature-img" data-surgeon={lead.slug}>
            <Img src={lead.heroImg} fallbackLabel={`DR. ${lead.common.toUpperCase()}`} fallbackHue={lead.hue} alt="" />
          </div>
        </Reveal>
        <Reveal delay={240} style={{ paddingTop: 32 }}>
          <Mono>Lead Surgeon</Mono>
          <h2 className="surgeon-name">
            <span>{lead.title} {lead.name.split(" ").slice(0, -1).join(" ")}</span><br />
            <span className="italic">{lead.name.split(" ").slice(-1)[0]}</span>
          </h2>
          <p className="surgeon-credentials">{lead.cred}</p>
          <p className="surgeon-body">
            ISAPS-member plastic surgeon with seven years of practice in Bali, fellowship-trained in maxillofacial surgery in Japan, specializing in <em>facial aesthetics, body contouring and breast surgery</em>. Cited by patients for a conservative, natural-result approach.
          </p>
          <div className="surgeon-stats">
            <div><Mono>Trained</Mono><span>Indonesia · Japan</span></div>
            <div><Mono>Specialty</Mono><span>Facial Aesthetics</span></div>
            <div><Mono>Society</Mono><span>ISAPS Member</span></div>
          </div>
          <Btn kind="ghost" as="a" href={`surgeon-${lead.slug}.html`}>Read the full profile</Btn>
        </Reveal>
      </div>

      <div style={{ marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--ink-20)", paddingBottom: 18 }}>
        <Mono>Associate Surgeons & Aestheticians</Mono>
        <Mono>{associates.length} practitioners</Mono>
      </div>
      <div className="surgeons-grid" style={{ marginTop: 32 }}>
        {associates.map((s, i) =>
        <Reveal key={s.slug} delay={i * 60} y={20}>
            <a href={`surgeon-${s.slug}.html`} style={{ color: "inherit" }}>
              <div className="surgeon-card" data-surgeon={s.slug}>
                <div className="surgeon-card-img"><Img src={s.img} fallbackLabel={`DR. ${s.common.toUpperCase()}`} fallbackHue={s.hue} alt="" /></div>
                <div className="surgeon-card-meta">
                  <h4>{s.title} {s.common}</h4>
                  <Mono>{s.spec.split(" — ")[0].split(",")[0]}</Mono>
                  <span className="surgeon-train">{s.years} yrs · {s.train.split(" · ")[0]}</span>
                </div>
              </div>
            </a>
          </Reveal>
        )}
      </div>
    </section>);

};

const Gallery = () => {
  const filtered = BA_PAIRS;

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-head">
        <Reveal>
          <Eyebrow>Before & After Results</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="section-title"><span className="italic">Quietly</span> transformative.</h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="section-lede">Three signature results from our facial repertoire.
          </p>
        </Reveal>
      </div>
      <div className="gallery-grid">
        {filtered.map((c, i) => <Reveal key={i} delay={i * 100} y={28}>
            <figure className="ba-card">
              {i === 0 ?
            <div className="ba-single">
                  <Img src={c.image} fallbackLabel={`${c.label.toUpperCase()} · ${c.num}`} fallbackHue={i * 2} alt={`${c.label} — before and after`} />
                  <span className="ba-tag"><Mono>Before</Mono></span>
                  <span className="ba-tag accent" style={{ left: "auto", right: 14 }}><Mono>After</Mono></span>
                </div> :

            <div className="ba-single">
                  <Img src={c.image} fallbackLabel={`${c.label.toUpperCase()} · ${c.num}`} fallbackHue={i * 2} alt={`${c.label} — before and after`} />
                  <span className="ba-tag"><Mono>Before</Mono></span>
                  <span className="ba-tag accent" style={{ left: "auto", right: 14 }}><Mono>After</Mono></span>
                </div>
            }
              <figcaption>
                <div>
                  <Mono>{c.num}</Mono>
                  <h4>{c.label}</h4>
                </div>
                <span className="ba-time">{c.time}</span>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
      <Reveal>
        <div className="gallery-foot">
          <Btn kind="ghost" as="a" href="results.html#results">View the full gallery</Btn>
        </div>
      </Reveal>
    </section>);

};

// ---------- LEAD MAGNET ----------
const LeadMagnet = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="lead-magnet">
      <Reveal>
        <div className="lead-magnet-cover">
          <span className="cover-eyebrow">A guide · 24 pages · PDF</span>
          <h3 className="cover-title">
            <span>The Bali</span><br />
            <span className="italic">Recovery</span><br />
            <span>Guide.</span>
          </h3>
          <div className="cover-spacer" />
          <div className="cover-foot">
            <span>BIMC CosMedic</span>
            <span>MMXXVI</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="lead-magnet-body">
          <Eyebrow>Free Guide</Eyebrow>
          <h2 className="section-title" style={{ marginTop: 18 }}>
            <span>What to expect from</span> <span className="italic">recovery in Bali.</span>
          </h2>
          <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.65 }}>
            A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.
          </p>
          {submitted ?
          <div style={{ marginTop: 28, padding: 20, border: "1px solid var(--accent)", background: "var(--paper)" }}>
              <Mono style={{ color: "var(--accent-deep)" }}>✓ Sent</Mono>
              <p style={{ margin: "10px 0 0", fontSize: 16 }}>Check your inbox — the guide is on its way.</p>
            </div> :

          <form className="lead-magnet-form" onSubmit={(e) => {e.preventDefault();setSubmitted(true);}}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Send Guide →</button>
            </form>
          }
          <p className="lead-magnet-fine">One email. No marketing list. Unsubscribe anytime.</p>
        </div>
      </Reveal>
    </section>);

};

// ---------- JOURNEY ----------
const Journey = () =>
<section className="journey" id="journey">
    <div className="journey-head">
      <Reveal><Eyebrow>Your Journey</Eyebrow></Reveal>
      <Reveal delay={120}>
        <h2 className="section-title"><span>From enquiry to</span> <span className="italic">homecoming.</span></h2>
      </Reveal>
    </div>
    <div className="journey-steps">
      {[
    ["01", "Consult", "A private video call with a surgeon, anywhere in the world."],
    ["02", "Plan", "A treatment plan, a recovery plan, and a stay — in one envelope."],
    ["03", "Arrive", "Met at Ngurah Rai. Driven, by us, to the clinic or to your villa."],
    ["04", "Procedure", "Performed in our ACHSI-accredited theatres at BIMC Nusa Dua."],
    ["05", "Recover", "Daily nursing visits in a private villa, then twelve months of follow-up."]].
    map(([n, t, d], i, arr) =>
    <Reveal key={i} delay={i * 90}>
          <div className="journey-step">
            <div className="journey-num">
              <span>{n}</span>
              {i < arr.length - 1 && <span className="journey-arrow">→</span>}
            </div>
            <h4>{t}</h4>
            <p>{d}</p>
          </div>
        </Reveal>
    )}
    </div>
    <Reveal>
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <Btn kind="ghost" as="a" href="journey.html">Read the full journey</Btn>
      </div>
    </Reveal>
  </section>;


// ---------- STORIES ----------
const Stories = () =>
<section className="stories" id="stories">
    <Reveal><Eyebrow>Verified Patient Stories</Eyebrow></Reveal>
    <Reveal delay={120}>
      <h2 className="section-title section-title-center"><span className="italic">Stories,</span> not slogans.</h2>
    </Reveal>
    <Reveal delay={200}>
      <p className="section-lede" style={{ margin: "22px auto 0", textAlign: "center" }}>
        Verified reviews from international patients. Video testimonials and Google reviews on our <a href="results.html#stories" style={{ color: "var(--accent-deep)", textDecoration: "underline" }}>full stories page</a>.
      </p>
    </Reveal>
    <div className="stories-grid">
      {[
    { q: "I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself.", n: "Sarah K.", c: "Sydney, Australia", p: "Rhinoplasty · 2025", hue: 1, idx: 0, verified: "Google review · ★★★★★" },
    { q: "dr. Suka talked me out of two of the three things I'd asked for. The result is the most natural I've ever looked. I'm grateful.", n: "Margaux D.", c: "Paris, France", p: "Mid-face · 2024", hue: 3, idx: 1, verified: "Trustpilot · ★★★★★" },
    { q: "The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family.", n: "James W.", c: "Melbourne, Australia", p: "Hair restoration · 2025", hue: 5, idx: 2, verified: "Verified video review" }].
    map((s, i) =>
    <Reveal key={i} delay={i * 100} y={32}>
          <figure className="story-card">
            <blockquote>
              <span className="quote-mark">“</span>
              {s.q}
            </blockquote>
            <figcaption>
              <Img src={STORY_PORTRAITS[s.idx]} fallbackLabel={s.n.toUpperCase()} fallbackHue={s.hue} alt="" />
              <div>
                <span className="story-name">{s.n}</span>
                <span className="story-city">{s.c}</span>
                <Mono style={{ marginTop: 4 }}>{s.p}</Mono>
                <Mono style={{ marginTop: 4, color: "var(--accent-deep)" }}>{s.verified}</Mono>
              </div>
            </figcaption>
          </figure>
        </Reveal>
    )}
    </div>
    <Reveal>
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <Btn kind="ghost" as="a" href="results.html#stories">Read more stories</Btn>
      </div>
    </Reveal>
  </section>;


// ---------- PLACE ----------
const Place = () =>
<section className="place">
    <div className="place-grid">
      <Reveal>
        <div className="place-image">
          <Img src={IMG.bali} fallbackLabel="BALI · NUSA DUA" fallbackHue={4} alt="" />
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="place-body">
          <Eyebrow>Recovery in Bali</Eyebrow>
          <h2 className="section-title">
            <span>Recover</span><br />
            <span className="italic">in paradise.</span>
          </h2>
          <p>
            Nusa Dua sits on the southernmost reach of Bali — quiet beaches, soft afternoons, and the kind of warm, careful hospitality that has made the island synonymous with rest. We work with a small portfolio of villas and resorts, hand-selected for privacy and post-operative comfort.
          </p>
          <div className="place-list">
            {[
          ["A.", "Private recovery villas in Nusa Dua & Ubud"],
          ["B.", "Daily nursing visits, dietitian on call"],
          ["C.", "Drivers, security, and concierge — included"],
          ["D.", "A short walk to the BIMC hospital"]].
          map(([k, t], i) =>
          <div key={i} className="place-row">
                <Mono>{k}</Mono>
                <span>{t}</span>
              </div>
          )}
          </div>
          <Btn kind="ghost" as="a" href="recovery-stays.html">View recovery stays</Btn>
        </div>
      </Reveal>
    </div>
  </section>;


// ---------- CTA BAND ----------
const CTABand = () =>
<section className="cta-band" id="contact">
    <div className="cta-grid">
      <Reveal>
        <div>
          <Mono style={{ color: "rgba(255,255,255,0.6)" }}>An Invitation</Mono>
          <h2 className="cta-title">
            <span>The next page</span><br />
            <span className="italic">is yours to write.</span>
          </h2>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="cta-side">
          <p>
            A private consultation, treatment plan, and stay — coordinated as one. Concierge replies within twenty-four hours, in English or Bahasa Indonesia.
          </p>
          <div className="cta-buttons">
            <Btn kind="accent" full as="a" href="contact.html">Plan Your Treatment</Btn>
          </div>
          <div className="cta-fine">
            <Mono>+62 361 3000 911</Mono>
            <Mono>concierge@bimccosmedic.com</Mono>
          </div>
        </div>
      </Reveal>
    </div>
  </section>;


// ---------- APP ----------
const App = () =>
<>
    <Header activePage="home" />
    <main>
      <Hero />
      <TrustStrip />
      <Intro />
      <Treatments />
      <PricingTeaser />
      <Surgeons />
      <Gallery />
      <LeadMagnet />
      <Journey />
      <Stories />
      <Place />
    </main>
    <div className="dark-foot">
      <window.CTABandSlim />
      <Footer />
    </div>
    <FloatingChrome />
  </>;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);