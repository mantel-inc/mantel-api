import {DataTypes} from 'sequelize'
import {EVENT_TYPES} from './enums.js'

/*
CREATE TABLE "activity_events" (
  "id" guid PRIMARY KEY,
  "session_id" guid,
  "user_id" guid,
  "tracking_id" guid,
  "contractor_id" guid,
  "event_type" event_types,
  "data" json,
  "event_source_path" varchar,
  "event_source" varchar
  "timestamp" timestampz
);
 */
export default {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    session_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false
        
    },
    tracking_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contractor_id: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    event_type: {
        type: DataTypes.ENUM,
        values: [...Object.values(EVENT_TYPES)],
    },
    data: {type: DataTypes.JSON},
    event_source_path: {type: DataTypes.STRING},
    event_source: {type: DataTypes.STRING},
    timestamp: {type: DataTypes.DATE, allowNull: false},
}
