import express from 'express'
import cors from 'cors'
import helmet from "helmet"
import {OkResponse, ErrorResponse} from "./lib/responses/index.js"
import {ApiError} from "./lib/errors/index.js"
import sendEmail from './lib/email-client.js'
import {Op} from "sequelize"
import pino from 'pino-http'
import requestLogger from "./lib/middleware/request-logger.js"

const startServer = (db) => {
    const _db = db
    const app = express()
    app.disable('x-powered-by')
    app.set('trust proxy', 1)
    app.use([
        pino({
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
            methods: 'GET,PUT,POST,DELETE,OPTIONS',
            preflightContinue: true,
            headers: ['Content-type', 'Authorization', 'Accept', 'X-Access-Token', 'X-Key'],
        }),
        express.json(),
        express.urlencoded({extended: false}),
        // requestLogger()
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
    
    /*** Activity Events****/
    app.post('/events', async (req, res, next) => {
        console.log(req.body)
        const session = req.body
        
        // check if session exists
        if(session)
            return next(new Error(''))
        // check if tracking id exists in contact-infos
        
        /*
        * session = {
        trackingId: 'GA1.1.624216961.1679552796',
        id: "a08cf48d-5132-49a6-be49-bff1246595b2",
        userId: "4e8515d6-1255-4044-b8a2-4d0237222d26",
        startTime: "2023-03-29T08:48:31.148Z",
        state: "initiated",
        contractor: {
            "name": "McCullough Heating & Air Conditioning",
            "displayName": "McCullough",
            "contractorId": "dd4e55e4-bdd3-11ed-9a5f-3aebb006c675",
            "region": ["south"],
            "scoutReportEmailRecipients": ["al@coolmenow.com"],
            "urlPathName": "mccullough",
            "mainWebsiteUrl": "https://coolmenow.com/"
        }
    }
        * */
        
        
        res.status(200).json(OkResponse({sessionId}))
    })
    
    
    app.get('/contractors', async (req, res, next) => {
        // load user data from the database
        try {
            const contractors = await Contractors.findAll() || []
            // console.log(contractors)
            res.status(200).json(OkResponse(contractors.map(c => c.toJSON())))
        } catch (e) {
            return next(new ApiError(400, e.message, 'BadRequest'))
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
                return next(new ApiError(404, 'NotFound', `no contractors found matching name: ${name}`))
            
        } catch (e) {
            return next(new ApiError(404, 'Not Found'))
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
            return next(new ApiError(404, 'Not Found'))
        }
    })
    
    app.get('/contractors/:id/options', async (req, res, next) => {
        // load user data from the database
        const {id} = req.params
        // query database by name
        try {
            const options = await ContractorOptions.findAll({where: {contractor_id: id}}) || []
            res.status(200).json(OkResponse(options))
        } catch (e) {
            return next(new ApiError(404, 'NotFound'))
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
            return next(new ApiError(404, 'NotFound'))
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
            return next(new ApiError(404, 'NotFound'))
        }
    })
    
    
    app.get('/incentives', async (req, res, next) => {
        // load user data from the database
        const {id} = req.params
        // query database by name
        try {
            const data = await Incentives.findAll() || []
            res.status(200).json(OkResponse(data))
        } catch (e) {
            return next(new ApiError(404, 'NotFound'))
        }
    })


// *********** SESSIONS *********** //

// GET /session/123
    app.get('/sessions', async (req, res, next) => {
        // load user data from the database
        try {
            
            const surveyId = req.params.id
            const session = await Sessions.findAll() || []
            res.status(200).json(OkResponse(session))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'no resource found'))
        }
    })
    app.get('/sessions/:id', async (req, res, next) => {
        // load user data from the database
        try {
            
            const surveyId = req.params.id
            const session = await Sessions.findByPk(req.params.id)
            res.status(200).json(OkResponse(session))
        } catch (e) {
            return next(new ApiError(404, 'NotFound', 'no resource found'))
        }
    })
    
    app.post('/session/create', async (req, res, next) => {
        console.log(req.body)
        try {
            const sessionData = req.body
            
            
            const oldSession = await Sessions.findOne({
                where: {
                    tracking_id: {
                        [Op.eq]: req.body.tracking_id
                    }
                }
            })
            //TODO handle session logic
            if(oldSession) {
                return next(new ApiError(400, 'BadRequest', `a session already exists with sessionId = ${oldSession.id}`))
            }
            const newSession = await Sessions.create({...sessionData})
            const locationUrl = `/session/${newSession.id}`
            res.location(locationUrl)
            res.status(201).json(OkResponse({success: true}))
        } catch (e) {
            req.log.error(e)
            return next(new ApiError(404, 'NotFound', 'no resource found'))
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
            return next(new ApiError(404, 'NotFound', 'no resource found'))
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
            return next(new ApiError(404, 'NotFound', 'no resource found'))
        }
    })
    
    app.post('/questions', async (req, res, next) => {
        console.log(req.body)
        const newSurvey = req.body
        // users.push(newUser)
        
        res.status(200).json(OkResponse({data: 'surveyId'}))
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
        return next(new ApiError(404, 'Not Found', 'NotFound'))
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
