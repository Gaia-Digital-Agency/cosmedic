import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import { resolveRoute } from './router'

export function render(url: string): { html: string; status: number } {
  const route = resolveRoute(url)
  const html = renderToString(<App route={route} />)
  return { html, status: route.kind === 'notfound' ? 404 : 200 }
}
