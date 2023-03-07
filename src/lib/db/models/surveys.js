import { DataTypes } from 'sequelize'
import { SURVEY_STATUS } from './enums.js'

export default {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: { type: DataTypes.STRING },
  version: {
    type: DataTypes.STRING,
    defaultValue: '2023.3.0',
  },
  status: {
    type: DataTypes.ENUM,
    defaultValue: SURVEY_STATUS.IN_PROGRESS,
    values: [...Object.values(SURVEY_STATUS)],
  },
  startTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  endTime: { type: DataTypes.DATE },
}
