/**
 * Created by xiaodou_chenxiaoxiang on 16/7/27.
 */

var fs = require('fs');

var JSON5 = require('json5');

module.exports = {

  /**
   * 倒入一个collection文件
   * @param filePath
   * @returns {SDK.Collection|*}
     */
  importCollection: function (filePath) {
    var Collection = SDK.Collection,
      collection;
    collection = new Collection(JSON.stringify(fs.readFileSync('sample-collection.json').toString()));
    //返回的collection, 需要进行JSON5解析之后才能在newman方法中使用
    return collection;
  },

  /**
   * 创建一个collection
   * @param collection
   * @returns {{variables: (*|VariableList|module.exports.attributes.variables|{type, required}|Array), info: {name: *, _postman_id: *, schema: *, description: *}, item: *}}
     */
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

  /**
   * 生成Newman执行需要的option
   * @returns {{iterationCount: number, outputFile: string, responseHandler: string, asLibrary: boolean, stopOnError: boolean}}
   */
  optionMake : function () {
    return {
      iterationCount: 1,                    // define the number of times the runner should run
      outputFile: "./api/services/outfile.json",            // the file to export to
      responseHandler: "TestResponseHandler", // the response handler to use
      asLibrary: true,         				// this makes sure the exit code is returned as an argument to the callback function
      stopOnError: true
    }
  },

  /**
   * 对collection对象进行测试
   * @param collection
   * @param option
   * @param testCollectioncallback
   */
  testCollectionWithCallBack: function (collection, option, testCollectioncallback) {
    fs.writeFile("./api/services/lastCollection.json", JSON.stringify(collection, null, 2), function (err) {
      if (err) {
        console.log('err ---------'+err);
      } else {
        console.log("JSON saved to lastCollection.json" );
      }
    });
    //先把collection对象转化未JSON,再使用JSON5解析
    var Newman = require('xdnewman');
    var collectionJSON = JSON.stringify(collection, null, 2);
    var collectionJSONObject = JSON5.parse(collectionJSON);

    Newman.execute(collectionJSONObject, option, function (exitCode, results) {
      testCollectioncallback(exitCode, results);
    });
  },

  /**
   * 解析项目目录下outflie.json文件,获取测试的response
   * @param filePath
   * @returns {*}
   */
  parseResponse: function (filePath) {
    var responsefile = fs.readFileSync(filePath, 'utf8');
    var responseJSON = JSON5.parse(responsefile, null, 2);

    //获取results数组,此处应该遍历数组,并返回另一个只含有body的数组
    var results = responseJSON.results;

    console.log(results.length);
    var result = results[results.length-1];
    // console.log(result);
    // console.log(result['responseCode']['body']);
    return result['responseCode']['body'];
  },

  /**
   * 把文件导出
   * @param responseData
   * @param filePath
   * @param fileName
     */
  exportResponse:function (responseData, filePath, fileName) {
    fs.writeFileSync(filePath+fileName, responseData.toString());
  }
};

/**
 * function to neatly log the collection object to console
 * @param obj
 * @returns {String|*}
 */
pretty = function (obj) {
  return require('util').inspect(obj, {colors: true});
}


