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
  doc: function(req, res) {
    res.view('doc/APIdoc');
  },
  task: function(req, res) {
    res.view('task/index');
  },
  testcase: function(req, res) {
    res.view('testcase/index');
  },
  schedule: function(req, res) {
    res.view('schedule/index');
  },
};

