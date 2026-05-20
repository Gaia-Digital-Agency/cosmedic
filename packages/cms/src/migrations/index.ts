import * as migration_20260520_112358 from './20260520_112358';
import * as migration_20260520_123550_phase_6_catalogue from './20260520_123550_phase_6_catalogue';
import * as migration_20260520_125136_rename_section_anchor from './20260520_125136_rename_section_anchor';

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
    name: '20260520_125136_rename_section_anchor'
  },
];
