import {DataTypes} from 'sequelize'
import {ENERGY_SOURCES, PRODUCT_TYPES, HVAC_SYSTEM_TYPES} from './enums.js'

/**
 * Products model
 */
export default {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
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
    old_product_id: DataTypes.STRING,
}
