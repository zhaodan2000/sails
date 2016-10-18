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
    var form =req.body;
    var taskForm = {Task_name:form.sequenceCase_name, Task_desc:form.sequenceCase_desc,uniqID:(new Date().getTime()).toString()};
    mongoService.Insert("TaskFolder", taskForm, function (records) {
      if (records){
        return res.send(records);
      }else {
        //fail
        console.log('insert failed;');
      }
    });
  },

  /**
   * 查找一个task任务
   * @param req
   * @param res
     */
  selectTask: function (req, res) {
    var uniqID=req.body["uniqID"];
    console.log(uniqID);
    //根据uniqId搜索task
    mongoService.Find('TaskFolder',{uniqID:uniqID}, function (found_task) {
      if (found_task&&found_task.length>0) {
        res.view('task/singleOC',{data:found_task});
      }else{
        res.view('task/singleOC',{data:null});
      }
    });
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
  addOrderCase: function (req, res) {
    console.log(req.body);
    var item=req.body["orderCase"];
    var taskFolder_uniqid=req.body["taskFolder_uniqid"];
    if(item&&item.uniqID){
      mongoService.Find('TaskFolder',{uniqID:taskFolder_uniqid},function(found_folder){
        if(found_folder&&found_folder.length>0){
          item["TaskID"]=found_folder[0].id;
          mongoService.Insert("TaskCase", item, function (records) {
            if (records){
              //success.
              mongoService.Find('TaskFolder',{uniqID:taskFolder_uniqid},function(found){
                res.view('task/singleOC',{data:found});
              });
            }else {
              //fail
              res.view('task/singleOC',{data:null});
            }
            });
        }else{
          res.view('task/singleOC',{data:null});
        }
      });
    }else{
      res.view('task/singleOC',{data:null});
    }
  },

  /**
   * 更新顺序用例的内容
   * @param req
   * @param res
   */
  updateOrderCase: function (req, res) {
    var item=req.body["orderCase"];
    if(item&&item.uniqID){
      mongoService.Update("TaskCase", item, {uniqID:item.uniqID}, function (records) {
        if (records){
          //success.
          mongoService.Find('TaskFolder',{uniqID:taskFolder_uniqid},function(found){
            res.view('task/singleOC',{data:found});
          });
        }else {
          //fail
          res.view('task/singleOC',{data:null});
        }
      });
    }else{
      res.view('task/singleOC',{data:null});
    }
  },

  // 交换顺序
  exchangeOrder:function(req,res){
    var uniqid_1=req.body["uniqid_1"];
    var uniqid_2=req.body["uniqid_2"];

    mongoService.Find()
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
 * 刷新task页面
 */
function refreshTaskView(res) {
  mongoService.Find("TaskFolder", null, function (records) {
    // console.log('---------------find'+records);
    res.view('task/index', {data:records});
  })
}
