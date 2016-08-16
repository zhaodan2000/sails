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
    $('#addTaskModal').modal('hide');
    $('addTaskModal').css("overflow","show");
    // $('addTaskModal').css("overflow","hidden");
    $(".modal-backdrop").hide();
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
function runSelectedTask(name) {
  console.log('name:%s',name);
  $.post("/TaskManager/runTask", {Task_name:name}, function (result) {
    // $.main.refreshMain("/TaskManager/showTaskMangerView");
    alert("收到开始运行信息")
  }, "json");
}

/**
 * 根据任务名显示task的详情页面
 */
function showTaskDetailView(name) {
  console.log('name:%s',name);
  $.main.refreshRight("/TaskManager/editTask", {data:{Task_name:name}});
}

/**
 * 根据任务名删除任务
 * @param taskName
 */
function deleteSelectedTask(name) {
  $.post("/TaskManager/deleteTask", {Task_name:name}, function (result) {
    $.main.refreshMain("/TaskManager/showTaskMangerView");
    alert("删除成功")
  }, "json");
}

