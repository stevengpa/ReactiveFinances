import {observable} from 'mobx';
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
	totalCategoriesSortByPeriod(totalField = 'totalUSD') {
		return _.reduce(this.categories, (memo, category) => {

			// Create an empty array for each category
			if (!_.has(memo, category)) {
				memo[category] = [];
			}

			// Insert the category name as the first item
			if (!_.includes(memo[category], category)) {
				memo[category].push(category);
			}

			_.each(this.periods, (period) => {

				// Filter the Category's totals by Period
				const totalsByCategoryPeriod = _.chain(this.totalsByCategoryPeriod)
					.filter({period})
					.get('0.totals', [])
					.value();

				// Take the first Total found by Period and Category
				const totalCategory = _.chain(totalsByCategoryPeriod)
					.filter({period, category})
					.head()
					.value();

				if (_.size(totalCategory) > 0) {
					const totalUSD = _.get(totalCategory, totalField, 0);
					memo[category].push(totalUSD);
				} else {
					memo[category].push(0);
				}
			});

			return memo;
		}, []);
	},
	chartPeriods() {
		return _.reduce(this.periods, (memo, period) => {
			memo.push(period);
			return memo;
		}, ['x']);
	},
	chartCategoriesAndPeriod() {
		const totalCategories = [];
		totalCategories.push(this.chartPeriods);
		_.mapKeys(this.totalCategoriesSortByPeriod, (category) => totalCategories.push(category));
		return totalCategories;
	}
});
