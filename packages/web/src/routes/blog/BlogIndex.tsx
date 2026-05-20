import React, { useState } from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { IMG } from '@/content/seed'
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogPostMeta } from '@/content/blog-data'

const PostCard: React.FC<{ p: BlogPostMeta; i: number }> = ({ p, i }) => (
  <Reveal delay={i * 60}>
    <a href={`/blog-${p.slug}`} className="blog-card">
      <div className="blog-card-img">
        <Img src={p.img} fallbackLabel={p.category.toUpperCase()} fallbackHue={p.hue} alt="" />
      </div>
      <div className="blog-card-meta">
        <div className="blog-card-mono">
          <Mono>{p.category}</Mono>
          <span className="blog-card-dot">·</span>
          <Mono>{p.date}</Mono>
        </div>
        <h3 className="blog-card-title">{p.title}</h3>
        <p className="blog-card-dek">{p.dek}</p>
        <div className="blog-card-author">
          <span className="blog-card-author-name">{p.author}</span>
          <span className="blog-card-author-role">{p.role}</span>
        </div>
      </div>
    </a>
  </Reveal>
)

export const BlogIndex: React.FC = () => {
  const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0]
  const rest = BLOG_POSTS.filter((p) => p.slug !== featured.slug)
  const [filter, setFilter] = useState<string>('All')
  const shown = filter === 'All' ? rest : rest.filter((p) => p.category === filter)

  return (
    <PageShell activePage="blog">
      <ChapterOpener
        chapter="Chapter X — Journal"
        title={['Notes from', 'the practice.']}
        lede="Quarterly dispatches from our surgeons, aestheticians, and concierge — on technique, recovery, restraint, and the small decisions that add up to a good result."
        image={IMG.texture}
        imageHue={2}
        imageLabel="JOURNAL"
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Journal' }]}
      />

      <section className="page-section">
        <Reveal>
          <Eyebrow>This issue</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <a href={`/blog-${featured.slug}`} className="blog-feature">
            <div className="blog-feature-img">
              <Img
                src={featured.img}
                fallbackLabel={featured.category.toUpperCase()}
                fallbackHue={featured.hue}
                alt=""
              />
            </div>
            <div className="blog-feature-body">
              <div className="blog-card-mono">
                <Mono>{featured.category}</Mono>
                <span className="blog-card-dot">·</span>
                <Mono>{featured.date}</Mono>
                <span className="blog-card-dot">·</span>
                <Mono>{featured.read}</Mono>
              </div>
              <h2 className="blog-feature-title">
                <span className="italic">
                  {featured.title.split(' ').slice(0, 2).join(' ')}
                </span>{' '}
                {featured.title.split(' ').slice(2).join(' ')}
              </h2>
              <p className="blog-feature-dek">{featured.dek}</p>
              <div className="blog-feature-author">
                <span className="blog-feature-author-name">{featured.author}</span>
                <span className="blog-feature-author-role">{featured.role}</span>
              </div>
              <span className="blog-feature-read">Read the essay →</span>
            </div>
          </a>
        </Reveal>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <div className="section-head">
            <Eyebrow>The archive</Eyebrow>
            <div>
              <h2 className="section-title">
                Recent <span className="italic">writing.</span>
              </h2>
              <p className="section-lede">
                Filter by discipline, or read down. New essays go out with the quarterly journal —
                subscribe at the foot of any page.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="blog-filters">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`blog-filter ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="blog-grid">
          {shown.map((p, i) => (
            <PostCard key={p.slug} p={p} i={i} />
          ))}
        </div>

        {shown.length === 0 && (
          <Reveal>
            <p
              style={{
                textAlign: 'center',
                padding: '60px 0',
                color: 'var(--ink-60)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
              }}
            >
              No posts in this category yet.
            </p>
          </Reveal>
        )}
      </section>
    </PageShell>
  )
}
