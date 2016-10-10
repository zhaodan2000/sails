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
    mongoService.Find('ScheduleLog', null, function (records) {
     console.log(records);
      res.view('schedule/log', {data: records});
    });
  },
}



