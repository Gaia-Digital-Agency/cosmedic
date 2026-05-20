import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { resolveRoute } from './router'

hydrateRoot(
  document.getElementById('root')!,
  <App route={resolveRoute(window.location.pathname)} />,
)
