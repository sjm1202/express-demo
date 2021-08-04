const validate = require("../middleware/validate");
const { body } = require('express-validator');
const {User} = require("../model");
const md5 = require("../util/md5")
exports.registor = validate([
    body("user.username").notEmpty().withMessage("用户名不能为空!")
    .bail()
    .custom(async value => {                                   //自定验证  用户名不能重复
        const user = await User.findOne({username: value});
        if(user){
            return Promise.reject("用户名已存在")
        }
    }),      

    body("user.password").notEmpty().withMessage("密码不能为空!"),

    body("user.email")
    .notEmpty().withMessage("邮箱不能为空!")
    .isEmail().withMessage("邮箱格式不正确")
    .bail()                                              //表示前面验证通过才会往后走
    .custom(async value => {                                   //自定验证  邮箱不能重复
        const user = await User.findOne({emial: value});
        if(user){
            return Promise.reject("邮箱已存在")
        }
    })
])
exports.login = [
    validate([
        body("user.email")
        .notEmpty().withMessage("邮箱不能为空!"),
        body("user.password").notEmpty().withMessage("密码不能为空!")
    ]),
    validate([
        body("user.email")
        .custom(async (value, {req}) => {                                   //自定验证  
            // const user = await User.findOne({email: value}).select("password");  //由于userModel的password设置了select：false   所以需再查一下passowrd
            const user = await User.findOne({email: value}).select([
                "email", "username", "bio", "image", "password"
            ]);
            if(!user){
                return Promise.reject("用户不存在")
            }
            req.user = user              //将查询到的用户挂载到请求对象上
        })
    ]),
    validate([
        body("user.password")
        .custom(async (value, {req}) => { 
            if(md5(value) !== req.user.password){
                return Promise.reject("密码错误!")
            }
         })
    ])
] 