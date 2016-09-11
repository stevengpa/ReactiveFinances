const _ = require('lodash');

module.exports = {
	valFilter({filter}) {
		// Validate Filter
		if (_.isEmpty(filter) ||
			!_.has(filter, 'field') ||
			!_.has(filter, 'value') ||
			!_.has(filter, 'category') ||
			!_.has(filter, 'action')) {
			return false;
		}

		if (_.isEmpty(filter.field) ||
			_.isEmpty(filter.value) ||
			_.isEmpty(filter.category ||
				_.isEmpty(filter.action))) {
			return false;
		}

		return true;
	}
};
