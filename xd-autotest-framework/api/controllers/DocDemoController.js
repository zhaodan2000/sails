/**
 * Created by lyh on 8/22/16.
 */
var fs=require('fs');

module.exports={


  testArray:function(req,res){
    var  _rnds = new Array(16);

      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) {
          r = Math.random() * 0x100000000;
        }

        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;

  },

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
    console.log("req.param()=" + req.param("requestName")); //Get请求获取参数的方法。与req.params["requestName"]不等价。。
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

    },


  add_case: function (req, res) {
    var dic={uniqID: "1475909916895"};
    mongoService.Find("ReqFolder",dic , function (records) {
      if(records&&records.length>0){
        console.log(">0");
        console.log(records);
        var caseItem = {
          uniqID: (new Date().getTime()).toString(),
          name: '页面+号对应-资源发布接口',
          description: '暂无接口描述',
          url: '/asked/post',
          disabled: 'false',
          dev: '赵聃周欢',
          method: 'POST',
          dataType: 'application/json',
          header: '{}',
          queryParams: '{\n  "key": "名称\\t类型\\t是否为空\\t说明\\ntitle\\tString\\t否\\t资源名称\\ncontent\\tString\\t否\\t资源内容\\nvideoUrl\\tString\\t视频的时候不为空\\t视频的候不为空\\t图片，以逗号分隔\\ncategoryId\\tString\\t永远不为空\\t类型为说说传-1，文章和视频传分类ID\\ndigest\\tInteger\\t必须传\\t0说说1文章 2视频\\ncover\\tString\\t视频传\，说说传-1\\n\\n"\n}',
          response: '{\n  "isError": "是否错误",\n  "errorMessage": "错误消息",\n  "errorCode": "错误代码",\n  "timestamp": "时间戳",\n  "resourcesId": "资源Id"\n}',
        };
        caseItem["ReqFolderID"] = records[0].id;

        mongoService.Insert("RequestItem", caseItem, function (inserted) {
          console.log(inserted);

        });
      }else{
        console.log("=0");
      }

    });

  },

  testAAA:function(req,res) {
    // var modelType = req.body.modelType;
    // var uniqId=req.body.uniqId;
    // console.log(req);
    mongoService.Find("ReqFolder", {uniqID: '1475909916895'}, function (records) {
      console.log(records);
      res.send(records);
    });
  },

  testFindAndSort:function(req,res){
    var modelType=req.param();
    mongoService.FindAndSort(modelType,{},function(records){
      console.log("hallo");
      res.send(records,200);
    });
  },


  testAPImd:function(req,res){

    var testItem={"ReqItems": [
      {
        "name": "第三方登录接口",
        "url": "http://192.168.88.242:8002/user/newLogin",
        "ReqFolderID": "93664a09-6e6b-c858-4430-a3be62796",
        "method": "POST",
        "createdAt": "2016-08-10T07:33:14.814Z",
        "updatedAt": "2016-08-10T07:33:14.814Z",
        "id": "57aad8ba13d9d549494dd554"
      },
      {
        "name": "首页接口",
        "url": "http://192.168.88.242:8020/selftaught/home",
        "ReqFolderID": "93664a09-6e6b-c858-4430-a3be62796",
        "method": "POST",
        "createdAt": "2016-08-10T07:33:14.814Z",
        "updatedAt": "2016-08-10T07:33:14.814Z",
        "id": "57aad8ba13d9d549494dd554"
      }
    ],
      "name": "首页接口业务场景用例",
      "desc": "暂时没有任务描述。"
    };

    var data='# '+testItem.name;
    data+='\r\n### '+testItem.desc;
    data+='\r\n### 接口';
    for(var i=0; i<testItem.ReqItems.length;i++){
      var reqItem=testItem.ReqItems[i];
      data+='\r\n'+(i+1)+'. '+reqItem.name;
      data+='\r\n\t* **url**';
      data+='\r\n\t\t* '+reqItem.url;
      data+='\r\n\t* **method**';
      data+='\r\n\t\t* '+reqItem.method;
    }

    var html = markdown.makeHtml(data) ;
    res.send(html,200);


    /**
     //写入文件中。
     var filename=__dirname+'/mdFiles/'+testItem.name;
     fs.writeFile(filename,data,function () {
      console.log('内容写入文件完成');
      // 读入 Markdown 源文件
      var fileContent = fs.readFileSync(filename, 'utf8');
      var html = markdown.makeHtml(fileContent) ;
      res.send(html,200);
    });
     **/

  },

  testUpdate:function(req,res) {

    //var item = {"uniqID":"1471957467806","name":"自考君接口文档","url":"djfal;sdf","disabled":"false","method":"POST","dataType":"application/json","header":"\"\"","queryParams":"\"\"","response":"\"\"","APIdocID":"1471957311617"};
    var item={"uniqID":"1471957467806","name":"自考君接口文档"};
    mongoService.Update("APIdoc", item,{uniqID:item.uniqID},function(records){
      if(records){
        res.send(records);
      }else{
        res.send({errMsg:"更新失败"});

      }
    });
  },

  testDelete:function(req,res){
    var modelType=req.param("modelType");

    mongoService.Delete(modelType,null);
  },

  testFind:function(req,res){
    var modelType=req.param("modelType");
    if(modelType=='TaskCase'){
      var taskID=req.param("TaskID");
      mongoService.Find(modelType,{TaskID:taskID},function(records){
        res.send(records);
      });
    }else{
      mongoService.Find(modelType,null,function(records){
        res.send(records);
      });
    }

  },

  testInsert:function(req,res) {
    var apiDoc={name:"问道接口文档",uniqID:(new Date().getTime()).toString(), docDesc:"分享知识平台的接口文档(1.0版本)",testEnv:"192.168.103.101",testEnvPort:"8020"};
    mongoService.Insert("APIdoc",apiDoc, function(records) {
      console.log("插入问道文档\r\n" + JSON.stringify(records, null, "\t"));
    });
    var apiDocID='57c26c65d4685fab0ea165c0';
    var docItemRow={name:'首页接口', uniqID:(new Date().getTime()).toString(),url:'http://192.168.103.101:8020/selftaught/home', APIdocID:apiDocID};
    mongoService.Insert('APIdocitem',docItemRow,function(records){
      res.send(records);
      res.ok();
    });
  },

  testInsertDocItem:function(req,res){
    var apiDocRow={name:"自考君接口文档",uniqID:(new Date().getTime()).toString(),};
    mongoService.Insert("APIdoc",apiDocRow,function(records){
      if(records&&records.length>0){
        var docItemRow={name:'首页接口',uniqID:(new Date().getTime()).toString(), url:'http://192.168.103.101:8020/selftaught/home', APIdocID:records.id};
        mongoService.Insert('APIdocitem',docItemRow,function(records){
          res.send(records);
          res.ok();
        });
      }

      else{
        res.send({retcode:-1,msg:"添加失败data失败",data:apiDocRow});
      }

    });
  },

  testInsertSS:function (req,res) {
    var ss= [
      {
        "schedule_time": "-",
        "day_of_week": [1,2],
        "schedule_period": "-",
        "schedule_desc": "选择此策略则表示不会自动执行任务脚本。",
        "uniqID": "ss00"
      },
      {
        "schedule_time": "07:30",
        "schedule_period": "daily",
        "schedule_desc": "选择此策略则表示每天07:30执行任务脚本。",
        "uniqID": "ss01"
      },
      {
        "schedule_time": "22:30",
        "day_of_week": [1,2,3,4,5],
        "schedule_period": "weekly",
        "schedule_desc": "选择此策略则每周日22：30执行任务。",
        "uniqID": "ss02"
      },
      {
        "schedule_time": "21:00",
        "day_of_week": [0],
        "schedule_period": "weekly",
        "schedule_desc": "选择此策略则表示每周周一到周五21:00执行任务脚。",
        "uniqID": "ss03"
      }
    ];

    ss.forEach(function(item,index,array){
      mongoService.Insert('ScheduleStrategy',item,function(record){
        console.log("*******"+ record.uniqID);
      })
    });

  }

}
