/**
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  connection: 'someMysqlServer',
  tableName: 'admin_admin',
  attributes: {
    id: {
      type: 'integer',
      required: true,
      primaryKey: true
    },
    user_name: {
      type: 'String',
      required: true
    },
    password: {
      type: 'String',
      required: true
    },
    salt: {
      type: 'String',
      required: true
    },
    createdAt:{
      type: 'String',
      required: false
    },
    updatedAt:{
      type:'String',
      required:false
    }
  }
};





