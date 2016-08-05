import {observable, action} from 'mobx';
import _ from 'lodash';

export default observable({
	// Observables
	key: 'rft-session',
	// Computeds
	user() {
		return JSON.parse(sessionStorage.getItem(this.key));
	},
	isAuth() {
		return _.size(this.user) > 0;
	},
	// Actions:
	set: action(function(user = {}) {
		if (_.size(this.user) > 0) {
			this.remove();
		}
		sessionStorage.setItem(this.key, JSON.stringify(user));
	}),
	remove: action(function() {
		sessionStorage.removeItem(this.key);
	})
});
