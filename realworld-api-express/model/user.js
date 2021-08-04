const mongoose = require("mongoose");
const baseModel = require("./baseModel");
const md5 = require("../util/md5")
const userScahema = new mongoose.Schema({
    ...baseModel,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value),         //设置值时进行MD5加密
        select: false                     //查询不反回password
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
})
module.exports = userScahema;