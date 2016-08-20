import React from 'react';
import {observer} from 'mobx-react';

import Add from './partials/add';

export default observer(['store'], React.createClass({
	displayName: 'Dashboard',
	componentWillMount() {
		this.translation = this.props.store.translation;
		this.currency = this.props.store.settings.currency;
		this.category = this.props.store.settings.category;
		this.label = this.props.store.settings.label;

		this.currency.loadCurrency();
		this.category.loadCategories();
		this.label.loadLabels();
	},
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<Add
					translation={this.translation}
					currency={this.currency}
					category={this.category}
					label={this.label}
				/>
			</div>
		);
	}
}));
