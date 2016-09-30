/**
 * Created by lyh on 8/2/16.
 */

var JSON5 = require('json5');


module.exports= {

  testCrossService:function (req,res) {
    var request={url:'http://192.168.103.101:8002/user/newLogin'};

  },

  test:function(){
    var modelType=doc;
    var dic={name:'abc'};
    testcallback2(caseName,modelType,dic );
  },

  testcallback2: function (caseName, modelType,dic, res, callback) {
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

  testcallback: function (caseName,  res, callback) {
    console.log("went into testcallback");
    RequestItem.find({name: caseName}).exec(function (err, records) {
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
