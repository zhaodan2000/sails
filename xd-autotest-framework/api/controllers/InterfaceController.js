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
        console.log(err);
        // 如果有误，返回错误
        RequestItem.find({name:'login'}).exec(function (err, records) {
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
        res.send("Ok"+ JSON.stringify(created));
      }
    });
  },
  hello2: function (req, res) {
    RequestItem.findOne({name: "login"}).exec(function (err, articles) {
      if (!err) {
        // 刷新下一页
        return res.send(articles);
        var request = RequestItemServices.configRequestItem(articles);
        var item = RequestItemServices.configItem(request);
        var collection = RequestItemServices.configCollection(item);
        console.log(collection);
        RequestItemServices.newmanTest(collection);
        // return res.send(collection);
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
    var filePath = path.join(__dirname, '..', '..', 'outfile.json');
    console.log(filePath);
    var response = CollectionServices.parseResponse(filePath);
    return res.render('response', {data: response});

    RequestItem.findOne({name: "login"}).exec(function (err, articles) {
      if (!err) {
        // 刷新下一页
        // return res.send(articles);
        var request = RequestItemServices.configRequestItem(articles);
        var item = RequestItemServices.configItem(request);
        var collection = RequestItemServices.configCollection(item);
        // var collectionJson = JSON.parse(collection);
        // console.log(collection);
        // RequestItemServices.newmanTest(collection);

        var path = require('path');
        var filePath = path.join(__dirname, '..', '..', 'outfile.json');
        // console.log(filePath);
        var response = CollectionServices.parseResponse(filePath);

        var responseJson = JSON.parse(response);
        // console.log(JSON.stringify(responseJson));
        return res.render('response', {
          data: JSON.stringify(responseJson, null, 4),
          collection: JSON.stringify(collection, null, 4)
        });
      }
      else {
        console.log(err);
      }

    });
  },
  showdoc:function (req,res) {
    DocService.testcallback('newLogin_API', res, function (records) {
      res.view('showdoc', {data:records});
    })
  },

  showreq:function (req, res) {
    console.log(req.body);
    var item = {headers:{},queryParam:{}};
    for(var key in req.body){
      var re_header = new RegExp(/^header/);
      var flag_header = key.match(re_header);
      var re_queryParam = new RegExp(/^queryParam/);
      var flag_queryParam = key.match(re_queryParam);
      var headers = "headers";
      var queryParam = "queryParam";
      if (flag_header){
        var headerkey = key.substring(6);
        item[headers][headerkey] = req.body[key];
      }
      else if(flag_queryParam){
        var queryParamkey = key.substring(10);
        item[queryParam][queryParamkey] = req.body[key];
      }else {
        item[key] = req.body[key];
      }
    }

    console.log('item :' + JSON.stringify(item));
    RequestItem.update({name:req.body.name}, item, function (err, records) {
      if(err){
        console.log(err);
      }else {
        return res.send('OK');
      }
    })

    // return res.send(req.body);
  },

  showResponse: function (req, res) {

    console.log(req.body);
    // RequestItem.findOne({name: 'newLogin_API'}).exec(function (err, articles) {
    //   if (!err) {
    //     // 刷新下一页
    //     // return res.send(articles);
    //     var request = RequestItemServices.configRequestItem(articles);
    //     var item = RequestItemServices.configItem(request);
    //     var collection = RequestItemServices.configCollection(item);
    //     // var collectionJson = JSON.parse(collection);
    //     // console.log(collection);
    //     RequestItemServices.newmanTest(collection);
    //
    //     var path = require('path');
    //     var filePath = path.join(__dirname, '..', 'services', 'outfile.json');
    //     // console.log(filePath);
    //     var response = CollectionServices.parseResponse(filePath);
    //     console.log(response);
    //     var responseJson;
    //     if (response){
    //       responseJson = JSON.parse(response);
    //     }
    //
    //     console.log(JSON.stringify(responseJson));
    //     return res.view('response', {
    //       data: JSON.stringify(responseJson, null, 4),
    //       collection: JSON.stringify(collection, null, 4)
    //     });
    //     // return res.view('homeindex');
    //   }
    //   else {
    //     console.log(err);
    //   }
    // });
  }
};

