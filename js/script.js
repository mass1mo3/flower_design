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
}
}

// Зменшення кількості товару 

// const minusFuncion = id => {
// 	if (cart[id]["count"] - 1 == 0) {
// 		deleteFunction(id);
// 		return true;
// 	}
// 	cart[id]['count']--;
// 	renderCart();
// };


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

// function summItems() {
// 	let sum = 0; 
// 	for (let key of Object.values(cart.key.total)) {
// 		sum += cart[key].total;
// 		console.log(sum);
// 	  }
	
// 	// let totalAll = 0;
// 	// for (let key in cart) {
// 	// 	let total123 = 0;
// 	// 	total123 += cart[key].total;
// 	// 	console.log(total123);
// 	// 	totalAll++;
// 	//   }
	

// 	// console.log(totalAll);
// 	// for (let i = 0; i < Object.keys(cart).length; i++) {
// 	// 	console.log(cart[target].total += cart[target].total); 
		
// 	// }
// }



//Видалення товару
// const deleteFunction = id => {
// 	delete cart[id];
// 	renderCart();
// }

//render 

function renderCart (target) {
	
	const itemName = document.querySelector('#cart__item_name'); 
	const itemCount = document.querySelector('#cart__item_count');
	const itemPrice	= document.querySelector('#cart__item_price');
	const itemAmount = document.querySelector('#cart__item_amount');
	const itemsTotalAll = document.querySelector('#cart__items_totalAll');
	
	// let currentButton = document.querySelector('#'+ target + '-buttonPlus');
	// // const cartButtons = document.querySelector('#cart__buttons_chahge');

	// currentButton.addEventListener('click', () => {
	// 	console.log(currentButton.id);
	// })
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



	// let divButton = document.createElement('button');
	// divButton.className = "plus item__button_cart cart__elem_button";

	if (!Object.keys(cart).includes(target)) {
		let targetCountId = document.getElementById(target + '-count');
		targetCountId.innerHTML = cart[target].count;
		
		
		let targetPriceId = document.getElementById(target + '-price');
		targetPriceId.innerHTML = cart[target].price + ' грн.';

		let targetTotalId = document.getElementById(target + '-total');
		targetTotalId.innerHTML = cart[target].total + ' грн.';
		

	} 
	else if (!cart.target) {
		console.log('первичная отрисовка');
		divName.innerHTML = cart[target].name;
		
		itemName.append(divName);
		
		
		divCount.innerHTML = cart[target].count;
		itemCount.append(divCount);
		divCount.setAttribute('id', target + '-count');

		divPrice.innerHTML = cart[target].price  + ' грн.';
		itemPrice.append(divPrice);
		divPrice.setAttribute('id', target + '-price');


		divAmount.innerHTML = cart[target].total + ' грн.';
		itemAmount.append(divAmount);
		divAmount.setAttribute('id', target + '-total');

		
		divCount.append(divButtons);
		
		let addButton = divCount.querySelector('.add__button');
		addButton.setAttribute('id', target + '-buttonPlus');

		addButton.addEventListener('click', () => {
			plusFuncion(target);
			// renderCart(target);
		});
		
		let currentButton = document.querySelector('#'+ target + '-buttonPlus');
		console.log(currentButton);

		let minusButton = document.querySelector('.minus__button');
		minusButton.setAttribute('id', target + '-buttonMinus');


		// divButton.setAttribute('id', target + '-buttonPlus');
	}
	
	
	// else if (!Object.keys(cart).includes(target)){	
	// 	

	// }
	
	
};


function showModalNotification() {
	let modalNotificationBG = document.querySelector(".modal__cart_addBG");
	
	modalNotificationBG.style.display = 'flex';
	
	
}

function showAdditionalCartIcon () {
	let additionalCartIcon = document.querySelector('#additional__cart_icon');
	additionalCartIcon.style.display = 'block';
}



	



function hideModal () {
	let modalNotificationBG = document.querySelector(".modal__cart_addBG");
	let buttonGoCart = document.querySelector(".button__gocart");
	const modalCartAdd = document.getElementById('modal__cart_add');
	let modalBackground = document.querySelector(".modal__bg");
	let buttonContinueShopping = document.querySelector(".button__continue");
	let modalClose = document.querySelector(".modal__close");
	let cartIcon = document.querySelectorAll(".header__basket");
	let cartWindow = document.getElementById('modal');

	modalNotificationBG.addEventListener('click', (e) => {
		if (e.target === modalNotificationBG) {
			modalNotificationBG.style.display = 'none';
			
		}
	});

	modalBackground.addEventListener('click', (e) => {
		if (e.target === modalBackground) {
			modalBackground.style.display = 'none';
			document.body.style.overflow = '';
		}
	});

	document.body.addEventListener('keydown', (e) => {
		
		if (e.code === 'Escape') {
			console.log(13334);
			modalBackground.style.display = 'none';
			document.body.style.overflow = '';
		}
	});
	buttonContinueShopping.addEventListener('click', () => {
		modalNotificationBG.style.display = 'none';
		
	});

	buttonGoCart.addEventListener('click', () => {
		
		modalBackground.style.display = 'flex';
		modalNotificationBG.style.display = 'none';
		document.body.style.overflow = 'hidden';
		
		
		
	});

	cartIcon.forEach(icon =>{
		icon.addEventListener('click', () => {
		modalBackground.style.display = 'flex';
		modalNotificationBG.style.display = 'none';
		document.body.style.overflow = 'hidden';

	});
});

	modalClose.addEventListener('click', (e) => {
		e.preventDefault();
		modalBackground.style.display = 'none';
		document.body.style.overflow = '';

});

}
hideModal();
