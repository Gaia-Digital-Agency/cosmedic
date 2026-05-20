/* global React */
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG, TREATMENT_LIST } = window;

const Page = () => (
  <PageShell activePage="treatments">
    <ChapterOpener
      chapter="Chapter II — The Repertoire"
      title={["Six disciplines,", "one sanctuary."]}
      lede="A complete repertoire of cosmetic medicine practiced under one roof — surgical, non-surgical, restorative, and the careful coordination that holds it all together."
      image={IMG.surgical}
      imageHue={1}
      imageLabel="THE REPERTOIRE"
      breadcrumbs={[{ label: "BIMC CosMedic", href: "index.html" }, { label: "Treatments" }]}
    />

    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <Eyebrow>An Index</Eyebrow>
          <div>
            <h2 className="section-title">Browse by discipline.</h2>
            <p className="section-lede">Each discipline is led by a specialist surgeon and supported by the full clinical, recovery, and concierge team. Treatments may be combined across disciplines on a single visit.</p>
          </div>
        </div>
      </Reveal>

      <div className="treatment-index">
        {TREATMENT_LIST.map((t, i) => (
          <Reveal key={t.slug} delay={i * 60} y={20}>
            <a href={`treatment-${t.slug}.html`} className="treatment-row" style={{ color: "inherit" }}>
              <div className="ti-image">
                <Img src={t.img} fallbackLabel={t.t.toUpperCase()} fallbackHue={t.hue} alt="" />
              </div>
              <div className="ti-body">
                <div>
                  <h3>{t.t}</h3>
                  <p className="ti-italic">{t.sub}</p>
                  <p>{t.body}</p>
                </div>
                <div className="ti-foot">
                  <span className="treatment-link">Read more <span>→</span></span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>

    <div className="stats-row">
      {[
        ["28", "Years in Bali"],
        ["2,400+", "Procedures yearly"],
        ["8", "Specialists on faculty"],
        ["96%", "Patient satisfaction"],
      ].map(([n, l], i) => (
        <Reveal key={i} delay={i * 80}>
          <div className="stat-block">
            <span className="stat-num">{n}</span>
            <span className="stat-label">{l}</span>
          </div>
        </Reveal>
      ))}
    </div>
  </PageShell>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
