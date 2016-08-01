import {observable, action} from 'mobx';

export default observable({
	isEmailOK: false,
	isCodeOK: false,
	setIsEmailOK: action(function (status) {this.isEmailOK = status;}),
	setIsCodeOK: action(function (status) {this.isCodeOK = status;}),
	isFormOK: function () { return !(this.isEmailOK && this.isCodeOK);}
});
