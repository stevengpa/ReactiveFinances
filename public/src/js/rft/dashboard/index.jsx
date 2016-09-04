import React from 'react';
import {observer} from 'mobx-react';
import {Button} from 'react-bootstrap';

import Add from './partials/add';

export default observer(['store'], React.createClass({
	displayName: 'Dashboard',
	test() {
		this.filters = this.props.store.filters;
		this.filters.loadFields()
			.then((result) => {
				console.log('=========  result  =========');
				console.log(result);
				console.log('=====  End of result>  =====');
			})
			.catch((err) => {
				console.log('=========  err  =========');
				console.log(err);
				console.log('=====  End of err>  =====');
			});
	},
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<Button onClick={this.test}/>
				<Add
					stage="new"
				/>
			</div>
		);
	}
}));
