const ArticleData = require('../models/ArticleData');
const jwt = require('jsonwebtoken');

const deleteUserHistory = async (req,res) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err,decoded) => {
            if(err){
                return res.sendStatus(403);
            }
            const username = decoded.username;
            await ArticleData.deleteMany({username: username}).sort({ createdAt: 'desc' });;
            res.json(`History Deleted of ${username}`);
        }
    )
}

module.exports = deleteUserHistory;