/**
 * Created by lyh on 8/5/16.
 */

module.exports={
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_apidoc',
  autoPK:true,
  attributes: {
    id: {
      type: 'string',
      required: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    testEnv:{
      type:'string',
      required:false,
      defaultsTo:'192.168.103.101:8020'
    },
    docDesc:{
      type:'string',
      required:false,
      defaultsTo:'文档中所有接口参数传递均使用req包装的方式，所有参数指代req解析后的参数键值对。'
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
