
  /**
   * Created by lyh on 8/8/16.
   */

  $("button[name='editMDfile']").click(function(){
    var apiDoc_uniqid=$(this).attr('uniqid');
    console.log(apiDoc_uniqid);
    $.ajax({
      url:'/doc/editdoc',
      method:"post",
      data:{
        uniqID:apiDoc_uniqid
      },
      success:function(data){
        console.log("编辑md文件成功!");
        $("#page-wrapper-right").html(data);
      }
    });

  });

/**
 * 点击查看当前md文档。
 * **/
$("button[name='viewMDfile']").click(function(){
  var apiDoc_uniqid=$(this).attr('uniqid');
  console.log(apiDoc_uniqid);
  $.ajax({
    url: '/doc/showmdfile',
    method:"post",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data:{uniqid:apiDoc_uniqid},
    //data:"{'first':'蚂蚁部落','second':'欢迎您'}",
    success:function(data){
      console.log("查看md文件成功!");
      $("#page-wrapper-right").html(data);
    },
    error:function(data){
      console.log("查看md文件失败。。。");
      console.log(JSON.stringify(data.responseText,null,"\t"));
      $("#page-wrapper-right").html(data);
    }
  });

});

/**
 * 点击增加API接口的编辑入口。
 * */
$('#addAPIbutton').click(function(){
  $('h1#123doc')[0].innerHTML="测试1234";
  console.log($('h1#123doc')[0].innerHTML);

  var testItem=$("li#api_template").clone(true);
  var apis_count=$("ol#APIs").children('li').length;
  console.log('apis_count=%d',apis_count);
  testItem.find('input#api_title').attr("name","apiName_"+apis_count);
  testItem.find('input#api_url').attr("name","URL_"+apis_count);
  testItem.attr('id','api_'+apis_count);
  testItem.attr('style',"display:");
  console.log(testItem);
  //$('ol#APIs').prepend(testItem);
  $('ol#APIs').append(testItem);
  console.log("添加api_item完成咯~");
});

/**
 * 将用户的输入存md文件中。
 * */
$('#save_doc').click(function() {
  var file_name = document.getElementById('docName').innerHTML+'.md';
  var file_content = $('#md_filecontent').val();
  var param={'filename':file_name, 'filecontent':file_content};
  var queryString=JSON.parse(JSON.stringify(param));
  console.log(param);
  console.log("JSON.stringify(param)="+JSON.stringify(param));

  $.ajax({
    url: "/doc/savedoc",
    method:"post",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(param),
    success: function (data) {
      $('textarea#textarea_response').val(JSON.stringify(data, null, "\t"));
    },
    error: function (data) {
      $('#textarea_response').val(JSON.stringify(err, null, "\t"));
    }
  })
});

var option_submit = {
  success:function (data) {
    $.main.refreshMain("/Home/doc");
    console.log('+++++++++++++++' + data);
  }
};

/**
 * 将用户的输入存入doc与docItem中。
 * */
$('#save_doc_2_db').click(function(){
  //to do 判断表单的输入不为空。
  $("#apidoc_form").ajaxSubmit(option_submit);

});

/**
 * 创建接口文档, 即生成APIdoc记录
 * */
$('#create_doc').click(function(){
  var queryString=$('#docName').val();
  console.log(queryString);

  $.ajax({
    url: '/doc/findDocByName',
    method:"get",
    //data:"{'first':'蚂蚁部落','second':'欢迎您'}",
    //data:queryString,
    data:{
      docName: queryString,
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
  })

});
