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
    uniqID:{
      type:'string',
      required:false,
      unique:true
    },
    name: {
      type: 'string',
      required: false
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
      required: false
    },

    description: {
      type: 'string',
      required: false
    },
    //url
    url: {
      type: 'string',
      required: false
    },

    //param json
    queryParam:{
      type:'json',
      required: false
    },

    method: {
      type: 'string',
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
      required: false
    },

    //header (Json format)
    headers: {
      type: 'json',
      required: false
    },

    //content-type
    mode: {
      type: 'string',
      required: false
    },

    //response
    response: {
      type: 'json',
      required: false
    },
    // 二级目录(暂未用上)
    dirpath:{
      type:'string',
      required:false
    },
    //顺序
    sequence:{
      type:'integer',
      required:false
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

