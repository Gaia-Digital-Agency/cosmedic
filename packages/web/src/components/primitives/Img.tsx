import React, { useState } from 'react'
import { placeholder } from '@/lib/placeholder'

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  fallbackLabel?: string
  fallbackHue?: number
  alt?: string
}

export const Img: React.FC<ImgProps> = ({
  src,
  fallbackLabel = 'BIMC',
  fallbackHue = 0,
  alt = '',
  ...rest
}) => {
  const [current, setCurrent] = useState(src)
  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      onError={() => setCurrent(placeholder(fallbackLabel, fallbackHue, 1200, 1500))}
      {...rest}
    />
  )
}
