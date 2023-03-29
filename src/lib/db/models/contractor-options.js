import { DataTypes, DATE } from 'sequelize'
import { OPTION_TYPES } from './enums.js'

/*
CREATE TABLE "contractor_options" (
  "id" guid PRIMARY KEY,
  "homeowner_selection" option_types,
  "presentation_order" int,
  "contractor_id" guid,
  "display_title" varchar,
  "display_subtitle" varchar,
  "display_energy_bill" varchar,
  "display_carbon_reduction" int,
  "display_picture" varchar,
  "cooling_product_id" guid,
  "heating_product_id" guid
);
 */

export default {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  homeowner_selection: {
    type: DataTypes.ENUM,
    values: [...Object.values(OPTION_TYPES)],
  },
  presentation_order: DataTypes.INTEGER,

  contractor_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  display_title: DataTypes.STRING,
  display_subtitle: DataTypes.STRING,
  display_energy_bill: DataTypes.STRING,
  display_carbon_reduction: DataTypes.INTEGER,
  display_picture: DataTypes.STRING,
  cooling_product_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  heating_product_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
}
