

export class ActivityEvent {
  /**
   * sessionId of the session for the user
   */
  sessionId = ''
  /**
   * userId which is the Google Analytics identifier
   */
  userId = ''
  /**
   * contractorId
   */
  contractorId = ''
  /**
   * event type
   */
  eventType = ''
  /**
   * event data payload
   */
  data = {}
  /**
   * source of the event. i.e. web ios android
   */
  eventSource = 'incentive-scout:web'

  /**
   * path of page where the event occurred
   */
  eventSourcePath = ''

  constructor ({
    sessionId,
    userId,
    contractorId,
    eventType,
    data,
    source,
    path,
  }) {
    this.sessionId = sessionId
    this.userId = userId
    this.contractorId = contractorId
    this.eventType = eventType
    this.data = data

    // this.eventSource = source
    this.eventSourcePath = path
  }
}

// console.log(new Event({userId:'hi'}))
