const express = require("express");
const app = express();
const path = require("path");
const PORT = "8080";
app.use(express.static("./public"));
// view engine setup
app.engine('art', require('express-art-template'));
//  当渲染以 .artj结尾的源文件的时候 使用express-art-template
app.set('view options', { //art-tempalte 配置
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views')); //模版文件的存储目录，默认是views
app.set('view engine', 'art'); //可以省略的模版文件后缀

app.get('/', function(req, res) {
    //只要配置了模版引擎，就可以使用res.render 方法渲染页面了
    // 1、读取模版文件  2、渲染  3、发送响应 
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});

app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
})