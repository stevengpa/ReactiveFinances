const express = require('express');
const router = express.Router({
	mergeParams: true
});

const signUp = require('../routes/signup');

router.post('/signup/register', signUp.register);

module.exports = router;
