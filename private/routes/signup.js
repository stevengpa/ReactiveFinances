const _ = require('lodash');
const uuid = require('uuid');
const {isEmail} = require('validator');

const Email = require('../utils/emails');
const translation = require('../../shared/translation');
const db = require('../utils/db');

function sendEmailCode(code, email, language = 'es') {
	translation.set(language);
	const params = translation.t('email_code');

	return Email.send({
		template: 'signup-code.ejs',
		fromName: 'RFT',
		from: 'auto-rft@noreply.com',
		subject: params.subject,
		to: email,
		values: {code, email, params}
	})
		.then((result) => {
			return { emailConfirmation: _.size(result.accepted) > 0};
		})
		.catch((err) => {
			return { emailConfirmation: false};
		});
}

module.exports = {
	register(req, res) {
		const email = _.get(req.body, 'email', '');
		const language = _.get(req.body, 'language', '');

		if (!isEmail(email) || !_.size(language)) {
			res.status(400).end();
			return;
		}

		// IDs
		const id = uuid.v4();
		const private_code = uuid.v4();
		const public_code = uuid.v4();

		// Validate user exists
		const searchEmail = db.table('users')
			.find({email})
			.value();

		if (!_.isUndefined(searchEmail)) {
			res.status(406).end();
			return;
		}

		// Insert User
		db.table('users')
			.push({id, email, private_code, public_code})
			.value();

		const user = db.table('users')
			.find({id})
			.value();

		// Double Check Insertion
		if (_.get(user, 'id', '') === id) {
			// Create email
			sendEmailCode(private_code, email, language)
				.then((result) => res.send(result))
				.catch((err) => res.send(err));
		} else {
			res.status(204).end();
		}
	}
};
