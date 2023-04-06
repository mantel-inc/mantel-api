import express from 'express'
import cors from 'cors'
import helmet from "helmet"
import {OkResponse, ErrorResponse} from "./lib/responses/index.js"
import {ApiError} from "./lib/errors/index.js"
import sendEmail from './lib/email-client.js'
import {Op} from "sequelize"
import pino from 'pino'
import {pinoHttp} from "pino-http"
import * as pp from 'pino-pretty'

const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})
import requestLogger from "./lib/middleware/request-logger.js"
import {STATUSES} from "./lib/database/models/enums.js"
import {ActivityEvent} from "./lib/analytics/activity-event.js"

const startServer = (db) => {
    const _db = db
    const app = express()
    app.disable('x-powered-by')
    app.set('trust proxy', 1)
    app.use([
        pinoHttp({
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            }
        }),
        helmet({
            dnsPrefetchControl: {allow: true},
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    'frame-ancestors': [process.env.DASHBOARD_URL],
                },
            },
        }),
        cors({
            origin: '*',
            methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: false,
            headers: ['Content-type', 'Authorization', 'Accept', 'X-Access-Token', 'X-Key'],
            exposedHeaders: 'Location',
        }),
        express.json(),
        express.urlencoded({extended: false}),
        requestLogger()
    ])
    
    const surveys = [{
        id: '123', name: 'HVAC Incentives', version: '2023.03.00',
    }, {
        id: '123', name: 'HVAC Incentives', version: '2023.03.00',
    }]
    
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
    } = _db.models
    app.options('*', cors())
    
    
    app.get('/contractors', async (req, res, next) => {
        // load user data from the database
        try {
            const contractors = await Contractors.findAll() || []
            // console.log(contractors)
            res.status(200).json(OkResponse(contractors.map(c => c.toJSON())))
        } catch (e) {
            return next(new ApiError(400, 'BadRequest', e.message))
        }
    })
    
    app.get('/contractors/search', async (req, res, next) => {
        // load user data from the database
        const {name} = req.query
        // query database by name
        try {
            const contractor = await Contractors.findOne({
                where: {
                    url_path_name: {
                        [Op.eq]: name
                    }
                }
            })
            
            if(contractor)
                res.status(200).json(OkResponse(contractor))
            else
                return next(new ApiError(404, 'NotFound', 'Resource not found'))
            
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })
    
    app.get('/contractors/:id/', async (req, res, next) => {
        // load user data from the database
        const {id} = req.params
        // query database by name
        try {
            const contractor = await Contractors.findByPk(id)
            res.status(200).json(OkResponse(contractor))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })
    
    app.get('/contractors/:id/options', async (req, res, next) => {
        // load user data from the database
        const id = req.params.id
        // query database by name
        try {
            const options = await ContractorOptions.findAll({where: {contractor_id: id}}) || []
            res.status(200).json(OkResponse(options))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })
    
    app.get('/contractors/:id/sessions', async (req, res, next) => {
        // load user data from the database
        const {id} = req.params
        // query database by name
        try {
            const sessions = await Sessions.findAll({where: {contractor_id: id}, include: Surveys}) || []
            res.status(200).json(OkResponse(sessions))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })
    
    app.get('/contractors/:id/events', async (req, res, next) => {
        // load user data from the database
        const {id} = req.params
        // query database by name
        try {
            
            const events = await ActivityEvents.findAll({where: {contractor_id: id}}) || []
            res.status(200).json(OkResponse(events))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })
    
    /*** Activity Events****/
    app.post('/events/record', async (req, res, next) => {
        console.log(req.body)
        
        try {
            let activityEvent = new ActivityEvent(req.body).toJSON()
            const event = await ActivityEvents.create(activityEvent)
            res.status(201).json(OkResponse(event))
        } catch (e) {
            return next(new ApiError(400, 'BadRequest', e.message))
        }
    })
    
    /*** Entities ****/
    app.get('/entities', async (req, res, next) => {
        try {
            const entities = await Entities.findAll() || []
            // console.log(contractors)
            res.status(200).json(OkResponse(entities.map(c => c.toJSON())))
        } catch (e) {
            return next(new ApiError(400, 'BadRequest', e.message))
        }
    })
    
    /*** Incentives ****/
    app.get('/incentives', async (req, res, next) => {
        // load user data from the database
        const {id} = req.params
        // query database by name
        try {
            const data = await Incentives.findAll() || []
            res.status(200).json(OkResponse(data))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })
    
    /*** Products ****/
    app.get('/products', async (req, res, next) => {
        // load user data from the database
        const {id} = req.params
        // query database by name
        try {
            const data = await Products.findAll() || []
            res.status(200).json(OkResponse(data))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })


// *********** SESSIONS *********** //

// GET /session/123
    app.get('/sessions/search', async (req, res, next) => {
        // load user data from the database
        try {
            
            const session = await Sessions.findOne({
                where: {
                    [Op.and]: [
                        {tracking_id: req.query.tracking_id},
                        {contractor_id: req.query.contractor_id},
                        {status: 'active'}
                    ]
                }
            })
            if(!session) {
                return next(new ApiError(404, 'NotFound', 'No active session found'))
            }
            res.status(200).json(OkResponse(session))
        } catch
            (e) {
            console.error(e)
            return next(new ApiError(400, 'InvalidRequest', 'Invalid query parameters'))
        }
    })
    
    app.get('/sessions/:id', async (req, res, next) => {
        // load user data from the database
        try {
            
            const surveyId = req.params.id
            const session = await Sessions.findByPk(req.params.id)
            if(session)
                res.status(200).json(OkResponse(session))
            else
                return next(new ApiError(404, 'NotFound', 'No resource found'))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'No resource found'))
        }
    })
    
    app.patch('/sessions/:id/abandon', async (req, res, next) => {
        // load user data from the database
        try {
            
            const sessionId = req.params.id
            const session = await Sessions.findByPk(req.params.id)
            if(session) {
                session.status = STATUSES.ABANDONED
                await session.save()
            }
            
            res.status(204).send()
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'No resource found'))
        }
    })
    
    app.post('/sessions/create', async (req, res, next) => {
        log.info('create session')
        
        try {
            const sessionData = req.body
            const trackingId = req.body.tracking_id
            const contractorId = req.body.contractor_id
            const meta = req.body.meta || {}
            
            const oldSession = await Sessions.findOne({
                where: {
                    [Op.and]: [
                        {tracking_id: trackingId},
                        {contractor_id: contractorId},
                        {status: 'active'}
                    ]
                }
            })
            //TODO handle session logic
            if(oldSession) {
                return next(new ApiError(403, 'InvalidRequest', 'Active session found'))
            }
            
            const [user, created] = await Users.findOrCreate({
                where: {
                    tracking_id: {
                        [Op.eq]: trackingId
                    }
                }, defaults: {
                    tracking_id: trackingId,
                    meta
                }
            })
            
            log.info(`session user created: ${created}`)
            console.log({
                user_id: user.id,
                ...sessionData,
            })
            const newSession = await Sessions.create({
                user_id: user.id,
                ...sessionData,
            })
            const locationUrl = `/sessions/${newSession.id}`
            res.location(locationUrl)
            res.status(201).json(OkResponse({success: true}))
        } catch (e) {
            log.error(e)
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })


// GET /users/123
    app.get('/surveys/:id', async (req, res, next) => {
        // load user data from the database
        try {
            const surveyId = req.params.id
            const survey = await Surveys.findByPk(req.params.id)
            res.status(200).json(OkResponse(survey))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })
    
    app.post('/surveys', async (req, res, next) => {
        console.log(req.body)
        const newSurvey = req.body
        // users.push(newUser)
        
        res.status(200).json(OkResponse({data: 'surveyId'}))
    })
    
    app.get('/surveys/:id/questions', async (req, res, next) => {
        // load user data from the database
        const {id} = req.params
        // query database by name
        try {
            const options = await Questions.findAll({where: {survey_id: id}}) || []
            res.status(200).json(OkResponse(options))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'Resource not found'))
        }
    })
    
    app.post('/questions', async (req, res, next) => {
        console.log(req.body)
        const newSurvey = req.body
        // users.push(newUser)
        
        res.status(201).json(OkResponse({data: 'surveyId'}))
    })
    
    /**
     * email
     */
    app.post('/send-email', async (req, res, next) => {
        console.log(req.body)
        const data = req.body
        //validate question
        await sendEmail(data)
        res.status(200).json(OkResponse({data: 'questionId'}))
    })


// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        return next(new ApiError(404, 'NotFound', 'Resource not found'))
    })

// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}
        
        if(!(err.status || err.statusCode)) {
            log.error(err)
            err = new ApiError(500, 'Internal server error')
        }
        
        // render the error page
        res.status(err.status || err.statusCode || 500)
        
        res.json(ErrorResponse(err.type || 'Error', err.message, err.status || err.statusCode || 500))
    })
    
    app.listen(3001, () => {
        console.log('Express server is listing on port 3001')
    })
    return app
}
export default startServer
