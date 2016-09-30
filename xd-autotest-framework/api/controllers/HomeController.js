/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function(req, res) {
    res.view('index');
  },
  overview: function(req, res) {
    res.view('overview/index');
  },
  task: function(req, res) {
    mongoService.Find("OrderCaseCollection", null, function (records) {
      console.log('records:'+ records);
      res.view('task/index', {data:records});
    });
  },
  testcase: function(req, res) {
    mongoService.Find("CaseCollection",null,function (records) {
      res.view('testcase/index', {data:records,curr_tc_coll:records[0]});
    });
  },
  schedule: function(req, res) {
    mongoService.Find("OrderCaseCollection", null, function (records) {
      console.log('records:'+ records);
      res.view('schedule/index', {data:records, curr_tc_coll:null});
    });
  },
};

