import { test, expect } from '@jest/globals'

import { activityEventSchema } from './validators.js'

test('validateEventType: positive', () => {
  const { error, value } = activityEventSchema.validate({
    sessionId: '1',
    userId: '1',
    contractorId: '1',
    eventType: 'page-view',
    data: {},
    source: '1',
    path: '1',
  })
  console.log(error)
  expect(error).toBeUndefined()
})
test('validateEventType: negative', () => {
  const { error, value } = activityEventSchema.validate({
    sessionId: '1',
    userId: '1',
    contractorId: null,
    eventType: 'age-view',
    data: '',
    source: '1',
    path: '1',
  }, { abortEarly: false })
  console.log(error)
  expect(error).toBeUndefined()
})
