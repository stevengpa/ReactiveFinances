import React from 'react';
import {observer} from 'mobx-react';

import Filter from '../filters';

import Add from './partials/add';

export default observer(['store'], React.createClass({
	displayName: 'Dashboard',
	componentWillMount() {
		this.translation = this.props.store.translation;
		this.filters = this.props.store.filters;
		this.filters.loadFields();
		this.filters.loadFilters();
	},
	render() {
		return (
			<div>
				<Filter
					filters={this.filters}
					translation={this.translation}
				/>
				<h1>Dashboard</h1>
				<Add stage="new"/>
			</div>
		);
	}
}));
