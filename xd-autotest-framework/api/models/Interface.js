/**
 * Interface.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid = require('node-uuid');

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_interface',
  attributes: {
    id: {
      type: 'string',
      required: true,
      primaryKey: true,
      defaultsTo: function () {
        return uuid.v4();
      }
    },
    // base info
    //在这里把测试用例需要的参数和不需要的参数区分开


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

    //测试用例的name(collectionName)
    name: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 60
    },
    //
    item:{
      type:'array'
    },
    
    // req info
    // url: {
    //   type: 'string',
    //   required: true,
    //   minLength: 1,
    //   maxLength: 300
    // },
    // protocol: {
    //   type: 'string',
    //   enum: ['http', 'https'],
    //   defaultsTo: 'http',
    //   required: true
    // },
    // method: {
    //   type: 'string',
    //   enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
    //   defaultsTo: 'POST',
    //   required: true
    // },
    // headers: {
    //   type: 'array'
    // },
    // bodyType: {
    //   type: 'string',
    //   minLength: 1,
    //   maxLength: 30
    // },
    // requestParam: {
    //   type: 'string',
    //   required: true
    // },
    // responseParam: {
    //   type: 'string',
    //   required: true
    // },
    inputFile: {
      type: 'longtext',
      required: true
    },
    outputFile: {
      type: 'longtext',
      required: true
    }
  }
};

