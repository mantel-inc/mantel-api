import { EventTypes } from './constants.js'
import joi from 'joi'

export const activityEventSchema = joi.object({
  sessionId: joi.string().min(2).required(),
  userId: joi.string().min(2).required(),
  contractorId: joi.string().min(2).required(),
  eventType: joi.string().allow(...Object.values(EventTypes)).required(),
  data: joi.object().required(),
  source: joi.string().min(2).required(),
  path: joi.string().min(2).required(),
})

