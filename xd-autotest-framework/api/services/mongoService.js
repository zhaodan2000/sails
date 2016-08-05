/**
 * Created by lyh on 8/4/16.
 * CRUD
 */
var Math=require('mathjs');

module.exports={

  /**
   * 根据入参的name, 来查找mongodb里的符合条件的记录。
   **/
  findRequestItemByName:function(requestName, callback) {
    //var requestName="newLogin_API";
    if(requestName) {
      RequestItem.find({name: requestName}).exec(function (err, records) {
        if (!err) {
          console.log("find records success!");
          callback(records);
        } else {
          console.log("find records failure!");
          callback(null);
        }
      })
    }else{
      RequestItem.find({}).exec(function (err, records) {
        if (!err) {
          console.log("find records success!");
          callback(records);
        } else {
          console.log("find records failure!");
          callback(null);
        }
      })
    }
  },




  /***
   * 生成一个接口MongoDB记录。
   * @param req
   * @param res
   */
  insertRequestItemRecord:function(requestItem, callback){
    RequestItem.create(requestItem).exec(function(err,records){
      if(!err){
        console.log("添加requestItem记录成功! records.name is :"+records.name);
        callback(records);
        return ;
      }

      console.log("添加requestItem记录失败。。。错误原因为:\r\n"+err);
      callback(null);
      return ;
    });

  },

  /**
   * 根据ID来更新记录内容。
   * @param
   * @param
   * */
  updateRequestItem: function(requestItem){
    RequestItem.update({id:requestItem.id},requestItem,function(err,updated){
        if(!err){
          console.log(updated);
          return;
        }else{
          console.log(err);
        }

    });
  },

  /**
   * 根据输入的requestName, 删除MongoDB中的记录。
   * @param requestName
   */
  deleteRecordsByName:function(requestName){
    RequestItem.destroy({name:requestName}).exec(function(err){
      if(err){console.log("删除指定requestName记录失败。。。")}
      else{console.log("删除指定requestName记录成功!")}
    });
  },

  /**
   * 删除MongoDB中requestItem表的所有记录。
   * */
  deleteAllRequestItemRecords:function(){
    RequestItem.destroy().exec(function(err){
      if(!err){
        console.log("删除所有requestItem records成功!");
      }else{
        console.log("删除所有requestItem records失败。。。");
      }
    });

  },





}
