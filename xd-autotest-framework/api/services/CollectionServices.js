/**
 * Created by xiaodou_chenxiaoxiang on 16/7/27.
 */

var fs = require('fs');
// var SDK = require('postman-collection');
var Newman = require('newman');
var JSON5 = require('json5');

module.exports = {

  //倒入一个collection文件
  importCollection: function (filePath) {
    var Collection = SDK.Collection,
      collection;
    collection = new Collection(JSON.stringify(fs.readFileSync('sample-collection.json').toString()));
    //返回的collection, 需要进行JSON5解析之后才能在newman方法中使用
    return collection;
  },

  //创建一个collection
  creatCollection: function(collection) {
    var collectionObj = {
      variables:collection.variables,
      info:{
        name:collection.name,
        _postman_id:collection.id,
        schema:collection.schema,
        description:collection.description
      },
      item:collection.item
    };
    return collectionObj;
  },

  //生成Newman执行需要的option
  optionMake : function () {
    return {
      iterationCount: 1,                    // define the number of times the runner should run
      outputFile: "./api/services/outfile.json",            // the file to export to
      responseHandler: "TestResponseHandler", // the response handler to use
      asLibrary: true,         				// this makes sure the exit code is returned as an argument to the callback function
      stopOnError: true
    }
  },
  //对collection对象进行测试
  testCollectionWithCallBack: function (collection, option, testCollectioncallback) {
    //先把collection对象转化未JSON,再使用JSON5解析
    var collectionJSON = JSON.stringify(collection, null, 2);
    var collectionJSONObject = JSON5.parse(collectionJSON);

    // var option = optionMake();
    Newman.execute(collectionJSONObject, option, function (exitCode) {
      testCollectioncallback(exitCode);
    });
  },

  //解析项目目录下outflie.json文件,获取测试的response
  parseResponse: function (filePath) {
    var responsefile = fs.readFileSync(filePath, 'utf8');
    var responseJSON = JSON5.parse(responsefile, null, 2);

    //获取results数组,此处应该遍历数组,并返回另一个只含有body的数组
    var results = responseJSON.results;

    console.log(results.length);
    var result = results[0];
    // console.log(result);
    console.log(result['responseCode']['body']);
    return result['responseCode']['body'];
  },
  //export response
  exportResponse:function (responseData, filePath, fileName) {
    fs.writeFileSync(filePath+fileName, responseData.toString());
  }
};


pretty = function (obj) { // function to neatly log the collection object to console
  return require('util').inspect(obj, {colors: true});
}


