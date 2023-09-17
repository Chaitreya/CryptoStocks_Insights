const express = require('express');
const router = express.Router();
const handleLogin = require('../controllers/login.Controller');

router.route('/login')
    .post(handleLogin);

module.exports = router;