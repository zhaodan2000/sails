/**
 * Created by xiaodou_chenxiaoxiang on 16/7/28.
 */

/**
 * Interface.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid = require('node-uuid');

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_request',
  autoPK:true,
  attributes: {
    id: {
      type: 'string',
      required: false,
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
    //content-type
    mode: {
      type: 'string',
      required: false
    },
    method: {
      type: 'string',
      //enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
      required: false
    },
    //header Json
    headers: {
      type: 'json',
      required: false
    },
    //param json
    queryParam:{
      type:'json',
      required: false
    },
    //response
    response: {
      type: 'json',
      required: false
    },
    testscript:{
      type:'string',
      required: false
    },
    prescript:{
      type:'string',
      required: false
    },
    ReqFolderID:{
      model:'ReqFolder'
    }


  }
};

