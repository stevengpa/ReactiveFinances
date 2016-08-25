import React from 'react';
import {observer} from 'mobx-react';

import Add from './partials/add';

export default observer(['store'], React.createClass({
	displayName: 'Dashboard',
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<Add
					stage="new"
				/>
			</div>
		);
	}
}));
