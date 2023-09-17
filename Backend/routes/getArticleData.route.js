const express = require('express');
const router = express.Router();
const handleArticleData = require('../controllers/getArticleData.Controller');

router.route('/getArticleData')
    .post(handleArticleData);

module.exports = router;