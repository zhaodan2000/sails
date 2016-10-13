/**
 * Created by zhouhuanon 16/10/9.
 */

var nodemailer = require("nodemailer");
var smtpTransport = require('xdmailer-smtp-transport');
var request = require('request');
var ini = require('node-ini');
module.exports = {
  sendMail:function(log_id,sc_name,html) {
    var fs = require('fs');
    fs.readFile('./mail.json',function(err,data){
      if(err) throw err;
      var jsonObj = JSON.parse(data);
      sails.log.debug(jsonObj.mail);
      // 开启一个 SMTP 连接池
      var transport = nodemailer.createTransport(smtpTransport({
        host: "smtp.ym.163.com", // 主机
        secure: true, // 使用 SSL
        port: 994, // SMTP 端口
        auth: {
          user: "autotest@corp.51xiaodou.com", // 账号
          pass: "pgP4dkuC6G" // 密码
        }
      }));
      // 设置邮件内容
      var mailOptions = {
        from: "autotest@corp.51xiaodou.com", // 发件地址
        to: jsonObj.mail, // 收件列表
        subject: sc_name+"测试报告", // 标题
        html: html
      }
      sails.log.debug("发送邮件");
      // 发送邮件
      transport.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.error(error);
        } else {
          console.log(response);
        }
        transport.close(); // 如果没用，关闭连接池
      });
    });

  },
}


