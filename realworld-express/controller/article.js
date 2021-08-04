const { Article, User } = require("../model");
//获取文章列表
exports.getArticles = async (req, res, next) => {
    try {
        const {
            limit = 20, 
            offset = 0,
            tag,
            author
        } = req.query;
        const filter = {}
        //数组字符串筛选
        if(tag){
            filter.tagList = tag           //mongobd 只要tagList数组中包含tag，就认为是匹配的
        }
        //作者筛选
        if(author){                        
            const user = await User.findOne({username: author});
            filter.author = user ? user._id : null;
        }
          
        const articles = await Article.find(filter)
        .skip(Number.parseInt(offset)) // 跳过offset条
        .limit(Number.parseInt(limit))// 取limit条
        .sort({
            createAt: -1            //-1倒序    1升序
        })
        const articleCount = await Article.countDocuments();
        res.status(200).json({
            articles,
            articleCount
        })
    } catch (error) {
        next(error);
    }
}
//获取用户关注的作者文章列表
exports.getFeedArticles = (req, res, next) => {
    res.send("getFeedArticles")
}
//获取文章
exports.getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.slug).populate("author");
        if(!article){
            return res.status(404).end()
        }
        res.status(200).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
//创建文章
exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article);
        article.author = req.user._id;
        article.populate("author").execPopulate();
        await article.save();
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
//更新文章
exports.updateArticle = async (req, res, next) => {
    try {
        const article = req.article
        const bodyArticle = req.body.article;
        article.title = bodyArticle.title ? bodyArticle.title : article.title;
        article.description = bodyArticle.description ? bodyArticle.description : article.description;
        article.body = bodyArticle.body ? bodyArticle.body : article.body;
        await article.save();
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
//删除文章
exports.deleteArticle = async (req, res, next) => {
    try {
        const article = req.article;
        await article.remove();
        res.status(204).end();
    } catch (error) { 
        next(error);
    }
}
//添加文章评论
exports.createArticleComment = (req, res, next) => {

    res.send("createArticleComment")
}
//获取文章评论列表
exports.getArticleComments = async (req, res, next) => {
    
    res.send("getArticleComments")
}
//删除文章评论
exports.deleteArticleComment = (req, res, next) => {
    res.send("addArticleComment")
}