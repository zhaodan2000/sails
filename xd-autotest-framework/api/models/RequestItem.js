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
    auth:{
      type:'string',
      required: true,
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

    //url    将被转化为Url对象进行配置
    url: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 300
    },
    //param json->jsonString  param 将会添加到Url中
    queryParam:{
      type:'string',
      required: true
    },

    method: {
      type: 'string',
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
      defaultsTo: 'POST',
      required: true
    },

    //headerString = 'Content-Type: application/json\nUser-Agent: MyClientLibrary/2.0\n';存储时应该把JSON转化为JSONString
    headers: {
      type: 'string',
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

