import { Sequelize, DataTypes, Model } from 'sequelize'
import SurveySchema from './models/surveys.js'
import QuestionSchema from './models/questions.js'
import ContactInfoSchema from './models/contact-infos.js'

const { DB_URI } = process.env

let sequelize
const connect = async () => {
  if (sequelize) {
    return sequelize
  }
  sequelize = new Sequelize(DB_URI, { logging: console.log })

  class Survey extends Model {}

  Survey.init(SurveySchema, { sequelize, modelName: 'Survey' })

  class Question extends Model {}

  Question.init(QuestionSchema, { sequelize, modelName: 'Question' })

  class ContactInfo extends Model {}

  ContactInfo.init(ContactInfoSchema, { sequelize, modelName: 'ContactInfo' })

  /*
  * Define data relationships
  * */
  Survey.hasMany(Question, { foreignKey: 'surveyId' })
  // Question.belongsTo(Survey)

  Survey.hasOne(ContactInfo, { foreignKey: 'surveyId' })
  // ContactInfo.belongsTo(Survey)
  //   foreignKey: {
  //     type: DataTypes.UUID,
  //   },
  // })
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
