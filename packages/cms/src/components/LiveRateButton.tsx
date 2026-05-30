'use client'
import React, { useState } from 'react'

type State = 'idle' | 'checking' | 'ready' | 'applying' | 'applied' | 'error'

const LiveRateButton: React.FC = () => {
  const [state, setState] = useState<State>('idle')
  const [liveRate, setLiveRate] = useState<number | null>(null)
  const [oldRate, setOldRate] = useState<number | null>(null)
  const [error, setError] = useState('')

  const check = async () => {
    setState('checking')
    setError('')
    try {
      const res = await fetch('/api/exchange-rate?mode=check', { method: 'POST' })
      if (!res.ok) throw new Error(`${res.status}`)
      const data = (await res.json()) as { liveRate: number; currentRate: number }
      setLiveRate(data.liveRate)
      setOldRate(data.currentRate)
      setState('ready')
    } catch (e: any) {
      setError(e.message || 'Fetch failed')
      setState('error')
    }
  }

  const apply = async () => {
    setState('applying')
    try {
      const res = await fetch('/api/exchange-rate?mode=apply', { method: 'POST' })
      if (!res.ok) throw new Error(`${res.status}`)
      setState('applied')
      setTimeout(() => window.location.reload(), 800)
    } catch (e: any) {
      setError(e.message || 'Apply failed')
      setState('error')
    }
  }

  const fmt = (n: number) => n.toLocaleString('en-AU')

  return (
    <div style={{ marginTop: 6, fontSize: 12, color: '#888', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {(state === 'idle' || state === 'error') && (
        <button
          type="button"
          onClick={check}
          style={{ fontSize: 12, padding: '3px 10px', cursor: 'pointer', borderRadius: 4, border: '1px solid #ccc', background: '#f5f5f5' }}
        >
          Fetch live rate
        </button>
      )}
      {state === 'checking' && <span>Fetching…</span>}
      {(state === 'ready' || state === 'applying' || state === 'applied') && liveRate !== null && (
        <>
          <span>
            Live: <strong style={{ color: '#333' }}>{fmt(liveRate)}</strong>
            {oldRate !== null && oldRate !== liveRate && (
              <span style={{ marginLeft: 6, color: '#999' }}>(stored: {fmt(oldRate)})</span>
            )}
            {oldRate !== null && oldRate === liveRate && (
              <span style={{ marginLeft: 6, color: '#aaa' }}> — matches stored rate</span>
            )}
          </span>
          {state === 'ready' && (
            <button
              type="button"
              onClick={apply}
              style={{ fontSize: 12, padding: '3px 10px', cursor: 'pointer', borderRadius: 4, border: '1px solid #999', background: '#fff' }}
            >
              Apply
            </button>
          )}
          {state === 'applying' && <span style={{ color: '#aaa' }}>Saving…</span>}
          {state === 'applied' && <span style={{ color: '#4caf50' }}>✓ Saved — reloading…</span>}
        </>
      )}
      {error && <span style={{ color: '#e53935' }}>{error}</span>}
      {state === 'error' && (
        <button
          type="button"
          onClick={() => { setState('idle'); setError('') }}
          style={{ fontSize: 11, cursor: 'pointer', color: '#888', background: 'none', border: 'none', padding: 0 }}
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default LiveRateButton
