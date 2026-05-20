import React, { useState } from 'react'

type Props = { q: string; a: string }

export const FAQItem: React.FC<Props> = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen((o) => !o)}>
        <span>{q}</span>
        <span className="plus">+</span>
      </button>
      <div className="faq-a">
        <div className="faq-a-inner">{a}</div>
      </div>
    </div>
  )
}
