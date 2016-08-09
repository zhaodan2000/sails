/**
 * Created by xiaodou_chenxiaoxiang on 16/8/9.
 */
module.exports = {
  showTaskMangerView: function (req, res) {
    console.log(req.param());
    res.view('taskManagerView');
  }
};
