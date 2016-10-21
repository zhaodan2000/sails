/**
 * Created by xiaodou_chenxiaoxiang on 16/8/1.
 */
"use strict"

require('../utils/string');
var fs = require('fs');
var mysqlhelper = require('../utils/mysqlhelper')
var eventproxy = require('../utils/eventproxyhelper')
var newManHelper = require('../newman/newmanhelper')
var Newman = require('autotest-engine');
var uuid = require('node-uuid')

module.exports = {
  /**
   * 根据requestItem生成collectionItem
   * */
  creatItem: function (obj, callback) {
    configEvent(obj, function (event) {
      callback(configItem(configCaseItem(obj), event));
    });
  },
  /**
   * 执行Collection
   * */
  runCollection: function (collection, callback) {
    var _option = {
      iterationCount: 1,                    // define the number of times the runner should run
      responseHandler: "TestResponseHandler", // the response handler to use
      asLibrary: true,         				// this makes sure the exit code is returned as an argument to the callback function
      stopOnError: false
    };
    new Newman().execute(collection, _option, function (exitCode, results) {
      callback(exitCode, results);
    });
  }
}

/**
 * 根据一个caseItem对象生成request
 * @param caseItem
 * @returns {{id: *, name: *, disabled: *, url: *, method: *, header, body: {mode: *, urlencoded}}}
 */
function configCaseItem(caseItem) {
  var headers = caseItem.headers;  //type is json
  var queryParam = caseItem.queryParam;  //type is json

  var request = {
    id: caseItem.id,
    name: caseItem.name,
    disabled: caseItem.disabled,
    url: caseItem.url,
    method: caseItem.method,
    header: getHeaderWithJson(headers),
    body: {
      mode: caseItem.mode,
      urlencoded: getQueryParamWithJson(queryParam)
    }
  }
  return request;
}

function configEvent(item, callback) {
  //配置前置脚本和后置脚本 ----- 根据item是不是输入了文本来判断是否添加脚本
  // RequestItemServices.
  var event = [];
  var ep = eventproxy.create();
  ep.after(2, function () {
    callback(event)
  });
  parseInputPreString(item.prescript, function (preEvent) {
    event.push(preEvent);
    ep.emit('1');
  });
  parseIntputTestString(item.testscript, function (testEvent) {
    event.push(testEvent);
    ep.emit('1');
  });
}

/**
 * @param request type is obj
 * @param event  type is array
 * @returns {{id: *, name: *, disabled: *, request: *, event: *}}
 */
function configItem(request, event) {
  var item = {
    id: uuid.v4(),
    name: request.name,
    disabled: request.disabled,
    request: request,
    event: event
  }
  return item;
}


/**
 * 将传入的prescript语句转化为event中prescript需要的语法
 * @param prestring
 * @param callback
 * @returns {string}
 */
function parseInputPreString(prestring, callback) {
  var pre = newManHelper.newPreEventProxy();
  pre._event = {listen: "prerequest", script: {type: "text/javascript", exec: prestring}};
  // var ep = eventproxy.create();
  // var mysql = mysqlhelper.create(ep);
  // try{
  //   eval(prestring);
  // }catch (e){
  //   console.error(e);
  // }
  callback(pre._event);
  // if (ep.getLength() > 0) {
  //   ep.after(ep.getLength(), function () {
  //     callback(pre._event);
  //   });
  // } else {
  //   callback(pre._event);
  // }
}

/**
 * 将传入的testscript语句转化为event中testscript需要的语法
 * @param teststring
 * @returns {string}
 */
function parseIntputTestString(teststring, callback) {
  var test = newManHelper.newTestEventProxy();
  test._event = {listen: "test", script: {type: "text/javascript", exec: teststring}};
  // var ep = eventproxy.create();
  // var mysql = mysqlhelper.create(ep);
  // try{
  //   eval(teststring);
  // }catch (e){
  //   console.error(e);
  // }
  // if (ep.getLength() > 0) {
  //   ep.after(ep.getLength(), function () {
  //     callback(test._event);
  //   });
  // } else {
    callback(test._event);
  // }
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
        key: prop,
        value: headerJson[prop]
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
        key: prop,
        value: paramJson[prop],
        type: 'text',
        enabled: true
      }
      paramArray.push(param);
    }
  }
  // console.log(paramArray);
  return paramArray;
}

/**
 * 判断是否为json对象
 * @param obj
 * @returns {boolean}
 */
function isJson(obj) {
  var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
}


