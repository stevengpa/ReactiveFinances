import {observable} from 'mobx';
import _ from 'lodash';
import numeral from 'numeral';

//import {cleanString} from '../../../../shared/validations';

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
		// Validate Currency
		if ( _.isEmpty(this.currency) ||
			this.currency !== storeCurrency.exchangeCurrency && this.currency !== EXCHANGE_CURR) {
			alert('Currency');
			return false;
		}
		// Validate Exchange
		if (!_.isNumber(this.exchange) ||
			!_.gt(this.exchange, 0)) {
			alert('Exchange');
			return false;
		}
		// Validate Amount
		if (!_.isNumber(this.amount) ||
			!_.gt(this.amount, 0)) {
			alert('Amount');
			return false;
		}
		// Validate Date
		if (_.isEmpty(this.isDate) ||
			!_.isDate(this.isDate)) {
			alert('Date');
			return false;
		}
		// Validate Category
		console.log('=========  this.category  =========');
		console.log(this.category);
		console.log('=====  End of this.category>  =====');
		if (_.isEmpty(this.category) ||
			!_.has(this.category, ['id', 'category'])) {
			return false;
		}
		// Validate Label
		console.log('=========  this.label  =========');
		console.log(this.label);
		console.log('=====  End of this.label>  =====');
		if (_.isEmpty(this.label) ||
			!_.has(this.label, ['id', 'label'])) {
			return false;
		}

		return true;
	}
});
