"use strict";

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

	
} else {
	document.body.classList.add('_pc');
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//Cart 
let bouquets = {
	tenderFreshness : {
		name: "Ніжна свіжість",
		count: 0, 
		price: 445
	}, 
	sorbet : {
		name: "Сорбет",
		count: 0, 
		price: 450 
	},
	yellowSong :{
		name: "Yellow Song",
		count: 0, 
		price: 455
	},
	
	peachNectar: {
		name: "Персиковий нектар",
		count: 0,
		price: 455
	}, 
	
	avrora: {
		name: "Аврора",
		count: 0, 
		price: 460
	},
	
	loveClassic: {
		name: "Класика кохання",
		count: 0, 
		price: 465 
	}, 

	waitHappines: {
		name: "Довгоочікуване щастя",
		count: 0, 
		price: 510 
	}

};


let cart = {

};

let totalSum = 0;

let buttonItems = document.querySelectorAll('.item__button_cart');
buttonItems.forEach(item => {
	item.addEventListener('click', (e) => {
		if (bouquets.hasOwnProperty(e.target.dataset.id)) {
			
			//Додавання до кошика відсутнього товару
			if (!Object.keys(cart).includes(e.target.dataset.id)) {
				addToCart(e.target.dataset.id);

		
			}
			// Якщо товар вже в кошику
			else if (e.target.classList.contains('plus')) {
			plusFuncion([e.target.dataset.id]);
			multiplyItems([e.target.dataset.id]);
			
			// summItems([e.target.dataset.id]);
			
			}
		else {
			console.log("Щось пішло не так");
		}
		}
        e.preventDefault();
	});
});

// Додавання товару в корзину
function addToCart (target) {
	let keys = Object.keys(bouquets);
	let values = Object.values(bouquets);

	for (let i = 0, l = keys.length; i < l; i++) {
	if (keys[i] == target) {

		let itemValue = values[i];
		
		 cart = Object.defineProperty(cart, target, {
			value : itemValue, 
			writable: true, 
			enumerable: true,
			configurable: true
		});
		cart[target].count = 1;
		multiplyItems(target);
		totalSum += cart[target].price;
		
		renderCart(target);
		showModalNotification();
		showAdditionalCartIcon();	
	}
}}


// Збільшення кількості товару 
function plusFuncion (target) {
		
		cart[target].count++;
		multiplyItems(target);
		totalSum += cart[target].price;
		renderCart(target);

	}

// Загальна кількість 	
function multiplyItems (target) {

	let total = cart[target].count * cart[target].price; 
	cart[target].total = total;
	 
} 




//render 

function renderCart (target) {
	
	const itemName = document.querySelector('#cart__item_name'); 
	const itemCount = document.querySelector('#cart__item_count');
	const itemPrice	= document.querySelector('#cart__item_price');
	const itemAmount = document.querySelector('#cart__item_amount');
	const itemsTotalAll = document.querySelector('#cart__items_totalAll');
	
	itemsTotalAll.innerHTML = 'Всього: ' + totalSum + ' грн.';


	let divName = document.createElement('div');
	divName.className = "cart__elem_name";

	let divCount = document.createElement('div');
	divCount.className = "cart__elem_count";

	
	let divPrice = document.createElement('div');
	divPrice.className = "cart__elem_price";

	let divAmount = document.createElement('div');
	divAmount.className = "cart__elem_amount";

	let divButtons = document.createElement('div');
	divButtons.className = "cart__buttons_chahge cart__item_button";
	divButtons.setAttribute("id", "cart__buttons_chahge");
	divButtons.innerHTML = ' <button class="plus item__button_cart item__button add__button">+</button> <button class="minus item__button_cart item__button minus__button">-</button>';

	if (!Object.keys(cart).includes(target)) {
		let targetCountId = document.getElementById(target + '-count');
		if (cart[target].count >= 1) {
			targetCountId.innerHTML = cart[target].count;
		}
		
		
		let targetPriceId = document.getElementById(target + '-price');
		targetPriceId.innerHTML = cart[target].price + ' грн.';

		let targetTotalId = document.getElementById(target + '-total');
		targetTotalId.innerHTML = cart[target].total + ' грн.';
		targetCountId.append(divButtons);
		
		let total = cart[target].total;
		let price = cart[target].price;

		let addButton = targetCountId.querySelector('.add__button');
		addButton.setAttribute('id', target + '-buttonPlus');

		let minusButton = targetCountId.querySelector('.minus__button');
		minusButton.setAttribute('id', target + '-minusPlus');

		addButton.addEventListener('click', () => {
			
			targetCountId.innerHTML = ++cart[target].count;
			total += price;
			targetTotalId.innerHTML = total + ' грн.';
			targetCountId.append(divButtons);
			totalSum += cart[target].price;
			itemsTotalAll.innerHTML = 'Всього: ' + totalSum + ' грн.';
			
		});

		

		minusButton.addEventListener('click', () => {
			
			if (cart[target].count > 1) {
				targetCountId.innerHTML = --cart[target].count;
				total -= price;
				targetTotalId.innerHTML = total + ' грн.';
				targetCountId.append(divButtons);
				totalSum -= cart[target].price;
				itemsTotalAll.innerHTML = 'Всього: ' + totalSum + ' грн.';
				
			} else if (cart[target].count <= 1) {
				
				let targetCountId = document.getElementById(target + '-count');
				targetCountId.remove();
				
				let targetNameId = document.getElementById(target + '-name');
				targetNameId.remove();

				let targetPriceId = document.getElementById(target + '-price');
				targetPriceId.remove();

				let targetTotalId = document.getElementById(target + '-total');
				targetTotalId.remove();
				totalSum -= cart[target].price;
				if(totalSum <= 0) {
				itemsTotalAll.innerHTML= '';
			}
			else {
				itemsTotalAll.innerHTML = 'Всього: ' + totalSum + ' грн.';
			}
			}
			
			// renderCart(target);
		});
		

	} 
	else if (!cart.target) {
		divName.innerHTML = cart[target].name;
		divName.setAttribute('id', target + '-name');
		
		itemName.append(divName);
		
		
		divCount.innerHTML = cart[target].count;
		itemCount.append(divCount);
		divCount.setAttribute('id', target + '-count');

		divPrice.innerHTML = cart[target].price  + ' грн.';
		itemPrice.append(divPrice);
		divPrice.setAttribute('id', target + '-price');

		let total = cart[target].total;
		let price = cart[target].price;
		divAmount.innerHTML = cart[target].total + ' грн.';
		itemAmount.append(divAmount);
		divAmount.setAttribute('id', target + '-total');

		
		divCount.append(divButtons);
		
		let addButton = divCount.querySelector('.add__button');
		addButton.setAttribute('id', target + '-buttonPlus');

		let minusButton = divCount.querySelector('.minus__button');
		minusButton.setAttribute('id', target + '-minusPlus');

		addButton.addEventListener('click', () => {
			
			divCount.innerHTML = ++cart[target].count;
			total += price;
			divAmount.innerHTML = total + ' грн.';
			divCount.append(divButtons);
			totalSum += cart[target].price;
			itemsTotalAll.innerHTML = 'Всього: ' + totalSum + ' грн.';
			// renderCart(target);
		});

		minusButton.addEventListener('click', () => {
			
			if (cart[target].count > 1) {
				divCount.innerHTML = --cart[target].count;
				total -= price;
				divAmount.innerHTML = total + ' грн.';
				divCount.append(divButtons);
				totalSum -= cart[target].price;
				itemsTotalAll.innerHTML = 'Всього: ' + totalSum + ' грн.';
	
				
			} else if (cart[target].count <= 1) {
				
				let targetCountId = document.getElementById(target + '-count');
				targetCountId.remove();
				
				let targetNameId = document.getElementById(target + '-name');
				targetNameId.remove();

				let targetPriceId = document.getElementById(target + '-price');
				targetPriceId.remove();

				let targetTotalId = document.getElementById(target + '-total');
				targetTotalId.remove();
				totalSum -= cart[target].price;
				if(totalSum <= 0) {
				itemsTotalAll.innerHTML= '';
			}
			else {
				itemsTotalAll.innerHTML = 'Всього: ' + totalSum + ' грн.';
			}
			}
			
			// renderCart(target);
		});	
	}
}


function showModalNotification() {
	const modalNotificationBG = document.querySelector(".modal__cart_addBG");
	modalNotificationBG.style.display = 'flex';
	
	
}

function showAdditionalCartIcon () {
	const additionalCartIcon = document.querySelector('#additional__cart_icon');
	additionalCartIcon.style.display = 'block';
}


function handleModalCart () {
	const modalNotificationBG = document.querySelector(".modal__cart_addBG");
	const buttonGoCart = document.querySelector(".button__gocart");
	const modalBackground = document.querySelector(".modal__bg");
	const buttonContinueShopping = document.querySelector(".button__continue");
	const modalClose = modalBackground.querySelector(".modal__close");
	const cartIcon = document.querySelectorAll(".header__basket");
	const buttonContact = modalBackground.querySelector('.button__basket');
	const scroll = calcScroll();

	modalNotificationBG.addEventListener('click', (e) => {
		if (e.target === modalNotificationBG) {
			modalNotificationBG.style.display = 'none';		
		}
	});


	modalBackground.addEventListener('click', (e) => {
		if (e.target === modalBackground) {
			hideModalWindow (modalBackground);
			
			// document.body.style.overflow = '';
			// document.body.style.marginLeft = `0px`;
			// modalBackground.classList.remove('show');
			// modalBackground.classList.add('fade');
		}
	});

	document.body.addEventListener('keydown', (e) => {
		
		if (e.code === 'Escape') {
			hideModalWindow (modalBackground);
			
			// document.body.style.overflow = '';
			// document.body.style.marginLeft = `0px`;
			// modalBackground.classList.remove('show');
			// modalBackground.classList.add('fade');
		}
	});
	buttonContinueShopping.addEventListener('click', () => {
		modalNotificationBG.style.display = 'none';
		
	});


	buttonGoCart.addEventListener('click', () => {
		showModalWindow(modalBackground, modalNotificationBG,scroll);

		// modalBackground.classList.remove('fade');
		// modalBackground.classList.add('show');
		// modalNotificationBG.style.display = 'none';
		
		// document.body.style.overflow = 'hidden';
		// document.body.style.marginLeft = `-${scroll}px`;
	});

	cartIcon.forEach(icon =>{
		icon.addEventListener('click', () => {
		showModalWindow(modalBackground, modalNotificationBG,scroll);
	
		// modalBackground.classList.remove('fade');
		// modalBackground.classList.add('show');
		// modalNotificationBG.style.display = 'none';
		// document.body.style.overflow = 'hidden';
		// document.body.style.marginLeft = `-${scroll}px`;
	});
});

	modalClose.addEventListener('click', (e) => {
		e.preventDefault();
		hideModalWindow(modalBackground);

		// modalBackground.classList.remove('show');
		// modalBackground.classList.add('fade');
		// document.body.style.overflow = '';
		// document.body.style.marginLeft = '0px';
});

buttonContact.addEventListener('click', (e) => {
	e.preventDefault();
	hideModalWindow(modalBackground);

	// modalBackground.classList.remove('show');
	// modalBackground.classList.add('fade');
	// document.body.style.overflow = '';
	// document.body.style.marginLeft = `0px`;
	handleModalContact();
});



}
handleModalCart();

function handleModalContact (){
	const modalContactBG = document.querySelector('.modal__bg_contact');
	const modalContactParent = document.querySelector('.modal__parent_contact');
	const modalClose = modalContactParent.querySelector('.modal__close');
	const cartWindow = modalContactParent.querySelector('.cart');
	const modalInputs = modalContactParent.querySelectorAll('input');
	const submitContact = modalContactParent.querySelector('#submit__form_contact');
	const userName = modalContactParent.querySelector('#user__name');
	

	modalContactBG.style.display = 'block';
	submitContact.setAttribute("disabled", true);
	modalInputs.forEach(input => {
		let placeholderContent = input.getAttribute('placeholder');
		input.addEventListener('focus', (e) => {
		input.placeholder = '';
		e.target.style.border = '3px solid lightBlue';
		
	});

	input.addEventListener('blur', (e) => {
		input.placeholder = placeholderContent;
		e.target.style.border = '';
		
		
		if (input.value === '') {
			e.target.style.border = '3px solid red';
			input.placeholder = 'Необхідно вказати Ваші дані';
			
		} else if (input.value.length >= 3){
			submitContact.disabled = false;
		}
	});
});

submitContact.addEventListener('click', (e) => {
	e.preventDefault();
	cartWindow.innerHTML = userName.value + ', дякуємо за замовлення. <br/>' + "<br/> Ми зв'яжемося з Вами найближчим часом!";
});

modalClose.addEventListener('click', (e) => {
	e.preventDefault();
	hideModalWindow(modalContactParent);
	// console.log(2);
	// modalContactParent.style.display = 'none';
	// document.body.style.overflow = '';
	// hideModalContact();

});

modalContactParent.addEventListener('click', (e) => {
	if (e.target === modalContactParent) {
		hideModalWindow(modalContactParent);
		// console.log(3);
		// modalContactParent.style.display = 'none';
		// document.body.style.overflow = '';
		// hideModalContact();
	}
});

document.body.addEventListener('keydown', (e) => {
	
	if (e.code === 'Escape') {
		hideModalWindow(modalContactParent);
		// console.log(4);
		// modalContactParent.style.display = 'none';
		// document.body.style.overflow = '';
		// hideModalContact();
	}
});
}

// handleModalContact();


// function hideModalContact () {
// 	const modalContactBG = document.querySelector('.modal__bg_contact');
// 	modalContactBG.style.display = 'none';
// 	document.body.style.overflow = '';
// }



//feedbacks

function handleFeedbackInfo() {
	const feedbackForm = document.getElementById('feedback__block');
	const feedbackInputs = feedbackForm.querySelectorAll('input');
	const feedbackText = document.querySelector('textarea');
	const feedbackSubmit = document.getElementById('feedback_submit');
	let placeholderTextContent = feedbackText.getAttribute('placeholder');
	
	feedbackInputs.forEach(input => {
		let placeholderInputContent = input.getAttribute('placeholder');
		input.addEventListener('focus', (e) => {
		input.placeholder = '';
		e.target.style.outline = '3px ridge  lightBlue';	
	});
	
	function blurInputContent (selector, content, e) {
		selector.placeholder = content;
		e.target.style.outline = '';
	} 
	input.addEventListener('blur', (e) => {
		blurInputContent(input, placeholderInputContent, e);
		
		// input.placeholder = placeholderInputContent;
		// e.target.style.outline = '';

	});

	feedbackText.addEventListener('focus', (e) => {
		feedbackText.placeholder = '';
		e.target.style.outline = '3px ridge  lightBlue';
		
	});
	feedbackText.addEventListener('blur', (e) => {
		blurInputContent(feedbackText, placeholderTextContent, e);
		// feedbackText.placeholder = placeholderTextContent;
		// e.target.style.outline = '';

	});

	feedbackSubmit.addEventListener('click', (e) => {
		e.preventDefault();
		const modalFeedbackBG = document.querySelector('.modal__bg_feedback');
		const modalContactParent = document.querySelector('.modal__parent_feedback');
		const modalClose = modalContactParent.querySelector('.modal__close');
		

		function showThanksForFeedback() {

			
			modalFeedbackBG.classList.remove('fade');
			modalFeedbackBG.classList.add('show');
			
			modalClose.addEventListener('click', (e) => {
				e.preventDefault();
				hideModalWindow(modalFeedbackBG);
				// modalFeedbackBG.classList.remove('show');
				// modalFeedbackBG.classList.add('fade');
			});

		}
		showThanksForFeedback();
		
		function closeThanksForFeedback() {
			hideModalWindow(modalFeedbackBG);
			// modalFeedbackBG.classList.remove('show');
			// modalFeedbackBG.classList.add('fade');
		}
		setTimeout(closeThanksForFeedback, 3000);
	});
});

}

handleFeedbackInfo();

//subscribe

function subscribeForNews() {
	const subscribeInput = document.getElementById('subscribe__email');
	const subscribeSubmit = document.getElementById('subscribe__submit');
	let placeholderInputContent = subscribeInput.getAttribute('placeholder');
	
	subscribeSubmit.addEventListener('click', (e) => {
		e.preventDefault();
		if (!subscribeInput.value.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  )) {
			subscribeInput.style.border = '2px solid red';
			
		  } else {
			subscribeSubmit.classList.add('subscribe__animation');
			subscribeSubmit.style.width = '200%';
			subscribeSubmit.style.backgroundColor = 'lightGreen';
			subscribeSubmit.value = "Дякуємо!";
		  }
		  
	});

	subscribeInput.addEventListener('focus', (e) => {
		subscribeInput.placeholder = '';
		e.target.style.border = '3px solid lightBlue';
	});

	subscribeInput.addEventListener('blur', (e) => {
		if (subscribeInput === '') {
			subscribeInput.placeholder = placeholderInputContent;
			e.target.style.border = '';
		}
	});
		


}
subscribeForNews();

//Розрахунок розміру прокрутки
function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

	function showModalWindow (selector, notification, scroll) {
		selector.classList.remove('fade');
		selector.classList.add('show');
		notification.style.display = 'none';
		document.body.style.overflow = 'hidden';
		document.body.style.marginLeft = `-${scroll}px`;
	}

	function hideModalWindow (selector) {
		document.body.style.overflow = '';
		document.body.style.marginLeft = `0px`;
		selector.classList.remove('show');
		selector.classList.add('fade');
	}