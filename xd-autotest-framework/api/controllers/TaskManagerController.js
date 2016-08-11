/**
 * Created by xiaodou_chenxiaoxiang on 16/8/9.
 */
module.exports = {
  showTaskMangerView: function (req, res) {
    // console.log(req.param());
    mongoService.Find("TaskFolder", null, function (records) {
      // console.log('records:'+ records);
      res.view('task/index', {data:records});
    });
  },

  runTask: function (req, res) {

  },

  addTask: function (req, res) {
    console.log('req.body:'+JSON.stringify(req.body, null, 4));
    //从上传的数据中获得task数据
    //创建task
    //搜索数据库
    //刷新页面
    var taskForm = {Task_name:'a NEW task', Schedule_ID:'1', Schedule_desc:'每月执行一次'};
    mongoService.Insert("TaskFolder", taskForm, function (records) {
      if (records ){
        console.log('insert sucess');
        // console.log(records);
        mongoService.Find("TaskFolder", null, function (records) {
          // console.log('records:'+ records);
          res.view('task/index', {data:records});
        });
      }else {

      }
    });
  },

  selectTask: function (req, res) {

  },

  editTask: function (req, res) {

  },

  deleteTask: function (req, res) {

  }
};
