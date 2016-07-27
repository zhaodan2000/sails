/**
 * Created by xiaodou_chenxiaoxiang on 16/7/26.
 */

//Demo

var path = require('path');
var fs = require('fs');



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
  console.log(pretty(myCollection));
  return pretty(myCollection);
}


// 把创建的collection保存在本地
function writeCollectionToFile(fileName) {
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
var  mycollection;

  //set info
  mycollection = new Collection({
    name:'This is new info',
    disabled:true
  });

  //set items  能不能批量添加?
  mycollection.items.add(
    { name: 'GET Request', request: 'https://echo.getpostman.com/get?auth=basic' }
  );
  mycollection.items.add(
    { name: 'PUT Request', request: 'https://echo.getpostman.com/put?auth=basic' }
  );

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

  //Add a request that uses the variable that we just added.
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

// readCollection();
// writeCollectionToFile('file.json');
// setCollectionPrototypeToFile('setCollectionPrototype.json');
// cookieAbout();
EventAbout();

module.exports.readCollection = readCollection;
module.exports.writeCollectionToFile = writeCollectionToFile;
module.exports.setCollectionPrototypeToFile = setCollectionPrototypeToFile;
module.exports.cookieAbout = cookieAbout;





