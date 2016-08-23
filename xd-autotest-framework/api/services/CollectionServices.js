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
   * 单个用例的对象生成collection对象
   * @param requestItem   用例的信息
   * @param reqFolder     reqFolder为所属集合的信息
   * @returns {{variables: Array, info: {name: string, _postman_id: *, schema: string, description: (*|desc|string|module.exports.attributes.desc|{type, unique, required, defaultsTo})}, item: *[]}}
     */
  creatCollectionwithSingleRequest: function (requestItem, reqFolder) {
    var headers = requestItem.headers;  //type is json
    var queryParam = requestItem.queryParam;  //type is json

    var request = {
      id:requestItem.id,
      name:requestItem.name,
      disabled: requestItem.disabled,
      url:requestItem.url,
      method:requestItem.method,
      header:getHeaderWithJson(headers),
      body:{
        mode:requestItem.mode,
        urlencoded:getQueryParamWithJson(queryParam)
      }
    };
    //配置前置脚本和后置脚本 ----- 根据item是不是输入了文本来判断是否添加脚本
    var event =[];
    var test = {
      listen: 'test',
      script: {
        type: "text/javascript",
        exec: requestItem.testscript
      }
    };
    var preScript = {
      listen: 'prerequest',
      script: {
        type: "text/javascript",
        exec: parseInputPreString(requestItem.prescript)
      }
    };
    event.push(preScript);
    event.push(test);

    var item = {
      id : request.id,
      name : request.name,
      disabled : request.disabled,
      request : request,
      event:event
    };
    var collectionObj = {
      variables:[],
      info:{
        name:reqFolder.name,
        _postman_id:reqFolder.id,
        schema:"https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
        description:reqFolder.desc
      },
      item:[item]
    };
    return collectionObj;
  }
  ,

  /**
   * 根据一个任务创建一个collection
   * @param task
   * @returns {{variables: Array, info: {name: *, _postman_id: *, schema: string, description: (module.exports.attributes.Task_desc|{type, unique, required, defaultsTo})}, item: *}}
     */
  creatCollectionWithTask: function (task) {
    var collectionObj = {
      variables:[],
      info:{
        name:task.Task_name,
        _postman_id:task.id,
        schema:"https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
        description:task.Task_desc
      },
      item:task.items
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

/**
 * 转换headerJson对象为需要的结构
 * @param headerJson
 * @returns {Array}
 */
function getHeaderWithJson(headerJson) {
  var headerArray = new Array;
  for (var prop in headerJson) {
    if (headerJson.hasOwnProperty(prop)) {
      // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
      // console.log("prop: " + prop + " value: " + headerJson[prop]);
      var header = {
        key:prop,
        value:headerJson[prop]
      }
      headerArray.push(header);
    }
  }
  // console.log(headerArray);
  return headerArray;
}

/**
 * 转换paramJson对象为需要的结构
 * @param paramJson
 * @returns {Array}
 */
function getQueryParamWithJson(paramJson) {
  var paramArray = new Array;
  for (var prop in paramJson) {
    if (paramJson.hasOwnProperty(prop)) {
      // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
      // console.log("prop: " + prop + " value: " + paramJson[prop]);
      var param = {
        key:prop,
        value:paramJson[prop],
        type:'text',
        enabled:true
      }
      paramArray.push(param);
    }
  }
  return paramArray;
}

/**
 * 将传入的prescript语句转化为event中prescript需要的语法
 * @param prestring
 * @param callback
 * @returns {string}
 */
function parseInputPreString(prestring) {

  var Pre={global:{},evn:{}};
  eval(prestring);

  var returnString = '';
  //第一层遍历prescriptObj
  for (var prop in Pre) {
    if (Pre.hasOwnProperty(prop) && prop === 'global') {
      var global = Pre[prop];
      //当属性名为global时,再次遍历
      for (var key in global) {
        if (global.hasOwnProperty(key)){
          var tmpString = "postman.setGlobalVariable(\"{0}\", '{1}');"
          var value = (isJson(global[key]))? JSON.stringify(global[key]):global[key];
          returnString = returnString.concat(tmpString.format(key, value) + '\n');
        }
      }
    }else if(Pre.hasOwnProperty(prop) && prop === 'evn'){
      var evn = Pre[prop];
      //当属性名为evn时,再次遍历
      for (var key in evn) {
        if (evn.hasOwnProperty(key)){
          var tmpString = "postman.setEnvironmentVariable(\"{0}\", '{1}');";
          var value = (isJson(evn[key]))? JSON.stringify(evn[key]):evn[key];
          returnString = returnString.concat(tmpString.format(key, value) + '\n');
        }
      }
    }
  }
  console.log(returnString);
  return returnString;
}

