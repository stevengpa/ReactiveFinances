import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'mobx-react';

import App from './rft/app';
import Login from './rft/login';
import Invalid from './rft/invalid';
import Dashboard from './rft/dashboard';
import SignUp from './rft/signup';

import store from './store';

function security(nextState, replace) {
	const {pathname} = nextState.location;

	switch (pathname) {
		case '/':
		case '/signup':
		case '/login':
			if (_.size(store.auth.user) > 0) {
				replace({pathname: '/dashboard'});
			}
			break;
		case '/logout':
			store.auth.remove();
			replace({pathname: '/login'});
			window.location.reload();
			break;
		default:
			if (_.size(store.auth.user) === 0) {
				replace({pathname: '/login'});
			}
			break;
	}
}

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App} onEnter={security}>,
				<IndexRoute component={Login} onEnter={security}/>
				<Route path="login" component={Login} onEnter={security}/>
				<Route path="logout" onEnter={security}/>
				<Route path="signup" component={SignUp} onEnter={security}/>
				<Route path="dashboard" component={Dashboard} onEnter={security}/>
			</Route>
			<Route path="*" component={Invalid} />
		</Router>
	</Provider>,
	document.getElementById('app')
);
