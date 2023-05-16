import {DataTypes} from 'sequelize'
import {STATUSES} from './enums.js'

/**
 * Sessions model
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
    },
    user_id: {
        type: DataTypes.UUID,
    },
    contractor_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: [...Object.values(STATUSES)],
        defaultValue: STATUSES.ACTIVE
    },
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
}
