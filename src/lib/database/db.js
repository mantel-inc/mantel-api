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
} from './models/index.js'
import Contractors from './models/contractors.js'

const {DB_URI} = process.env

let sequelize
/***
 * connect make a connection to the database.
 * this also will apply database models using the sequelize orm.
 * @returns {Promise<Sequelize|*>}
 */
const connect = async () => {
    if(sequelize) {
        return sequelize
    }
    
    /// Connect to the database
    if(process.env.NODE_ENV !== 'development') {
        const sslCaCert = Buffer.from(process.env.DB_CA_CERT, 'base64').toString('utf8')
        const config = {
            username: process.env.DB_USERNAME,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOSTNAME,
            port: 5432,
            ssl: true,
            keepAlive:true,
            dialect: 'postgres',
            logging: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    ca: sslCaCert
                }
            },
        }
        sequelize = new Sequelize(config)
    } else {
        sequelize = new Sequelize(DB_URI, {dialect: 'postgres', logging: false})
    }
    /* this section below is used to initialize the models*/
    const timestampOptions = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
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
    
    Incentive.init(IncentivesSchema, {sequelize, tableName: 'incentives', modelName: 'Incentives', ...timestampOptions})
    
    
    class Question extends Model {
    }
    
    Question.init(QuestionsSchema, {
        sequelize,
        tableName: 'questions',
        modelName: 'Questions',
        indexes: [{
            unique: true,
            fields: ['session_id', 'index']
        }],
        ...timestampOptions,
    })
    
    class Session extends Model {
    }
    
    Session.init(SessionsSchema, {sequelize, tableName: 'sessions', modelName: 'Sessions', ...timestampOptions})
    
    /* Define data relationships */
    
    User.hasMany(ActivityEvent, {foreignKey: 'user_id'})
    
    
    Contractor.hasMany(ContractorOptions, {as: 'ContractorOptions', foreignKey: 'contractor_id'})
    Contractor.hasMany(ActivityEvent, {foreignKey: 'contractor_id'})
    
    ContractorOptions.belongsTo(Contractor, {as: 'Contractor', foreignKey: 'contractor_id'})
    ContractorOptions.belongsTo(Product, {as: 'CoolingProduct', foreignKey: 'cooling_product_id'})
    ContractorOptions.belongsTo(Product, {as: 'HeatingProduct', foreignKey: 'heating_product_id'})
    
    
    Entity.hasMany(Incentive, {foreignKey: 'entity_id'})
    
    Session.hasMany(ActivityEvent, {as: 'ActivityEvents', foreignKey: 'session_id'})
    Session.hasMany(Question, {as: 'Questions', foreignKey: {name: 'session_id', allowNull: false}})
    Question.belongsTo(Session, {foreignKey: 'session_id'})
    
    User.hasMany(Session, {as: 'Sessions', foreignKey: {name: 'user_id', allowNull: false}})
    Session.belongsTo(User, {foreignKey: 'user_id'})
    Contractor.hasMany(Session, {as: 'Sessions', foreignKey: {name: 'contractor_id', allowNull: false}})
    Session.belongsTo(Contractor, {foreignKey: 'contractor_id'})
    
    
    Entity.hasMany(Incentive, {foreignKey: 'entity_id'})
    Incentive.belongsTo(Entity, {as: 'Entity', foreignKey: 'entity_id'})
    
    try {
        // authenticate
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        // sync the models with the DB. Review sequelize docs for more on this function.
        await sequelize.sync()
        
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
    return sequelize
}
export default connect
