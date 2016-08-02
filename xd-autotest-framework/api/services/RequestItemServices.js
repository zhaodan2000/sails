/**
 * Created by xiaodou_chenxiaoxiang on 16/8/1.
 */

// var RequestItem = require('../models/RequestItem');
var fs = require('fs');

module.exports = {

  //根据item生成collection 并返回
  configCollection: function (item) {
    var collection = {
      info:{
        _postman_id:'eaa77b0b-8bab-616c-f866-a76fa867c19c',
        name:'new Collection',
        schema:'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
      },
      item: [item]
    }
    fs.writeFile("itemCollection.json", JSON.stringify(collection, null, 2), function (err) {
      if (err) {
        console.log('err ---------'+err);
      } else {
        console.log("JSON saved to itemCollection.json" );
      }
    });
    return collection;
  },

  //根据request生成item
  configItem: function (request) {
    var item = {
      id : request.id,
      name : request.name,
      disabled : request.disabled,
      request : request,
      event:[{
        listen: 'test',
        script: {
          type: "text/javascript",
          exec: "var jsonData = JSON.parse(responseBody);\ntests[\"retcode\"] = jsonData.retcode === \"0\";"
        }
      }]
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

  newmanTest: function (collection) {
    var Newman = require('newman');
    var fs = require('fs');
    // define Newman options
    var newmanOptions = {
      iterationCount: 1,                    // define the number of times the runner should run
      outputFile: "outfile.json",            // the file to export to
      responseHandler: "TestResponseHandler", // the response handler to use
      asLibrary: true,         				// this makes sure the exit code is returned as an argument to the callback function
      stopOnError: true
    }

// Optional Callback function which will be executed once Newman is done executing all its tasks.
    Newman.execute(collection, newmanOptions, function(exitCode){
      console.log("exitCode is " + exitCode);
      console.log('callback');
    });
  }
}


// function parseHeaderString(headerString) {
//   var headers = [],
//     regexes = {
//       header: /^(\S+):(.*)$/gm,
//       fold: /\r\n([ \t])/g,
//       trim: /^\s*(.*\S)?\s*$/
//     },
//     match = regexes.header.exec(headerString);
//   headerString = headerString.toString().replace(regexes.fold, '$1');
//
//   while (match) {
//     headers.push({
//       key: match[1],
//       value: match[2].replace(regexes.trim, '$1')
//     });
//     match = regexes.header.exec(headerString);
//   }
//   console.log(headers);
//   return headers;
// }

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


