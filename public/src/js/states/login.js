import _ from 'lodash';
import {observable, action} from 'mobx';
import {isEmail} from 'validator';

const CODE_LEN = 10;

export default observable({
	email: '',
	code: '',
	disabled: true,
	formEmailState: undefined,
	formCodeState: undefined,
	isEmailOK: false,
	isCodeOK: false,
	setEmail: action(function (status) {
		this.email = status;
		this.checkEmail();
	}),
	checkEmail: action(function() {
		// Email
		if (isEmail(this.email) && _.size(this.email) > 0) {
			this.isEmailOK = true;
			this.formEmailState = 'success';

		} else if (!isEmail(this.email) && _.size(this.email) > 0) {
			this.isEmailOK = false;
			this.formEmailState = 'error';

		} else if (_.size(this.email) === 0) {
			this.formEmailState = undefined;
			this.isEmailOK = false;
		}

		this.disabled = !(this.isEmailOK && this.isCodeOK);
	}),
	setCode: action(function (status) {
		this.code = status;
		this.checkCode();
	}),
	checkCode: action(function() {
		// Code
		if (_.size(this.code) === CODE_LEN) {
			this.isCodeOK = true;
			this.formCodeState = 'success';

		} else if (_.size(this.code) < CODE_LEN && this.code !== '' || _.size(this.code) > CODE_LEN) {
			this.isCodeOK = false;
			this.formCodeState = 'error';

		} else if (_.size(this.code) === 0) {
			this.formCodeState = undefined;
			this.isCodeOK = false;
		}

		this.disabled = !(this.isEmailOK && this.isCodeOK);
	})
});

/*
 setEmail: action(function setEmail(status) {
 this.email = status;

 if (isEmail(this.email) && _.size(this.email) > 0) {
 this.disabled = false;
 this.formState = 'success';

 } else if (!isEmail(this.email) && _.size(this.email) > 0) {
 this.disabled = true;
 this.formState = 'error';

 } else if (_.size(this.email) === 0) {
 this.formState = undefined;
 }
 */
