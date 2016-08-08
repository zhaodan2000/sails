/**
 * Created by lyh on 8/8/16.
 */

var Math=require('mathjs');

module.exports={

  /**
   * 根据入参的name, 来查找mongodb里的符合条件的记录。
   **/
  findAPIdocitemByName:function(APIdocitemName, callback) {
    if(APIdocitemName) {
      APIdocitem.find({name: APIdocitemName}).exec(function (err, records) {
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
      APIdocitem.find({}).exec(function (err, records) {
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
  insertAPIdocitemRecord:function(_APIdocitem, callback){
    APIdocitem.create(_APIdocitem).exec(function(err,records){
      if(!err){
        console.log("添加_APIdocitem记录成功! records.name is :"+records.name);
        console.log(records);
        callback(records);
        return ;
      }
      console.log("添加_APIdocitem记录失败。。。错误原因为:\r\n"+err);
      callback(null);
      return ;
    });

  },

  /**
   * 根据ID来更新记录内容。
   * @param
   * @param
   * */
  updateAPIdocitem: function(_APIdocitem){
    APIdocitem.update({id:_APIdocitem.id},_APIdocitem,function(err,updated){
      if(!err){
        console.log(updated);
        return;
      }else{
        console.log(err);
      }

    });
  },

  /**
   * 根据输入的APIdocitemName, 删除MongoDB中的记录。
   * @param APIdocitemName
   */
  deleteRecordsByName:function(APIdocitemName){
    APIdocitem.destroy({name:APIdocitemName}).exec(function(err){
      if(err){console.log("删除指定APIdocitemName记录失败。。。")}
      else{console.log("删除指定APIdocitemName记录成功!")}
    });
  },

  /**
   * 删除MongoDB中_APIdocitem表的所有记录。
   * */
  deleteAllAPIdocitemRecords:function(){
    APIdocitem.destroy().exec(function(err){
      if(!err){
        console.log("删除所有_APIdocitem records成功!");
      }else{
        console.log("删除所有_APIdocitem records失败。。。");
      }
    });

  },

}
