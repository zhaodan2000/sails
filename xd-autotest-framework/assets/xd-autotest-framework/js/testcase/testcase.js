/**
 * Created by wanglinfeg on 16/8/8.
 */
//刷新右边页面
function requestItem(data) {
  $.main.refreshRight("/ShowDoc/findRequestItemByID", {data: {id: data.id}});
}

//运行与保存
$(document).ready(function () {
  var option_run = {
    url: '/Interface/testCurrentCollection',
    success: function (data) {
      $.post("/Interface/showResponseOnView", {collection: data}, function (result) {
        $("body").html(result);
      });
      //$.main.refreshRight("/Interface/showResponseOnView?id="+data.id);
    }
  };
  var option_save = {
    url: "/Interface/saveCurrentCollection",
    success: function (data) {
      console.log('+++++++++++++++' + data);
      alert('This request had been stored into DB!')
    }
  };

  // ajaxSubmit 
  $("#runBtn").click(function () {
    console.log("ok");
    $("#form").ajaxSubmit(option_run);
  });

  $("#saveBtn").click(function () {
    console.log("ok");
    $("#form").ajaxSubmit(option_save);
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
function uploadfile() {
  var option = {
    success: function (data) {
      //$.main.refreshRight("/Interface/showResponseOnView?id="+data.id);
    }
  };

  // ajaxSubmit 
  $("#form").ajaxSubmit(option);
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

function showpath(obj) {
  var url = getPath(document.getElementById(uploadfile));

  function getPath(obj) {
    if (obj) {
      if
      (window.navigator.userAgent.indexOf("MSIE") >= 1) {
        obj.select();
        console.log(document.selection.createRange().text);
      } else if
      (window.navigator.userAgent.indexOf("Firefox") >= 1) {
        if (obj.files) {
          return console.log(obj.files.item(0).getAsDataURL());
        }
        return console.log(obj.value);
      }
      return console.log(obj.value);
    }
  }

  console.log($('input[type="file"]').val());
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
  console.log(imgURL);
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
