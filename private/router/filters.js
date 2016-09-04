const express = require('express');
const router = express.Router({
	mergeParams: true
});

const filters = require('../routes/filters');

router.get('/loadFields', filters.loadFields);

module.exports = router;
