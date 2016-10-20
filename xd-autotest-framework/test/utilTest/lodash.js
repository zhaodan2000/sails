/**
 * Created by zhaodan on 16/10/19.
 */
var _ = require("lodash");

// 1 _.wrap
var swap = function (text) {
  return "Hello " + text;
}
var getScript = _.wrap(swap, function (func, text) {
  return func(text) + " !";
})
console.log(getScript("zhaodan"));

// 2 _.bind/_.bindKey
var greet = function (greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}
var object = { 'user': 'fred' };
var _bind = _.bind(greet, object, 'hi');
// var _bind = _.bindKey(greet, object, 'hi');
console.log(_bind('!'));

// 3 _.bindAll
var view = {
  'label': 'docs',
  'onClick': function () {
    console.log('clicked ' + this.label);
  }
};
_.bindAll(view, 'onClick');

// 4 _.flow
function square(n) {
  return n * n;
}
var addSquare = _.flow(_.add, square);
console.log(addSquare(1,2));
