const _ = require('lodash');

module.exports = {
	valFilter({filter}) {
		// Validate Filter
		if (_.isEmpty(filter) ||
			!_.has(filter, 'field') ||
			!_.has(filter, 'value') ||
			!_.has(filter, 'text') ||
			!_.has(filter, 'path') ||
			!_.has(filter, 'category')) {
			return false;
		}

		if (_.isEmpty(filter.field) ||
			_.isEmpty(filter.value) ||
			_.isEmpty(filter.text) ||
			_.isEmpty(filter.category) ||
			_.isEmpty(filter.path)) {
			return false;
		}

		return true;
	}
};
