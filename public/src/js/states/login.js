import _ from 'lodash';
import {observable, action} from 'mobx';
import {isEmail} from 'validator';

const CODE_LEN = 36;

export default observable({
	// Observables:
	email: '',
	code: '',
	message: '',
	messageType: 'warning',
	// Computeds:
	messageClass() {
		return (_.size(this.message) === 0) ? 'hide-element' : '';
	},
	disabled() {
		return !(this.isEmailOK && this.isCodeOK);
	},
	formEmailState() {
		if (isEmail(this.email) && _.size(this.email) > 0) {
			return 'success';
		} else if (!isEmail(this.email) && _.size(this.email) > 0) {
			return 'error';
		} else if (_.size(this.email) === 0) {
			return undefined;
		}
	},
	formCodeState() {
		if (_.size(this.code) === CODE_LEN) {
			return 'success';
		} else if (_.size(this.code) < CODE_LEN && this.code !== '' || _.size(this.code) > CODE_LEN) {
			return 'error';
		} else if (_.size(this.code) === 0) {
			return undefined;
		}
	},
	isEmailOK() {
		return (isEmail(this.email) && _.size(this.email) > 0);
	},
	isCodeOK() {
		return (_.size(this.code) === CODE_LEN);
	},
	// Actions:
	setEmail: action(function (status) {
		this.email = status;
	}),
	setCode: action(function (status) {
		this.code = status;
	})
});
