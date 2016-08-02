/**
 * Created by lyh on 7/28/16.
 */

module.exports={
 // connection:'someMongodbServer',
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_lyhtest',
  attributes:{
    name:{
      type:'string'
    },
    wingspn:{
      type:'float',
      required:true
    },
    wingspanUnits:{
      type:'string',
      enum:['cm','in','m','mm'],
      defaultsTo:'cm'
    }
    /**,
    knownDialect:{
      collection:'Dialect'
    }*/


  }

}
