/**
 * Created by lyh on 8/5/16.
 */

module.exports={
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_apidocitem',
  autoPK:true,//PrimaryKey ID自动增加
  attributes: {
    id:{
      type:'string',
      autoIncrement:true,
      unique:true,
      primaryKey:true
    },
    uniqID:{
      type:'string',
      required:false,
      unique:true,
      defaultsTo:(new Date().getTime()).toString()
    },
    name: {
      type: 'string',
      required: false,
    },
    url:{
      type:'string',
      required:false
    },
    apiversion:{
      type:'string',
      unique:false,
      required:false,
      defaultsTo:"1.0.0"
    },
    dev:{
      type:'string',
      required:false,
      defaultsTo:""
    },
    disabled:{
      type:'boolean',
      required:false,
      defaultsTo:false
    },
    description:{
      type:'string',
      required:false,
      defaultsTo:"暂无接口描述"
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
        "version":"1.0",
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
      defaultsTo:{"retcode":"0",
        "retOk":true,
        "retdesc":"操作成功",
        "message":""
      }
    },
    /**
     * doc与docItem建立关联。
     * 顺序:先create/update docItem,再populate doc.
     **/
    APIdocID: {
      model:'APIdoc'
    }


  }
}
