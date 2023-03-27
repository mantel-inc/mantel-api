import { EventTypes } from './constants.js'
import joi from 'joi'

export const activityEventSchema = joi.object({
  sessionId: joi.string().required(),
  userId: joi.string().required(),
  contractorId: joi.string().required(),
  eventType: joi.string().allow(...Object.values(EventTypes)).required(),
  data: joi.object().required(),
  source: joi.string().required(),
  path: joi.string().required(),
})

