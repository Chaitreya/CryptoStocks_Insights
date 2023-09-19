const ArticleData = require('../models/ArticleData');
const jwt = require('jsonwebtoken');

const getUserHistory = async (req,res) => {
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
            const data = await ArticleData.find({username: username});
            res.json(data);
        }
    )
}

module.exports = getUserHistory;