import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import {Multiselect} from 'react-widgets';

export default observer(['store'], React.createClass({
	componentWillMount() {
		this.filters = this.props.store.filters;
		this.translation = this.props.store.translation;
		this.filters.loadFields();
	},
	onChange() {

	},
	render() {
		return (
			<div className={classNames({'hide-filters': this.filters.visible})}>
				<Multiselect
					valueField="value"
					textField="field"
					groupBy={filter => !_.isNull(filter) && this.translation.t(`filters.${filter.category}`)}
					data={this.filters.fields.toJS()}
					onChange={(filter) => console.log(filter)}
				/>
			</div>
		);
	}
}));
