import { ActivityEvent } from './activity-event.js'
import { validateEvent } from './validators.js'

export const recordEvent = async ({
  sessionId,
  userId,
  contractorId,
  eventType,
  data,
  eventSourcePath,
}) => {



  const event = new ActivityEvent({
    sessionId,
    userId,
    contractorId,
    eventType,
    data,
    eventSourcePath,
  })

}
