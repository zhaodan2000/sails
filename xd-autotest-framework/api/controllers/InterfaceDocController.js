/**
 * InterfaceDocController
 *
 * @description :: Server-side logic for managing Interfacedocs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  testmydb: function(req,res){
    var item="test abc string...";//{name:"首页接口",url:"/home",params:""};
    console.log('error......');
    //res.view('homeindex');
    console.log('correct.....');
    res.view('apidoc'); //输入route.js里的定义的路径名。

  }

};

