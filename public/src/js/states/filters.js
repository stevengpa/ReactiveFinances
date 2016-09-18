import {observable, action} from 'mobx';
import _ from 'lodash';

import q from '../q';
import constants from '../shared/constants';

import {cleanString} from '../../../../shared/validations';
import {valFilter} from '../../../../shared/validations/filter';

import auth from '../states/auth';
import storeEntry from '../states/entry';

export default observable({
	// Observables
	fields: [],
	filters: [],
	filter: {},
	code: _.get(auth, 'user.code', ''),
	visible: true,
	// Computeds
	isValid() {
		return valFilter({
			filter: this.filter
		});
	},
	selectedFilters() {
		return _.map(this.filters.toJS(), ({value}) => value);
	},
	queryFilter() {
		//INFO: Filter categories: currency, category, label, date
		return _.reduce(this.filters.toJS(), (memo, {category, value}) => {
			if (category === 'category' || category === 'label') {
				memo.push({ [category]: {id: value}, path: `${category}.id`, value });
			} else if (category === 'date') {
				const entryDate = value.split('-');
				memo.push({ ['year']: _.toInteger(entryDate[0]), path: 'year', value: _.toInteger(entryDate[0]) });
				memo.push({ ['month']: _.toInteger(entryDate[1]), path: 'month', value: _.toInteger(entryDate[1]) });
			} else {
				memo.push({ [category]: value, path: category, value });
			}

			return memo;
		}, []);
	},
	// Actions
	toggleFilter: action(function toggleFilter(filter = this.filter) {
		const {action, value, field, category} = filter;
		this.filter = {
			action,
			value,
			field,
			category
		};

		if (this.isValid) {
			return q({
				method: 'POST',
				url:'/api/filters/filter',
				data: {
					code: cleanString(this.code),
					value: cleanString(value),
					field: cleanString(field),
					category: cleanString(category),
					action: cleanString(action)
				}
			})
			.then((result) => {
				// Load Entries according with the new filter
				storeEntry.loadFilteredEntries(this.queryFilter);
				return result;
			});

		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	}),
	loadFields: action(function loadFields() {
		return q({
			method: 'GET',
			url:'/api/filters/loadFields',
			params: {
				code: cleanString(this.code)
			}
		})
		.then(({data}) => {
			this.fields.replace(data);
			return data;
		})
		.catch(() => this.fields.replace([]));
	}),
	loadFilters: action(function loadFilters() {
		return q({
			method: 'GET',
			url:'/api/filters/filter',
			params: {
				code: cleanString(this.code)
			}
		})
		.then(({data}) => {
			this.filters.replace(data);
			return data;
		})
		.then(() => storeEntry.loadFilteredEntries(this.queryFilter))
		.catch(() => this.filters.replace([]));
	})
});
