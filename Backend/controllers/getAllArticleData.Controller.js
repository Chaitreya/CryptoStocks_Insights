const ArticleData = require('../models/ArticleData');

const getAllArticleData = async (req,res) => {
    const data = await ArticleData.find({});
    res.json(data);
}

module.exports = getAllArticleData;