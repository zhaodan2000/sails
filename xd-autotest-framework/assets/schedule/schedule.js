/**
 * Created by xiaodou_chenxiaoxiang on 16/8/12.
 */

function changeTaskSchedule(data) {
  //dic中应该传入task的name和修改之后的调度策略id
  var desc= $("#schedule_desc").val();
  console.log(desc);
  console.log(data.taskName);
  $.post("/TaskSchedule/changeScheduleForTask", {taskName:data.taskName,desc:desc}, function (result) {

  })
}
