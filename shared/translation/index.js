const _ = require('lodash');
const mobx = require('mobx');
const {observable, action} = mobx;

const config = require('./config');
const KEY_LANG = 'rft_lang';

module.exports = observable({
	// Observables:
	language: 'es',
	// Computeds:
	t(path) {
		return _.get(config, this.language + '.' + path, '');
	},
	get() {
		return (_.isNull(localStorage.getItem(KEY_LANG))) ? 'es' : localStorage.getItem(KEY_LANG);
	},
	// Actions:
	init: action(function() {
		if (_.isNull(localStorage.getItem(KEY_LANG))) {
			localStorage.setItem(KEY_LANG, this.language);
		} else {
			this.setLanguage(localStorage.getItem(KEY_LANG));
		}
	}),
	setLanguage: action(function(lang) {
		localStorage.setItem(KEY_LANG, lang);
		this.language = lang;
	}),
	set: action(function(lang) {
		this.language = lang;
	})
});
