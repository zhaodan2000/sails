/**
 * TaskScheduleController
 *
 * @description :: Server-side logic for managing Taskschedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	changeScheduleForTask: function (req, res) {
    console.log(req.param("taskName"));
    console.log(req.param("desc"));
    var taskFolder = parseDesc(req.param("desc"), req.param("taskName"));

    mongoService.Find('TaskFolder', {Task_name:taskFolder.Task_name}, function (folders) {
      if(folders){
        var folder = folders[0];
        console.log(JSON.stringify(folder, null, 4)+'-------------');
        folder.schedule_ID = taskFolder.schedule_ID;
        folder.Schedule_desc = taskFolder.Schedule_desc;
        var dic = {Task_name:taskFolder.Task_name};
        // delete folder.id;
        // delete folder.Task_name;
        console.log(JSON.stringify(folder, null, 4)+'~~~~~~~~~~~~~~~~');
        console.log(JSON.stringify(dic, null, 4)+'~~~~~~~~~~~~~~~~');
        mongoService.Update('TaskFolder', folder, dic, function (records) {
          if(records){
            console.log('-------------'+JSON.stringify(records, null, 4));
          }
        });
      }
    })
  }
};

function parseDesc(desc, name) {
  var task= {};
  switch(desc){
    case '不会自动执行任务脚本':
      task.schedule_ID = "1";
      break;
    case '每天07:30执行任务脚本':
      task.schedule_ID = "2";
      break;
    case '每周日22：30执行任务':
      task.schedule_ID = "3";
      break;
    case '每周周一到周五21:00执行任务脚本':
      task.schedule_ID = "4";
      break;
    default:
      break;
  }
  task.Task_name = name;
  task.Schedule_desc = desc;
  console.log(JSON.stringify(task, null, 4)+'~~~~~~~');
  return task;
}
