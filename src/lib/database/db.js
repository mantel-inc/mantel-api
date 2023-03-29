import {Sequelize, DataTypes, Model} from 'sequelize'

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

const {DB_URI} = process.env

let sequelize
const connect = async () => {
    if(sequelize) {
        return sequelize
    }
    sequelize = new Sequelize(DB_URI, {dialect: 'postgres', logging: false})
    
    const timestampOptions = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
    // const DataTypes.ENUM('foo', 'bar')
    
    class ActivityEvent extends Model {
    }
    
    ActivityEvent.init(ActivityEventsSchema,
        {sequelize, tableName: 'activity_events', modelName: 'ActivityEvents', timestamps: false})
    
    class User extends Model {
    }
    
    User.init(ContactInfoSchema, {
        sequelize,
        tableName: 'users',
        modelName: 'Users',
        ...timestampOptions
    })
    
    class Product extends Model {
    }
    
    Product.init(ProductsSchema, {
        sequelize, tableName: 'products', modelName: 'Products',
        ...timestampOptions
    })
    
    class ContractorOptions extends Model {
    }
    
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
        ...timestampOptions
    })
    
    class Contractor extends Model {
    }
    
    Contractor.init(ContractorsSchema,
        {sequelize, tableName: 'contractors', modelName: 'Contractors', ...timestampOptions})
    
    class Entity extends Model {
    }
    
    Entity.init(EntitiesSchema,
        {sequelize, tableName: 'entities', modelName: 'Entities', ...timestampOptions})
    
    class Incentive extends Model {
    }
    
    Incentive.init(IncentivesSchema,
        {sequelize, tableName: 'incentives', modelName: 'Incentives', ...timestampOptions})
    
    
    class Question extends Model {
    }
    
    Question.init(QuestionsSchema,
        {sequelize, tableName: 'questions', modelName: 'Questions', ...timestampOptions})
    
    class Survey extends Model {
    }
    
    Survey.init(SurveysSchema,
        {sequelize, tableName: 'surveys', modelName: 'Surveys', ...timestampOptions})
    
    class Session extends Model {
    }
    
    Session.init(SessionsSchema,
        {sequelize, tableName: 'sessions', modelName: 'Sessions', ...timestampOptions})
    
    /*
      * Define data relationships
      * */
    
    User.hasMany(ActivityEvent, {foreignKey: 'user_id'})
    User.hasMany(Session, {as: 'Sessions', foreignKey: 'user_id'})
    User.hasMany(Survey, {as: 'Surveys', foreignKey: 'user_id'})
    
    
    Contractor.hasMany(ContractorOptions, {as: 'ContractorOptions', foreignKey: 'contractor_id'})
    Contractor.hasMany(ActivityEvent, {foreignKey: 'contractor_id'})
    Contractor.hasMany(Session, {foreignKey: 'contractor_id'})
    
    ContractorOptions.belongsTo(Contractor, {as: 'Contractor', foreignKey: 'contractor_id'})
    ContractorOptions.belongsTo(Product, {as: 'CoolingProduct', foreignKey: 'cooling_product_id'})
    ContractorOptions.belongsTo(Product, {as: 'HeatingProduct', foreignKey: 'heating_product_id'})
    
    
    Entity.hasMany(Incentive, {foreignKey: 'entity_id'})
    
    Session.hasMany(ActivityEvent, {as: 'ActivityEvents', foreignKey: 'session_id'})
    Session.hasOne(User, {as: 'User', foreignKey: 'user_id'})
    Session.hasOne(Survey, {as: 'Survey', foreignKey: 'session_id'})
    
    Survey.hasMany(Question, {as: 'Questions', foreignKey: 'survey_id'})
    
    Entity.hasMany(Incentive, {foreignKey: 'entity_id'})
    Incentive.belongsTo(Entity, {as: 'Entity', foreignKey: 'entity_id'})
    
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        // await sequelize.sync()
        await sequelize.sync()
        
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
    return sequelize
}
export default connect
