function report(log_id){
  $.ajax({
    url:'/log/getLogById',
    method:"post",
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: {
      log_id: log_id
    },
    success: function (data) {
      $("#page-wrapper").html(data);
    },
    error:function(data){
      alert("操作失败,错误日志:"+JSON.stringify(data,null,"\t"));
    }
  });
}
