/**
 * Created by chenxiaoxiang on 16/8/8.
 */

/**
 * 显示任务管理页面
 */
function showManagerTask(){
  $.main.refreshMain("/TaskManager/showTaskMangerView");
}

$(document).ready(function () {
  var option_save = {
    url:"/TaskManager/addTask",
    success: function(data) {
       console.log('+++++++++++++++'+data);

      $.main.refreshMain("/TaskManager/showTaskMangerView");
      console('This request had been stored into DB!'
      )}
  };

  //ajaxSubmit 
  $("#saveBtn").click(function () {
    console.log("ok");
    $("#form").ajaxSubmit(option_save);
    $('#addTaskModal').modal('hide');
  });
});

/**
 * 刷新整个页面
 */
function refreshMainList() {
  $.main.refreshMain();
}

/**
 * 显示task的详情页面
 */
function showTaskDetailView() {
  $.main.refreshRight();
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


