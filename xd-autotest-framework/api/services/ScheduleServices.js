/**
 * Created by xiaodou_chenxiaoxiang on 16/8/24.
 */
module.exports = {
    /**
     * 根据任务的调度策略类型Schedule_ID进行调度
     * @param scheduleID
     */
    execTaskWithScheduleID: function(scheduleID)
  {

    console.log(scheduleID + '-------------');
    var schedule = require("node-schedule");
    /**
     * 根据id获取调度要使用的时间
     */
    var scheduleObj = getScheduleTimeWithID(scheduleID);
    var timeArr = scheduleObj.schedule_time.toString().split(":");

    //配置调度任务
    var rule = new schedule.RecurrenceRule();

    rule.dayOfWeek = scheduleObj.day_of_week;

    rule.hour = timeArr[0];

    rule.minute = timeArr[1];

    var j = schedule.scheduleJob(rule, function () {
      //执行任务
      console.log("执行任务3");
      this.findTaskWithSchedule(scheduleID);
    });
  },

  /**
   * 查找schedule
   * @param scheduleID
   */
   getScheduleTimeWithID: function(scheduleID) {
    mongoService.Find('ScheduleStrategy', {uniqId: scheduleID}, function (record) {
      if (record) {
        var scheduleObj = record[0];
        return scheduleObj;
      }
    })
  },

  findTaskWithSchedule: function(scheduleID){
      
  }
}
