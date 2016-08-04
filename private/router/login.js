const express = require('express');
const router = express.Router({
	mergeParams: true
});

const login = require('../routes/login');

router.post('/login', login.access);

module.exports = router;
