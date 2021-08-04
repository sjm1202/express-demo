const crypto = require("crypto");
//获取 crypto 支持的散列算法
// crypto.getHashes()
module.exports = (str) => {
    return crypto.createHash("md5")      //md5为散列算法，必须为crypto.getHashes()返回值中一个
    .update("prefix" + str)             //prefix 为混入的字符串
    .digest("hex");
}