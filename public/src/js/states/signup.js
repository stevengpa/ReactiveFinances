import _ from 'lodash';
import {observable, action} from 'mobx';
import {isEmail} from 'validator';

export default observable({
	email: '',
	disabled: true,
	formState: undefined,
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
	})
});
