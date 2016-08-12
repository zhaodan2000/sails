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
      // appendText(data);

      // showManagerTask();
      // $.main.refreshMain('task/index');
      }
  };

  //ajaxSubmit 
  $("#saveBtn").click(function () {
    $('#addTaskModal').modal('hide');
    $("#form").ajaxSubmit(option_save);
  });

  // $("#editBtn1").click(function(){
  //   console.log('buttonClicked');
  //   console.log($(this).attr("name"));
  // });
});

// function appendText(data)
// {
//   var td1=$("<td></td>").text(data.Task_name);  // 使用 jQuery 创建文本
//   var td2=$("<td></td>").text(data.createdAt);  // 使用 jQuery 创建文本
//   var td3=$("<td></td>").text(data.Schedule_desc);  // 使用 jQuery 创建文本
//   var td4=$("<td></td>").text(data.Schedule_ID);  // 使用 jQuery 创建文本
//   var tr = $("<tr></tr>");
//   tr.appendChild(td1,td2,td3,td4)
//   $("tbody").append(tr);        // 追加新元素
// }

/**
 * 删除所有任务
 */
function deleteAllTasks() {
  $.main.refreshMain("/TaskManager/deleteAllTasks");
}

/**
 * 刷新整个页面
 */
function refreshMainList() {
  $.main.refreshMain();
}

/**
 * 显示task的详情页面
 */
function showTaskDetailView(name) {
  console.log('name:%s',name);

  $.main.refreshRight("/TaskManager/editTask", {data:{Task_name:name}});
  // $.post("/TaskManager/editTask", {Task_name:name}, function (res) {
  //   //这里不用返回,直接跳转到taskDetail页面
  //   //
  // })
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


