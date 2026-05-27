# Cosmedic DB — Tables, Columns & Foreign Keys

> Live snapshot 2026-05-27. Postgres `cosmedic` role + db on `127.0.0.1:5432`.  
> 18 live collections → 18 primary tables. ~140 total tables (Payload internals + orphan legacy).  
> All `id` columns are `integer` (auto-increment). All tables have `updated_at` + `created_at` (`timestamptz`).

## 1. Live Entity Tables

### `analytics`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| question | text | Ask The Doctor chat question |
| asked_at | timestamptz | |
| ip | varchar | |
| country | varchar | |
| city | varchar | |
| timezone | varchar | |
| user_agent | varchar | |

### `authors`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| name | varchar | |
| role | varchar | |
| bio | jsonb | richtext |
| portrait_id | integer | FK → media.id |
| surgeon_profile_id | integer | FK → surgeons.id (optional link) |

### `awards`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| name | varchar | |
| year | numeric | |
| issuer | varchar | |
| logo_id | integer | FK → media.id |
| summary | varchar | |
| sort_order | numeric | |

### `before_after_cases`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| case_label | varchar | |
| procedure_id | integer | FK → procedures.id |
| composite_id | integer | FK → media.id (side-by-side image) |
| before_alt | varchar | accessibility alt for left half |
| after_alt | varchar | accessibility alt for right half |
| surgeon_id | integer | FK → surgeons.id |
| description | jsonb | richtext |
| year | numeric | |
| patient_age | numeric | |
| recovery_duration | varchar | |
| is_featured | boolean | |
| sort_order | numeric | |
| seo_title / seo_description / seo_og_image_id / seo_canonical / seo_noindex | — | standard SEO group |

### `blog_posts`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| title | varchar | |
| lede | varchar | |
| body | jsonb | richtext |
| hero_image_id | integer | FK → media.id |
| author_id | integer | FK → authors.id |
| published_at | timestamptz | |
| reading_time_minutes | numeric | |
| publish_status | enum | `draft` / `published` |
| sort_order | numeric | |
| seo_* | — | standard SEO group |

Tags linked via `blog_posts_rels` junction (`blog_tags_id` → `blog_tags.id`).

### `blog_tags`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| name | varchar | |
| description | varchar | |
| sort_order | numeric | |

### `disciplines`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | e.g. `surgical`, `weight-loss` |
| title | varchar | |
| subtitle | varchar | |
| display_count | varchar | e.g. "Discipline 01 / 06" |
| hue | numeric | brand tint angle |
| body | jsonb | richtext |
| chapter_title_a | varchar | serif part A |
| chapter_title_b | varchar | italicised part B |
| tagline | varchar | |
| lede | varchar | |
| overview | jsonb | richtext |
| hero_image_id | integer | FK → media.id |
| sort_order | numeric | |
| seo_* | — | standard SEO group |

### `enquiries`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| name | varchar | |
| email | varchar | |
| phone | varchar | |
| country | varchar | |
| treatment_interest_id | integer | FK → procedures.id (optional) |
| treatment_interest_text | varchar | free-text fallback |
| preferred_date | text | |
| message | varchar | |
| source_page | varchar | e.g. `home`, `contact`, `video-consult` |
| source_cta | varchar | |
| status | enum | `new` / `in-progress` / `closed` |
| assigned_to_id | integer | FK → users.id |
| submitted_at | timestamptz | |
| ip | varchar | |
| user_agent | varchar | |
| honeypot | varchar | silent spam trap |

### `journey_steps`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| order | numeric | display order |
| number | varchar | e.g. "01" |
| day_label | varchar | e.g. "Day –1" |
| title | varchar | |
| body | jsonb | richtext |
| icon_id | integer | FK → media.id |
| image_id | integer | FK → media.id |
| image_hue | numeric | |
| category | enum | step category |
| sort_order | numeric | |

### `media`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| alt | varchar | required |
| url | varchar | canonical path |
| filename | varchar | |
| mime_type | varchar | |
| filesize | numeric | bytes |
| width / height | numeric | |
| focal_x / focal_y | numeric | smart-crop focal point |
| credit | varchar | |
| caption | varchar | |
| is_placeholder | boolean | IDs 73–92 synthetic seed images — suppressed in `mediaUrl()` |
| category | enum | media category tag |
| folder_id | integer | FK → payload_folders.id |
| sizes_sm / sizes_md / sizes_lg / sizes_xl / sizes_xxl | — | responsive variants (url, width, height, mime_type, filesize, filename) |

### `press_mentions`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| publication | varchar | |
| logo_id | integer | FK → media.id |
| headline | varchar | |
| url | varchar | external link |
| published_date | timestamptz | |
| summary | varchar | |
| is_featured | boolean | |
| sort_order | numeric | |

### `privacy_sections`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| title | varchar | |
| sort_order | numeric | |

Body content stored in `privacy_sections_blocks` (Payload block tables).

### `procedures`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| name | varchar | |
| short_name | varchar | |
| parent_discipline_id | integer | FK → disciplines.id |
| parent_sub_category_id | integer | FK → sub_categories.id |
| description | jsonb | richtext |
| hero_image_id | integer | FK → media.id |
| pricing_price_idr2025 | numeric | prior year price |
| pricing_price_idr2026 | numeric | **current price** |
| pricing_price_idr_range_low | numeric | low end of range |
| pricing_price_idr_range_high | numeric | high end of range |
| pricing_price_notes | varchar | |
| pricing_display_year | enum | `2025` / `2026` |
| catalogue_group | enum | `surgical` / `machine` / `injection` / `btl` — drives `/pricing` table grouping |
| main_category | varchar | catalogue category label |
| sub_category | varchar | catalogue sub-category label |
| unit | varchar | e.g. "per session" |
| audience_tier | enum | |
| brand | varchar | product brand |
| product_line | varchar | |
| manufacturer | varchar | |
| fda_approved | boolean | |
| body_zone | enum | body region |
| includes_implant | boolean | |
| detail_duration | varchar | |
| detail_recovery | varchar | |
| featured_rank | numeric | |
| sort_order | numeric | |
| seo_* | — | standard SEO group |

Related surgeons via `procedures_rels` (`surgeons_id` → `surgeons.id`).  
Related B&A cases via `procedures_rels` (`before_after_cases_id` → `before_after_cases.id`).  
Related journey steps via `procedures_rels` (`journey_steps_id` → `journey_steps.id`).  
Related procedures via `procedures_rels` (`procedures_id` → `procedures.id`).

### `recovery_stays`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| name | varchar | |
| location | varchar | e.g. "Nusa Dua, Bali" |
| hero_image_id | integer | FK → media.id |
| descriptor | jsonb | richtext overview |
| body | varchar | |
| price_from_aud_per_night | numeric | |
| price_from_idr_per_night | numeric | |
| bedrooms | varchar | |
| pool_type | varchar | |
| drive_time | varchar | |
| nursing_note | varchar | |
| partner_url | varchar | external link |
| geo_lat / geo_lng | numeric | Google Maps embed |
| image_hue | numeric | |
| sort_order | numeric | |
| seo_* | — | standard SEO group |

### `stories`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| patient_label | varchar | anonymous-friendly label |
| country | varchar | |
| procedure_id | integer | FK → procedures.id |
| procedure_label | varchar | free-text fallback |
| portrait_id | integer | FK → media.id |
| quote | varchar | pull-quote |
| body | jsonb | richtext |
| video_url | varchar | optional video embed |
| year | numeric | |
| surgeon_id | integer | FK → surgeons.id |
| hue | numeric | brand tint |
| is_featured | boolean | |
| publish_status | enum | `draft` / `published` |
| sort_order | numeric | |
| seo_* | — | standard SEO group |

### `sub_categories`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | e.g. `face`, `body`, `breast` |
| parent_id | integer | FK → disciplines.id |
| title | varchar | |
| chapter_title_a | varchar | serif part A |
| chapter_title_b | varchar | italicised part B |
| tagline | varchar | |
| lede | varchar | |
| intro | jsonb | richtext |
| overview | jsonb | richtext |
| lead_surgeon_id | integer | FK → surgeons.id |
| hero_image_id | integer | FK → media.id |
| sort_order | numeric | |
| seo_* | — | standard SEO group |

### `surgeons`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| slug | varchar | |
| name | varchar | full formal name |
| common_name | varchar | e.g. "Dr. Suka" |
| designation | varchar | |
| suffix | varchar | post-nominal credentials |
| spec | varchar | specialty summary |
| train | varchar | training background |
| proc | varchar | procedure focus |
| cred_line | varchar | single credential line |
| years_in_practice | numeric | |
| hue | numeric | brand tint |
| group | enum | `plastic-surgery` / `aesthetic-medicine` |
| lead | boolean | |
| bio | jsonb | richtext |
| portrait_id | integer | FK → media.id |
| portrait_position | varchar | CSS `object-position` for crop |
| sort_order | numeric | |
| seo_* | — | standard SEO group |

Credentialed procedures via `surgeons_rels` (`procedures_id` → `procedures.id`).

### `users`
| column | type | notes |
|---|---|---|
| id | integer | PK |
| email | varchar | login email |
| hash / salt | varchar | bcrypt password |
| reset_password_token | varchar | |
| reset_password_expiration | timestamptz | |
| login_attempts | numeric | brute-force counter |
| lock_until | timestamptz | |
| avatar_id | integer | FK → media.id |

---

## 2. Foreign Key Map

| from_table | from_column | to_table | to_column |
|---|---|---|---|
| authors | portrait_id | media | id |
| authors | surgeon_profile_id | surgeons | id |
| awards | logo_id | media | id |
| before_after_cases | composite_id | media | id |
| before_after_cases | procedure_id | procedures | id |
| before_after_cases | surgeon_id | surgeons | id |
| before_after_cases | seo_og_image_id | media | id |
| blog_posts | hero_image_id | media | id |
| blog_posts | author_id | authors | id |
| blog_posts | seo_og_image_id | media | id |
| blog_posts_rels | parent_id | blog_posts | id |
| blog_posts_rels | blog_tags_id | blog_tags | id |
| disciplines | hero_image_id | media | id |
| disciplines | seo_og_image_id | media | id |
| enquiries | treatment_interest_id | procedures | id |
| enquiries | assigned_to_id | users | id |
| journey_steps | icon_id | media | id |
| journey_steps | image_id | media | id |
| media | folder_id | payload_folders | id |
| press_mentions | logo_id | media | id |
| procedures | parent_discipline_id | disciplines | id |
| procedures | parent_sub_category_id | sub_categories | id |
| procedures | hero_image_id | media | id |
| procedures | seo_og_image_id | media | id |
| procedures_rels | parent_id | procedures | id |
| procedures_rels | surgeons_id | surgeons | id |
| procedures_rels | before_after_cases_id | before_after_cases | id |
| procedures_rels | journey_steps_id | journey_steps | id |
| procedures_rels | procedures_id | procedures | id |
| recovery_stays | hero_image_id | media | id |
| recovery_stays | seo_og_image_id | media | id |
| stories | portrait_id | media | id |
| stories | procedure_id | procedures | id |
| stories | surgeon_id | surgeons | id |
| stories | seo_og_image_id | media | id |
| sub_categories | parent_id | disciplines | id |
| sub_categories | lead_surgeon_id | surgeons | id |
| sub_categories | hero_image_id | media | id |
| sub_categories | seo_og_image_id | media | id |
| surgeons | portrait_id | media | id |
| surgeons | seo_og_image_id | media | id |
| surgeons_rels | parent_id | surgeons | id |
| surgeons_rels | procedures_id | procedures | id |
| users | avatar_id | media | id |

---

## 3. Orphan Legacy Tables (DB only — no Payload collection)

These tables remain from removed collections. They are safe to query but should not be written to. Drop them after confirming zero active reads.

| table | removed collection | removed in |
|---|---|---|
| surgical_items | SurgicalItems | changes08-B |
| machine_items | MachineItems | changes08-B |
| injection_items | InjectionItems | changes08-B |
| btl_items | BTLItems | changes08-B |
| clinic_catalogue_items | ClinicCatalogueItems | changes08-B |
| machine_treatments | MachineTreatments | q19 |
| injectable_products | InjectableProducts | q19 |
| hair_removal_areas | HairRemovalAreas | q19 |
| price_list_items | PriceListItems | q5 |
| pages | Pages | Rule-4 close-out (2026-05-24) |
| inclusion_items | InclusionItems | q19 |
| exclusion_items | ExclusionItems | q19 |

---

## 4. Payload Internal Tables (reference)

Payload manages these automatically — never write to them directly.

| table | purpose |
|---|---|
| payload_migrations | applied migration log |
| payload_preferences | per-user UI preferences |
| payload_locked_documents | draft/lock tracking |
| payload_jobs | scheduled jobs queue |
| payload_folders | media folder tree |
| payload_sessions | auth sessions |
| `*_rels` tables | many-to-many relationship junctions |
| `*_blocks_*` tables | block-field content (one table per block type per global/collection) |
| `*_locales` tables | localised field variants |

---

## 5. Common Query Patterns

```sql
-- All procedures for a sub-category slug
SELECT p.name, p.pricing_price_idr2026
FROM procedures p
JOIN sub_categories sc ON p.parent_sub_category_id = sc.id
WHERE sc.slug = 'face'
ORDER BY p.sort_order;

-- All sub-categories under a discipline
SELECT sc.slug, sc.title
FROM sub_categories sc
JOIN disciplines d ON sc.parent_id = d.id
WHERE d.slug = 'surgical'
ORDER BY sc.sort_order;

-- Catalogue group pricing (for /pricing page)
SELECT catalogue_group, main_category, sub_category, name, pricing_price_idr2026
FROM procedures
WHERE catalogue_group IS NOT NULL
ORDER BY catalogue_group, main_category, sort_order;

-- Enquiries needing action
SELECT id, name, email, country, source_page, submitted_at
FROM enquiries
WHERE status = 'new'
ORDER BY submitted_at DESC;
```
