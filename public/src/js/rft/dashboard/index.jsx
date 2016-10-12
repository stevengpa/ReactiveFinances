import React from 'react';
import {observer} from 'mobx-react';

import Filter from '../filters';

import Add from './partials/add';
import PeriodChart from './partials/timeseries-chart';
import SummaryTable from './partials/summary-table';

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
	},
	render() {
		return (
			<div>
				<Filter
					filters={this.filters}
					translation={this.translation}
				/>
				<div className="dashboard">
					<PeriodChart/>
					<SummaryTable/>
				</div>
				<Add stage="new"/>
			</div>
		);
	}
}));
