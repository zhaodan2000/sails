/**
 * InterfaceController
 * ***
 * @description :: Server-side logic for managing Interfaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
  hello: function (req, res) {
    var iter = {name: "test", version: "1.0", description: "it's a desc", url: "192.168.88.89:8042", inputFile: "123", outputFile: "456"};
    Interface.create(iter).exec(function createCB(err, created) {
      if (err) {
        // 如果有误，返回错误
        Interface.find({name:'test'}).exec(function (err, records) {
          if (!err) {
            // 刷新下一页
            res.send("success");
          }
          else {
            console.log(err);
            res.view('apidoc'); //输入route.js里的定义的路径名。
          }
        });
        //res.view('passport/register', {err: err});
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
        return res.send(articles.name);

      }
      else {
        console.log(err);
      }

    });
  },

  createNewCollection: function (req, res) {
    var iter = {name: "test", version: "1.0", description: "it's a desc", url: "192.168.88.89:8042", inputFile: "123", outputFile: "456"};
    var model = Interface.create(iter);

    var collection = CollectionServices.creatCollection(model);
    return res.send(collection);
  },

  testCollection: function (req, res) {
    var iter = {name: "test", version: "1.0", description: "it's a desc", url: "192.168.88.89:8042", inputFile: "123", outputFile: "456"};

    var model = Interface.create(iter);

    var collection = CollectionServices.creatCollection(model);
    res.send(collection);

    //设置option, 待完善
    var option = CollectionServices.optionMake();
    CollectionServices.testCollectionWithCallBack(collection, option, function (exitCode) {

      console.log(exitCode);
    });
  },

  getResponse: function (req, res) {
    var path = require('path');
    var filePath = path.join(__dirname, '..', '..','outfile.json');
    console.log(filePath);
    var response =  CollectionServices.parseResponse(filePath);

    return res.render('response', {data:response});
  }

};

