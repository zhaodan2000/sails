/**
 * Created by wanglinfeg on 16/8/8.
 */
function addModel(data){
  $.post("/showDoc/findRequestItemByID",{requestId:data.id},function(result){
    $("body").html(result);
  });
  $("#test").val("12342sss134");
  $("#myModal").modal();
}
