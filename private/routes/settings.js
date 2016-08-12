const _ = require('lodash');
const {isNumeric, isLength} = require('validator');
const uuid = require('uuid');

const db = require('../utils/db');
const {getUserByPublicCode} = require('../utils/authentication');

const CODE_LEN = 36;

function getCurrency(private_code) {
	return db.table('currency')
		.find({private_code})
		.value();
}

module.exports = {
	saveCurrency(req, res) {
		const code = _.get(req.body, 'code', '');
		const currency = _.get(req.body, 'currency', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0 || !isLength(code, CODE_LEN) || !isLength(currency, 3) || isNumeric(currency)) {
			res.status(406).end();
			return;
		}

		const {id: userId, private_code} = user;
		const localCurrency = getCurrency(private_code);

		if (_.size(localCurrency) > 0) {

			db.table('currency')
				.find({id: localCurrency.id})
				.assign({currency})
				.value();

		} else {

			db.table('currency')
				.push({
					id: uuid.v4(),
					currency,
					user_id: userId,
					private_code
				})
				.value();
		}

		res.status(200).end();
	},
	getCurrency(req, res) {
		console.log('ajasdjaskdr');
		const code = _.get(req.body, 'code', '');
		const user = getUserByPublicCode(code);
		if (_.size(user) === 0 || !isLength(code, CODE_LEN)) {
			res.status(406).end();
			return;
		}

		const {private_code} = user;
		const {currency} = getUserByPublicCode(private_code);

		res.json({currency});
	}
};
