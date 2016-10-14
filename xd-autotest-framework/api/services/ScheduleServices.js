/**
 * Created by zhouhuanon 16/10/9.
 */
var map = require("../utils/maps").newHashMap();
var service = require("../services/CaseServices");
var collectionHelper = require('../newman/NewManModel');
var eventproxy = require('../utils/eventproxyhelper');
var mongoService = require("../services/mongoService");
var mailService = require("../services/MailService");
var request = require('request');
module.exports = {
  /**
   * 根据任务的调度策略类型Schedule_ID进行调度
   * @param scheduleID
   */
  start: function(sc_id,sc_type,sc_task_id,sc_time,sc_host,sc_name)
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
        map.put(sc_id,j);
        var j = schedule.scheduleJob(sc_time, function () {
          mongoService.Find('ScheduleTask', {sc_id:sc_id}, function (records) {
              if(records) {
                sails.log.debug(records[0].sc_state);
                if (records[0].sc_state == 1) {
                    sails.log.debug("执行任务");
                  _execute(itemArr, sc_id, sc_name);
               }
              }
          });
        });
      }
    })
  },


  /**
   * 停止定时任务
   * @param scheduleID
   */
  stop: function(sc_id) {
    var job= map.get(sc_id);
    if(job!=null) {
      job.cancel();
      sails.log.debug("关闭定时任务"+sc_id);
    }
  },


  /**
   * 启动定时任务
   * @param scheduleID
   */
  execute: function(itemArr,sc_id,sc_name) {
    var mailEp = eventproxy.create();
    var ep = eventproxy.create();
    var collection = collectionHelper.newCollection();
    collection.setName(sc_name);
    ep.after(itemArr.length, function () {
      var _collection = collection.getCollection();
      service.runCollection(_collection, function (exitCode, results) {
        var log_id = (new Date().getTime()).toString();
        var log_html= JSON.stringify(results.html);
        var log = {
          log_id: log_id,
          sc_id: sc_id,
          log_desc: exitCode == 0 ? JSON.stringify(results) : "Error",
          log_html : log_html
        };
        mongoService.Insert("ScheduleLog", log, function (records) {
          if (records) {
            mailService.sendMail(log_id, sc_name,log_html);
            return log_id;
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
function _execute(itemArr,sc_id,sc_name) {
  var mailEp = eventproxy.create();
  var ep = eventproxy.create();
  var collection = collectionHelper.newCollection();
  collection.setName(sc_name);
  ep.after(itemArr.length, function () {
    var _collection = collection.getCollection();
    service.runCollection(_collection, function (exitCode, results) {
      var log_id=(new Date().getTime()).toString();
      var log_html= JSON.stringify(results.html);
      var log = {
        log_id:log_id,
        sc_id: sc_id,
        log_desc:exitCode == 0?JSON.stringify(results):"Error",
        log_html : log_html
      };
      mongoService.Insert("ScheduleLog", log, function (records) {
        if (records) {
          mailService.sendMail(log_id,sc_name,log_html);
          return log_id;
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
