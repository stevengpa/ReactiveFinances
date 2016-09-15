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
		})
		.then(() => this.props.filters.loadFilters());
	},
	onChange(filterSelected) {
		// Get the different item between the selected and loaded list, if there is an item, it should be removed
		const filters = this.props.filters.filters.toJS();
		const removeItem = _.chain(filters)
			.differenceBy(filterSelected, 'value')
			.get('[0]')
			.value();

		if (_.size(removeItem) > 0) {

			this.props.filters.toggleFilter({
				...removeItem,
				action: 'remove'
			})
			.then(() => this.props.filters.loadFilters());
		}
	},
	render() {
		//TODO: selectedFilters is not updated when filters is loaded
		const selectedFilters = this.props.filters.selectedFilters;

		return (
			<div className={classNames({'hide-filters': this.props.filters.visible})}>
				<Multiselect
					valueField="value"
					textField="field"
					groupBy={filter => !_.isNull(filter) && this.props.translation.t(`filters.${filter.category}`)}
					data={this.props.filters.fields.toJS()}
					defaultValue={selectedFilters}
					onSelect={this.onSelect}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}));
