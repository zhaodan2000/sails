/**
 * Created by lyh on 8/5/16.
 */

module.exports={
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_doc',
  autoPK: true,
  attributes: {
    id: {
      type: 'string',
      required: false,
      unique: true,
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
    testEnv:{
      type:'string',
      required:false,
      defaultsTo:'192.168.103.101'
    },
    testEnvPort:{
      type:'string',
      required:false
    },
    docDesc:{
      type:'string',
      required:false,
      defaultsTo:'接口文档描述。'
    },

    /**
     * 一个APIdoc与docItem是one-to-many的关系,
     * 可通过doc与docItem的引用指向来相互关联,
     * 参考:http://sailsjs.org/documentation/concepts/models-and-orm/associations/one-to-many
     * */
    APIdoc_items: {
      collection: 'APIdocitem',
      via: 'APIdocID'
    }
  }
}
