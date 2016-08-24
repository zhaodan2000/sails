/**
 * TaskScheduleController
 *
 * @description :: Server-side logic for managing Taskschedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  refreshView: function (req, res) {
    mongoService.Find("TaskFolder", null, function (records) {
      // console.log('records:~~~~~'+ records);
      res.view('schedule/index', {data:records});
    });
  },

	changeScheduleForTask: function (req, res) {
    // console.log(req.param("taskName"));
    // console.log(req.param("desc"));
    var taskFolder = parseDesc(req.param("desc"), req.param("uniqID"));

    mongoService.Find('TaskFolder', {uniqID:taskFolder.uniqID}, function (folders) {
      if(folders){
        var folder = folders[0];
        // console.log(JSON.stringify(folder, null, 4)+'-------------');
        folder.Schedule_ID = taskFolder.Schedule_ID;
        folder.Schedule_desc = taskFolder.Schedule_desc;
        var dic = {uniqID:taskFolder.uniqID};
        // delete folder.id;
        // delete folder.Task_name;
        delete folder.Cases;
        // console.log(JSON.stringify(folder, null, 4)+'~~~~~~~~~~~~~~~~');
        // console.log(JSON.stringify(dic, null, 4)+'~~~~~~~~~~~~~~~~');
        mongoService.Update('TaskFolder', folder, dic, function (records) {
          if(records){
            // console.log('-------------'+JSON.stringify(records, null, 4));
            return res.send("sucess");
            //成功之后刷新整个页面(以后可以做成只刷新单个表格)
            mongoService.Find("TaskFolder", null, function (records) {
              // console.log('records:'+ JSON.stringify(records, null, 4));
              // res.view('schedule/index', {data:records});

            });
          }
        });
      }
    })
  }
};

function parseDesc(desc, uniqID) {
  var task= {};
  switch(desc){
    case '不会自动执行任务脚本':
      task.Schedule_ID = "1";
      break;
    case '每天07:30执行任务脚本':
      task.Schedule_ID = "2";
      break;
    case '每周日22：30执行任务':
      task.Schedule_ID = "3";
      break;
    case '每周周一到周五21:00执行任务脚本':
      task.Schedule_ID = "4";
      break;
    default:
      break;
  }
  task.uniqID = uniqID;
  task.Schedule_desc = desc;
  // console.log(JSON.stringify(task, null, 4)+'~~~~~~~');
  return task;
}
