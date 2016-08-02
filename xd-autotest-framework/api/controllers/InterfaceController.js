/**
 * InterfaceController
 * ***
 * @description :: Server-side logic for managing Interfaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
  hello: function (req, res) {
    var iter = {name: "login", version: "1.0",dev: 'zhang', description: "it's a desc", url: "http://192.168.103.101:8002/user/newLogin", method: "POST", headers: {clientType: 'android',module: '2',version: '1.0',clientIp: '192.168.31.23',deviceId: 'MyTestDeviceID123'},mode:'urlencoded',queryParam:{req:'{\"platform\":\"local\",\"phoneNum\":\"18210191798\",\"pwd\":\"123456\"}'}};
    // var iter = {name:'test'};
    RequestItem.create(iter).exec(function createCB(err, created) {
      if (err) {
        // 如果有误，返回错误
        // res.view('passport/register', {err: err});
        console.log(err);
        res.send(err);
      } else {
        // 否则，将新创建的用户登录
        res.send("Ok");
      }
    });
  },
  hello2: function (req, res) {
    RequestItem.findOne({name: "login"}).exec(function (err, articles) {
      if (!err) {
        // 刷新下一页
        // return res.send(articles);
        var request = RequestItemServices.configRequestItem(articles);
        var item = RequestItemServices.configItem(request);
        var collection = RequestItemServices.configCollection(item);
        console.log(collection);
        RequestItemServices.newmanTest(collection);
        return res.send(collection);

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




