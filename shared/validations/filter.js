const _ = require('lodash');

module.exports = {
	valFilter({filter}) {
		// Validate Filter
		if (_.isEmpty(filter) ||
			!_.has(filter, 'field') ||
			!_.has(filter, 'value') ||
			!_.has(filter, 'category')) {
			return false;
		}

		if (_.isEmpty(filter.field) ||
			_.isEmpty(filter.value) ||
			_.isEmpty(filter.category)) {
			return false;
		}

		return true;
	}
};
