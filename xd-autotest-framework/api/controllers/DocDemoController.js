/**
 * Created by lyh on 8/22/16.
 */
var fs=require('fs');

module.exports={

  testService:function (req,res) {
    res.view('doc/postmanUI');
  },

  testMD:function (req,res) {
    var Markdown = require('markdown-to-html').Markdown;
    var md = new Markdown();
    //md.bufmax = 2048;
    var filename = __dirname + '/mdFiles/test.md';
    var opts = {title: 'File $BASENAME in $DIRNAME', stylesheet: 'test/style.css'};

    // Write a header.
    console.log('===============================');
    // Write a trailer at eof.
    md.once('end', function() {
      console.log('===============================');
    });
    md.render(filename, opts, function(err) {
      if (err) {
        console.error('>>>' + err);
        process.exit();
      }
      //md.pipe(process.stdout.save());
      //md.pipe(process.browser);
      console.info("开始打印了~~~");
      res.send(md.html);

    });

  },

  /**
   * 写文件或追加文件
   * */
  handleFileWrite:function(req,res) {

    console.log("current path:" + __dirname);
    console.log(req);

    /**
     * 读取文件目录是否存在。
     * */
    var mdFiledir = __dirname + '/mdFiles';
    fs.exists(mdFiledir, function (exists) {
      /**
       * 创建目录,如果目录不存在的话。
       * */
      if (!exists) {
        fs.mkdir(mdFiledir, function (err) {
          if (!err) {
            console.log("目录已经创建成功。");
            return;
          } else {
            console.log("目录创建失败。");
            return;
          }
        });
      } else {
        console.log("目录已经存在,不需要再创建...");
      }
    });

    var filename = req.body.filename;
    var filecontent = req.body.filecontent;
    var w_data = new Buffer(filecontent);

    /**
     * filename, 必选参数，文件名
     * data, 写入的数据，可以字符或一个Buffer对象
     * [options],flag,mode(权限),encoding
     * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
     */
    /**
     fs.writeFile(filename,data,[options],callback);
     var w_data = '这是一段通过fs.writeFile函数写入的内容；\r\n';

     fs.writeFile(mdFiledir + '/test.md', w_data, {flag: 'a'}, function (err) {
      if(err) {
        console.error(err);
      } else {
        console.log('写入成功');
      }
    }); */

    // fs.appendFile(filename,data,[options],callback);

    //fs.appendFile(mdFiledir + '/'+filename, '***使用fs.appendFile追加文件内容', function () {
    fs.appendFile(mdFiledir + '/' + filename, filecontent, function () {
      console.log('追加内容完成');
    });

  }
}
