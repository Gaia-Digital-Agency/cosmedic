/* global React */
const { useState } = React;
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG, placeholder, BA_PAIRS } = window;

const FILTERS = [
  { id: "all",          label: "All cases" },
  { id: "surgical",     label: "Surgical" },
  { id: "non-surgical", label: "Non-surgical" },
  { id: "hair",         label: "Hair" },
  { id: "dental",       label: "Dental" },
];

const Page = () => {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? BA_PAIRS : BA_PAIRS.filter(c => c.cat === filter);

  return (
    <PageShell activePage="gallery">
      <ChapterOpener
        chapter="Chapter IV — Selected Results"
        title={["Quietly", "transformative."]}
        lede="A small selection from over two hundred consenting patients, presented with their permission. Full galleries available on private request following consultation."
        image={IMG.texture}
        imageHue={1}
        imageLabel="GALLERY"
        breadcrumbs={[{ label: "BIMC CosMedic", href: "index.html" }, { label: "Gallery" }]}
      />

      <section className="page-section">
        <div className="filter-bar">
          <Mono>Filter by</Mono>
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`chip ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
          <span style={{ marginLeft: "auto" }} className="mono">{visible.length} cases</span>
        </div>

        <div className="gallery-grid-4">
          {visible.map((c, i) => (
            <Reveal key={c.num} delay={i * 40} y={20}>
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
          <div style={{ marginTop: 80, padding: "60px 40px", textAlign: "center", background: "var(--paper-warm)", border: "1px solid var(--ink-20)" }}>
            <Mono>Private gallery</Mono>
            <h2 className="section-title" style={{ margin: "16px 0 16px" }}>Want to see <span className="italic">more?</span></h2>
            <p style={{ margin: "0 auto 24px", maxWidth: 540, color: "var(--ink-80)", fontSize: 17 }}>
              Our complete library — over two hundred consented cases — is shared during private consultation. We will match the cases we show you to the work you are considering.
            </p>
            <Btn kind="primary" as="a" href="contact.html">Request the full library</Btn>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
