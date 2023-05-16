import {DataTypes, DATE} from 'sequelize'
import {OPTION_TYPES} from './enums.js'


/**
 * Contractor Options Model Model
 */
export default {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    contractor_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    homeowner_selection: {
        type: DataTypes.ENUM,
        values: [...Object.values(OPTION_TYPES)],
    },
    presentation_order: DataTypes.INTEGER,
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
