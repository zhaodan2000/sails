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
var path = require('path');
require('../utils/string');

module.exports = {

  queryDoc:function (req, res) {
    var uniqId = req.body['uniqID'];
    mongoService.Find('APIdoc', {}, function (docs_records) {
      if (uniqId) {
        mongoService.Find('APIdoc', {uniqID: uniqId}, function (records) {
          //res.render('doc/APIdoc',{api_docs:docs_records, curr_doc:records[0]});
          res.view('doc/APIdoc', {api_docs: docs_records, curr_doc: records[0]});
        });
      } else {
        res.send({api_docs: docs_records, curr_doc: null});
      }

    });
  },

  showMdFile:function (req,res) {
    if (req.body.hasOwnProperty("uniqid")) {
      var uid=req.body["uniqid"];
      console.log("req.body.uniqid=" + uid);
      mongoService.Find('APIdoc', {uniqID:uid}, function (found) {
        if (found && found.length != 0) {
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
            data += '\r\n\t\t* ' + docItem.url.replaceAll('_','\\_');
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

          var html = markdown.makeHtml(data) ;
          res.send(html);

          /**
          //写入文件中。
          var filename = __dirname + '/mdFiles/' + found[0].name;
          fs.writeFile(filename, data, function () {
            console.log('内容写入文件完成');
            // 读入 Markdown 源文件
            var fileContent = fs.readFileSync(filename, 'utf8');
            var html = markdown.makeHtml(fileContent);

            res.send(html);
          });
           **/
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


};

