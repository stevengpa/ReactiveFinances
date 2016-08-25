import {observable} from 'mobx';
import _ from 'lodash';

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
	// Computeds
	amountUSD() {
		if (_.isNumber(this.amount) && _.isNumber(this.exchange)) {
			return this.currency !== EXCHANGE_CURR ? _.chain(this.amount / this.exchange)
				.toNumber()
				.round(4)
				.value() : this.amount;
		} else {
			return 0;
		}
	}
});
