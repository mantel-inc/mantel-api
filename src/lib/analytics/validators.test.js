import { test, expect } from '@jest/globals'

import { activityEventSchema } from './validators.js'

test('validateEventType: positive', () => {
  const { error, value } = activityEventSchema.validate({
    sessionId: 'some session id',
    userId: 'some user id',
    contractorId: 'ctid',
    eventType: 'page-view',
    data: {},
    source: 'web',
    path: '/survey/0',
  })
  console.log(error)
  expect(error).toBeUndefined()
})
test('validateEventType: negative', () => {
  const { error, value } = activityEventSchema.validate({
    sessionId: 'some id',
    userId: 'some user',
    contractorId: null,
    eventType: 'age-view',
    data: '',
    source: '1',
    path: '1',
  }, { abortEarly: false })
  console.log(error)
  expect(error).toBeTruthy()
  expect(error.details.map(d => d.message)).toContain('"contractorId" must be a string')
})
