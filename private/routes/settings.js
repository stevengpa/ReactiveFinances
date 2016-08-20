const _ = require('lodash');
const {isLength} = require('validator');
const {isNumber} = require('../../shared/validations');
const uuid = require('uuid');

const db = require('../utils/db');
const {getUserByPublicCode} = require('../utils/authentication');

const CODE_LEN = 36;
const CURRENCY_TABLE = 'currency';
const CATEGORY_TABLE = 'category';
const LABEL_TABLE = 'label';

function getData(table, filters) {
	return db.table(table)
		.filter(filters)
		.value();
}

module.exports = {
	// ======================= >> CURRENCY << =======================
	saveCurrency(req, res) {
		const code = _.get(req.body, 'code', '');
		const currency = _.get(req.body, 'currency', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0 || !isLength(code, CODE_LEN) || !isLength(currency, 3) || isNumber(currency)) {
			res.status(406).end();
			return;
		}

		const {id: userId, private_code} = user;
		const localCurrency = _.get(getData(CURRENCY_TABLE, {private_code}), '[0]', {});

		if (_.size(localCurrency) > 0) {

			db.table(CURRENCY_TABLE)
				.find({id: localCurrency.id})
				.assign({currency})
				.value();

		} else {

			db.table(CURRENCY_TABLE)
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
	// Currency and Exchange
	getCurrency(req, res) {
		const code = _.get(req.query, 'code', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0 || !isLength(code, CODE_LEN)) {
			res.status(406).end();
			return;
		}

		const {private_code} = user;
		let {currency, exchange} = _.get(getData(CURRENCY_TABLE, {private_code}), '[0]', {});
		currency = currency || '';
		exchange = exchange || 1;

		res.send({currency, exchange});
	},
	// ======================= >> EXCHANGE << =======================
	saveExchange(req, res) {
		const code = _.get(req.body, 'code', '');
		const exchange = _.get(req.body, 'exchange', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0 || !isNumber(exchange)) {
			res.status(406).end();
			return;
		}

		const {id: userId, private_code} = user;
		const localCurrency = _.get(getData(CURRENCY_TABLE, {private_code}), '[0]', {});

		if (_.size(localCurrency) > 0) {

			db.table(CURRENCY_TABLE)
				.find({id: localCurrency.id})
				.assign({exchange})
				.value();

		} else {

			db.table(CURRENCY_TABLE)
				.push({
					id: uuid.v4(),
					exchange,
					user_id: userId,
					private_code
				})
				.value();
		}

		res.status(200).end();
	},
	// ======================= >> CATEGORY << =======================
	saveCategory(req, res) {
		const {code, category} = req.body;
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0 || _.size(category) === 0) {
			res.status(406).end();
			return;
		}

		const {id: user_id, private_code} = user;
		const dbCategory = getData(CATEGORY_TABLE, {
			user_id,
			private_code,
			category
		});

		if (_.size(dbCategory) > 0) {
			res.status(406).end();
			return;
		}

		db.table(CATEGORY_TABLE)
			.push({
				id: uuid.v4(),
				category,
				user_id,
				private_code,
				active: true
			})
			.value();

		res.status(200).end();
	},
	updateCategory(req, res) {
		const {code, id, category, active: act} = req.body;
		const user = getUserByPublicCode(code);
		const {id: user_id, private_code} = user;

		const active = _.toString(act) === 'true';
		if (_.size(user) === 0 || _.size(id) === 0 || _.size(category) === 0 || !_.isBoolean(active)) {
			res.status(406).end();
			return;
		}

		const dbCategory = getData(CATEGORY_TABLE, {
			user_id,
			private_code,
			id
		});

		if (_.size(dbCategory) === 0) {
			res.status(406).end();
			return;
		}

		db.table(CATEGORY_TABLE)
			.find({id: dbCategory[0].id})
			.assign({
				category,
				active
			})
			.value();

		res.status(200).end();
	},
	loadCategories(req, res) {
		const code = _.get(req.query, 'code', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0) {
			res.status(406).end();
			return;
		}

		const dbCategory = db.table(CATEGORY_TABLE)
			.filter({user_id: user.id})
			.map((category) => _.pick(category, ['id', 'category', 'active']))
			.sortBy('category')
			.value() || [];

		res.send(dbCategory);
	},
	// ======================= >> LABELS << =======================
	saveLabel(req, res) {
		const {code, label} = req.body;
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0 || _.size(label) === 0) {
			res.status(406).end();
			return;
		}

		const {id: user_id, private_code} = user;
		const dbLabel = getData(LABEL_TABLE, {
			user_id,
			private_code,
			label
		});

		if (_.size(dbLabel) > 0) {
			res.status(406).end();
			return;
		}

		db.table(LABEL_TABLE)
			.push({
				id: uuid.v4(),
				label,
				user_id,
				private_code,
				active: true
			})
			.value();

		res.status(200).end();
	},
	updateLabel(req, res) {
		const {code, id, label, active: act} = req.body;
		const user = getUserByPublicCode(code);
		const {id: user_id, private_code} = user;

		const active = _.toString(act) === 'true';
		if (_.size(user) === 0 || _.size(id) === 0 || _.size(label) === 0 || !_.isBoolean(active)) {
			res.status(406).end();
			return;
		}

		const dbLabel = getData(LABEL_TABLE, {
			user_id,
			private_code,
			id
		});

		if (_.size(dbLabel) === 0) {
			res.status(406).end();
			return;
		}

		db.table(LABEL_TABLE)
			.find({id: dbLabel[0].id})
			.assign({
				label,
				active
			})
			.value();

		res.status(200).end();
	},
	loadLabels(req, res) {
		const code = _.get(req.query, 'code', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0) {
			res.status(406).end();
			return;
		}

		const dbLabel = db.table(LABEL_TABLE)
				.filter({user_id: user.id})
				.map((label) => _.pick(label, ['id', 'label', 'active']))
				.sortBy('category')
				.value() || [];

		res.send(dbLabel);
	}
};
