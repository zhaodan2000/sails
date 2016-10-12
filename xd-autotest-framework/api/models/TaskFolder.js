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
    uniqID:{
      type:'string',
      required:false,
      unique:true
    },
    Task_name:{
      type:'string',
      required:false
    },
    Task_desc:{
      type:'string',
      unique:false,
      required:false
    },
    caseType:{
      type:'string',
      enum:['1','2']//1表示原子case, 2表示顺序case.
    },
    Schedule_ID:{
      type:'string',
      required:true
    },
    Schedule_desc:{
      type:'string',
      required:true,
    },
    Cases:{
      collection:'TaskCase',
      via:'TaskID'
    }

  }
};

