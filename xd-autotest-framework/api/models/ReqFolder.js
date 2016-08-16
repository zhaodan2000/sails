/**
 * ReqFolder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_ReqFolder',
  autoPK:true,
  attributes: {
    id:{
      type:'string',
      required:false,
      primaryKey:true
    },
    name:{
      type:'string',
      unique:true,
      required:true
    },
    desc:{
      type:'string',
      unique:false,
      required:false,
      defaultsTo:'暂时没有任务描述。'
    },
    ReqItems:{
      collection:'RequestItem',
      via:'ReqFolderID'
    }
  }
};

