/**
 * Created by lyh on 8/4/16.
 * CRUD
 */
var Math=require('mathjs');

module.exports={

  /**
   * 根据传入的model类型,以及查找的条件,
   * 将对应的model记录查找返回。
   * @param modelType 为model类型,字符串。
   * @param item 为model对象,字典。
   * @param callback 将查找的结果以回调函数传回。
   * */
  Insert:function(modelType, item, callback) {
    switch(modelType){ 
      case "TaskFolder": 
        TaskFolder.create(item).exec(function(err,records){ 
          if (!err) { 
            console.log("create TaskFolder records success!"); 
            callback(records); 
          }else{ 
            console.log("create TaskFolder records failure!");
            console.log(err);
            callback(null); 
          } 
        }); 
        break; 
      case "TaskCase":
        TaskCase.create(item).exec(function (err,records) { 
          if (!err) {
            console.log("create TaskCase records success!");
            callback(records);
          } else { 
            console.log("create TaskCase records failure!");
            console.log(err);
            callback(null); 
          } 
        }); 
        break; 
      case "RequestItem": 
        RequestItem.create(item).exec(function(err,records){ 
          if (!err) { 
            console.log("create RequestItem records success!"); 
            callback(records); 
          } else { 
            console.log("create RequestItem records failure!");
            console.log(err);
            callback(null); 
          } 
        }); 
        break;  
      case "ReqFolder":
        ReqFolder.create(item).exec(function(err,records){
          if (!err) {
            console.log("create ReqFolder records success!");
            callback(records);
          } else {
            console.log("create ReqFolder records failure!");
            console.log(err);
            callback(null);
          }
        });
        break;
      case "APIdoc":
        APIdoc.create(item).exec(function(err,records){
          if (!err) {
            console.log("create %s records success!", modelType);
            callback(records);
          } else {
            console.log("create %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      case "APIdocitem":
        APIdocitem.create(item).exec(function(err,records){
          if (!err) {
            console.log("create %s records success!", modelType);
            callback(records);
          } else {
            console.log("create %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      case 'ScheduleStrategy':
        ScheduleStrategy.create(item).exec(function(err,records){
          if (!err) {
            console.log("create %s records success!", modelType);
            callback(records);
          } else {
            console.log("create %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;

      default: 
        break; 
    }
  },

  /**
   * 根据传入的model类型,以及查找的条件,
   * 将对应的model记录查找返回。
   * @param modelType 为model类型,字符串。
   * @param item 为model对象,字典。
   * @param dic 为查询条件,字典。
   * @param callback 将查找的结果以回调函数传回。
   * */
  Update:function(modelType, item, dic, callback){
    switch(modelType){
      case "TaskFolder":
        TaskFolder.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update TaskFolder records success!");
            callback(records);
          }else{
            console.log("update TaskFolder records failure!");
            console.log(err);
            callback(null);
          }
        });
        break;
      case "TaskCase":
        TaskCase.update(dic,item).exec(function (err,records) {
          if (!err) {
            console.log("update TaskCase records success!");
            callback(records);
          } else {
            console.log("update TaskCase records failure!");
            console.log(err);
            callback(null);
          }
        });
        break;
      case "RequestItem":
        RequestItem.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update RequestItem records success!");
            callback(records);
          } else {
            console.log("update RequestItem records failure!");
            console.log(err);
            callback(null);
          }
        });
        break;
      case "ReqFolder":
        ReqFolder.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update ReqFolder records success!");
            callback(records);
          } else {
            console.log("update ReqFolder records failure!");
            console.log(err);
            callback(null);
          }
        });
        break;
      case "APIdoc":
        APIdoc.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update %s records success!", modelType);
            callback(records);
          } else {
            console.log("update %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      case "APIdocitem":
        APIdocitem.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update %s records success!", modelType);
            callback(records);
          } else {
            console.log("update %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      case "ScheduleStrategy":
        ScheduleStrategy.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update %s records success!", modelType);
            callback(records);
          } else {
            console.log("update %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;

      default:
        break;
    }
  },


  /**
   * 根据传入的model类型,以及查找的条件,
   * 将对应的model记录查找返回。
   * @param modelType 为model类型,字符串。
   * @param dic 为查找的条件,字典。
   * @param callback 将查找的结果以回调函数传回。
   * */
  Find:function(modelType, dic, callback){
    switch(modelType){
      case "TaskFolder":
        TaskFolder.find(dic).populate('Cases').exec(function(err,populated){
          if(!err){
            console.log("populated  %s records:",modelType);
            // console.log(populated);
            callback(populated);
          }else{
            console.log("populated %s failure...",modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      case "TaskCase":
        TaskCase.find(dic).exec(function (err,records) {
          if (!err) {
            console.log("find %s records success!", modelType);
            callback(records);
          } else {
            console.log("find %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      case "RequestItem":
        RequestItem.find(dic).exec(function(err,records){
          if (!err) {
            console.log("find %s records success!", modelType);
            // console.log(records);
            callback(records);
          } else {
            console.log("find %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      case "ReqFolder":
        ReqFolder.find(dic).populate('ReqItems').exec(function(err,records){
          if (!err) {
            console.log("find %s records success!", modelType);
            callback(records);
          } else {
            console.log("find %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      case "APIdocitem":
        APIdocitem.find(dic).exec(function(err,records){
          if (!err) {
            console.log("find %s records success!", modelType);
            callback(records);
          } else {
            console.log("find %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;

      case "APIdoc":
        APIdoc.find(dic).populate('APIdoc_items').exec(function(err,records){
          if (!err) {
            console.log("find %s records success!", modelType);
            callback(records);
          } else {
            console.log("find %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      
      case "ScheduleStrategy":
        ScheduleStrategy.find(dic).exec(function(err,records){
          if (!err) {
            console.log("find %s records success!", modelType);
            callback(records);
          } else {
            console.log("find %s records failure!", modelType);
            console.log(err);
            callback(null);
          }
        });
        break;
      default:
        break;
    }
  },

  /**
   * 根据传入的model类型,以及查找的条件,
   * 将对应的model记录删除掉。
   * @param modelType 为model类型,字符串。
   * @param dic 为查找的条件,字典。
   * **/
  Delete:function(modelType,dic){
    switch(modelType){
      case "TaskFolder":
        TaskFolder.destroy(dic).exec(function(err){
          if (!err) {
            console.log("destroy %s records success!", modelType);

          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;
      case "TaskCase":
        TaskCase.destroy(dic).exec(function (err) {
          if (!err) {
            console.log("destroy %s records success!", modelType);

          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;
      case "RequestItem":
        RequestItem.destroy(dic).exec(function(err){
          if (!err) {
            console.log("destroy %s records success!", modelType);
          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;
      case "ReqFolder":
        ReqFolder.destroy(dic).exec(function(err){
          if (!err) {
            console.log("destroy %s records success!", modelType);
          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;
      case "APIdoc":
        APIdoc.destroy(dic).exec(function(err){
          if (!err) {
            console.log("destroy %s records success!", modelType);
          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;
      case "APIdocitem":
      APIdocitem.destroy(dic).exec(function(err){
        if (!err) {
          console.log("destroy %s records success!", modelType);
        } else {
          console.log("destroy %s records failure!", modelType);
          console.log(err);
        }
      });
      break;
      case "ScheduleStrategy":
        ScheduleStrategy.destroy(dic).exec(function(err){
          if (!err) {
            console.log("destroy %s records success!", modelType);
          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;

      default:
        break;
    }
  },

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
          console.log(err);
          callback(null);
        }
      })
    }
  },

  /**
   * 根据入参的id, 来查找mongodb里的符合条件的记录。
   **/
  findRequestItemByID:function(reqid, callback) {
    //var requestName="newLogin_API";
    if(reqid) {
      RequestItem.find({id: reqid}).exec(function (err, records) {
        if (!err) {
          console.log("find records success!");
          callback(records);
        } else {
          console.log("find records failure!");
          console.log(err);
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
          console.log(err);
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
      if(err){console.log("删除指定requestName记录失败。。。");
        console.log(err);
      }
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
        console.log(err);
      }
    });

  },

}
