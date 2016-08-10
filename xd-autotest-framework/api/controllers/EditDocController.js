/**
 * EditDocController
 *
 * @description :: Server-side logic for managing Editdocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  testArray:function(req,res){
    _AdocTest.testArray();
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
      });
    });
    res.ok();
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

