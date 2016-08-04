/**
 * Created by xiaodou_chenxiaoxiang on 16/8/4.
 */


module.exports = {
  creatCollectionToDB: function (req, res) {
    var collectionJson = {
      name:'testCollection',
      schema:'https://schema.getpostman.com/json/collection/v2.0.0/collection.json',
      description:'This is a description'
    };

    Collection.create(collectionJson).exec(function createCB(err, created) {
      if (err) {
        console.log(err);
      } else {
        // 否则，将新创建的用户登录
        console.log("Ok"+ JSON.stringify(created));
        res.send("Ok"+ JSON.stringify(created));
      }
    })
  },

  getCollectionAndTest: function (req, res) {
    Collection.findOne({name: "testCollection"}).exec(function (err, collection) {
      if (!err) {

        //
        console.log(collection);
        //
        RequestItem.findOne({name: "login"}).exec(function (err, requestFromDB) {
          if (!err) {

            //
            console.log(requestFromDB);

            var request = RequestItemServices.configRequestItem(requestFromDB);

            var event =[{
              listen: 'test',
              script: {
                type: "text/javascript",
                exec: "var jsonData = JSON.parse(responseBody);\ntests[\"retcode = 0 pass\"] = jsonData.retcode === \"0\";"
              }
            }];

            var item = RequestItemServices.configItem(request, event);
            var itemArr = [];
            itemArr.push(item);
            collection.item = itemArr;
            var collectionOBJ = CollectionServices.creatCollection(collection);

            console.log(collectionOBJ);
            res.send(collectionOBJ);

            var option = CollectionServices.optionMake();
            CollectionServices.testCollectionWithCallBack(collectionOBJ, option, function (exitcode) {
              console.log("exitCode is " + exitcode);
              console.log('callback');
            })
          }
          else {
            console.log(err);
          }
        });
      }
      else {
        console.log(err);
      }
    });
  }
}
