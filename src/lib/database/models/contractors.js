import {DataTypes, DATE} from 'sequelize'
import {OPTION_TYPES} from './enums.js'

/**
 * Contractors model
 */
export default {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    display_full_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    url_path_name: DataTypes.STRING,
    scout_report_email_recipients: {type: DataTypes.ARRAY(DataTypes.STRING)},
    region: {type: DataTypes.ARRAY(DataTypes.STRING)},
    main_website_url: DataTypes.STRING,
    display_small_logo_url: DataTypes.TEXT,
}
