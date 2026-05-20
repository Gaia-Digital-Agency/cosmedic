import type { Access } from 'payload'

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)
export const publishedOrAuthed: Access = ({ req }) => {
  if (req.user) return true
  return { publishStatus: { equals: 'published' } }
}
export const readPublic: Access = () => true
