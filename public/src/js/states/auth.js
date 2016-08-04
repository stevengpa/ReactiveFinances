import {observable, action} from 'mobx';

export default observable({
	key: 'rft-session',
	user() {
		return JSON.parse(sessionStorage.getItem(this.key));
	},
	set: action(function(user) {
		sessionStorage.setItem(this.key, JSON.stringify(user));
	}),
	remove: action(function() {
		sessionStorage.removeItem(this.key);
	})
});
