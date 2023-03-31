import { DataTypes, DATE } from 'sequelize'
import { OPTION_TYPES } from './enums.js'

/*
CREATE TABLE "contractor" (
  "id" guid PRIMARY KEY,
  "name" varchar NOT NULL,
  "display_name" varchar NOT NULL,
  "url_path_name" varchar NOT NULL,
  "scout_report_email_recipients" varchar,
  "region" varchar,
  "main_website_url" varchar
);
 */

export default {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  display_name: DataTypes.STRING,
  url_path_name: DataTypes.STRING,
  scout_report_email_recipients: { type: DataTypes.ARRAY(DataTypes.STRING) },
  region: { type: DataTypes.ARRAY(DataTypes.STRING) },
  main_website_url: DataTypes.STRING,
}
