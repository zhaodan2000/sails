/**
 * ShowDocController
 *
 * @description :: Server-side logic for managing showdocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var formidable = require('formidable');
var http = require('http');
var util = require('util');
// var request = require('request');

module.exports = {
  findRequestItemByID:function (req,res) {
    var dic = {name:req.param("name")};
    console.log(dic);
    mongoService.Find('RequestItem',dic,function (record) {
      console.log(record);
      res.view('showdoc', {data:record});
    })
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
    RequestItem.update({name:req.body.name}, item, function (err, records) {
      if(err){
        console.log(err);
      }else {
        return res.send('OK');
      }
    })
  },

  operatfile:function (req,res) {
    var form        = new formidable.IncomingForm();
    form.parse(req,function(error, fields, files){
       console.log(files); //打印上传文件结构
       console.log(files.path); //文件路径
       files[fields] = files
    });
    // formidable = require("formidable"); //载入 formidable
    //
    // var form = new formidable.IncomingForm();
    // var post = {},
    //   file = {};
    // form.uploadDir = '/tmp';  //文件上传 临时文件存放路径
    //
    // form
    //   .on('error', function(err) {
    //     console.log("error"+err); //各种错误
    //   })
    //   //POST 普通数据 不包含文件 field 表单name value 表单value
    //   .on('field', function(field, value) {
    //     console.log("field"+err); //各种错误
    //     if (form.type == 'multipart') {  //有文件上传时 enctype="multipart/form-data"
    //       console.log("field1"+err); //各种错误
    //       if (field in post) { //同名表单 checkbox 返回array 同get处理
    //         console.log("field2"+err); //各种错误
    //         if (util.isArray(post[field]) === false) {
    //           console.log("field3"+err); //各种错误
    //           post[field] = [post[field]];
    //         }
    //         post[field].push(value);
    //         return;
    //       }
    //     }
    //     post[field] = value;
    //   })
    //   .on('file', function(field, file) { //上传文件
    //     console.log(file); //打印上传文件结构
    //     console.log(file.path); //文件路径
    //     file[field] = file;
    //   })
    //   .on('end', function() {
    //     fn(); //解析完毕 做其他work
    //   });
    // form.parse(request); //解析request对象

    // //创建表单上传
    // var form = new formidable.IncomingForm();
    // //设置编辑
    // form.encoding = 'utf-8';
    // //设置文件存储路径
    // form.uploadDir = "/outfile.json";
    // //保留后缀
    // form.keepExtensions = true;
    // //设置单文件大小限制
    // form.maxFieldsSize = 2 * 1024 * 1024;
    // //form.maxFields = 1000;  设置所以文件的大小总和
    //
    // form.parse(req, function(err, fields, files) {
    //   res.writeHead(200, {'content-type': 'text/plain'});
    //   res.write('received upload:\n\n');
    //   res.end(util.inspect({fields: fields, files: files}));
    //   res.ok();
    // });
  },

  //增加用例
  addtestcase:function (req,res) {
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
      }else if(key == "disabled"){
        if (req.body[key] == "YES"){
          item[key] = true;
        }else {
          item[key] = false;
        }
      }else {
        console.log(key);
        item[key] = req.body[key];
      }
    }

    mongoService.Insert('RequestItem',item,function (record) {
      console.log(record);
      return res.ok();
    })
  },

  //增加用例集合
  add_tc_coll_2db:function (req,res) {
    var reqFolder=req.body["reqFolder"];
    if(reqFolder){
      mongoService.Insert('ReqFolder',reqFolder,function (inserted) {
        if(inserted){
          mongoService.Find('ReqFolder',{},function (found) {
            res.view('testcase/index',{data:found, curr_tc_coll:inserted});
          });
        }
        else{
          mongoService.Find('ReqFolder',{},function (found) {
            res.view('testcase/index',{data:found, curr_tc_coll:null});
          });
        }
      });
    }
   else{
      res.send({retcode:-1,msg:"入参reqFoder为空"});
      }

    },

  save_case:function (req,res) {
    

  }
}


