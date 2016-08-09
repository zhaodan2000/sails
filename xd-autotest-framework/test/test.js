/**
 * Created by xiaodou_chenxiaoxiang on 16/7/26.
 */

var path = require('path');
var fs = require('fs');
var JSON5 = require('json5');
var  Collection = require('postman-collection').Collection;
var  RequestAuth = require('postman-collection').RequestAuth;
var  Request = require('postman-collection').Request;
var  Item = require('postman-collection').Item;
var Header = require('postman-collection').Header;
var Body = require('postman-collection').RequestBody;
var Url = require('postman-collection').Url;

var String = require('../api/utils/string');

function testCollection() {
  var  mycollection;

  //mycollection set info
  // mycollection = new Collection({
  //   name:'This is new info',
  //   disabled:true
  // });

  mycollection= {
    info:{
      _postman_id:'eaa77b0b-8bab-616c-f866-a76fa867c19c',
      name:'This is new info',
      schema: "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
      // disabled:true
    }
  }


  //request headers
  var headerString = 'clientType:android\nmodule:2\nversion:1.0\nclientIp:192.168.31.23\ndeviceId:MyTestDeviceID123\n';
  //
  var rawHeaders = parseHeaderString(headerString);

  console.log(rawHeaders);

  //request QuetyParam
  var paramJson = {
    platform:"loacl",
    phoneNum:"18210191798",
    pwd:"123456"
  }

  var queryParamString = 'req='+JSON.stringify(paramJson);
  //request body
  var requestBody = {
    mode:'urlencoded',
    urlencoded:[
      {
        key: "req",
        value: "{\"platform\":\"local\",\"phoneNum\":\"18210191798\",\"pwd\":\"123456\"}",
        type:'text',
        enabled: true
    }
    ]
  };

  //request
  var request = {
    url : "http://192.168.103.101:8002/user/newLogin",
    method : "POST",
    header :rawHeaders,
    body : requestBody
  }
  // var request = new Request();
  // request.url = "http://192.168.103.101:8002/user/newLogin";
  // request.method = "POST";
  // request.body = requestBody;
  // request.headers = requestHeader;
  // request.addQueryParams(queryParamString);
  // console.log(headers);
  // console.log(request.body);
  // console.log(Url.parse(request.url).query);

  //item
  var item = {
    name: "Send a POST request",
    request: request,
    event:[{
      listen: 'test',
      script: {
        type: "text/javascript",
        exec: "var jsonData = JSON.parse(responseBody);\ntests[\"retcode\"] = jsonData.retcode === \"0\";"
      }
    }]
  };

  //set items  能不能批量添加?
  // mycollection.items.add(item);
  mycollection.item = [
    item
  ]

  // console.log(JSON.stringify(mycollection, null, 2));

  //把collection写入filename
  fs.writeFile("test.json", JSON.stringify(mycollection, null, 2), function (err) {
    if (err) {
      console.log('err ---------'+err);
    } else {
      console.log("JSON saved to test.json" );
    }
  });
  return mycollection;
}

function newmanTest(collection) {
  var Newman = require('xdnewman');
  var JSON5 = require('json5');
  var fs = require('fs');

  // console.log(collection);
// read the collectionjson file
//   var collectionJSON = JSON.stringify(collection, null, 2);

  // var collectionJSONObject = JSON5.parse(collection);

// define Newman options
  var newmanOptions = {
    iterationCount: 1,                    // define the number of times the runner should run
    outputFile: "outfile.json",            // the file to export to
    responseHandler: "TestResponseHandler", // the response handler to use
    asLibrary: true,         				// this makes sure the exit code is returned as an argument to the callback function
    stopOnError: true
  }

// Optional Callback function which will be executed once Newman is done executing all its tasks.
  Newman.execute(collection, newmanOptions, function(exitCode, results){
    console.log("exitCode is " + exitCode);
    console.log(results);
  });
}

function parseHeaderString(headerString) {
  var headers = [],
    regexes = {
      header: /^(\S+):(.*)$/gm,
      fold: /\r\n([ \t])/g,
      trim: /^\s*(.*\S)?\s*$/
    },
    match = regexes.header.exec(headerString);
  headerString = headerString.toString().replace(regexes.fold, '$1');

  while (match) {
    headers.push({
      key: match[1],
      value: match[2].replace(regexes.trim, '$1')
    });
    match = regexes.header.exec(headerString);
  }
  return headers;
}

//将传入的prescript语句转化为event中prescript需要的语法
  function parseInputPreString(prestring) {

  var prescriptObj={global:{},evn:{}};
  eval(prestring);
  var returnString = '';

    //第一层遍历prescriptObj
  for (var prop in prescriptObj) {
    if (prescriptObj.hasOwnProperty(prop) && prop === 'global') {
      var global = prescriptObj[prop];
      //当属性名为global时,再次遍历
      for (var key in global) {
        if (global.hasOwnProperty(key)){
          var tmpString = 'postman.setGlobalVariable({0}, {1})';
          returnString = returnString.concat(tmpString.format(key, global[key]) + '\n');
        }
      }
    }else if(prescriptObj.hasOwnProperty(prop) && prop === 'evn'){
      var evn = prescriptObj[prop];
      //当属性名为evn时,再次遍历
      for (var key in evn) {
        if (evn.hasOwnProperty(key)){
          var tmpString = 'postman.setEnvironmentVariable({0}, {1})';
          returnString = returnString.concat(tmpString.format(key, evn[key]) + '\n');
        }
      }
    }
  }
    console.log(returnString);
  return returnString;
}

var string = 'postman.setGlobalVariable({0}, {1})';
console.log(string.format('req', '123'));

// parseInputPreString('prescriptObj.global.req=1;prescriptObj.evn.index=2');
newmanTest(testCollection());
// testCollection()
// readdishCollection()
