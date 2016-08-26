import {observable, action} from 'mobx';
import _ from 'lodash';
import {isLength} from 'validator';
import {isNumber, cleanString} from '../../../../shared/validations';

import constants from '../shared/constants';
import auth from '../states/auth';

import q from '../q';

export default observable({
	// Observables
	currency: '',
	exchange: 1,
	code: _.get(auth, 'user.code', ''),
	exchangeCurrency: 'USD',
	// Computeds
	isValidCurrency() {
		return isLength(cleanString(this.currency), 3) && !isNumber(cleanString(this.currency));
	},
	isValidExchange() {
		return isNumber(this.exchange) && _.gt(this.exchange, 0);
	},
	// Actions
	saveCurrency: action(function saveCurrency() {
		if (this.isValidCurrency) {
			return q({
				method: 'POST',
				url:'/api/settings/currency',
				data: {
					currency: cleanString(this.currency),
					code: cleanString(this.code)
				}
			});
		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	}),
	loadCurrency: action(function loadCurrency() {
		return q({
			method: 'GET',
			url: '/api/settings/currency',
			params: {
				code: cleanString(this.code)
			}
		})
			.then(({data}) => {
				const {currency, exchange} = data;
				this.currency = cleanString(currency) || '';
				this.exchange = exchange || 0;
				return {
					currency: cleanString(currency),
					exchange: _.toNumber(exchange)
				};
			});
	}),
	saveExchange: action(function saveExchange() {
		if (this.isValidExchange) {
			return q({
				method: 'POST',
				url:'/api/settings/exchange',
				data: {
					exchange: this.exchange,
					code: cleanString(this.code)
				}
			});
		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	})

});
