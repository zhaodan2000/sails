/**
 * Created by wanglinfeg on 16/8/1.
 */


$(document).ready(function () {
  var option_run = { 
    url:'/Interface/testCurrentCollection',
    success: function(data) {
      $.post("/Interface/showResponseOnView",{collection:data},function(result){
        $("body").html(result);
      });
      //$.main.refreshRight("/Interface/showResponseOnView?id="+data.id);
    }
  };
  var option_save = {
    url:"/Interface/saveCurrentCollection",
    success: function(data) { console.log('+++++++++++++++'+data); alert('This request had been stored into DB!')}
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
