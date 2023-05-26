import {STATUSES} from "./database/models/enums.js"
import {Op} from "sequelize"


export const abandonStaleSessions = async (db) => {
    console.log(`checking for stale sessions`)
    
    const {Sessions} = db.models
    const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    console.log(yesterday)
    const staleSessions = await Sessions.findAll({
        where: {
            [Op.and]: [
                {status: 'active'},
                {
                    start_time: {
                        [Op.lte]: yesterday.toISOString()
                    }
                },
            ]
        }
    })
    console.log(`abandoning ${staleSessions.length} sessions`)
    if(staleSessions.length) {
        for(let i = 0; i < staleSessions.length; i++) {
            const session = staleSessions[i]
            session.status = STATUSES.ABANDONED
            session.end_time = new Date()
            await session.save()
        }
    }
}
