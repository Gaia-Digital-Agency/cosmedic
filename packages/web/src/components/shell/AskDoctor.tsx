import React, { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'ai'; text: string }

export const AskDoctor: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: data.answer || data.error || 'No response.' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* FAB button — bottom: 94 sits between WhatsApp (28) and BackToTop (160) */}
      <button
        type="button"
        aria-label="Ask the Doctor"
        onClick={() => setOpen((v) => !v)}
        className="ask-doctor-fab"
        style={{
          position: 'fixed',
          right: 28,
          bottom: 94,
          width: 54,
          height: 54,
          borderRadius: '50%',
          border: '1px solid var(--accent)',
          background: open ? 'var(--accent-deep)' : 'var(--paper)',
          color: open ? 'var(--paper)' : 'var(--accent-deep)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 28px rgba(31,27,22,0.18)',
          transition: 'background 200ms ease, color 200ms ease, transform 200ms ease',
          zIndex: 60,
        }}
      >
        {/* Chat / AI icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="10" x2="9" y2="10" strokeWidth="2.5" />
          <line x1="12" y1="10" x2="12" y2="10" strokeWidth="2.5" />
          <line x1="15" y1="10" x2="15" y2="10" strokeWidth="2.5" />
        </svg>
      </button>

      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="Ask The Doctor"
        aria-modal="true"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 'min(380px, calc(100vw - 32px))',
          maxHeight: 'calc(100vh - 200px)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--paper)',
          border: '1px solid var(--ink-20)',
          borderRadius: 12,
          boxShadow: '0 16px 48px rgba(31,27,22,0.18)',
          zIndex: 59,
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 200ms ease, transform 200ms ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--ink-20)',
            background: 'var(--accent-deep)',
            color: 'var(--bg-cream, #F4EFE6)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <line x1="9" y1="10" x2="9" y2="10" strokeWidth="2.5" />
              <line x1="12" y1="10" x2="12" y2="10" strokeWidth="2.5" />
              <line x1="15" y1="10" x2="15" y2="10" strokeWidth="2.5" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 17,
                letterSpacing: '-0.01em',
              }}
            >
              Ask The Doctor
            </span>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: 4,
              lineHeight: 1,
              opacity: 0.75,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 16px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {messages.length === 0 && !loading && (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 14,
                color: 'var(--ink-60)',
                margin: 0,
                textAlign: 'center',
                paddingTop: 24,
              }}
            >
              Ask about treatments, pricing, or our doctors — I'm here to help.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? 'var(--accent-deep)' : 'var(--ink-05, #F2EDE6)',
                  color: m.role === 'user' ? 'var(--bg-cream, #F4EFE6)' : 'var(--ink-100)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 15,
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '10px 18px',
                  borderRadius: '14px 14px 14px 4px',
                  background: 'var(--ink-05, #F2EDE6)',
                  display: 'flex',
                  gap: 5,
                  alignItems: 'center',
                }}
              >
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'inline-block',
                      animation: `askDotBounce 1s ease-in-out ${n * 0.18}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '12px 14px',
            borderTop: '1px solid var(--ink-20)',
            flexShrink: 0,
            alignItems: 'flex-end',
          }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="What's the price for a ... procedure."
            disabled={loading}
            style={{
              flex: 1,
              resize: 'none',
              border: '1px solid var(--ink-20)',
              borderRadius: 8,
              padding: '9px 12px',
              fontFamily: 'var(--font-serif)',
              fontSize: 14,
              lineHeight: 1.5,
              color: 'var(--ink-100)',
              background: 'var(--paper)',
              outline: 'none',
              maxHeight: 100,
              overflowY: 'auto',
            }}
          />
          <button
            type="button"
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: 'none',
              background: 'var(--accent-deep)',
              color: 'var(--bg-cream, #F4EFE6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: loading || !input.trim() ? 'default' : 'pointer',
              opacity: loading || !input.trim() ? 0.45 : 1,
              flexShrink: 0,
              transition: 'opacity 160ms ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Keyframe for loading dots + hover state for FAB */}
      <style>{`
        @keyframes askDotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        .ask-doctor-fab:hover {
          background: var(--cream, #E6DCC8) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}
