import {DataTypes} from 'sequelize'

/**
 * Questions model
 */
export default {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    question_response: {type: DataTypes.JSON},
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
}
