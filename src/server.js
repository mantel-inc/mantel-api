import express from 'express'
import db from './lib/db/db.js'

const app = express()

app.use(express.json())




app.get('/hello', (req, res) => {
  console.log('Received a get request on the path /hello')
  res.send('Hello from express!')
})

const users = [
  {
    id: '123',
    name: 'John Doe',
  }, {
    id: '234',
    name: 'Jimmy Smith',
  }]

app.get('/users', (req, res) => {
  // load user data from the database
  res.json(users)
})

// GET /users/123

app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  const user = users.find(u => u.id === userId)
  res.send(user)
})

app.post('/users', (req, res) => {
  console.log(req.body)
  const newUser = req.body
  users.push(newUser)
  res.json()
  res.send(users)
})

app.listen(3001, () => {
  console.log('Express server is listing on port 3000')
})

export default app
