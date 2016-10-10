import React from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';

import Chart from '../../shared/chart';

export default observer(['store'], React.createClass({
	componentWillMount() {
		this.charts = this.props.store.charts;
		console.log('=========  this.charts  =========');
		console.log(this.charts);
		console.log('=====  End of this.charts>  =====');
	},
	columns() {

			const b = _.reduce(this.charts.categories, (memo, category) => {

				// Create an empty array for each category
				if (!_.has(memo, category)) {
					memo[category] = [];
				}

				// Insert the category name as the first item
				if (!_.includes(memo[category], category)) {
					memo[category].push(category);
				}

				_.each(this.charts.periods, (period) => {
					const data = _.get(this.charts, 'totalsByCategoryPeriod.totals', []);

					const d = _.filter(data, {period, category});
					if (_.size(d) > 0) {
						const item = _.get(d, '[0].totalUSD', 0);
						memo[category].push(item);
					} else {
						memo[category].push(0);
					}
				});

				return memo;
		}, []);

		console.log('=========  b  =========');
		console.log(b);
		console.log('=====  End of b>  =====');

		return b;
	},
	render() {
		const chartOptions = {
			bindto: '#timeline',
			data: {
				x: 'x',
				xFormat: '%Y-%M',
				columns: [
					this.charts.chartPeriods,
					['data1', 30],
					['data2', 50]
				]
			},
			axis : {
				x : {
					type : 'timeseries',
					tick: {
						format: '%Y-%M'
					}
				}
			}
		};

		this.columns();
		return (
			<Chart chartOptions={chartOptions}/>
		);
	}
}));
