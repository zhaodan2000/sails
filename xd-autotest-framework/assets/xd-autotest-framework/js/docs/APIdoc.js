 /**
   * Created by lyh on 8/8/16.
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

 /**
  * 点击左侧文档名,
  * 查看该文档的所有接口列表。
  **/
 $("button[name='getCurDoc']").click(function(){
   var apiDoc_uniqid=$(this).attr('uniqid');
   console.log(apiDoc_uniqid);
   $.ajax({
     url:'/doc/editdoc',
     method:"post",
     data:{
       uniqID:apiDoc_uniqid
     },
     success:function(data){
       $("#page-wrapper").html(data);
       global_header_jsoneditor=null;
       global_param_jsoneditor=null;
       global_response_jsoneditor=null;
       console.log("获取指定文件的所有接口成功!");
     }
   });

 });

 /**
  * 点击查看当前md文档。
  * **/
 $("button[name='viewMDfile']").click(function(){
   var apiDoc_uniqid=$(this).attr('uniqid');
   console.log(apiDoc_uniqid);
   $.ajax({
     url: '/doc/showmdfile',
     method:"post",
     contentType: 'application/x-www-form-urlencoded;charset=utf-8',
     data:{uniqid:apiDoc_uniqid},
     //data:"{'first':'蚂蚁部落','second':'欢迎您'}",
     success:function(data){
       console.log("查看md文件成功!");
       $("#page-wrapper-right").html(data);
     },
     error:function(data){
       console.log("查看md文件失败。。。");
       console.log(JSON.stringify(data.responseText,null,"\t"));
       $("#page-wrapper-right").html(data);
     }
   });

 });

 /**
  * 创建接口文档, 即生成APIdoc记录
  * */
 $('#create_doc').click(function(){
   var queryString=$('#docName').val();
   console.log(queryString);

   $.ajax({
     url: '/doc/findDocByName',
     method:"get",
     //data:"{'first':'蚂蚁部落','second':'欢迎您'}",
     //data:queryString,
     data:{
       docName: queryString,
       //a: $('#a').val(),
       //b: $('#b').val()
     },
     success:function(data){
       //返回的数据用data.d获取内容
       //alert(data.d);
       $("textarea#textarea_response").val(JSON.stringify(data,null,"\t"));
     },
     error:function(err){
       //alert(err);
       $("textarea#textarea_response").val(JSON.stringify(err,null,"\t"));
     }
   })

 });


 /** 通过弹出模态框, 来提供添加新接口的UI **/
 $("#addAPI_ui").click(function () {
   $('#myModalLabel').html('新增接口');
   $('#myModal').modal();

   if(!global_header_jsoneditor){
     //create the json editor: createJSONeditor
     var header_container_id='jsoneditor_header_';
     var header_editor = createJSONeditor(header_container_id, {});
     global_header_jsoneditor=header_editor;
   }

   if(!global_param_jsoneditor){
     var param_container_id='jsoneditor_queryParams_';
     var param_editor = createJSONeditor(param_container_id, {});
     global_param_jsoneditor=param_editor;
   }

   if(!global_response_jsoneditor){
     var response_container_id='jsoneditor_response_';
     var response_editor = createJSONeditor(response_container_id, {});
     global_response_jsoneditor=response_editor;
   }

 });

 /**
  * 删除指定的接口,前端以及后台都删除。
  * **/
 $('a[name="removeAPI"]').click(function () {
   var apiItem_uniqID=$(this).parent().attr("uniqid");
   if(!apiItem_uniqID){
     alert("uniqid is null??");
   }else if(confirm("确定从服务器删除这个接口吗?")){
     $(this).parent().parent().remove();

     $.ajax({
       url: '/doc/remove',
       method: "post",
       contentType: 'application/x-www-form-urlencoded;charset=utf-8',
       data: {
         modelType: "APIdocitem",
         uniqID: apiItem_uniqID
       },
       success: function (data) {
         console.log("后台删除成功");
       },
       error: function (data) {
         alert("后台删除失败" + JSON.stringify(data));
       }
     });
   }

 });

 /**
  * 更新指定的接口。
  * */
 $('a[name="editAPI"]').click(function(){
   $('#myModalLabel').html('修改接口');
   $('#myModal').modal();

   if(!global_header_jsoneditor){
     //create the json editor: createJSONeditor
     var header_container_id='jsoneditor_header_';
     var header_editor = createJSONeditor(header_container_id, {});
     global_header_jsoneditor=header_editor;
   }

   if(!global_param_jsoneditor){
     var param_container_id='jsoneditor_queryParams_';
     var param_editor = createJSONeditor(param_container_id, {});
     global_param_jsoneditor=param_editor;
   }

   if(!global_response_jsoneditor){
     var response_container_id='jsoneditor_response_';
     var response_editor = createJSONeditor(response_container_id, {});
     global_response_jsoneditor=response_editor;
   }

   var apiItem_uniqID=$(this).parent().attr("uniqid");
   console.log(apiItem_uniqID);
   if(!apiItem_uniqID){
     alert("uniqid is null??");
   }else{
     $.ajax({
       url: '/doc/query_api',
       method: "post",
       contentType: 'application/x-www-form-urlencoded;charset=utf-8',
       data: {
         modelType: "APIdocitem",
         uniqID: apiItem_uniqID
       },
       success: function (data) {
         console.log("succeed!");
         var selector='#api_template';
         $(selector).find('input[name="api_title"]').val(data.name);
         $(selector).find('input[name="api_desc"]').val(data.description);
         $(selector).find('input[name="api_url"]').val(data.url);
         $(selector).find('select[name="api_disabled"]').find("option[value='"+data.disabled+"']").attr("selected","selected");
         $(selector).find('select[name="api_dev"]').find("option[value='"+data.dev+"']").attr("selected","selected");
         $(selector).find('select[name="api_method"]').find("option[value='"+data.method+"']").attr("selected","selected");
         $(selector).find('select[name="api_dataType"]').find("option[value='"+data.dataType+"']").attr("selected","selected");
         $(selector).attr("uniqid", apiItem_uniqID);

         global_header_jsoneditor.set(data.header);
         global_param_jsoneditor.set(data.queryParams);
         global_response_jsoneditor.set(data.response);

       },
       error: function (data) {
         console.log("fail???");
         alert("后台查询失败" + JSON.stringify(data));
       }
     });
   }
 });

 /**
  * 保存接口到DB。
  * ***/
 $('#btn_save_api').click(function(){
   var doc_uniqId=$('h1#api_doc_name').attr("uniqid");

   var selector='#api_template';
   var apiItem_name=$(selector).find('input[name="api_title"]').val();
   var apiItem_description=$(selector).find('input[name="api_desc"]').val();
   var apiItem_url=$(selector).find('input[name="api_url"]').val();
   var apiItem_disabled=$(selector).find('select[name="api_disabled"] option:selected').text();
   var apiItem_dev=$(selector).find('select[name="api_dev"] option:selected').text();
   var apiItem_method=$(selector).find('select[name="api_method"] option:selected').text();
   var apiItem_dataType=$(selector).find('select[name="api_dataType"] option:selected').text();

   if(!$(selector).attr("uniqid")){
     $(selector).attr("uniqid",(new Date().getTime()).toString());
   }
   var apiItem_uniqId=$(selector).attr("uniqid");

   var apiItem_header=global_header_jsoneditor.getText();//global_header_jsoneditor 为全局变量。
   var apiItem_queryParams=global_param_jsoneditor.getText(); //global_param_jsoneditor 为全局变量。
   var apiItem_response=global_response_jsoneditor.getText(); //global_response_jsoneditor 为全局变量。

   var apiItem={
     uniqID:apiItem_uniqId,
     name:apiItem_name,
     description:apiItem_description,
     url:apiItem_url,
     disabled:apiItem_disabled,
     dev:apiItem_dev,
     method:apiItem_method,
     dataType:apiItem_dataType,
     header:apiItem_header,
     queryParams: apiItem_queryParams,
     response:apiItem_response
   };

   console.log(apiItem);

   $.ajax({
     url:'/doc/save_api',
     method:"post",
     contentType: 'application/x-www-form-urlencoded;charset=utf-8',
     data: {
       doc_uniqId:doc_uniqId,
       apiItem:apiItem
     },
     success: function (data) {
       alert("保存成功!");
       $("#page-wrapper").html(data);
       global_header_jsoneditor=null;
       global_param_jsoneditor=null;
       global_response_jsoneditor=null;
     },
     error:function(data){
       alert("保存失败,错误日志:"+JSON.stringify(data,null,"\t"));
     }
   });
 });

 /**
  * UI上点击增加API接口的编辑入口。
  * 已废弃。
  * */
 $('#append_api_ui').click(function(){
   var testItem=$("li#api_template").clone(true);
   var apis_count=$("ol#APIs").children('li').length;
   console.log('apis_count=%d',apis_count);
   testItem.find('input#api_title').attr("name","apiName_"+apis_count);
   testItem.find('input#api_url').attr("name","URL_"+apis_count);
   testItem.attr('id','api_'+apis_count);
   testItem.attr('style',"display:");

   //$('ol#APIs').prepend(testItem);
   $('ol#APIs').append(testItem);
   console.log("UI上添加api_item完成咯~");
 });



 /**
  * 将用户的输入存md文件中。
  * */
 $('#save_doc').click(function() {
   var file_name = document.getElementById('docName').innerHTML+'.md';
   var file_content = $('#md_filecontent').val();
   var param={'filename':file_name, 'filecontent':file_content};
   var queryString=JSON.parse(JSON.stringify(param));
   console.log(param);
   console.log("JSON.stringify(param)="+JSON.stringify(param));

   $.ajax({
     url: "/doc/savedoc",
     method:"post",
     contentType: "application/json;charset=utf-8",
     data: JSON.stringify(param),
     success: function (data) {
       $('textarea#textarea_response').val(JSON.stringify(data, null, "\t"));
     },
     error: function (data) {
       $('#textarea_response').val(JSON.stringify(err, null, "\t"));
     }
   })
 });
