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
    refreshTaskView(res);
  },

  /**
   * 添加task任务
   * @param req
   * @param res
     */
  addTask: function (req, res) {
    // console.log('req.body:'+JSON.stringify(req.body, null, 4));
    var form = parseAddTaskBody(req.body);
    var taskForm = {Task_name:form.task_name, type:form.type, Schedule_ID:form.Schedule_ID, Schedule_desc:form.schedule_desc};
    mongoService.Insert("TaskFolder", taskForm, function (records) {
      if (records){
        //sucess
        console.log('insert sucess');
        return res.send(records);
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
    mongoService.Find('TaskFolder',{Task_name:req.param("Task_name")}, function (taskdatas) {
      if(taskdatas){
        // console.log("find sucess :"+JSON.stringify(taskdatas, null, 4));
        //搜索全部的用例显示在左边
        mongoService.Find('ReqFolder',null, function (requestsdata) {
          if(requestsdata){
            // console.log('all requests:'+JSON.stringify(requestsdata, null, 4));
            res.view("task/groupDetailView", {data:taskdatas[0], reqs:requestsdata});
          }
        })

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
    console.log(req.body);
    //根据taskId搜索task
    mongoService.Find('TaskFolder',{Task_name:req.body.Task_name}, function (records) {
      if(records){

        console.log(JSON.stringify(records, null, 4));
        //使用records进行配置collection并运行

        //成功运行之后返回成功信息
        return res.send(records);

      }
    })
  },
  /**
   * 删除task任务
   * @param req
   * @param res
   */
  deleteTask: function (req, res) {
    mongoService.Delete('TaskFolder',{Task_name:req.body.Task_name});
    mongoService.Find("TaskFolder", null, function (records) {
      if(records){
        return res.send(records);
      }
    })
  },

  /**
   * 更新task, 向task的Cases数组中添加case
   * @param req
   * @param res
     */
  addCaseToTask: function (req, res) {
    // var ObjectId = require('mongodb').ObjectID;
    var item = req.param("item");
    // console.log(JSON.stringify(item, null, 4));
    mongoService.Find("RequestItem", { name:item.itemName}, function (requestItems) {
      if(requestItems){
        var requestItem = requestItems[0];
        requestItem.TaskID = item.taskId;
        delete requestItem["id"];
        // console.log("requestItem:"+JSON.stringify(requestItem, null, 4));
        mongoService.Insert("TaskCase", requestItem, function (records) {
          if (records){
            //sucess
            console.log('insert sucess');
            // return res.send(records);
          }else {
            //fail
            console.log('insert fail');
          }
        });
      }
    })


  },

  /**
   * 更新task, 删除task的Cases数组中所有case
   * @param req
   * @param res
     */
  deleteAllCase: function (req, res) {

  },
  /**
   * 更新task中Cases数组中case顺序
   * @param req
   * @param res
     */
  updateCasesOrder: function (req, res) {

  }
};

/**
 * 创建task时解析提交的表单数据
 * @param body
 * @returns {*}
 */
function parseAddTaskBody(body) {
  var form = body;
  form.Schedule_ID = "";
  console.log(body.schedule_desc);
  switch(body.schedule_desc){
    case '不会自动执行任务脚本':
      form.Schedule_ID = "1";
      break;
    case '每天07:30执行任务脚本':
      form.Schedule_ID = "2";
      break;
    case '每周日22：30执行任务':
      form.Schedule_ID = "3";
      break;
    case '每周周一到周五21:00执行任务脚本':
      form.Schedule_ID = "4";
      break;
    default:
      break;
  }
  console.log('form.Schedule_ID' +form.Schedule_ID);

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

/**
 * 刷新task页面
 */
function refreshTaskView(res) {
  mongoService.Find("TaskFolder", null, function (records) {
    // console.log('---------------find'+records);
    res.view('task/index', {data:records});
  })
}
