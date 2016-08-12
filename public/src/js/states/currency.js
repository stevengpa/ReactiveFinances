import {observable, action} from 'mobx';
import _ from 'lodash';
import {isNumeric, isLength} from 'validator';

import constants from '../shared/constants';
import auth from '../states/auth';

import q from '../q';

export default observable({
	// Observables
	currency: '',
	exchange: '',
	// Computeds
	isValidCurrency() {
		return isLength(this.currency, 3) && !isNumeric(this.currency);
	},
	isValidExchange() {
		return isNumeric(this.exchange);
	},
	// Actions
	saveCurrency: action(function() {
		if (this.isValidCurrency) {
			return q({
				method: 'POST',
				url:'/settings/currency',
				data: {
					currency: this.currency,
					code: _.get(auth.user, 'code', '')
				}
			});
		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	}),
	loadCurrency: action(function() {
		return q({
			method: 'GET',
			url: '/settings/currency',
			data: {
				code: _.get(auth.user, 'code', '')
			}
		})
			.then((response) => {
				console.log('=========  response  =========');
				console.log(response);
				console.log('=====  End of response>  =====');
			})
			.catch((err) => {
				console.log('=========  err  =========');
				console.log(err);
				console.log('=====  End of err>  =====');
			});
	})
});
