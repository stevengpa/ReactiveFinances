import React from 'react';
import {observer} from 'mobx-react';

import ExchangeRate from './partials/exchange-rate';

export default observer(['store'], React.createClass({
	displayName: 'Settings',
	componentWillMount() {
		this.translation = this.props.store.translation;
		this.currency = this.props.store.settings.currency;
		this.currency.loadCurrency();
	},
	render() {
		return (
			<div>
				<div id="nowtify"></div>
				<ExchangeRate
					translation={this.translation}
				  currency={this.currency}
				/>
			</div>
		);
	}
}));
