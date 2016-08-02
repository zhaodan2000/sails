/**
 * Created by wanglinfeg on 16/8/1.
 */
$("#save").on("click",     function() { 
  alert("wwwwwwwwwwwwwwwwwwwwwww"); 
})

// $("#save1").on("click",function () {
//   var input1 = document.createElement('input');
//   input1.setAttribute('type', 'text');
//   input1.setAttribute('name', 'organizers[]');
//   input1.setAttribute('class', 'git');
//
//   var btn1 = document.getElementById("save1");
//   btn1.insertBefore(input1,null);
// })
function add1(){
  var input1 = document.createElement('input');
  input1.setAttribute('type', 'text');
  input1.setAttribute('name', 'organizers[]');
  input1.setAttribute('class', 'git');

  var btn1 = document.getElementById("save1");
  btn1.insertBefore(input1,null);
}
