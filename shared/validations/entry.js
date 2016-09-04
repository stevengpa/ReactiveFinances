const _ = require('lodash');
const moment = require('moment');

module.exports = {
	valEntry({currency, exchange, amount, entryDate, category, label}) {
		// Validate Currency
		if (_.isEmpty(currency)) {
			return false;
		}
		// Validate Exchange
		if (!_.isNumber(exchange) ||
			!_.gt(exchange, 0)) {
			return false;
		}
		// Validate Amount
		if (!_.isNumber(amount) ||
			!_.gt(amount, 0)) {
			return false;
		}
		// Validate Date
		if (_.isEmpty(entryDate) ||
			!moment(entryDate, 'YYYY-MM-DD').isValid()) {
			return false;
		}
		// Validate Category
		if (_.isEmpty(category) ||
			!_.has(category, 'id') ||
			!_.has(category, 'category')) {
			return false;
		}
		// Validate Label
		if (_.isEmpty(label) ||
			!_.has(label, 'id') ||
			!_.has(label, 'label')) {
			return false;
		}

		return true;
	}
};
