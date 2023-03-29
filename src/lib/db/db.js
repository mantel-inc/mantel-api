import { Sequelize, DataTypes, Model } from 'sequelize'

import {
  ActivityEventsSchema,
  ContactInfoSchema,
  ContractorOptionsSchema,
  ContractorsSchema,
  EntitiesSchema,
  IncentivesSchema,
  ProductsSchema,
  QuestionsSchema,
  SessionsSchema,
  SurveysSchema,
} from './models/index.js'
import Contractors from './models/contractors.js'

const { DB_URI } = process.env

let sequelize
const connect = async () => {
  if (sequelize) {
    return sequelize
  }
  sequelize = new Sequelize(DB_URI, { logging: console.log })

  class ActivityEvent extends Model {}

  ActivityEvent.init(ActivityEventsSchema,
    { sequelize, tableName: 'activity_events', modelName: 'ActivityEvent' })

  class ContactInfo extends Model {}

  ContactInfo.init(ContactInfoSchema,
    { sequelize, tableName: 'contact_infos', modelName: 'ContactInfo' })
  class Product extends Model {}

  Product.init(ProductsSchema,
    { sequelize, tableName: 'products', modelName: 'Product' })

  class ContractorOptions extends Model {}

  ContractorOptions.init({
    ...ContractorOptionsSchema,
    cooling_product_id: {
      type: DataTypes.UUID,
      references: {
        model: Product,
        key: 'id',
      },
    },
    heating_product_id: {
      type: DataTypes.UUID,
      references: {
        model: Product,
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'contractor_options',
    modelName: 'ContractorOptions',
  })
  // ContractorOptions.init(ContractorOptionsSchema, {
  //    sequelize,
  //    tableName: 'contractor_options',
  //    modelName: 'ContractorOptions',
  //  })

  class Contractor extends Model {}

  Contractor.init(ContractorsSchema,
    { sequelize, tableName: 'contractors', modelName: 'Contractor' })

  class Entity extends Model {}

  Entity.init(EntitiesSchema,
    { sequelize, tableName: 'entities', modelName: 'Entity' })

  class Incentive extends Model {}

  Incentive.init(IncentivesSchema,
    { sequelize, tableName: 'incentives', modelName: 'Incentive' })



  class Question extends Model {}

  Question.init(QuestionsSchema,
    { sequelize, tableName: 'questions', modelName: 'Question' })

  class Survey extends Model {}

  Survey.init(SurveysSchema,
    { sequelize, tableName: 'surveys', modelName: 'Survey' })

  class Session extends Model {}

  Session.init(SessionsSchema,
    { sequelize, tableName: 'sessions', modelName: 'Session' })

  /*
    * Define data relationships
    * */

  ContactInfo.hasMany(ActivityEvent, { foreignKey: 'user_id' })

  Contractor.hasMany(ContractorOptions, { foreignKey: 'contractor_id' })
  Contractor.hasMany(ActivityEvent, { foreignKey: 'contractor_id' })
  Contractor.hasMany(Session, { foreignKey: 'contractor_id' })

  ContractorOptions.belongsTo(Contractor, { as: 'Contractor', foreignKey: 'contractor_id' })
  ContractorOptions.belongsTo(Product, { as: 'CoolingProduct', foreignKey: 'cooling_product_id' })
  ContractorOptions.belongsTo(Product, { as: 'HeatingProduct', foreignKey: 'heating_product_id' })

  // Product.hasMany(ContractorOptions,{ foreignKey: 'cooling_product_id' })

  // Product.hasMany(ContractorOptions, { foreignKey: 'heating_product_id' })
  // Product.hasMany(ContractorOptions, { foreignKey: 'cooling_product_id' })
  // Product.belongsTo(ContractorOptions)

  Entity.hasMany(Incentive, { foreignKey: 'entity_id' })

  Session.hasMany(ActivityEvent, { foreignKey: 'session_id' })
  Session.hasOne(ContactInfo, { foreignKey: 'user_id' })
  Session.hasOne(Survey, { foreignKey: 'session_id' })

  Survey.hasMany(Question, { foreignKey: 'survey_id' })
  Survey.hasMany(Session, { foreignKey: 'survey_id' })

  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    // await sequelize.sync()
    await sequelize.sync({ force: true })

  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
  return sequelize
}
export default connect
