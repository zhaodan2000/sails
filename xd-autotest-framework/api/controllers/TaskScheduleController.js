/**
 * TaskScheduleController
 *
 * @description :: Server-side logic for managing Taskschedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs=require('fs');
var path=require('path');

module.exports = {
  refreshView:function(req,res){
    mongoService.Find('ScheduleTask',null,function (records) {
      console.log(records);
      res.view('schedule/index', {data:records});
    });
  },

  /**
   * 添加sc任务
   * @param req
   * @param res
   */
  save: function (req, res) {
    console.log("123");
    var form = req.body;
    console.log(form);
    var sc = {sc_id:form.sc_id,
                    sc_name:form.sc_name,
                    sc_desc:form.sc_desc,
                    sc_type:form.sc_type,
                    sc_task_id:form.sc_task_id,
                    sc_task_name:form.sc_task_name,
                    sc_host:form.sc_host,
                    sc_time:form.sc_time,
                    sc_state:form.sc_state
      };
    mongoService.Insert("ScheduleTask", sc, function (records) {
      if (records){
        //sucess
        console.log('insert sucess');
        //创建任务成功之后需要设置任务的调度策略
        //在这里查找调度策略
        return res.send(records);
      }else {
        //fail
        console.log('insert fail');
      }
    });
  },

  /**
   * 删除
   * @param req
   * @param res
   */
  remove: function (req, res) {
    console.log(req);
    mongoService.Delete('ScheduleTask',{sc_id:req.body.sc_id});
    mongoService.Find("ScheduleTask", null, function (records) {
      if(records){
        return res.send(records);
      }
    })
  },



  edit:function(req,res) {
    var form = req.body;
    var sc = {
      sc_name:form.sc_name,
      sc_desc:form.sc_desc,
      sc_type:form.sc_type,
      sc_task_id:form.sc_task_id,
      sc_task_name:form.sc_task_name,
      sc_host:form.sc_host,
      sc_time:form.sc_time,
      sc_state:form.sc_state
    };
    mongoService.Update("ScheduleTask", sc,{sc_id:form.sc_id},function(records){
      if(records){
        res.send(records);
      }else{
        res.send({errMsg:"更新失败"});

      }
    });
  },
};



