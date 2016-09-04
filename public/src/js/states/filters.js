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
	filter: {},
	code: _.get(auth, 'user.code', ''),
	// Computeds
	isValid() {
		return valFilter({
			filter: this.filter
		});
	},
	// Actions
	loadFields: action(function loadFields() {
		return q({
			method: 'GET',
			url:'/api/filters/loadFields',
			params: {
				code: cleanString(this.code)
			}
		});
	})
});
