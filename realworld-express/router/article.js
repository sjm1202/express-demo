const express = require("express");
const router = express.Router();
const articleCtrl = require("../controller/article");
const auth = require("../middleware/auth");
const articleValidator = require("../validator/article");

//获取文章列表
router.get("/", articleCtrl.getArticles);

//获取哟ing户关注的作者文章
router.get("/feed", articleCtrl.getFeedArticles);

//获取文章
router.get("/:slug",articleValidator.getArticle, articleCtrl.getArticle);

//创建文章
router.post("/", auth, articleValidator.createArticle, articleCtrl.createArticle);

//更新文章
router.put("/:slug", auth, articleValidator.updateArticle, articleCtrl.updateArticle);

//删除文章
router.delete("/:slug", auth, articleValidator.deleteArticle, articleCtrl.deleteArticle);

//添加文章评论
router.post("/:slug/comments", articleCtrl.createArticleComment);

//获取文章评论列表
router.get("/:slug/comments", articleCtrl.getArticleComments);

//删除文章评论
router.delete("/:slug/comments/:id", articleCtrl.deleteArticleComment);

module.exports = router;
