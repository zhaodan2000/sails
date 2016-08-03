/**
 * Created by lyh on 8/2/16.
 */

var JSON5 = require('json5');

module.exports= {

  testcallback: function (requestName, res, callback) {
    console.log("went into testcallback");
    RequestItem.find({name: requestName}).exec(function (err, records) {
      if (!err) {
        console.log("find records success!");
        callback(records);
      }
      else {
        console.log("find records failure!");
        callback(null);
      }

    });
  }
}
