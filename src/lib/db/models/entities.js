import { DataTypes, DATE } from 'sequelize'
import { ENTITY_TYPES } from './enums.js'

/*
CREATE TABLE "entity" (
  "id" guid PRIMARY KEY,
  "entity_name" varchar,
  "display_name" varchar,
  "entity_type" entity_types,
  "utility_type" varchar
);
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
  utility_type: DataTypes.STRING
}
