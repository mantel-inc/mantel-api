import {DataTypes} from 'sequelize'

/**
 *  "id" guid PRIMARY KEY,
 *   "survey_id" guid NOT NULL,
 *   "index" int NOT NULL,
 *   "question_text" varchar NOT NULL,
 *   "question_response" json,
 *   "start_time" timestampz,
 *   "end_time" timestampz
 */
export default {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    survey_id: {
        type: DataTypes.UUID,
        allowNull: false
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
