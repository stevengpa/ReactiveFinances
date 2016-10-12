import React from 'react';
import {observer} from 'mobx-react';
import {Row, Col} from 'react-bootstrap';

import Chart from '../../shared/chart';

export default observer(['store'], React.createClass({
	componentWillMount() {
		this.charts = this.props.store.charts;
	},
	render() {
		const chartOptions = {
			bindto: '#timeline',
			data: {
				x: 'x',
				xFormat: '%Y-%M',
				columns: this.charts.chartCategoriesAndPeriod
			},
			axis : {
				x : {
					type : 'timeseries',
					tick: {
						format: '%Y-%M'
					}
				}
			},
			padding: {
				top: 24,
				right: 24,
				bottom: 24,
				left: 24
			}
		};

		return (
			<Row>
				<Col xs={1}/>
				<Col xs={10}>
					<Chart className="chart-line-summary-category" chartOptions={chartOptions}/>
				</Col>
				<Col xs={1}/>
			</Row>
		);
	}
}));
