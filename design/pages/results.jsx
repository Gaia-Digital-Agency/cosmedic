/* global React */
/* global React */
const { useState, useEffect, useRef } = React;
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG, placeholder, BA_PAIRS } = window;

// =====================================================
// STORIES DATA
// =====================================================
const STORIES = [
  { q: "I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself. The villa, the daily nursing, the slow afternoons — all of it felt like the opposite of medical tourism. It felt like being looked after.",
    n: "Sarah K.", c: "Sydney, Australia", p: "Rhinoplasty · 2025", hue: 1 },
  { q: "dr. Suka talked me out of two of the three things I'd asked for. The result is the most natural I've ever looked. I'm grateful — and a little stunned that anyone would turn down work in a market like this. They are different here.",
    n: "Margaux D.", c: "Paris, France", p: "Mid-face · 2024", hue: 3 },
  { q: "The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family. My concierge still texts me on the anniversary of my surgery. That's the part you don't see in the brochure.",
    n: "James W.", c: "Melbourne, Australia", p: "Hair restoration · 2025", hue: 5 },
  { q: "I had a complication on day three. The nurse was at my villa within twenty minutes; my surgeon was there within the hour. Nothing was hidden, nothing was rushed. They handled it with the kind of calm I associate with the very best hospitals at home.",
    n: "Rachel T.", c: "Auckland, New Zealand", p: "Abdominoplasty · 2024", hue: 2 },
  { q: "I am a slow decision-maker. My initial consultation was in March; my procedure was in November. They never rushed me, never tried to upsell, never made me feel anything other than welcome. By the time I arrived, I had no anxiety left at all.",
    n: "Chen Y.", c: "Singapore", p: "Eyelid surgery · 2024", hue: 0 },
  { q: "The Bali part of it was almost incidental in the end — I came for the surgeon, not the location. But by week two of recovery, watching the ocean from the villa, I understood why everyone insists on saying it. Recovery here is not the same as recovery at home.",
    n: "Daniel R.", c: "Los Angeles, USA", p: "Facelift · 2025", hue: 4 },
  { q: "My partner was nervous about flying somewhere for surgery. The concierge spoke to him directly, sent him photos of the villa, walked him through the safety record of the hospital. By the time we landed, he was the calm one. They thought of everything.",
    n: "Aisha M.", c: "London, UK", p: "Liposculpture · 2025", hue: 1 },
  { q: "I had veneers fitted in three visits over fourteen days. The on-site ceramicist refined the shade twice — once between try-in and final placement, once after I'd lived with the smile for a day. It is the most considered piece of dental work I've ever had.",
    n: "Hiroko S.", c: "Tokyo, Japan", p: "Smile design · 2024", hue: 3 },
];

// =====================================================
// PAGE
// =====================================================
const Page = () => (
  <PageShell activePage="results">
    <ChapterOpener
      chapter="Chapter IV — Results & Stories"
      title={["Quietly", "transformative."]}
      lede="A small selection of consented results paired with the stories behind them. Our complete library — over two hundred cases — is shared during private consultation."
      image={IMG.texture}
      imageHue={1}
      imageLabel="RESULTS & STORIES"
      breadcrumbs={[{ label: "BIMC CosMedic", href: "index.html" }, { label: "Results & Stories" }]}
    />

    {/* ---------- RESULTS ---------- */}
    <section className="page-section" id="results">
      <div className="section-anchor-head">
        <h2 className="section-title" style={{ marginTop: 0 }}>
          <span>Four signature cases,</span><br />
          <span className="italic">shared with permission.</span>
        </h2>
        <p className="section-lede" style={{ maxWidth: 640 }}>
          Each case represents a typical outcome, photographed at consistent angles and lighting, three to six months post-procedure.
        </p>
      </div>

      <div className="filter-bar" style={{ maxWidth: 1280, margin: "0 auto 40px" }}>
        <Mono>Featured cases</Mono>
        <span style={{ marginLeft: "auto" }} className="mono">{BA_PAIRS.length} cases · facial</span>
      </div>

      <div className="gallery-grid">
        {BA_PAIRS.map((c, i) => (
          <Reveal key={c.num} delay={i * 80} y={24}>
            <figure className="ba-card">
              <div className="ba-single">
                <Img src={c.image} fallbackLabel={`${c.label.toUpperCase()} · ${c.num}`} fallbackHue={i % 6} alt={`${c.label} — before and after`} />
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
        <div style={{ marginTop: 60, padding: "44px 40px", textAlign: "center", background: "var(--paper-warm)", border: "1px solid var(--ink-20)", maxWidth: 1280, marginInline: "auto" }}>
          <Mono>Private gallery</Mono>
          <h3 className="section-title" style={{ margin: "14px 0 14px", fontSize: "clamp(32px, 4vw, 48px)" }}>Want to see <span className="italic">more?</span></h3>
          <p style={{ margin: "0 auto 22px", maxWidth: 560, color: "var(--ink-80)", fontSize: 16.5, lineHeight: 1.65 }}>
            Our complete library — over two hundred consented cases across every discipline — is shared during private consultation. We will match what we show you to the work you are considering.
          </p>
          <Btn kind="primary" as="a" href="contact.html">Request the full library</Btn>
        </div>
      </Reveal>
    </section>

    {/* ---------- DIVIDER ---------- */}
    <div className="results-stories-divider" aria-hidden="true">
      <span className="rule" />
      <span className="mark">§</span>
      <span className="rule" />
    </div>

    {/* ---------- STORIES ---------- */}
    <section className="page-section tinted" id="stories">
      <div className="section-anchor-head">
        <h2 className="section-title" style={{ marginTop: 0 }}>
          <span>Stories,</span> <span className="italic">not slogans.</span>
        </h2>
        <p className="section-lede" style={{ maxWidth: 640 }}>
          Eight stories from the last two years of patients, shared with their permission. Editorial restraint over marketing copy — these are the patients we're proudest to have served.
        </p>
      </div>

      <div className="stories-index" style={{ maxWidth: 1280, margin: "0 auto" }}>
        {STORIES.map((s, i) => (
          <Reveal key={i} delay={0} y={24}>
            <article className="story-row">
              <div className="story-row-img">
                <Img src={window.STORY_PORTRAITS[i % window.STORY_PORTRAITS.length]} fallbackLabel={s.n.toUpperCase()} fallbackHue={s.hue} alt="" />
              </div>
              <blockquote>"{s.q}"</blockquote>
              <div className="story-row-meta">
                <Mono>0{i + 1} of 0{STORIES.length}</Mono>
                <span className="name">{s.n}</span>
                <span className="city">{s.c}</span>
                <Mono style={{ marginTop: 8 }}>{s.p}</Mono>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "80px auto 0" }}>
          <Mono>Sharing your story</Mono>
          <h3 className="section-title" style={{ margin: "14px 0", fontSize: "clamp(32px, 4vw, 48px)" }}>Have a <span className="italic">story</span> to share?</h3>
          <p style={{ margin: "0 auto 28px", color: "var(--ink-80)", fontSize: 17, lineHeight: 1.65 }}>
            We never solicit testimonials — every story we publish is shared at the patient's instigation, in their own words, with their consent. If you'd like to share, we would be honoured to read it.
          </p>
          <Btn kind="primary" as="a" href="contact.html">Write to us</Btn>
        </div>
      </Reveal>
    </section>
  </PageShell>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
