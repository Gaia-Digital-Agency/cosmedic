import React, { useEffect, useRef, useState } from 'react'
import type { JSX } from 'react'

export function useReveal<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T | null>,
  boolean,
] {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, shown]
}

type RevealProps = {
  children: React.ReactNode
  delay?: number
  y?: number
  as?: keyof JSX.IntrinsicElements
  style?: React.CSSProperties
} & Omit<React.HTMLAttributes<HTMLElement>, 'style'>

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 24,
  as = 'div',
  style = {},
  ...rest
}) => {
  const [ref, shown] = useReveal<HTMLElement>()
  const Tag = as as keyof JSX.IntrinsicElements
  return React.createElement(
    Tag,
    {
      ref,
      style: {
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 1.1s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 1.1s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      },
      ...rest,
    },
    children,
  )
}
