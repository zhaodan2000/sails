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
    var form = parseAddTaskBody(req.body);
    var taskForm = {Task_name:form.task_name, type:form.type, Schedule_ID:form.schedule_ID, Schedule_desc:form.schedule_desc};
    mongoService.Insert("TaskFolder", taskForm, function (records) {
      if (records){
        //sucess
        console.log('insert sucess');
        mongoService.Find("TaskFolder", null, function (records) {
          res.view('task/index', {data:records});
        });
      }else {
        //fail
        console.log('insert fail');
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

function parseAddTaskBody(body) {
  var form = body;
  form.schedule_ID = "";
  console.log(body.schedule_desc);
  switch(body.schedule_desc){
    case '不会自动执行任务脚本':
      form.schedule_ID = "1";
      break;
    case '每天07:30执行任务脚本':
      form.schedule_ID = "2";
      break;
    case '每周日22：30执行任务':
      form.schedule_ID = "3";
      break;
    case '每周周一到周五21:00执行任务脚本':
      form.schedule_ID = "4";
      break;
    default:
      break;
  }
  console.log('form.schedule_ID' +form.schedule_ID);

  switch(body.type_desc){
    case 'group':
      form.type = '1'
      break;
    case 'orderCase':
      form.type = '2'
      break;
    default:
      break;
  }
  return form;
}
