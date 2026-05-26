# Sitewide hardcoded-atom audit — 2026-05-25

Five files. Each was generated differently to cross-check coverage. Use the deterministic grep files (03, 04, 05) as the authoritative line-by-line ground truth — they were generated with no LLM summarization. The pass-1 and pass-2 markdown files are LLM analysis layered on top.

| File | Method | Lines |
|---|---|---|
| `01-pass-one-summary.md` | LLM first pass (44 files, 127 atoms identified) | 187 |
| `02-pass-two-full.md` | LLM deep pass (77 files, agent claims ~300+ atoms) | 774 |
| `03-deterministic-grep.md` | **grep** — JSX text + src + href + aria/alt/placeholder across all 77 files | 383 |
| `04-all-string-literals.md` | **grep** — every English-looking quoted string in all 77 files | 467 |
| `05-images-and-assets.md` | **grep** — every image ref + every CMS upload field | 510 |

## In-scope file count

- Total files audited: 77

Full file list at /tmp/cosmedic-audit-files.txt.

## Headline numbers (across all 5 docs)

- Lines in all-string-literals inventory: 467
- Lines in image+asset inventory: 510
- Lines in deterministic-grep inventory: 383

