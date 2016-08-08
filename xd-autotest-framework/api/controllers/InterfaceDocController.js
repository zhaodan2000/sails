/**
 * InterfaceDocController
 *
 * @description :: Server-side logic for managing Interfacedocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs=require('fs');
var path=require('path');


module.exports = {

  testService:function(req,res){
    res.view('doc/APIdoc');

  },

  test:function(req,res){
    //mongoService.deletAllRecords(docItem);
    var data;
    mongoService.findAll('RequestItem', function(records){
      data=records;
    });
    res.send(data);
    /**
    mongoService.findAll(docItem, function(records){
      data=records;
    })**/
  },

  createDoc:function(req,res){
    var queryString=req.param("docName");
    console.log(queryString);

    var isExisted=false;
    var _doc;
    doc.find({name:queryString}).exec(function (records) {
      if(records){
        console.log("\r\n查找doc成功!");
        console.log(records);
        isExisted=true;
        _doc={retcode:0,retdesc:'success',data:records};
      }else{
        console.log("\r\n查找doc失败...");
        _doc={retcode:-1, retdesc:"find failed..",data:records};
      }
    });

    if(_doc.retcode===-1){
      doc.create({id:new Date().getMilliseconds().toString(),name:queryString}).exec(function(err,records){
        if(!err){
          console.log("插入成功");
          console.log(records);
        }else{
          console.log("插入失败...");
        }
      })
    }
    res.send(_doc);

  },


  /**
   * 根据doc name查找doc.
   * */
  findDocByName:function(req,res){
    var queryString=req.param("docName");
    console.log(queryString);

    var _doc;
    if(queryString){

    }
    doc.find({name:queryString}).exec(function (records) {
      if(records){
        console.log("\r\n查找doc成功!");
        console.log(records);
        _doc={retcode:0,retdesc:'success',data:records};
      }else{
        console.log("\r\n查找doc失败...");
        _doc={retcode:-1, retdesc:"find failed..",data:records};
      }
    });

    res.send(_doc);
  },

  /**
   * 将doc与docItem存入db中,其中doc:docItem=1:N
   * */
  saveDoc2db: function(req,res){
    console.log("\r\nreq.body is:")
    console.log(req.body);
    var filename=req.body.filename;
    var requestItem=JSON.parse(req.body.reqItem);
    //var requestItem=jQuery.parseJSON(req.body.reqItem);

    console.log("\r\nJSON.parse(req.body.reqItem) is:");
    console.log(requestItem);

    var isDocExisted=false;
    var record;
    doc.find({name:req.body.filename}).exec(function(records){
      if(records){
        isDocExisted=true;
        record=records;
        console.log("doc.find({name:%s}) is %s",req.body.filename, records);
      }else{
        console.log("did not find doc with name '%s'", req.body.filename);
      }
    });

    var _doc;
    if(!isDocExisted){//创建doc对象
      _doc={id:new Date().getTime().toString(), name:req.body.filename};
      //var _docJson=JSON.stringify(_doc); **********教训: 将js中的object转换为jsonString后,插入mongodb的表中会报错"无法解析表的字段名"***************
      //console.log(_docJson);

      doc.create(_doc,function(err, records){
        if(!err) {
          console.log("inserted doc row is:"+JSON.stringify(records,null,"\t"));
        }else{
          console.log(err);
        }
      });
    }else{
      _doc=record;
    }

    var isDocItemExisted=false;
    var docitem_record;
    docItem.find({docID:_doc.id,name:requestItem['name']}).exec(function(records){
      if(records){
        isDocItemExisted=true;
        docitem_record=records;
        console.log("docItem.find({docID:%s,name:%s}) is %s",_doc.id, requestItem['name'], records);
      }
    });

    var _docItem;
    if(!isDocItemExisted){
      console.log("requestItem.name="+requestItem['name']);
      console.log("requestItem.name="+requestItem['url']);
      _docItem={docID:_doc.id, name:requestItem['name'], url:requestItem['url']};
      docItem.create(_docItem, function(err, records){
        if(!err) {
          console.log("\r\ninserted docItem is:");
          console.log(records);
        }else{
          console.log(err);
        }
      });
    }else{
      _docItem=docitem_record;
    }

    var _docs;
    doc.find().populate('doc_items').exec(function(err,docs){
      if(!err){
        console.log("try to find docs:");
        console.log(docs);
        _docs=docs;
      }else{
        console.log(err);
        _docs=null;
      }
    });

    res.send(_docs);

  },

/**
 * 写文件或追加文件
 * */
  handleFileWrite:function(req,res) {

    console.log("current path:"+__dirname);
    console.log(req);

   /**
    * 读取文件目录是否存在。
    * */
    var mdFiledir=__dirname+'/mdFiles';
    fs.exists(mdFiledir,function(exists) {
      /**
       * 创建目录,如果目录不存在的话。
       * */
      if(!exists){
        fs.mkdir(mdFiledir,function(err){
          if(!err){
            console.log("目录已经创建成功。");
            return;
          }else{
            console.log("目录创建失败。");
            return;
          }
        });
      }else{console.log("目录已经存在,不需要再创建...");}
    });

    var filename=req.body.filename;
    var filecontent=req.body.filecontent;
    var w_data = new Buffer(filecontent);

    /**
     * filename, 必选参数，文件名
     * data, 写入的数据，可以字符或一个Buffer对象
     * [options],flag,mode(权限),encoding
     * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
     */
    /**
     fs.writeFile(filename,data,[options],callback);
     var w_data = '这是一段通过fs.writeFile函数写入的内容；\r\n';

    fs.writeFile(mdFiledir + '/test.md', w_data, {flag: 'a'}, function (err) {
      if(err) {
        console.error(err);
      } else {
        console.log('写入成功');
      }
    }); */

    // fs.appendFile(filename,data,[options],callback);

    //fs.appendFile(mdFiledir + '/'+filename, '***使用fs.appendFile追加文件内容', function () {
    fs.appendFile(mdFiledir + '/'+filename, filecontent,function () {
      console.log('追加内容完成');
    });
  },

  /**
   * 根据入参的name, 来查找mongodb里的符合条件的记录。
   **/

    findRequestItemByName:function(req,res) {

    console.log("req.param()="+req.param("requestName"));
    console.log("req.url="+req.url);
    console.log("req.method="+req.method);
    console.log("req.host="+req.host);
    //var response={requestName:'newLogin',url:'http://192.168.103.101:8002/user/newLogin'};
    //var retres = {retcode: 0, retdesc: "success", data: response};
   // res.send(retres);
    //return response;

      mongoService.findRequestItemByName(req.param("requestName"), function (records) {
        if (records) {
          console.log(JSON.stringify(records));
          var retres = {retcode: 0, retdesc: "success", data: records};
          res.send(retres);
        }
        else
          res.send({retcode: -1, retdesc: "syserror"})
      });




  },

  /**
   * 删除MongoDB中的记录。
   * @param req
   * @param res
     */
    deleteRecordsByID:function(req,res){
        //var name="";
      RequestItem.destroy({name:'home'}).exec(function(err){
          //console.log("删除，ID："+name);
          //cb(null);
        });

      },

  /**
    * 删除所有MongoDB中的requestItem记录。
    * */
  deleteAllRequestItemRecords:function(req,res){
    RequestItem.destroy().exec(function(err){
      if(!err){
        console.log("删除所有requestItem records成功!");
      }else{
        console.log("删除所有requestItem records失败。。。");
      }
    });

},


  /***
   * 生成一个接口MongoDB记录。
   * @param req
   * @param res
     */
  insertRequestItemService:function(req,res){
    /**
      var apiItem={id:"6",dev:"lidehong",disabled:false,name:"HOME6",
        url:"http://192.168.103.101:8020/selftaught/home",
        queryParam:{req:""},
        version:"1.0.0",description:"test !!!",method:"POST",headers:{module:"2",
          clientType:"ios",version:"1.0.0",clientIp:"127.0.0.1",deviceId:"testDeviceId123456",sessionToken:"token123"},
        mode:"urlencoded",response:""};
*/
    if(req.body.hasOwnProperty("req")) // true)
    {
      var apiItem=req.body['req'];
      console.log(JSON.stringify(apiItem));
      mongoService.insertRequestItemRecord(apiItem,function(records){
        console.log("return records="+JSON.stringify(records));
        if (records) {
          var retres = {retcode: 0, retdesc: "success", data: records};
          res.send(retres);
        }
        else
          res.send({retcode: -1, retdesc: "syserror",msg:"重复插入记录了."});
      });
    }else{
      console.log("req.body.hasOwnProperty(\"req\") 返回"+req.body.hasOwnProperty("req"));
    }


  },

  /**
   * 根据ID来更新记录内容。
   * @param req
   * @param
   * */
  updateRequestItemByName: function(req,res){
    mongoService.updateRequestItem(requestItem);
  },

  /***
   * 写入自定义
   * @param req
   * @param res
     */
  testmyservice:function(req,res){
    /**
    var apiItem={id:"1",dev:"李德洪",disabled:false, version:"1.0.0",description:"登录接口newLogin",name:"登录接口newLogin",
      url:'http://192.168.88.242:8002/user/newLogin', queryParam:"req={\"platform\":\"local\",\"phoneNum\":\"13600800800\", " +
      "\"pwd\":\"123456\",\"registrationId\":\"testID123456\"}"};
    */

    var item={name:"Polly222",wingspn:"168.5000"};

    InterfaceDoc.create(item).exec(function(err,records){
      if (err) {
        return res.serverError(err);
      }
      console.log("records.name is: %s",records.name);

      var item=JSON.stringify(records);

      //var item= DocService.writeAPItoDB(apiItem);
      return res.send(item);
    });

  },

  testmydb: function(req,res){
    var item={name:"Polly",wingspn:"168.5"};
    console.log('info.........');

    var req={name:"Polly",wingspn:"168.5"};
    hello(req,res);
    console.log("invoke Interface.hello()function successfully!!");
    //
    InterfaceDoc.create(item).exec(function createCB(err,records){
      if(err){
        //res.send("create item record in mongo db failed!");
        res.send(err);
        //console.log(err);
      }
      else{

        InterfaceDoc.findOne({name:"Polly"}).exec(function (err, records) {
          if (!err) {
            // 刷新下一页
            res.send("success");
          }
          else {
            console.log(err);
            res.view('apidoc'); //输入route.js里的定义的路径名。
          }
        });

      }
    });
  },



};

