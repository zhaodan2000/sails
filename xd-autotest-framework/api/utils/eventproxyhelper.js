/**
 * Created by Administrator on 2016/9/30.
 */
var uuid = require('node-uuid');
var eventproxy = require('eventproxy');

var _eventproxy = function () {
  var _length = 0;
  this._id = uuid.v4();
  this.getLength = function () {
    return _length
  };
  this._ep = eventproxy.create();
  this.after = function (length, callback) {
    this._ep.after(this._id, length, callback);
  };
  this.emit = function (value) {
    this._ep.emit(this._id, value);
  };
  this.addlength = function (length) {
    _length += (length ? length : 1);
  }
}

exports.create = function () {
  return new _eventproxy();
}
