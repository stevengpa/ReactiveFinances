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

router.post('/label', settings.saveLabel);
router.put('/label', settings.updateLabel);
router.get('/label', settings.loadLabels);

router.post('/entry', settings.saveEntry);
router.delete('/entry', settings.deleteEntry);
router.get('/entries', settings.loadFilteredEntries);

module.exports = router;
