/**
 * InterfaceDocController
 *
 * @description :: Server-side logic for managing Interfacedocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    testCallback:function(req,res, callbackFnc){
      //Request

    },

    callbackFnc:function(req){
      return req;
    },

    testRequestService:function(req,res){

    var apiItem={id:"100000",dev:"lidehong",disabled:false,name:"newLogin_API",
      url:"http://192.168.103.101:8002/user/newLogin",
      queryParam:{req:"{\"platform\":\"local\",\"phoneNum\":\"13600800800\", "+
      "\"pwd\":\"123456\",\"registrationId\":\"testID123456\"}"},
      version:"1.0.0",description:"test !!!",method:"POST",headers:{module:"2",
        clientType:"ios",version:"1.0.0",clientIp:"127.0.0.1",deviceId:"testDeviceId123456"},
      mode:"urlencoded",response:""};


    //var apiItem = {name: "login", version: "1.0",dev: 'zhang', description: "it's a desc", url: "http://192.168.103.101:8002/user/newLogin", method: "POST", headers: {clientType: 'android',module: '2',version: '1.0',clientIp: '192.168.31.23',deviceId: 'MyTestDeviceID123'},mode:'urlencoded',queryParam:{req:'{\"platform\":\"local\",\"phoneNum\":\"18210191798\",\"pwd\":\"123456\"}'}};

    RequestItem.create(apiItem).exec(function(err,records){
      if(err){
        return res.serverError(err);
      }
      console.log("records.name is: %s",records.name);
      return res.send(JSON.stringify(records));
    });

    //var item=  //JSON.stringify(records);

    //var item= DocService.writeAPItoDB(apiItem);

  },

  testmyservice:function(req,res){
    /**
    var apiItem={id:"1",dev:"李德洪",disabled:false, version:"1.0.0",description:"登录接口newLogin",name:"登录接口newLogin",
      url:'http://192.168.88.242:8002/user/newLogin', queryParam:"req={\"platform\":\"local\",\"phoneNum\":\"13600800800\", " +
      "\"pwd\":\"123456\",\"registrationId\":\"testID123456\"}"};

    console.log("testmyservice:%s",apiItem.id);
    RequestItem.create(apiItem).exec(function createItem(err,records){ */

    var item={name:"Polly222",wingspn:"168.5000"};

    InterfaceDoc.create(item).exec(function(err,records){
      if (err) {
        return res.serverError(err);
      }
      console.log("records.name is: %s",records.name);

      var item=JSON.stringify(records);

      //var item= DocService.writeAPItoDB(apiItem);
      return res.send(item);
    });

  },

  testmydb: function(req,res){
    var item={name:"Polly",wingspn:"168.5"};
    console.log('info.........');

    var req={name:"Polly",wingspn:"168.5"};
    hello(req,res);
    console.log("invoke Interface.hello()function successfully!!");
    //
    InterfaceDoc.create(item).exec(function createCB(err,records){
      if(err){
        //res.send("create item record in mongo db failed!");
        res.send(err);
        //console.log(err);
      }
      else{

        InterfaceDoc.findOne({name:"Polly"}).exec(function (err, records) {
          if (!err) {
            // 刷新下一页
            res.send("success");
          }
          else {
            console.log(err);
            res.view('apidoc'); //输入route.js里的定义的路径名。
          }
        });

      }
    });
  },



};

