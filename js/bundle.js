/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calculator() {
  const result = document.querySelector('.calculating__result span');
  let gender, height, weight, age, ratio;

  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    gender = 'female';
    localStorage.setItem('gender', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  calcTotal();
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  getStaticInformation("#gender", 'calculating__choose-item_active');
  getStaticInformation(".calculating__choose_big", 'calculating__choose-item_active');
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

  function getStaticInformation(parentSelector, activeClass) {
    const elems = document.querySelectorAll(`${parentSelector} div`);
    elems.forEach(item => {
      item.addEventListener("click", e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          gender = e.target.getAttribute('id');
          localStorage.setItem('gender', gender);
        }

        elems.forEach(item => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  function getDynamicInformation(inputSelector) {
    const input = document.querySelector(inputSelector);
    input.addEventListener('input', e => {
      if (input.value.match(/\D/g)) {
        input.style.border = '2px solid red';
      } else {
        input.style.border = 'none';
      }

      let id = input.getAttribute('id');

      switch (id) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  function calcTotal() {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (gender === 'female') {
      let calc = (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio;
      result.textContent = calc.toFixed();
    } else if (gender === 'male') {
      let calc = (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio;
      result.textContent = calc.toFixed();
    }
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('gender')) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");


function cards() {
  (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });

  class MenuCard {
    constructor(src, alt, title, descr, price, parent) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.exchangeRate = 72;
      this.parent = document.querySelector(parent);

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
    }

    changeToDollars() {
      this.price = Math.floor(this.price / 72);
    }

    render() {
      const card = document.createElement('div');

      if (this.classes.length === 0) {
        this.elemClass = 'menu__item';
        card.classList.add(this.elemClass);
      } else {
        this.classes.forEach(className => {
          card.classList.add(className);
        });
      }

      card.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
            `;
      this.parent.append(card);
    }

  }
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modalWindows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindows */ "./js/modules/modalWindows.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо!  Мы скоро с вами свяжемся!',
    error: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);
      const data = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(data.entries()));
      (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showSuccessModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showSuccessModal(message.error);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showSuccessModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modalWindows__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
    const successModal = document.createElement('div');
    successModal.classList.add('modal__dialog');
    successModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(successModal);
    setTimeout(() => {
      successModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modalWindows__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modalWindows.js":
/*!************************************!*\
  !*** ./js/modules/modalWindows.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove('hide');
  modalWindow.classList.add('show'); //to turn off the option to scroll the window

  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove('show');
  modalWindow.classList.add('hide'); //to allow to scroll back again

  document.body.style.overflow = '';
}

function modalWindows(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);
  modalTrigger.forEach((item, i) => {
    item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  modalWindow.addEventListener('click', e => {
    if (e.target && e.target.matches('.modal__content') || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });
  window.addEventListener('scroll', showModalByScroll);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      removeEventListener('scroll', showModalByScroll);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (modalWindows);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider() {
  const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        slideWidth = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  total.textContent = addZero(slides.length);
  current.textContent = addZero(slideIndex);
  let offset = 0;
  slidesField.style.width = 100 * slides.length + '%';
  slides.forEach(item => item.style.width = slideWidth);
  slidesField.style.display = 'flex';
  slidesField.style.transition = '1s all';
  slidesWrapper.style.overflow = 'hidden';
  next.addEventListener('click', () => {
    if (offset == +slideWidth.replace(/\D/g, '') * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +slideWidth.replace(/\D/g, '');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    ++slideIndex;

    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    current.textContent = addZero(slideIndex);
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +slideWidth.replace(/\D/g, '') * (slides.length - 1);
    } else {
      offset -= +slideWidth.replace(/\D/g, '');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    --slideIndex;

    if (slideIndex < 1) {
      slideIndex = slides.length;
    }

    current.textContent = addZero(slideIndex);
  });

  function addZero(n) {
    if (n > 0 && n < 10) {
      return '0' + n;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs() {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabheaderWrapper = document.querySelector('.tabheader__items'),
        tabContainer = document.querySelector('.tabcontainer'),
        tabcontents = document.querySelectorAll('.tabcontent');
  hideAllTabcontent();
  tabcontents[0].classList.remove('hide');
  tabcontents[0].classList.add('show', 'animated');
  showTab(0);
  tabheaderWrapper.addEventListener('click', e => {
    e.preventDefault();

    if (e.target && e.target.matches('.tabheader__item')) {
      tabs.forEach((item, i) => {
        if (item == e.target) {
          hideAllTabcontent();
          showTab(i);
        }
      });
    }
  });

  function hideAllTabcontent() {
    tabcontents.forEach(item => {
      item.classList.remove('show');
      item.classList.add('hide');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTab(index) {
    tabs[index].classList.add('tabheader__item_active');
    tabcontents[index].classList.add('show', 'animated');
    tabcontents[index].classList.remove('hide');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  setClock(id, deadline);

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timerId = setInterval(updateClock, 1000); //чтобы не было мигания в верстке в первый раз при загрузке страницы

    updateClock();

    function updateClock() {
      let objDate = getDiffTime(deadline);
      days.innerHTML = getZero(objDate.days);
      hours.innerHTML = getZero(objDate.hours);
      minutes.innerHTML = getZero(objDate.minutes);
      seconds.innerHTML = getZero(objDate.seconds);

      if (objDate.total <= 0) {
        clearInterval(timerId);
      }
    }
  }

  function getDiffTime(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      return {
        total: t,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": function() { return /* binding */ getData; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });
  return await res.json();
};

const getData = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`${url} ${res.status} ${res.statusText}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modalWindows__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modalWindows */ "./js/modules/modalWindows.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");








window.addEventListener('DOMContentLoaded', function () {
  const modalTimerId = setTimeout(() => (0,_modules_modalWindows__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 10000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2023-01-01');
  (0,_modules_modalWindows__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map