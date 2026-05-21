import React, { useState } from 'react'
import { placeholder } from '@/lib/placeholder'
import { type CmsMedia, mediaSrcSet, mediaUrl, mediaAlt } from '@/lib/cms'

type CommonProps = {
  fallbackLabel?: string
  fallbackHue?: number
  alt?: string
  /**
   * The `sizes` HTML attribute — required for responsive srcset to work.
   * Defaults to a sane "100% on mobile, 50% on tablet, 33% on desktop"
   * fallback. Pass an explicit value when the slot is fixed-width.
   */
  sizes?: string
}

type LegacyProps = CommonProps &
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
    src: string
    media?: never
  }

type CmsProps = CommonProps &
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
    media: number | CmsMedia | undefined | null
    src?: string
  }

type ImgProps = LegacyProps | CmsProps

const DEFAULT_SIZES = '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw'

/**
 * Image primitive.
 *
 * Two modes:
 *
 *  Legacy: <Img src="..." /> — single <img>, painted-SVG fallback on error.
 *
 *  Responsive: <Img media={cmsMedia} src={fallbackUrl} /> — emits a
 *    <picture> with a <source srcset> built from Payload imageSizes
 *    (WebP variants at sm/md/lg/xl/xxl widths) and an <img> fallback
 *    to the original. The legacy SVG-on-error fallback is preserved.
 */
export const Img: React.FC<ImgProps> = (props) => {
  const {
    media,
    src: srcProp,
    fallbackLabel = 'BIMC',
    fallbackHue = 0,
    alt: altProp = '',
    sizes = DEFAULT_SIZES,
    ...rest
  } = props as CmsProps

  const srcset = media ? mediaSrcSet(media) : undefined
  const cmsSrc = media ? mediaUrl(media) : undefined
  const cmsAlt = media ? mediaAlt(media) : undefined

  const resolvedSrc = cmsSrc || srcProp || ''
  const resolvedAlt = altProp || cmsAlt || ''

  const [current, setCurrent] = useState(resolvedSrc)
  const [errored, setErrored] = useState(false)

  const onError = (): void => {
    setCurrent(placeholder(fallbackLabel, fallbackHue, 1200, 1500))
    setErrored(true)
  }

  if (srcset && !errored) {
    return (
      <picture>
        <source type="image/webp" srcSet={srcset} sizes={sizes} />
        <img
          src={current}
          alt={resolvedAlt}
          loading="lazy"
          decoding="async"
          onError={onError}
          {...rest}
        />
      </picture>
    )
  }

  return (
    <img
      src={current}
      alt={resolvedAlt}
      loading="lazy"
      decoding="async"
      onError={onError}
      {...rest}
    />
  )
}
