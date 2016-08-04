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
        // 打印并显示
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
        //这里应该从页面取得返回数据
        RequestItem.findOne({name: "login"}).exec(function (err, requestFromDB) {
          if (!err) {

            //
            console.log(requestFromDB);

            //根据传入配置request
            var request = RequestItemServices.configRequestItem(requestFromDB);

            //配置前置脚本和后置脚本
            var event =[{
              listen: 'test',
              script: {
                type: "text/javascript",
                exec: "var jsonData = JSON.parse(responseBody);\ntests[\"retcode = 0 pass\"] = jsonData.retcode === \"0\";"
              }
            }];

            //根据request配置item
            var item = RequestItemServices.configItem(request, event);
            //设置event(前置脚本和后置脚本)
            var itemArr = [];
            itemArr.push(item);
            //设置collection的item
            collection.item = itemArr;
            //根据collection对象生成能够进行测试的collection
            var collectionOBJ = CollectionServices.creatCollection(collection);

            console.log(collectionOBJ);
            res.send(collectionOBJ);
            //配置测试需要的option(以后应该添加入参,根据入参进行配置)
            var option = CollectionServices.optionMake();

            //对collectionJson进行测试
            CollectionServices.testCollectionWithCallBack(collectionOBJ, option, function (exitcode) {
              //测试完成的回调,这里应该把测试结果返回才对
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
