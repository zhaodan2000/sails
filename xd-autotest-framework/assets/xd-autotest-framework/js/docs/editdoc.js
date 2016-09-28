/**
 * Created by lyh on 8/25/16.
 * 说明: 脚本为views/doc/editdoc.ejs所对应的js。
 *
 */


$(document).ready(function() {
  /**
   * 更新下拉菜单
   * */
  $('select').each(function(){
    var _value=$(this).attr('text');
    $(this).find("option[value='"+_value+"']").attr("selected","selected");
  });

});

/** 加载模态框 **/
function editHost(){
  $('#myModal').modal();
};

/** 添加 jsoneditor 控件 **/
function createJSONeditor(container_id, json) {
  //var container = document.getElementById('jsoneditor_queryParams_'+(i+1));
  var container = document.getElementById(container_id);

  var options = {
    mode: 'code',
    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
    onError: function (err) {
      alert(err.toString());
    },
    onModeChange: function (newMode, oldMode) {
      console.log('Mode switched from', oldMode, 'to', newMode);
    }
  };
  var editor_temp = new JSONEditor(container, options, json);
  editor_temp.set(json);
  return editor_temp;
};

/*** 添加 header 的key-value **/
$("#header_kv_add").click(function(e){
  var length=$('ol#api_header_kv').children('li').length;
  var newKV=$('li#kv_template').clone(true);
  newKV.removeAttr('style');
  var id="header_kv_"+length;
  newKV.attr('id',id);
  $('#api_header_kv').prepend(newKV);
});

/*** 添加 params 的key-value **/
$("#params_kv_add").click(function(e){
  var length=$('ol#api_params_kv').children('li').length;
  var newKV=$('li#kv_template').clone(true);
  newKV.removeAttr('style');
  var id="params_kv_"+length;
  newKV.attr('id',id);
  $('#api_params_kv').prepend(newKV);
});


/**
 * 删除指定的接口,前端以及后台都删除。
 * **/
$('div[class="close"]').click(function(){
  var apiItem_uniqID=$(this).parent().attr("uniqid");
  console.log(apiItem_uniqID);
  if(!apiItem_uniqID){
    $(this).parent().remove();
    var index=$(this).parent().attr('id').substring(4);
    console.log(index);
    header_jsoneditors.splice(index,1);
    queryParams_jsoneditors.splice(index,1);
    response_jsoneditors.splice(index,1);

  }else if(confirm("确定从服务器删除这个接口吗?")) {
    $(this).parent().remove();
    var index=$(this).parent().attr('id').substring(4);
    console.log(index);
    header_jsoneditors.splice(index,1);
    queryParams_jsoneditors.splice(index,1);
    response_jsoneditors.splice(index,1);


    $.ajax({
      url: '/doc/remove',
      method: "post",
      contentType: 'application/x-www-form-urlencoded;charset=utf-8',
      data: {
        modelType: "APIdocitem",
        uniqID: apiItem_uniqID
      },
      success: function (data) {
        //返回的数据用data.d获取内容
        //alert(data.d);
        console.log("后台删除成功");
      },
      error: function (data) {
        alert("后台删除失败" + JSON.stringify(data));
      }
    });
  }

});

/**
 * 点击增加API接口的编辑入口。
 * */
$('#addAPIbutton').click(function(){
  /**
   $('h1#123doc')[0].innerHTML="测试1234";
   console.log($('h1#123doc')[0].innerHTML);
   **/
  var testItem=$("li#api_template").clone(true);
  //testItem.attr("uniqid",(new Date().getTime()).toString());

  var apis_count=$("ol#APIs").children('li').length;
  console.log('apis_count=%d',apis_count);
  testItem.find('input#api_title').attr("id","api_title"+apis_count);
  testItem.find('input#api_url').attr("id","api_url"+apis_count);
  testItem.find('select#api_method').attr("id","api_method_"+apis_count);
  testItem.find('select#api_disabled').attr("id","api_disabled_"+apis_count);
  testItem.find('select#api_dev').attr("id","api_dev_"+apis_count);
  testItem.find('select#api_dataType').attr("id","api_dataType_"+apis_count);
  testItem.find('input#api_header').attr("id","api_header_"+apis_count);
  testItem.find('input#api_queryParams').attr("id","api_queryParams_"+apis_count);
  testItem.find('input#api_response').attr("id","api_response_"+apis_count);
  testItem.find('div[name="jsoneditor_header_"]').attr("id","jsoneditor_header_"+apis_count);
  testItem.find('div[name="jsoneditor_queryParams_"]').attr("id","jsoneditor_queryParams_"+apis_count);
  testItem.find('div[name="jsoneditor_response_"]').attr("id","jsoneditor_response_"+apis_count);
  testItem.attr('id','api_'+apis_count);
  testItem.attr('style',"display:");

  $('ol#APIs').prepend(testItem);//在被选元素$('ol#APIs')的直接后代的开头添加。
  //$('ol#APIs').append(testItem);//在被选元素$('ol#APIs')的直接后代的末尾添加。

  //create the json editor: createJSONeditor
  var header_container_id='jsoneditor_header_'+apis_count;
  var header_editor = createJSONeditor(header_container_id, {});
  header_jsoneditors.push(header_editor);//header_jsoneditors 为全局变量。

  var param_container_id='jsoneditor_queryParams_'+apis_count;
  var param_editor = createJSONeditor(param_container_id, {});
  queryParams_jsoneditors.push(param_editor);//queryParams_jsoneditors 为全局变量。

  var response_container_id='jsoneditor_response_'+apis_count;
  var response_editor = createJSONeditor(response_container_id, {});
  response_jsoneditors.push(response_editor);//response_jsoneditors 为全局变量。

  console.log("添加api_item完成");
});

/** 保存APIdocitem */
$('#save_doc_2_db').click(function(){
  /** 构造APIdoc对象*/
  var docName=$('#api_doc_name')[0].innerHTML;
  var docDesc=$('input[name="docdesc"]').val();
  var testEnv=$('input[name="testEnv"]').val();
  var testEnvPort=$('input[name="testEnvPort"]').val();
  var doc_uniqId=$('#api_doc_name').attr("uniqid");

  var APIdoc={name:docName,docDesc:docDesc,testEnv:testEnv,testEnvPort:testEnvPort,uniqID:doc_uniqId};
  console.log(JSON.stringify(APIdoc));

  var apisDOM=$('#APIs').children('li[id!="api_template"]');
  var apiItemsArray=new Array();

  for(var i=0;i<apisDOM.length;i++){
    //$('li#api_1').find('input[name="api_title"]').val();
    var selector='li#api_'+(i+1);
    var apiItem_name=$(selector).find('input[name="api_title"]').val();
    var apiItem_url=$(selector).find('input[name="api_url"]').val();
    var apiItem_disabled=$(selector).find('select[name="api_disabled"] option:selected').text();
    var apiItem_dev=$(selector).find('select[name="api_dev"] option:selected').text();
    var apiItem_method=$(selector).find('select[name="api_method"] option:selected').text();
    var apiItem_dataType=$(selector).find('select[name="api_dataType"] option:selected').text();

    if(!$(selector).attr("uniqid")){
      $(selector).attr("uniqid",(new Date().getTime()).toString());
    }
    var apiItem_uniqId=$(selector).attr("uniqid");

    //var apiItem_header=$(selector).find('textarea[name="api_header"]').val();
    //var apiItem_response=$(selector).find('textarea[name="api_response"]').val();
    var apiItem_header=header_jsoneditors[i.toString()].getText(); //header_jsoneditors 为全局变量。
    var apiItem_queryParams=queryParams_jsoneditors[i.toString()].getText(); //queryParams_jsoneditors 为全局变量。
    var apiItem_response=response_jsoneditors[i.toString()].getText(); //response_jsoneditors 为全局变量。

    var apiItem={
      uniqID:apiItem_uniqId,
      name:apiItem_name,
      url:apiItem_url,
      disabled:apiItem_disabled,
      dev:apiItem_dev,
      method:apiItem_method,
      dataType:apiItem_dataType,
      header:apiItem_header,
      queryParams: apiItem_queryParams,
      response:apiItem_response
    };

    apiItemsArray[i]=apiItem;
  }

  $.ajax({
    url:'/doc/savedocwithItem',
    method:"post",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: {
      apiDoc: APIdoc,
      apiItems:apiItemsArray
    },
    success: function (data) {
      //返回的数据用data.d获取内容
      //alert(data.d);
      alert("保存成功!");
    },
    error:function(data){
      alert("保存失败,错误日志:"+JSON.stringify(data,null,"\t"));
    }
  });

});
