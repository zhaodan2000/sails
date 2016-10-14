/**
 * Created by zhaodan on 16/8/7.
 */
var tmpString = {
  setGlobalVar: "postman.setGlobalVariable('{0}', '{1}');",
  setEnvVar: "postman.setEnvironmentVariable('{0}', '{1}');",
  clearGlobalVar: "postman.clearGlobalVariable('{0}');",
  clearEnvVar: "postman.clearEnvironmentVariable('{0}');",
  responseBodyHas: "tests['Body matches string'] = responseBody.has('{0}');",
  responseBodyEqualStr: "tests['Body is correct'] = responseBody === '{0}';",
  checkJsonValue: "if(typeof(jsonData) == 'undefined') {jsonData = JSON.parse(responseBody);}tests['check {0}'] = jsonData.{1} === '{2}';"
};

var PreEventProxy = function () {
  this._event = null;
  this.setGlobalVar = function (key, value) {
    this._event.script.exec = this._event.script.exec.concat(tmpString.setGlobalVar.format(key, value) + '\n');
  };
  this.setEnvVar = function (key, value) {
    this._event.script.exec = this._event.script.exec.concat(tmpString.setEnvVar.format(key, value) + '\n');
  };
  this.clearGlobalVar = function (key) {
    this._event.script.exec = this._event.script.exec.concat(tmpString.clearGlobalVar.format(key) + '\n');
  };
  this.clearEvnVar = function (key) {
    this._event.script.exec = this._event.script.exec.concat(tmpString.clearEnvVar.format(key) + '\n');
  };
};

var TestEventProxy = function () {
  PreEventProxy.call(this);
  this.responseBodyHas = function (key) {
    this._event.script.exec = this._event.script.exec.concat(tmpString.responseBodyHas.format(key) + '\n');
  };
  this.responseBodyEqualStr = function (key) {
    this._event.script.exec = this._event.script.exec.concat(tmpString.responseBodyEqualStr.format(key) + '\n');
  };
  this.checkJsonValue = function (key, value) {
    this._event.script.exec = this._event.script.exec.concat(tmpString.checkJsonValue.format(key, key, value) + '\n');
  };
};

exports.newPreEventProxy = function () {
  return new PreEventProxy();
};
exports.newTestEventProxy = function () {
  return new TestEventProxy();
};
