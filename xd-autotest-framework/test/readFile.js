/**
 * Created by wanglinfeg on 16/7/26.
 */
var rf=require("fs");
rf.readFile("test.txt",'utf-8',function(err,data){
  if(err){
    console.log("error"+err);
  }else{
    console.log(data);
  }
});
console.log("READ FILE ASYNC END");
