/**
 * ScheduleTask.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_ScheduleTask',
  autoPK:true,
  attributes: {
    id:{
      type:'string',
      required:false,
      primaryKey:true
    },
    sc_id:{
      type:'string',
      required:false,
      unique:true
    },
    sc_name:{
      type:'string',
      required:false
    },
    sc_desc:{
      type:'string',
      unique:false,
      required:false
    },
    sc_type:{
      type:'string',
      enum:['1','2'],//1表示策略, 2表示任务.
      defaultsTo:'1'
    },
    sc_task_id:{
      type:'string',
      required:false
    },
    sc_task_name:{
      type:'string',
      required:false
    },
    sc_host:{
      type:'string',
      required:false
    },
    sc_time:{
      type:'string',
      required:false
    },
    sc_state:{
      type:'string',
      required:false,
      enum:['1','2'],//1表示开启, 2表示关闭.
      defaultsTo:'2'
    }
  }
};
