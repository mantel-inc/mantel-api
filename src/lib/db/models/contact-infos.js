import { DataTypes, DATE } from 'sequelize'

export default {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  address: DataTypes.JSON,
}
