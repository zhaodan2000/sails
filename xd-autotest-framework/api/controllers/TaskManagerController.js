/**
 * Created by xiaodou_chenxiaoxiang on 16/8/9.
 */
module.exports = {
  /**
   * 刷新task视图
   * @param req
   * @param res
     */
  showTaskMangerView: function (req, res) {
    // console.log(req.param());
    mongoService.Find("TaskFolder", null, function (records) {
      // console.log('records:'+ records);
      res.view('task/index', {data:records});
    });
  },

  /**
   * 添加task任务
   * @param req
   * @param res
     */
  addTask: function (req, res) {
    console.log('req.body:'+JSON.stringify(req.body, null, 4));
    var form = parseAddTaskBody(req.body);
    var taskForm = {Task_name:form.task_name, type:form.type, Schedule_ID:form.schedule_ID, Schedule_desc:form.schedule_desc};
    mongoService.Insert("TaskFolder", taskForm, function (records) {
      if (records){
        //sucess
        console.log('insert sucess');
        console.log('insert records:'+JSON.stringify(records, null, 4));
        return res.send(records);
        // mongoService.Find("TaskFolder", null, function (records) {
        //   // res.view('task/index', {data:records});
        //   return res.send('sucess');
        // });
      }else {
        //fail
        console.log('insert fail');
      }
    });
  },

  /**
   * 查找一个task任务
   * @param req
   * @param res
     */
  selectTask: function (req, res) {

  },

  /**
   * 进入到编辑task页面
   * @param req
   * @param res
     */
  editTask: function (req, res) {
    console.log(req.param("Task_name"));
    //根据taskId搜索task
    mongoService.Find('TaskFolder',{Task_name:req.param("Task_name")}, function (records) {
      if(records){
        console.log("find sucess :"+JSON.stringify(records, null, 4));
        res.view("task/groupDetailView", {data:records[0]});
      }
    })
  },

  /**
   * 删除task任务
   * @param req
   * @param res
     */
  deleteTask: function (req, res) {
    console.log(req.body.taskId);
    //根据taskId搜索task
    mongoService.Delete('TaskFolder',{id:req.body.taskId}, function (records) {
      if(records){
        console.log("delete sucess %s", records);
        // 跳转页面并显示
        // res.view("task/groupDetailView", {data:records});
      }
    })
  },

  /**
   * 清空所有任务
   * @param req
   * @param res
     */
  deleteAllTasks: function (req, res) {
    mongoService.Delete('TaskFolder', null);
    res.view('task/index', {data:null});
  },

  /**
   * run一个task
   * @param req
   * @param res
     */
  runTask: function (req, res) {

  }
};

/**
 * 创建task时解析提交的表单数据
 * @param body
 * @returns {*}
 */
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
