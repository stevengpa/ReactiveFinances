import React from 'react';
import {observer} from 'mobx-react';

import Header from './header';
import Footer from './footer';

export default observer(['store'], React.createClass({
	render() {
		return (
			<div>
				<Header {...this.props}/>
				{this.props.children}
				<Footer/>
			</div>
		);
	}
}));
