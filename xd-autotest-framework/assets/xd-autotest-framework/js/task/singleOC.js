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

  var option={
    method:'POST',
    data:{
      orderCase:orderCase
    }
  };

  $.main.refreshRight('TaskManager/updateOrderCase',option);
});

function move(t,oper){
  var data_tr=$(t).parent().parent(); //获取到触发的tr
  if(oper=="moveUp"){    //向上移动
    if($(data_tr).prev().html()==null){ //获取tr的前一个相同等级的元素是否为空
      alert("已经是最顶部了!");
      return;
    }else{
      console.log($(data_tr).attr("uniqid"));
      console.log($(data_tr).prev().attr("uniqid"));
      exchangeOrder($(data_tr).attr("uniqid"),$(data_tr).prev().attr("uniqid"));
      $(data_tr).insertBefore($(data_tr).prev()); //将本身插入到目标tr的前面
    }
  }else{
    if($(data_tr).next().html()==null){
      alert("已经是最底部了!");
      return;
    }else{
      console.log($(data_tr).attr("uniqid"));
      console.log($(data_tr).next().attr("uniqid"));
      exchangeOrder($(data_tr).attr("uniqid"),$(data_tr).next().attr("uniqid"));
      $(data_tr).insertAfter($(data_tr).next()); //将本身插入到目标tr的后面

    }
  }
};

function exchangeOrder(uniqid_1, uniqid_2){
  $.ajax({
    url:'/oc/exchangeOrder',
    method:'POST',
    data:{
      uniqid_1:uniqid_1,
      uniqid_2:uniqid_2
    },
    success:function(data){

    },
    error:function(data){

    }
  });

};

$('a[name="removeOC"]').click(function(){
  var uniqid=$(this).attr('uniqid');
  if(!uniqid){
    alert("uniqid is null??");
  }else if(confirm("确定从服务器删除这个case吗?")) {
    $(this).parent().parent().remove();
    $.ajax({
      url: '/oc/deleteOrderCase',
      method: 'POST',
      data: {uniqID: uniqid},
      success: function (data) {
        alert("删除成功");
      },
      error: function (data) {
        alert("删除失败:" + JSON.stringify(data));
      }
    });
  }
});
