import React from 'react';
import {observer} from 'mobx-react';
import c3 from 'c3';

export default observer(React.createClass({
	propTypes: {
		chartOptions: React.PropTypes.object.isRequired
	},
	componentDidMount() {
		c3.generate(this.props.chartOptions);
	},
	componentWillUpdate({chartOptions}) {
		c3.generate(chartOptions);
	},
	render() {
		let {bindto} = this.props.chartOptions;
		bindto = bindto.replace('#', '');
		return (
			<div id={bindto}></div>
		);
	}
}));
