/**
 * Created by xiaodou_chenxiaoxiang on 16/8/12.
 */

function changeTaskSchedule() {
  //dic中应该传入task的name和修改之后的调度策略id
  $.post("/TaskSchedule/changeScheduleForTask", {dic:""}, function (result) {

  })
}
