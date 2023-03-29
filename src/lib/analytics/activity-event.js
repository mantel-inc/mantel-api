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
     * trackingId
     * @type {string}
     */
    trackingId = ''
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
    
    constructor({
                    sessionId,
                    userId,
                    trackingId,
                    contractorId,
                    eventType,
                    data,
                    timestamp,
                    eventSourcePath,
                }) {
        this.sessionId = sessionId
        this.userId = userId
        this.trackingId = trackingId
        this.contractorId = contractorId
        this.eventType = eventType
        this.data = data
        this.timestamp = timestamp
        // this.eventSource = source
        this.eventSourcePath = eventSourcePath
        
    }
}

// console.log(new Event({userId:'hi'}))
