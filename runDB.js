import 'dotenv-flow/config.js'

import DB from './src/lib/db/db.js'

const run = async () => {
  const _db = await DB()

  const { Survey } = _db.models

  let survey = await Survey.create({ name: 'test' })
  console.log(survey.toJSON())

}

run()
