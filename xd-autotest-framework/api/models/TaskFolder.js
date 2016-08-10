/**
 * TaskFolder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_TaskFolder',
  autoPK:true,
  attributes: {
    id:{
      type:'string',
      required:false,
      primaryKey:true
    },
    Task_name:{
      type:'string',
      unique:false,
      required:true
    },
    Task_desc:{
      type:'string',
      unique:false,
      required:false,
      defaultsTo:'暂时没有任务描述。'
    },
    Schedule_ID:{
      type:'integer',
      required:true,
      defaultsTo:'1'
    },
    Schedule_desc:{
      type:'string',
      required:true,
      defaultsTo:'1'
    },
    Cases:{
      collection:'TaskCase',
      via:'TaskID'
    }

  }
};

