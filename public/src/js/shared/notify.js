import React from 'react';
import ReacDOM from 'react-dom';
var Nowtify = require('react-nowtify');

Nowtify.init({
	containerID: 'nowtify',
	displayTimeout: 3000,
	sound: false
});

export default function Notify(message, type) {
	let icon = '';
	if (type === 'success') {
		icon = 'check';
	} else if (type === 'info') {
		icon = 'info-circle';
	} else if (type === 'warning') {
		icon = 'exclamation-circle';
	} else if (type === 'danger') {
		icon = 'ban';
	} else {
		icon = 'frown-o';
	}

	Nowtify.show([{
		message,
		type,
		icon,
		dismissible : false,     // Default: false
		hideOnClose : false,     // Default: false
		sound       : false      // Default: false
	}]);
}

/*
 var notifications = [
 {
 message     : 'The message of your first notification',
 type        : 'success', // 'success','info','warning', 'danger'
 icon        : 'rebel',  // Default: false (You can specify a specific font-awesome icon !)
 dismissible : true,     // Default: false
 hideOnClose : true,     // Default: false
 sound       : true      // Default: false
 }
 ];

 Nowtify.show( notifications );
 */
