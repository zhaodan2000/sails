/**
 * Created by lyh on 8/5/16.
 */

module.exports={
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_docitem',
  //autoPK:true,//ID自动增加
  attributes: {
    id:{
      type:'string',
      unique:true,
      //autoIncrement:true,
      //required:true,
      primaryKey:true
    },
    name: {
      type: 'string',
      unique: true,
      required: true,
    },
    apiversion:{
      type:'string',
      unique:false,
      required:false
    },
    dev:{
      type:'string',
      required:false
    },
    disabled:{
      type:'boolean',
      required:false,
      defaultsTo:false
    },
    description:{
      type:'string',
      required:false
    },
    url:{
      type:'string',
      required:true,
      unique:true
    },
    method:{
      type:'string',
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
      defaultsTo: 'POST',
      required:false
    },
    dataType:{
      type:'string',
      enum:['json','x-www-form-urlencoded','form-data','raw','binary'],
      required:false,
      defaultsTo:'x-www-form-urlencoded'
    },
    header:{
      type:'json',
      required:false,
      defaultsTo:{
        "module":"2",
        "version":"",
        "clientType":"ios",
        "clientIp":"192.168.1.1",
        "deviceId":"888",
        "sessionToken":""
      }
    },
    queryParams:{
      type:'json',
      required:false,
      defaultsTo:{"req":""}
    },
    response:{
      type:'json',
      //required:true
    },
    /**
     * doc与docItem建立关联。
     * 顺序:先create/update docItem,再populate doc.
     * */
    docID: {
      model:'doc'
    }


  }
}
