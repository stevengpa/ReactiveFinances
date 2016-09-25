import React from 'react';
import {observer} from 'mobx-react';

import Filter from '../filters';

import Add from './partials/add';

export default observer(['store'], React.createClass({
	displayName: 'Dashboard',
	componentWillMount() {
		this.translation = this.props.store.translation;
		this.filters = this.props.store.filters;
		this.entry = this.props.store.entry;
		this.filters.loadFields();
		this.filters.loadFilters();

		this.app = this.props.store.app;
		this.app.customCSS = 'master-dashboard';

		this.charts = this.props.store.charts;
	},
	render() {
		console.log('=========  TEST  =========');
		console.log(this.charts);
		console.log('=====  End of TEST>  =====');
		return (
			<div>
				<Filter
					filters={this.filters}
					translation={this.translation}
				/>
				<div className="dashboard">
					<h1>Dashboard</h1>
				</div>
				<Add stage="new"/>
			</div>
		);
	}
}));
