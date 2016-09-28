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
      res.view('doc/APIdoc', {api_docs:records, curr_doc:records[0]});
    });
  },

  /**
   * 保存docitem记录到db中。(不存在时新增,存在时则更新.)
   * 入参:
   * data:{
   *  doc_uniqId:API_doc_uniqId,
   *  apiItem:API_docitem
   * }
   * **/
  saveDocItem:function (req, res) {
    var APIdoc_uniqid=req.body["doc_uniqId"];
    var API_docitem=req.body["apiItem"];
    console.log(API_docitem);
    mongoService.Find("APIdoc",{uniqID:APIdoc_uniqid},function (records) {

      /** 不存在APIdoc对象  */
      if (!records || records.length == 0) {
        res.send({retcode: -1, message: "不存在data对象", data:"APIdoc_uniqID="+APIdoc_uniqid});
      }
      /** 存在APIdoc对象**/
      else {//存在APIdoc
        API_docitem["APIdocID"]=records[0].id;
        if(API_docitem.uniqID){
          mongoService.Find("APIdocitem",{uniqID:API_docitem.uniqID},function(records){

            /** 不存在API_docitem记录,可以插入到db中 **/
            if(!records||records.length==0){
              mongoService.Insert("APIdocitem",API_docitem,function (insertedItem) {
                console.log("*********************\r\n用户添加了APIdocitem:\r\n"+insertedItem.name);
                mongoService.Find("APIdoc",{uniqID:APIdoc_uniqid},function (single_doc){
                  mongoService.Find("APIdoc",{},function (docs_records) {
                    res.view('doc/APIdoc', {api_docs:docs_records, curr_doc:single_doc[0]});
                  })
                });
              });
            }
            /** 存在API_docitem, 则更新apiItem **/
            else{
              mongoService.Update("APIdocitem",API_docitem,{uniqID:API_docitem.uniqID},function (updatedItem) {
                console.log("*********************\r\n用户更新了APIdocitem:\r\n"+updatedItem.name);
                mongoService.Find("APIdoc",{uniqID:APIdoc_uniqid},function (single_doc){
                  mongoService.Find("APIdoc",{},function (docs_records) {
                    res.view('doc/APIdoc', {api_docs:docs_records, curr_doc:single_doc[0]});
                  })
                });
              });
            }

          })
        }
      }
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
                        /** 没有找到apiItem对象 **/
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
   * 根据用户输入的modelType,以及uniqID来查询指定的model对象。
   * */
  query:function (req,res) {
    var modelType=req.body["modelType"];
    var uniqId=req.body["uniqID"];

    console.log("in query controller"+uniqId);
    var dic={uniqID:uniqId};
    mongoService.Find(modelType,dic,function (records) {
      if(records&&records.length>0){
        res.send(records[0]);
      }else{
        console.log("查询失败。。。");
        res.send({retcode:-1, msg:"查询失败。"});
      }
    });
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

};

