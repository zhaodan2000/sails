/**
 * Created by wanglinfeg on 16/8/1.
 */


$(document).ready(function () {
  var option_run = { success: function(data) { 
    console.log(data); window.location.href = 'showResponse';
    }
  };
  var option_save = { success: function(data) {
       console.log(data);
    }
  };

  // ajaxSubmit 
  $("#runBtn").click(function () {
    $("#form").ajaxSubmit(option_run);
  });

    $("#saveBtn").click(function () {  
    $("#form").ajaxSubmit(option_save); 
  });
});
