import { DataTypes } from 'sequelize'

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  index: { type: DataTypes.INTEGER, required: true },
  text: {
    type: DataTypes.STRING,
    required: true,
  },
  answer: { type: DataTypes.JSON },
}
