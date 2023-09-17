const express = require('express');
const router = express.Router();
const handleLogout = require('../controllers/logout.Controller');

router.route('/logout')
    .get(handleLogout);

module.exports = router;