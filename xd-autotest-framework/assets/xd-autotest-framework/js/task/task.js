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

/**
 * 删除所有任务
 */
function deleteAllTasks() {
  $.main.refreshMain("/TaskManager/deleteAllTasks");
}

/**
 * 显示单个用例详情
 * @param data
 */
function requestItem(data) {
  console.log('---------'+data.name);
  $.main.refreshRight("/TaskManager/findRequestItemByID", {data: {name: data.name}});
}

function saveButtonClicked() {
  $('#myModal').modal('hide');
  $(".modal-backdrop").hide();
  // console.log(JSON.stringify(data, null, 4));
  console.log($("#form").name);
};


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
 * 根据任务名删除任务。
 * @param taskName
 */
function deleteSelectedTask(uniqID) {
  $.post("/TaskManager/deleteTask", {uniqID:uniqID}, function (result) {
    $.main.refreshMain("/TaskManager/showTaskMangerView");
    alert("删除成功")
  }, "json");
}

/**
 * 测试展示隐藏row。
 */
$('a[name="querySequence"]').click(function(){
  $('#test_hidden_row').attr("style","display: ");
});

//查看当前集合的内容。
$('button[name="getCurTask"]').click(function(){
  var task_uniqid=$(this).attr("uniqid");
  var option= {
    method:'POST',
    data:{
      uniqID:task_uniqid
    }
  };
  $.main.refreshRight('TaskManager/selectTask',option);

});


