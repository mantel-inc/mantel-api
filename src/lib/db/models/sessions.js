import { DataTypes } from 'sequelize'
import { STATUSES } from './enums.js'

/**
 *
 * CREATE TABLE "session" (
 *   "id" guid PRIMARY KEY,
 *   "tracking_id" varchar,
 *   "contractor_id" guid,
 *   "status" status,
 *   "start_time" timestampz,
 *   "end_time" timestampz
 * );
 */
export default {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
  },
  tracking_id: {
    type: DataTypes.UUID,
  },
  user_id: {
    type: DataTypes.UUID,
  },
  contractor_id: {
    type: DataTypes.UUID,
  },
  status: {
    type: DataTypes.ENUM,
    values: [...Object.values(STATUSES)],
  },
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE,
}
