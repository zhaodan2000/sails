/**
 * Created by xiaodou_chenxiaoxiang on 16/8/1.
 */
"use strict"

require('../utils/string');
var fs = require('fs');
var mysqlhelper = require('../utils/mysqlhelper')
var eventproxy = require('../utils/eventproxyhelper')
var newManHelper = require('../newman/NewMan')

module.exports = {

  /**
   * 根据一个requestItem对象生成request
   * @param requestItem
   * @returns {{id: *, name: *, disabled: *, url: *, method: *, header, body: {mode: *, urlencoded}}}
   */
  configRequestItem: function (requestItem) {
    var headers = requestItem.headers;  //type is json
    var queryParam = requestItem.queryParam;  //type is json

    var request = {
      id: requestItem.id,
      name: requestItem.name,
      disabled: requestItem.disabled,
      url: requestItem.url,
      method: requestItem.method,
      header: getHeaderWithJson(headers),
      body: {
        mode: requestItem.mode,
        urlencoded: getQueryParamWithJson(queryParam)
      }
    }
    return request;
  },

  configEvent: function (item, callback) {
    //配置前置脚本和后置脚本 ----- 根据item是不是输入了文本来判断是否添加脚本
    // RequestItemServices.
    var event = [];
    var ep = eventproxy.create();
    ep.after(2, function () {
      callback(event)
    });
    this.parseInputPreString(item.prescript, function (preEvent) {
      event.push(preEvent);
      ep.emit('1');
    });
    this.parseIntputTestString(item.testscript, function (testEvent) {
      event.push(testEvent);
      ep.emit('1');
    });

  },

  /**
   *
   * @param request type is obj
   * @param event  type is array
   * @returns {{id: *, name: *, disabled: *, request: *, event: *}}
   */
  configItem: function (request, event) {
    var item = {
      id: request.id,
      name: request.name,
      disabled: request.disabled,
      request: request,
      event: event
    }
    return item;
  },
  creatItem: function (obj) {
    return this.configItem(this.configRequestItem(obj), this.configEvent(obj));
  },

  /**
   * 将传入的prescript语句转化为event中prescript需要的语法
   * @param prestring
   * @param callback
   * @returns {string}
   */
  parseInputPreString: function (prestring, callback) {
    var pre = new newManHelper.newPreEventProxy();
    pre._event = {listen: "prerequest", script: {type: "text/javascript", exec: ""}};
    var ep = eventproxy.create();
    var mysql = mysqlhelper.create(ep);
    eval(prestring);
    if (ep.getLength() > 0) {
      ep.after(ep.getLength(), function () {
        callback(JSON.stringify(pre._event))
      });
    } else {
      callback(JSON.stringify(pre._event));
    }
  },

  /**
   * 将传入的testscript语句转化为event中testscript需要的语法
   * @param teststring
   * @returns {string}
   */
  parseIntputTestString: function (teststring, callback) {
    var test = new newManHelper.newTestEventProxy();
    test._event = {listen: "test", script: {type: "text/javascript", exec: ""}};
    var ep = eventproxy.create();
    var mysql = mysqlhelper.create(ep);
    eval(teststring);
    if (ep.getLength() > 0) {
      ep.after(ep.getLength(), function () {
        callback(JSON.stringify(test._event))
      });
    } else {
      callback(JSON.stringify(test._event));
    }
  }
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
