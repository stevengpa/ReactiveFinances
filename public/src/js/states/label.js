import {observable, action} from 'mobx';
import _ from 'lodash';

import {cleanString} from '../../../../shared/validations';

import constants from '../shared/constants';
import auth from '../states/auth';

import q from '../q';

export default observable({
	// Observables
	label: '',
	labels: [],
	code: _.get(auth, 'user.code', ''),
	// Computeds
	isValidLabel() {
		return !_.isEmpty(cleanString(this.label));
	},
	// Actions
	saveLabel: action(function saveLabel(label = this.label) {
		if (this.isValidLabel) {
			return q({
				method: 'POST',
				url:'/api/settings/label',
				data: {
					label: cleanString(label),
					code: cleanString(this.code)
				}
			});
		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	}),
	updateLabel: action(function updateLabel(id, label, active) {
		if (!_.isEmpty(label)) {
			return q({
				method: 'PUT',
				url:'/api/settings/label',
				data: {
					id: cleanString(id),
					label: cleanString(label),
					active: _.toString(active) === 'true',
					code: cleanString(this.code)
				}
			});
		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	}),
	loadLabels: action(function loadLabels() {
		return q({
			method: 'GET',
			url: '/api/settings/label',
			params: {
				code: cleanString(this.code)
			}
		})
			.then(({data}) => {
				this.labels = _.size(data) > 0 ? data : [];
			});
	})

});
