const config = require('config');
const jwt = require('jsonwebtoken');

const jwtSecret = config.get('app.security.secret');

module.exports = {
	access(req, res) {
		const {email, code} = req.user;
		const token = jwt.sign({email, code}, jwtSecret);

		res.send({
			email,
			code,
			token
		});
	}
};
