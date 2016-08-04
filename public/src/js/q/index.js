import _ from 'lodash';
import axios from 'axios';
import auth from '../states/auth';

// Add Bearer Token
const instance = axios.create();
const token = _.get(auth, 'user.token', '');

if (_.size(token) > 0) {
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
