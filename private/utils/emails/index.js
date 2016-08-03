const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('config');
const fs = require('fs');

const pathTemplates = path.resolve(__dirname, './templates');
const smtpConfig = config.get('app.email');

module.exports = {
	send({template, values, fromName, from, to, subject}) {
		return new Promise((resolve, reject) => {

			const templatePath = `${pathTemplates}/${template}`;
			const memoTemplate = fs.readFileSync(templatePath, 'utf8');
			const renderedTemplate = ejs.render(memoTemplate, values);

			const mailOptions = {
				from: `${fromName} <${from}>`,
				to,
				subject,
				html: renderedTemplate
			};

			const transporter = nodemailer.createTransport(smtpConfig);
			transporter.sendMail(mailOptions, (error, info) => {

				if (error) {
					reject(error);
				}

				resolve(info);
			});

		});
	}
};
