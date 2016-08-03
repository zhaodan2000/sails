/**
 * Created by wanglinfeg on 16/8/1.
 */


$(document).ready(function () {
  var options = {
    success: function (data) {
      console.log(data);
      window.location.href='showResponse';
    }
  };

  // ajaxSubmit
  $("#saveBtn").click(function () {
    $("#form").ajaxSubmit(options);
  });
});
