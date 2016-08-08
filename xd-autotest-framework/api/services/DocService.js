/**
 * Created by lyh on 8/2/16.
 */

var JSON5 = require('json5');


module.exports= {
  test:function(){

   var modelType=doc;
    var dic={name:'abc'};
    testcallback2(requestName,modelType,dic );
  },

  testcallback2: function (requestName, modelType,dic, res, callback) {
    console.log("went into testcallback");
    modelType.find(dic).exec(function (err, records) {
      if (!err) {
        console.log("find records success!");
        callback(records);
      }
      else{
        console.log("find records failure!");
        callback(null);
      }

    });
  },

  testcallback: function (requestName,  res, callback) {
    console.log("went into testcallback");
    RequestItem.find({name: requestName}).exec(function (err, records) {
      if (!err) {
        console.log("find records success!");
        callback(records);
      }
      else{
        console.log("find records failure!");
        callback(null);
      }

    });
  }
}
