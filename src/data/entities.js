import { UTILITY_TYPES } from '../lib/db/models/enums.js'

export const ENTITIES = [
  {
    // entity_id: '90da1e34-c29a-11ed-a851-3aebb006c675',
    entity_name: 'IRS',
    entity_type: 'federal',
    utility_type: UTILITY_TYPES.NONE,
  },
  {
    // entity_id: '90da1e48-c29a-11ed-a851-3aebb006c675',
    entity_name: 'Austin Energy',
    entity_type: 'utility',
    utility_type: UTILITY_TYPES.ELECTRICITY,
  },
  {
    // entity_id: '90da1ea2-c29a-11ed-a851-3aebb006c675',
    entity_name: 'Texas Gas',
    entity_type: 'utility',
    utility_type: UTILITY_TYPES.NATURAL_GAS,
  },
]
