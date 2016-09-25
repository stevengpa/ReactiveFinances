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

				const total = _.reduce(entries, (memo, {amount_usd, amount_lc}) => {
					memo.totalUSD += amount_usd;
					memo.totalLC += amount_lc;
					return memo;
				}, {
					totalUSD: 0,
					totalLC: 0
				});

				accumulator.push({category, ...total});
				return accumulator;
			}, [])
			.sortBy('category')
			.value();
	},
	monthlyLineChart() {

	}
});
