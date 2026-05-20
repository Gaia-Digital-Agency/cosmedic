/* global React */
const { useState, useEffect, useRef } = React;
const { Reveal, Img, Mono, Eyebrow, Btn, Header, Footer, FloatingChrome, IMG, TREATMENT_LIST, SURGEON_LIST, placeholder } = window;

// =====================================================
// HOME — Hero (split with booking) + sections
// =====================================================

const Hero = () => (
  <section className="hero">
    <div className="hero-image">
      <div className="hero-image-inner">
        <Img src={IMG.hero} fallbackLabel="BIMC · NUSA DUA" fallbackHue={3} alt="" />
        <div className="hero-image-vignette" />
      </div>
      <div className="hero-credit"><Mono>Plate I · Nusa Dua, Bali</Mono></div>
      <div className="hero-headline">
        <Eyebrow>A sanctuary in Nusa Dua · Est. 1998</Eyebrow>
        <h1 className="display">
          <span className="line">The care of</span>
          <span className="line italic">medicine.</span>
          <span className="line">The grace of</span>
          <span className="line italic accent">Bali.</span>
        </h1>
        <p className="hero-lede">
          Indonesia's first ACHSI-accredited hospital, where surgical excellence is paired with the unhurried hospitality of the island it calls home.
        </p>
      </div>
    </div>

    <aside className="hero-aside">
      <div className="hero-aside-top">
        <Mono style={{ color: "var(--ink-60)" }}>Enquiry · I</Mono>
      </div>
      <div className="hero-aside-body">
        <h2 className="aside-title">
          <span>Tell us a little</span>
          <span className="italic">about you.</span>
        </h2>
        <p className="aside-sub">A private consultation, treatment plan, and stay — coordinated as one. A concierge will reply within twenty-four hours.</p>

        <form className="enquiry-form" onSubmit={e => e.preventDefault()}>
          <label className="field">
            <span className="field-label">Area of interest</span>
            <div className="select-row">
              <span>Select treatments…</span>
              <span className="chev">▾</span>
            </div>
          </label>
          <label className="field">
            <span className="field-label">Approximate dates</span>
            <input type="text" placeholder="Month / year" />
          </label>
          <label className="field">
            <span className="field-label">Travelling from</span>
            <input type="text" placeholder="City, country" />
          </label>
          <Btn kind="accent" full>Begin enquiry</Btn>
          <p className="aside-fine">Your details are held in confidence. No marketing.</p>
        </form>
      </div>
      <div className="hero-aside-foot">
        <Mono>ACHSI Accredited</Mono>
        <Mono>Est. 1998</Mono>
      </div>
    </aside>
  </section>
);

const Marquee = () => {
  const items = [
    "ACHSI Accredited — first in Indonesia",
    "Medical Tourism Hospital of the Year · 2026",
    "Healthcare Asia Awards",
    "Member · International Society of Aesthetic Plastic Surgery",
    "ISO 9001 : 2015",
    "Established MCMXCVIII",
  ];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">✦</span>
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Intro = () => (
  <section className="intro">
    <div className="intro-grid">
      <Reveal>
        <Eyebrow>I — A Considered Practice</Eyebrow>
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
              For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality — quietly, with patience, and with deep respect for the person in the chair. We do not promise transformation. We promise consideration: of your face, your body, your time, and the life you intend to return to.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              Our centre sits within Indonesia's most accredited international hospital, where eight ISAPS- and FICS-credentialled specialists — fellowship-trained in Korea, Japan, Singapore, and across Indonesia — work alongside a concierge team that handles everything from your arrival at Ngurah Rai to your final follow-up by video. Always private. Always unhurried.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const Treatments = () => (
  <section className="treatments" id="treatments">
    <div className="treatments-head">
      <Reveal>
        <Eyebrow>II — The Repertoire</Eyebrow>
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
      {TREATMENT_LIST.map((t, i) => (
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
                  <Mono>{t.count}</Mono>
                  <span className="treatment-link">Read more <span>→</span></span>
                </div>
              </div>
            </article>
          </a>
        </Reveal>
      ))}
    </div>
  </section>
);

const Surgeons = () => {
  const lead = SURGEON_LIST[0];
  return (
    <section className="surgeons" id="surgeons">
      <Reveal>
        <Eyebrow>III — The Practitioners</Eyebrow>
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
          <p className="surgeon-body">{lead.bio}</p>
          <div className="surgeon-stats">
            <div><Mono>Trained</Mono><span>{lead.train}</span></div>
            <div><Mono>Specialty</Mono><span>{lead.spec_areas[0]}</span></div>
            <div><Mono>Distinction</Mono><span>{lead.proc}</span></div>
          </div>
          <Btn kind="ghost" as="a" href={`surgeon-${lead.slug}.html`}>Read the full profile</Btn>
        </Reveal>
      </div>
      <div className="surgeons-grid">
        {SURGEON_LIST.slice(1, 7).map((s, i) => (
          <Reveal key={s.slug} delay={i * 60} y={20}>
            <a href={`surgeon-${s.slug}.html`} style={{ color: "inherit" }}>
              <div className="surgeon-card" data-surgeon={s.slug}>
                <div className="surgeon-card-img"><Img src={s.img} fallbackLabel={`DR. ${s.common.toUpperCase()}`} fallbackHue={s.hue} alt="" /></div>
                <div className="surgeon-card-meta">
                  <h4>{s.title} {s.name}</h4>
                  <Mono>{s.spec}</Mono>
                  <span className="surgeon-train">Trained · {s.train.split(" · ")[0]}</span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Gallery = () => (
  <section className="gallery" id="gallery">
    <div className="gallery-head">
      <Reveal>
        <Eyebrow>IV — Selected Results</Eyebrow>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="section-title"><span className="italic">Quietly</span> transformative.</h2>
      </Reveal>
      <Reveal delay={220}>
        <p className="section-lede">A small selection from over two hundred consenting patients. Full galleries available on private request.</p>
      </Reveal>
    </div>
    <div className="gallery-grid">
      {[window.BA_PAIRS[1], window.BA_PAIRS[13], window.BA_PAIRS[24]].map((c, i) => (
        <Reveal key={i} delay={i * 100} y={28}>
          <figure className="ba-card">
            <div className="ba-single">
              <Img src={c.image} fallbackLabel={`${c.label.toUpperCase()} · ${c.num}`} fallbackHue={i * 2} alt={`${c.label} — before and after`} />
              <span className="ba-tag"><Mono>Before</Mono></span>
              <span className="ba-tag accent" style={{ left: "auto", right: 14 }}><Mono>After</Mono></span>
            </div>
            <figcaption>
              <div>
                <Mono>{c.num}</Mono>
                <h4>{c.label}</h4>
              </div>
              <span className="ba-time">{c.time}</span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
    <Reveal>
      <div className="gallery-foot">
        <Btn kind="ghost" as="a" href="gallery.html">View the full gallery</Btn>
      </div>
    </Reveal>
  </section>
);

const Journey = () => (
  <section className="journey" id="journey">
    <div className="journey-head">
      <Reveal><Eyebrow>V — Your Journey</Eyebrow></Reveal>
      <Reveal delay={120}>
        <h2 className="section-title"><span>From enquiry to</span> <span className="italic">homecoming.</span></h2>
      </Reveal>
    </div>
    <div className="journey-steps">
      {[
        ["01", "Consult", "A private video call with a surgeon, anywhere in the world."],
        ["02", "Plan", "A treatment plan, a recovery plan, and a stay — all in one envelope."],
        ["03", "Arrive", "Met at Ngurah Rai. Driven, by us, to the clinic or to your villa."],
        ["04", "Procedure", "Performed in our ACHSI-accredited theatres at BIMC Nusa Dua."],
        ["05", "Recover", "Daily nursing visits in a private villa, then twelve months of follow-up."],
      ].map(([n, t, d], i, arr) => (
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
      ))}
    </div>
    <Reveal>
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <Btn kind="ghost" as="a" href="journey.html">Read the full journey</Btn>
      </div>
    </Reveal>
  </section>
);

const Stories = () => (
  <section className="stories" id="stories">
    <Reveal><Eyebrow>VI — In Their Words</Eyebrow></Reveal>
    <Reveal delay={120}>
      <h2 className="section-title section-title-center"><span className="italic">Stories,</span> not slogans.</h2>
    </Reveal>
    <div className="stories-grid">
      {[
        { q: "I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself.", n: "Sarah K.", c: "Sydney, Australia", p: "Rhinoplasty · 2025", hue: 1, idx: 0 },
        { q: "Dr. Suka talked me out of two of the three things I'd asked for. The result is the most natural I've ever looked. I'm grateful.", n: "Margaux D.", c: "Paris, France", p: "Mid-face · 2024", hue: 3, idx: 1 },
        { q: "The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family.", n: "James W.", c: "Melbourne, Australia", p: "Hair restoration · 2025", hue: 5, idx: 2 },
      ].map((s, i) => (
        <Reveal key={i} delay={i * 100} y={32}>
          <figure className="story-card">
            <blockquote>
              <span className="quote-mark">“</span>
              {s.q}
            </blockquote>
            <figcaption>
              <Img src={window.STORY_PORTRAITS[s.idx]} fallbackLabel={s.n.toUpperCase()} fallbackHue={s.hue} alt="" />
              <div>
                <span className="story-name">{s.n}</span>
                <span className="story-city">{s.c}</span>
                <Mono style={{ marginTop: 4 }}>{s.p}</Mono>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
    <Reveal>
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <Btn kind="ghost" as="a" href="stories.html">Read more stories</Btn>
      </div>
    </Reveal>
  </section>
);

const Place = () => (
  <section className="place">
    <div className="place-grid">
      <Reveal>
        <div className="place-image">
          <Img src={IMG.bali} fallbackLabel="BALI · NUSA DUA" fallbackHue={4} alt="" />
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="place-body">
          <Eyebrow>VII — A Sense of Place</Eyebrow>
          <h2 className="section-title">
            <span>Recover</span><br/>
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
              ["D.", "A short walk to the BIMC hospital"],
            ].map(([k, t], i) => (
              <div key={i} className="place-row">
                <Mono>{k}</Mono>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <Btn kind="ghost" as="a" href="recovery-stays.html">View recovery stays</Btn>
        </div>
      </Reveal>
    </div>
  </section>
);

const CTABand = () => (
  <section className="cta-band" id="contact">
    <div className="cta-grid">
      <Reveal>
        <div>
          <Mono style={{ color: "rgba(255,255,255,0.6)" }}>VIII · Begin</Mono>
          <h2 className="cta-title">
            <span>The next page</span><br />
            <span className="italic">is yours to write.</span>
          </h2>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="cta-side">
          <p>
            A private consultation, treatment plan, and stay — coordinated as one. A concierge will reply within twenty-four hours, in English or Bahasa Indonesia.
          </p>
          <div className="cta-buttons">
            <Btn kind="accent" full as="a" href="contact.html">Plan Your Treatment</Btn>
            <Btn kind="ghost-light" full as="a" href="contact.html">Speak with a Concierge</Btn>
          </div>
          <div className="cta-fine">
            <Mono>+62 361 3000 911</Mono>
            <Mono>concierge@bimccosmedic.com</Mono>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const App = () => (
  <>
    <Header activePage="home" />
    <main>
      <Hero />
      <Marquee />
      <Intro />
      <Treatments />
      <Surgeons />
      <Gallery />
      <Journey />
      <Stories />
      <Place />
      <CTABand />
    </main>
    <Footer />
    <FloatingChrome />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
