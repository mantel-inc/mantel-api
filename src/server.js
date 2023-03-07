import express from 'express'
import db from './lib/db/db.js'

const app = express()

app.use(express.json())

const response = (data) => {
  return {
    data,
  }
}

const surveys = [
  {
    id: '123',
    name: 'HVAC Incentives',
    version: '2023.03.00',
  }, {
    id: '123',
    name: 'HVAC Incentives',
    version: '2023.03.00',
  }]

app.get('/surveys', (req, res) => {
  // load user data from the database
  res.status(200).json(response(surveys))
})

// GET /users/123
app.get('/surveys/:id', (req, res) => {
  // load user data from the database
  const surveyId = req.params.id
  const survey = surveys.find(u => u.id === surveyId)
  res.status(200).json(response(survey))
})

app.post('/surveys', (req, res) => {
  console.log(req.body)
  const newSurvey = req.body
  // users.push(newUser)

  res.status(200).json(response({ data: 'surveyId' }))
})
app.post('/questions', (req, res) => {
  console.log(req.body)
  const newQuestion = req.body
  //validate question

  res.status(200).json(response({ data: 'questionId' }))
})
app.listen(3001, () => {
  console.log('Express server is listing on port 3000')
})

export default app
