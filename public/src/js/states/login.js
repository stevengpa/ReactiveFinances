import _ from 'lodash';
import {isEmail} from 'validator';
import {observable, action} from 'mobx';

import translation from '../../../../shared/translation';
import auth from '../states/auth';

import q from '../q';

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
	setEmail: action(function setEmail(status) {
		this.email = status;
	}),
	setCode: action(function setCode(status) {
		this.code = status;
	}),
	access: action(function access() {
		if (this.formEmailState === 'success' && this.formCodeState === 'success') {
			q({
				method: 'post',
				url:'/login',
				data: {
					email: this.email,
					code: this.code
				}
			})
			.then((response) => {
				if (_.get(response, 'status', 401) === 200) {
					// Store Token Session
					auth.set(response.data);
					// Reset UI message
					this.messageType = 'warning';
					this.message = '';
					window.location.reload();
				} else {
					this.messageType = 'danger';
					this.message = translation.t('login.error');
				}
			})
			.catch(() => {
				this.messageType = 'danger';
				this.message = translation.t('login.error');
			});
		}
	})
});
