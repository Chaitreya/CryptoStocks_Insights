const express = require('express');
const router = express.Router();
const getAllArticleData = require('../controllers/getAllArticleData.Controller');

router.route('/getAllArticleData')
    .get(getAllArticleData);

module.exports = router;