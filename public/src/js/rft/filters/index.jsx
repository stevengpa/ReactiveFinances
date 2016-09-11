import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import {Multiselect} from 'react-widgets';

export default observer(React.createClass({
	displayName: 'Filter',
	componentWillMount() {
		this.props.filters.loadFilters();
	},
	onSelect(filter) {
		this.props.filters.toggleFilter({
			...filter,
			action: 'add'
		});
		this.props.filters.loadFilters();
	},
	onChange(filterSelected) {
		const removedFilter = _.difference(this.filters.filters, filterSelected);

		if (_.size(removedFilter) > 0) {
			this.props.filters.toggleFilter({
				...removedFilter[0],
				action: 'remove'
			});
		}
		this.props.filters.loadFilters();
	},
	render() {
		console.log('=========  this.props.filters.selectedFilters  =========');
		console.log(this.props.filters.selectedFilters.toJS());
		console.log('=====  End of this.props.filters.selectedFilters>  =====');
		return (
			<div className={classNames({'hide-filters': this.props.filters.visible})}>
				<Multiselect
					valueField="value"
					textField="field"
					groupBy={filter => !_.isNull(filter) && this.props.translation.t(`filters.${filter.category}`)}
					data={this.props.filters.fields.toJS()}
					defaultValue={this.props.filters.selectedFilters.toJS()}
					onSelect={this.onSelect}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}));
