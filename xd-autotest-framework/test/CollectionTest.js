var service = require("../api/services/CaseServices")
var collectionHelper = require('../api/newman/NewManModel')
//service.parseInputPreString("mysql.execQuery({host:'192.168.88.89', port:'3306', user:'xddev', password:'xddev@xiaodou', db:'xd-user', sql: 'select id from xd_user limit 1', callback: function(results){if (results && results.length > 0) {var id = results[0];pre.setGlobalVar('test',id['id']);}}});", function (event) {
//  console.log(event);
//});
//
//service.parseIntputTestString("test.setEnvVar('test','hello');test.clearGlobalVar('test');", function (event) {
//  console.log(event);
//});

// var item = {
//   prescript: "mysql.execQuery({id:'1', host:'192.168.88.89', port:'3306', user:'xddev', password:'xddev@xiaodou', db:'xd-user', sql: 'select id from xd_user where id = ?', args:['3'], callback: function(results){if (results && results.length > 0) {var id = results[0];pre.setGlobalVar('test',id['id']);}}});",
//   testscript: "test.setEnvVar('test','hello');test.clearGlobalVar('test');test.checkJsonValue('test', '1234');"
// };
// service.configEvent(item, function (event) {
//   console.log(JSON.stringify(event));
// });

var reqItem = {
  "id" : "1475925706968",
  "name" : "删除自己发布的资源",
  "description" : "暂无接口描述",
  "url" : "/asked/deleteById",
  "disabled" : false,
  "dev" : "周欢",
  "method" : "POST",
  "mode" : "application/json",
  "headers" : {},
  "queryParam" : {
    "resourcesId" : "String\"\n"
  },
  "response" : {
    "errorCode" : 0,
    "errorMessage" : "成功",
    "isError" : "false",
    "timestamp" : 1428326863138
  }
};
var collection = new collectionHelper.newCollection();
collection.setName("测试");

service.creatItem(reqItem, function (item) {
  collection.pushItem(item);
  var _collection = collection.getCollection();
  console.log(JSON.stringify(_collection));
  service.runCollection(_collection, function(exitCode, results){
    console.log(results);
  });
});
