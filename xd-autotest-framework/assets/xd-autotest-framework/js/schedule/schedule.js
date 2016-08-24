/**
 * Created by xiaodou_chenxiaoxiang on 16/8/12.
 */

function changeTaskSchedule(data) {
  var desc= '';

  // var ns=data.btn.parentNode.childNodes;
  //取兄弟节点数组的第二个,因为换行会生成text
  var select = data.btn.parentNode.childNodes[1];
  // console.log(ns);
 //获取select中的option数组
  var options = select.childNodes;
  // console.log(options);
  /**
   * 遍历数组,获取option节点
   */
  for (i = 0; i < options.length; i++){
    if (options[i].nodeName.toLowerCase() === 'option'){
      var option = options[i];
      // console.log(option);
      if(option.selected){//如果是被选中的
        desc = option.innerText;
      }
    }
  }
  // console.log(desc);
  // console.log(data.taskName);
  $.post("/TaskSchedule/changeScheduleForTask", {uniqID:data.uniqID,desc:desc}, function (result) {
    console.log('update schedule sucess!');
    refreshView();
  })
}

function refreshView() {
  $.main.refreshMain("/TaskSchedule/refreshView");
}
