import React from 'react'

type BtnKind = 'primary' | 'accent' | 'ghost' | 'ghost-light'

type CommonProps = {
  children: React.ReactNode
  kind?: BtnKind
  full?: boolean
  style?: React.CSSProperties
}

type AsAnchorProps = CommonProps & {
  as?: 'a'
  href: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'>

type AsButtonProps = CommonProps & {
  as?: 'button'
  href?: undefined
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>

export type BtnProps = AsAnchorProps | AsButtonProps

export const Btn: React.FC<BtnProps> = (props) => {
  const { children, kind = 'primary', full = false, style, ...rest } = props
  const cls = `btn btn-${kind}${full ? ' btn-full' : ''}`
  if (props.as === 'a' || props.href) {
    const { href, ...anchorRest } = rest as AsAnchorProps
    return (
      <a href={href} className={cls} style={style} {...anchorRest}>
        <span>{children}</span>
        <span className="btn-arrow">→</span>
      </a>
    )
  }
  const buttonRest = rest as AsButtonProps
  return (
    <button className={cls} style={style} {...buttonRest}>
      <span>{children}</span>
      <span className="btn-arrow">→</span>
    </button>
  )
}
