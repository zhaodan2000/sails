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
    mongoService.Find('APIdoc',null,function (records) {
      res.view('doc/APIdoc', {api_docs:records});
     // res.view('doc/docWelcome', {api_docs:records});
    });
  },

  /**
   * 创建api doc.
   * */
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
   * 将doc与docItem存入db中,其中doc:docItem=1:N
   * 入参:
   * data: {
      apiDoc: APIdoc,
        apiItems:apiItemsArray
    }
   * */
  saveDoc2db: function(req,res){

    console.log("\r\nreq.body is:")
    console.log(req.body);
    //构造APIdoc对象
    //var API_doc={name:req.body["docName"],docDesc:req.body["docdesc"],testenv:req.body["testEnv"], testEnvPort:req.body["testEnvPort"]};
    var API_doc=req.body["apiDoc"];
    //console.log(JSON.stringify(API_doc));

    //构造APIdocitem对象
    var apisItemArray=req.body["apiItems"];
    //console.log(JSON.stringify(apisItemArray));
    console.log("req.body['apiItems']的长度是"+req.body["apiItems"].length);
    console.log("apisItemArray的长度是"+apisItemArray.length);

    var insertedAPIdocitem=new Array();

    mongoService.Find("APIdoc",{name:API_doc.name},function (records) {

      /** 不存在APIdoc对象  */
      if(!records||records.length==0){
        mongoService.Insert("APIdoc",API_doc,function (insertedDOC) {
          console.log("插入apidoc成功:\r\n"+JSON.stringify(insertedDOC, null, 4));
          for (var i = 0; i < apisItemArray.length; i++) {
            apisItemArray[i].APIdocID = insertedDOC.id;
            var tempItem=apisItemArray[i];
            mongoService.Insert('APIdocitem', tempItem,function (insertedItem) {
              insertedAPIdocitem.push(insertedItem);
              console.log("插入apiItem:\r\n"+JSON.stringify(insertedItem,null,"\t"));
            })
          }
        });
      }
      /** 存在APIdoc对象**/
      else {//存在APIdoc
        mongoService.Update("APIdoc", API_doc, {name: API_doc.name}, function (updatedDOC) {
          /** 更新APIdoc成功 */
          if(updatedDOC && updatedDOC.length>0){
            console.log("更新APIdoc成功,APIdoc.id="+records[0].id);
            for (var i = 0; i < apisItemArray.length; i++){
              apisItemArray[i].APIdocID = records[0].id;
              var tempItem= apisItemArray[i];
              console.log("\r\n"+i.toString()+"  apisItemArray[i]\r\n"+JSON.stringify(tempItem,null,"\t"));
              mongoService.Find("APIdocitem", {name: tempItem.name, APIdocID:tempItem.APIdocID}, function (found) {
                console.log("\r\n"+i.toString()+"  找到APIdocitem成功,长度="+found.length);
                /** 没有找到apiItem对象**/
                if (!found || found.length == 0) {
                  mongoService.Insert("APIdocitem", tempItem, function (insertedItem) {
                    insertedAPIdocitem.push(insertedItem);
                    console.log("插入apiItem成功\r\n"+JSON.stringify(insertedItem,null,"\t"));
                  });
                }

                /*** 找到apiItem对象***/
                else {
                  mongoService.Update("APIdocitem", tempItem, {APIdocID:tempItem.APIdocID,name: tempItem.name}, function (updatedItem) {
                    insertedAPIdocitem.push(updatedItem);
                    console.log("更新apiItem成功\r\n"+JSON.stringify(updatedItem,null,"\t"));
                  });
                }
              });

            }
            res.send(insertedAPIdocitem);
          }

          /** 更新APIdoc失败**/
          else{
            res.send({error:"update APIdoc failure..."});
          }

        });
      }

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
        version:"1.0.0",description:" !!!",method:"POST",headers:{module:"2",
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

