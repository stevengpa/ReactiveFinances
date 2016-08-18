import {observable, action} from 'mobx';
import _ from 'lodash';

import constants from '../shared/constants';
import auth from '../states/auth';

import q from '../q';

export default observable({
	// Observables
	category: '',
	categories: [],
	code: _.get(auth, 'user.code', ''),
	// Computeds
	isValidCategory() {
		return !_.isEmpty(this.category);
	},
	// Actions
	saveCategory: action(function saveCategory() {
		if (this.isValidCategory) {
			return q({
				method: 'POST',
				url:'/api/settings/category',
				data: {
					category: this.category,
					code: this.code
				}
			});
		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	}),
	updateCategory: action(function updateCategory(id, category) {
		if (!_.isEmpty(category)) {
			return q({
				method: 'PUT',
				url:'/api/settings/category',
				data: {
					id,
					category,
					code: this.code
				}
			});
		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	}),
	loadCategories: action(function loadCategories() {
		return q({
			method: 'GET',
			url: '/api/settings/category',
			params: {
				code: this.code
			}
		})
			.then(({data}) => {
				this.categories = _.size(data) > 0 ? data : [];
			});
	})

});
