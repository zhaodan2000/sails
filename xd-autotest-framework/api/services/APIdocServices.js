/**
 * Created by lyh on 8/8/16.
 */

var Math=require('mathjs');

module.exports={

  /**
   * 根据入参的name, 来查找mongodb里的符合条件的记录。
   **/
  findAPIdocByName:function(APIdocName, callback) {
    //var APIdocName="newLogin_API";
    if(APIdocName) {
      APIdoc.find({name: APIdocName}).exec(function (err, records) {
        if (!err) {
          console.log("find records success!");
          callback(records);
        } else {
          console.log("find records failure!");
          callback(null);
        }
      })
    }else{
      APIdoc.find({}).exec(function (err, records) {
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
  insertAPIdocRecord:function(APIdocItem, callback){
    APIdoc.create(APIdocItem).exec(function(err,records){
      if(!err){
        console.log("添加APIdocItem记录成功! records.name is :"+records.name);
        callback(records);
        return ;
      }
      console.log("添加APIdocItem记录失败。。。错误原因为:\r\n"+err);
      callback(null);
      return ;
    });

  },

  /**
   * 根据ID来更新记录内容。
   * @param
   * @param
   * */
  updateAPIdoc: function(APIdocItem){
    APIdoc.update({id:APIdocItem.id},APIdocItem,function(err,updated){
      if(!err){
        console.log(updated);
        return;
      }else{
        console.log(err);
      }

    });
  },

  /**
   * 根据输入的APIdocName, 删除MongoDB中的记录。
   * @param APIdocName
   */
  deleteRecordsByName:function(APIdocName){
    APIdoc.destroy({name:APIdocName}).exec(function(err){
      if(err){console.log("删除指定APIdocName记录失败。。。")}
      else{console.log("删除指定APIdocName记录成功!")}
    });
  },

  /**
   * 删除MongoDB中APIdocItem表的所有记录。
   * */
  deleteAllAPIdocRecords:function(){
    APIdoc.destroy().exec(function(err){
      if(!err){
        console.log("删除所有APIdocItem records成功!");
      }else{
        console.log("删除所有APIdocItem records失败。。。");
      }
    });

  },

}
