import React from 'react'
import { Img } from './Img'

type Breadcrumb = { label: string; href?: string }

type Props = {
  chapter?: string
  title: string | string[]
  lede?: string
  image: string
  breadcrumbs?: Breadcrumb[]
  imageHue?: number
  imageLabel?: string
}

export const ChapterOpener: React.FC<Props> = ({
  title,
  lede,
  image,
  breadcrumbs = [],
  imageHue = 0,
  imageLabel = 'BIMC',
}) => {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <>
      <section className="chapter-opener">
        <div className="chapter-bg">
          {/* Hero is always above-the-fold — load eagerly, never lazy */}
          <Img src={image} fallbackLabel={imageLabel} fallbackHue={imageHue} alt="" loading="eager" />
        </div>
        <div className="chapter-content">
          <div className="chapter-meta">
            <h1 className="chapter-title">
              {lines.map((line, i) => (
                <span key={i} className={`line ${i % 2 === 1 ? 'italic' : ''}`}>
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div className="chapter-side">{lede && <p>{lede}</p>}</div>
        </div>
      </section>
      {breadcrumbs.length > 0 && (
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">/</span>}
              {b.href ? <a href={b.href}>{b.label}</a> : <span>{b.label}</span>}
            </React.Fragment>
          ))}
        </nav>
      )}
    </>
  )
}
