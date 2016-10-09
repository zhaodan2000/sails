/**
 * Created by lyh on 8/4/16.
 * CRUD
 */
var Math=require('mathjs');
var ObjectId=require('sails-mongo');

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
      case "OrderCaseCollection": 
        OrderCaseCollection.create(item).exec(function(err,records){ 
          if (!err) { 
            console.log("create OrderCaseCollection records success!"); 
            callback(records); 
          }else{ 
            console.log("create OrderCaseCollection records failure!");
            console.log(err);
            callback(null); 
          } 
        }); 
        break; 
      case "OrderCase":
        OrderCase.create(item).exec(function (err,records) { 
          if (!err) {
            console.log("create OrderCase records success!");
            callback(records);
          } else { 
            console.log("create OrderCase records failure!");
            console.log(err);
            callback(null); 
          } 
        }); 
        break; 
      case "Case": 
        Case.create(item).exec(function(err,records){ 
          if (!err) { 
            console.log("create Case records success!"); 
            callback(records); 
          } else { 
            console.log("create Case records failure!");
            console.log(err);
            callback(null); 
          } 
        }); 
        break;  
      case "CaseCollection":
        CaseCollection.create(item).exec(function(err,records){
          if (!err) {
            console.log("create CaseCollection records success!");
            callback(records);
          } else {
            console.log("create CaseCollection records failure!");
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
      case 'ScheduleTask':
        ScheduleTask.create(item).exec(function(err,records){
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
   * @param item 为model对象(不应该传入关联的属性),字典。
   * @param dic 为查询条件,字典。
   * @param callback 将查找的结果以回调函数传回。
   * */
  Update:function(modelType, item, dic, callback){
    switch(modelType){
      case "OrderCaseCollection":
        OrderCaseCollection.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update OrderCaseCollection records success!");
            callback(records);
          }else{
            console.log("update OrderCaseCollection records failure!");
            console.log(err);
            callback(null);
          }
        });
        break;
      case "OrderCase":
        OrderCase.update(dic,item).exec(function (err,records) {
          if (!err) {
            console.log("update OrderCase records success!");
            callback(records);
          } else {
            console.log("update OrderCase records failure!");
            console.log(err);
            callback(null);
          }
        });
        break;
      case "Case":
        Case.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update Case records success!");
            callback(records);
          } else {
            console.log("update Case records failure!");
            console.log(err);
            callback(null);
          }
        });
        break;
      case "CaseCollection":
        CaseCollection.update(dic,item).exec(function(err,records){
          if (!err) {
            console.log("update CaseCollection records success!");
            callback(records);
          } else {
            console.log("update CaseCollection records failure!");
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

      case "ScheduleTask":
        ScheduleTask.update(dic,item).exec(function(err,records){
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
      case "OrderCaseCollection":
        OrderCaseCollection.find(dic).populate('Cases').exec(function(err,populated){
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
      case "OrderCase":
        OrderCase.find(dic).exec(function (err,records) {
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
      case "Case":
        Case.find(dic).exec(function(err,records){
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
      case "CaseCollection":
        CaseCollection.find(dic).populate('CaseItems').exec(function(err,records){
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

      case "ScheduleTask":
        ScheduleTask.find(dic).exec(function(err,records){
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
      case "OrderCaseCollection":
        OrderCaseCollection.destroy(dic).exec(function(err){
          if (!err) {
            console.log("destroy %s records success!", modelType);

          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;
      case "OrderCase":
        OrderCase.destroy(dic).exec(function (err) {
          if (!err) {
            console.log("destroy %s records success!", modelType);

          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;
      case "Case":
        Case.destroy(dic).exec(function(err){
          if (!err) {
            console.log("destroy %s records success!", modelType);
          } else {
            console.log("destroy %s records failure!", modelType);
            console.log(err);
          }
        });
        break;
      case "CaseCollection":
        CaseCollection.destroy(dic).exec(function(err){
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
      case "ScheduleTask":
        ScheduleTask.destroy(dic).exec(function(err){
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
  findCaseByName:function(caseName, callback) {
    //var caseName="newLogin_API";
    if(caseName) {
      Case.find({name: caseName}).exec(function (err, records) {
        if (!err) {
          console.log("find records success!");
          callback(records);
        } else {
          console.log("find records failure!");
          callback(null);
        }
      })
    }else{
      Case.find({}).exec(function (err, records) {
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
  findCaseByID:function(reqid, callback) {
    //var caseName="newLogin_API";
    if(reqid) {
      Case.find({id: reqid}).exec(function (err, records) {
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
      Case.find({}).exec(function (err, records) {
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
  insertCaseRecord:function(caseItem, callback){
    Case.create(caseItem).exec(function(err,records){
      if(!err){
        console.log("添加Case记录成功! records.name is :"+records.name);
        callback(records);
        return ;
      }
      console.log("添加Case记录失败。。。错误原因为:\r\n"+err);
      callback(null);
      return ;
    });

  },

  /**
   * 根据ID来更新记录内容。
   * @param
   * @param
   * */
  updateCase: function(caseItem){
    Case.update({id:caseItem.id},caseItem,function(err,updated){
        if(!err){
          console.log(updated);
          return;
        }else{
          console.log(err);
        }

    });
  },

  /**
   * 根据输入的caseName, 删除MongoDB中的记录。
   * @param caseName
   */
  deleteRecordsByName:function(caseName){
    Case.destroy({name:caseName}).exec(function(err){
      if(err){console.log("删除指定caseName记录失败。。。");
        console.log(err);
      }
      else{console.log("删除指定caseName记录成功!")}
    });
  },

  /**
   * 删除MongoDB中caseItem表的所有记录。
   * */
  deleteAllCaseRecords:function(){
    Case.destroy().exec(function(err){
      if(!err){
        console.log("删除所有caseItem records成功!");
      }else{
        console.log("删除所有caseItem records失败。。。");
        console.log(err);
      }
    });

  },

}
