/**
 * EditDocController
 *
 * @description :: Server-side logic for managing Editdocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var markdown = require('markdown-js');
//var markdown= require("markdown").main(system);
//var markdown=require('markdown-to-html');
var fs=require('fs');

module.exports = {

  editDoc:function (req,res) {
    var uniqId=req.body['uniqID'];
    if(uniqId){
      mongoService.Find('APIdoc',{uniqID:uniqId},function (records) {
        //res.render('doc/editdoc',{curr_doc:records[0]});
        mongoService.Find('APIdoc',{},function (docs_records){
          //res.render('doc/APIdoc',{api_docs:docs_records, curr_doc:records[0]});
          res.view('doc/APIdoc',{api_docs:docs_records, curr_doc:records[0]});
        });
      });
    }else{
      res.send({retcode:-1,message:"前端传入的uniqID为空.",data:null});
    }

  },

  showMdFile:function (req,res) {
    if (req.body.hasOwnProperty("uniqid")) {
      var uid=req.body["uniqid"];
      console.log("req.body.uniqid=" + uid);
      mongoService.Find('APIdoc', {uniqID:uid}, function (found) {
        if (found && found.length != 0) {
          var filename = __dirname + '/mdFiles/' + found[0].name;
          var data = '# ' + found[0].name;
          data += '\r\n### 文档描述\r\n';
          data += (found[0].docDesc?found[0].docDesc:"暂无文档描述。");
          data +='\r\n### 测试环境\r\n';
          data +=(found[0].testEnv?found[0].testEnv:"n/a");
          data +='\r\n### 端口号\r\n';
          data +=(found[0].testEnvPort?found[0].testEnvPort:"n/a");
          data += '\r\n### 接口';
          for (var i = 0; i < found[0].APIdoc_items.length; i++) {
            var docItem = found[0].APIdoc_items[i];
            data += '\r\n' + (i + 1) + '. ' + docItem.name;
            data += '\r\n\t* **请求url**';
            data += '\r\n\t\t* ' + docItem.url;
            data += '\r\n\t* **请求方式method**';
            data += '\r\n\t\t* ' + docItem.method;
            data += '\r\n\t* **接口是否废弃**';
            data += '\r\n\t\t* ' + docItem.disabled;
            data += '\r\n\t* **开发者**';
            data += '\r\n\t\t* ' + (docItem.dev?docItem.dev:"未标明");
            data += '\r\n\t* **请求格式content-type**';
            data += '\r\n\t\t* ' + docItem.dataType;
            data += '\r\n\t* **请求头header**';
            data +='\r\n\t\t* <pre><code style="width: auto;height: auto">';
            data +=JSON.stringify(docItem.header, null, 4);
            data +='\r\n</code></pre>';
            data += '\r\n\t* **请求参数queryParams**';
            data +='\r\n\t\t* <pre><code style="width: auto;height: auto">';
            data +=JSON.stringify(docItem.queryParams, null, "\t");
            data +='\r\n</code></pre>';
            data += '\r\n\t* **返回结果response**';
            data +='\r\n\t\t* <pre><code style="width: auto;height: auto">';
            data +=JSON.stringify(docItem.response, null, "\t");
            data +='\r\n</code></pre>';
          }

          fs.writeFile(filename, data, function () {
            console.log('内容写入文件完成');
            // 读入 Markdown 源文件
            var fileContent = fs.readFileSync(filename, 'utf8');
            var html = markdown.makeHtml(fileContent);

            res.send(html);
          });
        }
        else {
          res.send({retcode: -1, message: '没有找到APIdoc........',data:null});
        }
      });
    }
    else {

      res.send({retcode: -1, message: '传入的参数里缺少uniqid........',data:null});
    }

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



    var filename=__dirname+'/mdFiles/'+testItem.name;
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

    fs.writeFile(filename,data,function () {
      console.log('内容写入文件完成');
      // 读入 Markdown 源文件
      var fileContent = fs.readFileSync(filename, 'utf8');
      var html = markdown.makeHtml(fileContent) ;
      res.send(html,200);
    });

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

};

