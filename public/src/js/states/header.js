import {observable, action} from 'mobx';

export default observable({
	isLogin: true,
	setIsLogin: action((isLogin) => this.isLogin = isLogin)
});
