import { DataTypes, DATE } from 'sequelize'
import { ENERGY_SOURCES, PRODUCT_TYPES } from './enums.js'

/*
CREATE TABLE "contractor_options" (
 CREATE TABLE "incentives" (
  "id" guid PRIMARY KEY,
  "entity_id" guid NOT NULL,
  "energy_source" varchar,
  "region" varchar,
  "product_type" product_types,
  "hvac_system_type" varchar,
  "tonnage" int,
  "capacity" int,
  "ventilation_type" varchar,
  "seer2" float,
  "eer2" float,
  "hspf2" float,
  "cop" float,
  "afue" float,
  "existing_system_required" boolean,
  "existing_system_age" int,
  "amount" float,
  "display_name" varchar,
  "display_text" varchar,
  "documentation_url" varchar,
  "last_updated" timestampz
);
);
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
