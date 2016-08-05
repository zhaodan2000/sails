/**
 * Created by wanglinfeg on 16/8/1.
 */


$(document).ready(function () {
  var option_run = { success: function(data) { 
    console.log(data); window.location.href = 'showResponse';
    }
  };
  var option_save = {
    url:"/Interface/hello",
    success: function(data) {
            console.log(data);
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
