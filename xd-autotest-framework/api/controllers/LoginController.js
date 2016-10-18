var mysqlService=require("../services/mysqlService");
var crypto = require("crypto");
var lodash=require("lodash");
/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	login : function(req, res) {
    res.view('login');
  },
  doLogin : function(req, res) {
    var username=req.body.username;
    var password=req.body.password;
    var user={
      user_name:username
    }
    mysqlService.Find("User",user,function(records){
      sails.log.debug(records);
      if(!lodash.isEmpty(records)) {
        if (records[0] == null) {
          req.session.authenticated = false;
          req.session.user = user;
          return res.redirect("/login");
        } else {
          password = password + '{' + records[0].salt + '}';
          password = crypto.createHash("md5").update(password).digest("hex");
          if (password == records[0].password) {
            req.session.authenticated = true;
            req.session.user = user;
            return res.redirect('/');
          } else {
            req.session.authenticated = false;
            req.session.user = user;
            return res.redirect("/login");
          }
        }
      }else{
        req.session.authenticated = false;
        req.session.user = user;
        return res.redirect("/login");
      }
    })
  },
  loginOut: function(req, res) {
    var user={
      user_name:""
    }
    req.session.authenticated=false;
    req.session.user = user;
    return res.redirect("/login");
  },
};

