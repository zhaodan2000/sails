/**
 * Created by lyh on 8/2/16.
 */

var JSON5 = require('json5');

module.exports={
  writeAPItoDB:function(obj){
    console.log("went into writeAPItoDB");
    if(!obj){
      console.log("req is not null..");
      RequestItem.create(obj).exec(function(err,records){});
      var item=JSON.stringify(records);
      return item;
    }else{
      console.log("writeAPItoDB function obj is null..");
    }

  }


}
