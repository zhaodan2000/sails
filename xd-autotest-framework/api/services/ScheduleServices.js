/**
 * Created by zhouhuanon 16/10/9.
 */
var map = require("../utils/maps").newHashMap();
module.exports = {
    /**
     * 根据任务的调度策略类型Schedule_ID进行调度
     * @param scheduleID
     */
    startAll: function()
  {
    var schedule = require("node-schedule");
    var scArr = getSc();
    for (var i=0;i<scArr.length;i++){
       var sc=scArr[i];
      var j = schedule.scheduleJob(sc.sc_time, function () {
        map.put(sc.sc_id,j);
        console.log("执行任务");
      });
    }
  },
  /**
   * 根据任务的调度策略类型Schedule_ID进行调度
   * @param scheduleID
   */
  startById: function(sc_id)
  {
    var schedule = require("node-schedule");
    var scArr = getSc(sc_id);
    var sc=scArr[0];
    var j = schedule.scheduleJob(sc.sc_time, function () {
        map.put(sc.sc_id,j);
        console.log("执行任务");
      });
  },

  /**
   * 查找schedule
   * @param scheduleID
   */
  getSc: function(sc_id) {
    mongoService.Find('ScheduleTask',{sc_id:sc_id},function (records) {
      console.log(records);
      return records;
    });
  },

  /**
   * 停止定时任务
   * @param scheduleID
   */
  stop: function(sc_id) {
    var job= map.get(sc_id);
    job.cancel();
  },
  /**
   * 启动定时任务
   * @param scheduleID
   */
  start: function(sc_id) {
    startById(sc_id);
  },
}
