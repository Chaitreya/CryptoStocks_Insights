const axios = require('axios');
const jwt = require('jsonwebtoken');
const ArticleData = require('../models/ArticleData');

const handleArticleData = async (req,res) => {
    let data;
    await axios.post('http://127.0.0.1:5000/run',req.body)
        .then((response)=>{
            data = response.data;
            // console.log(response);
        })
        .catch((err)=>{
            console.error(err);
        });
    
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            if(err){
                return res.sendStatus(403);
            }
            username = decoded.username;
            data.forEach(async item => {
                await ArticleData.create({
                    "username": username,
                    "Ticker": item.Ticker,
                    "Summary": item.Summary,
                    "Sentiment": item.Sentiment,
                    "Sentiment_Score": item["Sentiment Score"],
                    "URL": item.URL
                })
            });

            return res.json(data);
        }
    )
    
}

module.exports = handleArticleData;