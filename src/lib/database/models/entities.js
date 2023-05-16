import { DataTypes, DATE } from 'sequelize'
import { ENTITY_TYPES } from './enums.js'

/**
 * Entities model
 */
export default {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
  },
  entity_name: DataTypes.STRING,
  display_name: DataTypes.STRING,
  entity_type: {
    type: DataTypes.ENUM,
    values: [...Object.values(ENTITY_TYPES)],
  },
  utility_type: DataTypes.STRING,
  old_entity_id:DataTypes.STRING
}
