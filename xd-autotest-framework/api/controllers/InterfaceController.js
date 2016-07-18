/**
 * InterfaceController
 *
 * @description :: Server-side logic for managing Interfaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  hello: function (req, res) {
    var iter = {name: "test", version: "1.0", description: "it's a desc", url: "192.168.88.89:8042", inputFile: "123", outputFile: "456"};
    Interface.create(iter).exec(function createCB(err, created) {
      if (err) {
        // 如果有误，返回错误
        res.view('passport/register', {err: err});
      } else {
        // 否则，将新创建的用户登录
        res.send("Ok");
      }
    });
  },
  hello2: function (req, res) {
    Interface.findOne({name: "test"}).exec(function (err, articles) {
      if (!err) {
        // 刷新下一页
        return res.send(articles);
      }
      else {
        console.log(err);
      }
    });
  }
};

