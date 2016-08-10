/**
 * TCFolder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_TCFolder',
  attributes: {
    id:{
      type:'string',
      required:false,
      autoIncrement:true
    },
    /***
    name:{
      type:'string',
      required:false
    },*/
    objects:{
      type:'array',
      requird:false
    }

    /**
     * 一个APIdoc与docItem是one-to-many的关系,
     * 可通过doc与docItem的引用指向来相互关联,
     * 参考:http://sailsjs.org/documentation/concepts/models-and-orm/associations/one-to-many
     *
    APIdoc_items: {
      collection: 'APIdocitem',
      via: 'APIdocID'
    }*/
  }
};

