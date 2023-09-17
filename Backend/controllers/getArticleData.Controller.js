const axios = require('axios');
const User = require('../models/Users');
const ArticleData = require('../models/ArticleData');

const handleArticleData = async (req,res) => {
    let data;
    await axios.post('http://127.0.0.1:5000/run',req.body)
        .then((response)=>{
            data = response;
            // console.log(response);
        })
        .catch((err)=>{
            console.error(err);
        });
    return res.send(data.data);
}

module.exports = handleArticleData;