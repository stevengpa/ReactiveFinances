const _  = require('lodash');

module.exports = {
	isNumber(value) {
		return _.chain(value)
			.isNumber()
			.value();
	}
};
