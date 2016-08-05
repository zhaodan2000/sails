/**
 * InterfaceDocController
 *
 * @description :: Server-side logic for managing Interfacedocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  testService:function(req,res){
    res.view('doc/APIdoc');
  },

  handleFileWrite:function(req,res) {
    var fs=require('fs');
    var path=require('path');

    console.log("current path:"+__dirname);

   /**
    * 读取文件目录是否存在。
    * */
    var mdFiledir=__dirname+'/mdFiles';
    fs.exists(mdFiledir,function(exists) {
      /**
       * 创建目录,如果目录不存在的话。
       * */
      if(!exists){
        fs.mkdir(mdFiledir,function(err){
          if(!err){
            console.log("目录已经创建成功。");
            return;
          }else{
            console.log("目录创建失败。");
            return;
          }
        });
      }else{console.log("目录已经存在,不需要再创建...");}
    });

    // fs.writeFile(filename,data,[options],callback);
    var w_data = '这是一段通过fs.writeFile函数写入的内容；\r\n';
    var w_data = new Buffer(w_data);

    /**
     * filename, 必选参数，文件名
     * data, 写入的数据，可以字符或一个Buffer对象
     * [options],flag,mode(权限),encoding
     * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
     */
    /**
    fs.writeFile(mdFiledir + '/test.md', w_data, {flag: 'a'}, function (err) {
      if(err) {
        console.error(err);
      } else {
        console.log('写入成功');
      }
    }); */

    // fs.appendFile(filename,data,[options],callback);

    fs.appendFile(mdFiledir + '/test.md', '***使用fs.appendFile追加文件内容', function () {
      console.log('追加内容完成');
    });
  },

  /**
   * 根据入参的name, 来查找mongodb里的符合条件的记录。
   **/
    findRequestItemByName:function(req,res) {
    //var requestName = "HOME6";
    /**
     DocService.testcallback(requestName,res,function (records) {
        if(records){
          var retres={retcode:0,retdesc:"success",data:records};
          res.send(retres);}
          else
          res.send({retcode:-1,retdesc:"syserror"})
      });
     */

    console.log("req.param()="+req.param());
    console.log("req.url="+req.url);
    console.log("req.method="+req.method);
    console.log("req.host="+req.host);
    var response={requestName:'newLogin',url:'http://192.168.103.101:8002/user/newLogin'};
    var retres = {retcode: 0, retdesc: "success", data: response};
    res.send(retres);
    //return response;

   /**
    mongoService.findRequestItemByName(req['data']['requestName'], function (records) {
      if (records) {
        var retres = {retcode: 0, retdesc: "success", data: records};
        res.send(retres);
      }
      else
        res.send({retcode: -1, retdesc: "syserror"})
    });

    */
  },

  /**
   * 删除MongoDB中的记录。
   * @param req
   * @param res
     */
    deleteRecordsByID:function(req,res){
        //var name="";
      RequestItem.destroy({name:'home'}).exec(function(err){
          //console.log("删除，ID："+name);
          //cb(null);
        });

      },

  /**
    * 删除所有MongoDB中的requestItem记录。
    * */
  deleteAllRequestItemRecords:function(req,res){
    RequestItem.destroy().exec(function(err){
      if(!err){
        console.log("删除所有requestItem records成功!");
      }else{
        console.log("删除所有requestItem records失败。。。");
      }
    });

},


  /***
   * 生成一个接口MongoDB记录。
   * @param req
   * @param res
     */
  insertRequestItemService:function(req,res){
      var apiItem={id:"6",dev:"lidehong",disabled:false,name:"HOME6",
        url:"http://192.168.103.101:8020/selftaught/home",
        queryParam:{req:""},
        version:"1.0.0",description:"test !!!",method:"POST",headers:{module:"2",
          clientType:"ios",version:"1.0.0",clientIp:"127.0.0.1",deviceId:"testDeviceId123456",sessionToken:"token123"},
        mode:"urlencoded",response:""};

      mongoService.insertRequestItemRecord(apiItem,function(records){
        return ;
    });

  },

  /**
   * 根据ID来更新记录内容。
   * @param req
   * @param
   * */
  updateRequestItemByName: function(req,res){


    mongoService.updateRequestItem(requestItem);
  },

  /***
   * 写入自定义
   * @param req
   * @param res
     */
  testmyservice:function(req,res){
    /**
    var apiItem={id:"1",dev:"李德洪",disabled:false, version:"1.0.0",description:"登录接口newLogin",name:"登录接口newLogin",
      url:'http://192.168.88.242:8002/user/newLogin', queryParam:"req={\"platform\":\"local\",\"phoneNum\":\"13600800800\", " +
      "\"pwd\":\"123456\",\"registrationId\":\"testID123456\"}"};
    */

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

