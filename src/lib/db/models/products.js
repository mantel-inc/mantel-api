import { DataTypes } from 'sequelize'
import { ENERGY_SOURCES, PRODUCT_TYPES, HVAC_SYSTEM_TYPES } from './enums.js'

/*
CREATE TABLE "products" (
  "id" guid PRIMARY KEY,
  "product_type" product_types,
  "hvac_system_type" varchar,
  "cooling_capacity" float,
  "heating_capacity" float,
  "ventiliation_type" varchar,
  "seer2" float,
  "eer2" float,
  "hspf2" float,
  "cop" float,
  "afue" float,
  "manufacturer" varchar,
  "manufacturer_model_number" varchar,
  "ahri_number" varchar,
  "ahri_ceritfication_URL" varchar,
  "display_equipment_summary" varchar,
  "display_equipment_detail" varchar,
  "display_equipment_tooltip" varchar
);

 */

export default {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
  },
  product_type: {
    type: DataTypes.ENUM,
    values: [...Object.values(PRODUCT_TYPES)],
  },
  hvac_system_type: {
    type: DataTypes.ENUM,
    values: [...Object.values(HVAC_SYSTEM_TYPES)],
  },
  cooling_capacity: DataTypes.FLOAT,
  heating_capacity: DataTypes.FLOAT,
  ventilation_type: DataTypes.STRING,
  seer2: DataTypes.FLOAT,
  eer2: DataTypes.FLOAT,
  hspf2: DataTypes.FLOAT,
  cop: DataTypes.FLOAT,
  afue: DataTypes.FLOAT,
  manufacturer: DataTypes.STRING,
  manufacturer_model_number: DataTypes.STRING,
  ahri_number: DataTypes.STRING,
  ahri_certification_url: DataTypes.STRING,
  display_equipment_summary: DataTypes.STRING,
  display_equipment_detail: DataTypes.STRING,
  display_equipment_tooltip: DataTypes.STRING,
}
