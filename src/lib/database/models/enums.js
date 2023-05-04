import {DataTypes} from "sequelize"

export const STATUSES = {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    ABANDONED: 'abandoned',
    ENDED: 'ended',
    GRACEFUL_EXIT: 'graceful-exit'
}
export const PRODUCT_TYPES = {
    CENTRAL_AC: 'central_ac',
    ASHP: 'ashp',
    FURNACE: 'furnace',
    BOILER: 'boiler',
}
export const HVAC_SYSTEM_TYPES = {
    SPLIT: 'split', PACKAGED: 'packaged',
}

export const ENTITY_TYPES = {
    UTILITY: 'utility',
    FEDERAL: 'federal',
    LOCAL: 'local',
    STATE: 'state',
}
export const EVENT_TYPES = {
    PAGE_VIEW: 'page-view',
    USER_ENGAGEMENT: 'user-engagement',
    CLICK: 'click',
    SESSION_START: 'session-start',
    SESSION_END: 'session-end',
}
export const OPTION_TYPES = {
    COOLING: 'cooling', HEATING: 'heating', COOLING_HEATING: 'cooling_heating',
}

export const UTILITY_TYPES = {
    ELECTRICITY: 'electricity', NATURAL_GAS: 'natural_gas', NONE: 'none',
}

export const ENERGY_SOURCES = {
    ELECTRICITY: 'electricity', NATURAL_GAS: 'natural_gas', NONE: 'none',
}

export const EventTypes = DataTypes.ENUM(...Object.values(EVENT_TYPES))
