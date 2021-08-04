const { User } = require("../model");
const jwt = require("../util/jwt");
const {jwtSecret} = require("../config/config.default")
//用户注册
exports.register = async (req, res, next) => {
    try {
        let user = new User(req.body.user);
        await user.save();
        user = user.toJSON();         //将mongoose对象转换为JSON
        delete user.password;         //不将password返回给前端
        res.status(201).json({
            user
        })
    } catch (error) {
        next(error);
    }
}

//用户登录
exports.userLogin = async (req, res, next) => {
    try {
        const user = req.user.toJSON();
        delete user.password;
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret, {expiresIn: "1h"})
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }
}
//获取当前登陆用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        //处理请求
        res.status(200).send(req.user);
    } catch (error) {
        next(error)
    }
}
//更新当前登陆用户
exports.updateCurrentUser = async (req, res, next) => {
    try {
        //处理请求
        res.send(`put /user`);
    } catch (error) {
        next(error)
    }
}
