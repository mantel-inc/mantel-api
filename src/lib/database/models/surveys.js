import {DataTypes} from 'sequelize'
import {STATUSES} from './enums.js'

/**
 * CREATE TABLE "survey" (
 *   "id" guid PRIMARY KEY,
 *   "name" varchar,
 *   "description" varchar,
 *   "version" varchar,
 *   "status" status,
 *   "session_id" guid,
 *   "start_time" timestampz,
 *   "end_time" timestampz
 * );
 */
export default {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {type: DataTypes.STRING},
    version: {
        type: DataTypes.STRING,
        defaultValue: '2023.3.0',
    },
    status: {
        type: DataTypes.ENUM,
        defaultValue: STATUSES.ACTIVE,
        values: [...Object.values(STATUSES)],
    },
    start_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    end_time: {type: DataTypes.DATE},
    session_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    }
}
