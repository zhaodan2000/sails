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
      unique:true
    },
    name: {
      type: 'string',
      required: false
    },
    description:{
      type:'string',
      required:false
    },
    //前置脚本
    prescript:{
      type:'string',
      required: false
    },
    //后置脚本
    testscript:{
      type:'string',
      required: false
    },
    url:{
      type:'string',
      required:false
    },
    apiversion:{
      type:'string',
      unique:false,
      required:false
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
    method:{
      type:'string',
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
      defaultsTo: 'POST',
      required:false
    },
    dataType:{
      type:'string',
      required:false
    },
    header:{
      type:'json',
      required:false
    },
    queryParams:{
      type:'json',
      required:false
    },
    response:{
      type:'json',
      required:false
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
