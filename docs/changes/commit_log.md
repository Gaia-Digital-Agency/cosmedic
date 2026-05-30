# Cosmedic — Commit Log (from 2026-05-21)

---

1. Phase M (partial) + cms_todo.md: mobile sweep checkpoint + N-series queued
2. cms_todo.md: queue 2026-05-22 DO FIRST — CMS image upload nginx fix
3. cms_todo.md: queue DO SECOND — Pages → 14 Globals CMS UI restructure
4. ops: fix CMS image upload nginx redirect loop (DO FIRST done)
5. feat(cms): restructure admin nav — Pages collection → 14 Page Globals
6. docs(CLAUDE.md): record 2026-05-22 CMS UI restructure + gotchas
7. phase-D: refresh 11 docs to reflect CMS_structure.md + consolidate to one TODO file
8. phase-C2: move BlogPosts/BlogTags/Authors/BlogPage to JOURNEY bucket
9. phase-C3: remove orphan Pages collection (Step 10 — Rule 4 explicit approval)
10. phase-C4: add CmsSidebarExplainer banner to admin nav
11. phase-C5: wire Blog Page global to /blog index (R5 byte-identical)
12. phase-C6a: Home Page schema — add 9 A2 block group fields
13. feat(home): C6b — 9 home sections read CMS A2 blocks with hardcoded fallbacks
14. docs(commit_list): mark C6a + C6b shipped (rows + log)
15. feat(pricing): C7 — Pricing Page A2 wiring (3 blocks)
16. docs(commit_list): mark C7 shipped (row + log)
17. feat(results): C8 — Before/After full editorial wiring
18. docs(commit_list): mark C8 shipped (row + log)
19. feat(cms): C9a — Procedures catalogue schema (single source for all pricing)
20. docs(commit_list): mark C9a shipped (row + log)
21. feat(cms): C9b — migrate 101 line items into Procedures
22. docs(commit_list): mark C9b shipped (row + log)
23. feat(pricing): C9c-renderer — ClinicCatalogueTable reads from Procedures
24. docs(commit_list): mark C9c-renderer shipped; C9c-delete deferred
25. feat(cms): C9c-delete — drop 4 stale collections (DB tables retained)
26. docs(commit_list): mark C9c-delete shipped (row + log)
27. fix(cms): prefix admin.group with sort number to match CMS_structure.md order
28. Revert "fix(cms): prefix admin.group with sort number…"
29. chore: C10 — R1-R7 audit + R1 dead-field cleanup
30. docs(commit_list): mark C10 shipped (row + log)
31. chore(design): archive 51 reference HTML files into design/_html-archive/
32. feat(web): P — install new favicon icon-set from cosmedic-favico.zip
33. docs(commit_list): mark P shipped (row + log)
34. fix(header): N1 — remove duplicate "Managed by BIMC Hospital" sibling
35. docs(commit_list): mark N1 shipped (row + log)
36. fix(chrome): N2 — Back-to-Top FAB matches WhatsApp FAB dimensions
37. docs(commit_list): mark N2 shipped (row + log)
38. docs(cms): explain Browse-by-Folder + Category in Media admin description
39. fix(pricing): N3 — harmonise table column widths across /pricing tables
40. docs(commit_list): mark N3 + Media-description shipped (row + log)
41. docs(cms): add Browse-by-Folder note to sidebar explainer
42. chore: Phase M complete + globals.css split + docs reorg
43. docs(phase-q): reconcile change2a.pdf addendum + add q18 brand-token swap
44. fix(detail): q1 — .detail-body max-width → clamp(640px, 70vw, 920px)
45. fix(hero): q2 — homepage mobile hero top padding 140px (≤700px)
46. docs(phase-q): add Notes + Commit columns to tracker; backfill q1 + q2
47. fix(brand): q18 — dark-brown token #6B4A2B → #533E27
48. docs(phase-q): mark q18 complete + commit ref
49. fix(hero): q3 — unified --hero-top-pad token (mobile)
50. docs(phase-q): mark q3 complete
51. feat(pricing): q16 — flip web consumers IDR-primary, AUD derived
52. docs(phase-q): mark q16 complete
53. feat(home): q4 — single team photo replaces 6-card associates grid
54. docs(phase-q): mark q4 complete
55. fix(layout): q9 — .page-breadcrumb tracks --page-x at ≤700px
56. docs(phase-q): mark q9 complete
57. feat(primitives): q10 — shared StatsRow primitive (home + /treatments)
58. docs(phase-q): mark q10 complete
59. feat(footer): q7 — dark-brown 3-column footer reskin
60. docs(phase-q): mark q7 complete
61. docs(phase-q): mark q8 complete — N/A, verification only
62. fix(routing): q11 — flat slug rewrite /treatment-* → /treatments/*
63. docs(phase-q): mark q11 complete
64. fix(cms): unblock next build — exclude 3 cross-package seed scripts
65. fix(breadcrumbs): q12 — unify SurgeonDetail + purge dead .chapter-breadcrumb
66. docs(phase-q): mark q12 complete
67. docs(phase-q): mark q6 complete (audit-only) + add q19 follow-up
68. docs(phase-q): q18 — CMS admin theme now live
69. feat(cms): q5 — remove PricingTiers collection
70. docs(phase-q): mark q5 complete
71. fix(q13): wire stub forms to /api/enquiry + add 6 blog placeholder bodies
72. docs(phase-q): mark q13 complete
73. docs(phase-q): q13 — fill Commit column + cleanup note
74. docs(phase-q): q19 re-audit — re-scope
75. feat(cms): q15 — procedure sortOrder scoped per parentSubCategory
76. docs(phase-q): mark q15 complete
77. feat(b&a): q14 — patient age + recovery duration on Before/After cards
78. docs(phase-q): mark q14 complete
79. feat(cms): q19 — drop InclusionItems + ExclusionItems pipeline end-to-end
80. docs(phase-q): mark q19 complete
81. docs(phase-q): q19 — fill Commit column + correct net-diff figures
82. docs(commits): append numbered full-history list (110 entries) + sync to HEAD
83. docs: Phase Q close-out (18/19 shipped, q17 deferred) — sync docs
84. docs: close Item 2 Step 10 — Pages-orphan Rule 4 gate resolved
85. docs(phase-r): plan Admin↔Site IA remap — 4 of 6 Bucket details mapped
86. docs: add editor-facing Site↔CMS map (current 8-bucket state)
87. docs(phase-r): Homepage — rename -Teaser → -View, move mirrors to bottom
88. docs(phase-r): plan c. Doctors detail — 5 of 6 Bucket details mapped
89. docs(phase-r): plan d. Results detail (R5) — 10 items, shared CTAs
90. docs(phase-r): simplify remap.md to 3-col tables; appendices in remap_plan.md
91. docs(phase-r): plan b. Treatments + e. Pricing — all 10 Buckets mapped
92. feat(r0): Bucket realignment — 9 prefixed admin.group buckets
93. docs(claude-md): sync Phase R0 shipped + remap execution order
94. feat(r1): g. Contact Bucket — Hero, Enquiry-Section, Visit-Section globals + route rewires
95. feat(r7): f. Journey Bucket — Hero, Stats, Steps, Recovery-Stays globals + route rewires
96. feat(r8): h. About Bucket — Privacy-Sections, Blog-Post-Template globals + route rewires
97. feat(r8.e): seed blog-post-template global with default chrome strings
98. feat(r4+r6): c. Doctors + e. Pricing Bucket — section globals + route rewires
99. docs(claude-md): sync per-Bucket detail progress — R1/R4/R6/R7/R8 shipped
100. feat(r3): b. Treatments Bucket — section globals + route rewires
101. feat(r5): d. Results Bucket — section globals + 3 routes rewired
102. feat(web,cms): switch browser tab + favicon to lighter-brown set
103. feat(web,cms): footer brand column + surgeon portrait consistency
104. feat(r2): a. Homepage Bucket — 10 section globals + 9 home routes rewired
105. docs: split changes into docs/changes/ + capture 2026-05-25 outstanding-items audit
106. docs(change-request): mark R2 shipped
107. fix(web,docs): logo hover color drift + scrub stale colour refs
108. docs(change-request): reorder CR25May into execution sequence
109. docs(safeguards): close item 11 recurrence safeguards + merge dup item 12
110. feat(cms,web): item 11.b — close 9 footer hardcoded atoms via CMS
111. feat(cms): 25.2 SMTP path B — adopt gaiadaweb wiring pattern
112. feat(brand): 25.19 — swap site logo to brown.svg + enforce 5-color brown palette
113. feat(web,cms): 25.1 closure + 25.6 closure + footer logo wired to CMS
114. fix(chrome): 25.8 + 25.8a — pin Back-to-Top position
115. fix(web): 25.9 starburst comment + session rule additions + CR25May renumber
116. docs(cr25may): close 25.9
117. feat(web): 25.5 A1 — wire 9 image sites to consume CMS media
118. docs: 25.12 — close Phase C6–C10 audit
119. feat(slugs): 25.14 — sweep slugs (44 renames across 3 collections)
120. feat(pricing): 25.13a+b — clinic catalogue data fix + Well-Being heading
121. docs(cr25may): tick 25.13a + 25.13b Pushed boxes
122. feat(qa): 25.4 — Phase 11 pre-launch QA gate infrastructure
123. docs(cr25may): tick 25.4 Pushed box
124. docs(cr25may): 25.16 closed — superseded by 25.15
125. docs(cr25may): Batch 0 — drop 25.21+25.35, close 25.23/24/25/26, add 25.13c
126. feat(web+cms): 25.30+25.31 — WhatsApp + seo.ts wired to CMS Settings
127. feat(cms): 25.27+25.28+25.29 — extend contact/privacy globals + not-found-page global
128. feat(web): 25.27+25.28+25.29 — contact/privacy/notfound wired to CMS
129. feat(web): 25.13c — IDR/AUD currency toggle on treatment detail pages
130. docs(cr25may): close 25.13 + tick 25.13c/27/28/29/30/31
131. fix(pricing): 25.17 — single-source DEFAULT_AUD_TO_IDR fallback
132. docs(cr25may): 25.17 partial — rate fallback single-sourced
133. docs(cr25may): sync+sort — close 25.13c/25.30/25.31 Rules
134. fix(palette): 25.19 — replace last rgba(181,137,99) with canonical #A67C52
135. docs(cr25may): sync TODO reality — 25.19 done
136. feat(pricing): 25.17 — flip PricingTeaser + PricingPage to IDR-source
137. docs(cr25may): 25.17 closed
138. feat(pricing): add IDR denomination sanity checks; add 25.40+25.41 to TODO
139. fix(cms): commit ClinicCatalogueItems collection + 25.17 seed cleanup
140. feat(nav+pricing): 25.40 + 25.41 — nav reorder + clinic catalogue first
141. feat(cms): 25.18 — strip letter prefixes from all admin bucket groups
142. docs(cr25may): 25.18 + 25.40 + 25.41 closed
143. feat(cms): 25.27/25.28/25.29 — localized:true on 56 fields
144. docs(cr25may): close 25.27/25.28/25.29 Rules
145. feat(web): 25.23 — wire Place section image to CMS
146. docs(cr25may): close 25.23 + 25.39
147. docs(cr25may): drop 25.20 + 25.33 — deleted from TODO
148. docs(cr25may): 25.36 — DB backup setup + cron
149. docs: sync CLAUDE.md + README.md + db_ops.md to CR25May 31/41 state
150. feat(cms-ux): admin logo link + editor-friendly field labels
151. fix(cms-ux): suppress horizontal scroll in admin
152. fix(cms-ux): use 32×32 square mark in admin header logo slot
153. fix(cms-ux): embed brand mark as base64 in admin header logo
154. fix(cms-ux): add logo to admin sidebar via beforeNav slot
155. fix(cms-ux): strip a./b./c. item prefixes + fix registration order
156. fix(cms-ux): fix invisible admin icon — swap cream PNG for dark-brown mark
157. fix(cms-ux): replace 'lede' with 'intro paragraph' in admin descriptions
158. fix(cms): remove 9 deprecated homepage block fields + dead pricing-page block types
159. fix(ts+cms-nav): fix 23 web TS errors + inject Collection/Global labels in admin sidebar
160. chore: housekeeping — renames, audit docs, schema backups, test file
161. feat(cms): raise media upload quality — WebP 90 root, 85–88 responsive sizes
162. docs: add changes4.md — CMS collection restructure plan
163. docs(changes4): add full four-column depth structure table
164. docs(changes4): replace summary table with full four-column depth
165. feat(cms): split ClinicCatalogueItems into Surgical/Machine/Injection/BTL collections
166. feat(pricing): collapsible accordions on /pricing — CLINIC + WELLNESS sections
167. docs(changes4): add Phase 3 AI Feature plan — Ask The Doctor widget
168. feat(web): Ask The Doctor — Vertex AI chat widget on all pages
169. fix(ask-doctor): reorder FAB stack + brand light brown button
170. feat(cms): Analytics collection — capture Ask The Doctor questions
171. fix(ask): route /api/ask through nginx to web:3007 + add clinic location to AI context
172. docs(db): add changesdb.md — 2026-05-27 health audit + orphan cleanup
173. docs(changes): rename change files to numbered scheme + add changes5-collections plan
174. feat(cms): changes5 Phase 1+3 — field reorders + hideHero toggles
175. refactor(cms+web): Phase 2 D1/D2 field merges — group heading/title + designation rename
176. fix(cms): D9 — apply hideHero to all Main page globals
177. feat(seed): seed-wire-media — wire placeholder media IDs + upload logos
178. feat(cms+web): add coverImage upload field to HomeLeadMagnet
179. fix(media): upload proper PNG lifestyle images + rewire hero globals
180. feat(images): AI-generated heroes, CMS image wiring, route audit
181. feat(ui): rename Doctor/Doctors → Expert/Experts across frontend + CMS
182. feat(cms): 25.38 E2E fix + user avatar + remove API UI noise
183. fix(footer): remove 'Managed by BIMC Hospital' tagline
184. feat(nav): reorder — Treatments → Experts → Results (desktop + mobile)
185. feat(header): burger menu breakpoint 1100px → 1480px
186. fix(breadcrumb): align-items baseline on crumb items
187. feat(pricing): remove IDR/AUD toggle — always show IDR primary + AUD secondary
188. fix(cms+web): breadcrumb bucket injection, card height, map buttons
189. docs: changes08 — CMS pricing bucket consolidation plan
190. feat(cms): changes08-A — move 9 Pricing globals into Treatments bucket
191. feat(cms+web): changes08-B — delete 5 duplicate pricing collections
192. docs: update change_request_may25 — 25.6 MCP configured, count refresh
193. fix(nav): hide Plan Your Treatment CTA from mobile header bar
194. feat(home): surgeons section — remove Associates eyebrow, add Experts button
195. fix(hero): lighten hero accent text — #A67C52 → #D4B48C
196. fix(sticky): overflow-x:clip on body — restores sticky sidebar on all detail pages
197. feat(sub-cat): remove ProcedureFactsPanel section from sub-category detail pages
198. fix(home): View Recovery Stays CTA links to /journey
199. fix(journey): add arrow to step 05 Recover
200. fix(results): full-width body — remove max-width:1280 centering on content sections
201. feat: upload 25 Figma images to CMS — all sub-category heroes filled
202. docs: comprehensive doc update — changes08, Figma images, db_info.md, CR25May 38/48
203. docs(cms): add CMS simplification planning files — cms_map_all, cms_map_simple, cms_prep_plan
204. fix(cms): replace runtime-unsafe function hidden with static hidden:true + add Users.role column
205. style(cms): admin nav + main area visual polish
206. style(cms): compact main area cards — more columns, less padding
207. feat: reconstructive sub-category images, analytics topics/wordcount, contact map fix
208. feat: surgical sub-category images + strip/stats fixes
209. chore: remove CLAUDE.md
210. chore: move todo.md to docs/planning, delete root image files
211. docs: restore CLAUDE.md project guide
212. fix(cms): add BEFORE INSERT trigger to generate analytics_topics.id
213. perf(web): warm SSR cache on startup + cache template/render + modulepreload hint
214. perf(web): add fetchPriority=high to hero LCP image + set modern Vite build target
215. docs: add change09 CMS simplification plan to cms_optional.md
216. feat(cms): change09 — hide 30 UI-chrome globals/collections from editor sidebar
217. feat(cms): change09 steps 09.3/09.5/09.6 — hide Page globals, rename labels
218. fix(cms): rename PricingHero label — avoids duplicate "Hero" in Treatments bucket
219. feat(cms): change09 — merge Results CTAs into one item, hide Authors
220. feat(web): redesign homepage Surgeons section as full-width banner
221. feat(web): lead-magnet card hover — photo default, typographic card on hover
222. fix(web): lead-magnet hover — card default, photo reveals on hover
223. feat(cms+db): align HomeSurgeonsView to new banner design
224. docs(cms): update cms_map_all, cms_map_simple, cms_optional for change09
225. feat(web): align URLs, images, and contact details to reference site
226. feat(web): nav labels, 4 new surgical sub-categories, social & bug fixes
227. feat(web): SEO page titles, subtitle consistency, nav labels, bug fixes
228. feat(cms): iteration 4 simplification — 36→26 items, ~240→~130 visible fields
229. docs(cms): update tracking files for iteration 4 simplification
230. feat(cms+web+db): Group C field merges — C1 surgeon name, C3/C4 lead magnet cover
231. feat(cms): global sidebar cards — dark brown background, white title
232. fix(cms): restore audToIdrRate + roundIdrTo visibility in Settings
233. docs(cms): full update of CMS tracking docs for iteration 4
234. feat(cms): bucket reorder, global dark-brown styling, About→Publications rename
235. fix(cms): revert nav colour, apply to main area globals, logout last
236. fix(cms): nav bucket order + exit-last, hide Browse-by-Folder, global card colour
237. feat(cms): dashboard bucket order + visual-order band striping (pure CSS)
238. docs: add image_info.md — full app image inventory
239. docs: image_info rename-map + EN-ID i18n plan (enid)
240. fix(cms): nav band visual-order striping + default-light theme; docs: user guide
241. docs: split user_cms_guide field table into one table per bucket
242. docs: split Homepage section into Part 1 (page sections) + Part 2 (settings/footer/press)
243. feat(i18n): Phase A — Payload localization foundation + AUD/IDR auto-rate
244. feat(i18n): Phase A2 — LLM auto-translate hook via Vertex AI gemini-2.5-flash
245. feat(cms): CMS nav renames + Surgeons card reorder
246. feat(cms): hide Header and Footer globals from admin nav
247. feat(cms): merge Contact Visit Section into Hero global
248. feat(i18n): Phase B — per-locale CMS fetch layer
249. feat(cms): RecoveryStaysPage — rename to Page, hide inclusions fields
250. feat(cms): unhide Treatments/Pricing/Stories cards + expose Hero lede
251. feat(i18n): Phase C — /id/* SSR routing + SEO
252. feat(cms): apply rule — Titles, Paragraphs, Images always visible
253. feat(i18n): Phase D — activate EN|ID locale switcher
254. docs: mark Phase C + D complete in enid_plan.md
255. feat(cms): undo Contact merge; fix Homepage card order; restore Visit Section
256. feat(cms): unhide editorial fields in Sub-Categories, Procedures, Blog Posts
257. docs: add CMS visibility sweep map (52 routes × 10 levels)
258. feat(cms): full visibility sweep — all Lede/Para/Image/Title/Body/Arrays now visible
259. docs: update cms_optional/map_simple/map_all after visibility sweep
260. feat(cms): bucket-by-bucket nav cleanup pass
261. feat(cms): Experts bucket cleanup
262. feat(cms): Procedures bucket — hide chrome globals from editor view
263. feat(i18n): Phase F — backfill translations + activate auto-translate hook
264. feat(cms): Experts Option B — merge Plastic Surgery + Aesthetic Medicine
265. feat(cms): Procedures — merge Insurance + Payment into 'Insurance & Payment'
266. docs: Phase G verification complete — all checks passed
267. feat(cms): payload.config — PricingCatalogueView registration + Insurance/Payment label fix
268. feat(cms): HomeTreatmentsView — expand to cover Treatments/Pricing/Gallery/Stories sections
269. feat(cms): Home section globals — localized fields + label updates
270. feat(cms): Homepage — merge 7 section globals into 2 + Procedure Catalogue View reorder
271. feat(cms): Homepage — hide Endorsement, Floating CTA, Editorial, SEO Defaults
272. feat(cms): three bucket merges — Experts Sections + Procedure Heroes + Pricing Terms
273. fix(cms): Hero card column rename + Homepage Main hidden
274. fix(cms): Catalogue View group labels + Hero imageHue hide + SurgeonsHero title label
275. fix(cms): flatten title groups + breadcrumbLabel hide + group labels
276. fix(cms): add group labels to BlogPostTemplate + ContactVisitSection field labels
277. fix(cms): systematic group label pass — all visible globals now have titled sections
278. fix(cms): re-hide Header and Footer in Homepage bucket
279. fix(cms): add first-section titles to Surgeons, Lead Magnet
280. feat(cms): three Hero merges + section title fixes
281. fix(cms): add missing home_intro_locales columns (intro_* + journey_*)
282. docs: update cms_all/optional/visible maps — Hero merge pass
283. docs: update README.md + CLAUDE.md — current state
284. docs: rewrite user_cms_guide.md — reflects Hero merge pass
285. fix(web): resolve EN/ID locale switching bugs — flash 404, missing sections, nav links, SSR strings
286. feat(i18n): backfill EN→ID translations + expand proper-noun protection rules
