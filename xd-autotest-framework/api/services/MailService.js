/**
 * Created by zhouhuanon 16/10/9.
 */

var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var request = require('request');
module.exports = {
  sendMail:function() {
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
      to: "liyuehua@corp.51xiaodou.com", // 收件列表
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
  },
}


