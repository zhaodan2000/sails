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
}



