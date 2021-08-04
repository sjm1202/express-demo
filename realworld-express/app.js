const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const path = require('path');
// const errorHandler = require("./middleware/error-handler")
const errorhandler = require('errorhandler');
const app = express();

//模版引擎相关配置
app.use('/public', express.static("./public"));
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

//挂载路由
// app.use("/api", router);

//挂载统一处理服务端错误中间件
// app.use(errorHandler());

app.use(router);

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler);
}

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})