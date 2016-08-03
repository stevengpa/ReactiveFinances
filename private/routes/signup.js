const _ = require('lodash');
const uuid = require('uuid');
const {isEmail} = require('validator');

const Email = require('../utils/emails');
const translation = require('../../shared/translation');
const db = require('../utils/db');

db.init('demo');
const id = db.table('demo')
	.push({name: 'Steven', last: 'Pérez'})
	.value();

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
		}

		const code = uuid.v4();
		sendEmailCode(code, email, language)
			.then((result) => res.send(result))
			.catch((err) => res.send(err));

	}
};
