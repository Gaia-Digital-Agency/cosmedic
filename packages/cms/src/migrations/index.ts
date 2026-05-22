import * as migration_20260520_112358 from './20260520_112358';
import * as migration_20260520_123550_phase_6_catalogue from './20260520_123550_phase_6_catalogue';
import * as migration_20260520_125136_rename_section_anchor from './20260520_125136_rename_section_anchor';
import * as migration_20260521_042540_add_media_isPlaceholder from './20260521_042540_add_media_isPlaceholder';
import * as migration_20260522_072509_pages_to_globals from './20260522_072509_pages_to_globals';

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
    name: '20260522_072509_pages_to_globals'
  },
];
