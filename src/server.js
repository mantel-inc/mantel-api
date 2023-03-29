import express from 'express'
import db from './lib/database/db.js'
import sendEmail from './lib/email-client.js'
import cors from 'cors'
import helmet from "helmet"
import {okResponse, errorResponse} from "./lib/responses/index.js"
import {ApiError} from "./lib/errors/index.js"

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use([
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
    express.json(), express.urlencoded({extended: false})
])

const surveys = [{
    id: '123', name: 'HVAC Incentives', version: '2023.03.00',
}, {
    id: '123', name: 'HVAC Incentives', version: '2023.03.00',
}]

app.get('/contractors', (req, res) => {
    // load user data from the database
    res.status(400).json(okResponse())
    // res.error
})

app.get('/contractors/search', (req, res) => {
    // load user data from the database
    const {contractorName} = req.query.contractorName
    // query database by name
    res.status(400).json(okResponse())
    // res.error
})

// *********** SESSIONS *********** //

// GET /session/123
app.get('/sessions/:id', (req, res) => {
    // load user data from the database
    const surveyId = req.params.id
    const survey = surveys.find(u => u.id === surveyId)
    res.status(200).json(okResponse(survey))
})

app.post('/session', (req, res, next) => {
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
    
    
    res.status(200).json(okResponse({sessionId}))
})


// GET /users/123
app.get('/surveys/:id', (req, res) => {
    // load user data from the database
    const surveyId = req.params.id
    const survey = surveys.find(u => u.id === surveyId)
    res.status(200).json(okResponse(survey))
})

app.post('/surveys', (req, res) => {
    console.log(req.body)
    const newSurvey = req.body
    // users.push(newUser)
    
    res.status(200).json(okResponse({data: 'surveyId'}))
})

app.get('/surveys/:surveyId/questions', (req, res) => {
    // load user data from the database
    const surveyId = req.params.id
    const survey = surveys.find(u => u.id === surveyId)
    res.status(200).json(okResponse(survey))
})

app.post('/questions', (req, res) => {
    console.log(req.body)
    const newSurvey = req.body
    // users.push(newUser)
    
    res.status(200).json(okResponse({data: 'surveyId'}))
})

/**
 * email
 */
app.post('/send-email', async (req, res) => {
    console.log(req.body)
    const data = req.body
    //validate question
    await sendEmail(data)
    res.status(200).json(okResponse({data: 'questionId'}))
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
    
    res.json(errorResponse(err.type || 'Error', err.message, err.status || err.statusCode || 500))
})

app.listen(3001, () => {
    console.log('Express server is listing on port 3001')
})

export default app
