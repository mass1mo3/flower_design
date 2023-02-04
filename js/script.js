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
		count: 1, 
		price: 445 
	}, 
	sorbet : {
		name: "Сорбет",
		count: 1, 
		price: 450 
	},
	yellowSong :{
		name: "Yellow Song",
		count: 1, 
		price: 455
	},
	
	peachNectar: {
		name: "Персиковий нектар",
		count: 1,
		price: 455
	}, 
	
	avrora: {
		name: "Аврора",
		count: 1, 
		price: 460
	},
	
	loveClassic: {
		name: "Класика кохання",
		count: 1, 
		price: 465 
	}
};






let cart = {

};

let buttonItems = document.querySelectorAll('.item__button');
buttonItems.forEach(item => {
	item.addEventListener('click', (e) => {
		if (bouquets.hasOwnProperty(e.target.dataset.id)) {
			
			//Додавання до кошика відсутнього товару
			if (!Object.keys(cart).includes(e.target.dataset.id)) {
				let keys = Object.keys(bouquets);
				let values = Object.values(bouquets);
			
				for (let i = 0, l = keys.length; i < l; i++) {
				if (keys[i] == e.target.dataset.id) {

					let itemValue = values[i];


					let newProp = Object.defineProperty(cart, e.target.dataset.id, {
						value : itemValue, 
						writable: true, 
						enumerable: true,
						configurable: true
					});
					cart = newProp; 	
					console.log(cart);
					return cart;
				}
		}}
		// Якщо товар вже в кошику
		else if (e.target.classList.contains('plus')) {
			cart[e.target.dataset.id].count++;
			console.log(cart[e.target.dataset.id].count);
			// e.target.dataset.id
			// plusFuncion(e.target.dataset.id);
		}
		else {
			console.log("Щось пішло не так")
		}
		}
        e.preventDefault();
	});
});

// Додавання товару в корзину
// function addToCart (key, value) {
		
// 	if (!Object.keys(cart).includes(key)) {
// 		// let newCart =  Object.assign(cart, bouquets[key]);
// 		console.log(Object.entries(bouquets[key]));
// 		cart = newCart;
// 		console.log(cart);
// 	}
// 	renderCart();
// }

// objects = function (a,b) {
// 	var c = {},
// 	key;
// 	for (key in a) {
// 	  if (a.hasOwnProperty(key)) {
// 	   c[key] = key in b ? b[key] : a[key];
// 	  }
// 	}
// 	return c;
//   }
// const addToCart = item => {
// 	return cart = { ...cart,
// 	  id123, 
// 	  id321
// 	};
//   };
// for (index = 0; index < buttonItems.length; index++) {
//     button = buttonItems[index];
//     button.addEventListener('click', function (event) {
//         console.log('click');
//         event.preventDefault();
//     });
// }



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


// Збільшення кількості товару 

const plusFuncion = id => {

		// cart.id["count"]++;
		renderCart();

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