/**
 * Schedule_Strategy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_ScheduleStrategy',
  autoPK:true,
  attributes: {
    id: {
      type: 'string',
      required: false,
      primaryKey: true
    },
    schedule_time: {
      type: 'string',
      required: false,
    },
    day_of_week: {
      type: 'string',
      enum: ['-', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','workday'],
      required: false,
      defaultsTo: '-'
    },
    schedule_period: {
      type: 'string',
      enum: ['-', 'daily', 'weekly'],
      required: false,
      defaultsTo: '-'
    },
    schedule_desc: {
      type: 'string',
      required: true
    }
  }
};

