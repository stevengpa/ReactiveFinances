import React from 'react';
import {observer} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import Header from './header';

export default observer(['store'], React.createClass({
	componentWillMount() {
		this.app = this.props.store.app;
		this.translation = this.props.store.translation;
		this.translation.init();
	},
	render() {
		return (
			<div className={this.app.customCSS}>
				{/*<DevTools/>*/}
				<Header/>
				<div className="app-container">
					{this.props.children}
				</div>
			</div>
		);
	}
}));
