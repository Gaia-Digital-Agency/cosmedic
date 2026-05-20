/**
 * CMS data loader (SSR-side).
 *
 * Fetches collections + globals from Payload at SSR boot, caches in-memory, and
 * exposes synchronous getters to React components. Components never await — by
 * the time render() is called, the cache is already populated.
 *
 * Why fetch eagerly at boot rather than per-request:
 *  - SSR render is synchronous (renderToString, not renderToPipeableStream)
 *  - Catalogue is small (~150 price-list items, 93 procedures, 17 sub-cats)
 *  - The full catalogue fits comfortably in memory
 *  - When Payload mutates, the Pages/etc afterChange hook can call
 *    POST /api/revalidate on the web (Phase 7+) to bust the cache
 *
 * Endpoint base: PAYLOAD_URL env var (defaults to http://127.0.0.1:4007).
 * Read access is public (collections all have `read: readPublic`).
 */

const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://127.0.0.1:4007'

export type LexicalNode = {
  type?: string
  text?: string
  tag?: string
  format?: number | string
  children?: LexicalNode[]
  [key: string]: unknown
}
export type Lexical = { root: { children: LexicalNode[] } } | undefined | null

export type PriceListItem = {
  id: number
  slug: string
  sheet: 'surgical' | 'non-surgical' | 'machine' | 'injection' | 'btl'
  category?: string
  subCategory?: string
  name: string
  unit?: string
  audienceTier?: string
  notes?: string
  priceIdr2025?: number
  priceAud2025?: number
  priceIdr2026?: number
  priceAud2026?: number
  priceIdrRangeLow?: number
  priceIdrRangeHigh?: number
  featuredRank?: number
  includesImplant?: boolean
  sortOrder?: number
}

export type Procedure = {
  id: number
  slug: string
  name: string
  shortName?: string
  pricing?: {
    priceIdr2025?: number
    priceAud2025?: number
    priceIdr2026?: number
    priceAud2026?: number
    priceIdrRangeLow?: number
    priceIdrRangeHigh?: number
    priceNotes?: string
    displayYear?: '2025' | '2026'
  }
  featuredRank?: number
  includesImplant?: boolean
  detail?: {
    duration?: string
    recovery?: string
    included?: Array<{ value: string }>
  }
  description?: Lexical
  parentDiscipline?: number | { id: number; slug: string; title: string }
  parentSubCategory?: number | { id: number; slug: string; title: string }
}

export type InjectableProduct = {
  id: number
  slug: string
  name: string
  brand?: string
  productLine?: string
  category: string
  unit?: string
  priceIdr?: number
  priceAud?: number
  notes?: string
}

export type MachineTreatment = {
  id: number
  slug: string
  machineName: string
  area: string
  pricing?: { standardIdr?: number; kitasKtpIdr?: number; packageIdr?: number }
  notes?: string
}

export type HairRemovalArea = {
  id: number
  slug: string
  area: string
  bodyZone: 'face' | 'upper-body' | 'lower-body' | 'package' | 'other'
  priceIdr?: number
  notes?: string
}

export type PricingTier = {
  id: number
  slug: string
  name: string
  descriptor?: Lexical
  priceFromAud?: number
  priceFromIdr?: number
  inclusions?: Array<{ value: string }>
  isFeatured?: boolean
}

export type ConsultationPolicy = {
  feeIdr?: number
  feeAud?: number
  waiverConditionText?: string
}

export type Settings = {
  siteName?: string
  audToIdrRate?: number
  roundIdrTo?: number
  contactEmail?: string
  whatsappNumber?: string
  currencyDisplayMode?: 'idr-only' | 'idr-with-aud'
}

export type CmsCache = {
  loaded: boolean
  loadedAt: number
  // Catalogue
  priceListItems: PriceListItem[]
  procedures: Procedure[]
  injectableProducts: InjectableProduct[]
  machineTreatments: MachineTreatment[]
  hairRemovalAreas: HairRemovalArea[]
  pricingTiers: PricingTier[]
  // Globals
  settings: Settings
  consultationPolicy: ConsultationPolicy
}

const EMPTY_CACHE: CmsCache = {
  loaded: false,
  loadedAt: 0,
  priceListItems: [],
  procedures: [],
  injectableProducts: [],
  machineTreatments: [],
  hairRemovalAreas: [],
  pricingTiers: [],
  settings: {},
  consultationPolicy: {},
}

let cache: CmsCache = EMPTY_CACHE
let inflight: Promise<CmsCache> | null = null

async function fetchAll<T>(collection: string, limit = 500): Promise<T[]> {
  const url = `${PAYLOAD_URL}/api/${collection}?limit=${limit}&depth=0&draft=false`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`[cms] failed to fetch ${collection}: ${res.status} ${res.statusText}`)
  }
  const json = (await res.json()) as { docs: T[] }
  return json.docs || []
}

async function fetchGlobal<T>(slug: string): Promise<T> {
  const url = `${PAYLOAD_URL}/api/globals/${slug}?depth=0`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`[cms] failed to fetch global ${slug}: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

async function doLoad(): Promise<CmsCache> {
  try {
    const [
      priceListItems,
      procedures,
      injectableProducts,
      machineTreatments,
      hairRemovalAreas,
      pricingTiers,
      settings,
      consultationPolicy,
    ] = await Promise.all([
      fetchAll<PriceListItem>('price-list-items'),
      fetchAll<Procedure>('procedures'),
      fetchAll<InjectableProduct>('injectable-products'),
      fetchAll<MachineTreatment>('machine-treatments'),
      fetchAll<HairRemovalArea>('hair-removal-areas'),
      fetchAll<PricingTier>('pricing-tiers'),
      fetchGlobal<Settings>('settings'),
      fetchGlobal<ConsultationPolicy>('consultation-policy'),
    ])
    return {
      loaded: true,
      loadedAt: Date.now(),
      priceListItems,
      procedures,
      injectableProducts,
      machineTreatments,
      hairRemovalAreas,
      pricingTiers,
      settings,
      consultationPolicy,
    }
  } catch (err) {
    console.warn('[cms] load failed, using empty cache:', err)
    return EMPTY_CACHE
  }
}

const CACHE_TTL_MS = 60_000  // 60s — keeps SSR fast while picking up CMS edits.

export async function loadCmsCache(force = false): Promise<CmsCache> {
  if (!force && cache.loaded && Date.now() - cache.loadedAt < CACHE_TTL_MS) {
    return cache
  }
  if (inflight) return inflight
  inflight = doLoad().then((next) => {
    cache = next
    inflight = null
    return next
  })
  return inflight
}

export function getCmsCacheSync(): CmsCache {
  return cache
}

export function setCmsCacheSync(next: CmsCache): void {
  cache = next
}

/* ─── Lexical → plain text (for simple paragraph rendering during port) ─── */
export function lexicalToText(value: Lexical): string {
  if (!value || !value.root || !value.root.children) return ''
  return value.root.children
    .map((c) => {
      if (c.type === 'paragraph' || c.type === 'heading' || c.type === 'list-item') {
        return (c.children ?? []).map((t) => t.text ?? '').join('')
      }
      return ''
    })
    .filter(Boolean)
    .join('\n\n')
}
