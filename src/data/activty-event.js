import {ActivityEvent} from "../lib/analytics/activity-event.js"
import {EVENT_TYPES} from "../lib/database/models/enums.js"
import {DataTypes} from "sequelize"

const START_TIME = '2023-03-29T12:00:00Z'
export const createEvents = ({sessionId, userId, trackingId, contractorId}) => {
    console.log({sessionId, userId, trackingId, contractorId})
    return [
        /**** Call to Action Page ****/
        // 1. PAGE_VIEW - on entering page
        new ActivityEvent({
            eventType: EVENT_TYPES.PAGE_VIEW,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date(START_TIME),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
                referral_url: ''
            },
            eventSourcePath: '/mccullough/get-started'
        }),
        // 2. CLICK - click on call to action
        new ActivityEvent({
            eventType: EVENT_TYPES.CLICK,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date(START_TIME),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/get-started'
        }),
        // 3. SESSION_START -- new session event
        new ActivityEvent({
            eventType: EVENT_TYPES.SESSION_START,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date(START_TIME),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/get-started'
        }),
        
        /**** Survey/0 ****/
        // 1. PAGE_VIEW
        new ActivityEvent({
            eventType: EVENT_TYPES.PAGE_VIEW,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/survey/0'
        }),
        // 2. USER_ENGAGEMENT - start timing time on question track time but send on afterRoute hook
        new ActivityEvent({
            eventType: EVENT_TYPES.USER_ENGAGEMENT,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                startTime: '2023-03-29T12:30:00Z',
                endTime: '2023-03-29T12:30:00Z',
                timeOnPage: '30 seconds',
            },
            eventSourcePath: '/mccullough/survey/0'
        }),
        /**** Survey/1 ****/
        // 1. PAGE_VIEW
        new ActivityEvent({
            eventType: EVENT_TYPES.PAGE_VIEW,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/survey/1'
        }),
        // 2. USER_ENGAGEMENT - start timing time on question track time but send on afterRoute hook
        new ActivityEvent({
            eventType: EVENT_TYPES.USER_ENGAGEMENT,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                startTime: '2023-03-29T12:30:00Z',
                endTime: '2023-03-29T12:30:00Z',
                timeOnPage: '30 seconds',
            },
            eventSourcePath: '/mccullough/survey/1'
        }),
        /**** Survey/n ****/
        new ActivityEvent({
            eventType: EVENT_TYPES.PAGE_VIEW,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/survey/2'
        }),
        // 2. USER_ENGAGEMENT - start timing time on question track time but send on afterRoute hook
        new ActivityEvent({
            eventType: EVENT_TYPES.USER_ENGAGEMENT,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                startTime: '2023-03-29T12:30:00Z',
                endTime: '2023-03-29T12:30:00Z',
                timeOnPage: '30 seconds',
            },
            eventSourcePath: '/mccullough/survey/2'
        }),
        
        /**** Survey/3 ****/
        // 1. PAGE_VIEW
        new ActivityEvent({
            eventType: EVENT_TYPES.PAGE_VIEW,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/survey/3'
        }),
        // 2. USER_ENGAGEMENT - start timing time on question track time but send on afterRoute hook
        new ActivityEvent({
            eventType: EVENT_TYPES.USER_ENGAGEMENT,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                startTime: '2023-03-29T12:30:00Z',
                endTime: '2023-03-29T12:30:00Z',
                timeOnPage: '5 seconds',
            },
            eventSourcePath: '/mccullough/survey/3'
        }),
        
        /**** Survey/4 ****/
        // 1. PAGE_VIEW
        new ActivityEvent({
            eventType: EVENT_TYPES.PAGE_VIEW,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/survey/4'
        }),
        // 2. USER_ENGAGEMENT - start timing time on question track time but send on afterRoute hook
        new ActivityEvent({
            eventType: EVENT_TYPES.USER_ENGAGEMENT,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                startTime: '2023-03-29T12:30:00Z',
                endTime: '2023-03-29T12:30:00Z',
                timeOnPage: '30 seconds',
            },
            eventSourcePath: '/mccullough/survey/4'
        }),
        
        /**** Survey/5 ****/
        // 1. PAGE_VIEW
        new ActivityEvent({
            eventType: EVENT_TYPES.PAGE_VIEW,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/survey/5'
        }),
        // 2. USER_ENGAGEMENT - start timing time on question track time but send on afterRoute hook
        new ActivityEvent({
            eventType: EVENT_TYPES.USER_ENGAGEMENT,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                startTime: '2023-03-29T12:30:00Z',
                endTime: '2023-03-29T12:30:00Z',
                timeOnPage: '30 seconds',
            },
            eventSourcePath: '/mccullough/survey/5'
        }),
        /**** Survey/6 ****/
        // 1. PAGE_VIEW
        new ActivityEvent({
            eventType: EVENT_TYPES.PAGE_VIEW,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                timestamp: '2023-03-29T12:30:00Z',
                ipAddress: '',
            },
            eventSourcePath: '/mccullough/survey/6'
        }),
        // 2. USER_ENGAGEMENT - start timing time on question track time but send on afterRoute hook
        new ActivityEvent({
            eventType: EVENT_TYPES.USER_ENGAGEMENT,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                startTime: '2023-03-29T12:30:00Z',
                endTime: '2023-03-29T12:30:00Z',
                timeOnPage: '30 seconds',
            },
            eventSourcePath: '/mccullough/survey/6'
        }),
        // on survey
        
        // 1. start tracking survey start time
        new ActivityEvent({
            eventType: EVENT_TYPES.USER_ENGAGEMENT,
            sessionId, userId, trackingId, contractorId,
            timestamp: new Date('2023-03-29T12:30:00Z'),
            data: {
                startTime: '2023-03-29T12:30:00Z',
                endTime: '2023-03-29T12:40:00Z',
                timeOnPage: '10 minutes',
            },
            eventSourcePath: '/mccullough/survey/'
        }),
    ]
}
