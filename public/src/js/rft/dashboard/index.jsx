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
		this.entry.loadFilteredEntries()
			.then((result) => {
				console.log('=========  result  =========');
				console.log(result);
				console.log('=====  End of result>  =====');
			});
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
