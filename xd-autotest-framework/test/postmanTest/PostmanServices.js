/**
 * Created by xiaodou_chenxiaoxiang on 16/7/26.
 */

//Demo

var path = require('path');
var fs = require('fs');
var JSON5 = require('json5');



var pretty = function (obj) { // function to neatly log the collection object to console
  return require('util').inspect(obj, {colors: true});
};

// 从本地读取json文件或者collection文件,并使用高亮显示
function readCollection() {
  var Collection = require('postman-collection').Collection;
  var myCollection;

  // Load a collection to memory from a JSON file on disk (say, sample-collection.json)
  myCollection = new Collection(JSON.stringify(fs.readFileSync(path.join(__dirname,'collection.json')).toString()),null, 2);

  // log items at root level of the collection
  console.log(myCollection.headers);
  console.log(pretty(myCollection));
  return pretty(myCollection);
}


// 把创建的collection保存在本地
function writeCollectionToFile(fileName) {
  var Collection = require('postman-collection').Collection;
  var fileCollection;
  fileCollection = new Collection({
    info: {
      name: "A new Collection"
    }
  });

  fs.writeFile(fileName, JSON.stringify(fileCollection, null, 2), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + fileName);
    }
  });
}

function setCollectionPrototypeToFile(filename) {
  var  Collection = require('postman-collection').Collection;
  var  RequestAuth = require('postman-collection').RequestAuth;
  var  Request = require('postman-collection').Request;
  var  Item = require('postman-collection').Item;
  var Header = require('postman-collection').Header;
  var Body = require('postman-collection').RequestBody;
  var Url = require('postman-collection').Url;
  var QueryParam = require('postman-collection').QueryParam;

  var  mycollection;

  //mycollection set info
  mycollection = new Collection({
    name:'This is new info',
    disabled:true
  });

  //request headers
  var headerString = 'Content-Type: application/json\nUser-Agent: MyClientLibrary/2.0\n';
  //
  var rawHeaders = Header.parse(headerString);

  var headers = rawHeaders.map(function (h) {
    return new Header(h);
  });

  var header = Header.create('application/json', 'Content-Type');
  // console.log(header);

  //request Url
  var requesturl = new Url({
    port:"8888",
    auth:"zhang",
    protocol:"https",
    path:"path",
    hash:"null",
    host:"www.baidu.com"
});


  //request QuetyParam
  var queryParamString = 'phoneNum=18210191798&pwd=123456';
  // var rawParam = QueryParam.parse(queryParamString);


  //Url add QueryParam
  requesturl.addQueryParams(queryParamString);

  //request body
  var requestBody = new Body({
    mode:'urlencoded'
  });

  //request
  var request = new Request({
    url:requesturl,
    method:"POST",
    body:requestBody,
    header:headers
  });

  // request.addQueryParams(queryParamString);

  console.log(requesturl.getQueryString());
  // console.log(headers);
  //虽然在输出文档上没有显示, 但是可以打印出来
  // console.log(request.getHeaders());

  //Url and Param
  // console.log(request.url);

  //item
  var item = new Item({
    name: "Send a POST request",
    id: "my-post-request",
    request: request
  });

  //set items  能不能批量添加?
  mycollection.items.add(item);
  // mycollection.items.add(
  //   {
  //     name: 'PUT item',
  //     request: {
  //       id:'requestName',
  //       url:'http://www.baidu.com',
  //       body:{
  //         mode:'urlencoded'
  //       },
  //       header:[{
  //         "key": "Content-Type",
  //         "value": "application/json",
  //       }]
  //     },
  //
  //   }
  // );

  //set auth 输出到文件时未显示?但是使用console.log可以打印
  mycollection.auth = new RequestAuth({
    id:'auth id',
    type: 'basic',
    name: 'auth name',
    disabled: true
  });

  //add event 能不能批量添加
  mycollection.events.add({
    listen: 'test',
    script: {
      exec: 'tests["Status code is 200"] = (responseCode.code === 200)'
    }
  });
  mycollection.events.add({
    listen: 'test1',
    script: {
      exec: 'tests["Status code is 200"] = (responseCode.code === 200)'
    }
  });

  //遍历items并且打印item.name, Log the description of all root items
  mycollection.items.all().forEach(function (item) {
    console.log(item.name || 'Untitled Item');
    item.description && console.log(item.description.toString());
  });

  // Filter items in Collection root that is an empty ItemGroup?
  var itemGroup;
  itemGroup = mycollection.items.filter(function (item) {
    return item && item.items && (item.items.count() === 0);
  });
  // Log the emptyGroups array to check it's contents
  console.log(itemGroup);

  // Add a variable to the collection
  mycollection.variables.add({
    id: 'apiBaseUrl',
    value: 'http://timeapi.org',
    type: 'string'
  });


  // Add a request that uses the variable that we just added.
  mycollection.items.add({
    id: 'utc-time-now',
    name: 'Get the current time in UTC',
    request: '{{apiBaseUrl}}/utc/now'
  });

  //set describe  导出文件未显示
  mycollection.describe('Hey! This is a cool collection.');
  console.log(mycollection.description.toString()); // read the description
  // console.log(mycollection);

  //把collection写入filename
  fs.writeFile(filename, JSON.stringify(mycollection, null, 2), function (err) {
    if (err) {
      console.log('err ---------'+err);
    } else {
      console.log("JSON saved to " + filename);
    }
  });
}

//cookieAbout
function cookieAbout() {
  var Cookie = require('postman-collection').Cookie,
    rawHeader = 'myCookie=myValue;Path=/;Expires=Sun, 04-Feb-2018 14:18:27 GMT;Secure;HttpOnly;Domain;Priority=HIGH',
    myCookie = new Cookie(rawHeader);

  console.log(myCookie.toJSON());
  console.log('domain   '+myCookie.domain);
  console.log('expires    '+myCookie.expires);
  console.log('extensions   '+myCookie.extensions);
  console.log('hostOnly   '+myCookie.hostOnly);
  console.log('httpOnly   '+myCookie.httpOnly);
  console.log('maxAge   '+myCookie.maxAge);
  console.log('name   '+myCookie.name);
  console.log('path   '+myCookie.path);
  console.log('secure   '+myCookie.secure);
  console.log('session    '+myCookie.session);
  console.log('value    '+myCookie.value);
}

//Event
function EventAbout() {
  var SDK = require('postman-collection');
  var Collection = SDK.Collection;

  var mycollection = new Collection();

  var event = {
    name:'name1',
    listen: 'test',
    script: {
      exec: 'tests["Status code is 200"] = (responseCode.code === 200)'
    }
  }

  event.name = 'name4';
  //add event 能不能批量添加
  mycollection.events.add(event);
  mycollection.events.add({
    listen: 'test1',
    script: {
      exec: 'tests["Status code is 200"] = (responseCode.code === 200)'
    }
  });

  mycollection.events.append(event);
  mycollection.events.add(event);
  mycollection.events.add(event);
  mycollection.events.append(event);

  var count = function () {
    return mycollection.events.count();
  }

  var all = function () {
    return mycollection.events.all();
  }



  //event Function
  console.log(count());
  // console.log(all());

  //append 到events中的event才能够返回YES和index
  console.log(mycollection.events.has(event));
  console.log(mycollection.events.indexOf(event));

  //?
  console.log(mycollection.events.listeners('name'));
  console.log(mycollection.events.listenersOwn('name1'));

  //把collection写入filename
  fs.writeFile('EventsCollection.json', JSON.stringify(mycollection, null, 2), function (err) {
    if (err) {
      console.log('err ---------'+err);
    } else {
      console.log("JSON saved to " + 'EventsCollection.json');
    }
  });
}

//header

//body  必须要有body中的mode,
function setCollectionBody() {
  var SDK = require('postman-collection');
  var Collection = SDK.Collection;

  var mycollection = new Collection();

  mycollection.items.add(
    {
      id:'123',
      name: 'GET Request', request: {
      url:'http://www.baidu.com',
      method:'GET',
      body:{
        mode:'urlencoded'
      }
    }}
  );
  mycollection.items.add(
    {
      id:'456',
      name: 'POST Request', request: {
      url:'http://www.iqiyi.com',
      method:'GET',
      body:{
        mode:'urlencoded'
      }
    }}
  );

  //把collection写入filename
  fs.writeFile('bodytest.json', JSON.stringify(mycollection, null, 2), function (err) {
    if (err) {
      console.log('err ---------'+err);
    } else {
      console.log("JSON saved to " + 'bodytest.json');
    }
  });
  newman(mycollection);
}

//使用newman测试collection
function newman(collection) {
  var Newman = require('newman');

// read the collectionjson file
  var fsFile = fs.readFileSync('collection.json', 'utf8');
  var testCollection = JSON.stringify(collection, null, 2);

//选择使用fsfile还是传入的collection对象
//   var collectionJson1 = JSON5.parse(fsFile);
  var collectionJson1 = JSON5.parse(testCollection);
  // console.log('fsflie:'+fsFile);
  console.log('testCollection:'+collectionJson1);

// define Newman options
  var newmanOptions = {
    iterationCount: 1,                    // define the number of times the runner should run
    outputFile: "outfile.json",            // the file to export to
    // responseHandler: "TestResponseHandler", // the response handler to use
    asLibrary: true,         				// this makes sure the exit code is returned as an argument to the callback function
    stopOnError: true
  }

// Optional Callback function which will be executed once Newman is done executing all its tasks.
  Newman.execute(collectionJson1, newmanOptions, function(exitCode){
    console.log("exitCode is " + exitCode);
    console.log('callback');
  });
}

//倒入outfile文件并展示response
function getResponse(filename) {
  var responsefile = fs.readFileSync(filename, 'utf8');
  var responseJSON = JSON5.parse(responsefile);
  // console.log(responseJSON);

  var results = responseJSON.results;
  // var item;

  console.log(results.length);
  var result = results[0];
  console.log(result);
  console.log(result['responseCode']['body']);
}

function setHeader() {
 var Header = require('postman-collection').Header,
   Request = require('postman-collection').Request,
   Item = require('postman-collection').Item;

  var item = new Item();
  var request = new Request();
  item.request = request;

  console.log(item);

  headerString = 'Content-Type: application/json\nUser-Agent: MyClientLibrary/2.0\n';

 var rawHeaders = Header.parse(headerString);
 // console.log(rawHeaders); // [{ 'Content-Type': 'application/json', 'User-Agent': 'MyClientLibrary/2.0' }]

 var headers = rawHeaders.map(function (h) {
         return new Header(h);
 });


  // console.log(headers);
  // return rawHeaders;
 // assert.headerString === Header.unparse(headers);
  // collection.hea
}


// readCollection();
// writeCollectionToFile('file.json');
setCollectionPrototypeToFile('setCollectionPrototype.json');
// cookieAbout();
// EventAbout();
// setCollectionBody();
// getResponse('outfile.json');
// setHeader();

module.exports.readCollection = readCollection;
module.exports.writeCollectionToFile = writeCollectionToFile;
module.exports.setCollectionPrototypeToFile = setCollectionPrototypeToFile;
module.exports.cookieAbout = cookieAbout;





