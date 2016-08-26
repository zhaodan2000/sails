/**
 * Created by xiaodou_chenxiaoxiang on 16/8/12.
 */

/**
 * 删除所有用例
 */
function deleteAllCases(data) {
  console.log(data.taskId);
  $.post("/TaskManager/deleteAllCase", {Task_ID:data.taskId}, function (result) {

    //删除页面上所有的case
    alert("删除成功")
  }, "json");
}


function selectedCaseWithName(caseName) {
  $.post("/TaskManager/addCaseToTask", {casename:caseName}, function (result) {
    //获得搜索结果后展示
  })
}

function addCaseToTask(item) {
  console.log('-----'+JSON.stringify(item, null, 4));
  $.post("/TaskManager/addCaseToTask", {item:item}, function (result) {
    //根据result判断是否更新成功
    // alert("sucess");
    // console.log('------'+JSON.stringify(result, null, 4));
    // console.log("sucess");
    //向div中添加一条list

    var $newcase = $('<a href="#" class="list-group-item"></a>');
    $newcase.attr({"name":result.id});
    $newcase.text(result.name);

    var $deletespan = $('<span class="badge btn btn-danger" onclick="deleteCaseWithName(this)">delete</span>');
    $deletespan.attr({"name":result.name});

    var $newi = $('<i class="fa fa-fw fa-check"></i>');
    $newcase.append($deletespan, $newi);
    $("div#caseList").append($newcase);
  }, "json");
}

function downClicked(data) {

}

function upClicked() {

}

function deleteCaseWithName(data) {
  //移除父节点
  console.log(data);
  console.log(data.uniqID);
  data.node.parentNode.remove();
  // console.log(data.taskId);
  $.post("/TaskManager/deleteSingleCase", {uniqID:data.uniqID}, function (result) {
    //删除页面上所有的case
    alert("删除成功")
  }, "json");


  // console.log(JSON.stringify(data, null, 4));
  // console.log('-----'+data.caseName);
  // console.log(data.tasId);
  // var spanArr =  $("div#caseList").find("a");
  // console.log(spanArr);
  // for (i = 0; i < spanArr.length; i++){
  //   // if (options[i].nodeName.toLowerCase() === 'option'){
  //     var option = spanArr[i];
  //     console.log('2222'+option);
  //     if(option.name === data.caseName){
  //       console.log(option.name);
  //       option.remove();
  //     }
  //   // }
  // }

}
