import numpad from './numpad.js';

const msg = document.querySelector('#msg');
const showNum = document.querySelector('#show-number');
const phoneNumpad = document.querySelector('#phone-numpad');
const phoneMsg = document.querySelector('#phone-msg');

showNum.addEventListener('click',() => {
	phoneNumpad.textContent = '555-7125';
	phoneMsg.textContent = 'Memorize the phone number and enter it in the dialpad when it appears.';
	msg.style.display = 'none';
	showNum.style.display = 'none';
	setTimeout(() => {
		phoneNumpad.textContent = '';
		phoneMsg.textContent = '';
		numpad.attach({
			id : "phone-numpad"
		});
	},12000);
});
