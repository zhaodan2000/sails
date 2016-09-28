/**
 * Created by lyh on 8/22/16.
 */
var fs=require('fs');

module.exports={

  testService:function (req,res) {
    res.view('doc/postmanUI');
  },

  testMD:function (req,res) {
    var Markdown = require('markdown-to-html').Markdown;
    var md = new Markdown();
    //md.bufmax = 2048;
    var filename = __dirname + '/mdFiles/test.md';
    var opts = {title: 'File $BASENAME in $DIRNAME', stylesheet: 'test/style.css'};

    // Write a header.
    console.log('===============================');
    // Write a trailer at eof.
    md.once('end', function() {
      console.log('===============================');
    });
    md.render(filename, opts, function(err) {
      if (err) {
        console.error('>>>' + err);
        process.exit();
      }
      //md.pipe(process.stdout.save());
      //md.pipe(process.browser);
      console.info("开始打印了~~~");
      res.send(md.html);

    });

  },

  /**
   * 写文件或追加文件
   * */
  handleFileWrite:function(req,res) {

    console.log("current path:" + __dirname);
    console.log(req);

    /**
     * 读取文件目录是否存在。
     * */
    var mdFiledir = __dirname + '/mdFiles';
    fs.exists(mdFiledir, function (exists) {
      /**
       * 创建目录,如果目录不存在的话。
       * */
      if (!exists) {
        fs.mkdir(mdFiledir, function (err) {
          if (!err) {
            console.log("目录已经创建成功。");
            return;
          } else {
            console.log("目录创建失败。");
            return;
          }
        });
      } else {
        console.log("目录已经存在,不需要再创建...");
      }
    });

    var filename = req.body.filename;
    var filecontent = req.body.filecontent;
    var w_data = new Buffer(filecontent);

    /**
     * filename, 必选参数，文件名
     * data, 写入的数据，可以字符或一个Buffer对象
     * [options],flag,mode(权限),encoding
     * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
     */
    /**
     fs.writeFile(filename,data,[options],callback);
     var w_data = '这是一段通过fs.writeFile函数写入的内容；\r\n';

     fs.writeFile(mdFiledir + '/test.md', w_data, {flag: 'a'}, function (err) {
      if(err) {
        console.error(err);
      } else {
        console.log('写入成功');
      }
    }); */

    // fs.appendFile(filename,data,[options],callback);

    //fs.appendFile(mdFiledir + '/'+filename, '***使用fs.appendFile追加文件内容', function () {
    fs.appendFile(mdFiledir + '/' + filename, filecontent, function () {
      console.log('追加内容完成');
    });

  },


  /**
   * 根据入参的name, 来查找mongodb里的符合条件的记录。
   **/

  findRequestItemByName:function(req,res) {

    console.log("req.param()=" + req.param("requestName"));
    console.log("req.url=" + req.url);
    console.log("req.method=" + req.method);
    console.log("req.host=" + req.host);
    //var response={requestName:'newLogin',url:'http://192.168.103.101:8002/user/newLogin'};
    //var retres = {retcode: 0, retdesc: "success", data: response};
    // res.send(retres);
    //return response;

    mongoService.findRequestItemByName(req.param("requestName"), function (records) {
      if (records) {
        console.log(JSON.stringify(records));
        var retres = {retcode: 0, retdesc: "success", data: records};
        res.send(retres);
      }
      else
        res.send({retcode: -1, retdesc: "syserror"})
    });
  },



    /***
     * 生成一个接口MongoDB记录。
     * @param req
     * @param res
     */
    insertRequestItemService:function(req,res) {
      /**
       var apiItem={id:"6",dev:"lidehong",disabled:false,name:"HOME6",
        url:"http://192.168.103.101:8020/selftaught/home",
        queryParam:{req:""},
        version:"1.0.0",description:" !!!",method:"POST",headers:{module:"2",
          clientType:"ios",version:"1.0.0",clientIp:"127.0.0.1",deviceId:"testDeviceId123456",sessionToken:"token123"},
        mode:"urlencoded",response:""};
       */
      if (req.body.hasOwnProperty("req")) // true)
      {
        var apiItem = req.body['req'];
        console.log(JSON.stringify(apiItem));
        mongoService.insertRequestItemRecord(apiItem, function (records) {
          console.log("return records=" + JSON.stringify(records));
          if (records) {
            var retres = {retcode: 0, retdesc: "success", data: records};
            res.send(retres);
          }
          else
            res.send({retcode: -1, retdesc: "syserror", msg: "重复插入记录了."});
        });
      } else {
        console.log("req.body.hasOwnProperty(\"req\") 返回" + req.body.hasOwnProperty("req"));
      }
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

    }
}
