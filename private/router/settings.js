const express = require('express');
const router = express.Router({
	mergeParams: true
});

const settings = require('../routes/settings');

router.post('/currency', settings.saveCurrency);
router.get('/currency', settings.getCurrency);
router.post('/exchange', settings.saveExchange);

router.post('/category', settings.saveCategory);
router.put('/category', settings.updateCategory);
router.get('/category', settings.loadCategories);

module.exports = router;
