/**
 * Created by wanglinfeg on 16/8/1.
 */
$("#save").click(function(){
  alert("!23123123123123");
  $.post("/InterfaceDoc/testmyservice",
    {

    },
    function(data,status){
      alert("data: \n" + data + "\nstatus: " + status);
    }
  )
});
