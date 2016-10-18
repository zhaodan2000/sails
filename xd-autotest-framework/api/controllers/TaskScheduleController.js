/**
 * Created by zhouhuan on 16/10/10
 */

var service = require("../services/CaseServices")
var collectionHelper = require('../newman/newmanmodel')
var eventproxy = require('../utils/eventproxyhelper')
var scheduleServices=require("../services/ScheduleServices")
var mailService = require("../services/MailService");
var map = require("../utils/maps").newHashMap();
/**
 * TaskScheduleController
 *
 * @description :: Server-side logic for managing Taskschedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs=require('fs');
var path=require('path');

module.exports = {
  refreshView: function (req, res) {
    mongoService.Find('ScheduleTask', null, function (records) {
      res.view('schedule/index', {data: records});
    });
  },

  /**
   * 添加sc任务
   * @param req
   * @param res
   */
  save: function (req, res) {
    var form = req.body;
    console.log(form);
    var sc = {
      sc_id: form.sc_id,
      sc_name: form.sc_name,
      sc_desc: form.sc_desc,
      sc_type: form.sc_type,
      sc_task_id: form.sc_task_id,
      sc_task_name: form.sc_task_name,
      sc_host: form.sc_host,
      sc_time: form.sc_time,
      sc_state: form.sc_state
    };
    mongoService.Insert("ScheduleTask", sc, function (records) {
      if (records) {
        //sucess
        console.log('insert sucess');
        //创建任务成功之后需要设置任务的调度策略
        //在这里查找调度策略
        return res.send(records);
      } else {
        //fail
        console.log('insert fail');
      }
    });
  },

  /**
   * 删除
   * @param req
   * @param res
   */
  remove: function (req, res) {
/*    console.log(req);*/
    mongoService.Delete('ScheduleTask', {sc_id: req.body.sc_id});
    mongoService.Find("ScheduleTask", null, function (records) {
      if (records) {
        return res.send(records);
      }
    })
  },

  /**
   * 修改
   * @param req
   * @param res
   */
  edit: function (req, res) {
    var form = req.body;
    var sc = {
      sc_name: form.sc_name,
      sc_desc: form.sc_desc,
      sc_type: form.sc_type,
      sc_task_id: form.sc_task_id,
      sc_task_name: form.sc_task_name,
      sc_host: form.sc_host,
      sc_time: form.sc_time,
      sc_state: form.sc_state
    };
    mongoService.Update("ScheduleTask", sc, {sc_id: form.sc_id}, function (records) {
      if (records) {
        res.send(records);
      } else {
        res.send({errMsg: "更新失败"});

      }
    });
  },

  /**
   * 改变状态启动关闭定时任务
   * @param req
   * @param res
   */
  editState: function (req, res) {
    var form = req.body;
    var sc = {
      sc_state: form.sc_state
    };
    mongoService.Update("ScheduleTask", sc, {sc_id: form.sc_id}, function (records) {
      if (records) {
        if(form.sc_state==1){
          scheduleServices.start(form.sc_id,form.sc_type,form.sc_task_id,form.sc_time,form.sc_host,form.sc_name);
        }else{
          scheduleServices.stop(form.sc_id);
        }
        res.send(records);
      } else {
        res.send({errMsg: "更新失败"});
      }
    });
  },
  /**
   * 启动定时任务
   * @param req
   * @param res
   */
  start: function (req, res,callback) {
    var modelType = req.body.modelType;
    var sc_id=req.body.sc_id;
    var sc_host=req.body.sc_host;
    var sc_task_id=req.body.sc_task_id;
    var sc_name=req.body.sc_name;
      mongoService.Find(modelType,{uniqID:req.body.uniqID}, function (records) {
      if (records) {
        var itemArr = records[0].ReqItems;
        for (var i = 0; i < itemArr.length; i++) {
          itemArr[i].url="http://"+sc_host+itemArr[i].url;
        }
         var log_id= scheduleServices.execute(itemArr,sc_id,sc_name);
         console.log(log_id);
          return res.send();
      }
    })
  },

  /**
   * 系统启动时加载，扫描启动定时任务
   * @param req
   * @param res
   */
getAll: function (req, res) {
  mongoService.Find('ScheduleTask', null, function (items) {
      for (var i = 0; i < items.length; i++) {
         if(items[i].sc_state==1){
           var modelType="ReqFolder";
           if(items[i].sc_type==1){
           }else{
             modelType="TaskFolder";
           }
           scheduleServices.start(items[i].sc_id,items[i].sc_type,items[i].sc_task_id,items[i].sc_time,items[i].sc_host,items[i].sc_name);
           return res.send("success");
         }
      }
  });
},
  /**
   * 启动定时任务
   * @param req
   * @param res
   */
  sendMail: function (req, res,callback) {
    var log_id = req.body.log_id;
    console.log(log_id);
    mailService.sendMail();
  },
}



