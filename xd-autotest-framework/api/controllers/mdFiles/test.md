# 问道接口文档
### 文档描述
分享知识平台的接口文档(1.0版本)
### 测试环境
192.168.103.101
### 端口号
8020
### 接口
1. 出题接口MAPI
	* **请求url**
		*
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ``` {
	"test": "value"
}
```
	* **请求参数queryParams(以json格式展示)**
		* ""
	* **返回结果response(以json格式展示)**
		* ""
* **JSON示例**
```
```
2. 第三方登录接口newLogin
	* **请求url**
		* /user/newLogin
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* ""
	* **返回结果response(以json格式展示)**
		* ""
* **JSON示例**
```
```
3. 首页-文章分类接口
	* **请求url**
		* /asked/categoryList
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* ""
	* **返回结果response(以json格式展示)**
		* ```
		{    "list": [        {            "categoryId": "1",            "image": "",            "outline": "",            "title": "国内"        },....           ],    "retcode": "0",    "retdesc": "操作成功",    "sign": "efff33491205fadbea4fe58c75311b4b",    "timestamp": 1471935795640}
  ```
  * **JSON示例**
```
{    "list": [        {            "categoryId": "1",            "image": "",            "outline": "",            "title": "国内"        },....           ],    "retcode": "0",    "retdesc": "操作成功",    "sign": "efff33491205fadbea4fe58c75311b4b",    "timestamp": 1471935795640}
```
4. 页面+号对应-资源发布接口
	* **请求url**
		* /asked/post
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* """"
	* **请求参数queryParams(以json格式展示)**
		* "名称类型是否为空说明titleString否资源名称contentString否资源内容videoUrlString视频的时候不为空视频的URL地址imagesString图片的时候不为空图片，以逗号分隔categoryIdString永远不为空类型为说说传-1，文章和视频传分类IDdigestInteger必须传0说说1文章 2视频coverString视频传封面图片URLcloumnIdString视频文章传专栏ID，说说传-1"
	* **返回结果response(以json格式展示)**
		* {"isError":"是否错误","errorMessage":"错误消息","errorCode":"错误代码","timestamp":"时间戳"        "resourcesId":"资源Id"}
* **JSON示例**
```
{"isError":"是否错误","errorMessage":"错误消息","errorCode":"错误代码","timestamp":"时间戳"        "resourcesId":"资源Id"}
```
5. 文章视频资源列表——根据类型
	* **请求url**
		* /asked/list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* "名称类型是否为空说明classificationIdString否资源所属类别－分类IDresourcesIdString是最后一条资源IDSizeString是每页显示个数，默认20digestString否2文章"
	* **返回结果response(以json格式展示)**
		* { "category": {    "categoryId": "1","image": "", "title": "国内"  },  "list": [    {      "address": "",      "classificationId": "1",      "classificationName": "国内",      "id": "117",      "images": [],"people ":发布人"portrait":"发布人头像",      "isPraise": "0",      "outline": "大家大哭大哭大哭休闲裤",      "praiseNumber": "0",      "repliesCount": "3",      "time": "11小时前",      "title": "想快点快点快点开学",      "type": "0",      "videoUrl": "",视频URL       "cover": "",封面URL"moneyCount":"",酬谢人数"digest":""  资源类型    }  ],  "retcode": "0",  "retdesc": "操作成功",  "timestamp": 1441769967570,  }
* **JSON示例**
```{ "category": {    "categoryId": "1","image": "", "title": "国内"  },  "list": [    {      "address": "",      "classificationId": "1",      "classificationName": "国内",      "id": "117",      "images": [],"people ":发布人"portrait":"发布人头像",      "isPraise": "0",      "outline": "大家大哭大哭大哭休闲裤",      "praiseNumber": "0",      "repliesCount": "3",      "time": "11小时前",      "title": "想快点快点快点开学",      "type": "0",      "videoUrl": "",视频URL       "cover": "",封面URL"moneyCount":"",酬谢人数"digest":""  资源类型    }  ],  "retcode": "0",  "retdesc": "操作成功",  "timestamp": 1441769967570,  }
```
6. 发布评论
	* **请求url**
		* /asked/replyPost
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* "名称类型是否为空说明resourcesIdString否资源IDcategoryIdString否资源类别idcontentString否目标评论内容"
	* **返回结果response(以json格式展示)**
		* {
    "errorCode": 0,
    "errorMessage": "成功",
    "timestamp": 1428326863138
}
* **JSON示例**
```{"errorCode":0,"errorMessage":"成功","timestamp":1428326863138}
```
7. 回复评论
	* **请求url**
		* /asked/replyComment
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* "名称类型是否为空说明resourcesIdString否资源IDcategoryIdString否资源类别idcommentContentString否目标评论内容commentIdString否目标评论id"
	* **返回结果response(以json格式展示)**
		* {    "errorCode": 0,    "errorMessage": "成功",    "isError": "false","timestamp": 1428326863138"resourcesId":"资源ID"}
* **JSON示例**
```{    "errorCode": 0,    "errorMessage": "成功",    "isError": "false","timestamp": 1428326863138"resourcesId":"资源ID"}
```
8. 回复评论
	* **请求url**
		* /asked/replyComment
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* "名称类型是否为空说明resourcesIdString否资源IDcategoryIdString否资源类别idcommentContentString否目标评论内容commentIdString否目标评论id"
	* **返回结果response(以json格式展示)**
		* {    "errorCode": 0,    "errorMessage": "成功",    "isError": "false","timestamp": 1428326863138"resourcesId":"资源ID"}
* **JSON示例**
```{    "errorCode": 0,    "errorMessage": "成功",    "isError": "false","timestamp": 1428326863138"resourcesId":"资源ID"}
```
9. 资源详情展示-说说文章视频
	* **请求url**
		* /asked/detailforum
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* ""resourcesId"：String 资源ID"
	* **返回结果response(以json格式展示)**
		* {"isError":"是否错误","errorMessage":"错误消息","errorCode":"错误代码","timestamp":"时间戳","resources":{"people":"发布人","portrait":"发布人头像","title":"资源标题","outline":"资源简介","content":"资源内容","images":[…],"type":"资源属性","time":"发布时间","classificationId":"资源分类",   "classificationName": "资源分类名称","repliesCount":"评论数"   "videoUrl":视频URL, "cover":封面URL,"moneyCount":""}}
* **JSON示例**
```{"isError":"是否错误","errorMessage":"错误消息","errorCode":"错误代码","timestamp":"时间戳","resources":{"people":"发布人","portrait":"发布人头像","title":"资源标题","outline":"资源简介","content":"资源内容","images":[…],"type":"资源属性","time":"发布时间","classificationId":"资源分类",   "classificationName": "资源分类名称","repliesCount":"评论数"   "videoUrl":视频URL, "cover":封面URL,"moneyCount":""}}
```
10. 资源详情-评论列表
	* **请求url**
		* /asked/detailcomment
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* {"resourcesId"：String否资源ID，"commentId"：String是获取下一页评论传上一页最后的评论id，"size"：String是每页数量}
	* **返回结果response(以json格式展示)**
		* """{\    \\"errorCode\\": 0,\    \\"errorMessage\\": \\"成功\\",\    \\"isError\\": \\"false\\",\\\"timestamp\\": 1428326863138,\"size":"返回评论数量",\"hotSize":"返回热门评论个数",\"list":[\\{ \          "commentId":"52",//评论id\          "content":"我认为你说的很有道理",//评论内容\          \\"resourcesId\\": \\"1\\",//资源id\      \\"isPraise\\": false,//是否点赞\      "nickName":"",//用户昵称\      \\"people\\": \\"wangwu\\",//评论人\      \\"portrait\\": \\"www.51xiaodou.com/images/wangwu.jpg\\",//评论人头像\      \\"targeContent\\": \\"王五评论了李四的评论\\",//目标评论内容\      \\"targeId\\": \\"1\\",//目标评论id\      \\"time\\": \\"6天前\\"//评论时间\},\……….\]\""
* **JSON示例**
```"{\    \\"errorCode\\": 0,\    \\"errorMessage\\": \\"成功\\",\    \\"isError\\": \\"false\\",\\\"timestamp\\": 1428326863138,\"size":"返回评论数量",\"hotSize":"返回热门评论个数",\"list":[\\{ \          "commentId":"52",//评论id\          "content":"我认为你说的很有道理",//评论内容\          \\"resourcesId\\": \\"1\\",//资源id\      \\"isPraise\\": false,//是否点赞\      "nickName":"",//用户昵称\      \\"people\\": \\"wangwu\\",//评论人\      \\"portrait\\": \\"www.51xiaodou.com/images/wangwu.jpg\\",//评论人头像\      \\"targeContent\\": \\"王五评论了李四的评论\\",//目标评论内容\      \\"targeId\\": \\"1\\",//目标评论id\      \\"time\\": \\"6天前\\"//评论时间\},\……….\]\""
```
11. 登录
	* **请求url**
		* /mapi2c/login
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 李德洪
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* {
	"phoneNum": "1234"
}
	* **请求参数queryParams(以json格式展示)**
		* {
	"phoneNum": "123",
	"nickName": "aaa"
}
	* **返回结果response(以json格式展示)**
		* {
    "recode": "0",
    "message": "success"
}
* **JSON示例**
```{"recode":"0","message":"success"}
```
12. 点赞接口
	* **请求url**
		* /asked/praise
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* {"resourcesId"：String否资源Id，"commentId"：String是评论Id}
	* **返回结果response(以json格式展示)**
		* {
    "errorCode": 0,
    "errorMessage": "成功",
    "isError": "false",
    "timestamp": 1428326863138
}
* **JSON示例**
```{"errorCode":0,"errorMessage":"成功","isError":"false","timestamp":1428326863138}
```
13. 推荐列表
	* **请求url**
		* /asked/recommend
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* ""
	* **返回结果response(以json格式展示)**
		* ""
* **JSON示例**
```
```
14. 点赞接口
	* **请求url**
		* /asked/praise
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* {"resourcesId"：String否资源Id，"commentId"：String是评论Id}
	* **返回结果response(以json格式展示)**
		* {
    "errorCode": 0,
    "errorMessage": "成功",
    "isError": "false",
    "timestamp": 1428326863138
}
* **JSON示例**
```{"errorCode":0,"errorMessage":"成功","isError":"false","timestamp":1428326863138}
```
15. 关注接口
	* **请求url**
		* /asked/attention
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* ""
	* **返回结果response(以json格式展示)**
		* ""
* **JSON示例**
```
```
16. 轮播图
	* **请求url**
		* /asked/chart
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* ""
	* **返回结果response(以json格式展示)**
		* {   "image": ""  url逗号分隔}
* **JSON示例**
```{   "image": ""  url逗号分隔}
```
17. 文章搜索功能
	* **请求url**
		* /asked/search
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* { "name":"搜索的内容"}
	* **返回结果response(以json格式展示)**
		* {  "list": [    {      "address": "",      "age": "0",      "classificationId": "资源ID",      "classificationName": "资源分类类型",      "id": "117",      "images": [],      "isPraise": "0",      "outline": "大家大哭大哭大哭休闲裤",      "people": "我们对面分基",      "portrait": "",      "praiseNumber": "0",      "repliesCount": "3",      "time": "11小时前",      "title": "想快点快点快点开学",      "type": "0",      "videoUrl": "",       "cover": "","money":"","digest":""    }  ],  "retcode": "0",  "retdesc": "操作成功",  "timestamp": 1441769967570,}
* **JSON示例**
```{  "list": [    {      "address": "",      "age": "0",      "classificationId": "资源ID",      "classificationName": "资源分类类型",      "id": "117",      "images": [],      "isPraise": "0",      "outline": "大家大哭大哭大哭休闲裤",      "people": "我们对面分基",      "portrait": "",      "praiseNumber": "0",      "repliesCount": "3",      "time": "11小时前",      "title": "想快点快点快点开学",      "type": "0",      "videoUrl": "",       "cover": "","money":"","digest":""    }  ],  "retcode": "0",  "retdesc": "操作成功",  "timestamp": 1441769967570,}
```
18. 与我相关的评论
	* **请求url**
		* /asked/myRelateComments
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 周欢
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* {"idUpper"："String是最后一条评论ID"，"size"："String否每页显示个数"}
	* **返回结果response(以json格式展示)**
		* {    "errorCode": 0,    "errorMessage": "成功",    "isError": "false",    "list": [        {            "content": "让我们红尘做伴活得潇潇洒洒",//原评论内容            "resourceId": "17",//话题id            "cid": "66",//评论id            "publisherNickName": "幼儿",//评论者昵称"publisherPortrait":"http://7xigj3.com1.z0.glb.clouddn.com/35CC1D16-8FD6-4374-A37C-7A15D0BE4743",//评论者头像            "type":"1",//1 评论 2 点赞            "targeContent": "幼儿回复了我的评论: 怎么没有我的签名？",//目标评论内容 1 回复我的评论(话题) 2 赞了我的评论(话题)            "targeId": "289",//目标评论id            "time": "28秒前",//时间            "title": "毕业旅行  Are you ready?"//话题标题 "status":"1" //状态 1 未读 2 已读"praiseNumber":"9"//点赞数"categoryId":"1"//话题分类id"categoryName":"咿呀逗乐"//话题分类        }         ],    "sign": "099872f657166deaaa7e370fd5dd3524",    "timestamp": 1435055179691}
* **JSON示例**
```{    "errorCode": 0,    "errorMessage": "成功",    "isError": "false",    "list": [        {            "content": "让我们红尘做伴活得潇潇洒洒",//原评论内容            "resourceId": "17",//话题id            "cid": "66",//评论id            "publisherNickName": "幼儿",//评论者昵称"publisherPortrait":"http://7xigj3.com1.z0.glb.clouddn.com/35CC1D16-8FD6-4374-A37C-7A15D0BE4743",//评论者头像            "type":"1",//1 评论 2 点赞            "targeContent": "幼儿回复了我的评论: 怎么没有我的签名？",//目标评论内容 1 回复我的评论(话题) 2 赞了我的评论(话题)            "targeId": "289",//目标评论id            "time": "28秒前",//时间            "title": "毕业旅行  Are you ready?"//话题标题 "status":"1" //状态 1 未读 2 已读"praiseNumber":"9"//点赞数"categoryId":"1"//话题分类id"categoryName":"咿呀逗乐"//话题分类        }         ],    "sign": "099872f657166deaaa7e370fd5dd3524",    "timestamp": 1435055179691}
```
19. 删除自己发布的资源
	* **请求url**
		* /asked/deleteById
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* ""
	* **请求参数queryParams(以json格式展示)**
		* {    "resourcesId"："String"}
	* **返回结果response(以json格式展示)**
		* {
    "errorCode": 0,
    "errorMessage": "成功",
    "isError": "false",
    "timestamp": 1428326863138
}
* **JSON示例**
```{"errorCode":0,"errorMessage":"成功","isError":"false","timestamp":1428326863138}
```
20. 直播列表接口
	* **请求url**
		* /live/list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
21. 直播列表接口
	* **请求url**
		* /live/list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
22. 直播－系列直播（列表／分页）
	* **请求url**
		* /live/serie_list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {liveList:[ //直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{liveList:[ //直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
23. 直播列表接口
	* **请求url**
		* /live/list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
24. 直播－系列直播（列表／分页）
	* **请求url**
		* /live/serie_list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {liveList:[ //直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{liveList:[ //直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
25. 直播列表接口
	* **请求url**
		* /live/list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
26. 直播－系列直播（列表／分页）
	* **请求url**
		* /live/serie_list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {liveList:[ //直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{liveList:[ //直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
27. 直播列表接口
	* **请求url**
		* /live/list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{seriesList:[ //系列直播列表{liveSerieId: "直播系列ID",liveSerieTitle: "直播系列标题",liveSerieCover: "直播系列封面",liveSerieTimeQuantum: "直播系列时间段",liveSerieDuration: "直播系列时长",liveSerieEnrollments: "直播系列报名人数",liveSerieSurplus: "直播系列剩余名额",liveSerieChargeType: "直播系列收费类型 1 收费 0 免费",liveSerieCharge: "系列报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...],recommendList:[ //推荐直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
28. 直播详情
	* **请求url**
		* /live/live_detail
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {liveId: "直播ID"}
	* **返回结果response(以json格式展示)**
		* {liveId: "直播ID",liveUrl: "直播地址",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveTotalQuotas: "直播总名额",liveEnrollments: "直播报名人数",liveIntroduction: "直播内容介绍",liveSurplus: "直播剩余名额",liveCharge: "报名费用",liveComments: { //直播评论列表{nickName: "用户名",portrait: "用户头像",comment: "用户评论"},...}tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}}
* **JSON示例**
```{liveId: "直播ID",liveUrl: "直播地址",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveTotalQuotas: "直播总名额",liveEnrollments: "直播报名人数",liveIntroduction: "直播内容介绍",liveSurplus: "直播剩余名额",liveCharge: "报名费用",liveComments: { //直播评论列表{nickName: "用户名",portrait: "用户头像",comment: "用户评论"},...}tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}}
```
29. 直播－推荐直播（列表／分页）
	* **请求url**
		* /live/recommend_list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {liveList:[ //直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{liveList:[ //直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
30. 直播－推荐直播（列表／分页）
	* **请求url**
		* /live/recommend_list
	* **请求方式method**
		* POST
	* **接口是否废弃**
		* false
	* **开发者**
		* 赵聃
	* **请求格式content-type**
		* application/json
	* **请求头header**
		* "默认header"
	* **请求参数queryParams(以json格式展示)**
		* {pageNo: "当前页码"}
	* **返回结果response(以json格式展示)**
		* {liveList:[ //直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
* **JSON示例**
```{liveList:[ //直播列表{liveId: "直播ID",liveTitle: "直播标题",liveCover: "直播封面",liveTime: "直播时间",liveDuration: "直播时长",liveEnrollments: "直播报名人数",liveSurplus: "直播剩余名额",liveChargeType: "直播收费类型 1 收费 0 免费",liveCharge: "报名费用",tags: [ //直播标签组{tagId: "标签ID",tagName: "标签名"},...],liveOwnerInfo: { //主讲人信息nickName: "主讲人",portrait: "主讲人头像",introduction: "主讲人介绍"}},...]}
```
