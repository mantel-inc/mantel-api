import 'dotenv-flow/config.js'
import _ from 'lodash'
import DB from './src/lib/database/db.js'
import {PRODUCTS_DB} from './src/data/products.js'
import {CONTRACTOR_OPTIONS} from './src/data/contractor-options.js'
import {CONTRACTOR_DB} from './src/data/contractor.js'
import {ENTITIES_DB} from "./src/data/entities.js"
import {INCENTIVES_DB} from "./src/data/incentives-db-v2.js"
import {SEED_SESSION} from "./src/data/session.js"
import {SEED_SURVEY, SEED_SURVEY_QUESTIONS} from "./src/data/survey.js"
import {createEvents} from "./src/data/activty-event.js"
import {transformToSnakeCase} from "./src/lib/utils/transformers.js"

const seed = async (db) => {
    
    const {
        Products,
        Contractors,
        ContractorOptions,
        Entities,
        Incentives,
        Sessions,
        Surveys,
        Questions,
        ActivityEvents,
        Users
    } = db.models
    
    console.log(`SEEDING ENTITIES`)
    /// ENTITIES
    const entities = await Entities.bulkCreate([...ENTITIES_DB])
    // console.log(entities.map(e => e.toJSON()))
    
    /// CONTRACTORS
    console.log(`SEEDING CONTRACTORS`)
    const contractor = await Contractors.create({...CONTRACTOR_DB[0]})
    // console.log(contractor.toJSON())
    
    /// PRODUCTS
    console.log(`SEEDING PRODUCTS`)
    const products = await Products.bulkCreate([...PRODUCTS_DB])
    // console.log(products.map(e => e.toJSON()))
    
    console.log(`MAPPING INCENTIVES`)
    const mappedIncentives = INCENTIVES_DB.map((i) => {
        const entityId = entities.find(e => e.old_entity_id === i.old_entity_id).id
        return {...i, entity_id: entityId}
    })
    
    console.log(`SEEDING INCENTIVES`)
    const incentives = await Incentives.bulkCreate([...mappedIncentives])
    // console.log(incentives.map(e => e.toJSON()))
    
    console.log(`MAPPING CONTRACTOR_OPTIONS`)
    const mappedOptions = CONTRACTOR_OPTIONS.map((co) => {
        if(co.old_cooling_product_id) {
            co.cooling_product_id = products.find(p => p.old_product_id === co.old_cooling_product_id).id
        }
        if(co.old_heating_product_id) {
            co.heating_product_id = products.find(p => p.old_product_id === co.old_heating_product_id).id
        }
        co.contractor_id = contractor.id
        return {...co}
    })
    
    console.log(`SEEDING CONTRACTOR_OPTIONS`)
    const contractorOptions = await ContractorOptions.bulkCreate([...mappedOptions])
    // console.log(contractorOptions.map(e => e.toJSON()))
    
    console.log(`SEEDING CONTACT INFO`)
    const user = await Users.create(transformToSnakeCase({trackingId: 'GA1.1.624216961.1679552796'}))
    // console.log(user.toJSON())
    const {id: contractorId} = contractor
    const {id: userId, tracking_id: trackingId} = user
    
    
    const transformedSession = transformToSnakeCase(SEED_SESSION)
    // console.log(transformedSession)
    
    const session = await Sessions.create({
        ...transformedSession,
        user_id: userId,
        tracking_id: user.tracking_id,
        contractor_id: contractorId
    })
    // console.log(session.toJSON())
    const {id: sessionId} = session
    
    const survey = await Surveys.create({
        ...transformToSnakeCase(SEED_SURVEY),
        contractor_id: contractor.id,
        session_id: session.id
    })
    // console.log(survey.toJSON())
    const mappedQuestions = SEED_SURVEY_QUESTIONS.map((q) => {
        return {...q, survey_id: survey.id}
    })
    const questions = await Questions.bulkCreate([...mappedQuestions])
    // console.log(questions.map(q => q.toJSON()))
    
    const events = createEvents({sessionId, userId, trackingId, contractorId}).map(e => transformToSnakeCase(e))
    // console.log(events)
    
    const trackingEvents = await ActivityEvents.bulkCreate([...events])
    // console.log(trackingEvents.map(q => q.toJSON()))
    
}

const run = async () => {
    const _db = await DB()
    await seed(_db)
}

run()
