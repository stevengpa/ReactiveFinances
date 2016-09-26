import {observable, action} from 'mobx';
import _ from 'lodash';

import storeEntry from '../states/entry';

function getEntriesInfo(filter) {
	return _.chain(storeEntry.entries.toJS())
		.map(filter)
		.uniq()
		.sort()
		.value();
}

export default observable({
	// Computeds
	months() {
		return getEntriesInfo(({month}) => month);
	},
	years() {
		return getEntriesInfo(({year}) => year);
	},
	periods() {
		return getEntriesInfo(({month, year}) => `${year}-${month}`);
	},
	categories() {
		return getEntriesInfo(({category}) => category.category);
	},
	totalsByCategory() {
		return _.chain(storeEntry.entries.toJS())
			.groupBy('category.category')
			.reduce((accumulator, entries, category) => {

				const totals = _.reduce(entries, (memo, {amount_usd, amount_lc}) => {
					memo.totalUSD += amount_usd;
					memo.totalLC += amount_lc;
					return memo;
				}, {
					totalUSD: 0,
					totalLC: 0
				});

				accumulator.push({category, ...totals});
				return accumulator;
			}, [])
			.sortBy('category')
			.value();
	},
	totalsByCategoryPeriod() {
		return _.chain(storeEntry.entries.toJS())
			.map((entry) => _.assign(entry, {period: `${entry.year}-${entry.month}`}))
			.groupBy('period')
			.reduce((accumulator, array, period) => {

				const totals = _.chain(array)
					.groupBy('category.category')
					.reduce((memo, entries, category) => {
						const detail = {
							totalUSD: 0,
							totalLC: 0,
							category,
							period
						};

						_.each(entries, ({amount_usd, amount_lc}) => {
							detail.totalUSD += amount_usd;
							detail.totalLC += amount_lc;
						});

						memo.push(detail);
						return memo;
					}, [])
					.value();

				accumulator.push({period, totals});
				return accumulator;
			}, [])
			.sortBy('period')
			.value();
	},
	monthlyLineChart() {

	}
});
