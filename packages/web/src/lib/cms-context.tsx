import React, { createContext, useContext } from 'react'
import type { CmsCache } from './cms'

const Ctx = createContext<CmsCache | null>(null)

export const CmsProvider: React.FC<{ value: CmsCache | undefined | null; children: React.ReactNode }> = ({ value, children }) => (
  <Ctx.Provider value={value ?? null}>{children}</Ctx.Provider>
)

export function useCms(): CmsCache | null {
  return useContext(Ctx)
}
