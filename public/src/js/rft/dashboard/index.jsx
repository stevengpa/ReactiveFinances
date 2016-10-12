import React from 'react';
import {observer} from 'mobx-react';
import {Row, Col} from 'react-bootstrap';

import Filter from '../filters';

import Add from './partials/add';
import PeriodChart from './partials/timeseries-chart';

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

		console.log('=========  this.props.store.tables  =========');
		console.log(this.props.store.tables);
		console.log('=====  End of this.props.store.tables>  =====');
	},
	render() {
		return (
			<div>
				<Filter
					filters={this.filters}
					translation={this.translation}
				/>
				<div className="dashboard">
					<Row>
						<Col xs={12}>
							<PeriodChart/>
						</Col>
					</Row>
				</div>
				<Add stage="new"/>
			</div>
		);
	}
}));
