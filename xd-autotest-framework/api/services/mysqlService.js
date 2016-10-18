/**
 * Created by zhouhuan on 16/10/17.
 * CRUD
 */
//var Math=require('mathjs');
var ObjectId=require('sails-mysql');

module.exports={
  /**
   * 根据传入的model类型,以及查找的条件,
   * 将对应的model记录查找返回。
   * @param modelType 为model类型,字符串。
   * @param dic 为查找的条件,字典。
   * @param callback 将查找的结果以回调函数传回。
   * */
  Find:function(modelType, dic, callback){
    switch(modelType){
      case "User":
        User.find(dic).exec(function(err,records){
          if (!err) {
            sails.log.debug("find %s records success!", modelType);
            callback(records);
          } else {
            sails.log.debug("find %s records failure!", modelType);
            sails.log.debug(err);
            callback(null);
          }
        });
        break;
      default:
        break;
    }
  },
}
