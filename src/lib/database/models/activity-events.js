import {DataTypes} from 'sequelize'
import {EventTypes} from './enums.js'


/**
 * Activity Events Model
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
        allowNull: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true
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
        type: EventTypes,
        // values: [...Object.values(EVENT_TYPES)],
    },
    data: {type: DataTypes.JSON},
    event_source_path: {type: DataTypes.STRING},
    event_source: {type: DataTypes.STRING},
    timestamp: {type: DataTypes.DATE, allowNull: false},
}
