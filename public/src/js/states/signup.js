import _ from 'lodash';
import {observable, action} from 'mobx';
import {isEmail} from 'validator';
import translation from '../../../../shared/translation';
import q from '../q';

export default observable({
	// Observables:
	email: '',
	message: '',
	messageType: 'warning',
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
	messageClass() {
		return (_.size(this.message) === 0) ? 'hide-element' : '';
	},
	// Actions:
	setEmail: action(function setEmail(status) {
		this.email = status;
	}),
	register: action(function() {
		if (this.formState === 'success') {
			q({
				method: 'post',
				url:'/signup/register',
				data: {
					email: this.email,
					language: translation.language
				}
			}).then(({data}) => {
				console.log('=========  result front  =========');
				console.log(data);
				console.log('=====  End of result front>  =====');
			})
			.catch((err) => {
				console.log('=========  err front  =========');
				console.log(err);
				console.log('=====  End of err front>  =====');
			});
		}
	})
});
