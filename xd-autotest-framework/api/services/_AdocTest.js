/**
 * Created by lyh on 8/9/16.
 */


module.exports={
  testArray:function(){
    var test1={name:'一级目录',url:'http://www.baidu.com'};
    var test2={name:"二级目录",
      isFolder:true,
      API_items:[{  name: '首页接口182',
                    url: 'http://192.168.103.101:8020/selftaught/home',
                    API_ID: '182',
                    disabled: false,
                    method: 'POST',
                    dataType: 'x-www-form-urlencoded',
                    header: {sessionToken:'testToken123',clientIp:'127.0.0.1'},
                    queryParams: {req:{courseId:1,chapterId:2,itemId:3}},
                    createdAt: '2016-08-08T12:50:44.193Z',
                    updatedAt: '2016-08-08T12:50:44.193Z',
                    id: '182' }
                ]
    };

    var test3={  name: '登录接口。。。',
      url: 'http://192.168.103.101:8020/user/newLogin',
      API_ID: '123',
      disabled: false,
      method: 'POST',
      dataType: 'x-www-form-urlencoded',
      header: {sessionToken:'testToken123',clientIp:'127.0.0.1'},
      queryParams: {req:{courseId:1,chapterId:2,itemId:3}},
      createdAt: '2016-08-08T12:50:44.193Z',
      updatedAt: '2016-08-08T12:50:44.193Z',
      id: '123' };

    test2.API_items.push(test3);

    var tcFolder={objects:[test1,test2]};
    var output;
    /**
    TCFolder.create(tcFolder).exec(function(err,records){
      console.log(JSON.stringify(records,null,'\t'));
      output=records;
    });
     */


    TCFolder.find({id:'57a992afd1771ad9392a63cc'}).exec(function(records){
      console.log(records);
    });
    TCFolder.update({id:'57a992afd1771ad9392a63cc'},test2,function (records) {
      console.log('++++++++++++++');
      console.log(records);
      output=records;
    });
    if(output.objects.length===3)
    {
      console.log("Array新增元素成功!!!");
    }

  },

  testDelete:function(modelType){
      switch(modelType){
        case 'TCFolder':
              TCFolder.destroy();
              break;
        case 'TCOrderCaseFolder':
              TCOrderCaseFolder.destroy();
              break;
        default:
              break;
      }
  },

  testFind:function(modelType){
    switch(modelType){
      case "TCFolder":
            TCFolder.find().exec(function(err,records){
              console.log(records);
            });
            break;
      case "TCOrderCaseFolder":
            TCOrderCaseFolder.find().exec(function (err,records) {
              console.log(records);
            });
            break;
      case "RequestItem":
            RequestItem.find().exec(function(err,records){
              console.log(records);
            });
            break;
      default:
            break;
    }
  }

}
