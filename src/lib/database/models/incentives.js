import { DataTypes, DATE } from 'sequelize'
import { ENERGY_SOURCES, PRODUCT_TYPES } from './enums.js'

/**
 * Incentives model
 */
export default {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  entity_id: {
    type: DataTypes.UUID,
  },
  energy_source: {
    type: DataTypes.ENUM,
    values: [...Object.values(ENERGY_SOURCES)],
  },
  region: DataTypes.ARRAY(DataTypes.STRING),
  product_type: {
    type: DataTypes.ENUM,
    values: [...Object.values(PRODUCT_TYPES)],
  },
  hvac_system_type: DataTypes.STRING,
  tonnage: DataTypes.INTEGER,
  capacity: DataTypes.INTEGER,
  ventilation_type: DataTypes.STRING,
  seer2: DataTypes.FLOAT,
  eer2: DataTypes.FLOAT,
  hspf2: DataTypes.FLOAT,
  cop: DataTypes.FLOAT,
  afue: DataTypes.FLOAT,
  existing_system_required: DataTypes.BOOLEAN,
  existing_system_age: DataTypes.INTEGER,
  amount: DataTypes.FLOAT,
  display_name: DataTypes.STRING,
  display_text: DataTypes.STRING,
  documentation_url: DataTypes.STRING,
  last_updated: DataTypes.DATE,
  old_entity_id: DataTypes.STRING,
  old_incentives_id: DataTypes.STRING,
}
