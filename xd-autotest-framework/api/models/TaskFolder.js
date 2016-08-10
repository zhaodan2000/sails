/**
 * TaskFolder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_apidoc',
  attributes: {
    Task_ID:{
      type:'integer',
      autoIncrement:true,
      required:false,
      unique: true,
      primaryKey: true
    },
    Task_name:{
      type:'string',
      unique:true,
      required:true
    },
    Task_desc:{
      type:'string',
      unique:false,
      required:false,
      defaultsTo:'暂时没有任务描述。'
    },
    isFolder:{
      type:'boolean',
      required:false,
      defaultsTo:true
    },
    Schedule_ID:{
      type:'integer',
      required:true,
      defaultsTo:'1'
    }
  }
};

