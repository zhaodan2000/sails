/**
 * Created by lyh on 8/8/16.
 */

var Math=require('mathjs');

module.exports={

  insertDocAssociation:function(api,api_item,callback){
    var insertedAPI;
    APIdocServices.insertAPIdocRecord(api, function(records){
      insertedAPI=records;
    });

    var insertedItem;
    APIdocItemServices.insertAPIdocitemRecord(api_item,function(records){
      insertedItem=records;
    });

    APIdoc.find({id:insertedItem.APIdocID}).populate('APIdoc_items').exec(function(err, records){
      if(!err){
        console.log("populated records:");
        console.log(records);
        callback(records);
      }else{
        console.log("populated failure...");
        callback(null);
      }
    });
  },


  /**
   * 根据入参的name, 来查找mongodb里的符合条件的记录。
   **/
  findAPIdocByName:function(APIdocName, callback) {
    //var APIdocName="newLogin_API";
    if(APIdocName) {
      APIdoc.find({name: APIdocName}).exec(function (err, records) {
        if (!err) {
          console.log("find records success!");
          console.log(records);
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
          console.log(records);
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
        console.log("添加APIdoc记录成功! records.name is :"+records.name);
        console.log(records);
        callback(records);
        return ;
      }
      console.log("添加APIdoc记录失败。。。错误原因为:\r\n"+err);
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
      if(err){console.log("删除指定APIdocName记录失败。。。"+err)}
      else{console.log("删除指定APIdocName记录成功!")}
    });
  },

  /**
   * 删除MongoDB中APIdocItem表的所有记录。
   * */
  deleteAllAPIdocRecords:function(){
    APIdoc.destroy().exec(function(err){
      if(!err){
        console.log("删除所有APIdoc records成功!");
      }else{
        console.log("删除所有APIdoc records失败。。。");
      }
    });

  },

}
