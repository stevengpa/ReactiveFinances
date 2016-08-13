const _ = require('lodash');
const {isLength} = require('validator');
const {isNumber} = require('../../shared/validations');
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

		if (_.size(user) === 0 || !isLength(code, CODE_LEN) || !isLength(currency, 3) || isNumber(currency)) {
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
		const code = _.get(req.query, 'code', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0 || !isLength(code, CODE_LEN)) {
			res.status(406).end();
			return;
		}

		const {private_code} = user;
		let {currency, exchange} = getCurrency(private_code);
		currency = currency || '';
		exchange = exchange || 1;

		res.send({currency, exchange});
	},
	saveExchange(req, res) {
		const code = _.get(req.body, 'code', '');
		const exchange = _.get(req.body, 'exchange', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0 || !isNumber(exchange)) {
			res.status(406).end();
			return;
		}

		const {id: userId, private_code} = user;
		const localCurrency = getCurrency(private_code);

		if (_.size(localCurrency) > 0) {

			db.table('currency')
				.find({id: localCurrency.id})
				.assign({exchange})
				.value();

		} else {

			db.table('currency')
				.push({
					id: uuid.v4(),
					exchange,
					user_id: userId,
					private_code
				})
				.value();
		}

		res.status(200).end();
	}
};
