/**
 * Created by lyh on 10/17/16.
 */

//弹框, 添加顺序用例。
$('#add_OC_ui').click(function(){
  $('#addOrderTCModal').modal();
});

//增加顺序用例。
$('#btn_add_OC').click(function(){
  //去掉遮罩层。
  $("div.modal-backdrop").remove();
  $("body.modal-open").toggleClass("modal-open");

  var caseName= $('#oc_template').find('input[name="tc_title"]').val();
  var length=$('tbody').children.length+1;
  console.log(length);
  var orderCase={
    sequence:length,
    name:caseName,
    uniqID:(new Date().getTime()).toString()
  }

  var taskFolder_uniqid=$('h1').attr('uniqid');
  var option={
    method:'POST',
    data:{
      taskFolder_uniqid:taskFolder_uniqid,
      orderCase:orderCase
    }
  };

  $.main.refreshRight('TaskManager/addOrderCase',option);
});

//更新顺序用例。
$('#btn_update_OC').click(function(){


  var caseName= $('#oc_template').find('input[name="tc_title"]').val();
  console.log(length);
  var orderCase={
    name:caseName,
    uniqID:$('oc_template2').attr('uniqid')
  };

  var taskFolder_uniqid=$('h1').attr('uniqid');
  var option={
    method:'POST',
    data:{
      taskFolder_uniqid:taskFolder_uniqid,
      orderCase:orderCase
    }
  };

  $.main.refreshRight('TaskManager/updateOrderCase',option);
});
