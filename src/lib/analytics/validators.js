import { EventTypes } from './constants.js'

export const validateEventType = (eventType) => {
  return Object.values(EventTypes).includes(eventType)
}
