import {observable, action} from 'mobx';
import _ from 'lodash';

import q from '../q';
import constants from '../shared/constants';

import {cleanString} from '../../../../shared/validations';
import {valFilter} from '../../../../shared/validations/filter';

import auth from '../states/auth';

export default observable({
	// Observables
	filters: [],
	fields: [],
	filter: {},
	code: _.get(auth, 'user.code', ''),
	visible: true,
	// Computeds
	isValid() {
		return valFilter({
			filter: this.filter
		});
	},
	// Actions
	saveFilter: action(function saveFilter(filter = this.filter) {
		const {value, field, category} = filter;
		if (this.isValid) {
			return q({
				method: 'POST',
				url:'/api/filters/filter',
				data: {
					value: cleanString(value),
					field: cleanString(field),
					category: cleanString(category)
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
		.then(({data}) => this.fields = data)
		.catch(() => this.fields = []);
	}),
	loadFilters: action(function loadFilters() {
		return q({
			method: 'GET',
			url:'/api/filters/filter',
			params: {
				code: cleanString(this.code)
			}
		})
			.then(({data}) => this.filters = data)
			.catch(() => this.filters = []);
	})
});
