/**
 * Created by lyh on 10/17/16.
 */

/** 在UI上添加 jsoneditor 控件 **/
function createJSONeditor(container_id, json) {
  //var container = document.getElementById('jsoneditor_queryParams_'+(i+1));
  var container = document.getElementById(container_id);

  var options = {
    mode: 'code',
    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
    onError: function (err) {
      alert(err.toString());
    },
    onModeChange: function (newMode, oldMode) {
      console.log('Mode switched from', oldMode, 'to', newMode);
    }
  };
  var editor_temp = new JSONEditor(container, options, json);
  editor_temp.set(json);
  return editor_temp;
};


//弹框, 添加顺序用例。
$('#add_OC_ui').click(function(){
  $('#addOrderTCModal').modal();

  if(!global_oc_add_header_jsoneditor){
    //create the json editor: createJSONeditor
    var header_container_id='jsoneditor_header_oc_1';
    var header_editor = createJSONeditor(header_container_id, {});
    global_oc_add_header_jsoneditor=header_editor;
  }

  if(!global_oc_add_param_jsoneditor){
    var param_container_id='jsoneditor_queryParams_oc_1';
    var param_editor = createJSONeditor(param_container_id, {});
    global_oc_add_param_jsoneditor=param_editor;
  }

  if(!global_oc_add_response_jsoneditor){
    var response_container_id='jsoneditor_response_oc_1';
    var response_editor = createJSONeditor(response_container_id, {});
    global_oc_add_response_jsoneditor=response_editor;
  }

  //设置header和response默认值。
  var header_value={
    "clientType": "android",
    "version": "1.0.0",
    "module": "3",
    "deviceId": "999",
    "clientIp": "192.168.0.1",
    "sessionToken": "bb93c10b-7fea-4384-bbeb-8d63e8533b54"
  };
  var response_value={
    "retcode": "0"
  };
  global_oc_add_header_jsoneditor.set(header_value);
  global_oc_add_response_jsoneditor.set(response_value);


});

//增加顺序用例。
$('#btn_add_OC').click(function(){
  //去掉遮罩层。
  $("div.modal-backdrop").remove();
  $("body.modal-open").toggleClass("modal-open");

  var caseName= $('#oc_template').find('input[name="tc_title"]').val();
  console.log(length);
  var orderCase={
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
