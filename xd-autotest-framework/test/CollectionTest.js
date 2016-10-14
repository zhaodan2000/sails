var service = require("../api/services/CaseServices")
var collectionHelper = require('../api/newman/NewManModel')
// service.parseInputPreString("mysql.execQuery({host:'192.168.88.89', port:'3306', user:'xddev', password:'xddev@xiaodou', db:'xd-user', sql: 'select id from xd_user limit 1', callback: function(results){if (results && results.length > 0) {var id = results[0];pre.setGlobalVar('test',id['id']);}}});", function (event) {
//  console.log(event);
// });
//
// service.parseIntputTestString("test.setEnvVar('test','hello');test.clearGlobalVar('test');", function (event) {
//  console.log(event);
// });

// var item = {
//   prescript: "mysql.execQuery({id:'1', host:'192.168.88.89', port:'3306', user:'xddev', password:'xddev@xiaodou', db:'xd-user', sql: 'select id from xd_user where id = ?', args:['3'], callback: function(results){if (results && results.length > 0) {var id = results[0];pre.setGlobalVar('test',id['id']);}}});",
//   testscript: "test.setEnvVar('test','hello');test.clearGlobalVar('test');test.checkJsonValue('test', '1234');"
// };
// service.configEvent(item, function (event) {
//   console.log(JSON.stringify(event));
// });
var nodemailer = require("nodemailer");
var smtpTransport = require('xdmailer-smtp-transport');
function sendMail(){
  // 开启一个 SMTP 连接池
  var transport = nodemailer.createTransport(smtpTransport({
    host: "smtp.ym.163.com", // 主机
    secure: true, // 使用 SSL
    port: 994, // SMTP 端口
    auth: {
      user: "zhouhuan@corp.51xiaodou.com", // 账号
      pass: "zhouhuan123" // 密码
    }
  }));
// 设置邮件内容

  var mailOptions = {
    from: "zhouhuan@corp.51xiaodou.com", // 发件地址
    to: "zhaodan@corp.51xiaodou.com", // 收件列表
    subject: "周欢测试", // 标题
    html: "<b>thanks a for visiting!</b>"
  }
// 发送邮件

  transport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
    transport.close(); // 如果没用，关闭连接池
  });
}
// sendMail();
var reqItem = {
  "uniqID": "1476158446588",
  "name": "登录接口1",
  "description": "登录接口1",
  "url": "http://192.168.103.101:8201/user/login",
  "disabled": false,
  "dev": "赵聃",
  "method": "POST",
  "mode": "a/json",
  "headers": {
    "Content-Type": "application/json;charset=utf-8",
    "clientType": "android",
    "version": "1.0.0",
    "module": "3",
    "deviceId": "999",
    "clientIp": "192.168.0.1",
    "sessionToken": "bb93c10b-7fea-4384-bbeb-8d63e8533b54"
  },
  "queryParam": {
    "phoneNum": "13718037894",
    "pwd": "123456",
    "platform": "local"
  },
  "response": {
    "retcode": "0"
  },
  "ReqFolderID": "57fb647206e1b1270e013de6",
  "createdAt": "2016-10-11T04:00:46.629Z",
  "updatedAt": "2016-10-11T06:11:01.009Z",
  "dataType": "application/json",
  // "prescript": "mysql.execQuery({id:'1', host:'192.168.88.242', port:'3306', user:'xddev', password:'xddev@xiaodou', db:'2business', sql: 'select id from xd_user where id = ?', args:['3'], callback: function(results){if (results && results.length > 0) {var id = results[0];async('retcode', id['id']);}}});",
  // "testscript": "mysql.execQuery({id:'1', host:'192.168.88.242', port:'3306', user:'xddev', password:'xddev@xiaodou', db:'2business', sql: 'select id from xd_user where id = ?', args:['3'], callback: function(results){if (results && results.length > 0) {var id = results[0];async('retcode', id['id']);}}});",
  "id": "57fc63eeeccbc220913ce86a"
};
var collection = new collectionHelper.newCollection();
collection.setName("测试");

service.creatItem(reqItem, function (item) {
  collection.pushItem(item);
  var _collection = collection.getCollection();
  service.runCollection(_collection, function(exitCode, results){
    console.log(JSON.stringify(results));
    try{
      // sendMail();
    }catch (e){
      console.log(e)
    }
  });
});
