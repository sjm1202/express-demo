//链接 MongoDB 数据库
const mongoose = require('mongoose');
const {dbUri} = require("../config/config.default")
mongoose.connect(dbUri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;

//当链接失败的时候
db.on('error', () => {
    console.log("MongoDB 数据库链接失败", err)
});
db.once('open', function() {
  console.log("MongoDB 数据库链接成功")
});

//组织导出模型类
module.exports = {
    User: mongoose.model("User", require("./user")),
    Article: mongoose.model("Article", require("./article"))
}