const express = require('express');
const router = express.Router();
const handleRefreshToken = require('../controllers/refreshToken.Controller');

router.route('/refreshToken')
    .get(handleRefreshToken);


module.exports = router;