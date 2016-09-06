import React from 'react';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Header from './header';
import Filter from './filters';

export default observer(['store'], React.createClass({
	componentWillMount() {
		this.translation = this.props.store.translation;
		this.translation.init();
	},
	render() {
		return (
			<div>
				<DevTools/>
				<Header/>
				<Filter/>
				<div className="app-container">
					{this.props.children}
				</div>
			</div>
		);
	}
}));
