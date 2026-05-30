/**
 * Auto-translate hook: on every EN save, translate localized fields → ID locale via Vertex AI.
 *
 * Activated only when AUTO_TRANSLATE_ENABLED=true in the CMS .env.
 * Built now, stays silent until Phase F backfill completes.
 */
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { GoogleAuth } from 'google-auth-library'

// ─── Vertex AI client ────────────────────────────────────────────────────────

let _auth: GoogleAuth | null = null
function getAuth(): GoogleAuth {
  if (!_auth) {
    _auth = new GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    })
  }
  return _auth
}

const SYSTEM_PROMPT = `You are a professional medical translator specialising in cosmetic surgery and aesthetic medicine.

Translate the following text from English into Bahasa Indonesia.

STRICT rules — never break these:

1. Keep EXACTLY as-is — accreditation & medical bodies:
   ISAPS, ACHSI, BIMC, CosMedic, FICS, IPRAS, JCI, TGA, FDA, ISO, AAM, AAAM

2. Keep EXACTLY as-is — all surgeon names and titles, including:
   dr. Suka, dr. Indra, dr. Wara, dr. Astri, dr. Rosa, dr. Risma, dr. Sissy, dr. Theresia,
   Suka Adnyana, Indra Pramana, Wara Samsarga, Astrinita, Rosalina, Risma Pramita,
   Sissy Yunita, Theresia Indri, and any other name beginning with "dr."

3. Keep EXACTLY as-is — hospital & clinic proper names:
   BIMC Hospital, BIMC CosMedic, Cosmedic, Ngurah Rai International Airport

4. Keep EXACTLY as-is — place names:
   Nusa Dua, Bali, Ubud, Seminyak, Jimbaran, Sanur, Kuta, Canggu, Uluwatu, Indonesia

5. Keep EXACTLY as-is — villa and property names (proper nouns):
   Villa Sembilan, Villa Damai, Villa Kelapa, Villa Tirta, Villa Sereno, The Apurva Suite,
   and any other "Villa …" or hotel/resort name

6. Keep EXACTLY as-is — product brand names and medical device brands:
   Restylane, Juvederm, Teosyal, Radiesse, Profhilo, Aptos, Saizen, Botox, BOTOX,
   HydraFacial, RF Microneedling, Ultherapy, Thermage, BTL, HIFU, LIFU, PRP,
   and any other product name that is a registered trademark or brand

7. Keep EXACTLY as-is — medical credentials and post-nominals:
   SpBP-RE, Sp.BP-RE(K), Sp.D.V.E, Fellow ISAPS, MBBS, MD, Magister, Diploma

8. Keep EXACTLY as-is — all currency symbols, amounts, and codes:
   IDR, AUD, Rp, and any number preceded by "Rp" or followed by "IDR" or "AUD"

9. Keep EXACTLY as-is — any text that is already in Bahasa Indonesia

10. Procedure names: use the standard Bahasa Indonesia medical term when one is widely accepted
    (e.g. Rhinoplasty → Rinoplasti, Liposuction → Liposuksi); otherwise keep the English term.

11. Return ONLY the translated text — no explanations, no quotation marks, no preamble`

export async function callVertex(text: string): Promise<string> {
  const projectId = process.env.GCP_PROJECT_ID?.trim()
  const location = process.env.GCP_VERTEX_LOCATION?.trim() || 'asia-southeast1'
  const model = process.env.GCP_VERTEX_MODEL?.trim() || 'gemini-2.5-flash'
  if (!projectId) throw new Error('GCP_PROJECT_ID not set')

  const client = await getAuth().getClient()
  const token = (await client.getAccessToken()).token
  if (!token) throw new Error('Failed to get GCP access token')

  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:generateContent`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 2000 },
    }),
  })
  if (!res.ok) throw new Error(`Vertex error ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = (await res.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim() || text
}

// ─── Nested object helpers ────────────────────────────────────────────────────

function getPath(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== 'object') return undefined
  const [head, ...rest] = path.split('.')
  const val = (obj as Record<string, unknown>)[head!]
  return rest.length ? getPath(val, rest.join('.')) : val
}

function setPath(obj: Record<string, unknown>, path: string, val: unknown): void {
  const parts = path.split('.')
  let cur: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]!
    if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {}
    cur = cur[k] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]!] = val
}

// ─── Translate a Lexical richText JSON tree ──────────────────────────────────

export async function translateRichText(node: unknown): Promise<unknown> {
  if (!node || typeof node !== 'object') return node
  const n = node as Record<string, unknown>
  // Text leaf
  if (n.type === 'text' && typeof n.text === 'string' && n.text.trim()) {
    return { ...n, text: await callVertex(n.text as string) }
  }
  // Container node — recurse into children
  if (Array.isArray(n.children)) {
    return { ...n, children: await Promise.all(n.children.map(translateRichText)) }
  }
  // Lexical root wrapper (has a 'root' key)
  if (n.root && typeof n.root === 'object') {
    return { ...n, root: await translateRichText(n.root) }
  }
  return n
}

// ─── Field descriptor types ────────────────────────────────────────────────────

type FieldSpec =
  | { type: 'text'; path: string }           // simple string
  | { type: 'richText'; path: string }       // Lexical JSON
  | { type: 'array'; path: string; fields: FieldSpec[] } // array of items

// ─── Translate a document given a list of field specs ────────────────────────

export async function translateDoc(
  doc: Record<string, unknown>,
  prev: Record<string, unknown> | null,
  specs: FieldSpec[],
  logger: { error: (obj: unknown, msg: string) => void },
): Promise<Record<string, unknown>> {
  const result: Record<string, unknown> = {}

  for (const spec of specs) {
    const val = getPath(doc, spec.path)
    const prevVal = prev ? getPath(prev, spec.path) : undefined
    // Skip if unchanged
    if (JSON.stringify(val) === JSON.stringify(prevVal)) continue

    if (spec.type === 'text' && typeof val === 'string' && val.trim()) {
      try {
        setPath(result, spec.path, await callVertex(val))
      } catch (err) {
        logger.error({ err, path: spec.path }, 'autoTranslate: text field error')
      }
    } else if (spec.type === 'richText' && val && typeof val === 'object') {
      try {
        setPath(result, spec.path, await translateRichText(val))
      } catch (err) {
        logger.error({ err, path: spec.path }, 'autoTranslate: richText field error')
      }
    } else if (spec.type === 'array' && Array.isArray(val)) {
      try {
        const translated = await Promise.all(
          val.map(async (item) => {
            if (!item || typeof item !== 'object') return item
            const itemPrev = Array.isArray(prevVal)
              ? prevVal.find((p: any) => p.id === (item as any).id)
              : null
            const partial = await translateDoc(item as Record<string, unknown>, itemPrev, spec.fields, logger)
            return { ...(item as Record<string, unknown>), ...partial }
          }),
        )
        setPath(result, spec.path, translated)
      } catch (err) {
        logger.error({ err, path: spec.path }, 'autoTranslate: array field error')
      }
    }
  }

  return result
}

// ─── Loop-prevention ─────────────────────────────────────────────────────────

const IN_PROGRESS = Symbol('autoTranslateInProgress')
function isRunning(req: unknown): boolean { return !!(req as any)[IN_PROGRESS] }
function markRunning(req: unknown) { (req as any)[IN_PROGRESS] = true }

// ─── Hook factories ───────────────────────────────────────────────────────────

// Fire-and-forget wrapper — runs translation after response is sent
function runInBackground(fn: () => Promise<void>, logger: { error: (o: unknown, m: string) => void }) {
  setImmediate(() => fn().catch((err) => logger.error({ err }, 'autoTranslate: background error')))
}

export function makeCollectionTranslateHook(specs: FieldSpec[]): CollectionAfterChangeHook {
  return ({ doc, previousDoc, req, collection }) => {
    if (process.env.AUTO_TRANSLATE_ENABLED !== 'true') return doc
    if ((req as any).locale !== 'en') return doc
    if (isRunning(req)) return doc
    markRunning(req)

    const docSnapshot = JSON.parse(JSON.stringify(doc))
    const prevSnapshot = previousDoc ? JSON.parse(JSON.stringify(previousDoc)) : null

    runInBackground(async () => {
      const idData = await translateDoc(docSnapshot, prevSnapshot, specs, req.payload.logger)
      if (Object.keys(idData).length > 0) {
        await req.payload.update({
          collection: collection.slug as any,
          id: doc.id,
          locale: 'id' as any,
          data: idData as any,
        })
      }
    }, req.payload.logger)

    return doc
  }
}

export function makeGlobalTranslateHook(specs: FieldSpec[]): GlobalAfterChangeHook {
  return ({ doc, previousDoc, req, global: g }) => {
    if (process.env.AUTO_TRANSLATE_ENABLED !== 'true') return doc
    if ((req as any).locale !== 'en') return doc
    if (isRunning(req)) return doc
    markRunning(req)

    const docSnapshot = JSON.parse(JSON.stringify(doc))
    const prevSnapshot = previousDoc ? JSON.parse(JSON.stringify(previousDoc)) : null

    runInBackground(async () => {
      const idData = await translateDoc(docSnapshot, prevSnapshot, specs, req.payload.logger)
      if (Object.keys(idData).length > 0) {
        await req.payload.updateGlobal({
          slug: g.slug as any,
          locale: 'id' as any,
          data: idData as any,
        })
      }
    }, req.payload.logger)

    return doc
  }
}

// ─── Shared field spec builders ───────────────────────────────────────────────

export const T = (path: string): FieldSpec => ({ type: 'text', path })
export const R = (path: string): FieldSpec => ({ type: 'richText', path })
export const A = (path: string, fields: FieldSpec[]): FieldSpec => ({ type: 'array', path, fields })
export const SEO_SPECS: FieldSpec[] = [T('seo.title'), T('seo.description')]
