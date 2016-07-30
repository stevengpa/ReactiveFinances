const _ = require('lodash');
const config = require('./config');
const keyLang = 'rft_lang';

function init() {
	if (_.isNull(localStorage.getItem(keyLang))) {
		localStorage.setItem(keyLang, 'es');
	}

	return localStorage.getItem(keyLang);
}

function changeLang(lang, $component) {
	localStorage.setItem(keyLang, lang);
	$component.forceUpdate();
	return localStorage.getItem(keyLang);
}

function t(path) {
	init();
	var lang = localStorage.getItem(keyLang) || 'es';
	return _.get(config, lang.toLowerCase() + '.' + path, '');
}

module.exports = {
	t,
	changeLang
};
