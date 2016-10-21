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
      res.view('doc/APIdoc', {api_docs:records, curr_doc:records[records.length-1]});
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
    // console.log(API_docitem);
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
                  console.log(" 用户添加了APIdocitem:  "+insertedItem.name);
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
                mongoService.Update("RequestItem",{url:API_docitem.url},
                  {apiUniqId:API_docitem.uniqID},function(updatedRequest){});
                console.log(" 用户更新了APIdocitem:  "+updatedItem[0].name);
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
      apiDoc: APIdoc
    }
   * */
  saveDoc:function(req,res){
    //构造APIdoc对象
    var API_doc=req.body["apiDoc"];

    /** 前端传入的API_doc.uniqID不为空*/
    if(API_doc&&API_doc.uniqID){
      mongoService.Insert("APIdoc", API_doc, function (insertedDOC) {
        /** 更新APIdoc成功 */
        mongoService.Find("APIdoc",{},function(found){
          res.view('doc/APIdoc', {api_docs:found, curr_doc:insertedDOC});
        });
      });
    }else{
      mongoService.Find("APIdoc",{},function(found){
        res.view('doc/APIdoc', {api_docs:found, curr_doc:null});
      });
    }
  },

  /**
   * 根据用户输入的modelType, 以及uniqID来查询指定的model对象。
   * 如果uniqID为空, 则将model的所有记录返回。
   * */
  query:function (req,res) {
    var modelType=req.body["modelType"];
    var uniqId=req.body["uniqID"];
    var dic=uniqId?{uniqID:uniqId}:{};

    mongoService.Find(modelType,dic,function (records) {
      if(records&&records.length>0&&uniqId){
        res.send(records[0]);
      }else if(!uniqId){
        res.send(records);
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
    if(uniqId){
      var dic={uniqID:uniqId};
      mongoService.Find(modelType,dic,function (records) {
        if(records&&records.length>0){
          mongoService.Delete(modelType,dic);
          res.ok();
        }
      });
    }else{
      mongoService.Delete(modelType,{});
      res.ok();
    }

  },

};

