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

/** 弹框添加用例 **/
$('#add_tc_ui').click(function () {
   $('#myModal').modal();

  if(!global_add_header_jsoneditor){
    //create the json editor: createJSONeditor
    var header_container_id='jsoneditor_header_';
    var header_editor = createJSONeditor(header_container_id, {});
    global_add_header_jsoneditor=header_editor;
  }

  if(!global_add_param_jsoneditor){
    var param_container_id='jsoneditor_queryParams_';
    var param_editor = createJSONeditor(param_container_id, {});
    global_add_param_jsoneditor=param_editor;
  }

  if(!global_add_response_jsoneditor){
    var response_container_id='jsoneditor_response_';
    var response_editor = createJSONeditor(response_container_id, {});
    global_add_response_jsoneditor=response_editor;
  }
  }
);

/** 弹框修改用例 **/
$('a[name="editTC"]').click(function () {
  var tc_uniqid=$(this).parent().attr("uniqid");
  $('#myModal2').modal();

  //添加json控件
  if(!global_update_header_jsoneditor){
    //create the json editor: createJSONeditor
    var header_container_id='update_jsoneditor_header_';
    var header_editor = createJSONeditor(header_container_id, {});
    global_update_header_jsoneditor=header_editor;
  }

  if(!global_update_param_jsoneditor){
    var param_container_id='update_jsoneditor_queryParams_';
    var param_editor = createJSONeditor(param_container_id, {});
    global_update_param_jsoneditor=param_editor;
  }

  if(!global_update_response_jsoneditor){
    var response_container_id='update_jsoneditor_response_';
    var response_editor = createJSONeditor(response_container_id, {});
    global_update_response_jsoneditor=response_editor;
  }

  $.ajax({

  })

});

/** 保存用例 **/
$('#btn_add_tc').click(function () {
  var tc_coll_uniqId=$('h1#tc_coll_name').attr("uniqid");

  var selector='#tc_template2';
  var apiItem_name=$(selector).find('input[name="tc_title"]').val();
  var apiItem_description=$(selector).find('input[name="tc_desc"]').val();
  var apiItem_url=$(selector).find('input[name="tc_url"]').val();
  var apiItem_disabled=$(selector).find('select[name="tc_disabled"] option:selected').text();
  var apiItem_dev=$(selector).find('select[name="tc_dev"] option:selected').text();
  var apiItem_method=$(selector).find('select[name="tc_method"] option:selected').text();
  var apiItem_dataType=$(selector).find('select[name="tc_dataType"] option:selected').text();

  if(!$(selector).attr("uniqid")){
    $(selector).attr("uniqid",(new Date().getTime()).toString());
  }
  var apiItem_uniqId=$(selector).attr("uniqid");

  var apiItem_header=global_update_header_jsoneditor.getText();//global_update_header_jsoneditor 为全局变量。
  var apiItem_queryParams=global_update_param_jsoneditor.getText(); //global_update_param_jsoneditor 为全局变量。
  var apiItem_response=global_update_response_jsoneditor.getText(); //global_update_response_jsoneditor 为全局变量。

  var apiItem={
    uniqID:apiItem_uniqId,
    name:apiItem_name,
    description:apiItem_description,
    url:apiItem_url,
    disabled:apiItem_disabled,
    dev:apiItem_dev,
    method:apiItem_method,
    dataType:apiItem_dataType,
    header:apiItem_header,
    queryParams: apiItem_queryParams,
    response:apiItem_response
  };

  console.log(apiItem);

  $.ajax({
    url:'/doc/save_api',
    method:"post",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: {
      doc_uniqId:tc_coll_uniqId,
      apiItem:apiItem
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

//刷新右边页面
function requestItem(data) {
  console.log(data.id);
  $.main.refreshRight("/ShowDoc/findRequestItemByID", {data: {name: data.id}});
}

//
$(document).ready(function () {
  //$('#test_select').
});

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
  console.log("wqwqwqwqwqwqwqw");
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
