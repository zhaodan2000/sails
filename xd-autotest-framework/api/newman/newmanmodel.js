/**
 * Created by zhaodan on 16/10/9.
 */
var _Collection = function () {
  this._collection = {
    variables: [],
    info: {
      name: "",
      schema: "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
    },
    item: []
  };
  this.setName = function (name) {
    this._collection.info.name = name;
  }
  this.pushItem = function (item) {
    this._collection.item.push(item);
  }
  this.getCollection = function () {
    return this._collection;
  }
};

exports.newCollection = function (){
  return new _Collection();
};
