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
   * 将doc与docItem存入db中,其中doc:docItem=1:N
   * 入参:
   * data: {
      apiDoc: APIdoc,
        apiItems:apiItemsArray
    }
   * */
  saveDoc2db: function(req,res){
    //构造APIdoc对象
    var API_doc=req.body["apiDoc"];

    //构造APIdocitem对象
    var apisItemArray=req.body["apiItems"];

    /** 前端传入的API_doc.uniqID不为空*/
    if(API_doc.uniqID){
      mongoService.Find("APIdoc",{uniqID:API_doc.uniqID},function (records) {

        /** 不存在APIdoc对象  */
        if(!records||records.length==0){
          res.send({retcode:-1,message:"不存在data对象",data:API_doc});
        }
        /** 存在APIdoc对象**/
        else {//存在APIdoc
          mongoService.Update("APIdoc", API_doc, {uniqID: API_doc.uniqID}, function (updatedDOC) {
            /** 更新APIdoc成功 */
            if(updatedDOC && updatedDOC.length>0){

              apisItemArray.forEach(function(tempItem,index,array){
                if(tempItem.uniqID){
                      mongoService.Find("APIdocitem", {uniqID: tempItem.uniqID}, function (found) {
                        /** 没有找到apiItem对象**/
                        if (!found || found.length == 0) {
                          tempItem["APIdocID"]=updatedDOC[0].id;
                          mongoService.Insert("APIdocitem", tempItem, function (insertedItem) {
                            console.log("*********************\r\n用户添加了APIdocitem:\r\n"+tempItem.name);
                          });
                        }

                        /*** 找到apiItem对象***/
                        else {
                          mongoService.Update("APIdocitem", tempItem, {uniqID: tempItem.uniqID}, function (updatedItem) {
                            console.log("*********************\r\n用户更新了APIdocitem:\r\n"+tempItem.name);
                          });
                        }
                      });

                    }

                    /** APIdocitem的uniqID为空**/
                    else{
                      res.send({retcode:-1,message:"前端传入apidocitem的uniqID为空,若不刷新前端,会重复添加apidocitem"});
                    }

              });
              res.send({retcode:0,msg:"更新APIdoc成功,且更新APIdocitem成功。"});
            }

            /** 更新APIdoc失败**/
            else{
              res.send({retcode:-1,errMsg:"更新APIdoc失败,API_doc.uniqID="+API_doc.uniqID});
            }

          });
        }

      });
    }

    /** 前端传入的API_doc.uniqID为空 */
    else{
      res.send({retcode:-1,errMsg:"前端传入的API_doc.uniqID为空"});
    }

  },

  /**
   * 根据用户输入的modelType,以及uniqID来删除指定的model对象。
   * */
  remove:function(req,res){
    var modelType=req.body["modelType"];
    var uniqId=req.body["uniqID"];
    var dic={uniqID:uniqId};
    mongoService.Find(modelType,dic,function (records) {
      if(records&&records.length>0){
        mongoService.Delete(modelType,dic);
      }
      res.ok();
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

  }

};

