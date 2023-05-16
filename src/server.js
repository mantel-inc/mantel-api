import express from 'express'
import cors from 'cors'
import helmet from "helmet"
import {OkResponse, ErrorResponse} from "./lib/responses/index.js"
import {ApiError} from "./lib/errors/index.js"
import sendEmail from './lib/email-client.js'
import {Op} from "sequelize"
import pino from 'pino'
import {pinoHttp} from "pino-http"

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

/***
 * start and configure the express server. Route setup, middleware config, and error handling.
 * @param db
 * @returns {Express}
 */
const startServer = (db) => {
    const _db = db
    /// create express app
    const app = express()
    app.disable('x-powered-by')
    app.set('trust proxy', 1)
    /// use middlewares
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
    
    /// load models from incoming db connection for use in the routes
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
    
    /* Contractor routes */
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
    
    /* Activity event routes */
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
    
    /* Entities routes */
    app.get('/entities', async (req, res, next) => {
        try {
            const entities = await Entities.findAll() || []
            // console.log(contractors)
            res.status(200).json(OkResponse(entities.map(c => c.toJSON())))
        } catch (e) {
            return next(new ApiError(400, 'BadRequest', e.message))
        }
    })
    
    /* Incentives routes*/
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
    
    /* Products routes */
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
    
    
    /* SESSIONS */
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
            
            const session = await Sessions.findByPk(req.params.id)
            if(session) {
                let data = session.toJSON()
                const contractor = await session.getContractor()
                if(contractor) {
                    data.contractor = contractor.toJSON()
                }
                res.status(200).json(OkResponse(data))
            } else {
                return next(new ApiError(404, 'NotFound', 'No resource found'))
            }
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'No resource found'))
        }
    })
    
    /// PATCH
    app.patch('/sessions/:id/abandon', async (req, res, next) => {
        // load user data from the database
        try {
            
            const sessionId = req.params.id
            const session = await Sessions.findByPk(req.params.id)
            if(session) {
                const immutableStates = [STATUSES.COMPLETED, STATUSES.GRACEFUL_EXIT]
                // if(session.status !== STATUSES.COMPLETED) {
                if(!immutableStates.includes(session.status)) {
                    session.status = STATUSES.ABANDONED
                    session.end_time = new Date()
                    await session.save()
                }
            }
            
            res.status(204).send()
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'No resource found'))
        }
    })
    
    app.patch('/sessions/:id/complete', async (req, res, next) => {
        // load user data from the database
        try {
            
            const session = await Sessions.findByPk(req.params.id)
            if(session) {
                if(STATUSES.ACTIVE === session.status) {
                    session.status = STATUSES.COMPLETED
                    session.end_time = new Date()
                    await session.save()
                }
            }
            
            res.status(204).send()
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'No resource found'))
        }
    })
    
    app.patch('/sessions/:id/exit', async (req, res, next) => {
        // load user data from the database
        try {
            
            const session = await Sessions.findByPk(req.params.id)
            if(session) {
                // const mutableStates = [STATUSES.ACTIVE]
                if(STATUSES.ACTIVE === session.status) {
                    session.status = STATUSES.GRACEFUL_EXIT
                    session.end_time = new Date()
                    await session.save()
                }
            }
            
            res.status(204).send()
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'No resource found'))
        }
    })
    /// POST
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
    
    
    /*Question Routes*/
    
    app.get('/questions/:sessionId', async (req, res, next) => {
        
        try {
            
            const questions = await Questions.findAll({
                where: {session_id: req.params.sessionId}
            })
            
            if(questions)
                res.status(201).json(OkResponse(questions))
            else
                return next(new ApiError(404, 'NotFound', 'No questions for session.'))
            
            
        } catch (e) {
            log.error(e)
            return next(new ApiError(400, 'BadRequest', e.message))
        }
    })
    
    app.post('/questions', async (req, res, next) => {
        
        try {
            
            const questionBody = req.body
            
            const question = await Questions.create(questionBody)
            
            if(question)
                res.status(201).json(OkResponse())
            else
                return next(new ApiError(403, 'InvalidRequest', 'Invalid parameters.'))
            
            
        } catch (e) {
            log.error(e)
            return next(new ApiError(400, 'BadRequest', e.message))
        }
    })
    
    /* User routes */
    app.patch('/user/:id', async (req, res, next) => {
        // load user data from the database
        try {
            
            const {email, address} = req.body
            const user = await Users.findByPk(req.params.id)
            if(user) {
                user.email = email
                user.address = address
                await user.save()
            }
            
            res.status(204).send()
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'No resource found'))
        }
    })
    
    
    /* Send emails */
    app.post('/send-email', async (req, res, next) => {
        console.log(req.body)
        const data = req.body
        //validate question
        await sendEmail(data)
        res.status(201).json(OkResponse())
    })
    
    /* Error handlers */
    
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
        // ErrorResponse shapes all errors to the same format
        res.json(ErrorResponse(err.type || 'Error', err.message, err.status || err.statusCode || 500))
    })
    
    app.listen(3001, () => {
        console.log('Express server is listing on port 3001')
    })
    return app
}
export default startServer
