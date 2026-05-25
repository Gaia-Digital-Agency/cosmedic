import React, { useState } from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { IMG } from '@/content/seed'
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogPostMeta } from '@/content/blog-data'
import { useCms } from '@/lib/cms-context'
import { findPageBySlug } from '@/lib/cms-adapters'
import { mediaUrl } from '@/lib/cms'

const PostCard: React.FC<{ p: BlogPostMeta; i: number }> = ({ p, i }) => {
  const cms = useCms()
  const cmsPost = cms?.blogPosts.find((bp) => bp.slug === p.slug)
  return (
  <Reveal delay={i * 60}>
    <a href={`/blog/${p.slug}`} className="blog-card">
      <div className="blog-card-img">
        <Img media={cmsPost?.heroImage} src={p.img} fallbackLabel={p.category.toUpperCase()} fallbackHue={p.hue} alt="" />
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
}

export const BlogIndex: React.FC = () => {
  const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0]
  const rest = BLOG_POSTS.filter((p) => p.slug !== featured.slug)
  const [filter, setFilter] = useState<string>('All')
  const shown = filter === 'All' ? rest : rest.filter((p) => p.category === filter)

  const cms = useCms()
  const cmsFeatured = cms?.blogPosts.find((bp) => bp.slug === featured.slug)
  const page = cms ? findPageBySlug(cms, 'blog') : undefined
  const chapter = page?.tagline || 'Chapter X — Journal'
  const titleA = page?.chapterTitle?.a || 'Notes from'
  const titleB = page?.chapterTitle?.b || 'the practice.'
  const lede =
    page?.lede ||
    "Quarterly dispatches from our surgeons, aestheticians, and concierge — on technique, recovery, restraint, and the small decisions that add up to a good result."
  const heroImage = mediaUrl(page?.heroImage, '') || IMG.texture

  // R8.C — archive section + featured-post chrome from blog-page global.
  const thisIssueEyebrow = page?.thisIssueEyebrow || 'This issue'
  const readTheEssayCta = page?.readTheEssayCtaLabel || 'Read the essay →'
  const archive = page?.archiveSection || {}
  const archiveEyebrow = archive.eyebrow || 'The archive'
  const archiveHeadingPre = archive.headingPre || 'Recent '
  const archiveHeadingItalic = archive.headingItalic || 'writing.'
  const archiveLede =
    archive.lede ||
    'Filter by discipline, or read down. New essays go out with the quarterly journal — subscribe at the foot of any page.'
  // Editor can rename the "All" filter button via CMS; the internal sentinel
  // stays as 'All' so the filter-state comparison keeps working.
  const filterAllLabel = archive.filterAllLabel || 'All'
  const emptyStateCopy = archive.emptyStateCopy || 'No posts in this category yet.'

  return (
    <PageShell activePage="blog">
      <ChapterOpener
        chapter={chapter}
        title={[titleA, titleB]}
        lede={lede}
        image={heroImage}
        imageHue={2}
        imageLabel="JOURNAL"
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Journal' }]}
      />

      <section className="page-section">
        <Reveal>
          <Eyebrow>{thisIssueEyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <a href={`/blog/${featured.slug}`} className="blog-feature">
            <div className="blog-feature-img">
              <Img
                media={cmsFeatured?.heroImage}
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
              <span className="blog-feature-read">{readTheEssayCta}</span>
            </div>
          </a>
        </Reveal>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <div className="section-head">
            <Eyebrow>{archiveEyebrow}</Eyebrow>
            <div>
              <h2 className="section-title">
                {archiveHeadingPre}
                <span className="italic">{archiveHeadingItalic}</span>
              </h2>
              <p className="section-lede">{archiveLede}</p>
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
                {c === 'All' ? filterAllLabel : c}
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
              {emptyStateCopy}
            </p>
          </Reveal>
        )}
      </section>

      <CmsExtraBlocks slug="blog" />
    </PageShell>
  )
}
