/**
 * Created by wanglinfeg on 16/8/8.
 */

/** 在UI上添加 jsoneditor 控件 **/
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

//弹框添加集合UI。
$('#append_tc_coll_ui').click(function () {
  $('#myModalForCollect').modal();

  //select 扩充子节点的方式一
  // var selector='#select_tc_coll_docName';
  // $(selector).append('<option value="" uniqid="">'+'默认'+'</option>');

  //select 扩充子节点的方式二
  var selectElement=document.getElementById('select_tc_coll_docName');
  selectElement.innerHTML='<option value="" uniqid="">'+'默认'+'</option>';

  $.ajax({
    url:'/base/query',
    method:"post",
    data:{
      modelType:'APIdoc',
      uniqID:null
    },
    success:function (data) {
      for(var i=0;i<data.length;i++){
        //data.forEach(function(item,index){
        var objOption = document.createElement("option");
        objOption.value= data[i.toString()].uniqID;
        objOption.text=data[i.toString()].name;
        selectElement.options.add(objOption);
      }
    },
    error:function (data) {

    }
  });
});

//添加用例集合到mongodb中。
$('#add_tc_coll_2db').click(function () {
  var selector='#tc_coll_template';
  var name=$(selector).find("input[name='tc_coll_name']").val();
  var testEnv=$(selector).find('input[name="tc_coll_testEnv"]').val();
  var testEnvPort=$(selector).find('input[name="tc_coll_testEnvPort"]').val();
  var docUniqID=$(selector).find('select[name="tc_docName"] option:selected').val();
  var docName=$(selector).find('select[name="tc_docName"] option:selected').text();

  var tc_coll={
    name:name,
    testEnv:testEnv,
    testEnvPort:testEnvPort,
    uniqID:(new Date().getTime()).toString(),
    docUniqID:docUniqID,
    docName:docName
  };

  $.ajax({
    url:'/case/save_tc_collection',
    method:'post',
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data:{
      reqFolder:tc_coll
    },
    success:function(data){
      alert("保存成功!");
      //$('#wrapper').html(data);
      $("#page-wrapper").html(data);

    },
    error:function (data) {
      alert("保存失败!"+JSON.stringify(data,null,"\t"));
    }
  });

});

/** 弹框添加用例 **/
$('#add_tc_ui').click(function () {
   $('#myModal').modal();

  if(!global_case_add_header_jsoneditor){
    //create the json editor: createJSONeditor
    var header_container_id='jsoneditor_header_';
    var header_editor = createJSONeditor(header_container_id, {});
    global_case_add_header_jsoneditor=header_editor;
  }

  if(!global_case_add_param_jsoneditor){
    var param_container_id='jsoneditor_queryParams_';
    var param_editor = createJSONeditor(param_container_id, {});
    global_case_add_param_jsoneditor=param_editor;
  }

  if(!global_case_add_response_jsoneditor){
    var response_container_id='jsoneditor_response_';
    var response_editor = createJSONeditor(response_container_id, {});
    global_case_add_response_jsoneditor=response_editor;
  }

  var docUniqID=$('#tc_coll_doc').attr('uniqid');

  var selectElement=document.getElementById('select_tc_coll_apiName');
  selectElement.innerHTML='<option value="" uniqid="">'+'默认'+'</option>';

  $.ajax({
    url:'/base/query',
    method:"post",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: {
      modelType:"APIdoc",
      uniqID:docUniqID
    },
    success: function (data) {
      console.log("弹框添加用例:");
      console.log(data);
      global_doc_apis=data.APIdoc_items;
      for(var i=0;i<data.APIdoc_items.length;i++){
        var objOption = document.createElement("option");
        objOption.value= data.APIdoc_items[i.toString()].uniqID;
        objOption.text=data.APIdoc_items[i.toString()].name;
        selectElement.options.add(objOption);
      }

    },
    error:function(data){

    }
  });
});

/** 弹框修改用例 **/
$('a[name="editTC"]').click(function () {
  var tc_uniqid=$(this).parent().attr("uniqid");
  $('#myModal2').modal();

  //添加json控件
  if(!global_case_update_header_jsoneditor){
    //create the json editor: createJSONeditor
    var header_container_id='update_jsoneditor_header_';
    var header_editor = createJSONeditor(header_container_id, {});
    global_case_update_header_jsoneditor=header_editor;
  }

  if(!global_case_update_param_jsoneditor){
    var param_container_id='update_jsoneditor_queryParams_';
    var param_editor = createJSONeditor(param_container_id, {});
    global_case_update_param_jsoneditor=param_editor;
  }

  if(!global_case_update_response_jsoneditor){
    var response_container_id='update_jsoneditor_response_';
    var response_editor = createJSONeditor(response_container_id, {});
    global_case_update_response_jsoneditor=response_editor;
  }

  $.ajax({

  })

});

/** 保存用例 **/
$('#btn_add_tc').click(function () {
  var tc_coll_uniqId=$('h1#tc_coll_name').attr("uniqid");

  var selector='#tc_template2';
  var caseItem_name=$(selector).find('input[name="tc_title"]').val();
  var caseItem_description=$(selector).find('input[name="tc_desc"]').val();
  var caseItem_url=$(selector).find('input[name="tc_url"]').val();
  var caseItem_disabled=$(selector).find('select[name="tc_disabled"] option:selected').text();
  var caseItem_dev=$(selector).find('select[name="tc_dev"] option:selected').text();
  var caseItem_method=$(selector).find('select[name="tc_method"] option:selected').text();
  var caseItem_dataType=$(selector).find('select[name="tc_dataType"] option:selected').text();

  if(!$(selector).attr("uniqid")){
    $(selector).attr("uniqid",(new Date().getTime()).toString());
  }
  var caseItem_uniqId=$(selector).attr("uniqid");

  var caseItem_header=global_case_update_header_jsoneditor.getText();//global_case_update_header_jsoneditor 为全局变量。
  var caseItem_queryParams=global_case_update_param_jsoneditor.getText(); //global_case_update_param_jsoneditor 为全局变量。
  var caseItem_response=global_case_update_response_jsoneditor.getText(); //global_case_update_response_jsoneditor 为全局变量。

  var caseItem={
    uniqID:caseItem_uniqId,
    name:caseItem_name,
    description:caseItem_description,
    url:caseItem_url,
    disabled:caseItem_disabled,
    dev:caseItem_dev,
    method:caseItem_method,
    dataType:caseItem_dataType,
    header:caseItem_header,
    queryParams: caseItem_queryParams,
    response:caseItem_response
  };

  console.log(caseItem);

  $.ajax({
    url:'/case/save_case',
    method:"post",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: {
      tc_coll_uniqId:tc_coll_uniqId,
      caseItem:caseItem
    },
    success: function (data) {
      alert("保存成功!");
      $("#page-wrapper").html(data);
    },
    error:function(data){
      alert("保存失败,错误日志:"+JSON.stringify(data,null,"\t"));
    }
  });

});

/** 删除用例集合 **/
$('#del_all_tc_coll').click(function () {
  $.ajax({
    url:'/doc/remove',
    method:'post',
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data:{
      modelType:"ReqFolder",
      uniqID:null
    },
    success:function(data){
      alert("删除成功!");
    },
    error:function (data) {
      alert("删除失败!"+JSON.stringify(data,null,"\t"));
    }

  })
});

$('#populate_case').click(function(){
  var selectIndex=document.getElementById("select_tc_coll_apiName").selectedIndex-1 ;
  console.log(global_doc_apis[selectIndex.toString()].url);
  console.log(global_doc_apis[selectIndex.toString()]["url"]);
  var selector='#tc_template';
  $(selector).find('input[name="tc_title"]').val(global_doc_apis[selectIndex.toString()].name);
  $(selector).find('input[name="tc_desc"]').val(global_doc_apis[selectIndex.toString()].description);
  $(selector).find('input[name="tc_url"]').val(global_doc_apis[selectIndex.toString()].url);
  $(selector).find('select[name="tc_dataType"]').find("option[value='"+global_doc_apis[selectIndex.toString()].dataType+"']").attr("selected","selected");
  $(selector).find('select[name="tc_disabled"]').find("option[value='"+global_doc_apis[selectIndex.toString()].disabled+"']").attr("selected","selected");
  $(selector).find('select[name="tc_dev"]').find("option[value='"+global_doc_apis[selectIndex.toString()].dev+"']").attr("selected","selected");

  global_case_add_header_jsoneditor.set(global_doc_apis[selectIndex.toString()].header);
  global_case_add_param_jsoneditor.set(global_doc_apis[selectIndex.toString()].queryParams);
  global_case_add_response_jsoneditor.set(global_doc_apis[selectIndex.toString()].response);

});

//刷新右边页面
function requestItem(data) {
  console.log(data.id);
  $.main.refreshRight("/ShowDoc/findRequestItemByID", {data: {name: data.id}});
}

//运行与保存
$(document).ready(function () {
  var option_run = {
    url: '/Interface/testCurrentCollection',
    success: function (data) {
      $.post("/Interface/showResponseOnView", {collection: data}, function (result) {
        $("body").html(result);
      });
      $.main.refreshRight("/Interface/showResponseOnView?id="+data.id);
    }
  };
  var option_save = {
    url: "/Interface/saveCurrentCollection",
    success: function (data) {
      console.log('+++++++++++++++' + data);
      alert('This request had been stored into DB!')
    }
  };
  var option_submit = {
    success:function (data) {
      $.main.refreshMain("/Home/testcase");
    }
  };

  var option_submitForCollect = {
    success:function (data) {
      $.main.refreshMain("/Home/testcase");
    }
  };

  // ajaxSubmit 
  //运行事件
  $("#runBtn").click(function () {
    $("#form").ajaxSubmit(option_run);
  });

  //保存事件
  $("#saveBtn").click(function () {
    $("#form").ajaxSubmit(option_save);
  });

  //提交增加的用例
  $("#submitBtn").click(function () {
    $('#myModal').modal('hide');
    $(".modal-backdrop").hide();
    $("#formModel").ajaxSubmit(option_submit);
  });

  //增加用例集合
  $("#submitcollect").click(function () {
    $('#myModal').modal('hide');
    $(".modal-backdrop").hide();
    $("#formModelForCollect").ajaxSubmit(option_submitForCollect);
  });
});

//搜索用例
function onKeyDown(data) {
  var v = document.getElementById("search-input").value;
  console.log(data);
  data.forEach(function (record, index) {
    $("[data-target=#info0]").css("display", "none");
  });
  // var e = event || window.event || arguments.callee.caller.arguments[0];
  // if (e){
  //   if (e.keyCode == 13){
  //     // enter 键
  //   }else {
  //     //请求后台服务
  //     $("[data-target=#info0]").css("display","none");
  //   }
  // }
}

//文件的形式导入用例
function upfile() {
  var option = {
    contentType: "text/xml",
    keepAlive:"YES",
    success: function (data) {
      //$.main.refreshRight("/Interface/showResponseOnView?id="+data.id);
    }
  };

  // ajaxSubmit 
  $("#fileForm").ajaxSubmit(option);
}

function getImgURL(node) {
  var imgURL = "";
  var file = null;
  if (node.files && node.files[0]) {
    file = node.files[0];
  } else if (node.files && node.files.item(0)) {
    file = node.files.item(0);
  }

  //这种获取方式支持IE10
  node.select();
  imgURL = document.selection.createRange().text;
  alert(imgURL);


  var textHtml = "<img src='" + imgURL + "'/>";     //创建img标签用于显示图片
  alert(textHtml);
  $(".mark").after(textHtml);
  return imgURL;
}

function addFile(serverId) {
  $('#serverIdB').val(serverId);
  $.post("/server/getFile", {serverId: serverId},
    function (data) {
      var u = JSON.parse(data);
      var fileArray = u.fileList;
      var s = "";
      $("#fileTable tr").empty();
      for (var i = 0; i < fileArray.length; i++) {
        var row = "<tr><td>" + fileArray[i].name + "</td><td>" + fileArray[i].time + "</td></tr>";
        $("#fileTable tr:last").after(row);
      }
      $('#addFile').modal();
    });

}
