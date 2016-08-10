import React from 'react';
import {observer} from 'mobx-react';

import ExchangeRate from './partials/exchange-rate';

export default observer(['store'], React.createClass({
	displayName: 'Settings',
	componentWillMount() {
		this.translation = this.props.store.translation;
	},
	render() {
		return (
			<div>
				<ExchangeRate translation={this.translation} />
			</div>
		);
	}
}));
