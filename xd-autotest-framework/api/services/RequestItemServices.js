/**
 * Created by xiaodou_chenxiaoxiang on 16/8/1.
 */
module.exports = {
  //根据一个requestItem对象生成
  configRequestItem: function (requestItem) {
    // var modeValue = requestItem.mode;
    var request = {
      id:requestItem.id,
      name:requestItem.name,
      method:requestItem.method,
      header:parseHeaderString(requestItem.headerString),
      body:{
        mode:requestItem.mode,
        modeValue:parseHeaderString(requestItem.queryParam)
      }
    }
  },
  /**
   * @enum {string} MODES
   */
  MODES: {
    raw: 'raw',
    formdata: 'formdata',
    urlencoded: 'urlencoded',
    file: 'file'
  }
}


function parseHeaderString(headerString) {
  var headers = [],
    regexes = {
      header: /^(\S+):(.*)$/gm,
      fold: /\r\n([ \t])/g,
      trim: /^\s*(.*\S)?\s*$/
    },
    match = regexes.header.exec(headerString);
  headerString = headerString.toString().replace(regexes.fold, '$1');

  while (match) {
    headers.push({
      key: match[1],
      value: match[2].replace(regexes.trim, '$1')
    });
    match = regexes.header.exec(headerString);
  }
  return headers;
}
