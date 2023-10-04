const express = require('express');
const router = express.Router();
const handleArticleData = require('../controllers/storeArticleData.Controller');
const getUserHistory = require('../controllers/getUserHistory.Controller');
const deleteUserHistory = require('../controllers/deleteUserHistory.Controller');

router.route('/articleData')
    .post(handleArticleData)
    .get(getUserHistory)
    .delete(deleteUserHistory)

module.exports = router;