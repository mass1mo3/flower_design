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

let id123 = {
	name: "aaa", 
	count: 1
};

let id321 = {
	name: "aaa", 
	count: 1
};

let cart = {
	
};

document.onclick = event => {
	if (event.target.classList.contains('plus')) {
		plusFuncion(event.target.dataset.id);
	}
	if (event.target.classList.contains('minus')) {
		minusFuncion(event.target.dataset.id);
	}
};

// Зменшення кількості товару 

// const minusFuncion = id => {
// 	if (cart[id]["count"] - 1 == 0) {
// 		deleteFunction(id);
// 		return true;
// 	}
// 	cart[id]['count']--;
// 	renderCart();
// };

// Додавання товару в корзину

const addToCart = item => {
	return cart = { ...cart,
	  id123, 
	  id321
	};
  };
// Збільшення кількості товару 

const plusFuncion = id => {
	if (!cart[id]) {
		addToCart({id});
		renderCart();
	} else {
		cart.id["count"]++;
		renderCart();

	}
};

//Видалення товару
// const deleteFunction = id => {
// 	delete cart[id];
// 	renderCart();
// }

//render 

const renderCart = () => {
	console.log(cart);
};