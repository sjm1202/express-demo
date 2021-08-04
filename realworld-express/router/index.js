const express = require("express");
const router = express.Router();

// //用户相关
// router.use(require("./user")); 
// //用户资料相关
// router.use("/profile", require("./profile"));

// //文章相关
// router.use("/articles", require("./article"));

router.get('/', (req, res) => {
    console.log(process.env.NODE_ENV)
    res.render('index.html');
})


module.exports = router;