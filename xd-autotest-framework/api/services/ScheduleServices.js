/**
 * Created by zhouhuanon 16/10/9.
 */
module.exports = {
    /**
     * 根据任务的调度策略类型Schedule_ID进行调度
     * @param scheduleID
     */
    execTaskWithScheduleID: function(sc_id)
  {

    console.log(sc_id + '-------------');
    var schedule = require("node-schedule");
    var scArr = getSc();
    for (var i=0;i<scArr.length;i++){
       var sc=scArr[i];
      var j = schedule.scheduleJob(sc.sc_time, function () {
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
