     /**
 * TaskOrderCaseFolder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_TaskCase',
  autoPK:true,
  attributes: {
    id:{
      type:'string',
      required:false,
      primaryKey:true
    },
    //request name
    name: {
      type: 'string',
      required: true,
      minLength: 1,
      unique:false,
      maxLength: 60
    },

    //auth 开发人员
    dev:{
      type:'string',
      required: false
    },

    //可用状态
    disabled:{
      type:'boolean',
      required: false
    },

    version: {
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 20
    },

    description: {
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 300
    },

    //url
    url: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 300
    },

    //param json
    queryParam:{
      type:'json',
      required: false
    },

    method: {
      type: 'string',
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
      defaultsTo: 'POST',
      required: false
    },

    //header Json
    headers: {
      type: 'json',
      required: false
    },

    //body
    mode: {
      type: 'string',
      enum:['raw', 'formdata', 'urlencoded','file'],
      required: false
    },

    //response
    response: {
      type: 'json',
      required: false
    },

    dirpath:{
      type:'string',
      required:false,
      defaultsTo:'/默认'
    },
    //preScript 前置脚本
    prescript:{
     type:'string',
     required:false
    },
    //testscript  后置脚本
    testscript:{
       type:'string',
       required:false
    },
    TaskID:{
      model:'TaskFolder'
    }
  }
};

