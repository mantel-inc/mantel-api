import { Sequelize, DataTypes, Model } from 'sequelize'
import SurveySchema from './models/surveys.js'

const { DB_URI } = process.env

let sequelize
const connect = async () => {
  if (sequelize) {
    return sequelize
  }
  sequelize = new Sequelize(DB_URI, { logging: console.log })

  class Survey extends Model {}

  Survey.init(SurveySchema, { sequelize, modelName: 'Survey' })

  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ force: true })

  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
  return sequelize
}
export default connect
