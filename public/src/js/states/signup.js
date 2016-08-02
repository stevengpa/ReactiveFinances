import _ from 'lodash';
import {observable, action} from 'mobx';
import {isEmail} from 'validator';

export default observable({
	// Observables:
	email: '',
	// Computeds:
	disabled() {
		return !isEmail(this.email);
	},
	formState() {
		if (isEmail(this.email) && _.size(this.email) > 0) {
			return 'success';
		} else if (!isEmail(this.email) && _.size(this.email) > 0) {
			return 'error';
		} else if (_.size(this.email) === 0) {
			return undefined;
		}
	},
	// Actions:
	setEmail: action(function setEmail(status) {
		this.email = status;
	})
});
