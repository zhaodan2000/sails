/**
 * TaskFolder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_OrderCaseColletion',
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
      required:false,
      defaultsTo:'暂时没有任务描述。'
    },
    caseType:{
      type:'string',
      enum:['1','2'],//1表示原子case, 2表示顺序case.
      defaultsTo:'1'
    },
    Schedule_ID:{
      type:'string',
      required:true,
      defaultsTo:'1'
    },
    Schedule_desc:{
      type:'string',
      required:true,
      defaultsTo:'1'
    },
    Cases:{
      collection:'OrderCase',
      via:'OCCollectionID'
    }

  }
};

