import PNotify from 'pnotify';
import $ from 'jquery';

PNotify.prototype.options.styling = 'bootstrap3';

var animate_in = $('#animate_in').val(),
	animate_out = $('#animate_out').val();

export default function Notify(title, type, delay = 3000) {
	new PNotify({
		title,
		type,
		icon: true,
		nonblock: {
			nonblock: true,
			nonblock_opacity: .2
		},
		animate: {
			animate: true,
			in_class: animate_in,
			out_class: animate_out
		},
		delay
	});
}
