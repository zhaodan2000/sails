/**
 * Created by zhouhuanon 16/10/9.
 */
var map = require("../utils/maps").newHashMap();
module.exports = {
    /**
     * 根据任务的调度策略类型Schedule_ID进行调度
     * @param scheduleID
     */
    execTaskWithScheduleID: function()
  {
    var schedule = require("node-schedule");
    var scArr = getSc();
    for (var i=0;i<scArr.length;i++){
       var sc=scArr[i];
      var j = schedule.scheduleJob(sc.sc_time, function () {
        map.put(j.getId(),j);
        console.log("执行任务");
      });
    }
  },


  /**
   * 查找schedule
   * @param scheduleID
   */
  getSc: function() {
    mongoService.Find('ScheduleTask',null,function (records) {
      console.log(records);
      return records;
    });
  },
}
