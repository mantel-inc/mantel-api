import {DataTypes, DATE} from 'sequelize'

/**
 * CREATE TABLE "contact_info" (
 *   "user_id" guid PRIMARY KEY,
 *   "tracking_id" guid UNIQUE NOT NULL,
 *   "email" varchar,
 *   "address" json
 * );
 */
export default {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    tracking_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    address: DataTypes.JSON,
    device_info: DataTypes.JSON,
    meta: DataTypes.JSON,
}
