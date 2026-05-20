import React from 'react'

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export const Mono: React.FC<Props> = ({ children, style, className }) => (
  <span className={['mono', className].filter(Boolean).join(' ')} style={style}>
    {children}
  </span>
)

export const Eyebrow: React.FC<Props> = ({ children, style, className }) => (
  <span className={['eyebrow', className].filter(Boolean).join(' ')} style={style}>
    <span className="eyebrow-rule" />
    <span>{children}</span>
  </span>
)
