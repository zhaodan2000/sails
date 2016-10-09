/**
 * 保存新增的接口到DB。
 * ***/
$('#saveBtn').click(function(){
  console.log("12312");
  var sc_id=(new Date().getTime()).toString();
  var sc_name=$("#sc_name").val();
  var sc_desc=$("#sc_desc").val();
  var sc_type=$("#sc_type").val();
  var sc_task_id=$("#sc_task").val();
  var sc_task_name=$("#sc_task option:selected").text();
  var sc_host=$("#sc_host").val();
  var sc_time=$("#sc_time").val();
  var sc_state=$("#sc_state").val();
  $.ajax({
    url:'/sc/save',
    method:"post",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: {
      sc_id: sc_id,
      sc_name: sc_name,
      sc_desc: sc_desc,
      sc_type: sc_type,
      sc_task_id: sc_task_id,
      sc_task_name: sc_task_name,
      sc_host: sc_host,
      sc_time: sc_time,
      sc_state:sc_state
    },
    success: function (data) {
      alert("保存成功!");
      location.reload();
    },
    error:function(data){
      alert("保存失败,错误日志:"+JSON.stringify(data,null,"\t"));
    }
  });
});
/**
 * 删除指定的接口,前端以及后台都删除。
 * **/
/*$('a[name="removeSc"]').click(function () {
  var sc_id=$(this).parent().attr("uniqid");
  if(!sc_id){
    alert("sc_id is null??");
  }else if(confirm("确定删除吗?")){
    $(this).parent().parent().remove();
    $.post("/sc/remove", {sc_id:sc_id}, function (result) {
      alert("删除成功")
    }, "json");
  }
});*/

function remove(sc_id){
  if(!sc_id){
    alert("sc_id is null??");
  }else if(confirm("确定删除吗?")){
    $(this).parent().parent().remove();
    $.post("/sc/remove", {sc_id:sc_id}, function (result) {
      alert("删除成功")
    }, "json");
  }
}
function edit(sc_id,sc_name,sc_desc,sc_type,sc_task_id,sc_host,sc_time,sc_state){
  $("#sc_id_e").val(sc_id);
  $("#sc_name_e").val(sc_name);
  $("#sc_desc_e").val(sc_desc);
  $("#sc_type_e").val(sc_type);
  $("#sc_task_e").val(sc_task_id);
  $("#sc_host_e").val(sc_host);
  $("#sc_time_e").val(sc_time);
  $("#sc_state_e").val(sc_state);
  $('#myModal2').modal();
}
function saveEdit(){
  console.log("12312");
  var sc_id=$("#sc_id_e").val();
  var sc_name=$("#sc_name_e").val();
  var sc_desc=$("#sc_desc_e").val();
  var sc_type=$("#sc_type_e").val();
  var sc_task_id=$("#sc_task_e").val();
  var sc_task_name=$("#sc_task_e option:selected").text();
  var sc_host=$("#sc_host_e").val();
  var sc_time=$("#sc_time_e").val();
  var sc_state=$("#sc_state_e").val();
  $.ajax({
    url:'/sc/edit',
    method:"post",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: {
      sc_id: sc_id,
      sc_name: sc_name,
      sc_desc: sc_desc,
      sc_type: sc_type,
      sc_task_id: sc_task_id,
      sc_task_name: sc_task_name,
      sc_host: sc_host,
      sc_time: sc_time,
      sc_state:sc_state
    },
    success: function (data) {
      alert("修改成功!");
      location.reload();
    },
    error:function(data){
      alert("修改失败,错误日志:"+JSON.stringify(data,null,"\t"));
    }
  });
}

