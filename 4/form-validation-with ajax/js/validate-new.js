// Задание http://forum.jscourse.com/t/20-domashka-regulyarnye-vyrazheniya-chtenie-po-jquery/767

'use strict';
//GLOBAL VARS BLOCK
var usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];
var email = document.getElementById('email');
var password = document.getElementById('password');
var city = document.getElementById('city');
var phone = document.getElementById('phone');
var submitBtn = document.getElementById('allform');
var container = document.querySelector('.form-group');

//Service block
function addClass(o, c) {
	var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
	if (re.test(o.className)) return;
	o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

function addAlert(node, text) {
	var parent = node.parentNode;
	var errorMsgTextlocal = parent.querySelector("#errorbox");
	if (!errorMsgTextlocal) {
		errorMsgTextlocal = document.createElement('DIV');
		errorMsgTextlocal.className = 'alert alert-danger';
		errorMsgTextlocal.id = 'errorbox';
	}
	errorMsgTextlocal.innerText = text;
	parent.appendChild(errorMsgTextlocal);
}

function removeAlert(node) {
	var parent = node.parentNode;
	if (!parent) return;
	var errorMsgTextlocal = parent.querySelector("#errorbox");
	if (!errorMsgTextlocal) return;
	parent.removeChild(errorMsgTextlocal);
}

function removeClass(o, c) {
	var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
	o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

//FIRST FIELD
function validEmail() {
	//console.log('validation function started');
	var imput = document.getElementById('email').value;
	if (usedEmails.indexOf(imput) >= 0) {
		addClass(container, 'has-error');
		addAlert(this, 'Простите, этот почтовый адрес уже занят');
		return false;
	} else if (/[%#$,]/g.test(imput)) {
		addClass(container, 'has-error');
		addAlert(this, 'Пожалуйста, введите Ваш почтовый адрес в форме "Ваш_ник@домаеное_имя.тип_домена. К примеру - admin@jscourse.com');
		return false;
	} else if (/[\w\d]+@[\w\d]+.(.[\w\d]+)+/.test(imput)) {
		var errorTarget = document.querySelector('input#email.form-control');
		var request = new XMLHttpRequest();
		var STATE_READY = 4;
		request.open('get', 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + imput, true);
		request.onreadystatechange = function() {
			if (request.readyState === STATE_READY) {
				console.log(JSON.parse(request.responseText))
				if ((JSON.parse(request.responseText)).used === true) {
					console.log('Object true', request.responseText);
					removeClass(container, 'has-error');
					removeAlert(errorTarget);
					return true;

				} else {
					console.log('Object false', request.responseText);
					addClass(container, 'has-error');
					addAlert(errorTarget, 'Простите, этот электронный адрес отсутствует в баз');
				}
			}
		};
		request.send();

	} else {
		addClass(container, 'has-error');
		addAlert(this, 'Пожалуйста, введите Ваш почтовый адрес');
		return false;
	}
}


//SECOND FIELD
function validPassword() {
	var imput = document.getElementById('password').value; //проверено, работает
	//console.log(this, 'Pass validation started');
	if (/(\w){6,}/i.test(imput)) { // Написать условия валидного пароля
		removeClass(container, 'has-error');
		removeAlert(this);
		console.log('Good data pass');
		return true;
	} else if (/.{5,}/.test(imput)) {
		debugger;
		addClass(container, '.has-error');
		addAlert(this, 'Ваш пароль должен быть длиннее 5 символов');
		return false;
	} else if (/([a-z]{6,})|(\d{5,})/i.test(imput)) {
		addClass(container, '.has-error');
		addAlert(this, 'Ваш пароль должен быть хитрее');
		return false;
	} else if (/[!@#$%^&*()_]/.test(imput)) {
		addClass(container, '.has-error');
		addAlert(this, 'Ваш пароль не должен содержать запрещенных символов');
		return false;
	} else {
		addClass(container, '.has-error');
		addAlert(this, 'Поле ввода пароля не может оставаться пустым');
		return false;
	}
}

//THIRD FIELD
function validCity() {
	var imput = document.getElementById('city').value;
	if (/^[A-Z][a-z]+/.test(imput)) {
		removeClass(container, 'has-error');
		removeAlert(this);
		return true;
	} else if (/\d/.test(imput)) {
		addClass(container, '.has-error');
		addAlert(this, 'Вы уверены что Ваш город имеет числа в названии?');
		return false;
	} else if (/[!@#$%^&*()_]/.test(imput)) {
		addClass(container, '.has-error');
		addAlert(this, 'Вряд ли название Вашего города содержит запрещенные символы');
		return false;
	} else {
		addClass(container, '.has-error');
		addAlert(this, 'Пожалуйста, укажите ваш город');
		return false;
	}
}

//FOURTH FIELD
function validPhone() {
	debugger;
	var imput = document.getElementById('phone').value;
	if (/\+(\D){13,}/.test(imput)) {
		addClass(container, '.has-error');
		addAlert(this, 'Номер телефона должен быть записан в формате +380655602487');
		return false;
	} else if (/\+(\d){12}/.test(imput)) {
		removeClass(container, 'has-error');
		removeAlert(this);
		return true;
	} else {
		addClass(container, '.has-error');
		addAlert(this, 'Номер телефона должен состоять из цифр и ваще быть нормульным');
		return false;
	}
}

// CHECKBOX OPTION
function CHeckboxCheck() {
	var check = document.getElementById('check');
	if (check.checked === true) {
		return true;
	} else {
		return false;
	}
}



function submitActivator() {
	debugger;
	if ((CHeckboxCheck() === true) && (validEmail() === true) && (validPassword() === true)) {
		return true;
	} else {
		var container = document.querySelector('.form-group');
		addClass(container, '.has-error');
		addAlert(this, 'Убедитесь что обязательные поля заполнены и чекбокс нажат');
		return false;
	}
};

//FUNCTION CALL BLOCK
email.onblur = validEmail;
password.onblur = validPassword;
city.onblur = validCity;
phone.onblur = validPhone;
submitBtn.onsubmit = submitActivator;