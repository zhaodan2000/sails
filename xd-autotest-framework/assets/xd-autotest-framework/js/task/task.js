/**
 * Created by chenxiaoxiang on 16/8/8.
 */

/**
 * 显示任务管理页面
 */
function showManagerTask(){
  $.main.refreshMain("/TaskManager/showTaskMangerView");
}

/**
 * 添加一个task
 */
$(document).ready(function () {
  var option_save = {
    url:"/TaskManager/addTask",
    success: function(data) {
      // console.log('+++++++++++++++'+data);
      //刷新页面之后后出现遮罩
      $.main.refreshMain("/TaskManager/showTaskMangerView");
      }
  };

  //ajaxSubmit 
  $("#saveBtn").click(function () {
    $("#addTaskModal").toggle();
    $("div.modal-backdrop").remove();
    $("body.modal-open").toggleClass("modal-open");
    $("#form").ajaxSubmit(option_save);
  });
});


/**
 * 删除所有任务
 */
function deleteAllTasks() {
  $.main.refreshMain("/TaskManager/deleteAllTasks");
}



/**
 * 显示orderCase的详情页面
 */
function showOrderCaseInfo() {
  $.main.refreshRight();
}

/**
 * 显示用例详情页面
 */
function showCaseInfo() {
  $.main.refreshRight();
}

/**
 * 根据任务名运行任务
 * @param taskName
 */
function runSelectedTask(uniqID) {
  console.log('uniqID:%s',uniqID);
  $.post("/TaskManager/runTask", {uniqID:uniqID}, function (result) {
    // $.main.refreshMain("/TaskManager/showTaskMangerView");
    alert("收到开始运行信息")
  }, "json");
}

/**
 * 根据任务名显示task的详情页面
 */
function showTaskDetailView(uniqID) {
  console.log('uniqID:%s',uniqID);
  $.main.refreshRight("/TaskManager/editTask", {data:{uniqID:uniqID}});
}

/**
 * 根据任务名删除任务
 * @param taskName
 */
function deleteSelectedTask(uniqID) {
  $.post("/TaskManager/deleteTask", {uniqID:uniqID}, function (result) {
    $.main.refreshMain("/TaskManager/showTaskMangerView");
    alert("删除成功")
  }, "json");
}

/**
 * 显示单个用例详情
 * @param data
 */
function requestItem(data) {
  console.log('---------'+data.name);
  $.main.refreshRight("/TaskManager/findRequestItemByID", {data: {name: data.name}});
}

/**
 * 运行单个测试用例并展示
 * @param data
 */
function runsingleCase(data) {

}

//运行与保存
$(document).ready(function () {
  var option_run = {
    url: '/TaskManager/runSingleCase',
    data: null,
    success: function (data) {

    }
  };
  var option_save = {
    url: "/TaskManager/saveSingleCase",
    success: function (data) {
      console.log('+++++++++++++++' + data);
      alert('This request had been stored into DB!')
    }
  };

  // ajaxSubmit 
  //运行事件
  $("#runBtn").click(function () {
    $("#form").ajaxSubmit(option_run);
  });

  //保存事件
  $("#saveBtn").click(function () {
    $("#form").ajaxSubmit(option_save);
  });
});


function saveButtonClicked() {
  $('#myModal').modal('hide');
  $(".modal-backdrop").hide();
  // console.log(JSON.stringify(data, null, 4));
  console.log($("#form").name);
}

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
