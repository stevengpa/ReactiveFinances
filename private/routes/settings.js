const db = require('../utils/db');
const {getUserByPublicCode} = require('../utils/authentication');

module.exports = {
	saveCurrency(req, res) {
		console.log('=========  req.body  =========');
		console.log(req.body);
		console.log('=====  End of req.body>  =====');
		res.send(getUserByPublicCode('asd'));
	}
};
