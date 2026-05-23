import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  admin: {
    group: 'Journey',
    description: 'Editorial content for /blog (post index): hero + body. Posts and tags are managed via the BlogPosts / BlogTags collections.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: pageFields(),
}
