/* global React */
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG, TREATMENT_LIST } = window;

const Page = () => (
  <PageShell activePage="contact" hideCTA>
    <ChapterOpener
      chapter="Chapter VIII — Plan Your Journey"
      title={["Begin, when", "you are ready."]}
      lede="Write to us in your own time, in your own words. A concierge will reply within twenty-four hours, in English or Bahasa Indonesia. There is no obligation — and no pressure — to proceed."
      image={IMG.reception}
      imageHue={3}
      imageLabel="PLAN YOUR JOURNEY"
      breadcrumbs={[{ label: "BIMC CosMedic", href: "index.html" }, { label: "Plan Your Journey" }]}
    />

    {/* Form */}
    <section className="page-section">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start", maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div>
            <Eyebrow>The Enquiry</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16 }}>Tell us a little <span className="italic">about you.</span></h2>
            <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.6, color: "var(--ink-80)", maxWidth: 320 }}>
              Every field is optional. Tell us only what you are comfortable telling us today — we will follow up with the rest.
            </p>
            <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--ink-20)" }}>
              <Mono>Direct lines</Mono>
              <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
                <li>
                  <Mono>Concierge</Mono>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, marginTop: 4 }}>+62 361 3000 911</div>
                </li>
                <li>
                  <Mono>WhatsApp</Mono>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, marginTop: 4 }}>+62 811 3888 911</div>
                </li>
                <li>
                  <Mono>Email</Mono>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, marginTop: 4 }}>concierge@bimccosmedic.com</div>
                </li>
                <li>
                  <Mono>Press</Mono>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, marginTop: 4 }}>press@bimccosmedic.com</div>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form className="contact-form-grid" onSubmit={e => e.preventDefault()}>
            <label className="field">
              <span className="field-label">First name</span>
              <input type="text" placeholder="Your first name" />
            </label>
            <label className="field">
              <span className="field-label">Family name</span>
              <input type="text" placeholder="Your family name" />
            </label>
            <label className="field field-full">
              <span className="field-label">Email</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <label className="field">
              <span className="field-label">Country & city</span>
              <input type="text" placeholder="Sydney, Australia" />
            </label>
            <label className="field">
              <span className="field-label">Preferred language</span>
              <input type="text" placeholder="English" />
            </label>
            <label className="field field-full">
              <span className="field-label">Area of interest</span>
              <div className="select-row">
                <span>Select treatments…</span>
                <span className="chev">▾</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                {TREATMENT_LIST.map(t => (
                  <button key={t.slug} type="button" className="chip">{t.t}</button>
                ))}
              </div>
            </label>
            <label className="field">
              <span className="field-label">Approximate dates</span>
              <input type="text" placeholder="Month / year" />
            </label>
            <label className="field">
              <span className="field-label">Travelling with</span>
              <input type="text" placeholder="Solo, partner, family…" />
            </label>
            <label className="field field-full">
              <span className="field-label">Tell us a little</span>
              <textarea placeholder="What you'd like to discuss, in your own words. Or simply say hello." />
            </label>
            <div className="field-full" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, paddingTop: 24, borderTop: "1px solid var(--ink-20)" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-60)", maxWidth: 380 }}>
                Your details are held in confidence. We do not market, share, or use your enquiry for anything other than the conversation you've started.
              </p>
              <Btn kind="accent">Send enquiry</Btn>
            </div>
          </form>
        </Reveal>
      </div>
    </section>

    {/* Visit */}
    <section className="page-section tinted">
      <div className="two-col">
        <Reveal>
          <div>
            <Eyebrow>Visit</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>Find us in <span className="italic">Nusa Dua.</span></h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-80)", margin: "0 0 24px", maxWidth: 480 }}>
              Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve minutes from Ngurah Rai International Airport.
            </p>
            <div style={{ borderTop: "1px solid var(--ink-20)", paddingTop: 20 }}>
              <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.55 }}>
                BIMC Hospital Nusa Dua<br />
                Kawasan ITDC Blok D<br />
                Nusa Dua 80363<br />
                Bali, Indonesia
              </p>
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <Btn kind="ghost">Open in Maps</Btn>
              <Btn kind="ghost">Get directions</Btn>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: "var(--cream)" }}>
              <Img src={IMG.bali} fallbackLabel="NUSA DUA · BALI" fallbackHue={4} alt="" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginTop: 24 }}>
              <div>
                <Mono>Hours · Clinic</Mono>
                <p style={{ margin: "10px 0 0", fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.55 }}>
                  Mon – Sat · 09:00 – 19:00<br />
                  Sun · By appointment
                </p>
              </div>
              <div>
                <Mono>Hours · Concierge</Mono>
                <p style={{ margin: "10px 0 0", fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.55 }}>
                  Twenty-four hours<br />
                  Replies within ten minutes
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </PageShell>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
