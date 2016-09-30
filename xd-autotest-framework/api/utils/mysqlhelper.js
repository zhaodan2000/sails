/**
 * Created by Administrator on 2016/9/30.
 */
var mysql = require('../datasource/mysqlManager')
var _mysql = function (ep) {
  var _ep = ep;
  this.execQuery = function (options) {
    if (options['callback']) {
      _ep.addlength(1);
      options['_callback'] = function (results) {
        options['callback'](results);
        _ep.emit('1');
      };
    }
    mysql.execQuery(options);
  }
}

exports.create = function (ep) {
  return new _mysql(ep);
}
