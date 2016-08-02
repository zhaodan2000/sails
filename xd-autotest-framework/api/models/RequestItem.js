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
  attributes: {
    id: {
      type: 'string',
      required: true,
      primaryKey: true,
      defaultsTo: function () {
        return uuid.v4();
      }
    },
    //auth 开发人员
    dev:{
      type:'string',
      required: true
    },

    //可用状态
    disabled:{
      type:'bool',
      defaultsTo:false,
      required: true
    },

    version: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 20
    },

    description: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 300
    },

    //request name
    name: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 60
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
      required: true
    },

    method: {
      type: 'string',
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
      defaultsTo: 'POST',
      required: true
    },

    //header Json
    headers: {
      type: 'json',
      required: true
    },

    //body
    mode: {
      type: 'string',
      enum:['raw', 'formdata','urlencoded','file'],
      defaultsTO: 'urlencoded',
      required: true
    },

    //response
    response: {
      response: 'json',
      required: true
    }

  }
};

