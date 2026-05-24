import * as migration_20260520_112358 from './20260520_112358';
import * as migration_20260520_123550_phase_6_catalogue from './20260520_123550_phase_6_catalogue';
import * as migration_20260520_125136_rename_section_anchor from './20260520_125136_rename_section_anchor';
import * as migration_20260521_042540_add_media_isPlaceholder from './20260521_042540_add_media_isPlaceholder';
import * as migration_20260522_072509_pages_to_globals from './20260522_072509_pages_to_globals';
import * as migration_20260524_031454_q4_team_group_photo from './20260524_031454_q4_team_group_photo';
import * as migration_20260524_042248_q5_drop_pricing_tiers from './20260524_042248_q5_drop_pricing_tiers';
import * as migration_20260524_043557_q14_ba_patient_age_recovery_duration from './20260524_043557_q14_ba_patient_age_recovery_duration';
import * as migration_20260524_044634_q19_drop_inclusion_exclusion from './20260524_044634_q19_drop_inclusion_exclusion';
import * as migration_20260524_125500_r8a_privacy_sections from './20260524_125500_r8a_privacy_sections';
import * as migration_20260524_055500_r1_contact_globals from './20260524_055500_r1_contact_globals';
import * as migration_20260524_140000_r7_journey_globals from './20260524_140000_r7_journey_globals';
import * as migration_20260524_133000_r8b_blog_post_template from './20260524_133000_r8b_blog_post_template';
import * as migration_20260524_140000_r8c_about_chrome_fields from './20260524_140000_r8c_about_chrome_fields';

export const migrations = [
  {
    up: migration_20260520_112358.up,
    down: migration_20260520_112358.down,
    name: '20260520_112358',
  },
  {
    up: migration_20260520_123550_phase_6_catalogue.up,
    down: migration_20260520_123550_phase_6_catalogue.down,
    name: '20260520_123550_phase_6_catalogue',
  },
  {
    up: migration_20260520_125136_rename_section_anchor.up,
    down: migration_20260520_125136_rename_section_anchor.down,
    name: '20260520_125136_rename_section_anchor',
  },
  {
    up: migration_20260521_042540_add_media_isPlaceholder.up,
    down: migration_20260521_042540_add_media_isPlaceholder.down,
    name: '20260521_042540_add_media_isPlaceholder',
  },
  {
    up: migration_20260522_072509_pages_to_globals.up,
    down: migration_20260522_072509_pages_to_globals.down,
    name: '20260522_072509_pages_to_globals',
  },
  // 20260523_055554_phase_c6_homepage_a2: schema additions applied directly
  // via psql (per docs/db_ops.md gotcha — payload migrate can't run because
  // Drizzle wants to DROP orphan pages_blocks_* tables which C3 preserved
  // as data backup). Migration registered in payload_migrations table.
  {
    up: migration_20260524_031454_q4_team_group_photo.up,
    down: migration_20260524_031454_q4_team_group_photo.down,
    name: '20260524_031454_q4_team_group_photo',
  },
  {
    up: migration_20260524_042248_q5_drop_pricing_tiers.up,
    down: migration_20260524_042248_q5_drop_pricing_tiers.down,
    name: '20260524_042248_q5_drop_pricing_tiers',
  },
  {
    up: migration_20260524_043557_q14_ba_patient_age_recovery_duration.up,
    down: migration_20260524_043557_q14_ba_patient_age_recovery_duration.down,
    name: '20260524_043557_q14_ba_patient_age_recovery_duration',
  },
  {
    up: migration_20260524_044634_q19_drop_inclusion_exclusion.up,
    down: migration_20260524_044634_q19_drop_inclusion_exclusion.down,
    name: '20260524_044634_q19_drop_inclusion_exclusion',
  },
  {
    up: migration_20260524_125500_r8a_privacy_sections.up,
    down: migration_20260524_125500_r8a_privacy_sections.down,
    name: '20260524_125500_r8a_privacy_sections',
  },
  {
    up: migration_20260524_055500_r1_contact_globals.up,
    down: migration_20260524_055500_r1_contact_globals.down,
    name: '20260524_055500_r1_contact_globals',
  },
  {
    up: migration_20260524_140000_r7_journey_globals.up,
    down: migration_20260524_140000_r7_journey_globals.down,
    name: '20260524_140000_r7_journey_globals',
  },
  {
    up: migration_20260524_133000_r8b_blog_post_template.up,
    down: migration_20260524_133000_r8b_blog_post_template.down,
    name: '20260524_133000_r8b_blog_post_template',
  },
  {
    up: migration_20260524_140000_r8c_about_chrome_fields.up,
    down: migration_20260524_140000_r8c_about_chrome_fields.down,
    name: '20260524_140000_r8c_about_chrome_fields',
  },
];
