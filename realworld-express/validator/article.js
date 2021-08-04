const {body, param} = require("express-validator");
const validate = require("../middleware/validate");
const {Article, User} = require("../model")

exports.createArticle = validate([
    body("article.title").notEmpty().withMessage("文章标题不能为空！"),
    body("article.description").notEmpty().withMessage("文章摘要不能为空！"),
    body("article.body").notEmpty().withMessage("文章内容不能为空！")
])
//获取文章
exports.getArticle = validate([
    // param("slug").custom(async (value) => {
    //     if(!mongoose.isValidObjectId(value)){
    //         return Promise.reject("文章ID类型错误！")
    //     }
    // })
    validate.isValidObjectId(['params'], "slug")
])
//更新文章
exports.updateArticle =[ 
    validate([
        validate.isValidObjectId(['params'], "slug"),
    ]),
    async (req, res, next) => {
        const articleId = req.params.slug
        req.article = await Article.findById(articleId);
        if(!req.article){
            return res.status(404).end();
        }
        next();
    },
    async (req, res, next) => {
        console.log(req.user._id, req.article.author)
        if( req.user._id.toString() !== req.article.author.toString()){
            return res.status(403).end();
        }
        next();
    }
]

exports.deleteArticle = [
    validate([
        validate.isValidObjectId(['params'], "slug"),
    ]),
    async (req, res, next) => {
        const articleId = req.params.slug
        req.article = await Article.findById(articleId);
        if(!req.article){
            return res.status(404).end();
        }
        next();
    },
    async (req, res, next) => {
        console.log(req.user._id, req.article.author)
        if( req.user._id.toString() !== req.article.author.toString()){
            return res.status(403).end();
        }
        next();
    }
]
