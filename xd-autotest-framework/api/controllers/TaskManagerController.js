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
    var taskForm = {Task_name:form.task_name, type:form.type, Schedule_ID:form.Schedule_ID, Schedule_desc:form.schedule_desc,uniqID:(new Date().getTime()).toString()};
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
    console.log(req.param("uniqID"));
    //根据taskId搜索task
    mongoService.Find('TaskFolder',{uniqID:req.param("uniqID")}, function (taskdatas) {
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
    mongoService.Find('TaskFolder',{uniqID:req.body.uniqID}, function (records) {
      if(records){

        if(records.length > 0){
          var task = records[0];
          //根据task生成collection
          console.log(JSON.stringify(task, null, 4)+"---------");

          var cases = task.Cases;
          var items = new Array;
          console.log(JSON.stringify(cases, null, 4)+"----+----");
          for(i=0; i< cases.length; i++){
            var caseItem = cases[i];
            delete caseItem.ReqFolderID;
            delete caseItem.createdAt;
            delete caseItem.updatedAt;
            delete caseItem.TaskID;
            delete caseItem.dirpath;
            delete caseItem.id;
            // console.log("~~~~"+JSON.stringify(caseItem, null, 4));
            //根据caseItem生成requestItem并添加到collection中
            // var item = RequestItem.create(caseItem);
            // console.log(item);
            var request = RequestItemServices.configRequestItem(caseItem);
            var item = RequestItemServices.configItem(request, new Array);
            items.push(item);
            console.log("~~~~"+JSON.stringify(item, null, 4));
          }
          task.items = items;
          // console.log(JSON.stringify(task, null, 4));
          var collection = CollectionServices.creatCollectionWithTask(task);
          console.log(JSON.stringify(collection, null, 4));
          //设置option, 待完善
          var option = CollectionServices.optionMake();

          CollectionServices.testCollectionWithCallBack(collection, option, function (exitCode, results) {
            console.log('exitcode:'+exitCode);
            console.log('results:'+results);
            //成功运行之后返回成功信息
            return res.send(exitCode);
          });
        }
      }
    })
  },
  /**
   * 删除task任务
   * @param req
   * @param res
   */
  deleteTask: function (req, res) {
    mongoService.Delete('TaskFolder',{uniqID:req.body.uniqID});
    mongoService.Find("TaskFolder", null, function (records) {
      if(records){
        return res.send(records);
      }
    })
  },

  /**
   * 通过name显示用例详情
   * @param req
   * @param res
     */
  findRequestItemByID:function (req,res) {
    var dic = {name:req.param("name")};
    console.log(dic);
    mongoService.Find('TaskCase',dic,function (record) {
      console.log('case is'+JSON.stringify(record, null, 4));
      res.view('task/caseDetailView', {data:record});
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
            console.log(JSON.stringify(records, null, 4));
            console.log('insert sucess');
            return res.send(records);
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
    console.log("deleteAllCase------"+req.body.Task_ID);
    var taskId = req.body.Task_ID;
    // var taskId = ;
    mongoService.Delete("TaskCase", {TaskID:taskId});
    // mongoService.Delete("TaskCase", {TaskID:taskId.toString()}, function(record) {
    //   console.log(record);
    // });
    return res.send("receive");
  },

  /**
   * 删除单个用例
   * @param req
   * @param res
     */
  deleteSingleCase: function (req, res) {
    console.log("deleteCase------"+req.body.uniqID);
    var uniqID = req.body.uniqID;
    // var taskId = req.body.taskId;
    mongoService.Delete("TaskCase", {uniqID:uniqID});
    // mongoService.Delete("TaskCase", {TaskID:taskId.toString()}, function(record) {
    //   console.log(record);
    // });
    return res.send("receive");
  },
  /**
   * 更新task中Cases数组中case顺序
   * @param req
   * @param res
     */
  updateCasesOrder: function (req, res) {

  },

  /**
   * 单个接口的测试
   * @param req
   * @param res
     */
  runSingleCase: function (req, res) {


  },

  /**
   * 保存本次的修改
   * @param req
   * @param res
     */
  saveSingleCase:function (req, res) {

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

