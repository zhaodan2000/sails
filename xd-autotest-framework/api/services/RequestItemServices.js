/**
 * Created by xiaodou_chenxiaoxiang on 16/8/1.
 */

// var RequestItem = require('../models/RequestItem');
var fs = require('fs');

module.exports = {
  //根据request生成item
  configItem: function (request, event) {
    var item = {
      id : request.id,
      name : request.name,
      disabled : request.disabled,
      request : request,
      event:event
      // event:[{
      //   listen: 'test',
      //   script: {
      //     type: "text/javascript",
      //     exec: "var jsonData = JSON.parse(responseBody);\ntests[\"retcode\"] = jsonData.retcode === \"0\";"
      //   }
      // }]
    }
    return item;
  },

  //根据一个requestItem对象生成request
  configRequestItem: function (requestItem) {
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
    }
    return request;
  },
  //将传入的prescript语句转化为event中prescript需要的语法
  parseInputPreString: function (prestring) {

    var prescriptObj={global:{},evn:{}};
    eval(prestring);
    var returnString = String();

    //第一层遍历prescriptObj
    for (var prop in prescriptObj) {
      if (prescriptObj.hasOwnProperty(prop) && prop === 'global') {
        var global = prescriptObj[prop];
        //当属性名为global时,再次遍历
        for (var key in global) {
          if (global.hasOwnProperty(key)){
            var tmpString = 'postman.setGlobalVariable(' + key + ',' + global[key] + ');';
            returnString = returnString.concat(tmpString + '\n');
          }
        }
      }else if(prescriptObj.hasOwnProperty(prop) && prop === 'evn'){
        var evn = prescriptObj[prop];
        //当属性名为evn时,再次遍历
        for (var key in evn) {
          if (evn.hasOwnProperty(key)){
            var tmpString = 'postman.setEnvironmentVariable('+key+','+ evn[key]+');';
            returnString = returnString.concat(tmpString+'\n');
          }
        }
      }
    }
    console.log(returnString);
    return returnString;
  },

  //将传入的testscript语句转化为event中testscript需要的语法
  parseIntputTestString: function (teststring) {
    var testscript;
  }
}

//转换headerJson对象为需要的结构
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

//转换paramJson对象为需要的结构
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
  // console.log(paramArray);
  return paramArray;
}


