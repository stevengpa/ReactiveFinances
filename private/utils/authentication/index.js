const _ = require('lodash');
const {isEmail} = require('validator');

const db = require('../db');

function getUser(email, private_code) {
	return db.table('users')
		.find({email, private_code})
		.value();
}

module.exports = {
	getUserByPublicCode(public_code) {
		return db.table('users')
			.find({public_code})
			.pick(['id', 'private_code'])
			.value();
	},
	authenticate(req, res, next) {
		const {email, code} = req.body;

		if (!isEmail(email) || _.size(code) !== 36) {
			res.status(400).end();
			return;
		}

		// Check if user exists
		const user = getUser(email, code);
		if (_.isUndefined(user)) {
			res.status(401).end();
			return;
		}

		req.user = {
			email: user.email,
			code: user.public_code
		};

		next();
	}
};
