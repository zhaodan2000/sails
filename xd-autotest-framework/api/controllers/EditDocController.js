/**
 * EditDocController
 *
 * @description :: Server-side logic for managing Editdocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var markdown = require('markdown-js');
var fs=require('fs');

module.exports = {

  testArray:function(req,res){
    _AdocTest.testArray();
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
     


    var filename=__dirname+'/mdFiles/'+testItem.name+'.md';
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
      res.send(html);
      res.end();

    });

  },

  testMd:function(req,res){

    var testItem={"ReqItems": [
      {
        "name": "第三方登录接口",
        "url": "http://192.168.88.242:8002/user/newLogin",
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

    var data='2. '+testItem.name;
    data+="\r\n\t* **name**\r\n\t\t* "+testItem.ReqItems[0].name;
    data+="\r\n\t* **url**\r\n\t\t* "+testItem.ReqItems[0].url;

    var filename=__dirname+'/mdFiles/李月华测试.md';
    fs.appendFile(filename, data,function () {
      console.log('追加内容完成');
      // 读入 Markdown 源文件
      var fileContent = fs.readFileSync(filename, 'utf8');
      var html = markdown.makeHtml(fileContent) ;
      res.send(html);
      res.end();

    });

    //fs.writeFile(mdFiledir + '/test.md', w_data, {flag: 'a'}, function (err) {
    fs.writeFile

  },

  testDelete:function(req,res){
   var modelType=req.param("modelType");
    mongoService.Delete(modelType,null);
  },

  testFind:function(req,res){
    var modelType=req.param("modelType");
    mongoService.Find(modelType,null,function(records){
      console.log(records);
      res.send(records);
    });
  },

  testInsert:function(req,res) {
    if(req.param("type")==='Task'){
      var task_element = {Task_name: 'testTask', Schedule_ID: 1, Schedule_desc: '每周三09:00执行'};
      var task_output;
      var taskCase_output;
      mongoService.Insert('TaskFolder',task_element,function(records){
        task_output=records;
        console.log("+++++++"+JSON.stringify(task_output));
        var taskCase_element={name:'Case in task folder!',  url:"http://www.baidu.com", TaskID:records.id};
        mongoService.Insert('TaskCase',taskCase_element,function(records){
          taskCase_output=records;
          var data={task:task_output, taskCase: taskCase_output};
          console.log(data);
          res.send(data);
        });
      });
    }else if(req.param("type")==='Req'){
          var reqFolder={name:'个人中心接口集合'};
          mongoService.Insert('ReqFolder',reqFolder,function(records){
            var reqItem={name:'个人资料修改接口', url:'http://192.168.31.88:8002/selftaught/user/modifyMyInfo', ReqFolderID:records.id};
              mongoService.Insert('RequestItem',reqItem,function(records){
              res.send(records);
            });
          });
      }else{
      /*
      var ScheduleStrategyItem1={id:'ss00',schedule_time:'-',day_of_week:'-',schedule_period:'-',schedule_desc:'选择此策略则表示不会自动执行任务脚本。'};
      var ScheduleStrategyItem2={id:'ss01',schedule_time:'07:30',day_of_week:'-',schedule_period:'daily',schedule_desc:'选择此策略则表示每天07:30执行任务脚本。'};
      var ScheduleStrategyItem3={id:'ss02',schedule_time:'22:30',day_of_week:'Sunday',schedule_period:'weekly',schedule_desc:'选择此策略则每周日22：30执行任务。'};
      var ScheduleStrategyItem4={id:'ss03',schedule_time:'21:00',day_of_week:'workday',schedule_period:'weekly',schedule_desc:'选择此策略则表示每周周一到周五21:00执行任务脚。'};

      mongoService.Insert('ScheduleStrategy',ScheduleStrategyItem1,function(records){

      });
      mongoService.Insert('ScheduleStrategy',ScheduleStrategyItem2,function(records){

      });
      mongoService.Insert('ScheduleStrategy',ScheduleStrategyItem3,function(records){

      });

      mongoService.Insert('ScheduleStrategy',ScheduleStrategyItem4,function(records){

      });
       */

    }
  },

  testInsertDocItem:function(req,res){
    var apiDocRow={ name:'测试'+apiDocID+'.md'};
    var apiDoc_output;

    var isExisted=false;
    var foundRecords;
    APIdocServices.findAPIdocByName(APIdocItem.name,function(records){
      foundRecords=records;
    });
    if(isExisted){


    }else{

    }

    APIdocServices.insertAPIdocRecord(apiDocRow,function(records){
      apiDoc_output=records;
    });


    var docItemRow={name:'首页接口'+docItemID,
      url:'http://192.168.103.101:8020/selftaught/home', };
    var output;
    APIdocItemServices.insertAPIdocitemRecord(docItemRow,function(records){
      output=records;
    });


    APIdocServices.findAPIdocByName('',function(records){
      console.log(records);
    })
    //res.send(output);
    res.ok();

  },

  testFindDocItem:function (req,res) {
      var data;
      APIdocItemServices.findAPIdocitemByName("", function (records) {
        data=records;
      });

    res.send(data);

  },

  testFindDoc:function(req,res){
    var data;
    APIdocServices.findAPIdocByName("", function (records) {
      data=records;
    });

    res.send(data);
  },

  testAssociation:function(req,res){
    var apiDocRow={ name:'测试'+apiDocID+'.md'};
    var apiDoc_output;

    var docItemRow={name:'首页接口'+ new Date().getMilliseconds().toString(),
      url:'http://192.168.103.101:8020/selftaught/home',APIdocID:'184'};
    var output;

    APIdocServices.insertDocAssociation(apiDocRow, docItemRow,function(records){
      console.log(records);
    });
  },

  testDeleteAllDocItem:function(req,res){
    APIdocItemServices.deleteAllAPIdocitemRecords();
  },

  testDeleteAllAPIdoc:function(req,res){
    APIdocServices.deleteAllAPIdocRecords();
  }
};

