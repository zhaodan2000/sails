/**
 * Created by zhouhuan on 16/10/10
 */

/**
 * LogScheduleController
 *
 * @description :: Server-side logic for managing Taskschedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs=require('fs');
var path=require('path');

module.exports = {
  all: function (req, res) {
    var sc_id=req.body.sc_id;
    mongoService.Find('ScheduleLogSome', {sc_id:sc_id}, function (records) {
      res.view('schedule/log', {data: records});
    });
  },
  getLogById: function (req, res) {
    var log_id=req.body.log_id;
    mongoService.Find('ScheduleLog', {log_id:log_id}, function (records) {
      res.view('schedule/logShow', {data: records});
    });
  },
  log: function (req, res) {
    var log_id=req.param("log_id");
    mongoService.Find('ScheduleLog', {log_id:log_id}, function (records) {
      res.view('schedule/logShow', {data: records});
    });
  },
}



