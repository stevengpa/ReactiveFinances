const express = require('express');
const router = express.Router({
	mergeParams: true
});

const settings = require('../routes/settings');

router.post('/currency', settings.saveCurrency);
router.get('/currency', settings.getCurrency);

module.exports = router;
