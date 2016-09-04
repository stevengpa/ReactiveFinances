import {observable, action} from 'mobx';
import _ from 'lodash';
import numeral from 'numeral';

import q from '../q';
import constants from '../shared/constants';

import {cleanString} from '../../../../shared/validations';
import {valEntry} from '../../../../shared/validations/entry';

import auth from '../states/auth';
import storeCurrency from './currency';

const EXCHANGE_CURR = 'USD';

export default observable({
	// Observables
	category: {},
	label: {},
	entryDate: new Date().toISOString(),
	currency: '',
	exchange: 0,
	amount: 0,
	description: '',
	code: _.get(auth, 'user.code', ''),
	// Computeds
	amountUSD() {
		if (this.currency !== EXCHANGE_CURR) {
			if (_.isNumber(this.amount) && _.isNumber(this.exchange)) {
				return _.chain(this.amount / this.exchange)
					.toNumber()
					.round(4)
					.value();
			}
		} else {
			return _.round(this.amount, 4);
		}
	},
	amountLC() {
		if (this.currency !== storeCurrency.currency) {
			if (_.isNumber(this.amount) && _.isNumber(this.exchange)) {
				return _.chain(this.amount * this.exchange)
					.toNumber()
					.round(4)
					.value();
			}
		} else {
			return _.round(this.amount, 4);
		}
	},
	exchangeCurrency() {
		return this.currency === storeCurrency.currency ? EXCHANGE_CURR : storeCurrency.currency;
	},
	exchangeAmount() {
		const formattedAmount = this.currency !== storeCurrency.exchangeCurrency ?
			this.amountUSD : this.amountLC;

		return !_.isNaN(formattedAmount) ?
			`${numeral(formattedAmount).format('0,0.0[0000]')} ${this.exchangeCurrency}` :
			`0 ${this.exchangeCurrency}`;
	},
	isValid() {
		return valEntry({
			currency: cleanString(this.currency),
			exchange: this.exchange,
			amount: this.amount,
			entryDate: this.entryDate,
			category: this.category,
			label: this.label
		});
	},
	// Actions
	saveEntry: action(function saveEntry() {
		if (this.isValid) {
			return q({
				method: 'POST',
				url:'/api/settings/entry',
				data: {
					currency: cleanString(this.currency),
					exchange: this.exchange,
					amount: this.amount,
					entryDate: this.entryDate,
					category: this.category,
					label: this.label,
					description: cleanString(this.description),
					amountUSD: this.amountUSD,
					amountLC: this.amountLC,
					exchangeCurrency: this.exchangeCurrency,
					exchangeAmount: this.exchangeAmount,
					code: cleanString(this.code)
				}
			});
		} else {
			return Promise.reject(constants.VALIDATION_ERROR);
		}
	}),
	clean: action(function clean() {
		this.category = {};
		this.label = {};
		this.entryDate = new Date().toISOString();
		this.amount = 0;
		this.description = '';
	})
});
