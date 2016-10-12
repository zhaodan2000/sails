/**
 * Created by zhouhuanon 16/10/9.
 */
var map = require("../utils/maps").newHashMap();
var service = require("../services/CaseServices");
var collectionHelper = require('../newman/NewManModel');
var eventproxy = require('../utils/eventproxyhelper');
var mongoService = require("../services/mongoService");
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
module.exports = {
/*    /!**
     * 根据任务的调度策略类型Schedule_ID进行调度
     * @param scheduleID
     *!/
    startAll: function()
  {
    var schedule = require("node-schedule");
    var scArr = getSc();
    for (var i=0;i<scArr.length;i++){
       var sc=scArr[i];
      var j = schedule.scheduleJob(sc.sc_time, function () {
        map.put(sc.sc_id,j);
        console.log("执行任务");
      });
    }
  },*/
  /**
   * 根据任务的调度策略类型Schedule_ID进行调度
   * @param scheduleID
   */
  start: function(sc_id,sc_type,sc_task_id,sc_time,sc_host)
  {
    var schedule = require("node-schedule");
    var modelType="ReqFolder";
    if(sc_type==1){
    }else{
      modelType="TaskFolder";
    }
    mongoService.Find(modelType,{uniqID:sc_task_id}, function (records) {
      if (records) {
        console.log("测试定时任务");
        var itemArr = records[0].ReqItems;
        for (var i = 0; i < itemArr.length; i++) {
          itemArr[i].url="http://"+sc_host+itemArr[i].url;
          console.log(itemArr[i].url);
        }
        var j = schedule.scheduleJob(sc_time, function () {
          map.put(sc_id,j);
          console.log("执行任务");
          _execute(itemArr,sc_id);
        });
      }
    })
  },

/*  /!**
   * 查找schedule
   * @param scheduleID
   *!/
  getSc: function(sc_id) {
    console.log(sc_id);
    mongoService.Find("ScheduleTask", {sc_id:sc_id}, function (records) {
      if (records) {
        console.log(records);
      }
    })
  },*/

  /**
   * 停止定时任务
   * @param scheduleID
   */
  stop: function(sc_id) {
    var job= map.get(sc_id);
    if(job!=null) {
      job.cancel();
    }
  },


  /**
   * 启动定时任务
   * @param scheduleID
   */
  execute: function(itemArr,sc_id) {
    console.log(itemArr);
    console.log(sc_id);
    var ep = eventproxy.create();
    var collection = collectionHelper.newCollection();
    collection.setName("测试");
    ep.after(itemArr.length, function () {
      var _collection = collection.getCollection();
      //console.log(JSON.stringify(_collection));
      service.runCollection(_collection, function (exitCode, results) {
        var log_id=(new Date().getTime()).toString();
        var log = {
          log_id:log_id,
          sc_id: sc_id,
          log_desc:exitCode == 0?JSON.stringify(results):"Error",
          log_html:exitCode == 0?JSON.stringify(results.html):"Error"
        };
        mongoService.Insert("ScheduleLog", log, function (records) {
          if (records) {
            sendMail();
            return records;
          } else {
            //fail
            console.log('insert fail');
          }
        });
      });
    });
    for (var i = 0; i < itemArr.length; i++) {
      service.creatItem(itemArr[i], function (item) {
        collection.pushItem(item);
        ep.emit(1);
      });
    }
  },

  /**
   * 启动定时任务
   * @param scheduleID
   */
  insertLog: function(log) {
    mongoService.Insert("ScheduleLog", log, function (records) {
      if (records) {
        //sucess
        console.log('insert sucess');
        //创建任务成功之后需要设置任务的调度策略
        //在这里查找调度策略
        return records;
      } else {
        //fail
        console.log('insert fail');
      }
    });
  },

}

exports.execute = _execute;
exports.execute = sendMail;
function _execute(itemArr,sc_id) {
  var ep = eventproxy.create();
  var collection = collectionHelper.newCollection();
  collection.setName("测试");
  ep.after(itemArr.length, function () {
    var _collection = collection.getCollection();
    //console.log(JSON.stringify(_collection));
    service.runCollection(_collection, function (exitCode, results) {
      var log_id=(new Date().getTime()).toString();
      var log = {
        log_id:log_id,
        sc_id: sc_id,
        log_desc:exitCode == 0?JSON.stringify(results):"Error",
        log_html:exitCode == 0?JSON.stringify(results.html):"Error"
      };
      mongoService.Insert("ScheduleLog", log, function (records) {
        if (records) {
          sendMail();
          return records;
        } else {
          //fail
          console.log('insert fail');
        }
      });
    });
  });
  for (var i = 0; i < itemArr.length; i++) {
    service.creatItem(itemArr[i], function (item) {
      collection.pushItem(item);
      ep.emit(1);
    });
  }
}
function sendMail(){
  var transport = nodemailer.createTransport(("SMTP",{
    host: "smtp.ym.163.com", // 主机
    secure: true, // 使用 SSL
    port: 994, // SMTP 端口
    auth: {
      user: "zhouhuan@corp.51xiaodou.com", // 账号
      pass: "zhouhuan123" // 密码
    }
  });

  var smtpTransport = nodemailer.createTransport("SMTP",{
    host: "smtp.qq.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: "xxxxxxxx@qq.com", // 账号
      pass: "xxxxxxxx" // 密码
    }
  });
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
