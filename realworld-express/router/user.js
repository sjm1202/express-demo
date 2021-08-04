const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");
const auth = require("../middleware/auth");
//用户注册
router.post("/users", 
userValidator.registor, 
userCtrl.register); 
//用户登录
router.post("/users/login", 
userValidator.login, 
userCtrl.userLogin);


//获取当前登陆用户
router.get("/user", auth, userCtrl.getCurrentUser)
//更新当前登陆用户
router.put("/user", auth, userCtrl.updateCurrentUser)

module.exports = router