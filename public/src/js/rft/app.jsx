import React from 'react';
import {observer} from 'mobx-react';

import Header from './header';

export default observer(['store'], React.createClass({
	componentWillMount() {
		this.translation = this.props.store.translation;
		this.translation.init();
	},
	render() {
		return (
			<div>
				<Header/>
				<div className="app-container">
					{this.props.children}
				</div>
			</div>
		);
	}
}));
