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
		.then((filters) => {
			console.log('=========  filters  =========');
			console.log(filters);
			console.log('=====  End of filters>  =====');
			storeEntry.loadFilteredEntries(filters);
		})
		.catch(() => this.filters.replace([]));
	})
});
