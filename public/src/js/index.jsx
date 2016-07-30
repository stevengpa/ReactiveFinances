import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'mobx-react';

import App from './rft/app';
import Login from './rft/login';
import Invalid from './rft/invalid';
import Dashboard from './rft/dashboard';

import store from './store';

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>,
				<IndexRoute component={Dashboard}/>
				<Route path="/login" component={Login}/>
			</Route>
			<Route path="*" component={Invalid} />
		</Router>
	</Provider>,
	document.getElementById('app')
);

