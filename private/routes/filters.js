const _ = require('lodash');
const uuid = require('uuid');

const db = require('../utils/db');
const {getData} = db;
const {ENTRY_TABLE, FILTER_TABLE} = db.tables;

const {getUserByPublicCode} = require('../utils/authentication');

const {valFilter} = require('../../shared/validations/filter');

module.exports = {
	toggleFilter(req, res) {
		const {action, code, value, field, category} = req.body;

		const user = getUserByPublicCode(code);
		if (_.size(user) === 0) {
			res.status(406).end();
			return;
		}

		if (valFilter({action, value, field, category})) {
			res.status(406).end();
			return;
		}

		const {id: user_id, private_code} = user;
		const dbFilters = getData(FILTER_TABLE, {
			user_id,
			private_code,
			value,
			field,
			category
		});


		if (_.size(dbFilters) > 0) {
			if (action === 'remove') {
				db.table(FILTER_TABLE)
					.remove({
						user_id,
						private_code,
						value
					})
					.value();
			}
		} else {

			if (action === 'add') {
				db.table(FILTER_TABLE)
					.push({
						id: uuid.v4(),
						user_id,
						private_code,
						value,
						field,
						category,
						entry_date_time: new Date().toISOString()
					})
					.value();
			}
		}

		res.status(200).end();
	},
	loadFilters(req, res) {
		const code = _.get(req.query, 'code', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0) {
			res.status(406).end();
			return;
		}

		const dbFilter = db.table(FILTER_TABLE)
				.filter({user_id: user.id})
				.map((filter) => _.pick(filter, ['id', 'value', 'field', 'category']))
				.sortBy('value')
				.value() || [];

		res.send(dbFilter);
	},
	loadFields(req, res) {
		const code = _.get(req.query, 'code', '');
		const user = getUserByPublicCode(code);

		if (_.size(user) === 0) {
			res.status(406).end();
			return;
		}
		//INFO: Filter categories: currency, category, label, date
		const dbFields = db.table(ENTRY_TABLE)
				.filter({user_id: user.id})
				.reduce((memo, entry) => {

					const fields = _.map(entry, (item, key) => {
						if (key === 'currency') {
							return memo.push({
								value: item,
								field: item,
								category: 'currency'
							});
						} else if (key === 'category') {
							return memo.push({
								value: item.id,
								field: item.category,
								category: 'category'
							});
						} else if (key === 'label') {
							return memo.push({
								value: item.id,
								field: item.label,
								category: 'label'
							});
						}
					});

					memo.push(fields);
					if (entry.month && entry.year) {
						memo.push({
							value: `${entry.year}-${entry.month}`,
							field: `${entry.year}-${entry.month}`,
							category: 'date'
						});
					}

					return memo;

				}, [])
				.uniqBy('value')
				.map((item) => _.hasIn(item, 'value') ? item : undefined)
				.sortBy('category')
				.value() || [];

		res.send(dbFields);
	}
};
