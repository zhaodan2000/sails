/**
 * EditDocController
 *
 * @description :: Server-side logic for managing Editdocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  testInsertDocItem:function(req,res){
    var item={id:new Date().getMilliseconds().toString(),name:'首页接口'+new Date().getSeconds().toString(),
      url:'http://192.168.103.101:8020/selftaught/home'};
    var output;
    APIdocItemServices.insertAPIdocitemRecord(item,function(records){
      output=records;
    });
    res.send(output);

  },

  testFindDocItem:function (req,res) {
    var data;
    APIdocItemServices.findAPIdocitemByName("", function (records) {
      data=records;
    });

    res.send(data);

  },

  testDeleteAllDocItem:function(req,res){
    APIdocItemServices.deleteAllAPIdocitemRecords();
  }

};

