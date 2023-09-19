const express = require('express');
const router = express.Router();
const handleArticleData = require('../controllers/storeArticleData.Controller');
const getUserHistory = require('../controllers/getUserHistory.Controller');

router.route('/articleData')
    .post(handleArticleData)
    .get(getUserHistory);

module.exports = router;