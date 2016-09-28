/**
 * Created by lyh on 8/22/16.
 * 从APIdoc.ejs中移出。均为累积所写的demo.
 * 在APIdoc.ejs业务中并不需要。
 */

$('#showMdFile').click(function(){
  $.main.refreshMain('/EditDoc/testAPImd');

});

/**
 * 插入equestItem记录
 * */
$('#test_insertrequestitem').click(function(){
  //var requestItem=JSON.stringify($('textarea#textarea_requestItem').val());
  console.log("requestItem="+$('textarea#textarea_requestItem').val());
  var requestItemValue=$('textarea#textarea_requestItem').val();
  console.log(requestItemValue);
  var requestItem=JSON.parse(requestItemValue);
  console.log(requestItem);
  $.ajax({
    url: "/doc/insertRequestItemService",
    type: "Post",
    data: {
      req: requestItem
    },
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    success: function (data) {
      //返回的数据用data.d获取内容
      //alert(data.d);
      $("textarea#textarea_response").val(JSON.stringify(data,null,"\t"));
    },
    error: function (err) {
      //alert(err);
      $("textarea#textarea_response").val(JSON.stringify(err,null,"\t"));
    }
  });
  console.log("execute done service (/doc/insertRequestItemService) via ajax... this should be seen on front...");
});

$('#find_docItem').click(function(){
  $.ajax({
    url: '/doc/findDoc',
    type:"Get",
    //data:"{'first':'蚂蚁部落','second':'欢迎您'}",
    //data:queryString,
    data:{},
    success:function(data){
      //返回的数据用data.d获取内容
      //alert(data.d);
      $("textarea#textarea_response").val(JSON.stringify(data,null,"\t"));
    },
    error:function(err){
      //alert(err);
      $("textarea#textarea_response").val(JSON.stringify(err,null,"\t"));
    }
  });
});

/**
 * 根据输入的requestName查询requestItem记录
 * */
$('#findReqItem').click(function(){
  //var queryString="newLogin";
  var queryString=$('input#input_requestName').val();

  console.log(" test ... :queryString="+queryString);

  $.ajax({
    url: '/doc/findRequestItemByName',
    type:"Get",
    //data:"{'first':'蚂蚁部落','second':'欢迎您'}",
    //data:queryString,
    data:{
      requestName: queryString,
      //a: $('#a').val(),
      //b: $('#b').val()
    },
    success:function(data){
      //返回的数据用data.d获取内容
      //alert(data.d);
      $("textarea#textarea_response").val(JSON.stringify(data,null,"\t"));
    },
    error:function(err){
      //alert(err);
      $("textarea#textarea_response").val(JSON.stringify(err,null,"\t"));
    }
  });

  console.log("execute done service (/doc/findRequestItemByName) via ajax... this should be seen on front...");

});

$('#delete_reqItemTable').click(function(){
  $.ajax({
    url:"/doc/deleteAllReqItem",
    type:"Get",
    data:{},
    success:function(data){
      console.log(data);
      var retmsg={retcode:0,retdesc:"sucess",data:data};
      $("textarea#textarea_response").val(JSON.stringify(retmsg,null,"\t"));
    },
    error:function(err){
      console.log(err);
      var retmsg={retcode:-1,retdesc:"error",data:data};
      $("textarea#textarea_response").val(JSON.stringify(retmsg,null,"\t"));
    }
  });
});

$('#find_doc').click(function(){
  var queryString=$('#docName').val()+'.md';
  console.log(queryString);

  $.ajax({
    url: '/doc/findDocByName',
    type:"Get",
    data:{
      docName: queryString,
      //a: $('#a').val(),
      //b: $('#b').val()
    },
    success:function(data){
      $("textarea#textarea_response").val(JSON.stringify(data,null,"\t"));
    },
    error:function(err){
      $("textarea#textarea_response").val(JSON.stringify(err,null,"\t"));
    }
  })

});


