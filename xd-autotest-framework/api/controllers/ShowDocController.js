/**
 * ShowDocController
 *
 * @description :: Server-side logic for managing showdocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  showdoc:function (req,res) {
    DocService.testcallback('newLogin_API', res, function (records) {
      res.view('showdoc', {data:records});
    })
  },

  showreq:function (req, res) {
    console.log(req.body);
    var item = {headers:{},queryParam:{}};
    for(var key in req.body){
      var re_header = new RegExp(/^header/);
      var flag_header = key.match(re_header);
      var re_queryParam = new RegExp(/^queryParam/);
      var flag_queryParam = key.match(re_queryParam);
      var headers = "headers";
      var queryParam = "queryParam";
      if (flag_header){
        var headerkey = key.substring(6);
        item[headers][headerkey] = req.body[key];
      }
      else if(flag_queryParam){
        var queryParamkey = key.substring(10);
        item[queryParam][queryParamkey] = req.body[key];
      }else {
        item[key] = req.body[key];
      }
    }
    RequestItem.update({name:req.body.name}, item, function (err, records) {
      if(err){
        console.log(err);
      }else {
        return res.send('OK');
      }
    })

    // return res.send(req.body);
  },
};

