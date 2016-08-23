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
    uniqID:{
      type:'string',
      required:false,
      unique:true,
      defaultsTo:(new Date().getTime()).toString()
    },
    name: {
      type: 'string',
      required: false,
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

