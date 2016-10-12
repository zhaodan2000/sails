/**
 * Created by zhaodan on 16/10/12.
 */
var log4js = require('log4js');

log4js.configure({

  appenders: [
    {
      type: 'console',
    }, //控制台输出
    {
      type: "file",
      filename: 'info.log',
      pattern: "_yyyy-MM-dd",
      maxLogSize: 20480,
      backups: 3,
      category: 'dateFileLog'

    }//日期文件格式
  ],
  replaceConsole: true   //替换console.log
  // levels:{
  //   dateFileLog: 'debug',
  //   console: 'debug'
  // }
});

exports.logger = function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel("info");
  return logger;
};
