/**
 * Helpers to construct Lexical-serialized richText values that Payload's
 * default lexical editor accepts.
 *
 * Lexical's serialized JSON tree is verbose; for seed-time conversions we
 * only ever produce paragraph blocks of plain text and simple lists, so
 * we wrap that minimal pattern here. Editors get the full editor in the
 * admin UI when they later refine the content.
 */

export type LexicalNode = {
  type: string
  version?: number
  format?: string | number
  indent?: number
  direction?: 'ltr' | null
  children?: LexicalNode[]
  text?: string
  detail?: number
  mode?: string
  style?: string
  textFormat?: number
  tag?: string
}

export type LexicalRichText = {
  root: {
    type: 'root'
    format: ''
    indent: 0
    version: 1
    direction: 'ltr' | null
    children: LexicalNode[]
  }
}

function textNode(t: string): LexicalNode {
  return { type: 'text', version: 1, text: t, format: 0, detail: 0, mode: 'normal', style: '' }
}

function paragraph(text: string): LexicalNode {
  return {
    type: 'paragraph',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    textFormat: 0,
    children: text ? [textNode(text)] : [],
  }
}

/** Build a Lexical richText from a single plain-text string (multi-paragraph allowed via \n\n). */
export function plainTextToLexical(s: string | undefined | null): LexicalRichText {
  const text = (s ?? '').toString().trim()
  const paragraphs = text.length ? text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) : ['']
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map(paragraph),
    },
  }
}

/** Build a Lexical richText from an array of strings (one paragraph each). */
export function paragraphsToLexical(paras: string[]): LexicalRichText {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paras.map((p) => paragraph(p)),
    },
  }
}
