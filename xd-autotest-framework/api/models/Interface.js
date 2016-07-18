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
    name: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 60
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

    // req info
    url: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 300
    },
    protocol: {
      type: 'string',
      enum: ['http', 'https'],
      defaultsTo: 'http',
      required: true
    },
    method: {
      type: 'string',
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
      defaultsTo: 'GET',
      required: true
    },
    headed: {
      type: 'array'
    },
    bodyType: {
      type: 'string',
      minLength: 1,
      maxLength: 30
    },
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

