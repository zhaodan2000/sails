/**
 * Created by chenxiaoxiang on 16/8/8.
 */

/**
 * 显示任务管理页面
 */
function showManagerTask(){
  $.main.refreshRight("/TaskManager/showTaskMangerView", {data:'1'});
}

/**
 * 刷新main列表(左边的任务列表)
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

