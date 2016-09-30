/**
 * ReqFolder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_CaseCollection',
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
      required: false,
    },
    desc:{
      type:'string',
      unique:false,
      required:false
    },
    docName:{
      type:'string',
      unique:false,
      required:false
    },
    testEnv:{
      type:'string',
      unique:false,
      required:false
    },
    testEnvPort:{
      type:'string',
      unique:false,
      required:false
    },
    CaseItems:{
      collection:'Case',
      via:'CaseCollectionID'
    }
  }
};

